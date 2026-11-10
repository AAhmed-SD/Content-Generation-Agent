---
level: A-level
subject: Computer Science
topic: "Graphs, trees, binary search trees, hash tables and dictionaries"
as_content: "A-level only for AQA and OCR."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.2.4.1", "4.2.5.1", "4.2.6.1", "4.2.7.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.2(b)", "1.4.2(c)", "2.3.1(e)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.1: Data structures", "C1.3: Traversal of data structures", "C2.4: File organisation"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Graphs, trees, hash tables and dictionaries

This file covers graph terms and the adjacency matrix and adjacency list, trees, rooted and binary trees, building and changing a binary search tree, hash tables with hashing functions and collision handling, and dictionaries. Traversing graphs and trees is in [08-graph-and-tree-traversal-and-reverse-polish.md](08-graph-and-tree-traversal-and-reverse-polish.md); searching a binary tree in [09-searching-and-sorting.md](09-searching-and-sorting.md); shortest paths in [10-shortest-path-dijkstra-and-a-star.md](10-shortest-path-dijkstra-and-a-star.md).

New at A-level: there is no GCSE equivalent.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Graphs | Terms; adjacency matrix and list compared | Directed and undirected graphs | Not named in C1.1 (shortest paths and routes are named: files 10, 27) |
| Trees | Tree, rooted tree, binary tree; uses | Tree and binary search tree: create, traverse, add, remove | Trees with pointers and arrays |
| Hash tables | Hashing, collisions, rehashing | Hash table (add, remove, search) | Hash tables (C1.1); hashing algorithms compared (C2.4) |
| Dictionaries | Key-value pairs; information retrieval | Not named | Not named |

## 4.2.4.1 Graphs

*Refs: AQA 4.2.4.1 · OCR 1.4.2(b), 1.4.2(c).*

### What you need to know

- A graph is a set of vertices (nodes) connected by edges (arcs). It represents complex relationships between items.
- Undirected graph: edges have no direction (a road you can drive both ways). Directed graph (digraph): each edge has a direction, drawn as an arrow (a one-way street, a link from one web page to another).
- Weighted graph: each edge has a value (weight, cost), such as distance, time or cost.
- Neighbours (adjacent vertices) share an edge. The degree of a vertex is the number of edges at it.
- Uses: road and rail networks and satellite navigation, computer networks and internet routing, social networks (people and friendships), web page links (search engine ranking), task dependencies and scheduling, states and moves in a game.

### Adjacency matrix and adjacency list

- Adjacency matrix: a 2D array where entry [i][j] shows whether there is an edge from vertex i to vertex j (1 or 0), or its weight (with ∞ or blank for no edge). For an undirected graph it is symmetric about the leading diagonal.
- Adjacency list: for each vertex, a list of its neighbours (with weights for a weighted graph). Often a dictionary of lists.

### Worked example

Undirected weighted graph: A–B 4, A–C 2, B–C 1, B–D 5, C–D 8.

Adjacency matrix (blank = no edge):

| | A | B | C | D |
| --- | --- | --- | --- | --- |
| A | | 4 | 2 | |
| B | 4 | | 1 | 5 |
| C | 2 | 1 | | 8 |
| D | | 5 | 8 | |

Adjacency list:

```python
graph = {
    "A": {"B": 4, "C": 2},
    "B": {"A": 4, "C": 1, "D": 5},
    "C": {"A": 2, "B": 1, "D": 8},
    "D": {"B": 5, "C": 8},
}
```

| | Adjacency matrix | Adjacency list |
| --- | --- | --- |
| Memory | n² entries whatever the number of edges | Proportional to vertices + edges |
| Best for | Dense graphs (many edges) | Sparse graphs (few edges) |
| Is there an edge from i to j? | One look-up, O(1) | Search i's list, up to O(degree) |
| List all neighbours of i | Scan a whole row, O(n) | Read i's list directly |
| Adding a vertex | Resize whole matrix | Add a new list |

### Common mistakes

- Forgetting to record both directions for an undirected edge in an adjacency list.
- Choosing a matrix for a huge sparse graph like a social network: most entries would be empty and memory wasted.

## 4.2.5.1 Trees, rooted trees and binary trees

*Refs: AQA 4.2.5.1 · OCR 1.4.2(b), 1.4.2(c), 2.3.1(e) · Eduqas C1.1: Data structures.*

### What you need to know

- A tree is a connected, undirected graph with no cycles. A tree does not have to have a root.
- A rooted tree has one vertex chosen as the root. This gives parent–child relationships: the root has no parent, every other node has exactly one parent and is a descendant of the root. A leaf has no children. A subtree is a node and all its descendants.
- A binary tree is a rooted tree where each node has at most two children (left and right).
- A binary search tree (BST) is a binary tree in which, for every node, all values in its left subtree are smaller and all values in its right subtree are larger (or equal, by a stated rule).
- Uses of rooted trees: file system directories, family trees, organisation charts, syntax trees in compilers, expression trees, decision trees, BSTs for fast searching and sorting, Huffman coding trees.
- Array representation (Eduqas, OCR): three arrays, or an array of records, with fields left pointer, data, right pointer; −1 or 0 as null.

### Worked example

Insert 50, 30, 70, 20, 40, 60, 80, 35 into an empty BST.

```
            50
          /    \
        30      70
       /  \    /  \
     20    40 60   80
          /
        35
```

Each new value starts at the root and goes left if smaller, right if larger, until it finds an empty place. 35: 35 < 50 left; 35 > 30 right; 35 < 40 left; empty, so 35 is 40's left child.

Array (pointer) form, in order of insertion:

| Index | Left | Data | Right |
| --- | --- | --- | --- |
| 0 | 1 | 50 | 2 |
| 1 | 3 | 30 | 4 |
| 2 | 5 | 70 | 6 |
| 3 | −1 | 20 | −1 |
| 4 | 7 | 40 | −1 |
| 5 | −1 | 60 | −1 |
| 6 | −1 | 80 | −1 |
| 7 | −1 | 35 | −1 |

```python
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, data):
    if root is None:
        return TreeNode(data)
    if data < root.data:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)
    return root
```

Removing from a BST (OCR):

- Leaf: set the parent's pointer to null.
- One child: link the parent straight to the child.
- Two children: replace the node's value with its in-order successor (the smallest value in its right subtree), then remove that successor node (which has at most one child).

Remove 30 from the tree above: it has two children. The smallest value in its right subtree (40, 35) is 35. Copy 35 into the 30 node, then remove the old 35 leaf. The tree's in-order listing is still sorted: 20, 35, 40, 50, 60, 70, 80.

A balanced BST of n nodes has height about log₂ n, so searching is O(log n). If values arrive already sorted, every node goes right and the tree becomes a "linked list" of height n, with O(n) search.

### Common mistakes

- Calling any binary tree a BST. A BST also needs the ordering rule.
- Inserting by comparing only with the root and not walking down.
- Saying a tree must have a root. That is a rooted tree.

## 4.2.6.1 Hash tables

*Refs: AQA 4.2.6.1 · OCR 1.4.2(b), 1.4.2(c) · Eduqas C1.1: Data structures, C2.4: File organisation.*

### What you need to know

- A hash table stores key-value pairs in an array. A hashing function turns the key into an array index (the hash), so a value can be stored and found in (close to) constant time, O(1), without searching.
- Simple hashing algorithms:
  - modulo (division): index = key MOD table size (a prime table size spreads keys better);
  - for text keys, add (or weight and add) the character codes, then MOD table size;
  - folding: split the key into parts, add the parts, then MOD;
  - mid-square: square the key and take the middle digits.
- A good hash function is quick to calculate, spreads keys evenly across the table, and always gives the same index for the same key.
- A collision happens when two different keys hash to the same index.
- Handling collisions:
  - Rehashing (open addressing): apply a further rule to find another slot. Linear probing tries the next slot (index + 1) MOD size, and so on, until a free one is found. Other rules step by a larger fixed amount or use a second hash function. When searching, follow the same rule until the key or an empty slot is found.
  - Chaining (closed addressing): each slot holds a linked list of all items with that hash.
- Clustering: with linear probing, collided items bunch together, making later collisions more likely and searches slower.
- Load factor = items stored ÷ table size. As it rises, collisions rise. When it passes a threshold (often around 0.7), make a larger table and rehash every item into it.
- Deleting with open addressing: mark the slot as "deleted" (a tombstone) rather than empty, or later searches would stop too early.
- Uses: database indexes, caches, symbol tables in compilers, password storage look-ups, implementing dictionaries and sets. Eduqas: hashing to find a record's address in a direct (random) access file (file 36).

### Worked example

Table of size 7, hash(key) = key MOD 7, linear probing. Insert 15, 22, 8, 29, 3.

| Key | key MOD 7 | Result |
| --- | --- | --- |
| 15 | 1 | slot 1 |
| 22 | 1 | collision; try 2: slot 2 |
| 8 | 1 | collision at 1 and 2; slot 3 |
| 29 | 1 | collision at 1, 2, 3; slot 4 |
| 3 | 3 | collision at 3 (8) and 4 (29); slot 5 |

Final table: [–, 15, 22, 8, 29, 3, –]. Searching for 3 takes three probes (slots 3, 4, 5); searching for 36 (36 MOD 7 = 1) probes 1 to 6 and stops at the empty slot 6: not found. A table size or hash that spreads these keys better would avoid this cluster.

String key with a character-sum hash, table size 11: "CAT" → 67 + 65 + 84 = 216; 216 MOD 11 = 7. "ACT" gives the same sum, so it collides: a weakness of simple summing (anagrams always collide). Weighting by position (for example sum of code × position) reduces this.

```python
SIZE = 7
table = [None] * SIZE

def insert(key, value):
    i = key % SIZE
    start = i
    while table[i] is not None and table[i][0] != key:
        i = (i + 1) % SIZE                    # linear probe (rehash)
        if i == start:
            raise OverflowError("table full")
    table[i] = (key, value)

def lookup(key):
    i = key % SIZE
    start = i
    while table[i] is not None:
        if table[i][0] == key:
            return table[i][1]
        i = (i + 1) % SIZE
        if i == start:
            break
    return None                               # reached an empty slot: not present
```

### Common mistakes

- Saying a hash table gives O(1) "always". With many collisions it degrades towards O(n).
- Stopping a search at the first slot when it holds a different key. You must keep probing.
- Confusing hashing for a table with cryptographic hashing (file 20), though the idea of a one-way function from key to fixed value is shared.

## 4.2.7.1 Dictionaries

*Refs: AQA 4.2.7.1.*

### What you need to know

- A dictionary (associative array, map) is a collection of key-value pairs where each value is accessed by its unique key, not by position.
- Operations: add a pair, look up a value by key, change a value, delete a pair, test whether a key exists.
- Dictionaries are usually implemented with hash tables, so look-ups are fast.
- Information retrieval example: represent a document by a dictionary of word counts, which lets you compare documents and find relevant ones.

### Worked example

Build a word-count dictionary for the sentence "The dog saw the other dog", ignoring case and punctuation.

```python
text = "The dog saw the other dog"
counts = {}
for word in text.lower().split():
    counts[word] = counts.get(word, 0) + 1
print(counts)   # {'the': 2, 'dog': 2, 'saw': 1, 'other': 1}
```

Two documents can then be compared by the words they share and how often (see dot products in [07-vectors.md](07-vectors.md)).

### Common mistakes

- Expecting duplicate keys. Assigning to an existing key replaces its value.
- Saying a dictionary is accessed by index. It is accessed by key.

## Check questions

1. Explain the difference between a directed and an undirected graph, giving one use of each. [4 marks]
2. Draw the adjacency matrix for the directed graph with edges P→Q, Q→R, R→P, P→R. [3 marks]
3. Explain when an adjacency list is a better choice than an adjacency matrix. [2 marks]
4. State the conditions for a graph to be a tree, and define a rooted tree. [3 marks]
5. Insert these values in order into an empty BST and draw it: 40, 25, 60, 10, 30, 55, 70, 28. [3 marks]
6. Describe how 25 would be removed from your tree in Q5. [3 marks]
7. Using hash = key MOD 11 and linear probing, insert 34, 45, 12, 56, 23 into an empty table of 11 slots. Show the final position of each key. [4 marks]
8. Explain what is meant by a collision and describe one method other than linear probing for dealing with it. [3 marks]
9. Explain why a hash table becomes slower as its load factor rises, and what can be done. [3 marks]
10. Write code that builds a dictionary counting how many times each letter occurs in a string, ignoring spaces. [3 marks]

## Mark scheme

1. Undirected: edges can be followed in both directions; directed: edges have a direction/one way (2). Uses, one each: undirected road network/friendship network; directed one-way streets/web links/task dependencies (2).
2. Rows = from, columns = to (accept the transpose if labelled). P row: Q 1, R 1; Q row: R 1; R row: P 1; all others 0 (1 mark per correct row, max 3).
3. When the graph is sparse/has few edges compared with vertices (1); list uses memory only for edges that exist, matrix uses n² (1).
4. Connected (1); undirected with no cycles (1). Rooted tree: one vertex designated as root, giving parent–child relationships (1).
5. 40 root; left 25 (children 10 and 30); right 60 (children 55 and 70); 28 is the left child of 30 (1 for root and level 2, 1 for level 3, 1 for 28 correctly placed).
6. 25 has two children (1); replace it with its in-order successor, the smallest value in its right subtree, 28 (1); remove the original 28 node (a leaf) so 30 has no left child (1). Accept in-order predecessor 10 with the matching steps.
7. 34 → 1; 45 → 1, collides, → 2; 12 → 1, → 3; 56 → 1, → 4; 23 → 1, → 5 (all hash to 1). 1 mark for showing all hash to 1; 3 marks for positions 1, 2, 3, 4, 5 (−1 per error).
8. Two different keys produce the same hash/index (1). Chaining: each slot holds a linked list; colliding items are added to the list at that slot (2). Accept a second hash function/rehash with a different step described.
9. More items means more collisions, so more probes or longer chains for each search (1); performance tends towards O(n) (1); create a larger table and rehash all items into it (1).
10. Example:

```python
counts = {}
for ch in s:
    if ch != " ":
        counts[ch] = counts.get(ch, 0) + 1
```

Loop through characters skipping spaces (1); add new key with count 1 (1); increment existing key (1).
