---
level: A-level
subject: Further Mathematics
topic: "Number theory"
as_content: "All of this file is A-level only option content: Edexcel Further Pure 2, OCR Additional Pure (8.02) and MEI Further Pure with Technology (number theory)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 5.1", "FP2 5.2", "FP2 5.3", "FP2 5.4", "FP2 5.5", "FP2 5.6"]
  - board: OCR
    code: "H245"
    spec_refs: ["8.02a", "8.02b", "8.02c", "8.02d", "8.02e", "8.02f", "8.02g", "8.02h", "8.02i", "8.02j", "8.02k", "8.02l", "8.02m", "8.02n", "8.02o"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["TT1", "TT2", "TT3", "TT4", "TT5", "TT6", "TT7", "TT8", "TT9", "TT10"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Number theory

This file covers number bases and divisibility tests, the division algorithm, Euclid's algorithm and Bezout's identity, primes and Euclid's lemma, modular arithmetic, linear and simultaneous congruences, Fermat's little theorem, orders and primitive roots, quadratic residues, and (MEI) Euler's totient, Wilson's theorem, Pythagorean triples and Pell's equation.

## Overview

Option content. Proof by induction ([01-proof-by-induction.md](01-proof-by-induction.md)) and groups ([24-groups.md](24-groups.md)) link closely: the non-zero residues mod p form a group under multiplication.

### Board differences

- Edexcel FP2 5.1 to 5.6 (Euclid's algorithm, Bezout, modular arithmetic, Fermat's little theorem, divisibility tests, congruences). FP2 5.7 (counting) is in [59-combinatorics.md](59-combinatorics.md).
- OCR 8.02a to 8.02o goes furthest on theory: number bases, quadratic residues, simultaneous congruences, orders and primitive roots.
- MEI TT1 to TT10 (Further Pure with Technology) is computational: writing short programs, Euler's totient, Wilson's theorem, Pythagorean triples, Pell's equation and other Diophantine equations. Y436 is being withdrawn (last exam 2028).

## Number bases and divisibility tests

*Refs: Edexcel FP2 5.5 · OCR 8.02a, 8.02b, 8.02c. Level: A-level only.*

### What you need to know

- A number in base b: (dₖ...d₁d₀)_b = dₖbᵏ + ... + d₁b + d₀.
- Tests: 2 (last digit even), 3 and 9 (digit sum), 4 (last two digits), 5, 6 (2 and 3), 11 (alternating digit sum), and be able to prove them with congruences.

### Explained

10 ≡ 1 (mod 9), so every power of 10 is ≡ 1 and a number is congruent to its digit sum mod 9 (and mod 3). 10 ≡ −1 (mod 11), so powers alternate in sign, giving the alternating sum test.

### Worked example

Write 213 in base 5 and (1011)₂ in base 10.

1. 213 = 1 × 125 + 3 × 25 + 2 × 5 + 3, so (1323)₅.
2. (1011)₂ = 8 + 2 + 1 = 11.

Is 918 082 divisible by 11?

1. Alternating sum from the right: 2 − 8 + 0 − 8 + 1 − 9 = −22, a multiple of 11. Yes.

### Common mistakes

- Starting the alternating sum from the wrong end with a sign error (either end works if you are consistent; the result is ± the same).

## Euclid's algorithm and Bezout's identity

*Refs: Edexcel FP2 5.1, 5.2 · OCR 8.02d, 8.02i, 8.02j, 8.02k · MEI TT3. Level: A-level only.*

### What you need to know

- Division algorithm: a = qb + r with 0 ≤ r < b.
- Euclid's algorithm: gcd(a, b) = gcd(b, r); repeat until the remainder is 0.
- Bezout's identity: there are integers x, y with ax + by = gcd(a, b). Find them by working back through the algorithm.
- Euclid's lemma: if p is prime and p | ab, then p | a or p | b. Unique prime factorisation follows.

### Worked example

Find gcd(1071, 462) and integers x, y with 1071x + 462y = gcd.

1. 1071 = 2 × 462 + 147. 462 = 3 × 147 + 21. 147 = 7 × 21 + 0. gcd = 21.
2. 21 = 462 − 3 × 147 = 462 − 3(1071 − 2 × 462) = 7 × 462 − 3 × 1071.
3. x = −3, y = 7.

### Common mistakes

- Losing track of which numbers to substitute back; keep each step as "remainder = a − qb".

## Modular arithmetic and congruences

*Refs: Edexcel FP2 5.3, 5.6 · OCR 8.02e, 8.02f, 8.02h · MEI TT4. Level: A-level only.*

### What you need to know

- a ≡ b (mod n) means n | (a − b). Congruences can be added, subtracted and multiplied.
- ax ≡ b (mod n) has a solution if and only if gcd(a, n) | b. If gcd(a, n) = 1 there is a unique solution mod n: multiply by the inverse of a (found by Bezout).
- (OCR) Simultaneous congruences with coprime moduli have a unique solution modulo the product (Chinese remainder theorem).

### Worked example

Solve 7x ≡ 5 (mod 26).

1. Inverse of 7 mod 26: 7 × 15 = 105 = 4 × 26 + 1, so 7⁻¹ ≡ 15.
2. x ≡ 15 × 5 = 75 ≡ 23 (mod 26).

Solve 6x ≡ 4 (mod 10).

1. gcd(6, 10) = 2 divides 4. Divide through: 3x ≡ 2 (mod 5).
2. 3⁻¹ ≡ 2 (mod 5), so x ≡ 4 (mod 5): x ≡ 4 or 9 (mod 10).

(OCR) Find x with x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).

1. x ≡ 2 (mod 21) from the first and third (both ≡ 2, and 3, 7 coprime).
2. x = 2 + 21k ≡ 3 (mod 5): 2 + k ≡ 3, k ≡ 1. x = 23.
3. x ≡ 23 (mod 105).

### Common mistakes

- "Dividing" a congruence by a number not coprime to the modulus.

## Fermat's little theorem, orders and primitive roots

*Refs: Edexcel FP2 5.4 · OCR 8.02l, 8.02m, 8.02n, 8.02o, 8.02g · MEI TT5. Level: A-level only.*

### What you need to know

- If p is prime and p ∤ a, then a^{p−1} ≡ 1 (mod p). Also aᵖ ≡ a (mod p) for all a.
- (OCR) The order of a mod p is the least n with aⁿ ≡ 1; it divides p − 1. A primitive root has order p − 1.
- (OCR) a is a quadratic residue mod p if x² ≡ a has a solution.

### Explained

Fermat's theorem lets you cut huge powers down: reduce the exponent mod (p − 1). One proof uses the binomial theorem to show (a + 1)ᵖ ≡ aᵖ + 1 (mod p) (because p divides each C(p, r) for 0 < r < p) and induction on a.

### Worked example

Find 3¹⁰⁰ mod 7 and 7²²² mod 11.

1. 3⁶ ≡ 1 (mod 7). 100 = 6 × 16 + 4, so 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4.
2. 7¹⁰ ≡ 1 (mod 11). 222 = 220 + 2, so 7²²² ≡ 49 ≡ 5.

(OCR) Show that 2 is a primitive root mod 11, and list the quadratic residues mod 11.

1. Powers of 2 mod 11: 2, 4, 8, 5, 10, 9, 7, 3, 6, 1. Order 10 = p − 1.
2. Squares of 1 to 10 mod 11: 1, 4, 9, 5, 3, 3, 5, 9, 4, 1. Residues {1, 3, 4, 5, 9}.

### Common mistakes

- Applying Fermat when p divides a.

## Further results with technology

*Refs: MEI TT1, TT2, TT6, TT7, TT8, TT9, TT10. Level: A-level only (option content).*

### What you need to know

- Write, adapt and interpret short programs (for example trial division, or searching for solutions), and know their limits (run time, number size).
- Euler's totient φ(n) counts integers 1 ≤ k ≤ n coprime to n; a^{φ(n)} ≡ 1 (mod n) when gcd(a, n) = 1.
- Wilson's theorem: p is prime if and only if (p − 1)! ≡ −1 (mod p).
- Pythagorean triples: (m² − n², 2mn, m² + n²).
- Pell's equation x² − dy² = 1: from a smallest solution (x₁, y₁), further solutions come from (x₁ + y₁√d)ᵏ.

### Worked example

Find φ(36) and use it to find 5¹⁰⁰ mod 36.

1. 36 = 2²3²; φ = 36 × ½ × ⅔ = 12.
2. 100 = 8 × 12 + 4. 5⁴ = 625 = 17 × 36 + 13. Answer 13.

Find two solutions of x² − 2y² = 1.

1. (3, 2) works: 9 − 8 = 1.
2. (3 + 2√2)² = 17 + 12√2, giving (17, 12): 289 − 288 = 1.

### Common mistakes

- Using a^{n−1} ≡ 1 (mod n) for composite n.

## Check questions

1. Use Euclid's algorithm to find gcd(252, 198) and integers x and y with 252x + 198y = gcd. [5 marks]
2. Prove that a number is divisible by 9 if and only if its digit sum is divisible by 9. [3 marks]
3. Solve 11x ≡ 4 (mod 17). [3 marks]
4. Find the remainder when 2⁵⁰ is divided by 13. [3 marks]
5. (OCR) Solve x ≡ 1 (mod 4), x ≡ 2 (mod 5), x ≡ 3 (mod 9). [4 marks]
6. Show that 4x ≡ 6 (mod 10) has solutions and find them all modulo 10. [3 marks]
7. (MEI) Use Wilson's theorem to show that 10! ≡ −1 (mod 11). [2 marks]

## Mark scheme

1. 252 = 1 × 198 + 54; 198 = 3 × 54 + 36; 54 = 1 × 36 + 18; 36 = 2 × 18 (2). gcd 18 (1). 18 = 54 − 36 = 54 − (198 − 3 × 54) = 4 × 54 − 198 = 4 × 252 − 5 × 198 (1). x = 4, y = −5 (1).
2. 10 ≡ 1 (mod 9), so 10ᵏ ≡ 1 (1). N = Σdₖ10ᵏ ≡ Σdₖ (mod 9) (1). So 9 | N ⇔ 9 | digit sum (1).
3. 11⁻¹ mod 17: 11 × 14 = 154 = 9 × 17 + 1 (1). x ≡ 14 × 4 = 56 ≡ 5 (mod 17) (2).
4. 2¹² ≡ 1 (mod 13) (1). 2⁵⁰ = (2¹²)⁴ × 2² (1) ≡ 4 (1).
5. From mod 4 and 5: x ≡ 17 (mod 20) (2). 17 + 20k ≡ 3 (mod 9): 8 + 2k ≡ 3, 2k ≡ 4, k ≡ 2 (1). x ≡ 57 (mod 180) (1).
6. gcd(4, 10) = 2 | 6 (1). 2x ≡ 3 (mod 5), x ≡ 4 (mod 5) (1). x ≡ 4 or 9 (mod 10) (1).
7. 11 is prime (1), so (11 − 1)! ≡ −1 (mod 11) (1).
