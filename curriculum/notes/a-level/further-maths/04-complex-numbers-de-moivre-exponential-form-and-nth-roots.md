---
level: A-level
subject: Further Mathematics
topic: "Complex numbers: de Moivre's theorem, exponential form and nth roots"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["B8", "B9", "B10", "B11"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP2.8", "CP2.9", "CP2.10", "CP2.11"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.02d", "4.02n", "4.02q", "4.02r", "4.02s"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pj12", "Pj13", "Pj14", "Pj15", "Pj16", "Pj17", "Pj19", "Pj20", "Pj18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Complex numbers: de Moivre's theorem, exponential form and nth roots

This file covers the exponential form re^{iθ}, de Moivre's theorem and its proof, multiple angle formulae, powers of sines and cosines, sums of series, nth roots of complex numbers, and roots of unity in geometry.

## Overview

All A-level only. It builds on modulus-argument form in [03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md](03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md), the binomial expansion ([../maths/07-binomial-expansion.md](../maths/07-binomial-expansion.md)) and geometric series ([../maths/08-sequences-and-series.md](../maths/08-sequences-and-series.md)). Proof by induction is in [01-proof-by-induction.md](01-proof-by-induction.md).

### Board differences

- AQA B8 to B11; Edexcel CP2.8 to CP2.11; OCR 4.02d, 4.02n, 4.02q to 4.02s; MEI Pj12 to Pj20.
- OCR 4.02d places the exponential form at Stage 2; MEI Pj14 the same. Edexcel CP2.8 names proving de Moivre's theorem by induction for positive integers; MEI Pp5 gives it as an induction example.
- MEI Pj17 asks you to explain why the sum of all nth roots is zero.

## B9 The exponential form

*Refs: AQA B9 · Edexcel CP2.9 · OCR 4.02d, 4.02n · MEI Pj14. Level: A-level only.*

### What you need to know

```latex
e^{i\theta} = \cos\theta + i\sin\theta, \qquad z = re^{i\theta}
```

- r e^{iθ} × s e^{iφ} = rs e^{i(θ+φ)}, and r e^{iθ} ÷ s e^{iφ} = (r/s) e^{i(θ−φ)}.
- The conjugate of re^{iθ} is re^{−iθ}.
- cos θ = (e^{iθ} + e^{−iθ})/2 and sin θ = (e^{iθ} − e^{−iθ})/(2i).

### Explained

Euler's relation can be seen from Maclaurin series ([09-maclaurin-series-and-limits.md](09-maclaurin-series-and-limits.md)): put x = iθ into the series for eˣ and group the real and imaginary terms; they are the series for cos θ and sin θ. The exponential form makes the rules for multiplying and dividing just the laws of indices. A famous case: e^{iπ} = −1.

### Worked example

Write z = −2 − 2i in the form re^{iθ}.

1. r = 2√2. Third quadrant, θ = −3π/4.
2. z = 2√2 e^{−3πi/4}.

Given z = 4e^{iπ/3} and w = 2e^{−iπ/2}, find zw and z/w in exponential form.

1. zw = 8e^{−iπ/6}.
2. z/w = 2e^{5iπ/6}.

Show that e^{iθ} + e^{−iθ} = 2 cos θ.

1. e^{iθ} = cos θ + i sin θ, e^{−iθ} = cos θ − i sin θ, since cos is even and sin is odd.
2. Adding: 2 cos θ.

### Common mistakes

- Writing e^{iθ} with θ in degrees. θ is in radians.
- Taking e^{−iθ} as −e^{iθ}.

## B8 De Moivre's theorem

*Refs: AQA B8 · Edexcel CP2.8 · OCR 4.02q · MEI Pj12, Pj13. Level: A-level only.*

### What you need to know

```latex
[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)
```

- True for all integers n (and proved by induction for positive n).
- Use it to find powers, to write cos nθ and sin nθ in powers of cos θ and sin θ, to write powers like cos⁴θ as sums of multiple angles, and to sum series.

### Explained

**Proof by induction for positive integers.** For n = 1 it is clear. Assume (cos θ + i sin θ)ᵏ = cos kθ + i sin kθ. Multiplying by cos θ + i sin θ and using the multiplication rule gives cos(k + 1)θ + i sin(k + 1)θ. For negative n = −m, use 1/(cos mθ + i sin mθ) = cos mθ − i sin mθ = cos(−mθ) + i sin(−mθ).

**Multiple angles.** Expand (c + is)ⁿ, where c = cos θ, s = sin θ, by the binomial theorem. The real part is cos nθ and the imaginary part is sin nθ.

**Powers of sin and cos.** With z = e^{iθ}:

```latex
z^n + z^{-n} = 2\cos n\theta, \qquad z^n - z^{-n} = 2i\sin n\theta
```

So 2 cos θ = z + 1/z. Expand (z + 1/z)ⁿ, pair terms zᵏ with z^{−k}, and replace each pair.

**Sums of series.** Write a sum of cosines as the real part of a geometric series in e^{iθ}, sum the series, and take the real part. Multiplying top and bottom by a conjugate, or taking out a half-angle factor like e^{iθ/2}, makes the real part easy to see.

### Worked example

Find (1 + i)¹⁰ in the form a + bi.

1. 1 + i = √2 e^{iπ/4}.
2. (1 + i)¹⁰ = 32 e^{10iπ/4} = 32 e^{5iπ/2} = 32 e^{iπ/2} = 32i.

Express cos 3θ and sin 3θ in terms of cos θ and sin θ.

1. (c + is)³ = c³ + 3c²(is) + 3c(is)² + (is)³ = c³ − 3cs² + i(3c²s − s³).
2. cos 3θ = c³ − 3cs² = c³ − 3c(1 − c²) = 4c³ − 3c.
3. sin 3θ = 3c²s − s³ = 3(1 − s²)s − s³ = 3s − 4s³.

Show that cos⁴θ = (cos 4θ + 4 cos 2θ + 3)/8, and hence find ∫₀^{π/2} cos⁴θ dθ.

1. (2 cos θ)⁴ = (z + 1/z)⁴ = z⁴ + 4z² + 6 + 4z⁻² + z⁻⁴.
2. = (z⁴ + z⁻⁴) + 4(z² + z⁻²) + 6 = 2 cos 4θ + 8 cos 2θ + 6.
3. 16 cos⁴θ = 2 cos 4θ + 8 cos 2θ + 6, so cos⁴θ = (cos 4θ + 4 cos 2θ + 3)/8.
4. ∫₀^{π/2}: [sin 4θ/4 + 2 sin 2θ + 3θ]/8 from 0 to π/2 = (3π/2)/8 = 3π/16.

Express sin⁵θ in terms of multiple angles.

1. (2i sin θ)⁵ = (z − 1/z)⁵ = z⁵ − 5z³ + 10z − 10z⁻¹ + 5z⁻³ − z⁻⁵.
2. = (z⁵ − z⁻⁵) − 5(z³ − z⁻³) + 10(z − z⁻¹) = 2i sin 5θ − 10i sin 3θ + 20i sin θ.
3. (2i)⁵ = 32i, so sin⁵θ = (sin 5θ − 5 sin 3θ + 10 sin θ)/16.

Find Σ_{k=0}^{n−1} cos kθ, for θ not a multiple of 2π.

1. It is the real part of Σ e^{ikθ} = (e^{inθ} − 1)/(e^{iθ} − 1).
2. Take out half angles: (e^{inθ/2}/e^{iθ/2}) × (e^{inθ/2} − e^{−inθ/2})/(e^{iθ/2} − e^{−iθ/2}) = e^{i(n−1)θ/2} × sin(nθ/2)/sin(θ/2).
3. Real part: cos((n − 1)θ/2) sin(nθ/2)/sin(θ/2).

### Common mistakes

- Expanding (c + is)ⁿ and forgetting that i² = −1 and i³ = −i.
- In the z + 1/z method, forgetting to divide by 2ⁿ (or (2i)ⁿ) at the end.
- Applying de Moivre to r(cos θ − i sin θ) without first rewriting with −θ.

## B10 nth roots of a complex number

*Refs: AQA B10 · Edexcel CP2.10 · OCR 4.02r · MEI Pj15, Pj16, Pj17, Pj19. Level: A-level only.*

### What you need to know

- Every non-zero complex number has exactly n distinct nth roots.

```latex
z^n = re^{i\theta} \;\Rightarrow\; z = r^{1/n}e^{i(\theta + 2k\pi)/n},\quad k = 0, 1, \dots, n-1
```

- The roots lie on a circle of radius r^{1/n}, equally spaced by 2π/n: they are the vertices of a regular n-gon centred at the origin.
- The nth roots of unity are 1, ω, ω², ..., ω^{n−1}, with ω = e^{2πi/n}. Their sum is 0.

### Explained

Write the right side with a general argument θ + 2kπ, because adding 2π does not change the number but does change θ/n. Pick k so the arguments lie in −π < arg ≤ π.

Why the sum of the roots of unity is zero: 1 + ω + ... + ω^{n−1} = (ωⁿ − 1)/(ω − 1) = 0 because ωⁿ = 1 and ω ≠ 1. Equivalently, zⁿ − 1 has no z^{n−1} term, so the sum of roots is 0 (file 07).

Once one nth root α of w is known, all of them are α, αω, αω², ..., since (αωᵏ)ⁿ = αⁿ = w.

### Worked example

Solve z³ = 8i, giving the roots in the form re^{iθ} and x + iy.

1. 8i = 8e^{i(π/2 + 2kπ)}. z = 2e^{i(π/6 + 2kπ/3)}.
2. k = 0: 2e^{iπ/6} = √3 + i. k = 1: 2e^{5iπ/6} = −√3 + i. k = −1: 2e^{−iπ/2} = −2i.

Solve z⁴ = −16.

1. −16 = 16e^{i(π + 2kπ)}. z = 2e^{i(π/4 + kπ/2)}.
2. k = 0, 1, −1, −2: arguments π/4, 3π/4, −π/4, −3π/4.
3. z = ±√2 ± √2 i (all four sign combinations).

Solve z⁵ = 1 and show the roots on an Argand diagram.

1. z = e^{2kπi/5}, k = −2, −1, 0, 1, 2.
2. They are the vertices of a regular pentagon on the unit circle, one vertex at 1.

### Common mistakes

- Giving only one root, or giving n roots that are not all distinct (k = 0 and k = n repeat).
- Taking the nth root of the argument but not the modulus, or vice versa.

## B11 Roots of unity and geometry

*Refs: AQA B11 · Edexcel CP2.11 · OCR 4.02s · MEI Pj17, Pj18, Pj20. Level: A-level only.*

### What you need to know

- Use roots of unity to find the vertices of regular polygons with a given centre and one given vertex.
- Use 1 + ω + ω² + ... + ω^{n−1} = 0 to simplify expressions and prove trigonometric results.

### Explained

A regular n-gon with centre c and one vertex p has vertices c + (p − c)ωᵏ: each multiplication by ω rotates the vector from the centre by 2π/n.

Taking real parts of the sum of roots gives identities such as cos(2π/5) + cos(4π/5) = −½.

### Worked example

An equilateral triangle has centre 1 + i and one vertex 3 + i. Find the other vertices.

1. p − c = 2. ω = e^{2πi/3} = −½ + (√3/2)i.
2. 2ω = −1 + √3 i, so a vertex is 1 + i − 1 + √3 i = (1 + √3)i, that is 0 + (1 + √3)i.
3. 2ω² = −1 − √3 i, so the other vertex is (1 − √3)i.

Show that cos(2π/5) + cos(4π/5) = −½.

1. The fifth roots of unity sum to 0: 1 + ω + ω² + ω³ + ω⁴ = 0.
2. ω⁴ = ω*, ω³ = (ω²)*, so the real parts give 1 + 2 cos(2π/5) + 2 cos(4π/5) = 0.
3. Hence cos(2π/5) + cos(4π/5) = −½.

ω is a complex cube root of unity. Simplify (1 + ω)(1 + ω²).

1. Expand: 1 + ω + ω² + ω³ = 0 + 1 = 1.

### Common mistakes

- Rotating about the origin rather than about the polygon's centre.
- Forgetting ω³ = 1 when simplifying powers.

## Check questions

1. Write z = √3 − i in exponential form, and hence find z⁶. [3 marks]
2. Use de Moivre's theorem to show that cos 5θ = 16cos⁵θ − 20cos³θ + 5cos θ. [5 marks]
3. Show that sin⁴θ = (cos 4θ − 4 cos 2θ + 3)/8, and find ∫₀^{π/4} sin⁴θ dθ in exact form. [6 marks]
4. Solve z⁴ = 8 + 8√3 i, giving your answers in the form re^{iθ} with −π < θ ≤ π. [4 marks]
5. Prove by induction that (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ for all positive integers n. [5 marks]
6. A square has centre 2 − i and one vertex at 5 + i. Find the other three vertices. [4 marks]
7. ω = e^{2πi/7}. Show that ω + ω² + ω³ + ω⁴ + ω⁵ + ω⁶ = −1, and deduce the value of cos(2π/7) + cos(4π/7) + cos(6π/7). [4 marks]
8. Show that Σ_{k=1}^{n} sin kθ = sin(nθ/2) sin((n + 1)θ/2)/sin(θ/2), for θ not a multiple of 2π. [6 marks]

## Mark scheme

1. z = 2e^{−iπ/6} (1). z⁶ = 64e^{−iπ} (1) = −64 (1).
2. Real part of (c + is)⁵ = c⁵ − 10c³s² + 5cs⁴ (2). Replace s² = 1 − c² (1). c⁵ − 10c³ + 10c⁵ + 5c(1 − 2c² + c⁴) (1) = 16c⁵ − 20c³ + 5c (1).
3. (z − 1/z)⁴ = (2i sin θ)⁴ = 16 sin⁴θ (1). = (z⁴ + z⁻⁴) − 4(z² + z⁻²) + 6 = 2cos 4θ − 8cos 2θ + 6 (2). Result (1). Integral [sin 4θ/4 − 2 sin 2θ + 3θ]/8 from 0 to π/4 (1) = (−2 + 3π/4)/8 = 3π/32 − 1/4 (1).
4. 8 + 8√3 i = 16e^{iπ/3} (1). z = 2e^{i(π/12 + kπ/2)} (1). Arguments π/12, 7π/12, −5π/12, −11π/12 (2).
5. n = 1 true (1). Assume for k (1). Multiply by cos θ + i sin θ (1); compound angle formulae give cos(k + 1)θ + i sin(k + 1)θ (1). Conclusion (1).
6. p − c = 3 + 2i (1). Multiply by i: −2 + 3i, giving vertex 2i (1). By −1: 2 − i − 3 − 2i = −1 − 3i (1). By −i: 2 − 3i, giving 4 − 4i (1).
7. ω⁷ = 1 and ω ≠ 1, so 1 + ω + ... + ω⁶ = 0 (1), giving the result (1). Real parts in conjugate pairs: 2[cos(2π/7) + cos(4π/7) + cos(6π/7)] = −1 (1), so the sum is −½ (1).
8. Imaginary part of Σ e^{ikθ} = e^{iθ}(e^{inθ} − 1)/(e^{iθ} − 1) (2). Half-angle factors: e^{i(n+1)θ/2} sin(nθ/2)/sin(θ/2) (2). Imaginary part gives the result (2).
