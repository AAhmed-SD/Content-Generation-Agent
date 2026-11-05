import { AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile } from "remotion";
import { tokens } from "../../tokens";
import logo from "../logo.json";
import { alpha, INTER, mix, POP, soft, useK } from "./dark";

/**
 * The Offload mark, animated: the blue dot swoops in and lands, the wordmark is painted on with a
 * brush, the dot hops and bounces, and on the bounce a paper splash floods the frame and turns the
 * mark to its real colours (ink on paper, blue dot). Paths are traced from the logo file.
 */
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const D = logo.dot;

export const STING = { land: 0.55, paint: [0.5, 1.15] as const, hop: [1.3, 1.78] as const, splash: 1.78, settle: 2.5 };

const blob = (cx: number, cy: number, R: number, t: number) => {
  const wob = Math.max(0, 1 - R / 1800);
  const pts = Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const r = R * (1 + wob * (0.09 * Math.sin(5 * a + t * 4) + 0.06 * Math.sin(9 * a - t * 6) + 0.04 * Math.sin(14 * a + 1.3)));
    return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  });
  return `M ${pts.join(" L ")} Z`;
};

export const LogoSting: React.FC<{
  at: number;
  x?: number;
  y?: number;
  width?: number;
  splash?: boolean;
  lift?: { at: number; y: number; width: number };
  /** wordmark colour before the splash, and after it */
  text?: string;
  textAfter?: string;
  /** the dot bursts into this colour, then re-forms in dotAfter */
  splashColour?: string;
  dotAfter?: string;
  /** draw past the 1080x1920 canvas (for a wide screen): the ring and the flash bleed out */
  bleed?: boolean;
}> = ({ at, x = 540, y = 900, width = 820, splash = true, lift, text = tokens.white, textAfter = tokens.white, splashColour = tokens.mark, dotAfter = tokens.white, bleed = false }) => {
  const { t, sp } = useK();
  const u = t - at;
  if (u < -0.05) return null;

  // where the mark sits (it can lift to make room for the call to action)
  const L = lift ? sp(lift.at, { damping: 200, stiffness: 160, mass: 0.7 }) : 0;
  const W = mix(width, lift?.width ?? width, L);
  const k = W / logo.w;
  const X0 = x - W / 2;
  const Y0 = mix(y, lift?.y ?? y, L) - (logo.h / 2) * k;
  const rest = { x: X0 + D.cx * k, y: Y0 + D.cy * k };
  const r = D.r * k;

  // dot: swoop along a curve, land, hop, bounce
  const p = interpolate(u, [0, STING.land], [0, 1], { ...clamp, easing: Easing.bezier(0.45, 0, 0.2, 1) });
  const P0 = { x: 1280, y: rest.y - 760 };
  const P1 = { x: 620, y: rest.y + 520 };
  const bez = (q: number) => ({ x: (1 - q) ** 2 * P0.x + 2 * (1 - q) * q * P1.x + q * q * rest.x, y: (1 - q) ** 2 * P0.y + 2 * (1 - q) * q * P1.y + q * q * rest.y });
  const pos = bez(p);
  const prev = bez(Math.max(0, p - 0.04));
  const speed = Math.hypot(pos.x - prev.x, pos.y - prev.y);
  const angle = (Math.atan2(pos.y - prev.y, pos.x - prev.x) * 180) / Math.PI;
  const stretch = p < 1 ? Math.min(0.7, speed / 90) : 0;
  const hopU = interpolate(u, STING.hop, [0, 1], clamp);
  const hopY = hopU > 0 && hopU < 1 ? -4 * hopU * (1 - hopU) * 150 * (W / 820) : 0;
  const squashAt = (t0: number) => (u < t0 ? 0 : Math.exp(-(u - t0) * 9) * Math.cos((u - t0) * 26));
  const sq = 0.32 * squashAt(STING.land) + 0.38 * squashAt(STING.hop[1]) - (hopU > 0 && hopU < 0.25 ? 0.18 * (1 - hopU * 4) : 0);
  const dot = { x: p < 1 ? pos.x : rest.x, y: (p < 1 ? pos.y : rest.y) + hopY };
  const burst = splash ? interpolate(u, [STING.splash - 0.03, STING.splash + 0.06], [0, 1], clamp) : 0;
  const reform = splash ? sp(at + STING.splash + 0.32, POP) : 0;
  const dip = 10 * (W / 820) * (squashAt(STING.land) * 0.6 + squashAt(STING.hop[1]));

  // brush paint
  const paint = interpolate(u, STING.paint, [0, 1], { ...clamp, easing: Easing.bezier(0.6, 0, 0.3, 1) });
  const paint2 = interpolate(u, [STING.paint[0] + 0.12, STING.paint[1] + 0.08], [0, 1], { ...clamp, easing: Easing.bezier(0.6, 0, 0.3, 1) });

  // splash
  const sU = u - STING.splash;
  const R = splash && sU > 0 ? Math.max(r * 1.4, 2600 * (1 - Math.exp(-sU * 3.0))) : 0;
  const drops = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + 0.3 * Math.sin(i * 7.1);
    const d = R * (1.08 + 0.18 * ((i * 37) % 10) / 10) + 40;
    const rr = (18 + ((i * 13) % 22)) * Math.max(0, 1 - sU * 1.3);
    return { x: dot.x + Math.cos(a) * d, y: dot.y + Math.sin(a) * d, r: rr };
  });

  const mark = (text: string, id: string) => (
    <g transform={`translate(${X0} ${Y0 + dip}) scale(${k})`}>
      <path d={logo.text} fill={text} fillRule="evenodd" mask={`url(#${id})`} />
    </g>
  );
  const Dot =
    burst < 1 ? (
      <g transform={`translate(${dot.x} ${dot.y + burst * r * 0.5}) rotate(${p < 1 ? angle : 0}) scale(${1 + stretch + sq + burst * 0.9}, ${Math.max(0.05, 1 - stretch * 0.45 - sq - burst * 0.8)})`}>
        <circle r={r} fill={tokens.mark} />
      </g>
    ) : reform > 0.01 ? (
      <circle cx={rest.x} cy={rest.y} r={r * reform} fill={dotAfter} />
    ) : null;
  const trail =
    p > 0 && p < 1
      ? [0.05, 0.1, 0.15, 0.2].map((d, i) => {
          const q = bez(Math.max(0, p - d));
          return <circle key={i} cx={q.x} cy={q.y} r={r * (0.85 - i * 0.15)} fill={tokens.mark} opacity={0.32 - i * 0.07} />;
        })
      : null;

  const brush = (id: string) => (
    <mask id={id} maskUnits="userSpaceOnUse" x={-50} y={-50} width={logo.w + 100} height={logo.h + 100}>
      <g filter={`url(#${id}-rough)`}>
        <path d="M128 72 C 220 58, 330 84, 500 64" stroke="white" strokeWidth={56} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - paint} />
        <path d="M128 108 C 240 120, 350 96, 500 112" stroke="white" strokeWidth={56} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - paint2} />
      </g>
    </mask>
  );

  const shake = splash && sU > 0 && sU < 0.4 ? (1 - sU / 0.4) * 16 : 0;
  const flash = splash ? interpolate(sU, [0, 0.03, 0.18], [0, 0.4, 0], clamp) : 0;
  const wave = splash && sU > 0 && sU < 0.9 ? sU / 0.9 : 0;
  return (
    <AbsoluteFill style={{ transform: shake ? `translate(${Math.sin(u * 90) * shake}px, ${Math.cos(u * 77) * shake}px)` : undefined }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: bleed ? "visible" : undefined }}>
        <defs>
          <filter id="lg-a-rough" x="-20%" y="-50%" width="140%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={2} seed={3} />
            <feDisplacementMap in="SourceGraphic" scale={9} />
          </filter>
          <filter id="lg-b-rough" x="-20%" y="-50%" width="140%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={2} seed={3} />
            <feDisplacementMap in="SourceGraphic" scale={9} />
          </filter>
          {brush("lg-a")}
          {brush("lg-b")}
          <clipPath id="lg-splash">
            <path d={R > 0 ? blob(dot.x, dot.y, R, sU) : "M0 0 Z"} />
          </clipPath>
        </defs>
        {/* on the night */}
        {mark(text, "lg-a")}
        {trail}
        {/* the splash: paper, ink mark */}
        {R > 0 ? (
          <>
            <g clipPath="url(#lg-splash)">
              <rect width={1080} height={1920} fill={splashColour} />
              {mark(textAfter, "lg-b")}
            </g>
            {drops.map((d, i) => (d.r > 0.5 ? <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={splashColour} /> : null))}
          </>
        ) : null}
        {Dot}
        {wave > 0 ? <circle cx={dot.x} cy={dot.y} r={r + wave * 900} fill="none" stroke={tokens.white} strokeWidth={14 * (1 - wave)} opacity={1 - wave} /> : null}
      </svg>
      {flash > 0.01 ? <AbsoluteFill style={{ background: tokens.white, opacity: flash, ...(bleed ? { inset: -2000, width: "auto", height: "auto" } : {}) }} /> : null}
    </AbsoluteFill>
  );
};

/** End card built on the sting: the mark lands, splashes, lifts, and the call to action types in under it. */
export const LogoEnd: React.FC<{ at: number; lead: string; pill: string; bg?: string; text?: string }> = ({ at, lead, pill, bg = tokens.ink, text = tokens.white }) => {
  const { t, sp } = useK();
  if (t < at - 0.05) return null;
  const c = at + STING.settle;
  const a = sp(c + 0.35, POP);
  const b = sp(c + 0.5, POP);
  return (
    <AbsoluteFill style={{ background: bg }}>
      <LogoSting at={at} y={900} width={820} lift={{ at: c - 0.1, y: 640, width: 640 }} text={text} />
      {t > c ? (
        <AbsoluteFill style={{ alignItems: "center" }}>
          <div style={{ marginTop: 760, width: 860, textAlign: "center", fontFamily: INTER, fontWeight: 650, fontSize: 50, lineHeight: 1.18, letterSpacing: "-0.02em", color: alpha(tokens.white, 0.92), opacity: Math.min(1, sp(c - 0.05) * 1.5), transform: `translateY(${(1 - sp(c - 0.05)) * 30}px)` }}>A study system that adapts when real life happens.</div>
          <div style={{ marginTop: 70, fontFamily: INTER, fontWeight: 750, fontSize: 88, letterSpacing: "-0.045em", color: tokens.white, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - a) * 40}px)` }}>{lead}</div>
          <div style={{ marginTop: 34, padding: "28px 66px", borderRadius: 999, background: tokens.white, boxShadow: soft(1), fontFamily: INTER, fontWeight: 850, fontSize: 96, letterSpacing: "-0.045em", lineHeight: 1, color: tokens.mark, transform: `scale(${mix(0.6, 1, b)})`, opacity: Math.min(1, b * 2) }}>{pill}</div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

/** The sting's sounds, for any composition's cue list. */
export const logoCues = (at: number) => [
  { t: at - 0.05, s: "logo_swoop", v: 0.55 },
  { t: at + STING.hop[1] - 1.3, s: "riser_long", v: 0.28 },
  { t: at + STING.splash, s: "subdrop", v: 0.6 },
  { t: at + STING.land - 0.02, s: "logo_land", v: 0.5 },
  { t: at + STING.paint[0], s: "logo_paint", v: 0.5 },
  { t: at + STING.hop[0], s: "logo_hop", v: 0.35 },
  { t: at + STING.hop[1] - 0.02, s: "logo_bounce", v: 0.55 },
  { t: at + STING.splash, s: "logo_splash", v: 0.6 },
];

/** Standalone sting, for intros and the profile. */
export const LogoIntro: React.FC = () => {
  const { fps } = useK();
  return (
    <AbsoluteFill style={{ background: tokens.ink }}>
      <LogoSting at={0.3} />
      {logoCues(0.3).map((c, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(c.t * fps))} durationInFrames={Math.round(1.6 * fps)} layout="none">
          <Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** The desk's opening: the end card's sting and tagline, with no call to action, centred on a wide screen. */
export const DeskIntro: React.FC = () => {
  const { t, sp } = useK();
  const at = 0.3;
  const c = at + STING.settle;
  const g = Math.min(1, Math.max(0, (t - (at + STING.splash)) / 0.5));
  const wash = 1 - Math.pow(1 - g, 3);
  return (
    <AbsoluteFill style={{ background: tokens.ink }}>
      <AbsoluteFill style={{ background: tokens.mark, clipPath: `circle(${wash * 2300}px at 640px 650px)` }} />
      <div style={{ position: "absolute", left: 420, top: -250, width: 1080, height: 1920 }}>
        <LogoSting at={at} y={900} width={820} lift={{ at: c - 0.1, y: 640, width: 640 }} bleed />
        {t > c ? (
          <div style={{ position: "absolute", left: 110, right: 110, top: 760, textAlign: "center", fontFamily: INTER, fontWeight: 650, fontSize: 50, lineHeight: 1.18, letterSpacing: "-0.02em", color: alpha(tokens.white, 0.92), opacity: Math.min(1, sp(c - 0.05) * 1.5), transform: `translateY(${(1 - sp(c - 0.05)) * 30}px)` }}>
            A study system that adapts when real life happens.
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
