"""Inspiration: read motion-design and ad-craft feeds into web/data/inspiration.jsonl.

  python3 -I web/scripts/inspiration.py

Each feed in web/research/inspiration.json is read once, plainly, with a named client. New items (by link)
are appended as JSON lines with a picture if the feed carries one. A feed that refuses is recorded as failed
and skipped; nothing here retries with a disguise. Motion-design TikTok outliers come from signals.py
(niche "motion") and are shown beside these on the desk.
"""
import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
SOURCES = WEB / "research" / "inspiration.json"
STREAM = WEB / "data" / "inspiration.jsonl"
AGENT = "offload-desk/1.0 (feed reader)"
NS = {"atom": "http://www.w3.org/2005/Atom", "media": "http://search.yahoo.com/mrss/", "content": "http://purl.org/rss/1.0/modules/content/"}


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def text(el):
    return html.unescape(re.sub(r"<[^>]+>", " ", el or "")).strip()


def when(raw):
    if not raw:
        return ""
    try:
        return parsedate_to_datetime(raw).astimezone(timezone.utc).isoformat(timespec="seconds")
    except (TypeError, ValueError):
        return raw.strip()


def picture(item, body):
    for tag in ("media:content", "media:thumbnail"):
        el = item.find(tag, NS)
        if el is not None and el.get("url"):
            return el.get("url")
    enc = item.find("enclosure")
    if enc is not None and (enc.get("type") or "").startswith("image") and enc.get("url"):
        return enc.get("url")
    m = re.search(r'<img[^>]+src="([^"]+)"', body or "")
    return html.unescape(m.group(1)) if m else ""


def read(feed):
    req = urllib.request.Request(feed["url"], headers={"User-Agent": AGENT})
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read()
    try:
        root = ET.fromstring(raw)
    except ET.ParseError:  # common in WordPress feeds: a bare & inside an image URL
        root = ET.fromstring(re.sub(rb"&(?!#?\w+;)", b"&amp;", raw))
    items = []
    for it in root.iter("item"):
        body = (it.findtext("content:encoded", namespaces=NS) or it.findtext("description") or "")
        items.append({"title": text(it.findtext("title")), "url": (it.findtext("link") or "").strip(), "published": when(it.findtext("pubDate")), "summary": text(it.findtext("description"))[:280], "image": picture(it, body)})
    for it in root.iter("{http://www.w3.org/2005/Atom}entry"):
        link = it.find("atom:link", NS)
        body = it.findtext("atom:content", namespaces=NS) or it.findtext("atom:summary", namespaces=NS) or ""
        items.append({"title": text(it.findtext("atom:title", namespaces=NS)), "url": link.get("href") if link is not None else "", "published": (it.findtext("atom:updated", namespaces=NS) or ""), "summary": text(body)[:280], "image": picture(it, body)})
    keep = [k.lower() for k in feed.get("keep", [])]
    if keep:
        items = [i for i in items if any(k in f" {i['title']} {i['summary']} ".lower() for k in keep)]
    return [i for i in items if i["url"] and i["title"]]


def main():
    sources = json.loads(SOURCES.read_text())["feeds"]
    STREAM.parent.mkdir(parents=True, exist_ok=True)
    seen = set()
    if STREAM.exists():
        for line in STREAM.read_text().splitlines():
            try:
                d = json.loads(line)
                if d.get("type") == "item":
                    seen.add(d["url"])
            except json.JSONDecodeError:
                pass
    new, failed = 0, []
    with STREAM.open("a") as out:
        for feed in sources:
            try:
                for item in read(feed):
                    if item["url"] in seen:
                        continue
                    seen.add(item["url"])
                    out.write(json.dumps({"type": "item", "at": now(), "source": feed["name"], **item}) + "\n")
                    new += 1
            except Exception as e:  # one bad feed never stops the rest
                failed.append({"source": feed["name"], "error": str(e)[:200]})
        out.write(json.dumps({"type": "run", "at": now(), "feeds": len(sources), "new": new, "failed": failed}) + "\n")
    print(f"{new} new from {len(sources)} feeds" + (f", {len(failed)} failed" if failed else ""))


if __name__ == "__main__":
    main()
