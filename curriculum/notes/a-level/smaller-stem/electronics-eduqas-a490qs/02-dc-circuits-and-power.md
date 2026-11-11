---
level: A-level
subject: Electronics
topic: "Core Concepts 2 and 4: DC circuits (resistance, Kirchhoff, Thevenin, E24, capacitance) and energy and power"
as_content: "AS and A level (Core Concepts are in the Eduqas AS too)."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["CC2(a)", "CC2(b)", "CC2(c)", "CC2(d)", "CC2(e)", "CC2(f)", "CC2(g)", "CC4(a)", "CC4(b)", "CC4(c)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# DC circuits, energy and power

This file covers the circuit theory used throughout the course: resistance and Ohm's law, series and parallel combinations, Kirchhoff's laws and Thevenin's theorem, preferred resistor values, capacitance, and power in DC and AC circuits. Physics background: [A-level Physics 10](../../physics/10-current-resistance-and-resistivity.md), [11](../../physics/11-circuits-potential-dividers-and-emf.md), [16](../../physics/16-capacitance.md).

Equations to recall: V = IR; series and parallel resistance; E = Pt; P = VI = I²R = V²/R. Equations given: C = Q/V, capacitors in series and parallel, Vrms = V₀/√2 and Irms = I₀/√2 (select and apply).

## CC2(a), (b), (c) Circuit symbols, resistance and combinations

### What you need to know

- Use standard symbols to read and draw circuit diagrams.
- Resistance R = V/I; use V = IR; effects of resistors in circuits.
- Series: R = R₁ + R₂ + ...; parallel: 1/R = 1/R₁ + 1/R₂ + ...; two in parallel: R = R₁R₂/(R₁ + R₂).

### Explained

In series, the same current flows through each resistor and voltages add. In parallel, each branch has the same voltage and currents add; the combined resistance is less than the smallest branch.

Resistors limit current (for example to protect an LED), divide voltages, pull logic inputs up or down, and set gain in amplifiers.

### Worked example

A 2.2 kΩ resistor in series with a parallel pair of 4.7 kΩ and 10 kΩ. Parallel = 4.7 × 10 ÷ 14.7 = 3.20 kΩ. Total = 5.40 kΩ. On a 9 V supply, I = 9 ÷ 5.40 = 1.67 mA; voltage across the parallel pair = 1.67 × 3.20 = 5.33 V.

## CC2(d) Kirchhoff's laws and Thevenin's theorem

### What you need to know

Analyse circuits with a single power supply using Kirchhoff's laws and Thevenin's theorem.

### Explained

- **Kirchhoff's current law** (charge is conserved): the total current into any junction equals the total current out.
- **Kirchhoff's voltage law** (energy is conserved): around any closed loop, the sum of the emfs equals the sum of the potential drops (IR).

**Thevenin's theorem**: any linear network of resistors and sources, seen from two terminals, behaves like a single voltage source V_TH in series with a single resistance R_TH.

- V_TH = the open-circuit voltage between the terminals (no load).
- R_TH = the resistance seen looking back into the terminals with the supply replaced by its internal resistance (an ideal voltage source by a short circuit).

For a voltage divider (R₁ top, R₂ bottom, supply Vs): V_TH = Vs × R₂/(R₁ + R₂); R_TH = R₁R₂/(R₁ + R₂). A load R_L then receives V_L = V_TH × R_L/(R_TH + R_L). This explains loading.

### Worked example

A divider: R₁ = 10 kΩ, R₂ = 10 kΩ, Vs = 12 V, loaded by 20 kΩ. V_TH = 6 V; R_TH = 5 kΩ. V_L = 6 × 20 ÷ 25 = 4.8 V (not 6 V). To keep loading under 5%, R_L must be at least about 20 times R_TH.

## CC2(e) The E24 series

### What you need to know

Choose appropriate preferred values from the E24 series.

### Explained

Resistors are made in preferred values. The E24 series has 24 values per decade with about ±5% tolerance: 1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1 (× 10ⁿ). Neighbouring values differ by about 10%, so every value is covered within tolerance. Choose the nearest value, or the next value up when a minimum resistance is needed (for example to keep current below a limit).

### Worked example

A calculation gives 310 Ω for an LED series resistor. Nearest E24 values: 300 Ω and 330 Ω. Choose 330 Ω so the current is slightly below, not above, the maximum.

## CC2(f), (g) Capacitance

### What you need to know

- C = Q/V.
- Capacitors are the basis of timing circuits; series: 1/C = 1/C₁ + 1/C₂ + ...; two in series: C = C₁C₂/(C₁ + C₂); parallel: C = C₁ + C₂ + ...

### Explained

A capacitor stores charge on two plates separated by an insulator. Capacitance (farads) is charge stored per volt. Capacitors in parallel add (more plate area); in series the total is less than the smallest (like resistors in parallel). Charging through a resistor takes time, set by RC, so capacitors set time delays and frequencies ([11](11-timing-circuits.md)); they also smooth power supplies ([16](16-mains-power-supply-systems.md)), block DC and pass AC, and form filters ([07](07-ac-circuits-and-passive-filters.md)).

### Worked example

Two 47 µF capacitors in series: C = 47 × 47 ÷ 94 = 23.5 µF. In parallel: 94 µF. A 100 µF capacitor at 12 V stores Q = CV = 1.2 mC.

## CC4 Energy and power

### What you need to know

- (a) Power is the rate of doing work; E = Pt.
- (b) Select and apply Vrms = V₀/√2 and Irms = I₀/√2, including power in sinusoidal AC circuits.
- (c) P = VI = I²R = V²/R for AC and DC.

### Explained

Power (W) = energy transferred per second. For AC, use rms values: the rms value of an AC voltage is the steady DC voltage that would dissipate the same average power in a resistor. For a sine wave, rms = peak ÷ √2 ≈ 0.707 × peak. UK mains: 230 V rms, so the peak is 325 V. Peak-to-peak is twice the peak.

Average power in a resistor with AC: P = Vrms × Irms = Irms²R = Vrms²/R. Peak power is twice the average.

### Worked example

A 16 Ω loudspeaker receives a sine wave of 12 V peak. Vrms = 12 ÷ √2 = 8.49 V. P = 8.49² ÷ 16 = 4.5 W. Energy in 10 minutes: E = Pt = 4.5 × 600 = 2700 J.

A resistor has 0.25 W maximum rating and 1 kΩ resistance. Maximum current: I = √(P/R) = √(0.25 ÷ 1000) = 15.8 mA.

### Common mistakes

- Adding parallel resistances directly.
- Using peak values in AC power calculations.
- Forgetting to replace the source with a short circuit when finding R_TH.
- Rounding a resistor down so that a current limit is exceeded.

## Check questions

1. Calculate the combined resistance of 330 Ω in series with (1 kΩ parallel with 1 kΩ). (2)
2. State Kirchhoff's two laws and the conservation law behind each. (4)
3. A divider of 22 kΩ (top) and 10 kΩ (bottom) on 15 V supplies a 47 kΩ load. Find the Thevenin equivalent and the load voltage. (4)
4. A calculated resistor value is 5.3 kΩ. Choose an E24 value and explain your choice if the current must not exceed a limit. (2)
5. Calculate the combined capacitance of 10 µF and 22 µF in series. (2)
6. Calculate the charge on a 470 µF capacitor at 9 V. (1)
7. Mains is 230 V rms. Calculate the peak and peak-to-peak voltages. (2)
8. A 60 W heater runs from 230 V rms. Calculate its rms current, its resistance, and the energy it uses in 2 hours in kWh. (4)

## Mark scheme

1. Parallel pair = 500 Ω (1); total 830 Ω (1).
2. Current law: sum of currents into a junction = sum out (1), conservation of charge (1); voltage law: sum of emfs = sum of pd drops round a loop (1), conservation of energy (1).
3. V_TH = 15 × 10 ÷ 32 = 4.69 V (1); R_TH = 22 × 10 ÷ 32 = 6.88 kΩ (1); V_L = 4.69 × 47 ÷ 53.9 (1) = 4.09 V (1).
4. 5.6 kΩ (1); next value up keeps current below the limit (1).
5. 10 × 22 ÷ 32 (1) = 6.875 µF ≈ 6.9 µF (1).
6. Q = 470 × 10⁻⁶ × 9 = 4.23 mC (1).
7. Peak = 230 × √2 = 325 V (1); peak-to-peak = 650 V (1).
8. I = 60 ÷ 230 = 0.261 A (1); R = 230² ÷ 60 = 882 Ω (1); E = 0.060 kW × 2 h (1) = 0.12 kWh (1).
