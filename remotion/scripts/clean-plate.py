"""Clean plate: paint the words out of a photo so new words can be set on the same object.

  /opt/homebrew/bin/python3 scripts/clean-plate.py <photo> <out.png> "<text>" ["<text>" ...]

Finds every line of type with web/scripts/vision-ocr.swift. A line is erased when its text starts with one
of the given strings (case-insensitive). Touching boxes merge into one region, refilled from
clean bands on all four sides (a Coons patch), with the photo's grain added back. This suits flat surfaces: paper, card, kraft, an LCD.
Options: --box=x,y,w,h erases a box the OCR missed; --soften=y0:y1 blurs a plain band (a white backdrop) after.
Prints the erased boxes as JSON, so the template can set new words in the same places.
"""
import json
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OCR = ROOT / "web" / "scripts" / "vision-ocr.swift"


def read_lines(photo):
    out = subprocess.run(["swift", str(OCR), photo], capture_output=True, text=True, check=True).stdout
    lines = []
    for row in out.strip().splitlines():
        parts = row.split("\t")
        if len(parts) < 6:
            continue
        _, x, y, w, h, text = parts[:6]
        lines.append({"x": int(x), "y": int(y), "w": int(w), "h": int(h), "text": text})
    return lines


def main():
    photo, out, *args = sys.argv[1:]
    boxes = [tuple(int(v) for v in a.split("=", 1)[1].split(",")) for a in args if a.startswith("--box=")]
    soften = [tuple(int(v) for v in a.split("=", 1)[1].split(":")) for a in args if a.startswith("--soften=")]
    wanted = [a.lower() for a in args if not a.startswith("--")]
    img = cv2.imread(photo)
    if img is None:
        raise SystemExit(f"Could not read {photo}")
    H, W = img.shape[:2]
    out_img = img.astype(np.float32)
    rng = np.random.default_rng(7)
    smooth = cv2.GaussianBlur(img, (0, 0), 2.2).astype(np.float32)
    sigma = float(np.std(img.astype(np.float32) - smooth))
    mask = np.zeros((H, W), np.uint8)
    erased = []
    for line in read_lines(photo):
        if not any(line["text"].lower().startswith(w) for w in wanted):
            continue
        pad = max(6, line["h"] // 3)
        mask[max(0, line["y"] - pad) : line["y"] + line["h"] + pad, max(0, line["x"] - pad) : line["x"] + line["w"] + pad] = 255
        erased.append(line)
    for x, y, w, h in boxes:
        mask[y : y + h, x : x + w] = 255
        erased.append({"x": x, "y": y, "w": w, "h": h, "text": "(box)"})
    # touching boxes become one region, filled from clean bands on all four sides
    n, _, stats, _ = cv2.connectedComponentsWithStats(cv2.dilate(mask, np.ones((9, 9), np.uint8)))
    band = 8

    def med(strip, k):
        u8 = np.clip(strip, 0, 255).astype(np.uint8)
        k = max(3, min(k | 1, 255))
        return cv2.medianBlur(u8, k).astype(np.float32) if min(u8.shape[:2]) > 0 else strip

    for i in range(1, n):
        x, y, w, h = stats[i][:4]
        x0, y0 = max(band + 1, x), max(band + 1, y)
        x1, y1 = min(W - band - 2, x + w), min(H - band - 2, y + h)
        if x1 <= x0 or y1 <= y0:
            continue
        T = med(np.median(out_img[y0 - band : y0 - 1, x0:x1], axis=0)[None], 41)[0]
        B = med(np.median(out_img[y1 + 1 : y1 + band, x0:x1], axis=0)[None], 41)[0]
        L = med(np.median(out_img[y0:y1, x0 - band : x0 - 1], axis=1)[:, None], 41)[:, 0]
        R = med(np.median(out_img[y0:y1, x1 + 1 : x1 + band], axis=1)[:, None], 41)[:, 0]
        t = np.linspace(0, 1, y1 - y0)[:, None, None]
        s_ = np.linspace(0, 1, x1 - x0)[None, :, None]
        # a side that is a different surface (the drawer under a headline) is left out
        sides = {"T": T, "B": B, "L": L, "R": R}
        lum = {k: float(v.mean()) for k, v in sides.items()}
        ref = float(np.median(list(lum.values())))
        ok = {k: abs(lum[k] - ref) < 28 for k in sides}
        if ok["T"] and ok["B"]:
            V = (1 - t) * T[None] + t * B[None]
        else:
            V = np.broadcast_to((T if ok["T"] else B)[None], (y1 - y0, x1 - x0, 3)) if (ok["T"] or ok["B"]) else None
        if ok["L"] and ok["R"]:
            Hh = (1 - s_) * L[:, None] + s_ * R[:, None]
        else:
            Hh = np.broadcast_to((L if ok["L"] else R)[:, None], (y1 - y0, x1 - x0, 3)) if (ok["L"] or ok["R"]) else None
        if V is not None and Hh is not None and all(ok.values()):
            c00, c01, c10, c11 = T[0], T[-1], B[0], B[-1]
            patch = V + Hh - ((1 - t) * (1 - s_) * c00 + (1 - t) * s_ * c01 + t * (1 - s_) * c10 + t * s_ * c11)
        elif V is not None and Hh is not None:
            patch = 0.5 * (V + Hh)
        else:
            patch = (V if V is not None else Hh).copy()
        # grain matched to the texture measured in the bands around the region
        ring = np.concatenate([
            (img[y0 - band : y0 - 1, x0:x1].astype(np.float32) - cv2.GaussianBlur(img[y0 - band : y0 - 1, x0:x1], (0, 0), 3).astype(np.float32)).reshape(-1, 3),
            (img[y1 + 1 : y1 + band, x0:x1].astype(np.float32) - cv2.GaussianBlur(img[y1 + 1 : y1 + band, x0:x1], (0, 0), 3).astype(np.float32)).reshape(-1, 3),
        ])
        # robust spread (edges in a band must not count as grain), capped near the photo's own grain
        local = float(1.4826 * np.median(np.abs(ring - np.median(ring)))) if ring.size else sigma
        local = min(local, sigma)
        patch += (rng.normal(0, 1, patch.shape[:2]).astype(np.float32) * local * 0.7)[..., None]
        region = cv2.GaussianBlur(mask[y0:y1, x0:x1].astype(np.float32) / 255, (0, 0), 5)[..., None]
        out_img[y0:y1, x0:x1] = out_img[y0:y1, x0:x1] * (1 - region) + patch * region
    for a, b in soften:
        out_img[a:b] = cv2.GaussianBlur(out_img[a:b], (0, 0), 18)
    cv2.imwrite(out, np.clip(out_img, 0, 255).astype(np.uint8))
    print(json.dumps({"w": W, "h": H, "erased": erased}))


main()
