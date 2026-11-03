import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";
import { Whip, type MoveName } from "./motion/primitives";
import {
  BackShape,
  BarClose,
  DrawOn,
  DuotoneDefs,
  GrainOverlay,
  HeroObject,
  PhotoStack,
  RGBSplit,
  ShapeWipe,
  VOWords,
  glide,
  type TimedWord,
} from "./motion/bespoke";

const sans = loadSans("normal", { weights: ["400", "700"], subsets: ["latin"] }).fontFamily;
const serif = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

const blue = tokens.blue;
const wash = tokens.wash;
const white = "#fcfcfc";

export type IssueBeat = {
  kicker: string;
  issue: string;
  detail: string;
  answer: string;
  move?: MoveName;
};

export type FilmScene = {
  object: "cards" | "clock" | "calendar" | "curve" | "pages" | "notes" | "none";
  shape: "circle" | "triangle" | "panel" | "none";
  enter: "wipe" | "bars" | "whip";
  endCard?: boolean;
  start: number;
  until: number;
  words: TimedWord[];
};

export type FastIssuesProps = {
  beats: IssueBeat[];
  endBold: string;
  endItalic: string;
  hold: number;
  scenes?: FilmScene[];
  voice?: string;
  durationFrames?: number;
};

const paper = {
  backgroundColor: white,
  backgroundImage: `linear-gradient(${blue}22 1px, transparent 1px), linear-gradient(90deg, ${blue}22 1px, transparent 1px)`,
  backgroundSize: "64px 64px",
};

const Cards: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 520, height: 360, filter: "drop-shadow(0 28px 36px rgba(39,70,214,0.16))" }}>
      {[0, 1, 2, 3].map((item) => {
        const s = glide(frame, 16, item * 3);
        const turn = (-18 + item * 12) * s + Math.sin((frame + item * 8) / 20) * 1.4;
        const lift = Math.sin((frame + item * 10) / 16) * 7;
        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: 150,
              top: 40 + lift,
              width: 210,
              height: 280,
              borderRadius: 22,
              background: item % 2 ? blue : wash,
              transform: `rotate(${turn}deg) translateY(${(1 - s) * 70}px) scale(${0.86 + s * 0.14})`,
              opacity: s,
            }}
          />
        );
      })}
    </div>
  );
};

const Clock: React.FC = () => {
  const frame = useCurrentFrame();
  const s = glide(frame, 16);
  return (
    <svg width="480" height="480" viewBox="0 0 480 480" style={{ opacity: s, transform: `scale(${0.9 + s * 0.1})` }}>
      <circle cx="240" cy="240" r="188" fill={wash} />
      <circle cx="240" cy="240" r="168" fill="none" stroke={blue} strokeWidth="3" opacity="0.45" />
      {Array.from({ length: 12 }, (_, item) => (
        <line key={item} x1="240" y1="78" x2="240" y2={item % 3 === 0 ? 98 : 90} stroke={blue} strokeWidth={item % 3 === 0 ? 5 : 3} transform={`rotate(${item * 30} 240 240)`} />
      ))}
      <line x1="240" y1="240" x2="240" y2="118" stroke={blue} strokeWidth="10" strokeLinecap="round" transform={`rotate(${frame * 0.45} 240 240)`} />
      <line x1="240" y1="240" x2="332" y2="196" stroke={blue} strokeWidth="8" strokeLinecap="round" transform={`rotate(${frame * 6} 240 240)`} />
      <circle cx="240" cy="240" r="9" fill={blue} />
    </svg>
  );
};

const Calendar: React.FC = () => {
  const frame = useCurrentFrame();
  const open = glide(frame, 14);
  return (
    <div style={{ width: 480, opacity: open, transform: `translateY(${(1 - open) * 36}px) scale(${0.94 + open * 0.06})`, filter: "drop-shadow(0 24px 32px rgba(39,70,214,0.14))" }}>
      <div style={{ height: 72, borderRadius: "22px 22px 0 0", background: blue, transform: `scaleX(${0.4 + open * 0.6})`, transformOrigin: "left center" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, padding: 18, background: white, borderRadius: "0 0 22px 22px" }}>
        {Array.from({ length: 8 }, (_, item) => {
          const cell = glide(frame, 12, 6 + item * 2);
          const marked = item === 5;
          const pulse = marked ? 1 + Math.sin(frame / 8) * 0.04 : 1;
          return <div key={item} style={{ height: 72, borderRadius: 12, background: marked ? blue : wash, opacity: cell, transform: `scale(${(0.7 + cell * 0.3) * pulse})` }} />;
        })}
      </div>
    </div>
  );
};

const curvePoint = (t: number) => {
  const u = 1 - t;
  const x = u * u * u * 40 + 3 * u * u * t * 180 + 3 * u * t * t * 240 + t * t * t * 600;
  const y = u * u * u * 70 + 3 * u * u * t * 40 + 3 * u * t * t * 300 + t * t * t * 250;
  return { x, y };
};

const Curve: React.FC = () => {
  const frame = useCurrentFrame();
  const drawn = glide(frame, 28, 4);
  const dot = curvePoint(drawn);
  return (
    <svg width="720" height="460" viewBox="0 0 720 460">
      <path d="M40 70 C 180 40, 240 300, 600 250" fill="none" stroke={wash} strokeWidth="18" strokeLinecap="round" />
      <path d="M40 70 C 180 40, 240 300, 600 250" fill="none" stroke={blue} strokeWidth="8" strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900 * (1 - drawn)} />
      <circle cx={dot.x} cy={dot.y} r="14" fill={blue} opacity={drawn} />
    </svg>
  );
};

const Notes: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 18) * 10;
  return (
    <div style={{ transform: `translateY(${drift}px)` }}>
      <PhotoStack />
    </div>
  );
};

const ObjectArt: React.FC<{ name: FilmScene["object"] }> = ({ name }) => {
  if (name === "cards") return <Cards />;
  if (name === "clock") return <Clock />;
  if (name === "calendar") return <Calendar />;
  if (name === "curve") return <Curve />;
  if (name === "pages" || name === "notes") return <Notes />;
  return null;
};

const EndMark: React.FC = () => {
  const rise = glide(useCurrentFrame(), 16, 8);
  return <div style={{ marginTop: 36, color: blue, fontFamily: script, fontSize: 84, opacity: rise, transform: `translateY(${(1 - rise) * 16}px)` }}>offload</div>;
};

const SceneBody: React.FC<{ scene: FilmScene; frames: number }> = ({ scene, frames }) => {
  const words = (
      <VOWords
      words={scene.words}
      sans={sans}
      serif={serif}
      origin={scene.start}
      cursor={!scene.endCard}
      style={{ width: 920, justifyContent: scene.enter === "bars" || scene.endCard ? "center" : "flex-start" }}
    />
  );
  if (scene.endCard) {
    return (
      <AbsoluteFill style={{ ...paper, alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 900, textAlign: "center" }}>
          <RGBSplit>{words}</RGBSplit>
          <EndMark />
        </div>
      </AbsoluteFill>
    );
  }
  if (scene.enter === "bars") {
    return <BarClose>{words}</BarClose>;
  }
  return (
    <AbsoluteFill style={paper}>
      <HeroObject frames={frames}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {scene.shape !== "none" ? <BackShape kind={scene.shape} /> : null}
          {scene.object === "cards" ? <DrawOn kind="circle" /> : null}
          <div style={{ position: "relative", zIndex: 2 }}>
            <ObjectArt name={scene.object} />
          </div>
        </div>
      </HeroObject>
      <div style={{ position: "absolute", left: 72, right: 72, top: 1280 }}>{words}</div>
      {scene.object === "none" ? null : null}
    </AbsoluteFill>
  );
};

const SceneFrame: React.FC<{ scene: FilmScene }> = ({ scene }) => {
  const { fps } = useVideoConfig();
  const frames = Math.max(1, Math.round((scene.until - scene.start) * fps));
  const body = <SceneBody scene={scene} frames={frames} />;
  if (scene.enter === "wipe") return <ShapeWipe>{body}</ShapeWipe>;
  if (scene.enter === "whip") return <Whip>{body}</Whip>;
  return body;
};

export const fastIssuesDefaults: FastIssuesProps = {
  beats: [],
  endBold: "No planning.",
  endItalic: "Just studying.",
  hold: 60,
  scenes: [],
  durationFrames: 90,
};

export const FastIssues: React.FC<FastIssuesProps> = ({ scenes = [], voice }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: white }}>
      <DuotoneDefs />
      {voice ? <Audio src={staticFile(voice)} /> : null}
      {scenes.map((scene, index) => {
        const from = Math.round(scene.start * fps);
        const next = scenes[index + 1] ? Math.round(scenes[index + 1].start * fps) : Math.round((scene.until + 0.4) * fps);
        const duration = Math.max(1, next - from);
        return (
          <Sequence key={`${scene.start}-${index}`} from={from} durationInFrames={duration}>
            <SceneFrame scene={scene} />
          </Sequence>
        );
      })}
      <GrainOverlay />
    </AbsoluteFill>
  );
};

export const fastIssuesDuration = 90;
