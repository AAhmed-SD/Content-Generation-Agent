import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { tokens } from "../../tokens";
import { Kinetic, type KPart } from "../kinetic";
import { Icon } from "./icons";
import { Wordmark } from "../zine";
import { alpha, INTER, mix, POP, soft, useK } from "./dark";

/**
 * The talk format: the voiceover runs as burned-in captions, phrase by phrase, at the top of the
 * frame, and one object per sentence sits in the middle. Reusable for any script: a new video only
 * needs its scenes.
 */
type Word = { text: string; start: number; end: number };
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: Word[] }[] };
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");

/** Split each line into phrases: at punctuation, then into pieces of at most `max` words. */
export const phrases = (timing: Timing, max = 5, hook = 0) => {
  const out: Word[][] = [];
  const all = timing.lines.flatMap((l) => l.words);
  if (hook > 0) out.push(all.slice(0, hook));
  timing.lines.forEach((l) => {
    let cur: Word[] = [];
    const words = l.words.filter((w) => !out[0] || hook === 0 || !out[0].includes(w));
    const flush = () => {
      if (!cur.length) return;
      const n = Math.ceil(cur.length / max);
      const per = Math.ceil(cur.length / n);
      for (let i = 0; i < cur.length; i += per) out.push(cur.slice(i, i + per));
      cur = [];
    };
    words.forEach((w) => {
      cur.push(w);
      if (/[.,?!]$/.test(w.text)) flush();
    });
    flush();
  });
  return out;
};

export const Captions: React.FC<{
  timing: Timing;
  hi?: Record<string, string>;
  y?: number;
  size?: number;
  max?: number;
  /** spoken spellings shown differently on screen, e.g. "A D H D" → "ADHD" */
  show?: (ws: Word[]) => Word[];
  until?: number;
  /** the first N spoken words are one phrase, on screen from frame 0 */
  hook?: number;
  /** windows where a big type moment takes over and captions step aside */
  gaps?: [number, number][];
  colour?: string;
}> = ({ timing, hi = {}, y = 210, size = 84, max = 5, show, until = 1e9, hook = 0, gaps = [], colour = tokens.white }) => {
  const { frame, fps } = useK();
  const ps = phrases(timing, max, hook);
  return (
    <>
      {ps.map((p0, i) => {
        const p = show ? show(p0) : p0;
        const next = ps[i + 1]?.[0].start ?? p0[p0.length - 1].end + 0.6;
        const st = p0[0].start;
        if (i > 0 && gaps.some(([a, b]) => st >= a - 0.05 && st < b)) return null;
        const gapIn = gaps.filter(([a]) => a > st).map(([a]) => a);
        const out = Math.min(until, next - 0.04, ...gapIn);
        const parts: KPart[] = p.map((w) => {
          const c = hi[norm(w.text)] ?? (norm(w.text) === "offload" ? tokens.blue : undefined);
          return { text: w.text, t: i === 0 ? 0 : w.start - 0.04, fx: i === 0 ? "cut" : "mask", colour: c };
        });
        return <Kinetic key={i} frame={frame} fps={fps} font={INTER} colour={colour} y={y} size={size} weight={800} out={out} exit="cut" parts={parts} />;
      })}
    </>
  );
};

/** A merged spoken token, e.g. the voice says "A D H D", the screen shows "ADHD". */
export const merge = (spoken: string[], shown: string) => (ws: Word[]) => {
  const out: Word[] = [];
  for (let i = 0; i < ws.length; i++) {
    const seq = ws.slice(i, i + spoken.length);
    if (seq.length === spoken.length && seq.every((w, j) => norm(w.text) === norm(spoken[j]))) {
      const tail = seq[seq.length - 1].text.match(/[.,?!]+$/)?.[0] ?? "";
      out.push({ text: shown + tail, start: seq[0].start, end: seq[seq.length - 1].end });
      i += spoken.length - 1;
    } else out.push(ws[i]);
  }
  return out;
};

/** End card: a lead line, a pill, the drawn mark. */
export const LinkCard: React.FC<{ at: number; lead: string; pill: string; markAt: number }> = ({ at, lead, pill, markAt }) => {
  const { t, sp } = useK();
  if (t < at) return null;
  const k = sp(at);
  return (
    <AbsoluteFill style={{ background: tokens.ink, alignItems: "center", flexDirection: "column", opacity: k, transform: `scale(${mix(0.9, 1, k)})` }}>
      <div style={{ marginTop: 560, fontFamily: INTER, fontWeight: 750, fontSize: 96, letterSpacing: "-0.045em", color: tokens.white }}>{lead}</div>
      <div style={{ marginTop: 40, padding: "30px 70px", borderRadius: 999, background: tokens.white, boxShadow: soft(1.6), fontFamily: INTER, fontWeight: 850, fontSize: 104, letterSpacing: "-0.045em", lineHeight: 1, color: tokens.ink, transform: `scale(${mix(0.6, 1, sp(at + 0.15, POP))})` }}>{pill}</div>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, filter: `drop-shadow(0 0 22px ${alpha(tokens.blue, 0.9)})` }}>
        <Wordmark t={t} at={markAt} x={540} y={1190} width={480} />
      </div>
    </AbsoluteFill>
  );
};

/** A small card face for decks and prompts. */
export const Face: React.FC<{ x: number; y: number; w: number; h: number; k: number; r?: number; children?: React.ReactNode; bg?: string; o?: number; blur?: number }> = ({ x, y, w, h, k, r = 0, children, bg = tokens.white, o = 1, blur = 0 }) =>
  k <= 0.001 || o <= 0.01 ? null : (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: 26, background: bg, boxShadow: soft(1.2), transform: `scale(${k}) rotate(${r}deg)`, opacity: Math.min(1, k * 1.5) * o, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, overflow: "hidden" }}>{children}</div>
  );

export const Label: React.FC<{ children: React.ReactNode; size?: number; colour?: string; weight?: number }> = ({ children, size = 44, colour = tokens.ink, weight = 750 }) => (
  <div style={{ fontFamily: INTER, fontWeight: weight, fontSize: size, letterSpacing: "-0.03em", color: colour, lineHeight: 1.1 }}>{children}</div>
);

/** A drawn line chart, the "spacing" diagram family: axes, curves revealed left to right, labelled dots. */
export type Series = { f: (u: number) => number; colour: string; width?: number; dash?: string; label?: string; labelU?: number; labelDy?: number };
export const Chart: React.FC<{
  draw: [number, number];
  out?: number;
  series: Series[];
  dots?: { u: number; s: number; label?: string }[];
  box?: { x0: number; x1: number; y0: number; y1: number };
  axis?: string;
  xLabel?: string;
  yLabel?: string;
  ticks?: { u: number; label: string }[];
}> = ({ draw, out = 1e9, series, dots = [], box = { x0: 130, x1: 950, y0: 760, y1: 1420 }, axis = tokens.ink, xLabel, yLabel, ticks = [] }) => {
  const { t, sp } = useK();
  const d = interpolate(t, draw, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 2.4) });
  if (d <= 0) return null;
  const o = 1 - sp(out);
  if (o <= 0.01) return null;
  const { x0, x1, y0, y1 } = box;
  const X = (u: number) => x0 + u * (x1 - x0);
  const Y = (v: number) => y1 - v * (y1 - y0);
  const path = (f: (u: number) => number) => "M " + Array.from({ length: 141 }, (_, i) => `${X(i / 140).toFixed(1)} ${Y(f(i / 140)).toFixed(1)}`).join(" L ");
  const id = `rv${Math.round(draw[0] * 100)}`;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: o, filter: o < 0.98 ? `blur(${(1 - o) * 16}px)` : undefined }}>
      <defs>
        <clipPath id={id}>
          <rect x={x0 - 30} y={0} width={(x1 - x0 + 60) * d} height={1920} />
        </clipPath>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={x0} y1={y1 - g * (y1 - y0)} x2={x1} y2={y1 - g * (y1 - y0)} stroke={axis} strokeOpacity={0.07} strokeWidth={2} />
      ))}
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke={axis} strokeOpacity={0.3} strokeWidth={3} />
      <line x1={x0} y1={y0 - 30} x2={x0} y2={y1} stroke={axis} strokeOpacity={0.3} strokeWidth={3} />
      {xLabel ? <text x={x1} y={y1 + 64} textAnchor="end" fontFamily={INTER} fontWeight={600} fontSize={34} fill={axis} fillOpacity={0.55}>{xLabel}</text> : null}
      {ticks.map((tk, i) => (d >= tk.u ? <text key={`t${i}`} x={X(tk.u)} y={y1 + 64} textAnchor={tk.u < 0.1 ? "start" : tk.u > 0.9 ? "end" : "middle"} fontFamily={INTER} fontWeight={700} fontSize={34} fill={axis} fillOpacity={0.7}>{tk.label}</text> : null))}
      {yLabel ? <text x={x0 + 18} y={y0 - 44} fontFamily={INTER} fontWeight={600} fontSize={34} fill={axis} fillOpacity={0.55}>{yLabel}</text> : null}
      <g clipPath={`url(#${id})`}>
        {series.map((sr, i) => (
          <path key={i} d={path(sr.f)} fill="none" stroke={sr.colour} strokeWidth={sr.width ?? 10} strokeDasharray={sr.dash} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 12px ${sr.colour})` }} />
        ))}
      </g>
      {series.map((sr, i) => {
        if (!sr.label) return null;
        const u = sr.labelU ?? 1;
        const k = interpolate(d, [Math.min(0.97, u), Math.min(1, u + 0.06)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return k > 0 ? (
          <text key={`l${i}`} x={Math.min(X(u), x1)} y={Y(sr.f(u)) + (sr.labelDy ?? -30)} textAnchor="end" fontFamily={INTER} fontWeight={750} fontSize={38} letterSpacing="-0.02em" fill={sr.colour} opacity={k}>{sr.label}</text>
        ) : null;
      })}
      {dots.map((dt, i) => {
        if (d < dt.u) return null;
        const v = series[dt.s].f(dt.u + 0.004);
        const k = Math.min(1, (d - dt.u) * 14);
        return (
          <g key={`d${i}`}>
            <circle cx={X(dt.u)} cy={Y(v)} r={16 * k} fill={series[dt.s].colour} />
            {dt.label ? <text x={X(dt.u)} y={Y(v) - 34} textAnchor="middle" fontFamily={INTER} fontWeight={700} fontSize={30} fill={axis} opacity={k}>{dt.label}</text> : null}
          </g>
        );
      })}
    </svg>
  );
};

/** forgetting with reviews at the given points (0..1): memory drops, each review lifts it and slows the next drop */
export const forget = (reviews: number[]) => (u: number) => {
  const hit = [0, ...reviews].filter((r) => r <= u);
  return 0.12 + 0.8 * Math.exp(-(u - hit[hit.length - 1]) * (4.2 / Math.pow(hit.length, 1.8)));
};

/**
 * Type: the voiceover as designed kinetic type, not a caption strip. Each phrase gets its own
 * alignment, size, entrance and exit from a rotating set, and its key word (any word in `hi`, or
 * "Offload") breaks out on its own line, bigger, with its own move.
 */
type Sty = { align: "left" | "center" | "right"; size: number; fx: KPart["fx"]; exit: "left" | "blur" | "wipe" | "scale" | "down"; key: number; keyFx: KPart["fx"] };
const STY: Sty[] = [
  { align: "left", size: 92, fx: "mask", exit: "left", key: 1.75, keyFx: "slam" },
  { align: "center", size: 84, fx: "rise", exit: "blur", key: 1.9, keyFx: "bounce" },
  { align: "right", size: 90, fx: "mask", exit: "wipe", key: 1.7, keyFx: "drop" },
  { align: "left", size: 98, fx: "pop", exit: "scale", key: 1.8, keyFx: "track" },
  { align: "center", size: 88, fx: "mask", exit: "down", key: 1.85, keyFx: "slam" },
  { align: "left", size: 90, fx: "type", exit: "blur", key: 1.8, keyFx: "bounce" },
];
const lines = (text: string, size: number) => Math.max(1, Math.ceil((text.length * size * 0.5) / 930));

export const Type: React.FC<{
  timing: Timing;
  hi?: Record<string, string>;
  y?: number;
  max?: number;
  show?: (ws: Word[]) => Word[];
  until?: number;
  hook?: number;
  gaps?: [number, number][];
  colour?: string;
  /** nothing in the type block goes below this line: it shrinks to fit */
  floor?: number;
}> = ({ timing, hi = {}, y = 160, max = 5, show, until = 1e9, hook = 0, gaps = [], colour = tokens.white, floor = 600 }) => {
  const { frame, fps } = useK();
  const ps = phrases(timing, max, hook);
  return (
    <>
      {ps.map((p0, i) => {
        const p = show ? show(p0) : p0;
        const st = p0[0].start;
        if (i > 0 && gaps.some(([a, b]) => st >= a - 0.05 && st < b)) return null;
        const next = ps[i + 1]?.[0].start ?? p0[p0.length - 1].end + 0.6;
        const gapIn = gaps.filter(([a]) => a > st).map(([a]) => a);
        const out = Math.min(until, next - 0.04, ...gapIn);
        const sty = i === 0 ? { ...STY[1], size: 96 } : STY[(i * 3 + 1) % STY.length];
        const colOf = (w: Word) => hi[norm(w.text)] ?? (norm(w.text) === "offload" ? tokens.blue : undefined);
        const k = p.findIndex((w) => colOf(w));
        const part = (w: Word, fx: KPart["fx"]): KPart => ({ text: w.text, t: i === 0 ? 0 : w.start - 0.04, fx: i === 0 ? "cut" : fx, colour: colOf(w) });
        const blocks: { ws: Word[]; size: number; fx: KPart["fx"]; weight: number }[] =
          k < 0
            ? [{ ws: p, size: sty.size * 1.12, fx: sty.fx, weight: 800 }]
            : [
                { ws: p.slice(0, k), size: sty.size, fx: sty.fx, weight: 750 },
                { ws: [p[k]], size: Math.min(sty.size * sty.key, 1500 / Math.max(3, p[k].text.length)), fx: colOf(p[k]) === tokens.problem && sty.keyFx === "track" ? "shake" : sty.keyFx, weight: 850 },
                { ws: p.slice(k + 1), size: sty.size, fx: sty.fx, weight: 750 },
              ];
        const height = (f: number) => blocks.reduce((h, b) => (b.ws.length ? h + lines(b.ws.map((w) => w.text).join(" "), b.size * f) * b.size * f * 1.06 + 8 : h), 0);
        let fit = 1;
        while (y + height(fit) > floor && fit > 0.45) fit -= 0.04;
        blocks.forEach((b) => (b.size *= fit));
        let yy = y;
        return (
          <React.Fragment key={i}>
            {blocks.map((b, j) => {
              if (!b.ws.length) return null;
              const text = b.ws.map((w) => w.text).join(" ");
              const top = yy;
              yy += lines(text, b.size) * b.size * 1.06 + 8;
              return <Kinetic key={j} frame={frame} fps={fps} font={INTER} colour={colour} y={top} size={b.size} weight={b.weight} align={sty.align} out={out} exit={sty.exit} parts={b.ws.map((w) => part(w, b.fx))} />;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

/** The source chip that sits under a research claim. */
export const Source: React.FC<{ at: number; out: number; text: string; y?: number; dark?: boolean }> = ({ at, out, text, y = 1520, dark = false }) => {
  const { t, sp } = useK();
  if (t < at) return null;
  const k = sp(at, POP) * (1 - sp(out));
  if (k <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", transform: `scale(${mix(0.7, 1, k)})`, opacity: Math.min(1, k * 1.4) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 30px", borderRadius: 999, background: dark ? alpha(tokens.white, 0.12) : tokens.ink, fontFamily: INTER, fontWeight: 650, fontSize: 34, letterSpacing: "-0.01em", color: tokens.white }}>
        <span style={{ fontWeight: 800, color: alpha(tokens.white, 0.6), fontSize: 26, letterSpacing: "0.12em" }}>SOURCE</span>
        {text}
      </div>
    </div>
  );
};

/**
 * The reveal from the launch film: a pill with the name is pressed, the frame swipes blue behind a
 * white diagonal bar, and the features orbit the dot. `sub` is a line that bounces in under it.
 */
export const PillOrbit: React.FC<{ appear: number; press: number; until: number; label?: string; sub?: string; icons?: string[] }> = ({ appear, press, until, label = "Offload", sub, icons = ["doc", "cal", "card", "chart", "check", "bell"] }) => {
  const { t, sp, frame, fps } = useK();
  if (t < appear - 0.05 || t > until + 0.6) return null;
  const pill = sp(appear, POP) * (1 - sp(press + 0.2));
  const pressed = t > press - 0.04 && t < press + 0.16;
  const blue = t >= press ? sp(press, { damping: 200, stiffness: 150, mass: 0.6 }) : 0;
  const gone = sp(until, { damping: 200, stiffness: 150, mass: 0.6 });
  const bar = interpolate(t, [press + 0.05, press + 0.5], [-1600, 1700], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 3) });
  const orbit = sp(press + 0.35, POP) * (1 - sp(until - 0.1));
  const burst = sp(press + 0.4, { damping: 12, stiffness: 120, mass: 0.7 });
  const flash = interpolate(t, [press, press + 0.04, press + 0.22], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const R = 300 * burst;
  return (
    <AbsoluteFill>
      {pill > 0.01 && blue < 0.98 ? (
        <div style={{ position: "absolute", left: 540 - 250, top: 960 - 80, width: 500, height: 160, borderRadius: 80, background: `radial-gradient(circle at 30% 25%, ${alpha(tokens.white, 0.3)}, ${tokens.mark} 65%)`, boxShadow: pressed ? `inset 8px 8px 20px ${alpha(tokens.night, 0.5)}` : `0 20px 50px ${alpha(tokens.mark, 0.45)}`, transform: `scale(${pill * (pressed ? 0.93 : 1)})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 850, fontSize: 84, letterSpacing: "-0.04em", color: tokens.white }}>
          {label}
        </div>
      ) : null}
      {blue > 0.001 && gone < 0.985 ? (
        <AbsoluteFill style={{ clipPath: gone > 0.001 ? `circle(${3000 * (1 - gone)}px at 540px -820px)` : `circle(${blue * 2300}px at 540px 960px)`, background: tokens.mark }}>
          <div style={{ position: "absolute", left: bar, top: 860, width: 1400, height: 110, borderRadius: 55, background: tokens.white, transform: "rotate(-52deg)", transformOrigin: "left center" }} />
          <AbsoluteFill style={{ background: tokens.white, opacity: flash }} />
          {t > press && t < press + 0.8 ? (
            <div style={{ position: "absolute", left: 540 - 60, top: 960 - 60, width: 120, height: 120, borderRadius: "50%", border: `${10 * (1 - (t - press) / 0.8)}px solid ${tokens.white}`, transform: `scale(${1 + (t - press) * 22})`, opacity: 1 - (t - press) / 0.8 }} />
          ) : null}
          {orbit > 0.01 ? (
            <AbsoluteFill style={{ opacity: Math.min(1, orbit * 1.4), transform: `scale(${mix(0.7, 1, orbit)})` }}>
              <div style={{ position: "absolute", left: 540 - R, top: 900 - R, width: R * 2, height: R * 2, borderRadius: "50%", border: `8px solid ${alpha(tokens.white, 0.85)}`, borderTopColor: "transparent", borderBottomColor: alpha(tokens.white, 0.35), transform: `rotate(${t * 30}deg)` }} />
              <div style={{ position: "absolute", left: 540 - 110, top: 900 - 110, width: 220, height: 220, borderRadius: "50%", background: tokens.white, boxShadow: `0 20px 60px ${alpha(tokens.night, 0.35)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 84, height: 84, borderRadius: "50%", background: tokens.mark, transform: `scale(${1 + 0.06 * Math.sin(t * 8)})` }} />
              </div>
              {icons.map((ic, i) => {
                const a = (i / icons.length) * Math.PI * 2 + t * 0.9;
                const k = sp(press + 0.45 + i * 0.07, POP);
                return (
                  <div key={ic + i} style={{ position: "absolute", left: 540 + Math.cos(a) * R - 58, top: 900 + Math.sin(a) * R - 58, width: 116, height: 116, borderRadius: "50%", background: tokens.white, boxShadow: `0 14px 30px ${alpha(tokens.night, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})` }}>
                    <Icon name={ic} size={60} />
                  </div>
                );
              })}
              {sub ? <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={1320} size={96} weight={850} out={until} exit="cut" parts={sub.split(" ").map((w, i) => ({ text: w, t: press + 0.45 + i * 0.18, fx: "bounce" as const }))} /> : null}
            </AbsoluteFill>
          ) : null}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

export const pillCues = (appear: number, press: number) => [
  { t: appear, s: "pop", v: 0.28 },
  { t: press - 1.3, s: "riser_long", v: 0.3 },
  { t: press, s: "subdrop", v: 0.55 },
  { t: press - 0.02, s: "click", v: 0.4 },
  { t: press + 0.05, s: "boom", v: 0.3 },
  { t: press + 0.1, s: "whoosh", v: 0.3 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: press + 0.45 + i * 0.07, s: "pop_low", v: 0.14 })),
];

/** Start of each spoken phrase, for soft ticks under the type. */
export const phraseStarts = (timing: Timing, hook = 0) => phrases(timing, 5, hook).slice(1).map((p) => p[0].start);
