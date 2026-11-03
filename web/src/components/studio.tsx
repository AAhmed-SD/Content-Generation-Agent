"use client";

import { useEffect, useRef, useState } from "react";
import { runEditorTool, type EditorCall } from "@/lib/editor-tools";
import { downloadNote } from "@/lib/references";
import { personName, type PersonId } from "@/lib/people";
import {
  addShape,
  addText,
  copySelection,
  createScene,
  findLayer,
  hitTest,
  pasteLayers,
  placeImage,
  setStyle,
  type Layer,
  type Scene,
} from "@/lib/scene";

type Tool = "move" | "rect" | "ellipse" | "text" | "image";

const tools: { id: Tool; label: string }[] = [
  { id: "move", label: "Move" },
  { id: "rect", label: "Rect" },
  { id: "ellipse", label: "Ellipse" },
  { id: "text", label: "Text" },
  { id: "image", label: "Image" },
];

export function Studio({ file, title, person }: { file: string; title: string; person: PersonId }) {
  const paneRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const scaleRef = useRef(1);
  const [scene, setScene] = useState<Scene | null>(null);
  const [tool, setTool] = useState<Tool>("move");
  const [nextFill, setNextFill] = useState("#171717");
  const [scale, setScale] = useState(0.4);
  const [status, setStatus] = useState("Opening the picture.");
  const [draft, setDraft] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [hexDraft, setHexDraft] = useState("#171717");
  const [present, setPresent] = useState<PersonId[]>([]);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const resize = useRef<{ id: string; corner: string; x: number; y: number; w: number; h: number; px: number; py: number } | null>(null);
  const draftRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const toolRef = useRef(tool);
  const fillRef = useRef(nextFill);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revisionRef = useRef(0);
  const quiet = useRef(false);
  const sceneRef = useRef<Scene | null>(null);
  const dirty = useRef(false);
  const ready = useRef(false);
  scaleRef.current = scale;
  toolRef.current = tool;
  fillRef.current = nextFill;
  sceneRef.current = scene;

  useEffect(() => {
    let cancel = false;
    ready.current = false;
    const query = encodeURIComponent(file);
    fetch(`/desk/editor/file?file=${query}&scene=1`)
      .then((response) => response.json())
      .then(async (body: { scene: Scene | null; revision?: number }) => {
        if (cancel) return;
        if (typeof body.revision === "number" && body.revision < revisionRef.current) return;
        if (typeof body.revision === "number") revisionRef.current = body.revision;
        if (body.scene && body.scene.layers.length > 1) {
          setScene(body.scene);
          ready.current = true;
          setStatus("Saved");
          return;
        }
        setStatus("Reading every word and every object.");
        const built = await fetch(`/desk/editor/file?file=${query}&decompose=1`);
        const payload = (await built.json()) as { scene: Scene | null; revision?: number };
        if (cancel) return;
        if (typeof payload.revision === "number") revisionRef.current = payload.revision;
        if (payload.scene) {
          setScene(payload.scene);
          ready.current = true;
          setStatus("Saved");
          return;
        }
        const image = new Image();
        image.src = `/board/${query}`;
        await image.decode();
        if (cancel) return;
        setScene(body.scene ?? createScene(image.naturalWidth, image.naturalHeight, `/board/${file}`, cssHex("--paper")));
        setNextFill(cssHex("--ink"));
        ready.current = true;
        setStatus("Saved");
      })
      .catch(() => setStatus("The picture did not open."));
    return () => {
      cancel = true;
    };
  }, [file]);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane || !scene) return;
    const fit = () => {
      const next = Math.min(pane.clientWidth / scene.artboard.w, pane.clientHeight / scene.artboard.h) * 0.92;
      setScale(Number.isFinite(next) && next > 0 ? next : 0.4);
    };
    fit();
    const watch = new ResizeObserver(fit);
    watch.observe(pane);
    return () => watch.disconnect();
  }, [scene?.artboard.w, scene?.artboard.h]);

  useEffect(() => {
    if (!scene || !ready.current) return;
    if (quiet.current) {
      quiet.current = false;
      return;
    }
    dirty.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => void saveScene(file, scene, revisionRef, setStatus), 400);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [file, scene]);

  useEffect(() => {
    const flush = () => {
      if (document.visibilityState !== "hidden" || !dirty.current) return;
      const current = sceneRef.current;
      if (!current || !ready.current) return;
      dirty.current = false;
      void saveScene(file, current, revisionRef, setStatus);
    };
    document.addEventListener("visibilitychange", flush);
    return () => document.removeEventListener("visibilitychange", flush);
  }, [file]);

  useEffect(() => {
    const source = new EventSource(`/desk/editor/file?file=${encodeURIComponent(file)}&live=1`);
    source.onmessage = (event) => {
      const body = JSON.parse(event.data) as
        | { kind: "present"; present: PersonId[] }
        | { kind: "scene"; revision: number; by: PersonId; scene: Scene };
      if (body.kind === "present") {
        setPresent(body.present);
        return;
      }
      if (body.revision <= revisionRef.current) return;
      if (drag.current || draftRef.current || resize.current) return;
      revisionRef.current = body.revision;
      quiet.current = true;
      dirty.current = false;
      setScene((current) => {
        const selection = current ? current.selection.filter((id) => findLayer(body.scene.layers, id)) : [];
        return { ...body.scene, selection };
      });
      setStatus(body.by === person ? "Saved" : `${personName(body.by).split(" ")[0]} saved`);
    };
    return () => source.close();
  }, [file, person]);

  useEffect(() => {
    const pointOf = (event: PointerEvent) => {
      const rect = boardRef.current?.getBoundingClientRect();
      const scale = scaleRef.current || 1;
      if (!rect) return null;
      return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale };
    };
    const move = (event: PointerEvent) => {
      const point = pointOf(event);
      if (!point) return;
      const drawing = draftRef.current;
      if (drawing && (toolRef.current === "rect" || toolRef.current === "ellipse")) {
        const next = { ...drawing, w: point.x - drawing.x, h: point.y - drawing.y };
        draftRef.current = next;
        setDraft(next);
        return;
      }
      const moving = drag.current;
      if (moving) {
        dirty.current = true;
        setScene((current) => {
          if (!current) return current;
          const next = setStyle(current, moving.id, { x: point.x - moving.dx, y: point.y - moving.dy });
          sceneRef.current = next;
          return next;
        });
      }
      const sizing = resize.current;
      if (!sizing) return;
      const dx = (event.clientX - sizing.px) / (scaleRef.current || 1);
      const dy = (event.clientY - sizing.py) / (scaleRef.current || 1);
      let { x, y, w, h } = sizing;
      if (sizing.corner.includes("e")) w = sizing.w + dx;
      if (sizing.corner.includes("s")) h = sizing.h + dy;
      if (sizing.corner.includes("w")) {
        x = sizing.x + dx;
        w = sizing.w - dx;
      }
      if (sizing.corner.includes("n")) {
        y = sizing.y + dy;
        h = sizing.h - dy;
      }
      dirty.current = true;
      setScene((current) => {
        if (!current) return current;
        const next = setStyle(current, sizing.id, { x, y, w: Math.max(8, w), h: Math.max(8, h) });
        sceneRef.current = next;
        return next;
      });
    };
    const up = () => {
      const drawing = draftRef.current;
      const drawingTool = toolRef.current;
      if (drawing && (drawingTool === "rect" || drawingTool === "ellipse")) {
        const box = normalBox(drawing);
        if (box.w > 4 && box.h > 4) setScene((current) => (current ? addShape(current, drawingTool, box, fillRef.current) : current));
      }
      draftRef.current = null;
      setDraft(null);
      drag.current = null;
      resize.current = null;
      const current = sceneRef.current;
      if (dirty.current && current) {
        dirty.current = false;
        if (saveTimer.current) clearTimeout(saveTimer.current);
        void saveScene(file, current, revisionRef, setStatus);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const typing = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;
      if (typing) return;
      const image = [...(event.clipboardData?.items ?? [])].find((item) => item.type.startsWith("image/"));
      const blob = image?.getAsFile();
      if (blob) {
        event.preventDefault();
        void placeBlob(blob);
        return;
      }
      const pasted = readLayerClipboard(event.clipboardData?.getData("text/plain") ?? "");
      const layers = pasted.length ? pasted : layerClipboard;
      if (!layers.length || !scene) return;
      event.preventDefault();
      setScene(pasteLayers(scene, layers));
    };
    const onKey = (event: KeyboardEvent) => {
      const typing = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;
      if (typing || !scene) return;
      const command = event.metaKey || event.ctrlKey;
      if (command && event.key.toLowerCase() === "c") {
        const layers = copySelection(scene);
        if (!layers.length) return;
        event.preventDefault();
        layerClipboard = layers;
        void navigator.clipboard.writeText(JSON.stringify({ kind: "offload-layers", layers })).catch(() => undefined);
        return;
      }
      if (command && event.key.toLowerCase() === "d") {
        if (!scene.selection.length) return;
        event.preventDefault();
        const result = runEditorTool(scene, { tool: "duplicate" }, "person");
        if (result.scene) setScene(result.scene);
        return;
      }
      if ((event.key === "Backspace" || event.key === "Delete") && scene.selection.length) {
        const result = runEditorTool(scene, { tool: "delete" }, "person");
        if (result.scene) setScene(result.scene);
      }
    };
    window.addEventListener("paste", onPaste);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("paste", onPaste);
      window.removeEventListener("keydown", onKey);
    };
  }, [scene, file]);

  const selected = scene && scene.selection.length === 1 ? findLayer(scene.layers, scene.selection[0]) : null;
  const shapes = scene ? scene.layers.filter((layer) => scene.selection.includes(layer.id) && (layer.type === "rect" || layer.type === "ellipse")) : [];
  const fill = selected && selected.type !== "image" && selected.type !== "group" ? selected.fill : nextFill;
  useEffect(() => setHexDraft(fill), [fill]);

  const look = downloadNote(file);
  if (!scene) {
    return (
      <p className="split">
        {status}
        {" This download is the look. Keep the object. Change the sentence."}
      </p>
    );
  }

  const local = (event: { clientX: number; clientY: number }) => {
    const rect = boardRef.current?.getBoundingClientRect();
    const scale = scaleRef.current || 1;
    if (!rect) return { x: 0, y: 0 };
    return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale };
  }

  const onDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const point = local(event);
    if (tool === "rect" || tool === "ellipse") {
      const next = { x: point.x, y: point.y, w: 0, h: 0 };
      draftRef.current = next;
      setDraft(next);
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (tool === "text") {
      setScene(addText(scene, point.x, point.y, nextFill));
      return;
    }
    if (tool === "image") {
      fileRef.current?.click();
      return;
    }
    const hit = hitTest(scene.layers, point.x, point.y);
    if (!hit) {
      setScene({ ...scene, selection: [] });
      return;
    }
    setScene({ ...scene, selection: [hit.id] });
    if (!hit.locked) drag.current = { id: hit.id, dx: point.x - hit.x, dy: point.y - hit.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  const paint = (fillValue: string) => {
    setNextFill(fillValue);
    const id = scene.selection[0];
    const layer = id ? findLayer(scene.layers, id) : null;
    if (!layer || layer.type === "group") return;
    if (layer.src) {
      void recolorCutout(file, layer, fillValue, setScene, setStatus);
      return;
    }
    if (layer.type === "image") return;
    setScene(setStyle(scene, layer.id, { fill: fillValue }));
  }

  const apart = async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    ready.current = false;
    setStatus("Reading every word and every object.");
    const response = await fetch(`/desk/editor/file?file=${encodeURIComponent(file)}&decompose=1`, { method: "POST" });
    const payload = (await response.json()) as { scene: Scene | null; revision?: number };
    if (typeof payload.revision === "number") revisionRef.current = payload.revision;
    if (!payload.scene) {
      ready.current = true;
      setStatus("The picture stayed in one piece.");
      return;
    }
    ready.current = true;
    setScene(payload.scene);
    setStatus("Saved");
  }

  const placeBlob = async (blob: Blob) => {
    const bitmap = await createImageBitmap(blob);
    const response = await fetch(`/desk/editor/file?file=${encodeURIComponent(file)}&asset=1`, {
      method: "POST",
      headers: { "content-type": blob.type || "image/png" },
      body: blob,
    });
    if (!response.ok) {
      setStatus("The paste did not land.");
      return;
    }
    const body = (await response.json()) as { src: string };
    const fit = Math.min(scene.artboard.w / bitmap.width, scene.artboard.h / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * fit));
    const h = Math.max(1, Math.round(bitmap.height * fit));
    setScene((current) =>
      current
        ? placeImage(current, body.src, {
            x: (current.artboard.w - w) / 2,
            y: (current.artboard.h - h) / 2,
            w,
            h,
          })
        : current,
    );
  }

  const importFile = async (blob: File) => {
    if (blob.type === "application/json" || blob.name.endsWith(".json")) {
      const parsed = JSON.parse(await blob.text()) as { scene?: Scene; assets?: Record<string, string> };
      const incoming = parsed.scene ?? (parsed as unknown as Scene);
      const assets = parsed.assets ?? {};
      let next = incoming;
      for (const [id, data] of Object.entries(assets)) {
        const bytes = await (await fetch(data)).blob();
        const response = await fetch(`/desk/editor/file?file=${encodeURIComponent(file)}&asset=1`, {
          method: "POST",
          headers: { "content-type": bytes.type || "image/png" },
          body: bytes,
        });
        if (!response.ok) continue;
        const body = (await response.json()) as { src: string };
        next = remapAsset(next, id, body.src);
      }
      quiet.current = false;
      setScene(next);
      setStatus("Imported");
      return;
    }
    await placeBlob(blob);
  }

  const exportPng = async () => {
    await ensureExportFonts(scene);
    const output = scene.artboard.w * 2 > 4096 || scene.artboard.h * 2 > 4096 ? 1 : 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(scene.artboard.w * output);
    canvas.height = Math.round(scene.artboard.h * output);
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.scale(output, output);
    ctx.fillStyle = scene.artboard.bg;
    ctx.fillRect(0, 0, scene.artboard.w, scene.artboard.h);
    for (const layer of scene.layers) await drawLayer(ctx, layer, 0, 0, file);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const picture = URL.createObjectURL(blob);
    download(picture, `${title}.png`);
    const assets = await assetMap(scene, file);
    const project = URL.createObjectURL(new Blob([JSON.stringify({ kind: "offload-picture", scene, assets })], { type: "application/json" }));
    download(project, `${title}.offload.json`);
  }

  const apply = (call: EditorCall) => {
    const result = runEditorTool(scene, call, "person");
    if (result.scene) setScene(result.scene);
  };

  return (
    <section className="studio">
      <header className="studio-top">
        <span className="art-font-serif" hidden>
          Instrument Serif
        </span>
        <span className="art-font-sans" hidden>
          Instrument Sans
        </span>
        <span className="art-font-script" hidden>
          Caveat
        </span>
        <a href="/desk/layouts">Layouts</a>
        <strong>{title}</strong>
        <span>
          This download is the look. Keep the object. Change the sentence.
          {look ? ` ${look.rule}` : ""}
        </span>
        <span>{Math.round(scale * 100)}%</span>
        <span className="studio-status">
          {status}
          {company(present, person)}
        </span>
        <button type="button" onClick={() => importRef.current?.click()}>
          Import
        </button>
        <button type="button" onClick={() => void apart()}>
          Take it apart again
        </button>
        <button type="button" onClick={() => void exportPng()}>
          Export
        </button>
      </header>
      <div className="studio-context">
        <span>{selected ? selected.name : scene.selection.length > 1 ? `${scene.selection.length} selected` : "No selection"}</span>
        <button type="button" disabled={!scene.selection.length} onClick={() => apply({ tool: "duplicate" })}>
          Duplicate
        </button>
        <button type="button" disabled={scene.selection.length < 2} onClick={() => apply({ tool: "group" })}>
          Group
        </button>
        <button type="button" disabled={shapes.length !== 2} onClick={() => apply({ tool: "boolean", op: "add" })}>
          Add
        </button>
        <button type="button" disabled={shapes.length !== 2} onClick={() => apply({ tool: "boolean", op: "subtract" })}>
          Subtract
        </button>
        <button type="button" disabled={shapes.length !== 2} onClick={() => apply({ tool: "boolean", op: "intersect" })}>
          Intersect
        </button>
        {(["left", "center", "right", "top", "middle", "bottom"] as const).map((edge) => (
          <button key={edge} type="button" disabled={!scene.selection.length} onClick={() => apply({ tool: "align", edge })}>
            {edge}
          </button>
        ))}
      </div>
      <div className="studio-tools" role="toolbar" aria-label="Tools">
        {tools.map((item) => (
          <button key={item.id} type="button" aria-pressed={tool === item.id} onClick={() => setTool(item.id)}>
            {item.label}
          </button>
        ))}
        <span className="studio-chip" style={{ background: fill }} aria-label="Fill" />
      </div>
      <div className="studio-canvas" ref={paneRef}>
        <div
          ref={boardRef}
          className="artboard"
          style={{ width: scene.artboard.w * scale, height: scene.artboard.h * scale, background: scene.artboard.bg }}
          onPointerDown={onDown}
        >
          {scene.layers.map((layer) => (
            <LayerView key={layer.id} file={file} layer={layer} scale={scale} selected={scene.selection.includes(layer.id)} />
          ))}
          {selected ? (
            <span
              className="art-handles"
              style={{ left: selected.x * scale, top: selected.y * scale, width: selected.w * scale, height: selected.h * scale }}
            >
              {["nw", "ne", "sw", "se"].map((corner) => (
                <i
                  key={corner}
                  className={`handle handle-${corner}`}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    resize.current = { id: selected.id, corner, x: selected.x, y: selected.y, w: selected.w, h: selected.h, px: event.clientX, py: event.clientY };
                    boardRef.current?.setPointerCapture(event.pointerId);
                  }}
                />
              ))}
            </span>
          ) : null}
          {draft ? (
            <span
              className={`art-draft${tool === "ellipse" ? " is-ellipse" : ""}`}
              style={boxStyle(normalBox(draft), scale, nextFill)}
            />
          ) : null}
        </div>
      </div>
      <aside className="studio-side">
        <h3>Colour</h3>
        <ColourWheel colour={fill} onPick={paint} />
        <label>
          Hex
          <input
            value={hexDraft}
            maxLength={7}
            onChange={(event) => {
              setHexDraft(event.target.value);
              if (/^#[0-9a-fA-F]{6}$/.test(event.target.value)) paint(event.target.value);
            }}
          />
        </label>
        <label>
          Opacity
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            disabled={!selected}
            value={selected?.opacity ?? 1}
            onChange={(event) => selected && apply({ tool: "setOpacity", id: selected.id, opacity: Number(event.target.value) })}
          />
        </label>
        <div className="swatches">
          {["--paper", "--ink", "--blue", "--stamp", "--kraft"].map((token) => (
            <button key={token} type="button" className="swatch" style={{ background: `var(${token})` }} aria-label={token} onClick={() => paint(cssHex(token))} />
          ))}
        </div>
        {selected?.type === "text" ? (
          <label>
            Sentence
            <input value={selected.text} onChange={(event) => setScene(setStyle(scene, selected.id, { text: event.target.value, src: "" }))} />
          </label>
        ) : null}
        <h3>Layers</h3>
        <ul className="layer-list">
          {[...scene.layers].reverse().map((layer) => (
            <li key={layer.id}>
              <button type="button" className={scene.selection.includes(layer.id) ? "is-chosen" : ""} onClick={() => apply({ tool: "select", id: layer.id })}>
                {layer.hidden ? "Hidden " : ""}
                {layer.name}
              </button>
              <button type="button" onClick={() => apply({ tool: "hide", id: layer.id, hidden: !layer.hidden })} aria-label={layer.hidden ? "Show layer" : "Hide layer"}>
                Eye
              </button>
              <button type="button" onClick={() => apply({ tool: "reorder", id: layer.id, direction: "forward" })} aria-label="Bring forward">
                Up
              </button>
              <button type="button" onClick={() => apply({ tool: "reorder", id: layer.id, direction: "back" })} aria-label="Send back">
                Down
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <p className="studio-hint">
        {tool === "move"
          ? "Each word and each object is its own layer. Drag one to move it."
          : tool === "text"
            ? "Click the page to place a sentence."
            : tool === "image"
              ? "Choose a picture, or paste one, and it lands on the download."
              : "Drag on the page to draw. The colour is the fill of the next shape."}
      </p>
      <input
        ref={importRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,application/json,.json"
        hidden
        onChange={(event) => {
          const blob = event.target.files?.[0];
          if (blob) void importFile(blob);
          event.target.value = "";
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(event) => {
          const blob = event.target.files?.[0];
          if (blob) void placeBlob(blob);
          event.target.value = "";
        }}
      />
    </section>
  );
}

function LayerView({ file, layer, scale, selected }: { file: string; layer: Layer; scale: number; selected: boolean }) {
  if (layer.hidden) return null;
  const style = {
    left: layer.x * scale,
    top: layer.y * scale,
    width: layer.w * scale,
    height: layer.h * scale,
    opacity: layer.opacity,
    transform: `rotate(${layer.rotation}deg)`,
    mixBlendMode: layer.blend,
    outline: selected ? "1px solid var(--blue)" : undefined,
  } as const;
  if (layer.type === "group") {
    return (
      <div className="art-layer" style={style}>
        {layer.children.map((child) => (
          <LayerView key={child.id} file={file} layer={child} scale={scale} selected={selected && false} />
        ))}
      </div>
    );
  }
  if (layer.type === "image" || (layer.type === "text" && layer.src)) {
    return <img draggable={false} className="art-layer" src={imageSrc(file, layer.src)} alt="" style={style} />;
  }
  if (layer.type === "text") {
    return (
      <div className={`art-layer art-text art-font-${layer.font}`} style={{ ...style, color: layer.fill, fontSize: layer.size * scale }}>
        {layer.text}
      </div>
    );
  }
  return <div className={`art-layer${layer.type === "ellipse" ? " is-ellipse" : ""}`} style={{ ...style, background: layer.fill }} />;
}

function ColourWheel({ colour, onPick }: { colour: string; onPick: (fill: string) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const wheel = ref.current;
    const ctx = wheel?.getContext("2d");
    if (!wheel || !ctx) return;
    const size = 168;
    wheel.width = size;
    wheel.height = size;
    const pixels = ctx.createImageData(size, size);
    const center = size / 2;
    const radius = center - 2;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const dx = x - center;
        const dy = y - center;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) continue;
        const [r, g, b] = hsvToRgb((Math.atan2(dy, dx) * 180) / Math.PI, dist / radius, 1);
        const offset = (y * size + x) * 4;
        pixels.data[offset] = r;
        pixels.data[offset + 1] = g;
        pixels.data[offset + 2] = b;
        pixels.data[offset + 3] = 255;
      }
    }
    ctx.putImageData(pixels, 0, 0);
  }, []);
  return (
    <canvas
      ref={ref}
      className="colour-wheel"
      aria-label={`Colour wheel, ${colour}`}
      onPointerDown={(event) => {
        const wheel = ref.current;
        if (!wheel) return;
        const rect = wheel.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * wheel.width - wheel.width / 2;
        const y = ((event.clientY - rect.top) / rect.height) * wheel.height - wheel.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const radius = wheel.width / 2 - 2;
        if (dist > radius) return;
        const [r, g, b] = hsvToRgb((Math.atan2(y, x) * 180) / Math.PI, dist / radius, 1);
        onPick(rgbToHex(r, g, b));
      }}
    />
  );
}

function imageSrc(file: string, src: string) {
  if (src.startsWith("/board/")) return `/board/${encodeURIComponent(src.slice("/board/".length))}`;
  if (src.startsWith("asset:")) return `/desk/editor/file?file=${encodeURIComponent(file)}&asset=${src.slice("asset:".length)}`;
  return "";
}

function boxStyle(box: { x: number; y: number; w: number; h: number }, scale: number, fill: string) {
  return { left: box.x * scale, top: box.y * scale, width: box.w * scale, height: box.h * scale, background: fill };
}

function normalBox(box: { x: number; y: number; w: number; h: number }) {
  return {
    x: box.w < 0 ? box.x + box.w : box.x,
    y: box.h < 0 ? box.y + box.h : box.y,
    w: Math.abs(box.w),
    h: Math.abs(box.h),
  };
}

async function drawLayer(ctx: CanvasRenderingContext2D, layer: Layer, ox: number, oy: number, file: string) {
  if (layer.hidden) return;
  if (layer.type === "group") {
    for (const child of layer.children) await drawLayer(ctx, child, ox + layer.x, oy + layer.y, file);
    return;
  }
  ctx.save();
  ctx.globalAlpha = layer.opacity;
  ctx.translate(ox + layer.x + layer.w / 2, oy + layer.y + layer.h / 2);
  ctx.rotate((layer.rotation * Math.PI) / 180);
  ctx.translate(-layer.w / 2, -layer.h / 2);
  if (layer.src) {
    const image = await loadImage(imageSrc(file, layer.src));
    if (image) ctx.drawImage(image, 0, 0, layer.w, layer.h);
    ctx.restore();
    return;
  }
  if (layer.type === "rect" || layer.type === "ellipse") {
    ctx.fillStyle = layer.fill;
    if (layer.type === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(layer.w / 2, layer.h / 2, layer.w / 2, layer.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else ctx.fillRect(0, 0, layer.w, layer.h);
  } else if (layer.type === "text") {
    ctx.fillStyle = layer.fill;
    ctx.font = canvasFace(layer.font, layer.size);
    ctx.textBaseline = "top";
    ctx.fillText(layer.text, 0, 0);
  } else if (layer.type === "image" && layer.src) {
    const image = await loadImage(imageSrc(file, layer.src));
    if (image) ctx.drawImage(image, 0, 0, layer.w, layer.h);
  }
  ctx.restore();
}

async function recolorCutout(
  file: string,
  layer: Layer,
  fillValue: string,
  setScene: (scene: Scene | ((current: Scene | null) => Scene | null)) => void,
  setStatus: (status: string) => void,
) {
  const target = fillValue.match(/[0-9a-f]{2}/gi)?.map((part) => Number.parseInt(part, 16));
  const image = await loadImage(imageSrc(file, layer.src));
  if (!target || target.length < 3 || !image) return;
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(image, 0, 0);
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = frame;
  let seed = 0;
  let seen = 0;
  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] < 8) continue;
    seed += 0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
    seen += 1;
  }
  const base = seen ? seed / seen : 1;
  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] < 8) continue;
    const tone = (0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2]) / base;
    data[index] = Math.max(0, Math.min(255, Math.round(target[0] * tone)));
    data[index + 1] = Math.max(0, Math.min(255, Math.round(target[1] * tone)));
    data[index + 2] = Math.max(0, Math.min(255, Math.round(target[2] * tone)));
  }
  ctx.putImageData(frame, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) return;
  const response = await fetch(`/desk/editor/file?file=${encodeURIComponent(file)}&asset=1`, {
    method: "POST",
    headers: { "content-type": "image/png" },
    body: blob,
  });
  if (!response.ok) {
    setStatus("The colour did not land.");
    return;
  }
  const body = (await response.json()) as { src: string };
  setScene((current) => (current ? setStyle(current, layer.id, { src: body.src, fill: fillValue }) : current));
}

async function saveScene(file: string, scene: Scene, revisionRef: { current: number }, setStatus: (status: string) => void) {
  setStatus("Saving");
  const response = await fetch(`/desk/editor/file?file=${encodeURIComponent(file)}&scene=1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(scene),
  });
  if (!response.ok) {
    setStatus("Not saved.");
    return;
  }
  const body = (await response.json()) as { revision?: number };
  if (typeof body.revision === "number") revisionRef.current = Math.max(revisionRef.current, body.revision);
  setStatus("Saved");
}

function company(present: PersonId[], self: PersonId) {
  const names = present.filter((id) => id !== self).map((id) => personName(id).split(" ")[0]);
  if (!names.length) return "";
  return names.length === 1 ? ` · ${names[0]} is here` : ` · ${names.join(" and ")} are here`;
}

function download(url: string, name: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function remapAsset(scene: Scene, id: string, src: string): Scene {
  const next = structuredClone(scene);
  const walk = (layers: Layer[]) => {
    for (const layer of layers) {
      if (layer.src === `asset:${id}`) layer.src = src;
      walk(layer.children);
    }
  };
  walk(next.layers);
  return next;
}

async function assetMap(scene: Scene, file: string) {
  const assets: Record<string, string> = {};
  const walk = async (layers: Layer[]) => {
    for (const layer of layers) {
      if (layer.src.startsWith("asset:")) {
        const id = layer.src.slice("asset:".length);
        if (!assets[id]) {
          const response = await fetch(imageSrc(file, layer.src));
          if (response.ok) assets[id] = await dataUrl(await response.blob());
        }
      }
      await walk(layer.children);
    }
  };
  await walk(scene.layers);
  return assets;
}

function dataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

let layerClipboard: Layer[] = [];

function readLayerClipboard(text: string) {
  try {
    const parsed = JSON.parse(text) as { kind?: string; layers?: Layer[] };
    if (parsed.kind !== "offload-layers" || !Array.isArray(parsed.layers)) return [];
    return parsed.layers.filter((layer) => layer && typeof layer === "object" && typeof layer.type === "string");
  } catch {
    return [];
  }
}

function canvasFamily(font: Layer["font"]) {
  const probe = document.querySelector(`.art-font-${font}`);
  const measured = probe ? getComputedStyle(probe).fontFamily : "";
  const token = font === "sans" ? "--font-sans" : font === "script" ? "--font-script" : "--font-serif";
  const variable = getComputedStyle(document.documentElement).getPropertyValue(token);
  const first = (measured || variable).split(",")[0]?.trim().replaceAll('"', "") ?? "";
  if (first && !first.startsWith("var(")) return `'${first}'`;
  if (font === "sans") return "'Instrument Sans'";
  if (font === "script") return "'Caveat'";
  return "'Instrument Serif'";
}

function canvasFace(font: Layer["font"], size: number) {
  const weight = font === "script" ? 500 : 400;
  return `${weight} ${Math.max(1, size)}px ${canvasFamily(font)}`;
}

async function ensureExportFonts(scene: Scene) {
  const faces = new Set<string>([
    canvasFace("serif", 64),
    canvasFace("sans", 64),
    canvasFace("script", 64),
  ]);
  const walk = (layers: Layer[]) => {
    for (const layer of layers) {
      if (layer.type === "text" && !layer.src) faces.add(canvasFace(layer.font, layer.size));
      walk(layer.children);
    }
  };
  walk(scene.layers);
  await Promise.all([...faces].map((face) => document.fonts.load(face).catch(() => [])));
  await document.fonts.ready;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function cssHex(token: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const probe = document.createElement("span");
  probe.style.color = raw || "#171717";
  document.body.appendChild(probe);
  const parts = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [23, 23, 23];
  probe.remove();
  return rgbToHex(parts[0] ?? 23, parts[1] ?? 23, parts[2] ?? 23);
}

function hsvToRgb(hue: number, sat: number, value: number): [number, number, number] {
  const h = ((hue % 360) + 360) % 360;
  const c = value * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = value - c;
  const channels = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ][Math.floor(h / 60)] ?? [0, 0, 0];
  return channels.map((channel) => Math.max(0, Math.min(255, Math.round((channel + m) * 255)))) as [number, number, number];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0")).join("")}`;
}
