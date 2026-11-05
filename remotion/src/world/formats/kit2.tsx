import { AbsoluteFill } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/VT323";
import { tokens } from "../../tokens";
import { alpha, INTER, POP, soft, useK, type Cue } from "../kit/dark";
import { Type } from "../kit/talk";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, DISPLAY, grain, Mark, Stamp } from "../posters/Posters";
import { Sound } from "./kit";
import { GlassNotification } from "../kit/glass";

/**
 * Five more format templates, each its own world: a tier list, a chat thread, a search bar, a receipt, a whiteboard.
 * Voiced formats take refs on spoken words; the chat has no voice and uses seconds.
 */
const MONO = loadMono("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
type Ref = string;
type T = (ref: Ref) => number;
type Timing = { duration: number; lines: { id: string; start: number; end: number; words: { text: string; start: number; end: number }[] }[] };

export type TierSpec = { format: "tier-list"; title: string; items: { text: string; tier: "S" | "A" | "B" | "C" | "F"; at: Ref }[]; verdict?: { at: Ref; text: string } };
export type ChatSpec = {
  format: "chat";
  duration: number;
  header: { name: string; sub: string };
  messages: { at: number; from: "them" | "me"; text: string }[];
  notification: { at: number; app: string; title: string; body: string };
  caption?: string;
};
export type SearchSpec = { format: "search"; query: { text: string; at: Ref }; suggestions: { text: string; at: Ref }[]; pick: { index: number; at: Ref }; result: { at: Ref; head: string; body: string } };
export type ReceiptSpec = { format: "receipt"; shop: string; sub: string; items: { label: string; value: string; at: Ref }[]; total: { label: string; value: string; at: Ref }; stamp?: { text: string; at: Ref }; footer?: { text: string; at: Ref } };
export type BoardSpec = { format: "whiteboard"; title: { text: string; at: Ref }; lines: { text: string; at: Ref; colour?: "ink" | "mark" | "problem" }[]; circle?: { line: number; at: Ref }; arrow?: { from: number; to: number; at: Ref }; strike?: { line: number; at: Ref }; sticky?: { text: string; at: Ref } };
export type FormatSpec2 = TierSpec | ChatSpec | SearchSpec | ReceiptSpec | BoardSpec;

const Corner: React.FC<{ colour?: string }> = ({ colour = tokens.mark }) => (
  <div style={{ position: "absolute", right: 70, bottom: 90 }}><Mark size={70} colour={colour} /></div>
);

// ---------- Tier list ----------

const TIERS = ["S", "A", "B", "C", "F"] as const;
const TIER_BG: Record<(typeof TIERS)[number], string> = { S: tokens.mark, A: alpha(tokens.mark, 0.6), B: tokens.kraft, C: alpha(tokens.kraft, 0.55), F: tokens.problem };

export const TierList: React.FC<{ spec: TierSpec; T: T; timing: Timing; vo: string }> = ({ spec, T, vo }) => {
  const { t, sp } = useK();
  const items = spec.items.map((x) => ({ ...x, a: T(x.at) }));
  const verdict = spec.verdict ? T(spec.verdict.at) : 1e9;
  const cues: Cue[] = items.map((x) => ({ t: x.a, s: x.tier === "F" ? "buzz" : x.tier === "S" ? "ding" : "pop", v: 0.28 }));
  if (spec.verdict) cues.push({ t: verdict, s: "stamp", v: 0.3 });
  const rowTop = (i: number) => 380 + i * 250;
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 70, right: 70, top: 110, fontFamily: DISPLAY, fontSize: Math.max(...spec.title.split("\n").map((l) => l.length)) > 14 ? 96 : 118, lineHeight: 0.9, color: tokens.ink, textTransform: "uppercase" }}><Br text={spec.title} /></div>
      {TIERS.map((tier, i) => (
        <div key={tier} style={{ position: "absolute", left: 50, right: 50, top: rowTop(i), height: 230, borderRadius: 22, background: alpha(tokens.ink, 0.06), display: "flex" }}>
          <div style={{ width: 200, borderRadius: 22, background: TIER_BG[tier], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontSize: 130, color: tier === "B" || tier === "C" ? tokens.ink : tokens.white }}>{tier}</div>
          <div style={{ flex: 1, display: "flex", flexWrap: "wrap", alignContent: "center", gap: 14, padding: "0 22px" }}>
            {items.filter((x) => x.tier === tier && t >= x.a - 0.05).map((x) => {
              const k = sp(x.a - 0.05, { damping: 14, stiffness: 240, mass: 0.6 });
              return <div key={x.text} style={{ padding: "16px 22px", borderRadius: 18, background: tokens.white, boxShadow: soft(0.5), fontFamily: INTER, fontWeight: 700, fontSize: 32, color: tokens.ink, transform: `translateY(${(1 - k) * 260}px) scale(${0.7 + 0.3 * k})`, opacity: Math.min(1, k * 1.4) }}>{x.text}</div>;
            })}
          </div>
        </div>
      ))}
      {spec.verdict && t >= verdict ? (
        <div style={{ position: "absolute", left: 70, right: 70, bottom: 120, padding: "26px 34px", borderRadius: 26, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 760, fontSize: 44, lineHeight: 1.15, transform: `scale(${0.85 + 0.15 * sp(verdict, POP)})`, opacity: sp(verdict, POP) }}>{spec.verdict.text}</div>
      ) : null}
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Chat ----------

export const Chat: React.FC<{ spec: ChatSpec }> = ({ spec }) => {
  const { t, sp } = useK();
  const cues: Cue[] = [...spec.messages.map((m) => ({ t: m.at, s: m.from === "them" ? "pop" : "click", v: 0.26 })), { t: spec.notification.at, s: "ding", v: 0.3 }];
  const shown = spec.messages.filter((m) => t >= m.at);
  const next = spec.messages.find((m) => t < m.at && m.at - t < 0.9 && m.from === "them");
  const lineH = 150;
  const n = spec.notification;
  return (
    <AbsoluteFill style={{ background: tokens.white }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 250, background: tokens.card, borderBottom: `2px solid ${tokens.rule}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 30 }}>
        <div style={{ width: 96, height: 96, borderRadius: 48, background: tokens.kraft, marginBottom: 12 }} />
        <div style={{ fontFamily: INTER, fontWeight: 750, fontSize: 36, color: tokens.ink }}>{spec.header.name}</div>
        <div style={{ fontFamily: INTER, fontSize: 24, color: tokens.quiet }}>{spec.header.sub}</div>
      </div>
      <div style={{ position: "absolute", left: 50, right: 50, top: 300, bottom: 200 }}>
        {shown.map((m, i) => {
          const k = sp(m.at, POP);
          const fromEnd = shown.length - 1 - i;
          const y = 1380 - 260 - fromEnd * lineH - (next ? lineH : 0);
          if (y < -40) return null;
          const me = m.from === "me";
          return (
            <div key={i} style={{ position: "absolute", top: y, left: me ? undefined : 0, right: me ? 0 : undefined, maxWidth: 760, padding: "26px 34px", borderRadius: 40, background: me ? tokens.mark : tokens.rule, color: me ? tokens.white : tokens.ink, fontFamily: INTER, fontSize: 42, lineHeight: 1.2, transform: `scale(${0.8 + 0.2 * k})`, transformOrigin: me ? "100% 100%" : "0 100%", opacity: k }}>{m.text}</div>
          );
        })}
        {next ? (
          <div style={{ position: "absolute", top: 1380 - 260, left: 0, padding: "30px 36px", borderRadius: 40, background: tokens.rule, display: "flex", gap: 12 }}>
            {[0, 1, 2].map((d) => <div key={d} style={{ width: 18, height: 18, borderRadius: 9, background: alpha(tokens.ink, 0.35 + 0.4 * Math.max(0, Math.sin(t * 8 - d))) }} />)}
          </div>
        ) : null}
      </div>
      <div style={{ position: "absolute", left: 50, right: 50, bottom: 70, height: 100, borderRadius: 50, border: `2px solid ${tokens.rule}`, display: "flex", alignItems: "center", padding: "0 40px", fontFamily: INTER, fontSize: 34, color: tokens.quiet }}>Message</div>
      {t >= n.at ? <GlassNotification app={n.app} title={n.title} body={n.body} style={{ position: "absolute", left: 30, right: 30, top: 30, transform: `translateY(${(1 - sp(n.at, { damping: 16, stiffness: 200, mass: 0.6 })) * -260}px)` }} /> : null}
      {spec.caption && t >= n.at + 1.2 ? <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontFamily: SCRIPT, fontWeight: 700, fontSize: 70, color: tokens.mark, opacity: sp(n.at + 1.2, POP) }}>{spec.caption}</div> : null}
      <Sound cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Search ----------

export const Search: React.FC<{ spec: SearchSpec; T: T; timing: Timing; vo: string }> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const q0 = T(spec.query.at);
  const typed = spec.query.text.slice(0, Math.max(0, Math.floor((t - q0) * 18)));
  const sugg = spec.suggestions.map((s) => ({ ...s, a: T(s.at) }));
  const pick = T(spec.pick.at);
  const res = T(spec.result.at);
  const cues: Cue[] = [...Array.from({ length: Math.ceil(spec.query.text.length / 3) }, (_, i) => ({ t: q0 + i * (3 / 18), s: "key", v: 0.16 })), ...sugg.map((s) => ({ t: s.a, s: "tick_soft", v: 0.2 })), { t: pick, s: "click", v: 0.3 }, { t: res, s: "whoosh", v: 0.24 }];
  const listOut = sp(res - 0.1);
  return (
    <AbsoluteFill style={{ ...grain }}>
      <div style={{ position: "absolute", left: 60, right: 60, top: 560, opacity: 1 - listOut, transform: `translateY(${-listOut * 80}px)` }}>
        <div style={{ height: 130, borderRadius: 65, background: tokens.white, boxShadow: soft(1), display: "flex", alignItems: "center", gap: 26, padding: "0 46px" }}>
          <svg width={46} height={46} viewBox="0 0 46 46"><circle cx={19} cy={19} r={14} fill="none" stroke={tokens.quiet} strokeWidth={5} /><path d="M 30 30 L 42 42" stroke={tokens.quiet} strokeWidth={5} strokeLinecap="round" /></svg>
          <div style={{ fontFamily: INTER, fontSize: 46, color: tokens.ink }}>{typed}<span style={{ opacity: Math.sin(t * 10) > 0 ? 1 : 0, color: tokens.mark }}>|</span></div>
        </div>
        <div style={{ marginTop: 18, borderRadius: 36, background: tokens.white, boxShadow: soft(0.8), overflow: "hidden", opacity: sugg.length && t >= sugg[0].a - 0.1 ? 1 : 0 }}>
          {sugg.map((s, i) => {
            const on = t >= pick && i === spec.pick.index;
            return t >= s.a ? (
              <div key={s.text} style={{ display: "flex", alignItems: "center", gap: 24, padding: "30px 46px", borderTop: i ? `2px solid ${tokens.rule}` : "none", background: on ? tokens.mark : "transparent", color: on ? tokens.white : tokens.ink, fontFamily: INTER, fontSize: 40, opacity: sp(s.a, POP) }}>
                <svg width={34} height={34} viewBox="0 0 46 46"><circle cx={19} cy={19} r={14} fill="none" stroke={on ? tokens.white : tokens.quiet} strokeWidth={5} /><path d="M 30 30 L 42 42" stroke={on ? tokens.white : tokens.quiet} strokeWidth={5} strokeLinecap="round" /></svg>
                {s.text}
              </div>
            ) : null;
          })}
        </div>
      </div>
      {t >= res - 0.1 ? (
        <div style={{ position: "absolute", left: 80, right: 80, top: 640, padding: "60px 60px", borderRadius: 36, background: tokens.white, boxShadow: soft(1.2), transform: `scale(${0.9 + 0.1 * sp(res, POP)})`, opacity: sp(res, POP) }}>
          <div style={{ fontFamily: INTER, fontWeight: 800, fontSize: 70, lineHeight: 1.04, letterSpacing: "-0.04em", color: tokens.ink }}><Br text={spec.result.head} /></div>
          <div style={{ marginTop: 28, fontFamily: SERIF, fontSize: 50, lineHeight: 1.15, color: tokens.ink }}>{spec.result.body}</div>
        </div>
      ) : null}
      <Type timing={timing} hook={0} y={150} colour={tokens.ink} />
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Receipt ----------

export const Receipt: React.FC<{ spec: ReceiptSpec; T: T; timing: Timing; vo: string }> = ({ spec, T, timing, vo }) => {
  const { t, sp } = useK();
  const items = spec.items.map((x) => ({ ...x, a: T(x.at) }));
  const total = T(spec.total.at);
  const stamp = spec.stamp ? T(spec.stamp.at) : 1e9;
  const footer = spec.footer ? T(spec.footer.at) : 1e9;
  const rowsShown = items.filter((x) => t >= x.a).length + (t >= total ? 2 : 0) + (t >= footer ? 2 : 0);
  const cues: Cue[] = [...items.map((x) => ({ t: x.a, s: "tick", v: 0.26 })), { t: total, s: "impact", v: 0.3 }, ...(spec.stamp ? [{ t: stamp, s: "stamp", v: 0.36 }] : [])];
  const H = 360 + rowsShown * 92 + (spec.stamp && t >= stamp ? 140 : 0);
  const row = (l: string, v: string, a: number, big = false) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, fontFamily: MONO, fontSize: big ? 64 : 52, lineHeight: 1.0, color: tokens.ink, marginTop: 30, opacity: sp(a, POP) }}>
      <span>{l}</span>
      <span style={{ flex: 1, borderBottom: `3px dotted ${alpha(tokens.ink, 0.4)}`, marginBottom: 14 }} />
      <span style={{ textAlign: "right" }}>{v}</span>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: tokens.kraft }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${alpha(tokens.ink, 0.07)} 1px, transparent 0)`, backgroundSize: "10px 10px" }} />
      <div style={{ position: "absolute", left: 130, width: 820, top: 330, height: H, background: tokens.white, boxShadow: soft(1.4), clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), 95% 100%, 90% calc(100% - 20px), 85% 100%, 80% calc(100% - 20px), 75% 100%, 70% calc(100% - 20px), 65% 100%, 60% calc(100% - 20px), 55% 100%, 50% calc(100% - 20px), 45% 100%, 40% calc(100% - 20px), 35% 100%, 30% calc(100% - 20px), 25% 100%, 20% calc(100% - 20px), 15% 100%, 10% calc(100% - 20px), 5% 100%, 0 calc(100% - 20px))", padding: "60px 60px", transform: "rotate(-1.5deg)" }}>
        <div style={{ textAlign: "center", fontFamily: MONO, fontSize: 64, color: tokens.ink }}>{spec.shop}</div>
        <div style={{ textAlign: "center", fontFamily: MONO, fontSize: 40, color: alpha(tokens.ink, 0.6) }}>{spec.sub}</div>
        <div style={{ borderTop: `3px dashed ${alpha(tokens.ink, 0.5)}`, marginTop: 30 }} />
        {items.filter((x) => t >= x.a).map((x) => <div key={x.label}>{row(x.label, x.value, x.a)}</div>)}
        {t >= total ? <><div style={{ borderTop: `3px dashed ${alpha(tokens.ink, 0.5)}`, marginTop: 34 }} />{row(spec.total.label, spec.total.value, total, true)}</> : null}
        {spec.footer && t >= footer ? <div style={{ marginTop: spec.stamp ? 190 : 60, textAlign: "center", fontFamily: MONO, fontSize: 44, color: alpha(tokens.ink, 0.75), opacity: sp(footer, POP) }}>{spec.footer.text}</div> : null}
        {spec.stamp && t >= stamp ? <div style={{ position: "absolute", right: 90, top: 300 + (items.length + 1) * 84, transform: `scale(${sp(stamp, { damping: 12, stiffness: 300, mass: 0.6 })})` }}><Stamp text={spec.stamp.text} size={70} rot={-12} /></div> : null}
      </div>
      <Type timing={timing} hook={0} y={120} colour={tokens.ink} floor={300} />
      <Corner colour={tokens.ink} />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};

// ---------- Whiteboard ----------

const MARKER = { ink: tokens.ink, mark: tokens.mark, problem: tokens.problem };

export const Whiteboard: React.FC<{ spec: BoardSpec; T: T; vo: string }> = ({ spec, T, vo }) => {
  const { t, sp } = useK();
  const title = T(spec.title.at);
  const lines = spec.lines.map((l) => ({ ...l, a: T(l.at) }));
  const write = (a: number, len: number) => Math.max(0, Math.min(1, (t - a) / Math.max(0.5, len * 0.045)));
  const cues: Cue[] = [{ t: title, s: "scribble", v: 0.3 }, ...lines.map((l) => ({ t: l.a, s: "scribble", v: 0.26 }))];
  const lineY = (i: number) => 520 + i * 200;
  if (spec.circle) cues.push({ t: T(spec.circle.at), s: "scribble", v: 0.28 });
  if (spec.sticky) cues.push({ t: T(spec.sticky.at), s: "paper_land", v: 0.3 });
  const drawn = (a: number, dur = 0.7) => Math.max(0, Math.min(1, (t - a) / dur));
  return (
    <AbsoluteFill style={{ background: tokens.white }}>
      <AbsoluteFill style={{ border: `26px solid ${tokens.rule}`, boxShadow: `inset 0 0 120px ${alpha(tokens.ink, 0.06)}` }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 200, fontFamily: SCRIPT, fontWeight: 700, fontSize: 104, lineHeight: 1.0, color: tokens.ink, clipPath: `inset(0 ${100 - write(title, spec.title.text.length) * 100}% 0 0)` }}><Br text={spec.title.text} /></div>
      <svg width={1080} height={40} style={{ position: "absolute", left: 0, top: 440 }}><path d="M 90 20 C 400 6, 700 34, 990 16" fill="none" stroke={tokens.mark} strokeWidth={8} strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={1000 * (1 - drawn(title + 0.6))} /></svg>
      {lines.map((l, i) => (
        <div key={i} style={{ position: "absolute", left: 120, right: 120, top: lineY(i), fontFamily: SCRIPT, fontWeight: 700, fontSize: 84, color: MARKER[l.colour ?? "ink"], clipPath: `inset(0 ${100 - write(l.a, l.text.length) * 100}% 0 0)`, whiteSpace: "nowrap" }}>{l.text}</div>
      ))}
      {spec.strike ? <svg width={1080} height={60} style={{ position: "absolute", left: 0, top: lineY(spec.strike.line) + 40 }}><path d="M 110 30 L 960 24" stroke={tokens.problem} strokeWidth={10} strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - drawn(T(spec.strike.at), 0.4))} /></svg> : null}
      {spec.circle && t >= T(spec.circle.at) ? <svg width={980} height={190} viewBox="0 0 980 190" style={{ position: "absolute", left: 60, top: lineY(spec.circle.line) - 40, overflow: "visible" }}><path d="M 578 20 C 300 6, 60 40, 70 100 C 80 170, 470 180, 745 160 C 960 140, 960 60, 735 30 C 590 10, 340 14, 200 40" fill="none" stroke={tokens.mark} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn(T(spec.circle.at), 0.8)} /></svg> : null}
      {spec.arrow ? (
        <svg width={200} height={400} style={{ position: "absolute", left: 860, top: lineY(spec.arrow.from) + 60 }}><path d={`M 40 0 C 140 ${(spec.arrow.to - spec.arrow.from) * 70}, 120 ${(spec.arrow.to - spec.arrow.from) * 140}, 30 ${(spec.arrow.to - spec.arrow.from) * 190 - 40} M 30 ${(spec.arrow.to - spec.arrow.from) * 190 - 40} l 40 -10 M 30 ${(spec.arrow.to - spec.arrow.from) * 190 - 40} l 14 -40`} fill="none" stroke={tokens.problem} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn(T(spec.arrow.at), 0.7)} /></svg>
      ) : null}
      {spec.sticky && t >= T(spec.sticky.at) ? (
        <div style={{ position: "absolute", right: 90, bottom: 180, width: 520, padding: "44px 44px", background: tokens.kraft, boxShadow: soft(0.9), transform: `rotate(3deg) scale(${0.8 + 0.2 * sp(T(spec.sticky.at), POP)})`, fontFamily: SCRIPT, fontWeight: 700, fontSize: 54, lineHeight: 1.05, color: tokens.ink }}><Br text={spec.sticky.text} /></div>
      ) : null}
      <Corner />
      <Sound vo={vo} cues={cues} />
    </AbsoluteFill>
  );
};
