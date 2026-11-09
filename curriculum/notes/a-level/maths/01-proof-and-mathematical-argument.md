---
level: A-level
subject: Mathematics
topic: "Proof, mathematical argument, problem solving and modelling"
as_content: "Proof by deduction, exhaustion and counter example, and the overarching themes, are in AS. Proof by contradiction is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["OT1.1", "OT1.2", "OT1.3", "OT1.4", "OT1.5", "OT2.1", "OT2.2", "OT2.3", "OT2.4", "OT2.5", "OT2.6", "OT2.7", "OT3.1", "OT3.2", "OT3.3", "OT3.4", "OT3.5", "A1"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P1.1"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.01a", "1.01b", "1.01c", "1.01d"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mp1", "Mp2", "Mp3", "Ma1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Proof, mathematical argument, problem solving and modelling

This file covers the four methods of proof, the language of logic and sets, and the three overarching themes that every A-level paper assesses: argument and proof (OT1), problem solving (OT2) and modelling (OT3).

## Overview

Proof by deduction, proof by exhaustion and disproof by counter example are AS content. Proof by contradiction, including the two classic proofs (the square root of 2 is irrational, and there are infinitely many primes), is A-level only.

The overarching themes are not a separate topic: they are skills used in every question. They appear here so each one has a home.

### Board differences

- AQA 7357: A1 for proof, plus the overarching themes OT1.1 to OT3.5 written into the spec.
- Edexcel 9MA0: Pure topic 1.1. The overarching themes are in the DfE content, not numbered in the Edexcel content table.
- OCR H240: 1.01a to 1.01d. 1.01b names the logical connectives (implies, is implied by, if and only if) explicitly.
- OCR MEI H640: Mp1 to Mp3 for proof. Ma1 (algebraic vocabulary and notation) is covered here and in file 02.

## OT1 Mathematical argument, language and proof

*Refs: AQA OT1.1 to OT1.5. Level: AS & A.*

### What you need to know

- Present a mathematical argument as a chain of steps, each following from the last.
- Use the symbols ⇒ (implies), ⇐ (is implied by) and ⇔ (if and only if) correctly.
- Use set notation: ∈, ∉, ⊂, ∪, ∩, ∅, {x : ...}, and the sets ℕ, ℤ, ℚ, ℝ.
- Know what a function is: a rule that gives exactly one output for each input in its domain. The set of outputs is the range.
- Read an argument and find the step where it goes wrong.

### Explained

**Implication.** "P ⇒ Q" means: whenever P is true, Q is true. It does not say Q ⇒ P. For example, x = 3 ⇒ x² = 9 is true, but x² = 9 ⇒ x = 3 is false, because x could be −3. When both directions hold you write P ⇔ Q, read "P if and only if Q" (sometimes "iff").

**Equals versus identical.** "=" says two things are equal for the values in question. "≡" says they are equal for every value of the variable: (x + 1)² ≡ x² + 2x + 1.

**Set notation.** Solution sets are often written in set notation:

```latex
\{x : x < -2\} \cup \{x : x > 5\} \qquad \{x : -1 \le x \le 4\}
```

The union ∪ means "or" (either set), and the intersection ∩ means "and" (both at once).

**Number sets.**

| Symbol | Set | Examples |
| --- | --- | --- |
| ℕ | natural numbers | 1, 2, 3, ... |
| ℤ | integers | ..., −2, −1, 0, 1, 2, ... |
| ℚ | rational numbers, p/q with p, q integers and q ≠ 0 | 3/4, −5, 0.1 |
| ℝ | real numbers | all of the above, plus √2, π, e |

**Critiquing an argument.** Common faults in a "proof": dividing by something that might be zero, squaring both sides (which can create false solutions), assuming the result you are trying to prove, or checking a few cases and claiming the result for all.

### Worked example

A student "proves" that 1 = 2 as follows. Let a = b. Then a² = ab, so a² − b² = ab − b², so (a + b)(a − b) = b(a − b), so a + b = b, so 2b = b, so 2 = 1. Find the error.

1. Since a = b, the factor a − b equals 0.
2. Going from (a + b)(a − b) = b(a − b) to a + b = b divides both sides by a − b, which is division by zero. That step is invalid.

Which of ⇒, ⇐, ⇔ goes between "n is a multiple of 6" and "n is even"?

1. If n is a multiple of 6, n = 6k = 2(3k), which is even. So the first ⇒ the second.
2. 4 is even but not a multiple of 6, so the reverse fails.
3. Answer: n is a multiple of 6 ⇒ n is even.

### Common mistakes

- Writing ⇔ when only one direction is true.
- Using "=" between lines of working that are not equal, for example writing "x² − 4 = 0 = x = 2".
- Forgetting that a function must give one output per input: y = ±√x is not a function.

## OT2 Mathematical problem solving

*Refs: AQA OT2.1 to OT2.7. Level: AS & A.*

### What you need to know

- Spot the structure of a problem: which topic it really is, and what can be simplified.
- Build an extended argument for an unstructured problem (one with no step-by-step parts).
- Interpret answers in the context of the original problem.
- Know that many problems cannot be solved exactly and need numerical methods (see file 17).
- Judge how accurate and reliable an answer is.
- Follow the problem solving cycle: specify the problem, collect information, process and represent, interpret, and then go round again if needed.
- Read information from diagrams and draw your own.

### Explained

An unstructured question gives you a goal and no route. A reliable approach:

1. Write down what you know and what you want, in symbols.
2. Draw a diagram. Label it.
3. Ask which tools link the two: an equation, a formula, a known result.
4. Work forwards from what you know and backwards from what you want until the two meet.
5. Check the answer: is it the right size, the right sign, in the right units? Does it answer the question that was asked?

### Worked example

A rectangle has perimeter 40 cm. Show that its area cannot exceed 100 cm².

1. Let the sides be x and 20 − x (half the perimeter is 20).
2. Area A = x(20 − x) = 20x − x².
3. Complete the square: A = 100 − (x − 10)².
4. (x − 10)² ≥ 0 for all real x, so A ≤ 100, with equality when x = 10 (a square).

Two numbers add to 12 and their squares add to 80. Find them.

1. x + y = 12 and x² + y² = 80.
2. (x + y)² = x² + 2xy + y², so 144 = 80 + 2xy and xy = 32.
3. The numbers are roots of t² − 12t + 32 = 0, so (t − 4)(t − 8) = 0.
4. The numbers are 4 and 8.

### Common mistakes

- Giving a number without saying what it means in context (for example "x = 10" instead of "the rectangle is a 10 cm square").
- Not stating that an answer from a numerical method is approximate.

## OT3 Mathematical modelling

*Refs: AQA OT3.1 to OT3.5. Level: AS & A.*

### What you need to know

- Turn a real situation into a mathematical model, making simplifying assumptions.
- Use the model with suitable inputs and interpret its outputs in context.
- Refine a model when its outputs do not match reality.
- State and criticise modelling assumptions.

### Explained

A model is a simplified mathematical description. In mechanics, a car might be modelled as a particle (no size), a road as smooth (no friction), a rope as light and inextensible. In statistics, the number of faulty items in a batch might be modelled with a binomial distribution, which assumes each item is faulty independently with the same probability. In pure maths, a population might be modelled by P = P₀e^{kt}.

Each assumption has a cost. Ask two questions:

1. What does the assumption let me do? (For example, "particle" means I can ignore rotation.)
2. What does it ignore, and how would the answer change if I removed it? (For example, ignoring air resistance makes a ball travel further than it really would.)

Refining means changing an assumption, or adding a term, and checking whether the new model fits the data better.

### Worked example

A model for the value V (in pounds) of a car t years after purchase is V = 18 000e^{−0.15t}.

(a) Find the value after 4 years. V = 18 000e^{−0.6} = 9878.83..., about £9880.

(b) Give one criticism of the model. It predicts the car is never worth £0 and is still worth over £400 after 25 years, while a very old car may be scrapped (worth nothing) or become a collectable (worth more). It also assumes the same percentage loss every year, whereas cars often lose more value in the first year.

(c) Suggest a refinement. Add a constant floor, V = 16 500e^{−0.15t} + 1500, so the value levels off at a scrap or trade-in value of £1500 (the starting value is still £18 000).

### Common mistakes

- Listing an assumption without saying how it affects the answer.
- Criticising a model for something it was never meant to include.

## A1 Proof

*Refs: AQA A1 · Edexcel 1.1 · OCR 1.01a, 1.01b, 1.01c, 1.01d · MEI Mp1, Mp2, Mp3. Level: AS & A (part A-level only).*

### What you need to know

- Proof by deduction: start from known facts or definitions and reach the result by logical steps.
- Proof by exhaustion: split the possibilities into a finite number of cases and check every one.
- Disproof by counter example: one example where the statement fails is enough to show it is false.
- (A-level only) Proof by contradiction: assume the statement is false and show this leads to something impossible. This includes proving √2 is irrational and that there are infinitely many primes, and applying the method to new statements.

### Explained

**Useful forms for integers.** Let n be any integer.

| Type of number | Form |
| --- | --- |
| even | 2n |
| odd | 2n + 1 |
| consecutive integers | n, n + 1, n + 2 |
| consecutive odd numbers | 2n + 1, 2n + 3 |
| multiple of k | kn |
| remainder r on division by k | kn + r |

**Deduction.** Write the general case using these forms, then rearrange until the result is clear. End with a sentence that states what has been shown.

**Exhaustion.** Useful when there are only a few cases, or when every integer falls into one of a few types (even or odd; remainder 0, 1 or 2 on division by 3).

**Counter example.** To disprove "for all x, P(x)", find one x that makes P(x) false. Show the working that it is false.

**Contradiction (A-level only).** Write "Assume, for contradiction, that ..." with the negation of the statement. Reason until you reach a statement that contradicts the assumption or a known fact. Conclude "this is a contradiction, so the original statement is true."

The negation of "for all x, P(x)" is "there is some x for which P(x) is false". The negation of "there is no largest prime" is "there is a largest prime".

### Worked example

**Deduction.** Prove that the sum of any three consecutive integers is a multiple of 3.

1. Let the integers be n, n + 1, n + 2 for some integer n.
2. Sum = 3n + 3 = 3(n + 1).
3. n + 1 is an integer, so the sum is a multiple of 3.

**Deduction.** Prove that the difference between the squares of two consecutive odd numbers is a multiple of 8.

1. Let the numbers be 2n + 1 and 2n + 3.
2. (2n + 3)² − (2n + 1)² = (4n² + 12n + 9) − (4n² + 4n + 1) = 8n + 8 = 8(n + 1).
3. This is 8 times an integer, so it is a multiple of 8.

**Exhaustion.** Prove that n² + n is even for every integer n.

1. Case 1, n even: n = 2k. n² + n = 4k² + 2k = 2(2k² + k), which is even.
2. Case 2, n odd: n = 2k + 1. n² + n = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1), which is even.
3. Every integer is even or odd, so n² + n is always even.

**Exhaustion.** Prove that no square number ends in the digit 7.

1. The last digit of n² depends only on the last digit of n.
2. Last digits 0 to 9 give squares ending in 0, 1, 4, 9, 6, 5, 6, 9, 4, 1.
3. None of these is 7, so no square number ends in 7.

**Counter example.** Show that "2ⁿ + 1 is prime for every positive integer n" is false.

1. n = 3: 2³ + 1 = 9 = 3 × 3, which is not prime.
2. So the statement is false.

**Completing the square in a proof.** Prove that x² − 6x + 11 > 0 for all real x.

1. x² − 6x + 11 = (x − 3)² + 2.
2. (x − 3)² ≥ 0, so (x − 3)² + 2 ≥ 2 > 0.

**(A-level only) Contradiction: √2 is irrational.**

1. Assume, for contradiction, that √2 is rational. Then √2 = a/b where a and b are integers with no common factor and b ≠ 0.
2. Square: 2 = a²/b², so a² = 2b². So a² is even, which means a is even (an odd number squared is odd).
3. Write a = 2c. Then 4c² = 2b², so b² = 2c², so b² is even and b is even.
4. Now a and b are both even, so they share the factor 2. This contradicts "no common factor".
5. So √2 is irrational.

**(A-level only) Contradiction: there are infinitely many primes.**

1. Assume, for contradiction, that there are finitely many primes, p₁, p₂, ..., pₙ.
2. Let N = p₁p₂...pₙ + 1.
3. Dividing N by any pᵢ leaves remainder 1, so no pᵢ is a factor of N.
4. N > 1, so N has at least one prime factor. That prime is not in the list. This contradicts the assumption that the list contains every prime.
5. So there are infinitely many primes.

Note: N itself need not be prime (2 × 3 × 5 × 7 × 11 × 13 + 1 = 30 031 = 59 × 509). The argument only needs N to have a prime factor missing from the list.

**(A-level only) Contradiction applied to a new statement.** Prove that if n² is odd then n is odd, for integer n.

1. Assume, for contradiction, that n² is odd and n is even.
2. n = 2k, so n² = 4k² = 2(2k²), which is even.
3. This contradicts n² being odd. So n is odd.

**(A-level only)** Prove that there are no positive integers x and y with x² − y² = 1.

1. Assume there are. Then (x − y)(x + y) = 1.
2. x + y is a positive integer, and the product is 1, so x + y = 1 and x − y = 1.
3. Then x = 1 and y = 0, but y must be positive. Contradiction.

### Common mistakes

- Proving a general statement by checking examples. Examples never prove "for all"; they can only disprove.
- Using the same letter for two different numbers: "let the two odd numbers be 2n + 1 and 2n + 1" proves a result only about equal numbers. Use 2m + 1 and 2n + 1.
- Missing a case in exhaustion, for example checking positive integers but not zero or negatives.
- Not writing a concluding sentence.
- (A-level only) Assuming the wrong negation at the start of a contradiction proof.
- (A-level only) In the primes proof, claiming N must be prime.

## Check questions

1. Insert ⇒, ⇐ or ⇔ between "x > 3" and "x² > 9" (x real). Explain your choice. [2 marks]
2. Prove that the sum of any two odd numbers is even. [2 marks]
3. Prove that the product of any two consecutive integers is even. [3 marks]
4. Find a counter example to show that "if a > b then a² > b²" is false for real a and b. [2 marks]
5. Prove by exhaustion that for every integer n, n³ − n is a multiple of 3. [4 marks]
6. Prove that 4x² − 12x + 10 > 0 for all real x. [3 marks]
7. Explain the error in this argument: "x² = 4x, so dividing by x gives x = 4. So the only solution is x = 4." [2 marks]
8. A student says: "For any prime p, p² + 2 is not prime." Prove or disprove this. [2 marks]
9. (A-level only) Prove by contradiction that √3 is irrational. You may use the fact that if 3 divides a² then 3 divides a. [5 marks]
10. (A-level only) Prove by contradiction that, for any integer n, if n² is not a multiple of 4 then n is odd. [3 marks]
11. A model for the height h metres of a ball t seconds after it is thrown up is h = 1.5 + 12t − 4.9t². State one modelling assumption and one way the model could be refined. [2 marks]

## Mark scheme

1. x > 3 ⇒ x² > 9 (1); reverse fails, e.g. x = −4 gives x² = 16 > 9 but x < 3 (1).
2. Let the numbers be 2m + 1 and 2n + 1 (1); sum = 2m + 2n + 2 = 2(m + n + 1), which is even (1).
3. Let the integers be n and n + 1 (1); one of them is even, or exhaustion: n = 2k gives 2k(2k + 1), n = 2k + 1 gives (2k + 1)(2k + 2) = 2(2k + 1)(k + 1) (1); both even, conclusion (1).
4. For example a = 1, b = −3 (1); a > b but a² = 1 < 9 = b² (1).
5. n³ − n = (n − 1)n(n + 1) or cases by remainder mod 3 (1); n = 3k gives 3k(9k² − 1) (1); n = 3k + 1 gives (3k + 1)(9k² + 6k) = 3(3k + 1)(3k² + 2k) (1); n = 3k + 2 gives (3k + 2)(3k + 1)(3k + 3), which has factor 3, and conclusion (1).
6. 4(x² − 3x) + 10 (1); = 4(x − 1.5)² + 1 (1); square ≥ 0 so expression ≥ 1 > 0 (1).
7. Dividing by x assumes x ≠ 0 (1); x = 0 is also a solution (1).
8. Disprove: p = 3 gives 11, which is prime (1); so the statement is false (1).
9. Assume √3 = a/b in lowest terms (1); a² = 3b², so 3 divides a² and so a (1); a = 3c gives 9c² = 3b², b² = 3c² (1); so 3 divides b (1); a and b share factor 3, contradiction, so √3 irrational (1).
10. Assume n² is not a multiple of 4 and n is even (1); n = 2k, n² = 4k², a multiple of 4 (1); contradiction, so n is odd (1).
11. Assumption, e.g. no air resistance, or ball modelled as a particle (1); refinement, e.g. include air resistance, or use a more accurate value of g (1).
