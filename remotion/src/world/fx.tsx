import { AbsoluteFill, Easing, interpolate, spring } from "remotion";
import { tokens } from "../tokens";
import { SANS, SERIF } from "../story/fonts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Camera shake ----------
export type Impulse = { t: number; a: number };
/** Decaying shake from a list of hits. Returns screen px and degrees. */
export const shake = (t: number, hits: Impulse[]) => {
  let x = 0;
  let y = 0;
  let r = 0;
  hits.forEach((h, i) => {
    const dt = t - h.t;
    if (dt < 0 || dt > 0.6) return;
    const env = Math.exp(-dt * 10);
    x += h.a * env * Math.sin(dt * 62 + i * 1.7);
    y += h.a * env * Math.cos(dt * 51 + i * 0.9);
    r += h.a * 0.035 * env * Math.sin(dt * 44 + i);
  });
  return { x, y, r };
};

// ---------- Flash frames ----------
/** Short warm flash on the fastest moments of a whip. */
export const Flash: React.FC<{ t: number; at: number[] }> = ({ t, at }) => {
  const o = Math.max(0, ...at.map((f) => 1 - Math.abs(t - f) / 0.09));
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: tokens.white, opacity: o * 0.42, mixBlendMode: "screen" }} />;
};

// ---------- Captions ----------
type Word = { text: string; start: number; end: number };
type Line = { id: string; words: Word[] };
export type Chunk = { words: Word[]; from: number; to: number };

const bare = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, "");

/** Two or three words at a time, breaking on punctuation. */
export const makeChunks = (lines: Line[], skip: (words: string[]) => boolean): Chunk[] => {
  const raw: { words: Word[]; line: number }[] = [];
  lines.forEach((l, li) => {
    let cur: Word[] = [];
    l.words.forEach((w) => {
      cur.push(w);
      if (cur.length === 3 || /[.,?!]$/.test(w.text)) {
        raw.push({ words: cur, line: li });
        cur = [];
      }
    });
    if (cur.length) raw.push({ words: cur, line: li });
  });
  const out: Chunk[] = [];
  raw.forEach((c, i) => {
    const next = raw[i + 1];
    const last = c.words[c.words.length - 1];
    const to = next ? (next.line === c.line ? next.words[0].start - 0.02 : Math.min(next.words[0].start - 0.02, last.end + 0.3)) : last.end + 0.5;
    if (!skip(c.words.map((w) => bare(w.text)))) out.push({ words: c.words, from: c.words[0].start - 0.04, to });
  });
  return out;
};

export const Captions: React.FC<{ chunks: Chunk[]; t: number; fps: number; red: string[]; blue: string[]; y?: number }> = ({
  chunks, t, fps, red, blue, y = 1430,
}) => {
  const c = chunks.find((k) => t >= k.from && t < k.to);
  if (!c) return null;
  return (
    <div style={{ position: "absolute", left: 70, right: 150, top: y, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 26px" }}>
      {c.words.map((w, i) => {
        const pop = spring({ frame: Math.round((t - w.start + 0.03) * fps), fps, config: { damping: 11, mass: 0.45, stiffness: 260 } });
        const on = t >= w.start - 0.03;
        const b = bare(w.text);
        const colour = blue.includes(b) ? tokens.blue : red.includes(b) ? tokens.problem : tokens.white;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 90,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: colour,
              opacity: on ? 1 : 0,
              scale: String(on ? interpolate(pop, [0, 1], [0.55, 1]) : 0.55),
              translate: `0 ${on ? (1 - pop) * 26 : 26}px`,
              WebkitTextStroke: `12px ${tokens.ink}`,
              paintOrder: "stroke fill",
              textShadow: "0 8px 24px rgba(0,0,0,0.45)",
            }}
          >
            {w.text.replace(/[.,]$/, "")}
          </span>
        );
      })}
    </div>
  );
};

// ---------- Screen slam ----------
export const Slam: React.FC<{ t: number; fps: number; at: number; until: number; children: string }> = ({ t, fps, at, until, children }) => {
  if (t < at - 0.02 || t > until + 0.3) return null;
  const k = spring({ frame: Math.round((t - at) * fps), fps, config: { damping: 13, mass: 0.7, stiffness: 240 } });
  const gone = interpolate(t, [until, until + 0.25], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ background: "rgba(14,9,5,0.5)", opacity: interpolate(k, [0, 1], [0, 1], clamp) * (1 - gone) }} />
      <div
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 300,
          letterSpacing: "-0.02em",
          color: tokens.white,
          lineHeight: 1,
          marginTop: -260,
          scale: String(interpolate(k, [0, 1], [2.6, 1]) * (1 + gone * 0.3)),
          opacity: interpolate(k, [0, 0.25], [0, 1], clamp) * (1 - gone),
          filter: `blur(${(1 - Math.min(1, k)) * 16 + gone * 14}px)`,
          textShadow: "0 18px 50px rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Marker pieces (world space, inside an svg) ----------
const draw = (t: number, at: number, dur: number) => interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.2, 1) });

/** A hand-drawn arrow from a to b, bowed to one side, with a head that lands last. */
export const Arrow: React.FC<{ t: number; at: number; dur?: number; ax: number; ay: number; bx: number; by: number; bow?: number; colour?: string; width?: number }> = ({
  t, at, dur = 0.35, ax, ay, bx, by, bow = -0.25, colour = tokens.ink, width = 16,
}) => {
  if (t < at) return null;
  const mx = (ax + bx) / 2 - (by - ay) * bow;
  const my = (ay + by) / 2 + (bx - ax) * bow;
  const d = `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`;
  const len = Math.hypot(bx - ax, by - ay) * 1.25;
  const p = draw(t, at, dur);
  const ang = Math.atan2(by - my, bx - mx);
  const h = width * 4.2;
  const head = `M ${bx - Math.cos(ang - 0.5) * h} ${by - Math.sin(ang - 0.5) * h} L ${bx} ${by} L ${bx - Math.cos(ang + 0.5) * h} ${by - Math.sin(ang + 0.5) * h}`;
  const hp = draw(t, at + dur * 0.85, 0.12);
  return (
    <g opacity={0.9}>
      <path d={d} fill="none" stroke={colour} strokeWidth={width} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      <path d={head} fill="none" stroke={colour} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={h * 2.2} strokeDashoffset={h * 2.2 * (1 - hp)} />
    </g>
  );
};

/** A highlighter swipe across a box, left to right. */
export const Highlight: React.FC<{ t: number; at: number; dur?: number; x0: number; y0: number; x1: number; y1: number; colour?: string }> = ({
  t, at, dur = 0.22, x0, y0, x1, y1, colour = tokens.problem,
}) => {
  if (t < at) return null;
  const p = draw(t, at, dur);
  const skew = 6;
  return (
    <path
      d={`M ${x0} ${y0 + skew} L ${x0 + (x1 - x0) * p} ${y0} L ${x0 + (x1 - x0) * p} ${y1 - skew} L ${x0} ${y1} Z`}
      fill={colour}
      opacity={0.24}
      style={{ mixBlendMode: "multiply" }}
    />
  );
};
