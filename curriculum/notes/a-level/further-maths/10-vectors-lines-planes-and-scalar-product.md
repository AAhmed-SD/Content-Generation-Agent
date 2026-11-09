---
level: A-level
subject: Further Mathematics
topic: "Vectors: lines, planes and the scalar product"
as_content: "Lines in 3D, the scalar product and the angle between lines are AS. Planes are AS on MEI (Pv1 to Pv3, Pv6) but A-level only on AQA, Edexcel and OCR. Angles involving planes are A-level only except MEI Pv6."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["F1", "F2", "F3", "F4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP6.1", "CP6.2", "CP6.3", "CP6.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.04a", "4.04b", "4.04c", "4.04d"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pv1", "Pv2", "Pv3", "Pv6", "Pv8", "Pv9", "Pv10", "Pv14", "Pv15", "Pv16", "Pv17"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Vectors: lines, planes and the scalar product

This file covers the vector and Cartesian equations of a line in three dimensions, the scalar product, perpendicular vectors, the vector, scalar-product and Cartesian equations of a plane, and angles between lines and planes.

## Overview

Vectors in 2D and 3D, magnitude and position vectors are in A-level Maths ([../maths/18-vectors.md](../maths/18-vectors.md)). Intersections, the vector product and distances are in [11-vectors-vector-product-intersections-and-distances.md](11-vectors-vector-product-intersections-and-distances.md).

### Board differences

- AQA F1 to F4; Edexcel CP6.1 to CP6.4; OCR 4.04a to 4.04d; MEI Pv1 to Pv3, Pv6, Pv8 to Pv10, Pv15.
- MEI puts planes at AS (Pv2) and lines at A-level (Pv8, Pv9). AQA, Edexcel and OCR do the reverse: lines at AS, planes at A-level.
- OCR 4.04d and MEI Pv10, Pv15 include the angle between a line and a plane.

## F1 Equations of a line

*Refs: AQA F1 · Edexcel CP6.1 · OCR 4.04a · MEI Pv8, Pv9. Level: AS & A (MEI A-level only).*

### What you need to know

- Vector equation: r = a + λb, where a is the position vector of a point on the line and b is a direction vector.
- Cartesian form, for a = (a₁, a₂, a₃) and b = (b₁, b₂, b₃) with no zero components:

```latex
\frac{x-a_1}{b_1} = \frac{y-a_2}{b_2} = \frac{z-a_3}{b_3}\;(=\lambda)
```

- If a component of b is 0, that coordinate is constant, for example (x − 1)/2 = (y + 3)/5, z = 4.
- The line through points A and B: r = a + λ(b − a).

### Explained

Each value of the parameter λ gives one point. Any non-zero multiple of b is an equally good direction, and any point on the line will do for a, so the same line has many equations.

To convert Cartesian to vector form, read the point from the numerators (with signs flipped) and the direction from the denominators. Make sure each variable has coefficient 1 first: (2x − 1)/4 = ... means (x − ½)/2 = ...

### Worked example

Find vector and Cartesian equations of the line through A(2, −1, 3) and B(5, 1, −1).

1. Direction AB = (3, 2, −4).
2. r = (2, −1, 3) + λ(3, 2, −4).
3. (x − 2)/3 = (y + 1)/2 = (z − 3)/(−4).

Write (3 − x)/2 = (2y + 1)/6 = z in vector form.

1. (x − 3)/(−2) = (y + ½)/3 = z/1.
2. r = (3, −½, 0) + λ(−2, 3, 1).

Does C(11, 5, −9) lie on the line r = (2, −1, 3) + λ(3, 2, −4)?

1. x: 2 + 3λ = 11, λ = 3. y: −1 + 6 = 5 ✓. z: 3 − 12 = −9 ✓.
2. Yes, at λ = 3.

### Common mistakes

- Reading the point from (x + 2)/3 as x = 2 rather than −2.
- Forgetting to make the coefficient of x, y or z equal to 1 before reading the direction.

## F3 The scalar product and angles

*Refs: AQA F3 · Edexcel CP6.3 · OCR 4.04c, 4.04d · MEI Pv1, Pv6, Pv10, Pv15. Level: AS & A (angles with planes A-level only, except MEI Pv6).*

### What you need to know

```latex
\mathbf a\cdot\mathbf b = a_1b_1 + a_2b_2 + a_3b_3 = |\mathbf a||\mathbf b|\cos\theta
```

- The angle between two lines is the angle between their direction vectors (give the acute angle unless asked otherwise).
- The angle between two planes is the angle between their normals.
- The angle θ between a line with direction d and a plane with normal n:

```latex
\sin\theta = \frac{|\mathbf d\cdot\mathbf n|}{|\mathbf d||\mathbf n|}
```

### Explained

The scalar product measures how much two vectors point the same way. It is positive for an acute angle, negative for an obtuse one, and zero for perpendicular vectors.

For a line and a plane, the angle between d and the normal n is the complement of the angle you want, which is why sin appears instead of cos.

### Worked example

Find the acute angle between the lines with directions (2, −1, 3) and (1, 4, −2).

1. Scalar product: 2 − 4 − 6 = −8. Magnitudes √14 and √21.
2. cos θ = −8/√294, θ = 117.8°.
3. Acute angle between the lines: 180 − 117.8 = 62.2°.

Find the acute angle between the planes x + 2y − 2z = 5 and 3x + 4z = 1.

1. Normals (1, 2, −2) and (3, 0, 4). Scalar product 3 − 8 = −5.
2. cos θ = |−5|/(3 × 5) = ⅓, θ = 70.5°.

Find the angle between the line r = (1, 0, 2) + λ(2, 1, 2) and the plane x − y + 4z = 3.

1. d·n = 2 − 1 + 8 = 9. |d| = 3, |n| = √18.
2. sin θ = 9/(3√18) = 1/√2, θ = 45°.

### Common mistakes

- Using the position vectors (the a's) instead of the directions.
- Using cos instead of sin for a line and a plane.

## F4 Perpendicular vectors

*Refs: AQA F4 · Edexcel CP6.4 · MEI Pv1. Level: AS & A.*

### What you need to know

- Non-zero vectors a and b are perpendicular if and only if a·b = 0.

### Explained

This gives one equation per perpendicularity condition, which you can use to find unknown components or to find a normal to a plane.

### Worked example

Find t such that (t, 2, −1) and (3, t, 4) are perpendicular.

1. 3t + 2t − 4 = 0, so t = 0.8.

Find a vector perpendicular to both (1, 2, 0) and (0, 1, 3).

1. Let n = (a, b, c): a + 2b = 0 and b + 3c = 0.
2. Take c = 1: b = −3, a = 6. n = (6, −3, 1).
3. (The vector product in file 11 gives this directly.)

### Common mistakes

- Concluding vectors are parallel because the scalar product is zero.

## F2 Equations of a plane

*Refs: AQA F2, F3 · Edexcel CP6.2 · OCR 4.04b · MEI Pv2, Pv3. Level: A-level only (MEI AS).*

### What you need to know

- Vector form: r = a + λb + μc, where b and c are non-parallel vectors in the plane.
- Scalar product form: r·n = a·n, where n is a normal vector.
- Cartesian form: n₁x + n₂y + n₃z = d, with d = a·n. The coefficients are the normal.
- A normal is perpendicular to every vector in the plane.

### Explained

To go from vector form to Cartesian form, find a normal (perpendicular to b and c), then d = a·n.

To find the plane through three points A, B, C, use b = AB and c = AC.

If n is a unit vector, |d| in r·n̂ = d is the distance of the plane from the origin.

### Worked example

Find the Cartesian equation of the plane through A(1, 0, 2), B(3, 1, 0) and C(0, 2, 1).

1. AB = (2, 1, −2), AC = (−1, 2, −1).
2. Normal perpendicular to both: n = (3, 4, 5). Check: 6 + 4 − 10 = 0 ✓, −3 + 8 − 5 = 0 ✓.
3. d = (1, 0, 2)·(3, 4, 5) = 13. Plane: 3x + 4y + 5z = 13.

Write r = (2, 1, 0) + λ(1, −1, 2) + μ(0, 3, 1) in Cartesian form.

1. Normal (a, b, c): a − b + 2c = 0 and 3b + c = 0. Take b = 1: c = −3, a = b − 2c = 7. n = (7, 1, −3).
2. Check: 7 − 1 − 6 = 0 ✓ and 0 + 3 − 3 = 0 ✓.
3. d = (2, 1, 0)·(7, 1, −3) = 15. Plane 7x + y − 3z = 15.

Find the distance from the origin to the plane 2x − y + 2z = 12.

1. |n| = 3. r·n̂ = 12/3 = 4. Distance 4.

### Common mistakes

- Using a direction in the plane as the normal.
- Writing d as the x, y, z of the point rather than a·n.

## Check questions

1. Find the vector equation and Cartesian equations of the line through P(4, 0, −2) and Q(1, 3, 1). [3 marks]
2. Write (x + 1)/3 = (4 − y)/2, z = 5 in vector form. [2 marks]
3. Find the acute angle between the lines r = (1, 1, 0) + λ(1, 2, 2) and r = (0, 3, 1) + μ(2, −2, 1). [3 marks]
4. Find the value of k for which the lines with directions (k, 1, 3) and (2, k, −4) are perpendicular. [2 marks]
5. Find the Cartesian equation of the plane through (2, −1, 1), (0, 1, 3) and (1, 0, 0). [4 marks]
6. Find the acute angle between the planes 2x − y + z = 4 and x + y + 2z = 1. [3 marks]
7. Find the angle between the line (x − 1)/1 = y/2 = (z + 1)/(−2) and the plane 4x + 4y − 2z = 3. [3 marks]
8. The plane Π has equation r·(2, −2, 1) = 9. Find its distance from the origin, and the Cartesian equation of the parallel plane through (1, 1, 1). [3 marks]

## Mark scheme

1. Direction (−3, 3, 3) or (−1, 1, 1) (1). r = (4, 0, −2) + λ(−1, 1, 1) (1). (x − 4)/(−1) = y = z + 2 (1).
2. (x + 1)/3 = (y − 4)/(−2), z = 5 (1). r = (−1, 4, 5) + λ(3, −2, 0) (1).
3. Scalar product 2 − 4 + 2 = 0 (1). cos θ = 0 (1). 90° (1).
4. 2k + k − 12 = 0 (1), k = 4 (1).
5. Two vectors in the plane, e.g. (−2, 2, 2) and (−1, 1, −1) (1). Normal (1, 1, 0) (2). x + y = 1 (1).
6. Normals (2, −1, 1), (1, 1, 2), scalar product 3 (1). cos θ = 3/6 = ½ (1). 60° (1).
7. d·n = 4 + 8 + 4 = 16 (1). sin θ = 16/(3 × 6) = 8/9 (1). θ = 62.7° (1).
8. |n| = 3, distance 3 (1). (2, −2, 1)·(1, 1, 1) = 1 (1). 2x − 2y + z = 1 (1).
