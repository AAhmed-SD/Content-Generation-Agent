---
level: A-level
subject: Chemistry
topic: "Rate equations, orders, half-life and the Arrhenius equation"
as_content: "A-level only for every board, except colorimetry for following a reaction (Eduqas C2.3(g)), which is AS."
boards:
  - board: AQA
    code: "7405"
    spec_refs: ["3.1.9.1", "3.1.9.2", "RP7"]
  - board: Edexcel
    code: "9CH0"
    spec_refs: ["16.1", "16.2", "16.3", "16.4", "16.5", "16.6", "16.7", "16.8", "16.9", "16.10", "16.11", "16.12", "CP13a", "CP13b", "CP14"]
  - board: OCR A
    code: "H432"
    spec_refs: ["5.1.1(a)", "5.1.1(b)", "5.1.1(c)", "5.1.1(d)", "5.1.1(e)", "5.1.1(f)", "5.1.1(g)", "5.1.1(h)", "5.1.1(i)", "5.1.1(j)", "5.1.1(k)"]
  - board: OCR B
    code: "H433"
    spec_refs: ["CI(a)", "CI(b)", "CI(c)", "CI(d)", "CI(e)"]
  - board: Eduqas
    code: "A410QS"
    spec_refs: ["C2.3(g)", "PI3(a)", "PI3(b)", "PI3(c)", "PI3(d)", "PI3(e)", "PI3(f)", "PI3 SP1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/chemistry/a-level/chemistry-7405/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/chemistry-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-a-h032-h432-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-b-salters-h033-h433-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/chemistry-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/chemistry-revision/
---

# Rate equations, orders, half-life and the Arrhenius equation

Rate equations turn "it goes faster with more acid" into numbers. This file covers rate equations and orders, the rate constant and its units, finding orders from initial rates and from graphs, half-life, the rate-determining step and mechanisms, and the Arrhenius equation. It includes AQA required practical 7.

## Overview

A-level only. It builds on collision theory in file 5. SN1 and SN2 mechanisms for halogenoalkanes (file 19) are the classic example of linking rate equations to mechanisms.

### Board differences

- AQA 3.1.9.1, 3.1.9.2 and RP7. AQA gives the Arrhenius equation in the data booklet and expects its use, including ln k against 1/T.
- Edexcel 16.1 to 16.12 and CP13a (continuous monitoring), CP13b (initial rate, clock reaction), CP14 (activation energy). Edexcel uses the hydrolysis of halogenoalkanes (16.11) and the iodination of propanone to link rate equations to mechanisms.
- OCR A 5.1.1(a) to (k), with half-life from concentration–time graphs (5.1.1(e), (f)) and rate constant from rate–concentration graphs (5.1.1(g)).
- OCR B CI(a) to (e) in the Chemical industry storyline: half-lives, techniques, the Arrhenius equation and the rate-determining step.
- Eduqas PI3(a) to (f) and C2.3(g) (colorimetry, AS), with the specified practical: determining the order of a reaction.

## 3.1.9.1 Rate equations

*Refs: AQA 3.1.9.1 · Edexcel 16.1, 16.2, 16.9 to 16.12 · OCR A 5.1.1(a) to (c), (i) to (k) · OCR B CI(a), CI(d), CI(e) · Eduqas PI3(c) to (f). Level: A-level only.*

### What you need to know

- Rate = k[A]ᵐ[B]ⁿ. m and n are the orders with respect to A and B, usually 0, 1 or 2. The overall order is m + n.
- Orders can only be found by experiment, not from the balanced equation.
- k is the rate constant. Work out its units.
- k increases with temperature.
- The rate-determining step is the slowest step; the rate equation shows which species are in it (or in steps before it).
- The Arrhenius equation, k = Ae^(−Eₐ/RT), and ln k = ln A − Eₐ/RT.

### Explained

**Orders.**

| Order in A | Effect of doubling [A] on rate |
| --- | --- |
| 0 | No change |
| 1 | Doubles |
| 2 | Quadruples |

A species with order zero does not appear in the rate equation, but it still reacts. It takes part after the rate-determining step.

**Units of k.** Rearrange: k = rate ÷ (concentration terms). Rate is in mol dm⁻³ s⁻¹.

| Overall order | Units of k |
| --- | --- |
| 0 | mol dm⁻³ s⁻¹ |
| 1 | s⁻¹ |
| 2 | dm³ mol⁻¹ s⁻¹ |
| 3 | dm⁶ mol⁻² s⁻¹ |

**Rate-determining step.** The overall rate cannot be faster than the slowest step. The species in the rate equation are those taking part in the rate-determining step (and any steps before it).

For the reaction 2NO₂ + F₂ → 2NO₂F, rate = k[NO₂][F₂]. A possible mechanism: NO₂ + F₂ → NO₂F + F (slow), then NO₂ + F → NO₂F (fast). The slow step contains one NO₂ and one F₂, matching the rate equation.

For the hydrolysis of 2-bromo-2-methylpropane, rate = k[(CH₃)₃CBr]. Only the halogenoalkane is in the slow step: it ionises to a carbocation first (SN1), and OH⁻ attacks afterwards. For 1-bromobutane, rate = k[C₄H₉Br][OH⁻], so both are in the single step (SN2). See file 19.

For the acid-catalysed iodination of propanone, CH₃COCH₃ + I₂ → CH₃COCH₂I + HI, rate = k[CH₃COCH₃][H⁺]. Iodine is zero order, so it is not in the slow step; H⁺ appears although it is a catalyst.

**Effect of temperature.** Raising the temperature increases k (the orders do not change). The Arrhenius equation:

k = Ae^(−Eₐ/RT)

- A is the pre-exponential (frequency) factor: related to collision frequency and orientation.
- e^(−Eₐ/RT) is the fraction of collisions with at least Eₐ.
- Taking logs: ln k = ln A − (Eₐ/R)(1/T). A graph of ln k (y) against 1/T (x) is a straight line with gradient −Eₐ/R and intercept ln A.

Since rate ∝ k, and for a clock reaction rate ∝ 1/t, ln(1/t) against 1/T also has gradient −Eₐ/R.

### Worked example

1. Rate = k[A]²[B]. When [A] = 0.20 mol dm⁻³ and [B] = 0.50 mol dm⁻³, rate = 4.0 × 10⁻³ mol dm⁻³ s⁻¹. Find k with units.

   k = 4.0 × 10⁻³ ÷ (0.20² × 0.50) = 4.0 × 10⁻³ ÷ 0.020 = 0.20 dm⁶ mol⁻² s⁻¹.

2. A plot of ln k against 1/T has gradient −6800 K. Find Eₐ.

   Eₐ = −gradient × R = 6800 × 8.31 = 56 500 J mol⁻¹ = 56.5 kJ mol⁻¹.

3. For a reaction with Eₐ = 50.0 kJ mol⁻¹, by what factor does k increase from 300 K to 310 K (assume A is constant)?

   ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂) = (50 000 ÷ 8.31)(1/300 − 1/310) = 6017 × 1.075 × 10⁻⁴ = 0.647. k₂/k₁ = e⁰·⁶⁴⁷ = 1.91. The rate nearly doubles.

### Common mistakes

- Taking orders from the coefficients in the equation.
- Forgetting to convert Eₐ from J to kJ, or using T in °C.
- Saying a catalyst cannot be in the rate equation. It can (H⁺ above).
- Saying zero-order reactants do not react.

## 3.1.9.2 Determination of rate equation

*Refs: AQA 3.1.9.2, RP7 · Edexcel 16.3 to 16.8, 16.12, CP13a, CP13b, CP14 · OCR A 5.1.1(b), (d) to (h), (k) · OCR B CI(b), CI(c) · Eduqas PI3(a), (b), C2.3(g). Level: A-level only.*

### What you need to know

- Find orders from initial rate data in a table.
- Find orders from concentration–time graphs (shape and half-lives) and from rate–concentration graphs.
- Half-life of a first-order reaction is constant; t½ = ln 2 ÷ k.
- Methods: initial rates (including clock reactions) and continuous monitoring (gas volume, mass loss, colorimetry, titration of samples, pH, conductivity).
- Find Eₐ graphically from experiments at different temperatures.

### Explained

**Initial rates method.** Run several experiments, changing one concentration at a time. Compare pairs where only one concentration changes.

**Graphs.**

| Graph | Zero order | First order | Second order |
| --- | --- | --- | --- |
| Concentration against time | Straight line, falling | Curve with constant half-life | Steeper curve; half-life increases as concentration falls |
| Rate against concentration | Horizontal line | Straight line through origin (gradient = k) | Upward curve (parabola) |

**Half-life** is the time taken for the concentration of a reactant to halve. For first order it is the same whatever the starting concentration: k = ln 2 ÷ t½ = 0.693 ÷ t½. Radioactive decay is first order.

**Continuous monitoring.** One experiment, measuring concentration over time. Draw tangents to find rates at different concentrations, or check successive half-lives. Methods:

- Gas volume with a gas syringe, or mass loss on a balance (for reactions giving off a gas).
- **Colorimetry** (Eduqas C2.3(g)): if one species is coloured (for example iodine, or manganate(VII)), shine light of a suitable colour (the complementary colour) through the solution and measure absorbance. Absorbance is proportional to concentration, so make a calibration curve with known concentrations first.
- Withdraw samples at intervals, quench them (dilute in cold water or neutralise the catalyst) and titrate.
- pH meter or conductivity meter when the number of ions changes.

**Clock reactions (initial rates).** Measure the time, t, to reach a fixed point early in the reaction (a colour appears). Initial rate ∝ 1/t, assuming the rate is roughly constant over that short time.

### Worked example

1. Find the rate equation from the data.

   | Expt | [A] / mol dm⁻³ | [B] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
   | --- | --- | --- | --- |
   | 1 | 0.10 | 0.10 | 2.0 × 10⁻⁴ |
   | 2 | 0.20 | 0.10 | 8.0 × 10⁻⁴ |
   | 3 | 0.10 | 0.30 | 6.0 × 10⁻⁴ |

   Expt 1 → 2: [A] doubles, rate × 4, so second order in A. Expt 1 → 3: [B] × 3, rate × 3, so first order in B. Rate = k[A]²[B]. k = 2.0 × 10⁻⁴ ÷ (0.01 × 0.10) = 0.20 dm⁶ mol⁻² s⁻¹.

2. A first-order reaction has a half-life of 46 s. Find k, and the fraction of reactant left after 138 s.

   k = 0.693 ÷ 46 = 0.0151 s⁻¹. 138 s = 3 half-lives, so ⅛ is left.

### Practical

**AQA RP7: measuring the rate of reaction by an initial rate method and by a continuous monitoring method.**

*Initial rate (iodine clock).* Mix potassium iodide, sodium thiosulfate and starch in a flask. Add hydrogen peroxide (or persulfate) and start the timer. Stop when the blue-black colour appears. Repeat with different iodide concentrations, keeping total volume constant by adding water. Plot 1/t against [I⁻]: a straight line through the origin shows first order.

*Continuous monitoring.* For example, iodine with propanone in acid: the brown iodine colour fades. Take samples every minute and quench with sodium hydrogencarbonate (to remove the acid catalyst), then titrate the iodine left with thiosulfate. Or follow the colour with a colorimeter. A straight-line concentration–time graph shows iodine is zero order.

**Edexcel CP13a, CP13b, CP14.** CP13a: continuous monitoring (for example propanone and iodine). CP13b: initial rate by a clock method. CP14: run a clock reaction at five or more temperatures (water bath), plot ln(1/t) against 1/T, and find Eₐ = −gradient × R.

**Eduqas: determining the order of a reaction** such as the oxidation of iodide ions by peroxodisulfate, using a clock method.

### Common mistakes

- Changing two concentrations at once and claiming an order.
- Measuring half-life from the start only once and assuming first order. Check two or more successive half-lives.
- Reading the rate as the concentration rather than the gradient of the curve.

## Check questions

1. The rate equation for a reaction is rate = k[X][Y]². State the overall order and give the units of k. (2 marks)
2. Use the data to deduce the order with respect to P and Q, and write the rate equation. (4 marks)

   | Expt | [P] | [Q] | Rate / mol dm⁻³ s⁻¹ |
   | --- | --- | --- | --- |
   | 1 | 0.050 | 0.050 | 1.5 × 10⁻⁵ |
   | 2 | 0.100 | 0.050 | 3.0 × 10⁻⁵ |
   | 3 | 0.100 | 0.150 | 3.0 × 10⁻⁵ |

3. Calculate k from experiment 1 above, with units. (2 marks)
4. Sketch a rate–concentration graph for a reactant that is first order. (1 mark)
5. Explain how a concentration–time graph can show that a reaction is first order. (2 marks)
6. The reaction H₂O₂ + 2I⁻ + 2H⁺ → I₂ + 2H₂O has rate = k[H₂O₂][I⁻]. Suggest the species in the rate-determining step and why H⁺ does not appear. (2 marks)
7. In a set of experiments, ln k was plotted against 1/T. The line had a gradient of −9.40 × 10³ K. Calculate Eₐ in kJ mol⁻¹. (2 marks)
8. Describe how a colorimeter could be used to follow the reaction of a coloured reactant. (3 marks)

## Mark scheme

1. Third order (1); dm⁶ mol⁻² s⁻¹ (1).
2. P: [P] doubles, rate doubles, first order (1)(1 for reasoning). Q: [Q] trebles, rate unchanged, zero order (1). Rate = k[P] (1).
3. k = 1.5 × 10⁻⁵ ÷ 0.050 = 3.0 × 10⁻⁴ (1); s⁻¹ (1).
4. Straight line through the origin (1).
5. Measure successive half-lives (1); constant half-life shows first order (1).
6. One H₂O₂ and one I⁻ (1); H⁺ reacts in a step after the rate-determining step / fast step (1).
7. Eₐ = 9.40 × 10³ × 8.31 (1) = 78.1 kJ mol⁻¹ (1).
8. Choose a filter of the complementary colour / wavelength absorbed by the reactant (1); make a calibration curve of absorbance against known concentrations (1); measure absorbance at time intervals and convert to concentration (1).
