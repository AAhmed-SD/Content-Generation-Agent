# Data loop

The loop closes on Monday. Until the platform accounts are open, the numbers travel in a CSV. YouTube, Meta, and TikTok exports can wait. The columns stay the same either way, so the charts do not have to be rebuilt when an API arrives.

## When

Check each live post at 1 hour, 24 hours, 72 hours, and 7 days. Views, completion, shares, comments, saves. One row per piece, per channel, per check.

## CSV

Columns, in this order:

week, piece_id, channel, checkpoint, views, completion, shares, comments, saves, live_url

- week is 2026-W45 until the week changes.
- piece_id matches the desk, for example clinical-hook.
- channel is tiktok, instagram, youtube, facebook, or all when the apps are not split yet.
- checkpoint is 1h, 24h, 72h, or 7d.
- completion may end with %.
- live_url is the post you already published.

The desk downloads a blank file with every piece and every checkpoint. Fill the cells you have. Leave the rest blank. Upload it on the Loop page. The next upload is kept beside the previous one, and the page shows what moved.

## What the Monday note is for

One sentence. What repeated, what went quiet, what the next card should keep. That sentence is the improvement, written where the next brief can see it.
