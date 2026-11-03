# Offload desk

Two people, four niches, one paper card. Claude writes a script from the brand files and the week’s brief. Remotion renders the card on this Mac. A person posts by hand.

Nothing posts, spends, or sends without a human yes.

## People

| Person | Leads | Also stamps |
| --- | --- | --- |
| Hadiqa Ahmed | Clinical students, Analytical students | Mental health, with Laiba |
| Laiba Ahmed, Marketing and operations lead | Time, GCSE and A-level | Clinical, with Hadiqa |

Clinical and mental health need both stamps. Analytical and GCSE and A-level need the lead’s stamp. Usernames are `hadiqa` and `laiba`. The sign-in page on this Mac shows the two local passwords. They are not copied into this file. Change them before this desk is ever opened on a public address.

## The four accounts

| Account | Who it is for | The post is |
| --- | --- | --- |
| offload.clinical | Medicine, dentistry, nursing, radiology | An ad about their revision |
| offload.analytical | Maths, economics, computer science | An ad about unfinished work |
| offload.mentalhealth | Kids with ADHD and other mental health difficulties | Help managing time |
| offload.gcsealevel | GCSE and A-level students | An ad about revision |

Clinical is not clinical advice. Mental health is not treatment. Analytical does not work the question. GCSE and A-level does not invent a grade. The full lines are in `brand/safety.md` and `brand/niches/`.

## A week

Sixteen pieces. Each niche has a hook, a payoff, a still, and a carousel.

1. Research reads public titles into `web/data/research.json`. Virlo’s free keyword pass runs only when `VIRLO_API_KEY` is set.
2. The brief is generated into `brand/briefs/{niche}-{week}.md`.
3. Claude writes the script from the brand files and that brief. It does not read the raw research.
4. The lead stamps it. Clinical and mental health wait for the second stamp.
5. Remotion renders `OffloadCard` into `web/data/renders`.
6. A person posts it and pastes the live URL back onto the piece.
7. Numbers come back as a CSV, or typed on the card, at 1 hour, 24 hours, 72 hours, and 7 days.

## The picture

Layouts is the board in one place: the downloads, and nine Offload layouts (circled day, folder, drawer, calculator, file, big type, key, index card, withheld). Opening one opens the studio.

The studio edits one layer tree. A new download is taken apart on this Mac into lines and one subject. Every change autosaves the whole picture. If the other person has that picture open on this desk, they receive that whole save. Import takes an image or an `.offload.json` project. Export writes a high-quality PNG and the project file.

The design of that screen is `docs/design.md`. How the files move is `docs/architecture.md`.

## Run it

The desk, from `web/`:

```
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open `http://127.0.0.1:3000`. The server has to run on this Mac. The week, the scenes, and the live save live in files on this machine.

Regenerate templates, assets, and this week’s briefs from the repo root:

```
node scripts/generate-brand-docs.mjs
```

Remotion studio, from `remotion/`:

```
npm run dev
```

Taking a picture apart needs Apple Vision and OpenCV (`/opt/homebrew/bin/python3`). Speech needs the Kokoro model under `tools/`.

## Map

| Path | What it is |
| --- | --- |
| `brand/` | What the model may say. `templates.md`, `assets.md`, and `brand/briefs/` are generated. Do not edit those by hand. |
| `docs/design.md` | The desk, the picture, and the look. |
| `docs/architecture.md` | How a week becomes a file. |
| `docs/style-bible.md` | Paper, ink, type, motion. |
| `docs/character.md` | There is no character. |
| `web/` | The desk. Next.js. |
| `web/data/` | The week, research, scenes, and renders. Gitignored. |
| `web/public/board/` | Downloaded references. Gitignored. |
| `web/public/pins/` | The nine layout photographs. |
| `remotion/` | `OffloadCard` and `OffloadPin`. |
| `remotion/assets/` | The only pose and prop folder. It is empty. |
| `scripts/generate-brand-docs.mjs` | Rewrites the generated brand files. |
| `web/.env.local` | Secrets. Gitignored. |

## Rules for anything the model writes

Use the colour tokens. Never hardcode a hex. Never add a product claim that is not in `brand/product-facts.md`. Never name a pose or a prop that is not in `brand/assets.md`. Never put a number on a card that is not already in the week’s brief. The trial sentence in `brand/platforms.md` is unset. Do not invent one.

Say data-driven. Do not say AI-powered. No price. No link in a caption.
