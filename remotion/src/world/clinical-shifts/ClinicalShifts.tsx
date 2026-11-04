import { tokens } from "../../tokens";
import { DocCard, Flood, INTER, makeTiming, POP, S0, ScreenClip, Shell, track, useK, WeekStrip, type Block, type Cue, type Cam } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { PillOrbit, pillCues, Type, phraseStarts } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import timing from "./timing.json";

/** Clinical: "Twelve-hour shift, then two hours of revision? That plan was never going to work."
 *  One pain (placement shifts), two LIVE features: plans around Google Calendar busy time, missed-session recovery. */
const { ls, at, duration } = makeTiming(timing);

const T = {
  twelve: ls("L1"),
  shift: at("L1", "shift"),
  revision: at("L1", "revision"),
  that: at("L1", "that"),
  never: at("L1", "never"),
  work: at("L1", "work"),
  home: ls("L2"),
  skip: at("L2", "skip"),
  friday: at("L2", "friday"),
  behind: at("L2", "behind"),
  offload: ls("L3"),
  shifts: at("L3", "shifts"),
  lectures: at("L3", "lectures"),
  placements: at("L3", "placements"),
  google: at("L3", "google"),
  puts: ls("L4"),
  every: at("L4", "every"),
  free: at("L4", "free"),
  left: at("L4", "left"),
  miss: ls("L5"),
  moved: at("L5", "moved", 2),
  end: ls("L6") - 0.1,
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SHIFT_DAYS = [0, 1, 3];

const CUES: Cue[] = [
  ...pillCues(T.offload - 0.2, T.offload),
  ...logoCues(T.end),
  { t: 0, s: "boom", v: 0.32 },
  ...SHIFT_DAYS.map((_, i) => ({ t: T.twelve + 0.1 + i * 0.1, s: "paper_land", v: 0.22 })),
  { t: T.shift, s: "thud", v: 0.28 },
  ...SHIFT_DAYS.map((_, i) => ({ t: T.revision + i * 0.08, s: "pop_low", v: 0.16 })),
  { t: T.that - 0.08, s: "whip", v: 0.22 },
  { t: T.never, s: "stamp", v: 0.36 },
  ...SHIFT_DAYS.map((_, i) => ({ t: T.never + 0.05 + i * 0.09, s: "swoosh_down", v: 0.2 })),
  { t: T.work, s: "boom", v: 0.3 },
  { t: T.home - 0.1, s: "whoosh", v: 0.2 },
  { t: T.skip, s: "buzz", v: 0.2 },
  { t: T.friday - 0.14, s: "iris", v: 0.32 },
  { t: T.friday, s: "impact", v: 0.3 },
  { t: T.behind, s: "boom", v: 0.34 },
  { t: T.shifts - 0.2, s: "paper_land", v: 0.28 },
  ...[T.shifts, T.lectures, T.placements].map((x) => ({ t: x, s: "pop", v: 0.22 })),
  { t: T.google, s: "ding", v: 0.2 },
  { t: T.puts - 0.15, s: "whoosh", v: 0.2 },
  ...[0, 1, 2].map((i) => ({ t: T.free + i * 0.12, s: "pop", v: 0.24 })),
  { t: T.left, s: "sparkle", v: 0.2 },
  { t: T.miss - 0.1, s: "glass", v: 0.22 },
  { t: T.moved, s: "ding", v: 0.18 },
];

export const ClinicalShifts: React.FC = () => {
  const { frame, fps } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 1080, z: 1.16, r: -1 },
    { t: T.revision - 0.1, x: 540, y: 1120, z: 1.08, r: 0 },
    { t: T.never - 0.1, x: 560, y: 1160, z: 1.24, r: 1 },
    { t: T.home - 0.1, x: 540, y: 1060, z: 1.04, r: 0 },
    { t: T.offload - 0.1, x: 540, y: 960, z: 1.0, c: { damping: 200, stiffness: 160, mass: 0.6 } },
    { t: T.shifts - 0.3, x: 540, y: 900, z: 1.12 },
    { t: T.google - 0.1, x: 540, y: 860, z: 1.18 },
    { t: T.puts - 0.2, x: 540, y: 1080, z: 1.02 },
    { t: T.free, x: 560, y: 1100, z: 1.14 },
    { t: T.miss - 0.15, x: 540, y: 1060, z: 1.04 },
    { t: T.end - 0.2, x: 540, y: 960, z: 1, c: { damping: 200, stiffness: 200, mass: 0.6 } },
  ];

  // the week as it was planned: shifts, with revision stacked on top, which falls off
  const planned = track(frame, fps, S0({ y: 1100 }), [
    { t: 0, v: { o: 1 } },
    { t: T.friday - 0.14, v: { o: 0, b: 16 } },
  ]);
  const before: Block[] = [
    ...SHIFT_DAYS.map((d, i) => ({ day: d, slot: 0, label: "Shift", tone: "kraft" as const, at: T.twelve + 0.1 + i * 0.1 })),
    { day: 2, slot: 0, label: "Lecture", tone: "card" as const, at: T.twelve + 0.4 },
    { day: 4, slot: 0, label: "Lecture", tone: "card" as const, at: T.twelve + 0.48 },
    ...SHIFT_DAYS.map((d, i) => ({ day: d, slot: 1, label: "Revise", tone: "white" as const, at: T.revision + i * 0.08, fall: T.never + 0.05 + i * 0.09 })),
  ];

  // Google Calendar, connected
  const cal = track(frame, fps, S0({ y: 980, s: 0.9 }), [
    { t: T.shifts - 0.25, v: { o: 1, s: 1 }, c: POP },
    { t: T.puts - 0.15, v: { o: 0, y: 760, b: 14 } },
  ]);

  // the same week, planned around what's already there
  const week = track(frame, fps, S0({ y: 1100 }), [
    { t: T.puts - 0.15, v: { o: 1 } },
    { t: T.miss - 0.15, v: { o: 0, b: 16 } },
  ]);
  const after: Block[] = [
    ...SHIFT_DAYS.map((d, i) => ({ day: d, slot: 0, label: "Shift", tone: "kraft" as const, at: T.puts - 0.1 + i * 0.05 })),
    { day: 2, slot: 0, label: "Lecture", tone: "card" as const, at: T.puts + 0.05 },
    { day: 4, slot: 0, label: "Placement", tone: "card" as const, at: T.puts + 0.1 },
    { day: 2, slot: 1, label: "Study", tone: "white" as const, at: T.free },
    { day: 4, slot: 1, label: "Study", tone: "white" as const, at: T.free + 0.12 },
    { day: 2, slot: 2, label: "Review", tone: "white" as const, at: T.free + 0.24 },
  ];

  const clip = track(frame, fps, S0({ y: 2400, s: 0.95 }), [
    { t: T.miss - 0.1, v: { y: 1180, o: 1, s: 1 }, c: { damping: 200, stiffness: 180, mass: 0.7 } },
    { t: T.end - 0.1, v: { s: 2.5, o: 0, b: 30 } },
  ]);

  return (
    <Shell ticks={phraseStarts(timing, 6)} cam={CAM} overlay={
        <>
        {/* hero: never going to work */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={92} weight={800} align="left" out={T.home - 0.12} exit="left" parts={[{ text: "That", t: T.that, fx: "mask" }, { text: "plan", t: at("L1", "plan"), fx: "mask" }, { text: "was", t: at("L1", "was"), fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={290} size={150} weight={850} align="left" out={T.home - 0.12} exit="left" parts={[{ text: "never", t: T.never, fx: "slam" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={440} size={96} weight={800} align="left" out={T.home - 0.12} exit="left" parts={[{ text: "going", t: at("L1", "going"), fx: "mask" }, { text: "to", t: at("L1", "to"), fx: "mask" }, { text: "work.", t: T.work, fx: "shake" }]} />

        {/* hero: by Friday, behind. Red flood */}
        <Flood colour={tokens.problem} inAt={T.friday - 0.14} from={{ x: 540, y: 1000 }} outAt={T.offload - 0.2} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={600} size={110} weight={750} out={T.offload - 0.05} exit="cut" parts={[{ text: "By", t: at("L2", "by"), fx: "mask" }, { text: "Friday,", t: T.friday, fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={760} size={200} weight={850} out={T.offload - 0.05} exit="cut" parts={[{ text: "behind.", t: T.behind, fx: "slam" }]} />
        </Flood>

        {/* reveal: pill, swipe, orbit */}
        <PillOrbit appear={T.offload - 0.2} press={T.offload} until={T.shifts - 0.35} sub="plans around you" />
        <Type
          timing={timing}
          hook={6}
          gaps={[[T.that - 0.08, T.home - 0.1], [T.friday - 0.14, T.offload - 0.2], [T.offload - 0.2, T.shifts - 0.3]]}
          until={T.end}
          hi={{ skip: tokens.problem, "it,": tokens.problem, behind: tokens.problem, free: tokens.blue, google: tokens.blue, calendar: tokens.blue, "calendar.": tokens.blue }}
        />
        <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" />
        </>
      } vo="world/clinical-shifts/vo.wav" cues={CUES} punches={[[0.02, 0.025], [T.never, 0.025], [T.behind, 0.025], [T.free, 0.015]]}>
      <WeekStrip s={planned} days={DAYS} blocks={before} tileH={380} title="Placement week" />

      <DocCard
        s={cal}
        w={880}
        h={560}
        title="Google Calendar"
        sub="Connected"
        rows={[
          { label: "Ward shift", chip: "Mon", chipTone: "grey", inAt: T.shifts },
          { label: "Lecture", chip: "Wed", chipTone: "grey", inAt: T.lectures },
          { label: "Placement", chip: "Fri", chipTone: "grey", inAt: T.placements },
        ]}
      />

      <WeekStrip s={week} days={DAYS} blocks={after} tileH={380} title="Your week" />

      <ScreenClip s={clip} src="rec/reschedule-a.mp4" at={T.miss - 0.1} until={T.end - 0.1} clipLen={6.5} />
    </Shell>
  );
};

export const CLINICAL_SHIFTS_DURATION_S = Math.max(duration, T.end + 4.4);
