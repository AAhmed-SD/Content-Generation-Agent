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
  const COWORK = ${JSON.stringify(name)};
  const COWORK_WHO = ${JSON.stringify(person.id)};
  let coworkRev = 0;
  let coworkSteps = [];
  let coworkTimer = 0;
  let coworkLabel = "Change";
  let coworkBusy = false;
  let coworkHold = false;
  let coworkSeen = "";
  const coworkQuery = "/desk/editor/file?file=" + encodeURIComponent(COWORK) + "&vectra=1";
  async function persistPixels(data) {
    const pairs = [[BMP, data.bmps], [IMGS, data.imgs]];
    for (const pair of pairs) {
      const map = pair[0], bucket = pair[1];
      if (!bucket) continue;
      for (const key of Object.keys(bucket)) {
        const url = bucket[key];
        if (typeof url !== "string" || url.startsWith("/desk/") || url.startsWith("data:")) continue;
        const row = map.get(key);
        let blob = null;
        if (row && row.c && row.c.toBlob) blob = await new Promise((done) => row.c.toBlob(done, "image/png"));
        else if (url.startsWith("blob:")) blob = await fetch(url).then((res) => res.ok ? res.blob() : null).catch(() => null);
        if (!blob) continue;
        const type = blob.type && blob.type.indexOf("image/") === 0 ? blob.type : "image/png";
        const res = await fetch("/desk/editor/file?file=" + encodeURIComponent(COWORK) + "&asset=1", {
          method: "POST", credentials: "same-origin", headers: { "content-type": type }, body: blob,
        });
        if (!res.ok) continue;
        const saved = await res.json();
        const next = "/desk/editor/file?file=" + encodeURIComponent(COWORK) + "&asset=" + saved.id;
        bucket[key] = next;
        if (row) row.url = next;
      }
    }
    return data;
  }
  function scheduleSave(label) {
    if (coworkHold) return;
    coworkLabel = label || (pastL.length ? pastL[pastL.length - 1] : "Change");
    clearTimeout(coworkTimer);
    coworkTimer = setTimeout(() => { pushCowork(false); }, 700);
  }
  async function pushCowork(keepalive) {
    if (coworkHold) return;
    if (coworkBusy || tx !== null || drag || paint) { scheduleSave(coworkLabel); return; }
    coworkBusy = true;
    const data = await persistPixels(serialize());
    const leftover = Object.values(data.imgs || {}).concat(Object.values(data.bmps || {})).some((url) => String(url).startsWith("blob:"));
    if (leftover) { toast("Not saved"); coworkBusy = false; return; }
    const sent = JSON.stringify(data);
    try {
      const res = await fetch(coworkQuery, {
        method: "POST", credentials: "same-origin", keepalive: !!keepalive,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: data, label: coworkLabel }),
      });
      if (!res.ok) {
        toast(res.status === 413 ? "Too large to share" : "Not saved");
        if (res.status >= 500) scheduleSave(coworkLabel);
        return;
      }
      const body = await res.json();
      coworkRev = body.revision || coworkRev;
      coworkSteps = body.steps || coworkSteps;
      if (JSON.stringify(serialize()) === sent) FILE.dirty = false;
      else scheduleSave(coworkLabel);
      if (!FILE.id) FILE.id = "desk-" + COWORK;
      if (typeof renderTabs === "function") renderTabs();
      const panel = document.getElementById("histPanel");
      if (panel && panel.offsetParent) renderHistory();
      toast("Saved");
    } catch (err) { toast("Not saved"); }
    finally { coworkBusy = false; }
  }
  async function loadShared() {
    const res = await fetch(coworkQuery, { credentials: "same-origin" });
    if (!res.ok) return false;
    const body = await res.json();
    if (!body || !body.data || !body.data.doc) return false;
    const storedUrls = Object.values(body.data.imgs || {}).concat(Object.values(body.data.bmps || {}));
    if (storedUrls.some((url) => String(url).startsWith("blob:"))) return false;
    coworkRev = body.revision || 0;
    coworkSteps = body.steps || [];
    coworkHold = true;
    S.doc = await deserialize(body.data);
    S.sel = [];
    past = []; future = []; pastL = []; futureL = [];
    FILE.id = "desk-" + COWORK;
    FILE.dirty = false;
    coworkHold = false;
    render();
    fit();
    if (typeof renderTabs === "function") renderTabs();
    toast("Shared picture");
    return true;
  }
  async function applyShared(revision) {
    if (revision <= coworkRev || coworkHold || tx !== null || drag || paint) return;
    coworkHold = true;
    try {
      const res = await fetch(coworkQuery, { credentials: "same-origin" });
      const body = await res.json();
      if (!body.data || !body.data.doc) return;
      if ((body.revision || 0) < revision) return;
      if (FILE.dirty) { past.push(snap()); pastL.push("Before the other save"); future = []; futureL = []; }
      S.doc = await deserialize(body.data);
      FILE.dirty = false;
      coworkRev = body.revision || revision;
      coworkSteps = body.steps || [];
      render();
      const who = body.by && body.by !== COWORK_WHO ? body.by : "The other desk";
      toast(who + " saved. Undo goes back.");
    } finally { coworkHold = false; }
  }
  async function restoreStep(index) {
    const res = await fetch(coworkQuery + "&step=" + encodeURIComponent(index), { credentials: "same-origin" });
    const body = await res.json().catch(() => null);
    if (!res.ok || !body || !body.data) { toast("That step is gone."); return; }
    coworkHold = true;
    past.push(snap());
    pastL.push("Before going back");
    future = []; futureL = [];
    S.doc = await deserialize(body.data);
    coworkHold = false;
    FILE.dirty = true;
    render();
    scheduleSave(body.label || "Went back");
    toast("Went back");
  }
  const baseEnd = end;
  end = function() { baseEnd(); if (FILE.dirty) scheduleSave(); };
  const baseUndo = undo;
  undo = function(silent) { baseUndo(silent); if (FILE.dirty) scheduleSave("Undo"); };
  const baseRedo = redo;
  redo = function(silent) { baseRedo(silent); if (FILE.dirty) scheduleSave("Redo"); };
  const baseJump = jumpHistory;
  jumpHistory = function(n) { baseJump(n); if (FILE.dirty) scheduleSave("Go back"); };
  const baseHist = renderHistory;
  renderHistory = function() {
    baseHist();
    const panel = document.getElementById("histPanel");
    if (!panel || !coworkSteps.length) return;
    panel.insertAdjacentHTML("beforeend", '<p style="color:var(--tx2);font-size:12px;margin:10px 0 6px">Saved on the desk. Click a step to go back. The other person sees the same picture.</p>' + coworkSteps.map((step) => '<div class="sib" data-step="' + step.index + '"><div><b>' + esc(step.label || "Change") + '</b><div style="color:var(--tx3);font-size:11px">' + esc(step.by || "desk") + '</div></div></div>').join(""));
  };
  document.getElementById("histPanel").addEventListener("click", (event) => {
    const row = event.target.closest("[data-step]");
    if (!row) return;
    restoreStep(row.dataset.step);
  });
  function startCowork() {
    const source = new EventSource("/desk/editor/file?file=" + encodeURIComponent(COWORK) + "&live=1");
    source.onmessage = (event) => {
      let body = null;
      try { body = JSON.parse(event.data); } catch (err) { return; }
      if (body.kind === "present") {
        const others = (body.present || []).filter((id) => id !== COWORK_WHO).join(" and ");
        if (others && others !== coworkSeen) { coworkSeen = others; toast(others + " is here"); }
        return;
      }
      if (body.kind === "vectra") {
        if (body.by === COWORK_WHO) { if ((body.revision || 0) > coworkRev) coworkRev = body.revision; return; }
        applyShared(body.revision || 0);
      }
    };
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && FILE.dirty) pushCowork(true);
    });
  }
  Store.open().then(async () => {
    closeHome();
    const shared = await loadShared().catch(() => false);
    if (!shared) {
      const separated = await openSeparated(${JSON.stringify(name)}).catch(() => false);
      if (!separated) {
        const res = await fetch(${JSON.stringify(src)}, { credentials: "same-origin" });
        if (!res.ok) { openHome(); startCowork(); return; }
        const blob = await res.blob();
        placeFile(new File([blob], ${JSON.stringify(name)}, { type: blob.type || "image/jpeg" }));
        if (S.doc) S.doc.name = ${JSON.stringify(name.replace(/\.[^.]+$/, ""))};
      }
    }
    startCowork();
  });`;
  const page = html.replace("<title>Vectra — design studio clone</title>", "<title>Edit</title>").replace(boot, open);
  return new Response(page, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
