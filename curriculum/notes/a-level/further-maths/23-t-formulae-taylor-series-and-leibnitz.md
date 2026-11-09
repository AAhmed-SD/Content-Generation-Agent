---
level: A-level
subject: Further Mathematics
topic: "t-formulae, Taylor series, Leibnitz's theorem and L'Hospital's rule"
as_content: "All of this file is A-level only (Edexcel Further Pure 1 option)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP1 1.1", "FP1 1.2", "FP1 1.3", "FP1 2.1", "FP1 2.2", "FP1 2.3", "FP1 2.4", "FP1 2.5", "FP1 3.1"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# t-formulae, Taylor series, Leibnitz's theorem and L'Hospital's rule

This file covers the Edexcel Further Pure 1 topics on further trigonometry and further calculus: the t-formulae and their use in proofs, equations and integrals (the Weierstrass substitution), Taylor series about a point, series of compound functions, Leibnitz's theorem for nth derivatives of products, L'Hospital's rule, and Taylor series solutions of differential equations.

## Overview

All Edexcel FP1 (A-level only). Maclaurin series and limits are in [09-maclaurin-series-and-limits.md](09-maclaurin-series-and-limits.md); compound angle formulae in [../maths/10-trigonometry-identities-and-equations.md](../maths/10-trigonometry-identities-and-equations.md).

### Board differences

- Edexcel FP1 1.1 to 1.3, 2.1 to 2.5 and 3.1. No other board lists these by name, though AQA D7 (l'Hôpital's rule) is in [09-maclaurin-series-and-limits.md](09-maclaurin-series-and-limits.md).

## FP1 1 The t-formulae

*Refs: Edexcel FP1 1.1, 1.2, 1.3. Level: A-level only.*

### What you need to know

With t = tan(x/2):

```latex
\sin x = \frac{2t}{1+t^2},\qquad \cos x = \frac{1-t^2}{1+t^2},\qquad \tan x = \frac{2t}{1-t^2}
```

- Derive them from the double angle formulae.
- Use them to prove identities and to solve equations of the form a cos x + b sin x = c.

### Explained

sin x = 2 sin(x/2)cos(x/2) = 2 tan(x/2)cos²(x/2) = 2t/sec²(x/2) = 2t/(1 + t²). Similarly cos x = cos²(x/2) − sin²(x/2) = (1 − t²)cos²(x/2) = (1 − t²)/(1 + t²).

Substituting turns a trigonometric equation into a quadratic in t. Check separately whether x = π (where t is undefined) is a solution.

### Worked example

Solve 3 sin x + 4 cos x = 2 for 0 ≤ x < 2π.

1. 6t/(1 + t²) + 4(1 − t²)/(1 + t²) = 2, so 6t + 4 − 4t² = 2 + 2t², giving 3t² − 3t − 1 = 0.
2. t = (3 ± √21)/6: t = 1.2638 or −0.2638.
3. x/2 = arctan t: x/2 = 0.9015 or x/2 = π − 0.2579 = 2.8837.
4. x = 1.803 or 5.767. Check x = π: 0 − 4 ≠ 2, so not a solution.

Prove that (1 − cos x)/sin x = tan(x/2).

1. Left side = [1 − (1 − t²)/(1 + t²)] ÷ [2t/(1 + t²)] = [2t²/(1 + t²)] × [(1 + t²)/(2t)] = t.

### Common mistakes

- Forgetting that x/2 has a different range from x.
- Missing the solution x = π.

## FP1 2.5 The Weierstrass substitution

*Refs: Edexcel FP1 2.5. Level: A-level only.*

### What you need to know

- With t = tan(x/2), dx = 2 dt/(1 + t²).
- Use it to integrate rational functions of sin x and cos x.

### Worked example

Evaluate ∫₀^{π/2} 1/(2 + cos x) dx.

1. 2 + cos x = (3 + t²)/(1 + t²). Limits: x = 0 → t = 0, x = π/2 → t = 1.
2. ∫₀¹ [(1 + t²)/(3 + t²)] × 2/(1 + t²) dt = ∫₀¹ 2/(3 + t²) dt.
3. = (2/√3)[arctan(t/√3)]₀¹ = (2/√3)(π/6) = π√3/9.

Evaluate ∫₀^{π/2} 1/(1 + sin x + cos x) dx.

1. Denominator (2 + 2t)/(1 + t²). Integral ∫₀¹ 1/(1 + t) dt = ln 2.

### Common mistakes

- Forgetting to change dx and the limits.

## FP1 2.1 and 2.2 Taylor series and series of compound functions

*Refs: Edexcel FP1 2.1, 2.2. Level: A-level only.*

### What you need to know

```latex
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots + \frac{f^{(r)}(a)}{r!}(x-a)^r + \dots
```

- Equivalently, f(a + x) = f(a) + f′(a)x + f″(a)x²/2! + ...
- Use Taylor series to approximate f near x = a when f has no Maclaurin series (such as ln x) or when x is not near 0.
- Combine known series (substitution, products) for compound functions such as e^{sin x} or ln(1 + x)eˣ.

### Worked example

Find the Taylor series of ln x about x = 1 up to (x − 1)³.

1. f(1) = 0, f′(1) = 1, f″(1) = −1, f‴(1) = 2.
2. ln x = (x − 1) − (x − 1)²/2 + (x − 1)³/3 − ...

Find the series of sin x in powers of (x − π/6) up to the cubic term.

1. sin(π/6) = ½, cos(π/6) = √3/2.
2. sin x = ½ + (√3/2)(x − π/6) − ¼(x − π/6)² − (√3/12)(x − π/6)³ + ...

Find e^{sin x} up to x³.

1. sin x = x − x³/6. e^u = 1 + u + u²/2 + u³/6.
2. 1 + (x − x³/6) + x²/2 + x³/6 = 1 + x + x²/2 + 0x³.

### Common mistakes

- Expanding in powers of x instead of (x − a).

## FP1 2.3 Leibnitz's theorem

*Refs: Edexcel FP1 2.3. Level: A-level only.*

### What you need to know

```latex
\frac{d^n}{dx^n}(uv) = \sum_{r=0}^{n}\binom nr \frac{d^{n-r}u}{dx^{n-r}}\frac{d^r v}{dx^r}
```

### Explained

It is the binomial expansion for derivatives. Choose u to be a polynomial, because its derivatives become zero quickly, which cuts the sum short.

### Worked example

Find d⁵/dx⁵ (x²e^{2x}).

1. v = x² has v′ = 2x, v″ = 2, and zero after. u = e^{2x} has kth derivative 2ᵏe^{2x}.
2. = x² × 32e^{2x} + 5 × 2x × 16e^{2x} + 10 × 2 × 8e^{2x}.
3. = 32e^{2x}(x² + 5x + 5).

Find the 6th derivative of x³ sin x at x = 0.

1. Only the term with three derivatives on x³ survives at x = 0: C(6, 3) × 6 × (third derivative of sin x) = 20 × 6 × (−cos 0) = −120.

### Common mistakes

- Forgetting the binomial coefficients.

## FP1 2.4 L'Hospital's rule

*Refs: Edexcel FP1 2.4. Level: A-level only.*

### What you need to know

- For a 0/0 or ∞/∞ form, lim f/g = lim f′/g′. See [09-maclaurin-series-and-limits.md](09-maclaurin-series-and-limits.md) for the method and worked examples.

### Worked example

Find lim_{x→0} (e^{2x} − 1 − 2x)/(1 − cos x).

1. 0/0. Differentiate: (2e^{2x} − 2)/sin x, still 0/0.
2. Again: 4e^{2x}/cos x → 4.

## FP1 3.1 Taylor series solutions of differential equations

*Refs: Edexcel FP1 3.1. Level: A-level only.*

### What you need to know

- Given y and y′ at x₀ (or the equation gives y′), differentiate the equation repeatedly to find higher derivatives at x₀, then build the series.

### Worked example

dy/dx = x² + y², y = 1 at x = 0. Find the series for y up to x³.

1. y′(0) = 0 + 1 = 1.
2. y″ = 2x + 2yy′, so y″(0) = 2.
3. y‴ = 2 + 2(y′)² + 2yy″, so y‴(0) = 2 + 2 + 4 = 8.
4. y = 1 + x + 2x²/2! + 8x³/3! = 1 + x + x² + (4/3)x³.

### Common mistakes

- Forgetting the chain rule on y²: d/dx(y²) = 2y y′.

## Check questions

1. Use the t-formulae to prove that (1 + sin x − cos x)/(1 + sin x + cos x) = tan(x/2). [4 marks]
2. Solve 2 cos x − sin x = 1 for 0 ≤ x < 2π using the t-formulae. [5 marks]
3. Use t = tan(x/2) to evaluate ∫₀^{π/2} 1/(1 + sin x) dx. [5 marks]
4. Find the Taylor series of eˣ about x = 1 up to the (x − 1)² term, and use it to estimate e^{1.1}. [4 marks]
5. Use Leibnitz's theorem to find d⁴/dx⁴ (x³ e^{−x}). [4 marks]
6. d²y/dx² + x dy/dx + y = 0, y = 1 and dy/dx = 0 at x = 0. Find the Taylor series for y up to x⁴. [6 marks]

## Mark scheme

1. Top: [(1 + t²) + 2t − (1 − t²)]/(1 + t²) = 2t(t + 1)/(1 + t²) (1). Bottom: [(1 + t²) + 2t + (1 − t²)]/(1 + t²) = 2(1 + t)/(1 + t²) (1). Ratio t (2).
2. 2(1 − t²) − 2t = 1 + t² (1). 3t² + 2t − 1 = 0 (1), t = ⅓ or −1 (1). x = 2 arctan(⅓) = 0.644 (1); t = −1 gives x/2 = 3π/4, x = 3π/2 (1). (x = π: −2 ≠ 1.)
3. 1 + sin x = (1 + t)²/(1 + t²) (2). ∫₀¹ 2/(1 + t)² dt (1) = [−2/(1 + t)]₀¹ (1) = 1 (1).
4. e[1 + (x − 1) + (x − 1)²/2] (2). x = 1.1: e(1.105) = 3.0037 (2).
5. Sum C(4, r)(x³)^{(r)}(e^{−x})^{(4−r)} (1). e^{−x}[x³ − 4(3x²) + 6(6x) − 4(6)] (2) = e^{−x}(x³ − 12x² + 36x − 24) (1).
6. y″(0) = −y(0) = −1 (1). Differentiate: y‴ + xy″ + 2y′ = 0, y‴(0) = 0 (2). y⁗ + xy‴ + 3y″ = 0, y⁗(0) = 3 (2). y = 1 − x²/2 + x⁴/8 (1).
