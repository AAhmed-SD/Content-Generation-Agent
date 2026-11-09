---
level: A-level
subject: Further Mathematics
topic: "Sequences and recurrence relations"
as_content: "All of this file is A-level only option content: Edexcel Further Pure 2 and Decision 2, OCR Additional Pure (8.01) and MEI Extra Pure."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 6.1", "FP2 6.2", "FP2 6.3", "D2 6.1", "D2 6.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["8.01a", "8.01b", "8.01c", "8.01d", "8.01e", "8.01f", "8.01g", "8.01h", "8.01i"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Xs1", "Xs2", "Xs3", "Xs4", "Xs5", "Xs6", "Xs7", "Xs8", "Xs9"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Sequences and recurrence relations

This file covers general sequences and their behaviour (convergent, divergent, periodic, oscillating), limits, the Fibonacci numbers, solving first and second order linear recurrence relations (homogeneous and non-homogeneous), proving closed forms by induction, and modelling with recurrence relations.

## Overview

Option content. Sequences and series from A-level Maths are in [../maths/08-sequences-and-series.md](../maths/08-sequences-and-series.md); induction in [01-proof-by-induction.md](01-proof-by-induction.md). Solving recurrences mirrors solving differential equations ([17-differential-equations-second-order-and-oscillations.md](17-differential-equations-second-order-and-oscillations.md)): auxiliary equation, complementary function, particular solution.

### Board differences

- Edexcel FP2 6.1 to 6.3 (first and second order, proof by induction); Edexcel D2 6.1, 6.2 (the same skills in decision-maths modelling contexts, first and second order).
- OCR 8.01a to 8.01i includes the behaviour of sequences, limits and the Fibonacci numbers.
- MEI Xs1 to Xs9 includes modelling, verifying a given solution, first and second order linear equations (homogeneous and not), and commenting on long-term behaviour.

## Sequences and their behaviour

*Refs: OCR 8.01a, 8.01b, 8.01c, 8.01d, 8.01e · MEI Xs1, Xs2, Xs3, Xs4. Level: A-level only.*

### What you need to know

- A sequence may be given by a formula uₙ = f(n) or by a recurrence such as u_{n+1} = f(uₙ).
- Language: increasing, decreasing, periodic (repeats with period k), oscillating, convergent (tends to a limit), divergent.
- If u_{n+1} = f(uₙ) converges to L (and f is continuous), then L = f(L).
- Fibonacci: F₁ = F₂ = 1, F_{n+2} = F_{n+1} + Fₙ. The ratio F_{n+1}/Fₙ tends to the golden ratio (1 + √5)/2.

### Worked example

uₙ₊₁ = ½uₙ + 3, u₁ = 2. Describe the behaviour and find the limit.

1. Terms 2, 4, 5, 5.5, 5.75: increasing, approaching a limit.
2. L = ½L + 3, so L = 6.

uₙ₊₁ = 1/(1 − uₙ), u₁ = 2. Show the sequence is periodic.

1. u₂ = −1, u₃ = ½, u₄ = 2. Period 3.

### Common mistakes

- Assuming a limit exists just because L = f(L) has a solution.

## First order linear recurrence relations

*Refs: Edexcel FP2 6.1, 6.2, D2 6.1, 6.2 · OCR 8.01f, 8.01h · MEI Xs5, Xs6. Level: A-level only.*

### What you need to know

- u_{n+1} = a uₙ has solution uₙ = Caⁿ.
- u_{n+1} = a uₙ + f(n): general solution = complementary function Caⁿ + a particular solution. Try a constant for constant f, a linear polynomial for linear f, and kbⁿ for bⁿ (use knbⁿ if b = a).
- Use the initial condition last.

### Worked example

Solve u_{n+1} = 3uₙ + 2, u₁ = 1.

1. CF: C × 3ⁿ. Particular: constant k = 3k + 2, k = −1.
2. uₙ = C × 3ⁿ − 1. u₁ = 3C − 1 = 1, C = ⅔.
3. uₙ = 2 × 3^{n−1} − 1.

Solve u_{n+1} = 2uₙ + n, u₀ = 1.

1. CF: C × 2ⁿ. Try pn + q: p(n + 1) + q = 2pn + 2q + n, so p = −1 and p + q = 2q, q = −1.
2. uₙ = C × 2ⁿ − n − 1. u₀ = C − 1 = 1, C = 2.
3. uₙ = 2^{n+1} − n − 1. Check u₁ = 2 × 1 + 0 = 2 and 4 − 2 = 2 ✓.

A loan of £10 000 has 1% interest added each month, then £200 is repaid. Find when it is paid off.

1. D_{n+1} = 1.01Dₙ − 200, D₀ = 10 000.
2. Particular: k = 1.01k − 200, k = 20 000. Dₙ = C(1.01)ⁿ + 20 000, C = −10 000.
3. Dₙ = 0 when 1.01ⁿ = 2, n = ln 2/ln 1.01 = 69.7. Paid off in the 70th month.

### Common mistakes

- Applying the initial condition to the CF before adding the particular solution.

## Second order linear recurrence relations

*Refs: Edexcel FP2 6.1, 6.2, D2 6.2 · OCR 8.01g, 8.01i · MEI Xs7, Xs8, Xs9. Level: A-level only.*

### What you need to know

- u_{n+2} + a u_{n+1} + b uₙ = 0 has auxiliary equation m² + am + b = 0.

| Roots | Solution |
| --- | --- |
| distinct α, β | uₙ = Aαⁿ + Bβⁿ |
| repeated α | uₙ = (A + Bn)αⁿ |

- For a non-homogeneous right side f(n), add a particular solution, as for first order.
- Complex roots give oscillating (possibly periodic) behaviour.

### Worked example

Solve u_{n+2} = 5u_{n+1} − 6uₙ, u₀ = 1, u₁ = 4.

1. m² − 5m + 6 = 0, m = 2, 3. uₙ = A2ⁿ + B3ⁿ.
2. A + B = 1, 2A + 3B = 4. B = 2, A = −1.
3. uₙ = 2 × 3ⁿ − 2ⁿ.

Solve u_{n+2} = 4u_{n+1} − 4uₙ, u₀ = 1, u₁ = 6.

1. (m − 2)² = 0. uₙ = (A + Bn)2ⁿ. A = 1; 2(1 + B) = 6, B = 2.
2. uₙ = (1 + 2n)2ⁿ.

Find a closed form for the Fibonacci numbers.

1. m² = m + 1, m = (1 ± √5)/2 = φ, ψ.
2. Fₙ = Aφⁿ + Bψⁿ with F₀ = 0, F₁ = 1: A = −B = 1/√5.
3. Fₙ = (φⁿ − ψⁿ)/√5. Since |ψ| < 1, F_{n+1}/Fₙ → φ.

### Common mistakes

- Using n rather than n + 1 as the exponent when the sequence starts at u₁ (fit the constants to the given starting index).

## Proving closed forms by induction

*Refs: Edexcel FP2 6.3 · OCR 8.01b · MEI Xs4. Level: A-level only.*

### Worked example

uₙ₊₁ = 3uₙ + 2, u₁ = 1. Prove that uₙ = 2 × 3^{n−1} − 1.

1. n = 1: 2 − 1 = 1 ✓.
2. Assume uₖ = 2 × 3^{k−1} − 1. Then u_{k+1} = 6 × 3^{k−1} − 3 + 2 = 2 × 3ᵏ − 1 ✓.
3. True for all n ≥ 1.

## Check questions

1. Solve u_{n+1} = 4uₙ − 3, u₁ = 3. [4 marks]
2. Solve u_{n+1} = 2uₙ + 3ⁿ, u₀ = 2. [5 marks]
3. Solve u_{n+2} = u_{n+1} + 6uₙ, u₁ = 1, u₂ = 13. [5 marks]
4. Solve u_{n+2} − 6u_{n+1} + 9uₙ = 0, u₀ = 2, u₁ = 9, and prove your answer by induction. [8 marks]
5. A population of fish is modelled by P_{n+1} = 1.2Pₙ − 500, where Pₙ is the population after n years, P₀ = 2000. Solve the recurrence, and comment on the long-term prediction. [5 marks]
6. Show that the sequence u_{n+1} = (uₙ + 3/uₙ)/2, u₁ = 2, appears to converge, and find the limit. [3 marks]

## Mark scheme

1. CF C4ⁿ, particular 1 (2). uₙ = C4ⁿ + 1, u₁ = 4C + 1 = 3, C = ½ (1). uₙ = 2 × 4^{n−1} + 1 (1).
2. CF C2ⁿ (1). Try k3ⁿ: 3k = 2k + 1, k = 1 (2). uₙ = C2ⁿ + 3ⁿ, C = 1 (1). uₙ = 2ⁿ + 3ⁿ (1).
3. m² − m − 6 = 0, m = 3, −2 (2). 3A − 2B = 1, 9A + 4B = 13 (1). A = 1, B = 1 (1). uₙ = 3ⁿ + (−2)ⁿ (1).
4. (m − 3)² = 0, uₙ = (A + Bn)3ⁿ (2). A = 2, 3(2 + B) = 9, B = 1 (1). uₙ = (n + 2)3ⁿ (1). Induction (strong, two base cases n = 0, 1 ✓) (1). Assume for k and k + 1: u_{k+2} = 6(k + 3)3^{k+1} − 9(k + 2)3ᵏ = 3ᵏ[18k + 54 − 9k − 18] = 3ᵏ(9k + 36) = (k + 4)3^{k+2} (2). Conclusion (1).
5. Particular k = 1.2k − 500, k = 2500 (1). Pₙ = C(1.2)ⁿ + 2500, C = −500 (1). Pₙ = 2500 − 500(1.2)ⁿ (1). Becomes negative after about 9 years (1.2ⁿ = 5, n ≈ 8.8), so the fish die out; the model fails once P < 0 (2).
6. Terms 2, 1.75, 1.7321... (1). L = (L + 3/L)/2 gives L² = 3 (1), L = √3 (1).
