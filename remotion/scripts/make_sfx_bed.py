"""Atmosphere and payoff sounds. Not music: room tone, air, risers, a sub drop.

  python3 scripts/make_sfx_bed.py   -> public/sfx/{bed,riser_long,subdrop,tick_soft,air}.wav
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

R = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
rng = np.random.default_rng(23)
T = lambda s: np.arange(int(s * R)) / R
lp = lambda x, f, o=4: sosfilt(butter(o, f, btype="low", fs=R, output="sos"), x)
hp = lambda x, f, o=2: sosfilt(butter(o, f, btype="high", fs=R, output="sos"), x)
bp = lambda x, a, b, o=2: sosfilt(butter(o, [a, b], btype="band", fs=R, output="sos"), x)
norm = lambda x, p: x / (np.max(np.abs(x)) + 1e-9) * p


def bed():
    sec = 60; t = T(sec); n = len(t)
    room = lp(np.cumsum(rng.standard_normal(n)) * 0.02, 260)          # brown, low room
    room = hp(room, 35)
    air = bp(rng.standard_normal(n), 5000, 11000) * 0.12              # faint air
    lfo = 0.75 + 0.25 * np.sin(2 * np.pi * t / 9.0) * np.sin(2 * np.pi * t / 23.0)
    x = norm(room, 1) * 0.8 * lfo + norm(air, 1) * 0.18 * (1.1 - lfo * 0.3)
    # loop seam: crossfade the last 2 s into the start
    f = int(2 * R); w = np.linspace(0, 1, f)
    x[:f] = x[:f] * w + x[-f:] * (1 - w); x = x[:-f]
    d = int(0.017 * R)
    st = np.stack([x, np.concatenate([x[d:], x[:d]])], 1)
    return norm(st, 0.5)


def riser_long():
    sec = 1.3; t = T(sec); u = t / sec; n = len(t)
    noise = rng.standard_normal(n); out = np.zeros(n); B = 40; ed = np.linspace(0, n, B + 1).astype(int)
    for i in range(B):
        f = 300 * (12 ** (i / (B - 1))); s, e = ed[i], ed[i + 1]; pad = 2048
        seg = noise[max(0, s - pad):min(n, e + pad)]; y = bp(seg, f * 0.6, min(20000, f * 1.6)); o = s - max(0, s - pad)
        out[s:e] = y[o:o + e - s]
    tone = np.sin(2 * np.pi * np.cumsum(120 * (4 ** u)) / R) * 0.25
    x = (out + tone) * u ** 2.2
    return norm(x, 0.8)


def subdrop():
    sec = 1.4; t = T(sec)
    f = 38 + 70 * np.exp(-t * 9)
    x = np.sin(2 * np.pi * np.cumsum(f) / R) * np.exp(-t * 2.6)
    x += lp(rng.standard_normal(len(t)), 900) * np.exp(-t * 18) * 0.5
    return norm(x, 0.95)


def tick_soft():
    sec = 0.09; t = T(sec)
    x = np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 90) * 0.6 + hp(rng.standard_normal(len(t)), 4000) * np.exp(-t * 300) * 0.4
    return norm(x, 0.5)


def air():
    sec = 1.1; t = T(sec); u = t / sec; n = len(t)
    x = bp(rng.standard_normal(n), 500, 3500) * np.sin(np.pi * u) ** 1.6
    x += hp(rng.standard_normal(n), 6000) * 0.2 * np.sin(np.pi * u) ** 2
    return norm(x, 0.45)


for name, fn in {"bed": bed, "riser_long": riser_long, "subdrop": subdrop, "tick_soft": tick_soft, "air": air}.items():
    sf.write(os.path.join(OUT, name + ".wav"), fn(), R, subtype="PCM_16"); print(name)
