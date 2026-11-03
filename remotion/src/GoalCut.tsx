import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";

const sans = loadSans("normal", { weights: ["400", "700"], subsets: ["latin"] }).fontFamily;
const serif = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const blue = tokens.blue;
const wash = tokens.wash;
const white = "#fcfcfc";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const out = Easing.out(Easing.cubic);

function rise(frame: number, start: number) {
  return interpolate(frame, [start, start + 16], [28, 0], { ...clamp, easing: out });
}

function fade(frame: number, start: number, end = start + 12) {
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing: out });
}

const Cross: React.FC = () => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: out });
  const v = interpolate(frame, [6, 24], [0, 1], { ...clamp, easing: out });
  const dot = fade(frame, 16);
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: blue, transform: `scaleX(${h})` }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: blue, transform: `scaleY(${v})` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 10, height: 10, margin: -5, borderRadius: 5, background: blue, opacity: dot }} />
    </AbsoluteFill>
  );
};

const GridWord: React.FC = () => {
  const frame = useCurrentFrame();
  const cell = interpolate(frame, [4, 22], [0.2, 1], { ...clamp, easing: out });
  const word = fade(frame, 10);
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {[0, 1, 2, 3].map((index) => (
        <div key={`v${index}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${index * 33.33}%`, width: 2, background: blue }} />
      ))}
      {[0, 1, 2].map((index) => (
        <div key={`h${index}`} style={{ position: "absolute", left: 0, right: 0, top: `${index * 50}%`, height: 2, background: blue }} />
      ))}
      <div style={{ position: "absolute", left: "33.33%", top: "25%", width: "33.34%", height: "50%", background: wash, transform: `scale(${cell})` }} />
      <div style={{ position: "absolute", left: 80, top: 300, width: 460, color: blue, fontFamily: sans, fontWeight: 700, fontSize: 54, lineHeight: 0.95, opacity: fade(frame, 18), transform: `translateY(${rise(frame, 18)}px)` }}>
        The list
        <br />
        is still
      </div>
      <div style={{ position: "absolute", left: "33.33%", top: "25%", width: "33.34%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: blue, fontFamily: sans, fontWeight: 700, fontSize: 210, letterSpacing: -8, opacity: word }}>
        open
      </div>
      <div style={{ position: "absolute", right: 90, top: 390, color: blue, fontFamily: serif, fontStyle: "italic", fontSize: 64, opacity: fade(frame, 26) }}>still</div>
    </AbsoluteFill>
  );
};

const CircleMark: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 22], [0.2, 1], { ...clamp, easing: out });
  const dash = interpolate(frame, [14, 36], [180, 0], { ...clamp, easing: out });
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 520, top: 90, width: 760, height: 760, borderRadius: "50%", background: wash, transform: `scale(${scale})` }} />
      <div style={{ position: "absolute", left: 520, top: 250, width: 760, textAlign: "center", color: blue, fontFamily: sans, fontWeight: 700, fontSize: 220, letterSpacing: -8, opacity: fade(frame, 8) }}>open</div>
      <svg width="220" height="120" style={{ position: "absolute", left: 1180, top: 180 }}>
        <path d="M20 90 C 80 90, 90 20, 160 24" fill="none" stroke={blue} strokeWidth="6" strokeDasharray="180" strokeDashoffset={dash} />
        <polygon points="168,10 196,28 156,36" fill={blue} opacity={fade(frame, 28)} />
      </svg>
      <div style={{ position: "absolute", left: 1400, top: 168, color: blue, fontFamily: sans, fontWeight: 700, fontSize: 64, opacity: fade(frame, 30) }}>LIST</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 860, textAlign: "center", color: blue, fontFamily: serif, fontStyle: "italic", fontSize: 42, opacity: fade(frame, 20) }}>the reading you meant to finish</div>
    </AbsoluteFill>
  );
};

const Split: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 24], [240, 0], { ...clamp, easing: out });
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 90, top: 340, width: 760, color: blue, opacity: fade(frame, 8), transform: `translateY(${rise(frame, 8)}px)` }}>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 64, lineHeight: 0.95 }}>The reading you meant to finish</div>
        <div style={{ marginTop: 12, fontFamily: serif, fontStyle: "italic", fontSize: 58, color: blue }}>is still waiting.</div>
      </div>
      <div style={{ position: "absolute", right: -40, top: -80, width: 820, height: 1240, background: wash, clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)", transform: `translateX(${slide}px)` }} />
      <Img src={staticFile("pin-folder.jpg")} style={{ position: "absolute", right: 70, top: 180, width: 520, height: 720, objectFit: "contain", transform: `translateX(${slide * 0.4}px)`, opacity: fade(frame, 10) }} />
    </AbsoluteFill>
  );
};

const Icons: React.FC = () => {
  const frame = useCurrentFrame();
  const marks = [
    <div key="p" style={{ width: 18, height: 64, boxShadow: "28px 0 0 #fff", background: white }} />,
    <svg key="g" width="78" height="78" viewBox="0 0 78 78">
      <path d="M18 39 H60 M18 39 L30 27 M18 39 L30 51 M60 39 L48 27 M60 39 L48 51" fill="none" stroke={white} strokeWidth="7" />
    </svg>,
    <svg key="q" width="78" height="78" viewBox="0 0 78 78">
      <path d="M22 28 v22 M34 22 v34" stroke={white} strokeWidth="8" />
      <path d="M48 18 L66 60" stroke={white} strokeWidth="7" />
    </svg>,
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 64 }}>
      {marks.map((mark, index) => {
        const s = interpolate(frame, [index * 6, index * 6 + 14], [0.4, 1], { ...clamp, easing: out });
        return (
          <div key={index} style={{ width: 168, height: 168, borderRadius: 28, background: blue, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${s})`, opacity: fade(frame, index * 6, index * 6 + 10) }}>
            {mark}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Corners: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [180, 0], { ...clamp, easing: out });
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: -40, bottom: 80, width: 280, height: 180, background: wash, clipPath: "polygon(0 40%, 100% 0, 0 100%)", transform: `translateX(${-enter}px)` }} />
      <div style={{ position: "absolute", right: -20, top: 40, width: 240, height: 200, background: wash, clipPath: "polygon(100% 0, 0 30%, 100% 100%)", transform: `translateX(${enter}px)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 460, textAlign: "center", color: blue, fontFamily: sans, fontWeight: 700, fontSize: 64, opacity: fade(frame, 12) }}>Another week</div>
    </AbsoluteFill>
  );
};

const ClockLine: React.FC = () => {
  const frame = useCurrentFrame();
  const hand = interpolate(frame, [0, 70], [-8, 18], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", opacity: fade(frame, 4) }}>
        <div style={{ color: blue, fontFamily: sans, fontWeight: 700, fontSize: 64 }}>went by</div>
        <div style={{ color: blue, fontFamily: serif, fontStyle: "italic", fontSize: 58 }}>without it.</div>
      </div>
      <svg width="360" height="360" style={{ position: "absolute", left: 780, top: 420 }}>
        <circle cx="180" cy="180" r="150" fill={wash} stroke={blue} strokeWidth="10" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line key={angle} x1="180" y1="48" x2="180" y2="68" stroke={blue} strokeWidth="4" transform={`rotate(${angle} 180 180)`} />
        ))}
        <line x1="180" y1="180" x2="180" y2="70" stroke={blue} strokeWidth="6" transform={`rotate(${hand} 180 180)`} />
        <line x1="180" y1="180" x2="250" y2="210" stroke={blue} strokeWidth="8" />
      </svg>
    </AbsoluteFill>
  );
};

const Badge: React.FC = () => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 16], [0.6, 1], { ...clamp, easing: out });
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 760, top: 340, width: 400, height: 360, background: blue, clipPath: "polygon(50% 0, 100% 28%, 82% 100%, 18% 100%, 0 28%)", transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center", color: white, fontFamily: sans, fontWeight: 700, fontSize: 64, textAlign: "center" }}>
        The list
      </div>
    </AbsoluteFill>
  );
};

const EndLine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center" }}>
        <span style={{ color: blue, fontFamily: sans, fontWeight: 700, fontSize: 72, opacity: fade(frame, 0) }}>is still </span>
        <span style={{ color: blue, fontFamily: serif, fontStyle: "italic", fontSize: 72, opacity: fade(frame, 10) }}>open.</span>
        <div style={{ marginTop: 16, color: blue, fontFamily: script, fontSize: 56, opacity: fade(frame, 16) }}>offload</div>
      </div>
    </AbsoluteFill>
  );
};

export const GoalCut: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: white,
        backgroundImage: `linear-gradient(${blue}33 1px, transparent 1px), linear-gradient(90deg, ${blue}33 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
      }}
    >
      <Audio src={staticFile("goal-score.wav")} />
      <Sequence durationInFrames={70}><Cross /></Sequence>
      <Sequence from={60} durationInFrames={120}><GridWord /></Sequence>
      <Sequence from={170} durationInFrames={100}><CircleMark /></Sequence>
      <Sequence from={260} durationInFrames={100}><Split /></Sequence>
      <Sequence from={350} durationInFrames={70}><Icons /></Sequence>
      <Sequence from={410} durationInFrames={70}><Corners /></Sequence>
      <Sequence from={470} durationInFrames={90}><ClockLine /></Sequence>
      <Sequence from={550} durationInFrames={70}><Badge /></Sequence>
      <Sequence from={610} durationInFrames={70}><EndLine /></Sequence>
    </AbsoluteFill>
  );
};
