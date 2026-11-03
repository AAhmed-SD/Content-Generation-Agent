import type { CSSProperties, ReactNode } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const moves = ["cross", "grid", "circle", "wedge", "squares", "corners"] as const;
export type MoveName = (typeof moves)[number];

const pop = { damping: 12, mass: 0.6 };

export function landed(frame: number, fps: number, delay = 0) {
  return spring({ frame: frame - delay, fps, config: pop });
}

export const WordPop: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
}> = ({ text, delay = 0, stagger = 2, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <div style={style}>
      {words.map((word, index) => {
        const s = landed(frame, fps, delay + index * stagger);
        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              opacity: Math.min(1, Math.max(0, s)),
              transform: `translateY(${(1 - s) * 26}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const Whip: React.FC<{ children: ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 12], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  return <div style={{ position: "absolute", inset: 0, transform: `translateX(${t * 46}px)`, filter: `blur(${t * 5}px)` }}>{children}</div>;
};

export const CameraPush: React.FC<{ children: ReactNode; style?: CSSProperties }> = ({ children, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, Math.max(durationInFrames - 1, 1)], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ ...style, position: "absolute", inset: 0, transform: `scale(${scale})` }}>{children}</div>;
};

export const Overshoot: React.FC<{ delay?: number; children: ReactNode; style?: CSSProperties }> = ({ delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = landed(frame, fps, delay);
  return (
    <div style={{ ...style, opacity: Math.min(1, Math.max(0, s)), transform: `translateY(${(1 - s) * 34}px) scale(${0.94 + Math.min(s, 1.08) * 0.06})` }}>
      {children}
    </div>
  );
};
