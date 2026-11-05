import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadLcd } from "@remotion/google-fonts/VT323";
import { tokens } from "../../tokens";
import { alpha, INTER } from "../kit/dark";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, POSTER_H, POSTER_W } from "./Posters";

/**
 * Photo posters: a real photo of an object with its words painted out (public/plates, made by
 * scripts/clean-plate.py), and new words set where the old ones were. Positions are in the plate's own
 * pixels (864 × 1152); the stage is scaled to 1080 wide and cropped to 4:5.
 */
const LCD = loadLcd("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const PW = 864;
const PH = 1152;
const SCALE = POSTER_W / PW;
const SHIFT = (PH * SCALE - POSTER_H) / 2 / SCALE;

export type PhotoProps =
  | { plate: "calculator"; head: string; lcd: string }
  | { plate: "calendar"; script: string; inCircle?: string }
  | { plate: "drawer-a" | "drawer-b"; head: string; card: string; unseenTitle: string; unseen: string }
  | { plate: "envelope"; title: string; sub: string; stamp: string }
  | { plate: "folder-polaroid"; kicker: string; handle: string; head: string; rows: [string, string, string]; foot: string; photo: string }
  | { plate: "folder-red"; tabs: [string, string, string]; head: string; rows: [string, string, string]; note: string };

const at = (left: number, top: number, extra: React.CSSProperties = {}): React.CSSProperties => ({ position: "absolute", left, top, ...extra });
const centred = (top: number, extra: React.CSSProperties = {}): React.CSSProperties => ({ position: "absolute", left: 0, right: 0, top, textAlign: "center", ...extra });
const small = (colour: string): React.CSSProperties => ({ fontFamily: INTER, fontWeight: 600, fontSize: 15, letterSpacing: "0.16em", textTransform: "uppercase", color: colour });

const Words: React.FC<PhotoProps> = (p) => {
  switch (p.plate) {
    case "calculator":
      return (
        <>
          <div style={centred(146, { fontFamily: INTER, fontWeight: 760, fontSize: 86, lineHeight: 0.95, letterSpacing: "-0.045em", color: tokens.ink })}><Br text={p.head} /></div>
          <div style={centred(318, { fontFamily: SCRIPT, fontWeight: 700, fontSize: 120, color: tokens.mark, transform: "rotate(-4deg)" })}>offload.</div>
          <div style={centred(752, { fontFamily: LCD, fontSize: p.lcd.length > 18 ? 60 : 76, color: alpha(tokens.ink, 0.82), letterSpacing: "0.01em" })}>{p.lcd}</div>
        </>
      );
    case "calendar":
      return (
        <>
          <div style={centred(196, { fontFamily: SCRIPT, fontWeight: 600, fontSize: 96, lineHeight: 0.86, color: tokens.mark, transform: "rotate(-3deg)" })}><Br text={p.script} /></div>
          {p.inCircle ? <div style={at(372, 540, { width: 130, textAlign: "center", fontFamily: INTER, fontWeight: 750, fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.ink })}><Br text={p.inCircle} /></div> : null}
          <div style={centred(1018, { fontFamily: INTER, fontWeight: 700, fontSize: 36, color: tokens.mark, letterSpacing: "-0.02em" })}>offload</div>
        </>
      );
    case "drawer-a":
    case "drawer-b": {
      const left = p.plate === "drawer-a" ? 152 : 118;
      return (
        <>
          <div style={at(left, 98, { fontFamily: INTER, fontWeight: 760, fontSize: 80, lineHeight: 0.94, letterSpacing: "-0.045em", color: tokens.ink })}><Br text={p.head} /></div>
          <div style={at(268, p.plate === "drawer-a" ? 628 : 648, { width: 420, fontFamily: SERIF, fontSize: 66, lineHeight: 0.98, color: tokens.ink })}><Br text={p.card} /></div>
          <div style={at(270, p.plate === "drawer-a" ? 808 : 826, { width: 380, fontFamily: INTER, fontSize: 21, lineHeight: 1.3, color: tokens.ink })}>
            <div style={{ fontWeight: 700 }}>{p.unseenTitle}</div>
            <div>{p.unseen}</div>
          </div>
        </>
      );
    }
    case "envelope":
      return (
        <>
          <div style={centred(620, { fontFamily: INTER, fontWeight: 700, fontSize: 36, letterSpacing: "0.14em", color: alpha(tokens.ink, 0.88), paddingLeft: 40, textTransform: "uppercase" })}>{p.title}</div>
          <div style={centred(674, { fontFamily: SERIF, fontSize: 30, color: alpha(tokens.ink, 0.88), paddingLeft: 40 })}>{p.sub}</div>
          <div style={at(520, 780, { transform: "rotate(-9deg)", border: `5px solid ${tokens.stamp}`, borderRadius: 6, padding: "6px 14px", fontFamily: INTER, fontWeight: 800, fontSize: 52, letterSpacing: "0.04em", color: tokens.stamp, opacity: 0.85, mixBlendMode: "multiply" })}>{p.stamp}</div>
        </>
      );
    case "folder-polaroid":
      return (
        <>
          <div style={centred(54, small(tokens.ink))}>{p.kicker}</div>
          <div style={at(286, 250, { ...small(alpha(tokens.white, 0.8)), fontSize: 13, letterSpacing: "0.08em", textTransform: "none" })}>{p.handle}</div>
          <div style={at(280, 302, { width: 380, fontFamily: INTER, fontWeight: 760, fontSize: 64, lineHeight: 1.0, letterSpacing: "-0.04em", color: tokens.white })}><Br text={p.head} /></div>
          {p.rows.map((r, i) => <div key={r} style={at(290, 814 + i * 57, small(alpha(tokens.white, 0.9)))}>{r}</div>)}
          <div style={centred(1088, small(tokens.ink))}>{p.foot}</div>
          <div style={at(570, 560, { width: 190, textAlign: "center", fontFamily: SCRIPT, fontWeight: 700, fontSize: 38, lineHeight: 1.0, color: tokens.ink, transform: "rotate(5deg)" })}><Br text={p.photo} /></div>
        </>
      );
    case "folder-red":
      return (
        <>
          {p.tabs.map((t, i) => (
            <div key={t} style={at(160, [333, 603, 871][i] - 12, { width: 100, textAlign: "center", transform: "rotate(-90deg)", fontFamily: INTER, fontWeight: 600, fontSize: 19, color: tokens.white })}>{t}</div>
          ))}
          <div style={at(282, 300, { width: 300, fontFamily: INTER, fontWeight: 760, fontSize: 62, lineHeight: 1.0, letterSpacing: "-0.04em", color: tokens.white })}><Br text={p.head} /></div>
          {p.rows.map((r, i) => <div key={r} style={at(290, 818 + i * 56, small(alpha(tokens.white, 0.9)))}>{r}</div>)}
          <div style={at(560, 560, { width: 210, textAlign: "center", fontFamily: SCRIPT, fontWeight: 700, fontSize: 42, lineHeight: 1.0, color: tokens.ink, transform: "rotate(5deg)" })}><Br text={p.note} /></div>
        </>
      );
  }
};

export const PhotoPoster: React.FC<PhotoProps> = (p) => {
  const file = p.plate === "calendar" ? "calendar-b" : p.plate;
  return (
    <AbsoluteFill style={{ background: tokens.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: PW, height: PH, transform: `scale(${SCALE}) translateY(${-SHIFT}px)`, transformOrigin: "0 0" }}>
        <Img src={staticFile(`plates/${file}.png`)} style={{ position: "absolute", inset: 0, width: PW, height: PH }} />
        <Words {...p} />
      </div>
    </AbsoluteFill>
  );
};

export const photoDefaults: PhotoProps = { plate: "calculator", head: "The problem sheet\nis still open.", lcd: "Keep the method." };
