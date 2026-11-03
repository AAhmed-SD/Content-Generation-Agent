import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { pinLayouts, type PinLayoutId } from "@/lib/pin-layouts";

export { isPinLayout, pinLayouts, type PinLayoutId } from "@/lib/pin-layouts";

const paper = "#f3efe4";
const card = "#f7f3e8";
const ink = "#171717";
const blue = "#2746d6";
const stamp = "#b4332c";
const kraft = "#c4a574";

const serif = existsSync("/Users/hadiqa/Library/Fonts/InstrumentSerif-Regular.ttf")
  ? "/Users/hadiqa/Library/Fonts/InstrumentSerif-Regular.ttf"
  : "/System/Library/Fonts/Supplemental/Georgia.ttf";
const sans = "/System/Library/Fonts/Supplemental/Arial.ttf";
const bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf";
const script = "/System/Library/Fonts/Supplemental/Brush Script.ttf";

function wrap(text: string, max: number, limit: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, limit);
}

function draw(args: string[]) {
  const result = spawnSync("magick", args, { encoding: "utf8" });
  return result.status === 0;
}

function word(args: string[], yFromSouth = 90) {
  args.push("-gravity", "south", "-font", script, "-pointsize", "84", "-fill", blue, "-annotate", `+0+${yFromSouth}`, "offload");
}

export function drawOffloadPin({
  layout,
  line,
  note,
  out,
}: {
  layout: PinLayoutId;
  line: string;
  note: string;
  out: string;
}) {
  const sentence = wrap(line, layout === "type" || layout === "withheld" ? 16 : 28, 3);
  const fact = note || "Come back to the card.";
  const args = ["-size", "1000x1500"];

  if (layout === "withheld") {
    args.push(`xc:${ink}`, "-gravity", "northwest", "-font", bold, "-pointsize", "78", "-fill", paper);
    sentence.forEach((row, index) => args.push("-annotate", `+72+${280 + index * 96}`, row));
    word(args, 180);
    args.push("-fill", paper, "-draw", "rectangle 72,1360 928,1362", out);
    return draw(args);
  }

  args.push(`xc:${paper}`, "-fill", ink, "-stroke", ink);

  if (layout === "calendar") {
    args.push("-gravity", "north", "-font", serif, "-pointsize", "54");
    sentence.forEach((row, index) => args.push("-annotate", `+0+${160 + index * 70}`, row));
    args.push(
      "-gravity", "northwest",
      "-stroke", ink,
      "-strokewidth", "2",
      "-draw", "line 80,620 920,620",
      "-draw", "line 80,980 920,980",
      "-draw", "line 386,620 386,980",
      "-draw", "line 614,620 614,980",
      "-stroke", "none",
      "-font", sans,
      "-pointsize", "16",
      "-annotate", "+120+640", "BEFORE",
      "-annotate", "+430+640", "THE DAY",
      "-annotate", "+700+640", "AFTER",
      "-fill", "none",
      "-stroke", ink,
      "-strokewidth", "4",
      "-draw", "ellipse 500,820 90,100 0,360",
      "-fill", ink,
      "-stroke", "none",
      "-font", bold,
      "-pointsize", "22",
      "-gravity", "center",
      "-annotate", "+0+80", fact,
    );
  } else if (layout === "folder") {
    args.push(
      "-fill", kraft,
      "-draw", "rectangle 90,140 910,1280",
      "-fill", ink,
      "-font", bold,
      "-pointsize", "42",
      "-gravity", "northwest",
      "-annotate", "+150+280", "CONFIDENTIAL",
      "-font", serif,
      "-pointsize", "48",
    );
    sentence.forEach((row, index) => args.push("-annotate", `+150+${380 + index * 64}`, row));
    args.push(
      "-fill", card,
      "-draw", "rectangle 150,980 520,1120",
      "-fill", ink,
      "-font", sans,
      "-pointsize", "22",
      "-annotate", "+170+1020", fact,
      "-fill", "none",
      "-stroke", stamp,
      "-strokewidth", "6",
      "-draw", "rectangle 640,900 860,980",
      "-fill", stamp,
      "-stroke", "none",
      "-font", bold,
      "-pointsize", "28",
      "-annotate", "+680+930", "FILED",
    );
  } else if (layout === "drawer") {
    args.push(
      "-stroke", ink,
      "-strokewidth", "2",
      "-draw", "rectangle 48,48 952,1452",
      "-stroke", "none",
      "-font", sans,
      "-pointsize", "16",
      "-gravity", "northwest",
      "-annotate", "+80+80", "DATE",
      "-annotate", "+820+80", "FILE",
      "-font", bold,
      "-pointsize", "54",
      "-annotate", "+80+130", "The drawer",
      "-fill", ink,
      "-draw", "rectangle 80,280 920,1320",
      "-fill", card,
      "-draw", "rectangle 160,520 840,980",
      "-fill", stamp,
      "-draw", "rectangle 160,520 840,532",
      "-fill", ink,
      "-font", serif,
      "-pointsize", "46",
    );
    sentence.forEach((row, index) => args.push("-annotate", `+190+${580 + index * 60}`, row));
    args.push("-font", sans, "-pointsize", "24", "-annotate", "+190+820", fact);
  } else if (layout === "calculator") {
    args.push("-gravity", "northwest", "-font", bold, "-pointsize", "58");
    sentence.forEach((row, index) => args.push("-annotate", `+72+${140 + index * 74}`, row));
    args.push("-font", script, "-pointsize", "72", "-fill", blue, "-annotate", "+72+400", "offload", "-fill", ink);
    args.push(
      "-fill", ink,
      "-draw", "roundrectangle 0,760 1000,1500 36,36",
      "-fill", card,
      "-draw", "rectangle 48,820 952,1000",
      "-fill", ink,
      "-font", sans,
      "-pointsize", "32",
      "-annotate", "+72+880", fact,
      "-fill", paper,
    );
    for (let i = 0; i < 8; i += 1) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = 48 + col * 230;
      const y = 1040 + row * 120;
      args.push("-draw", `rectangle ${x},${y} ${x + 200},${y + 96}`);
    }
  } else if (layout === "file") {
    args.push(
      "-fill", kraft,
      "-draw", "rectangle 120,180 900,1320",
      "-fill", ink,
      "-font", sans,
      "-pointsize", "16",
      "-gravity", "northwest",
      "-annotate", "+160+220", "THE FILE",
      "-font", bold,
      "-pointsize", "48",
    );
    sentence.forEach((row, index) => args.push("-annotate", `+160+${280 + index * 62}`, row));
    args.push(
      "-stroke", ink,
      "-strokewidth", "2",
      "-draw", "line 160,560 860,560",
      "-draw", "line 160,700 860,700",
      "-draw", "line 160,840 860,840",
      "-stroke", "none",
      "-font", sans,
      "-pointsize", "16",
      "-annotate", "+160+580", "THE LOAD",
      "-pointsize", "26",
      "-annotate", "+160+620", fact,
      "-pointsize", "16",
      "-annotate", "+160+720", "THE CARD",
      "-pointsize", "26",
      "-annotate", "+160+760", "Save the card.",
    );
  } else if (layout === "type") {
    args.push("-gravity", "northwest", "-font", bold, "-pointsize", "86");
    sentence.forEach((row, index) => args.push("-annotate", `+64+${300 + index * 100}`, row));
    args.push(
      "-fill", ink,
      "-draw", "rectangle 64,1240 360,1242",
      "-font", sans,
      "-pointsize", "20",
      "-annotate", "+400+1220", fact.toUpperCase(),
    );
  } else if (layout === "key") {
    args.push(
      "-font", sans,
      "-pointsize", "18",
      "-gravity", "north",
      "-annotate", "+0+72", "THE KEY",
      "-fill", "none",
      "-stroke", ink,
      "-strokewidth", "16",
      "-draw", "ellipse 500,250 90,90 0,360",
      "-strokewidth", "12",
      "-draw", "ellipse 500,250 36,36 0,360",
      "-fill", ink,
      "-stroke", "none",
      "-draw", "rectangle 484,330 516,640",
      "-draw", "rectangle 516,540 590,564",
      "-draw", "rectangle 516,590 570,614",
      "-fill", kraft,
      "-draw", "rectangle 150,740 850,1160",
      "-fill", "none",
      "-stroke", ink,
      "-strokewidth", "3",
      "-draw", "ellipse 210,800 16,16 0,360",
      "-fill", ink,
      "-stroke", "none",
      "-gravity", "northwest",
      "-font", serif,
      "-pointsize", "46",
    );
    sentence.forEach((row, index) => args.push("-annotate", `+190+${880 + index * 60}`, row));
    args.push("-font", sans, "-pointsize", "24", "-annotate", "+190+1060", fact);
  } else {
    args.push(
      "-fill", card,
      "-stroke", ink,
      "-strokewidth", "2",
      "-draw", "rectangle 90,120 910,1280",
      "-fill", stamp,
      "-stroke", "none",
      "-draw", "rectangle 92,122 908,150",
      "-fill", "none",
      "-stroke", ink,
      "-strokewidth", "2",
      "-draw", "ellipse 140,190 16,16 0,360",
      "-stroke", ink,
      "-strokewidth", "2",
    );
    for (let i = 0; i < 11; i += 1) args.push("-draw", `line 140,${280 + i * 72} 860,${280 + i * 72}`);
    args.push("-fill", ink, "-stroke", "none", "-gravity", "northwest", "-font", serif, "-pointsize", "48");
    sentence.forEach((row, index) => args.push("-annotate", `+160+${300 + index * 64}`, row));
    args.push("-font", sans, "-pointsize", "24", "-annotate", "+160+1120", fact);
  }

  if (layout === "type") word(args, 160);
  else if (layout !== "calculator") word(args, 48);
  args.push(out);
  return draw(args);
}
