#!/bin/sh
# Refresh the desk's Make section: inspiration feeds, TikTok signals (UK content and motion), the template
# library, (weekly) three new ideas, and (daily) one new film template. Results are copied into Supabase (scripts/sync-to-db.mjs). Run by hand, or every six hours by scripts/launchd/education.offload.desk-refresh.plist.
# TikTok is read a few times a day at most, plainly, with no login and nothing that gets round a bot check.
cd "$(dirname "$0")/.." || exit 1
LOG=web/data/refresh.log
echo "--- $(date '+%Y-%m-%d %H:%M')" >> "$LOG"
python3 -I web/scripts/inspiration.py >> "$LOG" 2>&1
tools/.venv/bin/python -I web/scripts/signals.py --ratio 2 >> "$LOG" 2>&1
node scripts/library.mjs >> "$LOG" 2>&1
(cd web && node scripts/sync-to-db.mjs) >> "$LOG" 2>&1
(cd web && node scripts/suggest-ideas.mjs --weekly) >> "$LOG" 2>&1
(cd web && node scripts/suggest-ideas.mjs --template) >> "$LOG" 2>&1
# the script lead: new trend hook patterns as old ones retire, and more truths as the bank is used up
(cd web && node scripts/virlo.mjs) >> "$LOG" 2>&1
(cd web && node scripts/lead/hooks.mjs) >> "$LOG" 2>&1
(cd web && node scripts/lead/trend-shapes.mjs) >> "$LOG" 2>&1
(cd web && node scripts/lead/truths.mjs --grow) >> "$LOG" 2>&1
(cd web && node scripts/lead/lessons.mjs) >> "$LOG" 2>&1
# one carousel a day per account (skips an account that already has one from the last 20 hours)
(cd web && node scripts/carousel.mjs) >> "$LOG" 2>&1
echo "done $(date '+%H:%M')" >> "$LOG"
