import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";

const sans = loadSans("normal", { weights: ["400", "600", "700"], subsets: ["latin"] }).fontFamily;
const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

export type PaperProps = {
  line: string;
  note: string;
  niche: string;
  narration: string;
  beats: string[];
  format: "video" | "still" | "carousel";
};

export const PaperCard: React.FC<PaperProps> = (props) => {
  if (props.format === "video") return <HookFilm {...props} />;
  return <FlatCard {...props} />;
};

const HookFilm: React.FC<PaperProps> = ({ line, niche, beats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = [beats[0] || line, beats[1] || line, beats[2] || line];
  const folderIn = spring({ frame, fps, config: { damping: 16, mass: 0.85 } });
  const folderY = interpolate(folderIn, [0, 1], [520, 0]);
  const arrivals = [20, 68, 116].map((delay) => spring({ frame, fps, delay, config: { damping: 14, mass: 0.7 } }));
  const stampIn = spring({ frame, fps, delay: 142, config: { damping: 11, mass: 0.5 } });
  const stampTurn = interpolate(stampIn, [0, 1], [-32, -8]);
  const word = interpolate(frame, [150, 174], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink, fontFamily: sans }}>
      <div style={{ padding: "36px 48px 0", fontSize: 18, letterSpacing: 3 }}>{niche}</div>
      <div style={{ transform: `translateY(${folderY}px)`, padding: "28px 40px 0" }}>
        <div style={{ position: "relative", height: 980, backgroundColor: tokens.kraft }}>
          <div style={{ height: 108, backgroundColor: "rgba(23,23,23,0.08)", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 292,
                top: 28,
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: tokens.kraft,
                border: `2px solid ${tokens.ink}`,
              }}
            />
          </div>
          <div style={{ padding: "36px 40px 0", fontFamily: sans, fontWeight: 700, fontSize: 28, letterSpacing: 2 }}>CONFIDENTIAL</div>
          {lines.map((sentence, index) => {
            const shown = arrivals[index];
            const y = interpolate(shown, [0, 1], [36, 0]);
            return (
              <div
                key={sentence + index}
                style={{
                  margin: "22px 32px 0",
                  backgroundColor: tokens.card,
                  border: `1px solid ${tokens.ink}`,
                  padding: "18px 20px",
                  fontFamily: serif,
                  fontSize: index === 2 ? 40 : 32,
                  lineHeight: 1.12,
                  opacity: shown,
                  transform: `translateY(${y}px)`,
                }}
              >
                {sentence}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              right: 36,
              bottom: 36,
              opacity: stampIn,
              transform: `rotate(${stampTurn}deg) scale(${interpolate(stampIn, [0, 1], [1.35, 1])})`,
            }}
          >
            <div
              style={{
                border: `4px solid ${tokens.stamp}`,
                color: tokens.stamp,
                fontFamily: sans,
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 3,
                padding: "8px 12px",
              }}
            >
              FILED
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, textAlign: "center", opacity: word }}>
        <div style={{ color: tokens.blue, fontFamily: script, fontSize: 72, lineHeight: 0.8 }}>offload</div>
      </div>
    </AbsoluteFill>
  );
};

const FlatCard: React.FC<PaperProps> = ({ line, note, niche, narration, beats, format }) => {
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
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink, fontFamily: serif }}>
      <AbsoluteFill
        style={{
          margin: 48,
          border: `2px solid ${tokens.ink}`,
          backgroundColor: tokens.card,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "36px 40px", fontFamily: sans, fontSize: 22, letterSpacing: 3 }}>{niche}</div>
        <div style={{ transform: `translateY(${rise}px)`, padding: "0 48px" }}>
          <div style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: -1 }}>{headline}</div>
          <div style={{ marginTop: 18, color: tokens.blue, fontFamily: script, fontSize: 64, lineHeight: 0.9 }}>offload</div>
          <div style={{ marginTop: 28, fontFamily: sans, fontSize: 32, opacity: noteOpacity, maxWidth: 860 }}>
            {format === "carousel" ? note : narration || note}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
