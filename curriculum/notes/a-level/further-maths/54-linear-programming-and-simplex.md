---
level: A-level
subject: Further Mathematics
topic: "Linear programming and the simplex algorithm"
as_content: "Option content. Formulation and graphical solution are AS on OCR (7.06 Stage 1 parts) and in MEI AS paper Y413; slack variables and the simplex algorithm are Stage 2 on OCR. Edexcel D1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DD1", "DD2", "DD3", "DD4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D1 5.1", "D1 5.2", "D1 5.3", "D1 5.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.06a", "7.06b", "7.06c", "7.06d", "7.06e", "7.06f", "7.07a", "7.07b", "7.07c", "7.07d", "7.07e", "7.07f"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AL1", "AL2", "AL3", "AL4", "AL5", "AL6", "AL7", "AL8", "AL9", "AL10", "AL11", "AL12", "AL13", "AL14", "AL15", "AL16", "AL17", "AL18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Linear programming and the simplex algorithm

This file covers formulating linear programming (LP) problems, graphical solution (objective line and vertex methods), integer solutions, slack variables, the simplex algorithm and interpreting tableaux, problems with ≥ constraints (two-stage simplex and big-M), and sensitivity of the solution to changes.

## Overview

Option content. Inequalities and regions are in A-level Maths ([../maths/02-algebra-indices-surds-quadratics-and-inequalities.md](../maths/02-algebra-indices-surds-quadratics-and-inequalities.md)). Game theory problems solved as LPs are in [56-game-theory.md](56-game-theory.md); transportation and allocation formulations in [57-transportation-and-allocation.md](57-transportation-and-allocation.md); network flow formulations in [55-network-flows.md](55-network-flows.md).

### Board differences

- AQA DD1 to DD4: formulation, graphical solution, simplex for maximising and minimising, interpreting tableaux.
- Edexcel D1 5.1 to 5.4: formulation, graphical solution (including integer solutions), simplex for maximising, two-stage simplex and big-M for ≥ constraints.
- OCR 7.06a to 7.06f, 7.07a to 7.07f: formulation, graphical solution and sensitivity (7.06e), simplex and its geometric meaning.
- MEI AL1 to AL18: formulation (including network problems, AL6), integer LP, 3D visualisation, simplex, two-stage simplex, free variables (AL16) and interpreting software output (AL18).

## DD1 Formulating linear programmes

*Refs: AQA DD1 · Edexcel D1 5.1 · OCR 7.06a · MEI AL1, AL2, AL3, AL5, AL6. Level: AS & A.*

### What you need to know

- Define the decision variables (with units), write the objective function to maximise or minimise, and list the constraints, including non-negativity.
- Recognise when variables must be integers.

### Worked example

A bakery makes x trays of bread (profit £4, 2 hours of oven time, 4 kg flour) and y trays of cakes (profit £5, 3 hours, 1 kg flour). It has 12 oven hours and 14 kg of flour a day. Formulate the LP.

1. Maximise P = 4x + 5y.
2. Subject to 2x + 3y ≤ 12, 4x + y ≤ 14, x ≥ 0, y ≥ 0.

### Common mistakes

- Leaving out non-negativity, or not defining variables.

## DD2 Graphical solution

*Refs: AQA DD2 · Edexcel D1 5.2 · OCR 7.06c, 7.06d, 7.06e, 7.06f · MEI AL7, AL8, AL9, AL10, AL11. Level: AS & A.*

### What you need to know

- Draw each constraint line and shade the unwanted side; the feasible region is left clear.
- The optimum is at a vertex: slide the objective line (ruler method) or evaluate the objective at each vertex.
- For integer solutions, check integer points near the optimal vertex.
- Sensitivity: changing a coefficient in the objective changes the gradient of the objective line and may move the optimum to a different vertex.

### Worked example

Solve the bakery LP graphically.

1. Vertices: (0, 0), (3.5, 0), (3, 2) where the lines meet, (0, 4).
2. P: 0, 14, 22, 20. Maximum P = 22 at x = 3, y = 2.

Minimise C = 2x + 3y subject to x + y ≥ 5, x ≤ 4, y ≤ 4, x, y ≥ 0.

1. Vertices of the feasible region: (4, 1), (4, 4), (1, 4).
2. C: 11, 20, 14. Minimum C = 11 at (4, 1).

For what values of k does the bakery's optimum stay at (3, 2) if the profit on bread is £k?

1. The objective line kx + 5y must lie between the gradients of the constraints through (3, 2): −2/3 and −4.
2. −4 ≤ −k/5 ≤ −2/3 gives 10/3 ≤ k ≤ 20.

### Common mistakes

- Shading the feasible region instead of the unwanted regions (follow your board's convention and say which).

## DD3 The simplex algorithm

*Refs: AQA DD3, DD4 · Edexcel D1 5.3 · OCR 7.06b, 7.07a, 7.07b, 7.07c, 7.07d, 7.07e, 7.07f · MEI AL4, AL12, AL13, AL18. Level: A-level only (OCR); option (others).*

### What you need to know

- Add a slack variable to each ≤ constraint to make an equation.
- Initial tableau: rows for constraints, objective row P − 4x − 5y = 0.
- Pivot column: the most negative entry in the objective row. Pivot row: smallest non-negative ratio (value ÷ positive entry in the pivot column).
- Divide the pivot row by the pivot; subtract multiples of it from other rows to make the rest of the column zero.
- Stop when there are no negative entries in the objective row. Read basic variables from columns with a single 1; non-basic variables are 0.
- Each tableau corresponds to a vertex of the feasible region.
- To minimise C, maximise −C.

### Worked example

Solve the bakery LP by simplex.

Initial tableau:

| Basic | x | y | s₁ | s₂ | Value |
| --- | --- | --- | --- | --- | --- |
| s₁ | 2 | 3 | 1 | 0 | 12 |
| s₂ | 4 | 1 | 0 | 1 | 14 |
| P | −4 | −5 | 0 | 0 | 0 |

1. Pivot column y; ratios 12/3 = 4, 14/1 = 14; pivot row s₁.
2. After the first iteration: y row (2/3, 1, 1/3, 0, 4); s₂ row (10/3, 0, −1/3, 1, 10); P row (−2/3, 0, 5/3, 0, 20).
3. Pivot column x; ratios 4 ÷ 2/3 = 6, 10 ÷ 10/3 = 3; pivot row s₂.
4. Second iteration: x row (1, 0, −1/10, 3/10, 3); y row (0, 1, 2/5, −1/5, 2); P row (0, 0, 8/5, 1/5, 22).
5. No negatives: optimal. x = 3, y = 2, P = 22, both slacks 0 (all oven time and flour used).

### Common mistakes

- Choosing a negative ratio, or dividing by a negative pivot entry.

## Two-stage simplex and big-M

*Refs: Edexcel D1 5.4 · MEI AL14, AL15, AL16, AL17. Level: A-level only.*

### What you need to know

- A ≥ constraint gets a surplus variable and an artificial variable: x + y − s + a = 5.
- Two-stage: first minimise the sum of artificial variables (maximise −Σa); when it reaches 0, drop the artificial columns and continue with the real objective.
- Big-M: include −Ma for each artificial variable in the objective, M a large number, and run simplex once.
- An equality constraint can be written as two inequalities (≤ and ≥). A variable allowed to be negative can be replaced by the difference of two non-negative variables (MEI AL16).

### Explained

Artificial variables give an obvious starting basic feasible solution even though the origin is not feasible. Stage 1 finds a feasible vertex; stage 2 optimises from it.

### Common mistakes

- Forgetting to express the stage 1 objective in terms of non-basic variables before starting.

## Check questions

1. A firm makes x chairs and y tables. A chair takes 2 hours to make and 1 hour to finish; a table 3 hours and 2 hours. 60 making hours and 35 finishing hours are available. Profit is £20 per chair and £35 per table. Formulate the LP and solve it graphically. [7 marks]
2. Use the simplex algorithm to maximise P = 2x + 3y subject to x + 2y ≤ 8, 3x + y ≤ 9, x, y ≥ 0. [8 marks]
3. A final tableau has P row (0, 0, 1.5, 0.5, 0, 42). Explain how you know it is optimal and what the zero slack variables mean. [2 marks]
4. Show how to set up the first tableau of a two-stage simplex for: maximise P = x + 2y subject to x + y ≥ 3, x + 2y ≤ 10. [4 marks]

## Mark scheme

1. Maximise P = 20x + 35y (1); 2x + 3y ≤ 60, x + 2y ≤ 35, x, y ≥ 0 (2). Vertices (0, 0), (30, 0), (15, 10), (0, 17.5) (2). P: 0, 600, 650, 612.5 (1). Maximum £650 with 15 chairs and 10 tables (1).
2. Tableau with slacks (1). Pivot y column, ratios 4 and 9, pivot row 1 (1). Row ops correct (2). Next pivot x column (1). Final x = 2, y = 3 (2), P = 13 (1).
3. No negative entries in the objective row (1). Those constraints are fully used (binding) (1).
4. x + y − s₁ + a₁ = 3, x + 2y + s₂ = 10 (2). Stage 1 objective: maximise I = −a₁, written as I − x − y + s₁ = −3 after substituting a₁ (2).
