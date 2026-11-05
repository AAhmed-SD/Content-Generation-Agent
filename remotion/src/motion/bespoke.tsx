import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { tokens } from "../tokens";
const smooth = Easing.bezier(0.22, 1, 0.36, 1);

export function glide(frame: number, length: number, delay = 0) {
  return interpolate(frame - delay, [0, length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smooth,
  });
}

const blue = tokens.blue;
const wash = tokens.wash;

export type WordRole = "tint" | "plain" | "key";

export type TimedWord = {
  text: string;
  start: number;
  end: number;
  role: WordRole;
};

const roleStyle = (role: WordRole, scale: number): CSSProperties => {
  if (role === "key") {
    return { fontStyle: "italic", fontWeight: 400, fontSize: Math.round(96 * scale), color: blue };
  }
  if (role === "tint") {
    return { fontStyle: "normal", fontWeight: 700, fontSize: Math.round(52 * scale), color: blue, opacity: 0.38 };
  }
  return { fontStyle: "normal", fontWeight: 700, fontSize: Math.round(72 * scale), color: blue };
};

export const VOWords: React.FC<{
  words: TimedWord[];
  serif: string;
  sans: string;
  style?: CSSProperties;
  cursor?: boolean;
  origin?: number;
}> = ({ words, serif, sans, style, cursor = false, origin = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps + origin;
  const scale = words.length > 7 ? 0.78 : 1;
  const shown = words.filter((word) => time >= word.start - 0.04);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", ...style }}>
      {shown.map((word, index) => {
        const age = glide(frame - Math.round((word.start - origin) * fps), 10);
        const look = roleStyle(word.role, scale);
        return (
          <span
            key={`${word.text}-${index}`}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              fontFamily: word.role === "key" ? serif : sans,
              lineHeight: 0.95,
              letterSpacing: word.role === "key" ? -1 : -1.5,
              filter: `blur(${(1 - age) * 6}px)`,
              transform: `translateY(${(1 - age) * 22}px)`,
              ...look,
              opacity: Number(look.opacity ?? 1) * age,
            }}
          >
            {word.text}
          </span>
        );
      })}
      {cursor && shown.length > 0 && shown.length < words.length ? (
        <span style={{ width: 3, height: 52, background: blue, display: "inline-block", opacity: 0.35 + Math.sin(frame / 6) * 0.25, transform: "translateY(10px)" }} />
      ) : null}
    </div>
  );
};

export const HeroObject: React.FC<{ children: ReactNode; frames: number }> = ({ children, frames }) => {
  const frame = useCurrentFrame();
  const blur = (1 - glide(frame, 14)) * 12;
  const scale = interpolate(frame, [0, Math.max(frames - 1, 1)], [1.04, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const floatY = Math.sin(frame / 18) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        height: 980,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: `blur(${blur}px)`,
        transform: `translateY(${floatY}px) scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

export const BackShape: React.FC<{ kind: "circle" | "triangle" | "panel" }> = ({ kind }) => {
  const frame = useCurrentFrame();
  const s = glide(frame, 18);
  const turn = Math.sin(frame / 28) * 2.4;
  const common: CSSProperties = {
    position: "absolute",
    transform: `scale(${0.9 + s * 0.1}) rotate(${turn}deg)`,
    opacity: s,
  };
  if (kind === "circle") {
    return <div style={{ ...common, width: 640, height: 640, borderRadius: "50%", background: wash }} />;
  }
  if (kind === "triangle") {
    return <div style={{ ...common, width: 720, height: 620, background: wash, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />;
  }
  return <div style={{ ...common, width: 760, height: 860, background: wash, clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)" }} />;
};

export const ShapeWipe: React.FC<{ children: ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <AbsoluteFill>
      {children}
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          top: -80,
          bottom: -80,
          background: blue,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 14% 100%)",
          transform: `translateX(${t * 130}%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const BarClose: React.FC<{ children: ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const bar = glide(frame, 16) * 660;
  return (
    <AbsoluteFill style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: bar, background: blue }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: bar, background: blue }} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 760, minHeight: 400 }}>{children}</div>
    </AbsoluteFill>
  );
};

export const DuotoneDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <filter id="offload-duotone" colorInterpolationFilters="sRGB">
      <feColorMatrix
        type="matrix"
        values="0.12 0.12 0.12 0 0.04
                0.18 0.18 0.18 0 0.10
                0.62 0.62 0.62 0 0.28
                0 0 0 1 0"
      />
    </filter>
  </svg>
);

export const PhotoStack: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 460, height: 560, filter: "url(#offload-duotone)" }}>
      {Array.from({ length: 7 }, (_, item) => {
        const shown = glide(frame, 12, item * 3);
        const turn = (item % 2 === 0 ? -8 : 7) + Math.sin((frame + item * 5) / 20) * 1.6;
        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: 70 + item * 10,
              top: 40 + (6 - item) * 8,
              width: 280,
              height: 380,
              borderRadius: 10,
              background: item % 2 ? "#c5cad6" : "#f2f3f6",
              opacity: shown,
              transform: `rotate(${turn + item}deg) scale(${0.9 + shown * 0.1})`,
            }}
          />
        );
      })}
    </div>
  );
};

export const RGBSplit: React.FC<{ children: ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 14], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smooth,
  });
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${-shift}px)`, opacity: 0.85, color: "#8ea2f0" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${shift}px)`, opacity: 0.85, color: "#1a2f9c" }}>{children}</div>
      <div style={{ position: "relative", color: blue }}>{children}</div>
    </div>
  );
};

export const DrawOn: React.FC<{ kind: "circle" | "tick" }> = ({ kind }) => {
  const frame = useCurrentFrame();
  const s = glide(frame, 22, 6);
  if (kind === "tick") {
    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <path d="M24 64 L50 90 L98 30" fill="none" stroke={blue} strokeWidth="10" strokeLinecap="round" strokeDasharray="140" strokeDashoffset={140 * (1 - s)} />
      </svg>
    );
  }
  return (
    <svg width="520" height="520" viewBox="0 0 520 520" style={{ position: "absolute" }}>
      <circle cx="260" cy="260" r="210" fill="none" stroke={blue} strokeWidth="6" strokeDasharray="1320" strokeDashoffset={1320 * (1 - s)} />
    </svg>
  );
};

export const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply" }}>
      <svg width="100%" height="100%">
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed={Math.floor(frame / 8)} />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
