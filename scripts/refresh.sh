#!/bin/sh
# Refresh the desk's Make section: inspiration feeds, TikTok signals (UK content and motion), the template
# library, and (weekly) three new ideas. Results are copied into Supabase (scripts/sync-to-db.mjs). Run by hand, or every six hours by scripts/launchd/education.offload.desk-refresh.plist.
# TikTok is read a few times a day at most, plainly, with no login and nothing that gets round a bot check.
cd "$(dirname "$0")/.." || exit 1
LOG=web/data/refresh.log
echo "--- $(date '+%Y-%m-%d %H:%M')" >> "$LOG"
python3 -I web/scripts/inspiration.py >> "$LOG" 2>&1
tools/.venv/bin/python -I web/scripts/signals.py --ratio 2 >> "$LOG" 2>&1
node scripts/library.mjs >> "$LOG" 2>&1
(cd web && node scripts/sync-to-db.mjs) >> "$LOG" 2>&1
(cd web && node scripts/suggest-ideas.mjs --weekly) >> "$LOG" 2>&1
echo "done $(date '+%H:%M')" >> "$LOG"
