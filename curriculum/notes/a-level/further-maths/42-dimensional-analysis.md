---
level: A-level
subject: Further Mathematics
topic: "Dimensional analysis"
as_content: "AS on OCR (6.01 Stage 1) and MEI (Mechanics Major and Minor, section (a)). AQA is option content. Edexcel does not include it."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["MA1", "MA2"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.01a", "6.01b", "6.01c", "6.01d", "6.01e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mq1", "Mq2", "Mq3", "Mq4", "Mq5", "Mq6", "Mq7"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Dimensional analysis

This file covers the dimensions of quantities in terms of mass M, length L and time T, units and changing units, checking equations for dimensional consistency, dimensionless quantities, and using dimensions to predict the form of a formula.

## Overview

Mechanics quantities and SI units are in A-level Maths ([../maths/24-mechanics-quantities-units-and-modelling.md](../maths/24-mechanics-quantities-units-and-modelling.md)).

### Board differences

- AQA MA1, MA2; OCR 6.01a to 6.01e; MEI Mq1 to Mq7. Edexcel 9FM0 does not include dimensional analysis.
- OCR 6.01e and MEI Mq7 include formulating a model from dimensional analysis and using it.

## MA1 Dimensions and consistency

*Refs: AQA MA1 · OCR 6.01a, 6.01b, 6.01c · MEI Mq1, Mq2, Mq3, Mq4, Mq5. Level: AS & A (OCR, MEI).*

### What you need to know

| Quantity | Dimensions | SI unit |
| --- | --- | --- |
| velocity | LT⁻¹ | m s⁻¹ |
| acceleration | LT⁻² | m s⁻² |
| force | MLT⁻² | N |
| momentum, impulse | MLT⁻¹ | N s |
| energy, work | ML²T⁻² | J |
| power | ML²T⁻³ | W |
| pressure | ML⁻¹T⁻² | Pa |
| density | ML⁻³ | kg m⁻³ |
| angle, coefficient of friction, strain | dimensionless | none |

- In a valid equation every term has the same dimensions (dimensional consistency). Dimensions are multiplied and divided like algebra; numbers have no dimensions.
- Arguments of functions such as sin, e^x and ln must be dimensionless.

### Explained

Write [x] for the dimensions of x. A dimension check catches algebra errors, but it cannot find wrong numerical constants.

Changing units: replace each unit by its equivalent and simplify. For example 1 g cm⁻³ = 10⁻³ kg ÷ 10⁻⁶ m³ = 1000 kg m⁻³.

### Worked example

Find the dimensions of the gravitational constant G in F = Gm₁m₂/r².

1. [G] = [F][r²]/[m]² = MLT⁻² × L²/M² = M⁻¹L³T⁻².

Check whether v² = u² + 2as is dimensionally consistent.

1. [v²] = L²T⁻², [2as] = LT⁻² × L = L²T⁻². Consistent.

Convert 72 km h⁻¹ to m s⁻¹ and 3 g cm⁻³ to kg m⁻³.

1. 72 × 1000/3600 = 20 m s⁻¹.
2. 3 × 1000 = 3000 kg m⁻³.

### Common mistakes

- Giving a dimensionless quantity a dimension (radians, coefficients).

## MA2 Predicting formulae

*Refs: AQA MA2 · OCR 6.01d, 6.01e · MEI Mq6, Mq7. Level: AS & A (OCR, MEI).*

### What you need to know

- Assume a formula of the form Q = k aˣ bʸ cᶻ with k dimensionless. Equate the powers of M, L and T on both sides and solve.
- Use the formula with experimental data to find k, or to predict how Q changes when one quantity changes.

### Worked example

The period T of a pendulum may depend on its length l, the mass m and g. Find the form of the formula.

1. T = k lᵃ mᵇ gᶜ. Dimensions: T¹ = Lᵃ Mᵇ (LT⁻²)ᶜ.
2. M: b = 0. L: a + c = 0. T: −2c = 1, c = −½, a = ½.
3. T = k√(l/g). The period does not depend on the mass.

The drag force on a car depends on air density ρ, speed v and frontal area A. Find the form, and the effect of doubling the speed.

1. F = k ρᵃ vᵇ Aᶜ. MLT⁻² = (ML⁻³)ᵃ (LT⁻¹)ᵇ L^{2c}.
2. M: a = 1. T: b = 2. L: −3 + 2 + 2c = 1, c = 1.
3. F = kρv²A. Doubling v multiplies the force by 4.

### Common mistakes

- Including k in the dimension equations.

## Check questions

1. Find the dimensions of power, and show that P = Fv is dimensionally consistent. [3 marks]
2. A student claims the kinetic energy of a spinning disc is ½mr²ω³, where ω is angular speed. Show that this is wrong. [3 marks]
3. The speed v of a wave on a stretched string depends on the tension T, the length l and the mass m. Find the form of the formula. [5 marks]
4. The frequency f of a vibrating drop depends on its radius r, density ρ and surface tension σ (dimensions MT⁻²). Show that f = k√(σ/(ρr³)). [5 marks]
5. Convert a pressure of 5 N cm⁻² to N m⁻² and a density of 0.8 g cm⁻³ to kg m⁻³. [2 marks]

## Mark scheme

1. [P] = ML²T⁻³ (1). [Fv] = MLT⁻² × LT⁻¹ = ML²T⁻³ (2).
2. [ω] = T⁻¹ (1). [mr²ω³] = ML²T⁻³ (1), but energy is ML²T⁻², so inconsistent (1).
3. v = k Tᵃ lᵇ mᶜ (1). M: a + c = 0; L: a + b = 1; T: −2a = −1 (2). a = ½, c = −½, b = ½ (1). v = k√(Tl/m) (1).
4. f = k rᵃ ρᵇ σᶜ (1). T: −2c = −1, c = ½ (1). M: b + c = 0, b = −½ (1). L: a − 3b = 0, a = −3/2 (1). f = k√(σ/(ρr³)) (1).
5. 50 000 N m⁻² (1). 800 kg m⁻³ (1).
