export type LayerType = "rect" | "ellipse" | "text" | "image" | "group";
export type Blend = "normal" | "multiply" | "screen" | "overlay";
export type FontName = "serif" | "sans" | "script";

export type Layer = {
  id: string;
  type: LayerType;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  opacity: number;
  blend: Blend;
  locked: boolean;
  hidden: boolean;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text: string;
  font: FontName;
  size: number;
  src: string;
  children: Layer[];
};

export type Scene = {
  artboard: { w: number; h: number; bg: string };
  selection: string[];
  layers: Layer[];
};

const hex = /^#[0-9a-fA-F]{6}$/;
const blends = new Set<Blend>(["normal", "multiply", "screen", "overlay"]);
const fonts = new Set<FontName>(["serif", "sans", "script"]);
const types = new Set<LayerType>(["rect", "ellipse", "text", "image", "group"]);

export function createScene(w: number, h: number, src: string, bg: string): Scene {
  return {
    artboard: { w, h, bg },
    selection: [],
    layers: [
      baseLayer({
        id: "layer_download",
        type: "image",
        name: "Download",
        x: 0,
        y: 0,
        w,
        h,
        src,
      }),
    ],
  };
}

export function addShape(scene: Scene, type: "rect" | "ellipse", box: { x: number; y: number; w: number; h: number }, fill: string) {
  const next = clone(scene);
  const layer = baseLayer({
    id: nid(),
    type,
    name: type === "rect" ? "Rectangle" : "Ellipse",
    ...box,
    fill,
  });
  next.layers.push(layer);
  next.selection = [layer.id];
  return next;
}

export function addText(scene: Scene, x: number, y: number, fill: string) {
  const next = clone(scene);
  const layer = baseLayer({
    id: nid(),
    type: "text",
    name: "Text",
    x,
    y,
    w: 420,
    h: 80,
    fill,
    text: "Your sentence",
    size: 64,
  });
  next.layers.push(layer);
  next.selection = [layer.id];
  return next;
}

export function placeImage(scene: Scene, src: string, box: { x: number; y: number; w: number; h: number }) {
  const next = clone(scene);
  const layer = baseLayer({ id: nid(), type: "image", name: "Image", ...box, src });
  next.layers.push(layer);
  next.selection = [layer.id];
  return next;
}

export function setStyle(scene: Scene, id: string, patch: Partial<Layer>) {
  const next = clone(scene);
  const layer = findLayer(next.layers, id);
  if (!layer || layer.locked) return next;
  Object.assign(layer, patch);
  return next;
}

export function align(scene: Scene, edge: "left" | "center" | "right" | "top" | "middle" | "bottom") {
  const next = clone(scene);
  for (const id of next.selection) {
    const layer = findLayer(next.layers, id);
    if (!layer || layer.locked) continue;
    if (edge === "left") layer.x = 0;
    if (edge === "center") layer.x = (next.artboard.w - layer.w) / 2;
    if (edge === "right") layer.x = next.artboard.w - layer.w;
    if (edge === "top") layer.y = 0;
    if (edge === "middle") layer.y = (next.artboard.h - layer.h) / 2;
    if (edge === "bottom") layer.y = next.artboard.h - layer.h;
  }
  return next;
}

export function reorder(scene: Scene, id: string, direction: "forward" | "back") {
  const next = clone(scene);
  const index = next.layers.findIndex((layer) => layer.id === id);
  const swap = direction === "forward" ? index + 1 : index - 1;
  if (index < 0 || swap < 0 || swap >= next.layers.length) return next;
  const [layer] = next.layers.splice(index, 1);
  next.layers.splice(swap, 0, layer);
  return next;
}

export function copySelection(scene: Scene) {
  return scene.layers.filter((layer) => scene.selection.includes(layer.id)).map((layer) => structuredClone(layer));
}

export function pasteLayers(scene: Scene, layers: Layer[]) {
  if (!layers.length) return scene;
  const next = clone(scene);
  const copies = layers.map((layer) => retarget(layer, 24, 24));
  next.layers.push(...copies);
  next.selection = copies.map((layer) => layer.id);
  return next;
}

export function removeLayers(scene: Scene, ids: string[]) {
  const next = clone(scene);
  next.layers = next.layers.filter((layer) => !ids.includes(layer.id) || layer.locked);
  next.selection = next.selection.filter((id) => next.layers.some((layer) => layer.id === id));
  return next;
}

export function groupLayers(scene: Scene) {
  const next = clone(scene);
  const picked = next.layers.filter((layer) => next.selection.includes(layer.id) && !layer.locked);
  if (picked.length < 2) return next;
  const x = Math.min(...picked.map((layer) => layer.x));
  const y = Math.min(...picked.map((layer) => layer.y));
  const right = Math.max(...picked.map((layer) => layer.x + layer.w));
  const bottom = Math.max(...picked.map((layer) => layer.y + layer.h));
  const group = baseLayer({
    id: nid(),
    type: "group",
    name: "Group",
    x,
    y,
    w: right - x,
    h: bottom - y,
  });
  group.children = picked.map((layer) => ({ ...layer, x: layer.x - x, y: layer.y - y }));
  next.layers = next.layers.filter((layer) => !picked.some((item) => item.id === layer.id));
  next.layers.push(group);
  next.selection = [group.id];
  return next;
}

export function booleanOp(scene: Scene, op: "add" | "subtract" | "intersect") {
  const next = clone(scene);
  const picked = next.layers.filter((layer) => next.selection.includes(layer.id) && (layer.type === "rect" || layer.type === "ellipse"));
  if (picked.length !== 2) return next;
  const [back, front] = picked;
  const box = overlap(back, front);
  let created: Layer[] = [];
  if (op === "add") {
    const x = Math.min(back.x, front.x);
    const y = Math.min(back.y, front.y);
    created = [
      baseLayer({
        ...front,
        id: nid(),
        type: "rect",
        name: "Union",
        x,
        y,
        w: Math.max(back.x + back.w, front.x + front.w) - x,
        h: Math.max(back.y + back.h, front.y + front.h) - y,
      }),
    ];
  } else if (op === "intersect" && box) {
    created = [baseLayer({ ...front, id: nid(), type: "rect", name: "Intersect", ...box })];
  } else if (op === "subtract") {
    created = subtractRect(back, front);
  }
  if (created.length === 0) return next;
  const ids = new Set(picked.map((layer) => layer.id));
  next.layers = next.layers.filter((layer) => !ids.has(layer.id));
  next.layers.push(...created);
  next.selection = created.map((layer) => layer.id);
  return next;
}

export function findLayer(layers: Layer[], id: string): Layer | null {
  for (const layer of layers) {
    if (layer.id === id) return layer;
    const child = findLayer(layer.children, id);
    if (child) return child;
  }
  return null;
}

export function hitTest(layers: Layer[], x: number, y: number, ox = 0, oy = 0): Layer | null {
  for (let index = layers.length - 1; index >= 0; index -= 1) {
    const layer = layers[index];
    if (layer.hidden) continue;
    const left = ox + layer.x;
    const top = oy + layer.y;
    if (x >= left && y >= top && x <= left + layer.w && y <= top + layer.h) return layer;
  }
  return null;
}

export function cleanScene(value: unknown): Scene | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const board = row.artboard as Record<string, unknown> | undefined;
  const w = Number(board?.w);
  const h = Number(board?.h);
  const bg = typeof board?.bg === "string" && hex.test(board.bg) ? board.bg : "";
  if (!bg || !Number.isFinite(w) || !Number.isFinite(h) || w < 8 || h < 8 || w > 4000 || h > 4000) return null;
  const layers = cleanLayers(row.layers, 0);
  if (!layers) return null;
  const selection = Array.isArray(row.selection) ? row.selection.map(String).filter((id) => findLayer(layers, id)).slice(0, 20) : [];
  return { artboard: { w, h, bg }, selection, layers };
}

function cleanLayers(value: unknown, depth: number): Layer[] | null {
  if (!Array.isArray(value) || value.length > 80 || depth > 4) return null;
  const layers: Layer[] = [];
  for (const item of value) {
    const layer = cleanLayer(item, depth);
    if (!layer) return null;
    layers.push(layer);
  }
  return layers;
}

function cleanLayer(value: unknown, depth: number): Layer | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const type = row.type;
  if (typeof type !== "string" || !types.has(type as LayerType)) return null;
  const src = typeof row.src === "string" ? row.src : "";
  if (src && !/^\/board\/[\w.-]+$/.test(src) && !/^asset:a\d+$/.test(src)) return null;
  const children = type === "group" ? cleanLayers(row.children ?? [], depth + 1) : [];
  if (!children) return null;
  const font = typeof row.font === "string" && fonts.has(row.font as FontName) ? (row.font as FontName) : "serif";
  const blend = typeof row.blend === "string" && blends.has(row.blend as Blend) ? (row.blend as Blend) : "normal";
  return {
    id: String(row.id ?? nid()).slice(0, 40),
    type: type as LayerType,
    name: String(row.name ?? type).slice(0, 40),
    x: num(row.x),
    y: num(row.y),
    w: Math.max(1, num(row.w, 10)),
    h: Math.max(1, num(row.h, 10)),
    rotation: num(row.rotation),
    opacity: Math.max(0, Math.min(1, Number(row.opacity ?? 1) || 0)),
    blend,
    locked: Boolean(row.locked),
    hidden: Boolean(row.hidden),
    fill: typeof row.fill === "string" && hex.test(row.fill) ? row.fill : "#171717",
    stroke: typeof row.stroke === "string" && hex.test(row.stroke) ? row.stroke : "#171717",
    strokeWidth: Math.max(0, Math.min(80, num(row.strokeWidth))),
    text: String(row.text ?? "").slice(0, 200),
    font,
    size: Math.max(8, Math.min(800, num(row.size, 48))),
    src,
    children,
  };
}

function baseLayer(patch: Partial<Layer> & Pick<Layer, "id" | "type" | "name">): Layer {
  return {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    rotation: 0,
    opacity: 1,
    blend: "normal",
    locked: false,
    hidden: false,
    fill: "#171717",
    stroke: "#171717",
    strokeWidth: 0,
    text: "",
    font: "serif",
    size: 64,
    src: "",
    children: [],
    ...patch,
  };
}

function overlap(a: Layer, b: Layer) {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const bottom = Math.min(a.y + a.h, b.y + b.h);
  if (right - x < 2 || bottom - y < 2) return null;
  return { x, y, w: right - x, h: bottom - y };
}

function subtractRect(back: Layer, front: Layer) {
  const hole = overlap(back, front);
  if (!hole) return [back];
  const right = back.x + back.w;
  const bottom = back.y + back.h;
  const pieces = [
    { x: back.x, y: back.y, w: hole.x - back.x, h: back.h },
    { x: hole.x + hole.w, y: back.y, w: right - (hole.x + hole.w), h: back.h },
    { x: hole.x, y: back.y, w: hole.w, h: hole.y - back.y },
    { x: hole.x, y: hole.y + hole.h, w: hole.w, h: bottom - (hole.y + hole.h) },
  ];
  return pieces
    .filter((piece) => piece.w > 1 && piece.h > 1)
    .map((piece) => baseLayer({ ...back, id: nid(), name: "Rectangle", ...piece, children: [] }));
}

function clone(scene: Scene): Scene {
  return structuredClone(scene);
}

function retarget(layer: Layer, dx: number, dy: number): Layer {
  const next = structuredClone(layer);
  next.id = nid();
  next.x += dx;
  next.y += dy;
  next.locked = false;
  next.children = next.children.map((child) => retarget(child, 0, 0));
  return next;
}

function nid() {
  return `layer_${Math.random().toString(36).slice(2, 10)}`;
}

function num(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
