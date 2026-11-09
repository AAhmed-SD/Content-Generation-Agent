---
level: A-level
subject: Mathematics
topic: "Integration: standard functions, substitution, parts, partial fractions and limit of a sum"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["H2", "H4", "H5", "H6"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P8.2", "P8.4", "P8.5", "P8.6"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.08c", "1.08g", "1.08h", "1.08i", "1.08j"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mc24", "Mc25", "Mc27", "Mc28", "Mc29", "Mc30"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Integration: standard functions, substitution, parts, partial fractions and limit of a sum

This file covers integrating e^{kx}, 1/x, sin kx and cos kx, using identities and "reverse chain rule" patterns, integration by substitution, integration by parts, integrating with partial fractions, and integration as the limit of a sum.

## Overview

All A-level only. Separable differential equations, which use all of these techniques, are in file 16. The trapezium rule is in file 17.

### Board differences

- AQA H2 (non-power part), H4, H5, H6; Edexcel 8.2, 8.4, 8.5, 8.6.
- OCR H240: 1.08c, 1.08g to 1.08j.
- OCR MEI H640: Mc24, Mc25, Mc27 to Mc30. MEI separates substitution where the substitution is given or easy to spot (Mc27) from other cases (Mc28).
- AQA's guidance: one substitution that leads to a function you can integrate; parts may be used more than once but reduction formulae are excluded. Partial fractions in integration are limited to linear denominators (AQA H6, OCR 1.08j); Edexcel's 8.6 also covers a repeated linear factor.

## H2 Integrating standard functions

*Refs: AQA H2 · Edexcel 8.2 · OCR 1.08c · MEI Mc24. Level: A-level only.*

### What you need to know

- (A-level only) The standard integrals (x in radians):

| f(x) | ∫ f(x) dx |
| --- | --- |
| e^{kx} | (1/k)e^{kx} + c |
| 1/x | ln\|x\| + c |
| sin kx | −(1/k) cos kx + c |
| cos kx | (1/k) sin kx + c |
| sec² kx | (1/k) tan kx + c |

- (A-level only) Related sums, differences and constant multiples, and functions of (ax + b).

### Explained

**Linear inside.** For a function of ax + b, integrate as normal and divide by a:

```latex
\int (ax+b)^n\,dx = \frac{(ax+b)^{n+1}}{a(n+1)} + c \qquad \int \frac{1}{ax+b}\,dx = \frac{1}{a}\ln|ax+b| + c
```

**The modulus.** ln x only exists for x > 0, but 1/x exists for negative x too, so ∫ 1/x dx = ln|x| + c.

**Using identities.** sin²x and cos²x cannot be integrated directly; use the double angle formula first (file 10). tan²x = sec²x − 1.

```latex
\int \cos^2 x\,dx = \int \tfrac{1}{2}(1 + \cos 2x)\,dx = \tfrac{x}{2} + \tfrac{\sin 2x}{4} + c
```

**Recognition (reverse chain rule).** If the integrand is a function multiplied by the derivative of its inside, you can write the answer down. Two very common cases:

```latex
\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c \qquad \int f'(x)\left[f(x)\right]^n dx = \frac{\left[f(x)\right]^{n+1}}{n+1} + c
```

Adjust constants: if the derivative is there apart from a number, divide by that number. Always check by differentiating your answer.

### Worked example

(A-level only) Find ∫(e^{3x} + 4/x − sin 2x + cos(x/3)) dx.

1. (1/3)e^{3x} + 4 ln|x| + (1/2) cos 2x + 3 sin(x/3) + c.

(A-level only) Find ∫ 1/(2x + 1) dx and ∫₀^{π/4} sec²x dx.

1. (1/2) ln|2x + 1| + c.
2. [tan x]₀^{π/4} = 1 − 0 = 1.

(A-level only) Find ∫ cos²x dx and ∫ tan²x dx.

1. x/2 + (sin 2x)/4 + c.
2. ∫(sec²x − 1) dx = tan x − x + c.

(A-level only) Find ∫ 2x/(x² + 5) dx, ∫ tan x dx and ∫ x(x² + 1)⁴ dx.

1. The numerator is the derivative of the denominator: ln(x² + 5) + c.
2. tan x = sin x/cos x = −(−sin x)/cos x, so ∫ tan x dx = −ln|cos x| + c = ln|sec x| + c.
3. The derivative of x² + 1 is 2x, so ∫ x(x² + 1)⁴ dx = (x² + 1)⁵/10 + c.

(A-level only) Find ∫ xe^{x²} dx and ∫ sin x cos³x dx.

1. (1/2)e^{x²} + c.
2. −(1/4)cos⁴x + c. (Check: differentiating gives −(1/4) × 4cos³x × (−sin x) = sin x cos³x ✓.)

### Common mistakes

- (A-level only) ∫ sin x dx = −cos x, not cos x.
- (A-level only) Dividing by k when you should multiply, or the reverse: ∫ cos(x/3) dx = 3 sin(x/3).
- (A-level only) Writing ∫ 1/(x² + 5) dx = ln(x² + 5). The f′/f pattern needs the derivative on top.

## H4 Integration as the limit of a sum

*Refs: AQA H4 · Edexcel 8.4 · OCR 1.08g · MEI Mc25. Level: A-level only.*

### What you need to know

- (A-level only) The area under a curve is the limit of the sum of the areas of thin rectangles as their width tends to zero:

```latex
\int_a^b f(x)\,dx = \lim_{\delta x \to 0} \sum_{x=a}^{b} f(x)\,\delta x
```

### Explained

Split the interval from a to b into strips of width δx. Each strip is roughly a rectangle of height f(x) and area f(x)δx. Adding them gives an estimate of the area; the thinner the strips, the better the estimate. In the limit the sum becomes the integral. The ∫ sign is a stretched S for "sum", and dx comes from δx.

This also explains why integrals give other totals, such as distance from velocity (file 25) or volume of liquid from a flow rate.

### Worked example

(A-level only) Write lim (δx → 0) of Σ (from x = 0 to 2) of x² δx as an integral and evaluate it.

1. ∫₀² x² dx = [x³/3]₀² = 8/3.

(A-level only) Water flows into a tank at a rate of r(t) = 3t² + 2 litres per minute. Explain why the volume added in the first 4 minutes is ∫₀⁴ r(t) dt, and find it.

1. In a short time δt the volume added is about r(t)δt. Adding these and letting δt → 0 gives the integral.
2. [t³ + 2t]₀⁴ = 64 + 8 = 72 litres.

### Common mistakes

- (A-level only) Leaving the δx out of the sum, or writing dx outside the limit.

## H5 Integration by substitution and by parts

*Refs: AQA H5 · Edexcel 8.5 · OCR 1.08h, 1.08i · MEI Mc27, Mc28, Mc29. Level: A-level only.*

### What you need to know

- (A-level only) Integration by substitution: the reverse of the chain rule. Choose u, replace dx using du/dx, change the limits for a definite integral, integrate in u.
- (A-level only) Integration by parts: the reverse of the product rule.

```latex
\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx
```

### Explained

**Substitution.**

1. Choose u (often the inside of a bracket or root, or the one given in the question).
2. Find du/dx and write dx in terms of du.
3. Replace every x, including any left over, using the substitution.
4. For a definite integral, change the limits to u values. Then you never go back to x.
5. Integrate and, for an indefinite integral, substitute back.

**Parts.** Choose u to be the function that gets simpler when differentiated, and dv/dx to be easy to integrate. A rule of thumb: logs first, then powers of x, then trig and exponentials. For ln x on its own, write it as 1 × ln x with u = ln x and dv/dx = 1. Some integrals, such as x²eˣ, need parts twice.

### Worked example

(A-level only) Use u = x − 1 to find ∫₁⁵ x√(x − 1) dx.

1. du = dx, and x = u + 1. Limits: x = 1 → u = 0; x = 5 → u = 4.
2. ∫₀⁴ (u + 1)u^{1/2} du = ∫₀⁴ (u^{3/2} + u^{1/2}) du.
3. = [(2/5)u^{5/2} + (2/3)u^{3/2}]₀⁴ = (2/5)(32) + (2/3)(8) = 64/5 + 16/3 = 272/15.

(A-level only) Use u = 2x − 1 to find ∫₁⁵ x/√(2x − 1) dx.

1. du = 2 dx, x = (u + 1)/2. Limits: u = 1 to u = 9.
2. ∫₁⁹ [(u + 1)/2] u^{−1/2} (1/2) du = (1/4)∫₁⁹ (u^{1/2} + u^{−1/2}) du.
3. = (1/4)[(2/3)u^{3/2} + 2u^{1/2}]₁⁹ = (1/4)[(18 + 6) − (2/3 + 2)] = (1/4)(64/3) = 16/3.

(A-level only) Find ∫ xe^{2x} dx.

1. u = x, dv/dx = e^{2x}; du/dx = 1, v = (1/2)e^{2x}.
2. = (1/2)xe^{2x} − ∫(1/2)e^{2x} dx = (1/2)xe^{2x} − (1/4)e^{2x} + c.

(A-level only) Find ∫ x cos x dx and ∫ ln x dx.

1. u = x, v = sin x: x sin x − ∫ sin x dx = x sin x + cos x + c.
2. u = ln x, dv/dx = 1, v = x: x ln x − ∫ x(1/x) dx = x ln x − x + c.

(A-level only) Evaluate ∫₁ᵉ x ln x dx.

1. u = ln x, dv/dx = x, v = x²/2.
2. [(x²/2) ln x]₁ᵉ − ∫₁ᵉ x/2 dx = e²/2 − [x²/4]₁ᵉ = e²/2 − e²/4 + 1/4.
3. = (e² + 1)/4.

(A-level only) Find ∫ x²eˣ dx.

1. Parts once: x²eˣ − ∫ 2xeˣ dx.
2. Parts again: ∫ 2xeˣ dx = 2xeˣ − 2eˣ.
3. Answer: eˣ(x² − 2x + 2) + c.

### Common mistakes

- (A-level only) Forgetting to change the limits, or changing them and then substituting x back as well.
- (A-level only) Leaving a dx in the u-integral.
- (A-level only) Choosing u = eˣ in ∫ xeˣ dx, which makes the integral harder.
- (A-level only) Sign errors in the second application of parts.

## H6 Integrating with partial fractions

*Refs: AQA H6 · Edexcel 8.6 · OCR 1.08j · MEI Mc30. Level: A-level only.*

### What you need to know

- (A-level only) Split a rational function into partial fractions (file 03), then integrate each term, which gives logarithms (and, for a squared factor, a power).

### Explained

Each A/(ax + b) integrates to (A/a) ln|ax + b|. A term B/(ax + b)² integrates to −B/[a(ax + b)]. Combine the logs at the end with the laws of logarithms if the question asks for a single log or the form ln k.

### Worked example

(A-level only) Show that ∫₂³ (5x + 1)/[(x − 1)(x + 2)] dx = ln(125/16).

1. From file 03: 2/(x − 1) + 3/(x + 2).
2. [2 ln|x − 1| + 3 ln|x + 2|]₂³ = (2 ln 2 + 3 ln 5) − (0 + 3 ln 4).
3. = ln 4 + ln 125 − ln 64 = ln(4 × 125/64) = ln(125/16).

(A-level only) Find ∫ (2x² + 2)/[(x + 1)(x − 1)²] dx.

1. From file 03: 1/(x + 1) + 1/(x − 1) + 2/(x − 1)².
2. ln|x + 1| + ln|x − 1| − 2/(x − 1) + c.

### Common mistakes

- (A-level only) Writing ∫ 1/(2x + 1) dx = ln|2x + 1|, missing the 1/2.
- (A-level only) Integrating 2/(x − 1)² as 2 ln(x − 1)².

## Check questions

1. (A-level only) Find ∫(e^{−2x} + 3/x − sin 4x) dx. [3 marks]
2. (A-level only) Evaluate ∫₀^{π/6} cos 3x dx. [2 marks]
3. (A-level only) Show that ∫₀^{π/4} sin²x dx = π/8 − 1/4. [4 marks]
4. (A-level only) Find ∫ x/(x² + 4) dx. [2 marks]
5. (A-level only) Find ∫ tan²x dx. [2 marks]
6. (A-level only) Show that ∫₀¹ xe^{−x} dx = 1 − 2/e. [4 marks]
7. (A-level only) Evaluate ∫₁² x² ln x dx exactly. [5 marks]
8. (A-level only) Use the substitution u = 2x − 1 to find the exact value of ∫₁⁵ x/√(2x − 1) dx. [6 marks]
9. (A-level only) Using partial fractions, show that ∫₀¹ (4x + 5)/[(x + 1)(x + 2)] dx = ln(27/4). [6 marks]
10. (A-level only) Explain what is meant by integration as the limit of a sum, using ∫₀² x² dx as an example. [2 marks]

## Mark scheme

1. −(1/2)e^{−2x} (1); 3 ln|x| (1); + (1/4)cos 4x + c (1).
2. [(1/3)sin 3x]₀^{π/6} (1) = 1/3 (1).
3. sin²x = (1/2)(1 − cos 2x) (1); integral x/2 − (sin 2x)/4 (1); limits substituted (1); π/8 − 1/4 (1).
4. (1/2)ln(x² + 4) + c (2).
5. sec²x − 1 (1); tan x − x + c (1).
6. u = x, v = −e^{−x} (1); −xe^{−x} + ∫e^{−x} dx = −xe^{−x} − e^{−x} (1); limits (1); (−2/e) − (−1) = 1 − 2/e (1).
7. u = ln x, v = x³/3 (1); (x³/3)ln x − ∫x²/3 dx (1); = (x³/3)ln x − x³/9 (1); limits (1); (8/3)ln 2 − 7/9 (1).
8. du = 2 dx and x = (u + 1)/2 (1); limits 1 and 9 (1); (1/4)∫(u^{1/2} + u^{−1/2}) du (1); (1/4)[(2/3)u^{3/2} + 2u^{1/2}] (1); limits substituted (1); 16/3 (1).
9. 1/(x + 1) + 3/(x + 2) (2); [ln(x + 1) + 3 ln(x + 2)]₀¹ (1); ln 2 + 3 ln 3 − 3 ln 2 (1); = 3 ln 3 − 2 ln 2 (1); = ln(27/4) (1).
10. Split 0 to 2 into strips of width δx with area about x²δx; add them (1); as δx → 0 the sum tends to the integral, 8/3 (1).
