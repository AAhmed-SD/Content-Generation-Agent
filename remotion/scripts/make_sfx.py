"""Synthesise the story videos' sound effects. No samples, no licences: every sound is built
from noise and sine waves, so the kit is Offload's own.

  python3 scripts/make_sfx.py      -> public/sfx/*.wav
"""

import os

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

RATE = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
rng = np.random.default_rng(11)


def t(seconds):
    return np.arange(int(seconds * RATE)) / RATE


def env(n, attack, release, curve=3.0):
    """Attack then exponential-ish release, both in seconds."""
    a = int(attack * RATE)
    e = np.ones(n)
    if a:
        e[:a] = np.linspace(0, 1, a) ** 2
    r = np.linspace(1, 0, n - a) ** curve
    e[a:] = r
    return e


def band(x, lo, hi, order=4):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=RATE, output="sos"), x)


def lowpass(x, hz, order=4):
    return sosfilt(butter(order, hz, btype="low", fs=RATE, output="sos"), x)


def highpass(x, hz, order=4):
    return sosfilt(butter(order, hz, btype="high", fs=RATE, output="sos"), x)


def sweep_noise(seconds, f0, f1, width=0.6, peak_at=0.55):
    """Noise through a band that sweeps from f0 to f1: the body of a whoosh."""
    n = int(seconds * RATE)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    blocks = 48
    edges = np.linspace(0, n, blocks + 1).astype(int)
    for i in range(blocks):
        s, e = edges[i], edges[i + 1]
        pad = 2048
        seg = noise[max(0, s - pad):min(n, e + pad)]
        f = f0 * (f1 / f0) ** (i / (blocks - 1))
        filt = band(seg, max(40, f * (1 - width)), min(RATE / 2 - 100, f * (1 + width)), 2)
        off = s - max(0, s - pad)
        out[s:e] = filt[off:off + (e - s)]
    # Swell then fall
    x = np.linspace(0, 1, n)
    shape = np.where(x < peak_at, (x / peak_at) ** 2, ((1 - x) / (1 - peak_at)) ** 1.6)
    return out * shape


def norm(x, peak=0.9):
    m = np.max(np.abs(x)) or 1.0
    return x / m * peak


def stereo(x, spread=0.0):
    if spread == 0:
        return np.stack([x, x], axis=1)
    pan = np.linspace(-spread, spread, len(x))
    return np.stack([x * (1 - np.clip(pan, 0, 1)), x * (1 + np.clip(pan, -1, 0))], axis=1)


def save(name, x, spread=0.0):
    os.makedirs(OUT, exist_ok=True)
    sf.write(os.path.join(OUT, f"{name}.wav"), stereo(norm(x), spread).astype(np.float32), RATE)
    print(name, f"{len(x) / RATE:.2f}s")


def main():
    # Transitions
    save("whoosh", sweep_noise(0.42, 300, 3800, 0.5, 0.6), spread=0.6)
    save("whip", sweep_noise(0.22, 900, 7000, 0.45, 0.45) + 0.4 * sweep_noise(0.22, 200, 900, 0.5, 0.5), spread=0.9)
    save("swoosh_down", sweep_noise(0.36, 4200, 400, 0.5, 0.35))
    air = sweep_noise(0.55, 150, 1200, 0.7, 0.75)
    save("iris", air + 0.3 * np.sin(2 * np.pi * 220 * t(0.55)) * env(int(0.55 * RATE), 0.3, 0.25))

    # Impacts
    d = t(0.32)
    body = np.sin(2 * np.pi * (95 * np.exp(-d * 9) + 45) * d) * env(len(d), 0.002, 0.3, 2.2)
    crack = highpass(rng.standard_normal(len(d)), 1500) * env(len(d), 0.0005, 0.04, 6) * 0.5
    save("thud", lowpass(body, 900) + crack)
    d = t(0.5)
    boom = np.sin(2 * np.pi * (70 * np.exp(-d * 6) + 38) * d) * env(len(d), 0.002, 0.48, 1.8)
    save("impact", lowpass(boom, 600) + 0.6 * band(rng.standard_normal(len(d)), 200, 3000) * env(len(d), 0.001, 0.12, 4))

    # Word landings
    d = t(0.09)
    save("pop", np.sin(2 * np.pi * (520 * np.exp(-d * 30) + 260) * d) * env(len(d), 0.001, 0.085, 3)
         + 0.25 * highpass(rng.standard_normal(len(d)), 3000) * env(len(d), 0.0003, 0.008, 4))
    d = t(0.12)
    save("pop_low", np.sin(2 * np.pi * (300 * np.exp(-d * 25) + 140) * d) * env(len(d), 0.001, 0.11, 2.5))
    d = t(0.035)
    save("click", band(rng.standard_normal(len(d)), 2500, 9000) * env(len(d), 0.0002, 0.03, 5))
    d = t(0.06)
    key = band(rng.standard_normal(len(d)), 1200, 6000) * env(len(d), 0.0003, 0.02, 6)
    key += 0.5 * np.sin(2 * np.pi * 1800 * d) * env(len(d), 0.0005, 0.03, 4)
    save("key", key)
    d = t(0.05)
    save("tick", band(rng.standard_normal(len(d)), 3000, 10000) * env(len(d), 0.0001, 0.02, 6)
         + 0.6 * np.sin(2 * np.pi * 3200 * d) * env(len(d), 0.0002, 0.025, 5))

    # The Offload moment: a bright two-note chime
    d = t(0.9)
    c1 = sum(a * np.sin(2 * np.pi * f * d) for f, a in ((1046.5, 1.0), (2093, 0.35), (3139.5, 0.12)))
    c2 = sum(a * np.sin(2 * np.pi * f * d) for f, a in ((1568, 0.9), (3136, 0.3)))
    e1 = env(len(d), 0.003, 0.85, 3)
    e2 = np.concatenate([np.zeros(int(0.09 * RATE)), env(len(d) - int(0.09 * RATE), 0.003, 0.8, 3)])
    save("chime", c1 * e1 * 0.6 + c2 * e2 * 0.6)

    # Pen on paper: scratchy noise with a fast wobble, for circles and marks
    d = t(0.55)
    scr = band(rng.standard_normal(len(d)), 1800, 7000) * (0.55 + 0.45 * np.sin(2 * np.pi * 11 * d) ** 2)
    save("scribble", scr * env(len(d), 0.02, 0.2, 1.5) * 0.8)

    # Paper sliding and lifting: soft, low, airy
    d = t(0.45)
    save("paper", band(rng.standard_normal(len(d)), 250, 2600) * env(len(d), 0.12, 0.3, 2) + 0.4 * sweep_noise(0.45, 400, 1500, 0.6, 0.4))

    # A sheet landing flat
    d = t(0.18)
    save("paper_land", lowpass(rng.standard_normal(len(d)), 1800) * env(len(d), 0.003, 0.16, 4))

    # Tension under the problem, released by the fix
    d = t(0.8)
    riser = sweep_noise(0.8, 200, 5000, 0.35, 0.92) + 0.25 * np.sin(2 * np.pi * (180 + 500 * d ** 2) * d) * (d / 0.8) ** 2
    save("riser", riser)

    # ---- Kit v2: more variety for text and transitions ----
    # A rubber stamp: dull low knock plus a papery slap
    d = t(0.22)
    knock = np.sin(2 * np.pi * (160 * np.exp(-d * 30) + 70) * d) * env(len(d), 0.001, 0.2, 3)
    slap = band(rng.standard_normal(len(d)), 600, 5000) * env(len(d), 0.0005, 0.05, 5)
    save("stamp", lowpass(knock, 1200) + 0.7 * slap)

    # Sparkle for a shine pass: quick ascending sine blips
    d = t(0.6)
    sp = np.zeros(len(d))
    for i, f in enumerate((2637, 3136, 3951, 5274)):
        o = int(i * 0.07 * RATE)
        dd = d[: len(d) - o]
        sp[o:] += np.sin(2 * np.pi * f * dd) * env(len(dd), 0.002, 0.35, 4) * (0.8 - i * 0.12)
    save("sparkle", sp, spread=0.5)

    # Card flip: two fast airy flaps
    d = t(0.28)
    flap = band(rng.standard_normal(len(d)), 500, 4000)
    fe = env(len(d), 0.004, 0.06, 4)
    fe2 = np.concatenate([np.zeros(int(0.11 * RATE)), env(len(d) - int(0.11 * RATE), 0.004, 0.08, 4)])
    save("flip", flap * (fe + 0.8 * fe2))

    # Soft swish for text coming in
    save("swish", sweep_noise(0.2, 1500, 6000, 0.4, 0.35) * 0.8, spread=0.4)

    # Deep boom: sub drop for the big reveals
    d = t(1.1)
    boom = np.sin(2 * np.pi * (55 * np.exp(-d * 2.5) + 32) * d) * env(len(d), 0.003, 1.05, 1.6)
    save("boom", lowpass(boom, 300) + 0.35 * lowpass(rng.standard_normal(len(d)), 400) * env(len(d), 0.001, 0.25, 3))

    # Reverse swell: rises into a hit
    d = t(0.7)
    rev = band(rng.standard_normal(len(d)), 2000, 12000) * (d / 0.7) ** 3
    save("reverse", rev + 0.3 * sweep_noise(0.7, 300, 2500, 0.5, 0.98))

    # Snap: a very short bright crack for quick text swaps
    d = t(0.06)
    save("snap", highpass(rng.standard_normal(len(d)), 2500) * env(len(d), 0.0002, 0.03, 7)
         + 0.5 * np.sin(2 * np.pi * 1400 * d) * env(len(d), 0.0002, 0.015, 6))

    # Notification ding: soft glassy single note
    d = t(0.7)
    ding = sum(a * np.sin(2 * np.pi * f * d) for f, a in ((1760, 1.0), (3520, 0.25), (5280, 0.08)))
    save("ding", ding * env(len(d), 0.002, 0.68, 4) * 0.7)


    # ---- Kit v3: story sounds ----
    # Phone alarm vibrating on a surface: low pulses
    d = t(0.9)
    gate = (np.sin(2 * np.pi * 7.5 * d) > 0).astype(float)
    buzz = (np.sign(np.sin(2 * np.pi * 150 * d)) * 0.6 + np.sin(2 * np.pi * 300 * d) * 0.4) * gate
    save("buzz", lowpass(buzz, 900) * env(len(d), 0.01, 0.2, 1.2))

    # Tape rewind: chirpy noise sweeping up fast
    d = t(0.75)
    tape = sweep_noise(0.75, 600, 9000, 0.25, 0.85)
    tape *= 0.7 + 0.3 * np.sin(2 * np.pi * (30 + 60 * d) * d)
    save("rewind", tape, spread=0.3)

    # Train: low rumble with a gentle clack
    d = t(2.4)
    rum = lowpass(rng.standard_normal(len(d)), 220) * 3
    clack = np.zeros(len(d))
    for c0 in (0.35, 0.55, 1.45, 1.65):
        i0 = int(c0 * RATE)
        dd = d[: int(0.06 * RATE)]
        clack[i0:i0 + len(dd)] += band(rng.standard_normal(len(dd)), 300, 2500) * env(len(dd), 0.001, 0.05, 4)
    save("rumble", (rum + 0.6 * clack) * env(len(d), 0.4, 0.8, 1.2))

    # Glass shatter: bright noise bursts and high ringing
    d = t(0.7)
    sh = band(rng.standard_normal(len(d)), 3000, 14000) * env(len(d), 0.0005, 0.35, 3)
    for f in (4200, 5800, 7300):
        sh += 0.25 * np.sin(2 * np.pi * f * d) * env(len(d), 0.001, 0.5, 4)
    save("shatter", sh, spread=0.6)

    # Soft glass tap for a card arriving
    d = t(0.25)
    save("glass", sum(a * np.sin(2 * np.pi * f * d) for f, a in ((2400, 0.6), (3700, 0.3))) * env(len(d), 0.001, 0.22, 5)
         + 0.3 * band(rng.standard_normal(len(d)), 2000, 8000) * env(len(d), 0.0005, 0.02, 5))


main()
