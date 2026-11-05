import { AbsoluteFill } from "remotion";
import { tokens } from "../../tokens";
import { alpha, INTER, POP, soft, useK, type Cue } from "../kit/dark";
import { Type } from "../kit/talk";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, DISPLAY, grain, Mark } from "../posters/Posters";
import { glass, Wallpaper } from "../kit/glass";
import { Sound } from "./kit";

/**
 * Four creative templates: a falling-blocks week, an evidence board, expectation vs reality, and a wrapped-style story.
 * All voiced; every time is a ref on a spoken word.
 */
type Ref = string;
type T = (ref: Ref) => number;
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };
type Base = { timing: Timing; T: T; vo: string };

export type BlockfallSpec = {
  format: "blockfall";
  title: string;
  blocks: { day: number; start: number; len: number; label: string; kind: "fixed" | "shift" | "study"; at: Ref; miss?: Ref; moveTo?: { day: number; start: number; at: Ref } }[];
  done?: { text: string; at: Ref };
};
export type EvidenceSpec = { format: "evidence"; title: string; subject: string; exhibits: { label: string; text: string; at: Ref }[]; verdict: { text: string; at: Ref }; sentence?: { text: string; at: Ref } };
export type SplitSpec = { format: "split"; top: string; bottom: string; pairs: { expect: string; reality: string; at: Ref; realityAt: Ref }[]; final: { text: string; at: Ref } };
export type WrappedSpec = { format: "wrapped"; cards: { kicker: string; big: string; sub?: string; bg: "mark" | "problem" | "kraft" | "ink" | "paper"; at: Ref }[] };
/** The jail series: an app type is booked, charged and locked up; then Offload's three beats. Suspects are archetypes, never a named brand. */
export type JailSpec = {
  format: "jail";
  caseNo: string;
  siren: Ref;
  suspect: { name: string; icon: "flashcards" | "planner" | "todo" | "notes"; at: Ref };
  side: Ref;
  charges: { text: string; at: Ref }[];
  sentence: { text: string; at: Ref };
  release: { title: string; points: { text: string; at: Ref }[]; at: Ref };
};
export type FormatSpec4 = BlockfallSpec | EvidenceSpec | SplitSpec | WrappedSpec | JailSpec;

const Corner: React.FC<{ colour?: string }> = ({ colour = tokens.mark }) => <div style={{ position: "absolute", right: 70, bottom: 90 }}><Mark size={70} colour={colour} /></div>;

// ---------- Blockfall: the week fills like falling blocks, and a missed block drops somewhere else ----------

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ROWS = 10;
const GX = 70;
const GY = 560;
const CW = (1080 - GX * 2) / 7;
const RH = 100;

export const Blockfall: React.FC<{ spec: BlockfallSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const blocks = spec.blocks.map((b) => ({ ...b, a: T(b.at), m: b.miss ? T(b.miss) : 1e9, mv: b.moveTo ? T(b.moveTo.at) : 1e9 }));
  const done = spec.done ? T(spec.done.at) : 1e9;
  const cues: Cue[] = [...blocks.map((b) => ({ t: b.a + 0.32, s: b.kind === "study" ? "pop" : "thud", v: 0.24 })), ...blocks.filter((b) => b.miss).map((b) => ({ t: b.m, s: "shatter", v: 0.26 })), ...blocks.filter((b) => b.moveTo).map((b) => ({ t: b.mv + 0.32, s: "thud", v: 0.26 })), ...(spec.done ? [{ t: done, s: "sparkle", v: 0.3 }] : [])];
  const fill = (kind: string) => (kind === "study" ? tokens.mark : kind === "shift" ? tokens.kraft : tokens.white);
  const ink = (kind: string) => (kind === "study" ? tokens.white : tokens.ink);
  const fall = (a: number) => {
    const k = sp(a, { damping: 11, stiffness: 140, mass: 0.7 });
    return { k, dy: (1 - k) * -1300 };
  };
  const glow = t >= done ? 0.5 + 0.5 * Math.sin((t - done) * 6) : 0;
  return (
    <AbsoluteFill>
      <Wallpaper dark />
      <div style={{ position: "absolute", left: GX - 20, top: GY - 110, width: 1080 - (GX - 20) * 2, height: ROWS * RH + 140, borderRadius: 40, ...glass(true, 24) }} />
      {DAYS.map((d, i) => <div key={d} style={{ position: "absolute", left: GX + i * CW, top: GY - 80, width: CW, textAlign: "center", fontFamily: INTER, fontWeight: 750, fontSize: 32, color: alpha(tokens.white, 0.85) }}>{d}</div>)}
      {Array.from({ length: ROWS + 1 }, (_, r) => <div key={r} style={{ position: "absolute", left: GX, top: GY + r * RH, width: CW * 7, height: 1.5, background: alpha(tokens.white, 0.09) }} />)}
      {blocks.map((b, i) => {
        if (t < b.a - 0.05) return null;
        const moved = t >= b.mv;
        const { k, dy } = fall(moved ? b.mv : b.a);
        const day = moved ? b.moveTo!.day : b.day;
        const start = moved ? b.moveTo!.start : b.start;
        const broken = t >= b.m && !moved;
        const crack = broken ? Math.min(1, (t - b.m) / 0.4) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: GX + day * CW + 6, top: GY + start * RH + 6 + dy, width: CW - 12, height: b.len * RH - 12, borderRadius: 18, background: broken ? alpha(tokens.problem, 0.85) : fill(b.kind), color: broken ? tokens.white : ink(b.kind), boxShadow: b.kind === "study" ? `0 0 ${30 + glow * 30}px ${alpha(tokens.mark, 0.5)}` : soft(0.4), padding: "12px 10px", fontFamily: INTER, fontWeight: 750, fontSize: 24, lineHeight: 1.1, transform: `rotate(${broken ? (i % 2 ? 1 : -1) * crack * 8 : 0}deg) scale(${broken ? 1 - crack * 0.15 : 1})`, opacity: (broken ? 1 - crack * 0.85 : 1) * Math.min(1, k * 3) }}>{b.label}</div>
        );
      })}
      {spec.done && t >= done ? (
        <div style={{ position: "absolute", left: 90, right: 90, bottom: 150, padding: "30px 36px", borderRadius: 34, ...glass(false), fontFamily: INTER, fontWeight: 800, fontSize: 48, color: tokens.ink, textAlign: "center", transform: `scale(${0.9 + 0.1 * sp(done, POP)})` }}>{spec.done.text}</div>
      ) : null}
      <div style={{ position: "absolute", left: 70, top: 300, fontFamily: INTER, fontWeight: 800, fontSize: 58, color: tokens.white, letterSpacing: "-0.03em" }}>{spec.title}</div>
      <Type timing={timing} hook={0} y={110} colour={tokens.white} floor={290} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Evidence: the case against, exhibit by exhibit, then a verdict ----------

export const Evidence: React.FC<{ spec: EvidenceSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const ex = spec.exhibits.map((e) => ({ ...e, a: T(e.at) }));
  const v = T(spec.verdict.at);
  const s = spec.sentence ? T(spec.sentence.at) : 1e9;
  const cues: Cue[] = [...ex.map((e) => ({ t: e.a, s: "paper_land", v: 0.3 })), { t: v, s: "stamp", v: 0.4 }, { t: v + 0.05, s: "boom", v: 0.3 }, ...(spec.sentence ? [{ t: s, s: "ding", v: 0.24 }] : [])];
  const spots = [{ x: 70, y: 560, r: -5 }, { x: 560, y: 760, r: 4 }, { x: 110, y: 1080, r: 3 }, { x: 540, y: 1300, r: -4 }];
  return (
    <AbsoluteFill style={{ background: tokens.kraft }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${alpha(tokens.ink, 0.1)} 1px, transparent 0)`, backgroundSize: "12px 12px" }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 300, fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.2em", color: alpha(tokens.ink, 0.7) }}>{spec.title}</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 350, fontFamily: DISPLAY, fontSize: 120, lineHeight: 0.9, color: tokens.ink, textTransform: "uppercase" }}>{spec.subject}</div>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {ex.slice(1).map((e, i) => (t >= e.a ? <line key={i} x1={spots[i].x + 220} y1={spots[i].y + 30} x2={spots[i + 1].x + 220} y2={spots[i + 1].y + 30} stroke={tokens.problem} strokeWidth={5} opacity={Math.min(1, (t - e.a) * 3)} /> : null))}
      </svg>
      {ex.map((e, i) => {
        if (t < e.a) return null;
        const k = sp(e.a, { damping: 14, stiffness: 220, mass: 0.6 });
        const p = spots[i % spots.length];
        return (
          <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 440, padding: "26px 26px 34px", background: tokens.white, boxShadow: soft(1), transform: `rotate(${p.r}deg) scale(${1.4 - 0.4 * k})`, opacity: Math.min(1, k * 2) }}>
            <div style={{ position: "absolute", left: 200, top: -16, width: 34, height: 34, borderRadius: 17, background: tokens.problem, boxShadow: soft(0.3) }} />
            <div style={{ display: "inline-block", padding: "6px 14px", background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 24, letterSpacing: "0.12em" }}>{e.label}</div>
            <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 44, lineHeight: 1.12, color: tokens.ink }}>{e.text}</div>
          </div>
        );
      })}
      {t >= v ? (
        <AbsoluteFill style={{ background: alpha(tokens.ink, 0.55 * sp(v, POP)), display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${2.2 - 1.2 * sp(v, { damping: 12, stiffness: 260, mass: 0.6 })}) rotate(-8deg)`, padding: "18px 46px", border: `12px solid ${tokens.problem}`, borderRadius: 18, background: tokens.white, color: tokens.problem, fontFamily: DISPLAY, fontSize: 190, lineHeight: 1, letterSpacing: "0.04em", boxShadow: soft(1.4) }}>{spec.verdict.text}</div>
        </AbsoluteFill>
      ) : null}
      {spec.sentence && t >= s ? <div style={{ position: "absolute", left: 70, right: 70, bottom: 230, padding: "30px 36px", borderRadius: 26, background: tokens.white, fontFamily: INTER, fontWeight: 760, fontSize: 44, lineHeight: 1.15, color: tokens.ink, opacity: sp(s, POP) }}><Br text={spec.sentence.text} /></div> : null}
      <Type timing={timing} hook={0} y={110} colour={tokens.ink} floor={290} />
      <Corner colour={tokens.ink} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Split: expectation on top, reality underneath ----------

export const Split: React.FC<{ spec: SplitSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const pairs = spec.pairs.map((p) => ({ ...p, a: T(p.at), r: T(p.realityAt) }));
  const f = T(spec.final.at);
  const cur = [...pairs].reverse().find((p) => t >= p.a);
  const cues: Cue[] = [...pairs.flatMap((p) => [{ t: p.a, s: "chime", v: 0.18 }, { t: p.r, s: "thud", v: 0.3 }]), { t: f, s: "sparkle", v: 0.26 }];
  const shake = cur && t >= cur.r && t < cur.r + 0.4 ? Math.sin((t - cur.r) * 70) * 10 * (1 - (t - cur.r) / 0.4) : 0;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 960, ...grain, padding: "300px 70px 0" }}>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 34, letterSpacing: "0.2em", color: tokens.mark }}>{spec.top}</div>
        {cur ? <div key={cur.expect} style={{ marginTop: 30, fontFamily: SERIF, fontSize: 96, lineHeight: 1.02, color: tokens.ink, opacity: sp(cur.a, POP) }}>{cur.expect}</div> : null}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 960, height: 960, background: tokens.ink, padding: "110px 70px 0", transform: `translateX(${shake}px)` }}>
        <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 34, letterSpacing: "0.2em", color: tokens.problem }}>{spec.bottom}</div>
        {cur && t >= cur.r ? <div key={cur.reality} style={{ marginTop: 30, fontFamily: DISPLAY, fontSize: 112, lineHeight: 0.92, color: tokens.white, textTransform: "uppercase", transform: `scale(${1.15 - 0.15 * sp(cur.r, { damping: 12, stiffness: 300, mass: 0.5 })})`, transformOrigin: "0 0" }}>{cur.reality}</div> : null}
      </div>
      {t >= f ? (
        <AbsoluteFill style={{ background: alpha(tokens.mark, 0.96 * sp(f, POP)), display: "flex", alignItems: "center", padding: 80 }}>
          <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.04em", color: tokens.white, opacity: sp(f + 0.1, POP) }}><Br text={spec.final.text} /></div>
        </AbsoluteFill>
      ) : null}
      <Type timing={timing} hook={0} y={110} colour={t >= f ? tokens.white : tokens.ink} floor={260} until={f - 0.1} />
      <Corner colour={tokens.white} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Wrapped: full-bleed colour cards, one stat-like line each ----------

const BG = { mark: tokens.mark, problem: tokens.problem, kraft: tokens.kraft, ink: tokens.ink, paper: tokens.paper };
const FG = { mark: tokens.white, problem: tokens.white, kraft: tokens.ink, ink: tokens.white, paper: tokens.ink };

export const Wrapped: React.FC<{ spec: WrappedSpec } & Base> = ({ spec, T, vo }) => {
  const { t, sp } = useK();
  const cards = spec.cards.map((c) => ({ ...c, a: T(c.at) }));
  const cur = [...cards].reverse().find((c) => t >= c.a - 0.1) ?? cards[0];
  const i = cards.indexOf(cur);
  const k = sp(cur.a - 0.1, { damping: 16, stiffness: 200, mass: 0.6 });
  const prev = cards[i - 1];
  const cues: Cue[] = cards.map((c, n) => ({ t: c.a - 0.1, s: n % 2 ? "whip" : "swoosh_down", v: 0.28 }));
  const shapes = (c: typeof cur, n: number) => (
    <>
      <div style={{ position: "absolute", right: -200 + Math.sin(t + n) * 40, top: 160, width: 700, height: 700, borderRadius: "50%", background: alpha(FG[c.bg], 0.08) }} />
      <div style={{ position: "absolute", left: -160, bottom: 220 + Math.cos(t * 0.8 + n) * 40, width: 560, height: 560, borderRadius: 120, background: alpha(FG[c.bg], 0.06), transform: `rotate(${20 + n * 15}deg)` }} />
    </>
  );
  return (
    <AbsoluteFill style={{ background: prev ? BG[prev.bg] : BG[cur.bg], overflow: "hidden" }}>
      <AbsoluteFill style={{ background: BG[cur.bg], clipPath: `circle(${k * 150}% at 50% 100%)` }}>
        {shapes(cur, i)}
        <div style={{ position: "absolute", left: 80, right: 80, top: 520, fontFamily: INTER, fontWeight: 800, fontSize: 40, letterSpacing: "0.14em", textTransform: "uppercase", color: alpha(FG[cur.bg], 0.75), transform: `translateY(${(1 - k) * 60}px)` }}>{cur.kicker}</div>
        <div style={{ position: "absolute", left: 80, right: 80, top: 600, fontFamily: DISPLAY, fontSize: cur.big.length > 18 ? 150 : 200, lineHeight: 0.9, color: FG[cur.bg], textTransform: "uppercase", transform: `translateY(${(1 - k) * 120}px)`, opacity: k }}><Br text={cur.big} /></div>
        {cur.sub ? <div style={{ position: "absolute", left: 80, right: 80, top: 1260, fontFamily: SCRIPT, fontWeight: 700, fontSize: 70, lineHeight: 1.05, color: FG[cur.bg], opacity: sp(cur.a + 0.4, POP) }}>{cur.sub}</div> : null}
        <div style={{ position: "absolute", left: 80, top: 150, display: "flex", gap: 10 }}>
          {cards.map((_, n) => <div key={n} style={{ width: 90, height: 8, borderRadius: 4, background: alpha(FG[cur.bg], n <= i ? 0.9 : 0.25) }} />)}
        </div>
      </AbsoluteFill>
      <Corner colour={FG[cur.bg]} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Jail: booked, charged, locked up ----------

const Glyph: React.FC<{ icon: JailSpec["suspect"]["icon"]; size: number }> = ({ icon, size }) => {
  const c = tokens.white;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {icon === "flashcards" ? (
        <>
          <rect x={22} y={30} width={50} height={36} rx={5} fill="none" stroke={c} strokeWidth={5} transform="rotate(-10 47 48)" />
          <rect x={30} y={36} width={50} height={36} rx={5} fill={c} />
          <path d="M 40 50 h 30 M 40 59 h 20" stroke={tokens.ink} strokeWidth={4} strokeLinecap="round" />
        </>
      ) : null}
      {icon === "planner" ? (
        <>
          <rect x={20} y={24} width={60} height={56} rx={6} fill="none" stroke={c} strokeWidth={5} />
          <path d="M 20 38 h 60" stroke={c} strokeWidth={5} />
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((k) => <rect key={`${r}${k}`} x={26 + k * 13} y={44 + r * 11} width={8} height={7} rx={2} fill={[tokens.problem, tokens.kraft, tokens.white, tokens.blue][(r + k) % 4]} />))}
        </>
      ) : null}
      {icon === "todo" ? (
        <>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={22} y={24 + r * 15} width={10} height={10} rx={2} fill="none" stroke={c} strokeWidth={4} />
              <path d={`M 40 ${29 + r * 15} h ${38 - r * 6}`} stroke={c} strokeWidth={5} strokeLinecap="round" />
            </g>
          ))}
        </>
      ) : null}
      {icon === "notes" ? (
        <>
          <path d="M 28 20 h 34 l 12 12 v 48 h -46 z" fill="none" stroke={c} strokeWidth={5} strokeLinejoin="round" />
          <path d="M 36 44 h 28 M 36 54 h 28 M 36 64 h 18" stroke={c} strokeWidth={4} strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  );
};

export const Jail: React.FC<{ spec: JailSpec } & Base> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const siren = T(spec.siren);
  const sus = T(spec.suspect.at);
  const side = T(spec.side);
  const ch = spec.charges.map((c) => ({ ...c, a: T(c.at) }));
  const sen = T(spec.sentence.at);
  const rel = T(spec.release.at);
  const pts = spec.release.points.map((p) => ({ ...p, a: T(p.at) }));
  const cues: Cue[] = [
    { t: siren, s: "siren", v: 0.34 },
    { t: sus + 0.35, s: "shutter", v: 0.55 },
    { t: side + 0.45, s: "shutter", v: 0.55 },
    ...ch.map((c) => ({ t: c.a, s: "stamp", v: 0.3 })),
    { t: sen, s: "cell_slam", v: 0.55 },
    { t: sen + 0.1, s: "siren", v: 0.14 },
    { t: rel, s: "iris", v: 0.3 },
    ...pts.map((p) => ({ t: p.a, s: "tick", v: 0.3 })),
  ];
  // camera flashes
  const flash = Math.max(0, ...[sus + 0.35, side + 0.45].map((f) => (t >= f ? 1 - (t - f) / 0.3 : 0)));
  // sirens sweep for two seconds, and again when the bars land
  const sirenOn = (t >= siren && t < siren + 2.2) || (t >= sen && t < sen + 1.4);
  const sweep = Math.sin(t * 9);
  // after the charges start, the mugshot shrinks to the top
  const up = ch.length ? sp(ch[0].a - 0.1, { damping: 200, stiffness: 140, mass: 0.7 }) : 0;
  const turn = sp(side, { damping: 16, stiffness: 160, mass: 0.6 });
  const bars = sp(sen, { damping: 9, stiffness: 220, mass: 0.7 });
  const out = sp(rel, { damping: 200, stiffness: 120, mass: 0.7 });
  const shakeY = t >= sen && t < sen + 0.4 ? Math.sin(t * 80) * 14 * (1 - (t - sen) / 0.4) : 0;
  const icon = { flashcards: tokens.mark, planner: tokens.kraft, todo: tokens.problem, notes: tokens.ink }[spec.suspect.icon];
  return (
    <AbsoluteFill style={{ background: tokens.paper, transform: `translateY(${shakeY}px)` }}>
      {/* the booking wall: a height chart */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 420 + i * 90, borderTop: `${i % 2 ? 2 : 4}px solid ${alpha(tokens.ink, i % 2 ? 0.12 : 0.25)}` }}>
          {i % 2 ? null : <span style={{ position: "absolute", left: 30, top: 6, fontFamily: INTER, fontWeight: 800, fontSize: 30, color: alpha(tokens.ink, 0.35) }}>{`${7 - i / 2}'0`}</span>}
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.3em", color: alpha(tokens.ink, 0.6) }}>STUDY POLICE · {spec.caseNo}</div>
      {/* the suspect */}
      {t >= sus ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${-up * 150}px) scale(${1 - up * 0.3})`, transformOrigin: "50% 0%", opacity: Math.min(1, sp(sus, POP) * 1.5) * (1 - out) }}>
          <div style={{ perspective: 1200 }}>
            <div style={{ width: 380, height: 380, borderRadius: 92, background: icon, boxShadow: soft(1.2), display: "flex", alignItems: "center", justifyContent: "center", transform: `rotateY(${turn * 68}deg)` }}>
              <Glyph icon={spec.suspect.icon} size={260} />
            </div>
          </div>
          <div style={{ marginTop: 40, width: 760, padding: "26px 34px", background: tokens.ink, color: tokens.white, borderRadius: 10, boxShadow: soft(1) }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: INTER, fontWeight: 700, fontSize: 26, letterSpacing: "0.18em", opacity: 0.7 }}>
              <span>SUSPECT</span>
              <span>{spec.caseNo}</span>
            </div>
            <div style={{ fontFamily: DISPLAY, fontSize: 92, lineHeight: 1, marginTop: 10, textTransform: "uppercase" }}>{spec.suspect.name}</div>
          </div>
        </div>
      ) : null}
      {/* the charge sheet */}
      {ch.length && t >= ch[0].a - 0.1 ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 1060, padding: "40px 44px", background: tokens.white, boxShadow: soft(1.2), transform: `translateY(${(1 - up) * 900}px) rotate(-1deg)`, opacity: 1 - out }}>
          <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.24em", color: tokens.problem }}>CHARGES</div>
          {ch.map((c, i) =>
            t >= c.a ? (
              <div key={i} style={{ display: "flex", gap: 22, marginTop: 34, opacity: Math.min(1, sp(c.a, POP) * 1.5), transform: `translateX(${(1 - sp(c.a, POP)) * -60}px)` }}>
                <div style={{ flex: "none", padding: "6px 14px", height: "fit-content", background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 26 }}>COUNT {i + 1}</div>
                <div style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.1, color: tokens.ink }}>{c.text}</div>
              </div>
            ) : null,
          )}
        </div>
      ) : null}
      {/* the bars */}
      {t >= sen ? (
        <AbsoluteFill style={{ opacity: 1 - out, pointerEvents: "none" }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 36 + i * 120, width: 30, top: -1920 + bars * 1920, height: 1920, borderRadius: 15, background: `linear-gradient(90deg, ${tokens.night}, ${alpha(tokens.ink, 0.65)} 45%, ${tokens.night})`, boxShadow: soft(0.8) }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: -1920 + bars * 1920 + 300, height: 34, background: tokens.night }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: -1920 + bars * 1920 + 1560, height: 34, background: tokens.night }} />
          <div style={{ position: "absolute", left: 90, right: 90, top: 1620, padding: "22px 30px", background: tokens.problem, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 42, lineHeight: 1.15, textAlign: "center", transform: `scale(${sp(sen + 0.3, POP)})` }}>
            <Br text={spec.sentence.text} />
          </div>
        </AbsoluteFill>
      ) : null}
      {/* sirens */}
      {sirenOn ? (
        <AbsoluteFill style={{ pointerEvents: "none", background: `linear-gradient(90deg, ${alpha(tokens.problem, 0.32 * Math.max(0, sweep))}, transparent 50%, ${alpha(tokens.mark, 0.32 * Math.max(0, -sweep))})` }} />
      ) : null}
      {flash > 0 ? <AbsoluteFill style={{ background: tokens.white, opacity: flash }} /> : null}
      {/* released: what Offload does instead */}
      {t >= rel ? (
        <AbsoluteFill style={{ background: tokens.mark, clipPath: `circle(${out * 120}% at 50% 50%)` }}>
          <div style={{ position: "absolute", left: 80, right: 80, top: 560, fontFamily: INTER, fontWeight: 800, fontSize: 84, lineHeight: 1.05, letterSpacing: "-0.03em", color: tokens.white }}>
            <Br text={spec.release.title} />
          </div>
          {pts.map((p, i) =>
            t >= p.a ? (
              <div key={i} style={{ position: "absolute", left: 80, right: 80, top: 820 + i * 250, display: "flex", gap: 28, alignItems: "center", ...glass(false, 20), borderRadius: 30, padding: "28px 32px", opacity: Math.min(1, sp(p.a, POP) * 1.5), transform: `translateY(${(1 - sp(p.a, POP)) * 40}px)` }}>
                <div style={{ flex: "none", width: 64, height: 64, borderRadius: 32, background: tokens.white, color: tokens.mark, fontFamily: INTER, fontWeight: 900, fontSize: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 50, lineHeight: 1.12, color: tokens.ink }}>{p.text}</div>
              </div>
            ) : null,
          )}
        </AbsoluteFill>
      ) : null}
      <Type timing={timing} hook={0} y={110} colour={t >= rel ? tokens.white : tokens.ink} floor={260} />
      <Corner colour={t >= rel ? tokens.white : tokens.mark} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};
