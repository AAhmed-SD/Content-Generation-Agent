---
level: A-level
subject: Further Mathematics
topic: "Complex numbers: Argand diagrams, modulus-argument form and loci"
as_content: "All of this file is AS content, except that MEI places the enlargement-and-rotation view of multiplication (Pj18) at A-level."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["B4", "B5", "B6", "B7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP2.4", "CP2.5", "CP2.6", "CP2.7"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.02f", "4.02k", "4.02l", "4.02m", "4.02o", "4.02p"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pj6", "Pj7", "Pj8", "Pj9", "Pj10", "Pj11", "Pj18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Complex numbers: Argand diagrams, modulus-argument form and loci

This file covers Argand diagrams, modulus and argument, the modulus-argument form, multiplying and dividing in that form, and loci and regions in the Argand diagram.

## Overview

AS content on every board. You need radians and the compound angle formulae from A-level Maths ([../maths/09-trigonometry-functions-rules-and-radians.md](../maths/09-trigonometry-functions-rules-and-radians.md), [../maths/10-trigonometry-identities-and-equations.md](../maths/10-trigonometry-identities-and-equations.md)) and circles ([../maths/05-coordinate-geometry-lines-and-circles.md](../maths/05-coordinate-geometry-lines-and-circles.md)). Cartesian arithmetic is in [02-complex-numbers-cartesian-form-and-polynomial-roots.md](02-complex-numbers-cartesian-form-and-polynomial-roots.md). Harder loci and transformations of the plane (Edexcel FP2) are in [27-complex-loci-and-transformations.md](27-complex-loci-and-transformations.md).

### Board differences

- AQA B4 to B7; Edexcel CP2.4 to CP2.7; OCR 4.02f, 4.02k to 4.02m, 4.02o, 4.02p; MEI Pj6 to Pj11, Pj18.
- OCR 4.02p asks for set notation for loci and regions, for example {z : |z − 2| < 3}. OCR 4.02m (Stage 2) is the geometric effect of multiplying by a complex number.
- All boards use the principal argument −π < θ ≤ π. MEI accepts 0 ≤ θ < 2π if stated, but −π < θ ≤ π is the default.
- Edexcel CP2.7 includes regions (inequalities); AQA B7 gives |z − a| > r and arg(z − a) = θ as its examples.

## B4 Argand diagrams

*Refs: AQA B4 · Edexcel CP2.4 · OCR 4.02k, 4.02l · MEI Pj7, Pj9, Pj10. Level: AS & A.*

### What you need to know

- The Argand diagram plots z = x + iy as the point (x, y), or the vector from the origin to (x, y). The horizontal axis is real, the vertical axis imaginary.
- z₁ + z₂ is the vector sum (parallelogram rule); z₁ − z₂ is the vector from z₂ to z₁.
- z* is the reflection of z in the real axis. −z is a half turn about the origin.

### Explained

Seeing complex numbers as vectors makes loci easy. The distance between the points z₁ and z₂ is |z₁ − z₂|, because z₁ − z₂ is the vector joining them. Roots of a real polynomial are symmetric about the real axis, because they come in conjugate pairs.

### Worked example

z₁ = 2 + 3i, z₂ = 4 − i. Describe the points z₁ + z₂ and z₁ − z₂ and find the distance between z₁ and z₂.

1. z₁ + z₂ = 6 + 2i, the fourth vertex of the parallelogram with sides 0z₁ and 0z₂.
2. z₁ − z₂ = −2 + 4i, the vector from z₂ to z₁.
3. Distance = |−2 + 4i| = √20 = 2√5.

### Common mistakes

- Plotting the imaginary part as iy on the axis. The axis is labelled Im, and the point is (x, y).

## B5 Modulus, argument and the modulus-argument form

*Refs: AQA B5 · Edexcel CP2.5 · OCR 4.02c, 4.02f · MEI Pj6, Pj7. Level: AS & A.*

### What you need to know

- The modulus |z| = r = √(x² + y²) is the distance from the origin.
- The argument arg z = θ is the angle from the positive real axis, anticlockwise positive, with −π < θ ≤ π (principal argument). arg 0 is undefined.
- z = r(cos θ + i sin θ), the modulus-argument form, with x = r cos θ, y = r sin θ.

### Explained

To find the argument, always sketch z first. Find the acute angle α = arctan|y/x|, then:

| Quadrant | arg z |
| --- | --- |
| first (x > 0, y > 0) | α |
| second (x < 0, y > 0) | π − α |
| third (x < 0, y < 0) | −(π − α) |
| fourth (x > 0, y < 0) | −α |

Points on the axes: arg of a positive real is 0, negative real π, positive imaginary π/2, negative imaginary −π/2.

The modulus-argument form must have a plus sign and r > 0. If you are given 3(cos θ − i sin θ), rewrite it as 3(cos(−θ) + i sin(−θ)).

### Worked example

Write z = −√3 + i in modulus-argument form.

1. r = √(3 + 1) = 2.
2. Second quadrant. α = arctan(1/√3) = π/6, so θ = π − π/6 = 5π/6.
3. z = 2(cos 5π/6 + i sin 5π/6).

Find |z| and arg z for z = −3 − 4i, giving the argument to 3 s.f.

1. |z| = 5.
2. Third quadrant. α = arctan(4/3) = 0.9273. θ = −(π − 0.9273) = −2.21.

Write 4(cos π/3 − i sin π/3) in modulus-argument form, and in the form x + iy.

1. = 4(cos(−π/3) + i sin(−π/3)), so r = 4, θ = −π/3.
2. x + iy = 4(½) − 4(√3/2)i = 2 − 2√3 i.

### Common mistakes

- Using arctan(y/x) from the calculator without a sketch. For −3 − 4i it gives 0.927, which is the wrong quadrant.
- Giving an argument outside −π < θ ≤ π, such as 5π/3 instead of −π/3.

## B6 Multiplying and dividing in modulus-argument form

*Refs: AQA B6 · Edexcel CP2.6 · OCR 4.02l, 4.02m · MEI Pj8, Pj18. Level: AS & A (MEI Pj18 A-level only).*

### What you need to know

```latex
|z_1z_2| = |z_1||z_2|,\quad \arg(z_1z_2) = \arg z_1 + \arg z_2
```

```latex
\left|\frac{z_1}{z_2}\right| = \frac{|z_1|}{|z_2|},\quad \arg\frac{z_1}{z_2} = \arg z_1 - \arg z_2
```

- Adjust the resulting argument by ±2π to keep it in −π < θ ≤ π.
- Multiplying by z = r(cos θ + i sin θ) is an enlargement by scale factor r and a rotation by θ about the origin.

### Explained

The proof uses the compound angle formulae:

```latex
r_1(\cos\theta_1+i\sin\theta_1)\,r_2(\cos\theta_2+i\sin\theta_2) = r_1r_2[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)]
```

because the real part is cos θ₁cos θ₂ − sin θ₁sin θ₂ and the imaginary part is sin θ₁cos θ₂ + cos θ₁sin θ₂. Multiplying by i (modulus 1, argument π/2) rotates by 90° anticlockwise.

### Worked example

z₁ = 6(cos 3π/4 + i sin 3π/4), z₂ = 2(cos π/2 + i sin π/2). Find z₁z₂ and z₁/z₂ in modulus-argument form.

1. z₁z₂: modulus 12, argument 3π/4 + π/2 = 5π/4. Subtract 2π: −3π/4. z₁z₂ = 12(cos(−3π/4) + i sin(−3π/4)).
2. z₁/z₂: modulus 3, argument 3π/4 − π/2 = π/4. z₁/z₂ = 3(cos π/4 + i sin π/4).

Given |z| = 2 and arg z = π/6, find |z³|, arg z³ and arg(1/z).

1. |z³| = 8. arg z³ = π/2.
2. 1/z has modulus ½ and argument −π/6.

The triangle with vertices 0, 1 + i and 3 is mapped by multiplication by 2i. Describe the image.

1. 2i has modulus 2 and argument π/2: enlargement scale factor 2, rotation 90° anticlockwise about 0.
2. Images: 0, 2i(1 + i) = −2 + 2i, 6i. The area is multiplied by 2² = 4.

### Common mistakes

- Multiplying arguments instead of adding them.
- Forgetting to bring the final argument back into the principal range.

## B7 Loci and regions in the Argand diagram

*Refs: AQA B7 · Edexcel CP2.7 · OCR 4.02o, 4.02p · MEI Pj9, Pj10, Pj11. Level: AS & A.*

### What you need to know

- |z − a| = r is a circle, centre a, radius r. |z − a| < r is the inside (dashed boundary); ≤ includes the boundary (solid).
- |z − a| = |z − b| is the perpendicular bisector of the line joining a and b.
- arg(z − a) = θ is a half-line from a (not including a) at angle θ to the positive real direction.
- Regions combine these, for example |z − 1| ≤ 2 and 0 ≤ arg z ≤ π/4.
- (OCR) Write loci and regions in set notation: {z : |z − 1 − i| ≤ 2}.

### Explained

Read |z − a| as "the distance from z to a", and arg(z − a) as "the direction from a to z". Watch the signs: |z + 2 − i| = |z − (−2 + i)|, so the centre is −2 + i.

For a half-line, the start point is an open circle because arg 0 is undefined.

To find extreme values over a circle, use geometry. If z lies on |z − c| = r, the largest |z| is |c| + r and the smallest is ||c| − r|, along the line through 0 and c. The largest and smallest arg z come from the tangents to the circle from the origin.

### Worked example

Sketch |z − 3 + 2i| = 2 and find the greatest and least values of |z| on it.

1. |z − (3 − 2i)| = 2: circle centre (3, −2), radius 2.
2. Distance from origin to centre = √13.
3. Greatest |z| = √13 + 2 ≈ 5.61; least |z| = √13 − 2 ≈ 1.61.

Find the Cartesian equation of the locus |z − 4| = |z + 2i|.

1. With z = x + iy: (x − 4)² + y² = x² + (y + 2)².
2. −8x + 16 = 4y + 4, so y = −2x + 3.
3. This is the perpendicular bisector of (4, 0) and (0, −2).

Shade the region where |z − 2i| ≤ 2 and π/4 ≤ arg z ≤ π/2, and find the point in the region with the largest real part.

1. The circle has centre (0, 2), radius 2, touching the origin. The region is the part of the disc between the half-lines y = x (x > 0) and the positive imaginary axis.
2. The line y = x meets the circle where x² + (x − 2)² = 4, so 2x² − 4x = 0, x = 2.
3. The point 2 + 2i is in the region and on both boundaries; the disc's rightmost point (2, 2) is that same point. Largest real part 2, at z = 2 + 2i.

Find the complex numbers satisfying both arg(z + 1) = π/4 and |z| = 5.

1. The half-line: y = x + 1 with x > −1.
2. x² + (x + 1)² = 25: 2x² + 2x − 24 = 0, x² + x − 12 = 0, x = 3 or −4.
3. x = −4 is not on the half-line (x > −1 needed). So z = 3 + 4i.

### Common mistakes

- Taking the centre of |z + 3 − i| = 2 as (3, −1). It is (−3, 1).
- Drawing arg(z − a) = θ as a full line through a.
- Using a solid boundary for a strict inequality.

## Check questions

1. z = 1 − √3 i. Find |z| and arg z, and write z in modulus-argument form. [3 marks]
2. z = 2(cos 2π/3 + i sin 2π/3) and w = √2(cos(−π/4) + i sin(−π/4)). Find zw and z/w in modulus-argument form. [4 marks]
3. Find, in the form x + iy, the number with modulus 6 and argument −5π/6. [2 marks]
4. Sketch on one Argand diagram the loci |z + 1 − 2i| = 3 and arg(z + 1) = π/2, and find the complex number satisfying both. [5 marks]
5. Find the Cartesian equation of the locus |z − 2 − i| = |z − 4 + i|, and describe it. [4 marks]
6. Shade the region R = {z : |z − 4 − 4i| ≤ 2√2} and find the greatest and least values of arg z for z in R. [5 marks]
7. The point P represents z, where |z − 5i| = 3. Find the greatest value of |z| and the value of z where it occurs. [3 marks]
8. Multiplication by w maps 1 to 1 + √3 i. Describe the transformation, and find the image of 2 − 2i. [4 marks]

## Mark scheme

1. |z| = 2 (1). arg z = −π/3 (1). z = 2(cos(−π/3) + i sin(−π/3)) (1).
2. |zw| = 2√2, arg = 2π/3 − π/4 = 5π/12 (2). |z/w| = √2, arg = 2π/3 + π/4 = 11π/12 (2).
3. 6(cos(−5π/6) + i sin(−5π/6)) = −3√3 − 3i (2).
4. Circle centre (−1, 2) radius 3 (1); half-line from (−1, 0) upward, open endpoint (1). On x = −1: (y − 2)² = 9 (1), y = 5 or −1 (1); y > 0 needed, so z = −1 + 5i (1).
5. (x − 2)² + (y − 1)² = (x − 4)² + (y + 1)² (1). −4x − 2y + 5 = −8x + 2y + 17 (1). y = x − 3 (1). Perpendicular bisector of (2, 1) and (4, −1) (1).
6. Disc centre (4, 4), radius 2√2, including boundary (1). Centre at distance 4√2 from origin, arg π/4 (1). Half-angle of tangents: sin α = 2√2/(4√2) = ½, α = π/6 (1). Greatest π/4 + π/6 = 5π/12 (1), least π/4 − π/6 = π/12 (1).
7. Centre 5i at distance 5 from 0 (1). Greatest |z| = 8 (1), at z = 8i (1).
8. w = 1 + √3 i: modulus 2, argument π/3 (1). Enlargement scale factor 2 and rotation π/3 anticlockwise about 0 (1). (2 − 2i)(1 + √3 i) = 2 + 2√3 i − 2i + 2√3 (1) = (2 + 2√3) + (2√3 − 2)i (1).
