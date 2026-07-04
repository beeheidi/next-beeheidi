#!/usr/bin/env node
/**
 * Migre le contenu HTML existant vers les champs *Html du schéma hybride
 * et corrige priceText.amount si manquant.
 *
 * Usage:
 *   node scripts/migrate-prestations-to-hybrid-html.mjs --dry-run
 *   SANITY_API_TOKEN=xxx node scripts/migrate-prestations-to-hybrid-html.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nw16vt02",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const LOCALIZED_FIELDS = [
  "description",
  "technicalDetailsContent",
  "equipment",
  "practicalInfo",
  "included",
];

function isPortableText(value) {
  return (
    Array.isArray(value) &&
    value.some((block) => block?._type === "block")
  );
}

function portableTextToHtml(blocks) {
  if (!isPortableText(blocks)) return null;

  return blocks
    .map((block) => {
      if (block._type !== "block") return "";

      const text = (block.children || [])
        .map((child) => {
          let content = child.text || "";
          for (const mark of child.marks || []) {
            if (mark === "strong") content = `<strong>${content}</strong>`;
            if (mark === "em") content = `<em>${content}</em>`;
          }
          return content;
        })
        .join("");

      if (block.listItem === "bullet") return `<li>${text}</li>`;
      if (block.style === "h3") return `<h3>${text}</h3>`;
      return `<p>${text}</p>`;
    })
    .join("\n");
}

function moveToHtmlField(fieldValue) {
  if (!fieldValue || typeof fieldValue !== "object") return null;

  const patch = { ...fieldValue };
  let changed = false;

  for (const locale of ["fr", "en"]) {
    const htmlKey = `${locale}Html`;
    const value = fieldValue[locale];

    if (fieldValue[htmlKey]?.trim()) continue;

    if (typeof value === "string" && value.trim()) {
      patch[htmlKey] = value;
      patch[locale] = [];
      changed = true;
      continue;
    }

    if (isPortableText(value) && value.length > 0) {
      const html = portableTextToHtml(value);
      if (html?.trim()) {
        patch[htmlKey] = html;
        patch[locale] = [];
        changed = true;
      }
    }
  }

  return changed ? patch : null;
}

function inferMinPriceAmount(text) {
  const blob = typeof text === "string" ? text : "";
  const matches = [...blob.matchAll(/CHF\s*(\d+(?:[.,]\d+)?)/gi)];
  if (!matches.length) return null;
  return Math.min(...matches.map((m) => Number(m[1].replace(",", "."))));
}

function migratePriceText(priceText) {
  if (!priceText) return null;

  const patch = { ...priceText };
  let changed = false;

  for (const locale of ["fr", "en"]) {
    const htmlKey = `${locale}Html`;
    const value = priceText[locale];

    if (priceText[htmlKey]?.trim()) continue;

    if (typeof value === "string" && value.trim()) {
      patch[htmlKey] = value;
      patch[locale] = [];
      changed = true;
      continue;
    }

    if (isPortableText(value) && value.length > 0) {
      const lines = value
        .map((block) => block.children?.map((c) => c.text).join("") || "")
        .filter(Boolean);
      if (lines.length) {
        patch[htmlKey] = lines.map((line) => `<p>${line}</p>`).join("\n");
        patch[locale] = [];
        changed = true;
      }
    }
  }

  if (!priceText.amount) {
    const source =
      patch.frHtml || patch.enHtml || priceText.frHtml || priceText.enHtml ||
      (typeof priceText.fr === "string" ? priceText.fr : "");
    const amount = inferMinPriceAmount(source);
    if (amount != null) {
      patch.amount = amount;
      changed = true;
    }
  }

  if (!priceText.currency) {
    patch.currency = "CHF";
    changed = true;
  }

  return changed ? patch : null;
}

function buildPatch(doc) {
  const patch = {};
  let changed = false;

  for (const field of LOCALIZED_FIELDS) {
    const migrated = moveToHtmlField(doc[field]);
    if (migrated) {
      patch[field] = migrated;
      changed = true;
    }
  }

  const pricePatch = migratePriceText(doc.priceText);
  if (pricePatch) {
    patch.priceText = pricePatch;
    changed = true;
  }

  return changed ? patch : null;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (!dryRun && !process.env.SANITY_API_TOKEN) {
    console.error("SANITY_API_TOKEN requis (ou --dry-run)");
    process.exit(1);
  }

  const docs = await client.fetch(`*[_type == "prestation"]{
    _id,
    title,
    description,
    technicalDetailsContent,
    equipment,
    practicalInfo,
    included,
    priceText
  }`);

  let updated = 0;

  for (const doc of docs) {
    const patch = buildPatch(doc);
    if (!patch) continue;

    updated += 1;
    console.log(`→ ${doc.title?.fr || doc._id}`);

    if (!dryRun) {
      await client.patch(doc._id).set(patch).commit();
    }
  }

  console.log(
    dryRun
      ? `${updated} document(s) à migrer (dry-run)`
      : `${updated} document(s) migré(s)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
