#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BATCH_DIR = path.join(__dirname, "import-batches");
const MCP_URL = "https://mcp.sanity.io";
const PROJECT_ID = "nw16vt02";
const DATASET = "production";

function getAuthHeader() {
  const token = process.env.SANITY_MCP_AUTH;
  if (token) return `Bearer ${token}`;
  const mcpPath = path.join(process.env.HOME, ".cursor", "mcp.json");
  const cfg = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
  const auth = cfg?.mcpServers?.Sanity?.headers?.Authorization;
  if (!auth) throw new Error("No Sanity MCP auth in SANITY_MCP_AUTH or ~/.cursor/mcp.json");
  return auth.startsWith("Bearer ") ? auth : `Bearer ${auth}`;
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

  const body = JSON.stringify({ jsonrpc: "2.0", id: ++reqId, method, params });
  const res = await fetch(MCP_URL, { method: "POST", headers, body });
  const sid = res.headers.get("mcp-session-id");
  if (sid) sessionId = sid;

  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!res.ok) throw new Error(`MCP HTTP ${res.status}: ${text.slice(0, 500)}`);

  if (ct.includes("text/event-stream")) {
    for (const line of text.split("\n")) {
      if (line.startsWith("data: ")) {
        const data = JSON.parse(line.slice(6));
        if (data.error) throw new Error(JSON.stringify(data.error));
        if (data.result !== undefined) return data.result;
      }
    }
    throw new Error("No result in SSE response");
  }
  const data = JSON.parse(text);
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.result;
}

async function mcpTool(name, args) {
  return mcpRequest("tools/call", { name, arguments: args });
}

function parseToolResult(result) {
  const content = result?.content;
  if (!Array.isArray(content)) return result;
  const text = content.find((c) => c.type === "text")?.text;
  if (!text) return result;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractIds(createResult) {
  const parsed = parseToolResult(createResult);
  if (Array.isArray(parsed)) {
    return parsed.map((d) => d._id || d.id || d.documentId).filter(Boolean);
  }
  if (parsed?.documents) {
    return parsed.documents.map((d) => d._id || d.id).filter(Boolean);
  }
  if (parsed?.ids) return parsed.ids;
  if (typeof parsed === "object" && parsed?._id) return [parsed._id];
  const text = typeof parsed === "string" ? parsed : JSON.stringify(parsed ?? createResult);
  const ids = [...text.matchAll(/<_id>([^<]+)<\/_id>/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

async function main() {
  await mcpRequest("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "beeheidi-import", version: "1.0" },
  });

  const summary = { batches: [], totalCreated: 0, failures: [] };

  for (let n = 0; n <= 5; n++) {
    const batchPath = path.join(BATCH_DIR, `batch-${n}.json`);
    const documents = JSON.parse(fs.readFileSync(batchPath, "utf8"));
    const batchInfo = { batch: n, count: documents.length, ids: [], error: null };

    try {
      const createResult = await mcpTool("create_documents", {
        intent: `Import scraped beeheidi activities batch ${n}`,
        resource: { projectId: PROJECT_ID, dataset: DATASET },
        documents,
      });
      const ids = extractIds(createResult);
      if (!ids.length) {
        const preview = JSON.stringify(parseToolResult(createResult)).slice(0, 800);
        throw new Error(`No IDs in create response: ${preview}`);
      }
      batchInfo.ids = ids;
      summary.totalCreated += ids.length;

      await mcpTool("publish_documents", {
        intent: `Publish scraped beeheidi activities batch ${n}`,
        resource: { projectId: PROJECT_ID, dataset: DATASET },
        ids,
      });
      console.log(`batch-${n}: created & published ${ids.length} docs`);
    } catch (e) {
      batchInfo.error = e.message;
      summary.failures.push({ batch: n, error: e.message });
      console.error(`batch-${n} FAILED:`, e.message);
    }
    summary.batches.push(batchInfo);
  }

  const queryResult = await mcpTool("query_documents", {
    intent: "Count prestations after import",
    resource: { projectId: PROJECT_ID, dataset: DATASET },
    query: 'count(*[_type == "prestation"])',
    single: true,
    perspective: "published",
  });
  summary.finalCount = parseToolResult(queryResult);
  console.log("\n=== SUMMARY ===");
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
