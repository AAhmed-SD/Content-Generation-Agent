import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { tokens } from "./tokens";

export type PaperProps = {
  line: string;
  note: string;
  niche: string;
  narration: string;
  beats: string[];
  format: "video" | "still" | "carousel";
};

export const PaperCard: React.FC<PaperProps> = ({ line, note, niche, narration, beats, format }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const beatCount = Math.max(beats.filter(Boolean).length, 1);
  const beatLength = format === "carousel" ? Math.floor(durationInFrames / beatCount) : durationInFrames;
  const beatIndex = format === "carousel" ? Math.min(beatCount - 1, Math.floor(frame / beatLength)) : 0;
  const localFrame = format === "carousel" ? frame - beatIndex * beatLength : frame;
  const headline = format === "carousel" ? beats[beatIndex] || line : line;
  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, mass: 0.8 },
  });
  const rise = interpolate(enter, [0, 1], [160, 0]);
  const noteOpacity =
    format === "still"
      ? 1
      : interpolate(localFrame, [18, 36], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: tokens.paper,
        color: tokens.ink,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <AbsoluteFill
        style={{
          margin: 48,
          border: `2px solid ${tokens.ink}`,
          backgroundColor: tokens.card,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "36px 40px", fontFamily: "system-ui, sans-serif", fontSize: 22, letterSpacing: 3 }}>
          {niche}
        </div>
        <div
          style={{
            transform: `translateY(${rise}px)`,
            padding: "0 48px",
          }}
        >
          <div style={{ fontSize: 86, lineHeight: 0.92, letterSpacing: -2 }}>{headline}</div>
          <div
            style={{
              marginTop: 18,
              color: tokens.blue,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 64,
              lineHeight: 0.9,
            }}
          >
            offload
          </div>
          <div style={{ marginTop: 28, fontFamily: "system-ui, sans-serif", fontSize: 32, opacity: noteOpacity, maxWidth: 860 }}>
            {format === "carousel" ? note : narration || note}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
