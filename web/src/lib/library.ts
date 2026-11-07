import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import { db, isLocal, queueJob, syncToDb } from "@/lib/db";

/** Library, Inspiration and Ideas. The catalogue is built by scripts/library.mjs; ideas, inspiration, pulled and rejected live in Supabase. */
const web = process.cwd();
const root = path.join(web, "..");
const catalogueFile = path.join(web, "data", "library.json");
export const outDir = path.join(root, "remotion", "out");

const readJson = <T,>(file: string, fallback: T): T => {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
};

export type Format = { id: string; name: string; kit: string; voice: boolean; shape: string; styles: string[]; examples: string[]; thumb: string | null; video: string | null; strip?: string[]; fields: string[] };
export type Film = { id: string; niche: string; format: string; voice: string | null; hook: string; video: string | null; thumb: string | null };
export type Catalogue = {
  at: string;
  formats: Format[];
  films: Film[];
  stills: { kind: string; name: string; file: string }[];
  carousels: { name: string; slides: string[] }[];
  references: { name: string; file: string; line: string }[];
};
/** The catalogue: the latest copy uploaded by scripts/sync-to-db.mjs (so Vercel can read it), else the local file. */
export async function readCatalogue(): Promise<Catalogue | null> {
  try {
    const [row] = await db()`select detail from runs where kind = 'catalogue' order by at desc limit 1`;
    if (row) return row.detail as Catalogue;
  } catch {}
  return readJson<Catalogue | null>(catalogueFile, null);
}

export type Pulled = { source: string; name: string; url: string; fit: string; status: string; image?: string };
export async function readPulled(): Promise<{ note: string; items: Pulled[] }> {
  const rows = await db()`select source, name, coalesce(url, '') as url, coalesce(fit, '') as fit, status, image from pulled order by created_at desc`;
  return { note: "Things pulled from outside that fit Offload. Keep adds to this list.", items: rows.map((r) => ({ source: r.source ?? "", name: r.name, url: r.url, fit: r.fit, status: r.status, image: r.image ?? undefined })) };
}
export async function keepPulled(item: Pulled) {
  const sql = db();
  const [seen] = await sql`select 1 from pulled where url = ${item.url} limit 1`;
  if (seen && item.url) return;
  await sql`insert into pulled (source, name, url, image, fit, status) values (${item.source}, ${item.name}, ${item.url}, ${item.image ?? null}, ${item.fit}, ${item.status})`;
}

export const IDEA_STATUS = ["new", "accepted", "building", "made"] as const;
export type IdeaStatus = (typeof IDEA_STATUS)[number];
export type Idea = { id: string; title: string; kind: string; niche: string; pitch: string; status: IdeaStatus; by: string; at: string; frames?: string[] };
export async function readIdeas(): Promise<{ note: string; ideas: Idea[] }> {
  const rows = await db()`select id, title, coalesce(kind, '') as kind, coalesce(niche, 'all') as niche, coalesce(pitch, '') as pitch, status, frames, coalesce(by, '') as by, coalesce(to_char(at, 'YYYY-MM-DD'), '') as at from ideas order by created_at desc`;
  return { note: "", ideas: rows.map((r) => ({ id: r.id, title: r.title, kind: r.kind, niche: r.niche, pitch: r.pitch, status: r.status, by: r.by, at: r.at, frames: (r.frames as string[]) ?? [] })) };
}
export async function addIdea(idea: Omit<Idea, "id" | "status" | "at">) {
  const sql = db();
  await sql`insert into ideas (id, title, kind, niche, pitch, status, frames, by, at)
    values (${"i" + Date.now().toString(36)}, ${idea.title}, ${idea.kind}, ${idea.niche}, ${idea.pitch}, 'new', ${sql.json(idea.frames ?? [])}, ${idea.by}, current_date)`;
}
export async function setFrames(id: string, frames: string[]) {
  const sql = db();
  await sql`update ideas set frames = ${sql.json(frames)} where id = ${id}`;
}
export async function rejectIdea(id: string) {
  await db()`delete from ideas where id = ${id}`;
}
export async function setIdeaStatus(id: string, status: IdeaStatus) {
  await db()`update ideas set status = ${status} where id = ${id}`;
}

export type InspirationItem = { type: "item"; at: string; source: string; title: string; url: string; published: string; summary: string; image: string };
export type InspirationRun = { type: "run"; at: string; feeds: number; new: number; failed: { source: string; error: string }[] };
export async function readInspiration(): Promise<{ items: InspirationItem[]; run: InspirationRun | undefined }> {
  const sql = db();
  const rows = await sql`select url, coalesce(source, '') as source, coalesce(title, '') as title, coalesce(image, '') as image, coalesce(summary, '') as summary,
    coalesce(to_char(published_at at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'), '') as published, to_char(collected_at at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as at
    from inspiration_items order by coalesce(published_at, collected_at) desc limit 400`;
  const [run] = await sql`select at, detail from runs where kind = 'inspiration' order by at desc limit 1`;
  return {
    items: rows.map((r) => ({ type: "item" as const, at: r.at, source: r.source, title: r.title, url: r.url, published: r.published, summary: r.summary, image: r.image })),
    run: run ? { type: "run", at: new Date(run.at).toISOString(), ...(run.detail as { feeds: number; new: number; failed: { source: string; error: string }[] }) } : undefined,
  };
}

let busy = false;
/** Read the feeds, then rebuild the catalogue. Both are quick; one at a time. */
export async function startInspirationRun() {
  if (!isLocal()) {
    await queueJob("inspiration");
    return true;
  }
  if (busy) return false;
  busy = true;
  const child = spawn("python3", ["-I", path.join(web, "scripts", "inspiration.py")], { cwd: root, stdio: "ignore" });
  child.on("exit", () => {
    busy = false;
    void syncToDb();
  });
  child.on("error", () => (busy = false));
  return true;
}
export async function startCatalogueRun() {
  if (!isLocal()) {
    await queueJob("catalogue");
    return;
  }
  const child = spawn(process.execPath, [path.join(root, "scripts", "library.mjs")], { cwd: root, stdio: "ignore" });
  await new Promise<void>((resolve) => {
    child.on("exit", () => resolve());
    child.on("error", () => resolve());
  });
  await syncToDb();
}

/** Rejected things. Films and stills move to remotion/rejected/ (gitignored, on the Mac); the rest are hidden by a list. */
type Rejected = { note: string; formats: string[]; inspiration: string[] };
export async function readRejected(): Promise<Rejected> {
  const rows = await db()`select kind, value from rejected`;
  return {
    note: "Hidden from the desk and the library.",
    formats: rows.filter((r) => r.kind === "format").map((r) => r.value),
    inspiration: rows.filter((r) => r.kind === "inspiration").map((r) => r.value),
  };
}
const addRejected = async (kind: "format" | "inspiration", value: string) => {
  await db()`insert into rejected (kind, value) values (${kind}, ${value}) on conflict do nothing`;
};
export const rejectFormat = (id: string) => addRejected("format", id);
export const rejectInspiration = (url: string) => addRejected("inspiration", url);
export async function rejectPulled(url: string, name: string) {
  await db()`delete from pulled where coalesce(url, '') = ${url} and name = ${name}`;
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
