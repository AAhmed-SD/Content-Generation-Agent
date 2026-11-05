"use server";

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { brandDoc, brandFileEditable, writeBrandFile } from "@/lib/brand";
import { askClaude, parseScript, publicClaudeError } from "@/lib/claude";
import { kokoroPaths } from "@/lib/local";
import { canStamp, clearScript, fillCaptions, findPiece, isReady, readDesk, writeDesk, type Checkpoint } from "@/lib/desk";
import { applyRows, parseMetricsCsv, saveLesson, storeCsv, storeTyped } from "@/lib/loop";
import { isPersonId } from "@/lib/people";
import { WEEK, applyDrafts, compileBriefs, gatherResearch, readBriefs, readResearch } from "@/lib/pipeline";
import { drawOffloadPin, isPinLayout } from "@/lib/pin-picture";
import { isNicheId, writePin } from "@/lib/pin-draft";
import { writeScripts } from "@/lib/prepare";
import { claudePrompt, queueRender } from "@/lib/studio";
import { COOKIE, passwordMatches, readSession, sessionCookieValue } from "@/lib/session";

export type SignInState = { error?: string };

export async function signIn(_state: SignInState, formData: FormData): Promise<SignInState> {
  const who = String(formData.get("who") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!isPersonId(who) || !passwordMatches(who, password)) {
    return { error: "That name and password do not open the desk." };
  }
  const jar = await cookies();
  jar.set(COOKIE, await sessionCookieValue(who), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/desk/home");
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect("/");
}

export async function stampPiece(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece || !canStamp(piece, person.id)) redirect("/desk");
  piece.stamps = [...piece.stamps, person.id];
  writeDesk(pieces);
  revalidatePath("/desk");
  redirect("/desk");
}

export async function saveUrl(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const liveUrl = String(formData.get("liveUrl") ?? "").trim();
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece || !isReady(piece)) redirect("/desk");
  let parsed: URL | null = null;
  try {
    parsed = new URL(liveUrl);
  } catch {
    parsed = null;
  }
  if (!parsed || (parsed.protocol !== "https:" && parsed.protocol !== "http:")) {
    redirect(`/desk/${piece.niche}/${piece.id}?url=1`);
  }
  piece.liveUrl = parsed.toString();
  writeDesk(pieces);
  revalidatePath("/desk");
  redirect(`/desk/${piece.niche}/${piece.id}`);
}

const checkpoints = new Set<Checkpoint>(["1h", "24h", "72h", "7d"]);

function typedNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (!/^[0-9]{1,9}%?$/.test(text)) return null;
  return text;
}

export async function saveMetric(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const checkpoint = String(formData.get("checkpoint") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece || !isReady(piece) || !checkpoints.has(checkpoint as Checkpoint)) {
    redirect("/desk");
  }
  const views = typedNumber(formData.get("views"));
  const completion = typedNumber(formData.get("completion"));
  const shares = typedNumber(formData.get("shares"));
  const comments = typedNumber(formData.get("comments"));
  const saves = typedNumber(formData.get("saves"));
  if (views === null || completion === null || shares === null || comments === null || saves === null) {
    redirect(`/desk/${piece.niche}/${piece.id}?metric=1`);
  }
  piece.metrics[checkpoint as Checkpoint] = { views, completion, shares, comments, saves };
  writeDesk(pieces);
  storeTyped(piece, checkpoint as Checkpoint);
  revalidatePath("/desk");
  revalidatePath("/desk/loop");
  redirect(`/desk/${piece.niche}/${piece.id}`);
}

export async function runResearch() {
  const person = await readSession();
  if (!person) redirect("/");
  const research = await gatherResearch();
  compileBriefs(research);
  revalidatePath("/desk/research");
  redirect("/desk/research");
}

export async function writeTheScripts() {
  const person = await readSession();
  if (!person) redirect("/");
  await writeScripts();
  redirect("/desk/scripts");
}

export async function approveScript(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const pieces = readDesk();
  const piece = findPiece(pieces, String(formData.get("id") ?? ""));
  if (!piece || piece.script.source !== "claude") redirect("/desk/scripts");
  piece.approved = true;
  const busy = pieces.some((item) => item.render.status === "rendering");
  if (!busy) {
    piece.render = { status: "rendering", file: "", error: "", at: new Date().toISOString() };
    writeDesk(pieces);
    queueRender(piece);
  } else {
    piece.render = { ...piece.render, status: "idle", error: "" };
    writeDesk(pieces);
  }
  revalidatePath("/desk");
  redirect("/desk/scripts");
}

export async function rejectScript(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const pieces = readDesk();
  const piece = findPiece(pieces, String(formData.get("id") ?? ""));
  if (!piece) redirect("/desk/scripts");
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 180);
  if (reason) piece.rejections = [...piece.rejections, reason].slice(-12);
  clearScript(piece);
  writeDesk(pieces);
  revalidatePath("/desk/scripts");
  redirect("/desk/scripts");
}

export async function writeBriefs() {
  const person = await readSession();
  if (!person) redirect("/");
  const research = readResearch();
  if (!research) redirect("/desk/research");
  compileBriefs(research);
  revalidatePath("/desk/make");
  redirect("/desk/make");
}

export async function writeDrafts() {
  const person = await readSession();
  if (!person) redirect("/");
  const briefs = readBriefs();
  if (!briefs) redirect("/desk/brief");
  await applyDrafts(briefs);
  revalidatePath("/desk");
  redirect("/desk/make");
}

export async function writeWithClaude(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece) redirect("/desk");
  const brief = readBriefs()?.briefs.find((item) => item.niche === piece.niche);
  const back = `/desk/${piece.niche}/${piece.id}`;
  if (piece.stamps.length > 0) redirect(`${back}?claude=stamped`);
  let reply = "";
  try {
    reply = await askClaude(claudePrompt(piece, brief?.text ?? ""));
  } catch (error) {
    const message = publicClaudeError(error instanceof Error ? error.message : "Claude did not answer.");
    redirect(`${back}?claude=${encodeURIComponent(message)}`);
  }
  const script = parseScript(reply);
  if (!script) redirect(`${back}?claude=shape`);
  piece.script = { ...script, source: "claude" };
  piece.line = script.onScreen;
  piece.note = script.narration;
  fillCaptions(piece);
  piece.render = { ...piece.render, status: "idle", error: "" };
  writeDesk(pieces);
  revalidatePath("/desk");
  redirect(back);
}

export async function speakPiece(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece) redirect("/desk");
  const back = `/desk/${piece.niche}/${piece.id}`;
  const renders = path.join(process.cwd(), "data", "renders");
  mkdirSync(renders, { recursive: true });
  const textPath = path.join(renders, `${piece.id}.narration.txt`);
  const wav = path.join(renders, `${piece.id}.wav`);
  writeFileSync(textPath, piece.script.narration || piece.note);
  const result = spawnSync(kokoroPaths.python, [path.join(process.cwd(), "..", "scripts", "speak.py"), textPath, wav], {
    timeout: 60000,
  });
  if (result.status !== 0) redirect(`${back}?voice=1`);
  revalidatePath("/desk");
  redirect(back);
}

export async function saveScript(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece) redirect("/desk");
  const beats = [0, 1, 2].map((index) => String(formData.get(`beat${index}`) ?? "").trim().slice(0, 140));
  piece.script = {
    onScreen: String(formData.get("onScreen") ?? "").trim().slice(0, 140) || piece.line,
    narration: String(formData.get("narration") ?? "").trim().slice(0, 280) || piece.note,
    beats,
    source: "claude",
  };
  piece.render = { ...piece.render, status: "idle", error: "" };
  writeDesk(pieces);
  revalidatePath("/desk");
  redirect(`/desk/${piece.niche}/${piece.id}`);
}

export async function renderPiece(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const id = String(formData.get("id") ?? "");
  const pieces = readDesk();
  const piece = findPiece(pieces, id);
  if (!piece) redirect("/desk");
  if (piece.render.status === "rendering") redirect(`/desk/${piece.niche}/${piece.id}`);
  piece.render = { status: "rendering", file: piece.render.file, error: "", at: new Date().toISOString() };
  writeDesk(pieces);
  queueRender(piece);
  revalidatePath("/desk");
  redirect(`/desk/${piece.niche}/${piece.id}`);
}

export async function runMonday() {
  const person = await readSession();
  if (!person) redirect("/");
  const research = await gatherResearch();
  const briefs = compileBriefs(research);
  await applyDrafts(briefs);
  revalidatePath("/desk");
  redirect("/desk/make");
}

export async function importCsv(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) redirect("/desk/loop?csv=empty");
  if (file.size > 200_000) redirect("/desk/loop?csv=big");
  const text = await file.text();
  const pieces = readDesk();
  const parsed = parseMetricsCsv(text, new Set(pieces.map((piece) => piece.id)));
  if (parsed.error) redirect(`/desk/loop?csv=${encodeURIComponent(parsed.error)}`);
  applyRows(pieces, parsed.rows);
  writeDesk(pieces);
  storeCsv(parsed.rows);
  revalidatePath("/desk");
  redirect("/desk/loop");
}

function pinText(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[%@\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function importLayout(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const layout = String(formData.get("layout") ?? "");
  const niche = String(formData.get("niche") ?? "");
  if (!isPinLayout(layout)) redirect("/desk/layouts?import=layout");
  if (!isNicheId(niche)) redirect("/desk/layouts?import=account");
  const line = pinText(formData.get("line"), 90);
  const note = pinText(formData.get("note"), 60);
  if (!line) redirect("/desk/layouts?import=text");
  const file = formData.get("reference");
  if (!(file instanceof File) || file.size === 0) redirect("/desk/layouts?import=empty");
  if (file.size > 6_000_000) redirect("/desk/layouts?import=big");
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) redirect("/desk/layouts?import=type");
  const id = `pin-${Date.now()}`;
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const board = path.join(process.cwd(), "public", "board");
  mkdirSync(board, { recursive: true });
  writeFileSync(path.join(board, `${id}.${ext}`), Buffer.from(await file.arrayBuffer()));
  const outDir = path.join(process.cwd(), "data", "renders", "pins");
  mkdirSync(outDir, { recursive: true });
  const made = drawOffloadPin({ layout, line, note, out: path.join(outDir, `${id}.jpg`) });
  if (made) {
    writePin({ id, layout, line, note, niche, reference: `${id}.${ext}`, savedAt: new Date().toISOString() });
  }
  revalidatePath("/desk/layouts");
  redirect(made ? `/desk/layouts?made=${id}` : "/desk/layouts?import=draw");
}

export async function saveBrandPage(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const slug = String(formData.get("slug") ?? "");
  const doc = brandDoc(slug);
  if (!doc || !brandFileEditable(slug)) redirect("/desk/brand");
  const upload = formData.get("file");
  let text = String(formData.get("markdown") ?? "");
  if (upload instanceof File && upload.size > 0) {
    const name = upload.name.toLowerCase();
    if (!name.endsWith(".md")) redirect(`/desk/brand/${slug}?saved=type`);
    if (upload.size > 200_000) redirect(`/desk/brand/${slug}?saved=big`);
    text = await upload.text();
  }
  if (!text.trim()) redirect(`/desk/brand/${slug}?saved=empty`);
  if (text.length > 200_000) redirect(`/desk/brand/${slug}?saved=big`);
  writeBrandFile(doc.file, text);
  revalidatePath(`/desk/brand/${slug}`);
  revalidatePath("/desk/brand");
  redirect(`/desk/brand/${slug}?saved=1`);
}

export async function saveLoopLesson(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  saveLesson(WEEK, String(formData.get("lesson") ?? "").trim());
  revalidatePath("/desk/loop");
  redirect("/desk/loop");
}

export async function collectSignals() {
  const person = await readSession();
  if (!person) redirect("/");
  const { startRun } = await import("@/lib/signals");
  startRun();
  revalidatePath("/desk/signals");
}

export async function collectInspiration() {
  const person = await readSession();
  if (!person) redirect("/");
  const { startInspirationRun } = await import("@/lib/library");
  startInspirationRun();
  const { startRun } = await import("@/lib/signals");
  startRun(["--niche", "motion", "--ratio", "2"]);
  revalidatePath("/desk/inspiration");
}

export async function keepInspiration(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { keepPulled } = await import("@/lib/library");
  const url = String(formData.get("url") ?? "");
  if (!/^https:\/\//.test(url)) return;
  keepPulled({
    source: String(formData.get("source") ?? "").slice(0, 80),
    name: String(formData.get("name") ?? "").slice(0, 160),
    url,
    image: String(formData.get("image") ?? "").slice(0, 600) || undefined,
    fit: String(formData.get("fit") ?? "").trim().slice(0, 400) || "Kept from Inspiration. Say where it fits.",
    status: "idea",
  });
  revalidatePath("/desk/inspiration");
  revalidatePath("/desk/library");
}

export async function rebuildLibrary() {
  const person = await readSession();
  if (!person) redirect("/");
  const { startCatalogueRun } = await import("@/lib/library");
  await startCatalogueRun();
  revalidatePath("/desk/library");
}

export async function addIdeaAction(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const title = String(formData.get("title") ?? "").trim().slice(0, 140);
  const pitch = String(formData.get("pitch") ?? "").trim().slice(0, 800);
  if (!title) return;
  const { addIdea } = await import("@/lib/library");
  addIdea({ title, pitch, kind: String(formData.get("kind") ?? "Idea").slice(0, 40), niche: String(formData.get("niche") ?? "all").slice(0, 20), by: person.name });
  revalidatePath("/desk/ideas");
}

export async function rejectIdeaAction(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { rejectIdea } = await import("@/lib/library");
  rejectIdea(String(formData.get("id") ?? ""));
  revalidatePath("/desk/ideas");
}

/** One Reject button for everything in the Library and Inspiration. */
export async function rejectAction(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const lib = await import("@/lib/library");
  const kind = String(formData.get("kind") ?? "");
  const value = String(formData.get("value") ?? "");
  if (kind === "film" && lib.rejectFilm(value)) await lib.reindex();
  if (kind === "still" && lib.rejectStill(value)) await lib.startCatalogueRun();
  if (kind === "format") {
    lib.rejectFormat(value);
    await lib.startCatalogueRun();
  }
  if (kind === "pulled") lib.rejectPulled(value, String(formData.get("name") ?? ""));
  if (kind === "inspiration") lib.rejectInspiration(value);
  revalidatePath("/desk/library");
  revalidatePath("/desk/inspiration");
}

export async function setIdeaStatusAction(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { IDEA_STATUS, setIdeaStatus } = await import("@/lib/library");
  const status = String(formData.get("status") ?? "");
  if (!(IDEA_STATUS as readonly string[]).includes(status)) return;
  setIdeaStatus(String(formData.get("id") ?? ""), status as (typeof IDEA_STATUS)[number]);
  revalidatePath("/desk/ideas");
}

export async function linkedinStatus(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { STATUS, setStatus } = await import("@/lib/linkedin");
  const status = String(formData.get("status") ?? "");
  if ((STATUS as readonly string[]).includes(status)) setStatus(String(formData.get("id") ?? ""), status as (typeof STATUS)[number]);
  revalidatePath("/desk/linkedin");
}

export async function linkedinReject(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { removePost } = await import("@/lib/linkedin");
  removePost(String(formData.get("id") ?? ""));
  revalidatePath("/desk/linkedin");
}

export async function linkedinDraft() {
  const person = await readSession();
  if (!person) redirect("/");
  const { draftPosts } = await import("@/lib/linkedin");
  try {
    await draftPosts(person.name);
  } catch (error) {
    redirect(`/desk/linkedin?error=${encodeURIComponent(publicClaudeError(error instanceof Error ? error.message : "Drafting failed."))}`);
  }
  revalidatePath("/desk/linkedin");
}

export async function saveStoryboard(formData: FormData) {
  const person = await readSession();
  if (!person) redirect("/");
  const { setFrames } = await import("@/lib/library");
  const frames = String(formData.get("frames") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((l) => l.slice(0, 200));
  setFrames(String(formData.get("id") ?? ""), frames);
  revalidatePath("/desk/ideas");
  revalidatePath("/desk/home");
}
