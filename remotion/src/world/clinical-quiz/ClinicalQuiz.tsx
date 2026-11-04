import { tokens } from "../../tokens";
import { alpha, DocCard, Flood, INTER, makeTiming, place, POP, S0, Shell, soft, track, useK, XBadge, type Cue, type Cam, type S } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { PillOrbit, pillCues, Type, phraseStarts } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import timing from "./timing.json";

/** Clinical quiz: two Test-phase cards from uploaded lecture notes. Question, countdown, flip, the trap struck out.
 *  Card text is the card as generated, with "According to the source" dropped. */
const { ls, le, at, duration } = makeTiming(timing);

const T = {
  test: at("L1", "test"),
  flip1: at("L1", "flip"),
  q1: ls("L2"),
  q1End: le("L2"),
  a1: ls("L3"),
  breast: at("L3", "breast"),
  trap: at("L3", "trap"),
  q2: ls("L4"),
  sperm: at("L4", "sperm"),
  q2End: le("L4"),
  a2: ls("L5"),
  ejac: at("L5", "ejaculatory"),
  offload: ls("L6"),
  uploaded: at("L6", "uploaded"),
  wrong: at("L6", "wrong"),
  sooner: at("L6", "sooner"),
  end: ls("L7") - 0.1,
};

const CARDS = [
  {
    deck: "Menopause · Test",
    q: "A woman with an intact uterus is prescribed oestrogen-only HRT. What is the specific risk of not adding progestogen?",
    a: "Endometrial hyperplasia.",
    not: "Breast cancer",
    qAt: T.q1,
    qEnd: T.q1End,
    flip: T.a1 - 0.18,
    strike: T.breast,
  },
  {
    deck: "Male genitalia · Test",
    q: "A student traces the path of sperm from the seminiferous tubules. Which structure immediately follows the epididymis?",
    a: "Vas deferens.",
    not: "Ejaculatory duct",
    qAt: T.sperm - 0.2,
    qEnd: T.q2End,
    flip: T.a2 - 0.18,
    strike: T.ejac,
  },
];

const W = 940;
const H = 820;

const CUES: Cue[] = [
  ...pillCues(T.offload - 0.2, T.offload),
  ...logoCues(T.end),
  { t: 0, s: "boom", v: 0.32 },
  { t: T.test, s: "pop", v: 0.24 },
  { t: T.flip1, s: "flip", v: 0.26 },
  ...CARDS.flatMap((c) => [
    { t: c.qAt - 0.1, s: "paper_land", v: 0.3 },
    ...[0, 1, 2].map((i) => ({ t: c.qEnd + 0.15 + i * 0.45, s: "tick", v: 0.26 })),
    { t: c.flip, s: "flip", v: 0.34 },
    { t: c.flip + 0.18, s: "impact", v: 0.26 },
    { t: c.strike, s: "buzz", v: 0.22 },
  ]),
  { t: T.trap - 0.12, s: "iris", v: 0.32 },
  { t: T.trap, s: "boom", v: 0.34 },
  { t: T.q2 - 0.1, s: "whoosh", v: 0.22 },
  { t: T.uploaded, s: "paper_land", v: 0.26 },
  { t: T.wrong, s: "buzz", v: 0.2 },
  { t: T.sooner, s: "ding", v: 0.2 },
];

/** One flashcard: front with the question and deck, a three-dot countdown, then a flip to the answer and the struck-out trap. */
const Flashcard: React.FC<{ s: S; c: (typeof CARDS)[number] }> = ({ s, c }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const p = Math.min(1, Math.max(0, (t - c.flip) / 0.36));
  const sx = Math.abs(Math.cos(Math.PI * p));
  const back = p >= 0.5;
  const strikeK = sp(c.strike, { damping: 200, stiffness: 300, mass: 0.5 });
  return (
    <div style={place(s, W, H)}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: tokens.white, boxShadow: soft(1.6), transform: `scaleX(${Math.max(0.02, sx)})`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 56, top: 52, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ padding: "10px 22px", borderRadius: 26, background: back ? tokens.ink : tokens.mark, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 28, letterSpacing: "0.04em" }}>{back ? "ANSWER" : "TEST"}</div>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 30, color: tokens.quiet }}>{c.deck}</div>
        </div>
        {!back ? (
          <div style={{ position: "absolute", left: 56, right: 56, top: 170, fontFamily: INTER, fontWeight: 750, fontSize: 56, lineHeight: 1.16, letterSpacing: "-0.025em", color: tokens.ink }}>{c.q}</div>
        ) : (
          <>
            <div style={{ position: "absolute", left: 56, right: 56, top: 200, fontFamily: INTER, fontWeight: 850, fontSize: 92, lineHeight: 1.02, letterSpacing: "-0.04em", color: tokens.ink }}>{c.a}</div>
            <div style={{ position: "absolute", left: 56, right: 56, top: 520, height: 120, borderRadius: 22, background: tokens.rule, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", opacity: sp(c.strike - 0.15, POP) }}>
              <div style={{ position: "relative", fontFamily: INTER, fontWeight: 700, fontSize: 46, color: tokens.ink, opacity: strikeK > 0.5 ? 0.45 : 1 }}>
                {c.not}
                <div style={{ position: "absolute", left: 0, top: "52%", height: 6, width: `${strikeK * 100}%`, background: tokens.problem, borderRadius: 3 }} />
              </div>
              <XBadge k={sp(c.strike + 0.1, POP)} size={72} />
            </div>
          </>
        )}
        <div style={{ position: "absolute", left: 56, bottom: 48, fontFamily: INTER, fontWeight: 650, fontSize: 28, color: tokens.mark }}>From uploaded lecture notes</div>
      </div>
    </div>
  );
};

/** Three dots that fill one by one while the viewer answers. */
const Countdown: React.FC<{ from: number; until: number }> = ({ from, until }) => {
  const { t, sp } = useK();
  if (t < from - 0.2 || t > until) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1650, display: "flex", justifyContent: "center", gap: 34 }}>
      {[0, 1, 2].map((i) => {
        const k = sp(from + 0.15 + i * 0.45, POP);
        return <div key={i} style={{ width: 40, height: 40, borderRadius: 20, border: `4px solid ${tokens.white}`, background: k > 0.5 ? tokens.white : "transparent", transform: `scale(${0.8 + 0.2 * k})` }} />;
      })}
    </div>
  );
};

export const ClinicalQuiz: React.FC = () => {
  const { frame, fps } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 1060, z: 1.12, r: -1 },
    { t: T.q1 - 0.2, x: 540, y: 1140, z: 1.02, r: 0 },
    { t: T.q1End, x: 540, y: 1160, z: 1.1 },
    { t: CARDS[0].flip, x: 540, y: 1150, z: 1.04, c: { damping: 200, stiffness: 200, mass: 0.6 } },
    { t: T.q2 - 0.1, x: 540, y: 1140, z: 1.02, r: 0 },
    { t: T.q2End, x: 540, y: 1160, z: 1.1 },
    { t: CARDS[1].flip, x: 540, y: 1150, z: 1.04, c: { damping: 200, stiffness: 200, mass: 0.6 } },
    { t: T.offload - 0.1, x: 540, y: 960, z: 1.0 },
    { t: T.wrong - 0.2, x: 540, y: 1120, z: 1.12 },
    { t: T.end - 0.2, x: 540, y: 960, z: 1, c: { damping: 200, stiffness: 200, mass: 0.6 } },
  ];

  // opener: a fanned stack of test cards
  const stack = [0, 1, 2].map((i) =>
    track(frame, fps, S0({ y: 1260 + i * 30, s: 0.7, r: (i - 1) * 6 }), [
      { t: 0.1 + i * 0.12, v: { o: 1, s: 0.8, y: 1180 - i * 10 }, c: POP },
      { t: T.q1 - 0.25, v: { o: 0, y: 1500, b: 12 } },
    ]),
  );

  const card1 = track(frame, fps, S0({ y: 1250, s: 0.9 }), [
    { t: CARDS[0].qAt - 0.15, v: { o: 1, s: 1, y: 1160 }, c: POP },
    { t: T.q2 - 0.15, v: { x: -700, r: -10 }, c: { damping: 200, stiffness: 180, mass: 0.6 } },
  ]);
  const card2 = track(frame, fps, S0({ x: 1700, y: 1160, r: 10 }), [
    { t: T.q2 - 0.15, v: { o: 1 } },
    { t: T.q2 - 0.1, v: { x: 540, r: 0 }, c: { damping: 200, stiffness: 180, mass: 0.6 } },
    { t: T.offload - 0.25, v: { o: 0, s: 0.85, b: 14 } },
  ]);

  const deck = track(frame, fps, S0({ y: 1160, s: 0.9 }), [
    { t: T.uploaded - 0.2, v: { o: 1, s: 1 }, c: POP },
    { t: T.end - 0.1, v: { o: 0, b: 16 } },
  ]);

  return (
    <Shell ticks={phraseStarts(timing, 6)} cam={CAM} overlay={
        <>
        {/* hero: that's the trap, red flood */}
        <Flood colour={tokens.problem} inAt={T.trap - 0.12} from={{ x: 540, y: 1000 }} outAt={T.q2 - 0.12} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={640} size={110} weight={750} out={T.q2 + 0.05} exit="cut" parts={[{ text: "That's", t: at("L3", "that's"), fx: "mask" }, { text: "the", t: at("L3", "the"), fx: "mask" }]} />
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={790} size={240} weight={850} out={T.q2 + 0.05} exit="cut" parts={[{ text: "trap.", t: T.trap, fx: "slam" }]} />
        </Flood>

        <PillOrbit appear={T.offload - 0.2} press={T.offload} until={T.uploaded - 0.3} sub="builds the test" />
        <Type
          timing={timing}
          hook={6}
          gaps={[[T.trap - 0.12, T.q2 - 0.12], [T.offload - 0.2, T.uploaded - 0.3]]}
          until={T.end}
          hi={{ test: tokens.blue, flip: tokens.blue, "flip.": tokens.blue, "risk?": tokens.problem, "trap.": tokens.problem, "cancer,": tokens.problem, "next?": tokens.problem, not: tokens.problem, "wrong,": tokens.problem, "sooner.": tokens.blue, uploaded: tokens.blue }}
        />
        <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" />
        </>
      } vo="world/clinical-quiz/vo.wav" cues={CUES} punches={[[0.02, 0.025], [CARDS[0].flip + 0.18, 0.02], [T.trap, 0.025], [CARDS[1].flip + 0.18, 0.02]]}>
      {stack.map((s, i) => (
        <div key={i} style={place(s, W, H)}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: tokens.white, boxShadow: soft(1.6) }}>
            <div style={{ position: "absolute", left: 56, top: 52, padding: "10px 22px", borderRadius: 26, background: tokens.mark, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 28, letterSpacing: "0.04em" }}>TEST</div>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 56, top: 190 + r * 84, height: 34, width: 700 - r * 160, borderRadius: 17, background: alpha(tokens.ink, 0.12) }} />
            ))}
          </div>
        </div>
      ))}

      <Flashcard s={card1} c={CARDS[0]} />
      <Flashcard s={card2} c={CARDS[1]} />
      <Countdown from={CARDS[0].qEnd} until={CARDS[0].flip} />
      <Countdown from={CARDS[1].qEnd} until={CARDS[1].flip} />

      <DocCard
        s={deck}
        w={900}
        h={560}
        title="Your Test deck"
        sub="From uploaded lecture notes"
        rows={[
          { label: "Menopause", chip: "Test", chipTone: "grey" },
          { label: "Male genitalia", chip: "Test", chipTone: "grey", cross: T.wrong },
          { label: "Comes back sooner", chip: "Due", chipTone: "ink", inAt: T.sooner },
        ]}
      />
    </Shell>
  );
};

export const CLINICAL_QUIZ_DURATION_S = Math.max(duration, T.end + 4.4);
