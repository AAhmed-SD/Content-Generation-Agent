import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tokens } from "../../tokens";
import { Kinetic, type KPart } from "../kinetic";
import { Circle, Cross, Tick } from "../marks";
import { cell, Grid, M, Obj, snapK, Wordmark, type Pose } from "../zine";
import layout from "./layout.json";
import timing from "./timing.json";

/** Past papers as a living zine: off-white page, thin grid, real objects, hard cuts. */
const INTER = "Inter";
loadFont({ family: INTER, url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const ZINE_DURATION_S = timing.duration;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const ls = (id: string) => timing.lines.find((x) => x.id === id)!.start;
const at = (line: string, word: string) => {
  const l = timing.lines.find((x) => x.id === line)!;
  return (l.words.find((w) => norm(w.text).startsWith(norm(word))) ?? l.words[0]).start;
};

const T = {
  like: at("L1", "like"),
  this: at("L1", "this"),
  doPaper: ls("L2"),
  mark: at("L2", "mark"),
  feel: at("L2", "feel"),
  next: at("L2", "next"),
  ten: ls("L3"),
  same: at("L3", "same"),
  mistakes: at("L3", "mistakes"),
  marks: ls("L4"),
  lost: at("L4", "lost"),
  point: at("L4", "that's"),
  turn: ls("L5"),
  flashcard: at("L5", "flashcard"),
  redo: ls("L6"),
  three: at("L6", "three"),
  then: at("L6", "then"),
  week: at("L6", "week"),
  thats: ls("L7"),
  spacing: at("L7", "spacing"),
  its: at("L7", "it's"),
  sticks: at("L7", "sticks"),
  offload: ls("L8"),
  builds: at("L8", "builds"),
  deck: at("L8", "remediation"),
  exactly: at("L8", "exactly"),
  comment: ls("L9"),
  papers: at("L9", "papers"),
  send: at("L9", "send"),
  end: timing.duration,
};

const PA = 1600 / 2262; // paper aspect
const OBJ = (n: string) => `world/past-papers/obj/${n}.png`;
const HERO = { x: 430, y: 1134, w: 640 };
const heroH = HERO.w / PA;
const onHero = (nx: number, ny: number) => ({ x: HERO.x - HERO.w / 2 + nx * HERO.w, y: HERO.y - heroH / 2 + ny * heroH });
const q = (paper: "paper1" | "paper2" | "paper3", n: number) => (layout[paper] as { x0: number; y0: number; x1: number; y1: number }[])[n - 1];
const Q4 = q("paper2", 4);
const Q4C = onHero((Q4.x0 + Q4.x1) / 2, (Q4.y0 + Q4.y1) / 2);

const CAL = { x: 600, y: 1134, w: 1500 };
const calH = CAL.w * (570 / 3240);
const dayAt = (d: number) => ({
  x: CAL.x - CAL.w / 2 + (layout.calendar.x0 + (d - 0.5) * layout.calendar.cell) * CAL.w,
  y: CAL.y - calH / 2 + ((layout.calendar.top + layout.calendar.bottom) / 2) * calH,
});

// paper overlay coordinates (viewBox 1000 wide)
const VB_H = 1000 / PA;
const box = (paper: "paper1" | "paper2" | "paper3", n: number) => {
  const b = q(paper, n);
  return { x0: b.x0 * 1000, y0: b.y0 * VB_H, x1: b.x1 * 1000, y1: b.y1 * VB_H };
};

const CUES: { t: number; s: string; v: number }[] = [
  { t: 0, s: "snap", v: 0.3 },
  ...[0.26, 0.52, 0.78, 1.04].map((x) => ({ t: x, s: "paper_land", v: 0.4 })),
  { t: T.this, s: "click", v: 0.5 },
  { t: T.this + 0.03, s: "tick", v: 0.3 },
  { t: T.doPaper - 0.05, s: "paper", v: 0.35 },
  { t: T.doPaper + 0.1, s: "paper_land", v: 0.45 },
  { t: T.mark, s: "scribble", v: 0.35 },
  ...[0, 0.07, 0.14].map((d) => ({ t: T.mark + 0.15 + d, s: "key", v: 0.3 })),
  { t: T.mark + 0.05, s: "paper_land", v: 0.3 },
  { t: T.feel, s: "scribble", v: 0.35 },
  { t: T.next - 0.03, s: "paper", v: 0.4 },
  { t: T.next + 0.1, s: "paper_land", v: 0.4 },
  ...Array.from({ length: 10 }, (_, i) => ({ t: T.ten + i * 0.08, s: "paper_land", v: 0.22 })),
  { t: T.mistakes, s: "scribble", v: 0.45 },
  { t: T.mistakes, s: "thud", v: 0.3 },
  { t: T.marks - 0.05, s: "paper", v: 0.35 },
  { t: T.lost, s: "scribble", v: 0.42 },
  { t: T.turn, s: "paper_land", v: 0.4 },
  { t: T.flashcard - 0.05, s: "paper", v: 0.4 },
  { t: T.redo, s: "paper_land", v: 0.45 },
  { t: T.three + 0.2, s: "paper_land", v: 0.35 },
  { t: T.three + 0.3, s: "tick", v: 0.3 },
  { t: T.week + 0.15, s: "paper_land", v: 0.35 },
  { t: T.week + 0.25, s: "tick", v: 0.3 },
  { t: T.spacing, s: "stamp", v: 0.4 },
  { t: T.its + 0.05, s: "scribble", v: 0.2 },
  { t: T.offload, s: "scribble", v: 0.3 },
  { t: T.offload + 0.1, s: "paper_land", v: 0.4 },
  { t: T.builds + 0.3, s: "pop", v: 0.25 },
  { t: T.deck, s: "click", v: 0.4 },
  { t: T.exactly, s: "tick", v: 0.3 },
  { t: T.comment, s: "snap", v: 0.3 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.papers + i * 0.07, s: "key", v: 0.24 })),
  { t: T.papers + 0.6, s: "scribble", v: 0.25 },
  { t: T.send, s: "chime", v: 0.18 },
];

export const PastPapersZine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const f = (s: number) => Math.round(s * fps);

  const H = (text: string, from: number, out: number, opts: { y?: number; size?: number; red?: string[]; fx?: KPart["fx"]; colour?: string; weight?: number } = {}) => (
    <Kinetic
      key={text + from}
      frame={frame}
      fps={fps}
      font={INTER}
      y={opts.y ?? 150}
      size={opts.size ?? 112}
      weight={opts.weight ?? 800}
      align="left"
      colour={opts.colour ?? tokens.ink}
      gap={(opts.size ?? 112) * 0.24}
      out={out}
      exit="cut"
      parts={text.split(" ").map((w) => ({ text: w, t: from, fx: opts.fx ?? "cut", colour: (opts.red ?? []).includes(norm(w)) ? tokens.problem : undefined }))}
    />
  );

  // ---- poses ----
  const STACK: Pose[][] = [0, 1, 2, 3, 4].map((i) => [
    { t: i * 0.26, x: 540 + (i % 2 ? 18 : -14) + i * 6, y: 1150 - i * 10, w: 560, r: [-4, 3, -2, 5, -1][i] },
    { t: T.doPaper - 0.05, x: -700, y: 1150, w: 560, r: -10, o: 0 },
  ]);
  const heroPoses: Pose[] = [
    { t: T.doPaper, ...HERO, r: -1.5 },
    { t: T.next - 0.02, x: -600, y: HERO.y, w: HERO.w, r: -8, o: 0 },
  ];
  const nextPoses: Pose[] = [
    { t: T.next, x: 1500, y: HERO.y, w: HERO.w, r: 4 },
    { t: T.next + 0.01, ...HERO, r: 1 },
    { t: T.ten - 0.05, x: HERO.x, y: 2600, w: HERO.w, r: 1, o: 0 },
  ];
  const lostPoses: Pose[] = [
    { t: T.marks - 0.05, ...HERO, r: -1 },
    { t: T.turn + 0.25, x: HERO.x, y: HERO.y + 60, w: HERO.w, r: -1, o: 0 },
  ];
  const calcPoses: Pose[] = [
    { t: T.mark + 0.05, x: 905, y: 1440, w: 220, r: 6 },
    { t: T.ten - 0.05, x: 1400, y: 1440, w: 220, r: 6, o: 0 },
  ];
  const clipPoses: Pose[] = [
    { t: T.this, x: 360, y: 760, w: 300, r: -28 },
    { t: T.doPaper - 0.05, x: -500, y: 760, w: 300, r: -28, o: 0 },
  ];
  const notebook: Pose[] = [
    { t: T.turn, x: 540, y: 1230, w: 980, r: -1 },
    { t: T.redo - 0.05, x: 540, y: 2400, w: 980, r: -1, o: 0 },
  ];
  const cardPoses: Pose[] = [
    { t: T.turn + 0.05, x: Q4C.x, y: Q4C.y, w: 420, r: 0 },
    { t: T.flashcard - 0.1, x: 560, y: 1260, w: 560, r: -3 },
    { t: T.redo, x: 540, y: 830, w: 360, r: 2 },
    { t: T.three, x: dayAt(4).x, y: dayAt(4).y, w: 96, r: 0 },
    { t: T.week, x: dayAt(11).x, y: dayAt(11).y, w: 96, r: 0 },
    { t: T.thats - 0.05, x: dayAt(11).x, y: dayAt(11).y, w: 96, r: 0, o: 0 },
  ];
  const calPoses: Pose[] = [
    { t: T.redo, ...CAL, r: 0 },
    { t: T.thats - 0.05, x: CAL.x, y: 2400, w: CAL.w, o: 0 },
  ];
  const phonePoses: Pose[] = [
    { t: T.offload + 0.1, x: 540, y: 1160, w: 430, r: -2 },
    { t: T.comment - 0.05, x: 540, y: 2600, w: 430, r: -2, o: 0 },
  ];
  const card2: Pose[] = [
    { t: T.builds + 0.05, x: 860, y: 760, w: 260, r: 8 },
    { t: T.builds + 0.3, x: 540, y: 1100, w: 150, r: 0 },
    { t: T.builds + 0.45, x: 540, y: 1100, w: 120, r: 0, o: 0 },
  ];

  // spacing chart
  const draw = interpolate(t, [T.its, T.sticks + 0.2], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2.2) });
  const chartOn = t > T.spacing - 0.05 && t < T.offload - 0.05;
  const C0 = cell(0, 1, 4, 4);
  const curve = (reviews: number[]) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const u = i / 120;
      const hit = [0, ...reviews].filter((r) => r <= u);
      const v = 0.15 + 0.85 * Math.exp(-(u - hit[hit.length - 1]) * (4.2 / Math.pow(hit.length, 1.8)));
      pts.push(`${(C0.x + 30 + u * (C0.w - 60)).toFixed(1)} ${(C0.y + C0.h - 40 - v * (C0.h - 120)).toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  const typed = Math.floor(interpolate(t, [T.papers, T.papers + 0.45], [0, 6], clamp));

  return (
    <AbsoluteFill style={{ background: tokens.white }}>
      <Grid
        t={t}
        active={[
          { c0: 0, r0: 1, c1: 4, r1: 4, at: 0.15, until: T.doPaper - 0.05 },
          { c0: 3, r0: 3, c1: 4, r1: 4, at: T.mark + 0.05, until: T.ten - 0.05 },
          { c0: 0, r0: 2, c1: 4, r1: 3, at: T.redo, until: T.thats - 0.05 },
          { c0: 0, r0: 1, c1: 4, r1: 4, at: T.spacing, until: T.offload - 0.05 },
          { c0: 1, r0: 1, c1: 3, r1: 4, at: T.offload + 0.1, until: T.comment - 0.05 },
        ]}
      />

      {/* Binge stack + clip */}
      {STACK.map((p, i) => (
        <Obj key={i} src={OBJ(["paper1", "paper2", "paper3", "paper1", "paper2"][i])} aspect={PA} poses={p} t={t} />
      ))}
      <Obj src="assets/paperclip.png" aspect={1600 / 500} poses={clipPoses} t={t} />

      {/* Do a paper, mark it */}
      <Obj src={OBJ("paper2")} aspect={PA} poses={heroPoses} t={t}>
        <svg width="100%" height="100%" viewBox={`0 0 1000 ${VB_H}`} style={{ overflow: "visible" }}>
          {[1, 3].map((n, i) => {
            const b = box("paper2", n);
            return <Cross key={n} frame={frame} fps={fps} at={f(i ? T.feel : T.mark)} cx={(b.x0 + b.x1) / 2 + 300} cy={(b.y0 + b.y1) / 2} size={150} seed={n * 5} />;
          })}
        </svg>
      </Obj>
      <Obj src={OBJ("paper3")} aspect={PA} poses={nextPoses} t={t} />
      <Obj src="assets/calculator.png" aspect={1400 / 2000} poses={calcPoses} t={t} />

      {/* Ten papers later */}
      {Array.from({ length: 10 }, (_, i) => {
        const c = cell(i % 4, 1 + Math.floor(i / 4));
        const poses: Pose[] = [
          { t: T.ten + i * 0.08, x: c.cx, y: c.cy, w: 200, r: ((i * 37) % 7) - 3 },
          { t: T.marks - 0.08, x: c.cx, y: c.cy + 1400, w: 200, o: 0 },
        ];
        return (
          <Obj key={i} src={OBJ(["paper1", "paper2", "paper3"][i % 3])} aspect={PA} poses={poses} t={t}>
            <svg width="100%" height="100%" viewBox={`0 0 1000 ${VB_H}`}>
              <Cross frame={frame} fps={fps} at={f(T.mistakes + i * 0.025)} cx={500} cy={VB_H * (0.3 + (i % 3) * 0.2)} size={360} seed={i * 3 + 1} />
            </svg>
          </Obj>
        );
      })}

      {/* The marks you lost */}
      <Obj src={OBJ("paper2")} aspect={PA} poses={lostPoses} t={t}>
        <svg width="100%" height="100%" viewBox={`0 0 1000 ${VB_H}`} style={{ overflow: "visible" }}>
          {(() => {
            const b = box("paper2", 4);
            return (
              <>
                <Cross frame={frame} fps={fps} at={f(T.marks - 0.05)} cx={(b.x0 + b.x1) / 2 + 300} cy={(b.y0 + b.y1) / 2} size={150} seed={7} />
                <Circle frame={frame} at={f(T.lost)} x0={b.x0 + 10} y0={b.y0 + 10} x1={b.x1 - 10} y1={b.y1 - 10} dur={11} />
              </>
            );
          })()}
        </svg>
      </Obj>

      {/* Flashcard on a spiral notebook, then the calendar */}
      <Obj src="assets/spiral.png" aspect={2400 / 1000} poses={notebook} t={t} />
      <Obj src={OBJ("calendar")} aspect={3240 / 570} poses={calPoses} t={t}>
        <svg width="100%" height="100%" viewBox={`0 0 ${CAL.w} ${calH}`} style={{ overflow: "visible" }}>
          <Tick frame={frame} at={f(T.three + 0.3)} cx={dayAt(4).x - (CAL.x - CAL.w / 2) + 40} cy={46} size={52} colour={tokens.ink} />
          <Tick frame={frame} at={f(T.week + 0.25)} cx={dayAt(11).x - (CAL.x - CAL.w / 2) + 40} cy={46} size={52} colour={tokens.ink} />
        </svg>
      </Obj>
      <Obj src={OBJ("card")} aspect={1500 / 900} poses={cardPoses} t={t} />

      {/* Spacing chart, drawn on the grid */}
      {chartOn ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <clipPath id="zreveal">
              <rect x={C0.x} y={0} width={C0.w * draw} height={1920} />
            </clipPath>
          </defs>
          <g clipPath="url(#zreveal)">
            <path d={curve([])} fill="none" stroke={tokens.problem} strokeWidth={5} strokeDasharray="2 16" strokeLinecap="round" />
            <path d={curve([0.22, 0.55])} fill="none" stroke={tokens.ink} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {[0.22, 0.55].map((r, i) => (draw > r ? <circle key={i} cx={C0.x + 30 + r * (C0.w - 60)} cy={C0.y + C0.h - 40 - (C0.h - 120)} r={12} fill={tokens.ink} /> : null))}
        </svg>
      ) : null}

      {/* Phone */}
      <Obj src={OBJ("phone")} aspect={980 / 2020} poses={phonePoses} t={t}>
        {t > T.deck ? (
          <div style={{ position: "absolute", left: "50%", top: 150, transform: `translateX(-50%) scale(${snapK(t, T.deck, 0.25)})`, padding: "14px 24px", border: `3px solid ${tokens.ink}`, borderRadius: 10, background: tokens.white, fontFamily: INTER, fontWeight: 750, fontSize: 28, letterSpacing: "-0.02em", color: tokens.ink, whiteSpace: "nowrap" }}>
            Remediation deck
          </div>
        ) : null}
      </Obj>
      <Obj src={OBJ("card")} aspect={1500 / 900} poses={card2} t={t} />

      {/* ---- Type: hooks cut in on the frame ---- */}
      {H("Stop doing past papers like this.", 0, T.doPaper - 0.04, { red: ["stop"] })}
      {H("Do a paper.", T.doPaper, T.mark - 0.02)}
      {H("Mark it.", T.mark, T.feel - 0.02)}
      {H("Feel awful.", T.feel, T.next - 0.02, { red: ["awful"] })}
      {H("Next one.", T.next, T.ten - 0.02)}
      {H("Ten papers later.", T.ten, T.same - 0.02)}
      {H("Same mistakes.", T.same, T.marks - 0.02, { red: ["mistakes"] })}
      {H("The marks you lost?", T.marks, T.point - 0.02, { red: ["lost"] })}
      {H("That's the whole point.", T.point, T.turn - 0.02)}
      {H("Turn each one into a flashcard.", T.turn, T.redo - 0.02, { size: 100 })}
      {H("Redo it in three days.", T.redo, T.then - 0.02)}
      {H("Then in a week.", T.then, T.thats - 0.02)}
      {H("Spacing.", T.spacing, T.offload - 0.04, { size: 230 })}
      <Kinetic frame={frame} fps={fps} font={INTER} y={430} size={58} weight={600} align="left" colour={tokens.quiet} out={T.offload - 0.04} exit="cut" parts={"It's how memory actually sticks.".split(" ").map((w) => ({ text: w, t: at("L7", w.replace(/[^A-Za-z']/g, "")), fx: "mask" as const }))} />

      {/* ---- Offload: the wordmark draws itself ---- */}
      {t < T.comment - 0.05 ? <Wordmark t={t} at={T.offload} x={M + 30} y={300} width={560} align="left" /> : null}
      <Kinetic frame={frame} fps={fps} font={INTER} y={460} size={52} weight={600} align="left" colour={tokens.ink} out={T.comment - 0.05} exit="cut" parts={["builds", "you", "a", "remediation", "deck"].map((w) => ({ text: w, t: at("L8", w), fx: "mask" as const }))} />

      {/* ---- Comment ---- */}
      {H("Comment", T.comment, T.end + 1, { y: 640, size: 130 })}
      {t >= T.papers - 0.2 ? (
        <div style={{ position: "absolute", left: M + 16, top: 820, width: 1080 - 2 * M - 32, height: 240, border: `4px solid ${tokens.ink}`, borderRadius: 12, background: tokens.white, display: "flex", alignItems: "center", paddingLeft: 50, fontFamily: INTER, fontWeight: 850, fontSize: 170, letterSpacing: "-0.05em", color: tokens.ink, boxShadow: "0px 8px 16px rgba(0,0,0,0.15)", transform: `scale(${0.96 + 0.04 * snapK(t, T.papers - 0.2, 0.25)})`, opacity: snapK(t, T.papers - 0.2, 0.15) }}>
          {"PAPERS".slice(0, typed)}
          <span style={{ fontWeight: 300, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
        </div>
      ) : null}
      <Wordmark t={t} at={T.papers + 0.55} x={540} y={1240} width={520} />
      <Kinetic frame={frame} fps={fps} font={INTER} y={1420} size={54} weight={600} colour={tokens.quiet} out={T.end + 1} parts={"and I'll send you the method.".split(" ").map((w) => ({ text: w, t: at("L9", w.replace(/[^A-Za-z']/g, "")), fx: "mask" as const }))} />

      <Audio src={staticFile("world/past-papers/vo.wav")} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={Math.max(0, f(c.t))} durationInFrames={f(1.5)} layout="none" name={`sfx ${c.s}`}>
          <Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
