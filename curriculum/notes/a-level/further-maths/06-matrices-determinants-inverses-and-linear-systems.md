---
level: A-level
subject: Further Mathematics
topic: "Matrices: determinants, inverses and systems of equations"
as_content: "Determinants, inverses and solving three equations are AS. Interpreting failure of solution, consistency (OCR), 3 × 3 inverses by hand (MEI Pm15) and factorising determinants (AQA C9) are A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["C5", "C6", "C7", "C8", "C9"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP3.5", "CP3.6", "CP3.7", "CP3.8"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.03h", "4.03i", "4.03j", "4.03k", "4.03l", "4.03m", "4.03n", "4.03o", "4.03p", "4.03q", "4.03r", "4.03s", "4.03t"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pm7", "Pm8", "Pm9", "Pm10", "Pm11", "Pm12", "Pm13", "Pm14", "Pm15", "Pv4", "Pv5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Matrices: determinants, inverses and systems of equations

This file covers determinants of 2 × 2 and 3 × 3 matrices and their meaning as scale factors, singular matrices, inverse matrices, solving systems of linear equations, the geometry of three planes, and factorising determinants.

## Overview

Mostly AS. Matrix arithmetic and transformations are in [05-matrices-operations-and-transformations.md](05-matrices-operations-and-transformations.md). Equations of planes are in [10-vectors-lines-planes-and-scalar-product.md](10-vectors-lines-planes-and-scalar-product.md).

### Board differences

- AQA C5 to C9; Edexcel CP3.5 to CP3.8; OCR 4.03h to 4.03t; MEI Pm7 to Pm15, Pv4, Pv5.
- At AS, 3 × 3 determinants and inverses may be found on a calculator (MEI says so explicitly). MEI Pm15 (A-level) requires them by hand, including with algebraic entries.
- AQA C9 (factorising determinants by row and column operations) is AQA only.
- OCR 4.03s (Stage 2) asks you to decide whether a system is consistent; OCR 4.03t and the other boards ask for the geometric meaning.

## C5 Determinants and scale factors

*Refs: AQA C5 · Edexcel CP3.5 · OCR 4.03h, 4.03i, 4.03j, 4.03k, 4.03m · MEI Pm7, Pm8, Pm9, Pm10. Level: AS & A.*

### What you need to know

```latex
\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc
```

```latex
\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)
```

- |det M| is the area scale factor (2D) or volume scale factor (3D) of the transformation.
- A negative determinant means the orientation is reversed (a reflection is involved).
- det(MN) = det M × det N.

### Explained

The 3 × 3 determinant expands along the top row: each entry times the 2 × 2 determinant left when you cover its row and column (its minor), with signs + − +. You can expand along any row or column using the sign pattern

```
+ − +
− + −
+ − +
```

Choose a row or column with zeros to save work.

Orientation: if the vertices A, B, C of a shape go anticlockwise, their images go clockwise when det < 0.

### Worked example

Find the area of the image of a triangle of area 6 under M = [[3, −1], [2, 4]].

1. det M = 12 + 2 = 14.
2. Image area = 6 × 14 = 84.

Find det [[2, 0, 1], [3, −1, 4], [1, 2, 0]].

1. 2(−1·0 − 4·2) − 0(...) + 1(3·2 − (−1)·1) = 2(−8) + 7 = −9.
2. A unit cube maps to a solid of volume 9, with orientation reversed.

Find the values of k for which [[k, 2, 1], [0, k, 3], [1, 1, 1]] is singular.

1. det = k(k − 3) − 2(0 − 3) + 1(0 − k) = k² − 3k + 6 − k = k² − 4k + 6.
2. Discriminant 16 − 24 < 0, so det is never 0: the matrix is non-singular for all real k.

### Common mistakes

- Forgetting the minus sign on the middle term of a 3 × 3 expansion.
- Giving a negative area. Use |det M|.

## C6 Singular matrices and inverses

*Refs: AQA C6 · Edexcel CP3.6 · OCR 4.03l, 4.03n, 4.03o, 4.03p, 4.03q · MEI Pm11, Pm12, Pm13, Pm14, Pm15. Level: AS & A (MEI Pm15 A-level only).*

### What you need to know

- A square matrix is singular if det M = 0 (no inverse) and non-singular otherwise.
- M⁻¹ satisfies MM⁻¹ = M⁻¹M = I.

```latex
\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
```

- For 3 × 3: M⁻¹ = (1/det M) × adj M, where adj M is the transpose of the matrix of cofactors.
- (AB)⁻¹ = B⁻¹A⁻¹. M⁻¹ represents the inverse transformation.

### Explained

**3 × 3 inverse by hand.**

1. Find the matrix of minors (each entry's 2 × 2 determinant).
2. Apply the sign pattern to get cofactors.
3. Transpose (swap rows and columns) to get the adjugate.
4. Divide by det M.

Check by multiplying one row of M by one column of your answer.

**Why (AB)⁻¹ = B⁻¹A⁻¹.** (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I. Think of putting on socks then shoes: to undo, take off shoes first.

A singular transformation squashes the plane onto a line (or a point), so information is lost and it cannot be undone.

### Worked example

Find the inverse of [[4, 3], [2, 2]].

1. det = 8 − 6 = 2.
2. Inverse = ½[[2, −3], [−2, 4]] = [[1, −1.5], [−1, 2]].

Find the inverse of M = [[1, 2, 0], [0, 1, 3], [2, 0, 1]].

1. det M = 1(1 − 0) − 2(0 − 6) + 0 = 13.
2. Minors: row 1: (1·1 − 3·0, 0·1 − 3·2, 0·0 − 1·2) = (1, −6, −2). Row 2: (2·1 − 0·0, 1·1 − 0·2, 1·0 − 2·2) = (2, 1, −4). Row 3: (2·3 − 0·1, 1·3 − 0·0, 1·1 − 2·0) = (6, 3, 1).
3. Cofactors (signs + − + / − + − / + − +): [[1, 6, −2], [−2, 1, 4], [6, −3, 1]].
4. Transpose: [[1, −2, 6], [6, 1, −3], [−2, 4, 1]].
5. M⁻¹ = (1/13)[[1, −2, 6], [6, 1, −3], [−2, 4, 1]].
6. Check: row 1 of M times column 1: 1·1 + 2·6 + 0 = 13. ✓

A and B are non-singular with A⁻¹ = [[1, 2], [0, 1]] and B⁻¹ = [[3, 0], [1, 1]]. Find (BA)⁻¹.

1. (BA)⁻¹ = A⁻¹B⁻¹ = [[1·3 + 2·1, 0 + 2], [1, 1]] = [[5, 2], [1, 1]].

The transformation T maps P′ = (7, 4) from P using [[3, 1], [1, 1]]. Find P.

1. Inverse = ½[[1, −1], [−1, 3]].
2. P = ½(7 − 4, −7 + 12) = (1.5, 2.5).

### Common mistakes

- Forgetting to transpose the cofactor matrix.
- Writing (AB)⁻¹ = A⁻¹B⁻¹.

## C7 Solving systems of linear equations

*Refs: AQA C7 · Edexcel CP3.7 · OCR 4.03r · MEI Pv5. Level: AS & A.*

### What you need to know

- Write the system as Mx = b. If M is non-singular, x = M⁻¹b is the unique solution.

### Explained

Each equation ax + by + cz = d is a plane, so a unique solution is the single point where three planes meet. Multiply M⁻¹ on the left: M⁻¹Mx = x.

### Worked example

Solve x + 2y = 5, y + 3z = 7, 2x + z = 4, using M⁻¹ from the example above.

1. x = (1/13)[[1, −2, 6], [6, 1, −3], [−2, 4, 1]](5, 7, 4)ᵀ.
2. = (1/13)(5 − 14 + 24, 30 + 7 − 12, −10 + 28 + 4) = (1/13)(15, 25, 22).
3. x = 15/13, y = 25/13, z = 22/13. Check: 15/13 + 50/13 = 65/13 = 5 ✓.

Solve 3x − y = 11, 2x + 5y = 13.

1. M = [[3, −1], [2, 5]], det = 17, M⁻¹ = (1/17)[[5, 1], [−2, 3]].
2. (x, y) = (1/17)(55 + 13, −22 + 39) = (4, 1).

### Common mistakes

- Multiplying b on the left: x = bM⁻¹ is not defined.

## C8 Geometry of three planes; consistency

*Refs: AQA C8 · Edexcel CP3.8 · OCR 4.03s, 4.03t · MEI Pv4, Pv5. Level: A-level only (MEI Pv4 and Pv5 AS).*

### What you need to know

- If det M ≠ 0: the three planes meet at a single point.
- If det M = 0, either the equations are inconsistent (no solution) or consistent with infinitely many solutions.
- No solution: two or three planes parallel (and distinct), or the three planes form a triangular prism.
- Infinitely many solutions: the planes meet in a common line (a sheaf), or all three are the same plane.

### Explained

To tell the cases apart when det M = 0:

1. Look at the normals (the coefficient rows). If two are parallel, those planes are parallel or identical.
2. Otherwise eliminate a variable between pairs of equations. If you get two identical equations, the system is consistent and the planes form a sheaf. If you get a contradiction (like 0 = 5), it is inconsistent: a prism.

For a sheaf, express the solution in terms of a parameter, which is the vector equation of the common line.

### Worked example

Find k such that x + y + z = 2, 2x − y + 3z = 1, x − 2y + kz = 5 has no unique solution, and decide what happens for this k.

1. det = 1(−k + 6) − 1(2k − 3) + 1(−4 + 1) = −3k + 6. det = 0 when k = 2.
2. Eliminate x: (2) − 2(1): −3y + z = −3. (3) − (1): −3y + z = 3 (with k = 2).
3. −3y + z = −3 and −3y + z = 3 contradict. Inconsistent.
4. No two normals are parallel, so the planes form a triangular prism.

Show that x + 2y − z = 1, 2x + y + z = 5, 4x + 5y − z = 7 is consistent and find the solution set.

1. det = 1(−1 − 5) − 2(−2 − 4) − 1(10 − 4) = −6 + 12 − 6 = 0.
2. (2) − 2(1): −3y + 3z = 3, so z = y + 1. (3) − 4(1): −3y + 3z = 3, the same. Consistent.
3. Let y = λ: z = λ + 1, x = 1 − 2λ + λ + 1 = 2 − λ.
4. Solutions (2 − λ, λ, λ + 1): a sheaf of planes meeting in a line.

### Common mistakes

- Saying "no solution" as soon as det = 0.
- Describing a prism when two planes are actually parallel (check the normals first).

## C9 Factorising determinants

*Refs: AQA C9. Level: A-level only.*

### What you need to know

- Row and column operations: adding a multiple of one row (or column) to another leaves the determinant unchanged; swapping two rows changes its sign; multiplying a row by k multiplies the determinant by k.
- det Mᵀ = det M. A determinant with two equal rows is 0.

### Explained

To factorise a determinant whose entries are algebraic, subtract rows (or columns) to create factors like (a − b), take them out, and then expand what is left. If setting a = b would make two rows equal, then (a − b) is a factor.

### Worked example

Factorise Δ = det [[1, 1, 1], [a, b, c], [a², b², c²]].

1. Column 2 − column 1, column 3 − column 1: [[1, 0, 0], [a, b − a, c − a], [a², b² − a², c² − a²]].
2. Take (b − a) from column 2 and (c − a) from column 3: (b − a)(c − a) det [[1, 0, 0], [a, 1, 1], [a², b + a, c + a]].
3. Expand along row 1: (b − a)(c − a)[(c + a) − (b + a)] = (b − a)(c − a)(c − b).
4. Δ = (a − b)(b − c)(c − a).

Factorise det [[x, 1, 1], [1, x, 1], [1, 1, x]].

1. Add columns 2 and 3 to column 1: every row of column 1 becomes x + 2. Take out (x + 2).
2. (x + 2) det [[1, 1, 1], [1, x, 1], [1, 1, x]]. Subtract row 1 from rows 2 and 3: [[1, 1, 1], [0, x − 1, 0], [0, 0, x − 1]].
3. Δ = (x + 2)(x − 1)².

### Common mistakes

- Multiplying a row by k and forgetting that it multiplies the determinant by k.
- Losing a sign when rearranging factors such as (b − a) = −(a − b).

## Check questions

1. M = [[2, k], [3, 6]]. Find the value of k for which M is singular, and the area scale factor when k = 1. [3 marks]
2. Find the determinant of [[3, 1, −2], [0, 4, 1], [5, −1, 2]]. [3 marks]
3. Find, by hand, the inverse of [[2, 1, 0], [0, 1, 1], [1, 0, 3]]. [6 marks]
4. Hence solve 2x + y = 4, y + z = 5, x + 3z = 10. [3 marks]
5. Prove that (AB)⁻¹ = B⁻¹A⁻¹ for non-singular square matrices A and B of the same order. [3 marks]
6. The equations x + y + 2z = 3, 2x + 3y + z = 5, x + 2y + az = b. (a) Find a for which there is no unique solution. (b) For this a, find b for which the equations are consistent, and give the general solution. (c) Describe the planes when b takes any other value. [9 marks]
7. (AQA C9) Factorise det [[1, 1, 1], [x, y, z], [x³, y³, z³]] fully. [6 marks]
8. A triangle with anticlockwise vertices maps under [[1, 4], [2, 3]] to a triangle of area 30. Find the original area, and state the order of the image vertices. [3 marks]

## Mark scheme

1. 12 − 3k = 0, k = 4 (1). k = 1: det = 9 (1), area scale factor 9 (1).
2. 3(8 + 1) − 1(0 − 5) − 2(0 − 20) (2) = 27 + 5 + 40 = 72 (1).
3. det = 2(3) − 1(0 − 1) + 0 = 7 (1). Cofactors [[3, 1, −1], [−3, 6, 1], [1, −2, 2]] (2). Adjugate [[3, −3, 1], [1, 6, −2], [−1, 1, 2]] (2). Inverse (1/7) × adjugate (1).
4. (1/7)(12 − 15 + 10, 4 + 30 − 20, −4 + 5 + 20) (1) = (1, 2, 3) (2).
5. (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ (1) = AIA⁻¹ = I (1); so B⁻¹A⁻¹ is the inverse of AB by uniqueness of inverses (1).
6. (a) det = 1(3a − 2) − 1(2a − 1) + 2(4 − 3) = a + 1 (1); a = −1 (1). (b) (2) − 2(1): y − 3z = −1; (3) − (1): y − 3z = b − 3 (1). Consistent when b = 2 (1). z = λ (1), y = 3λ − 1 (1), x = 4 − 5λ (1). (c) Triangular prism (1), since no two normals are parallel (1).
7. Column operations c2 − c1, c3 − c1 (1). Take out (y − x)(z − x) (1), using y³ − x³ = (y − x)(y² + xy + x²) (1). Remaining 2 × 2: (z² + zx + x²) − (y² + xy + x²) = (z − y)(x + y + z) (2). Answer (x − y)(y − z)(z − x)(x + y + z) (1).
8. det = 3 − 8 = −5 (1). Original area 30/5 = 6 (1). Image vertices clockwise (1).
