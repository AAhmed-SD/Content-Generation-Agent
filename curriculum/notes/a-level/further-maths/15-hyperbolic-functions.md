---
level: A-level
subject: Further Mathematics
topic: "Hyperbolic functions"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["H1", "H2", "H3", "H4", "H5", "H6", "H7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP5.6", "CP8.1", "CP8.2", "CP8.3", "CP8.4", "CP8.5"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.07a", "4.07b", "4.07c", "4.07d", "4.07e", "4.07f", "4.08g", "4.08h"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pa3", "Pa4", "Pa5", "Pa6", "Pa7", "Pa8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Hyperbolic functions

This file covers the definitions and graphs of sinh, cosh and tanh (and their reciprocals), hyperbolic identities, solving equations, calculus of hyperbolic functions, inverse hyperbolic functions and their logarithmic forms, and integrals that give inverse hyperbolic functions.

## Overview

All A-level only. You need exponentials and logarithms ([../maths/11-exponentials-and-logarithms.md](../maths/11-exponentials-and-logarithms.md)) and integration by substitution ([../maths/15-integration-techniques.md](../maths/15-integration-techniques.md)). The matching inverse trig integrals are in [13-further-calculus-inverse-trig-and-partial-fractions.md](13-further-calculus-inverse-trig-and-partial-fractions.md).

### Board differences

- AQA H1 to H7; Edexcel CP8.1 to CP8.5 (and CP5.6); OCR 4.07a to 4.07f, 4.08h; MEI Pa3 to Pa8.
- AQA H6 lists the identities sech²x = 1 − tanh²x and cosech²x = coth²x − 1 and the reciprocal functions; H7 asks for proofs involving hyperbolic identities. The other boards use cosh²x − sinh²x = 1 and the double "angle" forms.
- Integrals of 1/√(x² + a²) and 1/√(x² − a²): AQA H5, Edexcel CP8.5, OCR 4.08h, MEI Pa8.

## H1 Definitions and graphs

*Refs: AQA H1, H6 · Edexcel CP8.1 · OCR 4.07a, 4.07b · MEI Pa3. Level: A-level only.*

### What you need to know

```latex
\sinh x = \frac{e^x - e^{-x}}{2},\qquad \cosh x = \frac{e^x + e^{-x}}{2},\qquad \tanh x = \frac{\sinh x}{\cosh x} = \frac{e^{2x}-1}{e^{2x}+1}
```

- sech x = 1/cosh x, cosech x = 1/sinh x, coth x = 1/tanh x.
- Domains and ranges: sinh x, all real x to all reals (odd function); cosh x, all real x to cosh x ≥ 1 (even, minimum 1 at x = 0); tanh x, all real x to −1 < tanh x < 1 (odd, asymptotes y = ±1).

### Explained

cosh x is the average of eˣ and e⁻ˣ; sinh x is half their difference. For large x both are close to ½eˣ, and tanh x approaches 1. The graph of cosh x is the shape of a hanging chain (a catenary).

### Worked example

Find the exact value of tanh(ln 3).

1. e^{2 ln 3} = 9. tanh = (9 − 1)/(9 + 1) = 4/5.

Show that cosh x ≥ 1 for all x.

1. cosh x − 1 = (eˣ − 2 + e⁻ˣ)/2 = (e^{x/2} − e^{−x/2})²/2 ≥ 0.

### Common mistakes

- Swapping the signs in sinh and cosh.
- Saying tanh x reaches 1.

## H6 Hyperbolic identities and equations

*Refs: AQA H6, H7 · Edexcel CP8.1 · OCR 4.07c · MEI Pa4. Level: A-level only.*

### What you need to know

```latex
\cosh^2 x - \sinh^2 x \equiv 1
```

- sech²x ≡ 1 − tanh²x; cosech²x ≡ coth²x − 1.
- sinh 2x ≡ 2 sinh x cosh x; cosh 2x ≡ cosh²x + sinh²x ≡ 2cosh²x − 1 ≡ 1 + 2sinh²x.
- sinh(A ± B) ≡ sinh A cosh B ± cosh A sinh B; cosh(A ± B) ≡ cosh A cosh B ± sinh A sinh B.
- Prove identities from the exponential definitions.

### Explained

Hyperbolic identities look like trig identities, with a sign change wherever a product of two sines appears (Osborn's rule). Do not rely on the rule in a proof: start from the definitions.

To solve an equation, either use identities to get one function, or write everything in eˣ, multiply by eˣ, and solve the quadratic in eˣ. Reject eˣ ≤ 0.

### Worked example

Prove that cosh²x − sinh²x = 1.

1. cosh²x = (e^{2x} + 2 + e^{−2x})/4, sinh²x = (e^{2x} − 2 + e^{−2x})/4.
2. Difference = 4/4 = 1.

Solve sinh x + 2 cosh x = 4, giving answers as natural logarithms.

1. (eˣ − e⁻ˣ)/2 + (eˣ + e⁻ˣ) = 4, so 3eˣ + e⁻ˣ = 8.
2. × eˣ: 3e^{2x} − 8eˣ + 1 = 0. eˣ = (8 ± √52)/6 = (4 ± √13)/3.
3. Both are positive, so x = ln((4 + √13)/3) or ln((4 − √13)/3).

Solve cosh 2x − 5 cosh x + 4 = 0.

1. 2cosh²x − 1 − 5 cosh x + 4 = 0, so 2cosh²x − 5 cosh x + 3 = 0.
2. (2 cosh x − 3)(cosh x − 1) = 0: cosh x = 1 or 3/2.
3. cosh x = 1 gives x = 0. cosh x = 3/2: x = ±arcosh(3/2) = ±ln((3 + √5)/2).

### Common mistakes

- Forgetting that cosh x = k gives two values ±arcosh k.
- Accepting a negative value of eˣ.

## H2 Differentiating and integrating hyperbolic functions

*Refs: AQA H2 · Edexcel CP8.2 · OCR 4.07d · MEI Pa5. Level: A-level only.*

### What you need to know

- d/dx sinh x = cosh x; d/dx cosh x = sinh x (no minus sign); d/dx tanh x = sech²x.
- ∫ sinh x dx = cosh x + c; ∫ cosh x dx = sinh x + c; ∫ tanh x dx = ln cosh x + c.

### Explained

Each follows from the exponential definitions. For powers, use identities exactly as with trig: cosh²x = ½(cosh 2x + 1), and for odd powers split off one factor and use cosh²x − sinh²x = 1.

### Worked example

Differentiate x cosh 3x and tanh²x.

1. cosh 3x + 3x sinh 3x.
2. 2 tanh x sech²x.

Evaluate ∫₀^{ln 2} cosh²x dx exactly.

1. ½∫ (1 + cosh 2x) dx = ½[x + ½ sinh 2x]₀^{ln 2}.
2. sinh(2 ln 2) = (4 − ¼)/2 = 15/8.
3. = ½(ln 2 + 15/16) = ½ ln 2 + 15/32.

Find ∫ sinh³x dx.

1. sinh³x = sinh x(cosh²x − 1).
2. = ⅓cosh³x − cosh x + c.

### Common mistakes

- d/dx cosh x = −sinh x (copied from cos).
- Using cos² identities without changing signs.

## H3 Inverse hyperbolic functions and logarithmic forms

*Refs: AQA H3, H4 · Edexcel CP8.3, CP8.4 · OCR 4.07e, 4.07f · MEI Pa6, Pa7. Level: A-level only.*

### What you need to know

```latex
\operatorname{arsinh}x = \ln\left(x + \sqrt{x^2+1}\right)
```

```latex
\operatorname{arcosh}x = \ln\left(x + \sqrt{x^2-1}\right),\quad x\ge 1
```

```latex
\operatorname{artanh}x = \frac12\ln\frac{1+x}{1-x},\quad |x|<1
```

- arcosh uses the principal (non-negative) value, because cosh is not one-to-one.
- d/dx arsinh x = 1/√(x² + 1); d/dx arcosh x = 1/√(x² − 1); d/dx artanh x = 1/(1 − x²).

### Explained

Derivation of arsinh: let y = arsinh x, so x = sinh y = (eʸ − e⁻ʸ)/2. Then e^{2y} − 2xeʸ − 1 = 0, a quadratic in eʸ: eʸ = x ± √(x² + 1). Since eʸ > 0, take the plus sign.

The derivatives follow by implicit differentiation: cosh y (dy/dx) = 1 and cosh y = √(1 + sinh²y) = √(1 + x²).

### Worked example

Express arsinh(4/3) as a logarithm.

1. ln(4/3 + √(16/9 + 1)) = ln(4/3 + 5/3) = ln 3.

Show that artanh x = ½ ln((1 + x)/(1 − x)).

1. y = artanh x, x = tanh y = (e^{2y} − 1)/(e^{2y} + 1).
2. x e^{2y} + x = e^{2y} − 1, so e^{2y}(1 − x) = 1 + x.
3. y = ½ ln((1 + x)/(1 − x)).

Differentiate arsinh 2x.

1. 2/√(4x² + 1).

### Common mistakes

- Giving arcosh 2 = ±ln(2 + √3). The principal value is positive.

## H5 Integrals giving inverse hyperbolic functions

*Refs: AQA H5 · Edexcel CP5.6, CP8.5 · OCR 4.08h · MEI Pa8. Level: A-level only.*

### What you need to know

```latex
\int\frac{1}{\sqrt{x^2+a^2}}\,dx = \operatorname{arsinh}\frac{x}{a} + c = \ln\left(x + \sqrt{x^2+a^2}\right) + c'
```

```latex
\int\frac{1}{\sqrt{x^2-a^2}}\,dx = \operatorname{arcosh}\frac{x}{a} + c\quad(x > a)
```

- Use x = a sinh u or x = a cosh u to derive these and for related integrals such as ∫√(x² + 1) dx.
- Complete the square where needed.

### Worked example

Evaluate ∫₀⁴ 1/√(x² + 9) dx as a logarithm.

1. [arsinh(x/3)]₀⁴ = arsinh(4/3) = ln 3.

Evaluate ∫₂⁴ 1/√(x² − 4) dx.

1. [arcosh(x/2)]₂⁴ = arcosh 2 = ln(2 + √3).

Evaluate ∫₋₂¹ 1/√(x² + 4x + 13) dx.

1. (x + 2)² + 9. [arsinh((x + 2)/3)]₋₂¹ = arsinh 1 = ln(1 + √2).

Use x = sinh u to find ∫₀¹ √(x² + 1) dx.

1. dx = cosh u du, √(sinh²u + 1) = cosh u. Integral = ∫ cosh²u du = ½(u + sinh u cosh u).
2. Limits u = 0 to arsinh 1 = ln(1 + √2). At the top: sinh u = 1, cosh u = √2.
3. = ½(ln(1 + √2) + √2).

### Common mistakes

- Using arcsin instead of arsinh for 1/√(x² + a²).
- Forgetting to change the limits after substitution.

## Check questions

1. Using the definitions, prove that sinh 2x = 2 sinh x cosh x. [3 marks]
2. Solve 3 cosh x − sinh x = 3, giving exact answers. [5 marks]
3. Solve 2 cosh²x − 3 sinh x = 3, giving your answers as logarithms. [5 marks]
4. Differentiate (a) sinh(x²), (b) arcosh(3x), (c) e^{2x} tanh x. [5 marks]
5. Prove that arcosh x = ln(x + √(x² − 1)) for x ≥ 1. [4 marks]
6. Evaluate ∫₀² 1/√(4x² + 9) dx, giving your answer as a single logarithm. [4 marks]
7. Find ∫ cosh³x dx. [3 marks]
8. Sketch y = tanh x, stating its asymptotes, and solve tanh x = ½. [4 marks]

## Mark scheme

1. sinh x cosh x = (eˣ − e⁻ˣ)(eˣ + e⁻ˣ)/4 = (e^{2x} − e^{−2x})/4 (2). So 2 sinh x cosh x = (e^{2x} − e^{−2x})/2 = sinh 2x (1).
2. eˣ + 2e⁻ˣ = 3 (2). e^{2x} − 3eˣ + 2 = 0 (1). eˣ = 1 or 2 (1). x = 0 or ln 2 (1).
3. 2(1 + sinh²x) − 3 sinh x = 3 (1). 2sinh²x − 3 sinh x − 1 = 0 (1). sinh x = (3 ± √17)/4 (1). x = arsinh((3 ± √17)/4) (1), as logs: ln(s + √(s² + 1)) with s = (3 ± √17)/4 (1).
4. (a) 2x cosh(x²) (1). (b) 3/√(9x² − 1) (2). (c) 2e^{2x} tanh x + e^{2x} sech²x (2).
5. x = cosh y, e^{2y} − 2xeʸ + 1 = 0 (1). eʸ = x ± √(x² − 1) (1). Principal value y ≥ 0 needs eʸ ≥ 1, so the plus sign (1). y = ln(x + √(x² − 1)) (1).
6. ½∫ 1/√(x² + 9/4) dx (1) = ½[arsinh(2x/3)]₀² (1) = ½ arsinh(4/3) (1) = ½ ln 3 (1).
7. cosh x(1 + sinh²x) (1). sinh x + ⅓sinh³x + c (2).
8. Odd, increasing, through the origin, asymptotes y = ±1 (2). x = ½ ln((1 + ½)/(1 − ½)) = ½ ln 3 (2).
