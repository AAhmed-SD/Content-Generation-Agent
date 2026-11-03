const notes: Record<string, { name: string; account: string; rule: string }> = {
  "pin-folder.jpg": {
    name: "Confidential folder",
    account: "Clinical",
    rule: "A kraft envelope on a pale ground, with graph paper behind it. CONFIDENTIAL, then one sentence. The second line is handwriting on a torn note. The mark is a rubber stamp.",
  },
  "pin-calculator.jpg": {
    name: "The calculator",
    account: "Analytical",
    rule: "Huge black type on white, then the word offload in blue script. A real calculator fills the lower half. The note sits in the LCD, in the screen’s own type.",
  },
  "pin-calendar.jpg": {
    name: "Circled day",
    account: "Time",
    rule: "Warm paper. The sentence is blue handwriting. A blue circle marks one day on a faint calendar. The word offload sits small, in blue, at the bottom.",
  },
  "pin-file.jpg": {
    name: "The file",
    account: "GCSE and A-level",
    rule: "A red file on warm paper. The sentence is white and large. A blank cream card is clipped to the front. Three labeled rows sit at the bottom.",
  },
  "pin-drawer.jpg": {
    name: "The drawer",
    account: "Any account",
    rule: "A filing drawer, with one index card pulled forward. The headline is above the drawer. The sentence is on the card. The note is under a short rule.",
  },
  "pin-type.jpg": {
    name: "Big type",
    account: "Any account",
    rule: "The sentence is set enormous, in black, on an almost white ground. The word offload is blue script and cuts through the type. One small line sits at the bottom.",
  },
};

export function downloadNote(file: string) {
  return notes[file] ?? null;
}
