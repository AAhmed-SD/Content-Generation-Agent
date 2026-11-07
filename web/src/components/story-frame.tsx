import type { Frame, Visual } from "@/lib/proposals";

/**
 * One storyboard frame, sketched: a 9:16 phone frame with the on-screen words and a simple drawing of the
 * main picture. It is a sketch of the beat, not the render. Colours are the desk's CSS variables.
 */

const DARK = new Set(["science", "scene", "three", "pov", "dialog", "myth"]);

/** Fill in the drawable fields for proposals written before frames had them. */
export function sketchOf(f: Frame, format: string, i: number, total: number): Required<Pick<Frame, "visual" | "ground">> & { text: string; motion: string } {
  const s = `${f.screen} ${f.voice}`.toLowerCase();
  const pick = (): Visual => {
    if (i === total - 1 && /end card|offload/.test(f.screen.toLowerCase())) return "end";
    const rules: [RegExp, Visual][] = [
      [/cram|spaced|spacing/, "curves"],
      [/forgetting|curve|fades?\b|drops?/, "curve"],
      [/\bbars?\b|graph|chart/, "bars"],
      [/flashcard|\bcards?\b|deck/, "flashcards"],
      [/option|multiple choice|which (one|investigation)/, "question"],
      [/exam|past paper|mock|paper|marks?\b/, "paper"],
      [/group chat|message|text from|notification|chat/, "chat"],
      [/poster|missing/, "poster"],
      [/evidence|pinned|string|suspect/, "board"],
      [/flood|pile|storm|shake|chaos|fills?|overflow/, "chaos"],
      [/calendar|forecast|week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|slot|block/, "calendar"],
      [/\bapp\b|phone|screen|dashboard|results|attempt history/, "phone"],
      [/clock|timer|minutes|hour/, "clock"],
      [/receipt|till/, "receipt"],
      [/stamp/, "stamp"],
      [/tick|cross|checklist|list/, "list"],
      [/notes|blurt|write|recall|remember/, "notes"],
    ];
    return rules.find(([re]) => re.test(s))?.[1] ?? "text";
  };
  const quoted = f.screen.match(/(?:^|[\s:(])['‘“"]([^'’”"]{2,60})['’”"](?=$|[\s.,;:!?)])/)?.[1] ?? "";
  return {
    visual: f.visual ?? pick(),
    ground: f.ground ?? (DARK.has(format) ? "dark" : "paper"),
    text: f.text ?? quoted,
    motion: f.motion ?? "",
  };
}

const C = (v: string) => ({ fill: `var(${v})` });
const S = (v: string, w = 2) => ({ fill: "none", stroke: `var(${v})`, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

function Picture({ visual, fg, accent, soft }: { visual: Visual; fg: string; accent: string; soft: string }) {
  switch (visual) {
    case "curve":
      return (
        <g>
          <path d="M30 70 V160 H155" style={S(soft)} />
          <path d="M34 78 C 55 130, 80 145, 150 152" style={S(accent, 3.5)} />
        </g>
      );
    case "curves":
      return (
        <g>
          <path d="M30 70 V160 H155" style={S(soft)} />
          <path d="M34 80 C 60 140, 90 150, 150 155" style={S("--problem", 3)} />
          <path d="M34 80 C 50 110, 60 112, 70 84 C 85 104, 95 106, 105 86 C 118 100, 130 100, 150 92" style={S(accent, 3)} />
        </g>
      );
    case "bars":
      return (
        <g>
          <path d="M28 160 H156" style={S(soft)} />
          <rect x="44" y="118" width="26" height="42" rx="4" style={C(soft)} />
          <rect x="80" y="72" width="26" height="88" rx="4" style={C(accent)} />
          <rect x="116" y="98" width="26" height="62" rx="4" style={C(fg)} opacity={0.35} />
        </g>
      );
    case "notes":
      return (
        <g>
          <rect x="34" y="62" width="112" height="104" rx="6" style={C("--white")} />
          {[80, 96, 112].map((y, k) => (
            <path key={y} d={`M46 ${y} q 20 -4 ${60 - k * 10} 0`} style={S("--ink", 2)} />
          ))}
          <path d="M46 132 q 20 -4 40 0" style={S("--problem", 2)} strokeDasharray="4 4" />
          <path d="M46 148 q 20 -4 30 0" style={S("--problem", 2)} strokeDasharray="4 4" />
        </g>
      );
    case "flashcards":
      return (
        <g>
          <rect x="44" y="70" width="96" height="64" rx="8" style={C("--white")} opacity={0.5} transform="rotate(-8 92 102)" />
          <rect x="40" y="86" width="100" height="66" rx="8" style={{ ...C("--white"), stroke: `var(${accent})`, strokeWidth: 2 }} />
          <path d="M56 112 H120 M56 126 H100" style={S("--ink", 2)} />
        </g>
      );
    case "question":
      return (
        <g>
          <path d="M36 66 H144 M36 78 H120" style={S(fg, 2)} />
          {[96, 118, 140].map((y, k) => (
            <g key={y}>
              <rect x="36" y={y} width="108" height="16" rx="4" style={k === 1 ? { fill: "none", stroke: `var(${accent})`, strokeWidth: 2.5 } : S(soft, 1.5)} />
              <path d={`M46 ${y + 8} H${110 - k * 12}`} style={S(fg, 1.5)} />
            </g>
          ))}
        </g>
      );
    case "paper":
      return (
        <g>
          <rect x="38" y="58" width="104" height="116" rx="4" style={C("--white")} />
          {[78, 100, 122].map((y) => (
            <g key={y}>
              <path d={`M50 ${y} H112`} style={S("--ink", 1.6)} />
              <path d={`M118 ${y - 2} l4 5 l8 -10`} style={S("--problem", 2.2)} />
            </g>
          ))}
          <rect x="50" y="138" width="80" height="24" rx="3" style={S("--rule", 1.5)} />
          <ellipse cx="90" cy="150" rx="50" ry="18" style={S("--problem", 2)} />
        </g>
      );
    case "phone":
      return (
        <g>
          <rect x="56" y="54" width="68" height="122" rx="12" style={{ fill: "var(--white)", stroke: `var(${fg})`, strokeWidth: 2 }} />
          <rect x="64" y="70" width="52" height="14" rx="3" style={C("--blue")} />
          <rect x="64" y="90" width="52" height="14" rx="3" style={C("--line")} />
          <rect x="64" y="110" width="36" height="14" rx="3" style={C("--line")} />
          <circle cx="90" cy="160" r="5" style={C("--blue")} />
        </g>
      );
    case "calendar":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((d) => (
            <g key={d}>
              <rect x={30 + d * 25} y="62" width="21" height="104" rx="4" style={S(soft, 1.5)} />
              <rect x={32 + d * 25} y={74 + ((d * 23) % 50)} width="17" height="22" rx="3" style={C(d === 3 ? "--problem" : accent)} opacity={d === 3 ? 0.9 : 1} />
            </g>
          ))}
          <path d="M118 120 C 130 140, 140 140, 150 130" style={S(fg, 1.6)} />
        </g>
      );
    case "chat":
      return (
        <g>
          <rect x="30" y="64" width="86" height="22" rx="11" style={C(soft)} />
          <rect x="64" y="94" width="86" height="22" rx="11" style={C(accent)} />
          <rect x="30" y="124" width="70" height="22" rx="11" style={C(soft)} />
          <circle cx="146" cy="66" r="8" style={C("--problem")} />
        </g>
      );
    case "list":
      return (
        <g>
          {[70, 98, 126, 154].map((y, k) => (
            <g key={y}>
              {k < 2 ? <path d={`M34 ${y} l5 6 l10 -12`} style={S(accent, 2.6)} /> : <path d={`M36 ${y - 6} l10 12 M46 ${y - 6} l-10 12`} style={S("--problem", 2.6)} />}
              <path d={`M60 ${y} H${140 - k * 8}`} style={S(fg, 2)} />
            </g>
          ))}
        </g>
      );
    case "poster":
      return (
        <g>
          <rect x="44" y="56" width="92" height="120" rx="2" style={C("--white")} transform="rotate(-3 90 116)" />
          <rect x="70" y="50" width="40" height="10" style={C("--quiet")} opacity={0.5} />
          <path d="M58 76 H122" style={S("--ink", 4)} />
          <rect x="62" y="88" width="56" height="44" style={S("--rule", 1.5)} />
          <path d="M58 146 H116 M58 158 H100" style={S("--ink", 1.6)} />
        </g>
      );
    case "board":
      return (
        <g>
          {[
            [44, 72],
            [118, 80],
            [60, 136],
            [124, 142],
          ].map(([x, y], k) => (
            <g key={k}>
              <rect x={x - 18} y={y - 14} width="36" height="28" rx="2" style={C("--white")} />
              <circle cx={x} cy={y - 14} r="3.5" style={C("--problem")} />
            </g>
          ))}
          <path d="M44 58 L118 66 L60 122 L124 128" style={S("--problem", 1.6)} />
        </g>
      );
    case "chaos":
      return (
        <g>
          {Array.from({ length: 11 }, (_, k) => (
            <rect key={k} x={28 + ((k * 37) % 110)} y={56 + ((k * 53) % 104)} width={30 + (k % 3) * 8} height="18" rx="4" style={C(k % 4 === 0 ? "--problem" : k % 3 === 0 ? accent : soft)} transform={`rotate(${(k * 29) % 40 - 20} ${40 + ((k * 37) % 110)} ${64 + ((k * 53) % 104)})`} />
          ))}
        </g>
      );
    case "clock":
      return (
        <g>
          <circle cx="90" cy="114" r="50" style={S(fg, 3)} />
          <path d="M90 114 V82 M90 114 L114 126" style={S(accent, 3.5)} />
        </g>
      );
    case "receipt":
      return (
        <g>
          <path d="M52 56 H128 V170 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 Z" style={C("--white")} />
          {[74, 88, 102, 116, 130].map((y) => (
            <path key={y} d={`M62 ${y} H96 M108 ${y} H118`} style={S("--ink", 1.6)} />
          ))}
          <path d="M62 148 H118" style={S("--ink", 3)} />
        </g>
      );
    case "stamp":
      return (
        <g transform="rotate(-10 90 114)">
          <rect x="34" y="88" width="112" height="52" rx="6" style={S("--stamp", 4)} />
          <path d="M50 114 H130" style={S("--stamp", 6)} />
        </g>
      );
    case "end":
      return (
        <g>
          <circle cx="58" cy="114" r="9" style={C(accent)} />
          <text x="74" y="122" style={{ ...C(fg), fontFamily: "var(--font-sans, system-ui)", fontWeight: 800, fontSize: 26 }}>
            Offload
          </text>
        </g>
      );
    default:
      return null;
  }
}

export function StoryFrame({ frame, format, i, total }: { frame: Frame; format: string; i: number; total: number }) {
  const k = sketchOf(frame, format, i, total);
  const bg = k.ground === "dark" ? "--night" : k.ground === "blue" ? "--blue" : "--paper";
  const fg = k.ground === "paper" ? "--ink" : "--white";
  const accent = k.ground === "blue" ? "--white" : "--blue";
  const soft = k.ground === "paper" ? "--line" : "--rule";
  const words = k.visual === "end" ? "" : k.text;
  // wrap the on-screen words onto at most three lines
  const lines: string[] = [];
  for (const w of words.split(/\s+/).filter(Boolean)) {
    const last = lines.at(-1);
    if (last !== undefined && (last + " " + w).length <= 16) lines[lines.length - 1] = `${last} ${w}`;
    else if (lines.length < 3) lines.push(w);
  }
  const big = k.visual === "text";
  return (
    <figure className="story-frame">
      <svg viewBox="0 0 180 320" role="img" aria-label={`Frame ${i + 1}: ${frame.screen}`}>
        <rect width="180" height="320" rx="14" style={C(bg)} />
        <g transform={big ? "translate(0 0)" : "translate(0 92)"}>{big ? null : <Picture visual={k.visual} fg={fg} accent={accent} soft={soft} />}</g>
        {lines.length ? (
          <text x="90" y={big ? 150 - lines.length * 12 : 58} textAnchor="middle" style={{ ...C(fg), fontFamily: "var(--font-sans, system-ui)", fontWeight: 800, fontSize: big ? 22 : 15 }}>
            {lines.map((l, n) => (
              <tspan key={n} x="90" dy={n ? (big ? 28 : 19) : 0}>
                {l}
              </tspan>
            ))}
          </text>
        ) : null}
        <text x="14" y="304" style={{ ...C(fg), fontSize: 11, fontWeight: 700, opacity: 0.55 }}>
          {i + 1}
        </text>
        {k.motion ? (
          <text x="166" y="304" textAnchor="end" style={{ ...C(fg), fontSize: 10, opacity: 0.55 }}>
            ↻ {k.motion}
          </text>
        ) : null}
      </svg>
      <figcaption>
        {frame.voice ? <span className="story-voice">“{frame.voice}”</span> : null}
        <span className="story-screen">{frame.screen}</span>
      </figcaption>
    </figure>
  );
}
