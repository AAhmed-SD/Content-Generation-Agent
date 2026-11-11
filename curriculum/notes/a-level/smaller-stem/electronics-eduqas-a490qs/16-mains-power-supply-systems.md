---
level: A-level
subject: Electronics
topic: "C2.6 Mains power supply systems"
as_content: "C2.6(a) to (d) are AS and A level; C2.6(e) to (g) (load and line regulation, transistor and op-amp regulators) are A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.6(a)", "C2.6(b)", "C2.6(c)", "C2.6(d)", "C2.6(e)", "C2.6(f)", "C2.6(g)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.6 Mains power supply systems

Electronic circuits need a steady low-voltage DC supply. A mains power supply steps the voltage down with a transformer, rectifies it with diodes, smooths it with a capacitor, and regulates it to a constant value. Diodes and zeners are in [03](03-semiconductor-components.md); op-amps in [05](05-operational-amplifiers.md).

Equations to select and apply: ripple voltage Vr = I/(fr C), where fr is the ripple frequency; op-amp regulator VL ≈ VZ(1 + RF/R1).

## C2.6(a) Rectification

### Explained

- **Half-wave**: one diode in series with the load. It conducts only on positive half-cycles; negative half-cycles are blocked. The output is a series of positive humps with gaps; ripple frequency equals the supply frequency (50 Hz in the UK). Simple but wastes half the cycle.
- **Full-wave (bridge rectifier)**: four diodes arranged so current flows through the load in the same direction on both half-cycles. Ripple frequency is twice the supply frequency (100 Hz). Two diodes conduct at a time, so the peak output is about 1.4 V below the transformer peak (2 × 0.7 V). (A centre-tapped transformer with two diodes also gives full-wave rectification with one diode drop.)

Peak output = Vrms × √2 − diode drops.

## C2.6(b), (c) Smoothing, loading and ripple

### Explained

A large **reservoir (smoothing) capacitor** across the output charges to the peak voltage when the diodes conduct, and supplies the load in between, slowly discharging. The output becomes nearly steady DC with a small sawtooth **ripple**.

- Larger capacitor → smaller ripple.
- Larger load current (smaller load resistance) → larger ripple (the capacitor discharges faster); the average output also falls.
- Full-wave gives half the ripple of half-wave for the same capacitor, because the gaps are half as long.
- With no load, the output stays at the peak voltage with almost no ripple.

**Ripple voltage** (peak-to-peak) Vr = I ÷ (fr C), with fr = 50 Hz for half-wave and 100 Hz for full-wave in the UK.

### Worked example

A full-wave supply gives 15 V peak and supplies 0.5 A. Ripple must be under 1 V: C = I ÷ (fr Vr) = 0.5 ÷ (100 × 1) = 5000 µF; choose 4700 µF (Vr = 1.06 V) or 6800 µF (0.74 V). Choose 6800 µF to meet the limit, with a voltage rating above 15 V (for example 25 V).

## C2.6(d), (e) Zener regulation; load and line regulation

### Explained

**Zener regulator**: a series resistor RS from the smoothed supply to the output, with a reverse-biased zener across the output. The zener holds the output at VZ, as long as enough current flows through it. RS = (Vin(min) − VZ) ÷ (IL(max) + IZ(min)). When the load takes less current, more flows through the zener (check its power at no load).

Graphs showing the effect of loading: output stays close to VZ as load current increases until the zener current falls to its minimum, then the output drops sharply (the regulator "drops out").

- **Load regulation**: how well the output stays constant as the load current changes (with fixed input). Often given as the change in output voltage from no load to full load.
- **Line regulation**: how well the output stays constant as the input (supply) voltage changes (with fixed load), for example due to mains variation or ripple.

Simple zener regulators have modest load regulation because the zener's voltage changes a little with current, and they waste power in RS and the zener. They suit low currents.

## C2.6(f), (g) Improved regulators

### What you need to know

Analyse and design regulators based on a zener with a transistor emitter follower, and with a non-inverting amplifier; VL ≈ VZ(1 + RF/R1).

### Explained

**Zener plus emitter follower**: the zener sets the base voltage of an npn power transistor; the load is connected to the emitter. VL = VZ − 0.7 V. The transistor supplies the load current; the zener only supplies the small base current (IL ÷ hFE), so it can regulate much larger loads with better load regulation. The transistor dissipates P = (Vin − VL) × IL, and may need a heat sink.

**Op-amp regulator**: a zener reference voltage feeds the non-inverting input of an op-amp; the output drives a series pass transistor (emitter follower) supplying the load; a resistor divider (RF over R1) from the output feeds back to the inverting input. Negative feedback forces the divided output to equal VZ, so VL = VZ(1 + RF/R1). Any change in load or input is corrected by the high-gain op-amp, giving excellent load and line regulation; the output voltage can be set above VZ and adjusted with a potentiometer. (Integrated regulators such as the 78xx series use this principle.)

### Worked example

Zener plus emitter follower: VZ = 5.6 V gives VL ≈ 4.9 V. For IL = 1 A and hFE = 50, the base current is 20 mA. Input 9 V: transistor power = (9 − 4.9) × 1 = 4.1 W, so a heat sink is needed.

Op-amp regulator: VZ = 3.3 V, required VL = 12 V: 1 + RF/R1 = 3.64, so RF/R1 = 2.64. With R1 = 10 kΩ, RF = 26.4 kΩ: use 27 kΩ (VL = 12.2 V) or a fixed resistor plus a trim potentiometer.

### Common mistakes

- Using 50 Hz ripple frequency for a full-wave rectifier.
- Forgetting the two diode drops in a bridge.
- Forgetting to check zener power at no load.
- Confusing load regulation (load changes) with line regulation (input changes).

## Check questions

1. Sketch the output of a half-wave and a full-wave rectifier (no smoothing) and state the ripple frequency of each. (3)
2. A transformer gives 12 V rms. Calculate the peak output of a bridge rectifier. (2)
3. Explain how a reservoir capacitor smooths the output, and how increasing the load current affects ripple. (4)
4. A half-wave supply gives 200 mA with a 2200 µF capacitor. Calculate the ripple voltage. (2)
5. Design a zener regulator for a 6.8 V output from a 12 V supply for a load of up to 30 mA, with minimum zener current 5 mA. Calculate the zener power at no load. (4)
6. Distinguish between load and line regulation. (2)
7. Explain why a zener plus emitter follower can supply a larger current than a zener alone. (3)
8. An op-amp regulator uses a 2.5 V reference. R1 = 4.7 kΩ and RF = 10 kΩ. Calculate VL and explain how the circuit keeps VL constant when the load increases. (4)

## Mark scheme

1. Half-wave: positive humps with gaps, 50 Hz (1); full-wave: continuous humps, 100 Hz (1); correct sketches (1).
2. 12 × √2 = 16.97 V (1); − 1.4 V = 15.6 V (1).
3. Capacitor charges to the peak when the diodes conduct (1); supplies the load between peaks, discharging slowly (1); output nearly steady with small ripple (1); larger load current discharges it faster, increasing ripple (1).
4. Vr = 0.2 ÷ (50 × 2200 × 10⁻⁶) (1) = 1.8 V (1).
5. RS = (12 − 6.8) ÷ 0.035 = 149 Ω (1); round down to the E24 value 130 Ω so the zener still gets at least 5 mA at full load (150 Ω would give only 4.7 mA) (1); no-load current = 5.2 ÷ 130 = 40 mA (1); P = 6.8 × 0.040 = 0.27 W (1).
6. Load regulation: output stays constant as load current changes (1); line regulation: output stays constant as input voltage changes (1).
7. Transistor supplies the load current (1); zener only supplies the base current, IL ÷ hFE (1); so zener current hardly changes and it regulates well / small zener can be used (1).
8. VL = 2.5 × (1 + 10/4.7) = 7.8 V (1); load increases, VL starts to fall (1); fed-back voltage at inverting input falls below the reference (1); op-amp output rises, driving the pass transistor harder, restoring VL (1).
