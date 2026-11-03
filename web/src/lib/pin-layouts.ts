export const pinLayouts = [
  { id: "calendar", name: "Circled day" },
  { id: "folder", name: "Confidential folder" },
  { id: "drawer", name: "The drawer" },
  { id: "calculator", name: "The calculator" },
  { id: "file", name: "The file" },
  { id: "type", name: "Big type" },
  { id: "key", name: "The key" },
  { id: "card", name: "The index card" },
  { id: "withheld", name: "Withheld" },
] as const;

export type PinLayoutId = (typeof pinLayouts)[number]["id"];

export function isPinLayout(value: string): value is PinLayoutId {
  return pinLayouts.some((layout) => layout.id === value);
}

const homeLayout: Record<string, PinLayoutId> = {
  clinical: "folder",
  analytical: "calculator",
  mentalhealth: "calendar",
  gcsealevel: "file",
};

export function layoutFor(niche: string) {
  const id = homeLayout[niche] ?? "card";
  return pinLayouts.find((layout) => layout.id === id) ?? pinLayouts[7];
}
