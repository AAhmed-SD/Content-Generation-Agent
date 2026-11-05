import { AbsoluteFill } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/VT323";
import { tokens } from "../../tokens";
import { alpha, INTER, POP, soft, useK, type Cue } from "../kit/dark";
import { Type } from "../kit/talk";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, DISPLAY, grain, Mark, Stamp } from "../posters/Posters";
import { Sound } from "./kit";
import { GlassMail, GlassNotification, Wallpaper } from "../kit/glass";

/**
 * Twelve everyday-object templates: a lock screen, an inbox, a marked exam paper, a battery, a forecast, terms and
 * conditions, an error dialog, a sat-nav, a departures board, a recipe card, a missing poster, a kanban board.
 * All voiced; every time is a ref on a spoken word.
 */
const MONO = loadMono("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
type Ref = string;
type T = (ref: Ref) => number;
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };
type Base = { timing: Timing; T: T; vo: string };
type At = { at: Ref };

/** A flood: many items arriving fast from `at`, one every `every` seconds. Use it whenever the line says "everything". */
type Flood<I> = { at: Ref; every?: number; items: I[] };
export type LockSpec = { format: "lockscreen"; time: string; date: string; flood?: Flood<{ app: string; title: string; body: string }>; notifs: ({ app: string; title: string; body: string } & At)[]; final: { app: string; title: string; body: string } & At };
export type InboxSpec = { format: "inbox"; account: string; flood?: Flood<{ from: string; subject: string }>; emails: ({ from: string; subject: string; preview: string } & At)[]; clear?: At; final: { from: string; subject: string; preview: string } & At };
export type PaperSpec = { format: "exampaper"; paper: string; number: string; question: string; marks: string; answer: { text: string } & At; ticks: ({ kind: "tick" | "cross" } & At)[]; verdict: { text: string } & At };
export type BatterySpec = { format: "battery"; label: string; steps: ({ day: string; level: number; note: string } & At)[]; final: { text: string } & At };
export type WeatherSpec = { format: "weather"; title: string; days: ({ day: string; sky: "sun" | "cloud" | "rain" | "storm"; label: string } & At)[]; final: { text: string } & At };
export type TermsSpec = { format: "terms"; title: string; clauses: ({ text: string } & At)[]; sign: At; final: { text: string } & At };
export type DialogSpec = { format: "dialog"; cascade?: Flood<{ title: string; message: string }>; dialogs: ({ title: string; message: string; buttons: string[]; press?: number } & At)[]; final: { text: string } & At };
export type SatnavSpec = { format: "satnav"; steps: ({ kind: "go" | "miss" | "reroute" | "arrive"; text: string } & At)[] };
export type BoardSpec2 = { format: "departures"; title: string; rows: ({ time: string; dest: string; status: string; tone?: "ok" | "bad" } & At)[]; final: { text: string } & At };
export type RecipeSpec = { format: "recipe"; title: string; serves: string; ingredients: ({ text: string } & At)[]; method: ({ text: string } & At)[] };
export type MissingSpec = { format: "missing"; subject: string; details: ({ label: string; value: string } & At)[]; reward: { text: string } & At };
export type KanbanSpec = { format: "kanban"; title: string; pile?: Flood<string> & { col: number; calm?: Ref }; cards: ({ text: string; col: number; move?: { col: number } & At } & At)[]; final: { text: string } & At };
export type FormatSpec3 = LockSpec | InboxSpec | PaperSpec | BatterySpec | WeatherSpec | TermsSpec | DialogSpec | SatnavSpec | BoardSpec2 | RecipeSpec | MissingSpec | KanbanSpec;

const Corner: React.FC<{ colour?: string }> = ({ colour = tokens.mark }) => <div style={{ position: "absolute", right: 70, bottom: 90 }}><Mark size={70} colour={colour} /></div>;
const Captions: React.FC<{ timing: Timing; colour: string; y?: number }> = ({ timing, colour, y = 130 }) => <Type timing={timing} hook={0} y={y} colour={colour} floor={y + 230} />;
const pop = (sp: (t: number, c?: object) => number, a: number) => sp(a, POP);

/** Chaos. A fixed random number per index, and a shake that only runs inside a window and fades out. */
const rnd = (i: number, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const shake = (t: number, from: number, to: number, amp = 10) => {
  if (t < from || t > to) return "none";
  const fade = Math.min(1, (to - t) / 0.4, (t - from) / 0.1);
  return `translate(${Math.sin(t * 61) * amp * fade}px, ${Math.cos(t * 47) * amp * fade}px)`;
};
const flooded = <I,>(T: T, f: Flood<I> | undefined) => (f ? f.items.map((item, i) => ({ item, a: T(f.at) + i * (f.every ?? 0.14) })) : []);
const Count: React.FC<{ n: number; style?: React.CSSProperties }> = ({ n, style }) => (
  <div style={{ display: "inline-block", padding: "6px 22px", borderRadius: 40, background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 34, ...style }}>{n}</div>
);

// 1. Lock screen
export const LockScreen: React.FC<{ spec: LockSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const fl = flooded(T, spec.flood).map(({ item, a }) => ({ ...item, a, flood: true }));
  const ns = [...spec.notifs.map((n) => ({ ...n, a: T(n.at), flood: false })), ...fl].sort((x, y) => x.a - y.a);
  const f = T(spec.final.at);
  const cues: Cue[] = [...ns.map((n) => ({ t: n.a, s: "msg_ping", v: n.flood ? 0.12 : 0.26 })), { t: f, s: "msg_ping", v: 0.34 }, { t: f, s: "sparkle", v: 0.16 }];
  const clear = sp(f - 0.2);
  const shown = ns.filter((n) => t >= n.a && t < f + 0.6);
  const gap = shown.length <= 4 ? 200 : Math.max(46, 820 / (shown.length - 1));
  const rush = fl.length ? shake(t, fl[0].a, fl[fl.length - 1].a + 0.5, 9) : "none";
  return (
    <AbsoluteFill>
      <Wallpaper dark />
      <div style={{ position: "absolute", left: 0, right: 0, top: 360, textAlign: "center", fontFamily: INTER, fontWeight: 300, fontSize: 210, color: tokens.white, letterSpacing: "-0.04em" }}>{spec.time}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: INTER, fontWeight: 600, fontSize: 40, color: alpha(tokens.white, 0.8) }}>{spec.date}</div>
      {shown.length > 4 && t < f ? <div style={{ position: "absolute", left: 0, right: 0, top: 618, textAlign: "center" }}><Count n={shown.length} /></div> : null}
      <AbsoluteFill style={{ transform: rush }}>
        {shown.map((n, i, arr) => {
          const k = pop(sp, n.a);
          const fromTop = arr.length - 1 - i;
          const tilt = n.flood ? (rnd(i) - 0.5) * 6 : 0;
          return <GlassNotification key={i} dark app={n.app} title={n.title} body={n.body} tone={n.flood ? "problem" : "glass"} style={{ position: "absolute", left: 40 + (n.flood ? (rnd(i, 2) - 0.5) * 40 : 0), right: 40 - (n.flood ? (rnd(i, 2) - 0.5) * 40 : 0), top: 700 + fromTop * gap, transform: `translateY(${(1 - k) * -80}px) rotate(${tilt}deg) scale(${Math.max(0.85, 1 - fromTop * 0.012)})`, opacity: k * (1 - clear * 0.95) }} />;
        })}
      </AbsoluteFill>
      {t >= f ? <GlassNotification app={spec.final.app} title={spec.final.title} body={spec.final.body} style={{ position: "absolute", left: 40, right: 40, top: 700, transform: `scale(${0.9 + 0.1 * pop(sp, f)})`, opacity: pop(sp, f) }} /> : null}
      <Captions timing={timing} colour={tokens.white} y={110} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 2. Inbox
export const Inbox: React.FC<{ spec: InboxSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const fl = flooded(T, spec.flood).map(({ item, a }) => ({ ...item, preview: "", a }));
  const es = [...spec.emails.map((e) => ({ ...e, a: T(e.at) })), ...fl].sort((x, y) => x.a - y.a);
  const clear = spec.clear ? T(spec.clear.at) : 1e9;
  const unread = es.filter((e) => t >= e.a).length;
  const rush = fl.length ? shake(t, fl[0].a, fl[fl.length - 1].a + 0.5, 8) : "none";
  const f = T(spec.final.at);
  const cues: Cue[] = [...es.map((e) => ({ t: e.a, s: "pop", v: e.preview ? 0.22 : 0.12 })), ...(spec.clear ? [{ t: clear, s: "swish", v: 0.3 }] : []), { t: f, s: "msg_ping", v: 0.32 }];
  const Row: React.FC<{ e: { from: string; subject: string; preview?: string }; bold?: boolean; hi?: boolean }> = ({ e, bold, hi }) => (
    <div style={{ padding: "30px 40px", borderBottom: `2px solid ${tokens.rule}`, background: hi ? alpha(tokens.mark, 0.08) : tokens.white, display: "flex", gap: 22 }}>
      <div style={{ flex: "none", width: 18, height: 18, borderRadius: 9, marginTop: 14, background: bold ? tokens.mark : "transparent" }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: INTER, fontWeight: bold ? 800 : 600, fontSize: 36, color: tokens.ink }}>{e.from}</div>
        <div style={{ fontFamily: INTER, fontWeight: bold ? 700 : 500, fontSize: 32, color: tokens.ink }}>{e.subject}</div>
        {e.preview ? <div style={{ fontFamily: INTER, fontSize: 28, color: tokens.quiet, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.preview}</div> : null}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: tokens.white }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, padding: "0 40px 20px", fontFamily: INTER, fontWeight: 800, fontSize: 64, color: tokens.ink }}>Inbox <span style={{ fontWeight: 500, fontSize: 32, color: tokens.quiet }}>{spec.account}</span>{unread > 4 && t < clear ? <Count n={unread} style={{ marginLeft: 20, verticalAlign: "middle" }} /> : null}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 480, transform: rush }}>
        {t >= f ? <div style={{ transform: `translateY(${(1 - pop(sp, f)) * -80}px)`, opacity: pop(sp, f) }}><Row e={spec.final} bold hi /></div> : null}
        {[...es].reverse().filter((e) => t >= e.a).map((e, i) => {
          const gone = t >= clear ? sp(clear + i * (es.length > 8 ? 0.025 : 0.06), { damping: 200, stiffness: 200, mass: 0.5 }) : 0;
          return <div key={`${e.subject}${i}`} style={{ transform: `translateX(${-gone * 1200}px)`, opacity: pop(sp, e.a) * (1 - gone), height: gone > 0.98 ? 0 : undefined, overflow: "hidden" }}><Row e={e} bold /></div>;
        })}
      </div>
      {t >= f + 0.8 ? (
        <AbsoluteFill style={{ background: alpha(tokens.ink, 0.12 * pop(sp, f + 0.8)) }}>
          <GlassMail from={spec.final.from} subject={spec.final.subject} lines={[spec.final.preview]} style={{ position: "absolute", left: 50, right: 50, top: 900, transform: `translateY(${(1 - pop(sp, f + 0.8)) * 300}px)` }} />
        </AbsoluteFill>
      ) : null}
      <Captions timing={timing} colour={tokens.ink} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 3. Marked exam paper
export const ExamPaper: React.FC<{ spec: PaperSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const ans = T(spec.answer.at);
  const ticks = spec.ticks.map((k) => ({ ...k, a: T(k.at) }));
  const v = T(spec.verdict.at);
  const chars = Math.max(0, Math.floor((t - ans) * 30));
  const cues: Cue[] = [{ t: ans, s: "scribble", v: 0.24 }, ...ticks.map((k) => ({ t: k.a, s: k.kind === "tick" ? "click" : "buzz", v: 0.28 })), { t: v, s: "stamp", v: 0.34 }];
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 90, right: 90, top: 380, bottom: 200, background: tokens.white, boxShadow: soft(1.2), padding: "70px 70px", transform: "rotate(-1deg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: INTER, fontWeight: 700, fontSize: 28, color: tokens.quiet, letterSpacing: "0.08em", textTransform: "uppercase" }}><span>{spec.paper}</span><span>Do not write outside the box</span></div>
        <div style={{ marginTop: 50, display: "flex", gap: 24, fontFamily: SERIF, fontSize: 48, lineHeight: 1.2, color: tokens.ink }}><b style={{ fontFamily: INTER }}>{spec.number}</b><span>{spec.question}</span></div>
        <div style={{ textAlign: "right", fontFamily: INTER, fontWeight: 700, fontSize: 30, color: tokens.ink, marginTop: 10 }}>{spec.marks}</div>
        <div style={{ marginTop: 30, height: 420, border: `3px solid ${tokens.ink}`, padding: "30px 34px", fontFamily: SCRIPT, fontWeight: 700, fontSize: 52, lineHeight: 1.3, color: alpha(tokens.mark, 0.9) }}>{spec.answer.text.slice(0, chars)}</div>
        {ticks.map((k, i) => (t >= k.a ? <div key={i} style={{ position: "absolute", right: 70 + i * 90, top: 560, fontFamily: SCRIPT, fontWeight: 700, fontSize: 120, color: tokens.problem, transform: `scale(${pop(sp, k.a)}) rotate(-8deg)` }}>{k.kind === "tick" ? "✓" : "✗"}</div> : null))}
        {t >= v ? <div style={{ position: "absolute", left: 70, bottom: 70, transform: `scale(${pop(sp, v)})` }}><Stamp text={spec.verdict.text} size={56} rot={-6} /></div> : null}
      </div>
      <Captions timing={timing} colour={tokens.ink} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 4. Battery
export const Battery: React.FC<{ spec: BatterySpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const steps = spec.steps.map((s) => ({ ...s, a: T(s.at) }));
  const f = T(spec.final.at);
  const cur = [...steps].reverse().find((s) => t >= s.a);
  const prev = cur ? steps[steps.indexOf(cur) - 1] : undefined;
  const k = cur ? sp(cur.a, { damping: 200, stiffness: 120, mass: 0.7 }) : 0;
  const level = cur ? (prev ? prev.level : 1) + ((cur.level - (prev ? prev.level : 1)) * k) : 1;
  const colour = level > 0.5 ? tokens.mark : level > 0.2 ? tokens.kraft : tokens.problem;
  const cues: Cue[] = [...steps.map((s) => ({ t: s.a, s: "swoosh_down", v: 0.22 })), { t: f, s: "sparkle", v: 0.26 }];
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", fontFamily: INTER, fontWeight: 800, fontSize: 44, letterSpacing: "0.12em", color: tokens.quiet, textTransform: "uppercase" }}>{spec.label}</div>
      <div style={{ position: "absolute", left: 180, top: 520, width: 640, height: 300, borderRadius: 50, border: `14px solid ${tokens.ink}`, padding: 20 }}>
        <div style={{ height: "100%", width: `${Math.max(3, level * 100)}%`, borderRadius: 26, background: colour }} />
      </div>
      <div style={{ position: "absolute", left: 846, top: 610, width: 50, height: 120, borderRadius: "0 20px 20px 0", background: tokens.ink }} />
      <div style={{ position: "absolute", left: 100, right: 100, top: 900, display: "flex", justifyContent: "space-between" }}>
        {steps.map((s) => <div key={s.day} style={{ fontFamily: INTER, fontWeight: 800, fontSize: 40, color: t >= s.a ? tokens.ink : alpha(tokens.ink, 0.25) }}>{s.day}</div>)}
      </div>
      {cur ? <div style={{ position: "absolute", left: 100, right: 100, top: 1020, textAlign: "center", fontFamily: SERIF, fontSize: 70, lineHeight: 1.1, color: tokens.ink, opacity: pop(sp, cur.a) }}>{cur.note}</div> : null}
      {t >= f ? <div style={{ position: "absolute", left: 90, right: 90, bottom: 220, padding: "30px 36px", borderRadius: 30, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 760, fontSize: 46, lineHeight: 1.15, opacity: pop(sp, f) }}><Br text={spec.final.text} /></div> : null}
      <Captions timing={timing} colour={tokens.ink} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 5. Weather forecast
const Sky: React.FC<{ sky: WeatherSpec["days"][number]["sky"] }> = ({ sky }) => (
  <svg width={150} height={130} viewBox="0 0 150 130">
    {sky === "sun" ? <circle cx={75} cy={65} r={42} fill={tokens.kraft} /> : null}
    {sky !== "sun" ? <path d="M 40 90 Q 20 90 22 72 Q 24 52 48 54 Q 56 30 82 34 Q 108 36 110 60 Q 132 60 130 78 Q 128 92 110 90 Z" fill={sky === "cloud" ? alpha(tokens.ink, 0.25) : alpha(tokens.ink, 0.55)} /> : null}
    {sky === "rain" || sky === "storm" ? [50, 75, 100].map((x) => <path key={x} d={`M ${x} 100 l -8 20`} stroke={tokens.mark} strokeWidth={6} strokeLinecap="round" />) : null}
    {sky === "storm" ? <path d="M 80 92 L 66 116 L 80 114 L 70 130" fill="none" stroke={tokens.problem} strokeWidth={7} strokeLinejoin="round" /> : null}
  </svg>
);
export const Weather: React.FC<{ spec: WeatherSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const days = spec.days.map((d) => ({ ...d, a: T(d.at) }));
  const f = T(spec.final.at);
  const storm = days.find((d) => d.sky === "storm");
  const cues: Cue[] = [...days.map((d) => ({ t: d.a, s: d.sky === "storm" ? "rumble" : "pop", v: 0.26 })), ...(storm ? [1.25, 1.9].map((k) => ({ t: storm.a + k, s: "rumble", v: 0.18 })) : []), { t: f, s: "sparkle", v: 0.26 }];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${tokens.mark}, ${alpha(tokens.mark, 0.75)})`, transform: storm ? shake(t, storm.a, storm.a + 2.4, 12) : "none" }}>
      <div style={{ position: "absolute", left: 70, right: 70, top: 380, fontFamily: INTER, fontWeight: 800, fontSize: 66, color: tokens.white, letterSpacing: "-0.03em" }}>{spec.title}</div>
      <div style={{ position: "absolute", left: 50, right: 50, top: 500, borderRadius: 40, background: alpha(tokens.white, 0.16), padding: "20px 30px" }}>
        {days.map((d, i) => (
          <div key={d.day} style={{ display: "flex", alignItems: "center", gap: 26, padding: "18px 0", borderTop: i ? `2px solid ${alpha(tokens.white, 0.2)}` : "none", opacity: t >= d.a ? pop(sp, d.a) : 0.15 }}>
            <div style={{ width: 130, fontFamily: INTER, fontWeight: 800, fontSize: 44, color: tokens.white }}>{d.day}</div>
            <Sky sky={d.sky} />
            <div style={{ fontFamily: INTER, fontWeight: 650, fontSize: 40, color: tokens.white }}>{d.label}</div>
          </div>
        ))}
      </div>
      {storm && t >= storm.a && t < f + 0.4 ? (
        <AbsoluteFill style={{ pointerEvents: "none", opacity: Math.min(1, (t - storm.a) / 0.3) * (t < f ? 1 : 1 - (t - f) / 0.4) }}>
          <AbsoluteFill style={{ background: alpha(tokens.night, 0.45) }} />
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: 90 }, (_, i) => {
              const x = rnd(i) * 1180 - 50;
              const y = ((t * (1700 + rnd(i, 4) * 600) + rnd(i, 2) * 2100) % 2100) - 120;
              return <path key={i} d={`M ${x} ${y} l -22 70`} stroke={alpha(tokens.white, 0.55)} strokeWidth={4} strokeLinecap="round" />;
            })}
          </svg>
          <AbsoluteFill style={{ background: tokens.white, opacity: Math.max(0, ...[0, 1.25, 1.9].map((k) => 0.85 - (t - storm.a - k) / 0.14 * 0.85).map((v, j) => (t - storm.a >= [0, 1.25, 1.9][j] ? v : 0))) }} />
        </AbsoluteFill>
      ) : null}
      {t >= f ? <div style={{ position: "absolute", left: 70, right: 70, bottom: 210, padding: "30px 36px", borderRadius: 30, background: tokens.white, color: tokens.ink, fontFamily: INTER, fontWeight: 760, fontSize: 44, lineHeight: 1.15, opacity: pop(sp, f) }}><Br text={spec.final.text} /></div> : null}
      <Captions timing={timing} colour={tokens.white} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 6. Terms and conditions
export const Terms: React.FC<{ spec: TermsSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const cl = spec.clauses.map((c) => ({ ...c, a: T(c.at) }));
  const sign = T(spec.sign.at);
  const f = T(spec.final.at);
  const cues: Cue[] = [...cl.map((c) => ({ t: c.a, s: "paper", v: 0.2 })), { t: sign, s: "scribble", v: 0.3 }, { t: f, s: "stamp", v: 0.3 }];
  const ink = Math.max(0, Math.min(1, (t - sign) / 0.8));
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 80, right: 80, top: 360, bottom: 180, background: tokens.white, boxShadow: soft(1.1), padding: "60px 64px" }}>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 52, color: tokens.ink }}>{spec.title}</div>
        <div style={{ fontFamily: INTER, fontSize: 26, color: tokens.quiet, marginTop: 6 }}>Please read carefully. Nobody does.</div>
        {cl.filter((c) => t >= c.a).map((c, i) => (
          <div key={i} style={{ marginTop: 28, display: "flex", gap: 18, fontFamily: SERIF, fontSize: 40, lineHeight: 1.2, color: tokens.ink, opacity: pop(sp, c.a) }}><b style={{ fontFamily: INTER, fontSize: 30, marginTop: 6 }}>{i + 1}.</b><span>{c.text}</span></div>
        ))}
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 90, borderTop: `3px solid ${tokens.ink}`, paddingTop: 10, fontFamily: INTER, fontSize: 26, color: tokens.quiet }}>Signed</div>
        {t >= sign ? <div style={{ position: "absolute", left: 80, bottom: 110, fontFamily: SCRIPT, fontWeight: 700, fontSize: 90, color: tokens.mark, clipPath: `inset(0 ${100 - ink * 100}% 0 0)` }}>you, regretfully</div> : null}
        {t >= f ? <div style={{ position: "absolute", right: 60, bottom: 160, transform: `scale(${pop(sp, f)})` }}><Stamp text={spec.final.text} size={50} rot={-10} /></div> : null}
      </div>
      <Captions timing={timing} colour={tokens.ink} y={110} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 7. Error dialog
export const ErrorDialog: React.FC<{ spec: DialogSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const ds = spec.dialogs.map((d) => ({ ...d, a: T(d.at) }));
  const f = T(spec.final.at);
  const cur = [...ds].reverse().find((d) => t >= d.a);
  const cas = flooded(T, spec.cascade);
  const cues: Cue[] = [...ds.map((d) => ({ t: d.a, s: "glass", v: 0.3 })), ...cas.map((c) => ({ t: c.a, s: "glass", v: 0.14 })), { t: f, s: "sparkle", v: 0.26 }];
  const rush = cas.length ? shake(t, cas[0].a, cas[cas.length - 1].a + 0.5, 10) : "none";
  const Box: React.FC<{ title: string; message: string; buttons: string[]; press?: number; a: number; style: React.CSSProperties }> = ({ title, message, buttons, press, a, style }) => (
    <div style={{ position: "absolute", borderRadius: 28, background: tokens.card, boxShadow: soft(1.5), overflow: "hidden", ...style }}>
      <div style={{ height: 70, background: tokens.rule, display: "flex", alignItems: "center", gap: 14, padding: "0 26px" }}>
        {[tokens.problem, tokens.kraft, alpha(tokens.ink, 0.3)].map((c, i) => <div key={i} style={{ width: 24, height: 24, borderRadius: 12, background: c }} />)}
        <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: tokens.ink, marginLeft: 10 }}>{title}</div>
      </div>
      <div style={{ padding: "50px 50px 40px", display: "flex", gap: 34 }}>
        <div style={{ flex: "none", width: 110, height: 110, borderRadius: 55, background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 900, fontSize: 76, display: "flex", alignItems: "center", justifyContent: "center" }}>!</div>
        <div style={{ fontFamily: INTER, fontSize: 44, lineHeight: 1.2, color: tokens.ink }}>{message}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 20, padding: "0 50px 46px" }}>
        {buttons.map((b, i) => {
          const pressed = press === i && t > a + 1.2;
          return <div key={b} style={{ padding: "18px 40px", borderRadius: 18, background: i === buttons.length - 1 ? tokens.mark : tokens.white, color: i === buttons.length - 1 ? tokens.white : tokens.ink, border: `2px solid ${tokens.rule}`, fontFamily: INTER, fontWeight: 700, fontSize: 36, transform: `scale(${pressed ? 0.92 : 1})` }}>{b}</div>;
        })}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: tokens.mark }}>
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${alpha(tokens.white, 0.06)} 2px, transparent 2px), linear-gradient(90deg, ${alpha(tokens.white, 0.06)} 2px, transparent 2px)`, backgroundSize: "60px 60px" }} />
      <AbsoluteFill style={{ transform: rush }}>
        {cur && t < f ? <Box key={cur.title} {...cur} style={{ left: 90, right: 90, top: 640, transform: `scale(${0.85 + 0.15 * pop(sp, cur.a)})` }} /> : null}
        {t < f
          ? cas.filter((c) => t >= c.a).map((c, i) => (
              <Box key={i} title={c.item.title} message={c.item.message} buttons={["OK"]} a={c.a} style={{ left: 40 + rnd(i) * 160, width: 820, top: 260 + rnd(i, 2) * 1050, transform: `rotate(${(rnd(i, 3) - 0.5) * 10}deg) scale(${0.7 + 0.15 * pop(sp, c.a)})` }} />
            ))
          : null}
      </AbsoluteFill>
      {t >= f ? <div style={{ position: "absolute", left: 90, right: 90, top: 700, padding: "50px 54px", borderRadius: 34, background: tokens.white, boxShadow: soft(1.4), fontFamily: INTER, fontWeight: 780, fontSize: 60, lineHeight: 1.08, letterSpacing: "-0.03em", color: tokens.ink, transform: `scale(${0.9 + 0.1 * pop(sp, f)})` }}><Br text={spec.final.text} /></div> : null}
      <Captions timing={timing} colour={tokens.white} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 8. Sat-nav
export const Satnav: React.FC<{ spec: SatnavSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const steps = spec.steps.map((s) => ({ ...s, a: T(s.at) }));
  const cur = [...steps].reverse().find((s) => t >= s.a) ?? steps[0];
  const miss = steps.find((s) => s.kind === "miss");
  const rer = steps.find((s) => s.kind === "reroute");
  const arrive = steps.find((s) => s.kind === "arrive");
  const cues: Cue[] = steps.map((s) => ({ t: s.a, s: s.kind === "miss" ? "buzz" : s.kind === "reroute" ? "whoosh" : s.kind === "arrive" ? "chime" : "tick", v: 0.28 }));
  const draw = (a: number | undefined, dur = 1.2) => (a === undefined ? 0 : Math.max(0, Math.min(1, (t - a) / dur)));
  const car = t < (miss?.a ?? 1e9) ? draw(steps[0].a, (miss?.a ?? 4) - steps[0].a) * 0.45 : t < (rer?.a ?? 1e9) ? 0.45 : 0.45 + draw(rer?.a, ((arrive?.a ?? (rer?.a ?? 0) + 3) - (rer?.a ?? 0))) * 0.55;
  const main = "M 540 1700 L 540 1250 L 540 1050 L 540 800 L 540 620";
  const detour = "M 540 1150 L 760 1150 L 760 860 L 540 860 L 540 620";
  const along = (pts: [number, number][], q: number) => {
    const segs = pts.slice(1).map((b, i) => ({ a: pts[i], b, len: Math.hypot(b[0] - pts[i][0], b[1] - pts[i][1]) }));
    let d = Math.max(0, Math.min(1, q)) * segs.reduce((n, g) => n + g.len, 0);
    for (const g of segs) {
      if (d <= g.len) return { x: g.a[0] + ((g.b[0] - g.a[0]) * d) / g.len, y: g.a[1] + ((g.b[1] - g.a[1]) * d) / g.len };
      d -= g.len;
    }
    return { x: pts[pts.length - 1][0], y: pts[pts.length - 1][1] };
  };
  const pt = (p: number) => (p < 0.45 ? { x: 540, y: 1700 - (p / 0.45) * 550 } : along([[540, 1150], [760, 1150], [760, 860], [540, 860], [540, 620]], (p - 0.45) / 0.55));
  const c = pt(car);
  const red = miss && t >= miss.a ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: tokens.card }}>
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${alpha(tokens.ink, 0.08)} 26px, transparent 26px), linear-gradient(90deg, ${alpha(tokens.ink, 0.08)} 26px, transparent 26px)`, backgroundSize: "220px 220px", backgroundPosition: "100px 40px" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <path d={main} fill="none" stroke={red ? tokens.problem : tokens.mark} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" opacity={rer && t >= rer.a ? 0.25 : 1} strokeDasharray={red ? "40 30" : undefined} />
        {rer ? <path d={detour} fill="none" stroke={tokens.mark} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw(rer.a, 0.9)} /> : null}
        <circle cx={540} cy={620} r={34} fill={tokens.ink} />
        <circle cx={c.x} cy={c.y} r={30} fill={tokens.white} stroke={tokens.mark} strokeWidth={12} />
      </svg>
      <div style={{ position: "absolute", left: 40, right: 40, top: 40, padding: "36px 40px", borderRadius: 34, background: cur.kind === "miss" ? tokens.problem : tokens.ink, color: tokens.white, boxShadow: soft(1), display: "flex", alignItems: "center", gap: 30 }}>
        <svg width={90} height={90} viewBox="0 0 90 90"><path d={cur.kind === "reroute" ? "M 20 70 L 20 40 Q 20 20 40 20 L 70 20 M 56 6 L 70 20 L 56 34" : "M 45 80 L 45 14 M 25 34 L 45 14 L 65 34"} fill="none" stroke={tokens.white} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 50, lineHeight: 1.05, opacity: pop(sp, cur.a) }}>{cur.text}</div>
      </div>
      <div style={{ position: "absolute", left: 600, top: 590, fontFamily: INTER, fontWeight: 800, fontSize: 44, color: tokens.ink }}>Exam day</div>
      <Captions timing={timing} colour={tokens.ink} y={280} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 9. Departures board
export const Departures: React.FC<{ spec: BoardSpec2 } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const rows = spec.rows.map((r) => ({ ...r, a: T(r.at) }));
  const f = T(spec.final.at);
  const cues: Cue[] = [...rows.map((r) => ({ t: r.a, s: "flip", v: 0.3 })), { t: f, s: "chime", v: 0.26 }];
  const flap = (text: string, a: number, colour: string) => {
    const k = Math.max(0, Math.min(1, (t - a) / 0.5));
    const shown = text.split("").map((ch, i) => (k * text.length > i ? ch : String.fromCharCode(65 + ((Math.floor(t * 30) + i * 7) % 26)))).join("");
    return <span style={{ color: colour }}>{t >= a ? shown : ""}</span>;
  };
  return (
    <AbsoluteFill style={{ background: tokens.night }}>
      <div style={{ position: "absolute", left: 50, right: 50, top: 380, display: "flex", justifyContent: "space-between", fontFamily: INTER, fontWeight: 800, fontSize: 56, color: tokens.kraft }}><span>{spec.title}</span><span style={{ fontSize: 40, color: alpha(tokens.white, 0.6) }}>This week</span></div>
      <div style={{ position: "absolute", left: 40, right: 40, top: 480 }}>
        {rows.map((r) => (
          <div key={r.dest} style={{ display: "flex", gap: 20, marginTop: 18, padding: "22px 24px", borderRadius: 12, background: alpha(tokens.white, 0.06), fontFamily: MONO, fontSize: 62, lineHeight: 1 }}>
            <span style={{ width: 130, color: tokens.white }}>{t >= r.a ? r.time : ""}</span>
            <span style={{ flex: 1, color: tokens.white }}>{flap(r.dest.toUpperCase(), r.a, tokens.white)}</span>
            <span style={{ width: 300, textAlign: "right" }}>{flap(r.status.toUpperCase(), r.a + 0.3, r.tone === "ok" ? tokens.kraft : tokens.problem)}</span>
          </div>
        ))}
      </div>
      {t >= f ? <div style={{ position: "absolute", left: 60, right: 60, bottom: 220, padding: "30px 36px", borderRadius: 26, background: tokens.white, color: tokens.ink, fontFamily: INTER, fontWeight: 760, fontSize: 46, lineHeight: 1.15, opacity: pop(sp, f) }}><Br text={spec.final.text} /></div> : null}
      <Captions timing={timing} colour={tokens.white} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 10. Recipe card
export const Recipe: React.FC<{ spec: RecipeSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const ing = spec.ingredients.map((x) => ({ ...x, a: T(x.at) }));
  const met = spec.method.map((x) => ({ ...x, a: T(x.at) }));
  const cues: Cue[] = [...ing.map((x) => ({ t: x.a, s: "pop_low", v: 0.22 })), ...met.map((x) => ({ t: x.a, s: "pop", v: 0.22 }))];
  return (
    <AbsoluteFill style={{ background: tokens.kraft }}>
      <div style={{ position: "absolute", left: 80, right: 80, top: 360, bottom: 170, background: tokens.card, boxShadow: soft(1.2), padding: "56px 60px", transform: "rotate(1deg)", backgroundImage: `linear-gradient(${alpha(tokens.blue, 0.12)} 2px, transparent 2px)`, backgroundSize: "100% 64px", backgroundPosition: "0 150px" }}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 70, lineHeight: 1.0, color: tokens.ink }}>{spec.title}</div>
        <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 28, color: tokens.quiet, marginTop: 10 }}>{spec.serves}</div>
        <div style={{ marginTop: 40, fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.14em", color: tokens.problem }}>YOU WILL NEED</div>
        {ing.filter((x) => t >= x.a).map((x) => <div key={x.text} style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 54, lineHeight: 1.18, color: tokens.ink, opacity: pop(sp, x.a) }}>• {x.text}</div>)}
        {met.length && t >= met[0].a ? <div style={{ marginTop: 30, fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.14em", color: tokens.problem }}>METHOD</div> : null}
        {met.filter((x) => t >= x.a).map((x, i) => <div key={x.text} style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 54, lineHeight: 1.18, color: tokens.mark, opacity: pop(sp, x.a) }}>{i + 1}. {x.text}</div>)}
      </div>
      <Captions timing={timing} colour={tokens.ink} y={110} />
      <Corner colour={tokens.ink} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 11. Missing poster
export const Missing: React.FC<{ spec: MissingSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const ds = spec.details.map((d) => ({ ...d, a: T(d.at) }));
  const r = T(spec.reward.at);
  const cues: Cue[] = [{ t: 0.2, s: "paper_land", v: 0.3 }, ...ds.map((d) => ({ t: d.a, s: "pop", v: 0.22 })), { t: r, s: "stamp", v: 0.3 }];
  return (
    <AbsoluteFill style={{ background: alpha(tokens.ink, 0.88) }}>
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(90deg, ${alpha(tokens.white, 0.04)} 50%, transparent 50%)`, backgroundSize: "140px 100%" }} />
      <div style={{ position: "absolute", left: 110, right: 110, top: 330, bottom: 160, background: tokens.card, boxShadow: soft(1.5), transform: "rotate(-2deg)", padding: "60px 60px", textAlign: "center" }}>
        {[[-30, -20], [null, -20]].map(([l], i) => <div key={i} style={{ position: "absolute", top: -22, left: l === null ? undefined : 40, right: l === null ? 40 : undefined, width: 160, height: 50, background: alpha(tokens.kraft, 0.8), transform: `rotate(${i ? 8 : -8}deg)` }} />)}
        <div style={{ fontFamily: DISPLAY, fontSize: 210, lineHeight: 0.9, color: tokens.problem }}>MISSING</div>
        <div style={{ margin: "34px auto 0", width: 520, height: 360, border: `6px solid ${tokens.ink}`, background: tokens.white, display: "flex", flexDirection: "column", gap: 14, padding: 30 }}>
          {[tokens.mark, tokens.kraft, tokens.problem, tokens.blue, tokens.kraft].map((c, i) => <div key={i} style={{ height: 40, borderRadius: 8, background: alpha(c, 0.7), width: `${90 - i * 9}%` }} />)}
        </div>
        <div style={{ marginTop: 30, fontFamily: INTER, fontWeight: 800, fontSize: 56, color: tokens.ink }}>{spec.subject}</div>
        {ds.filter((d) => t >= d.a).map((d) => <div key={d.label} style={{ marginTop: 10, fontFamily: INTER, fontSize: 40, color: tokens.ink, opacity: pop(sp, d.a) }}><b>{d.label}:</b> {d.value}</div>)}
        {t >= r ? <div style={{ marginTop: 30, display: "inline-block", transform: `scale(${pop(sp, r)})` }}><Stamp text={spec.reward.text} size={44} rot={-4} /></div> : null}
      </div>
      <Captions timing={timing} colour={tokens.white} y={100} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// 12. Kanban board
export const Kanban: React.FC<{ spec: KanbanSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const cards = spec.cards.map((c) => ({ ...c, a: T(c.at), m: c.move ? T(c.move.at) : 1e9 }));
  const f = T(spec.final.at);
  const cols = ["To do", "Doing", "Done"];
  const W = 320;
  const cues: Cue[] = [...cards.map((c) => ({ t: c.a, s: "pop_low", v: 0.2 })), ...cards.filter((c) => c.move).map((c) => ({ t: c.m, s: "whoosh", v: 0.24 })), { t: f, s: "sparkle", v: 0.26 }];
  const slots: Record<number, number> = {};
  const pile = flooded(T, spec.pile);
  const calm = spec.pile?.calm ? T(spec.pile.calm) : 1e9;
  const settle = sp(calm, { damping: 200, stiffness: 120, mass: 0.8 });
  if (spec.pile) cues.push(...pile.map((p) => ({ t: p.a, s: "pop_low", v: 0.12 })));
  const inCol = (col: number) => cards.filter((c) => t >= c.a && (c.move && t >= c.m ? c.move.col : c.col) === col).length + (spec.pile?.col === col ? pile.filter((p) => t >= p.a).length : 0);
  const rush = pile.length ? shake(t, pile[0].a, pile[pile.length - 1].a + 0.5, 9) : "none";
  return (
    <AbsoluteFill style={{ background: tokens.white, transform: rush }}>
      <div style={{ position: "absolute", left: 40, right: 40, top: 360, fontFamily: INTER, fontWeight: 800, fontSize: 56, color: tokens.ink }}>{spec.title}</div>
      {cols.map((c, i) => (
        <div key={c} style={{ position: "absolute", left: 30 + i * (W + 20), top: 460, width: W, bottom: 300, borderRadius: 26, background: tokens.rule, padding: "24px 18px" }}>
          <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 32, color: tokens.quiet, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {c}
            {spec.pile?.col === i && inCol(i) > 4 ? <Count n={inCol(i)} style={{ fontSize: 28, padding: "2px 16px" }} /> : null}
          </div>
        </div>
      ))}
      {spec.pile
        ? pile.filter((p) => t >= p.a).map((p, i) => {
            const k = sp(p.a, { damping: 11, stiffness: 170, mass: 0.6 });
            const base = 540 + spec.cards.filter((c) => c.col === spec.pile!.col).length * 170;
            const wild = { x: (rnd(i) - 0.5) * 90, y: i * 64 + (rnd(i, 2) - 0.5) * 50, r: (rnd(i, 3) - 0.5) * 34 };
            const tidy = { x: 0, y: Math.min(i, 5) * 12, r: 0 };
            const m = (a: number, b: number) => a + (b - a) * settle;
            return <div key={i} style={{ position: "absolute", left: 30 + spec.pile!.col * (W + 20) + 16 + m(wild.x, tidy.x), top: base + m(wild.y, tidy.y) - (1 - k) * 420, width: W - 32, padding: "22px 20px", borderRadius: 18, background: tokens.white, border: `2px solid ${alpha(tokens.problem, 0.35 * (1 - settle))}`, boxShadow: soft(0.6), fontFamily: INTER, fontWeight: 700, fontSize: 30, lineHeight: 1.15, color: alpha(tokens.ink, 1 - settle), transform: `rotate(${m(wild.r, tidy.r)}deg)` }}>{p.item}</div>;
          })
        : null}
      {spec.pile && settle > 0.02 ? (
        <div style={{ position: "absolute", left: 30 + spec.pile.col * (W + 20) + 16, top: 540 + spec.cards.filter((c) => c.col === spec.pile!.col).length * 170 + 72, width: W - 32, padding: "22px 20px", borderRadius: 18, background: tokens.mark, color: tokens.white, boxShadow: soft(0.8), fontFamily: INTER, fontWeight: 800, fontSize: 30, lineHeight: 1.15, opacity: settle, transform: `scale(${0.9 + 0.1 * settle})` }}>
          {pile.length} tasks,
          <br />
          scheduled
        </div>
      ) : null}
      {cards.filter((c) => t >= c.a).map((c) => {
        const k = sp(c.m, { damping: 18, stiffness: 160, mass: 0.7 });
        const col = c.move && t >= c.m ? c.col + (c.move.col - c.col) * k : c.col;
        const target = c.move && t >= c.m ? c.move.col : c.col;
        slots[target] = (slots[target] ?? 0) + 1;
        const y = 540 + (slots[target] - 1) * 170;
        return <div key={c.text} style={{ position: "absolute", left: 30 + col * (W + 20) + 16, top: y, width: W - 32, padding: "24px 22px", borderRadius: 18, background: tokens.white, boxShadow: soft(0.5), fontFamily: INTER, fontWeight: 700, fontSize: 32, lineHeight: 1.15, color: tokens.ink, opacity: pop(sp, c.a), transform: `rotate(${c.move && t >= c.m && k < 0.95 ? 4 : 0}deg)` }}>{c.text}</div>;
      })}
      {t >= f ? <div style={{ position: "absolute", left: 60, right: 60, bottom: 160, padding: "30px 36px", borderRadius: 26, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 760, fontSize: 44, lineHeight: 1.15, opacity: pop(sp, f) }}><Br text={spec.final.text} /></div> : null}
      <Captions timing={timing} colour={tokens.ink} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};
