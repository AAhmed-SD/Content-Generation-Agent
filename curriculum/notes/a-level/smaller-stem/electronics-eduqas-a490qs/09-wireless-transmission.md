---
level: A-level
subject: Electronics
topic: "C1.7 Wireless transmission: the radio spectrum, AM and FM"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.7(a)", "C1.7(b)", "C1.7(c)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.7 Wireless transmission

Radio carries information through space without wires. A high-frequency carrier wave is modulated by the information signal: its amplitude (AM) or frequency (FM) is varied. The general communication ideas are in [08](08-communications-systems.md); tuned circuits in [07](07-ac-circuits-and-passive-filters.md).

Equations to select and apply: depth of modulation m = (Vmax − Vmin)/(Vmax + Vmin) × 100%; modulation index β = Δfc/fi (carrier frequency deviation ÷ modulating frequency); FM bandwidth = 2(Δfc + fi) = 2(1 + β)fi; c = fλ.

## C1.7(a) The radio spectrum

### What you need to know

Uses of different regions of the radio spectrum for data transmission, including bandwidth needs and available channels.

### Explained

| Band | Frequency | Wavelength | Propagation | Uses |
| --- | --- | --- | --- | --- |
| LF (long wave) | 30 to 300 kHz | 10 to 1 km | Ground wave, follows the Earth's curve, long range | Long-wave AM broadcasting, time signals |
| MF (medium wave) | 300 kHz to 3 MHz | 1 km to 100 m | Ground wave by day; sky wave at night | AM broadcasting |
| HF (short wave) | 3 to 30 MHz | 100 to 10 m | Sky wave: reflected by the ionosphere, worldwide | International broadcasting, amateur, aircraft |
| VHF | 30 to 300 MHz | 10 to 1 m | Line of sight (space wave) | FM radio, DAB, emergency services |
| UHF | 300 MHz to 3 GHz | 1 m to 10 cm | Line of sight | Television, mobile phones, Wi-Fi, Bluetooth |
| SHF (microwave) | 3 to 30 GHz | 10 to 1 cm | Line of sight; passes through the ionosphere | Satellite links, radar, 5G, Wi-Fi |

Key points:

- Higher carrier frequencies have more spectrum available, so wider channels (high data rates) and more channels are possible. Low-frequency bands are crowded and can carry only narrow-band signals.
- Low frequencies travel further by ground or sky wave; high frequencies need line of sight (masts, satellites) but allow small aerials (aerial length is related to wavelength, for example a half-wave dipole).
- Spectrum is limited and shared, so it is allocated by regulators to avoid interference.

### Worked example

The wavelength of a 97.6 MHz FM signal: λ = c/f = 3.0 × 10⁸ ÷ 97.6 × 10⁶ = 3.07 m; a half-wave dipole is about 1.5 m long.

## C1.7(b), (c) AM and FM

### What you need to know

- Describe and explain AM and FM; calculate depth of modulation, modulation index and FM bandwidth.
- Sketch and analyse waveforms of a sinusoidal carrier amplitude- and frequency-modulated by a single audio frequency.

### Explained

**Amplitude modulation (AM)**: the carrier amplitude varies in step with the instantaneous value of the audio signal; the carrier frequency stays constant. The outline of the waveform (the envelope) has the shape of the audio signal.

- Depth of modulation m = (Vmax − Vmin)/(Vmax + Vmin) × 100%, where Vmax and Vmin are the largest and smallest amplitudes of the modulated carrier. m must stay below 100%, or the envelope distorts (overmodulation).
- Spectrum: modulating a carrier fc with a single audio frequency fi gives the carrier plus two side frequencies at fc − fi and fc + fi. A band of audio frequencies gives two sidebands. Bandwidth = 2 × highest audio frequency.
- Advantages: simple, cheap receivers; narrow bandwidth; long range at LF and MF. Disadvantages: noise and interference add directly to the amplitude, so poorer quality; inefficient (most power in the carrier).

**Frequency modulation (FM)**: the carrier frequency varies in step with the audio signal; the amplitude stays constant.

- The amount the frequency changes is the frequency deviation Δfc, proportional to the audio amplitude. The rate at which it changes equals the audio frequency fi.
- Modulation index β = Δfc/fi.
- Bandwidth (Carson's rule) ≈ 2(Δfc + fi) = 2(1 + β)fi. FM needs much more bandwidth than AM, so it uses VHF.
- Advantages: noise mainly affects amplitude, which the receiver ignores (limiting), so much better quality and SNR; constant amplitude allows efficient transmitters. Disadvantages: wide bandwidth, more complex circuits, line-of-sight range.

**Waveforms**:

- AM: a fast carrier inside a slowly varying envelope; peaks of the envelope where the audio is at its positive peak.
- FM: constant amplitude, the waves bunch closer together (higher frequency) where the audio is positive and spread apart where it is negative.

### Worked example

AM: an oscilloscope shows the modulated carrier with maximum peak-to-peak 12 V and minimum 4 V. m = (12 − 4)/(12 + 4) × 100 = 50%.

FM: broadcast FM with maximum deviation 75 kHz and audio up to 15 kHz: β = 75/15 = 5; bandwidth = 2(75 + 15) = 180 kHz (stations are spaced 200 kHz apart).

### Common mistakes

- Saying FM changes the amplitude of the carrier.
- Using AM bandwidth = highest audio frequency (it is twice).
- Allowing modulation depth above 100%.

## Check questions

1. Calculate the wavelength of a 198 kHz long-wave transmission. (1)
2. Explain why mobile phones use UHF rather than LF. (3)
3. Explain why short-wave radio can be received around the world. (2)
4. Sketch an amplitude-modulated carrier for a single-frequency audio signal and label the envelope. (2)
5. An AM waveform has maximum amplitude 9 V and minimum 3 V. Calculate the depth of modulation. (2)
6. A carrier at 600 kHz is amplitude modulated by audio from 50 Hz to 4.5 kHz. State the frequencies occupied and the bandwidth. (2)
7. An FM signal has deviation 10 kHz with an audio tone of 2.5 kHz. Calculate β and the bandwidth. (3)
8. Compare AM and FM for broadcasting music. (4)

## Mark scheme

1. λ = 3 × 10⁸ ÷ 198 000 = 1515 m (1).
2. More bandwidth available so high data rates / many users (1); short wavelength so small aerials in handsets (1); line-of-sight range suits cells, allowing frequency reuse (1).
3. Sky wave (1); reflected by the ionosphere and ground repeatedly (1).
4. Constant-frequency carrier with varying amplitude (1); envelope following the audio waveform labelled (1).
5. (9 − 3)/(9 + 3) × 100 (1) = 50% (1).
6. 595.5 to 604.5 kHz (sidebands either side of 600 kHz) (1); bandwidth 9 kHz (1).
7. β = 10/2.5 = 4 (1); bandwidth = 2(10 + 2.5) (1) = 25 kHz (1).
8. FM better quality / less noise because receiver ignores amplitude changes (1); FM needs wider bandwidth so VHF, limited line-of-sight range (1); AM narrow bandwidth, longer range at LF / MF (1); AM simpler receivers but noisier (1).
