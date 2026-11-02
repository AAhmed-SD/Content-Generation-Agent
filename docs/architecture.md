# Architecture

One week is sixteen pieces. Four niches, and each niche has a hook, a payoff, a still, and a carousel. The desk stores them in `web/data/desk.json`. There is no database and no queue table.

## Weekly job

Monday runs three steps in `web/src/lib/pipeline.ts`.

1. Research reads public titles. Reddit, then the web. YouTube runs only when `YOUTUBE_API_KEY` is set. Virlo’s free keyword pass runs only when `VIRLO_API_KEY` is set. The paid research agent is not created.
2. The brief keeps the niche safety lines and the themes. `writeWeeklyBriefs` writes `brand/briefs/{niche}-{week}.md` from that file: phrases that pass the card filter, themes to avoid, source status, and winners only when a piece has views stored.
3. Drafts may replace an unstamped note with one sentence. If the local model is absent, or the sentence fails the filter, the locked line stays. Stamped pieces are left alone.

Claude writes the script afterwards, from the brand files and that brief. The reply is saved on the piece as `script`.

## How a spec becomes a picture

The piece carries `line`, `note`, `script.onScreen`, `script.narration`, and `script.beats`. Render writes `web/data/renders/{id}.props.json` with the OffloadCard slots and starts `remotion/render-job.mjs`. The composition id is `OffloadCard`. A still is one frame. A video is 180 frames. A carousel is 270. The file lands in `web/data/renders`.

There is no render queue beyond that one process. Status sits on `piece.render`: idle, rendering, ready, or failed.

## Approval and the pack

Hadiqa leads clinical and analytical. Laiba leads mental health and GCSE and A-level. Clinical and mental health need a second stamp. The pack route opens when the stamps are complete. Publishing is manual. The live URL is pasted back onto the piece.

## The loop

Numbers arrive as a CSV, or typed on the card, into `web/data/loop.json` and the piece’s checkpoints: 1 hour, 24 hours, 72 hours, 7 days. The next brief can name a winner only from those stored numbers. An empty checkpoint is not a zero.

## What is not built

No Postgres tables. No pose library. No spoken audio. The narration is text on the card. YouTube Analytics and a Meta app are not connected.
