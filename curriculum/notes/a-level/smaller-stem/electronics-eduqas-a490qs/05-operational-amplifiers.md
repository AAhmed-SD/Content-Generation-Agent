---
level: A-level
subject: Electronics
topic: "C1.3 Operational amplifiers"
as_content: "AS and A level."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.3(a)", "C1.3(b)", "C1.3(c)", "C1.3(d)", "C1.3(e)", "C1.3(f)", "C1.3(g)", "C1.3(h)", "C1.3(i)", "C1.3(j)", "C1.3(k)", "C1.3(l)", "C1.3(m)", "C1.3(n)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.3 Operational amplifiers

An operational amplifier (op-amp) is a high-gain differential amplifier: its output depends on the difference between its two inputs. With feedback resistors it becomes a precise amplifier; without feedback it is a comparator. GCSE background: [GCSE Electronics 07](../../../gcse/smaller-stem/electronics-eduqas/07-operational-amplifiers.md).

Equations to select and apply: G = Vout/Vin; non-inverting G = 1 + RF/R1; inverting G = −RF/RIN; summing Vout = −RF(V1/R1 + V2/R2 + ...); comparator Vout = +VS if V+ > V−, −VS if V+ < V−; follower Vout = Vin; slew rate = ΔVout/Δt; minimum slew rate for an undistorted sine = 2πf VP.

## C1.3(a) Ideal and real op-amps

| Property | Ideal | Typical real op-amp |
| --- | --- | --- |
| Open-loop gain | Infinite | 10⁵ to 10⁶ at DC, falling with frequency |
| Input resistance | Infinite (no input current) | 10⁶ Ω (bipolar) to 10¹² Ω (FET input) |
| Output resistance | Zero | Tens of ohms |
| Bandwidth | Infinite | Limited (gain-bandwidth product about 1 MHz) |
| Slew rate | Infinite | About 0.5 to 15 V µs⁻¹ |
| Output swing | To the supply rails | Saturates about 1 to 2 V inside the rails (less for rail-to-rail types) |

## C1.3(b) Negative feedback and the virtual earth

With negative feedback (output connected back to the inverting input), the very high open-loop gain forces the difference between V+ and V− to be almost zero, as long as the output is not saturated. If V+ is at 0 V, V− is also held at almost 0 V: a **virtual earth**. No current flows into the inputs. These two rules let you analyse all the feedback circuits.

## C1.3(c), (d), (i) Comparators

Without feedback, the enormous open-loop gain drives the output to saturation: Vout = +VS (positive saturation) when V+ > V−, and −VS when V+ < V−. One input receives the sensor voltage (from a divider) and the other a reference voltage (from a potentiometer divider). Swapping the inputs inverts the action.

### Worked example

Frost alarm: thermistor divider into V−; reference 4.0 V into V+. When it is cold the thermistor resistance rises; if the divider output (V−) falls below 4.0 V, V+ > V−, so the output goes high and switches on the alarm via a transistor.

## C1.3(e) Bridge circuits

A Wheatstone bridge has two voltage dividers side by side across the same supply. It is **balanced** when the two divider outputs are equal: R1/R2 = R3/R4 (with matching positions). At balance the voltage difference between the midpoints is zero. A small change in one resistance (a sensor) unbalances it, giving a small difference voltage centred on zero, which a comparator or difference amplifier detects. This removes the effect of supply changes, as both sides change together. More in [10](10-instrumentation-systems.md).

## C1.3(f), (g), (h), (i) Amplifier circuits

**Voltage gain** G = Vout/Vin (no units; negative for an inverting amplifier).

| Circuit | Gain or output | Input resistance | Notes |
| --- | --- | --- | --- |
| Non-inverting | G = 1 + RF/R1 | Very high (signal goes straight into V+) | Output in phase with input |
| Inverting | G = −RF/RIN | Equal to RIN (V− is a virtual earth) | Output inverted (180° out of phase) |
| Summing (inverting) | Vout = −RF(V1/R1 + V2/R2 + ...) | Each input sees its own resistor | Adds signals; used in mixers and DACs |
| Voltage follower | Vout = Vin (G = 1) | Very high | Output resistance very low: a buffer |

**Derivation for the inverting amplifier**: V− = 0 (virtual earth). Current through RIN = Vin/RIN. No current enters the op-amp, so the same current flows through RF: (0 − Vout)/RF = Vin/RIN, giving Vout/Vin = −RF/RIN.

**Saturation**: the output cannot exceed about the supply voltages. If G × Vin exceeds this, the output clips.

## C1.3(j) Input impedance

The input impedance of the circuit depends on the configuration: the non-inverting amplifier and the follower present the op-amp's very high input resistance to the signal source, so they do not load it; the inverting amplifier's input impedance is just RIN. To amplify a signal from a high-resistance source (for example a sensor divider), use a non-inverting amplifier or follower.

## C1.3(k), (l) Bandwidth

### What you need to know

- Bandwidth is the frequency range over which the voltage gain is greater than 1/√2 of its maximum (the −3 dB points).
- Estimate bandwidth from a frequency response graph; use the gain-bandwidth product (unity-gain bandwidth).
- Design single-stage amplifiers for a given gain or bandwidth.

### Explained

The open-loop gain of an op-amp falls as frequency rises (about 10 times per decade above a low corner frequency). The product of gain and bandwidth is roughly constant: the **gain-bandwidth product** (GBP), equal to the frequency at which the gain falls to 1 (unity-gain bandwidth). For a closed-loop amplifier, bandwidth ≈ GBP ÷ closed-loop gain. So high gain means low bandwidth; to get both, use several stages ([18](18-audio-systems.md)).

On a frequency response graph (gain against log frequency), find the maximum gain, multiply by 0.707, and read off the frequency where the gain falls to that value.

### Worked example

GBP = 1 MHz. A non-inverting amplifier with gain 50 has bandwidth ≈ 1 000 000 ÷ 50 = 20 kHz. Design: G = 1 + RF/R1 = 50, so RF/R1 = 49; with R1 = 1.0 kΩ, RF = 49 kΩ; nearest E24 47 kΩ (G = 48) or 51 kΩ (G = 52).

For a bandwidth of at least 100 kHz with this op-amp, maximum gain = 10 per stage.

## C1.3(m), (n) Distortion: clipping and slew rate

- **Clipping**: if the output would exceed the saturation voltage, the tops of the waveform are cut flat. Avoid by reducing gain or input amplitude.
- **Slew rate**: the maximum rate of change of the output voltage (V µs⁻¹). A sine wave of peak VP and frequency f has a maximum rate of change of 2πfVP. If this exceeds the slew rate, the output cannot keep up: sine waves turn triangular and square-wave edges become slopes. Condition for no slew-rate distortion: slew rate ≥ 2πfVP.

### Worked example

An op-amp with slew rate 0.5 V µs⁻¹ (5 × 10⁵ V s⁻¹) outputs a sine of 10 V peak. Maximum undistorted frequency f = SR ÷ (2πVP) = 5 × 10⁵ ÷ (2π × 10) = 7.96 kHz.

### Common mistakes

- Forgetting the minus sign for inverting gain.
- Using G = RF/R1 for a non-inverting amplifier (it is 1 + RF/R1).
- Assuming a comparator output reaches exactly the supply voltage.
- Confusing bandwidth limits with slew-rate limits (bandwidth applies to small signals; slew rate to large, fast signals).

## Check questions

1. List four properties of an ideal op-amp. (2)
2. Explain what is meant by a virtual earth and when it applies. (2)
3. A comparator has V+ = 2.5 V and V− from a divider that is 3.1 V. The supply is ±9 V. State the output. (1)
4. Calculate the output of an inverting amplifier with RIN = 10 kΩ, RF = 68 kΩ and Vin = 0.25 V. (2)
5. Design a non-inverting amplifier with a gain of about 23 using E24 values. (3)
6. A summing amplifier has RF = 20 kΩ, R1 = 10 kΩ, R2 = 40 kΩ. V1 = 0.5 V, V2 = 1.0 V. Calculate Vout. (2)
7. Explain why a voltage follower is used between a sensor divider and a low-resistance load. (2)
8. An op-amp has GBP 3 MHz. Calculate the bandwidth of an amplifier with gain 150, and suggest how to obtain gain 150 with a bandwidth of at least 100 kHz. (3)
9. Calculate the minimum slew rate needed to amplify a 20 kHz sine wave to 8 V peak without distortion. (2)

## Mark scheme

1. Any four: infinite open-loop gain; infinite input resistance; zero output resistance; infinite bandwidth; infinite slew rate (2; 1 for two).
2. With negative feedback and unsaturated output, V+ ≈ V− (1); if V+ is at 0 V, V− is held at 0 V though not connected to it (1).
3. V+ < V− so output at negative saturation (about −9 V, in practice a little less) (1).
4. G = −6.8 (1); Vout = −1.7 V (1).
5. RF/R1 = 22 (1); e.g. R1 = 1.0 kΩ, RF = 22 kΩ (1); G = 23 (1).
6. Vout = −20 × (0.5/10 + 1.0/40) = −20 × 0.075 (1) = −1.5 V (1).
7. Very high input impedance so it does not load the divider (1); very low output impedance so it can drive the load (1).
8. 3 MHz ÷ 150 = 20 kHz (1); use two stages, e.g. gains of 10 and 15 (1); bandwidths 300 kHz and 200 kHz, both above 100 kHz (1).
9. SR = 2π × 20 000 × 8 (1) = 1.0 × 10⁶ V s⁻¹ = 1.0 V µs⁻¹ (1).
