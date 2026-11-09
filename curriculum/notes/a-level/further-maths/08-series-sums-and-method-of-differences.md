---
level: A-level
subject: Further Mathematics
topic: "Series: standard sums and the method of differences"
as_content: "Standard sums are AS on AQA, Edexcel and MEI but A-level only on OCR. The method of differences is A-level only on every board."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["D3", "D4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP4.3", "CP4.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.06a", "4.06b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Ps1", "Ps2"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Series: standard sums and the method of differences

This file covers sigma notation, the formulae for the sums of r, r² and r³, using them to sum other series, and summing series by the method of differences, including with partial fractions.

## Overview

Sigma notation and arithmetic series are in [../maths/08-sequences-and-series.md](../maths/08-sequences-and-series.md). Partial fractions are in [../maths/03-algebra-polynomials-and-partial-fractions.md](../maths/03-algebra-polynomials-and-partial-fractions.md). Proving the formulae by induction is in [01-proof-by-induction.md](01-proof-by-induction.md).

### Board differences

- AQA D3, D4; Edexcel CP4.3, CP4.4; OCR 4.06a, 4.06b; MEI Ps1, Ps2.
- Level: AQA D3, Edexcel CP4.3 and MEI Ps1 are AS; OCR puts both 4.06a and 4.06b at Stage 2 (A-level only). The method of differences is A-level only on every board.
- AQA D4 and MEI Ps2 mention partial fractions in the method of differences explicitly.

## D3 Standard sums

*Refs: AQA D3 · Edexcel CP4.3 · OCR 4.06a · MEI Ps1. Level: AS & A (OCR A-level only).*

### What you need to know

```latex
\sum_{r=1}^{n} r = \tfrac12 n(n+1),\qquad \sum_{r=1}^{n} r^2 = \tfrac16 n(n+1)(2n+1),\qquad \sum_{r=1}^{n} r^3 = \tfrac14 n^2(n+1)^2
```

- Σ1 from r = 1 to n is n. Σ(af(r) + bg(r)) = aΣf(r) + bΣg(r).
- A sum that starts at r = k: Σ_{r=k}^{n} f(r) = Σ_{r=1}^{n} f(r) − Σ_{r=1}^{k−1} f(r).

### Explained

Expand the general term into powers of r, split the sum, apply each formula, then factorise. Take out common factors (such as n(n + 1)) as early as possible, because the answer is usually asked for in factorised form.

Note that Σr³ = (Σr)², a neat fact worth remembering.

### Worked example

Show that Σ_{r=1}^{n} r(r + 1)(r + 2) = ¼n(n + 1)(n + 2)(n + 3).

1. r(r + 1)(r + 2) = r³ + 3r² + 2r.
2. Sum: ¼n²(n + 1)² + ½n(n + 1)(2n + 1) + n(n + 1).
3. Take out ¼n(n + 1): ¼n(n + 1)[n(n + 1) + 2(2n + 1) + 4] = ¼n(n + 1)(n² + 5n + 6).
4. = ¼n(n + 1)(n + 2)(n + 3).

Find Σ_{r=11}^{20} r(r + 1).

1. Σ_{r=1}^{n} r(r + 1) = ⅙n(n + 1)(2n + 1) + ½n(n + 1) = ⅓n(n + 1)(n + 2).
2. n = 20: ⅓ × 20 × 21 × 22 = 3080. n = 10: ⅓ × 10 × 11 × 12 = 440.
3. Answer 3080 − 440 = 2640.

Show that Σ_{r=n+1}^{2n} r(3r − 1) = n²(7n + 3).

1. Σ_{r=1}^{m} r(3r − 1) = ½m(m + 1)(2m + 1) − ½m(m + 1) = ½m(m + 1)(2m) = m²(m + 1).
2. m = 2n: 4n²(2n + 1). m = n: n²(n + 1).
3. Difference: n²(8n + 4 − n − 1) = n²(7n + 3).

### Common mistakes

- Treating Σ_{r=1}^{n} 5 as 5 instead of 5n.
- Subtracting Σ up to k instead of k − 1 when the sum starts at k.

## D4 The method of differences

*Refs: AQA D4 · Edexcel CP4.4 · OCR 4.06b · MEI Ps2. Level: A-level only.*

### What you need to know

- If the general term can be written uᵣ = f(r) − f(r + 1), then

```latex
\sum_{r=1}^{n} \big(f(r) - f(r+1)\big) = f(1) - f(n+1)
```

- Use partial fractions to split terms like 1/[r(r + 1)].
- If the gap is two (f(r) − f(r + 2)), two terms survive at each end.

### Explained

Write out the first few rows and the last few rows of the sum in a column, and cross out terms that cancel diagonally. The surviving terms are at the start and the end. This "telescoping" turns a sum into a short expression.

The sum to infinity exists when f(n + 1) → 0 as n → ∞; then Σ_{r=1}^{∞} = f(1).

### Worked example

Find Σ_{r=1}^{n} 1/[(2r − 1)(2r + 1)].

1. Partial fractions: 1/[(2r − 1)(2r + 1)] = ½[1/(2r − 1) − 1/(2r + 1)].
2. Write out:
   r = 1: ½(1 − 1/3)
   r = 2: ½(1/3 − 1/5)
   ...
   r = n: ½(1/(2n − 1) − 1/(2n + 1))
3. All middle terms cancel: sum = ½(1 − 1/(2n + 1)) = n/(2n + 1).
4. As n → ∞ the sum tends to ½.

Find Σ_{r=1}^{n} 1/[r(r + 2)].

1. 1/[r(r + 2)] = ½[1/r − 1/(r + 2)].
2. Gap of two: the terms 1/1 and 1/2 survive at the start, and −1/(n + 1) and −1/(n + 2) at the end.
3. Sum = ½[1 + ½ − 1/(n + 1) − 1/(n + 2)] = ½[3/2 − (2n + 3)/((n + 1)(n + 2))].
4. Simplify: n(3n + 5)/[4(n + 1)(n + 2)].

Show that r³ − (r − 1)³ = 3r² − 3r + 1, and use it to derive the formula for Σr².

1. Expand: r³ − (r³ − 3r² + 3r − 1) = 3r² − 3r + 1.
2. Sum from 1 to n: left side telescopes to n³ − 0³ = n³.
3. n³ = 3Σr² − 3 × ½n(n + 1) + n.
4. Σr² = ⅓[n³ + (3/2)n(n + 1) − n] = ⅙n(2n² + 3n + 1) = ⅙n(n + 1)(2n + 1).

Find Σ_{r=1}^{n} 2/[r(r + 1)(r + 2)].

1. 2/[r(r + 1)(r + 2)] = 1/[r(r + 1)] − 1/[(r + 1)(r + 2)]. (Check: the difference has numerator (r + 2) − r = 2.)
2. This is f(r) − f(r + 1) with f(r) = 1/[r(r + 1)].
3. Sum = f(1) − f(n + 1) = ½ − 1/[(n + 1)(n + 2)] = n(n + 3)/[2(n + 1)(n + 2)].

### Common mistakes

- Writing only one row at each end and missing surviving terms when the gap is two.
- Losing the factor ½ from the partial fractions.

## Check questions

1. Show that Σ_{r=1}^{n} (2r − 1)² = ⅓n(2n − 1)(2n + 1). [4 marks]
2. Find Σ_{r=1}^{n} r²(r − 1), giving your answer fully factorised. [4 marks]
3. Evaluate Σ_{r=21}^{40} r². [3 marks]
4. (a) Express 1/[(r + 1)(r + 3)] in partial fractions. (b) Hence find Σ_{r=1}^{n} 1/[(r + 1)(r + 3)], in the form n(an + b)/[c(n + 2)(n + 3)]. [6 marks]
5. Find Σ_{r=1}^{∞} 1/(4r² − 1). [3 marks]
6. Show that Σ_{r=1}^{n} (r³ − r) = ¼(n − 1)n(n + 1)(n + 2). [4 marks]
7. Using f(r) = r(r + 1)(r + 2), show that f(r) − f(r − 1) = 3r(r + 1), and hence find Σ_{r=1}^{n} r(r + 1). [4 marks]

## Mark scheme

1. 4r² − 4r + 1 (1). 4 × ⅙n(n + 1)(2n + 1) − 4 × ½n(n + 1) + n (1). = ⅓n[2(n + 1)(2n + 1) − 6(n + 1) + 3] = ⅓n(4n² − 1) (1) = ⅓n(2n − 1)(2n + 1) (1).
2. Σr³ − Σr² (1) = ¼n²(n + 1)² − ⅙n(n + 1)(2n + 1) (1) = (1/12)n(n + 1)[3n(n + 1) − 2(2n + 1)] = (1/12)n(n + 1)(3n² − n − 2) (1) = (1/12)n(n + 1)(n − 1)(3n + 2) (1).
3. ⅙ × 40 × 41 × 81 − ⅙ × 20 × 21 × 41 (1) = 22140 − 2870 (1) = 19270 (1).
4. (a) ½[1/(r + 1) − 1/(r + 3)] (2). (b) Survivors ½[½ + ⅓ − 1/(n + 2) − 1/(n + 3)] (2). = n(5n + 13)/[12(n + 2)(n + 3)] (2).
5. 1/(4r² − 1) = ½[1/(2r − 1) − 1/(2r + 1)] (1). Sum to n = n/(2n + 1) (1). Limit ½ (1).
6. ¼n²(n + 1)² − ½n(n + 1) (1) = ¼n(n + 1)[n(n + 1) − 2] (1) = ¼n(n + 1)(n² + n − 2) (1) = ¼(n − 1)n(n + 1)(n + 2) (1).
7. f(r) − f(r − 1) = r(r + 1)[(r + 2) − (r − 1)] = 3r(r + 1) (2). Sum telescopes: 3Σr(r + 1) = f(n) − f(0) = n(n + 1)(n + 2) (1). Σr(r + 1) = ⅓n(n + 1)(n + 2) (1).
