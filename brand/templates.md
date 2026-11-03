<!-- Generated from code. Do not edit by hand. Run node scripts/generate-brand-docs.mjs -->
# Templates

Pick a template only from this file. The list is the Remotion schema. A template that is not here cannot be rendered.

## OffloadCard

The vertical card for TikTok, Reels, Shorts, and the feed.

### Slots
- `line`. One sentence on screen. This is the only headline.
- `note`. The fact under the word offload. A still shows it immediately.
- `niche`. Account name, printed at the top of the card. One of: offload.clinical, offload.analytical, offload.mentalhealth, offload.gcsealevel.
- `narration`. Spoken line on a video. A still prints this when it is filled.
- `beats`. Carousel only. Up to three beats. Each beat is under twelve words. There is no fourth beat.
- `format`. Which timing the composition uses. One of: video, still, carousel.

### When to pick it
- video: Hook or payoff. 180 frames, six seconds. The note fades in after the line.
- still: One card. 1 frame. The note is already visible.
- carousel: 270 frames, nine seconds. The headline steps through beats. The note stays.

## OffloadPin

A Pinterest pin. Same paper system as the references, with Offload’s sentence in place of theirs.

### Slots
- `line`. The sentence. One line.
- `note`. The short fact. On the calendar it sits inside the circle.
- `niche`. Account name, small, at the edge. One of: offload.clinical, offload.analytical, offload.mentalhealth, offload.gcsealevel.
- `layout`. Which pin layout. The list is closed. One of: calendar, folder, drawer, calculator, file, type, key, card, withheld.
- `stamp`. The red stamp. Short. Use FILED when no other word is set.

### When to pick it
- calendar: A circled day. Mental health. Blue is only the word offload.
- folder: A kraft confidential folder and a red stamp. Clinical students.
- drawer: A drawer with one card pulled forward.
- calculator: A sentence, then a calculator. The screen shows the note. Analytical students.
- file: A stacked file with three rows. GCSE and A-level.
- type: The sentence large, and the word offload in script across it.
- key: One key and a kraft tag. The sentence is on the tag. Any account.
- card: One index card. The sentence on the first line. Any account.
- withheld: A black ground. The sentence, then stop. The fact stays off this one.
