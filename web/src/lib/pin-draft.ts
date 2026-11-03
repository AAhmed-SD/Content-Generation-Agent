import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { niches, type NicheId } from "@/lib/desk";
import { isPinLayout, pinLayouts, type PinLayoutId } from "@/lib/pin-picture";
import { WEEK } from "@/lib/pipeline";

export type PinDraft = {
  id: string;
  layout: PinLayoutId;
  line: string;
  note: string;
  niche: NicheId;
  reference: string;
  savedAt: string;
};

const codes: Record<NicheId, string> = {
  clinical: "CLN",
  analytical: "ANL",
  mentalhealth: "MH",
  gcsealevel: "GCS",
};

export function pinDir() {
  return path.join(process.cwd(), "data", "renders", "pins");
}

export function pinJpg(id: string) {
  return path.join(pinDir(), `${id}.jpg`);
}

export function isPinId(id: string) {
  return /^pin-\d+$/.test(id);
}

export function isNicheId(value: string): value is NicheId {
  return niches.some((niche) => niche.id === value);
}

export function readPin(id: string): PinDraft | null {
  if (!isPinId(id)) return null;
  const file = path.join(pinDir(), `${id}.json`);
  if (!existsSync(file)) return null;
  try {
    const draft = JSON.parse(readFileSync(file, "utf8")) as PinDraft;
    if (!isPinLayout(draft.layout) || !isNicheId(draft.niche) || !draft.line) return null;
    return { ...draft, id, note: draft.note ?? "" };
  } catch {
    return null;
  }
}

export function writePin(draft: PinDraft) {
  mkdirSync(pinDir(), { recursive: true });
  writeFileSync(path.join(pinDir(), `${draft.id}.json`), JSON.stringify(draft, null, 2));
}

export function findPinByReference(reference: string) {
  try {
    return (
      readdirSync(pinDir())
        .filter((name) => name.endsWith(".json"))
        .map((name) => readPin(name.replace(/\.json$/, "")))
        .find((draft) => draft?.reference === reference) ?? null
    );
  } catch {
    return null;
  }
}

export function listPins() {
  try {
    return readdirSync(pinDir())
      .filter((name) => name.endsWith(".json"))
      .map((name) => readPin(name.replace(/\.json$/, "")))
      .filter((draft): draft is PinDraft => Boolean(draft))
      .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
      .slice(0, 12);
  } catch {
    return [];
  }
}

export function pinCaptions(draft: Pick<PinDraft, "line" | "note" | "niche">) {
  const meta = niches.find((item) => item.id === draft.niche)!;
  const week = WEEK.split("-")[1] ?? "W45";
  return {
    tiktok: `${draft.line} ${draft.note}`.trim().slice(0, 220),
    instagram: `${draft.line}\n${draft.note}\n#offload`,
    youtube: `${meta.label}: ${draft.line} ${draft.note}`.trim().slice(0, 200),
    facebook: `${draft.line} ${draft.note} Filed under ${meta.name}.`.trim(),
    firstComment: `Filed this week. Code ${codes[draft.niche]}-${week}.`,
    account: meta.name,
  };
}

export function pinPackText(draft: PinDraft) {
  const captions = pinCaptions(draft);
  const layout = pinLayouts.find((item) => item.id === draft.layout)?.name ?? draft.layout;
  return [
    `post id: ${draft.id}`,
    `account: ${captions.account}`,
    `layout: ${layout}`,
    "file: pin.jpg",
    `sentence: ${draft.line}`,
    `note: ${draft.note}`,
    "",
    "tiktok",
    captions.tiktok,
    "",
    "instagram",
    captions.instagram,
    "",
    "youtube",
    captions.youtube,
    "",
    "facebook",
    captions.facebook,
    "",
    "first comment",
    captions.firstComment,
    "",
    "Post the picture by hand. Paste the caption for that app.",
  ].join("\n");
}

function crc32(data: Buffer) {
  let crc = ~0;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

export function zipStore(files: { name: string; data: Buffer }[]) {
  const parts: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(file.name);
    const crc = crc32(file.data);
    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(20, 6);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(file.data.length, 18);
    local.writeUInt32LE(file.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    name.copy(local, 30);
    parts.push(local, file.data);
    const head = Buffer.alloc(46 + name.length);
    head.writeUInt32LE(0x02014b50, 0);
    head.writeUInt16LE(20, 4);
    head.writeUInt16LE(20, 6);
    head.writeUInt32LE(crc, 16);
    head.writeUInt32LE(file.data.length, 20);
    head.writeUInt32LE(file.data.length, 24);
    head.writeUInt16LE(name.length, 28);
    head.writeUInt32LE(offset, 42);
    name.copy(head, 46);
    central.push(head);
    offset += local.length + file.data.length;
  }
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, directory, end]);
}
