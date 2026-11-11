---
level: A-level
subject: Electronics
topic: "C1.2 Logic systems"
as_content: "AS and A level."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.2(a)", "C1.2(b)", "C1.2(c)", "C1.2(d)", "C1.2(e)", "C1.2(f)", "C1.2(g)", "C1.2(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.2 Logic systems

Combinational logic circuits produce outputs that depend only on the present inputs. This file covers the gates, truth tables, building other functions (especially from NAND gates), simplifying with Boolean algebra, Karnaugh maps and multiplexers, and interfacing gates to real inputs and outputs. GCSE background: [GCSE Electronics 06](../../../gcse/smaller-stem/electronics-eduqas/06-combinational-logic.md).

Identities to use (recall): A·1 = A, A·0 = 0, A·A = A, A·Ā = 0, A + 1 = 1, A + 0 = A, A + A = A, A + Ā = 1. Select and apply: De Morgan's theorems (NOT(A + B) = Ā·B̄; NOT(A·B) = Ā + B̄) and the absorption identities A + Ā·B = A + B and A·B + A = A·(B + 1) = A.

## C1.2(a), (b) Gates and truth tables

### What you need to know

Identify and use NOT and 2- and 3-input AND, NAND, OR, NOR, XOR and XNOR gates; construct and use truth tables for gates and simple combinations.

### Explained

| Gate | Boolean | Output is 1 when |
| --- | --- | --- |
| NOT | Q = Ā | input is 0 |
| AND | Q = A·B | all inputs are 1 |
| NAND | Q = NOT(A·B) | not all inputs are 1 |
| OR | Q = A + B | any input is 1 |
| NOR | Q = NOT(A + B) | all inputs are 0 |
| XOR | Q = A ⊕ B = Ā·B + A·B̄ | inputs differ (2-input) |
| XNOR | Q = NOT(A ⊕ B) | inputs are the same |

A 3-input gate has 8 input combinations (2³). A 3-input XOR gives 1 when an odd number of inputs is 1.

For a combination, add a column for each intermediate output, working from inputs to output.

## C1.2(c), (f) Building functions; NAND simplification; De Morgan

### What you need to know

Use combinations of gates to perform other functions, including NAND-gate simplification (redundancy); use De Morgan's theorem.

### Explained

NAND (and NOR) gates are universal: any function can be built from them alone. This means a single type of IC can make a whole circuit.

| Function | Made from NAND gates |
| --- | --- |
| NOT | NAND with inputs joined |
| AND | NAND followed by a NAND-NOT |
| OR | NOT each input (NAND-NOTs), then NAND: by De Morgan, NOT(Ā·B̄) = A + B |
| NOR | OR (as above) followed by NAND-NOT |
| XOR | Four NAND gates |

**NAND-gate simplification**: after converting each gate of a design to NAND equivalents, two NOT gates in series (a double inversion) cancel and can be removed. Count the gates left. A sum-of-products expression (AND gates feeding an OR gate) converts directly to two levels of NAND gates.

**De Morgan's theorem**: "break the bar and change the sign": NOT(A + B) = Ā·B̄ and NOT(A·B) = Ā + B̄.

### Worked example

Implement Q = A·B + C with NAND gates. Q = NOT(NOT(A·B)·C̄) by De Morgan. Gate 1: NAND(A, B). Gate 2: NAND(C, C) = C̄. Gate 3: NAND(gate 1, gate 2) = NOT(NOT(AB)·C̄) = AB + C. Three gates in total.

## C1.2(d), (g), (h) Simplification

### What you need to know

Simplify logic systems with Boolean algebra, Karnaugh maps and multiplexers; use the Boolean identities.

### Explained

**Boolean algebra**: use the identities, the distributive law (A·(B + C) = A·B + A·C), De Morgan, and absorption.

Example: Q = A·B + A·B̄ + Ā·B = A(B + B̄) + Ā·B = A + Ā·B = A + B.

**Karnaugh maps**: a grid with one cell per input combination, arranged in Gray-code order (00, 01, 11, 10) so adjacent cells differ in one variable.

1. Put a 1 in each cell where the output is 1.
2. Group adjacent 1s in rectangles of 1, 2, 4 or 8 cells (powers of two), as large as possible; groups may overlap and wrap round the edges.
3. For each group, write the product of the variables that stay constant in it.
4. OR the group terms together.

**Multiplexers**: a 2ⁿ-to-1 multiplexer has n select (address) lines choosing which data input appears at the output. Any function of n variables can be made by connecting the variables to the select lines and setting each data input to 0 or 1 according to the truth table: a "look-up table". A function of three variables can also use a 4-to-1 multiplexer with two variables on the select lines and each data input connected to 0, 1, C or C̄.

### Worked example

Truth table: Q = 1 for (A, B, C) = 010, 011, 110, 111, 101. Karnaugh map (AB across: 00, 01, 11, 10; C down: 0, 1):

| C \ AB | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 1 |

Group of four (AB = 01 and 11, both C values) gives B. Pair (AB = 11 and 10 with C = 1) gives A·C. Q = B + A·C.

## C1.2(e) Logic circuits in practice

### What you need to know

Design and build logic circuits considering sourcing, sinking, pull-up and pull-down resistors.

### Explained

- **Sourcing**: the gate output supplies current out to a load connected to 0 V (the load is on when the output is high).
- **Sinking**: current flows from the supply through the load into the output (load on when output is low). Many logic families can sink more current than they can source.
- Logic outputs typically handle only a few milliamps (up to about 20 mA for some families); use transistor drivers for larger loads.
- **Pull-down resistor** (about 10 kΩ from input to 0 V) with a switch to +V: the input is held at logic 0 until the switch is pressed. **Pull-up resistor** (from input to +V) with a switch to 0 V: the input is 1 until pressed. Unused CMOS inputs must never float; they pick up noise and behave unpredictably, so tie them to 0 V or +V.

### Common mistakes

- Making Karnaugh groups of three or six cells.
- Writing De Morgan without changing the operator.
- Leaving CMOS inputs unconnected.

## Check questions

1. Draw the truth table for a 3-input NOR gate. (2)
2. Show how to make an OR gate from NAND gates and prove it using De Morgan's theorem. (3)
3. Simplify Q = A·B·C + A·B·C̄ + A·B̄·C using Boolean algebra. (3)
4. Simplify Q = Ā·B̄ + Ā·B + A·B using a Karnaugh map or algebra. (3)
5. Use the identity A + Ā·B = A + B to simplify Q = C + C̄·D. (1)
6. Explain how a 4-to-1 multiplexer can generate any function of two variables. (3)
7. Explain why a pull-down resistor is needed when a push switch is connected to a logic input. (2)
8. Implement Q = (A + B)·C using only NAND gates and state how many gates are needed. (4)

## Mark scheme

1. Eight rows; Q = 1 only for 000 (2; 1 for minor error).
2. Two NAND-NOT gates invert A and B, feeding a NAND (1); output = NOT(Ā·B̄) (1); = A + B by De Morgan (1).
3. A·B(C + C̄) + A·B̄·C = A·B + A·B̄·C (1); = A(B + B̄·C) = A(B + C) (1); Q = A·B + A·C (1).
4. Ā·B̄ + Ā·B = Ā (1); Ā + A·B = Ā + B (1); Q = Ā + B (1).
5. Q = C + D (1).
6. A and B to the two select lines (1); four data inputs correspond to the four truth table rows (1); each connected to 0 or 1 to match the output (1).
7. Without it the input floats when the switch is open / undefined level / picks up noise (1); resistor holds the input at logic 0 (1).
8. A + B = NAND(Ā, B̄): 3 gates (2 NOTs and a NAND) (1); AND with C: NAND then NOT (1); so Q = NOT(NAND(A + B, C)) (1); total 5 gates (1). (Accept an equivalent with justification.)
