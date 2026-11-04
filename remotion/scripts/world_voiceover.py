"""Voiceover for a world video: one Kokoro take per narration line, so every line start is exact.

  python3 scripts/world_voiceover.py past-papers [--models ~/.offload/kokoro]

Reads src/world/<id>/script.json, writes public/world/<id>/vo.wav and src/world/<id>/timing.json.
"""
import argparse, json, os, re
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def trim(a, rate, th=0.01):
    idx = np.where(np.abs(a) > th)[0]
    if len(idx) == 0:
        return a
    return a[max(0, idx[0] - int(0.02 * rate)): min(len(a), idx[-1] + int(0.08 * rate))]

def voice_of(k, spec):
    """A voice name, or a blend like "af_heart*0.7+af_bella*0.3"."""
    v = spec.get("voice", "bm_george")
    if "+" not in v and "*" not in v:
        return v
    style = None
    for part in v.split("+"):
        name, w = (part.split("*") + ["1"])[:2]
        st = k.get_voice_style(name.strip()) * float(w)
        style = st if style is None else style + st
    return style


def master(audio, rate):
    """Make a dry TTS take sit like a recorded voice: clean lows, a little warmth and presence,
    gentle compression, and a short room."""
    from scipy.signal import butter, sosfilt, fftconvolve
    hp = sosfilt(butter(2, 85, btype="high", fs=rate, output="sos"), audio)
    warm = sosfilt(butter(2, 260, btype="low", fs=rate, output="sos"), hp)
    pres = sosfilt(butter(2, [2800, 5200], btype="band", fs=rate, output="sos"), hp)
    x = hp + 0.18 * warm + 0.12 * pres
    # soft-knee compression on a 10 ms envelope
    win = int(0.01 * rate)
    env = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, mode="same")) + 1e-6
    thr = 0.12
    gain = np.where(env > thr, (thr / env) ** 0.45, 1.0)
    x = x * gain
    # a small room: decaying noise impulse, mixed low
    n = int(0.28 * rate)
    rng = np.random.default_rng(3)
    ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 9, n))
    ir = sosfilt(butter(2, 4500, btype="low", fs=rate, output="sos"), ir)
    ir /= np.max(np.abs(ir))
    wet = fftconvolve(x, ir)[: len(x)]
    wet *= np.max(np.abs(x)) / (np.max(np.abs(wet)) or 1)
    return (x + 0.07 * wet).astype(np.float32)


def align(clip, rate, text, t0):
    """Word times for one natural take: split at the longest pauses, one per punctuation break."""
    ws = text.split()
    groups, cur = [], []
    for w in ws:
        cur.append(w)
        if re.search(r"[.,?!;:]$", w):
            groups.append(cur); cur = []
    if cur: groups.append(cur)
    hop = int(0.01 * rate)
    env = np.array([np.sqrt(np.mean(clip[i:i + hop] ** 2)) for i in range(0, len(clip) - hop, hop)])
    quiet = env < 0.06 * env.max()
    runs, i = [], 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]: j += 1
            if j - i >= 5 and i > 0 and j < len(quiet): runs.append((j - i, i, j))
            i = j
        else:
            i += 1
    cuts = sorted(sorted(runs, reverse=True)[: len(groups) - 1], key=lambda r: r[1])
    bounds, s0 = [], 0.0
    for _, a, b in cuts:
        bounds.append((s0, a * 0.01)); s0 = b * 0.01
    bounds.append((s0, len(clip) / rate))
    if len(bounds) != len(groups):  # not enough pauses: one span
        groups, bounds = [ws], [(0.0, len(clip) / rate)]
    words = []
    for g, (a, b) in zip(groups, bounds):
        wts = [len(re.sub(r"[^\w]", "", w)) + 2 for w in g]
        tot, c = sum(wts), a
        for w, wt in zip(g, wts):
            L = wt / tot * (b - a)
            words.append({"text": w, "start": round(t0 + c, 3), "end": round(t0 + c + L, 3)})
            c += L
    return words

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("--models", default=os.path.expanduser("~/.offload/kokoro"))
    ap.add_argument("--gap", type=float, default=None)
    a = ap.parse_args()
    spec = json.load(open(os.path.join(ROOT, "src", "world", a.id, "script.json")))
    if a.gap is None:
        a.gap = spec.get("gap", 0.3)
    k = Kokoro(os.path.join(a.models, "kokoro-v1.0.onnx"), os.path.join(a.models, "voices-v1.0.bin"))
    t, rate, parts, lines = 0.15, 24000, [], []
    for ln in spec["lines"]:
        # Lines with on-beat moments are voiced phrase by phrase, so those words land exactly.
        if spec.get("takes") == "line" and not ln.get("phrases"):
            samples, rate = k.create(ln.get("tts", ln["say"]), voice=voice_of(k, spec), speed=spec.get("speed", 1.06), lang=spec.get("lang", "en-gb"))
            clip = trim(samples.astype(np.float32), rate)
            dur = len(clip) / rate
            lines.append({"id": ln["id"], "say": ln["say"], "start": round(t, 3), "end": round(t + dur, 3), "words": align(clip, rate, ln["say"], t)})
            pause = ln.get("after", a.gap)
            parts += [clip, np.zeros(int(pause * rate), dtype=np.float32)]
            t += dur + pause
            continue
        chunks = ln.get("phrases") or [ln.get("tts", ln["say"])]
        clips, words, c = [], [], t
        for ci, chunk in enumerate(chunks):
            samples, rate = k.create(chunk, voice=voice_of(k, spec), speed=spec.get("speed", 1.06), lang=spec.get("lang", "en-gb"))
            clip = trim(samples.astype(np.float32), rate)
            d = len(clip) / rate
            ws = chunk.split()
            wts = [len(re.sub(r"[^\w]", "", w)) + 2 for w in ws]
            tot, cc = sum(wts), c
            for w, wt in zip(ws, wts):
                L = wt / tot * d
                words.append({"text": w, "start": round(cc, 3), "end": round(cc + L, 3)})
                cc += L
            clips.append(clip)
            c += d
            if ci < len(chunks) - 1:
                clips.append(np.zeros(int(0.06 * rate), dtype=np.float32))
                c += 0.06
        clip = np.concatenate(clips)
        dur = len(clip) / rate
        lines.append({"id": ln["id"], "say": ln["say"], "start": round(t, 3), "end": round(t + dur, 3), "words": words})
        parts += [clip, np.zeros(int(a.gap * rate), dtype=np.float32)]
        t += dur + a.gap
    audio = np.concatenate([np.zeros(int(0.15 * rate), dtype=np.float32)] + parts + [np.zeros(int(1.0 * rate), dtype=np.float32)])
    if spec.get("master"):
        audio = master(audio, rate)
    audio = audio / (np.max(np.abs(audio)) or 1) * 0.89
    out = os.path.join(ROOT, "public", "world", a.id)
    os.makedirs(out, exist_ok=True)
    sf.write(os.path.join(out, "vo.wav"), audio, rate)
    json.dump({"duration": round(len(audio) / rate, 3), "lines": lines}, open(os.path.join(ROOT, "src", "world", a.id, "timing.json"), "w"), indent=1)
    for l in lines:
        print(f"{l['start']:6.2f}-{l['end']:6.2f}  {l['say']}")
    print("total", round(len(audio) / rate, 2))

main()
