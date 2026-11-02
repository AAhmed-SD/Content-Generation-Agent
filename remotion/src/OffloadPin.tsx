import { AbsoluteFill } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadScript } from "@remotion/google-fonts/Caveat";
import { tokens } from "./tokens";

const sans = loadSans("normal", { weights: ["400", "600", "700"], subsets: ["latin"] }).fontFamily;
const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
const script = loadScript("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily;

export type PinLayout = "calendar" | "folder" | "drawer" | "calculator" | "file" | "type";

export type PinProps = {
  line: string;
  note: string;
  niche: string;
  layout: PinLayout;
  stamp: string;
};

export const pinDefaults: PinProps = {
  line: "The afternoon disappeared.",
  note: "Next card",
  niche: "offload.mentalhealth",
  layout: "calendar",
  stamp: "FILED",
};

function Stamp({ text }: { text: string }) {
  return (
    <div
      style={{
        border: `4px solid ${tokens.stamp}`,
        color: tokens.stamp,
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: 3,
        padding: "8px 12px",
        transform: "rotate(-8deg)",
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
}

function Word() {
  return (
    <div style={{ color: tokens.blue, fontFamily: script, fontSize: 84, lineHeight: 0.8 }}>offload</div>
  );
}

function Calendar({ line, note }: PinProps) {
  const days = ["Before", "The day", "After"];
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 90,
          right: 90,
          textAlign: "center",
          fontFamily: script,
          fontSize: 86,
          lineHeight: 1.02,
        }}
      >
        {line}
      </div>
      <div
        style={{
          position: "absolute",
          top: 620,
          left: 64,
          right: 64,
          display: "flex",
          height: 300,
          borderTop: `1px solid ${tokens.ink}`,
          borderBottom: `1px solid ${tokens.ink}`,
        }}
      >
        {days.map((day, index) => (
          <div
            key={day}
            style={{
              flex: 1,
              position: "relative",
              borderLeft: index ? `1px solid ${tokens.line}` : undefined,
              padding: 22,
            }}
          >
            <div style={{ fontFamily: sans, fontSize: 15, letterSpacing: 2 }}>{day.toUpperCase()}</div>
            {index === 1 ? (
              <>
                <svg width="100%" height="220" viewBox="0 0 220 220" style={{ position: "absolute", left: 0, top: 36 }}>
                  <ellipse cx="110" cy="112" rx="78" ry="86" fill="none" stroke={tokens.ink} strokeWidth="3" transform="rotate(-8 110 112)" />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    top: 130,
                    textAlign: "center",
                    fontFamily: sans,
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: 1,
                  }}
                >
                  {note}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 110, width: "100%", textAlign: "center" }}>
        <Word />
      </div>
    </AbsoluteFill>
  );
}

function Folder({ line, note, stamp }: PinProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.card, color: tokens.ink }}>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          width: 820,
          height: 1120,
          backgroundColor: tokens.kraft,
        }}
      >
        <div style={{ height: 150, backgroundColor: "rgba(23,23,23,0.08)", position: "relative" }}>
          <div style={{ position: "absolute", left: 370, top: 36, width: 54, height: 54, borderRadius: 27, backgroundColor: tokens.kraft, border: `2px solid ${tokens.ink}` }} />
          <div style={{ position: "absolute", left: 382, top: 170, width: 30, height: 30, borderRadius: 15, backgroundColor: tokens.card, border: `2px solid ${tokens.ink}` }} />
        </div>
        <div style={{ padding: "120px 64px 0", fontFamily: sans, fontWeight: 700, fontSize: 58, letterSpacing: -1 }}>CONFIDENTIAL</div>
        <div style={{ padding: "18px 64px 0", fontFamily: serif, fontSize: 54, lineHeight: 1.05 }}>{line}</div>
        <div style={{ position: "absolute", right: 70, bottom: 180 }}>
          <Stamp text={stamp} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 80,
          width: 340,
          backgroundColor: tokens.card,
          border: `1px solid ${tokens.ink}`,
          padding: "18px 16px",
          fontFamily: sans,
          fontSize: 22,
          lineHeight: 1.3,
          transform: "rotate(-4deg)",
        }}
      >
        {note}
      </div>
    </AbsoluteFill>
  );
}

function Drawer({ line, note }: PinProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div style={{ position: "absolute", top: 48, left: 48, right: 48, bottom: 48, border: `1px solid ${tokens.ink}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "28px 32px 0", fontFamily: sans, fontSize: 16, letterSpacing: 2 }}>
          <span>DATE</span>
          <span>FILE</span>
        </div>
        <div style={{ padding: "20px 40px 28px", fontFamily: sans, fontWeight: 700, fontSize: 78, letterSpacing: -2, lineHeight: 0.92 }}>
          What they keep
        </div>
        <div style={{ margin: "0 28px", height: 860, backgroundColor: tokens.ink, position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 18, padding: "36px 40px 0" }}>
            {["A", "B", "C"].map((tab) => (
              <div key={tab} style={{ width: 90, height: 28, backgroundColor: tokens.stamp }} />
            ))}
          </div>
          <div style={{ margin: "80px 36px 0", height: 18, backgroundColor: tokens.kraft, opacity: 0.85 }} />
          <div style={{ margin: "14px 36px 0", height: 18, backgroundColor: tokens.kraft, opacity: 0.7 }} />
          <div
            style={{
              position: "absolute",
              left: 70,
              right: 70,
              top: 220,
              backgroundColor: tokens.card,
              padding: "36px 32px 28px",
              borderTop: `3px solid ${tokens.stamp}`,
            }}
          >
            <div style={{ fontFamily: serif, fontSize: 68, lineHeight: 0.95 }}>{line}</div>
            <div style={{ marginTop: 22, fontFamily: sans, fontSize: 26, maxWidth: 520 }}>{note}</div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 280,
              bottom: 36,
              width: 220,
              height: 54,
              border: `3px solid ${tokens.card}`,
              borderRadius: 8,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Calculator({ line, note }: PinProps) {
  const keys = ["AC", "+", "−", "÷", "×", "=", "·", "C"];
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div style={{ padding: "180px 72px 0", fontFamily: sans, fontWeight: 700, fontSize: 78, letterSpacing: -2, lineHeight: 0.95 }}>
        {line}
      </div>
      <div style={{ padding: "28px 72px 0" }}>
        <Word />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 760,
          backgroundColor: tokens.ink,
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          padding: "48px 48px 0",
        }}
      >
        <div
          style={{
            height: 160,
            backgroundColor: tokens.card,
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            fontFamily: sans,
            fontSize: 32,
            color: tokens.ink,
          }}
        >
          {note}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 28 }}>
          {keys.map((key) => (
            <div
              key={key}
              style={{
                height: 92,
                backgroundColor: tokens.paper,
                color: tokens.ink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function FilePin({ line, note, niche }: PinProps) {
  const rows = [
    ["PAPER", line],
    ["THE LOAD", note],
    ["THE CARD", "Save the card."],
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div style={{ position: "absolute", top: 48, width: "100%", textAlign: "center", fontFamily: sans, fontSize: 16, letterSpacing: 3 }}>
        {niche}
      </div>
      <div style={{ position: "absolute", top: 160, left: 70, width: 860, height: 1120 }}>
        <div style={{ position: "absolute", left: 0, top: 40, width: 70, height: 980, backgroundColor: tokens.kraft }}>
          {["Paper", "Load", "Card"].map((tab, index) => (
            <div
              key={tab}
              style={{
                marginTop: index === 0 ? 80 : 36,
                marginLeft: -28,
                width: 70,
                backgroundColor: tokens.card,
                border: `1px solid ${tokens.ink}`,
                fontFamily: sans,
                fontSize: 13,
                letterSpacing: 1,
                padding: "28px 8px",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 48, top: 0, width: 760, height: 1080, backgroundColor: tokens.kraft, padding: "48px 40px" }}>
          <div style={{ fontFamily: sans, fontSize: 16, letterSpacing: 2 }}>THE FILE</div>
          <div style={{ marginTop: 28, fontFamily: sans, fontWeight: 700, fontSize: 72, letterSpacing: -2, lineHeight: 0.92 }}>{line}</div>
          <div style={{ marginTop: 80 }}>
            {rows.map(([label, value]) => (
              <div key={label} style={{ borderTop: `1px solid ${tokens.ink}`, padding: "16px 0", fontFamily: sans }}>
                <div style={{ fontSize: 14, letterSpacing: 2 }}>{label}</div>
                <div style={{ marginTop: 6, fontSize: 28 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function TypePin({ line, note }: PinProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: tokens.paper, color: tokens.ink }}>
      <div style={{ position: "absolute", top: 80, right: 64, fontFamily: sans, fontSize: 18, letterSpacing: 2 }}>(1) TYPE</div>
      <div style={{ position: "absolute", left: 64, right: 64, top: 360, fontFamily: sans, fontWeight: 700, fontSize: 108, letterSpacing: -4, lineHeight: 0.86 }}>
        {line}
      </div>
      <div style={{ position: "absolute", left: 80, top: 620 }}>
        <Word />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 160, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: sans, fontSize: 20, letterSpacing: 2 }}>
        <div style={{ width: 280, height: 1, backgroundColor: tokens.ink }} />
        <span>{note.toUpperCase()}</span>
      </div>
    </AbsoluteFill>
  );
}

const layouts = {
  calendar: Calendar,
  folder: Folder,
  drawer: Drawer,
  calculator: Calculator,
  file: FilePin,
  type: TypePin,
};

export const OffloadPin: React.FC<PinProps> = (props) => {
  const Layout = layouts[props.layout] ?? TypePin;
  return <Layout {...props} />;
};
