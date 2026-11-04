import { tokens } from "../../tokens";
import { alpha, ClockIcon, DocCard, Flood, HARD, INTER, makeTiming, POP, S0, ScreenClip, Shell, Timeline, track, useK, WeekStrip, type Block, type Cue , type Cam } from "../kit/dark";
import { Face, Label, merge, Type, phraseStarts } from "../kit/talk";
import { Kinetic } from "../kinetic";
import { SCRIPT } from "../../story/fonts";
import { LogoEnd, logoCues, LogoSting } from "../kit/logo";
import timing from "./timing.json";

/**
 * Founder story, ADHD call-out: "Hey, students with ADHD. Does this sound like you?"
 * Approved founder wording (product-facts §7). Organic only: never boost a post that names a condition.
 */
const { ls, at, duration } = makeTiming(timing);

const T = {
  sound: at("L1", "does"),
  called: ls("L2"),
  lazy: at("L2", "lazy"),
  every: at("L2", "every"),
  evening: at("L2", "evening"),
  capable: at("L2", "capable"),
  detentions: at("L2", "detentions"),
  isolation: at("L2", "isolation"),
  brother: ls("L3"),
  smartest: at("L3", "smartest"),
  planes: at("L3", "planes"),
  mechanics: at("L3", "mechanics"),
  diag: ls("L4"),
  eighteen: at("L4", "eighteen"),
  after: at("L4", "failed"),
  problem: ls("L5"),
  ability: at("L5", "ability"),
  planning: at("L5", "planning"),
  starting: at("L5", "starting"),
  keeping: at("L5", "keeping"),
  built: at("L6", "built"),
  offload: at("L6", "offload"),
  holds: at("L6", "holds"),
  miss: at("L6", "miss"),
  never: ls("L7"),
  end: ls("L8") - 0.25,
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const CUES: Cue[] = [
  ...logoCues(T.end),
  ...logoCues(T.offload - 0.5).filter((c) => c.s !== "logo_splash" && c.s !== "subdrop"),
  { t: 0, s: "boom", v: 0.36 },
  { t: T.sound, s: "swish", v: 0.22 },
  { t: T.lazy, s: "scribble", v: 0.38 },
  { t: T.every - 0.05, s: "paper_land", v: 0.28 },
  { t: T.evening, s: "paper_land", v: 0.28 },
  ...[0, 1, 2].map((i) => ({ t: T.detentions + i * 0.12, s: "stamp", v: 0.34 })),
  { t: T.isolation - 0.05, s: "swoosh_down", v: 0.24 },
  { t: T.isolation + 0.1, s: "boom", v: 0.2 },
  { t: T.brother - 0.05, s: "whoosh", v: 0.22 },
  { t: T.planes, s: "whoosh", v: 0.26 },
  { t: T.mechanics, s: "click", v: 0.28 },
  { t: T.diag - 0.1, s: "swoosh_down", v: 0.22 },
  { t: T.diag + 0.35, s: "tick", v: 0.22 },
  { t: T.diag + 0.7, s: "tick", v: 0.22 },
  { t: T.eighteen, s: "thud", v: 0.32 },
  { t: T.ability, s: "impact", v: 0.28 },
  { t: T.capable - 0.12, s: "iris", v: 0.32 },
  { t: at("L2", "lazy", 2), s: "scribble", v: 0.36 },
  { t: T.detentions - 0.12, s: "iris", v: 0.26 },
  { t: at("L5", "never"), s: "boom", v: 0.3 },
  { t: T.planning, s: "pop_low", v: 0.28 },
  { t: T.starting, s: "pop_low", v: 0.28 },
  { t: T.keeping, s: "pop_low", v: 0.28 },
  { t: T.built - 0.15, s: "riser", v: 0.14 },
  ...Array.from({ length: 10 }, (_, i) => ({ t: T.holds + i * 0.06, s: "glass", v: 0.14 })),
  { t: T.miss - 0.1, s: "whoosh", v: 0.22 },
];

const Plane = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M50 8 Q55 8 55 20 L55 42 L92 62 L92 70 L55 58 L55 80 L66 88 L66 94 L50 89 L34 94 L34 88 L45 80 L45 58 L8 70 L8 62 L45 42 L45 20 Q45 8 50 8 Z" fill={tokens.ink} />
  </svg>
);
const Gear: React.FC<{ r: number }> = ({ r }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: `rotate(${r}deg)` }}>
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={44} y={4} width={12} height={20} rx={3} fill={tokens.ink} transform={`rotate(${i * 45} 50 50)`} />
    ))}
    <circle cx={50} cy={50} r={32} fill={tokens.ink} />
    <circle cx={50} cy={50} r={13} fill={tokens.white} />
  </svg>
);

export const AdhdPlan: React.FC = () => {
  const { frame, fps, t, sp } = useK();
  const CAM: Cam[] = [
    { t: 0, x: 540, y: 1060, z: 1.16, r: -1 },
    { t: T.every - 0.1, x: 560, y: 1020, z: 1.22, r: 0.5 },
    { t: T.detentions - 0.1, x: 540, y: 1120, z: 1.0, r: 0, c: { damping: 200, stiffness: 200, mass: 0.6 } },
    { t: T.isolation, x: 540, y: 1080, z: 1.42 },
    { t: T.brother, x: 540, y: 960, z: 1 },
    { t: T.smartest - 0.15, x: 540, y: 880, z: 1.16 },
    { t: T.planes - 0.15, x: 340, y: 1250, z: 1.3, r: -1 },
    { t: T.mechanics - 0.15, x: 740, y: 1250, z: 1.3, r: 1 },
    { t: T.diag - 0.1, x: 560, y: 1000, z: 1.08, r: 0 },
    { t: T.eighteen - 0.1, x: 600, y: 1170, z: 1.3 },
    { t: T.problem - 0.1, x: 540, y: 960, z: 1 },
    { t: T.planning - 0.1, x: 220, y: 1180, z: 1.22 },
    { t: T.starting - 0.1, x: 540, y: 1180, z: 1.22 },
    { t: T.keeping - 0.1, x: 860, y: 1180, z: 1.22 },
    { t: T.built - 0.25, x: 540, y: 960, z: 1 },
    { t: T.holds - 0.1, x: 540, y: 1060, z: 1.06 },
    { t: T.miss - 0.15, x: 540, y: 1080, z: 1.0 },
  ];

  // report cards, "lazy" already on the first at frame 0
  const reports = [0, 1, 2].map((i) =>
    track(frame, fps, S0({ x: 540 + (i - 1) * 40, y: 1060 - i * 40, s: 0.88, r: [-3, 4, -6][i], o: i === 0 ? 1 : 0 }), [
      ...(i > 0 ? [{ t: [0, T.every - 0.05, T.evening][i], v: { o: 1 }, c: HARD }] : []),
      { t: T.detentions - 0.1, v: { y: -700, o: 0 } },
    ]),
  );
  const slips = [0, 1, 2].map((i) =>
    track(frame, fps, S0({ x: [330, 760, 520][i], y: [860, 1110, 1380][i], s: 1.3, r: [-9, 7, -4][i] }), [
      { t: T.detentions + i * 0.12, v: { o: 1, s: 0.9 }, c: HARD },
      { t: T.isolation, v: { o: 0, s: 0.8, b: 14 } },
    ]),
  );
  const iso = track(frame, fps, S0({ y: 1080, s: 0.8 }), [
    { t: T.isolation + 0.05, v: { o: 1, s: 0.7 } },
    { t: T.brother + 0.3, v: { o: 0, b: 10 } },
  ]);

  const loves = (t0: number) => sp(t0, POP) * (1 - sp(T.diag - 0.15));
  const tl = track(frame, fps, S0({ x: 560, y: 1000 }), [
    { t: T.diag - 0.05, v: { o: 1 } },
    { t: T.problem - 0.1, v: { o: 0, b: 14 } },
  ]);

  const out5 = sp(T.built - 0.2);
  const three = [
    { label: "Planning", at: T.planning },
    { label: "Starting", at: T.starting },
    { label: "Keeping track", at: T.keeping },
  ];

  const mark = t > T.built - 0.2 && t < T.holds + 0.2;
  const planner = track(frame, fps, S0({ y: 1060 }), [
    { t: T.holds - 0.1, v: { o: 1 } },
    { t: T.miss - 0.15, v: { y: 1600, s: 0.55, o: 0 } },
  ]);
  const blocks: Block[] = Array.from({ length: 10 }, (_, i) => ({
    day: i % 5,
    slot: Math.floor(i / 5),
    label: ["Start", "Reading", "Notes", "Quiz", "Review", "Break", "Start", "Practice", "Recap", "Rest"][i],
    tone: (["white", "kraft", "card", "white", "paper"] as const)[i % 5],
    at: T.holds + i * 0.06,
  }));
  const clip = track(frame, fps, S0({ y: 2400, s: 0.95 }), [
    { t: T.miss - 0.15, v: { y: 1180, o: 1 }, c: { damping: 200, stiffness: 180, mass: 0.7 } },
    { t: T.end - 0.1, v: { s: 2.5, o: 0, b: 30 } },
  ]);

  return (
    <Shell ticks={phraseStarts(timing, 7)} cam={CAM} overlay={
        <>
        {/* hero: capable, but lazy */}
        <Flood colour={tokens.problem} inAt={T.capable - 0.12} from={{ x: 540, y: 1000 }} outAt={T.detentions - 0.12} to={{ x: 540, y: 1000 }}>
          <Kinetic frame={frame} fps={fps} font={SCRIPT} colour={tokens.white} tracking="0em" y={720} size={230} weight={700} out={T.detentions + 0.2} exit="cut" parts={[{ text: "“Capable,", t: T.capable, fx: "mask" }, { text: "but lazy.”", t: at("L2", "but"), fx: "mask" }]} />
        </Flood>
        {/* hero: never ability */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={210} size={84} weight={700} align="left" out={T.planning - 0.15} exit="blur" parts={[{ text: "The", t: T.problem, fx: "mask" }, { text: "problem", t: at("L5", "problem"), fx: "mask" }, { text: "was", t: at("L5", "was"), fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={330} size={210} weight={850} align="left" out={T.planning - 0.15} exit="left" parts={[{ text: "never", t: at("L5", "never"), fx: "slam" }]} />
        <div style={{ position: "absolute", inset: 0, filter: `drop-shadow(0 0 26px ${alpha(tokens.blue, 0.6)})` }}>
          <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.blue} y={560} size={170} weight={850} align="left" out={T.planning - 0.15} exit="left" parts={[{ text: "ability.", t: T.ability, fx: "track", deco: "underline", decoColour: tokens.blue, decoAt: T.ability + 0.3 }]} />
        </div>
        {/* hero: so I built */}
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={560} size={130} weight={850} out={T.holds - 0.2} exit="blur" parts={[{ text: "So", t: at("L6", "so"), fx: "mask" }, { text: "I", t: at("L6", "i"), fx: "mask" }, { text: "built", t: T.built, fx: "track" }]} />
  
        <Type timing={timing} hook={7} gaps={[[T.capable - 0.12, T.detentions - 0.1], [T.problem - 0.05, T.planning - 0.12], [at("L6", "so") - 0.05, T.holds - 0.15]]} until={T.end} show={merge(["A", "D", "H", "D"], "ADHD")} hi={{ failed: tokens.problem, adhd: tokens.problem, lazy: tokens.problem, brother: tokens.blue, ability: tokens.blue, zero: tokens.blue }} />
        <LogoEnd at={T.end} lead="Free trial" pill="Link in bio" />
  
        </>
      } vo="world/adhd-plan/vo.wav" cues={CUES} punches={[[0.02, 0.025], [T.lazy, 0.025], [T.detentions, 0.03], [T.eighteen, 0.025]]}>
      {reports.map((s, i) => (
        <DocCard
          key={i}
          s={s}
          w={820}
          h={760}
          title="Parents' evening"
          sub={["Autumn term", "Spring term", "Summer term"][i]}
          rows={[{ h: 70 }, { h: 70 }, { h: 70 }]}
          stamp={{ text: i === 2 ? "capable, but lazy" : "lazy", at: i === 0 ? -1 : [0, T.every, T.capable][i], x: 470, y: 560, size: i === 2 ? 84 : 150, rot: -7, circle: i === 0 }}
        />
      ))}
      {slips.map((s, i) => (
        <DocCard key={i} s={s} w={560} h={300} title="Detention" sub="After school" rows={[{ h: 60 }]} radius={20} />
      ))}
      <DocCard s={iso} w={560} h={300} title="Isolation" sub="All day" rows={[{ h: 60 }]} radius={20} />

      <Face x={540} y={860} w={820} h={260} k={sp(T.smartest - 0.1, POP) * (1 - sp(T.diag - 0.15))}>
        <div style={{ padding: "52px 56px" }}>
          <Label size={26} colour={tokens.blue}>MY BROTHER</Label>
          <div style={{ height: 18 }} />
          <Label size={58}>One of the smartest people I know</Label>
        </div>
      </Face>
      <Face x={330} y={1260} w={380} h={380} k={loves(T.planes - 0.1)} r={-4}>
        <div style={{ position: "absolute", left: 90, top: 50, width: 200, height: 200, transform: `translateY(${Math.sin(t * 3) * 8}px) rotate(${Math.sin(t * 2) * 6}deg)` }}>
          <Plane />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center" }}>
          <Label size={46}>Planes</Label>
        </div>
      </Face>
      <Face x={750} y={1260} w={380} h={380} k={loves(T.mechanics - 0.1)} r={4}>
        <div style={{ position: "absolute", left: 100, top: 54, width: 180, height: 180 }}>
          <Gear r={t * 60} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center" }}>
          <Label size={46}>Mechanics</Label>
        </div>
      </Face>

      <Timeline
        s={tl}
        steps={[
          { label: "Secondary school", sub: "Detentions. Isolation.", at: T.diag + 0.05 },
          { label: "A-levels", sub: t > T.after ? "Failed" : "No plan, no support", at: T.diag + 0.4, red: t > T.after },
          { label: "At eighteen", sub: "Diagnosed with ADHD", at: T.eighteen },
        ]}
      />

      {three.map((c, i) => (
        <Face key={c.label} x={200 + i * 340} y={1180} w={300} h={380} k={sp(c.at - 0.05, POP) * (1 - out5)} bg={tokens.white}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 34 }}>
            <div style={{ width: 120, height: 120 }}>
              {i === 0 ? (
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  {[20, 50, 80].map((y, j) => (
                    <g key={j}>
                      <rect x={10} y={y - 9} width={18} height={18} rx={4} fill="none" stroke={tokens.problem} strokeWidth={5} />
                      <rect x={38} y={y - 5} width={52 - j * 10} height={10} rx={5} fill={tokens.ink} />
                    </g>
                  ))}
                </svg>
              ) : i === 1 ? (
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M30 18 L82 50 L30 82 Z" fill={tokens.problem} />
                </svg>
              ) : (
                <ClockIcon t={t} speed={6} colour={tokens.problem} />
              )}
            </div>
            <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: i === 2 ? 40 : 46, letterSpacing: "-0.03em", color: tokens.ink }}>{c.label}</div>
          </div>
        </Face>
      ))}

      {mark ? (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: 1 - sp(T.holds - 0.2), }}>
          <LogoSting at={T.offload - 0.5} y={1000} width={760} splash={false} />
        </div>
      ) : null}
      <WeekStrip s={planner} days={DAYS} blocks={blocks} tileH={360} title="The plan" />
      <ScreenClip s={clip} src="rec/reschedule-a.mp4" at={T.miss - 0.1} until={T.end - 0.1} clipLen={6.5} />




    </Shell>
  );
};

export const ADHD_DURATION_S = Math.max(duration, T.end + 4.4);
