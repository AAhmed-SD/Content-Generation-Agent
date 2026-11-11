---
level: A-level
subject: Electronics
topic: "C2.7 High power switching systems: thyristors, triacs and diacs"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.7(a)", "C2.7(b)", "C2.7(c)", "C2.7(d)", "C2.7(e)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.7 High power switching systems

Thyristors and triacs switch large DC and AC loads (heaters, motors, lamps) efficiently, from small control signals. This file covers their characteristics, DC thyristor circuits with capacitor commutation, and AC phase control with a triac, diac and RC network. Transistor and relay switching is in [03](03-semiconductor-components.md) and [01](01-system-synthesis-and-input-output-sub-systems.md); reactance in [07](07-ac-circuits-and-passive-filters.md).

Equation to select and apply: phase shift φ = tan⁻¹(R/XC) between the supply voltage and the capacitor voltage in an RC network.

## C2.7(a) Why use thyristors and triacs

Compared with transistors and relays:

- They handle very large currents and voltages in small packages.
- They need only a short gate pulse to turn on (then latch on), so control power is tiny.
- When fully on, the voltage across them is small (about 1 to 2 V), so little power is wasted.
- No moving parts, no contact arcing or wear (unlike relays); silent and fast.
- Triacs switch AC directly in both directions.

Thyristors suit high-power DC; triacs suit AC loads.

## C2.7(b) Thyristor characteristics

### What you need to know

General characteristics; conditions for conduction; holding current, minimum gate voltage, minimum gate current.

### Explained

A thyristor (silicon controlled rectifier, SCR) has an anode, cathode and gate. It behaves like a diode that does not conduct until triggered.

- With the anode positive with respect to the cathode (forward biased) and no gate signal, it blocks (forward blocking state), up to its forward breakover voltage.
- A positive gate pulse (gate voltage above the **minimum gate voltage**, driving at least the **minimum gate current**) switches it on.
- Once on, it stays on (latches) even if the gate signal is removed, as long as the anode current stays above the **holding current**.
- It turns off only when the anode current falls below the holding current (for example when the supply is interrupted, the current reverses, or it is commutated).
- In reverse bias it blocks, like a diode.

## C2.7(c) DC thyristor switching and capacitor commutation

### Explained

**Latching circuit**: a thyristor in series with a load on a DC supply, with a push switch and resistor to the gate. Pressing the switch turns the load on; it stays on (a useful alarm latch). To reset, the current must be stopped: a normally-closed switch in series, or a switch across the thyristor (shorting it so its current falls below the holding current).

**Capacitor commutation**: a capacitor is charged so that, when an "off" switch (or a second thyristor) connects it across the main thyristor, it briefly applies a reverse voltage, forcing the anode current below the holding current and turning it off. This is used in DC motor controllers and inverters where the load current never naturally falls to zero.

Gate resistor: RG = (Vcontrol − VG) ÷ IG, ensuring at least the minimum gate current without exceeding the maximum.

### Worked example

A thyristor needs VGT = 0.8 V and IGT = 10 mA. Trigger from a 5 V logic output: RG = (5 − 0.8) ÷ 0.010 = 420 Ω; choose 390 Ω (11 mA) to make sure triggering happens.

## C2.7(d), (e) AC phase control with triac, diac and RC network

### What you need to know

Draw the circuit and analyse graphs for AC phase control using an RC network, a triac and a diac; calculate the phase shift φ = tan⁻¹(R/XC).

### Explained

A **triac** conducts in both directions and can be triggered by positive or negative gate pulses: like two thyristors back to back with a shared gate. It switches off each time the AC current passes through zero (natural commutation).

A **diac** is a two-terminal trigger device that conducts in either direction only when the voltage across it exceeds its breakover voltage (about 30 V), then the voltage across it drops suddenly, producing a sharp current pulse.

**Phase control (light dimmer, motor speed controller)**:

1. A variable resistor R and capacitor C in series across the supply form an RC network. The capacitor voltage lags behind the supply voltage.
2. When the capacitor voltage reaches the diac breakover voltage, the diac fires, sending a pulse into the triac gate.
3. The triac turns on for the rest of that half-cycle and turns off at the zero crossing.
4. The same happens in the negative half-cycle.

Increasing R increases the delay (the capacitor charges more slowly and lags more), so the triac fires later in each half-cycle and less power reaches the load. The **firing angle** (delay) can be set from near 0° to near 180°. The load voltage waveform shows each half sine wave "chopped": zero until firing, then following the supply.

The phase shift between supply voltage and capacitor voltage is φ = tan⁻¹(R/XC). With a single RC network, the useful control range is limited (the delay cannot reach close to 180° without the capacitor voltage becoming too small to fire the diac); practical dimmers add a second RC stage.

The diac gives symmetrical triggering in both half-cycles and a sharp pulse, so triggering is reliable and consistent.

Switching part-way through a cycle causes sudden current changes, producing radio-frequency interference; a suppressor (inductor and capacitor filter) is often added.

### Worked example

Supply 50 Hz, C = 100 nF, R set to 47 kΩ. XC = 1 ÷ (2π × 50 × 100 × 10⁻⁹) = 31.8 kΩ. φ = tan⁻¹(47/31.8) = tan⁻¹(1.48) = 56°. Increasing R to 150 kΩ: φ = tan⁻¹(150/31.8) = 78°, so firing is later and the lamp dimmer.

### Common mistakes

- Saying a thyristor turns off when the gate signal is removed.
- Saying the diac switches the load (it only triggers the triac).
- Using φ = tan⁻¹(XC/R) (the spec's form gives the phase between supply and capacitor voltage as tan⁻¹(R/XC)).

## Check questions

1. Give three advantages of using a triac rather than a relay to switch a mains heater. (3)
2. Explain the meaning of holding current. (2)
3. Describe how a thyristor is turned on and how it is turned off in a DC circuit. (4)
4. A thyristor needs 1.0 V and 15 mA at its gate. Calculate a suitable gate resistor for a 9 V control signal. (2)
5. Explain how capacitor commutation turns off a thyristor. (2)
6. Draw a triac-diac phase control circuit and explain how increasing the resistance dims a lamp. (5)
7. Calculate the phase shift produced by R = 22 kΩ and C = 220 nF at 50 Hz. (3)
8. Sketch the voltage across a lamp in a phase control circuit with a firing angle of 90°. (2)

## Mark scheme

1. Any three: no moving parts / no wear or arcing; silent; fast switching; small control current; small size; switches AC directly.
2. The minimum anode current needed to keep the thyristor conducting (1); below it, it switches off (1).
3. Anode positive with respect to cathode (1); gate pulse above minimum gate voltage and current turns it on (1); it latches on without gate signal (1); turned off by reducing anode current below holding current, e.g. breaking the supply or shorting it (1).
4. RG = (9 − 1.0) ÷ 0.015 = 533 Ω (1); choose 510 Ω to ensure enough current (1).
5. Capacitor connected across thyristor applies a reverse voltage briefly (1); anode current falls below holding current so it turns off (1).
6. Correct circuit: triac in series with lamp, RC network across supply, diac from capacitor to gate (2); larger R gives a slower capacitor charge / greater phase lag (1); diac fires later in each half-cycle (1); triac conducts for a shorter part of each cycle so less power (1).
7. XC = 1 ÷ (2π × 50 × 220 × 10⁻⁹) = 14.5 kΩ (1); R/XC = 1.52 (1); φ = 56.6° (1).
8. Zero for the first half of each half-cycle (1); following the sine wave from the peak back to zero in each half-cycle, positive and negative (1).
