---
level: A-level
subject: Chemistry
topic: "Electrode potentials and electrochemical cells"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7405"
    spec_refs: ["3.1.11.1", "3.1.11.2", "RP8"]
  - board: Edexcel
    code: "9CH0"
    spec_refs: ["14.1", "14.2", "14.3", "14.4", "14.5", "14.6", "14.7", "14.8", "14.9", "14.10", "14.11", "14.12", "14.13", "14.14", "14.15", "14.16", "14.17", "CP10"]
  - board: OCR A
    code: "H432"
    spec_refs: ["5.2.3(f)", "5.2.3(g)", "5.2.3(h)", "5.2.3(i)", "5.2.3(j)"]
  - board: OCR B
    code: "H433"
    spec_refs: ["DM(d)", "DM(e)", "DM(f)"]
  - board: Eduqas
    code: "A410QS"
    spec_refs: ["PI1.1(c)", "PI1.1(d)", "PI1.1(e)", "PI1.1(f)", "PI1.1 SP1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/chemistry/a-level/chemistry-7405/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/chemistry-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-a-h032-h432-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-b-salters-h033-h433-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/chemistry-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/chemistry-revision/
---

# Electrode potentials and electrochemical cells

An electrochemical cell separates the two halves of a redox reaction so the electrons flow through a wire. This file covers half-cells, the standard hydrogen electrode, standard electrode potentials, cell diagrams, calculating cell EMF, predicting feasibility, and commercial cells including fuel cells. It includes AQA required practical 8.

## Overview

A-level only. You need half-equations from file 7. Redox titrations and the redox chemistry of transition metals use these ideas in file 15.

### Board differences

- AQA 3.1.11.1, 3.1.11.2 and RP8.
- Edexcel 14.1 to 14.17 and CP10. Edexcel adds: Eₒ cell is proportional to ΔS(total) and ln K (14.11); limits of predictions from E⦵ (14.12); disproportionation and E⦵ (14.14); the hydrogen–oxygen fuel cell in acid and alkali (14.17); the importance of conditions (14.9).
- OCR A 5.2.3(f) to (j), with storage and fuel cells (5.2.3(j)).
- OCR B DM(d) to (f) in Developing metals: simple cells, electron flow, and standard electrode potentials.
- Eduqas PI1.1(c) to (f), including the benefits and risks of the hydrogen fuel cell (PI1.1(f)), and the specified practical: building cells and measuring Ecell.

## 3.1.11.1 Electrode potentials and cells

*Refs: AQA 3.1.11.1, RP8 · Edexcel 14.1 to 14.14, CP10 · OCR A 5.2.3(f) to (i) · OCR B DM(d) to (f) · Eduqas PI1.1(c) to (e). Level: A-level only.*

### What you need to know

- IUPAC cell diagrams.
- The standard hydrogen electrode (SHE) and why it is the reference.
- Standard electrode potential, E⦵: the EMF of a half-cell connected to the SHE under standard conditions.
- Standard conditions: 298 K, 100 kPa, 1.00 mol dm⁻³ solutions.
- The electrochemical series; E⦵ values to predict the direction of reactions.
- E(cell) = E(right) − E(left), or E(reduced half) − E(oxidised half).
- Different types of half-cell: metal/metal ion, two ions of the same element (platinum electrode), gas/ion (platinum electrode).

### Explained

**Half-cells.** A zinc rod in Zn²⁺(aq) sets up the equilibrium Zn²⁺ + 2e⁻ ⇌ Zn. Zinc tends to lose electrons, so the rod becomes negative. A copper rod in Cu²⁺ is less inclined to lose electrons. Join them by a wire and a salt bridge (filter paper soaked in saturated potassium nitrate) and electrons flow from zinc to copper.

The salt bridge completes the circuit by letting ions move between the solutions without mixing them. KNO₃ is used because its ions do not react with the half-cell ions (KCl would precipitate Ag⁺, for example).

**Standard hydrogen electrode.** H₂ gas at 100 kPa bubbled over a platinum electrode (coated with platinum black for a large surface) dipped in 1.00 mol dm⁻³ H⁺ (for example HCl), at 298 K. Its potential is defined as 0.00 V. Platinum is inert and conducts.

When there is no solid metal in the half-cell (Fe³⁺/Fe²⁺, or Cl₂/Cl⁻), use a platinum electrode. For Fe³⁺/Fe²⁺, both ions are 1.00 mol dm⁻³.

**Cell diagrams.** Write the oxidised half-cell on the left, with the reduced form at the electrode:

Zn(s) | Zn²⁺(aq) ‖ Cu²⁺(aq) | Cu(s)   E(cell) = +1.10 V

- A single line is a phase boundary; the double line is the salt bridge.
- With platinum: Pt(s) | H₂(g) | H⁺(aq) ‖ Fe³⁺(aq), Fe²⁺(aq) | Pt(s). Species in the same phase are separated by a comma.

**The electrochemical series.** Half-equations written as reductions, listed by E⦵:

| Half-equation | E⦵ / V |
| --- | --- |
| Li⁺ + e⁻ ⇌ Li | −3.04 |
| Zn²⁺ + 2e⁻ ⇌ Zn | −0.76 |
| Fe²⁺ + 2e⁻ ⇌ Fe | −0.44 |
| 2H⁺ + 2e⁻ ⇌ H₂ | 0.00 |
| Cu²⁺ + 2e⁻ ⇌ Cu | +0.34 |
| I₂ + 2e⁻ ⇌ 2I⁻ | +0.54 |
| Fe³⁺ + e⁻ ⇌ Fe²⁺ | +0.77 |
| Ag⁺ + e⁻ ⇌ Ag | +0.80 |
| Br₂ + 2e⁻ ⇌ 2Br⁻ | +1.09 |
| Cr₂O₇²⁻ + 14H⁺ + 6e⁻ ⇌ 2Cr³⁺ + 7H₂O | +1.33 |
| Cl₂ + 2e⁻ ⇌ 2Cl⁻ | +1.36 |
| MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O | +1.51 |
| F₂ + 2e⁻ ⇌ 2F⁻ | +2.87 |

The more positive E⦵, the stronger the oxidising agent on the left (it is more easily reduced). The more negative E⦵, the stronger the reducing agent on the right.

**Predicting feasibility.** A reaction is feasible if E(cell) is positive, calculated as E(half being reduced) − E(half being oxidised). A quick rule: the species on the left of the more positive half-equation will oxidise the species on the right of the less positive one ("anticlockwise rule").

Example: will Cl₂ oxidise Fe²⁺? Cl₂/Cl⁻ +1.36 is more positive than Fe³⁺/Fe²⁺ +0.77. E(cell) = 1.36 − 0.77 = +0.59 V, feasible: Cl₂ + 2Fe²⁺ → 2Cl⁻ + 2Fe³⁺.

**Links to thermodynamics (Edexcel 14.11).** E(cell) is proportional to ΔS(total) and to ln K for the cell reaction: a large positive E(cell) means a large K, and a reaction that goes nearly to completion. (ΔG = −nFE(cell).)

**Limits of predictions (Edexcel 14.12, OCR A).** E⦵ shows whether a reaction is thermodynamically feasible, not how fast it goes. A feasible reaction may be too slow because of a high activation energy. Also, real conditions are often not standard: different concentrations or temperatures change the electrode potentials. If [Zn²⁺] is lowered, the equilibrium Zn²⁺ + 2e⁻ ⇌ Zn shifts left, so E becomes more negative.

**Disproportionation (Edexcel 14.14).** Cu⁺ disproportionates in solution because E⦵(Cu⁺/Cu) = +0.52 V is more positive than E⦵(Cu²⁺/Cu⁺) = +0.15 V: E(cell) = 0.52 − 0.15 = +0.37 V for 2Cu⁺ → Cu + Cu²⁺.

### Worked example

1. Calculate E(cell) and write the overall equation for a cell made from Ag⁺/Ag (+0.80 V) and Zn²⁺/Zn (−0.76 V).

   Ag⁺ is reduced (more positive). E(cell) = 0.80 − (−0.76) = +1.56 V. Zn + 2Ag⁺ → Zn²⁺ + 2Ag.

2. Write the cell diagram for question 1.

   Zn(s) | Zn²⁺(aq) ‖ Ag⁺(aq) | Ag(s).

3. Will iodine oxidise Fe²⁺ ions?

   I₂/I⁻ (+0.54) is less positive than Fe³⁺/Fe²⁺ (+0.77). E(cell) = 0.54 − 0.77 = −0.23 V. Not feasible. The reverse happens: Fe³⁺ oxidises I⁻.

### Common mistakes

- Doubling E⦵ when a half-equation is multiplied by 2. E⦵ does not depend on amount.
- Forgetting a platinum electrode for an ion/ion or gas/ion half-cell.
- Writing a salt bridge as a wire, or saying electrons flow through the salt bridge (ions do).
- Saying a positive E(cell) means the reaction is fast.

### Practical

**AQA RP8: measuring the EMF of an electrochemical cell.** Clean metal strips with emery paper (removes oxide layer) and degrease with propanone. Put each in 1.00 mol dm⁻³ of its sulfate (or nitrate) solution in a beaker. Join with a salt bridge of filter paper soaked in saturated KNO₃. Connect the metals to a high-resistance voltmeter (so almost no current flows and the EMF is measured, not a lower voltage). Record the reading. A new salt bridge is needed for each cell. The measured value differs from the data value if solutions are not exactly 1 mol dm⁻³, the temperature is not 298 K, or the metal surface is not clean.

**Edexcel CP10; Eduqas specified practical.** The same method, building several cells and comparing measured and calculated values, including cells with a concentration change and with a non-metal half-cell (such as Fe³⁺/Fe²⁺ with platinum).

## 3.1.11.2 Commercial applications of electrochemical cells

*Refs: AQA 3.1.11.2 · Edexcel 14.15 to 14.17 · OCR A 5.2.3(j) · Eduqas PI1.1(f). Level: A-level only.*

### What you need to know

- Electrochemical cells are used as non-rechargeable cells, rechargeable cells and fuel cells.
- Rechargeable cells: the reactions can be reversed by applying a current.
- Given data, deduce the electrode reactions and the EMF.
- The hydrogen–oxygen fuel cell: electrode reactions in acid and in alkali; benefits and risks.

### Explained

**Non-rechargeable** cells (for example zinc–carbon or alkaline batteries) run until a reactant is used up. The products cannot be turned back into reactants by charging.

**Rechargeable** cells, such as lithium-ion and lead–acid, have reactions that reverse when charged. A lithium-ion cell: during discharge, at the positive electrode Li⁺ + CoO₂ + e⁻ → Li⁺[CoO₂]⁻; at the negative electrode Li → Li⁺ + e⁻. EMF about 3.6 V. Charging reverses both.

**Fuel cells** use a continuous supply of fuel and oxygen; they do not need recharging. The fuel is not burned; the chemical energy becomes electrical energy directly, so they are more efficient than engines.

Hydrogen fuel cell, **alkaline** electrolyte (KOH):

- Negative electrode: H₂ + 2OH⁻ → 2H₂O + 2e⁻ (E⦵ of the reduction is −0.83 V)
- Positive electrode: O₂ + 2H₂O + 4e⁻ → 4OH⁻ (E⦵ +0.40 V)
- Overall: 2H₂ + O₂ → 2H₂O, E(cell) = 1.23 V.

**Acid** electrolyte (a polymer membrane that lets H⁺ through):

- Negative: H₂ → 2H⁺ + 2e⁻ (0.00 V)
- Positive: O₂ + 4H⁺ + 4e⁻ → 2H₂O (+1.23 V)
- Overall the same, E(cell) = 1.23 V.

Fuel cells can also use methanol or ethanol: CH₃OH + H₂O → CO₂ + 6H⁺ + 6e⁻ at the negative electrode (Edexcel 14.16).

**Benefits and risks.**

| Benefits | Risks and drawbacks |
| --- | --- |
| Only product is water: no CO₂ or NOₓ at point of use | Hydrogen is mostly made from fossil fuels (methane), which releases CO₂, or by electrolysis using electricity that may come from fossil fuels |
| More efficient than combustion engines | Hydrogen is flammable and explosive; hard to store (high pressure or very low temperature) |
| Quiet, few moving parts | Fuel cells use expensive catalysts such as platinum and have a limited life |

Cells in general: useful, but used cells contain toxic or flammable materials (lithium, cadmium, lead) and must be recycled.

### Common mistakes

- Saying a fuel cell stores electricity. It converts chemical energy continuously while fuel is supplied.
- Saying hydrogen cars produce no CO₂ at all. The hydrogen may be made in ways that release CO₂.

## Check questions

1. Describe the standard hydrogen electrode. (4 marks)
2. State the purpose of the salt bridge and suggest why potassium nitrate is used. (2 marks)
3. Write the cell diagram for a cell made from Fe³⁺/Fe²⁺ (+0.77 V) and Cu²⁺/Cu (+0.34 V), and calculate E(cell). (3 marks)
4. Use E⦵ values from this file to predict whether bromine will oxidise iron(II) ions. Write the equation if it does. (3 marks)
5. Explain why the measured EMF of a Zn/Cu cell might differ from the calculated standard value. (2 marks)
6. Explain why a high-resistance voltmeter is used. (1 mark)
7. Write the electrode equations for a hydrogen–oxygen fuel cell with an alkaline electrolyte. (2 marks)
8. Give one advantage and one disadvantage of hydrogen fuel cells compared with petrol engines. (2 marks)
9. The concentration of Cu²⁺ in a Zn/Cu cell is increased. State and explain the effect on E(cell). (2 marks)

## Mark scheme

1. Hydrogen gas at 100 kPa (1); bubbled over platinum electrode (1); in 1.00 mol dm⁻³ H⁺ / HCl (1); at 298 K, potential defined as 0.00 V (1).
2. Completes the circuit / allows ions to move between half-cells (1); KNO₃ ions do not react with the ions in the half-cells / no precipitates (1).
3. Cu(s) | Cu²⁺(aq) ‖ Fe³⁺(aq), Fe²⁺(aq) | Pt(s) (2: 1 for correct order, 1 for Pt and comma); E(cell) = 0.77 − 0.34 = +0.43 V (1).
4. Br₂/Br⁻ +1.09 V more positive than Fe³⁺/Fe²⁺ +0.77 V (1); E(cell) = +0.32 V, so feasible (1); Br₂ + 2Fe²⁺ → 2Br⁻ + 2Fe³⁺ (1).
5. Any two: solutions not 1.00 mol dm⁻³; temperature not 298 K; dirty / oxidised electrodes; resistance in circuit / current drawn.
6. So no (negligible) current flows, giving the true EMF (1).
7. H₂ + 2OH⁻ → 2H₂O + 2e⁻ (1); O₂ + 2H₂O + 4e⁻ → 4OH⁻ (1).
8. Advantage: only water produced / more efficient (1). Disadvantage: hydrogen hard to store / flammable / made from fossil fuels / expensive platinum (1).
9. E(cell) increases (1); Cu²⁺ + 2e⁻ ⇌ Cu shifts right, so copper electrode potential more positive (1).
