import { Audio } from "@remotion/media";
import { Easing, interpolate, Sequence, spring, staticFile, type SpringConfig } from "remotion";
import { tokens } from "../tokens";

/**
 * Kinetic type: one headline, many treatments. Each part says how it arrives (fx),
 * and the whole line says how it leaves (exit). Every part lands on its own time.
 */
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type Fx =
  | "rise" // blur up (default)
  | "slam" // huge to size with echo rings
  | "stamp" // tilted, hard landing, boxed
  | "shake" // letters jitter, then settle
  | "slide" // in from the right with motion blur
  | "flip" // per-word 3D flip down
  | "track" // letter-spacing closes in
  | "drop" // letters fall in one by one
  | "type" // characters typed on
  | "pop" // springy scale
  | "mask" // rises out of a hidden line, precise ease-out
  | "bounce" // per-letter bounce: amp·e^(−decay·t)·cos(2π·freq·t), staggered 0.06s a letter
  | "cut"; // appears on its frame, no animation

export type Deco = "marker" | "underline" | "shine" | "outline" | "echo";

export type KPart = {
  text: string;
  t: number;
  fx?: Fx;
  colour?: string;
  deco?: Deco;
  decoColour?: string;
  decoAt?: number;
  /** count from this number to the number in text, over the given seconds */
  count?: { from: number; dur: number };
  dur?: number; // for type / drop / track
};

/** The sound each word makes as it lands, by its move. */
const WORD_SFX: Partial<Record<Fx, [string, number]>> = {
  slam: ["w_slam", 0.34],
  stamp: ["w_slam", 0.3],
  bounce: ["w_bounce", 0.3],
  drop: ["w_drop", 0.26],
  track: ["w_swish", 0.22],
  shake: ["w_shake", 0.24],
};

export type Exit = "blur" | "left" | "down" | "scale" | "wipe" | "cut";

const SNAP: Partial<SpringConfig> = { damping: 200, mass: 0.6, stiffness: 260 };
const BOUNCE: Partial<SpringConfig> = { damping: 11, mass: 0.5, stiffness: 240 };
const HARD: Partial<SpringConfig> = { damping: 16, mass: 0.6, stiffness: 420 };

export const Kinetic: React.FC<{
  parts: KPart[];
  frame: number;
  fps: number;
  y: number;
  size: number;
  out: number;
  exit?: Exit;
  font: string;
  weight?: number;
  colour?: string;
  gap?: number;
  tracking?: string;
  align?: "left" | "center" | "right";
  /** run up the left edge; y is then the distance from the left of the frame */
  vertical?: boolean;
  tilt?: number;
  /** play a sound as each word lands (default on) */
  sound?: boolean;
}> = ({ parts, frame, fps, y, size, out, exit = "blur", font, weight = 750, colour = tokens.ink, gap, tracking = "-0.045em", align = "center", vertical, tilt = 0, sound = true }) => {
  const t = frame / fps;
  if (t < Math.min(...parts.map((p) => p.t)) - 0.15 || t > out + 0.6) return null;
  const sp = (at: number, c: Partial<SpringConfig> = SNAP) => spring({ frame: frame - Math.round(at * fps), fps, config: c });
  const L = sp(out);
  if (exit === "cut" && t >= out) return null;
  const exitStyle: React.CSSProperties =
    exit === "cut"
      ? {}
      : exit === "left"
      ? { transform: `translateX(${-L * 900}px)`, filter: L > 0.02 ? `blur(${L * 30}px)` : undefined, opacity: 1 - L * 0.6 }
      : exit === "down"
        ? { transform: `translateY(${L * 120}px)`, opacity: 1 - L, filter: L > 0.02 ? `blur(${L * 14}px)` : undefined }
        : exit === "scale"
          ? { transform: `scale(${1 + L * 0.6})`, opacity: 1 - L, filter: L > 0.02 ? `blur(${L * 20}px)` : undefined }
          : exit === "wipe"
            ? { clipPath: `inset(0 0 0 ${L * 100}%)` }
            : { transform: `translateY(${-L * 60}px)`, opacity: 1 - L, filter: L > 0.02 ? `blur(${L * 18}px)` : undefined };

  const body = (
    <div
      style={{
        position: "absolute",
        left: vertical ? 160 : 70,
        right: vertical ? 160 : 70,
        top: y,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
        rotate: tilt ? `${tilt}deg` : undefined,
        columnGap: gap ?? size * 0.26,
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        letterSpacing: tracking,
        lineHeight: 1.04,
        textAlign: align,
        perspective: 1400,
        ...exitStyle,
      }}
    >
      {parts.map((p, i) => {
        const fx = p.fx ?? "rise";
        const c = p.colour ?? colour;
        const on = t >= p.t - 0.04;
        const k = sp(p.t - 0.04, fx === "slam" || fx === "stamp" ? HARD : fx === "pop" ? BOUNCE : SNAP);
        let text = p.text;
        if (p.count) {
          const target = parseInt(p.text, 10);
          text = String(Math.round(interpolate(t, [p.t, p.t + p.count.dur], [p.count.from, target], clamp)));
        }

        const decoK = sp(p.decoAt ?? p.t + 0.12);
        const deco = (inner: React.ReactNode) => (
          <span style={{ position: "relative", display: "inline-block", isolation: "isolate" }}>
            {p.deco === "marker" ? (
              <span style={{ position: "absolute", left: "-0.08em", right: "-0.08em", top: "0.12em", bottom: "0.02em", background: p.decoColour ?? tokens.problem, opacity: 0.22, transformOrigin: "left", transform: `scaleX(${decoK}) skewX(-8deg)`, borderRadius: 8, zIndex: -1 }} />
            ) : null}
            {p.deco === "underline" ? (
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "-0.04em", height: "0.08em", borderRadius: 99, background: p.decoColour ?? c, transformOrigin: "left", transform: `scaleX(${decoK})` }} />
            ) : null}
            {p.deco === "echo"
              ? [1, 2, 3].map((n) => (
                  <span key={n} aria-hidden style={{ position: "absolute", left: 0, top: 0, color: "transparent", WebkitTextStroke: `2px ${c}`, opacity: (0.5 - n * 0.12) * Math.min(1, k), transform: `translateY(${n * size * 0.16 * Math.min(1, k)}px)`, zIndex: -1 }}>
                    {text}
                  </span>
                ))
              : null}
            {inner}
          </span>
        );

        // per-character effects
        const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
        if (fx === "track" || fx === "mask") {
          const dur = p.dur ?? (fx === "track" ? 0.7 : 0.6);
          const e = interpolate(t, [p.t - 0.04, p.t - 0.04 + dur], [0, 1], { ...clamp, easing: EXPO });
          const inner =
            fx === "track" ? (
              <span style={{ display: "inline-block", letterSpacing: `${interpolate(e, [0, 1], [0.32, 0])}em`, marginRight: `${interpolate(e, [0, 1], [-0.32, 0])}em`, opacity: interpolate(e, [0, 0.45], [0, 1], clamp), filter: e < 0.98 ? `blur(${(1 - e) * 8}px)` : undefined, color: c }}>
                {text}
              </span>
            ) : (
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span style={{ display: "inline-block", transform: `translateY(${(1 - e) * 135}%)`, color: c }}>{text}</span>
              </span>
            );
          return (
            <span key={i} style={{ position: "relative", display: "inline-block" }}>
              {deco(inner)}
            </span>
          );
        }

        if (fx === "bounce") {
          const chars = [...text];
          const amp = size * 0.6;
          const freq = 2.5;
          const decay = 6;
          const delay = 0.06;
          return (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {deco(
                chars.map((ch, j) => {
                  const lt = t - p.t - j * delay;
                  if (lt < 0) return <span key={j} style={{ display: "inline-block", opacity: 0 }}>{ch}</span>;
                  const b = Math.exp(-decay * lt) * Math.cos(freq * 2 * Math.PI * lt);
                  return (
                    <span key={j} style={{ display: "inline-block", color: c, transform: `translateY(${-amp * b}px)`, opacity: Math.min(1, lt * 12) }}>
                      {ch}
                    </span>
                  );
                }),
              )}
            </span>
          );
        }

        if (fx === "shake" || fx === "drop" || fx === "type") {
          const chars = [...text];
          const dur = p.dur ?? (fx === "type" ? 0.035 * chars.length : 0.3);
          return (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {deco(
                chars.map((ch, j) => {
                  const ct = p.t + (j / Math.max(1, chars.length)) * dur;
                  const ck = sp(ct - 0.02, fx === "drop" ? BOUNCE : SNAP);
                  const shown = t >= ct - 0.02;
                  let tr = "";
                  let op = 1;
                  if (fx === "type") op = shown ? 1 : 0;
                  if (fx === "drop") {
                    tr = `translateY(${(1 - ck) * -size * 0.9}px) rotate(${(1 - ck) * (j % 2 ? 14 : -14)}deg)`;
                    op = Math.min(1, ck * 1.6);
                  }
                  if (fx === "shake") {
                    const settle = Math.max(0, 1 - (t - p.t) / 0.7);
                    const a = size * 0.05 * settle;
                    tr = `translate(${Math.sin(t * 70 + j * 2.1) * a}px, ${Math.cos(t * 63 + j * 1.3) * a}px) rotate(${Math.sin(t * 50 + j) * 6 * settle}deg)`;
                    op = Math.min(1, sp(p.t - 0.04) * 1.5);
                  }
                  return (
                    <span key={j} style={{ display: "inline-block", color: c, opacity: op, transform: tr,  }}>
                      {ch}
                    </span>
                  );
                }),
              )}
            </span>
          );
        }

        let tr = "";
        let op = 1;
        let blur = 0;
        if (fx === "rise") {
          tr = `translateY(${(1 - k) * size * 0.45}px)`;
          op = k;
          blur = (1 - k) * 14;
        } else if (fx === "slam") {
          tr = `scale(${interpolate(k, [0, 1], [3.2, 1])})`;
          op = on ? Math.min(1, k * 3) : 0;
          blur = (1 - Math.min(1, k)) * 16;
        } else if (fx === "stamp") {
          tr = `rotate(${interpolate(k, [0, 1], [-14, -4])}deg) scale(${interpolate(k, [0, 1], [1.9, 1])})`;
          op = on ? Math.min(1, k * 3) : 0;
        } else if (fx === "slide") {
          tr = `translateX(${(1 - k) * 700}px)`;
          op = on ? Math.min(1, k * 2) : 0;
          blur = (1 - k) * 26;
        } else if (fx === "flip") {
          tr = `rotateX(${(1 - k) * -95}deg)`;
          op = on ? Math.min(1, k * 2) : 0;
        } else if (fx === "cut") {
          op = on ? 1 : 0;
        } else if (fx === "pop") {
          tr = `scale(${on ? k : 0})`;
        }

        const shine =
          p.deco === "shine"
            ? {
                backgroundImage: `linear-gradient(100deg, ${c} 0%, ${c} 40%, ${tokens.white} 50%, ${c} 60%, ${c} 100%)`,
                backgroundSize: "300% 100%",
                backgroundPosition: `${interpolate(t, [p.decoAt ?? p.t + 0.3, (p.decoAt ?? p.t + 0.3) + 0.7], [100, 0], clamp)}% 0`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }
            : {};
        const outline = p.deco === "outline" ? { color: "transparent", WebkitTextStroke: `${Math.max(3, size * 0.03)}px ${c}` } : {};
        const box =
          fx === "stamp"
            ? { border: `${size * 0.05}px solid ${c}`, borderRadius: size * 0.16, padding: "0.04em 0.22em 0.08em" }
            : {};

        return (
          <span key={i} style={{ position: "relative", display: "inline-block", transformStyle: "preserve-3d", transformOrigin: fx === "flip" ? "50% 100%" : "50% 55%", transform: tr, opacity: op, filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined, color: c, ...box }}>
            {deco(<span style={{ ...shine, ...outline }}>{text}</span>)}
            {fx === "slam" && k > 0 && k < 1.2
              ? [1, 2].map((n) => (
                  <span key={n} aria-hidden style={{ position: "absolute", inset: 0, color: "transparent", WebkitTextStroke: `3px ${c}`, opacity: Math.max(0, (1 - Math.min(1, sp(p.t + 0.02 + n * 0.04, { damping: 200, stiffness: 60 }))) * 0.6), transform: `scale(${1 + Math.min(1, sp(p.t + 0.02 + n * 0.04, { damping: 200, stiffness: 60 })) * 0.5 * n})` }}>
                    {text}
                  </span>
                ))
              : null}
          </span>
        );
      })}
    </div>
  );
  let last = -1;
  const sfx = sound
    ? parts.map((p, i) => {
        const fx = p.fx ?? "rise";
        if (fx === "cut" || p.t < 0.05 || p.t - last < 0.06 || p.t > out) return null;
        last = p.t;
        const [name, v] = WORD_SFX[fx] ?? [`w_pop${(p.text.length + i * 3) % 5}`, 0.17];
        return (
          <Sequence key={`s${i}`} from={Math.round(p.t * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none">
            <Audio src={staticFile(`sfx/${name}.wav`)} volume={v} />
          </Sequence>
        );
      })
    : null;
  if (!vertical) return <>{sfx}{body}</>;
  return <>{sfx}<div style={{ position: "absolute", left: -420, top: 420, width: 1920, height: 1080, transform: "rotate(-90deg)" }}>{body}</div></>;
};
