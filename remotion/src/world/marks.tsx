import { Easing, interpolate, spring } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const MARKER = "#d2302a";

/** Seeded jitter so hand-drawn strokes look drawn, not geometric. */
const jit = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
};

const draw = (frame: number, at: number, dur: number) =>
  interpolate(frame, [at, at + dur], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.2, 1) });

/** A red marker cross that slams onto the page: two quick strokes and a small overshoot. */
export const Cross: React.FC<{ frame: number; fps: number; at: number; cx: number; cy: number; size: number; seed?: number }> = ({
  frame, fps, at, cx, cy, size, seed = 1,
}) => {
  const j = jit(seed);
  const s = size / 2;
  const a = `M ${cx - s + j() * 14} ${cy - s + j() * 14} Q ${cx + j() * 20} ${cy + j() * 20} ${cx + s + j() * 14} ${cy + s + j() * 14}`;
  const b = `M ${cx + s + j() * 14} ${cy - s + j() * 14} Q ${cx + j() * 20} ${cy + j() * 20} ${cx - s + j() * 14} ${cy + s + j() * 14}`;
  const len = size * 1.6;
  const p1 = draw(frame, at, 4);
  const p2 = draw(frame, at + 3, 4);
  const slam = spring({ frame: frame - at, fps, config: { damping: 9, mass: 0.5, stiffness: 220 } });
  if (frame < at) return null;
  return (
    <g style={{ transformOrigin: `${cx}px ${cy}px`, scale: String(interpolate(slam, [0, 1], [1.4, 1])) }}>
      {[a, b].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={MARKER} strokeWidth={size * 0.11} strokeLinecap="round"
          strokeDasharray={len} strokeDashoffset={len * (1 - (i === 0 ? p1 : p2))} opacity={0.92} />
      ))}
    </g>
  );
};

/** A hand-drawn loop around a box, drawn in time with the word. */
export const Circle: React.FC<{ frame: number; at: number; x0: number; y0: number; x1: number; y1: number; seed?: number; dur?: number }> = ({
  frame, at, x0, y0, x1, y1, seed = 3, dur = 14,
}) => {
  const j = jit(seed);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const rx = (x1 - x0) / 2 + 24;
  const ry = (y1 - y0) / 2 + 30;
  const pts: string[] = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI * 0.6 + (i / steps) * Math.PI * 2.15;
    const wob = 1 + j() * 0.025 + (i / steps) * 0.05;
    pts.push(`${cx + Math.cos(a) * rx * wob} ${cy + Math.sin(a) * ry * wob}`);
  }
  const d = `M ${pts.join(" L ")}`;
  const len = Math.PI * (rx + ry) * 2.2;
  const p = draw(frame, at, dur);
  if (frame < at) return null;
  return <path d={d} fill="none" stroke={MARKER} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.95} />;
};

export const Tick: React.FC<{ frame: number; at: number; cx: number; cy: number; size: number; colour?: string }> = ({ frame, at, cx, cy, size, colour = "#1f6b3a" }) => {
  const d = `M ${cx - size * 0.45} ${cy} L ${cx - size * 0.1} ${cy + size * 0.35} L ${cx + size * 0.5} ${cy - size * 0.4}`;
  const len = size * 2;
  if (frame < at) return null;
  return <path d={d} fill="none" stroke={colour} strokeWidth={size * 0.13} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw(frame, at, 7))} />;
};
