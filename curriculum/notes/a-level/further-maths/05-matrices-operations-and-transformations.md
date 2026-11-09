---
level: A-level
subject: Further Mathematics
topic: "Matrices: operations, transformations and invariance"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["C1", "C2", "C3", "C4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP3.1", "CP3.2", "CP3.3", "CP3.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.03a", "4.03b", "4.03c", "4.03d", "4.03e", "4.03f", "4.03g"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pm1", "Pm2", "Pm3", "Pm4", "Pm5", "Pm6"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Matrices: operations, transformations and invariance

This file covers the language of matrices, adding and multiplying them, zero and identity matrices, matrices of linear transformations in two and three dimensions, successive transformations, and invariant points and lines.

## Overview

AS content on every board. Determinants and inverses are in [06-matrices-determinants-inverses-and-linear-systems.md](06-matrices-determinants-inverses-and-linear-systems.md); eigenvectors, which are the directions of invariant lines through the origin, are in [21-eigenvalues-eigenvectors-and-diagonalisation.md](21-eigenvalues-eigenvectors-and-diagonalisation.md).

### Board differences

- AQA C1 to C4; Edexcel CP3.1 to CP3.4; OCR 4.03a to 4.03g; MEI Pm1 to Pm6.
- In 3D, AQA C3 limits transformations to rotations about the coordinate axes, reflections in the planes x = 0, y = 0, z = 0, y = x, y = z and x = z, and enlargements and stretches. Edexcel and MEI use reflections in x = 0, y = 0, z = 0 and rotations about the axes. OCR 4.03e has the same scope.
- OCR 4.03c asks you to know that multiplication is associative but not commutative; MEI Pm3 the same.

## C1 Matrix arithmetic

*Refs: AQA C1 · Edexcel CP3.1 · OCR 4.03a, 4.03b, 4.03c · MEI Pm1, Pm2, Pm3. Level: AS & A.*

### What you need to know

- An m × n matrix has m rows and n columns. Entry a_{ij} is in row i, column j.
- Add or subtract matrices of the same order entry by entry. Multiply by a scalar by multiplying every entry.
- AB exists when the number of columns of A equals the number of rows of B (conformable). An m × n matrix times an n × p matrix is m × p.
- Entry (i, j) of AB is row i of A combined with column j of B (multiply in pairs and add).
- In general AB ≠ BA (not commutative), but (AB)C = A(BC) (associative). Equal matrices have the same order and the same entries.

### Explained

Multiply "row into column". For 2 × 2 matrices:

```latex
\begin{pmatrix}a&b\\c&d\end{pmatrix}\begin{pmatrix}e&f\\g&h\end{pmatrix} = \begin{pmatrix}ae+bg&af+bh\\ce+dg&cf+dh\end{pmatrix}
```

Because AB and BA usually differ, keep the order of factors fixed when you expand. For example (A + B)² = A² + AB + BA + B², not A² + 2AB + B².

### Worked example

A = [[2, −1], [3, 4]], B = [[1, 5], [0, −2]]. Find AB and BA.

1. AB = [[2·1 + (−1)·0, 2·5 + (−1)(−2)], [3·1 + 4·0, 3·5 + 4(−2)]] = [[2, 12], [3, 7]].
2. BA = [[1·2 + 5·3, 1·(−1) + 5·4], [0·2 + (−2)·3, 0·(−1) + (−2)·4]] = [[17, 19], [−6, −8]].
3. AB ≠ BA.

C is 2 × 3 and D is 3 × 1. Which of CD, DC exist?

1. CD: 2 × 3 times 3 × 1, exists, order 2 × 1.
2. DC: 3 × 1 times 2 × 3, inner numbers 1 and 2 differ, does not exist.

Find k such that [[k, 2], [1, 3]][[1], [k]] = [[6], [7]].

1. The product is [[k + 2k], [1 + 3k]] = [[3k], [1 + 3k]].
2. Top: 3k = 6, k = 2. Bottom: 1 + 6 = 7. ✓ Both equations must hold, so always check the second.

### Common mistakes

- Multiplying entry by entry.
- Writing the order of a product as columns × rows.

## C2 Zero and identity matrices

*Refs: AQA C2 · Edexcel CP3.2 · OCR 4.03a · MEI Pm2. Level: AS & A.*

### What you need to know

- The zero matrix 0 has every entry 0: A + 0 = A.
- The identity I has 1s on the leading diagonal and 0 elsewhere: AI = IA = A.
- A square matrix A satisfying A² = I is self-inverse.

### Explained

I is the matrix of the "do nothing" transformation. A product can be the zero matrix even when neither factor is zero, so you cannot cancel matrices.

### Worked example

Show that A = [[0, 1], [1, 0]] satisfies A² = I, and interpret.

1. A² = [[0·0 + 1·1, 0·1 + 1·0], [1·0 + 0·1, 1·1 + 0·0]] = I.
2. A is a reflection in y = x; reflecting twice returns every point.

Find a non-zero matrix N with N² = 0.

1. N = [[0, 1], [0, 0]]: N² = [[0, 0], [0, 0]].

### Common mistakes

- Concluding A = 0 or B = 0 from AB = 0.

## C3 Linear transformations

*Refs: AQA C3 · Edexcel CP3.3 · OCR 4.03d, 4.03e, 4.03f · MEI Pm4, Pm5. Level: AS & A.*

### What you need to know

- A linear transformation maps the origin to itself and straight lines to straight lines. It is represented by a matrix M: the image of position vector r is Mr.
- The columns of M are the images of the unit vectors i, j (and k).
- Standard 2D matrices:

| Transformation | Matrix |
| --- | --- |
| Rotation θ anticlockwise about O | [[cos θ, −sin θ], [sin θ, cos θ]] |
| Reflection in y = (tan θ)x | [[cos 2θ, sin 2θ], [sin 2θ, −cos 2θ]] |
| Enlargement scale factor k, centre O | [[k, 0], [0, k]] |
| Stretch parallel to x-axis, factor a | [[a, 0], [0, 1]] |
| Shear, x-axis fixed, (0, 1) → (k, 1) | [[1, k], [0, 1]] |

- 3D: rotation θ about the z-axis is [[cos θ, −sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]; similarly for the other axes (the fixed axis keeps its 1). Reflection in z = 0 is diag(1, 1, −1).
- Successive transformations: A then B is BA (the first transformation is on the right).

### Explained

To find the matrix of a transformation, ask where (1, 0) and (0, 1) go, and write the images as the columns. To identify a matrix, read the columns as the images of the unit vectors and sketch the unit square.

Anticlockwise rotation in 3D is judged looking from the positive end of the axis towards the origin.

Order matters: Mr applies M to r, so "A followed by B" is B(Ar) = (BA)r.

### Worked example

Find the matrix for a reflection in the line y = −x.

1. (1, 0) → (0, −1); (0, 1) → (−1, 0).
2. M = [[0, −1], [−1, 0]]. (Check with the formula: θ = −π/4 gives [[0, −1], [−1, 0]].)

Describe the transformation with matrix [[√3/2, −½], [½, √3/2]].

1. Matches the rotation matrix with cos θ = √3/2, sin θ = ½.
2. Rotation 30° (π/6) anticlockwise about the origin.

T is a rotation of 90° anticlockwise about O; U is a stretch parallel to the y-axis, factor 3. Find the single matrix for T followed by U.

1. T = [[0, −1], [1, 0]], U = [[1, 0], [0, 3]].
2. UT = [[0, −1], [3, 0]].

Find the image of (2, 1, −1) under a rotation of 90° about the x-axis.

1. Matrix [[1, 0, 0], [0, 0, −1], [0, 1, 0]].
2. Image: (2, 0·1 + (−1)(−1), 1·1 + 0) = (2, 1, 1).

### Common mistakes

- Writing the images as rows instead of columns.
- Multiplying in the wrong order for combined transformations.
- Using clockwise for positive angles.

## C4 Invariant points and invariant lines

*Refs: AQA C4 · Edexcel CP3.4 · OCR 4.03g · MEI Pm6. Level: AS & A.*

### What you need to know

- An invariant point satisfies Mr = r.
- A line of invariant points: every point on it maps to itself.
- An invariant line: every point on it maps to a point on the same line (not necessarily itself).

### Explained

**Invariant points.** Solve M(x, y)ᵀ = (x, y)ᵀ. The origin is always invariant. If the equations reduce to one line, that is a line of invariant points.

**Invariant lines y = mx + c.** Take a general point (x, mx + c), find its image (x′, y′), and require y′ = mx′ + c for all x. Equate coefficients of x and the constant terms. Lines through the origin (c = 0) are often all you need; then the condition gives a quadratic in m.

### Worked example

Find the invariant points of M = [[3, 2], [1, 4]].

1. 3x + 2y = x and x + 4y = y, so 2x + 2y = 0 and x + 3y = 0.
2. Only x = y = 0: the origin is the only invariant point.

Find the invariant lines of M = [[3, 2], [1, 4]].

1. Point (x, mx + c) maps to x′ = 3x + 2mx + 2c, y′ = x + 4mx + 4c.
2. Need y′ = mx′ + c: x(1 + 4m) + 4c = m(3 + 2m)x + 2mc + c.
3. x terms: 1 + 4m = 3m + 2m², so 2m² − m − 1 = 0, m = 1 or −½.
4. Constants: 4c = 2mc + c, c(3 − 2m) = 0. For m = 1: c = 0. For m = −½: 4c = 0, c = 0.
5. Invariant lines: y = x and y = −½x.

Find the line of invariant points of the reflection [[0.6, 0.8], [0.8, −0.6]].

1. 0.6x + 0.8y = x gives 0.8y = 0.4x, so y = ½x.
2. The second equation 0.8x − 0.6y = y gives the same line.
3. Line of invariant points y = ½x (the mirror line).

Show that every line y = c is invariant under the shear [[1, 3], [0, 1]].

1. (x, c) → (x + 3c, c), which is on y = c.
2. Each line y = c is invariant; y = 0 is a line of invariant points.

### Common mistakes

- Confusing "invariant line" (points stay on the line) with "line of invariant points" (points stay put).
- Forgetting to check the constant terms, which can rule out c ≠ 0.

## Check questions

1. A = [[1, 3], [−2, 0]], B = [[4, −1], [2, 5]]. Find 2A − B, AB and BA. [5 marks]
2. A is 3 × 2 and B is 2 × 4. State which of AB, BA and A² exist, with orders. [3 marks]
3. Write down the matrix for a rotation of 135° anticlockwise about the origin, in exact form. [2 marks]
4. Describe fully the transformation represented by [[0.28, 0.96], [0.96, −0.28]]. [3 marks]
5. P is a reflection in the x-axis and Q is an enlargement scale factor 2, centre O, followed by a rotation of 90° clockwise about O. Find the single matrix for P followed by Q, and describe it. [5 marks]
6. Find the matrix of the 3D transformation that rotates by 180° about the y-axis, and the image of (1, 2, 3). [3 marks]
7. M = [[2, 1], [2, 3]]. Find the invariant lines through the origin. [5 marks]
8. Find the line of invariant points of [[−1, 2], [0, 1]], and show that y = 3 is invariant but not a line of invariant points. [5 marks]

## Mark scheme

1. 2A − B = [[−2, 7], [−6, −5]] (1). AB = [[10, 14], [−8, 2]] (2). BA = [[6, 12], [−8, 6]] (2).
2. AB exists, 3 × 4 (1). BA: 2 × 4 times 3 × 2, does not exist (1). A²: 3 × 2 times 3 × 2, does not exist (1).
3. [[−√2/2, −√2/2], [√2/2, −√2/2]] (2).
4. Reflection (1) in y = (tan θ)x with cos 2θ = 0.28, sin 2θ = 0.96 (1): tan θ = 0.96/(1 + 0.28) = 0.75, line y = ¾x (1).
5. P = [[1, 0], [0, −1]] (1). Q = [[0, 1], [−1, 0]][[2, 0], [0, 2]] = [[0, 2], [−2, 0]] (1). QP = [[0, −2], [−2, 0]] (2). Reflection in y = −x with enlargement scale factor 2 (1).
6. [[−1, 0, 0], [0, 1, 0], [0, 0, −1]] (2). Image (−1, 2, −3) (1).
7. (x, mx) → (2x + mx, 2x + 3mx) (1). 2 + 3m = m(2 + m) (1). m² − m − 2 = 0 (1). m = 2 or −1 (1). y = 2x, y = −x (1).
8. −x + 2y = x gives y = x (1); second equation y = y (1). Line of invariant points y = x. (x, 3) → (−x + 6, 3), on y = 3 (1). Not fixed unless x = 3 (1), so it is invariant but not made of invariant points (1).
