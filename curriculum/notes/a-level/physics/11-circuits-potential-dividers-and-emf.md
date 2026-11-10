---
level: A-level
subject: Physics
topic: "DC circuits: series and parallel, power, Kirchhoff's laws, potential dividers, e.m.f. and internal resistance"
as_content: "AS & A for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.5.1.4", "3.5.1.5", "3.5.1.6", "RP6"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["34", "35", "36", "37", "42", "43", "44", "45", "46", "CP3"]
  - board: OCR A
    code: "H556"
    spec_refs: ["4.1.1(g)", "4.2.2(b)", "4.2.2(c)", "4.2.5(a)", "4.2.5(b)", "4.2.5(c)", "4.3.1(a)", "4.3.1(b)", "4.3.1(c)", "4.3.1(d)", "4.3.1(e)", "4.3.1(f)", "4.3.2(a)", "4.3.2(b)", "4.3.2(c)", "4.3.3(a)", "4.3.3(b)", "4.3.3(c)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["3.1.2(a)(iii)", "3.1.2(a)(iv)", "3.1.2(a)(v)", "3.1.2(a)(vii)", "3.1.2(a)(ix)", "3.1.2(c)(i)", "3.1.2(c)(ii)", "3.1.2(c)(iv)", "3.1.2(d)(iii)", "3.1.2(d)(v)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C2.2(f)", "C2.3(a)", "C2.3(b)", "C2.3(c)", "C2.3(d)", "C2.3(e)", "C2.3(f)", "C2.3(g)", "C2.3(h)", "C2.3(i)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# DC circuits: series and parallel, power, Kirchhoff's laws, potential dividers, e.m.f. and internal resistance

This file covers how current and p.d. share out in circuits (from conservation of charge and energy), combining resistors, electrical power and energy, potential dividers with sensors, and e.m.f. and internal resistance, with AQA required practical 6.

## Overview

AS & A for every board. Definitions of current, p.d. and resistance are in file 10. Capacitors in circuits are in file 16.

### Board differences

- AQA 3.5.1.4 to 3.5.1.6, RP6 · Edexcel 34 to 37, 42 to 46, CP3 · OCR A 4.1.1(g), 4.2.2(b), (c), 4.2.5, 4.3 · OCR B 3.1.2 · Eduqas C2.2(f), C2.3.
- OCR A 4.3.1(f) asks for circuits with more than one source of e.m.f. using Kirchhoff's laws; OCR A 4.2.5(c) the kilowatt-hour.
- Edexcel 42 asks how the potential varies along a uniform current-carrying wire.
- AQA says the potentiometer as a measuring instrument is not required.
- OCR B uses conductance: in parallel, G = G₁ + G₂; in series, 1/G = 1/G₁ + 1/G₂; and Vout = Vin × R₂/(R₁ + R₂).
- Internal resistance practical: AQA RP6, Edexcel CP3, OCR A PAG4, OCR B 3.1.2(d)(v), Eduqas specified practical.
- Edexcel CP12 (calibrating a thermistor in a potential divider as a thermostat) is in file 13 with thermal physics, but its circuit is explained here.

## 3.5.1.4 Circuits

*Refs: AQA 3.5.1.4 · Edexcel 34, 35, 36, 37 · OCR A 4.1.1(g), 4.2.5(a) to (c), 4.3.1(a) to (f) · OCR B 3.1.2(a)(iii), (v), (ix), (c)(i), (ii) · Eduqas C2.2(f), C2.3(a) to (d). Level: AS & A.*

### What you need to know

- Resistors in series: R_T = R₁ + R₂ + R₃ + …; in parallel: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃ + ….
- Energy and power: E = IVt; P = IV = I²R = V²/R.
- How current, p.d. and resistance relate in series and parallel circuits, including cells in series and identical cells in parallel.
- Conservation of charge (Kirchhoff's first law) and of energy (Kirchhoff's second law) in d.c. circuits; deriving the resistor combination rules from them (Edexcel 36).

### Explained

**Kirchhoff's first law** (conservation of charge). The total current into a junction equals the total current out. Charge cannot build up at a point.

**Kirchhoff's second law** (conservation of energy). Around any closed loop, the sum of the e.m.f.s equals the sum of the p.d.s (IR terms). Energy given to each coulomb by sources equals energy transferred by that coulomb in components.

**Series.** Same current I through each. The p.d.s add: V = V₁ + V₂ + V₃. Dividing by I: R_T = R₁ + R₂ + R₃. The total resistance is larger than any one resistor.

**Parallel.** Same p.d. V across each branch. The currents add: I = I₁ + I₂ + I₃. Dividing by V: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃. The total resistance is smaller than the smallest branch. Two equal resistors in parallel: R/2. Two resistors: R_T = R₁R₂/(R₁ + R₂).

**Cells.**

- Cells in series: e.m.f.s add (taking direction into account), and internal resistances add.
- n identical cells in parallel: total e.m.f. = one cell's e.m.f.; internal resistance = r/n. They can supply a larger current for longer.

**Power and energy.** P = IV. Substituting V = IR: P = I²R = V²/R. Energy transferred: E = IVt = Pt.

- P = I²R is useful when the current is known (series), P = V²/R when the p.d. is known (parallel).
- Kilowatt-hour (OCR A 4.2.5(c)): the energy transferred by a 1 kW device in 1 hour = 3.6 MJ. Cost = kW h used × price per kW h.

**Solving circuits.** Reduce combinations step by step to find total resistance and supply current, then work back out to find each current and p.d. For circuits with two e.m.f.s (OCR A 4.3.1(f)), label unknown currents, apply the first law at junctions and the second law around enough loops, and solve the simultaneous equations. A negative answer means the current flows the other way.

### Worked example

1. A 6.0 Ω resistor is in series with a parallel pair of 4.0 Ω and 12 Ω, across a 12 V supply with no internal resistance. Find the supply current and the current in the 12 Ω resistor.

   Parallel pair: 4.0 × 12/16 = 3.0 Ω. Total = 9.0 Ω. I = 12/9.0 = 1.33 A. P.d. across the pair = 1.33 × 3.0 = 4.0 V. Current in 12 Ω = 4.0/12 = 0.33 A.

2. A 2.0 kW heater runs for 3.0 hours a day. Electricity costs 28p per kW h. Find the weekly cost.

   Energy = 2.0 × 3.0 × 7 = 42 kW h. Cost = 42 × 28 = £11.76.

3. (OCR A) Two batteries, ε₁ = 6.0 V and ε₂ = 4.0 V, are connected positive to positive through resistors 2.0 Ω (with ε₁) and 3.0 Ω (with ε₂), and a 5.0 Ω resistor connects the junctions. Find the current in the 5.0 Ω resistor.

   Let I₁ flow from ε₁ through 2.0 Ω, I₂ from ε₂ through 3.0 Ω, both into the junction; I₁ + I₂ flows through 5.0 Ω. Loop 1: 6.0 = 2.0I₁ + 5.0(I₁ + I₂). Loop 2: 4.0 = 3.0I₂ + 5.0(I₁ + I₂). So 7I₁ + 5I₂ = 6 and 5I₁ + 8I₂ = 4. Solving: I₁ = (48 − 20)/(56 − 25) = 0.903 A; I₂ = (4 − 5 × 0.903)/8 = −0.065 A. Current in 5.0 Ω = 0.84 A. (The negative I₂ means ε₂ is being charged.)

### Common mistakes

- Adding resistances in parallel.
- Forgetting to take the reciprocal at the end of 1/R_T.
- Saying current divides equally between unequal parallel branches (more current goes through the smaller resistance).
- Using P = V²/R with the supply p.d. for a component in series.

## 3.5.1.5 Potential divider

*Refs: AQA 3.5.1.5 · Edexcel 42, 43, 44 · OCR A 4.3.3(a) to (c) · OCR B 3.1.2(a)(vii), (c)(iv), (d)(iii) · Eduqas C2.3(e). Level: AS & A.*

### What you need to know

- A potential divider supplies a fixed or variable p.d. from a power supply.
- Using variable resistors, thermistors and LDRs in potential dividers; designing circuits to achieve a given output (e.g. a sensor that turns on a device when it gets dark or cold).
- (Edexcel 42) The p.d. along a uniform wire carrying a current varies linearly with distance.

### Explained

Two resistors in series across an input p.d. Vin share it in the ratio of their resistances: V₁/V₂ = R₁/R₂. The output across R₂ is:

**Vout = Vin × R₂/(R₁ + R₂)**

**Variable output.** Replace the pair with a potentiometer (a resistor with a sliding contact), or make one resistor variable. A potentiometer can give any p.d. from 0 to Vin, which is why it is used to vary p.d. smoothly from zero when measuring I–V characteristics.

**Sensor circuits.**

- Thermistor at the bottom (output across thermistor): as temperature rises, R_thermistor falls, so Vout falls. Put the thermistor at the top to make Vout rise with temperature (useful for a fan or alarm that switches on when hot).
- LDR at the bottom: as light gets brighter, R_LDR falls, Vout falls. Rises in the dark: suitable for switching on a street light.
- A variable resistor in place of the fixed one sets the temperature or light level at which the output reaches the switching voltage.

**Loading.** If a device with resistance R_L is connected across the output, it is in parallel with R₂, reducing the effective resistance and so reducing Vout. To avoid this, R_L should be much larger than R₂.

**Potential along a uniform wire** (Edexcel 42). A uniform wire with a current has equal resistance per unit length, so potential falls linearly from one end to the other. A sliding contact on the wire gives an output p.d. proportional to the distance.

### Worked example

1. A 9.0 V supply is connected across 2.2 kΩ and 6.8 kΩ in series. Find the p.d. across the 6.8 kΩ resistor.

   Vout = 9.0 × 6.8/9.0 = 6.8 V.

2. A thermistor (resistance 1.5 kΩ at 20 °C, 400 Ω at 60 °C) is in series with a 1.0 kΩ resistor across 5.0 V. Find the p.d. across the fixed resistor at each temperature.

   20 °C: 5.0 × 1.0/2.5 = 2.0 V. 60 °C: 5.0 × 1.0/1.4 = 3.6 V. The output across the fixed resistor rises as it gets hotter.

3. A voltmeter of resistance 10 kΩ is connected across the 6.8 kΩ resistor in example 1. Find its reading.

   Parallel: 6.8 × 10/16.8 = 4.05 kΩ. Vout = 9.0 × 4.05/(2.2 + 4.05) = 5.8 V (lower than 6.8 V because of loading).

### Common mistakes

- Putting the output across the wrong resistor.
- Forgetting the thermistor's resistance falls (not rises) with temperature.
- Ignoring the effect of a load connected across the output.

## 3.5.1.6 Electromotive force and internal resistance

*Refs: AQA 3.5.1.6, RP6 · Edexcel 45, 46, CP3 · OCR A 4.2.2(b), (c), 4.3.2(a) to (c) · OCR B 3.1.2(a)(iv), (c)(i), (d)(v) · Eduqas C2.3(f) to (i). Level: AS & A.*

### What you need to know

- E.m.f. ε = E/Q: the energy transferred to each coulomb of charge by the source.
- The terminal p.d. is less than the e.m.f. when a current flows, because of internal resistance: ε = I(R + r) = V + Ir.
- The difference between e.m.f. and p.d. in terms of energy transfer (OCR A 4.2.2(c)).
- Calculations where internal resistance is not negligible.
- AQA RP6 / Edexcel CP3: measure the e.m.f. and internal resistance from the variation of terminal p.d. with current.

### Explained

**E.m.f. and p.d.** Both are measured in volts (J C⁻¹), but:

- E.m.f. ε is the energy transferred *to* each coulomb by the source (from chemical, mechanical or light energy into electrical).
- P.d. V is the energy transferred *from* each coulomb in a component (electrical into other forms).

**Internal resistance.** Real sources have resistance inside them (the chemicals in a cell, the coils of a generator). Some energy is dissipated inside the source as charge passes through it. So:

ε = I(R + r) → ε = V + Ir

where V = IR is the terminal p.d. and Ir is the "lost volts". When no current flows (open circuit, or a very high-resistance voltmeter), V = ε.

**Effects.**

- The terminal p.d. falls as the current drawn increases.
- Large currents heat the source (power I²r wasted).
- Short-circuit current (R = 0) = ε/r. A car battery has very small r (to deliver hundreds of amps to the starter motor); a high-voltage supply for schools has large r for safety.

**Graph.** V = ε − rI is a straight line (y = c + mx) when V is plotted against I. Intercept on the V axis = ε. Gradient = −r.

**Power to the load** (extension). Maximum power is delivered to the external resistance when R = r.

### Worked example

1. A cell of e.m.f. 1.5 V and internal resistance 0.50 Ω is connected to a 2.5 Ω resistor. Find the current, terminal p.d. and lost volts.

   I = 1.5/3.0 = 0.50 A. V = 0.50 × 2.5 = 1.25 V. Lost volts = 0.25 V.

2. A battery's terminal p.d. is 8.4 V when it supplies 2.0 A and 7.8 V when it supplies 3.5 A. Find ε and r.

   8.4 = ε − 2.0r; 7.8 = ε − 3.5r. Subtract: 0.6 = 1.5r, r = 0.40 Ω. ε = 8.4 + 0.8 = 9.2 V.

3. Four cells, each 1.5 V, 0.30 Ω, are in series with a 4.8 Ω lamp. Find the current.

   ε = 6.0 V, r = 1.2 Ω. I = 6.0/6.0 = 1.0 A.

### Common mistakes

- Saying e.m.f. is a force.
- Forgetting that the voltmeter across the terminals reads V, not ε, when a current flows.
- Using the gradient of the V–I graph as +r.
- Adding internal resistances of parallel cells instead of dividing.

### Practical

**AQA required practical 6** (also Edexcel CP3, OCR A PAG4, OCR B 3.1.2(d)(v), Eduqas specified practical): investigate the e.m.f. and internal resistance of a cell.

1. Connect the cell in series with a variable resistor (rheostat), an ammeter and a switch. Connect a voltmeter across the cell terminals. A small fixed resistor in series protects against short-circuiting.
2. Close the switch; record V and I. Open the switch between readings to stop the cell warming (r changes with temperature) and running down.
3. Change the resistance to get at least 6 pairs of readings over a wide range of current.
4. Plot V (y-axis) against I (x-axis). Draw the best straight line. ε = y-intercept; r = −gradient.

Errors: the e.m.f. falls slowly as the cell is used; internal resistance rises as the cell warms. A high-resistance digital voltmeter is close to ideal. Safety: do not short-circuit the cell (it can get very hot).

**Potential divider with sensors** (OCR A 4.3.3(c)(ii) PAG4, OCR B 3.1.2(d)(iii)). Build a thermistor or LDR potential divider; measure Vout as temperature (water bath) or light level (lamp at different distances, or a light meter) changes. Plot Vout against the variable.

## Check questions

1. State Kirchhoff's two laws and the conservation principle behind each. (4 marks)
2. Derive the formula for the total resistance of two resistors in parallel. (3 marks)
3. Three 6.0 Ω resistors can be connected in different ways. Find the largest and smallest total resistances possible and one other value. (3 marks)
4. A 60 W, 230 V lamp is used. Find its resistance and the current. (2 marks)
5. Design a potential divider circuit using an LDR and a 10 kΩ variable resistor whose output rises when it gets dark. Explain how it works. (4 marks)
6. Define e.m.f. and explain why the terminal p.d. of a battery falls when it supplies a larger current. (3 marks)
7. A battery has e.m.f. 12.0 V and internal resistance 0.20 Ω. Find the terminal p.d. when it delivers 15 A, and the power wasted inside the battery. (3 marks)
8. Describe how to measure the e.m.f. and internal resistance of a cell, including the graph you would plot. (6 marks)

## Mark scheme

1. First: sum of currents into a junction = sum out (1); conservation of charge (1). Second: sum of e.m.f.s = sum of p.d.s around a closed loop (1); conservation of energy (1).
2. Same p.d. V across each; I = I₁ + I₂ (1); V/R_T = V/R₁ + V/R₂ (1); 1/R_T = 1/R₁ + 1/R₂ (1).
3. Series: 18 Ω (1); parallel: 2.0 Ω (1); either 9.0 Ω (two parallel + one series) or 4.0 Ω (two series in parallel with one) (1).
4. I = P/V = 0.26 A (1); R = V²/P = 880 Ω (1).
5. LDR in series with variable resistor across supply, output taken across LDR (1); in the dark LDR resistance rises (1); LDR takes a larger share of the p.d., so Vout rises (1); variable resistor sets the light level at which switching occurs (1).
6. Energy transferred to each coulomb by the source / ε = E/Q (1); internal resistance (1); more current means more lost volts Ir, so V = ε − Ir falls (1).
7. V = 12.0 − 15 × 0.20 = 9.0 V (2); P = I²r = 225 × 0.20 = 45 W (1).
8. Cell with variable resistor, ammeter in series and voltmeter across cell (1); protective resistor / switch off between readings (1); vary resistance, record V and I, at least 6 readings (1); plot V against I (1); intercept on V axis = e.m.f. (1); gradient = −r (1).
