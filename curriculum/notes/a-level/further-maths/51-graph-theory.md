---
level: A-level
subject: Further Mathematics
topic: "Graph theory"
as_content: "Option content. OCR 7.02 Stage 1 parts (language, trees, Eulerian graphs, isomorphism, digraphs, adjacency matrices) are AS; planarity, Hamiltonian graphs, Ore's theorem and thickness are Stage 2. MEI AN1, AN2 are also in AS paper Y413. Edexcel D1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DA1", "DA2", "DA3", "DA4", "DA5", "DA6", "DA7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D1 1.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.02a", "7.02b", "7.02c", "7.02d", "7.02e", "7.02f", "7.02g", "7.02h", "7.02i", "7.02j", "7.02k", "7.02l", "7.02m", "7.02n", "7.02o", "7.02q", "7.02p", "7.02r"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AN1", "AN2"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Graph theory

This file covers the language of graphs, degree and the handshaking lemma, simple graphs, trees, complete and bipartite graphs, complements, adjacency matrices, digraphs, Eulerian and Hamiltonian graphs (including Ore's theorem), isomorphism, planarity (Euler's formula, Kuratowski's theorem, the planarity algorithm, thickness) and colouring arguments.

## Overview

Option content. Weighted graphs (networks) and their algorithms are in [52-network-algorithms.md](52-network-algorithms.md).

### Board differences

- AQA DA1 to DA7: language, Eulerian, semi-Eulerian and Hamiltonian graphs, Euler's formula, Kuratowski's theorem, complete and bipartite graphs, adjacency matrices, complements, trees and isomorphism.
- Edexcel D1 1.4: the planarity algorithm (for graphs with a Hamiltonian cycle). Other graph language appears in the D1 glossary.
- OCR 7.02a to 7.02r: the widest coverage, including colouring arguments (7.02f), Ore's theorem (7.02i), digraphs (7.02k) and thickness (7.02o).
- MEI AN1, AN2: graph language and modelling problems with graphs.

## DA1 The language of graphs

*Refs: AQA DA1, DA5, DA6 · OCR 7.02a, 7.02b, 7.02c, 7.02d, 7.02e, 7.02k, 7.02q · MEI AN1, AN2. Level: AS & A (OCR, MEI).*

### What you need to know

- A graph has vertices (nodes) joined by edges (arcs). The degree (order) of a vertex is the number of edge ends at it; a loop counts 2.
- Handshaking lemma: the sum of degrees = 2 × number of edges, so the number of odd vertices is even.
- Walk: any sequence of edges; trail: no edge repeated; path: no vertex repeated; cycle: a closed path.
- Simple graph: no loops or multiple edges. Connected: a path between every pair of vertices. Subgraph; subdivision (edges split by new degree-2 vertices).
- Tree: connected with no cycles; a tree with n vertices has n − 1 edges. Spanning tree: a subgraph tree including every vertex.
- Kₙ: complete graph, every pair joined, n(n − 1)/2 edges. K_{m,n}: complete bipartite graph, mn edges.
- Complement of a simple graph G: same vertices, with an edge exactly where G has none.
- Adjacency matrix: entry (i, j) is the number of edges between i and j.
- Digraph: edges have directions; in-degree and out-degree.

### Worked example

A simple graph has 6 vertices with degrees 1, 2, 2, 3, 3, x. Find the possible values of x.

1. The degree sum 11 + x must be even, so x is odd.
2. In a simple graph with 6 vertices, x ≤ 5. So x = 1, 3 or 5 (each can be confirmed by drawing a graph).

How many edges does the complement of K_{3,4} have?

1. K₇ has 21 edges; K_{3,4} has 12. Complement 9 edges (a K₃ and a K₄, disjoint).

### Common mistakes

- Counting a loop as degree 1.

## DA2 Eulerian and Hamiltonian graphs

*Refs: AQA DA2 · OCR 7.02g, 7.02h, 7.02i. Level: AS & A (OCR 7.02h, 7.02i A-level only).*

### What you need to know

- Eulerian: a connected graph with a closed trail using every edge exactly once; this happens if and only if every vertex has even degree.
- Semi-Eulerian: exactly two odd vertices; an open trail using every edge starts at one and ends at the other.
- Hamiltonian: has a cycle visiting every vertex exactly once. There is no simple test.
- Ore's theorem: a simple graph with n ≥ 3 vertices is Hamiltonian if deg(u) + deg(v) ≥ n for every pair of non-adjacent vertices u, v. (A sufficient condition, not necessary.)

### Worked example

Which complete graphs Kₙ are Eulerian?

1. Every vertex has degree n − 1. Eulerian if n − 1 is even: n odd.

Show that K_{3,3} is Hamiltonian, and use Ore's theorem on it.

1. Cycle A1 B1 A2 B2 A3 B3 A1 visits all 6 vertices.
2. Non-adjacent pairs are in the same set, each with degree 3: 3 + 3 = 6 ≥ 6. Ore's theorem confirms it.

### Common mistakes

- Thinking a Hamiltonian cycle must use every edge.

## DA7 Isomorphism

*Refs: AQA DA7 · OCR 7.02j. Level: AS & A.*

### What you need to know

- Two graphs are isomorphic if there is a one-to-one matching of vertices that preserves adjacency.
- Isomorphic graphs have the same numbers of vertices and edges and the same degree sequence; these are necessary, not sufficient. Look also for cycles of a given length.

### Worked example

Are the 6-cycle C₆ and two disjoint triangles isomorphic?

1. Both have 6 vertices, 6 edges and all degrees 2.
2. C₆ is connected; two triangles are not. Not isomorphic.

## DA3 Planarity

*Refs: AQA DA3, DA4 · Edexcel D1 1.4 · OCR 7.02f, 7.02l, 7.02m, 7.02n, 7.02o. Level: A-level only (OCR); option (AQA, Edexcel).*

### What you need to know

- A planar graph can be drawn with no edges crossing. It divides the plane into regions (faces), including the outside region.
- Euler's formula for a connected planar graph: V + R = E + 2 (equivalently V − E + R = 2).
- For a simple connected planar graph with V ≥ 3: E ≤ 3V − 6 (each region has at least 3 edges). If there are no triangles: E ≤ 2V − 4.
- K₅ and K_{3,3} are not planar. Kuratowski's theorem: a graph is planar if and only if it has no subgraph that is a subdivision of K₅ or K_{3,3}.
- Planarity algorithm (Edexcel): draw a Hamiltonian cycle as a polygon, list the other edges, and place them inside or outside so that none cross (edges that would cross go on opposite sides). If this cannot be done, the graph is not planar.
- Thickness (OCR): the least number of planar graphs whose union is the graph. K₅ and K_{3,3} have thickness 2.
- (OCR 7.02f) Colouring arguments, for example showing a graph is bipartite (2-colourable) or not.

### Worked example

Show that K₅ is not planar.

1. V = 5, E = 10. If planar and simple, E ≤ 3V − 6 = 9. But E = 10. Not planar.

Show that K_{3,3} is not planar.

1. V = 6, E = 9. Bipartite, so no triangles: E ≤ 2V − 4 = 8. But E = 9. Not planar.

A connected planar graph has 8 vertices and 12 edges. How many regions?

1. R = E + 2 − V = 6.

### Common mistakes

- Using E ≤ 3V − 6 to prove a graph is planar (it only shows non-planarity).
- Forgetting the outside region.

## Check questions

1. A graph has degree sequence 2, 2, 3, 3, 4, 4. (a) How many edges? (b) Is it Eulerian, semi-Eulerian or neither? [3 marks]
2. Draw a simple graph with 5 vertices that is Eulerian but not Hamiltonian. [2 marks]
3. Find the number of edges of K₈, K_{4,5} and the complement of K_{4,5}. [3 marks]
4. Explain why a tree with 9 vertices has 8 edges and at least two vertices of degree 1. [3 marks]
5. A simple connected planar graph has 10 vertices and every region is a triangle (including the outside). Find the number of edges and regions. [3 marks]
6. Show that the graph obtained from K₆ by deleting 2 edges is not planar. [3 marks]

## Mark scheme

1. (a) Sum 18, 9 edges (1). (b) Two odd vertices (1): semi-Eulerian (1).
2. E.g. two triangles sharing one vertex ("bow tie"): all degrees even, but the shared vertex would be visited twice in any cycle through all vertices (2).
3. 28 (1). 20 (1). K₉ has 36 edges, so 16 (1).
4. A tree is connected with no cycles; adding vertices one at a time each adds one edge, giving n − 1 = 8 (2). Degree sum 16 over 9 vertices with each degree ≥ 1, and the longest path's end vertices have degree 1 (1).
5. 3R = 2E and V + R = E + 2 (1). E = 3V − 6 = 24 (1). R = 16 (1).
6. V = 6, E = 15 − 2 = 13 (1). 3V − 6 = 12 (1). 13 > 12, so not planar (1).
