---
level: A-level
subject: Further Mathematics
topic: "Transportation and allocation problems"
as_content: "All of this file is A-level option content (Edexcel Decision Mathematics 2)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D2 1.1", "D2 1.2", "D2 1.3", "D2 2.1", "D2 2.2"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Transportation and allocation problems

This file covers the transportation problem (balancing with dummies, the north-west corner method, degeneracy, improvement indices and the stepping-stone method), the allocation (assignment) problem by the Hungarian algorithm (including maximising and impossible allocations), and formulating both as linear programmes.

## Overview

Edexcel D2 only. Linear programming is in [54-linear-programming-and-simplex.md](54-linear-programming-and-simplex.md).

### Board differences

- Edexcel D2 1.1 to 1.3 (transportation) and 2.1, 2.2 (allocation). No other board includes these.

## D2 1.1 and 1.2 The transportation problem

*Refs: Edexcel D2 1.1, 1.2. Level: A-level only.*

### What you need to know

- Supplies at sources must meet demands at destinations at least cost. If total supply ≠ total demand, add a dummy source or destination with zero costs.
- North-west corner method: start top left, allocate as much as possible, move right or down as supply or demand runs out. A non-degenerate solution has m + n − 1 occupied cells; if fewer, put a 0 in a cell to make up the number (degeneracy).
- Shadow costs: for occupied cells, cost = Rᵢ + Kⱼ; set R₁ = 0 and solve.
- Improvement index for an empty cell: Iᵢⱼ = cost − Rᵢ − Kⱼ. If all are ≥ 0 the solution is optimal.
- Stepping-stone: enter the cell with the most negative index; form a loop of occupied cells alternating + and −; move θ = the smallest value in a − cell; that cell leaves.

### Worked example

Costs (£ per unit), supplies and demands:

| | X | Y | Z | Supply |
| --- | --- | --- | --- | --- |
| A | 8 | 6 | 10 | 30 |
| B | 9 | 12 | 7 | 25 |
| C | 14 | 9 | 16 | 35 |
| Demand | 20 | 40 | 30 | 90 |

1. North-west corner: AX 20, AY 10, BY 25, CY 5, CZ 30. Five cells = 3 + 3 − 1 ✓. Cost 160 + 60 + 300 + 45 + 480 = £1045.
2. Shadow costs: R_A = 0, K_X = 8, K_Y = 6, R_B = 6, R_C = 3, K_Z = 13.
3. Indices: AZ 10 − 13 = −3; BX 9 − 6 − 8 = −5; BZ 7 − 6 − 13 = −12; CX 14 − 3 − 8 = 3.
4. Enter BZ. Loop BZ+, CZ−, CY+, BY−. θ = min(30, 25) = 25. BY leaves. New: AX 20, AY 10, BZ 25, CY 30, CZ 5. Cost 1045 − 12 × 25 = £745.
5. New shadow costs: R_A = 0, K_X = 8, K_Y = 6, R_C = 3, K_Z = 13, R_B = −6. Indices: AZ −3, BX 7, BY 12, CX 3.
6. Enter AZ. Loop AZ+, CZ−, CY+, AY−. θ = 5. New: AX 20, AY 5, AZ 5, BZ 25, CY 35. Cost 745 − 15 = £730.
7. Recheck: all indices ≥ 0, so £730 is optimal.

### Common mistakes

- A loop that turns at an empty cell (loops turn only at occupied cells, apart from the entering cell).

## D2 2.1 The Hungarian algorithm

*Refs: Edexcel D2 2.1. Level: A-level only.*

### What you need to know

- For an n × n cost matrix (add a dummy row or column of zeros if not square):
  1. Subtract each row's minimum from that row; then each column's minimum from that column.
  2. Cover all zeros with the least number of lines. If n lines are needed, an optimal allocation exists among the zeros.
  3. Otherwise, find the smallest uncovered entry; subtract it from uncovered entries and add it to entries covered twice. Repeat from step 2.
- To maximise, subtract every entry from the largest entry first.
- An impossible allocation gets a very large cost.

### Worked example

Allocate four workers to four tasks to minimise total time:

| | T1 | T2 | T3 | T4 |
| --- | --- | --- | --- | --- |
| P | 9 | 11 | 14 | 11 |
| Q | 6 | 15 | 13 | 13 |
| R | 12 | 13 | 6 | 8 |
| S | 11 | 9 | 10 | 9 |

1. Row reduce (minima 9, 6, 6, 9): P (0, 2, 5, 2), Q (0, 9, 7, 7), R (6, 7, 0, 2), S (2, 0, 1, 0). Column minima are all 0.
2. Zeros covered by 3 lines (column T1, column T3, row S). Need 4.
3. Smallest uncovered entry 2. New: P (0, 0, 5, 0), Q (0, 7, 7, 5), R (6, 5, 0, 0), S (4, 0, 3, 0).
4. Now 4 lines are needed. Q must take T1; then P–T2, R–T3, S–T4.
5. Total 11 + 6 + 6 + 9 = 32.

### Common mistakes

- Covering zeros with more lines than necessary and stopping too early.

## D2 1.3 and 2.2 Formulating as linear programmes

*Refs: Edexcel D2 1.3, 2.2. Level: A-level only.*

### What you need to know

- Transportation: xᵢⱼ = amount from source i to destination j. Minimise Σcᵢⱼxᵢⱼ subject to Σⱼxᵢⱼ ≤ (or =) supply i, Σᵢxᵢⱼ ≥ (or =) demand j, xᵢⱼ ≥ 0.
- Allocation: xᵢⱼ = 1 if worker i does task j, 0 otherwise. Minimise Σcᵢⱼxᵢⱼ subject to each row summing to 1 and each column summing to 1.

### Worked example

Write the constraints for source A and destination X in the transportation example.

1. x_AX + x_AY + x_AZ = 30 (or ≤ 30).
2. x_AX + x_BX + x_CX = 20 (or ≥ 20).

## Check questions

1. Find an initial solution by the north-west corner method and its cost: supplies 15, 25; demands 10, 20, 10; costs row 1 (4, 6, 3), row 2 (5, 2, 7). [4 marks]
2. For question 1, calculate the improvement indices and decide whether the solution is optimal. If not, improve it once. [6 marks]
3. Use the Hungarian algorithm to minimise the cost: rows (5, 8, 6), (7, 4, 9), (6, 7, 5). [4 marks]
4. Explain how to adapt the Hungarian algorithm to maximise. [2 marks]

## Mark scheme

1. Supply 40 = demand 40. Cells: (1,1) 10, (1,2) 5, (2,2) 15, (2,3) 10 (2). Cost 40 + 30 + 30 + 70 = 170 (2).
2. R₁ = 0, K₁ = 4, K₂ = 6, R₂ = −4, K₃ = 11 (2). Indices: (1,3) 3 − 0 − 11 = −8; (2,1) 5 + 4 − 4 = 5 (2). Not optimal; enter (1,3): loop (1,3)+, (2,3)−, (2,2)+, (1,2)−, θ = 5 (1). New cells (1,1) 10, (1,3) 5, (2,2) 20, (2,3) 5; cost 170 − 40 = 130 (1).
3. Row reduce: (0, 3, 1), (3, 0, 5), (1, 2, 0) (2). Three independent zeros: R1–C1, R2–C2, R3–C3 (1). Cost 5 + 4 + 5 = 14 (1).
4. Subtract every entry from the largest entry (or multiply by −1), then minimise as usual (2).
