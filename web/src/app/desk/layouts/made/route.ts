import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { drawOffloadPin, isPinLayout } from "@/lib/pin-picture";
import { findPinByReference, isNicheId, isPinId, pinCaptions, pinJpg, pinPackText, readPin, writePin, zipStore } from "@/lib/pin-draft";
import { readSession } from "@/lib/session";

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[%@\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function GET(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  if (!isPinId(id)) return new Response("Missing.", { status: 404 });
  const file = pinJpg(id);
  if (!existsSync(file)) return new Response("This pin has not been made.", { status: 404 });
  if (url.searchParams.get("download") === "1") {
    const draft = readPin(id);
    if (!draft) return new Response("This pin has no captions yet.", { status: 404 });
    const zip = zipStore([
      { name: "pin.jpg", data: readFileSync(file) },
      { name: "post.txt", data: Buffer.from(pinPackText(draft), "utf8") },
    ]);
    return new Response(new Uint8Array(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="offload-${id}.zip"`,
      },
    });
  }
  return new Response(readFileSync(file), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    reference?: string;
    line?: string;
    note?: string;
    layout?: string;
    niche?: string;
  } | null;
  const line = clean(body?.line, 90);
  const note = clean(body?.note, 60);
  const layout = body?.layout ?? "";
  const niche = body?.niche ?? "";
  if (!line) return new Response("The sentence is missing.", { status: 400 });
  if (!isPinLayout(layout)) return new Response("Pick a layout.", { status: 400 });
  if (!isNicheId(niche)) return new Response("Pick an account.", { status: 400 });
  const named = boardFile(body?.reference ?? "");
  let id = body?.id ?? "";
  let current = isPinId(id) ? readPin(id) : null;
  if (!current && named) current = findPinByReference(named);
  const reference = named || boardFile(current?.reference ?? "");
  if (!current && !reference) return new Response("Missing pin.", { status: 404 });
  if (!current) id = `pin-${Date.now()}`;
  else id = current.id;
  const drawn = reference
    ? keepDownload(reference, pinJpg(id))
    : drawOffloadPin({ layout, line, note, out: pinJpg(id) });
  if (!drawn) return new Response("The picture could not be drawn.", { status: 500 });
  const savedAt = new Date().toISOString();
  const draft = {
    id,
    layout,
    line,
    note,
    niche,
    reference: current?.reference || reference,
    savedAt,
  };
  writePin(draft);
  return Response.json({ id, savedAt, captions: pinCaptions(draft) });
}

function boardFile(name: string) {
  if (!/^[\w.-]+\.(png|jpe?g|webp)$/i.test(name)) return "";
  const full = path.join(process.cwd(), "public", "board", name);
  return existsSync(full) ? name : "";
}

function keepDownload(name: string, out: string) {
  const full = path.join(process.cwd(), "public", "board", name);
  const result = spawnSync("magick", [full, out], { encoding: "utf8" });
  return result.status === 0 && existsSync(out);
}
