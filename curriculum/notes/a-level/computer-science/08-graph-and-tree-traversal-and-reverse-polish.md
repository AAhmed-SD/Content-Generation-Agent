---
level: A-level
subject: Computer Science
topic: "Graph traversal (breadth-first, depth-first), tree traversal and Reverse Polish notation"
as_content: "A-level only for AQA and OCR."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.3.1.1", "4.3.2.1", "4.3.3.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["2.3.1(e)", "1.4.2(c)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Traversal of data structures"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Graph traversal, tree traversal and Reverse Polish

This file covers breadth-first and depth-first search of a graph, pre-order, in-order and post-order traversal of a tree, and converting between infix and Reverse Polish notation and evaluating it with a stack. The structures themselves are in [05](05-stacks-queues-and-linked-lists.md) and [06](06-graphs-trees-hash-tables-and-dictionaries.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Graph traversal | Trace BFS and DFS; uses | Depth-first and breadth-first traversal | "Traversal of data structures" (algorithms to traverse) |
| Tree traversal | Pre-, in-, post-order; uses | Depth-first (post-order) and breadth-first traversal of trees | As above |
| Reverse Polish | Infix ↔ RPN; why and where used | Not named | Not named |

OCR describes depth-first traversal of a tree as post-order. Learn all three orders anyway, as OCR questions may ask you to trace one given in pseudo-code.

## 4.3.1.1 Simple graph-traversal algorithms

*Refs: AQA 4.3.1.1 · OCR 2.3.1(e) · Eduqas C1.3: Traversal of data structures.*

### What you need to know

- Traversal means visiting every vertex reachable from a start vertex exactly once. Both methods keep track of visited vertices so they do not loop forever round a cycle.
- Breadth-first search (BFS): visit the start vertex, then all its neighbours, then all their unvisited neighbours, and so on, level by level. Uses a queue.
- Depth-first search (DFS): go as far as possible along one path, then backtrack to the last vertex with an unvisited neighbour and continue. Uses a stack (explicitly, or the call stack through recursion).
- Applications:
  - BFS finds the shortest path (fewest edges) in an unweighted graph; also "friends of friends" within n steps, web crawlers by distance, network broadcasting.
  - DFS: navigating or solving a maze, detecting cycles, topological sorting of tasks, finding whether a path exists, backtracking puzzles.
- Both are O(V + E) with an adjacency list.

### Worked example

Graph (adjacency list, neighbours taken in alphabetical order):

```
A: B, C
B: A, D, E
C: A, F
D: B
E: B, F
F: C, E
```

BFS from A:

| Step | Dequeued (visit) | Queue after adding unvisited neighbours | Visited |
| --- | --- | --- | --- |
| 1 | A | B, C | A, B, C |
| 2 | B | C, D, E | + D, E |
| 3 | C | D, E, F | + F |
| 4 | D | E, F | |
| 5 | E | F | (B, F already discovered) |
| 6 | F | empty | |

Order: A, B, C, D, E, F. Here vertices are marked as discovered when added to the queue, so none is queued twice.

DFS from A (recursive):

visit A → first unvisited neighbour B → visit B → its first unvisited neighbour D → visit D → D has no unvisited neighbours, backtrack to B → E → visit E → F → visit F → F's neighbours C (unvisited) → visit C → backtrack all the way. Order: A, B, D, E, F, C.

```python
from collections import deque

def bfs(graph, start):
    visited = [start]
    queue = deque([start])
    order = []
    while queue:
        v = queue.popleft()
        order.append(v)
        for n in graph[v]:
            if n not in visited:
                visited.append(n)
                queue.append(n)
    return order

def dfs(graph, v, visited=None):
    if visited is None:
        visited = []
    visited.append(v)
    for n in graph[v]:
        if n not in visited:
            dfs(graph, n, visited)
    return visited
```

Shortest path in an unweighted graph: in BFS, record each vertex's predecessor (the vertex it was discovered from). To get the path to F, follow predecessors back: F ← C ← A, so A–C–F, two edges.

### Common mistakes

- Using a stack for BFS or a queue for DFS.
- Visiting a vertex twice because it was not marked as visited.
- Claiming BFS finds the shortest path in a weighted graph. That needs Dijkstra's algorithm (file 10).

## 4.3.2.1 Simple tree-traversal algorithms

*Refs: AQA 4.3.2.1 · OCR 2.3.1(e), 1.4.2(c) · Eduqas C1.3: Traversal of data structures.*

### What you need to know

All three are depth-first and are most easily written recursively. The name says when the node itself is visited relative to its subtrees:

- Pre-order: node, then left subtree, then right subtree. Use: copying a tree (each parent is created before its children); producing prefix (Polish) notation from an expression tree.
- In-order: left subtree, node, right subtree. Use: outputting the contents of a binary search tree in ascending order; producing infix from an expression tree.
- Post-order: left subtree, right subtree, node. Use: producing Reverse Polish (postfix) from an expression tree; deleting (emptying) a tree, since children are removed before their parent; evaluating expression trees.
- Breadth-first traversal of a tree visits level by level using a queue (OCR).

Quick method for tracing on paper: draw a line round the tree anticlockwise starting at the left of the root. Pre-order: list a node when you pass its left side. In-order: when you pass underneath. Post-order: when you pass its right side.

### Worked example

```
          F
        /   \
       B     G
      / \     \
     A   D     I
        / \   /
       C   E H
```

- Pre-order: F, B, A, D, C, E, G, I, H
- In-order: A, B, C, D, E, F, G, H, I (ascending, as this is a BST)
- Post-order: A, C, E, D, B, H, I, G, F
- Breadth-first: F, B, G, A, D, I, C, E, H

```python
def preorder(node):
    if node:
        print(node.data)
        preorder(node.left)
        preorder(node.right)

def inorder(node):
    if node:
        inorder(node.left)
        print(node.data)
        inorder(node.right)

def postorder(node):
    if node:
        postorder(node.left)
        postorder(node.right)
        print(node.data)
```

### Common mistakes

- Visiting the right subtree before the left.
- In-order on a tree that is not a BST does not give sorted output.

## 4.3.3.1 Reverse Polish – infix transformations

*Refs: AQA 4.3.3.1.*

### What you need to know

- Infix: the operator goes between its operands, as normally written: 3 + 4. Needs brackets and precedence rules.
- Reverse Polish notation (RPN, postfix): the operator follows its operands: 3 4 +.
- Advantages of RPN: no brackets needed; no precedence rules needed (order is fixed by position); evaluated left to right in one pass with a single stack, which is simple and fast for a machine.
- Where it is used: stack-based interpreters and virtual machines such as PostScript (printer language) and bytecode (Java Virtual Machine, Python bytecode); some calculators; compilers convert infix to RPN as an intermediate step.
- Evaluating RPN with a stack: read left to right. Operand: push. Operator: pop two values (the first popped is the right operand), apply the operator, push the result. At the end, the single value on the stack is the answer.
- Infix to RPN by hand: fully bracket by precedence, then move each operator to just after its closing bracket and remove brackets. Or draw the expression tree and traverse post-order. (The shunting-yard algorithm does this with a stack.)

### Worked example

Convert (5 + 3) × (8 − 2) ÷ 4 to RPN.

1. Fully bracket by precedence (× and ÷ left to right): (((5 + 3) × (8 − 2)) ÷ 4).
2. Move each operator after its operands: 5 3 + gives the first bracket, 8 2 − the second, then ×, then 4 ÷.
3. RPN: 5 3 + 8 2 − × 4 ÷

Evaluate with a stack:

| Token | Action | Stack (top at right) |
| --- | --- | --- |
| 5 | push | 5 |
| 3 | push | 5 3 |
| + | pop 3, pop 5, push 8 | 8 |
| 8 | push | 8 8 |
| 2 | push | 8 8 2 |
| − | pop 2, pop 8, push 6 | 8 6 |
| × | pop 6, pop 8, push 48 | 48 |
| 4 | push | 48 4 |
| ÷ | pop 4, pop 48, push 12 | 12 |

Answer 12.

Convert RPN to infix: 7 2 3 × − 1 +. Use a stack of expressions: push 7, 2, 3; × combines 2 and 3 into (2 × 3); − combines 7 and that into (7 − 2 × 3); push 1; + gives 7 − 2 × 3 + 1 = 2.

```python
def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in "+-*/":
            right = stack.pop()       # first popped is the RIGHT operand
            left = stack.pop()
            if t == "+": stack.append(left + right)
            elif t == "-": stack.append(left - right)
            elif t == "*": stack.append(left * right)
            else: stack.append(left / right)
        else:
            stack.append(float(t))
    return stack.pop()

print(eval_rpn("5 3 + 8 2 - * 4 /".split()))   # 12.0
```

### Common mistakes

- Popping operands in the wrong order for − and ÷: 8 2 − is 8 − 2, not 2 − 8.
- Changing the order of the operands when converting. In RPN the operands stay in the same left-to-right order as in infix; only the operators move.
- Saying RPN "needs brackets for complex expressions". It never needs brackets.

## Check questions

1. State which data structure is used by (a) breadth-first search and (b) depth-first search. [2 marks]
2. Using the graph below, give the order vertices are visited by BFS and by DFS from P, taking neighbours alphabetically. [4 marks]

```
P: Q, R
Q: P, S
R: P, S, T
S: Q, R, U
T: R
U: S
```

3. Give one application of BFS and one of DFS. [2 marks]
4. For the tree with root 8, left child 3 (children 1 and 6), right child 10 (right child 14, which has left child 13), give the pre-order, in-order and post-order traversals. [3 marks]
5. State a use of post-order traversal. [1 mark]
6. Convert to RPN: (a) a × (b + c), (b) (a − b) ÷ (c + d × e). [2 marks]
7. Convert the RPN 4 6 2 − × 3 + to infix and evaluate it. [2 marks]
8. Show the stack after each token when evaluating 9 3 ÷ 2 4 × +. [3 marks]
9. Explain two advantages of RPN over infix. [2 marks]
10. Write a recursive in-order traversal procedure in pseudo-code or Python. [3 marks]

## Mark scheme

1. (a) Queue (1); (b) stack (accept recursion/call stack) (1).
2. BFS: P, Q, R, S, T, U (2). DFS: P, Q, S, R, T, U (2). (One mark each if one error.)
3. BFS: shortest path in an unweighted graph/social network degrees/web crawling (1). DFS: maze solving/cycle detection/checking a path exists/topological sort (1).
4. Pre-order: 8, 3, 1, 6, 10, 14, 13 (1). In-order: 1, 3, 6, 8, 10, 13, 14 (1). Post-order: 1, 6, 3, 13, 14, 10, 8 (1).
5. Any one: producing RPN from an expression tree; deleting/emptying a tree; evaluating an expression tree (1).
6. (a) a b c + × (1). (b) a b − c d e × + ÷ (1).
7. 4 × (6 − 2) + 3 (1); = 19 (1).
8. 9; 9 3; 3 (after ÷) (1); 3 2; 3 2 4; 3 8 (after ×) (1); 11 (after +) (1).
9. Any two: no brackets needed (1); no precedence rules needed (1); can be evaluated left to right with a single stack, simple/efficient for machines (1).
10. Base case: if node is null return (1); recursive call on left subtree, then output node's data (1); then recursive call on right subtree (1).
