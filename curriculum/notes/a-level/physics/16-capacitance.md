---
level: A-level
subject: Physics
topic: "Capacitance: capacitors, dielectrics, energy stored, charging and discharging"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.7.4.1", "3.7.4.2", "3.7.4.3", "3.7.4.4", "RP9"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["116", "117", "118", "119", "120", "CP11"]
  - board: OCR A
    code: "H556"
    spec_refs: ["6.1.1(a)", "6.1.1(b)", "6.1.1(c)", "6.1.1(d)", "6.1.1(e)", "6.1.2(a)", "6.1.2(b)", "6.1.2(c)", "6.1.3(a)", "6.1.3(b)", "6.1.3(c)", "6.1.3(d)", "6.1.3(e)", "6.2.3(b)", "6.2.4(c)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["5.1.1(a)(i)", "5.1.1(a)(ii)", "5.1.1(a)(iii)", "5.1.1(b)(i)", "5.1.1(b)(iv)", "5.1.1(b)(v)", "5.1.1(b)(vi)", "5.1.1(c)(iii)", "5.1.1(c)(iv)", "5.1.1(c)(v)", "5.1.1(d)(iii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C2.4(a)", "C2.4(b)", "C2.4(c)", "C2.4(d)", "C2.4(e)", "C2.4(f)", "C2.4(g)", "C2.4(h)", "C2.4(i)", "C2.4(j)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Capacitance: capacitors, dielectrics, energy stored, charging and discharging

A capacitor stores charge, and so energy, on two conducting plates separated by an insulator. This file covers capacitance, the parallel-plate capacitor and dielectrics, energy stored, capacitors in series and parallel, and exponential charging and discharging through a resistor, with AQA required practical 9.

## Overview

A-level only for every board. The uniform field between plates is in file 15. Exponential decay of radioactive nuclei, which uses the same mathematics, is in file 18.

### Board differences

- AQA 3.7.4, RP9 · Edexcel 116 to 120, CP11 · OCR A 6.1, 6.2.3(b), 6.2.4(c) · OCR B 5.1.1 · Eduqas C2.4.
- Capacitors in series and parallel: OCR A 6.1.1(c), (d) and Eduqas C2.4(h). Not required by AQA or Edexcel (but useful).
- Dielectrics and relative permittivity: AQA 3.7.4.2 (including how polar molecules rotate in a field), OCR A 6.2.3(b), Eduqas C2.4(e). Edexcel and OCR B do not require dielectrics.
- OCR A 6.2.4(c): capacitance of an isolated sphere, C = 4πε₀R.
- OCR A 6.1.3(d) and OCR B 5.1.1(c)(iv): model discharge in small time steps (iterative / spreadsheet), from ΔQ/Δt = −Q/RC. OCR A 6.1.3(e): constant-ratio property of exponential decay.
- Edexcel CP11: use an oscilloscope or data logger to display charging and discharging. Eduqas specified practicals: charging/discharging, and energy stored in a capacitor.

## 3.7.4.1 Capacitance

*Refs: AQA 3.7.4.1 · Edexcel 116 · OCR A 6.1.1(a) to (e) · OCR B 5.1.1(a)(i), (c)(v) · Eduqas C2.4(a), (b), (c), (h). Level: A-level only.*

### What you need to know

- C = Q/V: charge stored per unit p.d. Unit the farad, F = C V⁻¹.
- (OCR A, Eduqas) Capacitors in series and in parallel.
- (Eduqas) A capacitor stores energy by moving charge from one plate to the other: the plates have equal and opposite charges and the net charge is zero.

### Explained

A capacitor is two conducting plates separated by an insulator (the dielectric, or just air/vacuum). When connected to a supply, electrons flow onto one plate and off the other: one plate becomes +Q, the other −Q. "Charge stored" means Q, the charge on one plate. Current flows in the wires while it charges, but no charge crosses the gap.

**Capacitance.** C = Q/V. 1 farad is large; typical capacitors are μF, nF or pF.

**Combinations** (OCR A, Eduqas).

- Parallel: same p.d.; charges add: C_total = C₁ + C₂ + ….
- Series: same charge on each; p.d.s add: 1/C_total = 1/C₁ + 1/C₂ + ….

(These are the opposite way round from resistors.)

### Worked example

1. A 470 μF capacitor is charged to 9.0 V. Find the charge stored.

   Q = CV = 470 × 10⁻⁶ × 9.0 = 4.2 × 10⁻³ C.

2. (OCR A, Eduqas) 20 μF and 30 μF in series across 12 V. Find the total capacitance and the p.d. across each.

   1/C = 1/20 + 1/30, C = 12 μF. Q = 12 × 10⁻⁶ × 12 = 1.44 × 10⁻⁴ C on each. V₂₀ = 7.2 V, V₃₀ = 4.8 V.

### Common mistakes

- Saying the net charge on a capacitor is 2Q (it is zero).
- Using the resistor rules for capacitors.

## 3.7.4.2 Parallel plate capacitor

*Refs: AQA 3.7.4.2 · OCR A 6.2.3(b), 6.2.4(c) · Eduqas C2.4(d), (e), (f). Level: A-level only.*

### What you need to know

- C = Aε₀ε_r/d for a parallel-plate capacitor.
- Relative permittivity ε_r (dielectric constant) and dielectric action; how a polar molecule rotates in an electric field.
- (OCR A) Isolated sphere: C = 4πε₀R.
- (Eduqas) The field between the plates is uniform: E = V/d.

### Explained

**C = Aε₀ε_r/d**, where A is the area of overlap of the plates, d the separation, ε₀ = 8.85 × 10⁻¹² F m⁻¹, and ε_r the relative permittivity of the material between the plates (1 for a vacuum, about 1 for air).

- Bigger plates: more room for charge, larger C.
- Closer plates: stronger attraction between opposite charges, so more charge for the same p.d.; larger C.

**Relative permittivity.** ε_r = ε/ε₀ = C with dielectric ÷ C without. Typical values: paper 3.7, glass 5 to 10, water about 80.

**Dielectric action.** Many dielectric molecules are polar: one end slightly positive, the other slightly negative. In the field between the plates, they rotate so that their negative ends face the positive plate and positive ends face the negative plate. These aligned dipoles produce their own electric field opposing the applied field, so the net field (and so p.d.) between the plates is reduced for the same charge. Since C = Q/V, the capacitance increases; or, at a fixed p.d. from the supply, more charge flows on to the plates. With an alternating field the molecules keep flipping, absorbing some energy.

**Isolated sphere** (OCR A). A sphere of radius R holding charge Q has potential V = Q/(4πε₀R), so C = Q/V = 4πε₀R.

### Worked example

1. Two square plates of side 0.20 m are 1.0 mm apart, separated by a dielectric with ε_r = 4.0. Find C.

   C = 0.040 × 8.85 × 10⁻¹² × 4.0 / 1.0 × 10⁻³ = 1.4 × 10⁻⁹ F (1.4 nF).

2. (OCR A) Find the capacitance of the Earth treated as an isolated sphere (R = 6.4 × 10⁶ m).

   C = 4π × 8.85 × 10⁻¹² × 6.4 × 10⁶ = 7.1 × 10⁻⁴ F, only about 700 μF.

### Common mistakes

- Using the diameter of circular plates as the radius.
- Saying the dielectric conducts.
- Saying polar molecules move to the plates.

### Practical

**Relative permittivity** (suggested by AQA). Measure the capacitance of two plates with a capacitance meter, first with air between them (using spacers) and then with a sheet of dielectric of the same thickness. ε_r = C_dielectric/C_air. Varying d (with several thin sheets) and plotting C against 1/d gives a straight line of gradient ε₀ε_rA.

## 3.7.4.3 Energy stored by a capacitor

*Refs: AQA 3.7.4.3 · Edexcel 117 · OCR A 6.1.2(a) to (c) · OCR B 5.1.1(a)(ii), (b)(vi), (c)(v) · Eduqas C2.4(g). Level: A-level only.*

### What you need to know

- The area under a graph of p.d. against charge is the energy stored.
- E = ½QV = ½CV² = ½Q²/C.
- (OCR A) Uses of capacitors as energy stores.

### Explained

Charging a capacitor means pushing more charge onto a plate that already holds charge of the same sign, which takes more work as V rises. A graph of V against Q is a straight line through the origin (V = Q/C). The work done adding a small charge ΔQ at p.d. V is VΔQ, a thin strip under the line. The total energy is the area under the line: a triangle, so

**E = ½QV = ½CV² = ½Q²/C**

When a capacitor is charged by a battery, the battery supplies QV, but only ½QV is stored; the other half is dissipated as heat in the resistance of the circuit, whatever that resistance is.

**Uses** (OCR A 6.1.2(c)). Camera flash (stores energy slowly from a battery, releases it quickly); defibrillator; back-up power for memory and clocks; smoothing the output of a rectifier; storing energy from regenerative braking (supercapacitors); timing circuits.

### Worked example

1. A defibrillator stores 150 J at 2.0 kV. Find C.

   C = 2E/V² = 300/(4.0 × 10⁶) = 7.5 × 10⁻⁵ F (75 μF).

2. A 2200 μF capacitor is charged to 12 V and discharged through a lamp in 0.50 s. Find the average power.

   E = ½ × 2200 × 10⁻⁶ × 144 = 0.158 J. P = 0.32 W.

### Common mistakes

- Using E = QV (that is the energy from the supply, not the energy stored).
- Forgetting the square in ½CV².

## 3.7.4.4 Capacitor charge and discharge

*Refs: AQA 3.7.4.4, RP9 · Edexcel 118, 119, 120, CP11 · OCR A 6.1.3(a) to (e) · OCR B 5.1.1(a)(iii), (b)(i), (iv), (v), (c)(iii), (iv), (d)(iii) · Eduqas C2.4(i), (j). Level: A-level only.*

### What you need to know

- Graphs of Q, V and I against time for charging and discharging through a resistor; meaning of gradients and areas.
- Time constant RC; finding it from data and graphs.
- Time to halve: T½ = 0.69RC.
- Discharge: Q = Q₀e^(−t/RC), and the matching equations for V and I.
- Charge: Q = Q₀(1 − e^(−t/RC)).
- AQA RP9: charge and discharge, with log-linear plotting to find RC.
- (Edexcel 120) ln Q = ln Q₀ − t/RC, and similar for I and V.

### Explained

**Discharging.** A capacitor charged to V₀ discharges through a resistor R. The current is I = V/R = Q/(RC). As charge flows off, V falls, so I falls, so charge flows off more slowly. The rate of loss is proportional to the charge left:

ΔQ/Δt = −Q/(RC)

This gives exponential decay:

- Q = Q₀e^(−t/RC)
- V = V₀e^(−t/RC)
- I = I₀e^(−t/RC) (current flows in the opposite direction to charging)

**Time constant** τ = RC (seconds, since Ω × F = s). After one time constant, Q has fallen to e⁻¹ = 0.37 of its starting value. After 5RC the capacitor is effectively discharged (less than 1% left).

**Half-time.** Setting Q = Q₀/2: e^(−t/RC) = ½, t = RC ln 2 = 0.69RC.

**Constant-ratio property** (OCR A 6.1.3(e)). In equal time intervals, the charge falls by the same fraction. For example, every 0.69RC it halves.

**Charging.** A capacitor is charged through R from a supply of e.m.f. ε (V₀). At first there is no charge, so the whole p.d. is across R, and the current is largest: I₀ = ε/R. As charge builds up, V_C rises, the p.d. across R falls, and the current falls.

- Q = Q₀(1 − e^(−t/RC)), V_C = V₀(1 − e^(−t/RC)): rise towards a maximum.
- I = I₀e^(−t/RC): current decays exponentially, as in discharge.
- After one time constant, Q has reached 63% of its final value.

**Gradients and areas.**

- Gradient of a Q–t graph = current.
- Area under an I–t graph = charge.

**Log-linear plots.** Taking natural logs of V = V₀e^(−t/RC): ln V = ln V₀ − t/RC. A graph of ln V against t is a straight line with gradient −1/RC and intercept ln V₀. This tests that the decay is exponential and gives RC accurately.

**Iterative modelling** (OCR A 6.1.3(d), OCR B 5.1.1(c)(iv)). Start with Q₀. In each small time step Δt: ΔQ = −(Q/RC)Δt; new Q = Q + ΔQ. With Δt = 0.1RC each step multiplies Q by 0.9; after 10 steps (t = RC) Q = 0.9¹⁰Q₀ = 0.35Q₀, close to the exact 0.37Q₀. Smaller steps are more accurate.

### Worked example

1. A 100 μF capacitor charged to 12 V discharges through 47 kΩ. Find the time constant, the p.d. after 10 s, and the time for the p.d. to fall to 3.0 V.

   RC = 100 × 10⁻⁶ × 47 000 = 4.7 s. V = 12e^(−10/4.7) = 12 × 0.119 = 1.43 V. 3.0 = 12e^(−t/4.7), t = 4.7 ln 4 = 6.5 s.

2. The same capacitor is charged from 0 V through the same resistor from a 12 V supply. Find the p.d. after 4.7 s and the initial current.

   V = 12(1 − e⁻¹) = 7.6 V. I₀ = 12/47 000 = 2.6 × 10⁻⁴ A.

3. A capacitor's p.d. falls from 10.0 V to 6.0 V in 2.0 s while discharging through 20 kΩ. Find C.

   6.0/10.0 = e^(−2.0/RC); ln 0.6 = −0.511 = −2.0/RC; RC = 3.92 s; C = 196 μF.

### Common mistakes

- Using log base 10 instead of natural log.
- Saying the current is constant while a capacitor charges.
- Thinking a capacitor discharges completely after one time constant.
- Saying charge passes through the dielectric.

### Practical

**AQA required practical 9** (also Edexcel CP11, OCR A 6.1.3(a)(ii) PAG9, OCR B 5.1.1(d)(iii), Eduqas specified practical): investigate charging and discharging of a capacitor.

1. Set up a capacitor (e.g. 1000 μF) and a resistor (e.g. 47 kΩ) in series with a two-way switch, so the capacitor can be charged from a d.c. supply and then discharged through the resistor. Put a voltmeter across the capacitor (or a data logger, or an oscilloscope for short time constants), or a microammeter in series.
2. Charge fully; switch to discharge and start a stopwatch. Record V (or I) every 5 or 10 s. With a large RC (tens of seconds), readings can be taken by hand; a data logger is better for short RC.
3. Plot V against t (exponential decay curve). Plot ln V against t: straight line, gradient = −1/RC. Compare RC with the product of the labelled values.
4. Repeat for charging: plot V against t, or ln(V₀ − V) against t (gradient −1/RC).

Errors: electrolytic capacitors have tolerances of ±20%; the voltmeter's own resistance provides a parallel discharge path (use a high-resistance digital meter); reaction time when reading meters (film the meters, or use a data logger). Safety: electrolytic capacitors must be connected the right way round (they can explode if reversed); do not exceed the rated voltage.

**Energy stored** (Eduqas specified practical). Charge a capacitor to different p.d.s and discharge it through a joulemeter, or through a small motor lifting a mass, or measure the temperature rise of a resistor; compare with ½CV², or plot energy against V² (straight line, gradient C/2).

## Check questions

1. Define capacitance. (1 mark)
2. Explain how a dielectric increases the capacitance of a parallel-plate capacitor. (3 marks)
3. Show that the energy stored by a capacitor is ½QV. (3 marks)
4. Calculate the energy stored in a 4.7 mF capacitor charged to 25 V. (2 marks)
5. A capacitor discharges through a resistor. Sketch graphs of V against t and of ln V against t, and state how to find RC from each. (4 marks)
6. A 220 μF capacitor discharges through a 100 kΩ resistor from 9.0 V. Calculate the charge remaining after 30 s. (3 marks)
7. Explain why the charging current falls as a capacitor charges. (3 marks)
8. Describe how to determine the time constant of an RC circuit experimentally. (5 marks)

## Mark scheme

1. Charge stored per unit p.d., C = Q/V (1).
2. Polar molecules in the dielectric align / rotate in the field (1); their field opposes the applied field (1); so less p.d. for the same charge (or more charge for the same p.d.), so C = Q/V increases (1).
3. V–Q graph is a straight line through origin (1); work to add charge ΔQ at p.d. V is VΔQ, so energy = area under graph (1); triangle area = ½QV (1).
4. E = ½CV² (1) = ½ × 4.7 × 10⁻³ × 625 = 1.5 J (1).
5. V–t: exponential decay curve; RC is time to fall to 0.37V₀ (or T½/0.69) (2); ln V–t: straight line with negative gradient (1); RC = −1/gradient (1).
6. RC = 22 s (1); Q₀ = 220 × 10⁻⁶ × 9.0 = 1.98 × 10⁻³ C (1); Q = 1.98 × 10⁻³ e^(−30/22) = 5.1 × 10⁻⁴ C (1).
7. As charge builds up the p.d. across the capacitor increases (1); p.d. across the resistor = ε − V_C falls (1); so current = (ε − V_C)/R falls (1).
8. Capacitor and resistor with two-way switch, charge from supply then discharge (1); voltmeter / data logger across capacitor (1); record V at regular time intervals (1); plot ln V against t (1); RC = −1/gradient (1).
