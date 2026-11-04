import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type SpringConfig,
} from "remotion";
import { tokens } from "../../tokens";
import { SCRIPT } from "../../story/fonts";
import timing from "./timing.json";
import { Kinetic, type KPart } from "../kinetic";

/**
 * Past papers, clean version: light canvas, one sans family, vector objects,
 * soft depth, spring motion. Same script and voiceover as the desk version.
 */
const INTER = "Inter";
loadFont({ family: INTER, url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const CLEAN_DURATION_S = timing.duration;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const at = (line: string, word: string) => {
  const l = timing.lines.find((x) => x.id === line)!;
  const w = l.words.find((x) => x.text.toLowerCase().replace(/[^a-z0-9']/g, "").startsWith(word.toLowerCase()));
  return w ? w.start : l.start;
};
const ls = (id: string) => timing.lines.find((x) => x.id === id)!.start;

const T = {
  stop: at("L1", "stop"),
  binge: at("L1", "like"),
  doPaper: ls("L2"),
  mark: at("L2", "mark"),
  feel: at("L2", "feel"),
  awful: at("L2", "awful"),
  next: at("L2", "next"),
  rewatch: ls("L3"),
  ten: at("L3", "ten"),
  same: at("L3", "same"),
  mistakes: at("L3", "mistakes"),
  marks: ls("L4"),
  lost: at("L4", "lost"),
  point: at("L4", "that's"),
  turn: ls("L5"),
  flashcard: at("L5", "flashcard"),
  redo: ls("L6"),
  three: at("L6", "three"),
  then: at("L6", "then"),
  week: at("L6", "week"),
  thats: ls("L7"),
  spacing: at("L7", "spacing"),
  its: at("L7", "it's"),
  sticks: at("L7", "sticks"),
  offload: ls("L8"),
  builds: at("L8", "builds"),
  deck: at("L8", "remediation"),
  exactly: at("L8", "exactly"),
  comment: ls("L9"),
  papers: at("L9", "papers"),
  send: at("L9", "send"),
  end: timing.duration,
};

// ---------- Motion helpers ----------
const GLIDE: SpringConfig = { damping: 200, mass: 1, stiffness: 120, overshootClamping: false };
const SNAP: SpringConfig = { damping: 200, mass: 0.6, stiffness: 260, overshootClamping: false };
const POP: SpringConfig = { damping: 14, mass: 0.5, stiffness: 220, overshootClamping: false };

type S = { x: number; y: number; s: number; r: number; o: number; b: number; ry: number };
type Key = { t: number; v: Partial<S>; c?: SpringConfig };
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

/** Each key springs the state toward its values from its time on. */
const track = (frame: number, fps: number, init: S, keys: Key[]): S =>
  keys.reduce((st, k) => {
    const kk = spring({ frame: frame - Math.round(k.t * fps), fps, config: k.c ?? GLIDE });
    if (kk === 0) return st;
    const out = { ...st };
    (Object.keys(k.v) as (keyof S)[]).forEach((p) => {
      out[p] = mix(st[p], k.v[p]!, kk);
    });
    return out;
  }, init);

const place = (s: S, w: number, h: number): React.CSSProperties => ({
  position: "absolute",
  left: s.x - w / 2,
  top: s.y - h / 2,
  width: w,
  height: h,
  transform: `perspective(2400px) rotateY(${s.ry}deg) rotate(${s.r}deg) scale(${s.s})`,
  opacity: Math.max(0, Math.min(1, s.o)),
  filter: s.b > 0.3 ? `blur(${s.b.toFixed(1)}px)` : undefined,
});

const soft = (d = 1) => `0 ${2 * d}px ${4 * d}px rgba(23,23,23,0.06), 0 ${18 * d}px ${50 * d}px rgba(23,23,23,0.12)`;

// ---------- Type ----------
/** Kinetic parts from spoken words, each with its own treatment. */
const kw = (text: string, line: string, fx: KPart["fx"] = "rise", per: Record<string, Partial<KPart>> = {}): KPart[] => {
  // Match words in order, so a repeated word ("the", "in") takes its own spoken time.
  const lw = timing.lines.find((x) => x.id === line)!.words;
  const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
  const ws = text.split(" ");
  let cur = Math.max(0, lw.findIndex((x) => norm(x.text) === norm(ws[0])));
  return ws.map((w) => {
    const key = norm(w);
    const idx = lw.findIndex((x, j) => j >= cur && norm(x.text) === key);
    const hit = idx >= 0 ? lw[idx] : lw[Math.min(cur, lw.length - 1)];
    if (idx >= 0) cur = idx + 1;
    return { text: w, t: hit.start, fx, ...(per[key.replace(/[^a-z0-9']/g, "")] ?? {}) };
  });
};

// ---------- Objects ----------
const CW = 700;
const CH = 960;
const rowY = (q: number) => -250 + (q - 1) * 195;

/** A clean vector exam paper. */
const PaperCard: React.FC<{ n: number; crosses: { q: number; t: number }[]; frame: number; fps: number; glowQ4?: number }> = ({ n, crosses, frame, fps, glowQ4 }) => (
  <div style={{ width: CW, height: CH, borderRadius: 34, background: tokens.white, boxShadow: soft(1.4), position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 56, top: 56, fontFamily: INTER, fontWeight: 700, fontSize: 30, letterSpacing: "-0.02em", color: tokens.ink }}>Paper {n}</div>
    <div style={{ position: "absolute", right: 56, top: 64, width: 150, height: 14, borderRadius: 7, background: tokens.line }} />
    <div style={{ position: "absolute", left: 56, right: 56, top: 116, height: 2, background: tokens.line }} />
    {[1, 2, 3, 4].map((q) => {
      const c = crosses.find((x) => x.q === q);
      const k = c ? spring({ frame: frame - Math.round(c.t * fps), fps, config: POP }) : 0;
      const tint = c ? spring({ frame: frame - Math.round(c.t * fps), fps, config: SNAP }) : 0;
      const top = CH / 2 + rowY(q) - 70;
      const g = q === 4 && glowQ4 !== undefined ? spring({ frame: frame - Math.round(glowQ4 * fps), fps, config: SNAP }) : 0;
      return (
        <div key={q} style={{ position: "absolute", left: 30, right: 30, top, height: 160, borderRadius: 22 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: tokens.problem, opacity: tint * 0.07 + g * 0.06 }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, border: `4px solid ${tokens.problem}`, opacity: g, transform: `scale(${1.04 - g * 0.04})` }} />
          <div style={{ position: "absolute", left: 26, top: 28, fontFamily: INTER, fontWeight: 700, fontSize: 32, color: tokens.ink }}>{q}</div>
          <div style={{ position: "absolute", left: 80, top: 40, width: 430 - q * 18, height: 16, borderRadius: 8, background: tokens.line }} />
          <div style={{ position: "absolute", left: 80, top: 72, width: 330 + q * 22, height: 16, borderRadius: 8, background: tokens.line }} />
          <div style={{ position: "absolute", left: 80, top: 104, width: 210, height: 16, borderRadius: 8, background: tokens.line }} />
          {c && k > 0 ? (
            <div style={{ position: "absolute", right: 26, top: 40, width: 80, height: 80, borderRadius: 40, background: tokens.problem, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})`, boxShadow: soft(0.5) }}>
              <svg width={36} height={36} viewBox="0 0 36 36">
                <path d="M8 8 L28 28 M28 8 L8 28" stroke={tokens.white} strokeWidth={6} strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <div style={{ position: "absolute", right: 26, top: 40, width: 80, height: 80, borderRadius: 40, border: `3px solid ${tokens.line}` }} />
          )}
        </div>
      );
    })}
  </div>
);

/** The flashcard: the lost question on the front, the card on the back. */
const Flash: React.FC<{ flip: number }> = ({ flip }) => {
  const face: React.CSSProperties = { position: "absolute", inset: 0, borderRadius: 40, background: tokens.white, boxShadow: soft(1.6), backfaceVisibility: "hidden", overflow: "hidden" };
  return (
    <div style={{ width: 760, height: 460, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${flip * 180}deg)` }}>
      <div style={face}>
        <div style={{ position: "absolute", inset: 0, background: tokens.problem, opacity: 0.08 }} />
        <div style={{ position: "absolute", left: 60, top: 70, fontFamily: INTER, fontWeight: 700, fontSize: 64, color: tokens.ink }}>4</div>
        {[520, 430, 260].map((w, i) => (
          <div key={i} style={{ position: "absolute", left: 150, top: 90 + i * 70, width: w, height: 26, borderRadius: 13, background: tokens.line }} />
        ))}
        <div style={{ position: "absolute", right: 60, top: 300, width: 100, height: 100, borderRadius: 50, background: tokens.problem, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={44} height={44} viewBox="0 0 36 36"><path d="M8 8 L28 28 M28 8 L8 28" stroke={tokens.white} strokeWidth={6} strokeLinecap="round" /></svg>
        </div>
      </div>
      <div style={{ ...face, transform: "rotateX(180deg)" }}>
        <div style={{ position: "absolute", left: 64, top: 60, fontFamily: INTER, fontWeight: 600, fontSize: 28, letterSpacing: "0.12em", color: tokens.quiet }}>FLASHCARD</div>
        <div style={{ position: "absolute", left: 60, top: 120, fontFamily: INTER, fontWeight: 800, fontSize: 150, letterSpacing: "-0.05em", color: tokens.ink, lineHeight: 1 }}>Q4</div>
        <div style={{ position: "absolute", left: 64, top: 320, width: 480, height: 22, borderRadius: 11, background: tokens.line }} />
        <div style={{ position: "absolute", left: 64, top: 370, width: 330, height: 22, borderRadius: 11, background: tokens.line }} />
      </div>
    </div>
  );
};

// ---------- Layout constants ----------
const CELL = 112;
const GAP = 14;
const CAL_Y = 1080;
const cellPos = (day: number) => {
  const i = day - 1;
  return { x: 540 + ((i % 7) - 3) * (CELL + GAP), y: CAL_Y + (Math.floor(i / 7) - 0.5) * (CELL + GAP) };
};
const PHONE = { x: 540, y: 1060, w: 488, h: 1040, r: 78 };

// Carousel scroll in card units; the focus card is whichever is centred at "Do a paper".
const scroll = (t: number) => 0.15 + 0.5 * t + 1.6 * Math.max(0, t - T.binge) ** 1.4;
const F = Math.round(scroll(T.doPaper));
const N = 7;
const H = F + 1; // the paper that slides in on "Next"
const FOCUS_Y = 1050;
const L4 = { y: 1110, s: 0.95 };
/** Screen position of a question's badge on a card at (x, y, scale). */
const badge = (q: number, x: number, y: number, sc: number) => ({ x: x + 254 * sc, y: y + (CH / 2 + rowY(q) - 70 + 80 - CH / 2) * sc });
const IRIS_A = badge(2, 540, FOCUS_Y, 1);
const IRIS_B = badge(4, 540, L4.y, L4.s);
const DAY11 = cellPos(11);

const crossesFor = (i: number) => {
  if (i === F) return [{ q: 1, t: T.mark + 0.02 }, { q: 3, t: T.feel }];
  if (i === H) return [{ q: 2, t: T.next + 0.42 }, { q: 4, t: T.rewatch + 0.5 }];
  return [];
};

// ---------- Sound ----------
const CUES: { t: number; s: string; v: number }[] = [
  { t: 0, s: "boom", v: 0.45 },
  { t: 0.02, s: "impact", v: 0.25 },
  ...["doing", "past", "papers", "like", "this"].flatMap((w) => [0, 0.05].map((d) => ({ t: at("L1", w) + d, s: "key", v: 0.14 }))),
  { t: T.binge - 0.1, s: "whoosh", v: 0.24 },
  { t: T.doPaper - 0.1, s: "whip", v: 0.28 },
  { t: T.doPaper, s: "swish", v: 0.25 },
  { t: T.mark, s: "stamp", v: 0.5 },
  { t: T.mark + 0.02, s: "pop", v: 0.22 },
  { t: T.feel, s: "pop", v: 0.3 },
  { t: T.awful, s: "thud", v: 0.3 },
  { t: T.next - 0.08, s: "whip", v: 0.3 },
  { t: T.next, s: "snap", v: 0.3 },
  { t: T.next + 0.42, s: "pop", v: 0.3 },
  { t: T.rewatch - 0.55, s: "reverse", v: 0.3 },
  { t: T.rewatch - 0.12, s: "iris", v: 0.4 },
  ...Array.from({ length: 10 }, (_, i) => ({ t: T.ten + i * 0.075, s: "tick", v: 0.2 })),
  { t: T.same, s: "swish", v: 0.25 },
  { t: T.mistakes, s: "thud", v: 0.42 },
  { t: T.mistakes + 0.02, s: "boom", v: 0.25 },
  { t: T.marks - 0.15, s: "iris", v: 0.35 },
  { t: T.lost, s: "pop_low", v: 0.34 },
  { t: T.point, s: "flip", v: 0.22 },
  { t: T.turn + 0.02, s: "swoosh_down", v: 0.22 },
  { t: T.flashcard - 0.1, s: "flip", v: 0.45 },
  { t: T.redo, s: "swish", v: 0.25 },
  { t: T.redo + 0.05, s: "click", v: 0.3 },
  { t: T.three - 0.05, s: "whoosh", v: 0.22 },
  { t: T.three + 0.35, s: "tick", v: 0.3 },
  { t: T.then, s: "swish", v: 0.22 },
  { t: T.week - 0.15, s: "whoosh", v: 0.22 },
  { t: T.week + 0.2, s: "tick", v: 0.3 },
  { t: T.thats - 0.5, s: "reverse", v: 0.3 },
  { t: T.thats - 0.12, s: "iris", v: 0.4 },
  { t: T.spacing, s: "boom", v: 0.5 },
  { t: T.spacing, s: "impact", v: 0.25 },
  { t: T.its + 0.1, s: "riser", v: 0.16 },
  { t: T.sticks, s: "pop", v: 0.3 },
  { t: T.offload - 0.12, s: "iris", v: 0.32 },
  { t: T.offload + 0.25, s: "swish", v: 0.25 },
  { t: T.builds + 0.25, s: "pop", v: 0.3 },
  { t: T.deck - 0.1, s: "sparkle", v: 0.3 },
  { t: T.deck, s: "ding", v: 0.3 },
  { t: T.exactly, s: "pop_low", v: 0.28 },
  { t: T.comment - 0.25, s: "whip", v: 0.3 },
  { t: T.comment - 0.05, s: "swish", v: 0.22 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.papers + i * 0.07, s: "key", v: 0.24 })),
  { t: T.papers + 0.6, s: "sparkle", v: 0.22 },
  { t: T.send, s: "chime", v: 0.2 },
];

const sprAt = (frame: number, fps: number, t0: number, c: Partial<SpringConfig> = SNAP) => spring({ frame: frame - Math.round(t0 * fps), fps, config: c });
const MINI = Array.from({ length: 10 }, (_, i) => ({ dx: ((i * 53) % 9) - 4, dy: -i * 9, r: ((i * 37) % 11) - 5 }));

// ---------- Variants: same edit, different look and type placement ----------
type TKey = "stop" | "sub" | "do" | "mark" | "feel" | "next" | "ten" | "same" | "marks" | "point" | "turn" | "redo" | "then" | "offload" | "method";
type Lay = { y?: number; size?: number; align?: "left" | "center" | "right"; vertical?: boolean; tilt?: number; behind?: boolean; colour?: string };
type Variant = { bg: string; fg: string; sub: string; flood: string; floodFg: string; edge: string; carY: number; layout: Partial<Record<TKey, Lay>> };
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
export const VARIANTS: Record<string, Variant> = {
  clean: { bg: tokens.white, fg: tokens.ink, sub: tokens.quiet, flood: tokens.ink, floodFg: tokens.white, edge: "transparent", carY: 1180, layout: {} },
  // Light, magazine layout: type hangs left and right, overlays the paper, runs up the edge.
  editorial: {
    bg: tokens.white, fg: tokens.ink, sub: tokens.quiet, flood: tokens.ink, floodFg: tokens.white, edge: "transparent", carY: 1210,
    layout: {
      stop: { y: 150, size: 300, align: "left" },
      sub: { y: 480, size: 80, align: "left" },
      do: { y: 230, align: "left", size: 130 },
      mark: { y: 860, size: 170, tilt: -6 },
      feel: { y: 220, align: "right", size: 130 },
      next: { y: 40, vertical: true, size: 130 },
      ten: { y: 250, align: "left", size: 150 },
      same: { y: 1410, align: "left", size: 140 },
      marks: { y: 190, align: "left", size: 116 },
      point: { y: 200, align: "right", size: 116 },
      turn: { y: 1290, size: 96 },
      redo: { y: 210, align: "left" },
      then: { y: 1330, align: "left", size: 120 },
      offload: { y: 170, align: "left", size: 180 },
      method: { y: 1400, align: "left" },
    },
  },
  // Dark: huge words sit behind the objects, white floods instead of black.
  dark: {
    bg: tokens.ink, fg: tokens.white, sub: tokens.card, flood: tokens.white, floodFg: tokens.ink, edge: alpha(tokens.white, 0.22), carY: 1090,
    layout: {
      stop: { y: 520, size: 380, behind: true },
      sub: { y: 1430, size: 78 },
      do: { y: 230, size: 150 },
      mark: { y: 870, size: 180, tilt: -8, colour: tokens.ink },
      feel: { y: 300, size: 190, behind: true },
      next: { y: 30, vertical: true, size: 140 },
      ten: { y: 230, size: 180 },
      same: { y: 1420, size: 150 },
      marks: { y: 240, align: "right", size: 112 },
      point: { y: 240, align: "left", size: 112 },
      turn: { y: 1300, size: 96 },
      redo: { y: 1320, size: 108 },
      then: { y: 230, size: 130 },
      offload: { y: 210, size: 200 },
    },
  },
  // Poster: warm paper, oversized type low in the frame, kraft flood for spacing.
  poster: {
    bg: tokens.paper, fg: tokens.ink, sub: tokens.quiet, flood: tokens.kraft, floodFg: tokens.ink, edge: "transparent", carY: 760,
    layout: {
      stop: { y: 1170, size: 340, align: "left" },
      sub: { y: 150, size: 84, align: "left" },
      do: { y: 20, vertical: true, size: 130 },
      mark: { y: 160, align: "right", size: 150 },
      feel: { y: 840, size: 190, tilt: 4 },
      next: { y: 170, align: "left", size: 130 },
      ten: { y: 230, align: "left", size: 150 },
      same: { y: 1400, align: "left", size: 150 },
      marks: { y: 30, vertical: true, size: 120 },
      point: { y: 210, align: "right", size: 112 },
      turn: { y: 200, align: "left", size: 110 },
      redo: { y: 1320, align: "left", size: 112 },
      then: { y: 210, align: "right", size: 120 },
      offload: { y: 190, align: "left", size: 210 },
      method: { y: 1400, align: "left" },
    },
  },
};

// ---------- The film ----------
export const PastPapersClean: React.FC<{ variant?: string }> = ({ variant = "clean" }) => {
  const V = VARIANTS[variant] ?? VARIANTS.clean;
  const lay = (k: TKey, d: { y: number; size: number }) => {
    const l = V.layout[k] ?? {};
    return { y: l.y ?? d.y, size: l.size ?? d.size, align: l.align, vertical: l.vertical, tilt: l.tilt, ...(l.colour ? { colour: l.colour } : {}) };
  };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const base: S = { x: 540, y: 960, s: 1, r: 0, o: 1, b: 0, ry: 0 };
  const punchAt = (p0: number, a: number) => (t < p0 ? 0 : a * Math.exp(-(t - p0) * 9) * Math.cos((t - p0) * 22));
  const breathe = 1 + 0.012 * Math.sin(t * 0.9) + 0.006 * Math.sin(t * 2.3) + punchAt(T.mark, 0.025) + punchAt(T.feel, 0.025) + punchAt(T.awful, 0.03) + punchAt(T.mistakes, 0.04) + punchAt(T.lost, 0.02);

  // Papers: carousel -> focus -> next -> (under the red) the hero sits ready for "lost"
  const cards = Array.from({ length: N }, (_, i) => {
    const sc = scroll(Math.min(t, T.doPaper));
    const car: S = { ...base, x: 540 + (i - sc) * 440, y: V.carY, s: 0.58, ry: Math.max(-48, Math.min(48, -(i - sc) * 30)) };
    const keys: Key[] = [
      { t: T.doPaper - 0.05, v: { x: 540 + (i - F) * 820, y: FOCUS_Y, s: 1, ry: 0, o: Math.abs(i - F) <= 1 ? 1 : 0 }, c: SNAP },
      { t: T.awful, v: { s: i === F ? 0.95 : 1, r: i === F ? -1.5 : 0 }, c: POP },
      { t: T.next - 0.04, v: i === F ? { x: -560, r: -16, o: 0, s: 0.9, b: 14 } : { x: 540 + (i - F - 1) * 820, s: 1, r: 0 }, c: SNAP },
      { t: T.rewatch + 0.35, v: i === H ? { y: L4.y, s: L4.s } : { o: 0 }, c: SNAP },
      { t: T.turn + 0.05, v: i === H ? { o: 0, b: 24, s: 1.2 } : {} },
    ];
    return { i, s: track(frame, fps, car, keys) };
  });

  // Flashcard
  const flash = track(frame, fps, { ...base, y: IRIS_B.y, s: 0.9, o: 0 }, [
    { t: T.turn, v: { o: 1 }, c: SNAP },
    { t: T.turn + 0.05, v: { s: 1, y: 980 } },
    { t: T.redo, v: { s: 0.5, y: 690 } },
    { t: T.three - 0.05, v: { x: cellPos(4).x, y: cellPos(4).y, s: 0.13 }, c: SNAP },
    { t: T.week - 0.15, v: { x: DAY11.x, y: DAY11.y, s: 0.13 }, c: SNAP },
    { t: T.thats + 0.2, v: { o: 0 } },
  ]);
  const flip = sprAt(frame, fps, T.flashcard - 0.1, { damping: 18, mass: 0.8, stiffness: 120 });
  const flashArc =
    Math.sin(interpolate(t, [T.three - 0.05, T.three + 0.45], [0, 1], clamp) * Math.PI) * 140 +
    Math.sin(interpolate(t, [T.week - 0.15, T.week + 0.35], [0, 1], clamp) * Math.PI) * 160;
  const flash2 = track(frame, fps, { ...base, y: -400, s: 0.3, r: -8 }, [
    { t: T.builds - 0.05, v: { y: 1000, s: 0.1, r: 0 }, c: SNAP },
    { t: T.builds + 0.3, v: { o: 0 }, c: SNAP },
  ]);

  // Calendar
  const cal = track(frame, fps, { ...base, y: CAL_Y, o: 0, s: 0.92 }, [{ t: T.redo + 0.05, v: { o: 1, s: 1 } }]);

  // Phone (revealed by the black morph)
  const phone = track(frame, fps, { ...base, y: PHONE.y, o: 0 }, [
    { t: T.offload + 0.3, v: { o: 1 }, c: SNAP },
    { t: T.comment - 0.2, v: { s: 4.5, o: 0, b: 30 }, c: SNAP },
  ]);
  const chip = sprAt(frame, fps, T.deck, POP);
  const pulse = (p0: number) => (t < p0 ? 0 : 1 - interpolate(t, [p0, p0 + 0.8], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) }));

  // ---- Transition 1: the red ✗ swallows the screen, then shrinks into question 4's ✗
  const redIn = sprAt(frame, fps, T.rewatch - 0.12, { damping: 200, mass: 0.6, stiffness: 140 });
  const redOut = sprAt(frame, fps, T.marks - 0.18, { damping: 200, mass: 0.6, stiffness: 150 });
  const redOn = t >= T.rewatch - 0.12 && redOut < 0.995;
  const redC = redOut > 0.001 ? IRIS_B : IRIS_A;
  const redR = 38 + 2300 * Math.min(1, redIn) * (1 - redOut);

  // ---- Transition 2: day 11 floods black, then the black folds into the phone
  const blackIn = sprAt(frame, fps, T.thats - 0.12, { damping: 200, mass: 0.6, stiffness: 140 });
  const fold = sprAt(frame, fps, T.offload - 0.12, { damping: 200, mass: 0.7, stiffness: 130 });
  const blackFade = interpolate(t, [T.offload + 0.45, T.offload + 0.7], [1, 0], clamp);
  const blackOn = t >= T.thats - 0.12 && blackFade > 0;
  const blackClip =
    fold < 0.001
      ? `circle(${(CELL / 2) * 1.1 + 2300 * Math.min(1, blackIn)}px at ${DAY11.x}px ${DAY11.y}px)`
      : `inset(${mix(0, PHONE.y - PHONE.h / 2, fold)}px ${mix(0, 540 - PHONE.w / 2, fold)}px ${mix(0, 1920 - PHONE.y - PHONE.h / 2, fold)}px ${mix(0, 540 - PHONE.w / 2, fold)}px round ${mix(0, PHONE.r, fold)}px)`;

  // Spacing title + chart, on black
  const sp = sprAt(frame, fps, T.spacing, { damping: 15, mass: 0.6, stiffness: 200 });
  const spUp = sprAt(frame, fps, T.its - 0.3, SNAP);
  const blackOut = sprAt(frame, fps, T.offload - 0.2);
  const draw = interpolate(t, [T.its + 0.05, T.sticks + 0.25], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2.4) });
  const CX0 = 120;
  const CX1 = 960;
  const CY0 = 720;
  const CY1 = 1400;
  const curve = (reviews: number[]) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const u = i / 120;
      const hit = [0, ...reviews].filter((r) => r <= u);
      const v = 0.18 + 0.82 * Math.exp(-(u - hit[hit.length - 1]) * (4.2 / Math.pow(hit.length, 1.8)));
      pts.push(`${(CX0 + u * (CX1 - CX0)).toFixed(1)} ${(CY1 - v * (CY1 - CY0) * 0.92).toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  // End
  const bubble = sprAt(frame, fps, T.papers - 0.2, POP);
  const typed = Math.floor(interpolate(t, [T.papers, T.papers + 0.45], [0, 6], clamp));
  const mark = sprAt(frame, fps, T.papers + 0.6);
  const endIn = sprAt(frame, fps, T.comment - 0.15);

  const TEXT: [TKey, React.ReactElement][] = [
    ["stop", <Kinetic key="stop" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("stop", { y: 190, size: 240 })} weight={850} out={T.doPaper - 0.08} exit="scale" parts={[{ text: "Stop", t: 0.02, fx: "slam", colour: tokens.problem }]} />],
    ["sub", <Kinetic key="sub" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("sub", { y: 450, size: 88 })} out={T.doPaper - 0.08} exit="down" parts={kw("doing past papers like this.", "L1", "type", { this: { deco: "underline", decoAt: at("L1", "this") + 0.15 } })} />],
    ["do", <Kinetic key="do" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("do", { y: 250, size: 118 })} out={T.mark - 0.05} exit="left" parts={[{ text: "Do a paper.", t: T.doPaper, fx: "slide" }]} />],
    ["mark", <Kinetic key="mark" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("mark", { y: 240, size: 118 })} out={T.feel - 0.05} exit="scale" parts={[{ text: "Mark it.", t: T.mark, fx: "stamp" }]} />],
    ["feel", <Kinetic key="feel" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("feel", { y: 250, size: 124 })} out={T.next - 0.05} parts={[{ text: "Feel awful.", t: T.feel, fx: "shake", colour: tokens.problem }]} />],
    ["next", <Kinetic key="next" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("next", { y: 250, size: 118 })} out={T.rewatch - 0.1} exit="left" parts={[{ text: "Next one.", t: T.next, fx: "slide" }]} />],
    ["marks", <Kinetic key="marks" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("marks", { y: 250, size: 112 })} out={T.point - 0.04} exit="down" parts={kw("The marks you lost?", "L4", "rise", { lost: { fx: "pop", colour: tokens.problem, deco: "underline", decoAt: T.lost + 0.15 } })} />],
    ["point", <Kinetic key="point" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("point", { y: 250, size: 112 })} out={T.turn - 0.04} parts={kw("That's the whole point.", "L4", "flip", { point: { deco: "marker", decoColour: tokens.ink, decoAt: at("L4", "point") + 0.1 } })} />],
    ["turn", <Kinetic key="turn" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("turn", { y: 250, size: 104 })} out={T.redo - 0.04} exit="left" parts={kw("Turn each one into a flashcard.", "L5", "rise", { flashcard: { fx: "flip", deco: "outline" } })} />],
    ["redo", <Kinetic key="redo" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("redo", { y: 250, size: 112 })} out={T.then - 0.04} exit="wipe" parts={kw("Redo it in three days.", "L6", "rise", { three: { fx: "pop", deco: "marker", decoColour: tokens.ink }, days: { fx: "pop", deco: "marker", decoColour: tokens.ink } })} />],
    ["then", <Kinetic key="then" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("then", { y: 250, size: 112 })} out={T.thats - 0.06} exit="scale" parts={kw("Then in a week.", "L6", "track", { week: { fx: "pop", deco: "underline", decoAt: T.week + 0.2 } })} />],
    ["offload", <Kinetic key="offload" colour={V.fg} frame={frame} fps={fps} font={INTER} {...lay("offload", { y: 250, size: 150 })} weight={800} out={T.comment - 0.2} exit="scale" parts={[{ text: "Offload", t: T.offload + 0.25, fx: "track", colour: tokens.blue, deco: "shine", decoAt: T.deck - 0.1, dur: 0.35 }]} />],
  ];
  const behind = TEXT.filter(([k]) => V.layout[k]?.behind).map(([, e]) => e);
  const front = TEXT.filter(([k]) => !V.layout[k]?.behind).map(([, e]) => e);

  const calW = 7 * CELL + 6 * GAP + 60;
  const calH = 2 * CELL + GAP + 60;

  return (
    <AbsoluteFill style={{ background: V.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(90% 60% at 50% 110%, rgba(23,23,23,0.06), rgba(23,23,23,0) 70%)" }} />

      {behind}
      <AbsoluteFill style={{ transform: `scale(${breathe})` }}>
        {cards
          .filter((c) => c.s.o > 0.01 && c.s.x > -700 && c.s.x < 1800)
          .map((c) => (
            <div key={c.i} style={place(c.s, CW, CH)}>
              <PaperCard n={c.i + 1} crosses={crossesFor(c.i)} frame={frame} fps={fps} glowQ4={c.i === H ? T.lost : undefined} />
            </div>
          ))}

        {cal.o > 0.01 && t < T.offload ? (
          <div style={{ ...place(cal, calW, calH), borderRadius: 44, background: tokens.white, boxShadow: soft(1.2) }}>
            {Array.from({ length: 14 }, (_, i) => {
              const day = i + 1;
              const p = cellPos(day);
              const f = (day === 4 ? sprAt(frame, fps, T.three + 0.35, POP) : 0) + (day === 11 ? sprAt(frame, fps, T.week + 0.2, POP) : 0);
              return (
                <div key={day} style={{ position: "absolute", left: p.x - (540 - calW / 2) - CELL / 2, top: p.y - (CAL_Y - calH / 2) - CELL / 2, width: CELL, height: CELL, borderRadius: 28, background: day === 1 ? tokens.paper : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: tokens.ink, transform: `scale(${f})` }} />
                  <span style={{ position: "relative", fontFamily: INTER, fontWeight: 650, fontSize: 40, letterSpacing: "-0.03em", color: f > 0.5 ? tokens.white : day === 1 ? tokens.ink : tokens.quiet }}>{day}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Phone */}
        {phone.o > 0.01 ? (
          <div style={place(phone, PHONE.w, PHONE.h)}>
            {[T.deck, T.exactly].map((p0, i) => {
              const k = pulse(p0);
              return k > 0 ? <div key={i} style={{ position: "absolute", inset: -10, borderRadius: 86, border: `${3 + k * 10}px solid ${tokens.blue}`, opacity: k, transform: `scale(${1 + (1 - k) * 0.1})` }} /> : null;
            })}
            <div style={{ position: "absolute", inset: 0, borderRadius: PHONE.r, background: tokens.ink, boxShadow: `0 0 0 3px ${V.edge}, ${soft(2.2)}` }} />
            <div style={{ position: "absolute", inset: 14, borderRadius: 64, overflow: "hidden", background: tokens.white }}>
              <Img src={staticFile("world/past-papers/screen.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", left: "50%", top: 30, width: 130, height: 36, marginLeft: -65, borderRadius: 18, background: tokens.ink }} />
            {chip > 0.01 ? (
              <div style={{ position: "absolute", left: "50%", top: 120, transform: `translateX(-50%) scale(${chip})`, padding: "18px 30px", borderRadius: 40, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 650, fontSize: 30, letterSpacing: "-0.02em", whiteSpace: "nowrap", boxShadow: soft(1) }}>
                Remediation deck
              </div>
            ) : null}
          </div>
        ) : null}

        {flash2.o > 0.01 && flash2.y > -300 ? (
          <div style={place(flash2, 760, 460)}>
            <Flash flip={1} />
          </div>
        ) : null}

        {flash.o > 0.01 ? (
          <div style={place({ ...flash, y: flash.y - flashArc }, 760, 460)}>
            <Flash flip={flip} />
          </div>
        ) : null}

        {/* Red iris */}
        {redOn ? <AbsoluteFill style={{ background: tokens.problem, clipPath: `circle(${redR}px at ${redC.x}px ${redC.y}px)` }} /> : null}
        {/* Black iris and fold */}
        {blackOn ? <AbsoluteFill style={{ background: V.flood, clipPath: blackClip, opacity: blackFade }} /> : null}
      </AbsoluteFill>

      {/* ---- type over the light scenes ---- */}
      {front}

      {/* ---- L3 on red: ten papers stack up ---- */}
      {t > T.ten - 0.1 && t < T.marks + 0.1 ? (
        <AbsoluteFill style={{ opacity: 1 - sprAt(frame, fps, T.marks - 0.25), filter: `blur(${sprAt(frame, fps, T.marks - 0.25) * 16}px)` }}>
          {MINI.map((m, i) => {
            const k = sprAt(frame, fps, T.ten + i * 0.075, POP);
            const hit = sprAt(frame, fps, T.mistakes, { damping: 9, mass: 0.4, stiffness: 300 });
            const shake = i === 9 ? Math.sin(t * 80) * 10 * (1 - Math.min(1, hit)) * (t > T.mistakes ? 1 : 0) : 0;
            return (
              <div key={i} style={{ position: "absolute", left: 540 - 150 + m.dx + shake, top: 1180 - 200 + m.dy - (1 - k) * 260, width: 300, height: 400, borderRadius: 22, background: tokens.white, boxShadow: soft(0.8), transform: `rotate(${m.r}deg) scale(${mix(1.25, 1, k)})`, opacity: Math.min(1, k * 2) }}>
                {[0, 1, 2].map((r) => (
                  <div key={r} style={{ position: "absolute", left: 30, top: 70 + r * 100, width: 180 - r * 30, height: 12, borderRadius: 6, background: tokens.line }} />
                ))}
                {i === 9 && t >= T.mistakes ? (
                  <div style={{ position: "absolute", right: 24, top: 160, width: 76, height: 76, borderRadius: 38, background: tokens.problem, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${hit})` }}>
                    <svg width={34} height={34} viewBox="0 0 36 36"><path d="M8 8 L28 28 M28 8 L8 28" stroke={tokens.white} strokeWidth={6} strokeLinecap="round" /></svg>
                  </div>
                ) : null}
              </div>
            );
          })}
        </AbsoluteFill>
      ) : null}
      <Kinetic key="ten" frame={frame} fps={fps} font={INTER} {...lay("ten", { y: 280, size: 140 })} colour={tokens.white} out={T.same - 0.05} exit="wipe" parts={[{ text: "10", t: T.ten, fx: "pop", count: { from: 1, dur: 0.75 } }, ...kw("papers later.", "L3")]} />
      <Kinetic key="same" frame={frame} fps={fps} font={INTER} {...lay("same", { y: 280, size: 140 })} weight={850} colour={tokens.white} out={T.marks - 0.22} exit="scale" parts={kw("Same mistakes.", "L3", "drop", { same: { dur: 0.2 }, mistakes: { dur: 0.35 } })} />

      {/* ---- L4–L6 type ---- */}

      {/* ---- L7 on black ---- */}
      {sp > 0.01 && blackOut < 0.99 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(820, 300, spUp), textAlign: "center", fontFamily: INTER, fontWeight: 800, fontSize: mix(215, 150, spUp), letterSpacing: `${mix(0.22, -0.06, Math.min(1, sp))}em`, lineHeight: 1, color: V.floodFg, transform: `scale(${mix(1.5, 1, sp)})`, opacity: Math.min(1, sp * 1.5) * (1 - blackOut), filter: `blur(${(1 - Math.min(1, sp)) * 20 + blackOut * 18}px)` }}>
          Spacing.
        </div>
      ) : null}
      <Kinetic frame={frame} fps={fps} font={INTER} y={500} size={64} weight={600} colour={V.floodFg} out={T.offload - 0.2} parts={kw("It's how memory actually sticks.", "L7", "rise", { sticks: { fx: "pop", deco: "underline", decoAt: T.sticks + 0.15 } })} />
      {draw > 0 && blackOut < 0.99 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - blackOut, filter: blackOut > 0.02 ? `blur(${blackOut * 16}px)` : undefined }}>
          <defs>
            <clipPath id="reveal">
              <rect x={CX0 - 20} y={0} width={(CX1 - CX0 + 40) * draw} height={1920} />
            </clipPath>
          </defs>
          <line x1={CX0} y1={CY1} x2={CX1} y2={CY1} stroke={V.floodFg} strokeOpacity={0.25} strokeWidth={3} />
          <g clipPath="url(#reveal)">
            <path d={curve([])} fill="none" stroke={tokens.problem} strokeWidth={8} strokeDasharray="2 20" strokeLinecap="round" />
            <path d={curve([0.22, 0.55])} fill="none" stroke={V.floodFg} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {[0.22, 0.55].map((r, i) => (draw > r ? <circle key={i} cx={CX0 + r * (CX1 - CX0)} cy={CY1 - (CY1 - CY0) * 0.92} r={16} fill={V.floodFg} /> : null))}
        </svg>
      ) : null}

      {/* ---- L8 ---- */}

      {/* ---- L9 ---- */}
      {t >= T.comment - 0.15 ? (
        <AbsoluteFill style={{ alignItems: "center", flexDirection: "column", transform: `scale(${mix(0.8, 1, endIn)})`, opacity: endIn, filter: endIn < 0.97 ? `blur(${(1 - endIn) * 20}px)` : undefined }}>
          <div style={{ marginTop: 560, fontFamily: INTER, fontWeight: 750, fontSize: 120, letterSpacing: "-0.045em", color: V.fg }}>Comment</div>
          <div style={{ marginTop: 40, transform: `scale(${mix(0.6, 1, bubble)})`, opacity: Math.min(1, bubble * 2), padding: "34px 80px", borderRadius: 999, background: tokens.white, boxShadow: soft(2), border: `4px solid ${tokens.ink}`, minWidth: 700, textAlign: "center", fontFamily: INTER, fontWeight: 800, fontSize: 170, letterSpacing: "-0.05em", lineHeight: 1, color: tokens.blue }}>
            {"PAPERS".slice(0, typed)}
            <span style={{ color: tokens.ink, fontWeight: 300, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
          </div>
          <div style={{ marginTop: 40, fontFamily: SCRIPT, fontWeight: 700, fontSize: 130, color: tokens.blue, lineHeight: 1, opacity: mark, transform: `translateY(${(1 - mark) * 30}px)` }}>offload</div>
        </AbsoluteFill>
      ) : null}
      <Kinetic key="method" frame={frame} fps={fps} font={INTER} {...lay("method", { y: 1400, size: 56 })} weight={600} colour={V.sub} out={T.end + 1} parts={kw("and I'll send you the method.", "L9", "type")} />

      <Audio src={staticFile("world/past-papers/vo.wav")} />
      {CUES.map((q, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(q.t * fps))} durationInFrames={Math.round(1.2 * fps)} layout="none" name={`sfx ${q.s}`}>
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
