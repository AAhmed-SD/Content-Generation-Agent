---
level: A-level
subject: Computer Science
topic: "Logic gates, circuits, adders, D-type flip-flops, Boolean algebra, De Morgan's laws and Karnaugh maps"
as_content: "AQA 4.6.4 and 4.6.5 are also AS (7516 3.6.4, 3.6.5). OCR: Boolean logic, manipulating expressions with Karnaugh maps, and gate diagrams with truth tables are also AS; Boolean algebra rules (1.4.3(c)) and flip-flops and adders (1.4.3(e)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.6.4.1", "4.6.5.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.3(a)", "1.4.3(b)", "1.4.3(c)", "1.4.3(d)", "1.4.3(e)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.2: Logical operations"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Logic gates and Boolean algebra

This file covers the six gates and their truth tables, writing expressions for circuits and drawing circuits from expressions, half and full adders, the D-type flip-flop, Boolean identities, De Morgan's laws, simplifying expressions, and Karnaugh maps. Bitwise masks are in [16](16-number-systems-binary-and-twos-complement.md).

Builds on [GCSE: Boolean logic](../../gcse/computer-science/07-boolean-logic.md) (AND, OR, NOT, some XOR, truth tables and simple circuits).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Gates | NOT, AND, OR, XOR, NAND, NOR with ANSI/IEEE distinctive shape symbols | Gate diagrams and truth tables | Truth tables for AND, OR, NOT, XOR, NAND, NOR |
| Notation | A · B (AND), A + B (OR), A̅ (NOT), A ⊕ B (XOR) | ∧ (AND), ∨ (OR), ¬ (NOT), ⊻ (XOR), ≡ (equivalence) | Either; questions define symbols |
| Simplification | Identities and De Morgan | De Morgan, distribution, association, commutation, double negation; Karnaugh maps | Identities, rules and De Morgan |
| Adders, flip-flops | Trace half and full adders; build a half adder; D-type flip-flop as memory | Logic of D-type flip-flops, half and full adders | Not named |
| Masks | Not here | In 1.4.1(i) (file 16) | Clearing registers, masking and encryption (file 16) |

## 4.6.4.1 Logic gates

*Refs: AQA 4.6.4.1 · OCR 1.4.3(a), 1.4.3(d) · Eduqas C1.2: Logical operations.*

### What you need to know

| A | B | NOT A | A AND B | A OR B | A XOR B | A NAND B | A NOR B |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 1 | 0 | 0 | 0 |

- Expressions (AQA style): NOT A = A̅; A AND B = A · B (or AB); A OR B = A + B; A XOR B = A ⊕ B = A·B̅ + A̅·B; NAND = (A · B)̅; NOR = (A + B)̅.
- Gate symbols (ANSI distinctive shapes): AND has a flat back and round front (D shape); OR has a curved back and pointed front; XOR is an OR with an extra curved line at the back; NOT is a triangle with a small circle (bubble) at the output; NAND and NOR are AND and OR with a bubble at the output.
- NAND and NOR are universal: any circuit can be built from NAND gates alone (or NOR alone), which simplifies manufacturing.
- From a circuit, write the expression by working from the inputs to the output, labelling each gate's output. From an expression, draw a gate for each operator, innermost brackets first.
- Truth tables: n inputs give 2ⁿ rows. Add a column for each intermediate gate output.
- OCR defines problems with Boolean logic: turn a written rule into an expression. "The alarm sounds (Q) if the system is armed (A) and either a door (D) or window (W) is open": Q = A ∧ (D ∨ W).

### Worked example

Circuit: A and B go into a NAND gate; its output and C go into an OR gate, output Q. Expression: Q = (A · B)̅ + C.

| A | B | C | A · B | (A·B)̅ | Q |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 0 | 1 |

Q is 0 only when A = 1, B = 1, C = 0.

## Half adder and full adder

*Refs: AQA 4.6.4.1 · OCR 1.4.3(e).*

### What you need to know

- A half adder adds two bits A and B and outputs a sum S and a carry C:
  - S = A ⊕ B (an XOR gate);
  - C = A · B (an AND gate).
- A full adder adds three bits: A, B and a carry in (Cin) from the previous column. It outputs S and Cout:
  - S = A ⊕ B ⊕ Cin;
  - Cout = A·B + Cin·(A ⊕ B).
  - It can be built from two half adders and an OR gate: the first half adder adds A and B; the second adds its sum to Cin; Cout is the OR of the two carries.
- Chaining n full adders (each carry out into the next carry in) makes an n-bit adder (a ripple-carry adder), the core of the ALU.

| A | B | Cin | S | Cout |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

### Worked example

Trace a full adder with A = 1, B = 1, Cin = 1. First half adder: S1 = 1 ⊕ 1 = 0, C1 = 1. Second half adder: S = 0 ⊕ 1 = 1, C2 = 0 · 1 = 0. Cout = C1 + C2 = 1. So 1 + 1 + 1 = 11₂ ✓.

```python
def half_adder(a, b):
    return a ^ b, a & b              # sum, carry

def full_adder(a, b, cin):
    s1, c1 = half_adder(a, b)
    s, c2 = half_adder(s1, cin)
    return s, c1 | c2

def add_bits(x, y):                  # lists of bits, least significant first
    carry, out = 0, []
    for a, b in zip(x, y):
        s, carry = full_adder(a, b, carry)
        out.append(s)
    return out, carry
```

## D-type flip-flop

*Refs: AQA 4.6.4.1 · OCR 1.4.3(e).*

### What you need to know

- A flip-flop is a circuit that stores one bit: the basic memory unit (used in registers, static RAM and counters).
- An edge-triggered D-type flip-flop has a data input D, a clock input and an output Q (often also Q̅). On each rising edge of the clock (the moment the clock goes from 0 to 1), Q takes the value of D. At all other times Q keeps its value, whatever D does.
- So the flip-flop "remembers" the value of D at the last clock edge. Several side by side make a register; connected in a chain they make a shift register; with Q̅ fed back to D, the output toggles on each clock edge, dividing the clock frequency by 2 (a counter stage).
- AQA: you need its use as a memory unit, not its internal gates.

### Worked example

Clock rising edges at t1, t2, t3, t4. D values just before each edge: 1, 1, 0, 1. D changes between edges to 0 and back several times. Q after each edge: 1, 1, 0, 1, and Q stays at that value until the next edge, ignoring changes in D between edges.

## 4.6.5.1 Using Boolean algebra

*Refs: AQA 4.6.5.1 · OCR 1.4.3(b), 1.4.3(c) · Eduqas C1.2: Logical operations.*

### What you need to know

Identities (AQA notation; · AND, + OR):

| Rule | AND form | OR form |
| --- | --- | --- |
| Identity | A · 1 = A | A + 0 = A |
| Null (annulment) | A · 0 = 0 | A + 1 = 1 |
| Idempotent | A · A = A | A + A = A |
| Complement (inverse) | A · A̅ = 0 | A + A̅ = 1 |
| Double negation | (A̅)̅ = A | |
| Commutative | A · B = B · A | A + B = B + A |
| Associative | (A · B) · C = A · (B · C) | (A + B) + C = A + (B + C) |
| Distributive | A · (B + C) = A·B + A·C | A + B·C = (A + B) · (A + C) |
| Absorption | A · (A + B) = A | A + A·B = A |
| De Morgan | (A · B)̅ = A̅ + B̅ | (A + B)̅ = A̅ · B̅ |

- De Morgan in words: to negate an AND or OR, change the operator (AND ↔ OR) and negate each term. "Break the bar, change the sign."
- Also useful: A + A̅·B = A + B.
- OCR uses ∧, ∨, ¬: ¬(A ∧ B) ≡ ¬A ∨ ¬B; ¬(A ∨ B) ≡ ¬A ∧ ¬B.

### Worked example

Simplify Q = A·B + A·B̅.

1. Distributive: A·(B + B̅).
2. Complement: B + B̅ = 1, so A · 1.
3. Identity: Q = A.

Simplify Q = (A + B)·(A + C).

1. Expand: A·A + A·C + B·A + B·C.
2. Idempotent: A·A = A, so A + A·C + A·B + B·C.
3. Absorption: A + A·C = A, then A + A·B = A, so Q = A + B·C.

Simplify Q = ((A̅ · B)̅ + B)̅ using De Morgan.

1. Outer bar over an OR: (X + B)̅ = X̅ · B̅, where X = (A̅·B)̅, so X̅ = A̅ · B.
2. Q = A̅ · B · B̅.
3. B · B̅ = 0, so Q = 0.

Check with a few rows: A = 0, B = 1: A̅·B = 1, its NOT is 0, OR B gives 1, NOT gives 0 ✓.

## Karnaugh maps

*Refs: OCR 1.4.3(b).*

### What you need to know

- A Karnaugh map (K-map) is a grid version of a truth table, used to simplify expressions of 2, 3 or 4 variables.
- Rows and columns are labelled in Gray code order (00, 01, 11, 10), so neighbouring cells differ by exactly one variable. The map wraps around: the left and right edges are neighbours, and so are the top and bottom.
- Steps:
  1. Put a 1 in each cell where the output is 1.
  2. Group the 1s in rectangles whose size is a power of 2 (1, 2, 4, 8, 16). Make each group as large as possible and use as few groups as possible. Groups may overlap and wrap round edges. Every 1 must be in at least one group; no 0s in a group.
  3. For each group, write the AND of the variables that stay the same throughout it (variable if it is 1 throughout, its NOT if it is 0); drop variables that change.
  4. OR the group terms together.

### Worked example

Simplify Q from this truth table (3 inputs): Q = 1 for ABC = 001, 011, 101, 111, 110.

K-map (rows A, columns BC):

| A \ BC | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 1 |

- Group 1: the four 1s in columns 01 and 11 (both rows). C = 1 throughout; A and B change. Term: C.
- Group 2: the pair in row 1, columns 11 and 10. A = 1 and B = 1 throughout; C changes. Term: A·B.
- Q = C + A·B.

Four variables, with wrap-around: Q = 1 at the four corners (ABCD = 0000, 0010, 1000, 1010). The four corners form one group: B = 0 and D = 0 throughout. Q = B̅·D̅.

### Common mistakes

- Labelling K-map columns 00, 01, 10, 11 (binary order). Use Gray code, 00, 01, 11, 10.
- Making groups of 3 or 6. Group sizes must be powers of 2.
- Applying De Morgan without changing the operator, or negating only one term.
- Writing an XOR gate shape with no extra back line, or forgetting the bubble on NAND and NOR.
- Saying a D-type flip-flop's output follows D all the time. It only changes on the clock edge.

## Check questions

1. Draw the truth table for Q = (A + B) · C̅. [3 marks]
2. Write the Boolean expression for a circuit where A and B enter an XOR gate, B and C enter a NOR gate, and both outputs enter an AND gate. [2 marks]
3. Draw a half adder and give its truth table. [3 marks]
4. Explain how a full adder can be built from two half adders and an OR gate. [3 marks]
5. Describe the function of an edge-triggered D-type flip-flop. [3 marks]
6. Simplify A·B·C + A·B·C̅ + A̅·B. [3 marks]
7. Use De Morgan's laws to simplify (A̅ + B̅)̅ + (A + B)̅. [3 marks]
8. Show that A + A̅·B = A + B. [3 marks]
9. (OCR) Use a Karnaugh map to simplify the expression whose output is 1 for ABC = 000, 010, 100, 110, 111. [4 marks]
10. (OCR) Express this as Boolean logic: a car's interior light (L) is on if any door is open (D) or the switch (S) is on, but never while the engine is running (E). [2 marks]
11. Explain why NAND is called a universal gate, and show how to make NOT A with a NAND gate. [2 marks]

## Mark scheme

1. Eight rows in order (1); C̅ column/A + B column (1); Q = 1 only for (A, B, C) = 010, 100, 110 (1).
2. Q = (A ⊕ B) · (B + C)̅ (1 for each bracketed part with correct operator).
3. XOR gate for S, AND gate for C, inputs to both (1); truth table rows 00 → S0 C0; 01 → 1 0; 10 → 1 0; 11 → 0 1 (2).
4. First half adder adds A and B giving S1 and C1 (1); second half adder adds S1 and Cin giving S and C2 (1); Cout = C1 OR C2 (1).
5. Stores one bit (1); on the rising clock edge Q takes the value of D (1); otherwise Q stays the same whatever D does (1).
6. A·B·(C + C̅) = A·B (1); A·B + A̅·B = B·(A + A̅) (1) = B (1).
7. (A̅ + B̅)̅ = A·B (1); (A + B)̅ = A̅·B̅ (1); A·B + A̅·B̅ (accept "A XNOR B" / (A ⊕ B)̅) (1).
8. A = A·(1 + B) = A + A·B, so A + A̅·B = A + A·B + A̅·B (1); = A + B·(A + A̅) (1); = A + B (1). Accept a full truth table proof.
9. Correct map with 1s at 000, 010, 100, 110 (C = 0 column pairs 00 and 10) and 111 (1). Group of four: all cells with C = 0 → C̅ (1). Group of two: 110 and 111 → A·B (1). Q = C̅ + A·B (1).
10. L = (D + S) · E̅ (accept (D ∨ S) ∧ ¬E) (1 for (D + S), 1 for AND NOT E).
11. Any circuit can be built using only NAND gates (1); connect A to both inputs: (A · A)̅ = A̅ (1).
