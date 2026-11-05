# Architecture

One week is sixteen pieces. Four niches, and each niche has a hook, a payoff, a still, and a carousel. The desk stores them in `web/data/desk.json`. There is no database and no queue table.

## Weekly job

Monday runs three steps in `web/src/lib/pipeline.ts`.

1. Research reads public titles. Reddit, then the web. YouTube runs only when `YOUTUBE_API_KEY` is set. Virlo’s free keyword pass runs only when `VIRLO_API_KEY` is set. The paid research agent is not created.
2. The brief keeps the niche safety lines and the themes. `writeWeeklyBriefs` writes `brand/briefs/{niche}-{week}.md` from that file: phrases that pass the card filter, themes to avoid, source status, and winners only when a piece has views stored.
3. Drafts may replace an unstamped note with one sentence. If the local model is absent, or the sentence fails the filter, the locked line stays. Stamped pieces are left alone.

Claude writes the script afterwards, from the brand files and that brief. The reply is saved on the piece as `script`.

## Signals

`web/scripts/signals.py` reads every account in `web/research/watchlist.json` with yt-dlp, from public pages without a login. An account's usual is the median views of its latest thirty videos. A video at three times its usual or more is an outlier. The first eight seconds of each new outlier are transcribed with faster-whisper, so the stream holds the spoken hook. Outliers and one summary per run are appended to `web/data/signals.jsonl`, and a video is streamed once.

The desk shows the stream at `/desk/signals`. It checks for new lines every twenty seconds, and Collect now starts a run. The weekly brief carries the strongest openings for each niche from the last seven days under Openings that worked elsewhere, with no numbers and no account names. The writer learns the shape and never copies the words.

The watch list is TikTok first, because that is where the audience is. The collector reads public profile pages plainly: no login, no browser disguise, nothing that gets round a bot check. It does not read hashtag pages, because that needs a disguised browser. TikTok does not allow automated collection, so keep the list short and read it a few times a day at most. To follow what is viral beyond the list, add the accounts that show up on your own For You page, and check each one reads before relying on it. A `youtube` account still works.

## How a spec becomes a picture

The piece carries `line`, `note`, `script.onScreen`, `script.narration`, and `script.beats`. Those words come from the brand files and the week’s brief. Render writes `web/data/renders/{id}.props.json` and starts `remotion/render-job.mjs`. A still is `OffloadPin`, one frame, in that account’s layout: clinical is the folder, analytical is the calculator, mental health is the circled day, GCSE and A-level is the file. A video is `OffloadCard`, 180 frames. A carousel is `OffloadCard`, 270 frames. The file lands in `web/data/renders`.

One card renders at a time. When that process finishes, it starts the next card that already has a Claude script and is still idle. A render that stays on rendering for twenty minutes is marked failed, and the queue moves on. Status sits on `piece.render`: idle, rendering, ready, or failed.

## Approval and the pack

Hadiqa leads clinical and analytical. Laiba leads mental health and GCSE and A-level. Clinical and mental health need a second stamp. The pack route opens when the stamps are complete. Publishing is manual. The live URL is pasted back onto the piece.

## The loop

Today, numbers arrive as a CSV, or typed on the card, into `web/data/loop.json` and the piece’s checkpoints: 1 hour, 24 hours, 72 hours, 7 days. The next brief can name a winner only from those stored numbers. An empty checkpoint is not a zero.

### The loop from launch (decided 2026-11-05, partly built)

Each turn of the loop is the same five steps. The first turn starts from the outside world only. From the second turn on, our own post numbers feed the top as well.

| Step | What happens | Who or what | Built? |
| --- | --- | --- | --- |
| 1. Inputs | For videos: what is going viral in each niche (Virlo) and outlier videos on our watch list (Signals). For carousels: what students are searching for (Research). From turn two: how our own posts did, per platform and per opener. | Virlo, `signals.py`, `pipeline.ts`, the Numbers page | Signals and Research yes. Virlo is deferred: launch runs on the free Signals collector (14 UK accounts). Add Virlo after a few weeks of our own numbers, with a balance cap; confirm its API pricing first (the pricing page lists the API under Enterprise). |
| 2. Build | The hook (two openers, A and B), the script, and the video idea: format, hook style, scenes. Picked from `docs/library.md` and written to the brand files and the week's brief. | Claude | Yes, per film. Not yet a daily batch. |
| 3. Approve | A person watches the render and approves it or rejects it on the desk. Nothing posts without a stamp. | Hadiqa, Laiba | Yes |
| 4. Post | Approved films are scheduled to the 19 accounts. | Blotato Creator | Not connected yet. Until then, post by hand. |
| 5. Data back | Views, watch time, shares and follows per post, per platform, per opener, saved to `web/data/loop.json`. They become step 1 of the next turn. | Platform analytics, then the Numbers page | CSV import yes. Automatic pull not yet. Confirm what Blotato's analytics return before relying on them; the platforms' own analytics are the fallback. |

What each input is for (the Research page shows them in two halves, with a divider):
- **Research (web)** feeds carousels. It is the guides and questions students are already searching for. Carousels are free, data-backed and useful without Offload (`brand/posts/carousel.md`).
- **Virlo** shows what is moving across a whole niche on TikTok.
- **Signals** watches a short list of named accounts. It is free, and it is the check on Virlo.
- **Our own numbers** say which hook styles and formats work for us. They outrank the other three once there are a few weeks of them.

The writer never sees raw research or account names. It reads the brief, which carries shapes and themes only.

## Outreach (decided 2026-11-05)

The outreach officer spends part of each day engaging from our 19 accounts: replying to comments on our posts, then commenting on and following accounts in the niche. Half the accounts one day, the other half the next, alternating. The rota is in `docs/outreach-rota.md`.

## The picture

Layouts open in `web/src/components/studio.tsx`. The document is one scene: an artboard and a layer list, bottom to top. The type is `Scene` in `web/src/lib/scene.ts`. A save writes the whole scene to `web/data/renders/edits/{stem}.scene.json`, wrapped with a revision, the person, and the time. Pasted pictures sit beside it in `{stem}-assets/`.

A download with one layer is taken apart on this Mac. `web/scripts/vision-ocr.swift` reads the lines. `web/scripts/lift-picture.py` cuts the letters and one subject. Scenes that already have more than one layer are left as they are until someone chooses Take it apart again.

Autosave posts that whole scene. `web/src/lib/live-desk.ts` keeps the latest scene in this Next process and streams it to anyone who has the same picture open. The last whole save is the one that stays. Selection stays on each screen. The stream is this process only. A second computer that is not signed into this desk does not receive it.

Import accepts a full image or an `.offload.json` project. Export writes a PNG at twice the artboard size, capped so a side stays within 4096 pixels, and the project file beside it.

## Speech

When the Kokoro model is present under `tools/`, the desk can write a wav next to the render. The narration on the card stays text. The mp4 does not mix that wav in by itself.

## Launch volume (planned, not built)

Decided on 2026-11-04. Nothing in this section runs yet.

Each niche posts two videos a day to TikTok, Instagram, Facebook, and YouTube Shorts, and two carousels a day to TikTok, Instagram, and Facebook. Three LinkedIn accounts post twice a day each: the founder, the outreach officer, and the Offload brand.

A video is written once and cross-posted. It is not written four times. That is eight video scripts a day across the four niches. The time saved goes into hooks, not into more files.

- **One master, two openers.** Each video script carries a body and two hook openers, A and B. The body is the same in both renders. Only the first seconds change.
- **The split.** On odd days A goes to TikTok and Shorts, and B goes to Instagram and Facebook. On even days the pairs swap.
- **The master is clean.** No platform watermark is ever burned in. Each platform gets an export from the master, not a download from another platform.
- **The packaging differs.** Caption, title, cover frame, safe area, and posting time are set per platform. `brand/platforms.md` holds those rules.
- **Sound is not automated.** Business accounts may only use commercially licensed music. A trending sound is added by hand or not at all.

The loop stores numbers per platform and per opener, not per piece. A hook style wins only from comparisons on the same platform over time. One day's A against B across two platforms is a sample, not a verdict.

To run without a person, the desk still needs: a publishing connection to each platform, analytics pulled from each platform, renders that run in parallel, LinkedIn voice files for the three accounts, and a decision on whether stamps move from each piece to a template or a batch.

## Hosting (planned, not built)

Decided on 2026-11-04: everything runs on one server. No part of the week depends on this Mac being on.

The server is one Linux machine with a persistent disk, about 8 vCPU and 16 GB, behind HTTPS. One container image holds Node, headless Chrome for Remotion, ffmpeg, and Python with the Kokoro and faster-whisper models. Two processes run from it: the Next desk, and a worker that renders, voices, and runs the Monday job on a timer.

What moves, and what replaces it:

| Today | On the server |
| --- | --- |
| `web/data/*.json` on this Mac | The same files on the server disk at first, backed up nightly. Later, Postgres. |
| Renders in `web/data/renders` | The server disk, served at a signed URL. Instagram and Facebook publishing need a public video URL. |
| One render at a time | The worker runs two or three at once. |
| `vision-ocr.swift` (macOS Vision) | Tesseract or Claude vision. This is the only part that cannot run on Linux. |
| Kokoro voice, faster-whisper timing | No change. Both run on CPU on Linux. The 585 MB model folder is copied in once. |
| Ollama drafts | Claude Haiku, or the locked line. A local model is not worth the RAM. |
| `web/.env.local` | The host's secrets: `ANTHROPIC_API_KEY`, `AUTH_SECRET`, and the research keys. |

Sign-in stays the same: two people, scrypt passwords, a sealed cookie.

Order: 1. Container and server with files on disk, live behind HTTPS. 2. Replace OCR and Ollama. 3. Worker with parallel renders and the Monday timer. 4. Platform publishing and analytics. 5. Postgres, when the volume of files makes it worth it.

## What is not built

No Postgres. No hosted desk. No pose library. YouTube Analytics and a Meta app are not connected. Nothing posts, spends, or sends on its own. The trial sentence in `brand/platforms.md` is still unset.

## Claude API cost (decided 2026-11-05)

All desk calls go through `web/src/lib/claude-stream.ts`.

- **Two models.** Opus 5.5 (`heavy`) for proposals and scripts, where quality decides the output. Sonnet 5.5 (`light`, half the price) for proposal chat and LinkedIn. Override with `ANTHROPIC_MODEL_HEAVY` and `ANTHROPIC_MODEL_LIGHT`.
- **Prompt caching.** The brand rules, all four account files and the format list (`stableContext()` in `web/src/lib/proposals.ts`) are sent as one cached system block. That block must stay byte-identical between calls, so never put dates, names or week-specific data in it. Signals, research, ideas, rejections and the proposal itself go in the message, after the cache. Chat uses the 1-hour cache and proposal batches the 5-minute one.
  - Measured on 2026-11-05: the first chat call cost $0.090, which includes writing about 18,000 tokens to the cache. The next call cost $0.019.
- **Structured outputs.** Every call that returns data uses `output_config.format` (`claudeJson`), never free-text JSON. Opus 5.5 and Sonnet 5.5 refuse forced `tool_choice`.
- **Spend is logged.** Each call's tokens and cost go to `marketing.runs` (kind `claude`), and the Numbers page shows them by task. At launch volume, expect about $35–45 a month.

## The content agent (built 2026-11-05)

Accepting a proposal on **Hooks** queues a `make-film` job in `marketing.jobs` and starts the Mac worker (`web/scripts/worker.mjs`). The worker runs one job at a time and stops itself after 10 idle minutes; `--forever` keeps it running for launchd. It writes a log to `web/data/worker.log`.

`web/scripts/agent.mjs` makes the film:

1. **Write it.** Opus, with the brand files cached, writes `script.json` and `spec.json`. It copies the newest bank film in the same format and follows that format's TypeScript type from the kit files.
2. **Check it.** The spec must match the example's shape. Every time ref must land on a spoken word. Line ids must run L1, L2, and so on. No retired theme. No number that isn't in the proposal. On a failed check, Claude gets the errors back, with up to two retries.
3. **Make it.** Write `remotion/src/world/bank/<id>/`, voice it with `remotion/scripts/bank.mjs` (bm_george), render to `remotion/out/bank/offload-<id>.mp4`, and set the content row to `rendered`.

The film then shows under **Films** on the Approval page (`/desk`), with a player and its lines. **Approve** adds a stamp (clinical and time need both people). **Send back** takes a note and the agent remakes the film. Accepting a proposal is not a stamp; each new cut starts with no stamps.

Measured on 2026-11-05: about 4 minutes from Accept to a rendered 40-second film.
