#!/usr/bin/env node
/**
 * Push prepared import batches to Sanity.
 * Requires SANITY_API_TOKEN or SANITY_AUTH_TOKEN with write access.
 *
 *   SANITY_API_TOKEN=xxx node scripts/push-import-to-sanity.mjs
 */

import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BATCH_DIR = path.join(__dirname, "import-batches");
const PAYLOADS_FILE = path.join(__dirname, "import-payloads.json");

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_TOKEN or SANITY_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nw16vt02",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const payloads = JSON.parse(fs.readFileSync(PAYLOADS_FILE, "utf8"));
const payloadBySlug = new Map(payloads.map((p) => [p.slug, p]));

async function downloadImage(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  return destPath;
}

async function uploadImage(filePath, filename) {
  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("image", buffer, { filename });
}

async function publishDocument(documentId) {
  const id = documentId.replace(/^drafts\./, "");
  const draftId = `drafts.${id}`;
  const draft = await client.getDocument(draftId).catch(() => null);
  const source = draft || (await client.getDocument(id));
  if (!source) return;
  const { _rev, _createdAt, _updatedAt, ...doc } = source;
  await client.createOrReplace({ ...doc, _id: id });
  await client.delete(draftId).catch(() => {});
}

async function importOne(entry) {
  const doc = structuredClone(entry.content);

  if (entry.ogImageUrl) {
    try {
      const ext = path.extname(new URL(entry.ogImageUrl).pathname) || ".jpg";
      const localPath = path.join("/tmp", `beeheidi-import-${entry.slug}${ext}`);
      await downloadImage(entry.ogImageUrl, localPath);
      const asset = await uploadImage(localPath, `${entry.slug}${ext}`);
      const imageValue = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: entry.title,
      };
      doc.thumbnailImage = imageValue;
      doc.bannerImage = imageValue;
    } catch (error) {
      console.warn(`  ! image skipped (${entry.slug}): ${error.message}`);
    }
  }

  const created = await client.create(doc);
  await publishDocument(created._id);
  return created._id.replace(/^drafts\./, "");
}

async function main() {
  const report = { created: [], failed: [] };
  console.log(`Importing ${payloads.length} activités...\n`);

  for (const entry of payloads) {
    try {
      const id = await importOne(entry);
      report.created.push({ id, slug: entry.slug, title: entry.title });
      console.log(`✓ ${entry.title}`);
    } catch (error) {
      report.failed.push({ slug: entry.slug, title: entry.title, error: error.message });
      console.error(`✗ ${entry.title}: ${error.message}`);
    }
  }

  const reportPath = path.join(__dirname, "import-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nTerminé: ${report.created.length} créées, ${report.failed.length} échecs`);
  console.log(`Rapport: ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
