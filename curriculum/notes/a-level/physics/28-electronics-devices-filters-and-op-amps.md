---
level: A-level
subject: Physics
topic: "Electronics: MOSFETs, Zener diodes, photodiodes, Hall sensors, LC filters and operational amplifiers"
as_content: "AQA option (A-level only)."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.13.1.1", "3.13.1.2", "3.13.1.3", "3.13.1.4", "3.13.3.1", "3.13.3.2", "3.13.4.1", "3.13.4.2", "3.13.4.3", "3.13.4.4"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Electronics: MOSFETs, Zener diodes, photodiodes, Hall sensors, LC filters and operational amplifiers

This file covers the discrete semiconductor devices in the AQA electronics option (the N-channel enhancement MOSFET, the Zener diode, the photodiode and the Hall effect sensor), parallel LC resonance filters and Q factor, and the operational amplifier as an ideal and real building block: comparator, inverting, non-inverting, summing and difference amplifiers.

## Overview

AQA option 3.13 (A-level only). No other England board examines this content. Potential dividers and diodes are in files 10 and 11; capacitors in file 16; induction in file 17; the physics of the Hall effect (Eduqas) in file 17; resonance in file 12; LCR a.c. circuits (Eduqas option A) in file 34. Digital electronics and communications are in file 29.

### Board differences

- AQA only: 3.13.1, 3.13.3, 3.13.4.
- AQA says the principles of the Hall sensor are not required here (Eduqas covers them in C3.9; see file 17); the 555 chip and gate internals are not required; derivations are only required for the inverting amplifier.

## 3.13.1.1 MOSFET

*Refs: AQA 3.13.1.1. Level: A-level only.*

### What you need to know

- Simplified structure, behaviour and characteristics of an N-channel enhancement-mode MOSFET.
- Drain, source and gate; V_DS, V_GS, I_DSS and V_th.
- Use as a switch, and as a device with a very high input resistance.

### Explained

**Structure.** A slab of p-type silicon (the substrate) has two n-type regions: the **source** and the **drain**, each with a metal contact. Between them, on top, is a thin insulating layer of silicon dioxide, and over that a metal electrode, the **gate**.

**Operation.** With no gate voltage, there is no conducting path between source and drain (two back-to-back p–n junctions), so no current flows. When the gate is made positive relative to the source (V_GS), the electric field attracts electrons from the substrate into a thin layer just under the oxide. Once V_GS exceeds the threshold voltage V_th (typically 1 to 3 V), this layer becomes an n-type channel connecting source and drain, and current I_D flows when a p.d. V_DS is applied. A larger V_GS gives a wider channel and more current ("enhancement").

**Characteristics.**

- I_D against V_DS (for fixed V_GS): rises steeply at first (the ohmic region), then levels off (saturation) at a current set by V_GS. I_DSS is the saturated drain current at a stated V_GS.
- I_D against V_GS (transfer characteristic): zero until V_th, then rises steeply.

**Very high input resistance.** The gate is insulated from the channel by the oxide, so almost no current flows into the gate (input resistance about 10¹² Ω or more). The MOSFET is controlled by voltage, not current, so it draws almost no power from the circuit that drives it (e.g. a sensor or a logic gate).

**As a switch.** With the load (lamp, motor, relay) between the positive supply and the drain, and the source to 0 V: when V_GS < V_th, the MOSFET is off (open switch, load off); when V_GS is well above V_th, it is fully on (very low resistance between drain and source, load on). A sensor potential divider can drive the gate to switch a heater or light on at a set temperature or light level. A diode across an inductive load (relay coil or motor) protects the MOSFET from the induced e.m.f. at switch-off.

### Common mistakes

- Saying a current flows into the gate to switch it on.
- Saying a MOSFET conducts when V_GS is below V_th.

## 3.13.1.2 Zener diode

*Refs: AQA 3.13.1.2. Level: A-level only.*

### What you need to know

- The characteristic curve showing the Zener breakdown voltage and typical minimum operating current; anode and cathode.
- Use with a resistor as a constant voltage source; to provide a reference voltage.

### Explained

A Zener diode is a heavily doped diode designed to be used in reverse bias. Forward biased (anode positive), it behaves like an ordinary diode (conducts above about 0.7 V). Reverse biased, almost no current flows until the Zener (breakdown) voltage V_Z (e.g. 3.3 V, 5.1 V, 12 V), when the current rises sharply while the p.d. stays almost constant. A minimum reverse current (a few mA) is needed to keep it in the steep breakdown region.

**Constant voltage source.** The Zener is connected in reverse across the output, with a series resistor R to the supply V_S. The output stays at V_Z as long as the Zener current stays above the minimum. The resistor drops the excess p.d. and limits the current: I = (V_S − V_Z)/R. The Zener current = I − load current. Used as a reference voltage (e.g. for a comparator or a voltmeter).

### Worked example

1. A 5.1 V Zener is used with a 9.0 V supply. The load draws 10 mA and the Zener needs at least 5 mA. Find the largest suitable series resistor.

   Total current ≥ 15 mA. R ≤ (9.0 − 5.1)/0.015 = 260 Ω.

### Common mistakes

- Connecting the Zener forward biased for regulation.
- Forgetting the series resistor.

## 3.13.1.3 Photodiode

*Refs: AQA 3.13.1.3. Level: A-level only.*

### What you need to know

- Characteristic curves and spectral response curves.
- Use in photoconductive mode as a detector in optical systems.
- Use with a scintillator to detect atomic particles.

### Explained

A photodiode is a p–n junction with a window. Photons with enough energy (above the band gap of the semiconductor) create electron–hole pairs near the junction, which are separated by the junction's field and so produce a current.

**Photoconductive mode.** The photodiode is reverse biased (in series with a resistor across a supply). In darkness only a tiny leakage (dark) current flows. When light falls on it, the reverse current increases in proportion to the light intensity. The p.d. across the series resistor is an output signal. Response is very fast (nanoseconds), which suits optical fibre receivers and light-beam detectors.

**Characteristic curves.** I against V in reverse bias for different light intensities: a set of almost horizontal lines; the reverse current is nearly independent of V and proportional to intensity.

**Spectral response.** The relative sensitivity against wavelength rises from short wavelengths to a peak (about 900 nm for silicon, in the near infrared), then drops sharply at longer wavelengths, where photons have less energy than the band gap.

**With a scintillator.** A scintillator crystal produces a flash of light when a particle (or gamma photon) passes through it; a photodiode behind it converts each flash into a current pulse, so particles can be counted and their energy measured (pulse size).

## 3.13.1.4 Hall effect sensor

*Refs: AQA 3.13.1.4. Level: A-level only.*

### What you need to know

- Use as a magnetic field sensor to monitor attitude.
- Use in a tachometer.
- (Principles are not required by AQA; see file 17.)

### Explained

A Hall sensor gives an output p.d. proportional to the component of magnetic flux density perpendicular to it.

- **Attitude (orientation) monitoring.** Fixed to a spacecraft, aircraft or phone, Hall sensors measure the components of the Earth's magnetic field along different axes, so the orientation can be worked out (an electronic compass).
- **Tachometer.** A small magnet is fixed to a rotating shaft or wheel; each time it passes the Hall sensor, the sensor gives a pulse. Counting pulses per second gives the rotation rate (e.g. car engine speed, bicycle speedometer, wheel speed for anti-lock braking). No contact, so no wear.

## 3.13.3.1 LC resonance filters

*Refs: AQA 3.13.3.1. Level: A-level only.*

### What you need to know

- Resonant frequency f₀ = 1/(2π√(LC)) (parallel arrangement only).
- The analogy between the LC circuit and a mass–spring system: inductance like mass, capacitance like the spring.
- The energy (voltage) response curve.
- Q factor = f₀/f_B, where f_B is the bandwidth at the 50% energy points.

### Explained

An **inductor** is a coil; its inductance L (henry, H) measures how much e.m.f. it produces to oppose a change of current (Lenz's law). A parallel LC circuit: an inductor and a capacitor connected side by side.

**Oscillation.** A charged capacitor discharges through the inductor; the current builds up a magnetic field (energy moves from the capacitor's electric field to the inductor's magnetic field). When the capacitor is empty, the inductor keeps the current going (it opposes the change), charging the capacitor the other way. Energy flows back and forth at the natural (resonant) frequency f₀ = 1/(2π√(LC)).

**Analogy with a mass–spring system.** The inductor resists changes in current as mass resists changes in velocity (inertia): L ↔ m. The capacitor stores energy as a spring does, and its p.d. is proportional to charge as spring force is to extension: C ↔ 1/k. So f = (1/2π)√(k/m) ↔ (1/2π)√(1/(LC)). Resistance in the circuit acts like friction (damping).

**As a filter.** Driven by signals of many frequencies (e.g. from an aerial), a parallel LC circuit has a very large impedance at f₀ (and small impedance at other frequencies), so a large signal voltage appears across it only at and near f₀. It selects one frequency: tuning a radio by varying C.

**Response curve.** Energy (∝ V²) across the circuit against frequency is a resonance peak at f₀. The **bandwidth** f_B is the width of the peak between the two frequencies where the energy is 50% of its maximum (equivalently, the voltage is 1/√2 = 0.71 of the maximum). The **Q factor** = f₀/f_B. High Q: a sharp peak, very selective (low resistance, low damping). Low Q: broad, less selective, but passes a wider band of frequencies (needed for music or data).

### Worked example

1. A 2.5 mH inductor is in parallel with a 100 pF capacitor. Find f₀.

   f₀ = 1/(2π√(2.5 × 10⁻³ × 100 × 10⁻¹²)) = 1/(2π × 5.0 × 10⁻⁷) = 3.2 × 10⁵ Hz (318 kHz).

2. Its 50% energy points are at 314 kHz and 322 kHz. Find Q.

   f_B = 8 kHz. Q = 318/8 = 40.

### Common mistakes

- Taking the bandwidth at half of the voltage peak (it is at half energy, 0.71 of peak voltage).

## 3.13.3.2 The ideal operational amplifier

*Refs: AQA 3.13.3.2. Level: A-level only.*

### What you need to know

- Operation and characteristics of an ideal op-amp: power supply and signal connections, infinite open-loop gain, infinite input resistance.
- Open-loop transfer function for a real op-amp: V_out = A_OL(V⁺ − V⁻).
- Use as a comparator.

### Explained

An op-amp is an integrated circuit amplifier with two inputs, non-inverting (V⁺) and inverting (V⁻), and one output. It is powered by a dual supply, e.g. +15 V and −15 V, with 0 V as the reference.

**Ideal op-amp:**

- infinite open-loop gain A_OL;
- infinite input resistance (no current flows into the inputs);
- zero output resistance;
- infinite bandwidth.

**Open loop.** V_out = A_OL(V⁺ − V⁻). For a real op-amp A_OL is about 10⁵, so even a tiny difference between inputs drives the output to a supply rail. The output cannot exceed the supply: it "saturates" at about ±(supply − 1 or 2 V).

**Comparator.** Use the op-amp open loop. If V⁺ > V⁻, the output goes to +V_sat; if V⁺ < V⁻, it goes to −V_sat. A reference voltage on one input (from a potential divider or Zener), and a sensor potential divider on the other, gives a switch: e.g. a light sensor that turns an LED on when the light falls below a set level.

### Worked example

1. An op-amp with A_OL = 2.0 × 10⁵ and supply ±12 V has V⁺ = 1.000 V and V⁻ = 0.999 V. Find V_out.

   2.0 × 10⁵ × 0.001 = 200 V, so the output saturates at about +12 V (in practice slightly less).

## 3.13.4.1 Inverting amplifier configuration

*Refs: AQA 3.13.4.1. Level: A-level only.*

### What you need to know

- Derivation of V_out/V_in = −R_f/R_in, and calculations.
- Virtual earth and virtual-earth analysis.

### Explained

V⁺ is connected to 0 V. The input signal goes through R_in to V⁻, and a feedback resistor R_f connects the output back to V⁻ (negative feedback).

**Virtual earth.** Because A_OL is so large and the output is not saturated, V⁺ − V⁻ must be tiny, so V⁻ ≈ V⁺ = 0 V. The inverting input is at almost 0 V but is not connected to 0 V: a virtual earth.

**Derivation.** No current enters the op-amp (infinite input resistance), so the current through R_in equals the current through R_f:

(V_in − 0)/R_in = (0 − V_out)/R_f → **V_out/V_in = −R_f/R_in**

The minus sign shows the output is inverted (180° out of phase). The gain depends only on the resistors, not on A_OL, so it is stable and predictable. The input resistance of the circuit is R_in.

### Worked example

1. R_in = 10 kΩ, R_f = 150 kΩ, supply ±15 V. Find V_out for V_in = 0.20 V and for V_in = 1.5 V.

   Gain = −15. V_out = −3.0 V. For 1.5 V: −22.5 V would exceed the supply, so the output saturates at about −13 to −15 V (clipped).

## 3.13.4.2 Non-inverting amplifier configuration

*Refs: AQA 3.13.4.2. Level: A-level only.*

### What you need to know

- V_out/V_in = 1 + R_f/R₁ (no derivation needed).

### Explained

The signal goes directly to V⁺. A potential divider of R_f (from output to V⁻) and R₁ (from V⁻ to 0 V) feeds back a fraction of the output. Gain = 1 + R_f/R₁; the output is in phase with the input. The input resistance is very high (the signal goes straight into the op-amp input), so it does not load the source. With R_f = 0 (and R₁ removed), gain = 1: a voltage follower (buffer), used to connect a high-resistance source to a low-resistance load.

### Worked example

1. R_f = 47 kΩ, R₁ = 3.3 kΩ. Find the gain.

   1 + 47/3.3 = 15.2.

## 3.13.4.3 Summing amplifier and difference amplifier configurations

*Refs: AQA 3.13.4.3. Level: A-level only.*

### What you need to know

- Summing amplifier: V_out = −R_f(V₁/R₁ + V₂/R₂ + V₃/R₃ + …).
- Difference amplifier: V_out = (V⁺ − V⁻)R_f/R₁ (no derivations needed).

### Explained

**Summing amplifier.** Several inputs, each through its own resistor, go to the virtual earth at V⁻. The currents add and all flow through R_f. If all resistors are equal, V_out = −(V₁ + V₂ + V₃): an audio mixer adds signals from several microphones; different input resistors weight them differently. Choosing R values in the ratio 1 : 2 : 4 : 8 makes a simple digital-to-analogue converter.

**Difference amplifier.** One signal to V⁺ (via R₁, with R_f from V⁺ to 0 V) and one to V⁻ (via R₁, with R_f as feedback). The output is proportional to the difference: V_out = (V⁺ − V⁻)R_f/R₁. Used with a bridge of sensors (e.g. a thermistor and a fixed resistor) to amplify a small difference; any noise common to both inputs cancels.

### Worked example

1. A summing amplifier has R_f = 20 kΩ and inputs 0.50 V through 10 kΩ and 0.30 V through 5.0 kΩ. Find V_out.

   V_out = −20(0.50/10 + 0.30/5.0) = −20(0.050 + 0.060) = −2.2 V.

2. A difference amplifier with R_f/R₁ = 100 has V⁺ = 2.53 V and V⁻ = 2.50 V. Find V_out.

   (0.03) × 100 = 3.0 V.

## 3.13.4.4 Real operational amplifiers

*Refs: AQA 3.13.4.4. Level: A-level only.*

### What you need to know

- Limitations of real op-amps.
- Frequency response curve; gain × bandwidth = constant for a given device.

### Explained

**Limitations.**

- Open-loop gain is large but finite (about 10⁵ at d.c.), and falls at higher frequencies.
- Input resistance is high (10⁶ to 10¹² Ω) but not infinite.
- Output resistance is not zero; output current is limited.
- Output saturates before reaching the supply voltages.
- Slew rate: the output cannot change instantly (limited V μs⁻¹).
- Offset: the output is not exactly zero when the inputs are equal.

**Frequency response.** A graph of gain (log scale) against frequency (log scale): open-loop gain is constant up to a low frequency (about 10 Hz), then falls steadily so that gain × frequency is constant, reaching 1 at about 1 MHz. With negative feedback, the closed-loop gain is lower but stays constant up to a much higher frequency. **Gain × bandwidth = constant** (the gain–bandwidth product for that op-amp, e.g. 10⁶ Hz). So an amplifier with a gain of 100 has a bandwidth of about 10 kHz; a gain of 10 gives 100 kHz.

### Worked example

1. An op-amp has gain–bandwidth product 1.0 MHz. What is the maximum gain if the amplifier must handle frequencies up to 20 kHz?

   1.0 × 10⁶/2.0 × 10⁴ = 50.

## Check questions

1. Describe how an N-channel enhancement MOSFET switches on. (4 marks)
2. Explain why a MOSFET is useful for switching a motor from a sensor circuit. (3 marks)
3. Sketch the characteristic of a Zener diode and explain how it provides a reference voltage. (4 marks)
4. Describe how a photodiode in photoconductive mode is used to detect light. (3 marks)
5. Calculate the resonant frequency of a 15 mH inductor and 22 nF capacitor in parallel. Explain why the circuit acts as a filter. (4 marks)
6. Explain what is meant by a virtual earth and derive the gain of the inverting amplifier. (5 marks)
7. Design a summing amplifier that gives V_out = −(2V₁ + V₂) using a 10 kΩ feedback resistor. (2 marks)
8. An amplifier uses an op-amp with gain–bandwidth product 3 MHz and a closed-loop gain of 60. Find its bandwidth. (1 mark)

## Mark scheme

1. Positive gate voltage relative to source (1); field attracts electrons under the gate oxide (1); above threshold V_th an n-channel forms between source and drain (1); current flows when V_DS applied; larger V_GS gives larger current (1).
2. Gate is insulated, so very high input resistance (1); draws almost no current from the sensor circuit / does not load it (1); can switch a large drain current to the motor (1).
3. Forward: conducts above ~0.7 V; reverse: tiny current until breakdown at V_Z, then current rises sharply at nearly constant V (2); used reverse biased with series resistor (1); p.d. across Zener stays at V_Z over a wide range of currents (above minimum current) (1).
4. Reverse biased in series with resistor (1); photons create charge carriers, reverse current increases in proportion to intensity (1); p.d. across resistor is the output signal; fast response (1).
5. f₀ = 1/(2π√(15 × 10⁻³ × 22 × 10⁻⁹)) (1) = 8.8 kHz (1); at f₀ impedance of parallel circuit is very large, so large signal across it (1); other frequencies give small signal, so only frequencies near f₀ selected (1).
6. Very high open-loop gain means V⁻ ≈ V⁺ = 0 V, though not connected to 0 V (1); no current into op-amp (1); current through R_in = current through R_f (1); V_in/R_in = −V_out/R_f (1); gain = −R_f/R_in (1).
7. R₁ = 5 kΩ for V₁ and R₂ = 10 kΩ for V₂ into inverting input (1); non-inverting input to 0 V (1).
8. 3 × 10⁶/60 = 50 kHz (1).
