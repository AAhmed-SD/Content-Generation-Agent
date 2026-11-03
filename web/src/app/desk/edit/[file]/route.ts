import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { readSession } from "@/lib/session";

const boot = "Store.open().then(()=>openHome());";

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const { file } = await params;
  if (!/^[\w.-]+$/.test(file)) return new Response("Missing picture.", { status: 404 });
  const picture = path.join(process.cwd(), "public", "board", file);
  if (!existsSync(picture)) return new Response("Missing picture.", { status: 404 });
  const studio = path.join(process.cwd(), "studio", "affinity-clone.html");
  const html = readFileSync(studio, "utf8");
  if (!html.includes(boot)) return new Response("The editor file is missing its start.", { status: 500 });
  const src = `/board/${encodeURIComponent(file)}`;
  const name = file.replace(/"/g, "");
  const open = `Store.open().then(async () => {
    closeHome();
    const res = await fetch(${JSON.stringify(src)}, { credentials: "same-origin" });
    if (!res.ok) { openHome(); return; }
    const blob = await res.blob();
    placeFile(new File([blob], ${JSON.stringify(name)}, { type: blob.type || "image/jpeg" }));
    if (S.doc) S.doc.name = ${JSON.stringify(name.replace(/\.[^.]+$/, ""))};
  });`;
  const page = html.replace("<title>Vectra — design studio clone</title>", "<title>Edit</title>").replace(boot, open);
  return new Response(page, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
