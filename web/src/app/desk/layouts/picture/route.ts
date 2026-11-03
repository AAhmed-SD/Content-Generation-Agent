import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { boardPath, editPath, readPictureText, workingPath } from "@/lib/picture-text";
import { readSession } from "@/lib/session";

function mediaType(file: string) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function GET(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const url = new URL(request.url);
  const name = url.searchParams.get("file") ?? "";
  if (!boardPath(name)) return new Response("Missing picture.", { status: 404 });
  if (url.searchParams.get("read") === "1") return Response.json(readPictureText(name));
  const file = workingPath(name);
  return new Response(readFileSync(file), {
    headers: { "Content-Type": mediaType(file), "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const name = new URL(request.url).searchParams.get("file") ?? "";
  const dest = editPath(name);
  if (!dest) return new Response("Missing picture.", { status: 404 });
  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length < 100 || bytes.length > 8_000_000) return new Response("That picture is the wrong size.", { status: 400 });
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return new Response("Send a JPEG.", { status: 400 });
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, bytes);
  return Response.json({ savedAt: new Date().toISOString() });
}

export async function DELETE(request: Request) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const name = new URL(request.url).searchParams.get("file") ?? "";
  const dest = editPath(name);
  if (!dest) return new Response("Missing picture.", { status: 404 });
  if (existsSync(dest)) unlinkSync(dest);
  return Response.json({ savedAt: "" });
}
