---
level: A-level
subject: Further Mathematics
topic: "Further complex numbers: loci and transformations of the plane"
as_content: "All of this file is A-level only (Edexcel Further Pure 2 option)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 4.1", "FP2 4.2"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Further complex numbers: loci and transformations of the plane

This file covers the Edexcel Further Pure 2 topics on complex numbers: loci of the form |z − a| = k|z − b| and arg((z − a)/(z − b)) = θ, regions defined by them, and transformations from the z-plane to the w-plane such as w = z² and w = (az + b)/(cz + d).

## Overview

Edexcel FP2 only. Basic loci (circles, perpendicular bisectors, half-lines) are in [03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md](03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md); circle theorems from GCSE are used for the arcs.

### Board differences

- Edexcel FP2 4.1 (further loci and regions) and 4.2 (elementary transformations from the z-plane to the w-plane). No other board covers these.

## FP2 4.1 Further loci

*Refs: Edexcel FP2 4.1. Level: A-level only.*

### What you need to know

- |z − a| = k|z − b| with k ≠ 1 is a circle (a circle of Apollonius). With k = 1 it is the perpendicular bisector.
- arg((z − a)/(z − b)) = θ is an arc of a circle through a and b (not including a and b), because the angle between the directions from b to z and from a to z is constant. For θ = π/2 the arc is a semicircle on the diameter ab.
- arg((z − a)/(z − b)) = arg(z − a) − arg(z − b).

### Explained

For the modulus locus, write z = x + iy, square both sides and simplify to x² + y² + Dx + Ey + F = 0, then complete the square.

For the argument locus, the angle subtended by the chord ab at z is θ. By the circle theorem "angles in the same segment are equal", z lies on an arc. Which arc: test a point. If θ > 0, as you go round from the direction of z − b to the direction of z − a anticlockwise, you turn through θ.

### Worked example

Find the Cartesian equation of |z − 3| = 2|z + 3|.

1. (x − 3)² + y² = 4[(x + 3)² + y²].
2. x² − 6x + 9 + y² = 4x² + 24x + 36 + 4y², so 3x² + 3y² + 30x + 27 = 0.
3. x² + y² + 10x + 9 = 0, (x + 5)² + y² = 16. Circle centre (−5, 0), radius 4.

Sketch the locus arg((z − 2)/(z + 2)) = π/2.

1. The angle at z subtended by the points −2 and 2 is a right angle: z is on the circle with diameter from −2 to 2.
2. Test z = 2i: arg(−2 + 2i) − arg(2 + 2i) = 3π/4 − π/4 = π/2 ✓. So it is the upper semicircle |z| = 2, y > 0, excluding ±2.

Sketch arg((z − 2i)/(z + 2)) = π/4.

1. The chord from −2 to 2i subtends an angle of π/4 at z, so z is on a major arc (an acute inscribed angle), and the centre angle is 2 × π/4 = π/2.
2. The chord has length 2√2, so the radius is 2. The two possible centres are the origin and (−2, 2), the reflection of the origin in the chord.
3. Test a point. On |z| = 2, z = −2i gives arg(−4i) − arg(2 − 2i) = −π/2 + π/4 = −π/4, the wrong sign. On the other circle, z = −4 + 2i gives arg(−4) − arg(−2 + 2i) = π − 3π/4 = π/4 ✓.
4. The locus is the major arc of the circle centre −2 + 2i, radius 2, from −2 to 2i passing through −4 + 2i, with the end points excluded.

### Common mistakes

- Including the end points a and b.
- Choosing the wrong arc; always test a point.

## FP2 4.2 Transformations of the complex plane

*Refs: Edexcel FP2 4.2. Level: A-level only.*

### What you need to know

- A transformation w = f(z) maps points z = x + iy to w = u + iv.
- To find the image of a locus: make z the subject (z = g(w)), substitute into the z-locus, and simplify to a locus in w.
- Or use u and v: write w = u + iv, express u and v in terms of x and y.
- w = z²: |w| = |z|², arg w = 2 arg z.
- w = (az + b)/(cz + d) maps circles and lines to circles and lines.

### Explained

For w = (az + b)/(cz + d), rearrange: w(cz + d) = az + b, so z = (b − dw)/(cw − a). A locus |z| = r becomes |b − dw| = r|cw − a|: a circle of Apollonius (or a line if the moduli of the coefficients balance).

### Worked example

Find the image of |z| = 1 under w = (2z + 1)/(z − 1).

1. z = (w + 1)/(w − 2).
2. |z| = 1: |w + 1| = |w − 2|. The perpendicular bisector of −1 and 2: u = ½.
3. Check: z = −1 gives w = ½ ✓.

Find the image of |z − 1| = 1 under w = 1/z.

1. z = 1/w, so |1/w − 1| = 1, |1 − w| = |w|.
2. The perpendicular bisector of 0 and 1: u = ½. (A circle through the origin maps to a line.)

Find the image of the half-line arg z = π/4 and of the circle |z| = 2 under w = z².

1. arg w = π/2: the positive imaginary axis.
2. |w| = 4: a circle of radius 4.

The region |z| ≤ 1 is mapped by w = (z − i)/(z + 1). Find the image of the boundary.

1. z = (w + i)/(1 − w). |w + i| = |w − 1|.
2. The perpendicular bisector of −i and 1: v = −u.
3. Test z = 0 (inside): w = −i, which has |w + i| = 0 < |w − 1|. So the region maps to |w + i| ≤ |w − 1|, the side of v = −u containing −i.

### Common mistakes

- Forgetting the modulus of the whole expression: |(w + 1)/(w − 2)| = 1 means |w + 1| = |w − 2|.

## Check questions

1. Find the Cartesian equation of |z + 2i| = 3|z − 2i| and give its centre and radius. [5 marks]
2. Sketch arg((z − 4)/z) = π/2 and describe it. [3 marks]
3. Find the image of |z − 2| = 2 under w = 1/z. [4 marks]
4. T maps z to w = (z + 2)/(z − i). Show that the image of the circle |z| = 2 is a circle, and find its centre and radius. [6 marks]
5. Under w = z², find the image of the line Re(z) = 1. [4 marks]

## Mark scheme

1. x² + (y + 2)² = 9[x² + (y − 2)²] (1). 8x² + 8y² − 40y + 32 = 0 (1). x² + y² − 5y + 4 = 0 (1). Centre (0, 5/2) (1), radius 3/2 (1).
2. Angle at z subtended by 0 and 4 is a right angle: circle with diameter from 0 to 4 (1). Test z = 2 − 2i: arg(−2 − 2i) − arg(2 − 2i) = −3π/4 + π/4 = −π/2, so the required arc is the upper semicircle (1), excluding 0 and 4 (1).
3. z = 1/w: |1/w − 2| = 2 (1), |1 − 2w| = 2|w| (1), |w − ½| = |w| (1). Line u = ¼ (1).
4. w(z − i) = z + 2, z = (iw + 2)/(w − 1) (2). |iw + 2| = 2|w − 1|, so |w − 2i| = 2|w − 1| (1). u² + (v − 2)² = 4[(u − 1)² + v²] (1). 3u² + 3v² − 8u + 4v = 0, centre (4/3, −2/3) (1), radius √(16 + 4)/3 = 2√5/3 (1).
5. z = 1 + iy: w = 1 − y² + 2iy (1). u = 1 − y², v = 2y (1). Eliminate: u = 1 − v²/4 (1). A parabola v² = 4(1 − u) (1).
