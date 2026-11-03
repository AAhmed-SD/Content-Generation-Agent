import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";

const sans = loadSans("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily;
const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const lines = [
  "The reading you meant to finish is still waiting.",
  "Another week went by without it.",
  "The list is still open.",
];

export const EditorialSample: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [8, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const index = frame < 90 ? 0 : frame < 170 ? 1 : 2;
  const local = frame < 90 ? frame - 28 : frame < 170 ? frame - 90 : frame - 170;
  const shown = interpolate(local, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word = interpolate(frame, [230, 255], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div style={{ position: "absolute", top: 280, left: 96, right: 96, height: 1, backgroundColor: tokens.ink, transform: `scaleX(${rule})`, transformOrigin: "left center" }} />
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 120,
          top: 340,
          fontFamily: serif,
          fontSize: index === 2 ? 92 : 68,
          lineHeight: 1.05,
          opacity: shown,
          transform: `translateY(${interpolate(shown, [0, 1], [18, 0])}px)`,
        }}
      >
        {lines[index]}
      </div>
      <div style={{ position: "absolute", left: 96, bottom: 180, color: tokens.blue, fontFamily: script, fontSize: 88, lineHeight: 0.8, opacity: word }}>offload</div>
    </AbsoluteFill>
  );
};

const plates = ["pin-folder.jpg", "pin-calculator.jpg", "pin-type.jpg"];

export const DownloadSample: React.FC = () => {
  const frame = useCurrentFrame();
  const span = 110;
  const index = Math.min(plates.length - 1, Math.floor(frame / span));
  const local = frame - index * span;
  const settle = interpolate(local, [0, 28], [1.06, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const fade = interpolate(local, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper }}>
      <Img
        src={staticFile(plates[index])}
        style={{ width: "100%", height: "100%", objectFit: "contain", transform: `scale(${settle})`, opacity: fade }}
      />
    </AbsoluteFill>
  );
};

export const FigureSample: React.FC = () => {
  const frame = useCurrentFrame();
  const walk = frame < 96;
  const x = interpolate(frame, [0, 96], [160, 540], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const step = walk ? Math.sin(frame / 3.2) : 0;
  const line = interpolate(frame, [108, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const secondEye = interpolate(frame, [100, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: tokens.ink, color: tokens.paper }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1180, height: 2, backgroundColor: tokens.paper, opacity: 0.7 }} />
      <svg width="220" height="520" viewBox="0 0 220 520" style={{ position: "absolute", left: x - 110, top: 680 }}>
        <circle cx="110" cy="70" r="46" fill="none" stroke={tokens.paper} strokeWidth="6" />
        <circle cx="96" cy="70" r="6" fill={tokens.stamp} />
        <circle cx="124" cy="70" r="6" fill={tokens.blue} opacity={secondEye} />
        <line x1="110" y1="116" x2="110" y2="280" stroke={tokens.paper} strokeWidth="6" />
        <line x1="110" y1="170" x2={70 - step * 16} y2="250" stroke={tokens.paper} strokeWidth="6" />
        <line x1="110" y1="170" x2={150 + step * 16} y2="250" stroke={tokens.paper} strokeWidth="6" />
        <line x1="110" y1="280" x2={78 - step * 28} y2="460" stroke={tokens.paper} strokeWidth="6" />
        <line x1="110" y1="280" x2={142 + step * 28} y2="460" stroke={tokens.paper} strokeWidth="6" />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1320, textAlign: "center", fontFamily: sans, fontSize: 28, letterSpacing: 2, opacity: line }}>
        THE LIST IS STILL OPEN.
      </div>
    </AbsoluteFill>
  );
};
