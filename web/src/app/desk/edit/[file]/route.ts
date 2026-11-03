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
  const open = `async function bitmapKey(url) {
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) return "";
    const blob = await res.blob();
    const obj = URL.createObjectURL(blob);
    const img = await new Promise((ok, bad) => {
      const el = new Image();
      el.onload = () => ok(el);
      el.onerror = bad;
      el.src = obj;
    });
    const key = "i" + (++imgN);
    IMGS.set(key, { url: obj, img, w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
    return key;
  }
  async function openSeparated(file) {
    toast("Reading the picture into layers.");
    const query = encodeURIComponent(file);
    let scene = null;
    const saved = await fetch("/desk/editor/file?file=" + query + "&scene=1", { credentials: "same-origin" });
    if (saved.ok) {
      const body = await saved.json();
      if (body.scene && body.scene.layers && body.scene.layers.length > 1) scene = body.scene;
    }
    if (!scene) {
      const built = await fetch("/desk/editor/file?file=" + query + "&decompose=1", { credentials: "same-origin" });
      if (built.ok) {
        const body = await built.json();
        scene = body.scene || null;
      }
    }
    if (!scene || !scene.layers || scene.layers.length < 2 || !scene.artboard) return false;
    const board = makeArtboard(0, 0, scene.artboard.w, scene.artboard.h, ${JSON.stringify(name.replace(/\.[^.]+$/, ""))});
    board.bg = scene.artboard.bg || "#f3efe4";
    for (const layer of scene.layers) {
      if (!layer || layer.hidden) continue;
      const words = layer.type === "text" && typeof layer.text === "string" ? layer.text.trim() : "";
      if (words) {
        const face = layer.font === "sans" ? "Inter, sans-serif" : layer.font === "script" ? "Caveat, cursive" : "'Instrument Serif', Georgia, serif";
        board.children.push(newLayer("text", {
          x: layer.x, y: layer.y, text: words,
          size: layer.size || Math.max(18, Math.round((layer.h || 48) * 0.82)),
          fill: layer.fill || "#171717", font: face,
          name: layer.name || words, stroke: null, sw: 0, locked: false,
          opacity: layer.opacity == null ? 1 : layer.opacity
        }));
        continue;
      }
      const asset = typeof layer.src === "string" && layer.src.indexOf("asset:") === 0 ? layer.src.slice(6) : "";
      if (/^a\\d+$/.test(asset)) {
        const key = await bitmapKey("/desk/editor/file?file=" + query + "&asset=" + asset);
        if (!key) continue;
        board.children.push(newLayer("image", {
          src: key, x: layer.x, y: layer.y, w: layer.w, h: layer.h,
          name: layer.name || "Layer", opacity: layer.opacity == null ? 1 : layer.opacity,
          fill: null, stroke: null, sw: 0, locked: false,
        }));
      }
    }
    if (board.children.length < 2) return false;
    const front = board.children[board.children.length - 1];
    act(() => {
      S.doc.name = board.name;
      S.doc.w = scene.artboard.w;
      S.doc.h = scene.artboard.h;
      S.doc.bg = board.bg;
      S.doc.layers = [board];
      S.selMode = "object";
      S.sel = front ? [front.id] : [];
    }, "Open layers");
    fit();
    toast(board.children.length + " layers");
    return true;
  }
  Store.open().then(async () => {
    closeHome();
    const separated = await openSeparated(${JSON.stringify(name)}).catch(() => false);
    if (separated) return;
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
