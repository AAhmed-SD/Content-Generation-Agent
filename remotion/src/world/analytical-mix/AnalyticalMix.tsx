import { tokens } from "../../tokens";
import { alpha, DocCard, Flood, INTER, makeTiming, POP, S0, Shell, track, useK, type Cue , type Cam } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { Chart, PillOrbit, pillCues, Face, Label, Source, Type, phraseStarts } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import timing from "./timing.json";

/** Analytical: "You can follow every worked example and still freeze on the problem sheet." Feynman, then exam-style questions. */
const { ls, at, duration } = makeTiming(timing);

const T = {
  l2: ls("L2"),

  follow: at("L1", "follow"),
  freeze: at("L1", "freeze"),
  sheet: at("L1", "sheet"),
  recog: at("L2", "recognising"),
  isnt: at("L2", "isn't"),
  use: at("L2", "use"),
  l3: ls("L3"),
  rereading: at("L3", "rereading"),
  but: at("L3", "but"),
  week: at("L3", "week"),
  tested: at("L3", "tested"),
  more: at("L3", "more"),
  testing: at("L3", "testing"),
  effect: at("L3", "effect"),
  so: ls("L4"),
  offload: at("L4", "offload"),
  feynman: ls("L5"),
  exam: at("L5", "exam-style"),
  notes: at("L5", "notes"),
  end: ls("L6") - 0.1,
  link: at("L6", "link"),
};

const STEPS = ["Set up the problem", "Pick the method", "Work it through", "Check the answer"];

const CUES: Cue[] = [
  ...pillCues(T.so, T.offload),
  ...logoCues(T.end),
  { t: 0, s: "boom", v: 0.32 },
  ...STEPS.map((_, i) => ({ t: T.follow + 0.3 + i * 0.32, s: "tick", v: 0.24 })),
  { t: T.freeze - 0.1, s: "swoosh_down", v: 0.26 },
  { t: T.freeze, s: "glass", v: 0.32 },
  { t: T.sheet, s: "thud", v: 0.26 },
  { t: T.recog, s: "pop", v: 0.24 },
  { t: T.isnt, s: "stamp", v: 0.36 },
  { t: T.l2 - 0.14, s: "iris", v: 0.32 },
  { t: T.freeze, s: "boom", v: 0.3 },
  { t: T.so - 0.2, s: "iris", v: 0.26 },
  { t: T.use, s: "pop_low", v: 0.26 },
  { t: T.l3 - 0.1, s: "whip", v: 0.22 },
  { t: T.rereading, s: "swish", v: 0.22 },
  { t: T.week, s: "whoosh", v: 0.22 },
  { t: T.more, s: "chime", v: 0.18 },
  { t: T.testing - 0.05, s: "impact", v: 0.3 },
  { t: T.testing, s: "boom", v: 0.28 },
  { t: T.effect, s: "pop", v: 0.24 },
  { t: T.offload - 0.2, s: "riser", v: 0.14 },
  { t: T.offload, s: "sparkle", v: 0.26 },
  { t: T.feynman, s: "swish", v: 0.24 },
  ...Array.from({ length: 8 }, (_, i) => ({ t: T.feynman + 0.4 + i * 0.09, s: "key", v: 0.14 })),
  { t: T.exam, s: "pop", v: 0.26 },
];

export const AnalyticalMix: React.FC = () => {
  const { frame, fps, t, sp } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 880, z: 1.18, r: -1 },
    { t: T.follow + 0.4, x: 540, y: 1080, z: 1.12, r: 0 },
    { t: T.freeze - 0.15, x: 640, y: 1000, z: 1.04, r: 1.5, c: { damping: 200, stiffness: 220, mass: 0.5 } },
    { t: T.sheet - 0.05, x: 540, y: 1000, z: 1.28, r: 0, c: { damping: 14, stiffness: 260, mass: 0.6 } },
    { t: T.recog - 0.2, x: 540, y: 960, z: 1 },
    { t: T.feynman - 0.1, x: 540, y: 960, z: 1.16 },
    { t: T.exam - 0.15, x: 540, y: 1100, z: 1.04 },
    { t: T.end - 0.2, x: 540, y: 960, z: 1 },
  ];

  const lecture = track(frame, fps, S0({ y: 1060, s: 0.92 }), [
    { t: 0, v: { o: 1, s: 1 }, c: POP },
    { t: T.freeze - 0.12, v: { x: -400, r: -10, o: 0 }, c: { damping: 200, stiffness: 240, mass: 0.6 } },
  ]);
  const sheet = track(frame, fps, S0({ x: 1500, y: 1060, r: 8 }), [
    { t: T.freeze - 0.12, v: { x: 540, r: 0, o: 1 }, c: { damping: 200, stiffness: 240, mass: 0.6 } },
    { t: T.recog - 0.15, v: { y: 760, o: 0, b: 14 } },
  ]);
  const shake = t > T.sheet && t < T.sheet + 0.5 ? Math.sin(t * 70) * 10 * (1 - (t - T.sheet) / 0.5) : 0;




  const fk = sp(T.feynman - 0.05, POP);
  const ek = sp(T.exam - 0.1, POP);
  const prompt = "Explain the method in your own words";
  const typed = Math.floor(Math.max(0, Math.min(1, (t - T.feynman - 0.4) / 0.8)) * prompt.length);
  const lift = t < T.exam - 0.1 ? 0 : sp(T.exam - 0.1);

  return (
    <Shell ticks={phraseStarts(timing, 9)} cam={CAM} overlay={
        <>
        {/* hero: freeze */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={190} size={240} weight={850} out={T.l2 - 0.16} exit="scale" parts={[{ text: "Freeze.", t: T.freeze - 0.05, fx: "shake" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={430} size={66} weight={700} out={T.l2 - 0.16} exit="scale" parts={[{ text: "on", t: at("L1", "on"), fx: "mask" }, { text: "the", t: at("L1", "the", 2), fx: "mask" }, { text: "problem", t: at("L1", "problem"), fx: "mask" }, { text: "sheet.", t: T.sheet, fx: "mask" }]} />
  
        {/* hero: recognising is not using, with the diagram */}
        <Flood colour={tokens.night} inAt={T.l2 - 0.14} from={{ x: 540, y: 1000 }} outAt={T.so - 0.2} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={190} size={130} weight={850} align="left" out={T.l3 - 0.05} exit="left" parts={[{ text: "Recognising", t: T.recog, fx: "track" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={340} size={130} weight={850} align="left" out={T.l3 - 0.05} exit="left" parts={[{ text: "≠", t: T.isnt, fx: "slam" }, { text: "using.", t: T.use, fx: "slam" }]} />
          <Chart
            axis={tokens.white}
            draw={[T.recog + 0.15, T.use - 0.2]}
            out={T.l3 - 0.1}
            box={{ x0: 130, x1: 950, y0: 720, y1: 1330 }}
            xLabel="Worked examples watched"
            series={[
              { f: (u) => 0.12 + 0.76 * (1 - Math.exp(-3.2 * u)), colour: tokens.white, label: "Feels like you get it", labelU: 1, labelDy: -36 },
              { f: (u) => 0.1 + 0.07 * u, colour: tokens.problem, width: 8, dash: "2 20", label: "Can do it alone", labelU: 1, labelDy: -34 },
            ]}
          />
  
          {/* the testing effect */}
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={60} weight={700} align="left" out={at("L3", "the", 3) - 0.12} exit="cut" parts={[{ text: "There's", t: T.l3, fx: "mask" }, { text: "research", t: at("L3", "research"), fx: "mask", deco: "marker", decoColour: alpha(tokens.blue, 0.25), decoAt: at("L3", "research") + 0.2 }, { text: "on", t: at("L3", "on"), fx: "mask" }, { text: "this.", t: at("L3", "this"), fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={270} size={84} weight={800} align="left" out={at("L3", "the", 3) - 0.12} exit="left" parts={[{ text: "Rereading", t: T.rereading, fx: "track", colour: tokens.problem }, { text: "feels", t: at("L3", "feels"), fx: "mask" }, { text: "better", t: at("L3", "better"), fx: "mask" }, { text: "on", t: at("L3", "on", 2), fx: "mask" }, { text: "the", t: at("L3", "the"), fx: "mask" }, { text: "day.", t: at("L3", "day"), fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={470} size={84} weight={800} align="left" out={at("L3", "the", 3) - 0.12} exit="left" parts={[{ text: "A", t: at("L3", "a"), fx: "mask" }, { text: "week", t: T.week, fx: "mask" }, { text: "later,", t: at("L3", "later"), fx: "mask" }, { text: "testing", t: T.tested, fx: "slam", colour: tokens.blue }, { text: "wins.", t: T.more, fx: "slam", colour: tokens.blue }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={150} weight={850} align="left" out={T.so} exit="cut" parts={[{ text: "The", t: at("L3", "the", 3), fx: "mask" }, { text: "testing", t: T.testing, fx: "track", colour: tokens.blue }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={330} size={150} weight={850} align="left" out={T.so} exit="cut" parts={[{ text: "effect.", t: T.effect, fx: "slam" }]} />
          <Chart
            axis={tokens.white}
            draw={[T.rereading + 0.1, T.more + 0.2]}
            box={{ x0: 130, x1: 950, y0: 760, y1: 1330 }}
            yLabel="Remembered"
            ticks={[{ u: 0, label: "On the day" }, { u: 1, label: "A week later" }]}
            series={[
              { f: (u) => 0.81 - 0.39 * u, colour: tokens.problem, width: 8, dash: "2 20", label: "Reread", labelU: 1, labelDy: 56 },
              { f: (u) => 0.75 - 0.19 * u, colour: tokens.white, label: "Tested yourself", labelU: 1, labelDy: -52 },
            ]}
            dots={[{ u: 0, s: 0 }, { u: 0, s: 1 }, { u: 0.995, s: 0 }, { u: 0.995, s: 1 }]}
          />
          <Source dark at={T.effect} out={T.so - 0.3} text="Roediger & Karpicke, 2006" y={1500} />
        </Flood>
        {/* reveal: pill, swipe, orbit */}
        <PillOrbit appear={T.so} press={T.offload} until={T.feynman - 0.15} sub="makes you do." />
        <Type timing={timing} hook={9} gaps={[[T.freeze - 0.1, T.l2 - 0.16], [T.l2 - 0.14, T.so - 0.1], [T.so - 0.05, T.feynman - 0.1]]} until={T.end} hi={{ freeze: tokens.problem, isnt: tokens.problem, "isn't": tokens.problem, cold: tokens.blue, own: tokens.blue }} />
        <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" />
  
        </>
      } vo="world/analytical-mix/vo.wav" cues={CUES} punches={[[0.02, 0.025], [T.freeze, 0.03], [T.isnt, 0.02]]}>
      <DocCard
        s={lecture}
        w={900}
        h={700}
        title="Worked example"
        sub="Lecture"
        rows={STEPS.map((l, i) => ({ label: l, check: true, tick: T.follow + 0.3 + i * 0.32 }))}
      />
      <DocCard s={{ ...sheet, x: sheet.x + shake }} w={900} h={700} title="Problem sheet" sub="On your own" tint={{ at: T.freeze, colour: tokens.problem }} rows={[{ h: 150 }, { h: 150 }, { h: 150 }]} />




      <Face x={540} y={mix(1000, 870, lift)} w={900} h={420} k={fk * (t > T.end ? 0 : 1)} r={0}>
        <div style={{ padding: "44px 50px" }}>
          <Label size={26} colour={tokens.blue}>FEYNMAN PROMPT</Label>
          <div style={{ height: 22 }} />
          <Label size={58}>{prompt.slice(0, typed)}</Label>
          <div style={{ marginTop: 34, height: 4, width: 640, background: alpha(tokens.ink, 0.12), borderRadius: 2 }} />
          <div style={{ marginTop: 50, height: 4, width: 520, background: alpha(tokens.ink, 0.12), borderRadius: 2 }} />
        </div>
      </Face>
      <Face x={540} y={1360} w={900} h={300} k={ek * (t > T.end ? 0 : 1)}>
        <div style={{ padding: "44px 50px" }}>
          <Label size={26} colour={tokens.blue}>EXAM-STYLE QUESTION</Label>
          <div style={{ height: 22 }} />
          <Label size={48}>Built from your module notes</Label>
        </div>
      </Face>



    </Shell>
  );
};

const mix = (a: number, b: number, k: number) => a + (b - a) * k;

export const ANALYTICAL_DURATION_S = Math.max(duration, T.end + 4.4);
