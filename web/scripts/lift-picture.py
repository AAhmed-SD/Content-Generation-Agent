#!/usr/bin/env python3
"""Turn one flat picture into a layer stack. Words become text. Pieces become cutouts."""

import json
import shutil
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np

SWIFT = Path(__file__).with_name("vision-ocr.swift")


def hex_colour(bgr):
    b, g, r = [int(max(0, min(255, round(float(v))))) for v in bgr[:3]]
    return f"#{r:02x}{g:02x}{b:02x}"


def blue_ink(bgr):
    b, g, r = [float(v) for v in bgr[:3]]
    return b > 120 and b > r + 40 and b > g + 20


def colour_name(bgr):
    b, g, r = [float(v) for v in bgr[:3]]
    if r > 150 and r > g * 1.35 and r > b * 1.35:
        return "Red"
    if r > 110 and g > 80 and b < 140 and r > b + 25 and g > b + 10:
        return "Brown"
    if b > 90 and b > r + 20 and abs(r - g) < 50:
        return "Blue"
    if r > 210 and g > 210 and b > 210:
        return "Paper"
    if r < 45 and g < 45 and b < 45:
        return "Black"
    return "Shape"


def font_for(text, bgr, height):
    if blue_ink(bgr):
        return "script"
    letters = [ch for ch in text if ch.isalpha()]
    if letters and sum(ch.isupper() for ch in letters) / len(letters) > 0.8:
        return "sans"
    if height > 70:
        return "sans"
    return "serif"


def corrupted(text):
    for token in text.replace("—", " ").split():
        core = token.strip(".,!?;:\"'()[]")
        if any(ch.isalpha() for ch in core) and any(ch.isdigit() for ch in core):
            return True
    return False


def read_vision(path):
    swift = shutil.which("swift")
    if not swift or not SWIFT.exists():
        return []
    result = subprocess.run([swift, str(SWIFT), str(path)], capture_output=True, text=True, timeout=40)
    if result.returncode != 0:
        return []
    lines = []
    for row in result.stdout.splitlines():
        parts = row.split("\t")
        if len(parts) < 6:
            continue
        conf, x, y, w, h = parts[:5]
        text = parts[5].strip()
        try:
            box = {"conf": float(conf), "x": int(x), "y": int(y), "w": int(w), "h": int(h), "text": text}
        except ValueError:
            continue
        if box["w"] < 8 or box["h"] < 8 or not any(ch.isalnum() for ch in text):
            continue
        lines.append(box)
    return lines


def read_tesseract(path):
    binary = shutil.which("tesseract")
    if not binary:
        return []
    result = subprocess.run([binary, str(path), "stdout", "--psm", "11", "tsv"], capture_output=True, text=True, timeout=40)
    if result.returncode != 0:
        return []
    words = []
    for row in result.stdout.splitlines()[1:]:
        col = row.split("\t")
        if len(col) < 12 or col[0] != "5":
            continue
        text = col[11].strip()
        if not text or float(col[10] or -1) < 0:
            continue
        x, y, w, h = (int(float(col[i])) for i in (6, 7, 8, 9))
        if w < 2 or h < 2:
            continue
        words.append({"x": x, "y": y, "w": w, "h": h, "text": text})
    words.sort(key=lambda item: (item["y"], item["x"]))
    groups = []
    for word in words:
        mid = word["y"] + word["h"] / 2
        group = next((items for items in groups if mid >= min(item["y"] for item in items) - 4 and mid <= max(item["y"] + item["h"] for item in items) + 4), None)
        if group is None:
            groups.append([word])
        else:
            group.append(word)
    lines = []
    for items in groups:
        items.sort(key=lambda item: item["x"])
        text = " ".join(item["text"] for item in items)
        if not any(ch.isalnum() for ch in text):
            continue
        x = min(item["x"] for item in items)
        y = min(item["y"] for item in items)
        right = max(item["x"] + item["w"] for item in items)
        bottom = max(item["y"] + item["h"] for item in items)
        lines.append({"conf": 0.5, "x": x, "y": y, "w": right - x, "h": bottom - y, "text": text})
    return lines


def refine_line(image, line):
    wide = line["h"] > 80 and line["w"] > line["h"] * 2.2
    if not corrupted(line["text"]) and not wide:
        return line["text"]
    height, width = image.shape[:2]
    x0 = max(0, line["x"] - 8)
    y0 = max(0, line["y"] - 8)
    x1 = min(width, line["x"] + line["w"] + 8)
    y1 = min(height, line["y"] + line["h"] + 8)
    crop = image[y0:y1, x0:x1]
    if crop.size == 0:
        return line["text"]
    scaled = cv2.resize(crop, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
    tmp = Path("/tmp/offload-lift-crop.png")
    cv2.imwrite(str(tmp), scaled)
    found = read_vision(tmp)
    tmp.unlink(missing_ok=True)
    if not found:
        return line["text"]
    best = max(found, key=lambda item: item["w"] * item["h"])
    return best["text"] if best["text"] and not corrupted(best["text"]) else line["text"]


def ink_mask(image, box):
    height, width = image.shape[:2]
    x0 = max(0, box["x"])
    y0 = max(0, box["y"])
    x1 = min(width, box["x"] + box["w"])
    y1 = min(height, box["y"] + box["h"])
    mask = np.zeros((height, width), np.uint8)
    if x1 - x0 < 2 or y1 - y0 < 2:
        return mask
    margin = 8
    xa, ya = max(0, x0 - margin), max(0, y0 - margin)
    xb, yb = min(width, x1 + margin), min(height, y1 + margin)
    region = image[ya:yb, xa:xb]
    yy, xx = np.mgrid[0 : region.shape[0], 0 : region.shape[1]]
    inside = (xx >= x0 - xa) & (xx < x1 - xa) & (yy >= y0 - ya) & (yy < y1 - ya)
    outside = ~inside
    if int(outside.sum()) < 8:
        bg = np.median(image.reshape(-1, 3), axis=0)
    else:
        bg = np.median(region[outside].reshape(-1, 3), axis=0)
    crop = image[y0:y1, x0:x1].astype(np.float32)
    distance = np.linalg.norm(crop - bg.astype(np.float32), axis=2)
    mask[y0:y1, x0:x1] = (distance > 22).astype(np.uint8) * 255
    return mask


def component_boxes(mask, min_area):
    count, labels, stats, _ = cv2.connectedComponentsWithStats((mask > 0).astype(np.uint8), 8)
    found = []
    for index in range(1, count):
        x, y, w, h, area = stats[index]
        if area < min_area:
            continue
        found.append({"label": index, "x": int(x), "y": int(y), "w": int(w), "h": int(h), "area": int(area), "labels": labels})
    return found


def sits_on(small, large):
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    edge = cv2.dilate(small, kernel, iterations=1)
    edge[small > 0] = 0
    total = int((edge > 0).sum())
    if total < 12:
        return False
    return int(((edge > 0) & (large > 0)).sum()) / total > 0.5


def fill_enclosed(mask):
    height, width = mask.shape
    flood = mask.copy()
    cv2.floodFill(flood, np.zeros((height + 2, width + 2), np.uint8), (0, 0), 255)
    holes = cv2.bitwise_not(flood)
    hole_area = int((holes > 0).sum())
    if hole_area <= 0 or hole_area > int((mask > 0).sum()) * 0.45:
        return mask
    return cv2.bitwise_or(mask, holes)


def write_png(path, bgr, alpha):
    bgra = cv2.cvtColor(bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    ys, xs = np.where(alpha > 0)
    if len(xs) == 0:
        return None
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    cv2.imwrite(str(path), bgra[y0:y1, x0:x1])
    return x0, y0, x1 - x0, y1 - y0


def unique_name(name, used):
    name = name.strip()[:40] or "Layer"
    if name not in used:
        used.add(name)
        return name
    index = 2
    while f"{name[:36]} {index}" in used:
        index += 1
    picked = f"{name[:36]} {index}"
    used.add(picked)
    return picked


def lift(image_path, asset_dir, preview=None):
    image = cv2.imread(str(image_path), cv2.IMREAD_COLOR)
    if image is None:
        raise SystemExit("The picture could not be read.")
    height, width = image.shape[:2]
    scale = 1
    if max(height, width) > 1600:
        scale = 1600 / max(height, width)
        image = cv2.resize(image, (int(width * scale), int(height * scale)), interpolation=cv2.INTER_AREA)
        height, width = image.shape[:2]

    lines = read_vision(image_path if scale == 1 else None) if scale == 1 else []
    if scale != 1:
        tmp = Path(asset_dir) / "_plate.jpg"
        cv2.imwrite(str(tmp), image, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
        lines = read_vision(tmp)
        tmp.unlink(missing_ok=True)
    if not lines:
        lines = read_tesseract(image_path if scale == 1 else image_path)
        if scale != 1:
            for line in lines:
                for key in ("x", "y", "w", "h"):
                    line[key] = int(line[key] * scale)
    for line in lines:
        line["text"] = refine_line(image, line)[:200]

    text = np.zeros((height, width), np.uint8)
    prepared = []
    for line in lines:
        mask = ink_mask(image, line)
        if int((mask > 0).sum()) < 12:
            continue
        line["mask"] = mask
        text = cv2.bitwise_or(text, mask)
        prepared.append(line)
    ink = cv2.dilate(text, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=2)
    free = cv2.inpaint(image, ink, 5, cv2.INPAINT_TELEA) if int((ink > 0).sum()) else image.copy()

    lab = cv2.cvtColor(free, cv2.COLOR_BGR2LAB).astype(np.float32)
    corners = np.concatenate([lab[:28, :28].reshape(-1, 3), lab[:28, -28:].reshape(-1, 3), lab[-28:, :28].reshape(-1, 3), lab[-28:, -28:].reshape(-1, 3)])
    background = np.median(corners, axis=0)
    distance = np.linalg.norm(lab - background, axis=2)
    raw = (distance > 18).astype(np.uint8) * 255
    raw[text > 0] = 0
    page = height * width

    line_mask = np.zeros((height, width), np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats((raw > 0).astype(np.uint8), 8)
    kept = np.zeros((height, width), np.uint8)
    for index in range(1, count):
        x, y, w, h, area = [int(v) for v in stats[index]]
        if area < 24:
            continue
        thin = max(w, h) / max(1, min(w, h))
        piece = np.zeros((height, width), np.uint8)
        piece[labels == index] = 255
        if thin > 8 and min(w, h) < 14 and max(w, h) > 40:
            line_mask = cv2.bitwise_or(line_mask, piece)
        elif area > page * 0.004:
            kept = cv2.bitwise_or(kept, piece)
    solid = cv2.morphologyEx(kept, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17)))
    solid[line_mask > 0] = 0

    objects = []
    count, labels, stats, _ = cv2.connectedComponentsWithStats((solid > 0).astype(np.uint8), 8)
    for index in range(1, count):
        area = int(stats[index, cv2.CC_STAT_AREA])
        if area < page * 0.012:
            continue
        piece = np.where(labels == index, 255, 0).astype(np.uint8)
        ys, xs = np.where(piece > 0)
        pixels = lab[ys, xs]
        train = pixels if len(pixels) <= 40000 else pixels[np.random.default_rng(1).choice(len(pixels), 40000, replace=False)]
        k = 4 if area > page * 0.08 else 3
        _, _, centers = cv2.kmeans(train.astype(np.float32), k, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.8), 3, cv2.KMEANS_PP_CENTERS)
        assign = ((pixels[:, None, :] - centers[None, :, :]) ** 2).sum(axis=2).argmin(axis=1)
        clusters = []
        for center_index, center in enumerate(centers):
            mask = np.zeros((height, width), np.uint8)
            chosen = assign == center_index
            if not np.any(chosen):
                continue
            mask[ys[chosen], xs[chosen]] = 255
            clusters.append({"mask": mask, "center": center, "area": int(chosen.sum())})
        clusters.sort(key=lambda item: item["area"], reverse=True)
        body = clusters[0]
        body_mask = cv2.morphologyEx(body["mask"], cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
        extras = []
        for cluster in clusters[1:]:
            inside = float(((cluster["mask"] > 0) & (cv2.dilate(body_mask, np.ones((11, 11), np.uint8)) > 0)).sum()) / max(1, cluster["area"])
            apart = float(np.linalg.norm(cluster["center"] - body["center"]))
            if cluster["area"] < body["area"] * 0.08 or (inside > 0.85 and apart < 36):
                body_mask = cv2.bitwise_or(body_mask, cluster["mask"])
            elif cluster["area"] > page * 0.008:
                extras.append(cluster)
        body_mask = fill_enclosed(body_mask)
        body_item = {"mask": body_mask, "center": body["center"], "area": int((body_mask > 0).sum())}
        objects.append(body_item)
        for extra in extras:
            kernel = (21, 21) if float(np.linalg.norm(extra["center"][1:] - 128)) < 14 else (9, 9)
            extra_mask = cv2.morphologyEx(extra["mask"], cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, kernel))
            extra_mask = fill_enclosed(extra_mask)
            ys, xs = np.where(extra_mask > 0)
            if len(xs) == 0:
                continue
            solidity = float((extra_mask > 0).sum()) / ((xs.max() - xs.min() + 1) * (ys.max() - ys.min() + 1))
            inside = float(((extra_mask > 0) & (cv2.dilate(body_item["mask"], np.ones((9, 9), np.uint8)) > 0)).sum()) / max(1, int((extra_mask > 0).sum()))
            if inside > 0.5 or solidity < 0.72 or int((extra_mask > 0).sum()) < page * 0.008:
                body_mask = cv2.bitwise_or(body_mask, extra_mask)
                body_item["mask"] = body_mask
                body_item["area"] = int((body_mask > 0).sum())
                continue
            objects.append({"mask": extra_mask, "center": extra["center"], "area": int((extra_mask > 0).sum())})
        near = cv2.dilate(body_item["mask"], np.ones((21, 21), np.uint8))
        body_item["mask"] = fill_enclosed(cv2.bitwise_or(body_item["mask"], cv2.bitwise_and(text, near)))
        body_item["area"] = int((body_item["mask"] > 0).sum())

    objects.sort(key=lambda item: item["area"], reverse=True)
    objects = objects[:12]
    for index, item in enumerate(objects):
        for other in objects[index + 1 :]:
            if sits_on(other["mask"], item["mask"]):
                under = (other["mask"] > 0) & (item["mask"] == 0)
                item["mask"] = cv2.bitwise_or(item["mask"], other["mask"])
                item["under"] = under if "under" not in item else (item["under"] | under)

    covered = np.zeros((height, width), np.uint8)
    for item in objects:
        covered = cv2.bitwise_or(covered, item["mask"])
    covered = cv2.bitwise_or(covered, line_mask)
    plate = cv2.inpaint(free, cv2.dilate(covered, np.ones((3, 3), np.uint8), iterations=1), 6, cv2.INPAINT_TELEA) if int((covered > 0).sum()) else free

    asset_dir = Path(asset_dir)
    asset_dir.mkdir(parents=True, exist_ok=True)
    for old in asset_dir.glob("a*.png"):
        old.unlink()

    names = set()
    layers = []
    serial = 1

    def add_image(bgr, alpha, name, kind="image"):
        nonlocal serial
        asset = f"a{serial}"
        serial += 1
        box = write_png(asset_dir / f"{asset}.png", bgr, alpha)
        if not box:
            return
        x, y, w, h = box
        layers.append({
            "id": f"layer_{asset}",
            "type": kind,
            "name": unique_name(name, names),
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "rotation": 0,
            "opacity": 1,
            "blend": "normal",
            "locked": False,
            "hidden": False,
            "fill": "#171717",
            "stroke": "#171717",
            "strokeWidth": 0,
            "text": "",
            "font": "serif",
            "size": 48,
            "src": f"asset:{asset}",
            "children": [],
        })

    add_image(plate, np.full((height, width), 255, np.uint8), "Background")

    for index, item in enumerate(sorted(objects, key=lambda entry: entry["area"], reverse=True)):
        alpha = np.where(item["mask"] > 0, 255, 0).astype(np.uint8)
        pixels = free.copy()
        under = item.get("under")
        if under is not None and under.any():
            colour = np.median(free[item["mask"] > 0].reshape(-1, 3), axis=0) if int((item["mask"] > 0).sum()) else item["center"]
            pixels[under] = colour
        bgr_center = cv2.cvtColor(np.uint8([[item["center"]]]).reshape(1, 1, 3), cv2.COLOR_LAB2BGR)[0, 0]
        add_image(pixels, alpha, "Subject" if index == 0 else colour_name(bgr_center))

    line_count, line_labels, line_stats, _ = cv2.connectedComponentsWithStats((line_mask > 0).astype(np.uint8), 8)
    for index in range(1, line_count):
        area = int(line_stats[index, cv2.CC_STAT_AREA])
        if area < 20:
            continue
        alpha = np.where(line_labels == index, 255, 0).astype(np.uint8)
        add_image(image, alpha, "Line")

    for line in prepared:
        alpha = np.where(line["mask"] > 0, 255, 0).astype(np.uint8)
        asset = f"a{serial}"
        serial += 1
        box = write_png(asset_dir / f"{asset}.png", image, alpha)
        if not box:
            continue
        x, y, w, h = box
        ink_pixels = image[line["mask"] > 0]
        tone = np.median(ink_pixels.reshape(-1, 3), axis=0) if len(ink_pixels) else np.array([23, 23, 23])
        layers.append({
            "id": f"layer_{asset}",
            "type": "text",
            "name": unique_name(line["text"], names),
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "rotation": 0,
            "opacity": 1,
            "blend": "normal",
            "locked": False,
            "hidden": False,
            "fill": hex_colour(tone),
            "stroke": "#171717",
            "strokeWidth": 0,
            "text": line["text"][:200],
            "font": font_for(line["text"], tone, h),
            "size": int(max(12, min(720, round(h * 0.8)))),
            "src": f"asset:{asset}",
            "children": [],
        })

    scene = {
        "artboard": {"w": width, "h": height, "bg": hex_colour(cv2.cvtColor(np.uint8([[background]]), cv2.COLOR_LAB2BGR)[0, 0])},
        "selection": [],
        "layers": layers,
    }
    if preview:
        show = plate.copy()
        for layer in layers[1:]:
            asset = layer["src"].split(":")[1]
            sprite = cv2.imread(str(asset_dir / f"{asset}.png"), cv2.IMREAD_UNCHANGED)
            if sprite is None:
                continue
            y, x = layer["y"], layer["x"]
            sh, sw = sprite.shape[:2]
            cut = show[y : y + sh, x : x + sw]
            if cut.shape[0] != sh or cut.shape[1] != sw:
                continue
            alpha = sprite[:, :, 3:4].astype(np.float32) / 255
            cut[:] = (sprite[:, :, :3].astype(np.float32) * alpha + cut.astype(np.float32) * (1 - alpha)).astype(np.uint8)
        preview = Path(preview)
        preview.mkdir(parents=True, exist_ok=True)
        cv2.imwrite(str(preview / "reconstruction.jpg"), show, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        diff = np.abs(show.astype(np.int16) - image.astype(np.int16)).mean()
        print(f"mae {diff:.2f} layers {len(layers)}", file=sys.stderr)
    json.dump(scene, sys.stdout)
    sys.stdout.write("\n")


def main():
    if len(sys.argv) < 3:
        raise SystemExit("Use lift-picture.py <image> <asset-dir> [--preview dir]")
    preview = None
    if "--preview" in sys.argv:
        preview = sys.argv[sys.argv.index("--preview") + 1]
    lift(Path(sys.argv[1]), Path(sys.argv[2]), preview)


if __name__ == "__main__":
    main()
