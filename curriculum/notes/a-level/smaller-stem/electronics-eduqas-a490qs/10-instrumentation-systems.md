---
level: A-level
subject: Electronics
topic: "C1.8 Instrumentation systems"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.8(a)", "C1.8(b)", "C1.8(c)", "C1.8(d)", "C1.8(e)", "C1.8(f)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.8 Instrumentation systems

Instrumentation measures physical quantities accurately: temperature, strain (force, weight, pressure), speed and position. This file covers the op-amp difference amplifier, bridge circuits with thermistors and strain gauges, and slotted and encoded discs with Gray code. Op-amp basics are in [05](05-operational-amplifiers.md); logic in [04](04-logic-systems.md).

Equation to select and apply: difference amplifier Vout = VDIFF × (RF/R1), where VDIFF = V+ − V−.

## C1.8(a), (b) Difference and instrumentation amplifiers

### What you need to know

Draw and recognise an op-amp difference amplifier; Vout = (V+ − V−) × RF/R1; analyse and design instrumentation amplifiers based on it.

### Explained

The difference amplifier uses four resistors: R1 from V− input signal to the inverting input, RF from output to the inverting input, R1 from the V+ input signal to the non-inverting input, and RF from the non-inverting input to 0 V. With matched resistor pairs, the output is proportional only to the difference between the two inputs: Vout = (V+ − V−) × RF/R1.

**Common-mode rejection**: any voltage common to both inputs (such as a change in supply affecting both sides of a bridge, or interference picked up equally on both wires) is cancelled. This makes it ideal for amplifying the small difference voltage from a bridge.

**Limitations and instrumentation amplifiers**: the input resistance is only about R1 (plus RF on the non-inverting side), so it can load a high-resistance source such as a bridge. An instrumentation amplifier adds a voltage follower (buffer) on each input before the difference amplifier, giving very high input resistance while keeping the difference gain. Resistor matching is critical: mismatched resistors reduce common-mode rejection.

**Design**: choose the gain to turn the expected full-scale difference voltage into the required output range (for example to suit an ADC input), without saturating.

### Worked example

A bridge gives a difference of up to 25 mV. An ADC needs 0 to 5 V. Gain = 5 ÷ 0.025 = 200. With R1 = 1.0 kΩ, RF = 200 kΩ (E24: 200 kΩ exists). Two matched pairs are needed. For a full-scale difference of 25 mV, Vout = 0.025 × 200 = 5.0 V.

## C1.8(c) Bridge circuits with thermistors and strain gauges

### What you need to know

Describe the use of bridge circuits with thermistors and strain gauges.

### Explained

A Wheatstone bridge ([05](05-operational-amplifiers.md)) gives zero output at balance and a small output proportional to a change in one arm. Using a bridge, rather than a single divider, means the output can be centred on zero and amplified strongly without saturating, and supply changes cancel out.

- **Thermistor bridge**: a thermistor forms one arm; a variable resistor in the other side sets the temperature at which the bridge balances. Above or below this temperature, the output swings positive or negative. Feed to a difference amplifier (for measurement) or a comparator (for switching).
- **Strain gauge**: a thin metal foil zigzag bonded to a surface. When the surface is stretched, the foil gets longer and thinner, increasing its resistance slightly (typically a fraction of a percent). The change is tiny, so a bridge and a high-gain difference amplifier are needed.
- **Temperature compensation**: metal resistance also changes with temperature. A second "dummy" gauge, identical but not strained (mounted at right angles to the strain, or on unstressed material nearby), is placed in the adjacent arm of the bridge. Temperature changes affect both equally and cancel; only strain unbalances the bridge. Using gauges in two or four arms (half or full bridge) also increases sensitivity.

### Worked example

A bridge on 10 V has three fixed 120 Ω arms and a 120 Ω strain gauge. Under strain the gauge rises to 120.6 Ω. Gauge side: Vmid = 10 × 120.6 ÷ 240.6 = 5.0125 V; reference side 5.0000 V. Difference = 12.5 mV. With a gain of 200, output = 2.5 V.

## C1.8(d), (e), (f) Slotted and encoded discs; Gray code

### What you need to know

- Slotted discs sense rotational speed; encoded discs sense angular position.
- Compare Gray code with binary coding for encoded discs.
- Design logic to process the outputs.

### Explained

**Slotted disc**: a disc with equally spaced slots rotates between an LED (or IR LED) and a phototransistor (an optical interrupter, or opto-switch). Each slot lets light through, producing a pulse. Count pulses for a fixed time (a gate time from a timer) to find the speed: revolutions per second = pulses per second ÷ slots per disc. Pulses are squared up with a Schmitt trigger and counted with a counter ([12](12-sequential-logic-systems.md)). A second sensor offset by a fraction of a slot gives the direction of rotation.

**Encoded disc (absolute encoder)**: a disc with several concentric tracks, each read by its own optical sensor. The pattern of transparent and opaque segments gives a unique code for each angular sector, so position is known immediately, even after power-up. A 3-track disc gives 8 sectors (45° each); n tracks give 2ⁿ sectors and resolution 360° ÷ 2ⁿ.

**Gray code**: in ordinary binary, several bits can change at once between neighbouring positions (for example 011 to 100: all three bits change). Because sensors are never perfectly aligned, the bits may not change at the same instant, so wrong intermediate codes (like 111 or 000) could be read briefly, giving large position errors. In **Gray code**, only one bit changes between adjacent positions, so a misalignment can give at most an error of one step.

| Decimal | Binary | Gray |
| --- | --- | --- |
| 0 | 000 | 000 |
| 1 | 001 | 001 |
| 2 | 010 | 011 |
| 3 | 011 | 010 |
| 4 | 100 | 110 |
| 5 | 101 | 111 |
| 6 | 110 | 101 |
| 7 | 111 | 100 |

**Conversion with logic**: Gray to binary: the binary MSB equals the Gray MSB; each lower binary bit = (binary bit above) XOR (Gray bit in this position). For 3 bits: B₂ = G₂; B₁ = B₂ ⊕ G₁; B₀ = B₁ ⊕ G₀. Binary to Gray: G₂ = B₂; G₁ = B₂ ⊕ B₁; G₀ = B₁ ⊕ B₀. So two XOR gates convert 3 bits.

Other processing: logic gates detect a particular position (for example AND gates decoding sector 5 to stop a motor); counters and gating circuits measure speed.

### Worked example

A slotted disc has 24 slots. In a 0.5 s gate time the counter records 360 pulses. Speed = 360 ÷ 0.5 ÷ 24 = 30 revolutions per second = 1800 rpm.

A Gray code reading 110 converts to binary: B₂ = 1; B₁ = 1 ⊕ 1 = 0; B₀ = 0 ⊕ 0 = 0; binary 100 = 4 (sector 4, from 180° to 225° on a 3-bit disc).

### Common mistakes

- Using an encoded disc to measure speed (it gives position; a slotted disc gives speed).
- Converting Gray to binary by XORing Gray bits only.
- Forgetting the dummy gauge's role in temperature compensation.

## Check questions

1. Draw an op-amp difference amplifier and state its output equation. (3)
2. Explain why a difference amplifier is used with a bridge circuit. (2)
3. A difference amplifier has R1 = 4.7 kΩ and RF = 470 kΩ. V+ = 2.512 V and V− = 2.500 V. Calculate Vout. (2)
4. Explain how an instrumentation amplifier improves on a simple difference amplifier. (2)
5. Explain how a strain gauge detects strain and why a dummy gauge is used. (4)
6. A bridge on 12 V has fixed arms of 350 Ω and a gauge which changes to 351 Ω. Calculate the bridge output. (3)
7. A disc with 60 slots gives 1500 pulses per second. Calculate the speed in rpm. (2)
8. Explain why Gray code is used on encoded discs. (3)
9. Convert Gray code 1011 to binary. (2)

## Mark scheme

1. Correct circuit with matched R1 and RF pairs (2); Vout = (V+ − V−) × RF/R1 (1).
2. Amplifies only the small difference between bridge outputs (1); rejects voltages common to both, e.g. supply changes / interference (1).
3. VDIFF = 12 mV (1); Vout = 0.012 × 100 = 1.2 V (1).
4. Buffers / voltage followers on each input (1); very high input resistance, so does not load the bridge (1).
5. Stretching the foil increases length and reduces cross-section (1); resistance increases (1); dummy gauge in adjacent arm experiences the same temperature but no strain (1); temperature effects cancel (1).
6. Gauge side: 12 × 351 ÷ 701 = 6.0086 V (1); reference 6.0000 V (1); output 8.6 mV (1).
7. 1500 ÷ 60 = 25 rev s⁻¹ (1); 1500 rpm (1).
8. Only one bit changes between adjacent positions (1); sensors may switch at slightly different times (1); so a reading error is at most one position, unlike binary where large errors can occur (1).
9. B₃ = 1, B₂ = 1 ⊕ 0 = 1, B₁ = 1 ⊕ 1 = 0, B₀ = 0 ⊕ 1 = 1 (1); binary 1101 (1).
