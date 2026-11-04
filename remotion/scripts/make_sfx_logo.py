"""Sounds for the animated logo: swoop (stereo, pans with the dot), brush paint, land, hop,
bounce, splash. Synthesised, so they are Offload's own.

  python3 scripts/make_sfx_logo.py   -> public/sfx/logo_*.wav
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

R = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
rng = np.random.default_rng(7)
T = lambda s: np.arange(int(s * R)) / R
bp = lambda x, lo, hi, o=2: sosfilt(butter(o, [lo, hi], btype="band", fs=R, output="sos"), x)
lp = lambda x, f, o=4: sosfilt(butter(o, f, btype="low", fs=R, output="sos"), x)
hp = lambda x, f, o=2: sosfilt(butter(o, f, btype="high", fs=R, output="sos"), x)


def norm(x, peak=0.9):
    return x / (np.max(np.abs(x)) + 1e-9) * peak


def fade(x, a=0.004, r=0.02):
    n = len(x); e = np.ones(n)
    ai, ri = int(a * R), int(r * R)
    if ai: e[:ai] = np.linspace(0, 1, ai)
    if ri: e[-ri:] = np.linspace(1, 0, ri)
    return x * (e[:, None] if x.ndim == 2 else e)


def sweep(sec, f0, fm, f1, width=0.5):
    n = int(sec * R); noise = rng.standard_normal(n); out = np.zeros(n)
    B = 64; ed = np.linspace(0, n, B + 1).astype(int)
    for i in range(B):
        u = i / (B - 1)
        f = f0 * (fm / f0) ** (u / 0.6) if u < 0.6 else fm * (f1 / fm) ** ((u - 0.6) / 0.4)
        s, e = ed[i], ed[i + 1]; pad = 2048
        seg = noise[max(0, s - pad):min(n, e + pad)]
        y = bp(seg, max(60, f * (1 - width)), min(R / 2 - 200, f * (1 + width)))
        o = s - max(0, s - pad); out[s:e] = y[o:o + e - s]
    return out


def swoop():
    sec = 0.62; t = T(sec); u = t / sec
    body = sweep(sec, 260, 2600, 700, 0.55)
    env = np.exp(-((u - 0.72) / 0.22) ** 2)                  # swell into the landing
    air = hp(rng.standard_normal(len(t)), 5000) * 0.18 * env
    tone = np.sin(2 * np.pi * np.cumsum(180 + 520 * u) / R) * 0.12 * env
    x = (body * env + air + tone)
    pan = np.clip(1 - u * 1.3, 0, 1)                          # right to left
    st = np.stack([x * np.sqrt(1 - pan), x * np.sqrt(pan)], 1)
    return fade(norm(st, 0.85), 0.01, 0.06)


def paint():
    sec = 0.7; t = T(sec); u = t / sec
    n = len(t); grains = np.zeros(n)
    for _ in range(900):                                       # bristles
        i = rng.integers(0, n - 400); L = rng.integers(60, 380)
        grains[i:i + L] += rng.standard_normal(L) * np.hanning(L) * rng.uniform(0.3, 1)
    x = bp(grains, 1400, 7000) * 0.8 + bp(rng.standard_normal(n), 300, 1400) * 0.25
    env = np.minimum(1, u * 8) * (1 - u) ** 0.6 * (0.8 + 0.2 * np.sin(u * 30))
    return fade(norm(x * env, 0.7), 0.01, 0.05)


def thump(f0=150, f1=60, sec=0.35, click=0.5):
    t = T(sec); f = f1 + (f0 - f1) * np.exp(-t * 30)
    body = np.sin(2 * np.pi * np.cumsum(f) / R) * np.exp(-t * 14)
    c = hp(rng.standard_normal(len(t)), 2500) * np.exp(-t * 400) * click
    return fade(norm(body + c, 0.9), 0.001, 0.05)


def hop():
    sec = 0.22; t = T(sec); u = t / sec
    f = 320 * (2.4 ** u)
    x = np.sin(2 * np.pi * np.cumsum(f) / R) * np.sin(np.pi * u) ** 0.8
    x += 0.25 * np.sin(2 * np.pi * np.cumsum(f * 2) / R) * np.sin(np.pi * u)
    return fade(norm(x, 0.6), 0.004, 0.03)


def bounce():
    a = thump(220, 70, 0.4, 0.7)
    t = T(0.4); pop = np.sin(2 * np.pi * np.cumsum(900 * np.exp(-t * 18) + 300) / R) * np.exp(-t * 35) * 0.5
    return fade(norm(a + pop, 0.9))


def splash():
    sec = 1.2; t = T(sec); n = len(t)
    wash = bp(rng.standard_normal(n), 350, 4200) * np.exp(-t * 4.2) * np.minimum(1, t * 60)
    hiss = hp(rng.standard_normal(n), 6000) * np.exp(-t * 6) * 0.25
    bubbles = np.zeros(n)
    for _ in range(140):                                      # droplets: tiny rising chirps
        s = int(abs(rng.normal(0.12, 0.18)) * R)
        L = int(rng.uniform(0.012, 0.04) * R)
        if s + L >= n: continue
        f0 = rng.uniform(500, 2600); tt = np.arange(L) / R
        ch = np.sin(2 * np.pi * np.cumsum(f0 * (1 + 2.5 * tt / tt[-1])) / R) * np.hanning(L)
        bubbles[s:s + L] += ch * rng.uniform(0.2, 0.7) * np.exp(-s / R * 2.5)
    whomp = np.sin(2 * np.pi * np.cumsum(55 + 90 * np.exp(-t * 12)) / R) * np.exp(-t * 7) * 0.8
    x = wash * 0.8 + hiss + bubbles * 0.6 + whomp
    # a little stereo width
    d = int(0.011 * R)
    st = np.stack([x, np.concatenate([np.zeros(d), x[:-d]]) * 0.92 + bubbles * 0.08], 1)
    return fade(norm(st, 0.9), 0.002, 0.15)


os.makedirs(OUT, exist_ok=True)
for name, fn in {"logo_swoop": swoop, "logo_paint": paint, "logo_land": lambda: thump(170, 62, 0.35, 0.4), "logo_hop": hop, "logo_bounce": bounce, "logo_splash": splash}.items():
    sf.write(os.path.join(OUT, name + ".wav"), fn(), R, subtype="PCM_16")
    print(name)
