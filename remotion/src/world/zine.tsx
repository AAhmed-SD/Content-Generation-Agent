import { Easing, Img, interpolate, staticFile } from "remotion";
import { tokens } from "../tokens";
import wordmark from "./wordmark.json";

/**
 * The Offload desk, as a living zine: off-white page, thin modular grid, real objects that
 * drop and snap into modules with a hard shadow, hooks that cut in on the frame, and the
 * blue script wordmark drawn stroke by stroke.
 */
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Decelerates into place almost instantly. */
export const SNAP = Easing.bezier(0.05, 0.7, 0.1, 1.0);
export const snapK = (t: number, at: number, dur = 0.32) => interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: SNAP });

// ---------- The grid ----------
export const M = 54; // outer margin
export const COLS = [M, 297, 540, 783, 1080 - M];
export const ROWS = [M, 594, 954, 1314, 1674];
export const cell = (c0: number, r0: number, c1 = c0 + 1, r1 = r0 + 1) => ({
  x: COLS[c0],
  y: ROWS[r0],
  w: COLS[c1] - COLS[c0],
  h: ROWS[r1] - ROWS[r0],
  cx: (COLS[c0] + COLS[c1]) / 2,
  cy: (ROWS[r0] + ROWS[r1]) / 2,
});

/** Thin rules across the page; they draw in at the start. Active modules get an ink frame. */
export const Grid: React.FC<{ t: number; active?: { c0: number; r0: number; c1: number; r1: number; at: number; until?: number }[] }> = ({ t, active = [] }) => {
  const k = 1; // the page is ruled from the first frame
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      {COLS.map((x, i) => (
        <line key={`c${i}`} x1={x} y1={M} x2={x} y2={M + (1920 - 2 * M) * k} stroke={tokens.rule} strokeWidth={2} />
      ))}
      {ROWS.map((y, i) => (
        <line key={`r${i}`} x1={M} y1={y} x2={M + (1080 - 2 * M) * k} y2={y} stroke={tokens.rule} strokeWidth={2} />
      ))}
      <line x1={M} y1={1920 - M} x2={M + (1080 - 2 * M) * k} y2={1920 - M} stroke={tokens.rule} strokeWidth={2} />
      {active.map((a, i) => {
        const on = snapK(t, a.at, 0.25);
        const off = a.until === undefined ? 0 : snapK(t, a.until, 0.25);
        const c = cell(a.c0, a.r0, a.c1, a.r1);
        if (on <= 0 || off >= 1) return null;
        return <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} fill="none" stroke={tokens.ink} strokeWidth={3} opacity={on * (1 - off)} />;
      })}
    </svg>
  );
};

// ---------- Real objects ----------
export type Pose = { t: number; x: number; y: number; w: number; r?: number; o?: number };

/**
 * A photographed object that drops onto the page and snaps between poses.
 * No floating, no spinning: each move decelerates into place, each landing has a small press.
 */
export const Obj: React.FC<{ src: string; aspect: number; poses: Pose[]; t: number; z?: number; children?: React.ReactNode; dur?: number }> = ({ src, aspect, poses, t, children, dur = 0.32 }) => {
  if (t < poses[0].t) return null;
  let i = 0;
  while (i + 1 < poses.length && poses[i + 1].t <= t) i++;
  const cur = poses[i];
  const prev = poses[Math.max(0, i - 1)];
  const k = i === 0 ? 1 : snapK(t, cur.t, dur);
  const lerp = (a: number, b: number) => a + (b - a) * k;
  const x = lerp(prev.x, cur.x);
  const y = lerp(prev.y, cur.y);
  const w = lerp(prev.w, cur.w);
  const r = lerp(prev.r ?? 0, cur.r ?? 0);
  const o = lerp(prev.o ?? 1, cur.o ?? 1);
  // landing press: the first pose drops from slightly above
  // anything on the page at frame 0 is already sitting there
  const drop = poses[0].t <= 0 ? 1 : snapK(t, poses[0].t, 0.3);
  const lift = 1 - drop;
  const h = w / aspect;
  if (o <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y - h / 2 - lift * 40,
        width: w,
        height: h,
        transform: `rotate(${r}deg) scale(${1 + lift * 0.08})`,
        opacity: o * Math.min(1, drop * 4),
        filter: `drop-shadow(0px ${8 + lift * 18}px ${16 + lift * 20}px rgba(0,0,0,${0.15 - lift * 0.05})) drop-shadow(0px 2px 2px rgba(0,0,0,0.12))`,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%" }} />
      {children ? <div style={{ position: "absolute", inset: 0 }}>{children}</div> : null}
    </div>
  );
};

// ---------- The wordmark, drawn ----------
/** The blue script "offload", stroked on glyph by glyph, then filled. */
export const Wordmark: React.FC<{ t: number; at: number; x: number; y: number; width: number; dur?: number; align?: "left" | "center" }> = ({ t, at, x, y, width, dur = 0.9, align = "center" }) => {
  if (t < at) return null;
  const s = width / wordmark.width;
  const h = (wordmark.ascent - wordmark.descent) * s;
  const n = wordmark.glyphs.length;
  const fill = interpolate(t, [at + dur * 0.7, at + dur + 0.15], [0, 1], clamp);
  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 ${-wordmark.ascent} ${wordmark.width} ${wordmark.ascent - wordmark.descent}`}
      style={{ position: "absolute", left: align === "center" ? x - width / 2 : x, top: y - h / 2, overflow: "visible" }}
    >
      {wordmark.glyphs.map((g, i) => {
        const g0 = at + (i / n) * dur * 0.75;
        const p = interpolate(t, [g0, g0 + dur * 0.35], [0, 1], { ...clamp, easing: SNAP });
        return (
          <path
            key={i}
            d={g.d}
            pathLength={1}
            fill={tokens.blue}
            fillOpacity={fill}
            stroke={tokens.blue}
            strokeWidth={14}
            strokeLinejoin="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - p}
            opacity={p > 0 ? 1 : 0}
          />
        );
      })}
    </svg>
  );
};
