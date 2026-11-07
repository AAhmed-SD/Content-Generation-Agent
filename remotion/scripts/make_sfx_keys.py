"""Soft keyboard keystrokes for text appearing on screen. Built from noise and sine waves like the
rest of the kit: a light top click, a low muted "thock" as the key bottoms out, and a faint
release. Four takes, so a run of words doesn't sound like one sample repeated.

  python3 scripts/make_sfx_keys.py      -> public/sfx/key_1.wav ... key_4.wav
"""

import os

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

RATE = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")


def env(n, attack, release, curve):
    a = max(1, int(attack * RATE))
    e = np.zeros(n)
    e[:a] = np.linspace(0, 1, a) ** 2
    r = min(n - a, int(release * RATE))
    e[a:a + r] = np.linspace(1, 0, r) ** curve
    return e


def band(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype="band", fs=RATE, output="sos"), x)


def key(seed, pitch):
    rng = np.random.default_rng(seed)
    n = int(0.12 * RATE)
    tt = np.arange(n) / RATE
    noise = rng.standard_normal(n)
    top = band(noise, 2500 * pitch, 7000) * env(n, 0.0004, 0.012, 5) * 0.35
    thock = band(noise, 180 * pitch, 900 * pitch) * env(n, 0.001, 0.045, 3) * 1.0
    body = np.sin(2 * np.pi * 240 * pitch * tt) * env(n, 0.001, 0.03, 4) * 0.25
    lag = int((0.05 + 0.01 * rng.random()) * RATE)
    up = np.zeros(n)
    up[lag:] = (band(rng.standard_normal(n - lag), 2000, 6000) * env(n - lag, 0.0003, 0.01, 5)) * 0.12
    x = top + thock + body + up
    x = sosfilt(butter(2, 6500, btype="low", fs=RATE, output="sos"), x)
    return (x / np.max(np.abs(x)) * 0.5).astype(np.float32)


if __name__ == "__main__":
    for i, (seed, pitch) in enumerate([(21, 1.0), (22, 1.06), (23, 0.95), (24, 1.03)], start=1):
        sf.write(os.path.join(OUT, f"key_{i}.wav"), key(seed, pitch), RATE)
        print(f"key_{i}")
