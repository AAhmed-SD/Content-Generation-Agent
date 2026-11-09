---
level: A-level
subject: Further Mathematics
topic: "Network flows"
as_content: "Option content: AQA Discrete (DC), Edexcel Decision 2 and MEI Modelling with Algorithms (also AS paper Y413)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DC1", "DC2", "DC3", "DC4", "DC5", "DC6", "DC7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D2 3.1", "D2 3.2", "D2 3.3", "D2 3.4", "D2 3.5"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AN10", "AN11", "AN12", "AN13"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Network flows

This file covers flows in directed networks with capacities, cuts and their values, the maximum flow-minimum cut theorem, finding flow-augmenting paths with the labelling procedure, supersources and supersinks, vertices with restricted capacity, and arcs with lower as well as upper capacities.

## Overview

Option content. Graph language is in [51-graph-theory.md](51-graph-theory.md); network flow problems can also be formulated as linear programmes ([54-linear-programming-and-simplex.md](54-linear-programming-and-simplex.md)).

The example network: source S, sink T, arcs S→A 10, S→B 8, A→B 3, A→C 7, B→D 9, C→T 8, D→C 4, D→T 6 (capacities).

### Board differences

- AQA DC1 to DC7, including arcs with upper and lower capacities (DC6) and nodes of restricted capacity (DC7).
- Edexcel D2 3.1 to 3.5: cuts, the labelling procedure (forward and backward arrows), max flow-min cut, multiple sources and sinks, restricted vertices, and finding optimal flows.
- MEI AN10 to AN13: flows, cuts, max flow-min cut, and exploring network algorithms with software.
- OCR H245 does not include network flows.

## DC1 Flows and cuts

*Refs: AQA DC1, DC2 · Edexcel D2 3.1 · MEI AN10, AN11. Level: AS & A (MEI); option (AQA, Edexcel).*

### What you need to know

- A feasible flow does not exceed any arc's capacity (and is at least any lower capacity) and is conserved at every vertex other than the source and sink (flow in = flow out).
- A cut divides the vertices into a set containing S and a set containing T. Its value (capacity) is the sum of capacities of arcs going from the S side to the T side; arcs going the other way count 0 (or their lower capacity, if any, is subtracted).

### Worked example

Find the values of three cuts in the example network.

1. {S} | rest: S→A + S→B = 18.
2. {S, A, B} | {C, D, T}: A→C + B→D = 16.
3. {S, A, B, C, D} | {T}: C→T + D→T = 14.

### Common mistakes

- Adding the capacity of an arc that crosses the cut from the T side to the S side.

## DC3 Maximum flow-minimum cut

*Refs: AQA DC3, DC5 · Edexcel D2 3.2, 3.3 · MEI AN12. Level: AS & A (MEI); option.*

### What you need to know

- Max flow-min cut theorem: the maximum flow equals the minimum cut value.
- To prove a flow is maximal, find a cut whose value equals it.
- Labelling procedure: on each arc, a forward label shows spare capacity and a backward label shows the flow that could be removed. Find a path from S to T with positive labels (a flow-augmenting path), increase the flow by the smallest label along it, and update the labels. Repeat until no path exists.

### Worked example

Find the maximum flow in the example network.

1. Augment S–A–C–T by 7. Then S–B–D–T by 6. Then S–B–D–C–T by 1 (C→T then has no spare capacity).
2. Now C→T and D→T are both full, so no flow-augmenting path reaches T.
3. Total flow 7 + 6 + 1 = 14.
4. The cut {S, A, B, C, D} | {T} has value 14, so 14 is maximal.

### Common mistakes

- Stopping without proving maximality with a cut.

## DC4 Supersources, supersinks and restricted vertices

*Refs: AQA DC4, DC7 · Edexcel D2 3.4 · MEI AN13. Level: option.*

### What you need to know

- Several sources: add a supersource joined to each with capacity equal to that source's total output (or unlimited). Similarly a supersink.
- A vertex V with capacity c: replace it by V₁ → V₂ with an arc of capacity c; arcs into V go to V₁, arcs out leave V₂.

### Worked example

In the example network, D can process at most 8 units. How does this change the maximum flow?

1. Split D into D₁ → D₂ with capacity 8.
2. The current flow through D is 7 (6 to T and 1 to C), which is under 8. The maximum stays 14.

## DC6 Lower capacities

*Refs: AQA DC6 · Edexcel D2 3.5. Level: option.*

### What you need to know

- If an arc must carry at least l and at most u, a feasible flow must respect both. A cut's value is the sum of upper capacities of arcs from S to T side minus the sum of lower capacities of arcs from T side to S side.
- Start from a feasible flow that meets the lower capacities, then augment.

### Worked example

In a network, a cut has forward arcs with upper capacities 10 and 7, and a backward arc with lower capacity 2. Find its value.

1. 10 + 7 − 2 = 15.

## Check questions

1. In the example network, find the value of the cut {S, A} | {B, C, D, T}. [2 marks]
2. A network has arcs S→P 6, S→Q 5, P→Q 2, P→T 4, Q→T 7. Find the maximum flow and a minimum cut. [5 marks]
3. Explain how to deal with a network that has two sinks. [2 marks]
4. Explain why the value of any cut is an upper bound for any flow. [2 marks]

## Mark scheme

1. S→B 8 + A→B 3 + A→C 7 = 18 (2).
2. Flow: S–P–T 4, S–Q–T 5, S–P–Q–T 2: total 11 (3). Cut {S, P, Q} | {T}: 4 + 7 = 11 (1), so 11 is maximal (1).
3. Add a supersink joined from each sink by an arc of capacity at least that sink's demand (or unlimited) (2).
4. All flow from S to T must cross the cut, and the flow across it cannot exceed the capacities of the forward arcs (2).
