---
level: A-level
subject: Further Mathematics
topic: "Further calculus: inverse trigonometric functions, standard integrals and partial fractions"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["E4", "E5", "E6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP5.4", "CP5.5", "CP5.6"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.05c", "4.08f", "4.08g", "4.08h"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pc4", "Pc5", "Pc6"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Further calculus: inverse trigonometric functions, standard integrals and partial fractions

This file covers differentiating arcsin, arccos and arctan, integrals that give inverse trigonometric functions, choosing trigonometric substitutions, completing the square in such integrals, and partial fractions with a quadratic factor ax² + c.

## Overview

All A-level only. Inverse trig functions as functions are in [../maths/10-trigonometry-identities-and-equations.md](../maths/10-trigonometry-identities-and-equations.md); implicit differentiation, substitution and partial fractions with linear factors are in [../maths/13-differentiation-further-techniques.md](../maths/13-differentiation-further-techniques.md) and [../maths/15-integration-techniques.md](../maths/15-integration-techniques.md). The hyperbolic integrals 1/√(x² ± a²) are in [15-hyperbolic-functions.md](15-hyperbolic-functions.md).

### Board differences

- AQA E4 to E6; Edexcel CP5.4 to CP5.6; OCR 4.05c, 4.08f to 4.08h; MEI Pc4 to Pc6.
- OCR places partial fractions with quadratic factors in Further Algebra (4.05c) and their integration in 4.08f.
- All boards limit quadratic factors to the form ax² + c (no x term) for partial fractions. Completing the square is used for integrals such as 1/(x² + 2x + 5).

## E5 Differentiating inverse trigonometric functions

*Refs: AQA E5 · Edexcel CP5.5 · OCR 4.08g · MEI Pc5. Level: A-level only.*

### What you need to know

```latex
\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1-x^2}},\quad \frac{d}{dx}\arccos x = -\frac{1}{\sqrt{1-x^2}},\quad \frac{d}{dx}\arctan x = \frac{1}{1+x^2}
```

- Derive them using implicit differentiation.

### Explained

Let y = arcsin x. Then sin y = x, so cos y (dy/dx) = 1 and dy/dx = 1/cos y. Since −π/2 ≤ y ≤ π/2, cos y ≥ 0, so cos y = √(1 − sin²y) = √(1 − x²).

For y = arctan x: tan y = x, sec²y (dy/dx) = 1, and sec²y = 1 + tan²y = 1 + x².

Combine with the chain, product and quotient rules as usual.

### Worked example

Differentiate arcsin 3x.

1. Chain rule: 3/√(1 − 9x²).

Differentiate arctan(x²).

1. 2x/(1 + x⁴).

Differentiate x arccos x.

1. Product rule: arccos x − x/√(1 − x²).

Prove that d/dx (arccos x) = −1/√(1 − x²).

1. y = arccos x, cos y = x, −sin y (dy/dx) = 1.
2. 0 ≤ y ≤ π, so sin y ≥ 0 and sin y = √(1 − x²).
3. dy/dx = −1/√(1 − x²).

### Common mistakes

- Forgetting the chain rule factor.
- Using the wrong sign of the square root (the range of the inverse function decides it).

## E6 Integrals giving inverse trigonometric functions

*Refs: AQA E6 · Edexcel CP5.6 · OCR 4.08h · MEI Pc6. Level: A-level only.*

### What you need to know

```latex
\int\frac{1}{\sqrt{a^2-x^2}}\,dx = \arcsin\frac{x}{a} + c\quad(|x|<a)
```

```latex
\int\frac{1}{a^2+x^2}\,dx = \frac{1}{a}\arctan\frac{x}{a} + c
```

- Use the substitution x = a sin θ for √(a² − x²) and x = a tan θ for a² + x².
- Complete the square for quadratics with an x term: x² + 2x + 5 = (x + 1)² + 4.
- For a coefficient on x², take it out: 1/(9 + 4x²) = ¼ × 1/(9/4 + x²).

### Explained

These are given in the formula booklet, but you may be asked to derive them by substitution. With x = a sin θ, dx = a cos θ dθ and √(a² − x²) = a cos θ, so the integrand becomes 1 and the integral is θ = arcsin(x/a).

If the top is linear, split it: one part is a multiple of the derivative of the bottom (giving a log), the other is a constant (giving arctan).

### Worked example

Evaluate ∫₀^{3/2} 1/√(9 − x²) dx.

1. [arcsin(x/3)]₀^{3/2} = arcsin ½ = π/6.

Evaluate ∫₀^{3/2} 1/(9 + 4x²) dx.

1. = ¼∫ 1/(9/4 + x²) dx = ¼ × (2/3)[arctan(2x/3)]₀^{3/2}.
2. = (1/6) × π/4 = π/24.

Evaluate ∫₋₁¹ 1/(x² + 2x + 5) dx.

1. x² + 2x + 5 = (x + 1)² + 4.
2. ½[arctan((x + 1)/2)]₋₁¹ = ½(π/4 − 0) = π/8.

Evaluate ∫₁² 1/√(3 + 2x − x²) dx.

1. 3 + 2x − x² = 4 − (x − 1)².
2. [arcsin((x − 1)/2)]₁² = arcsin ½ = π/6.

Evaluate ∫₀³ (2x + 3)/(x² + 9) dx.

1. Split: ∫ 2x/(x² + 9) dx + ∫ 3/(x² + 9) dx.
2. = [ln(x² + 9) + arctan(x/3)]₀³ = ln 18 − ln 9 + π/4 = ln 2 + π/4.

### Common mistakes

- Forgetting the 1/a in front of arctan.
- Taking a² = 9 but then using a = 9.
- Completing the square for −x² + 2x + 3 with sign errors; write it as −(x² − 2x) + 3 = 4 − (x − 1)².

## E4 Partial fractions with quadratic factors

*Refs: AQA E4 · Edexcel CP5.4 · OCR 4.05c, 4.08f · MEI Pc4. Level: A-level only.*

### What you need to know

- For a denominator (px + q)(ax² + c):

```latex
\frac{f(x)}{(px+q)(ax^2+c)} = \frac{A}{px+q} + \frac{Bx+C}{ax^2+c}
```

- Integrate Bx/(ax² + c) to a log and C/(ax² + c) to an arctan.

### Explained

A quadratic factor that does not factorise needs a linear numerator Bx + C, because the degree of the top can be up to one less than the bottom. Find A by substituting the root of the linear factor, then compare coefficients of x² and the constant term.

### Worked example

Express (x² + 4x + 1)/[(x + 1)(x² + 1)] in partial fractions and evaluate its integral from 0 to 1.

1. x² + 4x + 1 = A(x² + 1) + (Bx + C)(x + 1).
2. x = −1: 1 − 4 + 1 = 2A, so A = −1.
3. x²: 1 = A + B, B = 2. Constant: 1 = A + C, C = 2.
4. = −1/(x + 1) + (2x + 2)/(x² + 1).
5. ∫₀¹ = [−ln(x + 1) + ln(x² + 1) + 2 arctan x]₀¹ = −ln 2 + ln 2 + π/2 = π/2.

Express (3x + 2)/[x(x² + 4)] in partial fractions.

1. 3x + 2 = A(x² + 4) + (Bx + C)x.
2. x = 0: A = ½. x²: 0 = ½ + B, B = −½. x: C = 3.
3. = 1/(2x) + (6 − x)/[2(x² + 4)].

### Common mistakes

- Using a constant numerator over the quadratic factor.
- Integrating x/(x² + 4) as an arctan.

## Check questions

1. Differentiate (a) arctan(3x), (b) arcsin(√x), (c) e^x arccos x. [5 marks]
2. Prove that d/dx (arctan x) = 1/(1 + x²). [3 marks]
3. Use the substitution x = 2 sin θ to show that ∫ 1/√(4 − x²) dx = arcsin(x/2) + c. [3 marks]
4. Evaluate exactly ∫₀^{1/3} 1/√(4 − 9x²) dx. [3 marks]
5. Evaluate exactly ∫₀¹ 1/(x² + 2x + 2) dx. [4 marks]
6. (a) Express (5x² + 2x + 3)/[(x − 1)(x² + 3)] in partial fractions. (b) Find ∫ (5x² + 2x + 3)/[(x − 1)(x² + 3)] dx. [7 marks]
7. Evaluate ∫₀^√3 (x + 1)/(x² + 3) dx exactly. [4 marks]

## Mark scheme

1. (a) 3/(1 + 9x²) (1). (b) 1/(2√x√(1 − x)) (2). (c) e^x arccos x − e^x/√(1 − x²) (2).
2. tan y = x (1). sec²y dy/dx = 1 (1). dy/dx = 1/(1 + tan²y) = 1/(1 + x²) (1).
3. dx = 2 cos θ dθ (1). √(4 − 4sin²θ) = 2 cos θ (1). Integral of 1 dθ = θ = arcsin(x/2) + c (1).
4. ⅓∫ 1/√(4/9 − x²)... or ⅓[arcsin(3x/2)] (2). = ⅓ arcsin ½ = π/18 (1).
5. (x + 1)² + 1 (1). [arctan(x + 1)]₀¹ (1) = arctan 2 − π/4 (2).
6. (a) A(x² + 3) + (Bx + C)(x − 1) (1). x = 1: 10 = 4A, A = 5/2 (1). x²: 5 = A + B, B = 5/2 (1). Constant: 3 = 3A − C, C = 9/2 (1). Result 5/[2(x − 1)] + (5x + 9)/[2(x² + 3)] (1). (b) (5/2)ln|x − 1| + (5/4)ln(x² + 3) + (9/(2√3))arctan(x/√3) + c (2).
7. ½[ln(x² + 3)]₀^√3 = ½ ln 2 (2). (1/√3)[arctan(x/√3)]₀^√3 = π/(4√3) (1). Total ½ ln 2 + π√3/12 (1).
