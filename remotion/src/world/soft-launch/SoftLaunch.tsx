import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import { tokens } from "../../tokens";
import { alpha, camAt, EXPO, INTER, makeTiming, mix, POP, ScreenClip, S0, track, useK, type Cam, type Cue } from "../kit/dark";
import { LogoEnd, logoCues } from "../kit/logo";
import { Icon } from "../kit/icons";
import timing from "./timing.json";

/**
 * Soft launch: light, extruded "soft 3D" UI in one accent (the logo blue). Typewriter type with a
 * caret, a pill that swipes the frame blue, an orbit of features, tilted rings for the phases,
 * real footage for the reschedule, and the logo: the dot bursts into a blue splash.
 */
const { ls, at, duration } = makeTiming(timing);

const T = {
  years: at("L1", "years"),
  broken: at("L1", "broken"),
  today: ls("L2"),
  changes: at("L2", "changes"),
  intro: ls("L3"),
  offload: at("L3", "offload"),
  upload: ls("L4"),
  notes: at("L4", "notes"),
  dates: at("L4", "dates"),
  built: ls("L5"),
  own: at("L5", "own"),
  flash: at("L5", "flashcards"),
  blurt: at("L5", "blurting"),
  exam: at("L5", "exam-style"),
  first: ls("L6"),
  learn: at("L6", "learn"),
  tests: at("L6", "tests"),
  keeps: at("L6", "keeps"),
  connect: ls("L7"),
  calendar: at("L7", "calendar"),
  plans: at("L7", "plans"),
  lectures: at("L7", "lectures"),
  shifts: at("L7", "shifts"),
  miss: ls("L8"),
  moved: at("L8", "moved"),
  end: ls("L9") - 0.15,
};
export const SOFT_DURATION_S = Math.max(duration, T.end + 4.4);

// ---------- the soft kit ----------
const BG = tokens.rule;
const RAISE = (d = 1) => `${-14 * d}px ${-14 * d}px ${34 * d}px ${alpha(tokens.white, 0.95)}, ${18 * d}px ${22 * d}px ${46 * d}px ${alpha(tokens.ink, 0.14)}, inset 0 2px 0 ${alpha(tokens.white, 1)}`;
const PRESS = `inset 10px 10px 22px ${alpha(tokens.ink, 0.12)}, inset -10px -10px 22px ${alpha(tokens.white, 0.9)}`;

/** An extruded card: a darker slab under a lifted face, with a faint accent rim. */
const Slab: React.FC<{ x: number; y: number; w: number; h: number; k: number; r?: number; rad?: number; depth?: number; o?: number; children?: React.ReactNode; tilt?: number }> = ({ x, y, w, h, k, r = 0, rad = 48, depth = 16, o = 1, children, tilt = 0 }) =>
  k <= 0.001 || o <= 0.01 ? null : (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `perspective(1600px) rotateX(${tilt}deg) scale(${k}) rotate(${r}deg)`, opacity: Math.min(1, k * 1.6) * o }}>
      <div style={{ position: "absolute", inset: 0, top: depth, borderRadius: rad, background: `linear-gradient(180deg, ${alpha(tokens.ink, 0.05)}, ${alpha(tokens.ink, 0.1)})`, filter: "blur(0.5px)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: rad, background: `linear-gradient(160deg, ${tokens.white}, ${BG})`, boxShadow: `${RAISE(1)}, 0 0 0 2px ${alpha(tokens.mark, 0.1)}`, overflow: "hidden" }}>{children}</div>
    </div>
  );

/** Typewriter with a blue caret; on exit the letters scatter. */
const Typer: React.FC<{ text: string; at: number; out: number; y: number; size?: number; cps?: number; blue?: string[]; colour?: string; scatter?: boolean }> = ({ text, at, out, y, size = 92, cps = 18, blue = [], colour = tokens.ink, scatter = true }) => {
  const { t, frame } = useK();
  if (t < at - 0.05 || t > out + 0.7) return null;
  const n = Math.floor(Math.max(0, t - at) * cps);
  const ex = interpolate(t, [out, out + 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EXPO });
  const isBlue = (i: number) => blue.some((w) => {
    const j = text.indexOf(w);
    return j >= 0 && i >= j && i < j + w.length;
  });
  let c0 = 0;
  const sfx = text.split(" ").map((w, wi) => {
    const t0 = at + c0 / cps;
    c0 += w.length + 1;
    return (
      <Sequence key={`s${wi}`} from={Math.round(t0 * 30)} durationInFrames={15} layout="none">
        <Audio src={staticFile(`sfx/w_pop${(w.length + wi * 3) % 5}.wav`)} volume={0.17} />
      </Sequence>
    );
  });
  return (
    <>
    {sfx}
    <div style={{ position: "absolute", left: 60, right: 60, top: y, display: "flex", justifyContent: "center", flexWrap: "wrap", fontFamily: INTER, fontWeight: 750, fontSize: size, letterSpacing: "-0.04em", lineHeight: 1.1, color: colour }}>
      {(() => {
        const words: { w: string; i0: number }[] = [];
        let i0 = 0;
        text.split(" ").forEach((w) => {
          words.push({ w, i0 });
          i0 += w.length + 1;
        });
        return words.map(({ w, i0: base }, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: size * 0.26 }}>
            {w.split("").map((ch, ci) => {
              const i = base + ci;
              if (i >= n) return null;
              const a = ((i * 73) % 360) * (Math.PI / 180);
              const d = scatter ? ex * (220 + ((i * 37) % 160)) : 0;
              return (
                <span key={ci} style={{ display: "inline-block", color: isBlue(i) ? tokens.mark : colour, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - ex * 60}px) rotate(${ex * ((i % 2 ? 1 : -1) * 90)}deg) scale(${1 - ex * 0.4})`, opacity: 1 - ex, filter: ex > 0.02 ? `blur(${ex * 6}px)` : undefined }}>
                  {ch}
                </span>
              );
            })}
          </span>
        ));
      })()}
      {t < out && n <= text.length ? <span style={{ display: "inline-block", width: size * 0.09, height: size * 1.02, marginLeft: 6, borderRadius: 4, background: tokens.mark, opacity: n < text.length || Math.floor(frame / 9) % 2 ? 1 : 0 }} /> : null}
    </div>
    </>
  );
};

/** 3D tilted ring with spinning ticks: the phase rings. */
const Ring: React.FC<{ y: number; w: number; k: number; on: number; label: string; spin: number }> = ({ y, w, k, on, label, spin }) => {
  if (k <= 0.01) return null;
  const col = alpha(tokens.mark, 0.25 + 0.75 * on);
  return (
    <>
    <div style={{ position: "absolute", left: 0, right: 0, top: y - 46, textAlign: "center", fontFamily: INTER, fontWeight: 850, fontSize: 84, letterSpacing: "-0.04em", color: on > 0.5 ? tokens.mark : alpha(tokens.ink, 0.28), opacity: Math.min(1, k * 1.5), transform: `scale(${mix(0.9, 1.06, on)})`, textShadow: on > 0.5 ? `0 0 30px ${alpha(tokens.mark, 0.4)}` : undefined }}>{label}</div>
    <div style={{ position: "absolute", left: 540 - w / 2, top: y - w / 2, width: w, height: w, transform: `perspective(1400px) rotateX(70deg) scale(${k})`, opacity: Math.min(1, k * 1.5) }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${10 + on * 6}px solid ${col}`, boxShadow: on > 0.3 ? `0 0 ${40 * on}px ${alpha(tokens.mark, 0.6 * on)}, inset 0 0 ${30 * on}px ${alpha(tokens.mark, 0.4 * on)}` : undefined }} />
      <div style={{ position: "absolute", inset: 34, borderRadius: "50%", border: `8px dashed ${alpha(tokens.mark, 0.2 + 0.5 * on)}`, transform: `rotate(${spin}deg)` }} />
    </div>
    </>
  );
};

const CUES: Cue[] = [
  ...logoCues(T.end),
  { t: T.offload - 1.3, s: "riser_long", v: 0.28 },
  { t: T.offload + 0.02, s: "subdrop", v: 0.5 },
  { t: 0.3, s: "pop_low", v: 0.2 },
  { t: T.broken, s: "glass", v: 0.26 },
  { t: T.broken + 0.05, s: "thud", v: 0.22 },
  { t: T.changes + 0.6, s: "reverse", v: 0.2 },
  { t: T.intro - 0.2, s: "pop", v: 0.28 },
  { t: T.offload - 0.02, s: "click", v: 0.4 },
  { t: T.offload + 0.05, s: "boom", v: 0.3 },
  { t: T.offload + 0.1, s: "whoosh", v: 0.3 },
  { t: T.offload + 0.45, s: "swish", v: 0.26 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.offload + 0.5 + i * 0.07, s: "pop_low", v: 0.14 })),
  { t: T.upload - 0.15, s: "iris", v: 0.3 },
  ...Array.from({ length: 17 }, (_, i) => ({ t: T.upload + 0.25 + i * 0.05, s: "key", v: 0.1 })),
  { t: T.notes + 0.1, s: "paper_land", v: 0.26 },
  { t: T.dates, s: "pop", v: 0.24 },
  { t: T.built - 0.1, s: "whoosh", v: 0.2 },
  { t: T.flash, s: "pop", v: 0.26 },
  { t: T.blurt, s: "pop", v: 0.26 },
  { t: T.exam, s: "pop", v: 0.26 },
  { t: T.first - 0.1, s: "swoosh_down", v: 0.22 },
  { t: T.learn, s: "chime", v: 0.16 },
  { t: T.tests, s: "chime", v: 0.18 },
  { t: T.keeps, s: "chime", v: 0.2 },
  { t: T.connect - 0.1, s: "whoosh", v: 0.2 },
  { t: T.calendar, s: "click", v: 0.36 },
  { t: T.calendar + 0.05, s: "sparkle", v: 0.2 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.plans + i * 0.12, s: "pop_low", v: 0.16 })),
  { t: T.miss - 0.12, s: "glass", v: 0.22 },
  { t: T.moved, s: "ding", v: 0.18 },
];

const CAM: Cam[] = [
  { t: 0, x: 540, y: 980, z: 1.1, r: -1 },
  { t: T.broken, x: 560, y: 1000, z: 1.2, r: 0 },
  { t: T.today - 0.1, x: 540, y: 960, z: 1 },
  { t: T.upload - 0.1, x: 540, y: 1000, z: 1.12 },
  { t: T.dates, x: 540, y: 1100, z: 1.08 },
  { t: T.built - 0.1, x: 540, y: 1000, z: 1.0 },
  { t: T.exam, x: 600, y: 1080, z: 1.1, r: 1 },
  { t: T.first - 0.1, x: 540, y: 1060, z: 1.0, r: 0 },
  { t: T.keeps, x: 540, y: 1180, z: 1.08 },
  { t: T.connect - 0.1, x: 540, y: 900, z: 1.14 },
  { t: T.plans - 0.2, x: 540, y: 1100, z: 1.04 },
  { t: T.miss - 0.15, x: 540, y: 1060, z: 1.04 },
  { t: T.end - 0.1, x: 540, y: 960, z: 1 },
];

export const SoftLaunch: React.FC = () => {
  const { frame, fps, t, sp } = useK();
  const c = camAt(frame, fps, CAM);
  const drift = { x: 5 * Math.sin(t * 0.7), y: 4 * Math.sin(t * 0.5 + 1) };
  const span = (a: number, b: number, inC = POP) => sp(a, inC) * (1 - sp(b));

  // S1: the plan that breaks
  const s1 = span(0.1, T.today - 0.15);
  const brk = sp(T.broken, { damping: 12, stiffness: 200, mass: 0.6 });
  const draw = interpolate(t, [0.3, T.broken], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const linePts = Array.from({ length: 30 }, (_, i) => {
    const u = i / 29;
    const up = 300 - u * 210 + Math.sin(u * 12) * 14;
    const v = u < 0.62 ? up : mix(300 - 0.62 * 210, 330, brk) + (u - 0.62) * 260 * brk + Math.sin(u * 12) * 14 * (1 - brk);
    return `${60 + u * 680} ${u < 0.62 ? up : v}`;
  });
  const pie = Math.min(draw, 0.62) * 360;

  // S3: pill, blue swipe, orbit
  const pill = span(T.intro - 0.2, T.offload + 0.2);
  const press = t > T.offload - 0.04 && t < T.offload + 0.16;
  const blue = t >= T.offload ? sp(T.offload, { damping: 200, stiffness: 150, mass: 0.6 }) * (1 - sp(T.upload - 0.15, { damping: 200, stiffness: 150, mass: 0.6 })) : 0;
  const bar = interpolate(t, [T.offload + 0.05, T.offload + 0.5], [-1600, 1700], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EXPO });
  const orbit = span(T.offload + 0.4, T.upload - 0.2);
  const ICONS = ["doc", "cal", "card", "chart", "check", "bell"];

  // S4: upload
  const s4 = span(T.upload, T.built - 0.1);
  const typed = Math.floor(Math.max(0, t - T.upload - 0.25) * 20);
  const fileName = "Biology notes.pdf";
  const docs = ["Lecture notes", "Biology notes", "Past lectures"].map((_, i) => sp(T.notes + 0.05 + i * 0.12, POP));
  const exams = ["Mocks", "Summer exams"].map((_, i) => sp(T.dates + i * 0.12, POP));

  // S5: built from your notes
  const s5 = 1 - sp(T.first - 0.1);
  const cards = [
    { label: "Flashcards", icon: "card", at: T.flash, x: 300, r: -7 },
    { label: "Blurting", icon: "pen", at: T.blurt, x: 540, r: 0 },
    { label: "Exam-style questions", icon: "check", at: T.exam, x: 780, r: 7 },
  ];
  const src = span(T.built, T.flash - 0.1);

  // S6: rings
  const s6 = span(T.first - 0.05, T.connect - 0.15);
  const phase = (a: number, b: number) => (t < a ? 0 : t < b ? sp(a) : 1 - sp(b) * 0.6);

  // S7: connect
  const s7 = span(T.connect - 0.05, T.miss - 0.15);
  const pushed = t > T.calendar - 0.05 && t < T.calendar + 0.18;
  const calCard = sp(T.calendar + 0.6, POP);

  // S8: footage
  const clip = track(frame, fps, S0({ y: 2300, s: 0.95 }), [
    { t: T.miss - 0.1, v: { y: 1080, o: 1, s: 1 }, c: { damping: 200, stiffness: 180, mass: 0.7 } },
    { t: T.end - 0.1, v: { s: 2.2, o: 0, b: 24 } },
  ]);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(70% 50% at 50% 45%, ${tokens.white}, ${BG} 75%)` }} />
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: `translate(${540 + drift.x}px, ${960 + drift.y}px) rotate(${c.r}deg) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)` }}>
        {/* S1 */}
        <Slab x={540} y={1030} w={860} h={560} k={s1} tilt={8 * (1 - s1)}>
          <div style={{ position: "absolute", left: 50, top: 44, width: 150, height: 150, borderRadius: "50%", background: `conic-gradient(${tokens.mark} ${pie}deg, ${alpha(tokens.mark, 0.12)} 0)`, boxShadow: RAISE(0.5) }} />
          <div style={{ position: "absolute", left: 230, top: 70, fontFamily: INTER, fontWeight: 750, fontSize: 40, color: tokens.ink }}>Your revision plan</div>
          <div style={{ position: "absolute", left: 230, top: 124, fontFamily: INTER, fontWeight: 600, fontSize: 30, color: alpha(tokens.ink, 0.45) }}>{brk > 0.3 ? "Broken" : "On track"}</div>
          <svg width={860} height={560} style={{ position: "absolute", left: 0, top: 170 }}>
            <polyline points={linePts.slice(0, Math.max(2, Math.ceil(draw * 30 + brk * 30))).join(" ")} fill="none" stroke={brk > 0.2 ? tokens.problem : tokens.mark} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ position: "absolute", left: 50, bottom: 40, width: 260, height: 36, borderRadius: 18, boxShadow: PRESS }} />
        </Slab>

        {/* S4 */}
        <Slab x={540} y={940} w={900} h={260} k={s4} rad={130}>
          <div style={{ position: "absolute", left: 50, top: 70, width: 120, height: 120, borderRadius: "50%", boxShadow: RAISE(0.4), display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="search" size={64} />
          </div>
          <div style={{ position: "absolute", left: 210, top: 76, right: 50, height: 108, borderRadius: 54, boxShadow: PRESS, display: "flex", alignItems: "center", paddingLeft: 40, fontFamily: INTER, fontWeight: 650, fontSize: 46, color: tokens.ink }}>
            {fileName.slice(0, typed)}
            <span style={{ width: 5, height: 52, marginLeft: 4, background: tokens.mark, opacity: Math.floor(frame / 9) % 2 }} />
          </div>
        </Slab>
        {docs.map((k, i) => (
          <Slab key={i} x={280 + i * 260} y={1250} w={230} h={270} k={k * s4} r={(i - 1) * 6} rad={36} depth={12}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 18 }}>
              <Icon name="doc" size={96} />
              <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: tokens.ink }}>{["Lecture notes", "Biology notes", "Past lectures"][i]}</div>
            </div>
          </Slab>
        ))}
        {exams.map((k, i) => (
          <Slab key={i} x={330 + i * 420} y={1510} w={380} h={110} k={k * s4} rad={55} depth={10}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, height: "100%" }}>
              <Icon name="cal" size={50} />
              <div style={{ fontFamily: INTER, fontWeight: 750, fontSize: 36, color: tokens.ink }}>{["Mocks", "Summer exams"][i]}</div>
            </div>
          </Slab>
        ))}

        {/* S5 */}
        <Slab x={540} y={860} w={560} h={200} k={src} rad={60}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, height: "100%" }}>
            <Icon name="doc" size={80} />
            <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 46, color: tokens.ink }}>Your notes</div>
          </div>
        </Slab>
        {cards.map((cd) => {
          const k = sp(cd.at - 0.05, POP) * s5;
          return (
            <Slab key={cd.label} x={cd.x} y={1120 - (cd.x === 540 ? 40 : 0)} w={290} h={400} k={k} r={cd.r} rad={40}>
              <div style={{ position: "absolute", left: 30, right: 30, top: 30, height: 190, borderRadius: 28, background: tokens.mark, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `inset 0 -10px 24px ${alpha(tokens.ink, 0.2)}` }}>
                <Icon name={cd.icon} size={100} colour={tokens.white} />
              </div>
              <div style={{ position: "absolute", left: 30, right: 30, top: 250, fontFamily: INTER, fontWeight: 750, fontSize: 34, lineHeight: 1.15, color: tokens.ink }}>{cd.label}</div>
              <div style={{ position: "absolute", left: 30, top: 340, fontFamily: INTER, fontWeight: 600, fontSize: 22, letterSpacing: "0.08em", color: tokens.mark }}>FROM YOUR NOTES</div>
            </Slab>
          );
        })}

        {/* S6 */}
        {[
          { label: "Learn", y: 830, a: T.learn, b: T.tests },
          { label: "Test", y: 1110, a: T.tests, b: T.keeps },
          { label: "Retain", y: 1390, a: T.keeps, b: 1e9 },
        ].map((r, i) => (
          <Ring key={r.label} y={r.y} w={620 - i * 20} k={span(T.first + i * 0.12, T.connect - 0.15)} on={phase(r.a, r.b) * s6} label={r.label} spin={t * (40 + i * 15) * (i % 2 ? -1 : 1)} />
        ))}

        {/* S7 */}
        {[0, 1, 2].map((i) => {
          const k = sp(T.connect + i * 0.08, POP) * s7;
          if (k < 0.01) return null;
          const mid = i === 1;
          return (
            <div key={i} style={{ position: "absolute", left: 540 + (i - 1) * 250 - 105, top: 780 - 105, width: 210, height: 210, borderRadius: "50%", transform: `scale(${k * (mid && pushed ? 0.92 : 1)})`, background: mid ? `radial-gradient(circle at 35% 30%, ${alpha(tokens.white, 0.35)}, ${tokens.mark} 60%)` : `linear-gradient(160deg, ${tokens.white}, ${BG})`, boxShadow: mid && pushed ? PRESS : RAISE(0.8), display: "flex", alignItems: "center", justifyContent: "center" }}>
              {mid ? <Icon name="cal" size={100} colour={tokens.white} /> : <Icon name={i === 0 ? "doc" : "check"} size={80} colour={alpha(tokens.ink, 0.25)} />}
            </div>
          );
        })}
        <Slab x={540} y={1300} w={900} h={520} k={calCard * s7} rad={44}>
          <div style={{ position: "absolute", left: 40, top: 30, fontFamily: INTER, fontWeight: 750, fontSize: 36, color: tokens.ink }}>This week</div>
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
            <div key={d} style={{ position: "absolute", left: 40 + i * 166, top: 90, width: 150, bottom: 30, borderRadius: 22, boxShadow: PRESS }}>
              <div style={{ textAlign: "center", marginTop: 14, fontFamily: INTER, fontWeight: 700, fontSize: 26, color: alpha(tokens.ink, 0.5) }}>{d}</div>
              {[0, 1, 2].map((s) => {
                const busy = (i + s) % 3 === 0;
                const k = busy ? sp(T.lectures - 0.1 + i * 0.04, POP) : (i + s) % 2 === 0 ? sp(T.plans + (i * 3 + s) * 0.05, POP) : 0;
                return k > 0.01 ? (
                  <div key={s} style={{ position: "absolute", left: 12, right: 12, top: 64 + s * 100, height: 86, borderRadius: 16, background: busy ? alpha(tokens.ink, 0.12) : tokens.mark, transform: `scale(${k})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 700, fontSize: 20, color: busy ? alpha(tokens.ink, 0.55) : tokens.white }}>
                    {busy ? (i % 2 ? "Shift" : "Lecture") : "Study"}
                  </div>
                ) : null;
              })}
            </div>
          ))}
        </Slab>

        {/* S8: real footage */}
        <ScreenClip s={clip} src="rec/reschedule-a.mp4" at={T.miss} until={T.end - 0.1} clipLen={6.5} label="Live in the app" />
      </AbsoluteFill>

      {/* type */}
      <Typer text="For years," at={0.15} out={T.today - 0.25} y={300} size={110} />
      <Typer text="plans broke when life happened." at={1.1} out={T.today - 0.25} y={440} size={66} cps={22} blue={[]} />
      <Typer text="Today, that changes." at={T.today} out={T.intro - 0.25} y={860} size={104} blue={["changes."]} />
      <Typer text="Upload your notes" at={T.upload} out={T.built - 0.15} y={300} size={86} blue={["notes"]} scatter={false} />
      <Typer text="Built from your own notes" at={T.built} out={T.first - 0.15} y={300} size={80} blue={["own"]} scatter={false} />
      <Typer text="It moves you on." at={T.first} out={T.connect - 0.15} y={300} size={90} blue={["on."]} scatter={false} />
      <Typer text="Plans around your calendar" at={T.connect + 0.1} out={T.miss - 0.15} y={300} size={78} blue={["calendar"]} scatter={false} />
      <Typer text="Miss a day? It moves." at={T.miss} out={T.end - 0.1} y={260} size={86} blue={["moves."]} scatter={false} />

      {/* S3: the pill, the blue swipe, the orbit */}
      {pill > 0.01 && blue < 0.98 ? (
        <div style={{ position: "absolute", left: 540 - 260, top: 960 - 75, width: 520, height: 150, borderRadius: 75, background: `radial-gradient(circle at 30% 25%, ${alpha(tokens.white, 0.3)}, ${tokens.mark} 65%)`, boxShadow: press ? PRESS : RAISE(0.9), transform: `scale(${pill * (press ? 0.94 : 1)})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 750, fontSize: 62, letterSpacing: "-0.02em", color: tokens.white }}>
          Introducing
        </div>
      ) : null}
      {blue > 0.001 ? (
        <AbsoluteFill style={{ clipPath: `circle(${blue * 2300}px at 540px 960px)`, background: tokens.mark }}>
          <div style={{ position: "absolute", left: bar, top: 860, width: 1400, height: 110, borderRadius: 55, background: tokens.white, transform: "rotate(-52deg)", transformOrigin: "left center", boxShadow: `0 20px 50px ${alpha(tokens.ink, 0.25)}` }} />
          {orbit > 0.01 ? (
            <AbsoluteFill style={{ opacity: Math.min(1, orbit * 1.4), transform: `scale(${mix(0.7, 1, orbit)})` }}>
              <div style={{ position: "absolute", left: 540 - 330, top: 960 - 330, width: 660, height: 660, borderRadius: "50%", border: `8px solid ${alpha(tokens.white, 0.85)}`, transform: `rotate(${t * 30}deg)`, borderTopColor: "transparent", borderBottomColor: alpha(tokens.white, 0.4) }} />
              <div style={{ position: "absolute", left: 540 - 120, top: 960 - 120, width: 240, height: 240, borderRadius: "50%", background: tokens.white, boxShadow: `0 20px 60px ${alpha(tokens.ink, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 92, height: 92, borderRadius: "50%", background: tokens.mark, transform: `scale(${1 + 0.06 * Math.sin(t * 8)})` }} />
              </div>
              {ICONS.map((ic, i) => {
                const a = (i / ICONS.length) * Math.PI * 2 + t * 0.9;
                const k = sp(T.offload + 0.5 + i * 0.07, POP);
                return (
                  <div key={ic} style={{ position: "absolute", left: 540 + Math.cos(a) * 330 - 62, top: 960 + Math.sin(a) * 330 - 62, width: 124, height: 124, borderRadius: "50%", background: tokens.white, boxShadow: `0 14px 30px ${alpha(tokens.ink, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${k})` }}>
                    <Icon name={ic} size={64} />
                  </div>
                );
              })}
            </AbsoluteFill>
          ) : null}
        </AbsoluteFill>
      ) : null}

      <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" bg={BG} text={tokens.ink} />

      <Audio src={staticFile("world/soft-launch/vo.wav")} />
      {CUES.map((q, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(q.t * fps))} durationInFrames={Math.round(1.6 * fps)} layout="none">
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
