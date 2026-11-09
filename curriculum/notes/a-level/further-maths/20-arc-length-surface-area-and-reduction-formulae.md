---
level: A-level
subject: Further Mathematics
topic: "Arc length, surface area and reduction formulae"
as_content: "All of this file is A-level only. It is AQA compulsory content (E7, E8) and option content on Edexcel (FP2), OCR (Additional Pure) and MEI (Further Pure with Technology)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["E7", "E8"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 2.1", "FP2 2.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["8.06a", "8.06b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["TC8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Arc length, surface area and reduction formulae

This file covers the length of a curve and the area of a surface of revolution, for curves in Cartesian and parametric form, and deriving and using reduction formulae for integrals.

## Overview

All A-level only. It uses integration by parts and substitution ([../maths/15-integration-techniques.md](../maths/15-integration-techniques.md)), parametric differentiation ([../maths/13-differentiation-further-techniques.md](../maths/13-differentiation-further-techniques.md)) and hyperbolic functions ([15-hyperbolic-functions.md](15-hyperbolic-functions.md)). Volumes of revolution are in [12-further-calculus-volumes-improper-integrals-and-mean-value.md](12-further-calculus-volumes-improper-integrals-and-mean-value.md).

### Board differences

- AQA E7, E8 (compulsory); Edexcel FP2 2.1, 2.2; OCR 8.06a, 8.06b (Additional Pure); MEI TC8 (arc length only, Further Pure with Technology).
- Surfaces of revolution are about the x-axis on AQA and OCR; Edexcel FP2 includes rotation about the x-axis for Cartesian, parametric and (in some cases) polar curves. Polar arc length is Edexcel FP2 and MEI TC8 only.
- OCR 8.06a says "establish and use given reduction formulae".

## E7 Arc length

*Refs: AQA E7 · Edexcel FP2 2.2 · OCR 8.06b · MEI TC8. Level: A-level only.*

### What you need to know

```latex
s = \int_a^b \sqrt{1 + \left(\frac{dy}{dx}\right)^2}\,dx
```

```latex
s = \int_{t_1}^{t_2} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt
```

- (Edexcel FP2, MEI TC8) Polar: s = ∫√(r² + (dr/dθ)²) dθ.

### Explained

A tiny piece of curve is nearly straight, with length √(δx² + δy²) by Pythagoras. Dividing inside by δx or δt and integrating gives the formulae.

The integrand is usually nasty unless the question is designed to make 1 + (dy/dx)² a perfect square, or something that integrates by a standard substitution. Look for that.

### Worked example

Find the length of y = (2/3)x^{3/2} from x = 0 to x = 3.

1. dy/dx = x^{1/2}. 1 + (dy/dx)² = 1 + x.
2. s = ∫₀³ √(1 + x) dx = (2/3)[(1 + x)^{3/2}]₀³ = (2/3)(8 − 1) = 14/3.

Find the length of y = cosh x from x = 0 to x = ln 2.

1. 1 + sinh²x = cosh²x.
2. s = ∫₀^{ln 2} cosh x dx = sinh(ln 2) = (2 − ½)/2 = ¾.

Find the length of the curve x = t³, y = 3t² for 0 ≤ t ≤ 2.

1. (3t²)² + (6t)² = 9t²(t² + 4).
2. s = ∫₀² 3t√(t² + 4) dt = [(t² + 4)^{3/2}]₀² = 8^{3/2} − 8 = 16√2 − 8.

Find the total length of the astroid x = cos³t, y = sin³t.

1. (dx/dt)² + (dy/dt)² = 9cos⁴t sin²t + 9sin⁴t cos²t = 9sin²t cos²t.
2. For 0 ≤ t ≤ π/2, s = ∫ 3 sin t cos t dt = 3/2.
3. By symmetry, total length 4 × 3/2 = 6.

### Common mistakes

- Forgetting to square dy/dx inside the root.
- Taking √(sin²t cos²t) as sin t cos t on an interval where it is negative.

## E7 Area of a surface of revolution

*Refs: AQA E7 · Edexcel FP2 2.2 · OCR 8.06b. Level: A-level only.*

### What you need to know

For rotation through 2π about the x-axis:

```latex
S = 2\pi\int_a^b y\sqrt{1 + \left(\frac{dy}{dx}\right)^2}\,dx = 2\pi\int_{t_1}^{t_2} y\sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt
```

- About the y-axis, replace y by x in front: S = 2π∫x ds.

### Explained

Each small piece of arc, length δs, sweeps out a thin band of radius y, with area about 2πy δs.

### Worked example

Find the area of the surface formed when y = x³ for 0 ≤ x ≤ 1 is rotated about the x-axis.

1. S = 2π∫₀¹ x³√(1 + 9x⁴) dx. Let u = 1 + 9x⁴, du = 36x³ dx.
2. = 2π × (1/36)∫₁¹⁰ u^{1/2} du = (π/18) × (2/3)(10√10 − 1) = (π/27)(10√10 − 1).

The curve x = t², y = 2t, 0 ≤ t ≤ 1, is rotated about the x-axis. Find the surface area.

1. √(4t² + 4) = 2√(t² + 1).
2. S = 2π∫₀¹ 2t × 2√(t² + 1) dt = 8π[⅓(t² + 1)^{3/2}]₀¹ = (8π/3)(2√2 − 1).

Show that the surface area of a sphere of radius r is 4πr².

1. Rotate x = r cos θ, y = r sin θ, 0 ≤ θ ≤ π, about the x-axis. ds/dθ = r.
2. S = 2π∫₀^π r sin θ × r dθ = 2πr²[−cos θ]₀^π = 4πr².

### Common mistakes

- Using y² (from the volume formula) instead of y.

## E8 Reduction formulae

*Refs: AQA E8 · Edexcel FP2 2.1 · OCR 8.06a. Level: A-level only.*

### What you need to know

- A reduction formula links Iₙ (an integral involving a power n) to I_{n−1} or I_{n−2}.
- Derive it, usually by integration by parts; then apply it repeatedly from a value you can work out directly.

### Explained

For ∫xⁿeˣ dx, parts with u = xⁿ lowers the power by 1. For ∫sinⁿx dx, write sinⁿx = sin^{n−1}x × sin x, use parts, then replace cos²x by 1 − sin²x so that Iₙ appears again on the right, and collect it on the left.

### Worked example

Iₙ = ∫₀¹ xⁿeˣ dx. Show that Iₙ = e − nI_{n−1} and find I₄.

1. Parts: u = xⁿ, v′ = eˣ. Iₙ = [xⁿeˣ]₀¹ − n∫₀¹ x^{n−1}eˣ dx = e − nI_{n−1}.
2. I₀ = e − 1. I₁ = e − (e − 1) = 1. I₂ = e − 2. I₃ = e − 3(e − 2) = 6 − 2e. I₄ = e − 4(6 − 2e) = 9e − 24.

Iₙ = ∫₀^{π/2} sinⁿx dx. Show that Iₙ = ((n − 1)/n)I_{n−2} for n ≥ 2, and find I₆.

1. Iₙ = ∫ sin^{n−1}x sin x dx. Parts: u = sin^{n−1}x, v = −cos x.
2. Iₙ = [−sin^{n−1}x cos x]₀^{π/2} + (n − 1)∫ sin^{n−2}x cos²x dx = 0 + (n − 1)∫ sin^{n−2}x(1 − sin²x) dx.
3. Iₙ = (n − 1)(I_{n−2} − Iₙ), so nIₙ = (n − 1)I_{n−2}.
4. I₀ = π/2. I₆ = (5/6)(3/4)(1/2)(π/2) = 5π/32.

Jₙ = ∫₀^{π/2} xⁿ cos x dx. Show that Jₙ = (π/2)ⁿ − n(n − 1)J_{n−2} and find J₃.

1. Parts twice: Jₙ = [xⁿ sin x]₀^{π/2} − n∫x^{n−1} sin x dx = (π/2)ⁿ − n{[−x^{n−1} cos x]₀^{π/2} + (n − 1)J_{n−2}}.
2. The bracket is 0 for n ≥ 2. So Jₙ = (π/2)ⁿ − n(n − 1)J_{n−2}.
3. J₁ = [x sin x + cos x]₀^{π/2} = π/2 − 1. J₃ = π³/8 − 6(π/2 − 1) = π³/8 − 3π + 6.

### Common mistakes

- Forgetting that the boundary term may not be zero.
- Stopping at a step whose integral you cannot do directly; work down to I₀ or I₁.

## Check questions

1. Find the length of y = ln(cos x) from x = 0 to x = π/4. [5 marks]
2. Find the length of the curve x = 3t², y = 2t³ for 0 ≤ t ≤ √3. [5 marks]
3. The arc of y = 2√x from x = 0 to x = 3 is rotated about the x-axis. Find the surface area. [5 marks]
4. Iₙ = ∫₀^∞ xⁿe^{−x} dx. Show that Iₙ = nI_{n−1} and deduce Iₙ = n!. [5 marks]
5. Iₙ = ∫₀^{π/4} tanⁿx dx. Show that Iₙ + I_{n−2} = 1/(n − 1) for n ≥ 2, and find I₄. [6 marks]
6. Iₙ = ∫₀^{π/2} cosⁿx dx. Use the result Iₙ = ((n − 1)/n)I_{n−2} to find I₅. [2 marks]

## Mark scheme

1. dy/dx = −tan x (1). √(1 + tan²x) = sec x (1). ∫₀^{π/4} sec x dx = [ln|sec x + tan x|]₀^{π/4} (2) = ln(1 + √2) (1).
2. (6t)² + (6t²)² = 36t²(1 + t²) (1). s = ∫₀^√3 6t√(1 + t²) dt (1) = [2(1 + t²)^{3/2}]₀^√3 (2) = 16 − 2 = 14 (1).
3. dy/dx = x^{−1/2}, y√(1 + 1/x) = 2√(x + 1) (2). S = 2π∫₀³ 2√(x + 1) dx (1) = 4π × (2/3)[(x + 1)^{3/2}]₀³ (1) = (8π/3)(8 − 1) = 56π/3 (1).
4. Parts: [−xⁿe^{−x}]₀^∞ + n∫x^{n−1}e^{−x} dx (2). Boundary term 0, since xⁿe^{−x} → 0 (1). I₀ = 1 (1). Iₙ = n(n − 1)...1 × I₀ = n! (1).
5. Iₙ + I_{n−2} = ∫ tan^{n−2}x(tan²x + 1) dx = ∫ tan^{n−2}x sec²x dx (2) = [tan^{n−1}x/(n − 1)]₀^{π/4} = 1/(n − 1) (2). I₀ = π/4, I₂ = 1 − π/4, I₄ = ⅓ − I₂ = π/4 − 2/3 (2).
6. I₁ = 1 (1). I₅ = (4/5)(2/3)(1) = 8/15 (1).
