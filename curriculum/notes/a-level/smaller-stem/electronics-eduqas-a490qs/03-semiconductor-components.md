---
level: A-level
subject: Electronics
topic: "C1.1 Semiconductor components"
as_content: "C1.1(e) to (i) are AS and A level; C1.1(a) to (d) (semiconductor physics, photodiode, MOSFET channel) are A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.1(a)", "C1.1(b)", "C1.1(c)", "C1.1(d)", "C1.1(e)", "C1.1(f)", "C1.1(g)", "C1.1(h)", "C1.1(i)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.1 Semiconductor components

Diodes and transistors are made from doped semiconductors. This file explains how they conduct and how to use LEDs, silicon diodes, zener diodes, bipolar transistors and MOSFETs in circuits. GCSE background: [GCSE Electronics 04](../../../gcse/smaller-stem/electronics-eduqas/04-switching-circuits.md) and [05](../../../gcse/smaller-stem/electronics-eduqas/05-applications-of-diodes.md).

Equations to select and apply: IC = hFE × IB; ID = gM(VGS − 3); P = ID² × rDS(on).

## C1.1(a), (b) Semiconductors and the p-n junction (A level only)

### What you need to know

- Conduction in n-type and p-type semiconductors by electrons and holes.
- Conduction at a p-n junction; why a diode conducts in one direction only; how an LED works.

### Explained

Pure silicon has four outer electrons per atom, all used in covalent bonds, so it conducts poorly. Doping adds a few impurity atoms:

- **n-type**: doped with atoms with five outer electrons (phosphorus). The extra electron is free to move, so the majority charge carriers are electrons (negative).
- **p-type**: doped with atoms with three outer electrons (boron). This leaves a missing electron, a **hole**, in a bond. A neighbouring electron can move into it, so the hole moves; holes act as positive majority carriers.

**p-n junction**: where p and n regions meet, electrons diffuse across and fill holes near the junction, leaving a thin **depletion layer** with no free carriers and a built-in potential barrier (about 0.6 to 0.7 V for silicon).

- **Forward bias** (p connected to +): the applied voltage opposes the barrier; once it exceeds about 0.7 V, carriers cross and current flows freely.
- **Reverse bias** (p connected to −): the depletion layer widens; almost no current flows (tiny leakage) until breakdown.

**LED**: when forward biased, electrons crossing the junction recombine with holes, releasing energy as photons. The colour depends on the semiconductor's band gap (materials such as gallium arsenide phosphide); forward voltages are higher than silicon (about 1.8 to 3.3 V).

## C1.1(c) Photodiode (A level only)

Operated in reverse bias. Light absorbed in the depletion layer creates electron-hole pairs, which the electric field sweeps across, giving a reverse current proportional to light intensity. It responds very quickly (microseconds or faster), so it is used in optical communication receivers ([15](15-optical-communication.md)) and light meters. Put in series with a resistor, the current produces a voltage that rises with light.

## C1.1(d) The n-channel enhancement MOSFET (A level only)

A MOSFET has a gate insulated from the p-type substrate by a thin oxide layer, with n-type source and drain regions. With no gate voltage, there is no conducting channel between source and drain (enhancement mode: normally off). A positive gate-source voltage (VGS) attracts electrons under the gate, forming an n-type channel ("enhancing" it). Above the threshold voltage (about 2 to 3 V) current flows; larger VGS gives a wider channel and more drain current. At high drain-source voltage the channel narrows ("pinches off") near the drain, and the drain current then depends mainly on VGS, not VDS.

Because the gate is insulated, it draws virtually no current (very high input resistance), but it is sensitive to static.

## C1.1(e), (f) Using diodes (AS and A level)

### What you need to know

- Uses of LEDs, silicon diodes and zener diodes; interpret and sketch their characteristic (I-V) graphs; calculations.
- Calculate series resistors for LEDs; select zener diodes.

### Explained

| Device | Characteristic | Uses |
| --- | --- | --- |
| Silicon diode | Conducts above about 0.7 V forward; blocks reverse until breakdown | Rectification ([16](16-mains-power-supply-systems.md)); reverse polarity protection; back-emf protection across relay coils and motors; steering logic |
| LED | Conducts above about 2 V forward (colour-dependent); low reverse breakdown (about 5 V) | Indicators, displays, optical transmitters; must have a series resistor to limit current |
| Zener diode | Normal forward; in reverse, breaks down sharply at its zener voltage VZ and holds that voltage nearly constant over a wide current range | Voltage references and regulators ([16](16-mains-power-supply-systems.md)); clipping; protection |

**LED series resistor**: R = (Vs − VF) ÷ IF, where VF is the LED forward voltage and IF the desired current (typically 10 to 20 mA).

**Zener selection**: choose VZ for the required output voltage, and check power: P = VZ × IZ, within the rating; series resistor R = (Vs − VZ) ÷ (IZ + IL).

### Worked example

A red LED (VF = 2.0 V, IF = 15 mA) on a 9 V supply: R = (9 − 2.0) ÷ 0.015 = 467 Ω; choose 470 Ω (E24). Power in R = (7.0)² ÷ 470 = 0.10 W.

A 5.1 V zener regulates from 12 V; load draws 20 mA and the zener needs at least 5 mA: R = (12 − 5.1) ÷ 0.025 = 276 Ω; choose 270 Ω, giving 25.6 mA total. If the load is removed, all 25.6 mA flows in the zener: P = 5.1 × 0.0256 = 0.13 W, so a 0.4 W zener is fine.

## C1.1(g), (h), (i) Transistors as switches (AS and A level)

### What you need to know

- Use n-channel enhancement MOSFETs and npn bipolar transistors in switching circuits; use data to select components.
- gM is the gradient of the ID-VGS graph.
- IC = hFE IB (bipolar); ID = gM(VGS − 3) (MOSFET, threshold taken as 3 V); P = ID² rDS(on) (power in a MOSFET switched on).

### Explained

**npn bipolar transistor**: a small base current IB controls a much larger collector current IC = hFE × IB. The base-emitter junction needs about 0.7 V to conduct. As a switch: with no base current it is off; with enough base current it saturates (fully on, VCE about 0.2 V). Base resistor: RB = (Vin − 0.7) ÷ IB, choosing IB so that hFE × IB is comfortably greater than the load current (allowing a safety margin).

**MOSFET**: controlled by voltage, not current. Below threshold it is off; well above threshold it is fully on with a very low resistance rDS(on) (often milliohms to ohms), so little power is wasted. gM (transconductance, siemens) is the gradient of the ID against VGS graph in the linear region. Advantages over bipolar: almost no gate current (can be driven directly by logic or high-resistance sensor circuits), low on-resistance, high current ratings. A pull-down resistor on the gate keeps it off when the input is disconnected.

**Driving inductive loads** (relays, motors, solenoids): a diode across the load (reverse-biased in normal operation) absorbs the high back-emf when the transistor switches off, protecting it.

**Selecting components from data**: check maximum collector or drain current, maximum VCE or VDS, power rating, hFE (minimum value) or threshold and rDS(on).

### Worked example

A bipolar transistor with hFE (minimum) = 100 switches a 200 mA lamp from a 5 V logic output. Minimum IB = 0.2 ÷ 100 = 2 mA; use a factor of about 2 for saturation: 4 mA. RB = (5 − 0.7) ÷ 0.004 = 1075 Ω; choose 1.0 kΩ.

A MOSFET with gM = 0.5 S and threshold 3 V: at VGS = 4.2 V, ID = 0.5 × (4.2 − 3) = 0.6 A. When fully on with rDS(on) = 0.08 Ω carrying 2.5 A, P = 2.5² × 0.08 = 0.5 W.

### Common mistakes

- Forgetting the series resistor for an LED.
- Connecting a zener forward biased when regulating.
- Calculating base resistor with 5 V instead of (5 − 0.7) V.
- Saying a MOSFET gate needs current to keep it on.

## Check questions

1. Explain how doping silicon with phosphorus increases its conductivity. (2)
2. Explain why a p-n junction conducts in only one direction. (4)
3. Describe how a photodiode produces a current that depends on light intensity. (3)
4. Explain how a positive gate voltage switches on an n-channel enhancement MOSFET. (3)
5. A blue LED has VF = 3.2 V and needs 12 mA. Calculate the series resistor for a 12 V supply and choose an E24 value. (3)
6. A 6.2 V zener is fed through 330 Ω from 15 V. The load takes 15 mA. Calculate the zener current and power. (3)
7. A transistor with hFE = 150 drives a 300 mA motor from a 3.3 V output. Calculate a suitable base resistor allowing a factor of 2. (3)
8. Explain why a diode is connected across a relay coil. (2)
9. A MOSFET carries 4 A with rDS(on) = 0.05 Ω. Calculate the power dissipated and explain why MOSFETs are preferred for high-current switching. (3)

## Mark scheme

1. Phosphorus has five outer electrons; one is not needed for bonding (1); free electrons act as charge carriers (n-type) (1).
2. Depletion layer with potential barrier at the junction (1); forward bias reduces / overcomes the barrier so carriers cross (1); reverse bias widens the depletion layer (1); so almost no current (1).
3. Reverse biased (1); photons create electron-hole pairs in the depletion layer (1); field sweeps them across giving current proportional to light (1).
4. Gate positive relative to source attracts electrons beneath the oxide (1); forms an n-type conducting channel between source and drain (1); above threshold, drain current flows and increases with VGS (1).
5. R = (12 − 3.2) ÷ 0.012 = 733 Ω (2); 750 Ω (1).
6. Total current = (15 − 6.2) ÷ 330 = 26.7 mA (1); IZ = 26.7 − 15 = 11.7 mA (1); P = 6.2 × 0.0117 = 0.072 W (1).
7. IB = 0.3 ÷ 150 = 2 mA, × 2 = 4 mA (1); RB = (3.3 − 0.7) ÷ 0.004 = 650 Ω (1); choose 620 Ω (1).
8. Coil produces a large back-emf when current is switched off (1); diode conducts this current, protecting the transistor (1).
9. P = 4² × 0.05 = 0.8 W (1); very low on-resistance so little power wasted (1); voltage-controlled, negligible gate current (1).
