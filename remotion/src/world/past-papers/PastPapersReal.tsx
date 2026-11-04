import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tokens } from "../../tokens";
import { Kinetic, type KPart } from "../kinetic";
import { Circle, Cross, Tick } from "../marks";
import { Wordmark } from "../zine";
import layout from "./layout.json";
import scene from "./real-scene.json";
import timing from "./timing.json";

/**
 * Past papers on a real desk. Every object is a photographic layer rendered from the same
 * camera, lights and depth of field; Remotion moves them, pushes the camera in, and warps
 * the marker onto the paper in perspective.
 */
const INTER = "Inter";
loadFont({ family: INTER, url: staticFile("fonts/InterVariable.woff2"), weight: "100 900" });

export const REAL_DURATION_S = timing.duration;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
const IO = Easing.bezier(0.65, 0, 0.35, 1);
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const ls = (id: string) => timing.lines.find((x) => x.id === id)!.start;
const at = (line: string, word: string) => {
  const l = timing.lines.find((x) => x.id === line)!;
  return (l.words.find((w) => norm(w.text).startsWith(norm(word))) ?? l.words[0]).start;
};
const kw = (text: string, line: string, fx: KPart["fx"] = "mask", per: Record<string, Partial<KPart>> = {}): KPart[] => {
  const lw = timing.lines.find((x) => x.id === line)!.words;
  const ws = text.split(" ");
  let cur = Math.max(0, lw.findIndex((x) => norm(x.text) === norm(ws[0])));
  return ws.map((w) => {
    const idx = lw.findIndex((x, j) => j >= cur && norm(x.text) === norm(w));
    const hit = idx >= 0 ? lw[idx] : lw[Math.min(cur, lw.length - 1)];
    if (idx >= 0) cur = idx + 1;
    return { text: w, t: hit.start, fx, ...(per[norm(w)] ?? {}) };
  });
};

const T = {
  stop: ls("L1"),
  this: at("L1", "this"),
  doPaper: ls("L2"),
  mark: at("L2", "mark"),
  feel: at("L2", "feel"),
  awful: at("L2", "awful"),
  next: at("L2", "next"),
  ten: ls("L3"),
  same: at("L3", "same"),
  mistakes: at("L3", "mistakes"),
  marks: ls("L4"),
  lost: at("L4", "lost"),
  point: at("L4", "that's"),
  turn: ls("L5"),
  flashcard: at("L5", "flashcard"),
  redo: ls("L6"),
  three: at("L6", "three"),
  then: at("L6", "then"),
  week: at("L6", "week"),
  thats: ls("L7"),
  spacing: at("L7", "spacing"),
  its: at("L7", "it's"),
  sticks: at("L7", "sticks"),
  offload: ls("L8"),
  builds: at("L8", "builds"),
  deck: at("L8", "remediation"),
  exactly: at("L8", "exactly"),
  comment: ls("L9"),
  papers: at("L9", "papers"),
  send: at("L9", "send"),
  end: timing.duration,
};

// ---------- perspective: map a flat rectangle onto a quad on the desk ----------
type P = number[];
const solve = (A: number[][], b: number[]) => {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
};
/** CSS matrix3d that maps a w x h box (origin top-left) onto quad [TL, TR, BR, BL]. */
const toQuad = (w: number, h: number, q: P[]) => {
  const src = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = q[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  const [a, b2, c, d, e, f, g, h2] = solve(A, b);
  return `matrix3d(${a},${d},0,${g},${b2},${e},0,${h2},0,0,1,0,${c},${f},0,1)`;
};
/** A point on a quad from normalised (u, v), via the same homography. */
const onQuad = (q: P[], u: number, v: number) => {
  const top = [q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1] + (q[1][1] - q[0][1]) * u];
  const bot = [q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1] + (q[2][1] - q[3][1]) * u];
  return { x: top[0] + (bot[0] - top[0]) * v, y: top[1] + (bot[1] - top[1]) * v };
};

const PW = 1000;
const PH = 1414;
const qb = (n: number) => {
  const b = (layout.paper2 as { x0: number; y0: number; x1: number; y1: number }[])[n - 1];
  return { x0: b.x0 * PW, y0: b.y0 * PH, x1: b.x1 * PW, y1: b.y1 * PH, u: (b.x0 + b.x1) / 2, v: (b.y0 + b.y1) / 2 };
};
const HERO = scene.hero as P[];
const Q4 = onQuad(HERO, qb(4).u, qb(4).v);
const CARD_C = onQuad(scene.card as P[], 0.5, 0.5);
const CAL = scene.calendar as P[];
const day = (d: number) => onQuad(CAL, layout.calendar.x0 + (d - 0.5) * layout.calendar.cell, (layout.calendar.top + layout.calendar.bottom) / 2);
const PHONE = { x: scene.phone[0], y: scene.phone[1] };

/** Marker on a sheet, warped into the sheet's perspective. */
const OnSheet: React.FC<{ quad: P[]; children: React.ReactNode; opacity?: number }> = ({ quad, children, opacity = 1 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: PW, height: PH, transformOrigin: "0 0", transform: toQuad(PW, PH, quad), opacity }}>
    <svg width={PW} height={PH} style={{ overflow: "visible" }}>
      {children}
    </svg>
  </div>
);

const R = (n: string) => staticFile(`real/${n}.png`);
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const CUES: { t: number; s: string; v: number }[] = [
  { t: 0, s: "boom", v: 0.35 },
  { t: T.this, s: "paper", v: 0.3 },
  { t: T.doPaper - 0.1, s: "whoosh", v: 0.22 },
  { t: T.doPaper + 0.05, s: "paper_land", v: 0.45 },
  { t: T.mark, s: "scribble", v: 0.4 },
  { t: T.mark + 0.1, s: "paper_land", v: 0.3 },
  { t: T.feel, s: "scribble", v: 0.4 },
  { t: T.awful, s: "thud", v: 0.28 },
  { t: T.next - 0.05, s: "paper", v: 0.4 },
  { t: T.next + 0.1, s: "paper_land", v: 0.4 },
  { t: T.ten - 0.05, s: "swoosh_down", v: 0.24 },
  ...Array.from({ length: 5 }, (_, i) => ({ t: T.ten + 0.1 + i * 0.1, s: "paper_land", v: 0.22 })),
  { t: T.mistakes, s: "scribble", v: 0.45 },
  { t: T.mistakes + 0.02, s: "boom", v: 0.25 },
  { t: T.marks - 0.1, s: "whoosh", v: 0.24 },
  { t: T.lost, s: "scribble", v: 0.42 },
  { t: T.turn, s: "paper", v: 0.4 },
  { t: T.flashcard - 0.1, s: "flip", v: 0.4 },
  { t: T.redo, s: "paper_land", v: 0.4 },
  { t: T.three, s: "whoosh", v: 0.2 },
  { t: T.three + 0.35, s: "tick", v: 0.3 },
  { t: T.week - 0.15, s: "whoosh", v: 0.2 },
  { t: T.week + 0.2, s: "tick", v: 0.3 },
  { t: T.thats - 0.4, s: "reverse", v: 0.25 },
  { t: T.spacing, s: "boom", v: 0.45 },
  { t: T.its + 0.1, s: "riser", v: 0.14 },
  { t: T.offload - 0.1, s: "swoosh_down", v: 0.25 },
  { t: T.offload + 0.35, s: "thud", v: 0.3 },
  { t: T.builds + 0.3, s: "pop", v: 0.3 },
  { t: T.deck - 0.05, s: "sparkle", v: 0.25 },
  { t: T.deck, s: "ding", v: 0.28 },
  { t: T.comment - 0.15, s: "whoosh", v: 0.24 },
  ...Array.from({ length: 6 }, (_, i) => ({ t: T.papers + i * 0.07, s: "key", v: 0.24 })),
  { t: T.papers + 0.55, s: "sparkle", v: 0.2 },
  { t: T.send, s: "chime", v: 0.18 },
];

export const PastPapersReal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const f = (s: number) => Math.round(s * fps);
  const e = (a: number, d = 0.5, ease = EXPO) => interpolate(t, [a, a + d], [0, 1], { ...clamp, easing: ease });
  const sp = (a: number) => spring({ frame: frame - f(a), fps, config: { damping: 200, mass: 0.6, stiffness: 240 } });

  // ---- camera: drift, push-ins, a pull back for the pile ----
  const zoomKeys: [number, number, number, number][] = [
    // t, zoom, focus x, focus y
    [0, 1.06, 540, 1100],
    [T.doPaper, 1.14, 520, 1150],
    [T.ten, 1.0, 540, 1000],
    [T.marks, 1.7, Q4.x, Q4.y],
    [T.redo, 1.08, 540, 1250],
    [T.offload, 1.18, PHONE.x, PHONE.y - 120],
    [T.comment, 1.05, 540, 1000],
  ];
  let z = zoomKeys[0][1];
  let fx = zoomKeys[0][2];
  let fy = zoomKeys[0][3];
  zoomKeys.forEach(([kt, kz, kx, ky]) => {
    const k = e(kt - 0.1, 0.9, IO);
    z += (kz - z) * k;
    fx += (kx - fx) * k;
    fy += (ky - fy) * k;
  });
  z *= 1 + 0.012 * Math.sin(t * 0.7);
  const dx = Math.sin(t * 0.45) * 6;
  const dy = Math.cos(t * 0.38) * 5;
  const stage = (parallax = 1) => {
    const zz = 1 + (z - 1) * parallax;
    return `translate(${540 + dx * parallax}px, ${960 + dy * parallax}px) scale(${zz}) translate(${-fx}px, ${-fy}px) translate(${(fx - 540) * (1 - parallax)}px, ${(fy - 960) * (1 - parallax)}px)`;
  };

  // ---- layers: in / out ----
  const layer = (inAt: number, outAt: number, from: [number, number] = [0, -50], to: [number, number] = [-900, 0]) => {
    const i = e(inAt, 0.45);
    const o = e(outAt, 0.4, Easing.bezier(0.55, 0, 0.85, 0.35));
    if (t < inAt || o >= 1) return null;
    return { x: from[0] * (1 - i) + to[0] * o, y: from[1] * (1 - i) + to[1] * o, o: Math.min(1, i * 2.5) * (1 - o * 0.6), blur: (1 - i) * 6 + o * 12 };
  };
  const stack = t < T.doPaper + 0.5 ? { x: -900 * e(T.doPaper - 0.05, 0.4, Easing.bezier(0.55, 0, 0.85, 0.35)), y: 0, o: 1, blur: e(T.doPaper - 0.05, 0.4) * 12 } : null;
  const hero = layer(T.doPaper, T.next - 0.02, [0, -60], [-950, 0]);
  const next = layer(T.next, T.ten - 0.05, [950, 0], [0, 900]);
  const pile = layer(T.ten, T.marks - 0.1, [0, -40], [0, 300]);
  const hero2 = layer(T.marks - 0.1, T.redo - 0.05, [0, 50], [-900, 0]);
  const calc = layer(T.mark, T.ten - 0.05, [500, 0], [600, 0]);
  const cal = layer(T.redo, T.thats + 0.3, [0, 80], [0, 0]);
  const phone = layer(T.offload - 0.05, T.comment - 0.15, [0, 700], [0, 900]);

  // the flashcard travels: Q4 -> shown -> day 4 -> day 11 -> into the phone
  const cardPath: [number, number, number, number][] = [
    // t, x, y, scale (around the card's own centre)
    [T.turn, Q4.x, Q4.y, 0.55],
    [T.flashcard - 0.15, 560, 1180, 1.25],
    [T.redo + 0.1, 560, 900, 0.75],
    [T.three - 0.05, day(4).x, day(4).y - 10, 0.27],
    [T.week - 0.15, day(11).x, day(11).y - 10, 0.27],
    [T.builds, PHONE.x, PHONE.y - 300, 0.45],
    [T.builds + 0.35, PHONE.x, PHONE.y - 60, 0.12],
  ];
  let cx = cardPath[0][1];
  let cy = cardPath[0][2];
  let cs = cardPath[0][3];
  cardPath.forEach(([kt, kx, ky, ks]) => {
    const k = e(kt, 0.42);
    cx += (kx - cx) * k;
    cy += (ky - cy) * k;
    cs += (ks - cs) * k;
  });
  const arcs = Math.sin(e(T.three - 0.05, 0.42) * Math.PI) * 90 + Math.sin(e(T.week - 0.15, 0.42) * Math.PI) * 110;
  const cardVis = t >= T.turn && t < T.builds + 0.4 && !(t > T.thats + 0.2 && t < T.builds - 0.05);
  const cardO = (t < T.turn + 0.15 ? e(T.turn, 0.15) : 1) * (t > T.builds + 0.25 ? 1 - e(T.builds + 0.25, 0.12) : 1);

  // spacing interlude: dim the photo, draw the curve
  const dim = e(T.thats - 0.1, 0.35) * (1 - e(T.offload - 0.15, 0.35));
  const endDim = e(T.comment - 0.15, 0.5);
  const draw = interpolate(t, [T.its, T.sticks + 0.25], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 2.2) });
  const CX0 = 110;
  const CX1 = 970;
  const CY0 = 800;
  const CY1 = 1360;
  const curve = (reviews: number[]) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const u = i / 120;
      const hit = [0, ...reviews].filter((r) => r <= u);
      const v = 0.15 + 0.85 * Math.exp(-(u - hit[hit.length - 1]) * (4.2 / Math.pow(hit.length, 1.8)));
      pts.push(`${(CX0 + u * (CX1 - CX0)).toFixed(1)} ${(CY1 - v * (CY1 - CY0)).toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  const typed = Math.floor(interpolate(t, [T.papers, T.papers + 0.45], [0, 6], clamp));
  const L = (l: ReturnType<typeof layer>, src: string, children?: React.ReactNode) =>
    l ? (
      <AbsoluteFill style={{ transform: `translate(${l.x}px, ${l.y}px)`, opacity: l.o, filter: l.blur > 0.3 ? `blur(${l.blur.toFixed(1)}px)` : undefined }}>
        <Img src={R(src)} style={{ width: 1080, height: 1920 }} />
        {children}
      </AbsoluteFill>
    ) : null;

  const shadowText = "0 4px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)";

  return (
    <AbsoluteFill style={{ background: tokens.night, overflow: "hidden" }}>
      {/* the room */}
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: stage(0.85), filter: endDim > 0.01 ? `blur(${endDim * 16}px)` : undefined }}>
        <Img src={R("bg")} style={{ width: 1080, height: 1920 }} />
      </AbsoluteFill>

      {/* the desk objects */}
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: stage(1), filter: endDim > 0.01 ? `blur(${endDim * 16}px)` : undefined }}>
        {stack ? (
          <AbsoluteFill style={{ transform: `translateX(${stack.x}px)`, filter: stack.blur > 0.3 ? `blur(${stack.blur}px)` : undefined }}>
            <Img src={R("stack")} style={{ width: 1080, height: 1920 }} />
          </AbsoluteFill>
        ) : null}
        {L(calc, "calc")}
        {L(pile, "pile",
          <>
            {(scene.pile as P[][]).map((q, i) => (
              <OnSheet key={i} quad={q}>
                <Cross frame={frame} fps={fps} at={f(T.mistakes + i * 0.03)} cx={620} cy={300 + (i % 3) * 330} size={240} seed={i * 3 + 2} />
              </OnSheet>
            ))}
          </>,
        )}
        {L(hero, "hero",
          <OnSheet quad={HERO}>
            <Cross frame={frame} fps={fps} at={f(T.mark)} cx={qb(1).x1 - 160} cy={(qb(1).y0 + qb(1).y1) / 2} size={170} seed={3} />
            <Cross frame={frame} fps={fps} at={f(T.feel)} cx={qb(3).x1 - 160} cy={(qb(3).y0 + qb(3).y1) / 2} size={170} seed={9} />
          </OnSheet>,
        )}
        {L(next, "next")}
        {L(hero2, "hero",
          <OnSheet quad={HERO}>
            <Cross frame={frame} fps={fps} at={f(T.marks - 0.1)} cx={qb(4).x1 - 160} cy={(qb(4).y0 + qb(4).y1) / 2} size={170} seed={7} />
            <Circle frame={frame} at={f(T.lost)} x0={qb(4).x0 + 6} y0={qb(4).y0 + 6} x1={qb(4).x1 - 6} y1={qb(4).y1 - 6} dur={11} />
          </OnSheet>,
        )}
        {L(cal, "calendar",
          <>
            {[{ d: 4, at: T.three + 0.35 }, { d: 11, at: T.week + 0.2 }].map((k) => (
              <svg key={k.d} width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <Tick frame={frame} at={f(k.at)} cx={day(k.d).x + 26} cy={day(k.d).y - 58} size={44} colour={tokens.ink} />
              </svg>
            ))}
          </>,
        )}
        {L(phone, "phone",
          t > T.deck ? (
            <div style={{ position: "absolute", left: PHONE.x, top: PHONE.y - 330, transform: `translate(-50%, 0) scale(${sp(T.deck)})`, padding: "14px 26px", borderRadius: 30, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 650, fontSize: 30, letterSpacing: "-0.02em", whiteSpace: "nowrap", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}>
              Remediation deck
            </div>
          ) : null,
        )}
        {cardVis ? (
          <AbsoluteFill style={{ transformOrigin: `${CARD_C.x}px ${CARD_C.y}px`, transform: `translate(${cx - CARD_C.x}px, ${cy - CARD_C.y - arcs}px) scale(${cs})`, opacity: cardO }}>
            <Img src={R("card")} style={{ width: 1080, height: 1920 }} />
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>

      {/* photographic finish: lens vignette, the spacing dim, the end dim */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 65% at 50% 52%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 100%)" }} />
      <AbsoluteFill style={{ background: tokens.night, opacity: dim * 0.72 + endDim * 0.45 }} />

      {draw > 0 && dim > 0.02 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: dim }}>
          <defs>
            <clipPath id="rr">
              <rect x={CX0 - 20} y={0} width={(CX1 - CX0 + 40) * draw} height={1920} />
            </clipPath>
          </defs>
          <line x1={CX0} y1={CY1} x2={CX1} y2={CY1} stroke={tokens.white} strokeOpacity={0.3} strokeWidth={2} />
          <g clipPath="url(#rr)">
            <path d={curve([])} fill="none" stroke={tokens.problem} strokeWidth={6} strokeDasharray="2 18" strokeLinecap="round" />
            <path d={curve([0.22, 0.55])} fill="none" stroke={tokens.white} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {[0.22, 0.55].map((r, i) => (draw > r ? <circle key={i} cx={CX0 + r * (CX1 - CX0)} cy={CY0} r={13} fill={tokens.white} /> : null))}
        </svg>
      ) : null}

      {/* ---- type ---- */}
      <div style={{ textShadow: shadowText }}>
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={170} size={250} weight={850} out={T.doPaper - 0.08} exit="scale" parts={[{ text: "Stop", t: 0, fx: "cut", colour: tokens.problem }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={440} size={84} out={T.doPaper - 0.08} exit="down" parts={kw("doing past papers like this.", "L1", "mask")} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={240} size={118} align="left" out={T.mark - 0.04} exit="left" parts={[{ text: "Do a paper.", t: T.doPaper, fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={240} size={118} align="right" out={T.feel - 0.04} exit="wipe" parts={[{ text: "Mark it.", t: T.mark, fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.problem} y={240} size={130} out={T.next - 0.04} exit="blur" parts={[{ text: "Feel awful.", t: T.feel, fx: "track" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={240} size={118} align="left" out={T.ten - 0.08} exit="left" parts={[{ text: "Next one.", t: T.next, fx: "mask" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={200} size={124} align="left" out={T.same - 0.04} exit="wipe" parts={kw("Ten papers later.", "L3", "mask")} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={200} size={140} weight={850} out={T.marks - 0.12} exit="scale" parts={kw("Same mistakes.", "L3", "mask", { mistakes: { colour: tokens.problem } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={220} size={112} align="left" out={T.point - 0.04} exit="down" parts={kw("The marks you lost?", "L4", "mask", { lost: { colour: tokens.problem, deco: "underline", decoAt: T.lost + 0.2 } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={220} size={112} align="right" out={T.turn - 0.04} exit="blur" parts={kw("That's the whole point.", "L4", "mask")} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={220} size={104} align="left" out={T.redo - 0.04} exit="left" parts={kw("Turn each one into a flashcard.", "L5", "mask", { flashcard: { fx: "track" } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={220} size={112} align="left" out={T.then - 0.04} exit="wipe" parts={kw("Redo it in three days.", "L6", "mask", { three: { deco: "underline" }, days: { deco: "underline" } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={220} size={112} align="right" out={T.thats - 0.06} exit="scale" parts={kw("Then in a week.", "L6", "mask", { week: { deco: "underline", decoAt: T.week + 0.2 } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={330} size={230} weight={850} out={T.offload - 0.15} exit="scale" parts={[{ text: "Spacing.", t: T.spacing, fx: "track" }]} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={600} size={60} weight={600} out={T.offload - 0.15} exit="blur" parts={kw("It's how memory actually sticks.", "L7", "mask", { sticks: { deco: "underline", decoAt: T.sticks + 0.15 } })} />
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={430} size={58} weight={600} align="left" out={T.comment - 0.15} exit="left" parts={kw("builds you a remediation deck", "L8", "mask")} />
      </div>
      {t > T.offload && t < T.comment - 0.1 ? (
        <div style={{ filter: `drop-shadow(0 0 22px ${alpha(tokens.blue, 0.85)}) drop-shadow(0 2px 2px rgba(0,0,0,0.4))` }}>
          <Wordmark t={t} at={T.offload} x={70} y={290} width={560} align="left" />
        </div>
      ) : null}

      {/* ---- comment ---- */}
      {t >= T.comment - 0.15 ? (
        <AbsoluteFill style={{ alignItems: "center", flexDirection: "column", opacity: e(T.comment - 0.15, 0.4), transform: `scale(${0.92 + 0.08 * e(T.comment - 0.15, 0.6)})` }}>
          <div style={{ marginTop: 600, fontFamily: INTER, fontWeight: 750, fontSize: 120, letterSpacing: "-0.045em", color: tokens.white, textShadow: shadowText }}>Comment</div>
          <div style={{ marginTop: 40, padding: "30px 80px", minWidth: 720, textAlign: "center", borderRadius: 999, background: alpha(tokens.white, 0.16), backdropFilter: "blur(24px) saturate(160%)", border: `1.5px solid ${alpha(tokens.white, 0.5)}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", fontFamily: INTER, fontWeight: 850, fontSize: 160, letterSpacing: "-0.05em", lineHeight: 1, color: tokens.white, transform: `scale(${0.7 + 0.3 * sp(T.papers - 0.2)})`, opacity: sp(T.papers - 0.2) }}>
            {"PAPERS".slice(0, typed)}
            <span style={{ fontWeight: 300, opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
          </div>
        </AbsoluteFill>
      ) : null}
      {t >= T.papers + 0.5 ? (
        <div style={{ filter: `drop-shadow(0 0 22px ${alpha(tokens.blue, 0.85)})` }}>
          <Wordmark t={t} at={T.papers + 0.5} x={540} y={1180} width={500} />
        </div>
      ) : null}
      <div style={{ textShadow: shadowText }}>
        <Kinetic frame={frame} fps={fps} font={INTER} colour={tokens.white} y={1380} size={54} weight={600} out={T.end + 1} parts={kw("and I'll send you the method.", "L9", "mask")} />
      </div>

      {/* film grain */}
      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.14, pointerEvents: "none" }}>
        <svg width="100%" height="100%">
          <filter id={`rg${Math.floor(frame / 2) % 60}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(frame / 2) % 60} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#rg${Math.floor(frame / 2) % 60})`} />
        </svg>
      </AbsoluteFill>

      <Audio src={staticFile("world/past-papers/vo.wav")} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={Math.max(0, f(c.t))} durationInFrames={f(1.6)} layout="none" name={`sfx ${c.s}`}>
          <Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
