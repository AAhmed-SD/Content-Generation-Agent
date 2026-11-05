import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { outDir } from "@/lib/library";
import { readSession } from "@/lib/session";

const TYPES: Record<string, string> = { ".mp4": "video/mp4", ".png": "image/png", ".jpg": "image/jpeg" };

/** Rendered films and stills from remotion/out, for the Library. Nothing outside that folder. */
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!(await readSession())) return new Response("Sign in", { status: 401 });
  const parts = (await params).path.map(decodeURIComponent);
  const file = path.resolve(outDir, ...parts);
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!file.startsWith(outDir + path.sep) || !type || !existsSync(file)) return new Response("Not found", { status: 404 });
  const size = statSync(file).size;
  const range = /bytes=(\d*)-(\d*)/.exec(request.headers.get("range") ?? "");
  if (range) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    const body = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream;
    return new Response(body, { status: 206, headers: { "Content-Type": type, "Content-Length": String(end - start + 1), "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes" } });
  }
  const body = Readable.toWeb(createReadStream(file)) as ReadableStream;
  return new Response(body, { headers: { "Content-Type": type, "Content-Length": String(size), "Accept-Ranges": "bytes", "Cache-Control": "private, max-age=60" } });
}
