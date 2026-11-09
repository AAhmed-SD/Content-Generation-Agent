---
level: A-level
subject: Further Mathematics
topic: "Polar coordinates"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["G1", "G2", "G3"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP7.1", "CP7.2", "CP7.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.09a", "4.09b", "4.09c"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["PP1", "PP2", "PP3"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Polar coordinates

This file covers polar coordinates and converting to and from Cartesian form, sketching polar curves, finding areas enclosed by polar curves, and (Edexcel) tangents parallel or perpendicular to the initial line.

## Overview

All A-level only. You need radians and trigonometric identities, especially the double angle formulae ([../maths/10-trigonometry-identities-and-equations.md](../maths/10-trigonometry-identities-and-equations.md)). Investigating curves with graphing software (MEI Further Pure with Technology) is in [29-curves-and-differential-equations-with-technology.md](29-curves-and-differential-equations-with-technology.md).

### Board differences

- AQA G1 to G3; Edexcel CP7.1 to CP7.3; OCR 4.09a to 4.09c; MEI PP1 to PP3.
- Edexcel CP7.3 expects tangents parallel to, or at right angles to, the initial line. The other boards do not list tangents.
- Edexcel names the curves that may be set, such as r = p sec(α − θ), r = kθ, r = a(1 ± cos θ), r = a(3 + 2 cos θ), r = a cos 2θ and r² = a² cos 2θ. These are good practice for every board.
- Some boards allow negative r in sketching; in exams r ≥ 0 is the usual convention, and points where the formula gives r < 0 are left out.

## G1 Polar coordinates

*Refs: AQA G1 · Edexcel CP7.1 · OCR 4.09a · MEI PP1. Level: A-level only.*

### What you need to know

- A point P has polar coordinates (r, θ): r is the distance OP from the pole O, and θ is the angle from the initial line (the positive x-axis), anticlockwise.
- x = r cos θ, y = r sin θ, r² = x² + y², tan θ = y/x (check the quadrant).
- Use −π < θ ≤ π or 0 ≤ θ < 2π as the question says.

### Explained

To convert an equation, substitute x = r cos θ and y = r sin θ, or replace r² by x² + y². Multiplying both sides by r often helps: r = 4 cos θ becomes r² = 4r cos θ, that is x² + y² = 4x, a circle.

### Worked example

Convert (−3, √3) to polar coordinates with −π < θ ≤ π.

1. r = √(9 + 3) = 2√3.
2. Second quadrant: θ = π − arctan(√3/3) = π − π/6 = 5π/6.
3. (2√3, 5π/6).

Find a Cartesian equation for r = 4 cos θ and describe the curve.

1. r² = 4r cos θ, so x² + y² = 4x.
2. (x − 2)² + y² = 4: circle centre (2, 0), radius 2.

Find a polar equation for the line y = x + 2.

1. r sin θ = r cos θ + 2, so r(sin θ − cos θ) = 2.
2. r = 2/(sin θ − cos θ).

Find a polar equation for x² − y² = 9.

1. r²(cos²θ − sin²θ) = 9, so r² cos 2θ = 9, r² = 9 sec 2θ.

### Common mistakes

- Getting θ in the wrong quadrant by using arctan(y/x) without a sketch.
- Forgetting that r is a distance and is never negative in the usual convention.

## G2 Sketching polar curves

*Refs: AQA G2 · Edexcel CP7.2 · OCR 4.09b · MEI PP2. Level: A-level only.*

### What you need to know

- Sketch curves such as r = a, θ = α, r = kθ (spiral), r = 2a cos θ (circle), r = a(1 + cos θ) (cardioid), r = a(p + q cos θ) (limaçon), r = a sin nθ and r = a cos nθ (roses), and r² = a² cos 2θ (lemniscate).
- Find the greatest and least values of r and the values of θ where they occur, and where the curve passes through the pole.

### Explained

Make a short table of θ against r at key angles (0, π/6, π/4, π/2, ...), mark where r is greatest and where r = 0, and use symmetry. A cos θ curve is symmetric about the initial line; a sin θ curve about θ = π/2.

When r = 0 at θ = α, the curve meets the pole with tangent θ = α.

For a(p + q cos θ) with p > q > 0: if p ≥ 2q the curve is convex ("egg"); if q < p < 2q there is a dimple at θ = π; p = q is a cardioid with a cusp at the pole.

For r = a cos nθ with r ≥ 0: n loops when n is odd, and (with the usual r ≥ 0 rule) n loops when n is even as well, since points with cos nθ < 0 are left out.

### Worked example

Sketch r = 2(1 + cos θ) for 0 ≤ θ < 2π.

1. θ = 0: r = 4 (greatest). θ = π/2: r = 2. θ = π: r = 0 (cusp at the pole). θ = 3π/2: r = 2.
2. Symmetric about the initial line. A cardioid, through (4, 0), (2, π/2), the pole and (2, 3π/2).

Sketch r = 2 sin 3θ for 0 ≤ θ ≤ π.

1. r ≥ 0 when 0 ≤ θ ≤ π/3 and 2π/3 ≤ θ ≤ π (and 4π/3 ≤ θ ≤ 5π/3 if continued).
2. Within [0, π] there are two loops; continued to 2π there are three equal loops, each of maximum r = 2 at θ = π/6, 5π/6, 3π/2.

Sketch r = a(3 + 2 cos θ).

1. r ranges from a (at θ = π) to 5a (at θ = 0). Here p = 3 and q = 2, so q < p < 2q and there is a dimple at θ = π.
2. Never passes through the pole.

### Common mistakes

- Drawing a cusp as a smooth curve, or a dimple as a cusp.
- Plotting points where r < 0 when the question restricts r ≥ 0.

## G3 Area enclosed by a polar curve

*Refs: AQA G3 · Edexcel CP7.3 · OCR 4.09c · MEI PP3. Level: A-level only.*

### What you need to know

```latex
A = \frac12\int_{\alpha}^{\beta} r^2\,d\theta
```

- The area is swept out by the radius as θ goes from α to β.
- Area between two curves: find where they meet, split the region, and add or subtract sector areas.

### Explained

A thin sector with angle δθ and radius r is nearly a triangle of area ½r²δθ, which is where the formula comes from.

You will usually need cos²θ = ½(1 + cos 2θ) or sin²θ = ½(1 − cos 2θ) to integrate r².

Use symmetry to halve the work: integrate over one half and double.

### Worked example

Find the area inside r = 2(1 + cos θ).

1. A = ½∫₀^{2π} 4(1 + cos θ)² dθ = 2∫₀^{2π} (1 + 2 cos θ + cos²θ) dθ.
2. = 2∫₀^{2π} (3/2 + 2 cos θ + ½ cos 2θ) dθ = 2 × 3π = 6π.

Find the area of one loop of r = 2 sin 3θ.

1. One loop: 0 ≤ θ ≤ π/3.
2. A = ½∫₀^{π/3} 4 sin²3θ dθ = ∫₀^{π/3} (1 − cos 6θ) dθ = π/3.

Find the area of the region inside both r = 3 cos θ and r = 1 + cos θ.

1. Meet where 3 cos θ = 1 + cos θ: cos θ = ½, θ = ±π/3.
2. By symmetry, take the upper half and double. At θ = 0 the circle has r = 3 and the cardioid r = 2, so the cardioid is the inner curve for 0 ≤ θ ≤ π/3. At θ = π/2 the circle has r = 0, so the circle is inner for π/3 ≤ θ ≤ π/2.
3. Upper half area = ½∫₀^{π/3} (1 + cos θ)² dθ + ½∫_{π/3}^{π/2} 9 cos²θ dθ.
4. First: ½[3θ/2 + 2 sin θ + ¼ sin 2θ]₀^{π/3} = ½[π/2 + √3 + √3/8] = π/4 + 9√3/16.
5. Second: (9/4)[θ + ½ sin 2θ]_{π/3}^{π/2} = (9/4)[π/2 − π/3 − √3/4] = 3π/8 − 9√3/16.
6. Upper half = 5π/8; total = 5π/4.

### Common mistakes

- Integrating r instead of r².
- Using limits that make the radius sweep the region twice (for example 0 to 2π for r = 2 sin 3θ gives three loops, not one).

## Tangents parallel or perpendicular to the initial line

*Refs: Edexcel CP7.3. Level: A-level only.*

### What you need to know

- y = r sin θ and x = r cos θ.
- Tangent parallel to the initial line: dy/dθ = 0. Tangent perpendicular to it: dx/dθ = 0.

### Worked example

Find the points on r = 1 + cos θ where the tangent is parallel to the initial line.

1. y = (1 + cos θ) sin θ = sin θ + ½ sin 2θ.
2. dy/dθ = cos θ + cos 2θ = 2cos²θ + cos θ − 1 = (2 cos θ − 1)(cos θ + 1) = 0.
3. cos θ = ½: θ = ±π/3, r = 3/2. (cos θ = −1 gives the pole, the cusp.)
4. Points (3/2, π/3) and (3/2, −π/3).

Find where the tangent to r = 1 + cos θ is perpendicular to the initial line.

1. x = cos θ + cos²θ, dx/dθ = −sin θ(1 + 2 cos θ) = 0.
2. sin θ = 0: θ = 0, r = 2. cos θ = −½: θ = ±2π/3, r = ½.
3. Points (2, 0), (½, 2π/3), (½, −2π/3).

### Common mistakes

- Differentiating r instead of x or y.

## Check questions

1. Convert x² + y² − 6y = 0 to polar form and describe the curve. [3 marks]
2. Sketch r = 3θ for 0 ≤ θ ≤ 2π, and find the area enclosed between the curve and the initial line from θ = 0 to θ = 2π. [5 marks]
3. Show that the area enclosed by r = a(3 + 2 cos θ) is 11πa². [5 marks]
4. Find the area of the region enclosed by one loop of r² = 9 cos 2θ. [4 marks]
5. The curves r = 2 and r = 4 cos θ meet at A and B. Find the polar coordinates of A and B and the area of the region inside both curves. [7 marks]
6. (Edexcel) Find the polar coordinates of the points on r = 2(1 + cos θ) where the tangent is parallel to the initial line. [5 marks]

## Mark scheme

1. r² = 6r sin θ (1), r = 6 sin θ (1). Circle centre (0, 3) radius 3 (1).
2. Spiral from the pole, r increasing from 0 to 6π (1). ½∫₀^{2π} 9θ² dθ (1) = (3/2)[θ³]₀^{2π} (1) = 12π³ (2).
3. ½a²∫₀^{2π} (9 + 12 cos θ + 4cos²θ) dθ (1). 4cos²θ = 2 + 2 cos 2θ (1). ½a²∫(11 + 12 cos θ + 2 cos 2θ) dθ (1) = ½a² × 22π (1) = 11πa² (1).
4. Loop for −π/4 ≤ θ ≤ π/4 (1). ½∫ 9 cos 2θ dθ (1) = (9/4)[sin 2θ]_{−π/4}^{π/4} (1) = 9/2 (1).
5. 4 cos θ = 2, θ = ±π/3 (1). A(2, π/3), B(2, −π/3) (1). Upper half: inside both is r = 2 for 0 ≤ θ ≤ π/3 and r = 4 cos θ for π/3 ≤ θ ≤ π/2 (1). ½∫₀^{π/3} 4 dθ = 2π/3 (1). ½∫_{π/3}^{π/2} 16cos²θ dθ = 4[θ + ½ sin 2θ]_{π/3}^{π/2} = 2π/3 − √3 (2). Total 2(4π/3 − √3) = 8π/3 − 2√3 (1).
6. y = 2 sin θ + sin 2θ (1). dy/dθ = 2 cos θ + 2 cos 2θ = 0 (1). (2 cos θ − 1)(cos θ + 1) = 0 (1). θ = ±π/3, r = 3 (1). Points (3, π/3) and (3, −π/3) (1).
