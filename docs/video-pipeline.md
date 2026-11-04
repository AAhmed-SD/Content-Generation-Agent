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

## Rules

- Every product line traces to a LIVE row in `brand/product-facts.md`. Exam Focus is off in beta. No first-person exam or placement claims in Hadiqa's voice.
- GCSE and A-level: no DM call to action. The end card says Search Offload.
- A science beat names the technique and shows its source in a `Source` chip. Diagrams carry no numbers.
- Study films use `bm_george*0.6+bm_fable*0.4`, `en-gb`. The ADHD film is Hadiqa's story in the first person and uses the female blend.
- Look: dark ground, white cards, `tokens.mark` for the brand, `tokens.problem` red only for problems. The top band, above y 600, is for type.
