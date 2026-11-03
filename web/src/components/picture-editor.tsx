"use client";

import { useEffect, useRef, useState } from "react";

type Line = { text: string; x: number; y: number; w: number; h: number };
type Rgb = [number, number, number];

const swatches = [
  { name: "Paper", token: "--paper" },
  { name: "Ink", token: "--ink" },
  { name: "Blue", token: "--blue" },
  { name: "Stamp", token: "--stamp" },
  { name: "Kraft", token: "--kraft" },
] as const;

export function PictureEditor({ file, title }: { file: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<ImageData | null>(null);
  const maskRef = useRef<Uint8Array | null>(null);
  const seedLum = useRef(1);
  const familyRef = useRef("Georgia, serif");
  const [lines, setLines] = useState<Line[] | null>(null);
  const [drafts, setDrafts] = useState<string[]>([]);
  const [status, setStatus] = useState("Opening the picture.");
  const [selected, setSelected] = useState(false);
  const [tolerance, setTolerance] = useState(36);
  const [rev, setRev] = useState(0);
  const toleranceRef = useRef(tolerance);
  toleranceRef.current = tolerance;

  useEffect(() => {
    const probe = document.querySelector(".picture-serif");
    if (probe) familyRef.current = getComputedStyle(probe).fontFamily;
    let cancel = false;
    const query = encodeURIComponent(file);
    Promise.all([
      fetch(`/desk/layouts/picture?file=${query}`).then((response) => response.blob()),
      fetch(`/desk/layouts/picture?file=${query}&read=1`).then((response) => response.json()),
    ]).then(async ([blob, body]) => {
      if (cancel) return;
      const bitmap = await createImageBitmap(blob);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      imageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      maskRef.current = new Uint8Array(canvas.width * canvas.height);
      const read = body as { width?: number; height?: number; lines?: Line[] };
      const sx = read.width ? canvas.width / read.width : 1;
      const sy = read.height ? canvas.height / read.height : 1;
      const found = (read.lines ?? []).map((line) => ({
        text: line.text,
        x: Math.round(line.x * sx),
        y: Math.round(line.y * sy),
        w: Math.round(line.w * sx),
        h: Math.round(line.h * sy),
      }));
      setLines(found);
      setDrafts(found.map((line) => line.text));
      setSelected(false);
      setStatus(found.length ? "Saved" : "No text was found. Click a part of the picture to select it.");
      paint();
    });
    return () => {
      cancel = true;
    };
    // paint closes over refs. The file is the only reason to reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (rev === 0) return;
    const image = imageRef.current;
    if (!image) return;
    const handle = setTimeout(async () => {
      setStatus("Saving");
      const copy = document.createElement("canvas");
      copy.width = image.width;
      copy.height = image.height;
      copy.getContext("2d")?.putImageData(image, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) => copy.toBlob(resolve, "image/jpeg", 0.92));
      if (!blob) {
        setStatus("Not saved.");
        return;
      }
      const response = await fetch(`/desk/layouts/picture?file=${encodeURIComponent(file)}`, {
        method: "POST",
        headers: { "content-type": "image/jpeg" },
        body: blob,
      });
      setStatus(response.ok ? "Saved" : "Not saved.");
    }, 600);
    return () => clearTimeout(handle);
  }, [file, rev]);

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
      const o = i * 4;
      view.data[o] = Math.round(view.data[o] * 0.55 + blue[0] * 0.45);
      view.data[o + 1] = Math.round(view.data[o + 1] * 0.55 + blue[1] * 0.45);
      view.data[o + 2] = Math.round(view.data[o + 2] * 0.55 + blue[2] * 0.45);
    }
    ctx.putImageData(view, 0, 0);
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

  function onPick(event: React.PointerEvent<HTMLCanvasElement>) {
    const image = imageRef.current;
    const mask = maskRef.current;
    const at = point(event);
    if (!image || !mask || !at) return;
    if (!event.shiftKey) mask.fill(0);
    const added = flood(image, mask, at.x, at.y, toleranceRef.current);
    if (added) {
      const o = (at.y * image.width + at.x) * 4;
      seedLum.current = luminance(image.data[o], image.data[o + 1], image.data[o + 2]) || 1;
    }
    setSelected(mask.some((bit) => bit === 1));
    paint();
  }

  function onColour(token: string) {
    const image = imageRef.current;
    const mask = maskRef.current;
    if (!image || !mask || !mask.some((bit) => bit === 1)) {
      setStatus("Click a part of the picture first.");
      return;
    }
    const target = cssColour(token);
    const seed = seedLum.current || 1;
    for (let i = 0; i < mask.length; i += 1) {
      if (!mask[i]) continue;
      const o = i * 4;
      const scale = luminance(image.data[o], image.data[o + 1], image.data[o + 2]) / seed;
      image.data[o] = clamp(target[0] * scale);
      image.data[o + 1] = clamp(target[1] * scale);
      image.data[o + 2] = clamp(target[2] * scale);
    }
    paint();
    setRev((value) => value + 1);
  }

  function selectLine(line: Line) {
    const image = imageRef.current;
    const mask = maskRef.current;
    if (!image || !mask) return;
    mask.fill(0);
    const x0 = Math.max(0, line.x);
    const y0 = Math.max(0, line.y);
    const x1 = Math.min(image.width, line.x + line.w);
    const y1 = Math.min(image.height, line.y + line.h);
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) mask[y * image.width + x] = 1;
    }
    const o = (y0 * image.width + x0) * 4;
    seedLum.current = luminance(image.data[o], image.data[o + 1], image.data[o + 2]) || 1;
    setSelected(true);
    paint();
  }

  function writeLine(index: number) {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const line = lines?.[index];
    const text = drafts[index]?.trim() ?? "";
    const ctx = canvas?.getContext("2d");
    if (!image || !canvas || !line || !text || !ctx) return;
    const pad = 4;
    const x = Math.max(0, line.x - pad);
    const y = Math.max(0, line.y - pad);
    const w = Math.min(image.width - x, line.w + pad * 2);
    const h = Math.min(image.height - y, line.h + pad * 2);
    const fill = edgeColour(image, x, y, w, h);
    const ink = cssColour("--ink");
    ctx.putImageData(image, 0, 0);
    ctx.fillStyle = `rgb(${fill[0]} ${fill[1]} ${fill[2]})`;
    ctx.fillRect(x, y, w, h);
    let size = Math.max(12, Math.floor(h * 0.72));
    ctx.font = `${size}px ${familyRef.current}`;
    ctx.fillStyle = `rgb(${ink[0]} ${ink[1]} ${ink[2]})`;
    ctx.textBaseline = "middle";
    while (size > 10 && ctx.measureText(text).width > w * 0.94) {
      size -= 1;
      ctx.font = `${size}px ${familyRef.current}`;
    }
    ctx.fillText(text, x + 2, y + h / 2);
    imageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    maskRef.current?.fill(0);
    setSelected(false);
    paint();
    setRev((value) => value + 1);
  }

  async function startAgain() {
    setStatus("Opening the picture.");
    await fetch(`/desk/layouts/picture?file=${encodeURIComponent(file)}`, { method: "DELETE" });
    setRev(0);
    const response = await fetch(`/desk/layouts/picture?file=${encodeURIComponent(file)}`);
    const bitmap = await createImageBitmap(await response.blob());
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    imageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    maskRef.current = new Uint8Array(canvas.width * canvas.height);
    setSelected(false);
    setStatus("Saved");
    paint();
  }

  return (
    <section className="phase-block">
      <h3>{title}</h3>
      <p className="split">Click a part of the picture to select it. Shift-click adds another part. Then pick a colour. The text found in the picture is on the right.</p>
      <p className="picture-serif" hidden>
        offload
      </p>
      <div className="picture-stage">
        <div>
          <canvas ref={canvasRef} aria-label="Picture. Click a part to select it." onPointerDown={onPick} />
          <label className="tolerance">
            Same colour
            <input type="range" min={12} max={90} value={tolerance} onChange={(event) => setTolerance(Number(event.target.value))} />
          </label>
          <div className="swatches">
            {swatches.map((swatch) => (
              <button key={swatch.token} type="button" className="swatch" style={{ background: `var(${swatch.token})` }} aria-label={swatch.name} onClick={() => onColour(swatch.token)} />
            ))}
          </div>
          <p className="save-state">{selected ? "A part is selected. " : ""}{status}</p>
          <button type="button" className="text-button" onClick={startAgain}>
            Start again from the download
          </button>
        </div>
        <div>
          <h3>Text in this picture</h3>
          {lines === null ? <p className="split">Reading the text.</p> : null}
          {lines?.length === 0 ? <p className="split">No text was found.</p> : null}
          <ul className="text-found">
            {(lines ?? []).map((line, index) => (
              <li key={`${line.x}-${line.y}-${index}`}>
                <label>
                  Found
                  <input
                    value={drafts[index] ?? ""}
                    aria-label={`Text found: ${line.text}`}
                    onChange={(event) =>
                      setDrafts((current) => current.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))
                    }
                    onFocus={() => selectLine(line)}
                  />
                </label>
                <button type="button" onClick={() => writeLine(index)}>
                  Write this
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function cssColour(token: string): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim() || "#171717";
  const probe = document.createElement("span");
  probe.style.color = raw;
  document.body.appendChild(probe);
  const parsed = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [23, 23, 23];
  probe.remove();
  return [parsed[0] ?? 23, parsed[1] ?? 23, parsed[2] ?? 23];
}

function luminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function clamp(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function flood(image: ImageData, mask: Uint8Array, x: number, y: number, tolerance: number) {
  const { width, height, data } = image;
  const start = (y * width + x) * 4;
  const sr = data[start];
  const sg = data[start + 1];
  const sb = data[start + 2];
  const limit = tolerance * tolerance * 3;
  const seen = new Uint8Array(width * height);
  const qx = new Int32Array(width * height);
  const qy = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  let added = 0;
  qx[tail] = x;
  qy[tail] = y;
  tail += 1;
  while (head < tail) {
    const cx = qx[head];
    const cy = qy[head];
    head += 1;
    const pixel = cy * width + cx;
    if (seen[pixel]) continue;
    seen[pixel] = 1;
    const offset = pixel * 4;
    const dr = data[offset] - sr;
    const dg = data[offset + 1] - sg;
    const db = data[offset + 2] - sb;
    if (dr * dr + dg * dg + db * db > limit) continue;
    if (!mask[pixel]) added += 1;
    mask[pixel] = 1;
    if (cx > 0 && !seen[pixel - 1]) {
      qx[tail] = cx - 1;
      qy[tail] = cy;
      tail += 1;
    }
    if (cx + 1 < width && !seen[pixel + 1]) {
      qx[tail] = cx + 1;
      qy[tail] = cy;
      tail += 1;
    }
    if (cy > 0 && !seen[pixel - width]) {
      qx[tail] = cx;
      qy[tail] = cy - 1;
      tail += 1;
    }
    if (cy + 1 < height && !seen[pixel + width]) {
      qx[tail] = cx;
      qy[tail] = cy + 1;
      tail += 1;
    }
  }
  return added;
}

function edgeColour(image: ImageData, x: number, y: number, w: number, h: number): Rgb {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const x1 = Math.min(image.width - 1, x + w);
  const y1 = Math.min(image.height - 1, y + h);
  const take = (px: number, py: number) => {
    const o = (py * image.width + px) * 4;
    r += image.data[o];
    g += image.data[o + 1];
    b += image.data[o + 2];
    n += 1;
  };
  for (let px = x; px <= x1; px += 1) {
    take(px, y);
    take(px, y1);
  }
  for (let py = y; py <= y1; py += 1) {
    take(x, py);
    take(x1, py);
  }
  if (!n) return [image.data[0], image.data[1], image.data[2]];
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
}
