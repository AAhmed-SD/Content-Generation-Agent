---
level: A-level
subject: Further Mathematics
topic: "Further calculus: volumes of revolution, improper integrals and mean value"
as_content: "Volumes of revolution about the x- and y-axes are AS on AQA and Edexcel. Everything else in this file, and volumes on OCR and MEI, is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["E1", "E2", "E3", "E9"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP5.1", "CP5.2", "CP5.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.08c", "4.08d", "4.08e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pc1", "Pc2", "Pc3"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Further calculus: volumes of revolution, improper integrals and mean value

This file covers volumes of solids formed by rotating a region about the x- or y-axis (including between curves and from parametric equations), improper integrals with an infinite limit or an undefined integrand, the limits of xᵏe⁻ˣ and xᵏ ln x, and the mean value of a function.

## Overview

Definite integration and areas are in [../maths/14-integration-basics-and-areas.md](../maths/14-integration-basics-and-areas.md) and [../maths/15-integration-techniques.md](../maths/15-integration-techniques.md). Volumes in polar form are not required. Centres of mass of solids of revolution are in [47-centres-of-mass.md](47-centres-of-mass.md).

### Board differences

- AQA E1, E2, E3, E9; Edexcel CP5.1 to CP5.3; OCR 4.08c to 4.08e; MEI Pc1 to Pc3.
- AS: AQA E2 and Edexcel CP5.1 include volumes of revolution at AS (rotation about the x- and y-axes); the A-level adds parametric curves and harder integrals. OCR (4.08d, Stage 2) and MEI (Pc2) have volumes only at A-level.
- AQA E9 names the limits xᵏe⁻ˣ → 0 as x → ∞ and xᵏ ln x → 0 as x → 0⁺; the other boards use the same facts in improper integrals without listing them.
- Edexcel CP5.1 includes volumes for curves given parametrically; AQA E2 the same at A-level.

## E2 Volumes of revolution

*Refs: AQA E2 · Edexcel CP5.1 · OCR 4.08d · MEI Pc2. Level: AS & A (part A-level only) on AQA and Edexcel; A-level only on OCR and MEI.*

### What you need to know

- Rotating the region under y = f(x) between x = a and x = b through 2π about the x-axis:

```latex
V = \pi\int_a^b y^2\,dx
```

- About the y-axis, between y = c and y = d:

```latex
V = \pi\int_c^d x^2\,dy
```

- Between two curves (rotated about the x-axis): V = π∫(y₁² − y₂²) dx, outer minus inner.
- (A-level only) Parametric curve x = x(t), y = y(t):

```latex
V = \pi\int_{t_1}^{t_2} y^2\frac{dx}{dt}\,dt
```

### Explained

Slice the solid into thin discs perpendicular to the axis. A disc at x has radius y and thickness δx, so volume ≈ πy²δx. Summing and letting δx → 0 gives the integral.

For a hollow solid (a washer), subtract the volume of the inner solid from the outer: square each radius separately, never (y₁ − y₂)².

For the y-axis, rewrite the curve as x² in terms of y, and use y-limits.

### Worked example

Find the volume when the region under y = x² + 1 from x = 0 to x = 1 is rotated about the x-axis.

1. V = π∫₀¹ (x² + 1)² dx = π∫₀¹ (x⁴ + 2x² + 1) dx.
2. = π[1/5 + 2/3 + 1] = 28π/15.

The region bounded by y = x², the y-axis and y = 4 (x ≥ 0) is rotated about the y-axis. Find the volume.

1. x² = y. V = π∫₀⁴ y dy = π[y²/2]₀⁴ = 8π.

The region between y = 2x and y = x² is rotated about the x-axis. Find the volume.

1. Curves meet at x = 0 and x = 2. On (0, 2), 2x > x².
2. V = π∫₀² (4x² − x⁴) dx = π[4x³/3 − x⁵/5]₀² = π(32/3 − 32/5) = 64π/15.

(A-level only) The curve x = t², y = 2t for 0 ≤ t ≤ 2 is rotated about the x-axis. Find the volume.

1. dx/dt = 2t. V = π∫₀² (2t)² × 2t dt = 8π∫₀² t³ dt = 8π × 4 = 32π.

### Common mistakes

- Squaring the difference (y₁ − y₂)² for a washer.
- Using x-limits when integrating with respect to y.
- Forgetting π.

## E1 Improper integrals

*Refs: AQA E1, E9 · Edexcel CP5.2 · OCR 4.08c · MEI Pc1. Level: A-level only.*

### What you need to know

- An integral is improper if a limit is infinite or the integrand is undefined at a point of the interval (often an end point).
- Replace the problem limit by a letter, integrate, and take the limit:

```latex
\int_a^{\infty} f(x)\,dx = \lim_{t\to\infty}\int_a^t f(x)\,dx
```

- If the limit is finite, the integral converges; otherwise it diverges.
- (AQA E9) For k > 0: xᵏe⁻ˣ → 0 as x → ∞, and xᵏ ln x → 0 as x → 0⁺.

### Explained

The area under 1/x² from 1 to ∞ is finite (1) even though the region is unbounded, but the area under 1/x is infinite because ln t → ∞. The test is always to take the limit explicitly; do not substitute ∞ as if it were a number.

The AQA E9 limits say that exponentials beat powers and powers beat logarithms. They are needed when integrating by parts produces terms like te⁻ᵗ or t ln t.

### Worked example

Evaluate ∫₁^∞ 1/x² dx.

1. ∫₁ᵗ x⁻² dx = [−1/x]₁ᵗ = 1 − 1/t.
2. As t → ∞, 1/t → 0. Integral = 1.

Evaluate ∫₀⁴ 1/√x dx.

1. The integrand is undefined at 0. ∫ₛ⁴ x^{−1/2} dx = [2√x]ₛ⁴ = 4 − 2√s.
2. As s → 0⁺, the integral → 4.

Evaluate ∫₀^∞ xe⁻ˣ dx.

1. By parts: ∫₀ᵗ xe⁻ˣ dx = [−xe⁻ˣ]₀ᵗ + ∫₀ᵗ e⁻ˣ dx = −te⁻ᵗ + 1 − e⁻ᵗ.
2. As t → ∞, te⁻ᵗ → 0 and e⁻ᵗ → 0. Integral = 1.

Evaluate ∫₀¹ x ln x dx.

1. By parts on [s, 1]: [x² ln x/2]ₛ¹ − ∫ₛ¹ x/2 dx = −s² ln s/2 − (1 − s²)/4.
2. As s → 0⁺, s² ln s → 0. Integral = −¼.

Show that ∫₁^∞ 1/x dx diverges.

1. ∫₁ᵗ 1/x dx = ln t, which → ∞ as t → ∞. Diverges.

Evaluate ∫₁^∞ 4/[x(x + 2)] dx.

1. 4/[x(x + 2)] = 2/x − 2/(x + 2).
2. ∫₁ᵗ = [2 ln(x/(x + 2))]₁ᵗ = 2 ln(t/(t + 2)) − 2 ln(1/3).
3. As t → ∞, t/(t + 2) → 1, ln 1 = 0. Integral = 2 ln 3.

### Common mistakes

- Writing [−1/x]₁^∞ = 0 − (−1) without a limit argument.
- Missing that an integrand is undefined inside or at the end of the interval, such as 1/(x − 1)^{1/3} at x = 1.
- Splitting ∫ (2/x − 2/(x + 2)) dx into two divergent integrals instead of combining the logs first.

## E3 Mean value of a function

*Refs: AQA E3 · Edexcel CP5.3 · OCR 4.08e · MEI Pc3. Level: A-level only.*

### What you need to know

```latex
\bar f = \frac{1}{b-a}\int_a^b f(x)\,dx
```

- Adding a constant k to f adds k to the mean; multiplying f by k multiplies the mean by k.

### Explained

The mean value is the height of the rectangle on [a, b] with the same area as the region under the curve. It is the continuous version of "add up and divide by how many".

### Worked example

Find the mean value of sin x on [0, π].

1. (1/π)∫₀^π sin x dx = (1/π)[−cos x]₀^π = 2/π.

Find the mean value of x² on [0, 3], and hence of 2x² + 5.

1. (1/3)∫₀³ x² dx = (1/3)(9) = 3.
2. Mean of 2x² + 5 = 2 × 3 + 5 = 11.

Find the mean value of 1/(1 + x) on [0, 1].

1. (1/1)[ln(1 + x)]₀¹ = ln 2.

### Common mistakes

- Forgetting to divide by (b − a).

## Check questions

1. The region bounded by y = eˣ, the axes and x = 1 is rotated through 2π about the x-axis. Find the exact volume. [3 marks]
2. The region bounded by y = √x, the x-axis and x = 4 is rotated about the x-axis. Find the volume. [2 marks]
3. The region bounded by y = 4 − x², the y-axis and the x-axis (x ≥ 0) is rotated about the y-axis. Find the volume. [4 marks]
4. (A-level only) Evaluate ∫₀^∞ e^{−2x} dx and ∫₀^∞ x²e⁻ˣ dx, showing the limiting process. [6 marks]
5. Evaluate ∫₁⁹ 1/∛(x − 1) dx. [4 marks]
6. Explain why ∫₀¹ ln x dx is improper, and evaluate it. [4 marks]
7. Find the mean value of 1/(x² + 4) on [0, 2]. [3 marks]
8. The region under y = 1/x from x = 1 to x = t is rotated about the x-axis. Find the volume as t → ∞, and comment on the area of the same region. [4 marks]

## Mark scheme

1. π∫₀¹ e^{2x} dx (1) = π[e^{2x}/2]₀¹ (1) = π(e² − 1)/2 (1).
2. π∫₀⁴ x dx = 8π (2).
3. x² = 4 − y (1). π∫₀⁴ (4 − y) dy (1) = π[4y − y²/2]₀⁴ (1) = 8π (1).
4. ∫₀ᵗ e^{−2x} dx = ½(1 − e^{−2t}) → ½ (2). By parts twice: ∫₀ᵗ x²e⁻ˣ dx = 2 − e⁻ᵗ(t² + 2t + 2) (2); t²e⁻ᵗ → 0 etc. (1); integral 2 (1).
5. Undefined at x = 1 (1). ∫ₛ⁹ (x − 1)^{−1/3} dx = [1.5(x − 1)^{2/3}]ₛ⁹ (1) = 1.5 × 4 − 1.5(s − 1)^{2/3} (1) → 6 (1).
6. ln x is undefined at 0 (1). ∫ₛ¹ ln x dx = [x ln x − x]ₛ¹ = −1 − s ln s + s (2). s ln s → 0, so the integral is −1 (1).
7. ½∫₀² 1/(x² + 4) dx (1) = ½ × ½[arctan(x/2)]₀² (1) = ¼ × π/4 = π/16 (1).
8. π∫₁ᵗ x⁻² dx = π(1 − 1/t) (1) → π (1). Area ∫₁ᵗ 1/x dx = ln t → ∞ (1). Finite volume, infinite area (1).
