---
level: A-level
subject: Mathematics
topic: "Sequences and series"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["D2", "D3", "D4", "D5", "D6"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P4.2", "P4.3", "P4.4", "P4.5", "P4.6"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.04e", "1.04f", "1.04g", "1.04h", "1.04i", "1.04j", "1.04k"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Ms6", "Ms7", "Ms8", "Ms9", "Ms10", "Ms11", "Ms12", "Ms13", "Ms14", "Ms15", "Ms16", "Ms17"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Sequences and series

This file covers sequences defined by a formula or by a recurrence relation, increasing, decreasing and periodic sequences, sigma notation, arithmetic and geometric sequences and series, the sum to infinity, and modelling with sequences.

## Overview

All A-level only (the binomial expansion, in file 07, is the only part of the DfE "sequences and series" heading that is in AS).

### Board differences

- AQA D2 to D6; Edexcel 4.2 to 4.6; OCR H240 1.04e to 1.04k.
- OCR MEI H640 splits this into Ms6 to Ms17. Ms11 asks you to know the difference between convergent and divergent sequences, which the other boards cover under geometric series.
- Edexcel's guidance says you should be able to prove the sum formulae for both arithmetic and geometric series.

## D2 Sequences

*Refs: AQA D2 · Edexcel 4.2 · OCR 1.04e, 1.04f · MEI Ms6, Ms7, Ms10, Ms11. Level: A-level only.*

### What you need to know

- (A-level only) A sequence can be given by a formula for the nth term, uₙ = f(n), or by a recurrence relation uₙ₊₁ = f(uₙ) with a first term.
- (A-level only) Increasing: uₙ₊₁ > uₙ for all n. Decreasing: uₙ₊₁ < uₙ for all n. Periodic: the terms repeat in a cycle; the order (period) is the length of the cycle.
- (A-level only) A sequence converges if its terms approach a limit; otherwise it diverges.

### Explained

A recurrence relation needs a starting value: "uₙ₊₁ = 2uₙ + 1, u₁ = 3" gives 3, 7, 15, 31, ...

To show a sequence given by a formula is increasing, show uₙ₊₁ − uₙ > 0 for every n.

A periodic sequence repeats, so to add many terms, add one cycle and multiply. Sequences such as uₙ = (−1)ⁿ or uₙ = cos(nπ/2) are periodic.

If a convergent recurrence uₙ₊₁ = f(uₙ) has limit L, then L = f(L). This is the idea behind fixed-point iteration (file 17).

### Worked example

(A-level only) uₙ₊₁ = kuₙ + 3, u₁ = 2 and u₃ = 23. Find the possible values of k.

1. u₂ = 2k + 3. u₃ = k(2k + 3) + 3 = 2k² + 3k + 3.
2. 2k² + 3k + 3 = 23, so 2k² + 3k − 20 = 0, (2k − 5)(k + 4) = 0.
3. k = 5/2 or k = −4.

(A-level only) A sequence has u₁ = 2 and uₙ₊₁ = 1/(1 − uₙ). Show it is periodic and state its order.

1. u₂ = 1/(1 − 2) = −1. u₃ = 1/(1 − (−1)) = 1/2. u₄ = 1/(1 − 1/2) = 2.
2. u₄ = u₁, so the terms repeat 2, −1, 1/2, ... with order 3.

(A-level only) Show that uₙ = (2n + 1)/(n + 1) is increasing.

1. uₙ = 2 − 1/(n + 1).
2. As n increases, 1/(n + 1) decreases, so uₙ increases. It converges to 2.

### Common mistakes

- Starting a recurrence from u₀ when u₁ is given, or the other way round.
- Calling a sequence increasing after checking only the first few terms.

## D3 Sigma notation

*Refs: AQA D3 · Edexcel 4.3 · OCR 1.04g · MEI Ms8, Ms9. Level: A-level only.*

### What you need to know

- (A-level only) A series is the sum of terms of a sequence.
- (A-level only) Sigma notation:

```latex
\sum_{r=1}^{n} u_r = u_1 + u_2 + \dots + u_n
```

- (A-level only) Useful result: the sum of the first n positive integers.

```latex
\sum_{r=1}^{n} r = \frac{n(n+1)}{2} \qquad \sum_{r=1}^{n} 1 = n
```

### Explained

Read the limits carefully: Σ from r = 5 to 12 has 12 − 5 + 1 = 8 terms. You can split a sum: Σ(ar + b) = aΣr + Σb. To sum from r = k to n, work out Σ to n minus Σ to (k − 1).

### Worked example

(A-level only) Evaluate Σ_{r=1}^{20} (3r + 1).

1. 3 × (20 × 21/2) + 20 = 3 × 210 + 20 = 650.

(A-level only) Evaluate Σ_{r=11}^{30} r.

1. Σ to 30 = 465. Σ to 10 = 55.
2. 465 − 55 = 410.

### Common mistakes

- Counting terms as n − k instead of n − k + 1.
- Forgetting the constant term contributes n copies of itself.

## D4 Arithmetic sequences and series

*Refs: AQA D4 · Edexcel 4.4 · OCR 1.04h · MEI Ms12, Ms13. Level: A-level only.*

### What you need to know

- (A-level only) An arithmetic sequence has a constant difference d. With first term a:

```latex
u_n = a + (n-1)d \qquad S_n = \frac{n}{2}\left[2a + (n-1)d\right] = \frac{n}{2}(a + l)
```

where l is the last term.

- (A-level only) Prove the sum formula.

### Explained

**Proof of the sum formula.** Write the sum forwards and backwards:

```latex
S_n = a + (a+d) + \dots + (a + (n-1)d)
```

```latex
S_n = (a + (n-1)d) + (a + (n-2)d) + \dots + a
```

Add the two lines term by term. Each pair sums to 2a + (n − 1)d, and there are n pairs, so 2Sₙ = n[2a + (n − 1)d], giving the formula.

Two facts about an arithmetic sequence give two simultaneous equations for a and d.

### Worked example

(A-level only) The 3rd term of an arithmetic sequence is 11 and the 10th term is 32. Find a, d and S₂₀.

1. a + 2d = 11 and a + 9d = 32. Subtract: 7d = 21, d = 3, a = 5.
2. S₂₀ = 10[10 + 19 × 3] = 10 × 67 = 670.

(A-level only) For the same sequence, find the least n for which Sₙ > 1000.

1. (n/2)(10 + 3(n − 1)) > 1000, so n(3n + 7) > 2000, so 3n² + 7n − 2000 > 0.
2. Root: n = (−7 + √24 049)/6 = 24.68...
3. n = 25. Check: S₂₄ = 948 and S₂₅ = 1025.

(A-level only) Ali saves £50 in the first month and £5 more each month than the month before. How much has Ali saved after 2 years?

1. a = 50, d = 5, n = 24.
2. S₂₄ = 12[100 + 23 × 5] = 12 × 215 = £2580.

### Common mistakes

- Using nd instead of (n − 1)d.
- Rounding n down when the question asks for the first n that exceeds a value.

## D5 Geometric sequences and series

*Refs: AQA D5 · Edexcel 4.5 · OCR 1.04i, 1.04j · MEI Ms14, Ms15, Ms16. Level: A-level only.*

### What you need to know

- (A-level only) A geometric sequence has a constant ratio r. With first term a:

```latex
u_n = ar^{n-1} \qquad S_n = \frac{a(1-r^n)}{1-r} = \frac{a(r^n - 1)}{r - 1} \quad (r \ne 1)
```

- (A-level only) If |r| < 1 the series converges and its sum to infinity is

```latex
S_\infty = \frac{a}{1-r}
```

- (A-level only) Modulus notation: |r| < 1 means −1 < r < 1.
- (A-level only) Prove the sum formula.

### Explained

**Proof of the sum formula.**

```latex
S_n = a + ar + ar^2 + \dots + ar^{n-1}
```

```latex
rS_n = ar + ar^2 + \dots + ar^{n-1} + ar^n
```

Subtract: Sₙ − rSₙ = a − arⁿ, so Sₙ(1 − r) = a(1 − rⁿ), and divide by 1 − r.

**Sum to infinity.** If |r| < 1, rⁿ → 0 as n → ∞, so Sₙ → a/(1 − r). If |r| ≥ 1 the terms do not shrink and the series diverges.

**Finding n.** Inequalities such as rⁿ > k are solved with logarithms (file 11). If r < 1, ln r is negative, so dividing by it reverses the inequality.

### Worked example

(A-level only) A geometric sequence has a = 48 and r = 1/2. Find u₆, S₁₀ and S∞.

1. u₆ = 48 × (1/2)⁵ = 1.5.
2. S₁₀ = 48(1 − (1/2)¹⁰)/(1/2) = 96(1 − 1/1024) = 95.90625.
3. S∞ = 48/(1/2) = 96.

(A-level only) The 2nd term of a geometric sequence is 6 and the 5th term is 162. Find a, r and S₈.

1. ar = 6 and ar⁴ = 162. Divide: r³ = 27, r = 3, a = 2.
2. S₈ = 2(3⁸ − 1)/(3 − 1) = 6560.

(A-level only) A geometric series has a = 2 and r = 1.5. Find the least n for which Sₙ > 500.

1. 2(1.5ⁿ − 1)/0.5 > 500, so 4(1.5ⁿ − 1) > 500, so 1.5ⁿ > 126.
2. n > ln 126 / ln 1.5 = 11.93, so n = 12.

(A-level only) The series 1 + 2x + 4x² + 8x³ + ... converges. Find the possible values of x and the sum.

1. r = 2x. Converges when |2x| < 1, that is −1/2 < x < 1/2.
2. S∞ = 1/(1 − 2x).

### Common mistakes

- Using rⁿ instead of rⁿ⁻¹ for the nth term.
- Using S∞ when |r| ≥ 1.
- Forgetting to reverse the inequality when dividing by ln r with r < 1.

## D6 Sequences and series in modelling

*Refs: AQA D6 · Edexcel 4.6 · OCR 1.04k · MEI Ms17. Level: A-level only.*

### What you need to know

- (A-level only) Use arithmetic and geometric sequences to model situations such as savings, salaries, depreciation and populations, and comment on the model.

### Explained

A fixed amount added each time gives an arithmetic model. A fixed percentage change each time gives a geometric model: an increase of p% gives r = 1 + p/100, a decrease gives r = 1 − p/100. Real situations rarely change by exactly the same amount every time, and models often break down in the long run (a population cannot grow forever).

### Worked example

(A-level only) A starting salary of £24 000 rises by 3% each year. Find the total earned over the first 10 years.

1. Geometric with a = 24 000 and r = 1.03.
2. S₁₀ = 24 000(1.03¹⁰ − 1)/0.03 = £275 133 (nearest pound).

(A-level only) A runner covers 5 km in week 1 and increases the distance by 10% each week. Find the distance in week 8 and the total over 8 weeks. Comment on the model.

1. u₈ = 5 × 1.1⁷ = 9.74 km.
2. S₈ = 5(1.1⁸ − 1)/0.1 = 57.2 km.
3. The model cannot continue: after a year it would predict over 700 km in one week. A real plan would level off.

### Common mistakes

- Using r = 0.03 instead of 1.03 for a 3% increase.
- Counting the first year as n = 0.

## Check questions

1. (A-level only) uₙ₊₁ = 2uₙ − 1 and u₁ = 3. Find u₂, u₃, u₄ and Σ_{r=1}^{4} uᵣ. [3 marks]
2. (A-level only) u₁ = 2 and uₙ₊₁ = (uₙ + 3)/(uₙ − 1). (a) Show the sequence is periodic and state its order. (b) Find Σ_{r=1}^{25} uᵣ. [4 marks]
3. (A-level only) An arithmetic series has first term 7 and 15th term 63. Find the common difference and the sum of the first 15 terms. [3 marks]
4. (A-level only) Evaluate Σ_{r=1}^{30} (4r − 3). [2 marks]
5. (A-level only) Prove that the sum of the first n terms of an arithmetic series with first term a and common difference d is (n/2)[2a + (n − 1)d]. [4 marks]
6. (A-level only) A geometric sequence has 3rd term 18 and 6th term 486. Find the first term, the common ratio and the sum of the first 10 terms. [4 marks]
7. (A-level only) A geometric series has a = 80 and r = 0.75. (a) Find S∞. (b) Find the least n for which Sₙ > 300. [5 marks]
8. (A-level only) The series 1 + (x − 1) + (x − 1)² + ... converges. (a) Find the set of possible values of x. (b) Given that the sum is 4, find x. [4 marks]
9. (A-level only) A runner trains 5 km in week 1 and increases by 10% each week. Find the total distance over the first 8 weeks, and explain why the model is unrealistic for a whole year. [4 marks]

## Mark scheme

1. 5, 9, 17 (2); sum 3 + 5 + 9 + 17 = 34 (1).
2. (a) u₂ = 5, u₃ = 8/4 = 2 (1); repeats with order 2 (1). (b) 13 terms equal 2 and 12 equal 5 (1); 26 + 60 = 86 (1).
3. 7 + 14d = 63, d = 4 (1); S₁₅ = (15/2)(7 + 63) (1) = 525 (1).
4. 4 × 465 − 90 (1) = 1770 (1).
5. Sₙ written forwards and backwards (1); adding pairs, each 2a + (n − 1)d (1); n pairs, so 2Sₙ = n[2a + (n − 1)d] (1); conclusion (1).
6. ar² = 18 and ar⁵ = 486 (1); r³ = 27, r = 3 (1); a = 2 (1); S₁₀ = 2(3¹⁰ − 1)/2 = 59 048 (1).
7. (a) 80/0.25 = 320 (1). (b) 320(1 − 0.75ⁿ) > 300 (1); 0.75ⁿ < 1/16 (1); n > ln(1/16)/ln 0.75 = 9.64 (1); n = 10 (1).
8. (a) |x − 1| < 1 (1); 0 < x < 2 (1). (b) 1/(1 − (x − 1)) = 1/(2 − x) = 4 (1); x = 7/4 (1).
9. Geometric, a = 5, r = 1.1 (1); S₈ = 5(1.1⁸ − 1)/0.1 (1) = 57.2 km (1); e.g. it predicts impossibly large weekly distances, since 5 × 1.1⁵¹ is over 700 km (1).
