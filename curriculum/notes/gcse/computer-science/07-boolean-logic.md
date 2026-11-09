---
level: GCSE
subject: Computer Science
topic: "Boolean logic"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.4.2"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.4.1"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.3.1"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["2: Logical operators", "2: Boolean logic"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Boolean logic

This file covers the logic operators AND, OR, NOT and XOR, their gate symbols and truth tables, building truth tables for circuits and expressions with up to three inputs, drawing and reading logic circuits, writing Boolean expressions, and (Eduqas) simplifying expressions with Boolean identities.

## Overview

Computers are built from logic gates: tiny circuits that take inputs of 1 (true, on) or 0 (false, off) and give an output by a fixed rule. Combining gates lets a computer make decisions and do arithmetic.

### Board differences

| Board | Gates | Inputs | Expressions | Simplification |
| --- | --- | --- | --- | --- |
| AQA 8525 (3.4.2) | NOT, AND, OR, XOR (no NAND or NOR) | Up to 3 | Yes: `.` AND, `+` OR, `⊕` XOR, bar for NOT | No |
| OCR J277 (2.4.1) | AND, OR, NOT | More than one gate; tables for given scenarios | Words (AND, OR, NOT); other valid notation accepted, e.g. ∧ ∨ ¬, T/F | No |
| Edexcel 1CP2 (1.3.1) | AND, OR, NOT as operators in truth tables | Up to 3 | Words | No |
| Eduqas C500QS (2) | AND, OR, NOT, XOR | Truth tables and problems | Yes: `.` `+` `⊕` and bar | Yes, with the identities in the spec's Appendix B |

Edexcel's spec names logical operators in truth tables, not gate diagrams. OCR and AQA both require circuit diagrams. AQA asks you to convert between circuits and expressions both ways.

In this file NOT A is written A̅ (A with a bar).

## The gates

*Refs: AQA 3.4.2 · OCR 2.4.1 · Edexcel 1.3.1 · Eduqas 2: Logical operators.*

### What you need to know

- NOT (negation): one input; the output is the opposite of the input.
- AND (conjunction): output 1 only if both inputs are 1.
- OR (disjunction): output 1 if at least one input is 1.
- XOR (exclusive OR; AQA and Eduqas): output 1 if exactly one input is 1 (the inputs differ).
- Gate symbols (as described in words):
  - NOT: a triangle pointing right with a small circle at its tip.
  - AND: a "D" shape: flat back on the left, round front on the right.
  - OR: a curved back and a pointed front, like a shield on its side.
  - XOR: the OR shape with an extra curved line just behind its back.

### Explained

| A | NOT A |
| --- | --- |
| 0 | 1 |
| 1 | 0 |

| A | B | A AND B | A OR B | A XOR B |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

Real-life checks: a car starts if the key is turned AND the brake is pressed. An alarm sounds if the door opens OR the window breaks. A landing light controlled by two switches changes when either switch is flipped: that is XOR.

### Common mistakes

- Thinking OR is false when both inputs are 1. That is XOR.
- Drawing an AND gate when the question's scenario says "either".

## Truth tables with up to three inputs

*Refs: AQA 3.4.2 · OCR 2.4.1 · Edexcel 1.3.1 · Eduqas 2: Logical operators.*

### What you need to know

- With n inputs there are 2ⁿ rows: 4 rows for 2 inputs, 8 rows for 3.
- List inputs in binary counting order (000, 001, 010 ... 111) so no row is missed.
- Add a column for each intermediate result, then the final output.

### Worked example

Complete the truth table for Q = (A AND B) OR (NOT C), written A.B + C̅.

| A | B | C | A AND B | NOT C | Q |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 1 |

Check with code: Python's `and`, `or`, `not` work on 1 and 0 too.

```python
for a in (0, 1):
    for b in (0, 1):
        for c in (0, 1):
            q = (a and b) or (not c)
            print(a, b, c, int(bool(q)))
```

### Common mistakes

- Writing only 4 rows for three inputs.
- Applying NOT to the whole expression when it only covers one input. Check the brackets or the extent of the bar.

## Logic circuits and expressions

*Refs: AQA 3.4.2 · OCR 2.4.1 · Eduqas 2: Logical operators.*

### What you need to know

- Create, complete and read logic circuit diagrams for a scenario, using more than one gate.
- (AQA, Eduqas) Write a Boolean expression from a circuit, and draw a circuit from an expression.
- Notation (AQA, Eduqas): A.B for A AND B; A + B for A OR B; A ⊕ B for A XOR B; a bar over a letter or bracket for NOT.

### Explained

Reading a circuit: start at the inputs and write the output of each gate as an expression, working towards the final output.

A circuit described in words: inputs A and B go into an OR gate. The output of the OR gate and input C go into an AND gate. The output of the AND gate goes through a NOT gate to give Q.

1. OR gate: A + B.
2. AND gate: (A + B).C.
3. NOT gate: Q is the whole of (A + B).C with a bar over it, i.e. NOT ((A OR B) AND C).

Drawing a circuit from an expression: find the last operation done (the "outermost" one): that is the gate nearest the output. Then work back.

### Worked example

A greenhouse fan (F) must switch on when the temperature is high (T = 1) and the window is shut (W = 0), or whenever the manual switch (M) is on. Write the expression and describe the circuit.

1. "Window shut" is NOT W.
2. Expression: F = (T AND NOT W) OR M, written T.W̅ + M.
3. Circuit: W goes through a NOT gate. Its output and T go into an AND gate. The AND output and M go into an OR gate, giving F.

Truth table check for one row: T = 1, W = 1, M = 0: T.W̅ = 1.0 = 0; 0 + 0 = 0, so the fan is off. Correct: the window is open.

### Common mistakes

- Missing brackets: A.B + C is not the same as A.(B + C).
- Putting the NOT gate after the wrong gate when converting from an expression.

## Simplifying Boolean expressions (Eduqas)

*Refs: Eduqas 2: Boolean logic.*

### What you need to know

The identities listed by Eduqas:

| Rule | AND form | OR form |
| --- | --- | --- |
| Annulment | A.0 = 0 | A + 1 = 1 |
| Identity | A.1 = A | A + 0 = A |
| Commutative | A.B = B.A | A + B = B + A |
| Complement | A.A̅ = 0 | A + A̅ = 1 |
| Idempotent | A.A = A | A + A = A |
| Distribution | A.(B + C) = A.B + A.C | A + (B.C) = (A + B).(A + C) |
| Absorption | A.(A + B) = A | A + (A.B) = A |
| Association | A.(B.C) = (A.B).C = A.B.C | A + (B + C) = (A + B) + C = A + B + C |

- Use them one step at a time, naming each rule, to reach a simpler expression with fewer gates.

### Explained

A simpler expression gives a circuit with fewer gates: cheaper, smaller, faster and using less power. You can always check a simplification with a truth table: both expressions must give the same output in every row.

### Worked example

Simplify A.B + A.B̅.

1. Distribution (taking A out): A.(B + B̅).
2. Complement: B + B̅ = 1, so A.1.
3. Identity: A.1 = A.
4. Answer: A.

Simplify A + A.B + B.1.

1. Absorption: A + A.B = A, giving A + B.1.
2. Identity: B.1 = B.
3. Answer: A + B.

Simplify A.(A + B) + A.A̅.

1. Absorption: A.(A + B) = A.
2. Complement: A.A̅ = 0.
3. A + 0 = A by identity.
4. Answer: A.

Simplify (A + B).(A + C) + A.C.

1. Distribution (OR form): (A + B).(A + C) = A + B.C, giving A + B.C + A.C.
2. Commutative and absorption: A + A.C = A, giving A + B.C.
3. Answer: A + B.C.

### Common mistakes

- Treating + and . as ordinary maths: A + A = A, not 2A; A + 1 = 1, not A + 1.
- Skipping steps. Marks are usually given for each correctly named rule.

## Check questions

1. Draw (or describe) the truth table for A XOR B. [2 marks]
2. Complete a truth table for Q = NOT (A AND B) OR C. [4 marks]
3. A security light (L) comes on when it is dark (D) and movement (M) is detected, unless the override (O) is on. Write a Boolean expression for L. [3 marks]
4. Write the expression for this circuit: A and B go into an XOR gate; its output and C go into an AND gate to give Q. [2 marks]
5. State how many rows a truth table for four inputs would have. [1 mark]
6. (Eduqas) Simplify A.(B + B̅) + A.0, naming each rule. [3 marks]
7. (Eduqas) Simplify (A + B).A + B.B̅. [3 marks]
8. Give the output of NOT (1 OR 0) AND 1. [1 mark]

## Mark scheme

1. Rows 00→0, 01→1, 10→1, 11→0 (1 for inputs, 1 for outputs).
2. Columns for A AND B, NOT(A AND B) and Q (1). Outputs Q for ABC = 000 to 111: 1, 1, 1, 1, 1, 1, 0, 1 (2 for all correct, 1 for six or seven correct). Correct layout of 8 rows (1).
3. L = D AND M AND NOT O, written D.M.O̅ (1 for D AND M, 1 for AND NOT O, 1 for correct overall form).
4. Q = (A ⊕ B).C, or (A XOR B) AND C (1 for XOR part, 1 for AND C).
5. 16 (1).
6. Complement: B + B̅ = 1, giving A.1 + A.0 (1). Identity A.1 = A and annulment A.0 = 0, giving A + 0 (1). Identity: A (1).
7. Absorption (with commutative): (A + B).A = A (1). Complement: B.B̅ = 0 (1). Identity: A + 0 = A (1).
8. 1 OR 0 = 1; NOT 1 = 0; 0 AND 1 = 0. Answer 0 (1).
