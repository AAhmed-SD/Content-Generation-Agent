---
level: A-level
subject: Further Mathematics
topic: "Dynamic programming and decision analysis"
as_content: "All of this file is A-level option content (Edexcel Decision Mathematics 2)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D2 4.1", "D2 7.1", "D2 7.2"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Dynamic programming and decision analysis

This file covers the principles of dynamic programming (stages, states, actions, Bellman's principle of optimality), solving minimum, maximum, minimax and maximin problems by working backwards in a table, and decision trees with expected monetary value and utility.

## Overview

Edexcel D2 only. Shortest paths by Dijkstra are in [52-network-algorithms.md](52-network-algorithms.md); expectation is in [30-discrete-random-variables.md](30-discrete-random-variables.md).

The example network has stages S → {A, B} → {C, D, E} → {F, G} → T with arcs SA 4, SB 3, AC 5, AD 3, BD 6, BE 4, CF 2, DF 4, DG 3, EG 5, FT 6, GT 4.

### Board differences

- Edexcel D2 4.1 (dynamic programming, including minimax and maximin) and 7.1, 7.2 (decision trees, expected monetary value, utility). No other board includes these.

## D2 4.1 Dynamic programming

*Refs: Edexcel D2 4.1. Level: A-level only.*

### What you need to know

- A problem is split into stages; at each stage the system is in a state; an action moves it to a state in the next stage.
- Bellman's principle of optimality: any part of an optimal path from a state to the end is itself optimal from that state.
- Work backwards from the end, recording for each state the best value to the end and the action that achieves it.
- Minimax: minimise the largest single arc (for example the greatest single day's travel). Maximin: maximise the smallest single arc (for example the lowest bridge height).

### Explained

Use a table with columns Stage, State, Action, Value, Optimal value. For each state, list each action, its value (arc + optimal value of the state reached, or for minimax the larger of the arc and that value), and keep the best.

### Worked example

Find the shortest route from S to T.

| Stage | State | Action | Value | Best |
| --- | --- | --- | --- | --- |
| 1 | F | T | 6 | 6 |
| 1 | G | T | 4 | 4 |
| 2 | C | F | 2 + 6 = 8 | 8 |
| 2 | D | F; G | 4 + 6 = 10; 3 + 4 = 7 | 7 |
| 2 | E | G | 5 + 4 = 9 | 9 |
| 3 | A | C; D | 5 + 8 = 13; 3 + 7 = 10 | 10 |
| 3 | B | D; E | 6 + 7 = 13; 4 + 9 = 13 | 13 |
| 4 | S | A; B | 4 + 10 = 14; 3 + 13 = 16 | 14 |

Shortest route S–A–D–G–T, length 14.

Find the maximin route (the route whose smallest arc is as large as possible).

1. F: 6; G: 4. C: min(2, 6) = 2. D: max(min(4, 6), min(3, 4)) = 4 via F. E: min(5, 4) = 4.
2. A: max(min(5, 2), min(3, 4)) = 3. B: max(min(6, 4), min(4, 4)) = 4.
3. S: max(min(4, 3), min(3, 4)) = 3. Maximin value 3 (for example S–B–D–F–T, smallest arc SB = 3).

### Common mistakes

- Working forwards and losing the principle of optimality.

## D2 7 Decision trees

*Refs: Edexcel D2 7.1, 7.2. Level: A-level only.*

### What you need to know

- Decision nodes (squares): the decision-maker chooses. Chance nodes (circles): outcomes with probabilities. End points show pay-offs.
- Roll back from the right: at a chance node take the expected monetary value (EMV); at a decision node choose the best branch.
- Utility: replace money by a utility value to reflect attitude to risk; then choose the option with the greatest expected utility.

### Worked example

A firm can launch a product (success probability 0.6, profit £50k; failure −£20k) or not launch (£0). It can first commission research costing £4k. The research says "good" with probability 0.5, after which success has probability 0.9; or "bad", after which success has probability 0.3.

1. Without research: EMV of launching 0.6(50) + 0.4(−20) = 22. Launch: £22k.
2. Research "good": launch EMV 0.9(50) + 0.1(−20) = 43. Research "bad": launch EMV 0.3(50) + 0.7(−20) = 1 > 0, so still launch.
3. EMV with research = 0.5(43) + 0.5(1) − 4 = 18.
4. 18 < 22: do not commission the research; launch straight away.

With utility u(x) = √(x + 20) (x in £k), compare launching without research and not launching.

1. Launch: 0.6√70 + 0.4√0 = 5.02. Not launch: √20 = 4.47.
2. Launch has greater expected utility.

### Common mistakes

- Subtracting the cost of research twice (once in the pay-offs and again at the root).

## Check questions

1. Use dynamic programming to find the longest route from S to T in the example network. [6 marks]
2. A lorry route must minimise the longest single day's drive (minimax). Explain how the value at each state is calculated. [2 marks]
3. A game costs £2 to play. You win £10 with probability 0.15, £3 with probability 0.3, otherwise nothing. Find the EMV of playing and decide whether to play. [3 marks]
4. In the product example, find the greatest cost of research for which commissioning it would be worthwhile. [3 marks]

## Mark scheme

1. Backwards: F 6, G 4; C 8, D max(10, 7) = 10, E 9; A max(13, 13) = 13, B max(16, 13) = 16 (4). S max(17, 19) = 19 via S–B–D–F–T (2).
2. For each action, take the larger of the arc and the optimal value of the next state (1); then choose the action with the smallest such value (1).
3. EMV = 0.15(10) + 0.3(3) − 2 = 0.4 (2). Positive, so play on EMV grounds (1).
4. EMV with research before cost: 22 (1). Without research: 22 (1). Research is worthwhile only if it costs nothing; here it has no value because the decision is the same whatever the result (1).
