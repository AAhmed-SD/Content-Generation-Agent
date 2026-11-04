import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type SpringConfig,
} from "remotion";
import { tokens } from "../../tokens";
import { SCRIPT } from "../../story/fonts";
import { Kinetic, type KPart } from "../kinetic";
import timing from "./timing.json";

/**
 * Placement week, told through frosted-glass phone widgets. No people, no patients, no cases.
 * Night -> rewind -> dawn -> ward day -> evening -> rescheduled week.
 */
const INTER = "Inter";
loadFont({ family: INTER, url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const PLACEMENT_DURATION_S = timing.duration;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const ls = (id: string) => timing.lines.find((x) => x.id === id)!.start;
const at = (line: string, word: string) => {
  const l = timing.lines.find((x) => x.id === line)!;
  return (l.words.find((w) => norm(w.text).startsWith(norm(word))) ?? l.words[0]).start;
};
const kw = (text: string, line: string, fx: KPart["fx"] = "rise", per: Record<string, Partial<KPart>> = {}): KPart[] => {
  const lw = timing.lines.find((x) => x.id === line)!.words;
  const ws = text.split(" ");
  let cur = Math.max(0, lw.findIndex((x) => norm(x.text) === norm(ws[0])));
  return ws.map((w) => {
    const idx = lw.findIndex((x, j) => j >= cur && norm(x.text) === norm(w));
    const hit = idx >= 0 ? lw[idx] : lw[Math.min(cur, lw.length - 1)];
    if (idx >= 0) cur = idx + 1;
    return { text: w, t: hit.start, fx, ...(per[norm(w).replace(/'/g, "")] ?? per[norm(w)] ?? {}) };
  });
};

const T = {
  home: ls("L1"),
  haven: at("L1", "haven't"),
  list1: at("L1", "list"),
  once: at("L1", "once"),
  rewind: ls("L2"),
  six: at("L2", "six"),
  alarm: at("L2", "alarm"),
  placement: ls("L3"),
  hour: at("L3", "hour"),
  read: at("L3", "read"),
  train: at("L3", "train"),
  ward: ls("L4"),
  over: at("L4", "over"),
  teaching: at("L4", "teaching"),
  moved: at("L4", "moved"),
  lunch: at("L4", "lunch"),
  cereal: at("L4", "cereal"),
  gap: ls("L5"),
  revise: at("L5", "revise"),
  gone: at("L5", "gone"),
  listL: ls("L6"),
  long: at("L6", "long"),
  doesnt: at("L6", "doesn't"),
  day: at("L6", "day"),
  offload: ls("L7"),
  resched: at("L7", "reschedules"),
  week: at("L7", "week"),
  shift: at("L7", "shift"),
  comment: ls("L8"),
  placementW: at("L8", "placement"),
  send: at("L8", "send"),
  end: timing.duration,
};

// ---------- motion helpers ----------
const SNAP: Partial<SpringConfig> = { damping: 200, mass: 0.6, stiffness: 240 };
const GLIDE: Partial<SpringConfig> = { damping: 200, mass: 1, stiffness: 110 };
const POP: Partial<SpringConfig> = { damping: 13, mass: 0.5, stiffness: 220 };
type S = { x: number; y: number; s: number; r: number; o: number; b: number };
type Key = { t: number; v: Partial<S>; c?: Partial<SpringConfig> };
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const track = (frame: number, fps: number, init: S, keys: Key[]): S =>
  keys.reduce((st, k) => {
    const kk = spring({ frame: frame - Math.round(k.t * fps), fps, config: k.c ?? GLIDE });
    if (kk === 0) return st;
    const out = { ...st };
    (Object.keys(k.v) as (keyof S)[]).forEach((p) => (out[p] = mix(st[p], k.v[p]!, kk)));
    return out;
  }, init);
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

// ---------- one environment: matte black, warm low light, grain ----------
const GLOWS = [
  { c: tokens.kraft, o: 0.2 },
  { c: tokens.stamp, o: 0.12 },
  { c: tokens.paper, o: 0.08 },
];

const shadow = (k: number) => `0 30px 80px rgba(0,0,0,${0.12 + 0.18 * k}), 0 2px 6px rgba(0,0,0,0.08)`;

/** A frosted glass panel. dark = 1 on a dark background, 0 on a light one. */
const Glass: React.FC<{ s: S; w: number; h: number; dark: number; r?: number; tint?: string; tintK?: number; sheenAt?: number; t: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  s, w, h, dark, r = 28, tint, tintK = 0, sheenAt, t, children, style,
}) => {
  if (s.o <= 0.01) return null;
  const sheen = sheenAt === undefined ? -1 : interpolate(t, [sheenAt, sheenAt + 0.8], [-0.4, 1.4], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: s.x - w / 2,
        top: s.y - h / 2,
        width: w,
        height: h,
        borderRadius: r,
        transform: `rotate(${s.r}deg) scale(${s.s})`,
        opacity: Math.min(1, s.o),
        filter: s.b > 0.3 ? `blur(${s.b.toFixed(1)}px)` : undefined,
        background: `linear-gradient(140deg, ${alpha(tokens.white, mix(0.62, 0.22, dark))}, ${alpha(tokens.white, mix(0.32, 0.06, dark))})`,
        backdropFilter: "blur(30px) saturate(170%)",
        border: `1.5px solid ${alpha(tokens.white, mix(0.85, 0.32, dark))}`,
        boxShadow: `${shadow(1 - dark)}, inset 0 1.5px 0 ${alpha(tokens.white, mix(0.9, 0.45, dark))}`,
        overflow: "hidden",
        ...style,
      }}
    >
      {tint ? <div style={{ position: "absolute", inset: 0, background: tint, opacity: tintK }} /> : null}
      {sheen > -0.4 && sheen < 1.4 ? (
        <div style={{ position: "absolute", top: -h, bottom: -h, width: w * 0.35, left: sheen * w - w * 0.17, background: `linear-gradient(90deg, ${alpha(tokens.white, 0)}, ${alpha(tokens.white, 0.35)}, ${alpha(tokens.white, 0)})`, transform: "rotate(18deg)" }} />
      ) : null}
      {children}
    </div>
  );
};

const Check: React.FC<{ k: number; colour: string; fill: string }> = ({ k, colour, fill }) => (
  <svg width={44} height={44} viewBox="0 0 44 44">
    <circle cx={22} cy={22} r={19} fill={k > 0.05 ? fill : "none"} fillOpacity={Math.min(1, k)} stroke={colour} strokeOpacity={0.55} strokeWidth={3} />
    <path d="M13 23 L19.5 29 L31 16" fill="none" stroke={tokens.white} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - k)} />
  </svg>
);

const ITEMS = ["Lecture recap", "Reading", "OSCE practice", "UKMLA questions", "Reading", "Notes"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// ---------- sound ----------
const CUES: { t: number; s: string; v: number }[] = [
  { t: 0, s: "boom", v: 0.3 },
  { t: T.haven - 0.1, s: "ding", v: 0.32 },
  { t: T.haven, s: "glass", v: 0.3 },
  { t: T.once, s: "pop_low", v: 0.3 },
  { t: T.rewind - 0.05, s: "rewind", v: 0.55 },
  { t: T.six, s: "snap", v: 0.3 },
  { t: T.alarm - 0.05, s: "buzz", v: 0.5 },
  { t: T.alarm, s: "glass", v: 0.3 },
  { t: T.placement - 0.1, s: "whoosh", v: 0.24 },
  { t: T.placement, s: "rumble", v: 0.35 },
  { t: T.hour, s: "glass", v: 0.22 },
  { t: T.read - 0.05, s: "swish", v: 0.24 },
  { t: T.read + 0.35, s: "tick", v: 0.32 },
  { t: T.ward - 0.15, s: "swoosh_down", v: 0.26 },
  { t: T.over, s: "stamp", v: 0.42 },
  { t: T.teaching, s: "whip", v: 0.26 },
  { t: T.moved, s: "snap", v: 0.3 },
  { t: T.lunch, s: "pop", v: 0.26 },
  { t: T.cereal, s: "pop_low", v: 0.3 },
  { t: T.gap - 0.4, s: "reverse", v: 0.3 },
  { t: T.revise, s: "tick", v: 0.24 },
  { t: T.gone, s: "shatter", v: 0.5 },
  { t: T.gone, s: "boom", v: 0.4 },
  { t: T.listL - 0.1, s: "swoosh_down", v: 0.24 },
  ...[0, 1, 2, 3].map((i) => ({ t: T.long - 0.25 + i * 0.09, s: "tick", v: 0.18 })),
  { t: T.doesnt, s: "thud", v: 0.3 },
  { t: T.day - 0.2, s: "whoosh", v: 0.26 },
  { t: T.offload - 0.1, s: "riser", v: 0.18 },
  { t: T.offload + 0.1, s: "sparkle", v: 0.3 },
  ...[0, 1, 2, 3, 4].map((i) => ({ t: T.resched + i * 0.1, s: "glass", v: 0.2 })),
  { t: T.shift - 0.05, s: "whip", v: 0.24 },
  { t: T.shift + 0.25, s: "pop", v: 0.3 },
  { t: T.comment - 0.2, s: "whip", v: 0.28 },
  ...Array.from({ length: 9 }, (_, i) => ({ t: T.placementW + i * 0.055, s: "key", v: 0.22 })),
  { t: T.placementW + 0.7, s: "chime", v: 0.22 },
];

// ---------- the film ----------
export const Placement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sp = (t0: number, c: Partial<SpringConfig> = SNAP) => spring({ frame: frame - Math.round(t0 * fps), fps, config: c });
  const dark = 1;
  const fg = tokens.white;
  const fgQuiet = alpha(tokens.white, 0.6);
  const base0: S = { x: 540, y: 960, s: 1, r: 0, o: 0, b: 0 };

  // Clock: big on the lock screen, rewinds, then tucks into the corner.
  const clock = track(frame, fps, { ...base0, y: 420, o: 1 }, [
    { t: T.placement - 0.1, v: { x: 250, y: 190, s: 0.42 } },
    { t: T.ward - 0.25, v: { o: 0, b: 16 } },
  ]);
  const mins = (() => {
    const from = 20 * 60;
    const to = 6 * 60 + 40;
    const k = interpolate(t, [T.rewind, T.six], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
    const m = Math.round(mix(from, to, k));
    return t < T.rewind ? from : t > T.six ? to : m;
  })();
  const clockText = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
  const rewinding = t > T.rewind && t < T.six + 0.1;
  const scan = rewinding ? Math.sin(t * 90) * 0.5 + 0.5 : 0;

  // Notification (night)
  const note = track(frame, fps, { ...base0, y: 560 }, [
    { t: T.haven - 0.1, v: { y: 880, o: 1 }, c: POP },
    { t: T.rewind, v: { y: 300, o: 0, b: 20, s: 0.9 }, c: SNAP },
  ]);
  // Alarm
  const alarm = track(frame, fps, { ...base0, y: 1150, s: 0.9 }, [
    { t: T.alarm - 0.05, v: { y: 900, o: 1, s: 1 }, c: POP },
    { t: T.placement - 0.05, v: { y: 640, o: 0, b: 18, s: 0.9 }, c: SNAP },
  ]);
  const buzz = t > T.alarm && t < T.alarm + 0.9 ? Math.sin(t * 95) * 9 * (1 - (t - T.alarm) / 0.9) : 0;

  // Journey + list (dawn)
  const journey = track(frame, fps, { ...base0, y: 520, s: 0.9 }, [
    { t: T.placement, v: { o: 1, s: 1 } },
    { t: T.ward - 0.25, v: { o: 0, y: 380, b: 14 } },
  ]);
  const ride = interpolate(t, [T.placement, T.ward], [0.04, 0.82], clamp);
  const list = track(frame, fps, { ...base0, y: 1700, s: 0.95 }, [
    { t: T.read - 0.15, v: { y: 1180, o: 1, s: 1 } },
    { t: T.ward - 0.25, v: { y: 2300, o: 0 } },
    // back for the evening, centre stage
    { t: T.listL - 0.05, v: { x: 600, y: 810, o: 1, s: 1 }, c: SNAP },
    { t: T.offload - 0.08, v: { o: 0, s: 0.92, b: 18 }, c: SNAP },
  ]);
  const extra = Math.floor(interpolate(t, [T.long - 0.25, T.long + 0.15], [0, 3], clamp));
  const listItems = t > T.listL ? [...ITEMS, ...ITEMS.slice(0, extra)] : ITEMS;
  const ROW = t > T.listL ? 84 : 96;
  const listH = 150 + listItems.length * ROW;
  const listW = t > T.listL ? 820 : 940;
  const listShake = t > T.doesnt && t < T.doesnt + 0.5 ? Math.sin(t * 70) * 6 * (1 - (t - T.doesnt) / 0.5) : 0;

  // The ward day (calendar)
  const cal = track(frame, fps, { ...base0, y: 1050, s: 0.94 }, [
    { t: T.ward - 0.1, v: { o: 1, s: 1 } },
    { t: T.listL - 0.15, v: { o: 0, y: 1250, b: 20 } },
  ]);
  const wardGrow = sp(T.over - 0.05, POP);
  const teachOut = sp(T.moved - 0.05);
  const lunchShrink = sp(T.cereal - 0.1, POP);
  const gapGlow = sp(T.revise - 0.1);
  const gone = sp(T.gone - 0.03, { damping: 200, stiffness: 300, mass: 0.4 });
  const goneShake = t > T.gone && t < T.gone + 0.45 ? Math.sin(t * 85) * 14 * (1 - (t - T.gone) / 0.45) : 0;

  // The week strip that keeps moving (evening) and then gets rescheduled
  const week = track(frame, fps, { ...base0, y: 1490 }, [
    { t: T.doesnt - 0.1, v: { o: 1 } },
    { t: T.offload + 0.9, v: { y: 1050 } },
    { t: T.comment - 0.2, v: { o: 0, b: 18, y: 900 } },
  ]);
  const drift = t < T.day - 0.1 ? 0 : interpolate(t, [T.day - 0.1, T.day + 0.5], [0, -210], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  const slotOf = (i: number) => {
    // items land in Mon..Fri, and the Wed one hops to Thu when the shift wins
    const day = [0, 1, 2, 3, 4, 2][i] ?? 0;
    const moved = i === 2 ? sp(T.shift + 0.2, POP) : 0;
    return { day: day + moved, row: i === 5 ? 1 : i === 2 ? moved : 0 };
  };

  // End
  const endIn = sp(T.comment - 0.15);
  const typed = Math.floor(interpolate(t, [T.placementW, T.placementW + 0.5], [0, 9], clamp));
  const mark = sp(T.placementW + 0.65);

  return (
    <AbsoluteFill style={{ background: tokens.night, overflow: "hidden" }}>
      {/* Light: soft moving blobs behind the glass */}
      {GLOWS.map((g, i) => {
        const bx = [260, 820, 520][i] + Math.sin(t * (0.25 + i * 0.09) + i) * 120;
        const by = [560, 1000, 1500][i] + Math.cos(t * (0.2 + i * 0.08) + i * 2) * 160;
        return <div key={i} style={{ position: "absolute", left: bx - 480, top: by - 480, width: 960, height: 960, borderRadius: 480, background: g.c, opacity: g.o, filter: "blur(140px)" }} />;
      })}
      {rewinding ? <AbsoluteFill style={{ background: `repeating-linear-gradient(0deg, ${alpha(tokens.white, 0.06)} 0 3px, transparent 3px 9px)`, transform: `translateY(${scan * 9}px)` }} /> : null}

      {/* ---- Clock ---- */}
      {clock.o > 0.01 ? (
        <div style={{ position: "absolute", left: clock.x - 500, top: clock.y - 160, width: 1000, height: 320, textAlign: "center", transform: `scale(${clock.s})`, transformOrigin: "50% 50%", opacity: clock.o, filter: clock.b > 0.3 || rewinding ? `blur(${clock.b + (rewinding ? 3 : 0)}px)` : undefined }}>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 44, letterSpacing: "0.02em", color: fgQuiet }}>{t < T.placement ? "Tuesday" : ""}</div>
          <div style={{ fontFamily: INTER, fontWeight: 250, fontSize: 250, letterSpacing: "-0.04em", lineHeight: 1, color: fg, transform: rewinding ? `translateY(${(scan - 0.5) * 16}px)` : undefined }}>{clockText}</div>
        </div>
      ) : null}

      {/* ---- Notification ---- */}
      <Glass s={note} w={940} h={190} dark={dark} t={t} sheenAt={T.haven + 0.1}>
        <div style={{ position: "absolute", left: 36, top: 40, width: 108, height: 108, borderRadius: 24, background: alpha(tokens.white, 0.2), border: `1.5px solid ${alpha(tokens.white, 0.4)}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: "0 24px" }}>
          {[1, 0.7, 0.85].map((w, i) => <div key={i} style={{ height: 8, width: `${w * 100}%`, borderRadius: 4, background: fg, opacity: 0.85 }} />)}
        </div>
        <div style={{ position: "absolute", left: 176, top: 44, fontFamily: INTER, fontWeight: 650, fontSize: 40, color: fg }}>Reading list</div>
        <div style={{ position: "absolute", left: 176, top: 102, fontFamily: INTER, fontWeight: 500, fontSize: 36, color: fgQuiet }}>Not started</div>
        <div style={{ position: "absolute", right: 40, top: 48, fontFamily: INTER, fontWeight: 500, fontSize: 30, color: fgQuiet }}>now</div>
        <div style={{ position: "absolute", right: 46, top: 112, width: 22, height: 22, borderRadius: 11, background: tokens.problem, transform: `scale(${sp(T.once, POP)})` }} />
      </Glass>

      {/* ---- Alarm ---- */}
      <Glass s={{ ...alarm, x: alarm.x + buzz }} w={940} h={300} dark={dark} t={t} sheenAt={T.alarm + 0.05}>
        <div style={{ position: "absolute", left: 50, top: 46, fontFamily: INTER, fontWeight: 700, fontSize: 64, letterSpacing: "-0.03em", color: fg }}>Alarm</div>
        <div style={{ position: "absolute", left: 50, top: 124, fontFamily: INTER, fontWeight: 500, fontSize: 36, color: fgQuiet }}>Placement</div>
        <div style={{ position: "absolute", left: 50, right: 50, bottom: 40, display: "flex", gap: 24 }}>
          {["Snooze", "Stop"].map((b, i) => (
            <div key={b} style={{ flex: 1, height: 84, borderRadius: 42, background: i ? tokens.white : alpha(tokens.white, 0.18), color: i ? tokens.ink : fg, fontFamily: INTER, fontWeight: 650, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{b}</div>
          ))}
        </div>
      </Glass>

      {/* ---- Journey ---- */}
      <Glass s={journey} w={940} h={210} dark={dark} t={t} sheenAt={T.placement + 0.2}>
        <div style={{ position: "absolute", left: 50, top: 38, fontFamily: INTER, fontWeight: 650, fontSize: 36, color: fg }}>Train to placement</div>
        <div style={{ position: "absolute", left: 50, right: 50, top: 132, height: 8, borderRadius: 4, background: alpha(dark > 0.5 ? tokens.white : tokens.ink, 0.2) }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${ride * 100}%`, borderRadius: 4, background: fg }} />
          <div style={{ position: "absolute", left: `calc(${ride * 100}% - 18px)`, top: -14, width: 36, height: 36, borderRadius: 18, background: fg, boxShadow: `0 0 0 8px ${alpha(tokens.white, 0.2)}` }} />
          <div style={{ position: "absolute", right: -6, top: -10, width: 28, height: 28, borderRadius: 14, border: `4px solid ${fg}` }} />
        </div>
      </Glass>

      {/* ---- The ward day ---- */}
      {cal.o > 0.01 ? (
        <Glass s={{ ...cal, x: cal.x + goneShake }} w={940} h={1080} dark={dark} t={t} sheenAt={T.ward}>
          <div style={{ position: "absolute", left: 50, top: 40, fontFamily: INTER, fontWeight: 700, fontSize: 46, letterSpacing: "-0.02em", color: fg }}>Today</div>
          {(() => {
            const top0 = 130;
            const H = 860;
            const wardH = mix(250, 470, wardGrow) + gone * 0;
            const teachY = top0 + wardH + 16;
            const lunchH = mix(130, 34, lunchShrink);
            const lunchY = teachY + mix(150, 0, teachOut) + 16;
            const revA = lunchY + lunchH + 16;
            const revAh = mix(140, 0, gone);
            const revB = revA + revAh + (revAh > 1 ? 16 : 0);
            const revBh = mix(150, 0, gone);
            const block = (y: number, h: number, label: string, kind: "ward" | "teach" | "lunch" | "rev", extraStyle: React.CSSProperties = {}, sub?: string) => (
              <div key={label + y} style={{ position: "absolute", left: 50, right: 50, top: y, height: Math.max(0, h), borderRadius: 16, overflow: "hidden", background: kind === "ward" ? (dark > 0.5 ? tokens.white : tokens.ink) : kind === "rev" ? "transparent" : alpha(dark > 0.5 ? tokens.white : tokens.ink, 0.1), border: kind === "rev" ? `3px dashed ${alpha(dark > 0.5 ? tokens.white : tokens.ink, 0.35)}` : undefined, ...extraStyle }}>
                {h > 30 ? <div style={{ position: "absolute", left: 30, top: Math.min(24, h / 2 - 22), fontFamily: INTER, fontWeight: 650, fontSize: 38, color: kind === "ward" ? (dark > 0.5 ? tokens.ink : tokens.white) : fg, whiteSpace: "nowrap" }}>{label}{sub ? <span style={{ fontWeight: 500, opacity: 0.6 }}>  {sub}</span> : null}</div> : null}
              </div>
            );
            return (
              <>
                {block(top0, wardH, "Ward round", "ward", {}, wardGrow > 0.5 ? "running over" : undefined)}
                {block(teachY, 150, "Teaching", "teach", { transform: `translateX(${teachOut * 1000}px) rotate(${teachOut * 6}deg)`, opacity: 1 - teachOut * 0.6 })}
                {teachOut > 0.05 ? (
                  <div style={{ position: "absolute", right: 70, top: teachY + 10, padding: "10px 22px", borderRadius: 30, background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 700, fontSize: 30, transform: `scale(${sp(T.moved, POP)})`, opacity: 1 - sp(T.lunch - 0.1) }}>Moved</div>
                ) : null}
                {block(lunchY, lunchH, lunchShrink > 0.5 ? "Cereal bar" : "Lunch", "lunch", { height: lunchH })}
                {revAh > 0.5 ? block(revA, revAh, "Revise", "rev", { borderColor: interpolateColors(gapGlow, [0, 1], [alpha(dark > 0.5 ? tokens.white : tokens.ink, 0.35), tokens.problem]), transform: `scale(${1 - gone * 0.3})`, filter: gone > 0.02 ? `blur(${gone * 14}px)` : undefined }) : null}
                {revBh > 0.5 ? block(revB, revBh, "Revise", "rev", { borderColor: interpolateColors(gapGlow, [0, 1], [alpha(dark > 0.5 ? tokens.white : tokens.ink, 0.35), tokens.problem]), transform: `scale(${1 - gone * 0.3})`, filter: gone > 0.02 ? `blur(${gone * 14}px)` : undefined }) : null}
                {gone > 0.02 && gone < 0.98
                  ? Array.from({ length: 14 }, (_, i) => {
                      const a = (i / 14) * Math.PI * 2 + i;
                      const d = gone * (180 + (i % 4) * 70);
                      return <div key={i} style={{ position: "absolute", left: 470 + Math.cos(a) * d, top: revA + 120 + Math.sin(a) * d + gone * gone * 200, width: 18 + (i % 3) * 10, height: 10 + (i % 2) * 14, borderRadius: 4, background: tokens.problem, opacity: 1 - gone, transform: `rotate(${i * 40 + gone * 200}deg)` }} />;
                    })
                  : null}
                {/* the shift eats the evening */}
                {block(revA, mix(0, revB + 150 - revA, gone), "Shift", "ward", { opacity: gone })}
                <div style={{ position: "absolute", left: 50, right: 50, top: top0 + H - 6, height: 0 }} />
              </>
            );
          })()}
        </Glass>
      ) : null}

      {/* ---- Reading list ---- */}
      <Glass s={{ ...list, x: list.x + listShake }} w={listW} h={listH} dark={dark} t={t} sheenAt={T.read} tint={tokens.problem} tintK={t > T.doesnt && t < T.offload ? 0.12 * sp(T.doesnt) : 0}>
        <div style={{ position: "absolute", left: 50, top: 44, fontFamily: INTER, fontWeight: 700, fontSize: 46, letterSpacing: "-0.02em", color: fg }}>Reading list</div>
        {listItems.map((it, i) => {
          const isExtra = i >= ITEMS.length;
          const inK = isExtra ? sp(T.long - 0.25 + (i - ITEMS.length) * 0.09, POP) : 1;
          const leave = t > T.offload ? sp(T.resched - 0.1 + i * 0.1) : 0;
          return (
            <div key={i} style={{ position: "absolute", left: 50, right: 50, top: 132 + i * ROW, height: 80, display: "flex", alignItems: "center", gap: 26, opacity: inK * (1 - leave), transform: `scale(${mix(0.6, 1, inK)}) translateY(${leave * 300}px)` }}>
              <Check k={i === 0 && t < T.listL ? sp(T.read + 0.35, POP) : 0} colour={fg} fill={tokens.ink} />
              <div style={{ fontFamily: INTER, fontWeight: 550, fontSize: 38, color: fg, textDecoration: i === 0 && t < T.listL && t > T.read + 0.4 ? "line-through" : undefined, opacity: i === 0 && t < T.listL && t > T.read + 0.4 ? 0.5 : 1 }}>{it}</div>
            </div>
          );
        })}
      </Glass>

      {/* ---- The week ---- */}
      {week.o > 0.01 ? (
        <div style={{ position: "absolute", left: 0, top: week.y - 170, width: 1080, height: 340, opacity: week.o, filter: week.b > 0.3 ? `blur(${week.b}px)` : undefined }}>
          {DAYS.map((d, i) => {
            const x = 70 + i * 196 + drift * (t < T.offload ? 1 : 1 - sp(T.offload + 0.1));
            return (
              <Glass key={d} s={{ x: x + 85, y: 170, s: 1, r: 0, o: 1, b: 0 }} w={176} h={320} r={22} dark={dark} t={t} sheenAt={T.resched + i * 0.08}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 22, textAlign: "center", fontFamily: INTER, fontWeight: 650, fontSize: 32, color: fg }}>{d}</div>
                {i === 2 && t > T.shift ? (
                  <div style={{ position: "absolute", left: 14, right: 14, top: 84, height: 90, borderRadius: 12, background: dark > 0.5 ? tokens.white : tokens.ink, color: dark > 0.5 ? tokens.ink : tokens.white, fontFamily: INTER, fontWeight: 700, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sp(T.shift, POP)})` }}>Shift</div>
                ) : null}
              </Glass>
            );
          })}
          {/* list items landing in the week */}
          {t > T.resched - 0.1
            ? ITEMS.slice(0, 6).map((it, i) => {
                const k = sp(T.resched - 0.1 + i * 0.1, POP);
                const slot = slotOf(i);
                const tx = 70 + slot.day * 196 + 85;
                const ty = 84 + 45 + (slot.row ? 110 : 0);
                const fx = 540;
                const fy = 900 - (week.y - 170);
                return (
                  <div key={i} style={{ position: "absolute", left: mix(fx, tx, k) - 74, top: mix(fy, ty, k) - 45, width: 148, height: 90, borderRadius: 12, background: alpha(tokens.white, 0.85), boxShadow: shadow(0.6), fontFamily: INTER, fontWeight: 650, fontSize: 21, color: tokens.ink, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 8, lineHeight: 1.1, opacity: Math.min(1, k * 2) }}>
                    {it}
                  </div>
                );
              })
            : null}
        </div>
      ) : null}

      {/* ---- Type, placed around the frame ---- */}
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={1240} size={78} align="left" out={T.rewind - 0.08} exit="left" parts={kw("You haven't opened the reading list once.", "L1", "mask", { once: { fx: "mask", colour: tokens.problem, deco: "underline", decoAt: T.once + 0.15 } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={1300} size={170} weight={850} out={T.alarm - 0.08} exit="scale" parts={[{ text: "Rewind.", t: T.rewind, fx: "track", dur: 0.3 }]} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={290} size={64} align="right" out={T.ward - 0.25} exit="wipe" parts={kw("an hour away,", "L3", "mask")} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={700} size={84} align="left" out={T.ward - 0.25} exit="down" parts={kw("so you read on the train.", "L3", "mask", { train: { deco: "underline", decoAt: T.train + 0.12 } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={250} size={92} align="left" out={T.teaching - 0.05} exit="left" parts={kw("Ward round runs over.", "L4", "mask", { over: { deco: "underline", decoColour: tokens.problem, decoAt: T.over + 0.15 } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={250} size={92} align="right" out={T.lunch - 0.05} exit="wipe" parts={kw("Teaching gets moved.", "L4", "mask")} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={250} size={92} align="left" out={T.gap - 0.1} exit="down" parts={kw("Lunch is a cereal bar.", "L4", "mask", {})} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={250} size={84} align="left" out={T.gone - 0.06} exit="blur" parts={kw("Every gap you planned to revise in?", "L5", "mask", { revise: { deco: "marker", decoColour: tokens.problem } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={820} size={300} weight={850} out={T.listL - 0.15} exit="scale" parts={[{ text: "Gone.", t: T.gone, fx: "track" }]} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={200} size={92} align="left" out={T.doesnt - 0.06} exit="left" parts={kw("The list isn't too long.", "L6", "mask", { long: { fx: "track" } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={30} size={76} vertical out={T.offload - 0.1} exit="blur" parts={kw("It just doesn't move", "L6", "mask", { move: { colour: tokens.problem } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={1700} size={66} align="left" out={T.offload - 0.1} exit="down" parts={kw("when your day does.", "L6", "mask")} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.blue} y={230} size={180} weight={850} align="left" out={T.comment - 0.2} exit="scale" parts={[{ text: "Offload", t: T.offload, fx: "track", deco: "shine", decoAt: T.resched, dur: 0.3 }]} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={430} size={72} align="left" out={T.comment - 0.2} exit="left" parts={kw("reschedules your week", "L7", "mask", { reschedules: { deco: "underline", decoAt: T.resched + 0.3 } })} />
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fg} y={1300} size={84} out={T.comment - 0.2} exit="down" parts={kw("when the shift wins.", "L7", "mask", { wins: { deco: "underline", decoAt: at("L7", "wins") + 0.12 } })} />

      {/* ---- End ---- */}
      {t >= T.comment - 0.15 ? (
        <AbsoluteFill style={{ alignItems: "center", flexDirection: "column", transform: `scale(${mix(0.85, 1, endIn)})`, opacity: endIn, filter: endIn < 0.97 ? `blur(${(1 - endIn) * 20}px)` : undefined }}>
          <div style={{ marginTop: 560, fontFamily: INTER, fontWeight: 750, fontSize: 116, letterSpacing: "-0.045em", color: fg }}>Comment</div>
          <Glass s={{ x: 540, y: 900 - 560 + 120, s: sp(T.placementW - 0.2, POP), r: 0, o: 1, b: 0 }} w={900} h={210} r={28} dark={dark} t={t} sheenAt={T.placementW + 0.5} style={{ position: "relative", left: 0, top: 0, marginTop: 40 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 800, fontSize: 128, letterSpacing: "-0.05em", color: tokens.white }}>
              {"PLACEMENT".slice(0, typed)}
              <span style={{ fontWeight: 300, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
            </div>
          </Glass>
          <div style={{ marginTop: 50, fontFamily: SCRIPT, fontWeight: 700, fontSize: 130, color: tokens.blue, lineHeight: 1, textShadow: `0 0 36px ${alpha(tokens.blue, 0.9)}, 0 0 2px ${alpha(tokens.white, 0.6)}`, opacity: mark, transform: `translateY(${(1 - mark) * 30}px)` }}>offload</div>
        </AbsoluteFill>
      ) : null}
      <Kinetic frame={frame} fps={fps} font={INTER} colour={fgQuiet} y={1420} size={54} weight={600} out={T.end + 1} parts={kw("and I'll send you the plan I'd use.", "L8", "mask")} />

      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.16, pointerEvents: "none" }}>
        <svg width="100%" height="100%">
          <filter id={`g${Math.floor(frame / 2) % 60}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={Math.floor(frame / 2) % 60} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#g${Math.floor(frame / 2) % 60})`} />
        </svg>
      </AbsoluteFill>
      <Audio src={staticFile("world/placement/vo.wav")} />
      {CUES.map((q, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(q.t * fps))} durationInFrames={Math.round(2.5 * fps)} layout="none" name={`sfx ${q.s}`}>
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
