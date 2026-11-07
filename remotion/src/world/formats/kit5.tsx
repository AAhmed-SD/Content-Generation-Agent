import { AbsoluteFill } from "remotion";
import { tokens } from "../../tokens";
import { alpha, INTER, POP, soft, useK, type Cue } from "../kit/dark";
import { Chart, forget, Type } from "../kit/talk";
import { SERIF } from "../../story/fonts";
import { Mark } from "../posters/Posters";
import { Sound } from "./kit";

/**
 * Science: films that explain how learning works, in the dark kit's look. A film is a run of beats, each on a spoken word:
 * curves (forgetting, spacing, cramming), bars (two methods compared, relative heights only, with the study named),
 * a blurt sheet (recall, then check for gaps), the Feynman loop, an applied exam-style question, and method steps.
 * Graphs never carry numbers that are not in the brief: heights and curves are shapes, and the source is named.
 */
type Ref = string;
type T = (ref: Ref) => number;
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };
type Base = { timing: Timing; T: T; vo: string };

export type ScienceBeat =
  | { kind: "curve"; at: Ref; curve: "forget" | "spaced" | "cram-vs-spaced"; xLabel: string; yLabel: string; labels?: { a?: string; b?: string }; reviewsAt?: Ref[] }
  | { kind: "bars"; at: Ref; title: string; bars: { label: string; height: number; at: Ref; tone?: "good" | "weak" }[]; caption?: string }
  | { kind: "blurt"; at: Ref; topic: string; recalled: { text: string; at: Ref }[]; checkAt: Ref; missed: { text: string; at: Ref }[] }
  | { kind: "feynman"; at: Ref; steps: { text: string; at: Ref }[] }
  | { kind: "scenario"; at: Ref; label: string; stem: string; options: string[]; answer: number; answerAt: Ref; why: string }
  | { kind: "steps"; at: Ref; title: string; steps: { text: string; at: Ref }[] };

export type ScienceSpec = { format: "science"; title: string; beats: ScienceBeat[]; source?: { text: string; at: Ref } };

const CARD: React.CSSProperties = { borderRadius: 26, background: tokens.white, color: tokens.ink, boxShadow: soft(1.2) };

/** A beat is on screen from its own time until the next beat starts. */
const useBeat = (a: number, b: number) => {
  const { t, sp } = useK();
  const on = sp(a, POP);
  const off = t >= b ? sp(b, { damping: 200, stiffness: 160, mass: 0.6 }) : 0;
  return { show: t >= a - 0.05 && off < 0.99, k: on, off, t, sp };
};

const Curve: React.FC<{ beat: Extract<ScienceBeat, { kind: "curve" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const reviews = (beat.reviewsAt ?? []).map((r) => T(r));
  const span = Math.max(2.5, b - a - 0.4);
  const at = (time: number) => Math.min(0.95, Math.max(0.05, (time - a) / span));
  const reviewU = reviews.length ? reviews.map(at) : [0.22, 0.45, 0.72];
  const series =
    beat.curve === "forget"
      ? [{ f: forget([]), colour: tokens.problem, label: beat.labels?.a ?? "Without review", labelU: 0.95 }]
      : beat.curve === "spaced"
        ? [
            { f: forget([]), colour: alpha(tokens.white, 0.35), width: 6, dash: "4 18", label: beat.labels?.a ?? "No review", labelU: 0.95, labelDy: 50 },
            { f: forget(reviewU), colour: tokens.mark, label: beat.labels?.b ?? "Spaced reviews", labelU: 0.95 },
          ]
        : [
            { f: forget([0.08, 0.12, 0.16]), colour: tokens.problem, label: beat.labels?.a ?? "Crammed", labelU: 0.95, labelDy: 50 },
            { f: forget(reviewU), colour: tokens.mark, label: beat.labels?.b ?? "Spaced", labelU: 0.95 },
          ];
  return <Chart draw={[a, a + span]} out={b} series={series} axis={tokens.white} xLabel={beat.xLabel} yLabel={beat.yLabel} box={{ x0: 130, x1: 950, y0: 620, y1: 1300 }} />;
};

const Bars: React.FC<{ beat: Extract<ScienceBeat, { kind: "bars" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const { show, k, off, t, sp } = useBeat(a, b);
  if (!show) return null;
  const n = beat.bars.length;
  const w = Math.min(260, 760 / n - 40);
  return (
    <div style={{ position: "absolute", left: 90, right: 90, top: 520, opacity: Math.min(1, k * 1.5) * (1 - off), transform: `translateY(${(1 - k) * 40 - off * 60}px)` }}>
      <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 50, lineHeight: 1.1, color: tokens.white, letterSpacing: "-0.02em" }}>{beat.title}</div>
      <div style={{ position: "relative", height: 640, marginTop: 40, borderBottom: `3px solid ${alpha(tokens.white, 0.35)}`, display: "flex", alignItems: "flex-end", justifyContent: "space-around" }}>
        {beat.bars.map((bar, i) => {
          const at = T(bar.at);
          const g = t >= at ? sp(at, { damping: 16, stiffness: 120, mass: 0.8 }) : 0;
          const colour = bar.tone === "weak" ? alpha(tokens.white, 0.35) : tokens.mark;
          return (
            <div key={i} style={{ width: w, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <div style={{ width: "100%", height: `${Math.max(0, Math.min(1, bar.height)) * 100 * g}%`, borderRadius: "18px 18px 0 0", background: colour, boxShadow: bar.tone === "weak" ? "none" : `0 0 40px ${alpha(tokens.mark, 0.5)}` }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18 }}>
        {beat.bars.map((bar, i) => (
          <div key={i} style={{ width: w + 40, textAlign: "center", fontFamily: INTER, fontWeight: 700, fontSize: 34, lineHeight: 1.15, color: bar.tone === "weak" ? alpha(tokens.white, 0.6) : tokens.white, opacity: t >= T(bar.at) ? 1 : 0.2 }}>
            {bar.label}
          </div>
        ))}
      </div>
      {beat.caption ? <div style={{ marginTop: 26, fontFamily: INTER, fontSize: 30, color: alpha(tokens.white, 0.65), textAlign: "center" }}>{beat.caption}</div> : null}
    </div>
  );
};

const Blurt: React.FC<{ beat: Extract<ScienceBeat, { kind: "blurt" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const { show, k, off, t, sp } = useBeat(a, b);
  if (!show) return null;
  const check = T(beat.checkAt);
  const checking = t >= check ? sp(check, POP) : 0;
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 480, padding: "40px 44px 46px", ...CARD, opacity: Math.min(1, k * 1.5) * (1 - off), transform: `translateY(${(1 - k) * 50 - off * 60}px) rotate(-1deg)` }}>
      <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.16em", color: checking > 0 ? tokens.mark : tokens.quiet }}>
        {checking > 0 ? "CHECKED AGAINST YOUR NOTES" : "BLURT · FROM MEMORY"}
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 1.05, marginTop: 12 }}>{beat.topic}</div>
      <div style={{ marginTop: 26, display: "grid", gap: 14 }}>
        {beat.recalled.map((r, i) => {
          const at = T(r.at);
          return t >= at ? (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "baseline", fontFamily: INTER, fontWeight: 600, fontSize: 40, opacity: Math.min(1, sp(at, POP) * 1.5) }}>
              <span style={{ color: checking > 0 ? tokens.mark : tokens.quiet }}>{checking > 0 ? "✓" : "–"}</span>
              {r.text}
            </div>
          ) : null;
        })}
        {beat.missed.map((m, i) => {
          const at = T(m.at);
          return t >= at ? (
            <div key={`m${i}`} style={{ display: "flex", gap: 16, alignItems: "baseline", padding: "8px 14px", borderRadius: 12, background: alpha(tokens.problem, 0.1), border: `3px dashed ${tokens.problem}`, fontFamily: INTER, fontWeight: 700, fontSize: 40, color: tokens.problem, opacity: Math.min(1, sp(at, POP) * 1.5), transform: `scale(${0.9 + 0.1 * sp(at, POP)})` }}>
              <span>?</span>
              {m.text}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

const Feynman: React.FC<{ beat: Extract<ScienceBeat, { kind: "feynman" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const { show, k, off, t, sp } = useBeat(a, b);
  if (!show) return null;
  const n = beat.steps.length;
  const R = 300;
  const cx = 540;
  const cy = 980;
  const lit = beat.steps.filter((s) => t >= T(s.at)).length;
  const spin = lit ? (t - T(beat.steps[0].at)) * 0.35 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, k * 1.5) * (1 - off) }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={alpha(tokens.white, 0.18)} strokeWidth={4} strokeDasharray="10 16" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={tokens.mark} strokeWidth={8} strokeLinecap="round" strokeDasharray={`${(2 * Math.PI * R * lit) / n} 9999`} transform={`rotate(-90 ${cx} ${cy})`} />
        <g transform={`rotate(${(spin * 180) / Math.PI} ${cx} ${cy})`}>
          <path d={`M ${cx + R} ${cy - 18} l 18 26 l 18 -26`} fill="none" stroke={tokens.mark} strokeWidth={8} strokeLinecap="round" opacity={lit ? 1 : 0} />
        </g>
      </svg>
      {beat.steps.map((s, i) => {
        const at = T(s.at);
        const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const x = cx + Math.cos(ang) * R;
        const y = cy + Math.sin(ang) * R;
        const g = t >= at ? sp(at, POP) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: x - 170, top: y - 70, width: 340, padding: "20px 22px", ...CARD, background: g ? tokens.white : alpha(tokens.white, 0.08), color: g ? tokens.ink : alpha(tokens.white, 0.4), boxShadow: g ? soft(1.2) : "none", transform: `scale(${0.85 + 0.15 * g})`, textAlign: "center" }}>
            <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 26, color: g ? tokens.mark : "inherit" }}>{i + 1}</div>
            <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 34, lineHeight: 1.12 }}>{s.text}</div>
          </div>
        );
      })}
    </div>
  );
};

const Scenario: React.FC<{ beat: Extract<ScienceBeat, { kind: "scenario" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const { show, k, off, t, sp } = useBeat(a, b);
  if (!show) return null;
  const ans = T(beat.answerAt);
  const shown = t >= ans ? sp(ans, POP) : 0;
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 470, padding: "38px 42px 42px", ...CARD, opacity: Math.min(1, k * 1.5) * (1 - off), transform: `translateY(${(1 - k) * 50 - off * 60}px)` }}>
      <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 8, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 24, letterSpacing: "0.14em" }}>{beat.label}</div>
      <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 50, lineHeight: 1.12 }}>{beat.stem}</div>
      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {beat.options.map((o, i) => {
          const right = i === beat.answer;
          return (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 20px", borderRadius: 16, border: `3px solid ${shown && right ? tokens.mark : tokens.rule}`, background: shown && right ? alpha(tokens.mark, 0.1) : tokens.white, opacity: shown && !right ? 0.45 : 1, fontFamily: INTER, fontWeight: 600, fontSize: 36 }}>
              <span style={{ fontWeight: 800, color: shown && right ? tokens.mark : tokens.quiet }}>{String.fromCharCode(65 + i)}</span>
              {o}
            </div>
          );
        })}
      </div>
      {shown > 0 ? <div style={{ marginTop: 22, fontFamily: INTER, fontSize: 32, lineHeight: 1.3, color: tokens.quiet, opacity: shown }}>{beat.why}</div> : null}
    </div>
  );
};

const Steps: React.FC<{ beat: Extract<ScienceBeat, { kind: "steps" }>; a: number; b: number; T: T }> = ({ beat, a, b, T }) => {
  const { show, k, off, t, sp } = useBeat(a, b);
  if (!show) return null;
  return (
    <div style={{ position: "absolute", left: 90, right: 90, top: 520, opacity: Math.min(1, k * 1.5) * (1 - off), transform: `translateY(${(1 - k) * 40 - off * 60}px)` }}>
      <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 52, color: tokens.white, letterSpacing: "-0.02em" }}>{beat.title}</div>
      <div style={{ marginTop: 34, display: "grid", gap: 18 }}>
        {beat.steps.map((s, i) => {
          const at = T(s.at);
          const g = t >= at ? sp(at, POP) : 0;
          return (
            <div key={i} style={{ display: "flex", gap: 22, alignItems: "center", padding: "24px 28px", ...CARD, opacity: 0.15 + 0.85 * g, transform: `translateX(${(1 - g) * -40}px)` }}>
              <div style={{ flex: "none", width: 64, height: 64, borderRadius: 32, background: g ? tokens.mark : tokens.rule, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
              <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 40, lineHeight: 1.15 }}>{s.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Science: React.FC<{ spec: ScienceSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const beats = spec.beats.map((b) => ({ ...b, a: T(b.at) }));
  const end = timing.duration;
  const src = spec.source ? T(spec.source.at) : 1e9;
  // Text appearing gets a soft keystroke, rotated across four takes; only the graphs and the
  // scenario answer get anything bigger, and those are kept low too.
  let n = 0;
  const key = (at: number, v = 0.12): Cue => ({ t: at, s: `key_${(n++ % 4) + 1}`, v });
  const cues: Cue[] = [
    ...beats.map((b) => (b.kind === "curve" ? { t: b.a, s: "whoosh", v: 0.12 } : key(b.a, 0.1))),
    ...beats.flatMap((b) => {
      if (b.kind === "blurt") return [...b.recalled.map((r) => key(T(r.at))), key(T(b.checkAt), 0.1), ...b.missed.map((m) => key(T(m.at), 0.14))];
      if (b.kind === "bars") return b.bars.map((x) => key(T(x.at)));
      if (b.kind === "steps" || b.kind === "feynman") return b.steps.map((x) => key(T(x.at)));
      if (b.kind === "scenario") return [{ t: T(b.answerAt), s: "ding", v: 0.14 }];
      return [];
    }),
    ...(spec.source ? [key(src, 0.08)] : []),
  ];
  return (
    <AbsoluteFill style={{ background: tokens.night }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 30%, ${alpha(tokens.mark, 0.14)}, transparent 60%)` }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 330, fontFamily: INTER, fontWeight: 800, fontSize: 28, letterSpacing: "0.22em", color: alpha(tokens.white, 0.5) }}>{spec.title.toUpperCase()}</div>
      {beats.map((b, i) => {
        const next = i + 1 < beats.length ? beats[i + 1].a : end + 1;
        if (b.kind === "curve") return <Curve key={i} beat={b} a={b.a} b={next} T={T} />;
        if (b.kind === "bars") return <Bars key={i} beat={b} a={b.a} b={next} T={T} />;
        if (b.kind === "blurt") return <Blurt key={i} beat={b} a={b.a} b={next} T={T} />;
        if (b.kind === "feynman") return <Feynman key={i} beat={b} a={b.a} b={next} T={T} />;
        if (b.kind === "scenario") return <Scenario key={i} beat={b} a={b.a} b={next} T={T} />;
        return <Steps key={i} beat={b} a={b.a} b={next} T={T} />;
      })}
      {t >= src ? <div style={{ position: "absolute", left: 90, right: 90, bottom: 210, fontFamily: INTER, fontWeight: 600, fontSize: 28, color: alpha(tokens.white, 0.55), opacity: sp(src, POP) }}>Source: {spec.source?.text}</div> : null}
      <Type timing={timing} hook={0} y={110} colour={tokens.white} floor={260} />
      <div style={{ position: "absolute", right: 70, bottom: 90 }}>
        <Mark size={70} colour={tokens.white} />
      </div>
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};
