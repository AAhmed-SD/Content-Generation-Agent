"""Word sounds: one per word as it lands on screen. Short, clean UI pops; key words get the
sound of their move.

  python3 scripts/make_sfx_words.py   -> public/sfx/w_*.wav
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

R = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
rng = np.random.default_rng(5)
T = lambda s: np.arange(int(s * R)) / R
hp = lambda x, f: sosfilt(butter(2, f, btype="high", fs=R, output="sos"), x)
lp = lambda x, f: sosfilt(butter(4, f, btype="low", fs=R, output="sos"), x)
bp = lambda x, a, b: sosfilt(butter(2, [a, b], btype="band", fs=R, output="sos"), x)


def out(x, peak=0.9):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    f = int(0.004 * R); x[-f:] *= np.linspace(1, 0, f)
    return x


def pop(f0, sec=0.075):
    """A bubble pop: pitch falls fast, round body, tiny click on top."""
    t = T(sec); f = f0 * (1 + 0.9 * np.exp(-t * 90))
    body = np.sin(2 * np.pi * np.cumsum(f) / R) * np.exp(-t * 55)
    click = hp(rng.standard_normal(len(t)), 3000) * np.exp(-t * 900) * 0.25
    return out(body + click, 0.8)


def slam():
    t = T(0.32); f = 55 + 140 * np.exp(-t * 35)
    body = np.sin(2 * np.pi * np.cumsum(f) / R) * np.exp(-t * 11)
    snap = bp(rng.standard_normal(len(t)), 1500, 7000) * np.exp(-t * 120) * 0.7
    return out(body + snap, 0.95)


def bounce():
    """Three pops getting quicker and higher: the letters settling."""
    x = np.zeros(int(0.42 * R))
    for i, (at, f0, v) in enumerate([(0.0, 520, 1.0), (0.17, 700, 0.6), (0.29, 880, 0.35)]):
        p = pop(f0, 0.08) * v; s = int(at * R); x[s:s + len(p)] += p
    return out(x, 0.85)


def drop():
    t = T(0.2); f = 300 + 900 * np.exp(-t * 28)
    body = np.sin(2 * np.pi * np.cumsum(f) / R) * np.exp(-t * 22)
    return out(body + lp(rng.standard_normal(len(t)), 1200) * np.exp(-t * 60) * 0.2, 0.85)


def swish():
    t = T(0.3); u = t / 0.3
    x = bp(rng.standard_normal(len(t)), 900, 5000) * np.sin(np.pi * u) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(600 + 900 * u) / R) * np.sin(np.pi * u) * 0.15
    return out(x + tone, 0.7)


def shake():
    t = T(0.35)
    x = np.sign(np.sin(2 * np.pi * 34 * t)) * bp(rng.standard_normal(len(t)), 200, 2500) * np.exp(-t * 7)
    return out(x, 0.75)


sounds = {f"w_pop{i}": (lambda f=f: pop(f)) for i, f in enumerate([760, 860, 960, 1080, 1200])}
sounds.update({"w_slam": slam, "w_bounce": bounce, "w_drop": drop, "w_swish": swish, "w_shake": shake})
for name, fn in sounds.items():
    sf.write(os.path.join(OUT, name + ".wav"), fn(), R, subtype="PCM_16"); print(name)
