import { AbsoluteFill } from "remotion";
import { tokens } from "../../tokens";
import { alpha, INTER, useK } from "./dark";

/**
 * Glass: system-style surfaces with a real backdrop blur, for notifications, mail and sheets.
 * Recipe from docs/design-references/apple.md: saturate(180%) blur, a translucent fill, a hairline, a soft top sheen.
 * Glass only reads as glass over colour, so use it on a Wallpaper (or over a picture).
 */
export const glass = (dark = false, strength = 30): React.CSSProperties => ({
  background: dark ? alpha(tokens.ink, 0.42) : alpha(tokens.white, 0.52),
  backdropFilter: `saturate(180%) blur(${strength}px)`,
  WebkitBackdropFilter: `saturate(180%) blur(${strength}px)`,
  border: `1.5px solid ${dark ? alpha(tokens.white, 0.16) : alpha(tokens.white, 0.7)}`,
  boxShadow: `inset 0 1.5px 0 ${alpha(tokens.white, dark ? 0.18 : 0.85)}, 0 18px 50px ${alpha(tokens.night, 0.18)}`,
});

/** Soft moving colour fields for glass to sit on: the brand blue, kraft and a little red, never loud. */
export const Wallpaper: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const { t } = useK();
  const blobs = [
    { c: tokens.mark, x: 260, y: 520, r: 620, a: 0.85 },
    { c: tokens.kraft, x: 860, y: 1180, r: 560, a: 0.75 },
    { c: tokens.problem, x: 300, y: 1560, r: 420, a: 0.35 },
    { c: tokens.blue, x: 900, y: 360, r: 420, a: 0.6 },
  ];
  return (
    <AbsoluteFill style={{ background: dark ? tokens.night : tokens.paper, overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x - b.r + Math.sin(t * 0.25 + i) * 60, top: b.y - b.r + Math.cos(t * 0.2 + i * 2) * 60, width: b.r * 2, height: b.r * 2, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(b.c, b.a)}, ${alpha(b.c, 0)} 68%)`, filter: "blur(20px)" }} />
      ))}
    </AbsoluteFill>
  );
};

export const AppIcon: React.FC<{ size?: number; tone?: "mark" | "kraft" | "ink" | "problem" | "glass" }> = ({ size = 76, tone = "mark" }) => {
  const bg = tone === "glass" ? alpha(tokens.white, 0.35) : tokens[tone];
  return (
    <div style={{ flex: "none", width: size, height: size, borderRadius: size * 0.235, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `inset 0 1px 0 ${alpha(tokens.white, 0.35)}` }}>
      <div style={{ width: size * 0.3, height: size * 0.3, borderRadius: size, background: tokens.white }} />
    </div>
  );
};

/** A notification banner. */
export const GlassNotification: React.FC<{ app: string; title: string; body: string; time?: string; tone?: "mark" | "kraft" | "ink" | "problem" | "glass"; dark?: boolean; style?: React.CSSProperties }> = ({ app, title, body, time = "now", tone = "mark", dark = false, style }) => (
  <div style={{ ...glass(dark), borderRadius: 44, padding: "26px 30px", display: "flex", gap: 24, alignItems: "center", ...style }}>
    <AppIcon tone={tone} />
    <div style={{ flex: 1, minWidth: 0, color: dark ? tokens.white : tokens.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: INTER, fontWeight: 600, fontSize: 26, opacity: 0.65 }}><span>{app}</span><span>{time}</span></div>
      <div style={{ fontFamily: INTER, fontWeight: 750, fontSize: 36, lineHeight: 1.15, marginTop: 2 }}>{title}</div>
      <div style={{ fontFamily: INTER, fontWeight: 450, fontSize: 32, lineHeight: 1.2, opacity: 0.85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{body}</div>
    </div>
  </div>
);

/** A mail sheet: sender, subject, a few lines. */
export const GlassMail: React.FC<{ from: string; subject: string; lines: string[]; dark?: boolean; style?: React.CSSProperties }> = ({ from, subject, lines, dark = false, style }) => (
  <div style={{ ...glass(dark, 36), borderRadius: 48, padding: "40px 44px", color: dark ? tokens.white : tokens.ink, ...style }}>
    <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
      <div style={{ width: 84, height: 84, borderRadius: 42, background: alpha(tokens.mark, 0.85), color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>{from.slice(0, 1).toUpperCase()}</div>
      <div>
        <div style={{ fontFamily: INTER, fontWeight: 750, fontSize: 36 }}>{from}</div>
        <div style={{ fontFamily: INTER, fontSize: 28, opacity: 0.65 }}>to me</div>
      </div>
    </div>
    <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 48, lineHeight: 1.1, marginTop: 30, letterSpacing: "-0.02em" }}>{subject}</div>
    {lines.map((l, i) => <div key={i} style={{ fontFamily: INTER, fontSize: 34, lineHeight: 1.35, marginTop: i ? 6 : 20, opacity: 0.85 }}>{l}</div>)}
  </div>
);
