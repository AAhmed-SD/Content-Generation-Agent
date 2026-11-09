---
level: GCSE
subject: Mathematics
topic: "Algebra: equations and inequalities"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["A17", "A18", "A19", "A20", "A21", "A22"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["A17", "A18", "A19", "A20", "A21", "A22"]
  - board: OCR
    code: "J560"
    spec_refs: ["6.02a", "6.03a", "6.03b", "6.03c", "6.03d", "6.03e", "6.04a", "6.04b"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FA14", "FA15", "FA16", "FA17", "FA18", "HA17", "HA18", "HA19", "HA20", "HA21", "HA22"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Algebra: equations and inequalities

This file covers solving linear equations, quadratic equations (by factorising, completing the square, the formula and graphs), simultaneous equations, iteration, forming equations from a situation, and solving and representing inequalities.

## Overview

Linear equations, quadratics solved by factorising (x² + bx + c), linear simultaneous equations, forming equations and linear inequalities on a number line are on both tiers. Higher only: quadratics needing rearrangement or with a ≠ 1, completing the square and the quadratic formula, linear/quadratic simultaneous equations, iteration, quadratic inequalities, inequalities in two variables, set notation and graphical regions.

### Board differences

- AQA and Edexcel: A17 to A22.
- OCR J560: 6.02a (formulating expressions), 6.03a to 6.03e (linear, quadratic and simultaneous equations, graphical and iterative solutions) and 6.04a and 6.04b (inequalities in one and two variables).
- Eduqas C300QS: on Foundation, FA14 (linear), FA15 (quadratics of the form x² + bx + c only, not needing rearrangement), FA16 (linear simultaneous), FA17 (forming equations) and FA18 (linear inequalities). On Higher, HA17 to HA22. Eduqas HA20 names trial and improvement, decimal search and interval bisection as iterative methods alongside iteration formulae.

## A17 Linear equations

*Refs: AQA A17 · Edexcel A17 · OCR 6.03a, 6.03d · Eduqas FA14, HA17. Tier: F & H.*

### What you need to know

- Solve linear equations in one unknown, including those with the unknown on both sides, with brackets, and with fractions.

### Explained

An equation is a balance: whatever you do to one side, do to the other. Aim to get the unknown on its own.

1. Expand any brackets.
2. Clear fractions by multiplying every term by the common denominator.
3. Collect the unknown on the side where it has the larger coefficient (to avoid negatives).
4. Divide to finish.

Check by substituting your answer back in.

### Worked example

Solve 5(x − 2) = 3x + 7.

1. 5x − 10 = 3x + 7.
2. 2x = 17.
3. x = 8.5.

Solve (2x + 1)/3 − (x − 2)/4 = 2.

1. Multiply every term by 12: 4(2x + 1) − 3(x − 2) = 24.
2. 8x + 4 − 3x + 6 = 24.
3. 5x + 10 = 24, so 5x = 14, x = 2.8.

### Common mistakes

- Multiplying only some terms by the denominator.
- Sign errors: −3(x − 2) = −3x + 6.
- Moving a term across and forgetting to change its sign.

## A18 Quadratic equations

*Refs: AQA A18 · Edexcel A18 · OCR 6.03b, 6.03d · Eduqas FA15, HA18. Tier: F & H (part Higher only).*

### What you need to know

- Solve quadratic equations by factorising.
- Find approximate solutions from a graph: the roots of ax² + bx + c = 0 are where y = ax² + bx + c crosses the x-axis.
- (HT only) Solve quadratics that need rearranging first, and those where a ≠ 1.
- (HT only) Solve by completing the square.
- (HT only) Solve with the quadratic formula:

```latex
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
```

### Explained

Make one side zero, factorise, then set each bracket to zero. If (x − 3)(x + 5) = 0, then x − 3 = 0 or x + 5 = 0, so x = 3 or x = −5.

A quadratic has at most two solutions. Difference of two squares gives a quick pair: x² − 16 = 0 means x = 4 or x = −4.

(HT only) Choosing a method:

- Factorises easily: factorise.
- Asks for "exact" or surd answers: complete the square or use the formula.
- Asks for a given number of decimal places: use the formula.

(HT only) The value b² − 4ac (the discriminant) tells you how many solutions there are: positive gives two, zero gives one (repeated), negative gives none (the graph does not cross the x-axis).

### Worked example

Solve x² − 3x − 28 = 0.

1. (x − 7)(x + 4) = 0.
2. x = 7 or x = −4.

(HT only) Solve 2x² + 5x = 12.

1. Rearrange: 2x² + 5x − 12 = 0.
2. Factorise: ac = −24; 8 and −3. 2x² + 8x − 3x − 12 = 2x(x + 4) − 3(x + 4) = (2x − 3)(x + 4).
3. x = 1.5 or x = −4.

(HT only) Solve 3x² − 4x − 2 = 0. Give your answers to 2 decimal places.

1. a = 3, b = −4, c = −2.
2. b² − 4ac = 16 + 24 = 40.
3. x = (4 ± √40)/6.
4. x = 1.72 or x = −0.39.

(HT only) Solve x² + 6x + 4 = 0 by completing the square. Give exact answers.

1. (x + 3)² − 9 + 4 = 0, so (x + 3)² = 5.
2. x + 3 = ±√5.
3. x = −3 + √5 or x = −3 − √5.

### Common mistakes

- Solving before making one side zero: x(x + 2) = 8 does not mean x = 8.
- Dividing both sides by x and losing the solution x = 0, as in x² = 5x (solutions 0 and 5).
- (HT only) Getting −b wrong when b is negative, and forgetting that the whole top is divided by 2a.
- (HT only) Giving only the positive square root after completing the square.

## A19 Simultaneous equations

*Refs: AQA A19 · Edexcel A19 · OCR 6.03c, 6.03d · Eduqas FA16, HA19. Tier: F & H (part Higher only).*

### What you need to know

- Solve two linear simultaneous equations in two unknowns algebraically (elimination or substitution).
- Find approximate solutions from a graph: the solution is where the lines cross.
- (HT only) Solve one linear and one quadratic equation simultaneously, algebraically, by substitution.

### Explained

Elimination: make the coefficients of one unknown match, then add (if signs differ) or subtract (if signs are the same) to remove it. Remember "Same Signs Subtract".

Substitution: rearrange one equation to make one unknown the subject, then substitute into the other.

(HT only) For a linear and a quadratic, rearrange the linear equation for x or y, substitute into the quadratic, solve the resulting quadratic, then find the matching values of the other unknown. There are usually two pairs of answers. Graphically, these are the points where a line meets a curve (or a circle).

### Worked example

Solve 3x + 2y = 16 and 5x − 3y = 14.

1. Multiply the first by 3 and the second by 2: 9x + 6y = 48 and 10x − 6y = 28.
2. Add: 19x = 76, x = 4.
3. Substitute: 12 + 2y = 16, y = 2.
4. Check in the second: 20 − 6 = 14 ✓.

Three pens and two rulers cost £3.40. One pen and four rulers cost £2.80. Find the cost of each.

1. 3p + 2r = 340 and p + 4r = 280.
2. Double the first: 6p + 4r = 680. Subtract the second: 5p = 400, so p = 80.
3. 80 + 4r = 280, so r = 50.
4. A pen costs 80p and a ruler costs 50p.

(HT only) Solve y = x + 1 and x² + y² = 13.

1. Substitute: x² + (x + 1)² = 13.
2. 2x² + 2x + 1 = 13, so 2x² + 2x − 12 = 0, x² + x − 6 = 0.
3. (x + 3)(x − 2) = 0, x = −3 or x = 2.
4. y = −2 or y = 3. Solutions (−3, −2) and (2, 3).

### Common mistakes

- Adding when you should subtract (or the reverse).
- Finding x and forgetting to find y.
- (HT only) Pairing the x and y values wrongly. Substitute each x into the linear equation.

## A20 Iteration

*Refs: AQA A20 · Edexcel A20 · OCR 6.03e · Eduqas HA20. Tier: Higher only.*

### What you need to know

- (HT only) Find approximate solutions to equations numerically using iteration.
- (HT only) Show that a solution lies between two values by a change of sign.
- (HT only) Rearrange an equation into the form x = g(x) and use an iteration formula xₙ₊₁ = g(xₙ).

### Explained

(HT only) If f(x) changes sign between x = a and x = b (and the graph is continuous there), a root of f(x) = 0 lies between a and b.

(HT only) An iteration formula takes a starting value x₀, puts it into the right-hand side to get x₁, then feeds x₁ back in, and so on. The values usually settle down (converge) towards a solution. On a calculator, type the starting value, press =, then type the formula using ANS and press = repeatedly.

(HT only) To show that x = g(x) is a rearrangement of the original equation, work from the original equation step by step until you reach the new form.

### Worked example

(HT only) Show that x³ − 5x + 1 = 0 has a solution between x = 2 and x = 3.

1. x = 2: 8 − 10 + 1 = −1.
2. x = 3: 27 − 15 + 1 = 13.
3. There is a change of sign, so there is a solution between 2 and 3.

(HT only) Show that x³ − 5x + 1 = 0 can be rearranged to x = ∛(5x − 1).

1. x³ = 5x − 1.
2. x = ∛(5x − 1).

(HT only) Use xₙ₊₁ = ∛(5xₙ − 1) with x₀ = 2 to find x₁, x₂ and x₃ to 4 decimal places.

1. x₁ = ∛9 = 2.0801.
2. x₂ = ∛(9.4004) = 2.1105.
3. x₃ = ∛(9.5523) = 2.1218.

### Common mistakes

- (HT only) Rounding each value before feeding it back in. Use the full calculator value.
- (HT only) Concluding a root exists without saying "change of sign".

## A21 Forming and solving equations

*Refs: AQA A21 · Edexcel A21 · OCR 6.02a, 6.03a, 6.03c · Eduqas FA17, HA21. Tier: F & H.*

### What you need to know

- Translate situations or procedures into algebraic expressions or formulae.
- Form an equation (or two simultaneous equations) to solve a problem, solve it, and interpret the solution in context.

### Explained

Choose a letter for the unknown and say what it stands for. Write each quantity in terms of that letter, then use the fact in the question (a total, a perimeter, an angle sum) to make an equation.

Interpret your answer: if x is a length it must be positive; if it is a number of people it must be a whole number.

### Worked example

The angles of a triangle are x, 2x + 15 and 3x − 21 degrees. Find the largest angle.

1. x + 2x + 15 + 3x − 21 = 180.
2. 6x − 6 = 180, so x = 31.
3. Angles: 31°, 77°, 72°. Largest: 77°.

A rectangle has length (x + 5) cm and width x cm. Its area is 84 cm². Find its perimeter.

1. x(x + 5) = 84, so x² + 5x − 84 = 0.
2. (x + 12)(x − 7) = 0, x = 7 (x = −12 is impossible for a length).
3. Rectangle 12 cm by 7 cm. Perimeter 38 cm.

### Common mistakes

- Not stating what the letter stands for, so the final answer is unclear.
- Keeping a negative solution for a length.
- Solving for x and stopping, when the question asks for something else (here the perimeter).

## A22 Inequalities

*Refs: AQA A22 · Edexcel A22 · OCR 6.04a, 6.04b · Eduqas FA18, HA22. Tier: F & H (part Higher only).*

### What you need to know

- Solve linear inequalities in one variable and show the solution on a number line.
- List integer values that satisfy an inequality.
- (HT only) Solve linear inequalities in two variables, and represent the solution as a region on a graph.
- (HT only) Solve quadratic inequalities in one variable.
- (HT only) Write solution sets in set notation, for example {x : x > 3}.

### Explained

Solve like an equation, with one extra rule: if you multiply or divide by a negative number, reverse the inequality sign.

Number line: an open circle means the end value is not included (< or >); a filled circle means it is included (≤ or ≥).

(HT only) Regions: draw each boundary line (solid for ≤ or ≥, dashed for < or >). Test a point such as (0, 0) to decide which side satisfies the inequality. Shade or label the region as the question asks.

(HT only) Quadratic inequalities: solve the equation to find the critical values, sketch the graph, then read off where the graph is above (> 0) or below (< 0) the x-axis. For a ∪-shaped graph, "< 0" gives a single interval between the roots; "> 0" gives two separate parts outside them.

### Worked example

Solve 7 − 2x ≥ 15.

1. −2x ≥ 8.
2. Divide by −2 and reverse: x ≤ −4.

List the integers n with −3 < 2n + 1 ≤ 9.

1. Subtract 1: −4 < 2n ≤ 8.
2. Divide by 2: −2 < n ≤ 4.
3. Integers: −1, 0, 1, 2, 3, 4.

(HT only) Solve x² − x − 12 < 0. Write your answer in set notation.

1. x² − x − 12 = (x − 4)(x + 3); roots −3 and 4.
2. ∪-shaped graph is below the axis between the roots.
3. {x : −3 < x < 4}.

(HT only) Solve x² ≥ 9.

1. Roots −3 and 3.
2. x ≤ −3 or x ≥ 3, that is {x : x ≤ −3} ∪ {x : x ≥ 3}.

(HT only) Describe the region satisfying y > 1, x + y ≤ 6 and y ≤ 2x.

1. Draw y = 1 dashed, x + y = 6 solid, y = 2x solid.
2. The region is above y = 1, below x + y = 6 and below (to the right of) y = 2x: a triangle.

### Common mistakes

- Forgetting to reverse the sign when dividing by a negative.
- Including an end value with < on a list of integers.
- (HT only) Writing x² > 9 as x > ±3. The answer is two separate parts.
- (HT only) Using a solid line for a strict inequality.

## Check questions

1. Solve 4(3x − 1) = 2(x + 8). [3 marks]
2. Solve (x + 3)/2 = (2x − 1)/5. [3 marks]
3. Solve x² + x − 20 = 0. [3 marks]
4. (HT only) Solve 5x² − 2x − 6 = 0, giving your answers to 2 decimal places. [3 marks]
5. (HT only) Solve x² − 8x + 11 = 0 by completing the square, giving exact answers. [3 marks]
6. Solve 2x + 5y = 1 and 3x − 2y = 11. [4 marks]
7. (HT only) Solve y = 2x − 1 and y = x² − 4. [5 marks]
8. (HT only) Show that x³ + 2x − 7 = 0 has a solution between 1 and 2. [2 marks]
9. (HT only) Using xₙ₊₁ = ∛(7 − 2xₙ) with x₀ = 1.5, find x₁ and x₂ to 4 decimal places. [2 marks]
10. Ali is x years old. His sister is 4 years older. Their mother is three times Ali's age. Their total age is 59. Find Ali's age. [3 marks]
11. Solve 3 − 4x < 19 and show the solution on a number line. [3 marks]
12. List the integers n such that −5 ≤ 3n − 2 < 7. [3 marks]
13. (HT only) Solve 2x² + 3x − 2 ≥ 0. [3 marks]

## Mark scheme

1. 12x − 4 = 2x + 16 (1); 10x = 20 (1); x = 2 (1).
2. 5(x + 3) = 2(2x − 1) (1); 5x + 15 = 4x − 2 (1); x = −17 (1).
3. (x + 5)(x − 4) = 0 (2); x = −5 or x = 4 (1).
4. Correct substitution: (2 ± √(4 + 120))/10 (1); √124 seen (1); x = 1.31 and x = −0.91 (1).
5. (x − 4)² − 16 + 11 = 0 (1); (x − 4)² = 5 (1); x = 4 ± √5 (1).
6. Scale to eliminate one unknown, e.g. 4x + 10y = 2 and 15x − 10y = 55 (1); 19x = 57 (1); x = 3 (1); y = −1 (1).
7. 2x − 1 = x² − 4 (1); x² − 2x − 3 = 0 (1); (x − 3)(x + 1) = 0 (1); x = 3, y = 5 (1); x = −1, y = −3 (1).
8. x = 1: 1 + 2 − 7 = −4; x = 2: 8 + 4 − 7 = 5 (1); change of sign, so a root lies between 1 and 2 (1).
9. x₁ = ∛4 = 1.5874 (1); x₂ = ∛(7 − 2 × 1.5874…) = ∛3.8252 = 1.5639 (1).
10. x + (x + 4) + 3x = 59 (1); 5x + 4 = 59 (1); x = 11 (1).
11. −4x < 16 (1); x > −4 (1); open circle at −4 with an arrow to the right (1).
12. −3 ≤ 3n < 9 (1); −1 ≤ n < 3 (1); −1, 0, 1, 2 (1).
13. (2x − 1)(x + 2) = 0 gives x = 1/2 and x = −2 (1); ∪ shape, so outside the roots (1); x ≤ −2 or x ≥ 1/2 (1).
