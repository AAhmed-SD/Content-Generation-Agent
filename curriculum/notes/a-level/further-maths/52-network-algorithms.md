---
level: A-level
subject: Further Mathematics
topic: "Network algorithms: spanning trees, shortest paths, route inspection and the travelling salesperson"
as_content: "Option content. OCR 7.04a, 7.04b, 7.04f are Stage 1 (AS); 7.04c to 7.04e are Stage 2. MEI AN3 to AN7 are also in AS paper Y413. Edexcel D1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DB1", "DB2", "DB3", "DB4", "DB5"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D1 2.1", "D1 2.2", "D1 3.1", "D1 3.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.02p", "7.02r", "7.04a", "7.04b", "7.04c", "7.04d", "7.04e", "7.04f"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AN3", "AN4", "AN5", "AN6", "AN7"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Network algorithms: spanning trees, shortest paths, route inspection and the travelling salesperson

This file covers networks (weighted graphs), minimum spanning trees by Kruskal's and Prim's algorithms (including the matrix form of Prim), shortest paths by Dijkstra's and Floyd's algorithms, the route inspection (Chinese postman) problem, and upper and lower bounds for the travelling salesperson problem.

## Overview

Option content. Graph language and Eulerian graphs are in [51-graph-theory.md](51-graph-theory.md). The example network used below has vertices A to F and edges AB 7, AC 4, AD 9, BC 5, BE 6, CD 3, CE 8, DE 7, DF 6, EF 5 (total weight 60).

### Board differences

- AQA DB1 to DB5: minimum spanning trees, route inspection, TSP bounds, and evaluating network models. AQA does not name Dijkstra's algorithm.
- Edexcel D1 2.1, 2.2 (Kruskal, Prim including on a distance matrix, Dijkstra, Floyd), 3.1, 3.2 (route inspection with up to four odd vertices; classical and practical TSP, nearest neighbour, lower bounds, tour improvement).
- OCR 7.02p, 7.02r, 7.04a to 7.04f (Stage 2 adds nearest neighbour, lower bounds and route inspection).
- MEI AN3 to AN7 (Kruskal, Prim, Dijkstra; their complexities).

## DB2 Minimum spanning trees

*Refs: AQA DB1, DB2 · Edexcel D1 2.1 · OCR 7.02p, 7.04a · MEI AN3, AN4, AN5, AN7. Level: AS & A.*

### What you need to know

- A minimum spanning tree (minimum connector) connects all vertices with the least total weight.
- Kruskal: list edges in increasing weight; add each edge unless it forms a cycle; stop at n − 1 edges.
- Prim: start at any vertex; repeatedly add the least-weight edge joining a vertex in the tree to one outside.
- Prim on a distance matrix: cross out the chosen vertex's row, label its column, and look down the labelled columns for the smallest undeleted entry.
- (MEI AN7) Kruskal's, Prim's and Dijkstra's algorithms are quadratic (O(n²)) in the number of vertices for matrix implementations.

### Worked example

Find a minimum spanning tree of the example network using Kruskal's algorithm.

1. Order: CD 3, AC 4, BC 5, EF 5, BE 6, DF 6, AB 7, DE 7, CE 8, AD 9.
2. Add CD, AC, BC, EF, BE. (DF and later edges are not needed once 5 edges are chosen.)
3. Total weight 3 + 4 + 5 + 5 + 6 = 23.

Prim's algorithm from A gives the order AC, CD, CB, BE, EF, the same tree.

### Common mistakes

- In Kruskal, adding an edge that makes a cycle.
- In Prim, choosing the overall smallest edge rather than one connected to the tree.

## Shortest paths

*Refs: Edexcel D1 2.2 · OCR 7.04b · MEI AN6. Level: AS & A.*

### What you need to know

- Dijkstra: give the start vertex the permanent label 0. From the latest permanent vertex, update working values of its neighbours (keep the smallest). Make the smallest working value permanent. Repeat. Trace the route back using edges whose weight equals the difference in labels.
- Floyd (Edexcel): uses a distance table and a route table, updating every entry through each vertex in turn; it finds shortest paths between all pairs.

### Worked example

Use Dijkstra's algorithm to find the shortest distances from A in the example network.

1. A 0. Working: B 7, C 4, D 9.
2. C 4 permanent. Update D: 4 + 3 = 7; E: 4 + 8 = 12; B stays 7.
3. B 7 and D 7 permanent (either order). From B: E min(12, 13) = 12. From D: F 13, E stays 12.
4. E 12, F 13 permanent.
5. Shortest A to F: 13, route A–C–D–F.

### Common mistakes

- Making a vertex permanent before it has the smallest working value.

## DB3 Route inspection

*Refs: AQA DB3 · Edexcel D1 3.1 · OCR 7.04e. Level: A-level only (OCR); option (AQA, Edexcel).*

### What you need to know

- To traverse every edge and return to the start: if all vertices are even, the length is the total weight.
- Otherwise pair up the odd vertices so that the total of the shortest paths between pairs is least, and repeat those paths.
- With 4 odd vertices there are 3 pairings. If the route may start and finish at different vertices, repeat only the shortest path between one pair of odd vertices and start and finish at the other two.

### Worked example

Find the shortest closed route along every edge of the example network.

1. Degrees: A 3, B 3, C 4, D 4, E 4, F 2. Odd: A, B.
2. Shortest A to B is 7 (direct). Repeat AB.
3. Route length 60 + 7 = 67.

### Common mistakes

- Repeating edges between odd vertices without finding the shortest path.

## DB4 The travelling salesperson problem

*Refs: AQA DB4, DB5 · Edexcel D1 3.2 · OCR 7.04c, 7.04d, 7.04f. Level: A-level only (OCR); option (AQA, Edexcel).*

### What you need to know

- Classical problem: visit each vertex exactly once and return. Practical problem: visit each vertex at least once (replace the network by a complete table of shortest distances).
- Upper bound: the nearest neighbour algorithm gives a tour; the best upper bound is the smallest tour found. (Or double the MST and shortcut.)
- Lower bound: delete a vertex, find the MST of the rest, then add the two shortest edges from the deleted vertex. The best lower bound is the largest found.
- Optimal tour length lies between the best lower and upper bounds; if they are equal, the tour is optimal.

### Worked example

Find upper and lower bounds for the practical TSP on the example network.

1. Nearest neighbour from A (using shortest distances): A–C 4, C–D 3, D–F 6, F–E 5, E–B 6, B–A 7. Total 31.
2. Lower bound deleting A: MST of B to F is CD 3, BC 5, EF 5, BE 6 = 19. Two shortest edges from A: 4 and 7. Lower bound 30.
3. 30 ≤ optimal ≤ 31. (Here the optimal tour is 31.)

### Common mistakes

- Taking the smallest lower bound as the best one.

## Check questions

1. Use Prim's algorithm on this distance matrix, starting from P, and state the weight of the tree. P–Q 8, P–R 5, P–S 9, Q–R 4, Q–S 6, R–S 7. [4 marks]
2. In the example network, use Dijkstra to find the shortest route from B to F. [4 marks]
3. A network has odd vertices W, X, Y, Z with shortest distances WX 5, WY 8, WZ 6, XY 7, XZ 9, YZ 4 and total weight 120. Find the length of the shortest closed route inspection, and the shortest route if it may start and end at different vertices. [5 marks]
4. Explain why the nearest neighbour algorithm gives an upper bound and the deleted-vertex method a lower bound. [3 marks]

## Mark scheme

1. P–R 5, R–Q 4, Q–S 6 (3). Weight 15 (1).
2. B 0; C 5, A 7, E 6 (1). C permanent 5: D 8 (1). E permanent 6: F 11 (1). Shortest B–E–F 11 (1).
3. Pairings: WX + YZ = 9, WY + XZ = 17, WZ + XY = 13 (2). Closed route 120 + 9 = 129 (1). Open route: repeat only the shortest pair distance, 4 (YZ), starting and finishing at W and X: 124 (2).
4. Nearest neighbour gives an actual tour, so the optimum is no longer (1). The deleted-vertex method: any tour minus a vertex is a spanning tree of the rest (weight ≥ MST) plus two edges at the vertex (weight ≥ the two shortest) (2).
