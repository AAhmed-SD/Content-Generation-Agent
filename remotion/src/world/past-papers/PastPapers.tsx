import { Audio } from "@remotion/media";
import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { tokens } from "../../tokens";
import { SANS, SCRIPT, SERIF } from "../../story/fonts";
import { handheld, makeCamera, type CamKey } from "../camera";
import { Circle, Cross, Tick } from "../marks";
import { Arrow, Captions, Flash, Highlight, makeChunks, shake, Slam, type Impulse } from "../fx";
import layout from "./layout.json";
import timing from "./timing.json";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const out = Easing.bezier(0.16, 1, 0.3, 1);
const OBJ = (n: string) => staticFile(`world/past-papers/obj/${n}.png`);

export const DURATION_S = timing.duration;

/** Time (s) a word starts, found by line id and the start of the word. */
const at = (line: string, word: string) => {
  const l = timing.lines.find((x) => x.id === line)!;
  const w = l.words.find((x) => x.text.toLowerCase().replace(/[^a-z0-9']/g, "").startsWith(word.toLowerCase()));
  return w ? w.start : l.start;
};
const lineStart = (id: string) => timing.lines.find((x) => x.id === id)!.start;

// ---------- The world (pixels) ----------
const W = 4400;
const H = 6600;
const PW = 760; // a paper's printed area
const PH = 1075;
const CW = 560; // the index card
const CH = 336;
const CAL = { x: 2200, y: 4300, w: 3700, h: 651 };
const PHONE = { x: 2200, y: 5850, w: 640 };

type Q = { q: number; x0: number; y0: number; x1: number; y1: number };
const qbox = (paper: keyof typeof layout, q: number) => (layout[paper] as Q[])[q - 1];
/** Paper-local coordinates (centre origin) of a question box. */
const local = (paper: keyof typeof layout, q: number) => {
  const b = qbox(paper, q);
  return { x0: (b.x0 - 0.5) * PW, y0: (b.y0 - 0.5) * PH, x1: (b.x1 - 0.5) * PW, y1: (b.y1 - 0.5) * PH };
};

const T = {
  queue: [-2, 0.45, 0.9, 1.35],
  doPaper: lineStart("L2"),
  cross1: at("L2", "mark"),
  cross2: at("L2", "awful"),
  next: at("L2", "next"),
  pile: lineStart("L3"),
  marks: at("L4", "marks"),
  lost: at("L4", "lost"),
  point: at("L4", "point"),
  cardForm: lineStart("L5") + 0.05,
  cardDone: at("L5", "flashcard"),
  three: at("L6", "three"),
  days: at("L6", "days"),
  week: at("L6", "week"),
  spacing: at("L7", "spacing"),
  memory: at("L7", "memory"),
  phone: lineStart("L8"),
  drops: at("L8", "drops"),
  deck: at("L8", "remediation"),
  back: at("L8", "back"),
  comment: lineStart("L9"),
  papers: at("L9", "papers"),
  end: timing.duration,
};

type Paper = { id: string; src: "paper1" | "paper2" | "paper3"; x: number; y: number; r: number; hero: string[]; crosses?: { q: number; t: number }[] };

const QUEUE: Paper[] = [
  { id: "A1", src: "paper1", x: 760, y: 1100, r: -2, hero: ["L1", "L2"], crosses: [{ q: 1, t: T.cross1 }, { q: 3, t: T.cross2 }] },
  { id: "A2", src: "paper2", x: 1620, y: 1110, r: 1.5, hero: ["L1", "L2"] },
  { id: "A3", src: "paper3", x: 2480, y: 1090, r: -1, hero: ["L1"] },
  { id: "A4", src: "paper1", x: 3340, y: 1105, r: 2, hero: ["L1"] },
];

const P = lineStart("L3");
const PILE: Paper[] = [
  { id: "B1", src: "paper2", x: 1250, y: 2450, r: -8, hero: ["L3"], crosses: [{ q: 1, t: P + 0.3 }, { q: 3, t: P + 1.1 }] },
  { id: "B2", src: "paper3", x: 2120, y: 2330, r: 6, hero: ["L3"], crosses: [{ q: 2, t: P + 0.55 }] },
  { id: "B3", src: "paper1", x: 3000, y: 2480, r: -4, hero: ["L3"], crosses: [{ q: 1, t: P + 0.8 }, { q: 4, t: P + 1.5 }] },
  { id: "B4", src: "paper1", x: 1450, y: 3280, r: 9, hero: ["L3"], crosses: [{ q: 2, t: P + 1.0 }] },
  { id: "B6", src: "paper3", x: 3100, y: 3260, r: 7, hero: ["L3"], crosses: [{ q: 3, t: P + 1.3 }, { q: 1, t: P + 1.8 }] },
  { id: "H", src: "paper2", x: 2280, y: 3180, r: -3, hero: ["L3", "L4"], crosses: [{ q: 2, t: P + 0.65 }] },
];
const HERO = PILE[PILE.length - 1];

/** World position of a paper-local point. */
const toWorld = (p: Paper, lx: number, ly: number) => {
  const a = (p.r * Math.PI) / 180;
  return { x: p.x + lx * Math.cos(a) - ly * Math.sin(a), y: p.y + lx * Math.sin(a) + ly * Math.cos(a) };
};
const q4 = local("paper2", 4);
const CARD_FROM = toWorld(HERO, (q4.x0 + q4.x1) / 2, (q4.y0 + q4.y1) / 2);
const cellX = (day: number) => {
  const left = CAL.x - CAL.w / 2;
  return left + (layout.calendar.x0 + (day - 0.5) * layout.calendar.cell) * CAL.w;
};
const CELL_Y = CAL.y - CAL.h / 2 + 0.64 * CAL.h;
const DAY4 = { x: cellX(4), y: CELL_Y };
const DAY11 = { x: cellX(11), y: CELL_Y };
const CARD_SHOW = { x: CARD_FROM.x + 330, y: CARD_FROM.y - 170 };

// ---------- The camera ----------
const KEYS: CamKey[] = [
  { t: 0, x: 1050, y: 1180, z: 0.98, r: -1.2 },
  { t: at("L1", "useless"), x: 1700, y: 1150, z: 0.9, r: -0.6 },
  { t: at("L1", "netflix") + 0.2, x: 2250, y: 1160, z: 0.8, r: 0 },
  // whip in on "Do a paper"
  { t: T.doPaper + 0.25, x: 790, y: 1100, z: 1.5, r: 0.4 },
  { t: T.next - 0.05, x: 820, y: 1100, z: 1.6, r: -0.3 },
  { t: T.next + 0.4, x: 1560, y: 1140, z: 1.32, r: 0.6 },
  // drop onto the pile
  { t: lineStart("L3") + 0.45, x: 2200, y: 2800, z: 0.64, r: 0 },
  { t: lineStart("L4") - 0.15, x: 2230, y: 2880, z: 0.7, r: -0.4 },
  { t: T.marks + 0.05, x: CARD_FROM.x, y: CARD_FROM.y, z: 2.2, r: -1.5 },
  { t: T.point, x: CARD_FROM.x + 20, y: CARD_FROM.y - 30, z: 2.3, r: -1.0 },
  { t: T.cardDone + 0.1, x: CARD_SHOW.x, y: CARD_SHOW.y, z: 1.7, r: 0.3 },
  { t: T.three - 0.15, x: (CARD_SHOW.x + DAY4.x) / 2, y: (CARD_SHOW.y + DAY4.y) / 2 + 200, z: 0.9, r: 0.8 },
  { t: T.days + 0.2, x: DAY4.x + 90, y: DAY4.y - 160, z: 1.35, r: 0.4 },
  { t: T.week + 0.25, x: DAY11.x - 60, y: DAY11.y - 160, z: 1.35, r: -0.3 },
  { t: T.spacing + 0.25, x: 2200, y: 4520, z: 0.62, r: 0 },
  { t: T.phone - 0.15, x: 2200, y: 4700, z: 0.68, r: 0.4 },
  { t: T.phone + 0.5, x: PHONE.x, y: PHONE.y - 60, z: 1.08, r: 0 },
  { t: T.back, x: PHONE.x, y: PHONE.y - 40, z: 1.22, r: -0.3 },
  { t: T.comment - 0.3, x: PHONE.x, y: PHONE.y - 60, z: 1.7, r: 0.3 },
  { t: T.papers + 0.35, x: 2200, y: 5700, z: 1.02, r: 0 },
  { t: T.end, x: 2200, y: 5690, z: 0.97, r: -0.3 },
];

// ---------- Pieces ----------
const DIM = 0.7;
const shadow = (lift: number) =>
  `drop-shadow(0 ${2 + lift * 6}px ${2 + lift * 6}px rgba(40,24,10,${0.28 - lift * 0.05})) drop-shadow(0 ${14 + lift * 50}px ${26 + lift * 60}px rgba(40,24,10,${0.2 + lift * 0.04}))`;

/** Everything that is not the current line's hero steps back. */
const useDim = (t: number, heroLines: string[]) => {
  const current = [...timing.lines].reverse().find((l) => t >= l.start - 0.25)?.id ?? "L1";
  const prev = [...timing.lines].reverse().find((l) => t >= l.start - 0.25 && l.id !== current);
  const isHero = heroLines.includes(current);
  const since = t - ((timing.lines.find((l) => l.id === current)?.start ?? 0) - 0.25);
  const wasHero = prev ? heroLines.includes(prev.id) : true;
  const k = interpolate(since, [0, 0.3], [0, 1], { ...clamp, easing: ease });
  const from = wasHero ? 1 : DIM;
  const to = isHero ? 1 : DIM;
  return from + (to - from) * k;
};

const PaperSheet: React.FC<{ p: Paper; t: number; frame: number; fps: number; enter?: number; exit?: number; children?: React.ReactNode }> = ({
  p, t, frame, fps, enter, exit, children,
}) => {
  const bright = useDim(t, p.hero);
  const inK = enter === undefined ? 1 : interpolate(t, [enter, enter + 0.6], [0, 1], { ...clamp, easing: out });
  const outK = exit === undefined ? 0 : interpolate(t, [exit, exit + 0.55], [0, 1], { ...clamp, easing: ease });
  const dx = (1 - inK) * 1700 - outK * 2100;
  return (
    <div
      style={{
        position: "absolute",
        left: p.x - PW / 2 + dx,
        top: p.y - PH / 2,
        width: PW,
        height: PH,
        rotate: `${p.r + (1 - inK) * 6 - outK * 8}deg`,
        filter: `brightness(${bright}) ${shadow(1 - inK + outK)}`,
      }}
    >
      <Img src={OBJ(p.src)} style={{ position: "absolute", left: -PW * 0.01, top: -PH * 0.01, width: PW * 1.02, height: PH * 1.02 }} />
      <svg width={PW} height={PH} viewBox={`${-PW / 2} ${-PH / 2} ${PW} ${PH}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {(p.crosses ?? []).map((c, i) => {
          const b = local(p.src, c.q);
          return <Cross key={i} frame={frame} fps={fps} at={Math.round(c.t * fps)} cx={(b.x0 + b.x1) / 2 - 40} cy={(b.y0 + b.y1) / 2} size={200} seed={c.q * 7 + i + p.x} />;
        })}
        {children}
      </svg>
    </div>
  );
};

/** Screen-space directional blur from the camera's real speed. */
const MotionBlur: React.FC<{ sx: number; sy: number; children: React.ReactNode }> = ({ sx, sy, children }) => (
  <AbsoluteFill>
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <filter id="cam-blur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation={`${sx.toFixed(2)} ${sy.toFixed(2)}`} />
      </filter>
    </svg>
    <AbsoluteFill style={{ filter: sx + sy > 0.4 ? "url(#cam-blur)" : undefined }}>{children}</AbsoluteFill>
  </AbsoluteFill>
);

const Grain: React.FC<{ frame: number }> = ({ frame }) => {
  const seed = Math.floor(frame / 2) % 89;
  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.22, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`grain${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

// ---------- Sound ----------
type Cue = { t: number; s: string; v: number };
const CUES: Cue[] = [
  { t: 0, s: "paper", v: 0.35 },
  ...T.queue.filter((q) => q > 0).map((q) => ({ t: q + 0.1, s: "paper", v: 0.3 })),
  ...T.queue.filter((q) => q > 0).map((q) => ({ t: q + 0.6, s: "paper_land", v: 0.35 })),
  { t: at("L1", "netflix"), s: "pop_low", v: 0.35 },
  { t: T.doPaper - 0.15, s: "whip", v: 0.35 },
  { t: T.cross1, s: "thud", v: 0.55 },
  { t: T.cross1, s: "scribble", v: 0.25 },
  { t: T.cross2, s: "thud", v: 0.55 },
  { t: T.cross2, s: "scribble", v: 0.25 },
  { t: T.next, s: "paper", v: 0.45 },
  { t: T.next + 0.05, s: "whip", v: 0.3 },
  { t: P + 0.1, s: "swoosh_down", v: 0.35 },
  ...PILE.flatMap((p) => (p.crosses ?? []).map((c) => ({ t: c.t, s: "pop", v: 0.26 }))),
  { t: T.marks - 0.4, s: "whoosh", v: 0.32 },
  { t: T.marks, s: "swoosh_down", v: 0.25 },
  { t: T.lost, s: "scribble", v: 0.42 },
  { t: T.cardForm, s: "paper", v: 0.4 },
  { t: T.cardDone, s: "pop_low", v: 0.3 },
  { t: T.three - 0.4, s: "whoosh", v: 0.32 },
  { t: T.three - 0.3, s: "scribble", v: 0.22 },
  { t: T.days, s: "paper_land", v: 0.5 },
  { t: T.days + 0.1, s: "tick", v: 0.3 },
  { t: T.week - 0.45, s: "whip", v: 0.3 },
  { t: T.week, s: "paper_land", v: 0.5 },
  { t: T.week + 0.1, s: "tick", v: 0.3 },
  { t: T.spacing - 0.35, s: "swoosh_down", v: 0.3 },
  { t: T.spacing, s: "impact", v: 0.55 },
  { t: T.phone - 0.6, s: "riser", v: 0.22 },
  { t: T.phone + 0.4, s: "thud", v: 0.5 },
  { t: T.drops, s: "whoosh", v: 0.28 },
  { t: T.deck, s: "pop", v: 0.35 },
  { t: T.deck + 0.05, s: "chime", v: 0.28 },
  { t: T.back, s: "pop_low", v: 0.3 },
  { t: T.comment - 0.15, s: "paper", v: 0.4 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.papers + i * 0.08, s: "key", v: 0.3 })),
  { t: T.papers + 0.8, s: "chime", v: 0.26 },
];

// ---------- Hits, flashes, captions ----------
const HITS: Impulse[] = [
  { t: T.cross1, a: 16 },
  { t: T.cross2, a: 18 },
  ...PILE.flatMap((p) => (p.crosses ?? []).map((c) => ({ t: c.t, a: 5 }))),
  { t: T.lost, a: 9 },
  { t: T.days, a: 7 },
  { t: T.week, a: 7 },
  { t: T.spacing, a: 30 },
  { t: T.phone + 0.42, a: 14 },
  { t: T.deck, a: 8 },
];
const FLASHES = [T.doPaper + 0.08, lineStart("L3") + 0.2, T.spacing];
const CHUNKS = makeChunks(timing.lines, (w) => w.includes("spacing") || w.includes("comment"));
const RED = ["useless", "binge", "awful", "mistakes", "lost", "lost?"];
const BLUE = ["offload"];

// ---------- The film ----------
export const PastPapers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = useMemo(() => makeCamera(KEYS), []);
  const keep = (v: { x: number; y: number; z: number; r: number }) => {
    const mx = 540 / v.z + 90;
    const my = 960 / v.z + 90;
    return { ...v, x: Math.min(W - mx, Math.max(mx, v.x)), y: Math.min(H - my, Math.max(my, v.y)) };
  };
  const c = keep(cam(t));
  const hh = handheld(t, 1);
  const prev = keep(cam(t - 1 / fps));
  const vx = Math.abs(c.x - prev.x) * c.z;
  const vy = Math.abs(c.y - prev.y) * c.z;
  const vz = Math.abs(Math.log(c.z / prev.z)) * 900;
  const sx = Math.min(16, vx * 0.16 + vz * 0.25);
  const sy = Math.min(16, vy * 0.16 + vz * 0.25);
  const deskDim = 0.92;
  const sh = shake(t, HITS);

  // The index card: lifts out of the circled question, then travels the calendar.
  const formK = interpolate(t, [T.cardForm, T.cardDone], [0, 1], { ...clamp, easing: out });
  const fly1 = interpolate(t, [T.three - 0.45, T.days], [0, 1], { ...clamp, easing: ease });
  const fly2 = interpolate(t, [T.week - 0.75, T.week], [0, 1], { ...clamp, easing: ease });
  const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
  let cx = lerp(CARD_FROM.x, CARD_SHOW.x, formK);
  let cy = lerp(CARD_FROM.y, CARD_SHOW.y, formK);
  let cs = lerp(0.3, 1, formK);
  let cr = lerp(-3, 4, formK);
  let lift = Math.sin(formK * Math.PI) * 0.8 + formK * 0.3;
  if (fly1 > 0) {
    cx = lerp(CARD_SHOW.x, DAY4.x, fly1);
    cy = lerp(CARD_SHOW.y, DAY4.y, fly1) - Math.sin(fly1 * Math.PI) * 260;
    cs = lerp(1, 0.4, fly1);
    cr = lerp(4, -2, fly1);
    lift = 0.3 + Math.sin(fly1 * Math.PI) * 0.9 - fly1 * 0.3;
  }
  if (fly2 > 0) {
    cx = lerp(DAY4.x, DAY11.x, fly2);
    cy = DAY4.y - Math.sin(fly2 * Math.PI) * 300;
    cs = 0.4 + Math.sin(fly2 * Math.PI) * 0.25;
    cr = lerp(-2, 3, fly2);
    lift = Math.sin(fly2 * Math.PI) * 1.0;
  }
  const fly3 = interpolate(t, [T.drops - 0.05, T.deck], [0, 1], { ...clamp, easing: ease });
  if (fly3 > 0) {
    cx = lerp(DAY11.x, PHONE.x, fly3);
    cy = lerp(DAY4.y, PHONE.y - 120, fly3) - Math.sin(fly3 * Math.PI) * 200;
    cs = lerp(0.4, 0.62, Math.sin(fly3 * Math.PI)) * (1 - fly3 * 0.55);
    cr = lerp(3, -6, fly3);
    lift = 0.2 + Math.sin(fly3 * Math.PI) * 1.1;
  }
  const cardIn = interpolate(t, [T.deck - 0.08, T.deck + 0.05], [1, 0], clamp);
  const cardOn = t >= T.cardForm && cardIn > 0;
  const cardBright = useDim(t, ["L5", "L6", "L7"]);
  const calBright = useDim(t, ["L6", "L7"]);
  const phoneBright = useDim(t, ["L8", "L9"]);

  const phoneK = interpolate(t, [T.phone, T.phone + 0.55], [0, 1], { ...clamp, easing: Easing.bezier(0.3, 0, 0.2, 1) });
  const phoneSettle = spring({ frame: frame - Math.round((T.phone + 0.5) * fps), fps, config: { damping: 12, mass: 0.6 } });
  const phoneH = PHONE.w * 1.08 * (2020 / 980);
  const phoneOut = interpolate(t, [T.comment - 0.15, T.comment + 0.5], [0, 1], { ...clamp, easing: ease });

  const bubble = spring({ frame: frame - Math.round((T.papers - 0.25) * fps), fps, config: { damping: 14, mass: 0.6 } });
  const typed = Math.floor(interpolate(t, [T.papers, T.papers + 0.5], [0, 6], clamp));

  return (
    <AbsoluteFill style={{ backgroundColor: "#2a1d14" }}>
      <MotionBlur sx={sx} sy={sy}>
        <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: W,
            height: H,
            transformOrigin: "0 0",
            transform: `translate(540px, 960px) rotate(${c.r + hh.r}deg) scale(${c.z}) translate(${-(c.x + hh.x)}px, ${-(c.y + hh.y)}px)`,
          }}
        >
          <Img src={OBJ("desk")} style={{ position: "absolute", left: 0, top: 0, width: W, height: H, filter: `brightness(${deskDim})` }} />

          {/* Calendar strip */}
          <div style={{ position: "absolute", left: CAL.x - CAL.w / 2, top: CAL.y - CAL.h / 2, width: CAL.w, height: CAL.h, rotate: "-0.6deg", filter: `brightness(${calBright}) ${shadow(0)}` }}>
            <Img src={OBJ("calendar")} style={{ position: "absolute", left: -CAL.w * 0.01, top: -CAL.h * 0.01, width: CAL.w * 1.02, height: CAL.h * 1.02 }} />
            <svg width={CAL.w} height={CAL.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              <Tick frame={frame} at={Math.round((T.days + 0.1) * fps)} cx={DAY4.x - (CAL.x - CAL.w / 2) + 70} cy={110} size={90} />
              <Tick frame={frame} at={Math.round((T.week + 0.1) * fps)} cx={DAY11.x - (CAL.x - CAL.w / 2) + 70} cy={110} size={90} />
            </svg>
          </div>
          <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", filter: `brightness(${calBright})` }}>
            <Arrow t={t} at={T.three - 0.3} dur={0.4} ax={CARD_SHOW.x - 120} ay={CARD_SHOW.y + 230} bx={DAY4.x + 40} by={DAY4.y - 150} bow={-0.18} />
            <Arrow t={t} at={T.week - 0.45} dur={0.35} ax={DAY4.x + 150} ay={DAY4.y - 210} bx={DAY11.x - 110} by={DAY11.y - 210} bow={0.22} />
          </svg>
          {t > T.week ? (
            <div style={{ position: "absolute", left: DAY4.x - (CW * 0.4) / 2, top: DAY4.y - (CH * 0.4) / 2, width: CW * 0.4, height: CH * 0.4, rotate: "-2deg", filter: `brightness(${cardBright * 0.96}) ${shadow(0)}` }}>
              <Img src={OBJ("card")} style={{ width: "102%", height: "102%", marginLeft: "-1%", marginTop: "-1%" }} />
            </div>
          ) : null}

          {/* The pile */}
          {PILE.map((p) => (
            <PaperSheet key={p.id} p={p} t={t} frame={frame} fps={fps}>
              {p.id === "H" ? <Highlight t={t} at={T.marks} x0={q4.x0 + 14} y0={q4.y0 + 18} x1={q4.x1 - 14} y1={q4.y1 - 18} /> : null}
              {p.id === "H" ? <Circle frame={frame} at={Math.round(T.lost * fps)} x0={q4.x0 + 10} y0={q4.y0 + 10} x1={q4.x1 - 10} y1={q4.y1 - 10} dur={13} /> : null}
            </PaperSheet>
          ))}

          {/* The binge queue */}
          {QUEUE.map((p, i) => (
            <PaperSheet key={p.id} p={p} t={t} frame={frame} fps={fps} enter={T.queue[i]} exit={p.id === "A1" ? T.next : undefined} />
          ))}

          {/* Phone */}
          {t >= T.phone ? (
            <div
              style={{
                position: "absolute",
                left: PHONE.x - (PHONE.w * 1.08) / 2,
                top: PHONE.y - phoneH / 2 - (1 - phoneK) * 420 + phoneOut * 1500,
                width: PHONE.w * 1.08,
                height: phoneH,
                scale: String(interpolate(phoneK, [0, 1], [1.3, 1]) + (1 - phoneSettle) * 0.015),
                rotate: `${interpolate(phoneK, [0, 1], [-9, -2]) + phoneOut * 14}deg`,
                opacity: interpolate(phoneK, [0, 0.15], [0, 1], clamp) * (1 - phoneOut),
                filter: `brightness(${phoneBright}) ${shadow(1 - phoneK)}`,
              }}
            >
              <Img src={OBJ("phone")} style={{ width: "100%", height: "100%" }} />
            </div>
          ) : null}

          {t >= T.deck && t < T.comment ? (
            [T.deck, T.back].map((p0, i) => {
              const k = interpolate(t, [p0, p0 + 0.7], [0, 1], { ...clamp, easing: out });
              if (t < p0) return null;
              return (
                <div key={i} style={{ position: "absolute", left: PHONE.x, top: PHONE.y, width: PHONE.w * 1.1, height: phoneH * 0.98, translate: "-50% -50%", rotate: "-2deg", borderRadius: 90, border: `${14 * (1 - k) + 2}px solid ${tokens.blue}`, opacity: (1 - k) * 0.85, scale: String(1 + k * 0.12) }} />
              );
            })
          ) : null}

          {/* Comment bubble */}
          {t >= T.papers - 0.3 ? (
            <div style={{ position: "absolute", left: 2200, top: 5640, translate: "-50% -50%", scale: String(interpolate(bubble, [0, 1], [0.5, 1])), opacity: interpolate(bubble, [0, 0.3], [0, 1], clamp), display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 120, color: tokens.ink, lineHeight: 1 }}>Comment</div>
              <div style={{ background: tokens.white, border: `5px solid ${tokens.ink}`, borderRadius: 60, padding: "26px 70px", boxShadow: "0 30px 50px rgba(40,24,10,0.3)", fontFamily: SANS, fontWeight: 700, fontSize: 200, letterSpacing: "-0.04em", color: tokens.blue, lineHeight: 1, minWidth: 760, textAlign: "center" }}>
                {"PAPERS".slice(0, typed)}
                <span style={{ color: tokens.ink, fontWeight: 400, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
              </div>
              <div style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 150, color: tokens.blue, lineHeight: 1, marginTop: 30, opacity: interpolate(t, [T.papers + 0.7, T.papers + 1.1], [0, 1], clamp) }}>offload</div>
            </div>
          ) : null}

          {/* The index card, on top of everything while it travels */}
          {cardOn ? (
            <div
              style={{
                position: "absolute",
                left: cx - CW / 2,
                top: cy - CH / 2,
                width: CW,
                height: CH,
                scale: String(cs),
                rotate: `${cr}deg`,
                opacity: interpolate(formK, [0, 0.2], [0, 1], clamp) * cardIn,
                filter: `brightness(${cardBright}) ${shadow(Math.max(0, lift))}`,
              }}
            >
              <Img src={OBJ("card")} style={{ width: "102%", height: "102%", marginLeft: "-1%", marginTop: "-1%" }} />
            </div>
          ) : null}
        </div>
        </AbsoluteFill>
      </MotionBlur>

      {/* Light: warm window glow from the top left, vignette, grain */}
      <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 18% 8%, rgba(255,232,196,0.22), rgba(255,232,196,0) 60%)", mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 85% 70% at 50% 46%, rgba(0,0,0,0) 55%, rgba(18,10,4,0.42) 100%)" }} />
      <Slam t={t} fps={fps} at={T.spacing} until={T.memory - 0.05}>Spacing.</Slam>
      <Captions chunks={CHUNKS} t={t} fps={fps} red={RED} blue={BLUE} />
      <Flash t={t} at={FLASHES} />
      <Grain frame={frame} />
      <Audio src={staticFile("world/past-papers/vo.wav")} />
      {CUES.filter((q) => q.t >= 0).map((q, i) => (
        <Sequence key={i} from={Math.round(q.t * fps)} durationInFrames={Math.round(1.2 * fps)} layout="none" name={`sfx ${q.s}`}>
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
