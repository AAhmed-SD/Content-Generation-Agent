import { AbsoluteFill } from "remotion";
import { tokens } from "../../tokens";
import logo from "../logo.json";
import { INTER } from "../kit/dark";

/**
 * The profile picture: the real Offload logo (the dot and the wordmark, traced from the logo file into logo.json),
 * centred on a square and sized to sit well inside the circle every platform crops it to.
 * Three grounds: blue (the brand colour), paper (ink with the blue dot), and night (white with the blue dot).
 */
export type ProfileProps = { ground: "blue" | "paper" | "night"; label?: string };

// the logo's extent in logo.json units: from the left of the dot to the end of the wordmark
const D = logo.dot;
const X0 = D.cx - D.r;
const X1 = logo.bbox[1];
const Y0 = Math.min(D.cy - D.r, logo.bbox[2]);
const Y1 = Math.max(D.cy + D.r, logo.bbox[3]);

export const Profile: React.FC<ProfileProps> = ({ ground, label }) => {
  const bg = ground === "blue" ? tokens.mark : ground === "paper" ? tokens.paper : tokens.night;
  const text = ground === "paper" ? tokens.ink : tokens.white;
  const dot = ground === "blue" ? tokens.white : tokens.mark;
  const pad = 8;
  const width = 760; // inside the 1080 circle with room to spare
  const w = X1 - X0 + pad * 2;
  const h = Y1 - Y0 + pad * 2;
  return (
    <AbsoluteFill style={{ background: bg, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: label ? "translateY(-10px)" : undefined }}>
        <svg width={width} height={(width * h) / w} viewBox={`${X0 - pad} ${Y0 - pad} ${w} ${h}`}>
          <circle cx={D.cx} cy={D.cy} r={D.r} fill={dot} />
          <path d={logo.text} fill={text} fillRule="evenodd" />
        </svg>
        {/* the account, small, under the wordmark and lined up with it */}
        {label ? (
          <div style={{ alignSelf: "flex-end", marginTop: 18, marginRight: 14, fontFamily: INTER, fontWeight: 600, fontSize: 58, letterSpacing: "0.02em", color: text, opacity: 0.92 }}>{label}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const profileDefaults: ProfileProps = { ground: "blue" };
