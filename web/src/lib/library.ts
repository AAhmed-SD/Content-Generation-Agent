import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

/** Library, Inspiration and Ideas. The catalogue is built by scripts/library.mjs; the rest are small JSON files. */
const web = process.cwd();
const root = path.join(web, "..");
const catalogueFile = path.join(web, "data", "library.json");
const pulledFile = path.join(web, "research", "pulled.json");
const ideasFile = path.join(web, "research", "ideas.json");
const inspirationFile = path.join(web, "data", "inspiration.jsonl");
export const outDir = path.join(root, "remotion", "out");

const readJson = <T,>(file: string, fallback: T): T => {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
};

export type Format = { id: string; name: string; kit: string; voice: boolean; shape: string; styles: string[]; examples: string[]; thumb: string | null; video: string | null; fields: string[] };
export type Film = { id: string; niche: string; format: string; voice: string | null; hook: string; video: string | null; thumb: string | null };
export type Catalogue = {
  at: string;
  formats: Format[];
  films: Film[];
  stills: { kind: string; name: string; file: string }[];
  carousels: { name: string; slides: string[] }[];
  references: { name: string; file: string; line: string }[];
};
export const readCatalogue = () => readJson<Catalogue | null>(catalogueFile, null);

export type Pulled = { source: string; name: string; url: string; fit: string; status: string; image?: string };
export const readPulled = () => readJson<{ note: string; items: Pulled[] }>(pulledFile, { note: "", items: [] });
export function keepPulled(item: Pulled) {
  const data = readPulled();
  if (data.items.some((x) => x.url && x.url === item.url)) return;
  data.items.unshift(item);
  writeFileSync(pulledFile, JSON.stringify(data, null, 2) + "\n");
}

export const IDEA_STATUS = ["new", "accepted", "building", "made"] as const;
export type IdeaStatus = (typeof IDEA_STATUS)[number];
export type Idea = { id: string; title: string; kind: string; niche: string; pitch: string; status: IdeaStatus; by: string; at: string; frames?: string[] };
export const readIdeas = () => readJson<{ note: string; ideas: Idea[] }>(ideasFile, { note: "", ideas: [] });
function writeIdeas(data: { note: string; ideas: Idea[] }) {
  writeFileSync(ideasFile, JSON.stringify(data, null, 2) + "\n");
}
export function addIdea(idea: Omit<Idea, "id" | "status" | "at">) {
  const data = readIdeas();
  const next = Math.max(0, ...data.ideas.map((i) => Number(i.id.slice(1)) || 0)) + 1;
  data.ideas.unshift({ ...idea, id: `i${next}`, status: "new", at: new Date().toISOString().slice(0, 10) });
  writeIdeas(data);
}
export function setFrames(id: string, frames: string[]) {
  const data = readIdeas();
  const idea = data.ideas.find((i) => i.id === id);
  if (!idea) return;
  idea.frames = frames;
  writeIdeas(data);
}
export function rejectIdea(id: string) {
  const data = readIdeas();
  data.ideas = data.ideas.filter((i) => i.id !== id);
  writeIdeas(data);
}
export function setIdeaStatus(id: string, status: IdeaStatus) {
  const data = readIdeas();
  const idea = data.ideas.find((i) => i.id === id);
  if (!idea) return;
  idea.status = status;
  writeIdeas(data);
}

export type InspirationItem = { type: "item"; at: string; source: string; title: string; url: string; published: string; summary: string; image: string };
export type InspirationRun = { type: "run"; at: string; feeds: number; new: number; failed: { source: string; error: string }[] };
export function readInspiration() {
  if (!existsSync(inspirationFile)) return { items: [] as InspirationItem[], run: undefined as InspirationRun | undefined };
  const rows = readFileSync(inspirationFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as InspirationItem | InspirationRun];
      } catch {
        return [];
      }
    });
  const items = rows.filter((r): r is InspirationItem => r.type === "item").sort((a, b) => (b.published || b.at).localeCompare(a.published || a.at));
  return { items, run: rows.filter((r): r is InspirationRun => r.type === "run").at(-1) };
}

let busy = false;
/** Read the feeds, then rebuild the catalogue. Both are quick; one at a time. */
export function startInspirationRun() {
  if (busy) return false;
  busy = true;
  const child = spawn("python3", ["-I", path.join(web, "scripts", "inspiration.py")], { cwd: root, stdio: "ignore" });
  child.on("exit", () => (busy = false));
  child.on("error", () => (busy = false));
  return true;
}
export function startCatalogueRun() {
  const child = spawn(process.execPath, [path.join(root, "scripts", "library.mjs")], { cwd: root, stdio: "ignore" });
  return new Promise<void>((resolve) => {
    child.on("exit", () => resolve());
    child.on("error", () => resolve());
  });
}

/** Rejected things. Films and stills move to remotion/rejected/ (gitignored); the rest are hidden by a list. */
const rejectedFile = path.join(web, "research", "rejected.json");
type Rejected = { note: string; formats: string[]; inspiration: string[] };
export const readRejected = () => readJson<Rejected>(rejectedFile, { note: "Hidden from the desk and the library. Remove a line to bring it back.", formats: [], inspiration: [] });
function addRejected(key: "formats" | "inspiration", value: string) {
  const data = readRejected();
  if (!data[key].includes(value)) data[key].push(value);
  writeFileSync(rejectedFile, JSON.stringify(data, null, 2) + "\n");
}
export const rejectFormat = (id: string) => addRejected("formats", id);
export const rejectInspiration = (url: string) => addRejected("inspiration", url);
export function rejectPulled(url: string, name: string) {
  const data = readPulled();
  data.items = data.items.filter((x) => !(x.url === url && x.name === name));
  writeFileSync(pulledFile, JSON.stringify(data, null, 2) + "\n");
}

const remotion = path.join(root, "remotion");
const bin = path.join(remotion, "rejected");
const move = (from: string, to: string) => {
  if (!existsSync(from)) return;
  mkdirSync(path.dirname(to), { recursive: true });
  rmSync(to, { recursive: true, force: true });
  renameSync(from, to);
};
export function rejectFilm(id: string) {
  if (!/^[a-z0-9-]+$/.test(id)) return false;
  const src = path.join(remotion, "src", "world", "bank", id);
  if (!existsSync(path.join(src, "spec.json"))) return false;
  move(src, path.join(bin, id, "src"));
  move(path.join(remotion, "public", "world", "bank", id), path.join(bin, id, "public"));
  move(path.join(outDir, "bank", `offload-${id}.mp4`), path.join(bin, id, `offload-${id}.mp4`));
  rmSync(path.join(web, "public", "library", `${id}.jpg`), { force: true });
  return true;
}
export function rejectStill(file: string) {
  const from = path.resolve(outDir, file);
  if (!from.startsWith(outDir + path.sep) || !/\.png$/.test(from)) return false;
  move(from, path.join(bin, "stills", file));
  return true;
}
/** Rewrite the film index and the catalogue after a film is rejected. */
export function reindex() {
  const run = (args: string[], cwd: string) =>
    new Promise<void>((resolve) => {
      const child = spawn(process.execPath, args, { cwd, stdio: "ignore" });
      child.on("exit", () => resolve());
      child.on("error", () => resolve());
    });
  return run([path.join(remotion, "scripts", "bank.mjs")], remotion).then(() => run([path.join(root, "scripts", "library.mjs")], root));
}
