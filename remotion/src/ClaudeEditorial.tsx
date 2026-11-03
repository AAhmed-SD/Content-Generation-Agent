import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";

const sans = loadSans("normal", { weights: ["400", "600"], subsets: ["latin"] });
const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] });
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] });

const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const MaskLine: React.FC<{
  text: string;
  size: number;
  delay: number;
  exitAt: number;
  startPct?: number;
}> = ({ text, size, delay, exitAt, startPct = 105 }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [delay, delay + 24], [startPct, 0], {
    ...clamp,
    easing: easeOut,
  });
  const exit = interpolate(frame, [exitAt + delay * 0.4, exitAt + delay * 0.4 + 20], [0, -110], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  return (
    <div
      style={{
        height: size * 1.12,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          fontFamily: serif.fontFamily,
          fontSize: size,
          lineHeight: 1.08,
          color: tokens.ink,
          letterSpacing: -size * 0.01,
          whiteSpace: "nowrap",
          transform: `translateY(${enter + exit}%)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SceneOne: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 26], [0, 1], { ...clamp, easing: easeOut });
  const out = interpolate(frame, [80, 100], [0, 1], {
    ...clamp,
    easing: easeInOut,
  });
  const scale = frame < 80 ? draw : 1 - out;
  const origin = frame < 80 ? "0% 50%" : "100% 50%";
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 170,
          width: 888,
          height: 2,
          background: tokens.ink,
          transformOrigin: origin,
          transform: `scaleX(${scale})`,
        }}
      />
      <div style={{ position: "absolute", left: 96, top: 220, width: 888 }}>
        <MaskLine text="The reading you" size={108} delay={0} exitAt={78} startPct={55} />
        <MaskLine text="meant to finish is" size={108} delay={4} exitAt={78} startPct={70} />
        <MaskLine text="still waiting." size={108} delay={8} exitAt={78} startPct={85} />
      </div>
    </AbsoluteFill>
  );
};

const SceneTwo: React.FC = () => {
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 96, top: 220, width: 888 }}>
        <MaskLine text="Another week went" size={96} delay={0} exitAt={80} />
        <MaskLine text="by without it." size={96} delay={5} exitAt={80} />
      </div>
    </AbsoluteFill>
  );
};

const SceneThree: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [30, 62], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 96, top: 220, width: 888 }}>
        <MaskLine text="The list is" size={176} delay={0} exitAt={9999} />
        <MaskLine text="still open." size={176} delay={6} exitAt={9999} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 640,
          width: 360,
          height: 8,
          background: tokens.stamp,
          transformOrigin: "0% 50%",
          transform: `scaleX(${rule})`,
        }}
      />
    </AbsoluteFill>
  );
};

const PhotoLayer: React.FC = () => {
  // Local frame 0 == global frame 90
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 44], [0, 1], { ...clamp, easing: easeOut });
  const opacity = interpolate(frame, [0, 14], [0, 1], clamp);
  const shift = interpolate(frame, [150, 190], [0, 1], { ...clamp, easing: easeInOut });

  const tx = (1 - enter) * 460;
  const ty = (1 - enter) * 760;
  const rot = interpolate(enter, [0, 1], [9, -1.5]) + shift * 3;
  const scale = 1 - shift * 0.38;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 184,
          top: 540,
          width: 800,
          height: 1220,
          opacity,
          transformOrigin: "100% 100%",
          transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`,
        }}
      >
        <Img
          src={staticFile("pin-folder.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const Offload: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 26], [0, 1], { ...clamp, easing: easeOut });
  const y = (1 - o) * 14;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 740,
          fontFamily: script.fontFamily,
          fontSize: 250,
          lineHeight: 1,
          color: tokens.blue,
          opacity: o,
          transform: `translateY(${y}px) rotate(-3deg)`,
          transformOrigin: "0% 100%",
        }}
      >
        offload
      </div>
    </AbsoluteFill>
  );
};

export const ClaudeEditorial: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tokens.paper,
        fontFamily: sans.fontFamily,
      }}
    >
      <Sequence from={90} durationInFrames={270} layout="none">
        <PhotoLayer />
      </Sequence>
      <Sequence from={0} durationInFrames={100} layout="none">
        <SceneOne />
      </Sequence>
      <Sequence from={138} durationInFrames={105} layout="none">
        <SceneTwo />
      </Sequence>
      <Sequence from={243} durationInFrames={117} layout="none">
        <SceneThree />
      </Sequence>
      <Sequence from={320} durationInFrames={40} layout="none">
        <Offload />
      </Sequence>
    </AbsoluteFill>
  );
};

export default ClaudeEditorial;
