---
level: A-level
subject: Further Mathematics
topic: "Roots of polynomial equations"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["D1", "D2"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP4.1", "CP4.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.05a", "4.05b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pa1", "Pa2"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Roots of polynomial equations

This file covers the relationships between the roots and coefficients of quadratic, cubic and quartic equations, symmetric functions of the roots, and forming new equations whose roots are related to the roots of a given equation.

## Overview

AS content on every board. It uses expanding brackets and the factor theorem ([../maths/03-algebra-polynomials-and-partial-fractions.md](../maths/03-algebra-polynomials-and-partial-fractions.md)) and complex roots ([02-complex-numbers-cartesian-form-and-polynomial-roots.md](02-complex-numbers-cartesian-form-and-polynomial-roots.md)).

### Board differences

- AQA D1, D2; Edexcel CP4.1, CP4.2; OCR 4.05a, 4.05b; MEI Pa1, Pa2.
- AQA D2 and Edexcel CP4.2 name linear transformations of the roots (such as 2α + 1) for equations of at least cubic degree. OCR 4.05b and MEI Pa2 ask for a substitution that gives an equation with related roots. The substitution method below also handles non-linear cases such as α² or 1/α, so learn it in general.

## D1 Roots and coefficients

*Refs: AQA D1 · Edexcel CP4.1 · OCR 4.05a · MEI Pa1. Level: AS & A.*

### What you need to know

For az² + bz + c = 0 with roots α, β:

```latex
\alpha+\beta = -\frac{b}{a}, \qquad \alpha\beta = \frac{c}{a}
```

For az³ + bz² + cz + d = 0 with roots α, β, γ:

```latex
\sum\alpha = -\frac{b}{a},\quad \sum\alpha\beta = \frac{c}{a},\quad \alpha\beta\gamma = -\frac{d}{a}
```

For az⁴ + bz³ + cz² + dz + e = 0 with roots α, β, γ, δ:

```latex
\sum\alpha = -\frac{b}{a},\ \sum\alpha\beta = \frac{c}{a},\ \sum\alpha\beta\gamma = -\frac{d}{a},\ \alpha\beta\gamma\delta = \frac{e}{a}
```

- Useful identities for symmetric functions:

```latex
\sum\alpha^2 = \left(\sum\alpha\right)^2 - 2\sum\alpha\beta
```

```latex
\alpha^3+\beta^3 = (\alpha+\beta)^3 - 3\alpha\beta(\alpha+\beta)
```

```latex
\sum\frac{1}{\alpha} = \frac{\sum\alpha\beta}{\alpha\beta\gamma}\ \text{(cubic)}
```

### Explained

Expanding a(z − α)(z − β)(z − γ) and comparing with az³ + bz² + cz + d gives the cubic results. The signs alternate: −, +, −, +.

Σαβ means the sum over every pair: for a cubic, αβ + βγ + γα; for a quartic, six products.

To find any expression that is symmetric in the roots, rewrite it in terms of Σα, Σαβ, Σαβγ, ... For powers, Σα³ for a cubic can be found from the fact that each root satisfies the equation: aα³ = −bα² − cα − d, then sum over the roots.

### Worked example

α, β, γ are the roots of 2z³ − 3z² + 4z − 5 = 0. Find Σα², Σ1/α and Σα³.

1. Σα = 3/2, Σαβ = 2, αβγ = 5/2.
2. Σα² = 9/4 − 4 = −7/4. (Negative, so not all roots are real.)
3. Σ1/α = Σαβ/αβγ = 2/(5/2) = 4/5.
4. Each root satisfies 2α³ = 3α² − 4α + 5. Summing: 2Σα³ = 3Σα² − 4Σα + 15 = −21/4 − 6 + 15 = 15/4. Σα³ = 15/8.

The roots of z³ − 9z² + kz − 24 = 0 are in arithmetic progression. Find k and the roots.

1. Let the roots be a − d, a, a + d. Sum 3a = 9, a = 3.
2. 3 is a root: 27 − 81 + 3k − 24 = 0, k = 26.
3. Product: 3(9 − d²) = 24, d² = 1. Roots 2, 3, 4.

The quartic z⁴ + pz³ + qz² + rz + 26 = 0 has real coefficients and roots 2 + 3i and 1 − i. Find p, q and r.

1. Roots 2 ± 3i, 1 ± i. Check the product: 13 × 2 = 26 ✓.
2. Σα = 6, so p = −6.
3. Factors: (z² − 4z + 13)(z² − 2z + 2) = z⁴ − 6z³ + (2 + 8 + 13)z² + (−8 − 26)z + 26.
4. p = −6, q = 23, r = −34.

### Common mistakes

- Sign errors: for a cubic, Σα = −b/a and αβγ = −d/a.
- Forgetting to divide by a when the leading coefficient is not 1.
- Assuming Σα² must be positive.

## D2 Transforming equations

*Refs: AQA D2 · Edexcel CP4.2 · OCR 4.05b · MEI Pa2. Level: AS & A.*

### What you need to know

- To find an equation whose roots are f(α), f(β), ...: let w = f(z), rearrange to z = f⁻¹(w), and substitute into the original equation.
- Alternatively, find the new sum, pair sum and product and build the equation.

### Explained

The substitution method is usually fastest. If the new roots are 2α + 1, put w = 2z + 1, so z = (w − 1)/2. Substitute and multiply through to clear fractions. Every root α of the old equation gives a root w = 2α + 1 of the new one.

For new roots α², use w = z², z = √w. Rearrange so the odd powers of √w are on one side, then square both sides.

### Worked example

α, β, γ are the roots of z³ − 2z² + 3z − 4 = 0. Find the cubic with roots α + 2, β + 2, γ + 2.

1. w = z + 2, z = w − 2.
2. (w − 2)³ − 2(w − 2)² + 3(w − 2) − 4 = 0.
3. w³ − 6w² + 12w − 8 − 2w² + 8w − 8 + 3w − 6 − 4 = 0.
4. w³ − 8w² + 23w − 26 = 0.

Same equation: find the cubic with roots 3α, 3β, 3γ.

1. z = w/3: w³/27 − 2w²/9 + w − 4 = 0.
2. × 27: w³ − 6w² + 27w − 108 = 0.

Same equation: find the cubic with roots α², β², γ².

1. z = √w: w√w − 2w + 3√w − 4 = 0.
2. √w(w + 3) = 2w + 4. Square: w(w + 3)² = (2w + 4)².
3. w³ + 6w² + 9w = 4w² + 16w + 16.
4. w³ + 2w² − 7w − 16 = 0.
5. Check: new sum −2 should equal Σα² = 4 − 6 = −2 ✓.

α, β are the roots of 3z² − 5z + 1 = 0. Find the quadratic with roots α/β and β/α.

1. α + β = 5/3, αβ = 1/3.
2. Sum: (α² + β²)/αβ = (25/9 − 2/3)/(1/3) = (19/9) × 3 = 19/3.
3. Product: 1.
4. z² − (19/3)z + 1 = 0, or 3z² − 19z + 3 = 0.

### Common mistakes

- Substituting z = w + 2 instead of z = w − 2 for roots α + 2.
- Leaving fractional coefficients when integer coefficients are asked for.

## Check questions

1. α and β are the roots of 2z² + 6z − 3 = 0. Find α² + β² and 1/α + 1/β. [3 marks]
2. α, β, γ are the roots of z³ + 4z² − 2z + 7 = 0. Find Σα², (α + 1)(β + 1)(γ + 1) and Σα³. [6 marks]
3. The equation 4z³ − 12z² + 9z − 2 = 0 has a repeated root. Using the relationships between roots and coefficients, find all three roots. [6 marks]
4. α, β, γ are the roots of 2z³ + z² − 5z + 3 = 0. Use a substitution to find the cubic with integer coefficients whose roots are 2α − 1, 2β − 1, 2γ − 1. [4 marks]
5. α, β, γ are the roots of z³ − 3z + 1 = 0. Find the cubic whose roots are 1/α, 1/β, 1/γ. [3 marks]
6. A quartic z⁴ − 6z³ + az² + bz + c = 0 has real coefficients. Two of its roots are 1 + 2i and 2 − i. Find a, b and c. [5 marks]
7. The roots of z³ + pz² + 56z − 64 = 0 are in geometric progression. Find p and the roots. [5 marks]

## Mark scheme

1. α + β = −3, αβ = −3/2 (1). α² + β² = 9 + 3 = 12 (1). 1/α + 1/β = −3/(−3/2) = 2 (1).
2. Σα = −4, Σαβ = −2, αβγ = −7 (1). Σα² = 16 + 4 = 20 (1). Product = αβγ + Σαβ + Σα + 1 = −7 − 2 − 4 + 1 = −12 (2). α³ = −4α² + 2α − 7, so Σα³ = −4(20) + 2(−4) − 21 = −109 (2).
3. Roots α, α, β: 2α + β = 3, α² + 2αβ = 9/4, α²β = 1/2 (1). Substitute β = 3 − 2α into the second: 4α² − 8α + 3 = 0 (2), α = 1/2 or 3/2 (1). α = 3/2 gives β = 0, failing the product (1). Roots 1/2, 1/2, 2 (1).
4. z = (w + 1)/2 (1). 2(w + 1)³/8 + (w + 1)²/4 − 5(w + 1)/2 + 3 = 0 (1). × 4: (w + 1)³ + (w + 1)² − 10(w + 1) + 12 = 0 (1). w³ + 4w² − 5w + 4 = 0 (1).
5. z = 1/w: 1/w³ − 3/w + 1 = 0 (1). × w³: 1 − 3w² + w³ = 0 (1). w³ − 3w² + 1 = 0 (1).
6. Factors (z² − 2z + 5)(z² − 4z + 5) (2) = z⁴ − 6z³ + 18z² − 30z + 25 (2). a = 18, b = −30, c = 25 (1).
7. Roots a/r, a, ar: product a³ = 64, a = 4 (1). 4 is a root: 64 + 16p + 224 − 64 = 0, p = −14 (1). Σαβ = a²(1/r + 1 + r) = 56, so 1/r + 1 + r = 7/2 (1), 2r² − 5r + 2 = 0, r = 2 or ½ (1). Roots 2, 4, 8 (1).
