---
level: A-level
subject: Further Mathematics
topic: "Vectors: the vector product, intersections and distances"
as_content: "Intersections of two lines are AS (AQA F6 part, Edexcel CP6.5 part, OCR 4.04e). The vector product, line-plane intersections and all distances are A-level only. Edexcel FP1 5 and OCR 8.04 are option content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["F5", "F6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP6.5", "FP1 5.1", "FP1 5.2", "FP1 5.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.04e", "4.04f", "4.04g", "4.04h", "4.04i", "4.04j", "8.04a", "8.04b", "8.04c", "8.04d", "8.04e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pv7", "Pv8", "Pv9", "Pv11", "Pv12", "Pv13", "Pv14", "Pv15", "Pv16", "Pv17"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Vectors: the vector product, intersections and distances

This file covers the vector product and its properties, the line equation (r − a) × b = 0, the scalar triple product and volumes, intersections of lines and planes, skew lines, and shortest distances between points, lines and planes.

## Overview

Lines, planes and the scalar product are in [10-vectors-lines-planes-and-scalar-product.md](10-vectors-lines-planes-and-scalar-product.md). Three planes meeting is in [06-matrices-determinants-inverses-and-linear-systems.md](06-matrices-determinants-inverses-and-linear-systems.md).

### Board differences

- AQA F5, F6; Edexcel CP6.5, FP1 5.1 to 5.3; OCR 4.04e to 4.04j, 8.04a to 8.04e; MEI Pv7, Pv8, Pv11 to Pv14, Pv16, Pv17.
- The vector product is compulsory on AQA (F5) and MEI (Pv7). On Edexcel it is in FP1 (5.1); on OCR it appears in Pure Core only as a tool for normals (4.04g) and fully in Additional Pure (8.04).
- The scalar triple product and volumes of tetrahedra and parallelepipeds are Edexcel FP1 5.2 and OCR 8.04e only.
- Edexcel FP1 5.3 includes the line equation (r − a) × b = 0 and the plane in the form r·n = p; AQA F5 also lists (r − a) × b = 0.

## F5 The vector product

*Refs: AQA F5 · Edexcel FP1 5.1 · OCR 4.04g, 8.04a, 8.04b, 8.04c, 8.04d · MEI Pv7, Pv8. Level: A-level only.*

### What you need to know

```latex
\mathbf a\times\mathbf b = \begin{pmatrix}a_2b_3-a_3b_2\\ a_3b_1-a_1b_3\\ a_1b_2-a_2b_1\end{pmatrix} = |\mathbf a||\mathbf b|\sin\theta\,\hat{\mathbf n}
```

- a × b is perpendicular to both a and b; n̂ follows the right-hand rule.
- b × a = −(a × b) (anti-commutative); a × (b + c) = a × b + a × c (distributive).
- a × b = 0 if and only if a and b are parallel (or one is zero).
- |a × b| is the area of the parallelogram with sides a and b; half of it is the area of the triangle.
- The line through a with direction b: (r − a) × b = 0.

### Explained

The determinant layout helps you remember it:

```latex
\mathbf a\times\mathbf b = \begin{vmatrix}\mathbf i&\mathbf j&\mathbf k\\ a_1&a_2&a_3\\ b_1&b_2&b_3\end{vmatrix}
```

The equation (r − a) × b = 0 says that r − a is parallel to b, which is exactly the condition for r to be on the line.

### Worked example

Find (1, 2, 3) × (2, −1, 1).

1. i: 2(1) − 3(−1) = 5. j: 3(2) − 1(1) = 5. k: 1(−1) − 2(2) = −5.
2. (5, 5, −5). Check: (1, 2, 3)·(5, 5, −5) = 5 + 10 − 15 = 0 ✓.

Find the area of the triangle with vertices A(1, 0, 2), B(3, 1, 1), C(2, 3, 4).

1. AB = (2, 1, −1), AC = (1, 3, 2).
2. AB × AC = (1·2 − (−1)·3, (−1)·1 − 2·2, 2·3 − 1·1) = (5, −5, 5).
3. Area = ½ × 5√3 = 5√3/2.

Find the Cartesian equation of the plane through (1, 0, 2) containing directions (1, 1, −1) and (1, −2, 3).

1. n = (1, 1, −1) × (1, −2, 3) = (3 − 2, −1 − 3, −2 − 1) = (1, −4, −3).
2. d = 1 + 0 − 6 = −5. Plane x − 4y − 3z = −5.

### Common mistakes

- Getting the middle component's sign wrong. Check your answer is perpendicular to both vectors.
- Writing a × b = b × a.

## Scalar triple product and volumes

*Refs: Edexcel FP1 5.2 · OCR 8.04e. Level: A-level only (option content).*

### What you need to know

```latex
\mathbf a\cdot(\mathbf b\times\mathbf c) = \det\begin{pmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{pmatrix}
```

- Volume of the parallelepiped with edges a, b, c is |a·(b × c)|.
- Volume of the tetrahedron with those edges from one vertex is ⅙|a·(b × c)|.
- If a·(b × c) = 0 the three vectors are coplanar.

### Worked example

Find the volume of the tetrahedron OABC with A(1, 2, 0), B(0, 1, 3), C(2, 0, 1).

1. a·(b × c) = det [[1, 2, 0], [0, 1, 3], [2, 0, 1]] = 1(1) − 2(0 − 6) + 0 = 13.
2. Volume = 13/6.

Show that (1, 2, 3), (2, 1, 0) and (0, 3, 6) are coplanar.

1. det [[1, 2, 3], [2, 1, 0], [0, 3, 6]] = 1(6) − 2(12) + 3(6) = 0. Coplanar.

### Common mistakes

- Forgetting the ⅙ for a tetrahedron.

## F6 Intersections of lines and planes

*Refs: AQA F6 · Edexcel CP6.5, FP1 5.3 · OCR 4.04e, 4.04f · MEI Pv11, Pv12, Pv14. Level: two lines AS & A; a line and a plane A-level only.*

### What you need to know

- Two lines in 3D are parallel, intersecting, or skew (not parallel and do not meet).
- To test, set the two vector equations equal, solve two of the three component equations for λ and μ, and check the third.
- A line meets a plane where the general point of the line satisfies the plane's equation. If d·n = 0, the line is parallel to the plane (and either lies in it or never meets it).
- Two non-parallel planes meet in a line with direction n₁ × n₂.

### Worked example

Show that r = (1, 0, 2) + λ(1, 1, −1) and r = (2, 4, −3) + μ(1, −2, 3) intersect, and find the point.

1. x: 1 + λ = 2 + μ. y: λ = 4 − 2μ.
2. Subtract: 1 = −2 + 3μ, so μ = 1, λ = 2.
3. z: 2 − 2 = 0 and −3 + 3 = 0 ✓.
4. Point (3, 2, 0).

Show that r = (1, 1, 0) + λ(2, 1, 1) and r = (0, 3, 2) + μ(1, −1, 1) are skew.

1. Directions are not parallel.
2. x: 1 + 2λ = μ. y: 1 + λ = 3 − μ. Adding: 2 + 3λ = 3, λ = ⅓, μ = 5/3.
3. z: λ = ⅓ but 2 + μ = 11/3. Not equal, so the lines do not meet. Skew.

Find where r = (1, 2, 0) + λ(1, −1, 2) meets 2x + y + z = 9.

1. 2(1 + λ) + (2 − λ) + 2λ = 9, so 4 + 3λ = 9, λ = 5/3.
2. Point (8/3, 1/3, 10/3).

Find the line of intersection of x + y + z = 6 and 2x − y + z = 3.

1. Direction (1, 1, 1) × (2, −1, 1) = (2, 1, −3).
2. A point: put z = 0: x + y = 6, 2x − y = 3, x = 3, y = 3.
3. r = (3, 3, 0) + t(2, 1, −3).

### Common mistakes

- Using the same parameter for both lines.
- Declaring lines skew without checking they are not parallel.

## F6 Shortest distances

*Refs: AQA F6 · Edexcel CP6.5 · OCR 4.04h, 4.04i, 4.04j · MEI Pv13, Pv16, Pv17. Level: A-level only.*

### What you need to know

- Point (x₁, y₁, z₁) to plane ax + by + cz = d:

```latex
\frac{|ax_1+by_1+cz_1-d|}{\sqrt{a^2+b^2+c^2}}
```

- Point P to the line r = a + λb: find the foot F where PF·b = 0, then |PF|. Or use |(p − a) × b|/|b|.
- Between skew lines through A and B with directions d₁, d₂: with n = d₁ × d₂,

```latex
\frac{|(\mathbf b-\mathbf a)\cdot\mathbf n|}{|\mathbf n|}
```

- Between parallel lines: the distance from a point on one to the other line.
- Reflection of a point in a plane: go to the foot of the perpendicular, then the same distance again.

### Explained

The shortest distance is always along a common perpendicular. For skew lines, n = d₁ × d₂ is perpendicular to both, and projecting any connecting vector onto n gives the gap.

### Worked example

Find the distance from (3, 1, −2) to the plane 2x − y + 2z = 7.

1. |6 − 1 − 4 − 7|/3 = 6/3 = 2.

Find the shortest distance from P(3, 1, 4) to the line r = (1, 0, 1) + λ(1, 2, 2).

1. General point F = (1 + λ, 2λ, 1 + 2λ). PF = (λ − 2, 2λ − 1, 2λ − 3).
2. PF·(1, 2, 2) = λ − 2 + 4λ − 2 + 4λ − 6 = 9λ − 10 = 0, λ = 10/9.
3. PF = (−8/9, 11/9, −7/9), |PF| = √(64 + 121 + 49)/9 = √234/9 = √26/3.

Find the shortest distance between the skew lines in the earlier example.

1. n = (2, 1, 1) × (1, −1, 1) = (2, −1, −3).
2. b − a = (0, 3, 2) − (1, 1, 0) = (−1, 2, 2). (b − a)·n = −2 − 2 − 6 = −10.
3. Distance = 10/√14 = 5√14/7 ≈ 2.67.

Find the reflection of (3, 4, −1) in the plane x + 2y − 2z = 4.

1. Line through the point along the normal: (3 + t, 4 + 2t, −1 − 2t).
2. Meets the plane when 3 + t + 8 + 4t + 2 + 4t = 4, so 9t = −9, t = −1. Foot (2, 2, 1).
3. Image: t = −2, giving (1, 0, 3).

### Common mistakes

- Forgetting the modulus, giving a negative distance.
- Using a point-to-plane formula with the plane not in the form ax + by + cz = d (move the constant first).

## Check questions

1. Find (2, −1, 4) × (1, 3, −2) and verify it is perpendicular to both vectors. [3 marks]
2. Find the area of the triangle with vertices (0, 1, 2), (2, 2, 0), (1, −1, 3). [3 marks]
3. (Edexcel FP1, OCR 8.04) Find the volume of the tetrahedron with vertices (0, 0, 0), (2, 1, 0), (1, 3, 1), (0, 1, 4). [3 marks]
4. Determine whether r = (2, 1, 0) + λ(1, 2, −1) and r = (0, −1, 4) + μ(2, 1, −3) intersect, are parallel or are skew. If they meet, find the point. [5 marks]
5. Find the point where the line (x − 2)/3 = (y + 1)/1 = (z − 1)/(−2) meets the plane x + 2y + z = 9. [3 marks]
6. Find the shortest distance between the lines r = (1, 0, 0) + λ(1, 1, 0) and r = (0, 0, 2) + μ(0, 1, 1). [4 marks]
7. Find the perpendicular distance from (1, 2, 3) to the plane 2x + 3y − 6z = 5, and the coordinates of the foot of the perpendicular. [5 marks]
8. Find a vector equation of the line of intersection of the planes x − y + 2z = 3 and 2x + y − z = 0. [4 marks]

## Mark scheme

1. (−1·(−2) − 4·3, 4·1 − 2·(−2), 2·3 − (−1)·1) = (−10, 8, 7) (2). Scalar products −20 − 8 + 28 = 0 and −10 + 24 − 14 = 0 (1).
2. Sides (2, 1, −2), (1, −2, 1) (1). Cross product (−3, −4, −5), magnitude 5√2 (1). Area 5√2/2 (1).
3. det [[2, 1, 0], [1, 3, 1], [0, 1, 4]] = 2(11) − 1(4) = 18 (2). Volume 18/6 = 3 (1).
4. x: 2 + λ = 2μ; y: 1 + 2λ = −1 + μ (1). Solve: λ = −2/3, μ = 2/3 (2). z: the first line gives 2/3, the second gives 4 − 2 = 2 (1). Not equal, directions not parallel: skew (1).
5. (2 + 3t) + 2(−1 + t) + (1 − 2t) = 9 (1), 3t = 8, t = 8/3 (1). Point (10, 5/3, −13/3) (1).
6. n = (1, 1, 0) × (0, 1, 1) = (1, −1, 1) (1). b − a = (−1, 0, 2), dot n = 1 (1). Distance 1/√3 (2).
7. |2 + 6 − 18 − 5|/7 = 15/7 (2). Foot: (1 + 2t, 2 + 3t, 3 − 6t) with 49t − 10 = 5, t = 15/49 (2). Foot (79/49, 143/49, 57/49) (1).
8. Direction (1, −1, 2) × (2, 1, −1) = (−1, 5, 3) (2). Point with z = 0: x − y = 3, 2x + y = 0, x = 1, y = −2 (1). r = (1, −2, 0) + t(−1, 5, 3) (1).
