---
level: A-level
subject: Computer Science
topic: "Shortest paths: Dijkstra's algorithm and the A* algorithm"
as_content: "A-level only for AQA and OCR."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.3.6.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["2.3.1(f)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Searching", "C2.2: Communication networks"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Shortest paths: Dijkstra and A*

This file covers Dijkstra's shortest path algorithm (tracing it and its uses) and the A* algorithm with heuristics. Weighted graphs are in [06-graphs-trees-hash-tables-and-dictionaries.md](06-graphs-trees-hash-tables-and-dictionaries.md); breadth-first search, which finds shortest paths in unweighted graphs, is in [08](08-graph-and-tree-traversal-and-reverse-polish.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Dijkstra | Trace it; know applications. You do not need to recall the steps | Know and trace | "A shortest-path algorithm" (C1.3); calculate lowest-cost routes on a network (C2.2) |
| A* | Not required | Know and trace | Not required |

## 4.3.6.1 Dijkstra's shortest path algorithm

*Refs: AQA 4.3.6.1 · OCR 2.3.1(f) · Eduqas C1.3: Searching, C2.2: Communication networks.*

### What you need to know

- Dijkstra's algorithm finds the shortest (lowest total weight) path from one start vertex to every other vertex in a weighted graph. Weights must not be negative.
- Idea: keep a tentative distance for every vertex (0 for the start, ∞ for the rest). Repeatedly pick the unvisited vertex with the smallest tentative distance, mark it visited (its distance is now final), and update ("relax") each unvisited neighbour: if distance(current) + edge weight is smaller than the neighbour's tentative distance, replace it and record current as the neighbour's previous vertex.
- Stop when all vertices are visited (or when the target is visited, if you only need one path). Rebuild the route by following previous vertices back from the target.
- A priority queue (file 05) is the natural structure for "pick the smallest". Time is about O(V²) with a simple array, or O((V + E) log V) with a heap-based priority queue.
- It is a greedy algorithm: it always takes the locally best choice, and with non-negative weights that is guaranteed to be optimal.
- Applications: satellite navigation and route planning; routing packets on the internet (link-state routing protocols such as OSPF use it); finding the cheapest or fastest connection in transport networks; network latency planning; games pathfinding (often via A*); planning cable or pipe layouts.

### Worked example

Find the shortest path from A to every vertex.

```
A–B 4    A–C 2    B–C 1    B–D 5    C–D 8    C–E 10    D–E 2    D–F 6    E–F 2
```

| Step | Visit | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- |
| start | | 0 | ∞ | ∞ | ∞ | ∞ | ∞ |
| 1 | A (0) | **0** | 4 (A) | 2 (A) | ∞ | ∞ | ∞ |
| 2 | C (2) | | 3 (C) | **2** | 10 (C) | 12 (C) | ∞ |
| 3 | B (3) | | **3** | | 8 (B) | 12 | ∞ |
| 4 | D (8) | | | | **8** | 10 (D) | 14 (D) |
| 5 | E (10) | | | | | **10** | 12 (E) |
| 6 | F (12) | | | | | | **12** |

Reading the steps:

- Step 2: from C, B can be reached in 2 + 1 = 3 < 4, so B's distance improves and its previous vertex becomes C.
- Step 3: from B, D is 3 + 5 = 8 < 10, so D improves.
- Step 4: from D, E is 8 + 2 = 10 < 12; F is 8 + 6 = 14.
- Step 5: from E, F is 10 + 2 = 12 < 14.

Shortest path A to F: follow previous vertices back: F ← E ← D ← B ← C ← A. Path A → C → B → D → E → F, length 12.

```python
import heapq

def dijkstra(graph, start):
    dist = {v: float("inf") for v in graph}
    prev = {v: None for v in graph}
    dist[start] = 0
    pq = [(0, start)]                       # priority queue of (distance, vertex)
    visited = set()
    while pq:
        d, v = heapq.heappop(pq)
        if v in visited:
            continue
        visited.add(v)                      # distance to v is now final
        for n, w in graph[v].items():
            if n not in visited and d + w < dist[n]:
                dist[n] = d + w             # relax the edge
                prev[n] = v
                heapq.heappush(pq, (dist[n], n))
    return dist, prev

def path_to(prev, target):
    path = []
    while target is not None:
        path.insert(0, target)
        target = prev[target]
    return path
```

### Common mistakes

- Visiting vertices in alphabetical order rather than smallest tentative distance first.
- Updating the distance of an already visited vertex. Once visited, its distance is final.
- Stopping when the target is first given a tentative distance. It is only final when the target is visited.
- Using Dijkstra on graphs with negative weights: it can give wrong answers.

## The A* algorithm

*Refs: OCR 2.3.1(f).*

### What you need to know

- A* finds the shortest path from a start to one goal vertex, usually faster than Dijkstra, by using a heuristic to guide the search towards the goal.
- For each vertex n: g(n) is the actual cost of the best path found so far from the start to n; h(n) is the heuristic, an estimate of the cost from n to the goal; f(n) = g(n) + h(n) is the estimated total cost of a path through n.
- Always expand the open (unvisited) vertex with the smallest f. Update neighbours' g, f and previous vertex as in Dijkstra. Stop when the goal is chosen for expansion.
- The heuristic must be admissible (never overestimate the real remaining cost) for A* to be guaranteed to find the shortest path. Common heuristics: straight-line (Euclidean) distance on maps; Manhattan distance (|Δx| + |Δy|) on grids with no diagonal moves.
- If h(n) = 0 for all n, A* behaves exactly like Dijkstra.
- Advantages: explores far fewer vertices than Dijkstra for a single goal, so faster. Disadvantages: needs a good heuristic; only finds a path to one goal; a poor (overestimating) heuristic may give a non-optimal path.
- Uses: games (moving characters around obstacles), robot navigation, route planners.

### Worked example

Find the shortest path from S to G. Edge weights and heuristic values (estimated distance to G) are:

```
S–A 2    S–B 4    A–C 5    B–C 2    B–D 6    C–G 3    D–G 1
h: S 7, A 6, B 4, C 3, D 1, G 0
```

| Step | Expand (lowest f) | Updates (g, h, f, previous) | Open list after |
| --- | --- | --- | --- |
| 1 | S (g 0, f 7) | A: g 2, f 8, S. B: g 4, f 8, S | A 8, B 8 |
| 2 | A (f 8; tie, first added) | C: g 7, f 10, A | B 8, C 10 |
| 3 | B (f 8) | C: g 6 < 7, so g 6, f 9, previous B. D: g 10, f 11, B | C 9, D 11 |
| 4 | C (f 9) | G: g 9, f 9, C | G 9, D 11 |
| 5 | G (f 9) | goal chosen: stop | |

Path: G ← C ← B ← S, so S → B → C → G, cost 9. D was never expanded, which saves work compared with Dijkstra.

```python
import heapq

def a_star(graph, h, start, goal):
    g = {v: float("inf") for v in graph}
    prev = {v: None for v in graph}
    g[start] = 0
    open_pq = [(h[start], start)]
    closed = set()
    while open_pq:
        f, v = heapq.heappop(open_pq)
        if v == goal:
            break
        if v in closed:
            continue
        closed.add(v)
        for n, w in graph[v].items():
            if n not in closed and g[v] + w < g[n]:
                g[n] = g[v] + w
                prev[n] = v
                heapq.heappush(open_pq, (g[n] + h[n], n))
    return g[goal], prev
```

### Common mistakes

- Choosing the next vertex by g (that is Dijkstra) or by h alone (greedy best-first, which may not find the shortest path). Use f = g + h.
- Adding the heuristic to the stored path cost: g is the real cost; h is only used for choosing the order.
- Stopping when the goal is first reached through an edge rather than when it is selected with the lowest f.

## Check questions

1. State the purpose of Dijkstra's algorithm and one restriction on the graphs it can be used on. [2 marks]
2. Give two real-world applications of shortest-path algorithms. [2 marks]
3. Apply Dijkstra's algorithm to find the shortest distance from P to every other vertex, showing each step: P–Q 7, P–R 3, R–Q 2, Q–S 4, R–S 8, S–T 1, Q–T 6. [5 marks]
4. State the shortest path from P to T in Q3. [1 mark]
5. Explain why a vertex's distance can no longer change once it has been visited. [2 marks]
6. In A*, explain what g(n), h(n) and f(n) represent. [3 marks]
7. Explain what is meant by an admissible heuristic and why it matters. [2 marks]
8. Explain why A* often finishes sooner than Dijkstra's algorithm when finding a path to a single destination. [2 marks]
9. On a grid where moves are only up, down, left or right with cost 1, suggest a heuristic for A* and justify it. [2 marks]
10. (Eduqas) A network has routers R1 to R4 with link costs R1–R2 5, R1–R3 2, R3–R2 2, R2–R4 1, R3–R4 6. Calculate the lowest-cost route from R1 to R4. [2 marks]

## Mark scheme

1. Finds the shortest path/lowest total weight from one vertex to all others in a weighted graph (1); edge weights must not be negative (1).
2. Any two: sat nav/route planning; routing packets in networks; transport/flight connections; games pathfinding; laying cables/pipes (2).
3. Start P 0. Visit P: R 3 (P), Q 7 (P) (1). Visit R (3): Q 3 + 2 = 5 < 7 → 5 (R); S 11 (R) (1). Visit Q (5): S 5 + 4 = 9 < 11 → 9 (Q); T 11 (Q) (1). Visit S (9): T 9 + 1 = 10 < 11 → 10 (S) (1). Visit T (10). Final: Q 5, R 3, S 9, T 10 (1).
4. P → R → Q → S → T (1).
5. It was chosen because it had the smallest tentative distance of all unvisited vertices (1); any other route must pass through an unvisited vertex with an equal or larger distance and weights are non-negative, so cannot be shorter (1).
6. g: actual cost of the path found so far from the start to n (1); h: heuristic estimate of the cost from n to the goal (1); f = g + h, estimated total cost of the best path through n (1).
7. Never overestimates the true remaining cost (1); guarantees A* finds the shortest path (1).
8. The heuristic directs the search towards the goal (1); so fewer vertices are expanded/vertices leading away from the goal are not explored (1).
9. Manhattan distance |x₁ − x₂| + |y₁ − y₂| (1); it equals the fewest possible moves if there were no obstacles, so it never overestimates/is admissible (1).
10. R1 → R3 → R2 → R4 (1); cost 2 + 2 + 1 = 5 (1).
