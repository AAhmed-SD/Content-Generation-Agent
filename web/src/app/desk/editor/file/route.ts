import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { noteRevision, publish, publishVectra, readers, subscribe, type LiveEvent } from "@/lib/live-desk";
import { runEditorTools, type EditorCall } from "@/lib/editor-tools";
import { cleanScene, type Scene } from "@/lib/scene";
import type { PersonId } from "@/lib/people";
import { boardPath, editPath, readPictureText, workingPath } from "@/lib/picture-text";
import { readSession } from "@/lib/session";

const fonts = new Set(["serif", "sans", "script"]);

function mediaType(file: string) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

function docPath(name: string) {
  const image = editPath(name);
  return image ? image.replace(/\.jpg$/, ".json") : "";
}

function scenePath(name: string) {
  const image = editPath(name);
  return image ? image.replace(/\.jpg$/, ".scene.json") : "";
}

function vectraPath(name: string) {
  const image = editPath(name);
  return image ? image.replace(/\.jpg$/, ".vectra.json") : "";
}

type VectraStep = { at: string; by: PersonId; label: string; data: unknown };
type VectraFile = { revision: number; by: PersonId | ""; savedAt: string; label: string; data: unknown; steps: VectraStep[] };

function readVectra(name: string): VectraFile | null {
  const file = vectraPath(name);
  if (!file || !existsSync(file)) return null;
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as VectraFile;
    if (!parsed?.data || typeof parsed.data !== "object") return null;
    return { ...parsed, steps: Array.isArray(parsed.steps) ? parsed.steps : [] };
  } catch {
    return null;
  }
}

function stepList(stored: VectraFile) {
  return stored.steps.map((step, index) => ({ index, at: step.at, by: step.by, label: step.label }));
}

function rememberVectra(name: string, by: PersonId, data: unknown, label: string) {
  const file = vectraPath(name);
  if (!file || !data || typeof data !== "object" || !("doc" in (data as object))) return null;
  const previous = readVectra(name);
  if (previous && JSON.stringify(previous.data) === JSON.stringify(data)) return previous;
  const steps = previous
    ? [{ at: previous.savedAt, by: previous.by || by, label: previous.label || "Change", data: previous.data }, ...previous.steps].slice(0, 12)
    : [];
  const stored: VectraFile = {
    revision: (previous?.revision ?? 0) + 1,
    by,
    savedAt: new Date().toISOString(),
    label: label.slice(0, 80) || "Change",
    data,
    steps,
  };
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(stored));
  publishVectra(name, by, stored.label, stored.revision);
  return stored;
}

function vectraResponse(name: string, step: string | null) {
  const stored = readVectra(name);
  if (!stored) return { data: null, revision: 0, by: "", savedAt: "", label: "", steps: [], present: readers(name) };
  if (step !== null && step !== "") {
    const found = stored.steps[Number(step)];
    if (!found) return { data: null, missing: true };
    return { data: found.data, label: found.label, by: found.by, at: found.at };
  }
  return {
    data: stored.data,
    revision: stored.revision,
    by: stored.by,
    savedAt: stored.savedAt,
    label: stored.label,
    steps: stepList(stored),
    present: readers(name),
  };
}

function assetDir(name: string) {
  const image = editPath(name);
  return image ? path.join(path.dirname(image), `${path.basename(image, ".jpg")}-assets`) : "";
}

function assetFile(name: string, id: string) {
  if (!/^a\d+$/.test(id)) return "";
  const dir = assetDir(name);
  if (!dir || !existsSync(dir)) return "";
  return readdirSync(dir)
    .filter((file) => file.startsWith(`${id}.`))
    .map((file) => path.join(dir, file))[0] ?? "";
}

function readStored(name: string): { scene: Scene | null; revision: number; by: PersonId | ""; savedAt: string } {
  const empty = { scene: null as Scene | null, revision: 0, by: "" as PersonId | "", savedAt: "" };
  const file = scenePath(name);
  if (!file || !existsSync(file)) return empty;
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as { scene?: unknown; revision?: unknown; by?: unknown; savedAt?: unknown };
    const revision = typeof parsed.revision === "number" ? parsed.revision : 0;
    const scene = cleanScene(revision && parsed.scene ? parsed.scene : parsed);
    const by = parsed.by === "hadiqa" || parsed.by === "laiba" ? parsed.by : "";
    const savedAt = typeof parsed.savedAt === "string" ? parsed.savedAt : "";
    if (scene) noteRevision(name, revision);
    return { scene, revision, by, savedAt };
  } catch {
    return empty;
  }
}

function remember(name: string, scene: Scene, by: PersonId, floor = 0) {
  const dest = scenePath(name);
  if (!dest) return null;
  noteRevision(name, Math.max(readStored(name).revision, floor));
  const update = publish(name, scene, by);
  if (update.kind !== "scene") return null;
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, JSON.stringify({ revision: update.revision, by: update.by, savedAt: update.savedAt, scene }));
  return update;
}

function liftScene(name: string): Scene | null {
  const image = boardPath(name);
  const dir = assetDir(name);
  const dest = scenePath(name);
  if (!image || !dir || !dest) return null;
  mkdirSync(dir, { recursive: true });
  const script = path.join(process.cwd(), "scripts", "lift-picture.py");
  const python = existsSync("/opt/homebrew/bin/python3") ? "/opt/homebrew/bin/python3" : "python3";
  const result = spawnSync(python, [script, image, dir], { encoding: "utf8", timeout: 120_000, maxBuffer: 12_000_000 });
  if (result.status !== 0) return null;
  const scene = cleanScene(JSON.parse(result.stdout || "null"));
  if (!scene) return null;
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, JSON.stringify(scene));
  return scene;
}

function cleanTexts(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 40).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const text = String(row.text ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
    const color = typeof row.color === "string" && /^#[0-9a-fA-F]{6}$/.test(row.color) ? row.color : "";
    const font = typeof row.font === "string" && fonts.has(row.font) ? row.font : "serif";
    const x = Number(row.x);
    const y = Number(row.y);
    const size = Number(row.size);
    if (!text || !color || ![x, y, size].every(Number.isFinite)) return [];
    return [{ id: String(row.id ?? "").slice(0, 40) || `t-${x}-${y}`, text, x, y, size: Math.max(12, Math.min(400, size)), color, font }];
  });
}

export async function GET(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const url = new URL(request.url);
  const name = url.searchParams.get("file") ?? "";
  if (!editPath(name) && !workingPath(name)) return new Response("Missing picture.", { status: 404 });
  if (url.searchParams.get("read") === "1") return Response.json(readPictureText(name));
  if (url.searchParams.get("live") === "1") return liveStream(name, person.id);
  if (url.searchParams.get("decompose") === "1") {
    const floor = readStored(name).revision;
    const scene = liftScene(name);
    if (!scene) return Response.json({ scene: null }, { status: 422 });
    const saved = remember(name, scene, person.id, floor);
    return Response.json({ scene, revision: saved?.revision ?? 0, by: person.id, savedAt: saved?.savedAt ?? "" });
  }
  if (url.searchParams.get("scene") === "1") {
    const stored = readStored(name);
    return Response.json({ scene: stored.scene, revision: stored.revision, by: stored.by, savedAt: stored.savedAt, present: readers(name) });
  }
  if (url.searchParams.get("vectra") === "1") return Response.json(vectraResponse(name, url.searchParams.get("step")));
  const asset = url.searchParams.get("asset") ?? "";
  if (asset) {
    const file = assetFile(name, asset);
    if (!file) return new Response("Missing picture.", { status: 404 });
    return new Response(readFileSync(file), {
      headers: { "Content-Type": mediaType(file), "Cache-Control": "no-store" },
    });
  }
  if (url.searchParams.get("doc") === "1") {
    const file = docPath(name);
    if (!file || !existsSync(file)) return Response.json({ texts: [] });
    try {
      const parsed = JSON.parse(readFileSync(file, "utf8")) as { texts?: unknown };
      return Response.json({ texts: cleanTexts(parsed.texts) });
    } catch {
      return Response.json({ texts: [] });
    }
  }
  const file = workingPath(name);
  return new Response(readFileSync(file), {
    headers: { "Content-Type": mediaType(file), "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const url = new URL(request.url);
  const name = url.searchParams.get("file") ?? "";
  if (url.searchParams.get("decompose") === "1") {
    const floor = readStored(name).revision;
    const scene = liftScene(name);
    if (!scene) return Response.json({ scene: null }, { status: 422 });
    const saved = remember(name, scene, person.id, floor);
    return Response.json({ scene, revision: saved?.revision ?? 0, by: person.id, savedAt: saved?.savedAt ?? "" });
  }
  if (url.searchParams.get("tools") === "1") {
    const stored = readStored(name);
    if (!stored.scene) return Response.json({ error: "No picture is open." }, { status: 404 });
    const body = (await request.json().catch(() => null)) as { calls?: EditorCall[] } | null;
    const calls = Array.isArray(body?.calls) ? body.calls.slice(0, 40) : [];
    if (!calls.length) return Response.json({ error: "No tool calls." }, { status: 400 });
    const result = runEditorTools(stored.scene, calls, "claude");
    if (result.error) return Response.json({ error: result.error }, { status: 400 });
    const scene = cleanScene(result.scene);
    if (!scene) return Response.json({ error: "The picture could not be saved." }, { status: 400 });
    const saved = remember(name, scene, person.id);
    if (!saved) return Response.json({ error: "Missing picture." }, { status: 404 });
    return Response.json({ revision: saved.revision, by: saved.by, savedAt: saved.savedAt, scene });
  }
  if (url.searchParams.get("vectra") === "1") {
    const text = await request.text();
    if (text.length > 18_000_000) return new Response("That picture is too large to share.", { status: 413 });
    let body: { data?: unknown; label?: string } | null = null;
    try {
      body = JSON.parse(text) as { data?: unknown; label?: string };
    } catch {
      return new Response("The document could not be read.", { status: 400 });
    }
    const saved = rememberVectra(name, person.id, body?.data, typeof body?.label === "string" ? body.label : "Change");
    if (!saved) return new Response("The document could not be read.", { status: 400 });
    return Response.json({ revision: saved.revision, by: saved.by, savedAt: saved.savedAt, label: saved.label, steps: stepList(saved) });
  }
  if (url.searchParams.get("scene") === "1") {
    const scene = cleanScene(await request.json().catch(() => null));
    if (!scene || !scenePath(name)) return new Response("The document could not be read.", { status: 400 });
    const saved = remember(name, scene, person.id);
    if (!saved) return new Response("Missing picture.", { status: 404 });
    return Response.json({ savedAt: saved.savedAt, revision: saved.revision, by: saved.by });
  }
  if (url.searchParams.get("asset") === "1") {
    const dir = assetDir(name);
    if (!dir) return new Response("Missing picture.", { status: 404 });
    const kind = request.headers.get("content-type") ?? "";
    const ext = kind.includes("png") ? "png" : kind.includes("webp") ? "webp" : kind.includes("jpeg") ? "jpg" : "";
    if (!ext) return new Response("Use a PNG, JPEG, or WebP.", { status: 400 });
    const bytes = Buffer.from(await request.arrayBuffer());
    if (bytes.length < 32 || bytes.length > 24_000_000) return new Response("That picture is the wrong size.", { status: 400 });
    const id = `a${Date.now()}${Math.floor(Math.random() * 1000)}`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, `${id}.${ext}`), bytes);
    return Response.json({ id, src: `asset:${id}` });
  }
  const dest = url.searchParams.get("doc") === "1" ? docPath(name) : editPath(name);
  if (!dest) return new Response("Missing picture.", { status: 404 });
  mkdirSync(path.dirname(dest), { recursive: true });
  if (url.searchParams.get("doc") === "1") {
    const body = (await request.json().catch(() => null)) as { texts?: unknown } | null;
    writeFileSync(dest, JSON.stringify({ texts: cleanTexts(body?.texts) }));
    return Response.json({ savedAt: new Date().toISOString() });
  }
  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length < 100 || bytes.length > 8_000_000) return new Response("That picture is the wrong size.", { status: 400 });
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return new Response("Send a JPEG.", { status: 400 });
  writeFileSync(dest, bytes);
  return Response.json({ savedAt: new Date().toISOString() });
}

function liveStream(name: string, person: PersonId) {
  if (!scenePath(name)) return new Response("Missing picture.", { status: 404 });
  const encoder = new TextEncoder();
  let close = () => {};
  const stream = new ReadableStream({
    start(controller) {
      const send = (event: LiveEvent) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          close();
        }
      };
      const stored = readStored(name);
      if (stored.scene) send({ kind: "scene", revision: stored.revision, by: stored.by || person, savedAt: stored.savedAt, scene: stored.scene });
      const unsubscribe = subscribe(name, person, send);
      const beat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: beat\n\n`));
        } catch {
          close();
        }
      }, 15000);
      close = () => {
        clearInterval(beat);
        unsubscribe();
      };
    },
    cancel() {
      close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function DELETE(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const name = new URL(request.url).searchParams.get("file") ?? "";
  for (const file of [editPath(name), docPath(name)]) {
    if (file && existsSync(file)) unlinkSync(file);
  }
  return Response.json({ savedAt: "" });
}
