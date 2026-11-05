"""Phone and police sounds, synthesised like make_sfx.py: no samples, no licences.

  ../tools/.venv/bin/python -I scripts/make_sfx_phone.py   -> public/sfx/{msg_ping,msg_send,siren,shutter,cell_slam}.wav

msg_ping is an original two-note glass ping that reads as "a message arrived". It is not Apple's sound:
never use a platform's own alert sound in an advert.
"""
import os

import numpy as np
import soundfile as sf
from scipy.signal import butter, fftconvolve, sosfilt

RATE = 48000
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "sfx")
rng = np.random.default_rng(7)


def t(s):
    return np.arange(int(s * RATE)) / RATE


def decay(n, attack, tau):
    a = int(attack * RATE)
    e = np.exp(-np.arange(n) / (tau * RATE))
    if a:
        e[:a] *= np.linspace(0, 1, a) ** 2
    return e


def band(x, lo, hi, order=4):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=RATE, output="sos"), x)


def lowpass(x, hz, order=4):
    return sosfilt(butter(order, hz, btype="low", fs=RATE, output="sos"), x)


def room(x, size=0.25, wet=0.18):
    n = int(size * RATE)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / (0.06 * RATE))
    return x + wet * fftconvolve(x, lowpass(ir, 6000))[: len(x)] / max(1e-9, np.max(np.abs(ir)))


def bell(f, s, tau):
    """A soft glassy tone: a sine, its octave, and one inharmonic partial."""
    x = t(s)
    tone = np.sin(2 * np.pi * f * x) + 0.28 * np.sin(2 * np.pi * 2 * f * x) + 0.12 * np.sin(2 * np.pi * 2.76 * f * x) * np.exp(-x / 0.05)
    return tone * decay(len(x), 0.002, tau)


def place(total, parts):
    out = np.zeros(int(total * RATE))
    for at, sig in parts:
        i = int(at * RATE)
        out[i : i + len(sig)] += sig[: len(out) - i]
    return out


def save(name, x, spread=0.15):
    x = x / max(1e-9, np.max(np.abs(x))) * 0.9
    st = np.stack([x, np.roll(x, int(spread * 0.001 * RATE))], 1)
    sf.write(os.path.join(OUT, f"{name}.wav"), st.astype(np.float32), RATE)
    print(name, f"{len(x) / RATE:.2f}s")


def main():
    os.makedirs(OUT, exist_ok=True)
    # a message arrives: two quick rising glass notes
    save("msg_ping", room(place(0.9, [(0.0, bell(1568, 0.6, 0.12)), (0.085, bell(2093, 0.8, 0.2))]), wet=0.12))
    # a message sent: a short upward swish into a soft pop
    x = t(0.22)
    sw = band(rng.standard_normal(len(x)), 1200, 5000, 2) * np.sin(np.pi * x / 0.22) ** 2 * 0.25
    pop = np.sin(2 * np.pi * (500 + 900 * x) * x) * decay(len(x), 0.001, 0.03)
    save("msg_send", room(place(0.35, [(0.0, sw), (0.14, pop)]), wet=0.08))
    # a UK two-tone siren, passing: hi-lo, slightly detuned, swelling then fading
    s = 3.2
    x = t(s)
    tone = np.where((x // 0.5) % 2 == 0, 960.0, 720.0)
    tone = lowpass(tone, 12) * (1 + 0.004 * np.sin(2 * np.pi * 6 * x))
    ph = 2 * np.pi * np.cumsum(tone) / RATE
    wave = sum(np.sin(k * ph) / k for k in (1, 3, 5, 7))
    swell = np.sin(np.pi * np.clip(x / s, 0, 1)) ** 1.3
    save("siren", room(lowpass(wave, 4200) * swell, size=0.5, wet=0.35))
    # a camera shutter: two clicks and a small mechanical thunk
    def click(s2):
        n = rng.standard_normal(int(s2 * RATE))
        return band(n, 2000, 7000) * decay(len(n), 0.0005, 0.006)
    thunk = np.sin(2 * np.pi * 140 * t(0.08)) * decay(int(0.08 * RATE), 0.001, 0.02)
    save("shutter", room(place(0.25, [(0.0, click(0.03)), (0.0, 0.5 * thunk), (0.055, 0.8 * click(0.03))]), wet=0.1))
    # cell bars: a metal clang with a low thud
    x = t(1.8)
    partials = [(196, 1.0, 0.9), (311, 0.7, 0.7), (523, 0.5, 0.5), (877, 0.35, 0.35), (1318, 0.25, 0.25), (2203, 0.15, 0.15)]
    clang = sum(a * np.sin(2 * np.pi * f * x + rng.uniform(0, 6)) * np.exp(-x / tau) for f, a, tau in partials)
    hit = band(rng.standard_normal(len(x)), 800, 6000) * decay(len(x), 0.0005, 0.02)
    thud = np.sin(2 * np.pi * 55 * x) * decay(len(x), 0.002, 0.18)
    save("cell_slam", room(0.6 * clang + 0.8 * hit + 0.9 * thud, size=0.6, wet=0.3))


main()
