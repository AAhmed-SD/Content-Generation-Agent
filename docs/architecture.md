# Architecture

One week is sixteen pieces. Four niches, and each niche has a hook, a payoff, a still, and a carousel. The desk stores them in `web/data/desk.json`. There is no database and no queue table.

## Weekly job

Monday runs three steps in `web/src/lib/pipeline.ts`.

1. Research reads public titles. Reddit, then the web. YouTube runs only when `YOUTUBE_API_KEY` is set. Virlo’s free keyword pass runs only when `VIRLO_API_KEY` is set. The paid research agent is not created.
2. The brief keeps the niche safety lines and the themes. `writeWeeklyBriefs` writes `brand/briefs/{niche}-{week}.md` from that file: phrases that pass the card filter, themes to avoid, source status, and winners only when a piece has views stored.
3. Drafts may replace an unstamped note with one sentence. If the local model is absent, or the sentence fails the filter, the locked line stays. Stamped pieces are left alone.

Claude writes the script afterwards, from the brand files and that brief. The reply is saved on the piece as `script`.

## How a spec becomes a picture

The piece carries `line`, `note`, `script.onScreen`, `script.narration`, and `script.beats`. Those words come from the brand files and the week’s brief. Render writes `web/data/renders/{id}.props.json` and starts `remotion/render-job.mjs`. A still is `OffloadPin`, one frame, in that account’s layout: clinical is the folder, analytical is the calculator, mental health is the circled day, GCSE and A-level is the file. A video is `OffloadCard`, 180 frames. A carousel is `OffloadCard`, 270 frames. The file lands in `web/data/renders`.

One card renders at a time. When that process finishes, it starts the next card that already has a Claude script and is still idle. A render that stays on rendering for twenty minutes is marked failed, and the queue moves on. Status sits on `piece.render`: idle, rendering, ready, or failed.

## Approval and the pack

Hadiqa leads clinical and analytical. Laiba leads mental health and GCSE and A-level. Clinical and mental health need a second stamp. The pack route opens when the stamps are complete. Publishing is manual. The live URL is pasted back onto the piece.

## The loop

Numbers arrive as a CSV, or typed on the card, into `web/data/loop.json` and the piece’s checkpoints: 1 hour, 24 hours, 72 hours, 7 days. The next brief can name a winner only from those stored numbers. An empty checkpoint is not a zero.

## The picture

Layouts open in `web/src/components/studio.tsx`. The document is one scene: an artboard and a layer list, bottom to top. The type is `Scene` in `web/src/lib/scene.ts`. A save writes the whole scene to `web/data/renders/edits/{stem}.scene.json`, wrapped with a revision, the person, and the time. Pasted pictures sit beside it in `{stem}-assets/`.

A download with one layer is taken apart on this Mac. `web/scripts/vision-ocr.swift` reads the lines. `web/scripts/lift-picture.py` cuts the letters and one subject. Scenes that already have more than one layer are left as they are until someone chooses Take it apart again.

Autosave posts that whole scene. `web/src/lib/live-desk.ts` keeps the latest scene in this Next process and streams it to anyone who has the same picture open. The last whole save is the one that stays. Selection stays on each screen. The stream is this process only. A second computer that is not signed into this desk does not receive it.

Import accepts a full image or an `.offload.json` project. Export writes a PNG at twice the artboard size, capped so a side stays within 4096 pixels, and the project file beside it.

## Speech

When the Kokoro model is present under `tools/`, the desk can write a wav next to the render. The narration on the card stays text. The mp4 does not mix that wav in by itself.

## What is not built

No Postgres. No hosted desk. No pose library. YouTube Analytics and a Meta app are not connected. Nothing posts, spends, or sends on its own. The trial sentence in `brand/platforms.md` is still unset.
