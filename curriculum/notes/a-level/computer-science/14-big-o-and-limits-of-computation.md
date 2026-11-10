---
level: A-level
subject: Computer Science
topic: "Comparing algorithms: Big-O, complexity classes, tractability, computability and the Halting problem"
as_content: "A-level only for AQA ('comparison and complexity of algorithms' is A-level only) and OCR (Big-O)."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.4.4.1", "4.4.4.2", "4.4.4.3", "4.4.4.4", "4.4.4.5", "4.4.4.6", "4.4.4.7"]
  - board: OCR
    code: "H446"
    spec_refs: ["2.3.1(b)", "2.3.1(c)", "2.3.1(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Comparing algorithms"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Big-O and the limits of computation

This file covers comparing algorithms by time and space, the maths you need (functions, linear, polynomial, exponential and logarithmic growth, permutations and factorials), Big-O notation and deriving the complexity of code, the limits that complexity and hardware impose, tractable and intractable problems and heuristics, non-computable problems, and the Halting problem. The complexities of particular searches and sorts are in [09-searching-and-sorting.md](09-searching-and-sorting.md).

GCSE only compared algorithms informally ([GCSE: Computational thinking](../../gcse/computer-science/01-computational-thinking-and-algorithm-design.md)); Big-O is new at A-level.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Big-O classes | Constant, logarithmic, linear, polynomial, exponential | Constant, linear, polynomial, exponential, logarithmic | Big-O for time and memory, comparing algorithms that do the same task |
| Maths for Big-O | Functions, domain and co-domain, permutations, n! | Not named | Not named |
| Tractable, intractable, heuristics | Named | Not named (heuristics are in 2.2.2, file 11) | Not named |
| Computability, Halting problem | Named | Not named | Not named |

## 4.4.4.1 Comparing algorithms

*Refs: AQA 4.4.4.1 · OCR 2.3.1(b), 2.3.1(d) · Eduqas C1.3: Comparing algorithms.*

### What you need to know

- Algorithms are compared by expressing their complexity as a function of the size of the problem, n (number of items, digits, vertices and so on). The size of the problem is the key issue: what matters is how the cost grows as n grows.
- Time complexity: how the number of steps (and so the running time) grows with n.
- Space complexity: how the amount of memory needed grows with n.
- An algorithm can be more efficient in time but less in space, or the reverse (merge sort is fast but needs O(n) extra memory; bubble sort is slow but sorts in place). Efficient automated solutions run quickly while using as few resources as possible.
- Measuring with a stopwatch depends on hardware, language and data; complexity analysis does not.

## 4.4.4.2 Maths for understanding Big-O notation

*Refs: AQA 4.4.4.2.*

### What you need to know

- A function maps each value in one set (the domain) to a value in another set (the co-domain). For example f : ℕ → ℕ, f(n) = 2n maps 3 to 6.
- Types of function, as n grows:
  - linear: y = 2x (doubles when x doubles);
  - polynomial: y = 2x² (or any power of x; x² quadruples when x doubles);
  - exponential: y = 2ˣ (doubles each time x goes up by 1);
  - logarithmic: y = log₁₀ x or log₂ x (goes up by 1 each time x is multiplied by 10 or 2). log₂ 1024 = 10 because 2¹⁰ = 1024.
- A permutation of a set of objects is an ordering of them. The number of permutations of n distinct objects is n! (n factorial) = n × (n − 1) × … × 2 × 1. The letters of CAT have 3! = 6 orderings: CAT, CTA, ACT, ATC, TCA, TAC.

| n | log₂ n | n | n log₂ n | n² | 2ⁿ | n! |
| --- | --- | --- | --- | --- | --- | --- |
| 8 | 3 | 8 | 24 | 64 | 256 | 40,320 |
| 16 | 4 | 16 | 64 | 256 | 65,536 | about 2 × 10¹³ |
| 32 | 5 | 32 | 160 | 1,024 | about 4.3 × 10⁹ | about 2.6 × 10³⁵ |
| 1024 | 10 | 1,024 | 10,240 | about 10⁶ | about 10³⁰⁸ | huge |

## 4.4.4.3 Order of complexity

*Refs: AQA 4.4.4.3 · OCR 2.3.1(c), 2.3.1(d) · Eduqas C1.3: Comparing algorithms.*

### What you need to know

- Big-O notation gives an upper bound on how an algorithm's time (or space) grows as n grows, usually for the worst case. Only the fastest-growing term counts, and constant factors are dropped: 3n² + 5n + 20 is O(n²).
- Classes, from best to worst:

| Big-O | Name | Example |
| --- | --- | --- |
| O(1) | Constant | Access an array element by index; push or pop a stack; hash table look-up (no collisions) |
| O(log n) | Logarithmic | Binary search; search a balanced BST |
| O(n) | Linear | Linear search; sum a list; traverse a linked list |
| O(n log n) | Linearithmic | Merge sort; average quick sort |
| O(n²) | Polynomial (quadratic) | Bubble and insertion sort; comparing every pair |
| O(nᵏ) | Polynomial | k nested loops over the data |
| O(2ⁿ) | Exponential | Trying every subset; naive recursive Fibonacci; brute-forcing an n-bit key |
| O(n!) | Factorial (worse than exponential) | Brute-force travelling salesman: try every ordering of cities |

- Deriving complexity from code:
  - a statement that does not depend on n: O(1);
  - one loop that runs n times with O(1) work inside: O(n);
  - two nested loops each over n: O(n²); sequential blocks add, and the biggest wins: O(n) + O(n²) = O(n²);
  - a loop where n is halved each time: O(log n);
  - a recursive function calling itself twice on n − 1: O(2ⁿ).

### Worked example

State the time complexity of each.

```python
def first(a):            # O(1): one step, whatever len(a)
    return a[0]

def total(a):            # O(n): one pass
    s = 0
    for x in a:
        s += x
    return s

def has_duplicate(a):    # O(n²): every pair compared
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            if a[i] == a[j]:
                return True
    return False

def halvings(n):         # O(log n): n halves each pass
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

def subsets(items):      # O(2ⁿ): each item in or out
    if not items:
        return [[]]
    rest = subsets(items[1:])
    return rest + [[items[0]] + r for r in rest]
```

For `has_duplicate`, the inner comparison runs (n − 1) + (n − 2) + … + 1 = n(n − 1)/2 times = 0.5n² − 0.5n, which is O(n²).

Space: `has_duplicate` is O(1) space; a version that copies the list into a set first is O(n) time (on average) but O(n) space: a time–space trade-off.

```python
def has_duplicate_fast(a):     # O(n) time, O(n) space
    seen = set()
    for x in a:
        if x in seen:
            return True
        seen.add(x)
    return False
```

If an O(n²) algorithm takes 2 seconds for 1,000 items, for 3,000 items expect about 2 × 3² = 18 seconds. An O(n) algorithm would take about 6 seconds; an O(2ⁿ) algorithm with even 100 more items would never finish.

### Common mistakes

- Keeping constants and lower terms: write O(n²), not O(n² + n) or O(2n²).
- Saying an O(n²) algorithm is always slower than an O(n) one. For small n the constants can make it faster; Big-O describes growth for large n.
- Calling O(n log n) "polynomial" in a list that asks for the named classes. It sits between linear and quadratic.

## 4.4.4.4 Limits of computation

*Refs: AQA 4.4.4.4.*

### What you need to know

- Algorithmic complexity and hardware both limit what can be computed in practice.
- An exponential or factorial algorithm becomes impossible for quite small n, whatever the hardware: doubling the processor speed only lets an O(2ⁿ) algorithm handle one more item in the same time.
- Hardware limits: processor speed, memory size, storage, and energy. Even if an algorithm exists, the hardware may not finish in a useful time or may run out of memory.
- Some problems are impossible for any algorithm (non-computable, below).

## 4.4.4.5 Classification of algorithmic problems

*Refs: AQA 4.4.4.5.*

### What you need to know

- Tractable problem: has a solution that runs in polynomial time or better (O(1), O(log n), O(n), O(n log n), O(nᵏ)). Can be solved in a reasonable time for large inputs. Examples: sorting, searching, shortest path.
- Intractable problem: has no known polynomial-time solution; the best algorithms are exponential or worse. Solvable in theory but not in reasonable time for large inputs. Examples: travelling salesman (finding the guaranteed shortest round trip), timetabling with many constraints, the knapsack problem (optimal version), cracking large encryption keys by brute force.
- Heuristic methods are often used for intractable problems: they find a good enough (approximate) solution in reasonable time but do not guarantee the best one. Example: for the travelling salesman, "always go to the nearest unvisited city next" gives a decent route in O(n²).

## 4.4.4.6 Computable and non-computable problems

*Refs: AQA 4.4.4.6.*

### What you need to know

- A computable problem can be solved by an algorithm (in a finite number of steps).
- Some problems cannot be solved by any algorithm, however much time and memory are available. They are non-computable (undecidable). This is a limit of logic, not of hardware.

## 4.4.4.7 The Halting problem

*Refs: AQA 4.4.4.7.*

### What you need to know

- The Halting problem: is there a general algorithm that, given any program and any input, can decide whether that program will eventually stop (halt) or run forever?
- Turing showed (1936) that no such algorithm can exist. You need to describe the problem, not prove it.
- Significance: it proves that there are problems that cannot be solved by a computer, even in principle. So there are limits to computation; for example, no tool can automatically detect every infinite loop in every program.

### Explained

The idea behind the proof (for interest, not required): suppose a program `halts(p, x)` always correctly answered. Build a program `trouble(p)` that calls `halts(p, p)` and, if the answer is "halts", loops forever, and if "loops", stops. Now ask what `trouble(trouble)` does: either answer contradicts itself, so `halts` cannot exist.

## Check questions

1. Explain the difference between time complexity and space complexity. [2 marks]
2. Give the Big-O time complexity of: (a) finding the largest value in an unsorted list; (b) binary search; (c) bubble sort (worst case); (d) printing every possible ordering of n names. [4 marks]
3. Simplify to Big-O: (a) 4n³ + 100n² + 7; (b) 50; (c) 3n log n + 2n; (d) 2ⁿ + n⁵. [4 marks]
4. State the time complexity of this code and justify your answer. [3 marks]

```python
for i in range(n):
    for j in range(n):
        for k in range(10):
            total += i * j
```

5. How many different orders can 6 runners finish a race in (no ties)? [1 mark]
6. A linear algorithm takes 4 ms for 1,000 items. Estimate the time for 8,000 items. Repeat for a quadratic algorithm with the same starting time. [2 marks]
7. Define tractable and intractable problems, giving an example of each. [4 marks]
8. Explain why heuristic methods are used for intractable problems. [2 marks]
9. Describe the Halting problem and explain its significance. [3 marks]
10. Explain why a faster computer does not make an exponential algorithm practical for large inputs. [2 marks]
11. (Eduqas) Two algorithms remove duplicates from a list: A compares every pair (O(n²) time, O(1) extra memory); B uses a hash set (O(n) time, O(n) extra memory). Recommend one for a 10-million-item list on a server and one for a small embedded device. [3 marks]

## Mark scheme

1. Time: how the number of steps/running time grows with input size (1); space: how the memory required grows with input size (1).
2. (a) O(n) (1); (b) O(log n) (1); (c) O(n²) (1); (d) O(n!) (accept "factorial", or exponential if justified) (1).
3. (a) O(n³) (1); (b) O(1) (1); (c) O(n log n) (1); (d) O(2ⁿ) (1).
4. O(n²) (1). Two nested loops each over n give n² iterations (1); the inner loop runs a constant 10 times, so constants are dropped: 10n² is O(n²) (1).
5. 6! = 720 (1).
6. Linear: 32 ms (1). Quadratic: 4 × 8² = 256 ms (1).
7. Tractable: has a polynomial-time (or better) solution (1), e.g. sorting/searching (1). Intractable: no polynomial-time solution known, only exponential or worse (1), e.g. travelling salesman/brute-force key cracking (1).
8. Exact solutions take too long/exponential time for realistic inputs (1); a heuristic gives a good enough/approximate solution in reasonable time (1).
9. Deciding, for any program and input, whether the program will finish or run forever (1); it has been shown that no algorithm can do this in general (1); so some problems cannot be solved by computer at all/there are limits to computation (1).
10. Exponential growth means each extra item multiplies the time (e.g. doubles it) (1); a faster machine only adds a few items to the size that can be handled in a given time (1).
11. Server: B, O(n) time is vastly faster for 10 million items and memory is available (1). Embedded: A (or B only if memory allows), as memory is very limited and n is small so O(n²) is acceptable (1). Reference to the time–space trade-off (1).
