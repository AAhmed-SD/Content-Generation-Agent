import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type SpringConfig,
} from "remotion";
import { tokens } from "../../tokens";
import { SCRIPT } from "../../story/fonts";
import type { KPart } from "../kinetic";
import { Wordmark } from "../zine";

/**
 * The dark kit: the look of "offload-past-papers-dark", as parts. Dark page, white paper
 * cards, red for the problem, blue only for offload, smooth springs, colour floods between
 * scenes. Each niche video is a short choreography file that places these parts on words.
 */
export const INTER = "Inter";
loadFont({ family: INTER, url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const IO = Easing.bezier(0.65, 0, 0.35, 1);
export const SNAP: Partial<SpringConfig> = { damping: 200, mass: 0.6, stiffness: 240 };
export const POP: Partial<SpringConfig> = { damping: 13, mass: 0.5, stiffness: 220 };
export const HARD: Partial<SpringConfig> = { damping: 16, mass: 0.6, stiffness: 420 };
export const mix = (a: number, b: number, k: number) => a + (b - a) * k;
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
export const soft = (d = 1) => `0 ${2 * d}px ${4 * d}px rgba(0,0,0,0.12), 0 ${18 * d}px ${50 * d}px rgba(0,0,0,0.35)`;

// ---------- timing ----------
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
export const makeTiming = (timing: Timing) => {
  const ls = (id: string) => timing.lines.find((x) => x.id === id)!.start;
  const le = (id: string) => timing.lines.find((x) => x.id === id)!.end;
  const at = (line: string, word: string, nth = 1) => {
    const l = timing.lines.find((x) => x.id === line)!;
    const exact = l.words.filter((w) => norm(w.text) === norm(word));
    const hits = exact.length ? exact : l.words.filter((w) => norm(w.text).startsWith(norm(word)));
    return (hits[nth - 1] ?? hits[0] ?? l.words[0]).start;
  };
  /** Kinetic parts from spoken words, in order, so repeated words take their own times. */
  const kw = (text: string, line: string, fx: KPart["fx"] = "mask", per: Record<string, Partial<KPart>> = {}): KPart[] => {
    const lw = timing.lines.find((x) => x.id === line)!.words;
    const ws = text.split(" ");
    // start where the whole phrase matches in a row, so a repeated word ("so") finds its own phrase
    const n = ws.length;
    let cur = 0;
    for (let i = 0; i + n <= lw.length; i++) {
      if (ws.every((w, j) => norm(lw[i + j].text) === norm(w))) {
        cur = i;
        break;
      }
    }
    return ws.map((w) => {
      const idx = lw.findIndex((x, j) => j >= cur && norm(x.text) === norm(w));
      const hit = idx >= 0 ? lw[idx] : lw[Math.min(cur, lw.length - 1)];
      if (idx >= 0) cur = idx + 1;
      return { text: w, t: hit.start, fx, ...(per[norm(w)] ?? {}) };
    });
  };
  return { ls, le, at, kw, duration: timing.duration };
};

export const useK = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sp = (t0: number, c: Partial<SpringConfig> = SNAP) => spring({ frame: frame - Math.round(t0 * fps), fps, config: c });
  const e = (t0: number, d = 0.5, ease = EXPO) => interpolate(t, [t0, t0 + d], [0, 1], { ...clamp, easing: ease });
  return { frame, fps, t, sp, e };
};

// ---------- motion state ----------
export type S = { x: number; y: number; s: number; r: number; o: number; b: number };
export type Key = { t: number; v: Partial<S>; c?: Partial<SpringConfig> };
export const S0 = (v: Partial<S> = {}): S => ({ x: 540, y: 960, s: 1, r: 0, o: 0, b: 0, ...v });
export const track = (frame: number, fps: number, init: S, keys: Key[]): S =>
  keys.reduce((st, k) => {
    const kk = spring({ frame: frame - Math.round(k.t * fps), fps, config: k.c ?? { damping: 200, mass: 1, stiffness: 110 } });
    if (kk === 0) return st;
    const out = { ...st };
    (Object.keys(k.v) as (keyof S)[]).forEach((p) => (out[p] = mix(st[p], k.v[p]!, kk)));
    return out;
  }, init);
export const place = (s: S, w: number, h: number): React.CSSProperties => ({
  position: "absolute",
  left: s.x - w / 2,
  top: s.y - h / 2,
  width: w,
  height: h,
  transform: `rotate(${s.r}deg) scale(${s.s})`,
  opacity: Math.max(0, Math.min(1, s.o)),
  filter: s.b > 0.3 ? `blur(${s.b.toFixed(1)}px)` : undefined,
});

// ---------- marks ----------
export const XBadge: React.FC<{ k: number; size?: number; colour?: string }> = ({ k, size = 64, colour = tokens.problem }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: colour, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})`, boxShadow: soft(0.4) }}>
    <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 36 36">
      <path d="M8 8 L28 28 M28 8 L8 28" stroke={tokens.white} strokeWidth={6} strokeLinecap="round" />
    </svg>
  </div>
);
export const Check: React.FC<{ k: number; size?: number; ring?: string; fill?: string }> = ({ k, size = 46, ring = tokens.line, fill = tokens.ink }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <circle cx={22} cy={22} r={19} fill={k > 0.05 ? fill : "none"} fillOpacity={Math.min(1, k)} stroke={ring} strokeWidth={3} />
    <path d="M13 23 L19.5 29 L31 16" fill="none" stroke={tokens.white} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - k)} />
  </svg>
);

// ---------- the document card ----------
export type Row = {
  label?: string;
  chip?: string;
  chipTone?: "ink" | "grey" | "red" | "paper";
  check?: boolean;
  h?: number;
  inAt?: number; // row pops in
  grow?: { at: number; h: number };
  out?: number; // row slides away
  tag?: { text: string; at: number };
  cross?: number;
  tick?: number;
  tint?: number;
  strike?: number;
  shuffle?: { at: number; to: number }; // move to another slot index
};

/** A white paper card: title, rows with labels, chips, checks, crosses, tags and a handwritten stamp. */
export const DocCard: React.FC<{
  s: S;
  w: number;
  h: number;
  title: string;
  sub?: string;
  rows: Row[];
  stamp?: { text: string; at: number; x?: number; y?: number; size?: number; rot?: number; colour?: string; circle?: boolean; strikeAt?: number };
  tint?: { at: number; colour: string; until?: number };
  radius?: number;
}> = ({ s, w, h, title, sub, rows, stamp, tint, radius = 30 }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const top0 = sub ? 150 : 118;
  let y = top0;
  const slots: number[] = [];
  const heights = rows.map((r) => {
    const base = r.h ?? 92;
    const g = r.grow ? sp(r.grow.at, POP) : 0;
    const inK = r.inAt === undefined ? 1 : sp(r.inAt, POP);
    return mix(base, r.grow?.h ?? base, g) * inK;
  });
  heights.forEach((hh) => {
    slots.push(y);
    y += hh + 14 * (hh > 4 ? 1 : 0);
  });
  const tintK = tint ? sp(tint.at) * (tint.until ? 1 - sp(tint.until) : 1) : 0;
  return (
    <div style={{ ...place(s, w, h), borderRadius: radius, background: tokens.white, boxShadow: soft(1.4), overflow: "hidden" }}>
      {tint ? <div style={{ position: "absolute", inset: 0, background: tint.colour, opacity: tintK * 0.14 }} /> : null}
      <div style={{ position: "absolute", left: 44, top: 40, fontFamily: INTER, fontWeight: 750, fontSize: 40, letterSpacing: "-0.025em", color: tokens.ink }}>{title}</div>
      {sub ? <div style={{ position: "absolute", left: 44, top: 92, fontFamily: INTER, fontWeight: 550, fontSize: 28, color: tokens.quiet }}>{sub}</div> : null}
      <div style={{ position: "absolute", left: 44, right: 44, top: top0 - 22, height: 2, background: tokens.line }} />
      {rows.map((r, i) => {
        const hh = heights[i];
        if (hh < 2) return null;
        const outK = r.out === undefined ? 0 : sp(r.out);
        const shuffleK = r.shuffle ? sp(r.shuffle.at, POP) : 0;
        const yy = r.shuffle ? mix(slots[i], slots[r.shuffle.to] ?? slots[i], shuffleK) : slots[i];
        const crossK = r.cross === undefined ? 0 : sp(r.cross, POP);
        const tickK = r.tick === undefined ? 0 : sp(r.tick, POP);
        const tintR = r.tint === undefined ? 0 : sp(r.tint);
        const strikeK = r.strike === undefined ? 0 : sp(r.strike);
        const tone = r.chipTone ?? "ink";
        const chipBg = tone === "ink" ? tokens.ink : tone === "red" ? tokens.problem : tone === "paper" ? tokens.paper : alpha(tokens.ink, 0.12);
        const chipFg = tone === "grey" || tone === "paper" ? tokens.ink : tokens.white;
        return (
          <div key={i} style={{ position: "absolute", left: 28, right: 28, top: yy, height: hh, borderRadius: 18, transform: `translateX(${outK * (w + 200)}px) rotate(${outK * 6}deg)`, opacity: 1 - outK * 0.5 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: tokens.problem, opacity: tintR * 0.1 + crossK * 0.06 }} />
            {hh > 30 ? (
              <div style={{ position: "absolute", left: 16, right: 16, top: Math.min(16, hh / 2 - 26), height: 52, display: "flex", alignItems: "center", gap: 18 }}>
                {r.check ? <Check k={tickK} /> : null}
                {r.chip ? (
                  <div style={{ minWidth: 52, height: 52, padding: "0 14px", borderRadius: 14, background: chipBg, color: chipFg, fontFamily: INTER, fontWeight: 750, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.chip}</div>
                ) : null}
                {r.label ? (
                  <div style={{ position: "relative", fontFamily: INTER, fontWeight: 600, fontSize: 34, letterSpacing: "-0.015em", color: tokens.ink, whiteSpace: "nowrap", opacity: strikeK > 0.5 ? 0.45 : 1 }}>
                    {r.label}
                    <div style={{ position: "absolute", left: 0, top: "52%", height: 4, width: `${strikeK * 100}%`, background: tokens.problem, borderRadius: 2 }} />
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    <div style={{ height: 13, width: "78%", borderRadius: 7, background: tokens.line }} />
                    <div style={{ height: 13, width: "52%", borderRadius: 7, background: tokens.line }} />
                  </div>
                )}
                <div style={{ flex: 1 }} />
                {r.tag && t > r.tag.at ? (
                  <div style={{ padding: "8px 18px", borderRadius: 24, background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 750, fontSize: 26, transform: `scale(${sp(r.tag.at, POP)})` }}>{r.tag.text}</div>
                ) : null}
                {r.cross !== undefined && crossK > 0.01 ? <XBadge k={crossK} size={56} /> : null}
              </div>
            ) : null}
          </div>
        );
      })}
      {stamp && t > stamp.at ? (
        <div
          style={{
            position: "absolute",
            left: stamp.x ?? w / 2,
            top: stamp.y ?? h / 2,
            transform: `translate(-50%, -50%) rotate(${stamp.rot ?? -8}deg) scale(${mix(1.6, 1, sp(stamp.at, HARD))})`,
            opacity: Math.min(1, sp(stamp.at, HARD) * 2),
            fontFamily: SCRIPT,
            fontWeight: 700,
            fontSize: stamp.size ?? 120,
            color: stamp.colour ?? tokens.problem,
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {stamp.text}
          {stamp.strikeAt !== undefined && t > stamp.strikeAt ? (
            <div style={{ position: "absolute", left: "-12%", top: "48%", height: 14, width: `${124 * sp(stamp.strikeAt, HARD)}%`, background: tokens.ink, borderRadius: 7, transform: "rotate(-4deg)" }} />
          ) : null}
          {stamp.circle ? (
            <svg style={{ position: "absolute", left: -30, top: -24, overflow: "visible" }} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <ellipse cx={58} cy={56} rx={66} ry={58} fill="none" stroke={stamp.colour ?? tokens.problem} strokeWidth={2.4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sp(stamp.at + 0.15)} vectorEffect="non-scaling-stroke" style={{ strokeWidth: 8 }} />
            </svg>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

// ---------- the week planner ----------
export type Block = {
  day: number;
  slot: number;
  label: string;
  tone?: "ink" | "paper" | "kraft" | "card" | "stamp" | "white";
  at: number;
  moveTo?: { day: number; slot: number; at: number };
  fall?: number;
  outline?: number;
  out?: number;
};
export const WeekStrip: React.FC<{ s: S; days: string[]; blocks: Block[]; drift?: number; tileH?: number; title?: string; highlight?: { day: number; at: number; until?: number } }> = ({ s, days, blocks, drift = 0, tileH = 380, title, highlight }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const W = 960;
  const gap = 12;
  const tw = (W - gap * (days.length - 1)) / days.length;
  const bh = Math.min(96, (tileH - 70 - 3 * 10) / 3);
  const toneBg = (tone: Block["tone"]) => (tone === "ink" ? tokens.ink : tone === "kraft" ? tokens.kraft : tone === "stamp" ? tokens.stamp : tone === "card" ? tokens.card : tone === "white" ? tokens.white : tokens.paper);
  const toneFg = (tone: Block["tone"]) => (tone === "ink" || tone === "stamp" ? tokens.white : tokens.ink);
  const H = tileH + (title ? 70 : 0);
  return (
    <div style={{ ...place(s, W, H) }}>
      {title ? <div style={{ position: "absolute", left: 0, top: 0, fontFamily: INTER, fontWeight: 750, fontSize: 40, letterSpacing: "-0.02em", color: tokens.white }}>{title}</div> : null}
      {days.map((d, i) => {
        const hl = highlight && highlight.day === i ? sp(highlight.at) * (highlight.until ? 1 - sp(highlight.until) : 1) : 0;
        return (
          <div key={d} style={{ position: "absolute", left: i * (tw + gap) + drift, top: title ? 70 : 0, width: tw, height: tileH, borderRadius: 22, background: alpha(tokens.white, 0.07 + hl * 0.1), border: `2px solid ${hl > 0.05 ? alpha(tokens.problem, hl) : alpha(tokens.white, 0.14)}` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center", fontFamily: INTER, fontWeight: 650, fontSize: 28, color: alpha(tokens.white, 0.75) }}>{d}</div>
          </div>
        );
      })}
      {blocks.map((b, i) => {
        if (t < b.at) return null;
        const inK = sp(b.at, POP);
        const mv = b.moveTo ? sp(b.moveTo.at, POP) : 0;
        const day = b.moveTo ? mix(b.day, b.moveTo.day, mv) : b.day;
        const slot = b.moveTo ? mix(b.slot, b.moveTo.slot, mv) : b.slot;
        const fallK = b.fall === undefined ? 0 : interpolate(t, [b.fall + (i % 5) * 0.04, b.fall + (i % 5) * 0.04 + 0.7], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
        const outK = b.out === undefined ? 0 : sp(b.out);
        const ol = b.outline === undefined ? 0 : sp(b.outline);
        const shake = b.outline !== undefined && t > b.outline && t < b.outline + 0.5 ? Math.sin(t * 80) * 6 * (1 - (t - b.outline) / 0.5) : 0;
        const x = day * (tw + gap) + 8 + drift + shake;
        const y = (title ? 70 : 0) + 62 + slot * (bh + 10);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + fallK * 1300,
              width: tw - 16,
              height: bh,
              borderRadius: 14,
              background: toneBg(b.tone),
              color: toneFg(b.tone),
              outline: ol > 0.02 ? `4px solid ${alpha(tokens.problem, ol)}` : undefined,
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: Math.min(24, tw / 6),
              lineHeight: 1.05,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 6,
              transform: `scale(${inK * (1 - outK * 0.4)}) rotate(${fallK * ((i % 2 ? 1 : -1) * 40)}deg)`,
              opacity: (1 - outK) * (1 - fallK * 0.4),
              boxShadow: soft(0.4),
            }}
          >
            {b.label}
          </div>
        );
      })}
    </div>
  );
};

// ---------- the timeline ----------
export const Timeline: React.FC<{ s: S; steps: { label: string; sub?: string; at: number; red?: boolean }[]; gap?: number }> = ({ s, steps, gap = 190 }) => {
  const { t, sp, e } = useK();
  if (s.o <= 0.01) return null;
  const H = gap * (steps.length - 1) + 140;
  const lastOn = steps.filter((x) => t >= x.at).length;
  const lineK = steps.length > 1 ? Math.max(0, lastOn - 1 + (lastOn < steps.length ? e(steps[Math.max(0, lastOn - 1)]?.at ?? 0, 0.4) * 0 : 0)) / (steps.length - 1) : 0;
  return (
    <div style={{ ...place(s, 900, H) }}>
      <div style={{ position: "absolute", left: 38, top: 40, width: 4, height: gap * (steps.length - 1), background: alpha(tokens.white, 0.15), borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 38, top: 40, width: 4, height: gap * (steps.length - 1) * Math.min(1, lineK), background: tokens.white, borderRadius: 2 }} />
      {steps.map((st, i) => {
        const k = sp(st.at, POP);
        const on = t >= st.at;
        return (
          <div key={i} style={{ position: "absolute", left: 0, top: i * gap, height: 100, display: "flex", alignItems: "center", gap: 36, opacity: on ? 1 : 0.28 }}>
            <div style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: st.red && on ? tokens.problem : on ? tokens.white : alpha(tokens.white, 0.3), transform: `scale(${on ? mix(1.6, 1, k) : 1})`, boxShadow: on ? `0 0 0 ${10 * (1 - Math.min(1, k)) + 6}px ${alpha(st.red ? tokens.problem : tokens.white, 0.18)}` : undefined }} />
            </div>
            <div>
              <div style={{ fontFamily: INTER, fontWeight: 750, fontSize: 52, letterSpacing: "-0.03em", color: st.red && on ? tokens.problem : tokens.white, lineHeight: 1.05 }}>{st.label}</div>
              {st.sub ? <div style={{ fontFamily: INTER, fontWeight: 550, fontSize: 32, color: alpha(tokens.white, 0.6), marginTop: 6 }}>{st.sub}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- the phone ----------
export const Phone: React.FC<{ s: S; chip?: { text: string; at: number }; pulses?: number[] }> = ({ s, chip, pulses = [] }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const W = 488;
  const H = 1040;
  return (
    <div style={place(s, W, H)}>
      {pulses.map((p0, i) => {
        if (t < p0) return null;
        const k = interpolate(t, [p0, p0 + 0.8], [0, 1], { ...clamp, easing: EXPO });
        return <div key={i} style={{ position: "absolute", inset: -10, borderRadius: 86, border: `${3 + (1 - k) * 10}px solid ${tokens.blue}`, opacity: 1 - k, transform: `scale(${1 + k * 0.1})` }} />;
      })}
      <div style={{ position: "absolute", inset: 0, borderRadius: 78, background: tokens.ink, boxShadow: `0 0 0 3px ${alpha(tokens.white, 0.22)}, ${soft(2)}` }} />
      <div style={{ position: "absolute", inset: 14, borderRadius: 64, overflow: "hidden", background: tokens.white }}>
        <Img src={staticFile("world/past-papers/screen.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 30, width: 130, height: 36, marginLeft: -65, borderRadius: 18, background: tokens.ink }} />
      {chip && t > chip.at ? (
        <div style={{ position: "absolute", left: "50%", top: 120, transform: `translateX(-50%) scale(${sp(chip.at, POP)})`, padding: "18px 30px", borderRadius: 40, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 650, fontSize: 30, letterSpacing: "-0.02em", whiteSpace: "nowrap", boxShadow: soft(1) }}>
          {chip.text}
        </div>
      ) : null}
    </div>
  );
};

// ---------- real footage ----------
/**
 * A screen recording from the real app, framed like a screen: it pushes in on the action
 * (the drag), then pulls back so the toast that confirms it is readable.
 */
export const ScreenClip: React.FC<{ s: S; src: string; at: number; until: number; clipLen: number; label?: string; focus?: [number, number] }> = ({ s, src, at, until, clipLen, label = "Live in the app", focus = [36, 42] }) => {
  const { t, fps, sp } = useK();
  if (s.o <= 0.01) return null;
  const W = 900;
  const H = Math.round((W * 1128) / 960);
  const rate = Math.max(1, Math.min(2.2, clipLen / Math.max(0.5, until - at)));
  const p = interpolate(t, [at, until], [0, 1], clamp);
  const zoom = interpolate(p, [0, 0.14, 0.5, 0.7, 1], [1.02, 1.32, 1.32, 1, 1], { ...clamp, easing: IO });
  return (
    <div style={{ ...place(s, W, H) }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 36, overflow: "hidden", background: tokens.night, boxShadow: `0 0 0 3px ${alpha(tokens.white, 0.2)}, ${soft(2)}` }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: `${focus[0]}% ${focus[1]}%` }}>
          <Sequence from={Math.round(at * fps)} layout="none">
            <OffthreadVideo src={staticFile(src)} playbackRate={rate} muted style={{ width: W, height: H }} />
          </Sequence>
        </div>
      </div>
      <div style={{ position: "absolute", left: 24, top: -66, display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 30, background: alpha(tokens.white, 0.12), border: `1.5px solid ${alpha(tokens.white, 0.3)}`, transform: `scale(${sp(at + 0.1, POP)})`, transformOrigin: "left center" }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: tokens.problem, opacity: Math.floor(t * 2) % 2 ? 1 : 0.35 }} />
        <div style={{ fontFamily: INTER, fontWeight: 650, fontSize: 28, color: tokens.white }}>{label}</div>
      </div>
    </div>
  );
};

// ---------- colour floods between scenes ----------
/** A flood that grows from a point to fill the frame, then (optionally) shrinks into another point. */
export const Flood: React.FC<{ colour: string; inAt: number; from: { x: number; y: number }; outAt?: number; to?: { x: number; y: number }; rMin?: number; children?: React.ReactNode }> = ({ colour, inAt, from, outAt, rMin = 0, children }) => {
  const { t, sp } = useK();
  if (t < inAt) return null;
  const grow = sp(inAt, { damping: 200, mass: 0.6, stiffness: 140 });
  const shrink = outAt === undefined ? 0 : sp(outAt, { damping: 200, mass: 0.6, stiffness: 150 });
  if (shrink > 0.985) return null;
  // in: grows from a point; out: wipes up and off the top of the frame
  const clip = shrink > 0.001 ? `circle(${3000 * (1 - shrink)}px at 540px -820px)` : `circle(${rMin + 2300 * Math.min(1, grow)}px at ${from.x}px ${from.y}px)`;
  return (
    <AbsoluteFill style={{ clipPath: clip }}>
      <AbsoluteFill style={{ background: colour }} />
      {children}
    </AbsoluteFill>
  );
};

// ---------- the end card ----------
export const EndCard: React.FC<{ at: number; word: string; typeAt: number; markAt: number }> = ({ at, word, typeAt, markAt }) => {
  const { t, frame, sp } = useK();
  if (t < at) return null;
  const k = sp(at);
  const typed = Math.floor(interpolate(t, [typeAt, typeAt + 0.06 * word.length + 0.1], [0, word.length], clamp));
  return (
    <AbsoluteFill style={{ alignItems: "center", flexDirection: "column", opacity: k, transform: `scale(${mix(0.88, 1, k)})`, filter: k < 0.97 ? `blur(${(1 - k) * 18}px)` : undefined }}>
      <div style={{ marginTop: 580, fontFamily: INTER, fontWeight: 750, fontSize: 116, letterSpacing: "-0.045em", color: tokens.white }}>Comment</div>
      <div style={{ marginTop: 34, padding: "30px 76px", minWidth: 700, textAlign: "center", borderRadius: 999, background: tokens.white, boxShadow: soft(1.6), fontFamily: INTER, fontWeight: 850, fontSize: 150, letterSpacing: "-0.05em", lineHeight: 1, color: tokens.ink, transform: `scale(${mix(0.6, 1, sp(typeAt - 0.2, POP))})` }}>
        {word.slice(0, typed)}
        <span style={{ fontWeight: 300, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, filter: `drop-shadow(0 0 22px ${alpha(tokens.blue, 0.9)})` }}>
        <Wordmark t={t} at={markAt} x={540} y={1190} width={480} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- icons ----------
export const CarIcon: React.FC<{ variant: number; colour?: string }> = ({ variant, colour = tokens.ink }) => {
  const bodies = [
    "M8 38 L14 26 Q18 20 26 20 L52 20 Q60 20 66 26 L74 34 L88 36 Q94 37 94 44 L94 50 L8 50 Z",
    "M6 40 Q10 30 22 28 L34 18 Q38 15 46 15 L60 15 Q68 15 72 22 L80 30 L90 32 Q96 34 96 42 L96 50 L6 50 Z",
    "M6 46 L10 34 Q14 28 24 28 L40 26 L52 16 Q56 14 64 14 L74 14 Q80 15 84 22 L92 34 Q96 38 96 46 L96 50 L6 50 Z",
    "M8 42 L16 22 Q18 18 24 18 L76 18 Q82 18 84 22 L92 36 Q94 40 94 44 L94 50 L8 50 Z",
  ];
  return (
    <svg viewBox="0 0 100 64" width="100%" height="100%">
      <path d={bodies[variant % bodies.length]} fill={colour} />
      <circle cx={26} cy={50} r={9} fill={colour} stroke={tokens.white} strokeWidth={4} />
      <circle cx={74} cy={50} r={9} fill={colour} stroke={tokens.white} strokeWidth={4} />
    </svg>
  );
};
export const ClockIcon: React.FC<{ t: number; speed?: number; colour?: string }> = ({ t, speed = 1, colour = tokens.ink }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <circle cx={50} cy={50} r={42} fill="none" stroke={colour} strokeWidth={7} />
    <line x1={50} y1={50} x2={50 + 26 * Math.sin(t * speed)} y2={50 - 26 * Math.cos(t * speed)} stroke={colour} strokeWidth={7} strokeLinecap="round" />
    <line x1={50} y1={50} x2={50 + 34 * Math.sin(t * speed * 12)} y2={50 - 34 * Math.cos(t * speed * 12)} stroke={tokens.problem} strokeWidth={4} strokeLinecap="round" />
  </svg>
);

// ---------- the shell: page, breathing camera, voice, sound ----------
export type Cue = { t: number; s: string; v: number };
/** A camera move: look at (x, y) at zoom z, tilted r degrees. Springs between keys, like a hand-held operator following the action. */
export type Cam = { t: number; x?: number; y?: number; z?: number; r?: number; c?: Partial<SpringConfig> };
/** Smooth camera: each key is a long ease-in-out from wherever the camera is, so moves overlap without jolts. */
const CAM_EASE = Easing.bezier(0.42, 0, 0.18, 1);
const CAM_DUR = 1.5;
export const camAt = (frame: number, fps: number, keys: Cam[]) => {
  const t = frame / fps;
  return keys.reduce(
    (st, k) => {
      const kk = interpolate(t, [k.t, k.t + CAM_DUR], [0, 1], { ...clamp, easing: CAM_EASE });
      if (kk === 0) return st;
      // gentler than asked: zoom and tilt at 70% / 60%, and never look so low that the stage rises into the type
      const z = 1 + ((k.z ?? st.z) - 1) * 0.7;
      const y = Math.min(k.y ?? st.y, 640 + 360 / z);
      return { x: mix(st.x, k.x ?? st.x, kk), y: mix(st.y, y, kk), z: mix(st.z, z, kk), r: mix(st.r, (k.r ?? st.r / 0.6) * 0.6, kk) };
    },
    { x: 540, y: 960, z: 1, r: 0 },
  );
};
export const Shell: React.FC<{ vo: string; cues: Cue[]; punches?: [number, number][]; children: React.ReactNode; overlay?: React.ReactNode; cam?: Cam[]; ticks?: number[] }> = ({ vo, cues, punches = [], children, overlay, cam = [], ticks = [] }) => {
  const { t, fps, frame } = useK();
  const punch = punches.reduce((a, [p0, amt]) => a + (t < p0 ? 0 : 0.5 * amt * Math.exp(-(t - p0) * 6) * Math.cos((t - p0) * 14)), 0);
  const breathe = 1 + 0.008 * Math.sin(t * 0.6) + punch;
  const c = camAt(frame, fps, cam);
  const drift = { x: 4 * Math.sin(t * 0.45), y: 3 * Math.sin(t * 0.33 + 1) };
  const z = c.z * breathe;
  return (
    <AbsoluteFill style={{ background: tokens.ink, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 115%, ${alpha(tokens.white, 0.05)}, rgba(0,0,0,0) 70%)` }} />
      {/* living background: two slow blue glows */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: 540 + Math.sin(t * (0.13 + i * 0.07) + i * 2) * 380 - 520, top: 960 + Math.cos(t * (0.11 + i * 0.05) + i) * 620 - 520, width: 1040, height: 1040, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(tokens.mark, 0.16 - i * 0.05)}, rgba(0,0,0,0) 65%)` }} />
      ))}
      <AbsoluteFill
        style={{
          transformOrigin: "0 0",
          transform: `translate(${540 + drift.x}px, ${960 + drift.y}px) rotate(${c.r}deg) scale(${z}) translate(${-c.x}px, ${-c.y}px)`,
        }}
      >
        {/* dot grid on the stage: it moves with the camera, so every move reads as depth */}
        <div style={{ position: "absolute", left: -700, top: -700, right: -700, bottom: -700, backgroundImage: `radial-gradient(${alpha(tokens.white, 0.09)} 2px, rgba(0,0,0,0) 2.6px)`, backgroundSize: "54px 54px", maskImage: "radial-gradient(60% 50% at 50% 50%, black, transparent)", WebkitMaskImage: "radial-gradient(60% 50% at 50% 50%, black, transparent)" }} />
        {children}
      </AbsoluteFill>
      {overlay}
      <Audio src={staticFile(vo)} />
      {cues.map((q, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(q.t * fps))} durationInFrames={Math.round(1.6 * fps)} layout="none" name={`sfx ${q.s}`}>
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
