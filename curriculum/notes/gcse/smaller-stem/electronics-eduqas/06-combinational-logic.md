---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 6 Combinational logic systems"
spec_refs: ["C1.6(a)", "C1.6(b)", "C1.6(c)", "C1.6(d)", "C1.6(e)", "C1.6(f)", "C1.6(g)", "C1.6(h)", "C1.6(i)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.6 Combinational logic systems

In a combinational logic system, the output depends only on the present combination of inputs. This topic covers logic levels, the five gates, truth tables, Boolean algebra and De Morgan's identities, designing gate systems, building everything from NAND gates, and logic IC data sheets. Background on gates is also in [GCSE Computer Science: Boolean logic](../../computer-science/07-boolean-logic.md).

Notation: A.B means A AND B; A + B means A OR B; Ā (A with a bar) means NOT A. De Morgan's identities (given in a list): NOT(A.B) = Ā + B̄ and NOT(A + B) = Ā.B̄.

## C1.6(a) Logic levels

### What you need to know

- Recognise 1 and 0 as the two logic levels.

### Explained

Digital circuits use only two states. Logic 1 (high, true, on) is a voltage close to the positive supply; logic 0 (low, false, off) is a voltage close to 0 V. Each logic family has voltage ranges that are guaranteed to be read as 0 or as 1; voltages in between are undefined and should be avoided (which is why pull-up and pull-down resistors and Schmitt inputs are used, C1.3 and C2.4).

## C1.6(b) Logic gates

### What you need to know

- Identify and use NOT gates and 2-input AND, OR, NAND and NOR gates, singly and in combination.

### Explained

| A | B | AND (A.B) | OR (A + B) | NAND NOT(A.B) | NOR NOT(A + B) |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 |

NOT (inverter): one input; output is the opposite: Q = Ā.

- AND: output 1 only when both inputs are 1.
- OR: output 1 when either or both inputs are 1.
- NAND: AND followed by NOT; output 0 only when both inputs are 1.
- NOR: OR followed by NOT; output 1 only when both inputs are 0.

Symbols (the "distinctive shape" symbols): AND has a flat back and a round front; OR has a curved back and a pointed front; NOT is a triangle with a small circle at the output; NAND and NOR are AND and OR with a small circle (the "bubble", meaning NOT) at the output.

### Common mistakes

- Saying OR gives 0 when both inputs are 1 (that is exclusive-OR, which is not in this spec).
- Forgetting the bubble on NAND and NOR symbols.

## C1.6(c), C1.6(d) and C1.6(h) Truth tables and analysing systems

### What you need to know

- Produce a truth table from a system specification and from a logic circuit.
- Use truth tables to analyse a system of gates.
- Analyse and design systems from a given truth table to solve a problem.

### Explained

A truth table lists every possible combination of inputs and the resulting output. With n inputs there are 2ⁿ rows (2 inputs: 4 rows; 3 inputs: 8 rows). List the inputs in binary counting order (000, 001, 010, ... 111).

From a circuit: label the output of each gate (for example D, E), add a column for each, and work through gate by gate for every row.

From a specification: decide which signal is each input (and what 1 means), then fill in the output for each row by reading the rule.

From a truth table to a circuit (sum of products): find every row where the output is 1. For each, write an AND term of the inputs, using NOT for any input that is 0 in that row. OR the terms together. Then simplify if possible.

### Worked example

Circuit: A and B go into an AND gate (output D); D and C go into an OR gate (output Q). So Q = A.B + C.

| A | B | C | D = A.B | Q = D + C |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 |

Design from a specification: a machine (Q = 1 runs it) must run only when the guard is closed (G = 1) and the start button is pressed (S = 1), unless the emergency stop is pressed (E = 1). Q = G.S.Ē: an AND gate for G and S, a NOT gate on E, and a second AND gate combining them.

From a truth table: output is 1 only in rows A,B = 0,1 and 1,0. Q = Ā.B + A.B̄.

### Common mistakes

- Missing rows or listing inputs out of order.
- Forgetting the NOT on an input that is 0 in a sum-of-products term.

## C1.6(e) Boolean algebra and De Morgan's identities

### What you need to know

- Use Boolean algebra to represent the output of truth tables or logic gates.
- Use the basic Boolean identities NOT(A.B) = Ā + B̄ and NOT(A + B) = Ā.B̄.

### Explained

Boolean expressions describe logic circuits: AND is a dot, OR is a plus, NOT is a bar. Useful rules: A.0 = 0, A.1 = A, A + 0 = A, A + 1 = 1, A.A = A, A + A = A, A.Ā = 0, A + Ā = 1, NOT(Ā) = A.

De Morgan's identities ("break the bar, change the sign"):

- NOT(A.B) = Ā + B̄. A NAND gate is the same as an OR gate with both inputs inverted.
- NOT(A + B) = Ā.B̄. A NOR gate is the same as an AND gate with both inputs inverted.

These are used to convert between gate types and to simplify circuits. They can be proved by truth tables: for example, columns for NOT(A.B) and Ā + B̄ are identical (1, 1, 1, 0).

### Worked example

Simplify Q = NOT(Ā + B̄). By De Morgan: NOT(Ā + B̄) = NOT(Ā).NOT(B̄) = A.B. So the circuit (two NOT gates feeding a NOR) is just an AND gate.

### Common mistakes

- Breaking the bar but forgetting to change AND to OR (or OR to AND).

## C1.6(f) and C1.6(g) Designing systems and NAND gate redundancy

### What you need to know

- Design processing systems of logic gates to solve problems.
- Simplify logic circuits using NAND gate redundancy.

### Explained

Any logic function can be built using only NAND gates (NAND is "universal"). This is useful because logic ICs contain several identical gates (a 4011 has four NAND gates): building a circuit from one gate type can use fewer ICs.

- NOT from NAND: join both inputs together (or tie one input to 1). Q = NOT(A.A) = Ā.
- AND from NAND: a NAND followed by a NAND-as-NOT. (2 gates.)
- OR from NAND: invert each input with a NAND-as-NOT, then NAND them: NOT(Ā.B̄) = A + B by De Morgan. (3 gates.)
- NOR from NAND: OR from NAND, then a NAND-as-NOT. (4 gates.)

Redundancy: when converting a circuit to NANDs, two NOT gates in a row cancel out (double inversion: NOT(NOT A) = A), so both can be removed. This often reduces the gate count.

### Worked example

Q = A.B + C.D. Built with AND and OR gates: two ANDs and one OR (3 gates, 2 different ICs). Converted to NAND only: each AND becomes NAND + NOT; the OR becomes NOT, NOT, NAND. The NOT after each AND and the NOT before each OR input are back to back and cancel. Result: Q = NOT(NOT(A.B).NOT(C.D)): two NAND gates feeding a third NAND, 3 gates in a single 4011 IC.

### Common mistakes

- Forgetting to remove pairs of NOT gates, so the design uses more gates than needed.

## C1.6(i) Logic IC data sheets

### What you need to know

- Use data sheets to select a logic IC for an application and to identify pin connections.

### Explained

Logic gates come in integrated circuits (ICs), usually in 14-pin dual-in-line packages. The data sheet shows the pin-out: which pins are the inputs and outputs of each gate, and the power pins. Pin 1 is next to the notch or dot; pins are numbered anticlockwise viewed from above.

Example family (CMOS 4000 series, which works on 3 V to 15 V and draws tiny input currents):

| IC | Contents |
| --- | --- |
| 4001 | Four 2-input NOR gates |
| 4011 | Four 2-input NAND gates |
| 4069 | Six NOT gates |
| 4071 | Four 2-input OR gates |
| 4081 | Four 2-input AND gates |

For 14-pin 4000-series gate ICs, pin 14 is the positive supply (V_DD) and pin 7 is 0 V (V_SS). The data sheet also gives supply voltage range, maximum output current, and switching speed. Unused inputs must be connected to 0 V or +V, not left floating, because CMOS inputs pick up charge.

### Common mistakes

- Forgetting to connect the power pins (the gates are not shown connected to power on a logic diagram, but they must be).
- Leaving unused CMOS inputs floating.

## Check questions

1. State the output of a NOR gate when A = 0 and B = 0. [1 mark]
2. Complete a truth table for Q = NOT(A).B + C. [4 marks]
3. A greenhouse fan (Q) must turn on when it is hot (H = 1) or when it is humid (W = 1), but only if the door is closed (D = 1). Write a Boolean expression for Q and describe the gates needed. [3 marks]
4. Write the Boolean expression for the truth table where Q = 1 only for inputs A,B,C = 1,0,1 and 1,1,1, and simplify it. [3 marks]
5. Use De Morgan's identities to show that NOT(Ā.B̄) = A + B. [2 marks]
6. Show how a NOT gate can be made from a NAND gate. [1 mark]
7. Draw an OR gate made only from NAND gates. [3 marks]
8. Explain what is meant by NAND gate redundancy and why it is useful. [2 marks]
9. State which pins of a 4011 IC are connected to the supply and why unused inputs should be connected to a logic level. [3 marks]

## Mark scheme

1. 1 (1).
2. Eight rows in binary order (1); NOT A column correct (1); NOT(A).B column correct (1); Q correct: Q = 1 for rows 001, 010, 011, 101, 111 (1).
3. Q = (H + W).D (1); OR gate for H and W (1); its output and D into an AND gate (1).
4. Q = A.B̄.C + A.B.C (1); = A.C.(B̄ + B) (1) = A.C (1).
5. NOT(Ā.B̄) = NOT(Ā) + NOT(B̄) (1) = A + B (1).
6. Join the two inputs of the NAND together (or tie one to logic 1) (1).
7. Input A to a NAND with inputs joined (NOT) (1); input B to another (1); both outputs into a third NAND, giving A + B (1).
8. When a circuit is converted to NAND gates, pairs of NOT gates in series cancel and can be removed (1); this reduces the number of gates / ICs, cost and space (1).
9. Pin 14 to +V (1) and pin 7 to 0 V (1); floating CMOS inputs pick up noise / charge and give unpredictable outputs (1).
