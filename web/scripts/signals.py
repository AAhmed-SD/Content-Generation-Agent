"""Signals: find outlier videos on the watch list and stream them into web/data/signals.jsonl.

  tools/.venv/bin/python -I web/scripts/signals.py [--recent 30] [--ratio 3] [--min-views 2000]

For each account in web/research/watchlist.json, read its latest videos with yt-dlp (public pages, no login),
take the median views as that account's usual, and flag any video at ratio x usual or more. For each new
outlier, transcribe its first seconds with faster-whisper to get the spoken hook. Every outlier, and one
summary per run, is appended to the stream as a JSON line. A video is only ever streamed once.

TikTok first: that is where the audience is. Reads only public profile pages, plainly, with no login, no
browser disguise and nothing that gets round a bot check. TikTok does not allow automated collection, so keep
the list short and read it a few times a day at most. Hashtag pages are not read: that needs a disguised
browser, which this script will not use. YouTube accounts still work with platform "youtube".
"""
import argparse
import json
import shutil
import statistics
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
ROOT = WEB.parent
WATCHLIST = WEB / "research" / "watchlist.json"
STREAM = WEB / "data" / "signals.jsonl"
PY = sys.executable


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def feed_url(account):
    if account["platform"] == "youtube":
        return f"https://www.youtube.com/@{account['handle']}/shorts"
    if account["platform"] == "tiktok":
        return f"https://www.tiktok.com/@{account['handle']}"
    raise ValueError(f"Unknown platform {account['platform']}")


def video_url(account, vid):
    if account["platform"] == "youtube":
        return f"https://www.youtube.com/shorts/{vid}"
    return f"https://www.tiktok.com/@{account['handle']}/video/{vid}"


def recent(account, count):
    out = subprocess.run(
        [PY, "-m", "yt_dlp", "--flat-playlist", "--playlist-end", str(count), "--dump-json", "--no-warnings", feed_url(account)],
        capture_output=True, text=True, timeout=180,
    )
    videos = []
    for line in out.stdout.splitlines():
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue
        if d.get("view_count") is None:
            continue
        videos.append({"id": d["id"], "title": (d.get("title") or d.get("description") or "").strip(), "views": int(d["view_count"])})
    if not videos and out.returncode != 0:
        raise RuntimeError(out.stderr.strip().splitlines()[-1] if out.stderr.strip() else "yt-dlp failed")
    return videos


_whisper = None


def hook(url, seconds=8):
    """The words spoken in the first seconds of the video."""
    global _whisper
    tmp = Path(tempfile.mkdtemp(prefix="signals-"))
    try:
        subprocess.run(
            [PY, "-m", "yt_dlp", "-q", "--no-warnings", "-f", "bestaudio/best", "--download-sections", f"*0-{seconds}", "-o", str(tmp / "clip.%(ext)s"), url],
            capture_output=True, text=True, timeout=180,
        )
        clips = list(tmp.glob("clip.*"))
        if not clips:
            return ""
        wav = tmp / "clip.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(clips[0]), "-ac", "1", "-ar", "16000", str(wav)], check=True, timeout=60)
        import soundfile as sf
        from faster_whisper import WhisperModel

        audio, _ = sf.read(str(wav), dtype="float32")
        if _whisper is None:
            _whisper = WhisperModel("tiny", device="cpu", compute_type="int8")
        segments, _ = _whisper.transcribe(audio, language="en")
        return " ".join(s.text.strip() for s in segments).strip()
    except Exception:
        return ""
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def seen_ids():
    ids = set()
    if STREAM.exists():
        for line in STREAM.read_text().splitlines():
            try:
                e = json.loads(line)
            except json.JSONDecodeError:
                continue
            if e.get("type") == "outlier":
                ids.add(f"{e['platform']}:{e['id']}")
    return ids


def emit(event):
    STREAM.parent.mkdir(parents=True, exist_ok=True)
    with STREAM.open("a") as f:
        f.write(json.dumps(event, ensure_ascii=False) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--recent", type=int, default=30)
    ap.add_argument("--ratio", type=float, default=3.0)
    ap.add_argument("--min-views", type=int, default=1000)
    ap.add_argument("--niche", default=None, help="only this niche, e.g. motion")
    a = ap.parse_args()
    accounts = [x for x in json.loads(WATCHLIST.read_text())["accounts"] if not a.niche or x["niche"] == a.niche]
    seen = seen_ids()
    found, failed = 0, []
    for account in accounts:
        label = f"{account['platform']}/@{account['handle']}"
        try:
            videos = recent(account, a.recent)
        except Exception as e:
            failed.append({"account": label, "error": str(e)[:200]})
            print(f"fail {label}: {e}")
            continue
        if len(videos) < 5:
            print(f"skip {label}: only {len(videos)} videos with views")
            continue
        usual = statistics.median(v["views"] for v in videos)
        for v in videos:
            ratio = v["views"] / usual if usual else 0
            key = f"{account['platform']}:{v['id']}"
            if ratio < a.ratio or v["views"] < a.min_views or key in seen:
                continue
            url = video_url(account, v["id"])
            spoken = "" if account["niche"] == "motion" else hook(url)  # motion is about the picture
            emit({
                "type": "outlier", "at": now(), "niche": account["niche"], "platform": account["platform"],
                "account": account["handle"], "id": v["id"], "url": url, "title": v["title"][:200],
                "views": v["views"], "usual": int(usual), "ratio": round(ratio, 1), "hook": spoken[:300],
            })
            seen.add(key)
            found += 1
            print(f"outlier {label} {ratio:.1f}x {v['views']} views: {(spoken or v['title'])[:70]}")
        time.sleep(2)  # be gentle between accounts
    emit({"type": "run", "at": now(), "accounts": len(accounts), "outliers": found, "failed": failed})
    print(f"run: {len(accounts)} accounts, {found} new outliers, {len(failed)} failed")


main()
