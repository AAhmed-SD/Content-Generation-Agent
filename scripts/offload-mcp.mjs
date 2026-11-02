import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function send(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
}

function result(id, text) {
  send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
}

function readJson(file) {
  return JSON.parse(readFileSync(path.join(root, file), "utf8"));
}

const tools = [
  {
    name: "offload_stages",
    description: "The allowlist. Research, writing, voice, picture, and what this desk will not call.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "offload_week",
    description: "This week's sixteen cards: niche, stamps, script source, and render status. No captions and no secrets.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "offload_research",
    description: "Whether Reddit, the web, YouTube, and the Virlo keyword pass hit, failed, or were skipped.",
    inputSchema: { type: "object", properties: {} },
  },
];

function call(name) {
  if (name === "offload_stages") return JSON.stringify(readJson("brand/stages.json"), null, 2);
  if (name === "offload_week") {
    const pieces = readJson("web/data/desk.json");
    return pieces
      .map(
        (piece) =>
          `${piece.id} · stamps ${piece.stamps.length} · script ${piece.script?.source ?? "template"} · render ${piece.render?.status ?? "idle"}`,
      )
      .join("\n");
  }
  if (name === "offload_research") {
    try {
      const research = readJson("web/data/research.json");
      return research.sources.map((source) => `${source.niche} ${source.name}: ${source.status}. ${source.detail}`).join("\n");
    } catch {
      return "No research file for this week.";
    }
  }
  return "That tool is not on the allowlist.";
}

function handle(message) {
  if (!message || message.jsonrpc !== "2.0") return;
  if (message.method === "initialize") {
    send({
      jsonrpc: "2.0",
      id: message.id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "offload", version: "1.0.0" },
      },
    });
    return;
  }
  if (message.method === "notifications/initialized") return;
  if (message.method === "tools/list") {
    send({ jsonrpc: "2.0", id: message.id, result: { tools } });
    return;
  }
  if (message.method === "tools/call") {
    result(message.id, call(message.params?.name));
    return;
  }
  if (message.id !== undefined) {
    send({ jsonrpc: "2.0", id: message.id, error: { code: -32601, message: "Method not found" } });
  }
}

let buffer = Buffer.alloc(0);
process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (buffer.length) {
    if (buffer[0] === 123) {
      const end = buffer.indexOf("\n");
      if (end === -1) return;
      const line = buffer.slice(0, end).toString();
      buffer = buffer.slice(end + 1);
      try {
        handle(JSON.parse(line));
      } catch {
        // Wait for a complete line.
      }
      continue;
    }
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) return;
    const match = buffer.slice(0, headerEnd).toString().match(/Content-Length: (\d+)/i);
    if (!match) {
      buffer = Buffer.alloc(0);
      return;
    }
    const length = Number(match[1]);
    const start = headerEnd + 4;
    if (buffer.length < start + length) return;
    const body = buffer.slice(start, start + length).toString();
    buffer = buffer.slice(start + length);
    handle(JSON.parse(body));
  }
});
