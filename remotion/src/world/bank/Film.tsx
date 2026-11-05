import { tokens } from "../../tokens";
import { DocCard, Flood, INTER, makeTiming, POP, S0, ScreenClip, Shell, track, useK, WeekStrip, type Block, type Cam, type Cue, type Row } from "../kit/dark";
import { Kinetic, type Fx } from "../kinetic";
import { Chart, forget, PillOrbit, pillCues, phraseStarts, Source, Type } from "../kit/talk";
import { LogoEnd, logoCues } from "../kit/logo";
import { Mark } from "../posters/Posters";
import { BlankCard, ChoiceCard, Countdown, Flashcard, quizCues } from "../kit/quiz";
import { MythFact, Pov, ThreeThings, type FormatSpec } from "../formats/kit";
import { Chat, Receipt, Search, TierList, Whiteboard, type FormatSpec2 } from "../formats/kit2";
import { Battery, Departures, ErrorDialog, ExamPaper, Inbox, Kanban, LockScreen, Missing, Recipe, Satnav, Terms, Weather, type FormatSpec3 } from "../formats/kit3";

/**
 * A film from data. The script is voiced into timing.json; spec.json places scenes on spoken words.
 *
 * A time is a string: "L2" (line start), "L2$" (line end), "L2:friday" (that word), "L2:the#2" (its second time),
 * with an optional shift, "L2:friday@-0.14". Only words that are spoken can be named.
 */
type Ref = string;
type Tone = NonNullable<Block["tone"]>;
type ChipTone = Row["chipTone"];

export type Scene =
  | { type: "week"; at: Ref; title?: string; days: string[]; blocks: { day: number; slot: number; label: string; tone?: Tone; at: Ref; fall?: Ref; outline?: Ref; moveTo?: { day: number; slot: number; at: Ref } }[] }
  | { type: "doc"; at: Ref; title: string; sub?: string; rows: { label?: string; chip?: string; chipTone?: ChipTone; inAt?: Ref; cross?: Ref; strike?: Ref; tick?: Ref; tag?: { text: string; at: Ref } }[]; stamp?: { text: string; at: Ref; strikeAt?: Ref } }
  | { type: "chart"; at: Ref; kind: "spacing" | "forget"; xLabel: string; yLabel: string; source?: string; sourceAt?: Ref }
  | { type: "quiz"; at: Ref; deck: string; q: string; a: string; not?: string; flip: Ref; strike?: Ref; foot?: string }
  | { type: "choice"; at: Ref; deck: string; q: string; options: string[]; answer?: number; reveal: Ref; comment?: string }
  | { type: "clip"; at: Ref; src: string; len: number }
  | { type: "stack"; at: Ref }
  | { type: "none"; at: Ref };

export type FloodSpec = { in: Ref; out: Ref; colour: "problem" | "night"; lines: { line: string; text: string; size?: number; y?: number; fx?: Fx; red?: boolean }[] };

export type Spec = {
  id: string;
  /** "card" (default): the blue end card on the last line, which is the tagline. "corner": the last line is the closer, and only a corner mark shows. */
  end: { lead?: string; pill?: string; style?: "card" | "corner" };
  hook?: number;
  hi?: Record<string, "problem" | "blue">;
  pill?: { at: Ref; until: Ref; sub: string };
  floods?: FloodSpec[];
  scenes: Scene[];
};

/** A bank film is either the scene template (no format) or one of the format templates. */
export type AnySpec = Spec | ((FormatSpec | FormatSpec2 | FormatSpec3) & { id: string });
const isFormat = (spec: AnySpec): spec is (FormatSpec | FormatSpec2 | FormatSpec3) & { id: string } => "format" in spec;

type Timing = Parameters<typeof makeTiming>[0];

const REF = /^(L\d+)(\$?)(?::([^#@]+))?(?:#(\d+))?(?:@([+-]?\d*\.?\d+))?$/;

export const film = (spec: AnySpec, timing: Timing) => {
  if (isFormat(spec) && (spec.format === "pov" || spec.format === "chat")) return { T: () => 0, kw: () => [], end: spec.duration, duration: spec.duration };
  const { ls, le, at, kw, duration } = makeTiming(timing);
  const T = (ref: Ref): number => {
    const m = REF.exec(ref);
    if (!m) throw new Error(`${spec.id}: bad time "${ref}"`);
    const [, line, isEnd, word, nth, shift] = m;
    const base = word ? at(line, word, nth ? Number(nth) : 1) : isEnd ? le(line) : ls(line);
    return base + (shift ? Number(shift) : 0);
  };
  const last = timing.lines[timing.lines.length - 1].id;
  if (isFormat(spec)) return { T, kw, end: le(last), duration: Math.max(duration, le(last) + 1.0) };
  if (spec.end.style === "corner") return { T, kw, end: le(last) + 1.2, duration: Math.max(duration, le(last) + 2.0) };
  const end = ls(last) - 0.1;
  return { T, kw, end, duration: Math.max(duration, end + 4.4) };
};

const STAGE_Y = 1120;
const lineOf = (ref: Ref) => /^L\d+/.exec(ref)![0];

export const BankFilm: React.FC<{ spec: AnySpec; timing: Timing; vo: string }> = ({ spec, timing, vo }) => {
  if (!isFormat(spec)) return <SceneFilm spec={spec} timing={timing} vo={vo} />;
  if (spec.format === "pov") return <Pov spec={spec} />;
  if (spec.format === "chat") return <Chat spec={spec} />;
  const { T, kw } = film(spec, timing);
  switch (spec.format) {
    case "myth-fact":
      return <MythFact spec={spec} T={T} vo={vo} />;
    case "three-things":
      return <ThreeThings spec={spec} T={T} kw={kw} timing={timing} vo={vo} />;
    case "tier-list":
      return <TierList spec={spec} T={T} timing={timing} vo={vo} />;
    case "search":
      return <Search spec={spec} T={T} timing={timing} vo={vo} />;
    case "receipt":
      return <Receipt spec={spec} T={T} timing={timing} vo={vo} />;
    case "whiteboard":
      return <Whiteboard spec={spec} T={T} vo={vo} />;
  }
  const b = { T, timing, vo };
  switch (spec.format) {
    case "lockscreen":
      return <LockScreen spec={spec} {...b} />;
    case "inbox":
      return <Inbox spec={spec} {...b} />;
    case "exampaper":
      return <ExamPaper spec={spec} {...b} />;
    case "battery":
      return <Battery spec={spec} {...b} />;
    case "weather":
      return <Weather spec={spec} {...b} />;
    case "terms":
      return <Terms spec={spec} {...b} />;
    case "dialog":
      return <ErrorDialog spec={spec} {...b} />;
    case "satnav":
      return <Satnav spec={spec} {...b} />;
    case "departures":
      return <Departures spec={spec} {...b} />;
    case "recipe":
      return <Recipe spec={spec} {...b} />;
    case "missing":
      return <Missing spec={spec} {...b} />;
    case "kanban":
      return <Kanban spec={spec} {...b} />;
  }
};

const SceneFilm: React.FC<{ spec: Spec; timing: Timing; vo: string }> = ({ spec, timing, vo }) => {
  const { frame, fps, t } = useK();
  const { T, kw, end } = film(spec, timing);
  const starts = spec.scenes.map((s) => T(s.at));
  const floods = (spec.floods ?? []).map((f) => ({ ...f, a: T(f.in), b: T(f.out) }));
  const pill = spec.pill ? { a: T(spec.pill.at), b: T(spec.pill.until) } : null;
  // a scene leaves when the next one arrives, or when the pill takes the screen
  const until = (i: number) => {
    const next = i + 1 < starts.length ? starts[i + 1] : end;
    return pill && pill.a > starts[i] && pill.a < next ? pill.a : next;
  };

  // camera: settle on each scene, then push in slowly while it holds
  const cam: Cam[] = [{ t: 0, x: 540, y: STAGE_Y - 40, z: 1.12, r: -1 }];
  starts.forEach((s, i) => {
    cam.push({ t: s - 0.12, x: 540, y: STAGE_Y, z: 1.0, r: 0, c: { damping: 200, stiffness: 180, mass: 0.6 } });
    cam.push({ t: s + Math.min(1.6, (until(i) - s) * 0.6), x: 540, y: STAGE_Y + 30, z: 1.08 });
  });
  cam.push({ t: end - 0.2, x: 540, y: 960, z: 1, c: { damping: 200, stiffness: 200, mass: 0.6 } });
  cam.sort((p, q) => p.t - q.t);

  const cues: Cue[] = [{ t: 0, s: "boom", v: 0.32 }, ...(spec.end.style === "corner" ? [] : logoCues(end))];
  if (pill) cues.push(...pillCues(pill.a, pill.a + 0.2));
  floods.forEach((f) => cues.push({ t: f.a, s: "iris", v: 0.32 }, { t: f.a + 0.12, s: "boom", v: 0.3 }));
  spec.scenes.forEach((s, i) => {
    const a = starts[i];
    if (s.type === "clip") cues.push({ t: a - 0.1, s: "glass", v: 0.22 });
    else if (s.type === "chart") cues.push({ t: a, s: "whoosh", v: 0.2 });
    else if (s.type !== "none") cues.push({ t: a - 0.1, s: "paper_land", v: 0.28 });
    if (s.type === "week") s.blocks.forEach((b) => {
      cues.push({ t: T(b.at), s: "pop_low", v: 0.15 });
      if (b.fall) cues.push({ t: T(b.fall), s: "swoosh_down", v: 0.2 });
      if (b.moveTo) cues.push({ t: T(b.moveTo.at), s: "whoosh", v: 0.18 });
    });
    if (s.type === "doc") {
      s.rows.forEach((r) => {
        if (r.inAt) cues.push({ t: T(r.inAt), s: "pop", v: 0.2 });
        if (r.cross) cues.push({ t: T(r.cross), s: "buzz", v: 0.2 });
        if (r.strike) cues.push({ t: T(r.strike), s: "scribble", v: 0.24 });
        if (r.tag) cues.push({ t: T(r.tag.at), s: "pop", v: 0.22 });
        if (r.tick) cues.push({ t: T(r.tick), s: "click", v: 0.24 });
      });
      if (s.stamp) cues.push({ t: T(s.stamp.at), s: "stamp", v: 0.36 });
    }
    if (s.type === "choice") {
      const r = T(s.reveal);
      cues.push(...[0, 1, 2].map((k) => ({ t: T(`${lineOf(s.at)}$`) + 0.15 + k * 0.45, s: "tick", v: 0.26 })), { t: r, s: s.answer === undefined ? "pop" : "ding", v: 0.3 });
      if (s.answer !== undefined) cues.push({ t: r + 0.12, s: "buzz", v: 0.16 });
    }
    if (s.type === "quiz") cues.push(...quizCues(T(`${lineOf(s.at)}$`), T(s.flip), s.strike ? T(s.strike) : undefined));
  });

  // a scene arrives on its word and leaves when the next one arrives
  const stage = spec.scenes.map((s, i) => {
    const a = starts[i];
    const b = until(i);
    const sIn = track(frame, fps, S0({ y: STAGE_Y + 120, s: 0.9 }), [
      { t: a - 0.15, v: { o: 1, s: 1, y: STAGE_Y }, c: POP },
      { t: b - 0.15, v: { o: 0, y: STAGE_Y - 160, b: 14 } },
    ]);
    if (t < a - 0.3 || t > b + 0.6) return null;
    switch (s.type) {
      case "week": {
        const blocks: Block[] = s.blocks.map((x) => ({ day: x.day, slot: x.slot, label: x.label, tone: x.tone ?? "white", at: T(x.at), ...(x.fall ? { fall: T(x.fall) } : {}), ...(x.outline ? { outline: T(x.outline) } : {}), ...(x.moveTo ? { moveTo: { day: x.moveTo.day, slot: x.moveTo.slot, at: T(x.moveTo.at) } } : {}) }));
        return <WeekStrip key={i} s={sIn} days={s.days} blocks={blocks} tileH={380} title={s.title} />;
      }
      case "doc": {
        const rows: Row[] = s.rows.map((r) => ({ label: r.label, chip: r.chip, chipTone: r.chipTone, ...(r.tick ? { check: true, tick: T(r.tick) } : {}), ...(r.inAt ? { inAt: T(r.inAt) } : {}), ...(r.cross ? { cross: T(r.cross) } : {}), ...(r.strike ? { strike: T(r.strike) } : {}), ...(r.tag ? { tag: { text: r.tag.text, at: T(r.tag.at) } } : {}) }));
        const h = (s.sub ? 150 : 118) + s.rows.length * 102 + 50;
        const stamp = s.stamp ? { text: s.stamp.text, at: T(s.stamp.at), x: 600, y: h - 140, size: 130, rot: -8, ...(s.stamp.strikeAt ? { strikeAt: T(s.stamp.strikeAt) } : {}) } : undefined;
        return <DocCard key={i} s={sIn} w={900} h={h} title={s.title} sub={s.sub} rows={rows} stamp={stamp} />;
      }
      case "quiz": {
        const qEnd = T(`${lineOf(s.at)}$`);
        return (
          <div key={i}>
            <Flashcard s={sIn} c={{ deck: s.deck, q: s.q, a: s.a, not: s.not, flip: T(s.flip), strike: s.strike ? T(s.strike) : undefined }} foot={s.foot} />
            <Countdown from={qEnd} until={T(s.flip)} />
          </div>
        );
      }
      case "choice": {
        const qEnd = T(`${lineOf(s.at)}$`);
        return (
          <div key={i}>
            <ChoiceCard s={sIn} c={{ deck: s.deck, q: s.q, options: s.options, answer: s.answer, reveal: T(s.reveal), comment: s.comment }} />
            <Countdown from={qEnd} until={T(s.reveal)} y={1720} />
          </div>
        );
      }
      case "clip": {
        const clip = track(frame, fps, S0({ y: 2400, s: 0.95 }), [
          { t: a - 0.1, v: { y: 1180, o: 1, s: 1 }, c: { damping: 200, stiffness: 180, mass: 0.7 } },
          { t: b - 0.1, v: { s: 2.5, o: 0, b: 30 } },
        ]);
        return <ScreenClip key={i} s={clip} src={s.src} at={a} until={b} clipLen={s.len} />;
      }
      case "stack":
        return (
          <div key={i}>
            {[0, 1, 2].map((k) => (
              <BlankCard key={k} s={track(frame, fps, S0({ y: STAGE_Y + 100 + k * 30, s: 0.7, r: (k - 1) * 6 }), [
                { t: a + 0.1 + k * 0.12, v: { o: 1, s: 0.8, y: STAGE_Y + 20 - k * 10 }, c: POP },
                { t: b - 0.25, v: { o: 0, y: STAGE_Y + 340, b: 12 } },
              ])} />
            ))}
          </div>
        );
      default:
        return null;
    }
  });

  // charts draw over the stage, under the type
  const charts = spec.scenes.map((s, i) => {
    if (s.type !== "chart") return null;
    const a = starts[i];
    const b = until(i);
    if (t < a || t > b + 0.4) return null;
    const series = s.kind === "spacing"
      ? [
          { f: forget([]), colour: tokens.problem, width: 8, dash: "2 20", label: "No review", labelU: 1, labelDy: 50 },
          { f: forget([0.3, 0.62]), colour: tokens.white, label: "Reviewed", labelU: 1, labelDy: -60 },
        ]
      : [{ f: forget([]), colour: tokens.problem, label: "Forgotten", labelU: 1, labelDy: 50 }];
    const dots = s.kind === "spacing" ? [{ u: 0.3, s: 1, label: "Review" }, { u: 0.62, s: 1, label: "Review" }] : [];
    return (
      <div key={i}>
        <Chart axis={tokens.white} draw={[a + 0.2, Math.min(b - 0.3, a + 3)]} out={b - 0.2} box={{ x0: 130, x1: 950, y0: 760, y1: 1360 }} xLabel={s.xLabel} yLabel={s.yLabel} series={series} dots={dots} />
        {s.source ? <Source dark at={s.sourceAt ? T(s.sourceAt) : a + 1} out={b - 0.3} text={s.source} y={1520} /> : null}
      </div>
    );
  });

  const hi: Record<string, string> = {};
  Object.entries(spec.hi ?? {}).forEach(([w, c]) => {
    const colour = c === "problem" ? tokens.problem : tokens.blue;
    [w, `${w}.`, `${w},`, `${w}?`].forEach((v) => (hi[v] = colour));
  });
  const gaps: [number, number][] = [...floods.map((f): [number, number] => [f.a, f.b]), ...(pill ? [[pill.a, pill.b] as [number, number]] : [])];

  return (
    <Shell ticks={phraseStarts(timing, spec.hook ?? 6)} cam={cam} cues={cues} vo={vo} punches={[[0.02, 0.025], ...floods.map((f): [number, number] => [f.a + 0.12, 0.025])]} overlay={
      <>
        {charts}
        {floods.map((f, i) => (
          <Flood key={i} colour={f.colour === "problem" ? tokens.problem : tokens.night} inAt={f.a} from={{ x: 540, y: 1000 }} outAt={f.b} to={{ x: 540, y: 1000 }}>
            {f.lines.map((l, j) => {
              const big = l.size ?? (j === f.lines.length - 1 ? 200 : 104);
              const y = l.y ?? 600 + f.lines.slice(0, j).reduce((acc, p, k) => acc + (p.size ?? (k === f.lines.length - 1 ? 200 : 104)) * 1.25, 0);
              const fx = l.fx ?? (j === f.lines.length - 1 ? "slam" : "mask");
              return <Kinetic key={j} frame={frame} fps={fps} font={INTER} colour={l.red ? tokens.problem : tokens.white} y={y} size={big} weight={big > 150 ? 850 : 760} out={f.b + 0.15} exit="cut" parts={kw(l.text, l.line, fx)} />;
            })}
          </Flood>
        ))}
        {spec.pill && pill ? <PillOrbit appear={pill.a} press={pill.a + 0.2} until={pill.b} sub={spec.pill.sub} /> : null}
        <Type timing={timing} hook={spec.hook ?? 6} gaps={gaps} until={end} hi={hi} />
        {spec.end.style === "corner" ? (
          <div style={{ position: "absolute", right: 70, bottom: 110 }}><Mark size={78} colour={tokens.white} /></div>
        ) : (
          <LogoEnd at={end} lead={spec.end.lead ?? "Free trial"} pill={spec.end.pill ?? "Link in bio"} />
        )}
      </>
    }>
      {stage}
    </Shell>
  );
};
