import { tokens } from "../../tokens";
import { alpha, INTER, place, POP, soft, useK, XBadge, type S } from "./dark";

export const CARD_W = 940;
export const CARD_H = 820;

export type QuizCard = { deck: string; q: string; a: string; not?: string; flip: number; strike?: number };

const chip = (bg: string): React.CSSProperties => ({ padding: "10px 22px", borderRadius: 26, background: bg, color: tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 28, letterSpacing: "0.04em" });

/** One flashcard: the question and deck, then a flip to the answer, with the trap struck out. */
export const Flashcard: React.FC<{ s: S; c: QuizCard; foot?: string }> = ({ s, c, foot = "From uploaded lecture notes" }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const p = Math.min(1, Math.max(0, (t - c.flip) / 0.36));
  const sx = Math.abs(Math.cos(Math.PI * p));
  const back = p >= 0.5;
  const strikeAt = c.strike ?? c.flip + 0.8;
  const strikeK = sp(strikeAt, { damping: 200, stiffness: 300, mass: 0.5 });
  const qSize = c.q.length > 120 ? 50 : 56;
  const aSize = c.a.length > 60 ? 54 : c.a.length > 28 ? 70 : 92;
  return (
    <div style={place(s, CARD_W, CARD_H)}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: tokens.white, boxShadow: soft(1.6), transform: `scaleX(${Math.max(0.02, sx)})`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 56, top: 52, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={chip(back ? tokens.ink : tokens.mark)}>{back ? "ANSWER" : "TEST"}</div>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 30, color: tokens.quiet }}>{c.deck}</div>
        </div>
        {!back ? (
          <div style={{ position: "absolute", left: 56, right: 56, top: 170, fontFamily: INTER, fontWeight: 750, fontSize: qSize, lineHeight: 1.16, letterSpacing: "-0.025em", color: tokens.ink }}>{c.q}</div>
        ) : (
          <>
            <div style={{ position: "absolute", left: 56, right: 56, top: 190, fontFamily: INTER, fontWeight: 850, fontSize: aSize, lineHeight: 1.05, letterSpacing: "-0.035em", color: tokens.ink }}>{c.a}</div>
            {c.not ? (
              <div style={{ position: "absolute", left: 56, right: 56, top: 540, height: 120, borderRadius: 22, background: tokens.rule, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px", opacity: sp(strikeAt - 0.15, POP) }}>
                <div style={{ position: "relative", fontFamily: INTER, fontWeight: 700, fontSize: 44, color: tokens.ink, opacity: strikeK > 0.5 ? 0.45 : 1 }}>
                  {c.not}
                  <div style={{ position: "absolute", left: 0, top: "52%", height: 6, width: `${strikeK * 100}%`, background: tokens.problem, borderRadius: 3 }} />
                </div>
                <XBadge k={sp(strikeAt + 0.1, POP)} size={72} />
              </div>
            ) : null}
          </>
        )}
        <div style={{ position: "absolute", left: 56, bottom: 48, fontFamily: INTER, fontWeight: 650, fontSize: 28, color: tokens.mark }}>{foot}</div>
      </div>
    </div>
  );
};

/** A fanned card with the TEST chip and blank lines, for openers. */
export const BlankCard: React.FC<{ s: S }> = ({ s }) => (
  <div style={place(s, CARD_W, CARD_H)}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: tokens.white, boxShadow: soft(1.6) }}>
      <div style={{ position: "absolute", left: 56, top: 52, ...chip(tokens.mark) }}>TEST</div>
      {[0, 1, 2].map((r) => (
        <div key={r} style={{ position: "absolute", left: 56, top: 190 + r * 84, height: 34, width: 700 - r * 160, borderRadius: 17, background: alpha(tokens.ink, 0.12) }} />
      ))}
    </div>
  </div>
);

/** Three dots that fill one by one while the viewer answers. */
export const Countdown: React.FC<{ from: number; until: number; y?: number }> = ({ from, until, y = 1650 }) => {
  const { t, sp } = useK();
  if (t < from - 0.2 || t > until) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", gap: 34 }}>
      {[0, 1, 2].map((i) => {
        const k = sp(from + 0.15 + i * 0.45, POP);
        return <div key={i} style={{ width: 40, height: 40, borderRadius: 20, border: `4px solid ${tokens.white}`, background: k > 0.5 ? tokens.white : "transparent", transform: `scale(${0.8 + 0.2 * k})` }} />;
      })}
    </div>
  );
};

export const quizCues = (qEnd: number, flip: number, strike?: number) => [
  ...[0, 1, 2].map((i) => ({ t: qEnd + 0.15 + i * 0.45, s: "tick", v: 0.26 })),
  { t: flip, s: "flip", v: 0.34 },
  { t: flip + 0.18, s: "impact", v: 0.26 },
  ...(strike !== undefined ? [{ t: strike, s: "buzz", v: 0.22 }] : []),
];

export type Choice = { deck: string; q: string; options: string[]; answer?: number; reveal: number; comment?: string };

/** A choice card: the question, lettered options, then either the right one lit and the rest struck, or (a poll) a comment prompt. */
export const ChoiceCard: React.FC<{ s: S; c: Choice }> = ({ s, c }) => {
  const { t, sp } = useK();
  if (s.o <= 0.01) return null;
  const shown = t >= c.reveal;
  const k = sp(c.reveal, POP);
  const letters = ["A", "B", "C", "D"];
  const H = 250 + c.options.length * 150 + (c.comment ? 120 : 40);
  return (
    <div style={place(s, CARD_W, H)}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: tokens.white, boxShadow: soft(1.6), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 56, top: 48, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={chip(shown && c.answer !== undefined ? tokens.ink : tokens.mark)}>{shown && c.answer !== undefined ? "ANSWER" : c.answer === undefined ? "YOU PICK" : "YOUR ANSWER?"}</div>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 30, color: tokens.quiet }}>{c.deck}</div>
        </div>
        <div style={{ position: "absolute", left: 56, right: 56, top: 128, fontFamily: INTER, fontWeight: 760, fontSize: c.q.length > 70 ? 46 : 54, lineHeight: 1.12, letterSpacing: "-0.03em", color: tokens.ink }}>{c.q}</div>
        {c.options.map((o, i) => {
          const right = c.answer === i;
          const wrong = c.answer !== undefined && !right;
          const lit = shown && right ? k : 0;
          const struck = shown && wrong ? k : 0;
          return (
            <div key={i} style={{ position: "absolute", left: 56, right: 56, top: 250 + i * 150, height: 124, borderRadius: 24, background: lit > 0.5 ? tokens.mark : tokens.rule, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", opacity: 1 - struck * 0.45, transform: `scale(${1 + lit * 0.03})` }}>
              <div style={{ flex: "none", width: 64, height: 64, borderRadius: 32, background: lit > 0.5 ? tokens.white : tokens.ink, color: lit > 0.5 ? tokens.mark : tokens.white, fontFamily: INTER, fontWeight: 800, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>{letters[i]}</div>
              <div style={{ position: "relative", fontFamily: INTER, fontWeight: 650, fontSize: o.length > 34 ? 34 : 40, lineHeight: 1.15, color: lit > 0.5 ? tokens.white : tokens.ink }}>
                {o}
                {struck > 0.01 ? <div style={{ position: "absolute", left: 0, top: "52%", height: 5, width: `${struck * 100}%`, background: tokens.problem, borderRadius: 3 }} /> : null}
              </div>
            </div>
          );
        })}
        {c.comment ? (
          <div style={{ position: "absolute", left: 56, right: 56, bottom: 40, display: "flex", justifyContent: "center", opacity: shown ? k : 0, transform: `translateY(${(1 - k) * 20}px)` }}>
            <div style={{ padding: "16px 34px", borderRadius: 40, background: tokens.ink, color: tokens.white, fontFamily: INTER, fontWeight: 750, fontSize: 34 }}>{c.comment}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
