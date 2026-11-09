---
level: A-level
subject: Further Mathematics
topic: "Eigenvalues, eigenvectors and diagonalisation"
as_content: "All of this file is A-level only. It is AQA compulsory content (C10, C11) and option content on Edexcel (FP2) and MEI (Extra Pure)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["C10", "C11"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 3.1", "FP2 3.2", "FP2 3.3"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Xm1", "Xm2", "Xm3", "Xm4", "Xm5", "Xm6"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Eigenvalues, eigenvectors and diagonalisation

This file covers eigenvalues and eigenvectors of 2 × 2 and 3 × 3 matrices, the characteristic equation, their geometric meaning, diagonalisation and powers of matrices, and the Cayley-Hamilton theorem.

## Overview

All A-level only. You need determinants and inverses ([06-matrices-determinants-inverses-and-linear-systems.md](06-matrices-determinants-inverses-and-linear-systems.md)) and invariant lines ([05-matrices-operations-and-transformations.md](05-matrices-operations-and-transformations.md)).

### Board differences

- AQA C10, C11 (compulsory, real eigenvalues only for diagonalisation); Edexcel FP2 3.1 to 3.3; MEI Xm1 to Xm6 (Extra Pure). OCR H245 does not include eigenvalues.
- Edexcel FP2 3.2 includes symmetric matrices reduced with an orthogonal matrix P (PᵀAP = D). FP2 3.3 and MEI Xm5 include the Cayley-Hamilton theorem; AQA does not.
- MEI Xm6 asks for the geometric meaning of eigenvalues and eigenvectors.

## C10 Eigenvalues and eigenvectors

*Refs: AQA C10 · Edexcel FP2 3.1 · MEI Xm1, Xm2, Xm6. Level: A-level only.*

### What you need to know

- A non-zero vector v is an eigenvector of M with eigenvalue λ if Mv = λv.
- Eigenvalues solve the characteristic equation det(M − λI) = 0.
- For each λ, find v by solving (M − λI)v = 0.
- Geometrically, the line through the origin in the direction of an eigenvector is an invariant line; λ is the scale factor along it. λ = 1 gives a line of invariant points.

### Explained

(M − λI)v = 0 has a non-zero solution only if M − λI is singular, which is why det(M − λI) = 0. For a 2 × 2 matrix, the characteristic equation is λ² − (trace)λ + det = 0. Eigenvectors are only defined up to a scalar multiple; give a simple one.

For a 3 × 3 matrix, the characteristic equation is a cubic. Look for an integer root by the factor theorem. To find an eigenvector, solve two of the three equations (one is redundant), or take the vector product of two rows of M − λI.

### Worked example

Find the eigenvalues and eigenvectors of M = [[4, 1], [2, 3]].

1. λ² − 7λ + 10 = 0, λ = 2 or 5.
2. λ = 2: [[2, 1], [2, 1]]v = 0, so 2x + y = 0: v = (1, −2).
3. λ = 5: [[−1, 1], [2, −2]]v = 0, so y = x: v = (1, 1).
4. The lines y = −2x and y = x are invariant, stretched by factors 2 and 5.

Find the eigenvalues and eigenvectors of B = [[1, 1, 0], [1, 2, 1], [0, 1, 1]].

1. det(B − λI) = (1 − λ)[(2 − λ)(1 − λ) − 1] − 1(1 − λ) = (1 − λ)(λ² − 3λ) = −λ(λ − 1)(λ − 3).
2. λ = 0: rows (1, 1, 0) and (0, 1, 1); vector product (1, −1, 1).
3. λ = 1: rows (0, 1, 0) and (1, 1, 1); vector product (1, 0, −1).
4. λ = 3: rows (−2, 1, 0) and (0, 1, −2); vector product (−2, −4, −2), or (1, 2, 1).

### Common mistakes

- Giving the zero vector as an eigenvector.
- Sign errors in det(M − λI); check that the eigenvalues add to the trace and multiply to det M.

## C11 Diagonalisation and powers

*Refs: AQA C11 · Edexcel FP2 3.2 · MEI Xm3, Xm4. Level: A-level only.*

### What you need to know

- If M has n independent eigenvectors, put them as the columns of U and the eigenvalues (in the same order) on the diagonal of D. Then

```latex
\mathbf M = \mathbf U\mathbf D\mathbf U^{-1},\qquad \mathbf M^n = \mathbf U\mathbf D^n\mathbf U^{-1}
```

- (Edexcel) For a symmetric matrix, the eigenvectors are perpendicular; normalising them gives an orthogonal P with P⁻¹ = Pᵀ, so PᵀMP = D.

### Explained

Dⁿ is easy: raise each diagonal entry to the power n. So powers of M come from three matrix multiplications rather than n.

The order matters: the first column of U must be the eigenvector for the first diagonal entry of D.

### Worked example

Find Mⁿ for M = [[4, 1], [2, 3]].

1. U = [[1, 1], [−2, 1]], D = diag(2, 5). det U = 3, U⁻¹ = ⅓[[1, −1], [2, 1]].
2. Mⁿ = ⅓[[1, 1], [−2, 1]] diag(2ⁿ, 5ⁿ) [[1, −1], [2, 1]].
3. = ⅓[[2ⁿ + 2 × 5ⁿ, 5ⁿ − 2ⁿ], [2 × 5ⁿ − 2^{n+1}, 2^{n+1} + 5ⁿ]].
4. Check n = 1: ⅓[[12, 3], [6, 9]] = M ✓.

(Edexcel) Find an orthogonal P and diagonal D with PᵀBP = D for B = [[1, 1, 0], [1, 2, 1], [0, 1, 1]].

1. The eigenvectors (1, −1, 1), (1, 0, −1), (1, 2, 1) are perpendicular (check scalar products are 0).
2. Normalise: P has columns (1, −1, 1)/√3, (1, 0, −1)/√2, (1, 2, 1)/√6.
3. D = diag(0, 1, 3).

### Common mistakes

- Putting eigenvectors in U in a different order from D.
- Writing Mⁿ = UⁿDⁿU⁻ⁿ.

## Cayley-Hamilton theorem

*Refs: Edexcel FP2 3.3 · MEI Xm5. Level: A-level only (option content).*

### What you need to know

- Every square matrix satisfies its own characteristic equation: if det(M − λI) = 0 is λ² − pλ + q = 0, then M² − pM + qI = 0.
- Use it to find powers and the inverse.

### Worked example

C = [[3, 2], [1, 4]]. Use the Cayley-Hamilton theorem to find C⁻¹ and C³ in terms of C and I.

1. λ² − 7λ + 10 = 0, so C² − 7C + 10I = 0.
2. Multiply by C⁻¹: C − 7I + 10C⁻¹ = 0, so C⁻¹ = (7I − C)/10 = (1/10)[[4, −2], [−1, 3]].
3. C³ = C × C² = C(7C − 10I) = 7C² − 10C = 7(7C − 10I) − 10C = 39C − 70I.

### Common mistakes

- Replacing the constant term q by the number q rather than qI.

## Check questions

1. Find the eigenvalues and corresponding eigenvectors of [[5, 2], [2, 2]]. [5 marks]
2. Show that 2 is an eigenvalue of [[3, 1, 1], [1, 3, 1], [1, 1, 3]] and find the other eigenvalue(s). [5 marks]
3. A = [[1, 4], [1, 1]]. Find U and D such that A = UDU⁻¹, and hence find Aⁿ. [8 marks]
4. Describe the geometric meaning of an eigenvector with eigenvalue −1 for a 2D transformation. [2 marks]
5. (Edexcel FP2, MEI) M = [[2, 1], [3, 4]]. Use the Cayley-Hamilton theorem to express M⁴ in the form aM + bI. [5 marks]

## Mark scheme

1. λ² − 7λ + 6 = 0 (1), λ = 1, 6 (1). λ = 1: 4x + 2y = 0, (1, −2) (1). λ = 6: −x + 2y = 0, (2, 1) (2).
2. det(A − 2I) = det [[1, 1, 1], [1, 1, 1], [1, 1, 1]] = 0 (2), so 2 is an eigenvalue. Characteristic polynomial −(λ − 2)²(λ − 5), or use trace 9 and determinant 20 (2). Eigenvalues 2 (repeated) and 5 (1).
3. λ² − 2λ − 3 = 0, λ = 3, −1 (2). λ = 3: (2, 1); λ = −1: (2, −1) (2). U = [[2, 2], [1, −1]], D = diag(3, −1) (1). U⁻¹ = −¼[[−1, −2], [−1, 2]] = ¼[[1, 2], [1, −2]] (1). Aⁿ = ¼[[2 × 3ⁿ + 2(−1)ⁿ, 4 × 3ⁿ − 4(−1)ⁿ], [3ⁿ − (−1)ⁿ, 2 × 3ⁿ + 2(−1)ⁿ]] (2).
4. The line through O in the direction of the eigenvector is invariant (1), and each point on it maps to its reflection through O along the line (1).
5. λ² − 6λ + 5 = 0, so M² = 6M − 5I (2). M³ = 6M² − 5M = 31M − 30I (1). M⁴ = 31M² − 30M = 31(6M − 5I) − 30M (1) = 156M − 155I (1).
