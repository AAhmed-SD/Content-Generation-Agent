---
level: A-level
subject: Further Mathematics
topic: "Proof by induction"
as_content: "Induction for sums of series, matrix powers and given nth terms is AS. Divisibility, de Moivre and other harder contexts are A-level only on OCR and MEI; AQA and Edexcel list one statement for both."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["OT1.1", "OT1.2", "OT1.3", "OT1.4", "OT1.5", "OT2.1", "OT2.2", "OT2.3", "OT2.4", "OT2.5", "OT2.6", "OT2.7", "OT3.1", "OT3.2", "OT3.3", "OT3.4", "OT3.5", "A1"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP1.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.01a", "4.01b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pp4", "Pp5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Proof by induction

This file covers proof by mathematical induction: sums of series, divisibility, powers of matrices, terms of sequences, and harder results such as inequalities and derivatives. It also sets out the overarching themes (argument, problem solving and modelling) that AQA lists as OT1 to OT3.

## Overview

Induction proves that a statement P(n) is true for every integer n from some starting value. It builds on proof by deduction, exhaustion, counter-example and contradiction from A-level Maths ([../maths/01-proof-and-mathematical-argument.md](../maths/01-proof-and-mathematical-argument.md)).

### Board differences

- AQA A1 and Edexcel CP1.1 name the contexts: sums of series, divisibility and powers of matrices. Both are one statement for AS and A-level.
- OCR 4.01a (Stage 1) is induction for given results; 4.01b (Stage 2) adds "more demanding" proofs, including making a conjecture first and then proving it.
- MEI Pp4 (AS) limits induction to the nth term of a sequence, the sum of a series and the nth power of a matrix. Pp5 (A-level) opens it to any context, such as divisibility and de Moivre's theorem. MEI says the result to be proved will always be given.
- Recurrence relation proofs (Edexcel FP2 6.3, OCR 8.01b) are in [26-sequences-and-recurrence-relations.md](26-sequences-and-recurrence-relations.md). De Moivre's theorem is proved in [04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md](04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md).

## OT1 to OT3 Argument, problem solving and modelling

*Refs: AQA OT1.1 to OT3.5. Level: AS & A.*

### What you need to know

- Present a chain of reasoning with correct notation (⇒, ⇔, ∴, ∈, set notation) and say clearly what has been shown.
- Critique a given argument: find the step that fails, or a missing case.
- Solve problems that are not broken into parts: decide which technique to use, and check the answer makes sense.
- Model a situation: state assumptions, use the model, interpret the output in context, and refine the model when the output disagrees with reality.

### Explained

These themes run through every Further Maths topic rather than being a topic of their own. In practice they mean three habits.

1. **Say what you are proving and how.** Start a proof with the statement, end with a conclusion that matches it.
2. **Check the structure.** Before calculating, ask what kind of problem it is: a polynomial whose roots you need (file 07), a system of equations (file 06), a rate of change (files 16 and 17).
3. **Interpret.** A modelling answer is not finished until it is a sentence about the situation, with units and a comment on whether it is sensible.

### Worked example

Critique this "proof" that every 2 × 2 matrix A with A² = I is I or −I: "A² − I = 0, so (A − I)(A + I) = 0, so A − I = 0 or A + I = 0."

1. For matrices, a product can be the zero matrix when neither factor is zero.
2. Counter-example: A = [[1, 0], [0, −1]] gives A² = I but A is neither I nor −I.
3. The faulty step is "XY = 0 implies X = 0 or Y = 0", which holds for numbers but not matrices.

### Common mistakes

- Treating matrices like numbers (cancelling or dividing).
- Ending a modelling question with a number and no comment on its meaning.

## A1 The method of induction and sums of series

*Refs: AQA A1 · Edexcel CP1.1 · OCR 4.01a, 4.01b · MEI Pp4, Pp5. Level: AS & A.*

### What you need to know

- The four parts of an induction proof: basis, assumption, inductive step, conclusion.
- How to prove a formula for a finite sum, such as Σr³ = ¼n²(n + 1)².

### Explained

Think of a row of dominoes. If the first falls, and each falling domino knocks over the next, all of them fall.

1. **Basis.** Show P(1) is true (or P(n₀) for the first value in the question).
2. **Assumption.** Assume P(k) is true for some integer k ≥ 1.
3. **Inductive step.** Use the assumption to show P(k + 1) is true.
4. **Conclusion.** Write it in full, for example: "P(1) is true, and if P(k) is true then P(k + 1) is true. Hence, by mathematical induction, P(n) is true for all positive integers n."

For sums, the key move is

```latex
\sum_{r=1}^{k+1} f(r) = \sum_{r=1}^{k} f(r) + f(k+1)
```

then replace the first sum with the assumed formula and simplify towards the formula with n = k + 1. Write down the target first, so you know what you are aiming at. Take out common factors early rather than expanding everything.

### Worked example

Prove that Σ_{r=1}^{n} r(r + 2) = n(n + 1)(2n + 7)/6 for all positive integers n.

1. Basis, n = 1: left side 1 × 3 = 3. Right side 1 × 2 × 9/6 = 3. True.
2. Assume Σ_{r=1}^{k} r(r + 2) = k(k + 1)(2k + 7)/6.
3. Target: (k + 1)(k + 2)(2k + 9)/6.
4. Σ_{r=1}^{k+1} r(r + 2) = k(k + 1)(2k + 7)/6 + (k + 1)(k + 3)
   = (k + 1)[k(2k + 7) + 6(k + 3)]/6
   = (k + 1)(2k² + 13k + 18)/6
   = (k + 1)(k + 2)(2k + 9)/6.
5. This is the formula with n = k + 1. Conclusion as above.

Prove that Σ_{r=1}^{n} 1/[r(r + 1)] = n/(n + 1).

1. n = 1: 1/2 on both sides.
2. Assume true for n = k. Then the sum to k + 1 is k/(k + 1) + 1/[(k + 1)(k + 2)].
3. = [k(k + 2) + 1]/[(k + 1)(k + 2)] = (k + 1)²/[(k + 1)(k + 2)] = (k + 1)/(k + 2).
4. True for n = k + 1, so true for all n ≥ 1.

Prove that Σ_{r=1}^{n} r × 2^r = (n − 1)2^{n+1} + 2.

1. n = 1: 2 = 0 + 2. True.
2. Assume true for n = k. Sum to k + 1 = (k − 1)2^{k+1} + 2 + (k + 1)2^{k+1} = 2k × 2^{k+1} + 2 = k × 2^{k+2} + 2.
3. Target ((k + 1) − 1)2^{k+2} + 2 = k × 2^{k+2} + 2. Matches, so true for all n ≥ 1.

### Common mistakes

- Writing "assume true for n = k" and then using it as if it were proved for all k. The assumption is only a hypothesis.
- Checking n = 1 and n = 2 numerically and calling that a proof.
- A weak conclusion such as "so it works". The conclusion must state the logic.

## A1 Divisibility

*Refs: AQA A1 · Edexcel CP1.1 · OCR 4.01b · MEI Pp5. Level: A-level only on OCR and MEI; AQA and Edexcel do not separate.*

### What you need to know

- Prove statements such as "7ⁿ − 1 is divisible by 6 for all n ≥ 1".

### Explained

Let f(n) be the expression. Two standard approaches:

- **Difference method.** Show f(k + 1) − f(k) (or f(k + 1) − m f(k) for a well-chosen m) is a multiple of the divisor. Then f(k + 1) = f(k) + (multiple), and both terms on the right are multiples.
- **Substitution method.** From the assumption write f(k) = d × M for an integer M, rearrange to get one power in terms of M, and substitute into f(k + 1).

### Worked example

Prove that 7ⁿ − 1 is divisible by 6 for all positive integers n.

1. n = 1: 6, divisible by 6.
2. Assume 7ᵏ − 1 = 6M for some integer M.
3. 7^{k+1} − 1 = 7 × 7ᵏ − 1 = 7(6M + 1) − 1 = 42M + 6 = 6(7M + 1).
4. Divisible by 6, so true for all n ≥ 1.

Prove that 3^{2n} + 11 is divisible by 4 for all n ≥ 1.

1. f(1) = 9 + 11 = 20 = 4 × 5.
2. f(k + 1) − f(k) = 9 × 3^{2k} − 3^{2k} = 8 × 3^{2k}, a multiple of 4.
3. So f(k + 1) = f(k) + 8 × 3^{2k}. If f(k) is a multiple of 4, so is f(k + 1).
4. True for n = 1 and true for k + 1 whenever true for k, so true for all n ≥ 1.

Prove that n³ + 5n is divisible by 6 for all n ≥ 1.

1. f(1) = 6.
2. f(k + 1) = (k + 1)³ + 5(k + 1) = k³ + 3k² + 3k + 1 + 5k + 5 = (k³ + 5k) + 3k(k + 1) + 6.
3. k³ + 5k is a multiple of 6 by assumption. k(k + 1) is a product of consecutive integers, so it is even, and 3k(k + 1) is a multiple of 6. 6 is a multiple of 6.
4. So f(k + 1) is divisible by 6. By induction, true for all n ≥ 1.

### Common mistakes

- Forgetting to say why each part of the sum is divisible.
- Writing f(k) = 6M without saying M is an integer.

## A1 Powers of matrices

*Refs: AQA A1 · Edexcel CP1.1 · OCR 4.01a · MEI Pp4. Level: AS & A.*

### What you need to know

- Prove a formula for Mⁿ, using M^{k+1} = MᵏM (or MMᵏ).

### Explained

Assume the formula for Mᵏ, multiply by M once, and simplify each entry. Matrix multiplication is not commutative in general, but M commutes with its own powers, so either order works. Matrix multiplication is in [05-matrices-operations-and-transformations.md](05-matrices-operations-and-transformations.md).

### Worked example

Prove that for M = [[3, −2], [1, 0]], Mⁿ = [[2^{n+1} − 1, 2 − 2^{n+1}], [2ⁿ − 1, 2 − 2ⁿ]] for all n ≥ 1.

1. n = 1: [[4 − 1, 2 − 4], [2 − 1, 2 − 2]] = [[3, −2], [1, 0]] = M. True.
2. Assume Mᵏ = [[2^{k+1} − 1, 2 − 2^{k+1}], [2ᵏ − 1, 2 − 2ᵏ]].
3. M^{k+1} = MᵏM. Top left: 3(2^{k+1} − 1) + (2 − 2^{k+1}) = 2 × 2^{k+1} − 1 = 2^{k+2} − 1.
   Top right: −2(2^{k+1} − 1) + 0 = 2 − 2^{k+2}.
   Bottom left: 3(2ᵏ − 1) + 2 − 2ᵏ = 2^{k+1} − 1.
   Bottom right: −2(2ᵏ − 1) = 2 − 2^{k+1}.
4. This is the formula with n = k + 1, so true for all n ≥ 1.

Prove that [[1, a], [0, 1]]ⁿ = [[1, na], [0, 1]].

1. n = 1: true.
2. Assume true for k. [[1, ka], [0, 1]][[1, a], [0, 1]] = [[1, a + ka], [0, 1]] = [[1, (k + 1)a], [0, 1]].
3. True for all n ≥ 1. (Geometrically: n shears of size a make a shear of size na.)

### Common mistakes

- Multiplying in a way that does not match your assumption, then mixing the order.
- Only checking one entry.

## A1 Sequences, inequalities and derivatives

*Refs: AQA A1 · Edexcel CP1.1 · OCR 4.01b · MEI Pp4, Pp5. Level: nth term of a sequence AS; the rest A-level only.*

### What you need to know

- Prove a formula for the nth term of a sequence defined by a recurrence.
- (A-level only) Prove inequalities and results about nth derivatives, and conjecture a formula from the first few cases before proving it (OCR 4.01b).

### Explained

For a sequence u_{n+1} = g(uₙ), assume uₖ equals the formula and substitute into the recurrence to get u_{k+1}.

For an inequality, the inductive step usually needs one extra fact. To show f(k + 1) > g(k + 1), use the assumption f(k) > g(k), then show the remaining gap is positive.

For derivatives, differentiate the assumed formula for the kth derivative once to get the (k + 1)th.

### Worked example

A sequence has u₁ = 2 and u_{n+1} = 3uₙ − 2. Prove that uₙ = 3^{n−1} + 1.

1. n = 1: 3⁰ + 1 = 2. True.
2. Assume uₖ = 3^{k−1} + 1. Then u_{k+1} = 3(3^{k−1} + 1) − 2 = 3ᵏ + 1, the formula for n = k + 1.
3. True for all n ≥ 1.

(A-level only) Prove that 2ⁿ > n² for all integers n ≥ 5.

1. n = 5: 32 > 25. True.
2. Assume 2ᵏ > k² for some k ≥ 5. Then 2^{k+1} = 2 × 2ᵏ > 2k².
3. Need 2k² ≥ (k + 1)², that is k² − 2k − 1 ≥ 0, which holds for k ≥ 3 (k² − 2k − 1 = (k − 1)² − 2 ≥ 2 when k ≥ 3).
4. So 2^{k+1} > (k + 1)². True for all n ≥ 5.

(A-level only) Let y = xeˣ. Find the first three derivatives, conjecture dⁿy/dxⁿ, and prove it.

1. y′ = (x + 1)eˣ, y″ = (x + 2)eˣ, y‴ = (x + 3)eˣ. Conjecture: dⁿy/dxⁿ = (x + n)eˣ.
2. n = 1: true.
3. Assume dᵏy/dxᵏ = (x + k)eˣ. Differentiating: eˣ + (x + k)eˣ = (x + k + 1)eˣ.
4. True for all n ≥ 1.

### Common mistakes

- Starting at n = 1 when the statement only holds from n = 5.
- In inequalities, writing a chain like 2^{k+1} > 2k² > (k + 1)² without justifying the second step.

## Check questions

1. Prove by induction that Σ_{r=1}^{n} (2r − 1)² = n(2n − 1)(2n + 1)/3 for all positive integers n. [5 marks]
2. Prove by induction that 5ⁿ + 3 is divisible by 4 for all positive integers n. [4 marks]
3. M = [[2, 1], [0, 1]]. Prove by induction that Mⁿ = [[2ⁿ, 2ⁿ − 1], [0, 1]] for all positive integers n. [5 marks]
4. A sequence is defined by u₁ = 1, u_{n+1} = 2uₙ + 3. Prove that uₙ = 2^{n+1} − 3. [4 marks]
5. Prove by induction that 4ⁿ + 6n − 1 is divisible by 9 for all positive integers n. [5 marks]
6. (A-level only) Prove that 3ⁿ > 2n + 1 for all integers n ≥ 2. [4 marks]
7. (A-level only) f(x) = e^{2x}. Prove by induction that the nth derivative of x e^{2x} is 2^{n−1}(2x + n)e^{2x}. [5 marks]
8. A student claims: "Since n² + n + 41 is prime for n = 1, 2, ..., 10, it is prime for every positive integer n." Explain why this is not a proof, and show the claim is false. [3 marks]

## Mark scheme

1. Basis: 1 = 1 × 1 × 3/3 (1). Assume for k; add (2k + 1)² (1). Take out (2k + 1)/3: (2k + 1)[k(2k − 1) + 3(2k + 1)]/3 (1) = (2k + 1)(2k² + 5k + 3)/3 = (k + 1)(2k + 1)(2k + 3)/3 (1). Correct conclusion (1).
2. n = 1: 8 (1). Assume 5ᵏ + 3 = 4M (1). 5^{k+1} + 3 = 5(4M − 3) + 3 = 20M − 12 = 4(5M − 3) (1). Conclusion (1).
3. n = 1 gives M (1). Assume for k (1). MᵏM = [[2^{k+1}, 2ᵏ + 2ᵏ − 1], [0, 1]] (2) = [[2^{k+1}, 2^{k+1} − 1], [0, 1]] and conclusion (1).
4. u₁ = 4 − 3 = 1 (1). Assume uₖ = 2^{k+1} − 3 (1). u_{k+1} = 2^{k+2} − 6 + 3 = 2^{k+2} − 3 (1). Conclusion (1).
5. f(1) = 9 (1). f(k + 1) − 4f(k) = 4^{k+1} + 6k + 5 − 4^{k+1} − 24k + 4 = 9 − 18k (2). So f(k + 1) = 4f(k) + 9(1 − 2k), a multiple of 9 (1). Conclusion (1).
6. n = 2: 9 > 5 (1). Assume 3ᵏ > 2k + 1; 3^{k+1} > 6k + 3 (1). 6k + 3 − (2k + 3) = 4k > 0, so 3^{k+1} > 2(k + 1) + 1 (1). Conclusion (1).
7. n = 1: (1 + 2x)e^{2x}, matches 2⁰(2x + 1)e^{2x} (1). Assume kth derivative 2^{k−1}(2x + k)e^{2x} (1). Differentiate: 2^{k−1}[2e^{2x} + 2(2x + k)e^{2x}] (1) = 2ᵏ(2x + k + 1)e^{2x} (1). Conclusion (1).
8. Checking cases does not show it holds for all n; there is no inductive step (1). n = 40: 1600 + 40 + 41 = 1681 = 41² (1), which is not prime (1).
