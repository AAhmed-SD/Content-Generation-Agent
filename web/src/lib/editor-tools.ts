import {
  align,
  booleanOp,
  findLayer,
  groupLayers,
  pasteLayers,
  copySelection,
  removeLayers,
  reorder,
  setStyle,
  type Scene,
} from "@/lib/scene";

const colours: Record<string, string> = {
  paper: "#f3efe4",
  ink: "#171717",
  blue: "#2746d6",
  stamp: "#b4332c",
  kraft: "#c4a574",
};

const banned =
  /\b(cure|guaranteed|diagnos|suicide|kill myself|onlyfans|escort|nude|porn|hostess|ai-powered)\b/i;

export const claudeTools = [
  "select",
  "move",
  "resize",
  "setText",
  "setFill",
  "setOpacity",
  "setFont",
  "reorder",
  "hide",
  "duplicate",
  "delete",
  "align",
  "group",
] as const;

export type ClaudeTool = (typeof claudeTools)[number];

export type EditorCall = {
  tool: string;
  id?: string;
  ids?: string[];
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  text?: string;
  fill?: string;
  opacity?: number;
  font?: string;
  direction?: string;
  hidden?: boolean;
  edge?: string;
  op?: string;
};

export function runEditorTools(scene: Scene, calls: EditorCall[], actor: "claude" | "person" = "person") {
  let next = scene;
  for (const call of calls) {
    const step = runEditorTool(next, call, actor);
    if (step.error || !step.scene) return { scene: next, error: step.error || "That tool could not run." };
    next = step.scene;
  }
  return { scene: next, error: null as string | null };
}

export function runEditorTool(scene: Scene, call: EditorCall, actor: "claude" | "person" = "person") {
  const tool = call.tool;
  if (actor === "claude" && !claudeTools.includes(tool as ClaudeTool)) {
    return { scene: null, error: `${tool} is not a tool Claude may use.` };
  }
  if (tool === "select") {
    const ids = (call.ids ?? (call.id ? [call.id] : [])).filter((id) => findLayer(scene.layers, id));
    return { scene: { ...scene, selection: ids.slice(0, 20) }, error: null };
  }
  if (tool === "move" && call.id) {
    if (!finite(call.x) || !finite(call.y)) return { scene: null, error: "Move needs an x and a y." };
    return { scene: setStyle(scene, call.id, { x: call.x, y: call.y }), error: null };
  }
  if (tool === "resize" && call.id) {
    if (!finite(call.w) || !finite(call.h) || call.w < 1 || call.h < 1) return { scene: null, error: "Resize needs a width and a height." };
    return { scene: setStyle(scene, call.id, { w: call.w, h: call.h }), error: null };
  }
  if (tool === "setText" && call.id) {
    const layer = findLayer(scene.layers, call.id);
    if (!layer || layer.type !== "text") return { scene: null, error: "That layer is not text." };
    const text = (call.text ?? "").replace(/\s+/g, " ").trim().slice(0, 200);
    if (!text) return { scene: null, error: "The text is empty." };
    if (actor === "claude" && (banned.test(text) || /\d/.test(text) || /https?:\/\//i.test(text))) {
      return { scene: null, error: "That sentence is not allowed on a card." };
    }
    return { scene: setStyle(scene, call.id, { text }), error: null };
  }
  if (tool === "setFill" && call.id) {
    const fill = colourOf(call.fill ?? "");
    if (!fill) return { scene: null, error: "Fill must be paper, ink, blue, stamp, or kraft." };
    return { scene: setStyle(scene, call.id, { fill }), error: null };
  }
  if (tool === "setOpacity" && call.id) {
    if (!finite(call.opacity)) return { scene: null, error: "Opacity needs a number from 0 to 1." };
    return { scene: setStyle(scene, call.id, { opacity: Math.max(0, Math.min(1, call.opacity)) }), error: null };
  }
  if (tool === "setFont" && call.id) {
    if (call.font !== "serif" && call.font !== "sans" && call.font !== "script") {
      return { scene: null, error: "Font must be serif, sans, or script." };
    }
    return { scene: setStyle(scene, call.id, { font: call.font }), error: null };
  }
  if (tool === "reorder" && call.id) {
    if (call.direction !== "forward" && call.direction !== "back") return { scene: null, error: "Reorder needs forward or back." };
    return { scene: reorder(scene, call.id, call.direction), error: null };
  }
  if (tool === "hide" && call.id) return { scene: setStyle(scene, call.id, { hidden: Boolean(call.hidden) }), error: null };
  if (tool === "duplicate") return { scene: pasteLayers(scene, copySelection(scene)), error: null };
  if (tool === "delete") return { scene: removeLayers(scene, call.ids ?? scene.selection), error: null };
  if (tool === "align") {
    const edges = ["left", "center", "right", "top", "middle", "bottom"] as const;
    const edge = edges.find((item) => item === call.edge);
    if (!edge) return { scene: null, error: "Align needs an edge." };
    return { scene: align(scene, edge), error: null };
  }
  if (tool === "group") return { scene: groupLayers(scene), error: null };
  if (tool === "boolean" && actor === "person") {
    const ops = ["add", "subtract", "intersect"] as const;
    const op = ops.find((item) => item === call.op);
    if (!op) return { scene: null, error: "Boolean needs add, subtract, or intersect." };
    return { scene: booleanOp(scene, op), error: null };
  }
  return { scene: null, error: `Unknown tool ${tool}.` };
}

function colourOf(value: string) {
  const named = colours[value.toLowerCase()];
  if (named) return named;
  const hex = value.toLowerCase();
  return Object.values(colours).find((item) => item === hex) ?? "";
}

function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
