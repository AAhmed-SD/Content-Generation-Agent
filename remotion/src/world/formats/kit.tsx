import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { tokens } from "../../tokens";
import { alpha, INTER, POP, soft, useK, type Cue } from "../kit/dark";
import { Kinetic } from "../kinetic";
import { Type } from "../kit/talk";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, DISPLAY, grain, Mark, Stamp } from "../posters/Posters";

/**
 * Format templates. Each fixes a structure, a look and a pace; the words come from the film's spec.
 * Times are refs on spoken words ("L2", "L3:fact@-0.1"), resolved by the bank's T(); POV has no voice and uses seconds.
 */
type Ref = string;
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };
type T = (ref: Ref) => number;
type KW = (text: string, line: string, fx?: "slam" | "mask") => { text: string; t: number }[];

export type MythSpec = {
  format: "myth-fact";
  rounds: { myth: string; fact: string; mythAt: Ref; factAt: Ref }[];
  reveal: { at: Ref; head: string; title: string; rows: { text: string; gap?: Ref }[] };
  loop: { at: Ref; myth: string; fact: string };
};
export type ThreeSpec = {
  format: "three-things";
  title: { big: string; sub: string; accent: string };
  tips: { at: Ref; head: string; bg?: "ink" | "mark" | "kraft" }[];
  reveal: { at: Ref; head: string; accent: string; tail: string; kicker: string; text: string };
  punch?: { line: string; text: string };
};
export type PovSpec = {
  format: "pov";
  duration: number;
  title: string;
  list: { title: string; items: { at: number; text: string; red?: boolean }[] };
  messages: { at: number; text: string; from: "them" | "me" | "aside" }[];
  cut: { at: number; title: string };
  app: { at: number; heading: string; next: { label: string; sub: string }; later: string[]; note: string };
};
export type FormatSpec = MythSpec | ThreeSpec | PovSpec;

const BG = { ink: tokens.ink, mark: tokens.mark, kraft: tokens.kraft };
const FG = { ink: tokens.white, mark: tokens.white, kraft: tokens.ink };

export const Sound: React.FC<{ vo?: string; cues: Cue[] }> = ({ vo, cues }) => {
  const { fps } = useK();
  return (
    <>
      {vo ? <Audio src={staticFile(vo)} /> : null}
      {cues.map((q, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(q.t * fps))} durationInFrames={Math.round(1.6 * fps)} layout="none">
          <Audio src={staticFile(`sfx/${q.s}.wav`)} volume={q.v} />
        </Sequence>
      ))}
    </>
  );
};

const CornerMark: React.FC<{ at: number; colour?: string }> = ({ at, colour = tokens.mark }) => {
  const { sp } = useK();
  const k = sp(at, POP);
  return <div style={{ position: "absolute", right: 70, bottom: 90, opacity: k, transform: `scale(${0.8 + 0.2 * k})` }}><Mark size={70} colour={colour} /></div>;
};

// ---------- Myth vs fact: light paper, split screen, loops back to the hook ----------

const Half: React.FC<{ top: boolean; label: string; text: string; at: number; out: number; colour: string; ink: string; stamp?: boolean }> = ({ top, label, text, at, out, colour, ink, stamp }) => {
  const { t, sp } = useK();
  if (t < at - 0.05 || t > out + 0.4) return null;
  const k = sp(at, { damping: 200, stiffness: 170, mass: 0.6 });
  const leave = sp(out, { damping: 200, stiffness: 220, mass: 0.5 });
  const dy = (top ? -1 : 1) * ((1 - k) * 960 + leave * 960);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: top ? 0 : 960, height: 960, background: colour, transform: `translateY(${dy}px)`, padding: top ? "240px 80px 0" : "150px 80px 0" }}>
      <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 40, letterSpacing: "0.2em", color: alpha(ink, 0.7) }}>{label}</div>
      <div style={{ marginTop: 30, fontFamily: SERIF, fontSize: text.length > 60 ? 92 : 116, lineHeight: 1.04, color: ink }}><Br text={text} /></div>
      {stamp ? <div style={{ position: "absolute", right: 80, bottom: 120, transform: `scale(${sp(at + 0.25, POP)})` }}><Stamp text={label} size={64} rot={-10} /></div> : null}
    </div>
  );
};

export const MythFact: React.FC<{ spec: MythSpec; T: T; vo: string }> = ({ spec, T, vo }) => {
  const { t, sp } = useK();
  const rounds = spec.rounds.map((r) => ({ ...r, m: T(r.mythAt), f: T(r.factAt) }));
  const reveal = T(spec.reveal.at);
  const loop = T(spec.loop.at);
  const gaps = spec.reveal.rows.map((r) => (r.gap ? T(r.gap) : null));
  const cues: Cue[] = [
    ...rounds.flatMap((r) => [{ t: r.m, s: "stamp", v: 0.34 }, { t: r.f, s: "whoosh", v: 0.26 }]),
    { t: reveal, s: "paper_land", v: 0.3 },
    ...gaps.filter((g): g is number => g !== null).map((g) => ({ t: g, s: "pop", v: 0.24 })),
    { t: loop, s: "stamp", v: 0.3 },
  ];
  const sheetK = sp(reveal - 0.1, POP) * (1 - sp(loop - 0.1));
  return (
    <AbsoluteFill style={{ ...grain }}>
      {rounds.map((r, i) => {
        const out = i + 1 < rounds.length ? rounds[i + 1].m - 0.2 : reveal - 0.2;
        return (
          <div key={i}>
            <Half top label="MYTH" text={r.myth} at={r.m} out={out} colour={tokens.paper} ink={tokens.ink} stamp />
            <Half top={false} label="FACT" text={r.fact} at={r.f} out={out} colour={tokens.mark} ink={tokens.white} />
          </div>
        );
      })}
      {sheetK > 0.01 ? (
        <div style={{ position: "absolute", left: 120, right: 120, top: 520, height: 900, background: tokens.card, boxShadow: soft(1.2), transform: `rotate(-2deg) scale(${0.9 + 0.1 * sheetK})`, opacity: sheetK, padding: "70px 70px" }}>
          <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 30, letterSpacing: "0.16em", color: tokens.quiet, textTransform: "uppercase" }}>{spec.reveal.title}</div>
          {spec.reveal.rows.map((row, i) => {
            const g = gaps[i];
            return (
              <div key={row.text} style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 22, fontFamily: SCRIPT, fontWeight: 700, fontSize: 56, color: tokens.ink }}>
                {row.text}
                {g !== null && t > g ? <span style={{ fontFamily: INTER, fontWeight: 800, fontSize: 26, padding: "8px 18px", borderRadius: 20, background: tokens.problem, color: tokens.white, transform: `scale(${sp(g, POP)})` }}>GAP</span> : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {t > reveal - 0.2 && t < loop ? <div style={{ position: "absolute", left: 80, right: 80, top: 210, fontFamily: INTER, fontWeight: 780, fontSize: 70, lineHeight: 1.02, letterSpacing: "-0.04em", color: tokens.ink }}><Br text={spec.reveal.head} /></div> : null}
      <Half top label="MYTH" text={spec.loop.myth} at={loop} out={1e6} colour={tokens.paper} ink={tokens.ink} />
      <Half top={false} label="OR FACT" text={spec.loop.fact} at={loop + 0.6} out={1e6} colour={tokens.mark} ink={tokens.white} />
      <CornerMark at={reveal} colour={t > loop + 0.6 ? tokens.white : tokens.mark} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Three things: giant numerals, hard cuts, a punchline to end ----------

export const ThreeThings: React.FC<{ spec: ThreeSpec; T: T; kw: KW; timing: Timing; vo: string }> = ({ spec, T, kw, timing, vo }) => {
  const { t, sp, frame, fps } = useK();
  const order: ("ink" | "mark" | "kraft")[] = ["ink", "mark", "kraft"];
  const tips = spec.tips.map((x, i) => ({ ...x, n: String(i + 1), a: T(x.at), bg: x.bg ?? order[i % 3] }));
  const reveal = T(spec.reveal.at);
  const punchAt = spec.punch ? kw(spec.punch.text, spec.punch.line)[0]?.t ?? reveal : reveal;
  const cues: Cue[] = [{ t: 0, s: "boom", v: 0.3 }, ...tips.flatMap((x) => [{ t: x.a - 0.05, s: "whip", v: 0.3 }, { t: x.a, s: "impact", v: 0.3 }]), { t: reveal, s: "paper_land", v: 0.28 }, ...(spec.punch ? [{ t: punchAt, s: "snap", v: 0.3 }] : [])];
  const tip = tips.find((x, i) => t >= x.a - 0.05 && t < (i + 1 < tips.length ? tips[i + 1].a - 0.05 : reveal));
  const k = tip ? sp(tip.a - 0.05, { damping: 18, stiffness: 300, mass: 0.6 }) : 0;
  return (
    <AbsoluteFill style={{ background: tip ? BG[tip.bg] : tokens.paper, overflow: "hidden" }}>
      {tips.length && t < tips[0].a - 0.05 ? (
        <AbsoluteFill style={{ ...grain, padding: "380px 80px" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 230, lineHeight: 0.86, color: tokens.ink, textTransform: "uppercase" }}><Br text={spec.title.big} /></div>
          <div style={{ marginTop: 40, fontFamily: INTER, fontWeight: 760, fontSize: 64, letterSpacing: "-0.03em", color: tokens.ink }}><Br text={spec.title.sub} /><br /><span style={{ color: tokens.mark }}>{spec.title.accent}</span></div>
        </AbsoluteFill>
      ) : null}
      {tip ? (
        <>
          <div style={{ position: "absolute", left: -40, top: 60, fontFamily: DISPLAY, fontSize: 1100, lineHeight: 0.8, color: alpha(FG[tip.bg], 0.14), transform: `translateX(${(1 - k) * 400}px)` }}>{tip.n}</div>
          <div style={{ position: "absolute", left: 80, right: 80, bottom: 380, fontFamily: DISPLAY, fontSize: 170, lineHeight: 0.88, color: FG[tip.bg], textTransform: "uppercase", transform: `translateY(${(1 - k) * 120}px)`, opacity: k }}><Br text={tip.head} /></div>
        </>
      ) : null}
      {t >= reveal ? (
        <AbsoluteFill style={{ ...grain }}>
          <div style={{ position: "absolute", left: 80, right: 80, top: 330, fontFamily: INTER, fontWeight: 780, fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.045em", color: tokens.ink }}>{spec.reveal.head}<br /><span style={{ color: tokens.mark }}>{spec.reveal.accent}</span> {spec.reveal.tail}</div>
          <div style={{ position: "absolute", left: 80, right: 80, top: 640, borderRadius: 30, background: tokens.white, boxShadow: soft(0.9), padding: "44px 48px", transform: `rotate(-1.5deg) scale(${0.9 + 0.1 * sp(reveal + 0.3, POP)})` }}>
            <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 26, letterSpacing: "0.12em", color: tokens.mark, textTransform: "uppercase" }}>{spec.reveal.kicker}</div>
            <div style={{ marginTop: 18, fontFamily: SERIF, fontSize: 54, lineHeight: 1.12, color: tokens.ink }}>{spec.reveal.text}</div>
          </div>
          {spec.punch && t >= punchAt - 0.05 ? (
            <Kinetic frame={frame} fps={fps} font={DISPLAY} colour={tokens.problem} y={1290} size={120} weight={400} out={1e6} exit="cut" parts={kw(spec.punch.text, spec.punch.line).map((p) => ({ ...p, text: p.text.toUpperCase(), fx: "slam" as const }))} />
          ) : null}
          <CornerMark at={spec.punch ? punchAt : reveal + 0.6} />
        </AbsoluteFill>
      ) : null}
      {tip ? <Type timing={timing} hook={0} until={reveal - 0.1} y={150} colour={FG[tip.bg]} /> : null}
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- POV: text on a phone, no voice; a trending sound is added when posting ----------

export const Pov: React.FC<{ spec: PovSpec }> = ({ spec }) => {
  const { t, sp } = useK();
  const { cut, app } = spec;
  const cues: Cue[] = [...spec.list.items.map((l) => ({ t: l.at, s: "key", v: 0.22 })), ...spec.messages.map((m) => ({ t: m.at, s: m.from === "them" ? "ding" : "pop", v: 0.24 })), { t: cut.at, s: "whoosh", v: 0.26 }, { t: app.at, s: "sparkle", v: 0.22 }];
  const phone = (children: React.ReactNode, bg: string) => (
    <div style={{ position: "absolute", left: 150, top: 330, width: 780, height: 1420, borderRadius: 90, background: tokens.night, padding: 22, boxShadow: soft(1.6) }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 72, background: bg, overflow: "hidden", padding: "110px 56px" }}>{children}</div>
    </div>
  );
  const before = t < cut.at;
  return (
    <AbsoluteFill style={{ background: before ? tokens.night : tokens.paper }}>
      <div style={{ position: "absolute", left: 80, right: 80, top: 110, fontFamily: INTER, fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: before ? tokens.white : tokens.ink }}>{before ? spec.title : cut.title}</div>
      {before
        ? phone(
            <>
              <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 52, color: tokens.ink }}>{spec.list.title}</div>
              {spec.list.items.map((l) => (t >= l.at ? <div key={l.text} style={{ marginTop: 26, fontFamily: INTER, fontSize: 40, color: l.red ? tokens.problem : tokens.ink, opacity: sp(l.at, POP) }}>○ {l.text}</div> : null))}
              {spec.messages.map((m, i) => {
                if (t < m.at) return null;
                const k = sp(m.at, POP);
                const top = 760 + i * 130;
                if (m.from === "them") return <div key={i} style={{ position: "absolute", left: 40, right: 40, top, padding: "26px 30px", borderRadius: 30, background: tokens.white, boxShadow: soft(0.8), transform: `translateY(${(1 - k) * -60}px)` }}><div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 26, color: tokens.quiet }}>Messages · now</div><div style={{ fontFamily: INTER, fontSize: 38, color: tokens.ink, marginTop: 8 }}>{m.text}</div></div>;
                if (m.from === "me") return <div key={i} style={{ position: "absolute", right: 40, top: top + 70, padding: "20px 28px", borderRadius: 30, background: tokens.mark, color: tokens.white, fontFamily: INTER, fontSize: 38, opacity: k }}>{m.text}</div>;
                return <div key={i} style={{ position: "absolute", left: 40, right: 40, top: top + 60, textAlign: "right", fontFamily: SCRIPT, fontWeight: 700, fontSize: 48, color: alpha(tokens.ink, 0.6), opacity: k }}>{m.text}</div>;
              })}
            </>,
            tokens.card,
          )
        : phone(
            <>
              <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 56, color: tokens.ink }}>{app.heading}</div>
              <div style={{ marginTop: 40, padding: "34px 36px", borderRadius: 30, background: tokens.mark, color: tokens.white, transform: `scale(${0.9 + 0.1 * sp(app.at, POP)})`, opacity: sp(app.at, POP) }}>
                <div style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, opacity: 0.8 }}>NEXT</div>
                <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 52, marginTop: 6 }}>{app.next.label}</div>
                <div style={{ fontFamily: INTER, fontSize: 32, marginTop: 6 }}>{app.next.sub}</div>
              </div>
              {app.later.map((x) => <div key={x} style={{ marginTop: 26, fontFamily: INTER, fontSize: 38, color: tokens.quiet }}>Later · {x}</div>)}
              <div style={{ position: "absolute", left: 56, right: 56, bottom: 120, fontFamily: SCRIPT, fontWeight: 700, fontSize: 64, color: tokens.ink }}>{app.note}</div>
            </>,
            tokens.white,
          )}
      {!before ? <CornerMark at={app.at + 0.6} /> : null}
      <Sound cues={cues} />
    </AbsoluteFill>
  );
};
