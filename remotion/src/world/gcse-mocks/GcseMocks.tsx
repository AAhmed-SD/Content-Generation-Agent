import { tokens } from "../../tokens";
import { alpha, DocCard, Flood, INTER, makeTiming, POP, S0, ScreenClip, Shell, track, useK, WeekStrip, type Block, type Cue , type Cam } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { Chart, PillOrbit, pillCues, forget, Source, Type, phraseStarts } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import timing from "./timing.json";

/** GCSE: "Your revision timetable doesn't fail because you're lazy. It fails because paper can't move." */
const { ls, at, duration } = makeTiming(timing);

const T = {
  it1: at("L1", "it"),

  timetable: at("L1", "timetable"),
  lazy: at("L1", "lazy"),
  fails: at("L1", "fails"),
  paper: at("L1", "paper"),
  move: at("L1", "move"),
  one: ls("L2"),
  wrong: at("L2", "wrong"),
  date: at("L2", "date"),
  sunday: at("L2", "sunday"),
  again: at("L2", "again"),
  cram: ls("L3"),
  cramming: at("L3", "cramming"),
  either: at("L3", "either"),
  spreading: at("L3", "spreading"),
  beats: at("L3", "beats"),
  spacing: at("L3", "spacing"),
  century: at("L3", "century"),
  offload: ls("L4"),
  download: at("L4", "download"),
  upload: at("L4", "upload"),
  dates: at("L4", "dates"),
  builds: at("L4", "builds"),
  miss: ls("L5"),
  moved: at("L5", "moved"),
  end: ls("L6") - 0.1,
  search: at("L6", "offload"),
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SUBJ = ["Bio", "Maths", "Eng", "Chem", "Hist"];

const CUES: Cue[] = [
  ...pillCues(T.offload - 0.3, T.offload),
  ...logoCues(T.end),
  { t: 0, s: "boom", v: 0.3 },
  { t: 0.05, s: "paper_land", v: 0.3 },
  { t: T.lazy, s: "stamp", v: 0.38 },
  { t: T.fails, s: "scribble", v: 0.3 },
  { t: T.move, s: "thud", v: 0.3 },
  { t: T.one - 0.1, s: "whoosh", v: 0.2 },
  { t: T.wrong, s: "swoosh_down", v: 0.26 },
  { t: T.wrong + 0.1, s: "thud", v: 0.26 },
  ...[0, 1, 2, 3].map((i) => ({ t: T.date + i * 0.07, s: "tick", v: 0.16 })),
  { t: T.again, s: "rewind", v: 0.22 },
  { t: T.it1 - 0.03, s: "whoosh", v: 0.2 },
  { t: T.paper, s: "impact", v: 0.26 },
  { t: T.one - 0.09, s: "iris", v: 0.3 },
  { t: T.sunday - 0.14, s: "iris", v: 0.3 },
  { t: T.sunday, s: "boom", v: 0.3 },
  { t: T.cram - 0.15, s: "iris", v: 0.3 },
  { t: T.cramming, s: "thud", v: 0.26 },
  { t: T.spreading, s: "whoosh", v: 0.22 },
  { t: T.spacing - 0.05, s: "impact", v: 0.3 },
  { t: T.spacing, s: "boom", v: 0.28 },
  { t: T.century, s: "pop", v: 0.24 },
  { t: T.offload - 0.25, s: "iris", v: 0.26 },
  { t: T.download, s: "swish", v: 0.24 },
  { t: T.upload, s: "whoosh", v: 0.24 },
  { t: T.dates, s: "pop", v: 0.24 },
  ...Array.from({ length: 8 }, (_, i) => ({ t: T.builds + i * 0.07, s: "pop_low", v: 0.14 })),
  { t: T.miss - 0.1, s: "glass", v: 0.22 },
  { t: T.moved, s: "ding", v: 0.18 },
];

export const GcseMocks: React.FC = () => {
  const { frame, fps, t } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 1090, z: 1.16, r: -1.5 },
    { t: T.lazy - 0.15, x: 650, y: 1150, z: 1.36, r: 0 },
    { t: T.fails, x: 600, y: 1120, z: 1.22 },
    { t: T.paper - 0.1, x: 540, y: 1090, z: 1.0, c: { damping: 200, stiffness: 200, mass: 0.6 } },
    { t: T.one - 0.1, x: 540, y: 960, z: 1 },
    { t: T.download - 0.2, x: 540, y: 900, z: 1.16 },
    { t: T.upload, x: 540, y: 820, z: 1.1 },
    { t: T.dates - 0.2, x: 540, y: 1100, z: 1.08 },
    { t: T.builds - 0.1, x: 540, y: 1050, z: 1.0 },
    { t: T.builds + 0.6, x: 540, y: 1050, z: 1.14 },
    { t: T.miss - 0.15, x: 540, y: 1060, z: 1.04 },
    { t: T.end - 0.2, x: 540, y: 960, z: 1 },
  ];

  const paper = track(frame, fps, S0({ y: 1170, s: 0.92, r: -3 }), [
    { t: 0, v: { o: 1, s: 1, r: -2 }, c: POP },
    { t: T.one - 0.1, v: { y: 2300, r: 8, o: 0 }, c: { damping: 200, stiffness: 200, mass: 0.6 } },
  ]);
  const shake = t > T.move && t < T.move + 0.55 ? Math.sin(t * 60) * 12 * (1 - (t - T.move) / 0.55) : 0;

  const spec = track(frame, fps, S0({ y: 900, s: 0.9 }), [
    { t: T.download - 0.1, v: { o: 1, s: 1 }, c: POP },
    { t: T.upload, v: { y: 760, s: 0.62 } },
    { t: T.builds - 0.1, v: { o: 0, b: 14, y: 620 } },
  ]);
  const dates = track(frame, fps, S0({ y: 1320, s: 0.8 }), [
    { t: T.dates - 0.15, v: { o: 1, s: 1, y: 1180 }, c: POP },
    { t: T.builds - 0.1, v: { o: 0, b: 14 } },
  ]);
  const plan = track(frame, fps, S0({ y: 1050 }), [
    { t: T.builds - 0.05, v: { o: 1 } },
    { t: T.miss - 0.15, v: { o: 0, b: 16 } },
  ]);
  const built: Block[] = Array.from({ length: 10 }, (_, i) => ({ day: i % 5, slot: Math.floor(i / 5), label: SUBJ[(i * 2) % 5], tone: "white" as const, at: T.builds + i * 0.07 }));

  const clip = track(frame, fps, S0({ y: 2400, s: 0.95 }), [
    { t: T.miss - 0.1, v: { y: 1180, o: 1, s: 1 }, c: { damping: 200, stiffness: 180, mass: 0.7 } },
    { t: T.end - 0.1, v: { s: 2.5, o: 0, b: 30 } },
  ]);

  return (
    <Shell ticks={phraseStarts(timing, 5)} cam={CAM} overlay={
        <>
        {/* hero: paper can't move */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={78} weight={700} align="left" out={T.one - 0.12} exit="left" parts={[{ text: "It", t: at("L1", "it"), fx: "mask" }, { text: "fails", t: T.fails, fx: "mask" }, { text: "because", t: at("L1", "because", 2), fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={270} size={150} weight={850} align="left" out={T.one - 0.12} exit="left" parts={[{ text: "paper", t: T.paper, fx: "drop" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={420} size={130} weight={850} align="left" out={T.one - 0.12} exit="left" parts={[{ text: "can't", t: at("L1", "can't"), fx: "slam" }, { text: "move.", t: T.move, fx: "shake" }]} />
  
        {/* hero: the plan vs what happened */}
        <Flood colour={tokens.night} inAt={T.one - 0.09} from={{ x: 540, y: 1100 }} outAt={T.sunday - 0.11}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={190} size={72} weight={800} align="left" out={T.sunday + 0.24} exit="cut" parts={[{ text: "One", t: T.one, fx: "mask" }, { text: "evening", t: at("L2", "evening"), fx: "mask" }, { text: "goes", t: at("L2", "goes"), fx: "mask" }, { text: "wrong,", t: T.wrong, fx: "mask", colour: tokens.problem }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={285} size={72} weight={800} align="left" out={T.sunday + 0.24} exit="cut" parts={[{ text: "the", t: at("L2", "the"), fx: "mask" }, { text: "whole", t: at("L2", "whole"), fx: "mask" }, { text: "week's", t: at("L2", "week's"), fx: "mask" }, { text: "out", t: at("L2", "out"), fx: "mask", colour: tokens.problem }, { text: "of", t: at("L2", "of"), fx: "mask", colour: tokens.problem }, { text: "date.", t: T.date, fx: "mask", colour: tokens.problem }]} />
          <Chart
            axis={tokens.white}
            draw={[T.one + 0.23, T.date + 0.13]}
            box={{ x0: 130, x1: 950, y0: 720, y1: 1330 }}
            xLabel="Your week"
            yLabel="Revision done"
            series={[
              { f: (u) => 0.08 + 0.82 * u, colour: alpha(tokens.white, 0.4), width: 8, dash: "2 20", label: "The plan", labelU: 0.92, labelDy: -40 },
              { f: (u) => 0.08 + 0.82 * Math.min(u, 0.32) - (u > 0.32 ? 0.05 * Math.min(1, (u - 0.32) * 8) : 0), colour: tokens.problem, label: "What happened", labelU: 1, labelDy: -30 },
            ]}
            dots={[{ u: 0.32, s: 1, label: "Missed evening" }]}
          />
        </Flood>
        {/* hero: start again, red flood */}
        <Flood colour={tokens.problem} inAt={T.sunday - 0.14} from={{ x: 540, y: 1000 }} outAt={T.cram - 0.11} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={600} size={96} weight={750} out={T.cram + 0.17} exit="cut" parts={[{ text: "Sunday.", t: T.sunday, fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={740} size={220} weight={850} out={T.cram + 0.17} exit="cut" parts={[{ text: "Start", t: at("L2", "start"), fx: "slam" }, { text: "again.", t: T.again, fx: "slam" }]} />
        </Flood>
        {/* science: cramming vs spacing */}
        <Flood colour={tokens.night} inAt={T.cram - 0.15} from={{ x: 540, y: 1000 }} outAt={T.offload - 0.25} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={180} size={80} weight={800} align="left" out={T.spreading - 0.1} exit="left" parts={[{ text: "Cramming", t: T.cramming, fx: "track", colour: tokens.problem }, { text: "it", t: at("L3", "it"), fx: "mask" }, { text: "all", t: at("L3", "all"), fx: "mask" }, { text: "back", t: at("L3", "back"), fx: "mask" }, { text: "in", t: at("L3", "in"), fx: "mask" }, { text: "on", t: at("L3", "on"), fx: "mask" }, { text: "Sunday", t: at("L3", "sunday"), fx: "mask" }, { text: "doesn't", t: at("L3", "doesn't"), fx: "mask" }, { text: "work", t: at("L3", "work"), fx: "mask" }, { text: "either.", t: T.either, fx: "slam", colour: tokens.problem }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={180} size={92} weight={800} align="left" out={T.spacing - 0.1} exit="left" parts={[{ text: "Spread", t: T.spreading, fx: "mask" }, { text: "it", t: T.spreading + 0.15, fx: "mask" }, { text: "out.", t: at("L3", "out"), fx: "mask" }, { text: "It", t: at("L3", "beats") - 0.1, fx: "mask" }, { text: "beats", t: T.beats, fx: "slam", colour: tokens.blue }, { text: "cramming.", t: at("L3", "cramming", 2), fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={210} weight={850} out={T.offload} exit="cut" parts={[{ text: "Spacing.", t: T.spacing - 0.05, fx: "track" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={420} size={56} weight={650} out={T.offload} exit="cut" parts={[{ text: "The", t: at("L3", "the"), fx: "rise" }, { text: "research", t: at("L3", "research"), fx: "rise" }, { text: "goes", t: at("L3", "goes"), fx: "rise" }, { text: "back", t: at("L3", "back", 2), fx: "rise" }, { text: "over", t: at("L3", "over"), fx: "rise" }, { text: "a", t: at("L3", "a", 3), fx: "rise" }, { text: "century.", t: T.century, fx: "pop", deco: "underline", decoAt: T.century + 0.3 }]} />
          <Chart
            axis={tokens.white}
            draw={[T.cramming + 0.2, T.beats + 0.6]}
            box={{ x0: 130, x1: 950, y0: 720, y1: 1330 }}
            xLabel="Weeks to the exam"
            yLabel="Remembered"
            series={[
              { f: (u) => (u < 0.06 ? 0.12 + u * 12 : forget([])(u - 0.06)), colour: tokens.problem, width: 8, dash: "2 20", label: "Crammed", labelU: 1, labelDy: 52 },
              { f: forget([0.25, 0.5, 0.75]), colour: tokens.white, label: "Spaced out", labelU: 1, labelDy: -40 },
            ]}
            dots={[{ u: 0.25, s: 1 }, { u: 0.5, s: 1 }, { u: 0.75, s: 1 }]}
          />
          <Source dark at={T.century} out={T.offload - 0.4} text="Ebbinghaus, 1885 · Cepeda et al., 2006" y={1500} />
        </Flood>
        {/* reveal: pill, swipe, orbit */}
        <PillOrbit appear={T.offload - 0.3} press={T.offload} until={T.download - 0.15} sub="works differently." />
        <Type timing={timing} hook={5} gaps={[[T.it1 - 0.08, T.one - 0.07], [T.one - 0.09, T.sunday - 0.11], [T.sunday - 0.14, T.cram - 0.15], [T.cram - 0.15, T.offload - 0.2], [T.offload - 0.2, T.download - 0.1]]} until={T.end} hi={{ lazy: tokens.problem, move: tokens.problem, wrong: tokens.problem, again: tokens.problem, spec: tokens.blue }} />
        <LogoEnd at={T.end} lead="Want to try it?" pill="Search Offload" />
  
        </>
      } vo="world/gcse-mocks/vo.wav" cues={CUES} punches={[[0.02, 0.025], [T.lazy, 0.02], [T.move, 0.025], [T.wrong, 0.02]]}>
      <DocCard
        s={{ ...paper, x: paper.x + shake }}
        w={880}
        h={820}
        title="Revision timetable"
        sub="Up to mocks"
        rows={SUBJ.map((s, i) => ({ label: ["Biology", "Maths", "English Lit", "Chemistry", "History"][i], chip: DAYS[i], chipTone: "grey" as const }))}
        stamp={{ text: "lazy", at: T.lazy, x: 560, y: 470, size: 150, rot: -8, strikeAt: T.fails }}
        tint={{ at: T.move, colour: tokens.problem }}
      />

      <DocCard s={spec} w={880} h={560} title="Your specification" sub="Exam board PDF" rows={[{ label: "Subject content", h: 90 }, { label: "Assessment", h: 90 }, { h: 90 }]} />
      <DocCard s={dates} w={880} h={340} title="Exam dates" sub="You add them" rows={[{ label: "Mocks", chip: "Set" }, { label: "Summer exams", chip: "Set" }]} />
      <WeekStrip s={plan} days={DAYS.slice(0, 5)} blocks={built} tileH={380} title="Your plan" />

      <ScreenClip s={clip} src="rec/reschedule-b.mp4" at={T.miss} until={T.end - 0.1} clipLen={5.77} />






    </Shell>
  );
};

export const GCSE_DURATION_S = Math.max(duration, T.end + 4.4);
