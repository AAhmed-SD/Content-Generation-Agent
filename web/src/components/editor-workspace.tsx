"use client";

import { useEffect, useRef, useState } from "react";
import { applyConfidence, fillPolygon, fillRect, flood, glyphMask, inpaint, maskCount, recolor, type Box, type Rgb } from "@/lib/editor-bitmap";

type Tool = "object" | "box" | "lasso" | "text";
type FontName = "serif" | "sans" | "script";
type TextItem = { id: string; text: string; x: number; y: number; size: number; color: string; font: FontName };
type Found = Box & { text: string };
type OpenFile = { file: string; name: string };

const tools: { id: Tool; label: string }[] = [
  { id: "object", label: "Object" },
  { id: "box", label: "Box" },
  { id: "lasso", label: "Lasso" },
  { id: "text", label: "Text" },
];

const swatches = [
  { name: "Paper", token: "--paper" },
  { name: "Ink", token: "--ink" },
  { name: "Blue", token: "--blue" },
  { name: "Stamp", token: "--stamp" },
  { name: "Kraft", token: "--kraft" },
] as const;

type Segmenter = import("@mediapipe/tasks-vision").InteractiveSegmenter;

let segmenterPromise: Promise<Segmenter | null> | null = null;

function loadSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = import("@mediapipe/tasks-vision")
      .then(async (vision) => {
        const files = await vision.FilesetResolver.forVisionTasks("/mediapipe");
        return vision.InteractiveSegmenter.createFromModelPath(files, "/models/interactive_segmentation.task");
      })
      .catch(() => null);
  }
  return segmenterPromise;
}

export function EditorWorkspace({ files }: { files: OpenFile[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<ImageData | null>(null);
  const maskRef = useRef<Uint8Array | null>(null);
  const encoded = useRef<ImageData | null>(null);
  const shape = useRef<{ kind: "box" | "lasso"; points: { x: number; y: number }[]; add: boolean } | null>(null);
  const ticket = useRef(0);
  const textsRef = useRef<TextItem[]>([]);
  const drag = useRef<{ id: string; x: number; y: number; px: number; py: number } | null>(null);
  const [active, setActive] = useState(files[0]?.file ?? "");
  const [tool, setTool] = useState<Tool>("object");
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [found, setFound] = useState<Found[]>([]);
  const [drafts, setDrafts] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const [colour, setColour] = useState("#171717");
  const [light, setLight] = useState(1);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState("Opening the picture.");
  const [model, setModel] = useState("The object model is loading.");
  const [rev, setRev] = useState(0);
  const store = useRef(new Map<string, { image: ImageData; mask: Uint8Array; texts: TextItem[]; found: Found[]; drafts: string[] }>());
  textsRef.current = texts;

  useEffect(() => {
    const wheel = wheelRef.current;
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
        const offset = (y * size + x) * 4;
        if (dist > radius) continue;
        const [r, g, b] = hsvToRgb((Math.atan2(dy, dx) * 180) / Math.PI, dist / radius, 1);
        pixels.data[offset] = r;
        pixels.data[offset + 1] = g;
        pixels.data[offset + 2] = b;
        pixels.data[offset + 3] = 255;
      }
    }
    ctx.putImageData(pixels, 0, 0);
  }, []);

  useEffect(() => {
    let cancel = false;
    loadSegmenter().then((segmenter) => {
      if (!cancel) setModel(segmenter ? "Object select is ready." : "Object select is using colour match.");
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const watch = new ResizeObserver(() => setScale(canvas.getBoundingClientRect().width / canvas.width || 1));
    watch.observe(canvas);
    return () => watch.disconnect();
  }, [active]);

  useEffect(() => {
    void openFile(active);
    // openFile is recreated each render and closes over the latest setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (rev === 0 || !imageRef.current) return;
    const file = active;
    const image = imageRef.current;
    const current = textsRef.current;
    const handle = setTimeout(async () => {
      setStatus("Saving");
      const copy = document.createElement("canvas");
      copy.width = image.width;
      copy.height = image.height;
      copy.getContext("2d")?.putImageData(image, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) => copy.toBlob(resolve, "image/jpeg", 0.92));
      const query = encodeURIComponent(file);
      const picture = blob
        ? await fetch(`/desk/editor/file?file=${query}`, { method: "POST", headers: { "content-type": "image/jpeg" }, body: blob })
        : null;
      const doc = await fetch(`/desk/editor/file?file=${query}&doc=1`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ texts: current }),
      });
      setStatus(picture?.ok && doc.ok ? "Saved" : "Not saved.");
    }, 700);
    return () => clearTimeout(handle);
  }, [active, rev]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;
      if (typing) return;
      if ((event.key === "Backspace" || event.key === "Delete") && selectedText) {
        setTexts((current) => current.filter((item) => item.id !== selectedText));
        setSelectedText("");
        mark();
      }
      if (event.key === "Escape" && maskRef.current) {
        maskRef.current.fill(0);
        paint();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedText]);

  async function openFile(file: string) {
    if (!file) return;
    const mine = ++ticket.current;
    const stored = store.current.get(file);
    if (stored) {
      imageRef.current = stored.image;
      maskRef.current = stored.mask;
      encoded.current = null;
      setTexts(stored.texts);
      setFound(stored.found);
      setDrafts(stored.drafts);
      fitCanvas(stored.image);
      paint();
      return;
    }
    setStatus("Opening the picture.");
    const query = encodeURIComponent(file);
    const [blob, doc, read] = await Promise.all([
      fetch(`/desk/editor/file?file=${query}`).then((response) => response.blob()),
      fetch(`/desk/editor/file?file=${query}&doc=1`).then((response) => response.json()),
      fetch(`/desk/editor/file?file=${query}&read=1`).then((response) => response.json()),
    ]);
    if (mine !== ticket.current) return;
    const bitmap = await createImageBitmap(blob);
    const scaleTo = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scaleTo);
    canvas.height = Math.round(bitmap.height * scaleTo);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const body = read as { width?: number; height?: number; lines?: Found[] };
    const sx = body.width ? canvas.width / body.width : 1;
    const sy = body.height ? canvas.height / body.height : 1;
    const lines = (body.lines ?? []).map((line) => ({
      text: line.text,
      x: Math.round(line.x * sx),
      y: Math.round(line.y * sy),
      w: Math.max(1, Math.round(line.w * sx)),
      h: Math.max(1, Math.round(line.h * sy)),
    }));
    const saved = ((doc as { texts?: TextItem[] }).texts ?? []).map((item) => ({
      ...item,
      x: item.x * sx,
      y: item.y * sy,
      size: item.size * sx,
    }));
    if (mine !== ticket.current) return;
    imageRef.current = image;
    maskRef.current = new Uint8Array(image.width * image.height);
    encoded.current = null;
    setTexts(saved);
    setFound(lines);
    setDrafts(lines.map((line) => line.text));
    setSelectedText("");
    fitCanvas(image);
    setStatus(lines.length ? "Saved" : "No text was found. Click an object.");
    paint();
  }

  function fitCanvas(image: ImageData) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = image.width;
    canvas.height = image.height;
    setScale(canvas.getBoundingClientRect().width / image.width || 1);
  }

  function paint() {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const mask = maskRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !image || !mask || !ctx) return;
    const view = new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);
    const blue = cssColour("--blue");
    for (let i = 0; i < mask.length; i += 1) {
      if (!mask[i]) continue;
      const offset = i * 4;
      view.data[offset] = Math.round(view.data[offset] * 0.55 + blue[0] * 0.45);
      view.data[offset + 1] = Math.round(view.data[offset + 1] * 0.55 + blue[1] * 0.45);
      view.data[offset + 2] = Math.round(view.data[offset + 2] * 0.55 + blue[2] * 0.45);
    }
    ctx.putImageData(view, 0, 0);
    const draft = shape.current;
    if (!draft) return;
    ctx.strokeStyle = `rgb(${blue[0]} ${blue[1]} ${blue[2]})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (draft.kind === "box" && draft.points.length === 2) {
      const [a, b] = draft.points;
      ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    }
    if (draft.kind === "lasso") {
      draft.points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)));
      ctx.stroke();
    }
  }

  function mark() {
    setRev((value) => value + 1);
  }

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.min(canvas.width - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width))),
      y: Math.min(canvas.height - 1, Math.max(0, Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height))),
    };
  }

  async function selectObject(x: number, y: number, mode: "replace" | "add" | "subtract") {
    const image = imageRef.current;
    const mask = maskRef.current;
    if (!image || !mask) return;
    const segmenter = await loadSegmenter();
    let usedModel = false;
    if (segmenter) {
      try {
        if (encoded.current !== image) {
          const source = document.createElement("canvas");
          source.width = image.width;
          source.height = image.height;
          source.getContext("2d")?.putImageData(image, 0, 0);
          segmenter.setImage(source);
          encoded.current = image;
        }
        const result = segmenter.segment([
          { brushMode: 1, point: [{ x: (x + 0.5) / image.width, y: (y + 0.5) / image.height }], isCompleted: true },
        ]);
        const values = result.getAsFloat32Array();
        usedModel = applyConfidence(mask, image.width, image.height, values, result.width, result.height, mode === "add", mode === "subtract");
        result.close();
      } catch {
        usedModel = false;
      }
    }
    if (!usedModel) flood(image, mask, x, y, 28, mode === "add");
    paint();
  }

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const at = point(event);
    const image = imageRef.current;
    if (!at || !image) return;
    if (tool === "text") {
      const item: TextItem = { id: `t-${Date.now()}`, text: "Your sentence", x: at.x, y: at.y, size: 42, color: colour, font: "serif" };
      setTexts((current) => [...current, item]);
      setSelectedText(item.id);
      mark();
      return;
    }
    if (tool === "object") {
      const mode = event.shiftKey ? "add" : event.altKey ? "subtract" : "replace";
      void selectObject(at.x, at.y, mode);
      return;
    }
    shape.current = { kind: tool, points: [at, at], add: event.shiftKey };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const draft = shape.current;
    const at = point(event);
    if (!draft || !at) return;
    if (draft.kind === "box") draft.points[1] = at;
    else draft.points.push(at);
    paint();
  }

  function onPointerUp() {
    const draft = shape.current;
    const image = imageRef.current;
    const mask = maskRef.current;
    shape.current = null;
    if (!draft || !image || !mask) return;
    if (draft.kind === "box") {
      const [a, b] = draft.points;
      fillRect(mask, image.width, image.height, a.x, a.y, b.x, b.y, draft.add);
    } else fillPolygon(mask, image.width, image.height, draft.points, draft.add);
    paint();
  }

  function useColour(next: string) {
    setColour(next);
    const rgb = hexToRgb(next);
    if (selectedText) {
      setTexts((current) => current.map((item) => (item.id === selectedText ? { ...item, color: next } : item)));
      mark();
      return;
    }
    const image = imageRef.current;
    const mask = maskRef.current;
    if (!image || !mask || maskCount(mask) === 0) {
      setStatus("Select part of the picture, or a sentence, then choose a colour.");
      return;
    }
    recolor(image, mask, rgb);
    encoded.current = null;
    paint();
    mark();
  }

  function onWheel(event: React.PointerEvent<HTMLCanvasElement>) {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const rect = wheel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * wheel.width;
    const y = ((event.clientY - rect.top) / rect.height) * wheel.height;
    const dx = x - wheel.width / 2;
    const dy = y - wheel.height / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = wheel.width / 2 - 2;
    if (dist > radius) return;
    const [r, g, b] = hsvToRgb((Math.atan2(dy, dx) * 180) / Math.PI, dist / radius, light);
    useColour(rgbToHex(r, g, b));
  }

  function replaceLine(index: number) {
    const image = imageRef.current;
    const mask = maskRef.current;
    const line = found[index];
    const wording = drafts[index]?.trim() ?? "";
    if (!image || !mask || !line || !wording) return;
    mask.fill(0);
    glyphMask(image, line, mask, false);
    if (maskCount(mask) < 8) fillRect(mask, image.width, image.height, line.x, line.y, line.x + line.w, line.y + line.h, false);
    inpaint(image, mask);
    mask.fill(0);
    encoded.current = null;
    const item: TextItem = {
      id: `t-${Date.now()}`,
      text: wording,
      x: line.x,
      y: line.y,
      size: Math.max(18, Math.round(line.h * 0.82)),
      color: colour,
      font: "serif",
    };
    setTexts((current) => [...current, item]);
    setSelectedText(item.id);
    paint();
    mark();
  }

  function moveText(event: React.PointerEvent<HTMLButtonElement>, item: TextItem) {
    if (tool !== "text") return;
    setSelectedText(item.id);
    drag.current = { id: item.id, x: item.x, y: item.y, px: event.clientX, py: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moving(event: React.PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    const canvas = canvasRef.current;
    if (!current || !canvas) return;
    const ratio = canvas.width / canvas.getBoundingClientRect().width;
    const x = current.x + (event.clientX - current.px) * ratio;
    const y = current.y + (event.clientY - current.py) * ratio;
    setTexts((items) => items.map((item) => (item.id === current.id ? { ...item, x, y } : item)));
  }

  function moved() {
    if (!drag.current) return;
    drag.current = null;
    mark();
  }

  async function startAgain() {
    await fetch(`/desk/editor/file?file=${encodeURIComponent(active)}`, { method: "DELETE" });
    store.current.delete(active);
    imageRef.current = null;
    setRev(0);
    await openFile(active);
  }

  async function download() {
    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    if (!image) return;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(image, 0, 0);
    for (const item of texts) {
      ctx.fillStyle = item.color;
      ctx.font = `${item.size}px ${fontFamily(item.font)}`;
      ctx.textBaseline = "top";
      ctx.fillText(item.text, item.x, item.y);
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = active.replace(/\.\w+$/, "") + "-offload.jpg";
    link.click();
    URL.revokeObjectURL(url);
  }

  function chooseTab(file: string) {
    if (file === active || !imageRef.current || !maskRef.current) return;
    store.current.set(active, { image: imageRef.current, mask: maskRef.current, texts: textsRef.current, found, drafts });
    setActive(file);
  }

  const selected = maskRef.current ? maskCount(maskRef.current) > 0 : false;

  return (
    <section className="editor-workspace">
      <div className="editor-tabs">
        {files.map((item) => (
          <button key={item.file} type="button" className={item.file === active ? "text-button" : "text-button"} aria-current={item.file === active ? "true" : undefined} onClick={() => chooseTab(item.file)}>
            {item.name}
          </button>
        ))}
      </div>
      <div className="editor-body">
        <div className="editor-tools" role="toolbar" aria-label="Tools">
          {tools.map((item) => (
            <button key={item.id} type="button" aria-pressed={tool === item.id} onClick={() => setTool(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="editor-stage">
          <canvas ref={canvasRef} aria-label="Picture in the editor" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
          {texts.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`editor-float editor-font-${item.font}${item.id === selectedText ? " is-chosen" : ""}`}
              style={{ left: item.x * scale, top: item.y * scale, fontSize: item.size * scale, color: item.color, pointerEvents: tool === "text" ? "auto" : "none" }}
              onPointerDown={(event) => moveText(event, item)}
              onPointerMove={moving}
              onPointerUp={moved}
            >
              {item.text}
            </button>
          ))}
        </div>
        <aside className="editor-side">
          <h3>Colour</h3>
          <canvas ref={wheelRef} className="colour-wheel" aria-label="Colour wheel" onPointerDown={onWheel} />
          <label className="tolerance">
            Light
            <input
              type="range"
              min={0.15}
              max={1}
              step={0.01}
              value={light}
              onChange={(event) => setLight(Number(event.target.value))}
            />
          </label>
          <div className="swatches">
            {swatches.map((swatch) => (
              <button key={swatch.token} type="button" className="swatch" style={{ background: `var(${swatch.token})` }} aria-label={swatch.name} onClick={() => useColour(rgbToHex(...cssColour(swatch.token)))} />
            ))}
            <span className="swatch chosen-colour" style={{ background: colour }} />
          </div>
          <p className="save-state">{selected ? "A part is selected. " : ""}{model} {status}</p>
          <button type="button" className="text-button" onClick={() => maskRef.current?.fill(0) || paint()}>
            Clear the selection
          </button>
          <h3>Text in this picture</h3>
          <p className="split">Replace lifts the old words off the picture, then places your sentence on the clear paper. Drag it with the Text tool.</p>
          <ul className="text-found">
            {found.map((line, index) => (
              <li key={`${line.x}-${line.y}-${index}`}>
                <input
                  value={drafts[index] ?? ""}
                  aria-label={`Words found: ${line.text}`}
                  onChange={(event) => setDrafts((current) => current.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))}
                />
                <button type="button" onClick={() => replaceLine(index)}>
                  Replace
                </button>
              </li>
            ))}
          </ul>
          {found.length === 0 ? <p className="split">No text was found.</p> : null}
          {selectedText ? (
            <label>
              Sentence
              <input
                value={texts.find((item) => item.id === selectedText)?.text ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setTexts((current) => current.map((item) => (item.id === selectedText ? { ...item, text: value } : item)));
                  mark();
                }}
              />
            </label>
          ) : null}
          <button type="button" onClick={download}>
            Download the picture
          </button>
          <button type="button" className="text-button" onClick={startAgain}>
            Start again from the download
          </button>
        </aside>
      </div>
      <p className="editor-font-serif" hidden>
        serif
      </p>
      <p className="editor-font-sans" hidden>
        sans
      </p>
      <p className="editor-font-script" hidden>
        script
      </p>
    </section>
  );
}

function fontFamily(font: FontName) {
  const probe = document.querySelector(`.editor-font-${font}`);
  return probe ? getComputedStyle(probe).fontFamily : "Georgia, serif";
}

function cssColour(token: string): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim() || "rgb(23, 23, 23)";
  const probe = document.createElement("span");
  probe.style.color = raw;
  document.body.appendChild(probe);
  const parsed = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [23, 23, 23];
  probe.remove();
  return [parsed[0] ?? 23, parsed[1] ?? 23, parsed[2] ?? 23];
}

function hsvToRgb(hue: number, sat: number, value: number): Rgb {
  const h = ((hue % 360) + 360) % 360;
  const c = value * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = value - c;
  const sector = Math.floor(h / 60);
  const channels = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ][sector] ?? [0, 0, 0];
  return channels.map((channel) => byte((channel + m) * 255)) as Rgb;
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => byte(channel).toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(hex: string): Rgb {
  return [Number.parseInt(hex.slice(1, 3), 16), Number.parseInt(hex.slice(3, 5), 16), Number.parseInt(hex.slice(5, 7), 16)];
}

function byte(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}
