---
level: A-level
subject: Further Mathematics
topic: "Game theory"
as_content: "Option content. OCR 7.08a to 7.08c and 7.08e are Stage 1 (AS); Nash equilibria and the LP method are Stage 2. AQA Discrete and Edexcel Decision 2 are A-level option content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DF1", "DF2", "DF3", "DF4", "DF5", "DF6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D2 5.1", "D2 5.2", "D2 5.3", "D2 5.4", "D2 5.5"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.08a", "7.08b", "7.08c", "7.08d", "7.08e", "7.08f"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Game theory

This file covers two-person zero-sum games, pay-off matrices, play-safe strategies and the value of a game, stable solutions (saddle points), dominance, optimal mixed strategies by the graphical method, converting larger games to linear programmes, and (OCR) Nash equilibria in non-zero-sum games.

## Overview

Option content. Linear programming and simplex are in [54-linear-programming-and-simplex.md](54-linear-programming-and-simplex.md).

### Board differences

- AQA DF1 to DF6; Edexcel D2 5.1 to 5.5; OCR 7.08a to 7.08f. MEI does not include game theory.
- OCR 7.08d (Stage 2) includes Nash equilibria for games that are not zero-sum.

## DF1 Pay-off matrices, play-safe strategies and stability

*Refs: AQA DF1, DF2, DF3 · Edexcel D2 5.1, 5.2 · OCR 7.08a, 7.08c. Level: AS & A (OCR).*

### What you need to know

- In a two-person zero-sum game, the pay-off matrix shows the row player's gains (the column player's losses).
- Row player's play-safe strategy: the row with the largest minimum (maximin). Column player's: the column with the smallest maximum (minimax).
- If maximin = minimax, the game has a stable solution (saddle point) and that number is the value of the game. Neither player can gain by changing strategy alone.

### Worked example

| | B1 | B2 | B3 |
| --- | --- | --- | --- |
| A1 | 4 | 2 | 5 |
| A2 | 3 | 1 | 0 |
| A3 | 6 | 2 | 3 |

1. Row minima: 2, 0, 2. Maximin 2 (A1 or A3).
2. Column maxima: 6, 2, 5. Minimax 2 (B2).
3. Maximin = minimax = 2: stable; value 2.

### Common mistakes

- Taking column minima instead of maxima for the column player.

## DF4 Dominance

*Refs: AQA DF4 · Edexcel D2 5.3 · OCR 7.08b. Level: AS & A (OCR).*

### What you need to know

- For the row player, row i dominates row j if every entry in row i is ≥ the corresponding entry in row j; delete row j.
- For the column player (who wants small values), column i dominates column j if every entry in column i is ≤ the entry in column j; delete column j.

### Worked example

In the game above, which rows and columns can be removed?

1. A3 (6, 2, 3) vs A2 (3, 1, 0): A3 dominates A2. Delete A2.
2. Columns (after deleting A2): B2 (2, 2) is ≤ B1 (4, 6) and ≤ B3 (5, 3). Delete B1 and B3.

## DF5 Optimal mixed strategies

*Refs: AQA DF5 · Edexcel D2 5.4 · OCR 7.08e. Level: AS & A (OCR).*

### What you need to know

- With no stable solution, each player chooses strategies at random with set probabilities.
- 2 × n (or n × 2) game: let the row player use A1 with probability p. Write the expected gain against each column as a line in p, plot them for 0 ≤ p ≤ 1, and find the highest point of the lowest boundary. That gives p and the value.
- The opponent's strategy: use only the columns whose lines meet at the optimal point, and equate expected losses.

### Worked example

| | B1 | B2 | B3 |
| --- | --- | --- | --- |
| A1 | 3 | −1 | 2 |
| A2 | −2 | 4 | 0 |

1. Expected gains: B1: 3p − 2(1 − p) = 5p − 2. B2: −p + 4(1 − p) = 4 − 5p. B3: 2p.
2. The lowest boundary is highest where 5p − 2 = 4 − 5p: p = 0.6, value 1. (At p = 0.6, the B3 line gives 1.2 > 1, so B3 is not involved.)
3. A plays A1 with probability 0.6. B mixes B1 and B2 with q: 3q − (1 − q) = −2q + 4(1 − q), so q = 0.5.

A 2 × 2 game with rows (2, −1) and (−3, 4).

1. 2p − 3(1 − p) = −p + 4(1 − p), so 10p = 7, p = 0.7. Value 0.5.

### Common mistakes

- Choosing the highest point of the top boundary.

## DF6 Larger games as linear programmes

*Refs: AQA DF6 · Edexcel D2 5.5 · OCR 7.08f. Level: A-level only (OCR); option.*

### What you need to know

- Add a constant k to every entry so all are positive (value becomes V + k).
- Row player uses probabilities p₁, p₂, p₃. Maximise v subject to v ≤ expected gain against each column, p₁ + p₂ + p₃ = 1 (or ≤ 1), pᵢ ≥ 0.
- Solve by simplex (with slack variables) and subtract k at the end.

### Worked example

Formulate for the row player: rows (1, −1, 2), (−2, 3, 0), (0, 1, −1).

1. Add 3: rows (4, 2, 5), (1, 6, 3), (3, 4, 2).
2. Maximise P = v subject to v − 4p₁ − p₂ − 3p₃ ≤ 0, v − 2p₁ − 6p₂ − 4p₃ ≤ 0, v − 5p₁ − 3p₂ − 2p₃ ≤ 0, p₁ + p₂ + p₃ ≤ 1, all ≥ 0.
3. The value of the original game is v − 3.

## Nash equilibrium

*Refs: OCR 7.08d. Level: A-level only.*

### What you need to know

- In a game that is not zero-sum, each cell lists both players' pay-offs. A Nash equilibrium is a pair of strategies where neither player can do better by changing their own strategy alone.

### Worked example

| | Y1 | Y2 |
| --- | --- | --- |
| X1 | (3, 3) | (0, 5) |
| X2 | (5, 0) | (1, 1) |

1. Against Y1, X prefers X2 (5 > 3); against Y2, X2 (1 > 0). Similarly Y prefers Y2 either way.
2. (X2, Y2) with pay-offs (1, 1) is the Nash equilibrium, even though (X1, Y1) is better for both.

## Check questions

1. Show that the game with rows (5, 2, 4), (3, 1, 6), (6, 3, 7) has a stable solution and find its value. [4 marks]
2. Reduce rows (2, 4, 1), (3, 5, 2), (1, 0, 4) by dominance, then find the row player's optimal mixed strategy. [6 marks]
3. Explain what "zero-sum" means. [1 mark]
4. Formulate as an LP the column player's problem for the game with rows (2, −1) and (−3, 4). [4 marks]

## Mark scheme

1. Row minima 2, 1, 3: maximin 3 (row 3) (1). Column maxima 6, 3, 7: minimax 3 (col 2) (1). Equal, so stable (1); value 3 (1).
2. Row 2 dominates row 1 (1). Rows (3, 5, 2), (1, 0, 4). No column dominates another, so use the graphical method with p = P(row (3, 5, 2)) (1). Lines: C1 2p + 1, C2 5p, C3 4 − 2p (where p = P(row 2)) (2). Optimal where 2p + 1 = 4 − 2p, p = 0.75, value 2.5 (check C2: 3.75 ≥ 2.5) (2).
3. The two players' pay-offs add to zero: one player's gain is the other's loss (1).
4. Add 4: rows become (6, 3) and (1, 8) (1). With column probabilities q₁, q₂: minimise v subject to the row player's expected gain from each row being at most v: 6q₁ + 3q₂ ≤ v and q₁ + 8q₂ ≤ v, q₁ + q₂ = 1, q₁, q₂ ≥ 0 (2). Value v − 4 (1).
