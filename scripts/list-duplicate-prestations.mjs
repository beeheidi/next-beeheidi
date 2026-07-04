#!/usr/bin/env node
/**
 * List duplicate prestation IDs to unpublish (keep newest per activityReference).
 * Usage: node scripts/list-duplicate-prestations.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nw16vt02",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const JUNK_SLUGS = new Set(["homepage_page-cdc-list-html", "welcome-swiss-alps", "explore-with-heidi", "espace-presse"]);

async function main() {
  const docs = await client.fetch(`*[_type == "prestation"]{
    _id,
    _updatedAt,
    activityReference,
    "slug": slug.fr.current,
    "title": title.fr
  }`);

  const byRef = new Map();
  for (const doc of docs) {
    const key = doc.activityReference || `slug:${doc.slug}`;
    if (!byRef.has(key)) byRef.set(key, []);
    byRef.get(key).push(doc);
  }

  const toUnpublish = [];
  const toKeep = [];

  for (const [key, group] of byRef.entries()) {
    const sorted = [...group].sort((a, b) => b._updatedAt.localeCompare(a._updatedAt));
    const isJunk = sorted.every((d) => JUNK_SLUGS.has(d.slug));

    if (isJunk) {
      toUnpublish.push(...sorted.map((d) => d._id));
      continue;
    }

    toKeep.push(sorted[0]._id);
    if (sorted.length > 1) {
      toUnpublish.push(...sorted.slice(1).map((d) => d._id));
    }
  }

  console.log(JSON.stringify({ keep: toKeep.length, unpublish: toUnpublish, keepIds: toKeep }, null, 2));
}

main().catch(console.error);
