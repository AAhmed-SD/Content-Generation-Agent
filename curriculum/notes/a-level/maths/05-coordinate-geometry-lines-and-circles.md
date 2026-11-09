---
level: A-level
subject: Mathematics
topic: "Coordinate geometry: straight lines and circles"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["C1", "C2"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P3.1", "P3.2"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.03a", "1.03b", "1.03c", "1.03d", "1.03e", "1.03f"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mg1", "Mg2", "Mg3", "Mg4", "Mg5", "Mg6", "Mg7", "Mg8", "Mg9", "Mg10", "Mg11"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Coordinate geometry: straight lines and circles

This file covers the equation of a straight line in its different forms, parallel and perpendicular lines, straight line models, the equation of a circle, and the circle properties used to find tangents, chords and centres.

## Overview

All AS content. Parametric equations, the other part of coordinate geometry, are in file 06.

### Board differences

- AQA C1, C2; Edexcel 3.1, 3.2.
- OCR H240: 1.03a to 1.03f.
- OCR MEI H640 lists the basic skills separately: gradient (Mg1), distance (Mg2), midpoint (Mg3), and intersections of a line with a curve (Mg8) and with a circle (Mg9).

## C1 Straight lines

*Refs: AQA C1 · Edexcel 3.1 · OCR 1.03a, 1.03b, 1.03c · MEI Mg1, Mg2, Mg3, Mg4, Mg5, Mg6, Mg7. Level: AS & A.*

### What you need to know

- The gradient between two points, the distance between them, and the midpoint.
- The forms y = mx + c, y − y₁ = m(x − x₁) and ax + by + c = 0.
- Parallel lines have equal gradients. Perpendicular lines have gradients whose product is −1.
- Find where two lines meet by solving simultaneously.
- Use straight lines as models.

```latex
m = \frac{y_2 - y_1}{x_2 - x_1} \qquad d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \qquad M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right)
```

```latex
y - y_1 = m(x - x_1) \qquad m_1 m_2 = -1 \text{ for perpendicular lines}
```

### Explained

The form y − y₁ = m(x − x₁) is the quickest way to write a line when you know its gradient and one point. Questions often ask for the answer as ax + by + c = 0 with a, b, c integers: multiply out fractions and collect every term on one side.

The perpendicular gradient is the negative reciprocal: if m = 2/3, the perpendicular gradient is −3/2.

The perpendicular bisector of AB passes through the midpoint of AB and is perpendicular to AB. Every point on it is the same distance from A as from B.

In a straight line model y = mx + c, the gradient is the rate of change (for example, cost per unit) and the intercept is the value when x = 0 (for example, a fixed charge).

### Worked example

Find the equation of the line through (2, −1) and (6, 7), in the form ax + by + c = 0.

1. m = (7 − (−1))/(6 − 2) = 8/4 = 2.
2. y + 1 = 2(x − 2), so y = 2x − 5.
3. 2x − y − 5 = 0.

Find the perpendicular bisector of A(1, 3) and B(5, −1).

1. Midpoint (3, 1).
2. Gradient of AB = −4/4 = −1, so the perpendicular gradient is 1.
3. y − 1 = 1(x − 3), so y = x − 2.

Find the point where 2x + 3y = 12 meets y = x − 1.

1. 2x + 3(x − 1) = 12, so 5x = 15, x = 3.
2. y = 2. The point is (3, 2).

Show that the points P(0, 1), Q(4, 3) and R(2, 7) form a right-angled triangle.

1. Gradient PQ = 2/4 = 1/2. Gradient QR = 4/(−2) = −2.
2. (1/2)(−2) = −1, so PQ is perpendicular to QR. The right angle is at Q.

A plumber charges £40 for a 1-hour job and £100 for a 3-hour job. Model the charge C as a linear function of the time t hours and interpret the constants.

1. Gradient = (100 − 40)/(3 − 1) = 30. C − 40 = 30(t − 1), so C = 30t + 10.
2. £30 per hour, plus a £10 fixed call-out charge.
3. The model may not hold for very short jobs, where a minimum charge is likely.

### Common mistakes

- Using the perpendicular gradient as −m instead of −1/m.
- Leaving fractions in "ax + by + c = 0 with integer coefficients".
- Subtracting coordinates in a different order on top and bottom of the gradient formula.

## C2 Circles

*Refs: AQA C2 · Edexcel 3.2 · OCR 1.03d, 1.03e, 1.03f · MEI Mg8, Mg9, Mg10, Mg11. Level: AS & A.*

### What you need to know

- The circle with centre (a, b) and radius r has equation

```latex
(x-a)^2 + (y-b)^2 = r^2
```

- Complete the square to find the centre and radius from the expanded form x² + y² + 2fx + 2gy + c = 0.
- Use these properties:
  - the angle in a semicircle is a right angle;
  - the perpendicular from the centre to a chord bisects the chord;
  - the radius at a point is perpendicular to the tangent at that point.
- Find where a line meets a circle; use the discriminant to decide whether a line is a tangent, cuts the circle twice, or misses it.

### Explained

**Centre and radius.** Group x terms and y terms and complete the square on each. If the number on the right-hand side is not positive, the equation is not a circle.

**Tangent at a point.** Find the gradient of the radius to the point; the tangent's gradient is its negative reciprocal; use y − y₁ = m(x − x₁).

**Finding the centre from three points.** The perpendicular bisector of any chord passes through the centre. Find the perpendicular bisectors of two chords and solve them simultaneously.

**Diameters.** If AB is a diameter, the centre is the midpoint of AB and the radius is half of AB. If angle ACB = 90°, then AB is a diameter of the circle through A, B and C.

**Line and circle.** Substitute the line into the circle to get a quadratic. Two roots: the line cuts the circle (a chord). One repeated root: tangent. No real roots: no intersection.

### Worked example

Find the centre and radius of x² + y² − 6x + 4y − 12 = 0.

1. (x − 3)² − 9 + (y + 2)² − 4 − 12 = 0.
2. (x − 3)² + (y + 2)² = 25.
3. Centre (3, −2), radius 5.

Find the equation of the tangent to this circle at (6, 2).

1. Check: (6 − 3)² + (2 + 2)² = 9 + 16 = 25 ✓.
2. Radius gradient: (2 − (−2))/(6 − 3) = 4/3. Tangent gradient −3/4.
3. y − 2 = −(3/4)(x − 6), so 4y − 8 = −3x + 18, so 3x + 4y − 26 = 0.

A circle has diameter with ends (−1, 4) and (5, −4). Find its equation.

1. Centre = midpoint = (2, 0).
2. Radius = half of √(6² + 8²) = 10/2 = 5.
3. (x − 2)² + y² = 25.

Find where the line y = x + 1 meets the circle x² + y² = 13.

1. x² + (x + 1)² = 13, so 2x² + 2x − 12 = 0, so x² + x − 6 = 0.
2. (x + 3)(x − 2) = 0. x = 2, y = 3 or x = −3, y = −2.
3. Points (2, 3) and (−3, −2).

Find the values of k for which y = kx + 5 is a tangent to x² + y² = 5.

1. x² + (kx + 5)² = 5, so (1 + k²)x² + 10kx + 20 = 0.
2. Tangent: discriminant = 0. 100k² − 80(1 + k²) = 0.
3. 20k² = 80, so k = ±2.

The points A(0, 0), B(8, 0) and C(0, 6) lie on a circle. Find its equation.

1. Angle BAC is 90° (the axes are perpendicular), so BC is a diameter.
2. Centre = midpoint of BC = (4, 3). Radius = half of √(64 + 36) = 5.
3. (x − 4)² + (y − 3)² = 25.

A circle has centre (0, 0) and radius 10. A chord is 6 units from the centre. Find its length.

1. The perpendicular from the centre bisects the chord, forming a right-angled triangle with hypotenuse 10 and one side 6.
2. Half-chord = √(100 − 36) = 8.
3. Chord length 16.

### Common mistakes

- Sign errors: (x + 3)² + (y − 1)² = 16 has centre (−3, 1).
- Giving r² as the radius.
- Using the gradient of the radius as the tangent gradient.

## Check questions

1. Find the equation of the line through (3, −2) perpendicular to 2x − 5y + 1 = 0. Give it in the form ax + by + c = 0 with integer coefficients. [4 marks]
2. A is (−2, 1) and B is (4, 9). (a) Find the length of AB. (b) Find the equation of the perpendicular bisector of AB. [5 marks]
3. A circle has equation x² + y² + 8x − 2y − 8 = 0. Find its centre and radius. [3 marks]
4. The point P(−1, 5) lies on the circle in question 3. Find the equation of the tangent at P. [4 marks]
5. Find the values of k for which the line y = x + k is a tangent to x² + y² = 8. [4 marks]
6. A(1, 2) and B(7, 10) are the ends of a diameter of a circle. (a) Find the equation of the circle. (b) Show that C(0, 9) lies on the circle, and explain why angle ACB is 90°. [5 marks]
7. Hiring a hall costs £120 for 30 guests and £170 for 50 guests. Assuming a linear model, find the cost formula, interpret its constants, and give one limitation. [4 marks]

## Mark scheme

1. Gradient of given line 2/5 (1); perpendicular gradient −5/2 (1); y + 2 = −(5/2)(x − 3) (1); 5x + 2y − 11 = 0 (1).
2. (a) √(6² + 8²) (1) = 10 (1). (b) Midpoint (1, 5) (1); gradient AB = 4/3, perpendicular −3/4 (1); 3x + 4y − 23 = 0 (1).
3. (x + 4)² + (y − 1)² = 25 (1); centre (−4, 1) (1); radius 5 (1).
4. Gradient of radius (5 − 1)/(−1 + 4) = 4/3 (1); tangent gradient −3/4 (1); y − 5 = −(3/4)(x + 1) (1); 3x + 4y − 17 = 0 (1).
5. x² + (x + k)² = 8, so 2x² + 2kx + k² − 8 = 0 (1); discriminant 4k² − 8(k² − 8) = 0 (1); 64 − 4k² = 0 (1); k = ±4 (1).
6. (a) Centre (4, 6) (1); radius 5 (1); (x − 4)² + (y − 6)² = 25 (1). (b) (0 − 4)² + (9 − 6)² = 16 + 9 = 25 (1); AB is a diameter, and the angle in a semicircle is 90° (1).
7. Gradient 50/20 = 2.5 (1); C = 2.5n + 45 (1); £45 fixed charge and £2.50 per guest (1); limitation, e.g. a hall has a maximum capacity, or there may be bulk discounts (1).
