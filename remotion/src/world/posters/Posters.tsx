import { AbsoluteFill } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadLcd } from "@remotion/google-fonts/VT323";
import { tokens } from "../../tokens";
import { alpha } from "../kit/dark";
import { SANS, SCRIPT, SERIF } from "../../story/fonts";

/**
 * Still templates in the look of the Layouts board. 1080 × 1350 (4:5).
 * Each layout is fixed; the words come from props. "\n" breaks a line.
 * Every object is drawn here. Nothing is lifted from another brand's picture.
 */
export const DISPLAY = loadAnton("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const LCD = loadLcd("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;

export const POSTER_W = 1080;
export const POSTER_H = 1350;

export const shadow = (d = 1) => `0 ${2 * d}px ${3 * d}px ${alpha(tokens.ink, 0.12)}, 0 ${18 * d}px ${40 * d}px ${alpha(tokens.ink, 0.18)}, 0 ${50 * d}px ${90 * d}px ${alpha(tokens.ink, 0.14)}`;
export const grain = { backgroundColor: tokens.paper, backgroundImage: `radial-gradient(circle at 1px 1px, ${alpha(tokens.ink, 0.05)} 1px, transparent 0)`, backgroundSize: "16px 16px" };

/** "a\nb" → a<br/>b */
export const Br: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split("\n").map((l, i, a) => (
      <span key={i}>
        {l}
        {i < a.length - 1 ? <br /> : null}
      </span>
    ))}
  </>
);
export const Mark: React.FC<{ size?: number; colour?: string; dot?: boolean }> = ({ size = 64, colour = tokens.mark, dot = true }) => (
  <span style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: size, color: colour, letterSpacing: "-0.01em" }}>offload{dot ? "." : ""}</span>
);
export const Handle: React.FC<{ text: string; colour?: string; top?: number }> = ({ text, colour = tokens.quiet, top = 48 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: colour }}>{text}</div>
);
export const Circle: React.FC<{ w: number; h: number; colour?: string; stroke?: number }> = ({ w, h, colour = tokens.mark, stroke = 7 }) => (
  <svg width={w} height={h} viewBox="0 0 200 130" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
    <path d="M 118 14 C 60 6, 12 30, 14 70 C 16 112, 96 124, 152 108 C 196 94, 196 40, 150 20 C 120 8, 70 10, 40 26" fill="none" stroke={colour} strokeWidth={stroke} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
  </svg>
);
export const Stamp: React.FC<{ text: string; rot?: number; size?: number }> = ({ text, rot = -9, size = 44 }) => (
  <div style={{ display: "inline-block", border: `5px solid ${tokens.stamp}`, borderRadius: 8, padding: "8px 18px", color: tokens.stamp, fontFamily: SANS, fontWeight: 700, fontSize: size, letterSpacing: "0.08em", transform: `rotate(${rot}deg)`, opacity: 0.88, mixBlendMode: "multiply" }}>{text}</div>
);

// ---------- props for each layout ----------

export type PosterProps =
  | { layout: "type"; top: string; bottom: string; foot: string; handle?: string }
  | { layout: "calculator"; head: string; lcd: string; handle?: string }
  | { layout: "circled"; script: string; labels: [string, string, string]; items: [string, string, string]; under: string; body: string }
  | { layout: "envelope"; title: string; sub: string; stamp: string; tag: string; handle?: string }
  | { layout: "folder"; kicker: string; head: string; note: string; tabs: [string, string, string]; rows: [string, string, string]; handle?: string }
  | { layout: "drawer"; head: string; card: string; unseenTitle: string; unseen: string; handle?: string }
  | { layout: "grid"; first: string; arrow: string; last: string; body: string; page?: string }
  | { layout: "calendar"; days: [string, string, string, string]; hot: number; first: string; second: string; folders: [string, string, string]; foot: string }
  | { layout: "keycaps"; keys: [string, string, string, string, string]; line: string }
  | { layout: "condensed"; top: string; bottom: string; phoneTitle: string; phoneNext: string; body: string };

/** 1. Type poster: a stack of condensed lines, the script mark across the gap. */
const TypeStack: React.FC<Extract<PosterProps, { layout: "type" }>> = ({ top, bottom, foot, handle = "offload" }) => (
  <AbsoluteFill style={{ ...grain, padding: "120px 80px" }}>
    <Handle text={handle} />
    <div style={{ fontFamily: DISPLAY, fontSize: 250, lineHeight: 0.86, letterSpacing: "-0.02em", color: tokens.ink }}>
      <Br text={top} />
      <div style={{ height: 150 }} />
      <Br text={bottom} />
    </div>
    <div style={{ position: "absolute", left: 250, top: 520, transform: "rotate(-8deg)" }}><Mark size={240} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 24, letterSpacing: "0.3em", color: tokens.ink, textTransform: "uppercase" }}>{foot}</div>
  </AbsoluteFill>
);

/** 2. Calculator with a sentence on the display. */
const Calculator: React.FC<Extract<PosterProps, { layout: "calculator" }>> = ({ head, lcd }) => {
  const keys = ["MC", "MR", "M−", "M+", "M+", "AC", "1", "2", "+", "÷"];
  const lcdSize = lcd.length > 18 ? 84 : 110;
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.035em", color: tokens.ink }}><Br text={head} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", transform: "rotate(-4deg)" }}><Mark size={110} /></div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 560, height: 900, borderRadius: 60, background: `linear-gradient(180deg, ${tokens.ink}, ${tokens.night})`, boxShadow: shadow(1.4) }}>
        <div style={{ position: "absolute", left: 70, right: 70, top: 60, height: 70, borderRadius: 10, background: tokens.night, boxShadow: `inset 0 2px 6px ${alpha(tokens.white, 0.08)}` }} />
        <div style={{ position: "absolute", left: 50, right: 50, top: 170, height: 210, borderRadius: 24, background: tokens.night, padding: 20 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 12, background: `linear-gradient(180deg, ${alpha(tokens.kraft, 0.55)}, ${alpha(tokens.kraft, 0.35)})`, boxShadow: `inset 0 6px 18px ${alpha(tokens.ink, 0.45)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: LCD, fontSize: lcdSize, color: alpha(tokens.ink, 0.86), letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{lcd}</div>
        </div>
        <div style={{ position: "absolute", left: 50, right: 50, top: 430, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 22 }}>
          {keys.map((k, i) => (
            <div key={i} style={{ height: 110, borderRadius: 22, background: i === 5 ? tokens.stamp : alpha(tokens.white, 0.12), boxShadow: `inset 0 -6px 0 ${alpha(tokens.night, 0.6)}, 0 4px 10px ${alpha(tokens.night, 0.5)}`, color: tokens.white, fontFamily: SANS, fontWeight: 600, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{k}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 3. Handwritten line over three slots, the middle one circled. */
const CircledDay: React.FC<Extract<PosterProps, { layout: "circled" }>> = ({ script, labels, items, under, body }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: SCRIPT, fontWeight: 700, fontSize: 112, lineHeight: 1.05, color: tokens.mark, transform: "rotate(-3deg)" }}><Br text={script} /></div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 640, borderTop: `2px solid ${tokens.line}` }} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 660, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.16em", color: tokens.quiet, textTransform: "uppercase" }}>
      {labels.map((l) => <div key={l}>{l}</div>)}
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 730, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center", fontFamily: SERIF, fontSize: 92, color: alpha(tokens.ink, 0.35) }}>
      <div>{items[0]}</div>
      <div style={{ color: tokens.ink }}>{items[1]}<div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, letterSpacing: "0.12em", color: tokens.ink, textTransform: "uppercase" }}>{under}</div></div>
      <div>{items[2]}</div>
    </div>
    <div style={{ position: "absolute", left: 395, top: 690, width: 300, height: 230 }}><Circle w={300} h={230} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1060, textAlign: "center", fontFamily: SANS, fontSize: 34, lineHeight: 1.35, color: tokens.ink }}><Br text={body} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 30, color: tokens.mark }}>offload</div>
  </AbsoluteFill>
);

/** 4. Kraft envelope with a string closure, a stamp, and a tag. */
const Envelope: React.FC<Extract<PosterProps, { layout: "envelope" }>> = ({ title, sub, stamp, tag, handle = "offload" }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 140, top: 150, width: 800, height: 1040, borderRadius: 10, background: `linear-gradient(170deg, ${tokens.kraft}, ${alpha(tokens.kraft, 0.86)})`, boxShadow: shadow(1.2), transform: "rotate(-2deg)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 300, background: alpha(tokens.ink, 0.06), clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)" }} />
      {[205, 330].map((y, i) => (
        <div key={i} style={{ position: "absolute", left: 375, top: y, width: 50, height: 50, borderRadius: 25, background: tokens.card, boxShadow: `0 3px 6px ${alpha(tokens.ink, 0.3)}`, border: `3px solid ${alpha(tokens.ink, 0.25)}` }} />
      ))}
      <svg width={800} height={500} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d="M 400 230 C 470 270, 330 300, 400 355 C 450 395, 380 420, 420 470" fill="none" stroke={alpha(tokens.ink, 0.55)} strokeWidth={3} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 64, letterSpacing: "0.1em", color: tokens.ink, textTransform: "uppercase" }}>{title}</div>
      <div style={{ position: "absolute", left: 40, right: 40, top: 650, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 50, lineHeight: 1.15, color: tokens.ink }}><Br text={sub} /></div>
      <div style={{ position: "absolute", right: 70, top: 820 }}><Stamp text={stamp} /></div>
    </div>
    <div style={{ position: "absolute", left: 70, top: 1010, width: 430, height: 210, background: tokens.card, boxShadow: shadow(0.8), transform: "rotate(-7deg)", padding: "40px 40px" }}>
      <div style={{ position: "absolute", left: 24, top: 24, width: 22, height: 22, borderRadius: 11, border: `3px solid ${alpha(tokens.ink, 0.3)}` }} />
      <div style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 56, lineHeight: 1.0, color: tokens.ink }}><Br text={tag} /></div>
    </div>
    <Handle text={handle} top={60} />
  </AbsoluteFill>
);

/** 5. Red folder with side tabs and a pinned note. */
const RedFolder: React.FC<Extract<PosterProps, { layout: "folder" }>> = ({ kicker, head, note, tabs, rows, handle = "offload" }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 150, top: 140, width: 820, height: 1080, borderRadius: 14, background: `linear-gradient(160deg, ${tokens.stamp}, ${alpha(tokens.stamp, 0.9)})`, boxShadow: shadow(1.3) }}>
      {tabs.map((t, i) => (
        <div key={t} style={{ position: "absolute", left: -58, top: 140 + i * 230, width: 70, height: 190, borderRadius: "12px 0 0 12px", background: alpha(tokens.stamp, 0.82), boxShadow: `-4px 4px 10px ${alpha(tokens.ink, 0.2)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: "rotate(-90deg)", fontFamily: SANS, fontWeight: 600, fontSize: 24, color: tokens.white, whiteSpace: "nowrap" }}>{t}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 70, top: 80, fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.14em", color: alpha(tokens.white, 0.75), textTransform: "uppercase" }}>{kicker}</div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 200, fontFamily: SANS, fontWeight: 700, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.035em", color: tokens.white }}><Br text={head} /></div>
      <div style={{ position: "absolute", right: 70, top: 470, width: 330, height: 360, background: tokens.card, boxShadow: shadow(0.7), transform: "rotate(4deg)", padding: 36 }}>
        <div style={{ position: "absolute", left: 140, top: -26, width: 30, height: 70, borderRadius: 15, border: `5px solid ${alpha(tokens.ink, 0.45)}` }} />
        <div style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 50, lineHeight: 1.05, color: tokens.ink, marginTop: 40 }}><Br text={note} /></div>
      </div>
      {rows.map((t, i) => (
        <div key={t} style={{ position: "absolute", left: 70, right: 70, top: 880 + i * 52, borderTop: `2px solid ${alpha(tokens.white, 0.35)}`, paddingTop: 10, fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: "0.12em", color: alpha(tokens.white, 0.85), textTransform: "uppercase" }}>{t}</div>
      ))}
    </div>
    <Handle text={handle} top={60} />
  </AbsoluteFill>
);

/** 6. A drawer of index cards: what people see, and what they don't. */
const Drawer: React.FC<Extract<PosterProps, { layout: "drawer" }>> = ({ head, card, unseenTitle, unseen, handle = "offload" }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 80, top: 90, fontFamily: SANS, fontWeight: 700, fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.04em", color: tokens.ink }}><Br text={head} /></div>
    <div style={{ position: "absolute", left: 120, right: 120, top: 420, height: 860, borderRadius: 18, background: `linear-gradient(180deg, ${tokens.ink}, ${tokens.night})`, boxShadow: shadow(1.3) }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 50 + i * 6, right: 50 + i * 6, top: 70 + i * 34, height: 120, borderRadius: "10px 10px 0 0", background: alpha(tokens.card, 0.9 - i * 0.12), boxShadow: `0 -2px 6px ${alpha(tokens.ink, 0.25)}` }}>
          <div style={{ position: "absolute", left: 60 + i * 120, top: -26, width: 90, height: 34, borderRadius: "8px 8px 0 0", background: tokens.stamp }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 40, right: 40, top: 250, height: 470, background: tokens.card, borderRadius: 8, boxShadow: shadow(1), padding: "50px 60px" }}>
        {[0, 1, 2, 3, 4].map((r) => <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 150 + r * 62, borderTop: `2px solid ${alpha(tokens.blue, 0.18)}` }} />)}
        <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, borderLeft: `2px solid ${alpha(tokens.stamp, 0.4)}` }} />
        <div style={{ position: "relative", fontFamily: SERIF, fontSize: 92, lineHeight: 1.0, color: tokens.ink }}><Br text={card} /></div>
        <div style={{ position: "relative", marginTop: 40, fontFamily: SANS, fontWeight: 700, fontSize: 26, color: tokens.ink }}>{unseenTitle}</div>
        <div style={{ position: "relative", fontFamily: SANS, fontSize: 26, color: tokens.ink }}>{unseen}</div>
      </div>
      <div style={{ position: "absolute", left: "50%", bottom: 50, width: 180, height: 50, marginLeft: -90, borderRadius: 25, border: `4px solid ${alpha(tokens.card, 0.6)}` }} />
    </div>
    <Handle text={handle} top={1300} />
  </AbsoluteFill>
);

/** 7. Big blue type on a grid, an arrow after the second line. */
const BlueGrid: React.FC<Extract<PosterProps, { layout: "grid" }>> = ({ first, arrow, last, body, page = "01" }) => (
  <AbsoluteFill style={{ backgroundColor: tokens.white, backgroundImage: `linear-gradient(${alpha(tokens.mark, 0.07)} 2px, transparent 2px), linear-gradient(90deg, ${alpha(tokens.mark, 0.07)} 2px, transparent 2px)`, backgroundSize: "54px 54px" }}>
    <div style={{ position: "absolute", left: 150, right: 80, top: 430, fontFamily: SANS, fontWeight: 700, fontSize: 150, lineHeight: 0.98, letterSpacing: "-0.045em", color: tokens.mark }}>
      {first}<br />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 26 }}>{arrow}
        <svg width={110} height={110} viewBox="0 0 110 110"><circle cx={55} cy={55} r={48} fill="none" stroke={tokens.mark} strokeWidth={7} /><path d="M 32 55 H 78 M 58 35 L 78 55 L 58 75" fill="none" stroke={tokens.mark} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span><br />
      {last}
    </div>
    <div style={{ position: "absolute", left: 150, right: 80, top: 930, fontFamily: SANS, fontSize: 34, lineHeight: 1.35, color: tokens.ink }}><Br text={body} /></div>
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 70, display: "flex", alignItems: "center", gap: 24, fontFamily: SANS, fontWeight: 700, fontSize: 28, color: tokens.ink }}>
      <span style={{ display: "inline-block", width: 34, height: 34, borderRadius: 17, background: tokens.mark }} /> offload
      <div style={{ flex: 1, borderTop: `2px solid ${tokens.ink}` }} />
      <span style={{ fontWeight: 600 }}>{page}</span>
    </div>
  </AbsoluteFill>
);

/** 8. Calendar grid with folders. */
const FolderCalendar: React.FC<Extract<PosterProps, { layout: "calendar" }>> = ({ days, hot, first, second, folders, foot }) => {
  const Folder: React.FC<{ x: number; y: number; label: string }> = ({ x, y, label }) => (
    <div style={{ position: "absolute", left: x, top: y }}>
      <svg width={190} height={150} viewBox="0 0 190 150"><path d="M 8 30 Q 8 16 22 16 H 70 L 86 32 H 168 Q 182 32 182 46 V 132 Q 182 144 168 144 H 22 Q 8 144 8 132 Z" fill={alpha(tokens.mark, 0.85)} /><path d="M 8 52 H 182 V 132 Q 182 144 168 144 H 22 Q 8 144 8 132 Z" fill={tokens.mark} /></svg>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontWeight: 600, fontSize: 20, color: tokens.ink, marginTop: 6 }}><span style={{ width: 12, height: 12, borderRadius: 6, background: tokens.stamp }} />{label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ ...grain }}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 60 + i * 240, top: 80, bottom: 80, borderLeft: `2px solid ${tokens.line}` }} />)}
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 60, right: 60, top: 80 + i * 300, borderTop: `2px solid ${tokens.line}` }} />)}
      {days.map((d, i) => <div key={d} style={{ position: "absolute", left: 80 + i * 240, top: 100, fontFamily: SANS, fontWeight: 600, fontSize: 30, color: i === hot ? tokens.stamp : tokens.quiet }}>{d}</div>)}
      <Folder x={560} y={170} label={folders[0]} />
      <div style={{ position: "absolute", left: 80, top: 420, fontFamily: SANS, fontWeight: 700, fontSize: 118, lineHeight: 1.0, letterSpacing: "-0.04em", color: tokens.ink }}>{first}</div>
      <div style={{ position: "absolute", left: 300, top: 560, display: "flex", alignItems: "center", gap: 30, fontFamily: SANS, fontWeight: 500, fontSize: 118, letterSpacing: "-0.04em", color: tokens.ink }}>
        <svg width={90} height={60} viewBox="0 0 90 60"><path d="M 4 30 H 80 M 56 8 L 82 30 L 56 52" fill="none" stroke={tokens.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /></svg>{second}
      </div>
      <Folder x={120} y={800} label={folders[1]} />
      <Folder x={780} y={960} label={folders[2]} />
      <div style={{ position: "absolute", left: 80, bottom: 110, fontFamily: SANS, fontSize: 24, lineHeight: 1.3, color: tokens.quiet }}><Br text={foot} /></div>
      <div style={{ position: "absolute", right: 80, bottom: 100 }}><Mark size={64} /></div>
    </AbsoluteFill>
  );
};

/** 9. Keycaps that spell the idea. The fourth key is kraft, the fifth blue. */
const Keycaps: React.FC<Extract<PosterProps, { layout: "keycaps" }>> = ({ keys, line }) => {
  const Key: React.FC<{ x: number; y: number; label: string; tint?: string }> = ({ x, y, label, tint = tokens.card }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 230, height: 230, borderRadius: 34, background: `linear-gradient(160deg, ${tint}, ${alpha(tint, 0.82)})`, boxShadow: `inset 0 -16px 0 ${alpha(tokens.ink, 0.12)}, 0 22px 40px ${alpha(tokens.night, 0.55)}` }}>
      <div style={{ position: "absolute", left: 22, right: 22, top: 16, bottom: 34, borderRadius: 24, background: alpha(tokens.white, 0.35) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: label.length > 7 ? 32 : 40, color: tokens.ink }}>{label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, ${tokens.ink}, ${tokens.night})` }}>
      <Key x={150} y={330} label={keys[0]} />
      <Key x={425} y={330} label={keys[1]} />
      <Key x={700} y={330} label={keys[2]} />
      <Key x={287} y={605} label={keys[3]} tint={tokens.kraft} />
      <Key x={562} y={605} label={keys[4]} tint={tokens.mark} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 960, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 66, lineHeight: 1.1, color: tokens.white }}><Br text={line} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, textAlign: "center" }}><Mark size={72} colour={tokens.white} /></div>
    </AbsoluteFill>
  );
};

/** 10. Condensed headline with a phone showing today's block. */
const Condensed: React.FC<Extract<PosterProps, { layout: "condensed" }>> = ({ top, bottom, phoneTitle, phoneNext, body }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 70, top: 70, fontFamily: DISPLAY, fontSize: 300, lineHeight: 0.84, letterSpacing: "-0.01em", color: tokens.ink, textTransform: "uppercase" }}><Br text={top} /></div>
    <div style={{ position: "absolute", left: 70, top: 640, fontFamily: DISPLAY, fontSize: 210, lineHeight: 0.86, color: tokens.ink, textTransform: "uppercase" }}><Br text={bottom} /></div>
    <div style={{ position: "absolute", right: 40, top: 170, width: 260, height: 520, borderRadius: 46, background: tokens.night, boxShadow: shadow(1.2), transform: "rotate(8deg)", padding: 16 }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 38, background: tokens.mark, padding: 30, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, color: tokens.white, lineHeight: 1.15 }}>{phoneTitle}</div>
        <div style={{ marginTop: 14, padding: "16px 18px", borderRadius: 16, background: tokens.white, fontFamily: SANS, fontWeight: 600, fontSize: 24, color: tokens.ink }}>{phoneNext}</div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 1130, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div style={{ fontFamily: SANS, fontSize: 30, lineHeight: 1.3, color: tokens.ink, width: 560 }}>{body}</div>
      <Mark size={80} />
    </div>
  </AbsoluteFill>
);

const LAYOUTS = {
  type: TypeStack,
  calculator: Calculator,
  circled: CircledDay,
  envelope: Envelope,
  folder: RedFolder,
  drawer: Drawer,
  grid: BlueGrid,
  calendar: FolderCalendar,
  keycaps: Keycaps,
  condensed: Condensed,
} as const;

export const Poster: React.FC<PosterProps> = (props) => {
  const L = LAYOUTS[props.layout] as React.FC<PosterProps>;
  return <L {...props} />;
};

export const posterDefaults: PosterProps = { layout: "type", top: "Miss it.\nMove it.", bottom: "Keep\ngoing.", foot: "The plan moves with you" };
