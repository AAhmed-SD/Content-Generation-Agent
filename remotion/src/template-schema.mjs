import { z } from "zod";

const account = z.enum([
  "offload.clinical",
  "offload.analytical",
  "offload.mentalhealth",
  "offload.gcsealevel",
]);

export const offloadCardSchema = z
  .object({
    line: z.string().describe("One sentence on screen. This is the only headline."),
    note: z.string().describe("The fact under the word offload. A still shows it immediately."),
    niche: account.describe("Account name, printed at the top of the card."),
    narration: z.string().describe("Spoken line on a video. A still prints this when it is filled."),
    beats: z
      .array(z.string())
      .describe("Carousel only. Up to three beats. Each beat is under twelve words. There is no fourth beat."),
    format: z.enum(["video", "still", "carousel"]).describe("Which timing the composition uses."),
  })
  .describe("Composition id OffloadCard. 720 by 1280. 30 fps.");

export const offloadPinSchema = z
  .object({
    line: z.string().describe("The sentence. One line."),
    note: z.string().describe("The short fact. On the calendar it sits inside the circle."),
    niche: account.describe("Account name, small, at the edge."),
    layout: z
      .enum(["calendar", "folder", "drawer", "calculator", "file", "type", "key", "card", "withheld"])
      .describe("Which pin layout. The list is closed."),
    stamp: z.string().describe("The red stamp. Short. Use FILED when no other word is set."),
  })
  .describe("Composition id OffloadPin. 1000 by 1500. One frame. A Pinterest pin.");

export const templates = [
  {
    id: "OffloadCard",
    schema: offloadCardSchema,
    for: "The vertical card for TikTok, Reels, Shorts, and the feed.",
    slots: ["line", "note", "niche", "narration", "beats", "format"],
    when: [
      ["video", "Hook or payoff. 180 frames, six seconds. The note fades in after the line."],
      ["still", "One card. 1 frame. The note is already visible."],
      ["carousel", "270 frames, nine seconds. The headline steps through beats. The note stays."],
    ],
  },
  {
    id: "OffloadPin",
    schema: offloadPinSchema,
    for: "A Pinterest pin. Same paper system as the references, with Offload’s sentence in place of theirs.",
    slots: ["line", "note", "niche", "layout", "stamp"],
    when: [
      ["calendar", "A circled day. Mental health. Blue is only the word offload."],
      ["folder", "A kraft confidential folder and a red stamp. Clinical students."],
      ["drawer", "A drawer with one card pulled forward."],
      ["calculator", "A sentence, then a calculator. The screen shows the note. Analytical students."],
      ["file", "A stacked file with three rows. GCSE and A-level."],
      ["type", "The sentence large, and the word offload in script across it."],
      ["key", "One key and a kraft tag. The sentence is on the tag. Any account."],
      ["card", "One index card. The sentence on the first line. Any account."],
      ["withheld", "A black ground. The sentence, then stop. The fact stays off this one."],
    ],
  },
];
