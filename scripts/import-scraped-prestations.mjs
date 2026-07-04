#!/usr/bin/env node
/**
 * Parse scraped beeheidi folders and import into Sanity.
 * Usage:
 *   node scripts/import-scraped-prestations.mjs --dry-run
 *   SANITY_API_TOKEN=xxx node scripts/import-scraped-prestations.mjs
 */

import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SCRAPE_DIR = path.resolve(ROOT, "beeheidi scrapping");
const FALLBACK_SCRAPE_DIR = "/Users/a20100/Desktop/beeheidi scrapping";

const SKIP_SLUGS = new Set([
  "espace-presse",
  "explore-with-heidi",
  "homepage-html",
  "welcome-swiss-alps",
  "matin",
  "rando-montagne",
]);

const SKIP_TITLE_PATTERNS = [
  /^espace presse$/i,
  /^explore with heidi$/i,
];

const NAV_ITEMS = new Set([
  "Run with Heidi",
  "Explore with Heidi",
  "Be Healthy with Heidi",
  "Enjoy with Heidi",
  "Nos services",
  "Boutique",
  "Agenda",
  "Qui est Heidi?",
  "Contact",
]);

const REGION_MAP = {
  "crans-montana": "crans-montana",
  "sion": "sion-sierre",
  "sierre": "sion-sierre",
  "martigny": "martigny",
  "chablais": "chablais",
  "haut-valais": "haut-valais",
  "zinal": "haut-valais",
  "nendaz": "haut-valais",
};

const COOKIE_PATTERNS = [
  /cookies?/i,
  /consentement/i,
  /personnaliser l'utilisation/i,
  /statistiques de visites/i,
];

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value = "") {
  return normalizeText(value)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFolderName(folderName) {
  const withoutPrefix = folderName.replace(/^fr_/, "");
  const slug = withoutPrefix.replace(/-\d+-html$/, "");
  const idMatch = folderName.match(/-(\d+)-html$/);
  return {
    slug,
    legacyId: idMatch ? idMatch[1] : null,
  };
}

function parseContentTxt(content) {
  const sections = {};
  let current = null;

  for (const line of content.split(/\r?\n/)) {
    const header = line.match(/^=== (.+) ===$/);
    if (header) {
      current = header[1];
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }

  const h1 = (sections.H1 || []).join("\n").trim();
  const h2Lines = (sections.H2 || [])
    .map((l) => l.trim())
    .filter((l) => l && !/consentement aux cookies/i.test(l));

  const paragraphs = (sections.PARAGRAPHES || [])
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !COOKIE_PATTERNS.some((rx) => rx.test(p)));

  const priceLines = [];
  const descriptionParagraphs = [];

  for (const paragraph of paragraphs) {
    if (/CHF\s*\d|personnes\s+CHF|\d+\s*personnes/i.test(paragraph)) {
      priceLines.push(paragraph);
    } else {
      descriptionParagraphs.push(paragraph);
    }
  }

  const listLines = (sections.LISTES || []).filter((line) => line.startsWith("- "));
  const listGroups = [];
  let group = [];

  for (const line of listLines) {
    const item = line.slice(2).trim();
    if (!item) continue;
    if (NAV_ITEMS.has(item)) continue;
    group.push(item);
  }

  // Re-split filtered items by detecting topic shifts
  const filteredItems = listLines
    .map((line) => line.slice(2).trim())
    .filter((item) => item && !NAV_ITEMS.has(item));

  let technical = [];
  let equipment = [];
  let included = [];
  let currentGroup = "technical";

  for (const item of filteredItems) {
    const lower = item.toLowerCase();
    if (/^(chaussures|chapeau|boissons|en soirée|lunette)/i.test(item)) {
      currentGroup = "equipment";
    } else if (/^(apéritif|randonnée avec|transport|desserts|repas)/i.test(item)) {
      currentGroup = "included";
    }

    if (currentGroup === "technical") technical.push(item);
    else if (currentGroup === "equipment") equipment.push(item);
    else included.push(item);
  }

  return {
    title: h1,
    subtitle: h2Lines[0] || "",
    descriptionParagraphs,
    priceLines,
    technical,
    equipment,
    included,
  };
}

function paragraphsToHtml(paragraphs) {
  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
}

function listToHtml(items) {
  if (!items.length) return "";
  return `<ul>\n${items.map((item) => `  <li>${escapeHtml(item)}</li>`).join("\n")}\n</ul>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inferDurationCategory(technical = [], paragraphs = []) {
  const blob = [...technical, ...paragraphs.join(" ")].join(" ").toLowerCase();
  if (/plusieurs jours|2 jours|deux jours|week-end|weekend/i.test(blob)) {
    return "plusieurs-jours";
  }
  if (/journée complète|journée entière|full day/i.test(blob)) {
    return "journee";
  }
  if (/demi-journée|demi journee|4h|3h|5h|6h|environ \d+h/i.test(blob)) {
    return "demi-journee";
  }
  if (/moins de 3/i.test(blob)) return "moins-3h";
  return "demi-journee";
}

function inferRegion(technical = []) {
  const blob = technical.join(" ").toLowerCase();
  for (const [needle, value] of Object.entries(REGION_MAP)) {
    if (blob.includes(needle)) return value;
  }
  if (blob.includes("crans")) return "crans-montana";
  return null;
}

function buildPriceText(priceLines) {
  if (!priceLines.length) return "";
  return priceLines.join("\n");
}

function inferMinPriceAmount(priceText) {
  const matches = [...priceText.matchAll(/CHF\s*(\d+(?:[.,]\d+)?)/gi)];
  if (!matches.length) return null;
  const amounts = matches.map((m) => Number(m[1].replace(",", ".")));
  return Math.min(...amounts);
}

async function downloadImage(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  return destPath;
}

async function uploadImage(client, filePath, filename) {
  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("image", buffer, { filename });
}

function getScrapeDir() {
  if (process.argv.includes("--scrape-dir")) {
    const idx = process.argv.indexOf("--scrape-dir");
    return path.resolve(process.argv[idx + 1]);
  }
  if (fs.existsSync(DEFAULT_SCRAPE_DIR)) return DEFAULT_SCRAPE_DIR;
  if (fs.existsSync(FALLBACK_SCRAPE_DIR)) return FALLBACK_SCRAPE_DIR;
  throw new Error("Scrape directory not found");
}

function loadExistingKeys(existingDocs) {
  const keys = new Set();
  for (const doc of existingDocs) {
    if (doc.slugFr) keys.add(`slug:${doc.slugFr}`);
    if (doc.title) keys.add(`title:${normalizeText(doc.title)}`);
  }
  return keys;
}

function isDuplicate(parsed, existingKeys, seenKeys) {
  const slugKey = `slug:${parsed.slug}`;
  const titleKey = `title:${normalizeText(parsed.title)}`;

  if (!parsed.title?.trim()) return "empty-title";
  if (SKIP_SLUGS.has(parsed.slug)) return "non-activity-page";
  if (SKIP_TITLE_PATTERNS.some((rx) => rx.test(parsed.title.trim()))) {
    return "non-activity-page";
  }
  if (existingKeys.has(slugKey) || existingKeys.has(titleKey)) return "existing-sanity";
  if (seenKeys.has(slugKey) || seenKeys.has(titleKey)) return "duplicate-scrape";
  return null;
}

async function fetchExistingPrestations(client) {
  return client.fetch(`*[_type == "prestation"]{
    _id,
    "title": title.fr,
    "slugFr": slug.fr.current
  }`);
}

function buildSanityDocument(parsed) {
  const priceTextFr = buildPriceText(parsed.priceLines);
  const minAmount = inferMinPriceAmount(priceTextFr);

  return {
    _type: "prestation",
    title: { fr: parsed.title, en: parsed.title },
    subtitle: { fr: parsed.subtitle, en: parsed.subtitle },
    slug: {
      fr: { _type: "slug", current: parsed.slug },
      en: { _type: "slug", current: parsed.slug },
    },
    shortDescription: { fr: parsed.subtitle, en: parsed.subtitle },
    description: {
      frHtml: paragraphsToHtml(parsed.descriptionParagraphs),
      enHtml: paragraphsToHtml(parsed.descriptionParagraphs),
    },
    technicalDetailsContent: {
      frHtml: listToHtml(parsed.technical),
      enHtml: listToHtml(parsed.technical),
    },
    equipment: {
      frHtml: listToHtml(parsed.equipment),
      enHtml: listToHtml(parsed.equipment),
    },
    included: {
      frHtml: listToHtml(parsed.included),
      enHtml: listToHtml(parsed.included),
    },
    practicalInfo: {},
    priceText: {
      frHtml: priceTextFr,
      enHtml: priceTextFr,
      currency: "CHF",
      ...(minAmount ? { amount: minAmount } : {}),
    },
    durationCategory: parsed.durationCategory,
    region: parsed.region,
    season: ["printemps", "ete", "automne"],
    category: { fr: "randonnee", en: "randonnee" },
    activityReference: parsed.legacyId ? `LEGACY-${parsed.legacyId}` : undefined,
    active: true,
    featured: false,
    publishedAt: new Date().toISOString(),
  };
}

async function parseAllFolders(scrapeDir) {
  const folders = fs
    .readdirSync(scrapeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith("fr_"))
    .map((d) => d.name)
    .sort();

  const parsedItems = [];

  for (const folderName of folders) {
    const folderPath = path.join(scrapeDir, folderName);
    const contentPath = path.join(folderPath, "content.txt");
    const metaPath = path.join(folderPath, "meta.json");
    const urlPath = path.join(folderPath, "url.txt");

    if (!fs.existsSync(contentPath)) continue;

    const { slug, legacyId } = parseFolderName(folderName);
    const content = parseContentTxt(fs.readFileSync(contentPath, "utf8"));
    const meta = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, "utf8"))
      : {};
    const sourceUrl = fs.existsSync(urlPath)
      ? fs.readFileSync(urlPath, "utf8").trim()
      : "";

    const durationCategory = inferDurationCategory(
      content.technical,
      content.descriptionParagraphs
    );
    const region = inferRegion(content.technical);
    const ogImageUrl = meta?.og?.image || null;

    parsedItems.push({
      folderName,
      folderPath,
      slug,
      legacyId,
      sourceUrl,
      ogImageUrl,
      title: content.title || meta.title?.split(" - ")[0] || slug,
      subtitle: content.subtitle || meta.description || "",
      ...content,
      durationCategory,
      region,
    });
  }

  return parsedItems;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const exportPath = process.argv.includes("--export")
    ? process.argv[process.argv.indexOf("--export") + 1]
    : null;
  const scrapeDir = getScrapeDir();
  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nw16vt02",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const existingFile = path.join(ROOT, "scripts", "sanity-existing.json");
  let existingDocs = [];
  if (fs.existsSync(existingFile)) {
    existingDocs = JSON.parse(fs.readFileSync(existingFile, "utf8"));
  } else if (token) {
    existingDocs = await fetchExistingPrestations(client);
  }
  const existingKeys = loadExistingKeys(existingDocs);
  const seenKeys = new Set();

  const allParsed = await parseAllFolders(scrapeDir);
  const toImport = [];
  const skipped = [];

  for (const item of allParsed) {
    const duplicateReason = isDuplicate(item, existingKeys, seenKeys);
    if (duplicateReason) {
      skipped.push({ ...item, reason: duplicateReason });
      continue;
    }
    seenKeys.add(`slug:${item.slug}`);
    seenKeys.add(`title:${normalizeText(item.title)}`);
    toImport.push(item);
  }

  console.log(`Scrape dir: ${scrapeDir}`);
  console.log(`Total folders: ${allParsed.length}`);
  console.log(`To import: ${toImport.length}`);
  console.log(`Skipped: ${skipped.length}`);

  if (skipped.length) {
    console.log("\nSkipped:");
    for (const s of skipped) {
      console.log(`  - [${s.reason}] ${s.title} (${s.slug})`);
    }
  }

  if (dryRun) {
    console.log("\nDry run — first 5 to import:");
    for (const item of toImport.slice(0, 5)) {
      console.log(`  + ${item.title} | ${item.slug} | ${item.ogImageUrl || "no image"}`);
    }
    return;
  }

  if (exportPath) {
    const payloads = toImport.map((item) => ({
      folderName: item.folderName,
      slug: item.slug,
      title: item.title,
      ogImageUrl: item.ogImageUrl,
      content: buildSanityDocument(item),
    }));
    fs.writeFileSync(path.resolve(exportPath), JSON.stringify(payloads, null, 2));
    console.log(`\nExported ${payloads.length} payloads to ${exportPath}`);
    return;
  }

  if (!token) {
    console.error("\nMissing SANITY_API_TOKEN or SANITY_AUTH_TOKEN for import.");
    console.error("Run with --dry-run to preview, or set a write token.");
    process.exit(1);
  }

  const report = { created: [], failed: [] };

  for (const item of toImport) {
    try {
      const doc = buildSanityDocument(item);

      if (item.ogImageUrl) {
        try {
          const ext = path.extname(new URL(item.ogImageUrl).pathname) || ".jpg";
          const localImage = path.join(item.folderPath, `og-import${ext}`);
          await downloadImage(item.ogImageUrl, localImage);
          const asset = await uploadImage(client, localImage, `${item.slug}${ext}`);
          const imageValue = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: item.title,
          };
          doc.thumbnailImage = imageValue;
          doc.bannerImage = imageValue;
        } catch (imageError) {
          console.warn(`  ! Image failed for ${item.slug}: ${imageError.message}`);
        }
      }

      const created = await client.create(doc);
      await client.patch(created._id).set({}).commit();
      const publishedId = created._id.replace(/^drafts\./, "");
      try {
        await client.request({
          uri: `/assets/documents/${publishedId}`,
          method: "GET",
        });
      } catch {
        // ignore
      }

      // Publish via mutation API
      await client.request({
        method: "POST",
        uri: `/data/actions/production/${client.config().dataset}`,
        body: {
          actions: [
            {
              actionType: "sanity.action.document.publish",
              draftId: created._id.startsWith("drafts.")
                ? created._id
                : `drafts.${created._id}`,
              publishedId: created._id.replace(/^drafts\./, ""),
            },
          ],
        },
      }).catch(async () => {
        // Fallback: transaction publish
        const id = created._id.replace(/^drafts\./, "");
        const draft = await client.getDocument(`drafts.${id}`).catch(() => null);
        if (draft) {
          await client.createOrReplace({ ...draft, _id: id });
          await client.delete(`drafts.${id}`).catch(() => {});
        }
      });

      report.created.push({ id: created._id, title: item.title, slug: item.slug });
      console.log(`✓ ${item.title}`);
    } catch (error) {
      report.failed.push({ title: item.title, slug: item.slug, error: error.message });
      console.error(`✗ ${item.title}: ${error.message}`);
    }
  }

  const reportPath = path.join(ROOT, "scripts", "import-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport: ${reportPath}`);
  console.log(`Created: ${report.created.length} | Failed: ${report.failed.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
