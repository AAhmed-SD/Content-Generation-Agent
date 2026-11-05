import { AbsoluteFill } from "remotion";
import { tokens } from "../../tokens";
import { alpha, INTER, XBadge } from "../kit/dark";
import { Chart, forget, Source } from "../kit/talk";
import { Flashcard } from "../kit/quiz";
import { SCRIPT, SERIF } from "../../story/fonts";
import { Br, grain, Mark, Poster, POSTER_H, POSTER_W, shadow, Stamp, type PosterProps } from "./Posters";
import { PhotoPoster, type PhotoProps } from "./PhotoPosters";

/**
 * Carousel slides, 1080 × 1350. A carousel is a cover (any photo or drawn poster), then slides, then an end card.
 * Every slide after the cover carries the handle, the page, and a swipe arrow except the last.
 */
export type Slide =
  | { kind: "photo"; props: PhotoProps }
  | { kind: "poster"; props: PosterProps }
  | { kind: "point"; kicker: string; head: string; body?: string; stamp?: string; note?: string }
  | { kind: "list"; title: string; rows: { text: string; mark?: "tick" | "cross" }[] }
  | { kind: "card"; deck: string; q: string; a: string; not?: string; side: "front" | "back"; foot?: string }
  | { kind: "science"; technique: string; body: string; source: string; chart: "spacing" | "testing" }
  | { kind: "end"; lead: string; pill: string; line?: string };

export type SlideProps = { slide: Slide; page: number; total: number; handle: string };

const Frame: React.FC<{ page: number; total: number; handle: string; children: React.ReactNode }> = ({ page, total, handle, children }) => (
  <AbsoluteFill style={{ ...grain }}>
    <div style={{ position: "absolute", left: 80, top: 64, fontFamily: INTER, fontWeight: 600, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.quiet }}>{handle}</div>
    <div style={{ position: "absolute", right: 80, top: 64, fontFamily: INTER, fontWeight: 600, fontSize: 22, letterSpacing: "0.1em", color: tokens.quiet }}>{String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
    {children}
    {page < total ? (
      <svg width={70} height={40} viewBox="0 0 70 40" style={{ position: "absolute", right: 80, bottom: 70 }}>
        <path d="M 4 20 H 62 M 44 4 L 64 20 L 44 36" fill="none" stroke={tokens.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null}
  </AbsoluteFill>
);

const Kicker: React.FC<{ text: string; top?: number }> = ({ text, top = 260 }) => (
  <div style={{ position: "absolute", left: 80, top, display: "flex", alignItems: "center", gap: 16 }}>
    <span style={{ width: 16, height: 16, borderRadius: 8, background: tokens.mark }} />
    <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 26, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.ink }}>{text}</span>
  </div>
);

const Point: React.FC<Extract<Slide, { kind: "point" }>> = ({ kicker, head, body, stamp, note }) => (
  <>
    <Kicker text={kicker} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 330, fontFamily: INTER, fontWeight: 760, fontSize: head.length > 60 ? 80 : 96, lineHeight: 1.0, letterSpacing: "-0.045em", color: tokens.ink }}><Br text={head} /></div>
    {body ? <div style={{ position: "absolute", left: 80, right: 160, top: 860, fontFamily: SERIF, fontSize: 52, lineHeight: 1.15, color: tokens.ink }}><Br text={body} /></div> : null}
    {stamp ? <div style={{ position: "absolute", right: 110, top: 1060 }}><Stamp text={stamp} size={48} /></div> : null}
    {note ? (
      <div style={{ position: "absolute", right: 90, top: 960, width: 380, padding: "34px 36px", background: tokens.card, boxShadow: shadow(0.7), transform: "rotate(-4deg)" }}>
        <div style={{ fontFamily: SCRIPT, fontWeight: 700, fontSize: 46, lineHeight: 1.05, color: tokens.ink }}><Br text={note} /></div>
      </div>
    ) : null}
  </>
);

const List: React.FC<Extract<Slide, { kind: "list" }>> = ({ title, rows }) => (
  <>
    <Kicker text="Offload" />
    <div style={{ position: "absolute", left: 80, right: 80, top: 330, fontFamily: INTER, fontWeight: 760, fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.04em", color: tokens.ink }}><Br text={title} /></div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 600, borderRadius: 30, background: tokens.white, boxShadow: shadow(0.9), padding: "20px 44px" }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "30px 0", borderTop: i ? `2px solid ${tokens.rule}` : "none" }}>
          {r.mark === "cross" ? (
            <XBadge k={1} size={52} />
          ) : (
            <svg width={52} height={52} viewBox="0 0 52 52" style={{ flex: "none" }}><circle cx={26} cy={26} r={24} fill={tokens.mark} /><path d="M 15 27 L 23 35 L 38 18" fill="none" stroke={tokens.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 36, lineHeight: 1.2, letterSpacing: "-0.015em", color: tokens.ink }}>{r.text}</div>
        </div>
      ))}
    </div>
  </>
);

const Card: React.FC<Extract<Slide, { kind: "card" }>> = ({ deck, q, a, not, side, foot }) => (
  <>
    <Kicker text={side === "front" ? "Try it first" : "The answer"} top={200} />
    <Flashcard
      s={{ x: 540, y: 740, s: 0.95, r: side === "front" ? -1.5 : 1.5, o: 1, b: 0 }}
      c={{ deck, q, a, not, flip: side === "front" ? 1e6 : -10, strike: side === "front" ? undefined : -10 }}
      foot={foot}
    />
  </>
);

const Science: React.FC<Extract<Slide, { kind: "science" }>> = ({ technique, body, source, chart }) => {
  const series = chart === "spacing"
    ? [
        { f: forget([]), colour: tokens.problem, width: 8, dash: "2 20", label: "No review", labelU: 1, labelDy: 50 },
        { f: forget([0.3, 0.62]), colour: tokens.ink, label: "Reviewed", labelU: 1, labelDy: -60 },
      ]
    : [
        { f: forget([]), colour: tokens.problem, width: 8, dash: "2 20", label: "Reread", labelU: 1, labelDy: 50 },
        { f: (u: number) => 0.92 - 0.3 * u, colour: tokens.ink, label: "Tested", labelU: 1, labelDy: -50 },
      ];
  return (
    <>
      <Kicker text="The research" />
      <div style={{ position: "absolute", left: 80, right: 80, top: 320, fontFamily: INTER, fontWeight: 760, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: tokens.ink }}>{technique}</div>
      <div style={{ position: "absolute", left: 80, right: 120, top: 450, fontFamily: SERIF, fontSize: 44, lineHeight: 1.15, color: tokens.ink }}><Br text={body} /></div>
      <Chart axis={tokens.ink} draw={[-2, -1]} box={{ x0: 150, x1: 930, y0: 720, y1: 1130 }} xLabel="Time" yLabel="Remembered" series={series} />
      <Source at={-1} out={1e6} text={source} y={1200} />
    </>
  );
};

const End: React.FC<Extract<Slide, { kind: "end" }>> = ({ lead, pill, line = "A study system that adapts\nwhen real life happens." }) => (
  <AbsoluteFill style={{ background: tokens.mark }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center" }}><Mark size={170} colour={tokens.white} /></div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 640, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 58, lineHeight: 1.15, color: tokens.white }}><Br text={line} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 880, textAlign: "center", fontFamily: INTER, fontWeight: 760, fontSize: 52, color: tokens.white }}>{lead}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 970, display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "22px 54px", borderRadius: 60, background: tokens.white, fontFamily: INTER, fontWeight: 780, fontSize: 50, letterSpacing: "-0.02em", color: tokens.mark }}>{pill}</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, textAlign: "center", fontFamily: INTER, fontWeight: 600, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: alpha(tokens.white, 0.75) }}>Save this for later</div>
  </AbsoluteFill>
);

export const CarouselSlide: React.FC<SlideProps> = ({ slide, page, total, handle }) => {
  switch (slide.kind) {
    case "photo":
      return <PhotoPoster {...slide.props} />;
    case "poster":
      return <Poster {...slide.props} />;
    case "end":
      return <End {...slide} />;
    default:
      return (
        <Frame page={page} total={total} handle={handle}>
          {slide.kind === "point" ? <Point {...slide} /> : null}
          {slide.kind === "list" ? <List {...slide} /> : null}
          {slide.kind === "card" ? <Card {...slide} /> : null}
          {slide.kind === "science" ? <Science {...slide} /> : null}
        </Frame>
      );
  }
};

export const slideDefaults: SlideProps = {
  slide: { kind: "point", kicker: "The problem", head: "Twelve-hour shift, then two hours of revision?", body: "That plan was never going to work." },
  page: 2,
  total: 6,
  handle: "offload.clinical",
};

export { POSTER_H as SLIDE_H, POSTER_W as SLIDE_W };
