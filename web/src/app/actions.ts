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
  redirect("/desk");
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
