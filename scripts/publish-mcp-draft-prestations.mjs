#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Reuse MCP helpers by dynamic import of the main module - duplicate minimal client instead

const MCP_URL = "https://mcp.sanity.io";
const PROJECT_ID = "nw16vt02";
const DATASET = "production";

function getAuthHeader() {
  const mcpPath = path.join(process.env.HOME, ".cursor", "mcp.json");
  const cfg = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
  return cfg.mcpServers.Sanity.headers.Authorization;
}

let sessionId = null;
let reqId = 0;

async function mcpRequest(method, params) {
  const headers = {
    Authorization: getAuthHeader(),
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: ++reqId, method, params }),
  });
  const sid = res.headers.get("mcp-session-id");
  if (sid) sessionId = sid;
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  if (ct.includes("text/event-stream")) {
    for (const line of text.split("\n")) {
      if (line.startsWith("data: ")) {
        const data = JSON.parse(line.slice(6));
        if (data.error) throw new Error(JSON.stringify(data.error));
        if (data.result !== undefined) return data.result;
      }
    }
    throw new Error("No SSE result");
  }
  const data = JSON.parse(text);
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.result;
}

function parseText(result) {
  const content = result?.content;
  const text = Array.isArray(content) ? content.find((c) => c.type === "text")?.text : null;
  return text ?? result;
}

function extractIdsFromText(text) {
  const t = String(text);
  const xml = [...t.matchAll(/<_id>([^<]+)<\/_id>/g)].map((m) => m[1]);
  const json = [...t.matchAll(/"_id":\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set([...xml, ...json])];
}

async function mcpTool(name, args) {
  return mcpRequest("tools/call", { name, arguments: args });
}

async function main() {
  await mcpRequest("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "beeheidi-publish", version: "1.0" },
  });

  const queryResult = await mcpTool("query_documents", {
    intent: "List draft prestations to publish",
    resource: { projectId: PROJECT_ID, dataset: DATASET },
    query: '*[_type == "prestation" && _id in path("drafts.**")]{ _id }[0...100]',
    limit: 100,
    perspective: "raw",
  });
  const text = parseText(queryResult);
  const ids = extractIdsFromText(text);
  console.log(`Found ${ids.length} draft prestation(s) to publish`);
  if (!ids.length) return;

  for (let i = 0; i < ids.length; i += 20) {
    const chunk = ids.slice(i, i + 20);
    await mcpTool("publish_documents", {
      intent: "Publish scraped beeheidi draft prestations",
      resource: { projectId: PROJECT_ID, dataset: DATASET },
      ids: chunk,
    });
    console.log(`Published ${chunk.length} (total ${Math.min(i + 20, ids.length)}/${ids.length})`);
  }

  const countResult = await mcpTool("query_documents", {
    intent: "Count published prestations",
    resource: { projectId: PROJECT_ID, dataset: DATASET },
    query: 'count(*[_type == "prestation"])',
    single: true,
    perspective: "published",
  });
  console.log("Final count:", parseText(countResult));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
