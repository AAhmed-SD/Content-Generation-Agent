import { tokens } from "../../tokens";
import { alpha, DocCard, Flood, INTER, makeTiming, POP, S0, Shell, track, useK, WeekStrip, XBadge, type Block, type Cue , type Cam } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { Chart, PillOrbit, pillCues, Face, forget, Label, Source, Type, phraseStarts } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import timing from "./timing.json";

/** Clinical: "Your Anki deck is a library with no librarian." One pain, two features: cards from your notes, re-learn time booked. */
const { ls, at, duration } = makeTiming(timing);

const T = {
  and2: at("L2", "and"),
  thats4: at("L4", "that's"),

  anki: at("L1", "anki"),
  library: at("L1", "library"),
  librarian: at("L1", "librarian"),
  thousands: ls("L2"),
  matter: at("L2", "matter"),
  offload: ls("L3"),
  notes: at("L3", "notes"),
  syllabus: at("L3", "syllabus"),
  else: at("L3", "else's"),
  brings: ls("L4"),
  back: at("L4", "back"),
  forget: at("L4", "forget"),
  spacing: at("L4", "spacing"),
  reliable: at("L4", "reliable"),
  research: at("L4", "research"),
  l5: ls("L5"),
  wrong: at("L5", "wrong"),
  books: at("L5", "books"),
  relearn: at("L5", "re-learn"),
  end: ls("L6") - 0.1,
  link: at("L6", "link"),
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const COLS = 5;
const ROWS = 6;

const CUES: Cue[] = [
  ...pillCues(T.offload - 0.45, T.offload),
  ...logoCues(T.end),
  { t: 0, s: "boom", v: 0.32 },
  ...Array.from({ length: 10 }, (_, i) => ({ t: 0.1 + i * 0.12, s: "tick", v: 0.12 })),
  { t: T.library, s: "glass", v: 0.24 },
  { t: T.librarian, s: "boom", v: 0.34 },
  { t: T.librarian + 0.02, s: "stamp", v: 0.3 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.matter + i * 0.05, s: "pop_low", v: 0.14 })),
  { t: T.notes, s: "paper_land", v: 0.3 },
  ...[0, 1, 2].map((i) => ({ t: T.syllabus + i * 0.14, s: "pop", v: 0.22 })),
  { t: T.else, s: "snap", v: 0.3 },
  { t: T.brings - 0.1, s: "whoosh", v: 0.22 },
  { t: T.brings - 0.2, s: "iris", v: 0.34 },
  { t: T.brings - 0.05, s: "boom", v: 0.3 },
  { t: T.thats4 - 0.08, s: "whip", v: 0.24 },
  { t: T.spacing - 0.05, s: "impact", v: 0.32 },
  { t: T.spacing, s: "boom", v: 0.3 },
  { t: T.research, s: "pop", v: 0.24 },
  ...[0.3, 0.62].map((u) => ({ t: T.brings + 0.5 + u * (T.forget - T.brings - 0.05), s: "click", v: 0.28 })),
  { t: T.l5 - 0.2, s: "iris", v: 0.28 },
  { t: T.thousands - 0.13, s: "iris", v: 0.32 },
  { t: T.thousands + 0.05, s: "impact", v: 0.3 },
  { t: T.wrong, s: "buzz", v: 0.22 },
  { t: T.books, s: "pop", v: 0.28 },
  { t: T.relearn, s: "sparkle", v: 0.22 },
];

export const ClinicalList: React.FC = () => {
  const { frame, fps, t, sp } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 1000, z: 1.14, r: -1 },
    { t: T.anki, x: 540, y: 1010, z: 0.98, r: 0 },
    { t: T.matter - 0.2, x: 450, y: 1040, z: 1.2 },
    { t: T.offload - 0.1, x: 540, y: 960, z: 1.0, c: { damping: 200, stiffness: 160, mass: 0.6 } },
    { t: T.notes - 0.3, x: 540, y: 860, z: 1.12 },
    { t: T.syllabus, x: 540, y: 1230, z: 1.16 },
    { t: T.else - 0.2, x: 540, y: 1460, z: 1.22, r: 1 },
    { t: T.brings - 0.25, x: 540, y: 960, z: 1, r: 0 },
    { t: T.l5 - 0.1, x: 540, y: 1080, z: 1.08 },
    { t: T.wrong - 0.15, x: 600, y: 1300, z: 1.12, r: -1 },
    { t: T.books - 0.1, x: 540, y: 1110, z: 1.32, r: 0 },
    { t: T.end - 0.2, x: 540, y: 960, z: 1, c: { damping: 200, stiffness: 200, mass: 0.6 } },
  ];

  // the library: a wall of cards with no order
  const wallOut = t < T.offload - 0.05 ? 0 : sp(T.offload - 0.05, { damping: 200, stiffness: 160, mass: 0.6 });
  const wall =
    wallOut > 0.99
      ? null
      : Array.from({ length: COLS * ROWS }, (_, i) => {
          const c = i % COLS;
          const r = Math.floor(i / COLS);
          const order = (i * 7) % (COLS * ROWS);
          const k = sp(0.05 + order * 0.05, POP);
          const x = 140 + c * 200;
          const y = 700 + r * 150;
          const q = sp(T.matter + ((i * 5) % 12) * 0.03, POP);
          return (
            <Face key={i} x={mix(x, 540, wallOut)} y={mix(y, 1000, wallOut)} w={176} h={124} k={k * (1 - wallOut * 0.8)} r={((i * 13) % 7) - 3} o={1 - wallOut}>
              <div style={{ position: "absolute", left: 20, top: 28, width: 100 + ((i * 17) % 40), height: 14, borderRadius: 7, background: alpha(tokens.ink, 0.18) }} />
              <div style={{ position: "absolute", left: 20, top: 56, width: 60 + ((i * 23) % 50), height: 14, borderRadius: 7, background: alpha(tokens.ink, 0.1) }} />
              {q > 0.01 ? (
                <div style={{ position: "absolute", right: 14, bottom: 12, width: 42, height: 42, borderRadius: 21, background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 850, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${q})` }}>?</div>
              ) : null}
            </Face>
          );
        });

  // your notes, and the cards they become
  const notes = track(frame, fps, S0({ y: 860, s: 0.9 }), [
    { t: T.notes - 0.2, v: { o: 1, s: 1 }, c: POP },
    { t: T.brings - 0.15, v: { o: 0, y: 700, b: 14 } },
  ]);
  const gen = ["Renal physiology", "Pharmacology", "Anatomy"];
  const genOut = t < T.brings - 0.15 ? 0 : sp(T.brings - 0.15);
  const other = sp(T.else - 0.25, POP) * (1 - genOut);

  // the week: reviews spaced out, then re-learn time booked
  const week = track(frame, fps, S0({ y: 1080 }), [
    { t: T.l5 - 0.1, v: { o: 1 } },
    { t: T.end - 0.1, v: { o: 0, b: 16 } },
  ]);
  const blocks: Block[] = [
    { day: 0, slot: 0, label: "Review", tone: "white", at: T.l5 },
    { day: 1, slot: 0, label: "Review", tone: "white", at: T.l5 + 0.08 },
    { day: 3, slot: 0, label: "Review", tone: "white", at: T.l5 + 0.16 },
    { day: 2, slot: 1, label: "Re-learn", tone: "paper", at: T.books },
  ];
  const wrong = track(frame, fps, S0({ y: 1480, s: 0.8 }), [
    { t: T.wrong - 0.15, v: { o: 1, s: 1 }, c: POP },
    { t: T.end - 0.1, v: { o: 0 } },
  ]);

  return (
    <Shell ticks={phraseStarts(timing, 8)} cam={CAM} overlay={
        <>
        {/* hero: no librarian */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={104} weight={800} align="left" out={T.thousands - 0.13} exit="left" parts={[{ text: "A", t: T.library - 0.35, fx: "mask" }, { text: "library", t: T.library, fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={300} size={150} weight={850} align="left" out={T.thousands - 0.13} exit="left" parts={[{ text: "no", t: T.librarian - 0.2, fx: "slam" }, { text: "librarian.", t: T.librarian, fx: "slam" }]} />
  
        {/* hero: thousands of cards, red flood */}
        <Flood colour={tokens.problem} inAt={T.thousands - 0.13} from={{ x: 540, y: 1000 }} outAt={T.and2 - 0.09} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={740} size={168} weight={850} out={T.and2 + 0.16} exit="cut" parts={[{ text: "Thousands", t: T.thousands, fx: "track" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={960} size={130} weight={750} out={T.and2 + 0.16} exit="cut" parts={[{ text: "of", t: at("L2", "of"), fx: "mask" }, { text: "cards.", t: at("L2", "cards"), fx: "drop" }]} />
        </Flood>
        {/* hero: spacing, paper flood with the diagram */}
        <Flood colour={tokens.night} inAt={T.brings - 0.2} from={{ x: 540, y: 1100 }} outAt={T.l5 - 0.2} to={{ x: 540, y: 1100 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={190} size={104} weight={800} align="left" out={T.thats4 - 0.08} exit="left" parts={[{ text: "Back", t: T.back, fx: "mask" }, { text: "right", t: at("L4", "right"), fx: "mask" }, { text: "before", t: at("L4", "before"), fx: "mask" }, { text: "you", t: at("L4", "you'd"), fx: "mask" }, { text: "forget.", t: T.forget, fx: "slam", colour: tokens.problem }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={210} weight={850} out={T.l5} exit="cut" parts={[{ text: "Spacing.", t: T.spacing - 0.05, fx: "track" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={420} size={56} weight={650} out={T.l5} exit="cut" parts={[{ text: "One", t: at("L4", "one", 2), fx: "rise" }, { text: "of", t: at("L4", "of"), fx: "rise" }, { text: "the", t: at("L4", "the"), fx: "rise" }, { text: "most", t: at("L4", "most"), fx: "rise" }, { text: "reliable", t: T.reliable, fx: "pop", deco: "underline", decoAt: T.reliable + 0.3 }, { text: "findings", t: at("L4", "findings"), fx: "rise" }, { text: "in", t: at("L4", "in"), fx: "rise" }, { text: "memory", t: at("L4", "memory"), fx: "rise" }, { text: "research.", t: T.research, fx: "rise" }]} />
          <Chart
            axis={tokens.white}
            draw={[T.brings + 0.5, T.forget + 0.45]}
            box={{ x0: 130, x1: 950, y0: 720, y1: 1330 }}
            xLabel="Time"
            yLabel="Memory"
            series={[
              { f: forget([]), colour: tokens.problem, width: 8, dash: "2 20", label: "No review", labelU: 1, labelDy: 50 },
              { f: forget([0.3, 0.62]), colour: tokens.white, label: "Reviewed", labelU: 1, labelDy: -60 },
            ]}
            dots={[{ u: 0.3, s: 1, label: "Review" }, { u: 0.62, s: 1, label: "Review" }]}
          />
          <Source dark at={T.research} out={T.l5 - 0.3} text="Cepeda et al., 2006 (meta-analysis)" y={1500} />
        </Flood>
        {/* reveal: pill, swipe, orbit */}
        <PillOrbit appear={T.offload - 0.45} press={T.offload} until={T.notes - 0.35} sub="builds your cards" />
        <Type timing={timing} hook={8} gaps={[[T.offload - 0.5, T.notes - 0.3], [T.library - 0.4, T.thousands - 0.13], [T.thousands - 0.13, T.and2 - 0.04], [T.brings - 0.2, T.l5 - 0.05]]} until={T.end} hi={{ librarian: tokens.problem, "librarian.": tokens.problem, matter: tokens.problem, wrong: tokens.problem, "wrong,": tokens.problem, own: tokens.blue }} />
        <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" />
  
        </>
      } vo="world/clinical-list/vo.wav" cues={CUES} punches={[[0.02, 0.025], [T.librarian, 0.025], [T.notes, 0.015], [T.wrong, 0.02]]}>
      {wall}

      <DocCard s={notes} w={900} h={520} title="Your notes" sub="Uploaded" rows={[{ label: "Lecture notes", chip: "PDF" }, { label: "Course syllabus", chip: "PDF" }]} />
      {gen.map((g, i) => {
        const k = sp(T.syllabus + i * 0.14, POP) * (1 - genOut);
        return (
          <Face key={g} x={250 + i * 290} y={1310} w={270} h={200} k={k} r={(i - 1) * 3}>
            <div style={{ padding: "30px 24px" }}>
              <Label size={22} colour={tokens.blue} weight={700}>FROM YOUR NOTES</Label>
              <div style={{ height: 14 }} />
              <Label size={34}>{g}</Label>
            </div>
          </Face>
        );
      })}
      {other > 0.01 ? (
        <div style={{ position: "absolute", left: 540 - 300, top: 1480, width: 600, height: 150 }}>
          <Face x={300} y={75} w={600} h={130} k={other} bg={alpha(tokens.white, 0.14)}>
            <div style={{ padding: "40px 34px" }}>
              <div style={{ whiteSpace: "nowrap" }}><Label colour={alpha(tokens.white, 0.7)} size={44}>Someone else's deck</Label></div>
            </div>
          </Face>
          <div style={{ position: "absolute", left: 0, right: 0, top: 73, height: 6, background: tokens.problem, transformOrigin: "left", transform: `scaleX(${sp(T.else, { damping: 200, stiffness: 300, mass: 0.5 }) * (1 - genOut)})` }} />
        </div>
      ) : null}

      <WeekStrip s={week} days={DAYS} blocks={blocks} tileH={360} title="Your week" highlight={{ day: 2, at: T.books }} />
      <DocCard s={wrong} w={720} h={250} title="Pharmacology" sub="Flashcard" rows={[{ label: "Got it wrong", chip: "Again", chipTone: "red" }]} />
      {wrong.o > 0.5 ? (
        <div style={{ position: "absolute", left: 540 + 300, top: 1480 - 110 }}>
          <XBadge k={sp(T.wrong, POP)} size={80} />
        </div>
      ) : null}




    </Shell>
  );
};

const mix = (a: number, b: number, k: number) => a + (b - a) * k;

export const CLINICAL_DURATION_S = Math.max(duration, T.end + 4.4);
