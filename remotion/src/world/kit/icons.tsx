import { tokens } from "../../tokens";

/** Simple line icons, one stroke weight, drawn on a 100 grid. */
export const Icon: React.FC<{ name: string; size?: number; colour?: string }> = ({ name, size = 64, colour = tokens.mark }) => {
  const sw = 7;
  const p = { fill: "none", stroke: colour, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {name === "doc" ? (
        <>
          <path d="M28 12 H60 L76 28 V88 H28 Z" {...p} />
          <path d="M60 12 V28 H76 M38 50 H66 M38 64 H66 M38 76 H56" {...p} />
        </>
      ) : name === "cal" ? (
        <>
          <rect x={16} y={22} width={68} height={62} rx={12} {...p} />
          <path d="M16 42 H84 M34 12 V30 M66 12 V30" {...p} />
          <circle cx={36} cy={60} r={5} fill={colour} />
          <circle cx={56} cy={60} r={5} fill={colour} />
        </>
      ) : name === "card" ? (
        <>
          <rect x={14} y={26} width={60} height={48} rx={10} {...p} />
          <path d="M30 18 H78 Q86 18 86 26 V62" {...p} />
        </>
      ) : name === "chart" ? (
        <path d="M14 80 L38 52 L56 64 L86 26 M70 26 H86 V42" {...p} />
      ) : name === "check" ? (
        <path d="M18 54 L40 74 L84 28" {...p} />
      ) : name === "bell" ? (
        <path d="M26 70 Q30 64 30 46 Q30 24 50 24 Q70 24 70 46 Q70 64 74 70 Z M42 80 Q50 88 58 80" {...p} />
      ) : name === "search" ? (
        <>
          <circle cx={44} cy={44} r={24} {...p} />
          <path d="M62 62 L82 82" {...p} />
        </>
      ) : name === "pen" ? (
        <path d="M22 78 L28 58 L66 20 L80 34 L42 72 Z M58 28 L72 42" {...p} />
      ) : (
        <circle cx={50} cy={50} r={30} {...p} />
      )}
    </svg>
  );
};

