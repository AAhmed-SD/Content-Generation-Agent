---
level: A-level
subject: Electronics
topic: "C2.8 Audio systems"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.8(a)", "C2.8(b)", "C2.8(c)", "C2.8(d)", "C2.8(e)", "C2.8(f)", "C2.8(g)", "C2.8(h)", "C2.8(i)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.8 Audio systems

An audio system takes small signals from microphones or players, mixes and shapes them, and amplifies them to drive a loudspeaker. This file brings together op-amp amplifiers ([05](05-operational-amplifiers.md)), filters ([07](07-ac-circuits-and-passive-filters.md)) and transistors ([03](03-semiconductor-components.md)).

Equations to select and apply: break frequency fb = 1/(2πRC); push-pull maximum power PMAX = VS²/(8RL) (VS = total supply voltage); emitter follower VOUT ≈ VIN − 0.7; source follower VOUT ≈ VIN − 3. Also uses G = 1 + RF/R1, G = −RF/RIN and the summing amplifier.

## C2.8(a) Structure

Preamplifiers (one per input, raising small signals to a standard level) → mixer (combines inputs with adjustable levels) → tone controls (adjust bass and treble) → power amplifier (provides the current and power) → loudspeaker.

## C2.8(b) Multi-stage preamplifiers

A microphone gives only millivolts. High gain is needed, but an op-amp's bandwidth falls as gain rises (gain-bandwidth product). Splitting the gain over several stages gives the total gain (product of stage gains) while each stage keeps a wide bandwidth.

### Worked example

Gain 1000 needed with bandwidth at least 20 kHz; op-amp GBP 1 MHz. One stage: bandwidth = 1 MHz ÷ 1000 = 1 kHz (too low). Two stages of gain 31.6 each: bandwidth of each = 31.6 kHz. (Two identical stages give an overall bandwidth somewhat below each stage's, about 0.64 × 31.6 ≈ 20 kHz, so choose slightly lower gain per stage or three stages of 10 for margin: each 100 kHz.) Non-inverting stages of gain 10: RF = 9R1, for example R1 = 10 kΩ and RF = 91 kΩ (gain 10.1).

## C2.8(c) Mixers

An inverting summing amplifier ([05](05-operational-amplifiers.md)) adds the inputs: Vout = −RF(V1/R1 + V2/R2 + ...). Each input resistor (or a potentiometer before it) sets that channel's level. The virtual earth means the inputs do not interact (no crosstalk between sources).

### Worked example

RF = 47 kΩ, guitar input through 47 kΩ (gain −1), microphone through 4.7 kΩ (gain −10). Guitar 0.5 V and mic 0.05 V: Vout = −(0.5 + 0.5) = −1.0 V at the moment both are at these values.

## C2.8(d), (h) First-order active tone filters

### What you need to know

Describe and explain bass boost, treble boost, bass cut and treble cut filters based on an op-amp inverting amplifier; calculate the break frequency fb = 1/(2πRC); analyse and draw their response graphs.

### Explained

Put a capacitor in parallel or series with one of the gain resistors of an inverting amplifier. Because XC depends on frequency, the gain changes with frequency. The break frequency, where XC equals the resistor it is paired with, is fb = 1/(2πRC).

| Filter | Arrangement (inverting amplifier) | Effect |
| --- | --- | --- |
| Treble cut (low-pass) | Capacitor in parallel with RF | At high frequency XC is low, shorting RF, so gain falls: treble cut above fb = 1/(2πRF C) |
| Bass cut (high-pass) | Capacitor in series with RIN | At low frequency XC is high, adding to RIN, so gain falls: bass cut below fb = 1/(2πRIN C) |
| Bass boost | Capacitor in series with RF (with a resistor in parallel to limit the maximum gain) | At low frequency the feedback impedance rises, so gain rises: bass boosted below fb |
| Treble boost | Capacitor in parallel with RIN (with a series resistor to limit gain) | At high frequency the input impedance falls, so gain rises: treble boosted above fb |

Response graphs (gain in dB against log frequency): flat region, a break at fb, then a slope of 20 dB per decade (first order) up or down, levelling off where a limiting resistor takes over. Being active (op-amp based), these filters can boost as well as cut and have low output impedance, so they do not suffer from loading.

### Worked example

Treble cut: RF = 47 kΩ, required fb = 3 kHz. C = 1 ÷ (2π × 47 000 × 3000) = 1.13 nF; use 1.0 nF (fb = 3.4 kHz) or 1.2 nF (2.8 kHz).

## C2.8(e) Maximum power transfer

Maximum power is delivered to a load when the load resistance equals the internal (output) resistance of the source. Then half the power is wasted in the source, so the efficiency is 50%. For audio power amplifiers the aim is usually a very low output resistance driving the loudspeaker, but matching matters where a source has a fixed significant output resistance.

### Worked example

A source with emf 10 V and internal resistance 8 Ω: with an 8 Ω load, I = 10 ÷ 16 = 0.625 A, P = 0.625² × 8 = 3.1 W. With 4 Ω: I = 0.833 A, P = 2.8 W. With 16 Ω: I = 0.417 A, P = 2.8 W. Maximum at the matched value.

## C2.8(f) Emitter and source followers

- **Emitter follower**: npn transistor with load in the emitter; output follows input but about 0.7 V lower: VOUT ≈ VIN − 0.7. Voltage gain ≈ 1, but current gain is large (hFE), and output resistance is low, so it can drive a loudspeaker from a weak signal.
- **Source follower**: n-channel MOSFET with load in the source; VOUT ≈ VIN − 3 (taking threshold as 3 V in this spec). Very high input resistance.

A single follower conducts only when the input is above about 0.7 V (or 3 V), so on its own it can only amplify positive half-cycles (class A operation needs biasing and wastes power).

## C2.8(g), (h), (i) Push-pull amplifiers and crossover distortion

### Explained

A **push-pull** output stage uses a complementary pair: an npn and a pnp emitter follower (or an n-channel and p-channel MOSFET pair) with joined emitters (sources) driving the loudspeaker, on dual supplies (+VS/2 and −VS/2). The npn conducts on positive half-cycles, pushing current into the speaker; the pnp conducts on negative half-cycles, pulling current. Each transistor is off for half the cycle, so efficiency is high (class B).

Maximum output power (sine wave, ignoring losses) PMAX = VS²/(8RL), where VS is the total supply voltage (rail to rail) and RL the load.

**Crossover distortion**: when the input is between about −0.7 V and +0.7 V (or −3 V and +3 V for MOSFETs), neither transistor conducts, so the output stays at zero: a flat step at each zero crossing. Most noticeable at low volume.

**Removing it with negative feedback**: put the push-pull stage inside the feedback loop of an op-amp (feedback taken from the speaker output to the inverting input). When the output lags behind the input near zero, the op-amp output swings rapidly through the dead band, because of its high open-loop gain, so the output follows the input closely. (Biasing the transistors slightly on with diodes, class AB, is another method.)

**Waveforms** to draw: emitter follower output: input minus 0.7 V, with negative half-cycles missing for a single transistor; push-pull without feedback: sine with flat steps at zero; with feedback: clean sine.

### Worked example

Push-pull on ±12 V (VS = 24 V) into 8 Ω: PMAX = 24² ÷ (8 × 8) = 9 W. Peak output voltage 12 V, peak current 1.5 A.

### Common mistakes

- Using half the supply as VS in PMAX = VS²/8RL (use the total rail-to-rail voltage).
- Saying crossover distortion happens at the peaks (it is at zero crossings).
- Putting all the gain in one stage and losing bandwidth.

## Check questions

1. Draw a block diagram of a simple audio system and state the job of each block. (5)
2. Explain why a preamplifier with gain 400 might be built from two stages. (3)
3. Design a two-input mixer with gains −1 and −5 using RF = 100 kΩ. (2)
4. Draw a bass cut filter based on an inverting amplifier and calculate the capacitor for fb = 80 Hz with RIN = 10 kΩ. (4)
5. A source of emf 6 V and internal resistance 4 Ω drives a load. State the load for maximum power and calculate that power. (2)
6. An emitter follower has VIN = 5.0 V peak. State VOUT and explain its advantage. (3)
7. Calculate PMAX for a push-pull amplifier on ±15 V into 4 Ω. (2)
8. Explain the cause of crossover distortion and how negative feedback reduces it. (4)

## Mark scheme

1. Preamplifier: raises small signals (1); mixer: combines inputs (1); tone controls: adjust bass and treble (1); power amplifier: supplies power / current (1); loudspeaker: converts to sound (1).
2. GBP fixed so a single stage of gain 400 has narrow bandwidth (1); two stages of gain 20 each (1) give wider bandwidth per stage / overall (1).
3. R1 = 100 kΩ (gain −1) (1); R2 = 20 kΩ (gain −5) (1).
4. Capacitor in series with RIN at the inverting input, RF feedback (2); C = 1 ÷ (2π × 10⁴ × 80) (1) = 0.2 µF (use 220 nF) (1).
5. 4 Ω (1); I = 6 ÷ 8 = 0.75 A; P = 0.75² × 4 = 2.25 W (1).
6. 4.3 V peak (1); voltage gain about 1 but large current gain (1); low output resistance to drive a low-impedance load (1).
7. VS = 30 V (1); PMAX = 900 ÷ 32 = 28 W (1).
8. Transistors need about 0.7 V before conducting (1); near zero neither conducts so output flat (1); op-amp with feedback from the output compares output with input (1); high open-loop gain makes the op-amp output jump through the dead band, so the output follows the input (1).
