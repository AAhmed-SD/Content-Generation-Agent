# Video pipeline (dark kit)

The dark films are the launch videos. One film per idea, vertical, about thirty to forty seconds, with a voice, word sounds, and no music. They live in `remotion/src/world/`, apart from `OffloadCard`.

## Films

| Composition | Folder | Niche |
| --- | --- | --- |
| `Dark-clinical-list` | `clinical-list/` | offload.clinical |
| `Dark-clinical-shifts` | `clinical-shifts/` | offload.clinical |
| `Dark-analytical-mix` | `analytical-mix/` | offload.analytical |
| `Dark-gcse-mocks` | `gcse-mocks/` | offload.gcsealevel |
| `Dark-adhd-plan` | `adhd-plan/` | offload.mentalhealth |
| `Soft-launch` | `soft-launch/` | Launch film |
| `Logo-intro` | `kit/logo.tsx` | Logo sting alone |

Each folder holds `script.json` (the words), `timing.json` (word times, generated), and the composition. The rest of `world/` (past papers, placement, zine) is earlier study work.

## The kit

- `kit/dark.tsx`: the shell (camera, voice, cues), cards, week strip, timeline, screen clips, floods.
- `kit/talk.tsx`: `Type` (the voice as kinetic type above y 600), `Chart`, `Source`, `PillOrbit`.
- `kit/logo.tsx`: the end card and the logo sting.
- `kinetic.tsx`: word effects. Every word plays a sound as it lands.
- `public/sfx/`: synthesised sounds, made by `scripts/make_sfx*.py`. A wav with the same name replaces one.
- `public/rec/`: the reschedule screen recordings.

## Make a film

From `remotion/`:

1. Copy a film folder and write `script.json`. Lines are `L1` to `L6`. `L6` is always the tagline.
2. Voice it:

```
../tools/.venv/bin/python -I scripts/world_voiceover.py <id> --models ../tools/models
```

3. Write the composition. Tie every moment to a spoken word with `at("L3", "offload")`, never a fixed second, so a new take re-times the film. Register it in `src/world/WorldRoot.tsx`.
4. Preview with `npm run dev:world`.
5. Render:

```
npx remotion render src/world/index.ts Dark-<id> out/offload-<id>.mp4
```

6. Check it with a contact sheet: `ffmpeg -i out/offload-<id>.mp4 -vf "fps=1/1.5,scale=216:-1,tile=7x3" -frames:v 1 sheet.png`.

A payoff word needs time on screen. If a flood leaves before its last word has held, add `"after": 0.5` to that line in `script.json` and voice it again.

## The bank

Most launch films do not need their own code. A bank film is a folder in `remotion/src/world/bank/<id>/` with two files, and `bank/Film.tsx` draws it.

- `script.json`: the lines, as above. The last line is the tagline, and the end card lands on it.
- `spec.json`: the end card, the highlighted words, the floods, the pill, and the scenes in order. A scene arrives on its word and leaves when the next one arrives. Scene types: `week`, `doc`, `chart`, `quiz`, `clip`, `stack`, `none`.

A time names a spoken word: `"L2"` is the start of line 2, `"L2$"` its end, `"L2:friday"` that word, `"L2:the#2"` its second time, and `"L2:friday@-0.14"` shifts it. A word that is not spoken falls back to the start of the line, so check every name after voicing.

From `remotion/`:

```
npm run bank -- <id> [<id> ...]
npx remotion render src/world/index.ts Bank-<id> out/bank/offload-<id>.mp4
```

`npm run bank` voices the films and rewrites `bank/index.ts`. Do not edit that file by hand.

Endings: `"end": {"style": "corner"}` ends the film on its last line, which is the closer (a question, a punchline, a save prompt), and keeps a small offload. mark in the bottom-right as a watermark for the whole film. Without it, the film ends on the blue end card, timed to the last line as the tagline.

End cards: clinical and analytical say Free trial and Link in bio. GCSE and A-level and the time account say Want to try it? and Search Offload, because some viewers are under 16.

## Formats and variety

The scene template gives every film the same skeleton, so a feed of only those repeats. Three format templates, in `remotion/src/world/formats/kit.tsx`, each fix their own structure, look and pace. A format film lives in the bank like any other: `src/world/bank/<id>/script.json` for the words and `spec.json` with `"format"` and its text. The words are new for each film; only the shape is fixed.

| `format` | Shape | Spec fields | Voice | Ending |
| --- | --- | --- | --- | --- |
| `myth-fact` | Light paper, split screen. A myth slides down and is stamped; its fact slides up in blue. Then a handwritten sheet, then a loop back to the first myth as a question. | `rounds` (myth, fact, `mythAt`, `factAt`), `reveal` (`at`, head, title, rows with an optional `gap` time), `loop` (`at`, myth, fact) | Any; the example uses `bf_emma*0.6+bf_isabella*0.4` | Loops back to the hook |
| `three-things` | A title card, then one hard cut per tip: a giant numeral and a colour (ink, blue, kraft). Then the product as one prompt card. | `title` (big, sub, accent), `tips` (`at`, head, optional `bg`), `reveal` (`at`, head, accent, tail, kicker, text), optional `punch` (line, spoken words) | Any; the example uses `bm_daniel` at 1.1 | Punchline in red, corner mark |
| `pov` | Text on a phone, no voice: a list fills, messages arrive, a cut to the app's Today screen. | `duration`, `title`, `list` (title, items with `at` in seconds), `messages` (`at`, text, `from`: them, me or aside), `cut` (`at`, title), `app` (`at`, heading, next, later, note) | None: no script.json. Add a trending sound when posting. | The app screen, corner mark |

Examples: `bank/gcse-myth-fact`, `bank/analytical-three-things`, `bank/time-pov`. Voice and render them like any bank film. A photo-story format was tried and dropped: the photo plates work as stills and carousel covers, not as a slideshow.

Rules for a week of films, per account:

- No format twice in a row. The quiz or poll bank film at most twice a week.
- One product feature per film, from the LIVE list in `brand/product-facts.md`, and not the same feature twice in a week. Rotate through blurting, Feynman prompts, mind-map gap-fill, weekly append, the dashboard, weekly reports, Google Calendar, settings and search, as well as rescheduling and spaced repetition.
- Rotate voices: two or three per account, some films with none.
- Rotate endings: the blue end card, a loop to the hook, a punchline with the corner mark, the app screen, a silent tagline. The spoken tagline is rare.
- A real face on camera, founder or student, once a week if possible. Nothing here can make that.

## Posts (stills)

A post is a JSON file in `remotion/src/world/posters/posts/<id>.json`: `{ "template": "...", "props": { ... } }`. In any text, `\n` breaks the line. From `remotion/`, `npm run stills` renders every post to `out/posts/offload-<id>.png` at 1080 × 1350. `npm run stills -- <id>` renders one.

Two templates:

- `PhotoPoster`: a real photo of an object, its words painted out, new words set in the same places. `plate` is one of `calculator`, `calendar`, `drawer-a`, `drawer-b`, `envelope`, `folder-polaroid`, `folder-red`. Each plate takes its own fields; see `PhotoProps` in `posters/PhotoPosters.tsx`.
- `Poster`: the same board layouts drawn in code, for when a photo would not fit. `layout` is one of `type`, `calculator`, `circled`, `envelope`, `folder`, `drawer`, `grid`, `calendar`, `keycaps`, `condensed`; see `PosterProps` in `posters/Posters.tsx`.

A carousel is a JSON file in `remotion/src/world/posters/carousels/<id>.json`: `{ "handle": "offload.clinical", "slides": [ ... ] }`. `npm run stills` renders it to `out/carousels/<id>/01.png`, `02.png`, and so on. Slide kinds, in `posters/Carousel.tsx`:

- `photo` or `poster`: a cover, with the same props as a post.
- `point`: a kicker, a headline, a line of body, and an optional red stamp or handwritten note.
- `list`: a headline and a white card of ticked (or crossed) rows. Use it for what Offload does, in the product facts' words.
- `card`: a Test card, `side` `front` or `back`. Put the front and the back on two slides so the swipe is the reveal.
- `science`: a technique, a line, a source chip, and a drawn chart (`spacing` or `testing`). No numbers on the chart.
- `end`: the blue end card. Clinical and analytical: Free trial, Link in bio. GCSE and A-level and the time account: Want to try it?, Search Offload.

Every slide after the cover shows the handle and the page; every slide but the last shows a swipe arrow.

The plates in `remotion/public/plates/` come from Offload's own board photos in `web/public/board` (the `offload-*` and `pin-*` files). Other brands' downloads on the board are references for the look only; their photos are never used as plates.

To make a plate from a new photo of ours:

```
/opt/homebrew/bin/python3 scripts/clean-plate.py <photo> public/plates/<name>.png "<start of a line>" ...
```

Each quoted string erases every line of type that starts with it, found by `web/scripts/vision-ocr.swift`. `--box=x,y,w,h` erases a box the OCR missed. `--soften=y0:y1` smooths a plain backdrop after. The fill only works on flat surfaces: paper, card, kraft, an LCD, a painted folder. Keep words that cross two objects, or choose another photo.

## Rules

- Every product line traces to a LIVE row in `brand/product-facts.md`. Exam Focus is off in beta. No first-person exam or placement claims in Hadiqa's voice.
- GCSE and A-level: no DM call to action. The end card says Search Offload.
- A science beat names the technique and shows its source in a `Source` chip. Diagrams carry no numbers.
- Study films use `bm_george*0.6+bm_fable*0.4`, `en-gb`. The ADHD film is Hadiqa's story in the first person and uses the female blend.
- Look: dark ground, white cards, `tokens.mark` for the brand, `tokens.problem` red only for problems. The top band, above y 600, is for type.
