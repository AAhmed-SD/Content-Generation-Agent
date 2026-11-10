---
level: A-level
subject: Computer Science
topic: "Abstraction, automation and computational thinking, with computational methods"
as_content: "AQA 4.4.1 is also AS (7516 3.4.1). OCR 2.1.1 to 2.1.4 are also AS; 2.1.2(c) caching, 2.1.5 thinking concurrently and 2.2.2 computational methods are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.4.1.1", "4.4.1.2", "4.4.1.3", "4.4.1.4", "4.4.1.5", "4.4.1.6", "4.4.1.7", "4.4.1.8", "4.4.1.9", "4.4.1.10", "4.4.1.11"]
  - board: OCR
    code: "H446"
    spec_refs: ["2.1.1(a)", "2.1.1(b)", "2.1.1(c)", "2.1.1(d)", "2.1.2(a)", "2.1.2(b)", "2.1.2(c)", "2.1.2(d)", "2.1.3(a)", "2.1.3(b)", "2.1.3(c)", "2.1.3(d)", "2.1.4(a)", "2.1.4(b)", "2.1.4(c)", "2.1.5(a)", "2.1.5(b)", "2.2.2(a)", "2.2.2(b)", "2.2.2(c)", "2.2.2(d)", "2.2.2(e)", "2.2.2(f)", "2.3.1(a)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Algorithms", "C1.5: Analysis"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Abstraction and computational thinking

This file covers solving logic problems, what an algorithm is and how to write, trace and argue for one, the kinds of abstraction (representational, generalisation, information hiding, procedural, functional, data, problem reduction), decomposition, composition and automation. For OCR it also covers the five "thinking" skills (abstractly, ahead, procedurally, logically, concurrently), caching, and the computational methods: problem recognition, divide and conquer, backtracking, data mining, heuristics, performance modelling, pipelining and visualisation.

Builds on [GCSE: Computational thinking and algorithm design](../../gcse/computer-science/01-computational-thinking-and-algorithm-design.md), which introduces abstraction, decomposition, pseudo-code, flowcharts and trace tables.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Algorithms | Definition; pseudo-code; hand-trace; convert to code; argue correctness and efficiency | Analyse and design algorithms (2.3.1(a)) | Define; pseudo-code and flowcharts (C1.3) |
| Abstraction | Seven named kinds, plus decomposition, composition and automation | Nature and need; abstraction vs reality; devise models | Abstraction and decomposition to analyse a problem (C1.5) |
| Thinking skills | Not named | Thinking abstractly, ahead, procedurally, logically, concurrently (2.1) | Not named |
| Computational methods | Problem reduction; heuristics are in 4.4.4.5 (file 14) | Problem recognition, decomposition, divide and conquer, backtracking, data mining, heuristics, performance modelling, pipelining, visualisation (2.2.2) | Not named |
| Logic problems | Develop and check solutions (4.4.1.1) | Not named | Not named |

## 4.4.1.1 Problem-solving

*Refs: AQA 4.4.1.1.*

### What you need to know

- Develop solutions to simple logic problems, and check that a proposed solution is correct by testing it against every condition.
- Useful methods: list the possibilities in a table and eliminate; reason from the most constrained fact first; try a case and see if it leads to a contradiction; check every rule once you have an answer.

### Worked example

Three students, Aisha, Ben and Chen, take Physics, Art and History, one each.

1. Ben does not take Art.
2. The Physics student sits next to Aisha in tutor.
3. Chen takes neither Physics nor History.

From 3, Chen takes Art. From 2, Aisha does not take Physics (she sits next to the Physics student). So Aisha takes History, and Ben takes Physics. Check: Ben is not Art (rule 1 ✓); Physics student Ben sits next to Aisha, who is not him (rule 2 ✓); Chen is Art (rule 3 ✓).

## 4.4.1.2 Following and writing algorithms

*Refs: AQA 4.4.1.2 · OCR 2.3.1(a) · Eduqas C1.3: Algorithms.*

### What you need to know

- An algorithm is a sequence of steps that can be followed to complete a task and that always terminates.
- Express algorithms in pseudo-code using sequence, assignment, selection and iteration; Eduqas also expects flowcharts (terminator, process, decision, input/output symbols).
- Hand-trace an algorithm with a trace table: one column per variable (and output), one row per change.
- Convert pseudo-code into a high-level language.
- Argue that a program is correct and efficient using logical reasoning (for example, explaining what is true at each pass of a loop), test data (normal, boundary, erroneous) and user feedback.

### Worked example

Trace this algorithm for n = 12 and state what it does.

```
d ← 2
WHILE n > 1
    IF n MOD d = 0 THEN
        OUTPUT d
        n ← n DIV d
    ELSE
        d ← d + 1
    ENDIF
ENDWHILE
```

| n | d | n MOD d = 0? | Output |
| --- | --- | --- | --- |
| 12 | 2 | yes | 2 |
| 6 | 2 | yes | 2 |
| 3 | 2 | no | |
| 3 | 3 | yes | 3 |
| 1 | 3 | (loop ends) | |

Output 2, 2, 3: it outputs the prime factors of n. It terminates because each pass either reduces n or increases d, and d can never pass n while n > 1.

```python
def prime_factors(n):
    d = 2
    factors = []
    while n > 1:
        if n % d == 0:
            factors.append(d)
            n //= d
        else:
            d += 1
    return factors
```

### Common mistakes

- Writing a trace table row only when something is output. Record every change of value.
- Calling something with no guaranteed end (an endless menu loop) an algorithm in the strict AQA sense.

## 4.4.1.3 Abstraction

*Refs: AQA 4.4.1.3 · OCR 2.1.1(a), 2.1.1(b), 2.1.1(c), 2.1.1(d) · Eduqas C1.5: Analysis.*

### What you need to know

- Abstraction is removing or hiding detail that is not needed, so the essential features of a problem or system remain.
- Representational abstraction: a representation made by removing unnecessary details. A metro map keeps stations, lines and connections, and drops real distances, streets and bends.
- Abstraction by generalisation (categorisation): grouping things by common characteristics to form an "is a kind of" hierarchy. A car and a lorry are kinds of road vehicle; this is the basis of inheritance in OOP.
- OCR: the need for abstraction (it makes problems manageable, reduces memory and processing, focuses design on what matters, and lets programmers use tools without knowing their internals); the difference between an abstraction and reality (an abstraction is a simplified model, so results may not perfectly match the real world, for example a weather model, or a game's physics); devising abstract models for situations.

### Worked example

Devise an abstraction for a program that plans the cheapest train journey.

- Keep: stations (vertices), direct services between them (edges), each with a fare and journey time (weights), and departure times.
- Discard: the colour of trains, platform layout, the driver, the scenery, the exact track route.
- Model: a weighted directed graph; the problem then becomes a shortest-path problem (file 10).

## 4.4.1.4 Information hiding

*Refs: AQA 4.4.1.4.*

### What you need to know

- Information hiding is hiding all details of an object that do not contribute to its essential characteristics. Users of the object see only its interface.
- Example: a driver uses steering wheel, pedals and gears without knowing how the engine management system works. In code, private attributes accessed only through public methods (encapsulation, file 03).
- Benefit: internal details can change without affecting anything that uses the object; users cannot misuse internal data.

## 4.4.1.5 Procedural abstraction

*Refs: AQA 4.4.1.5.*

### What you need to know

- Procedural abstraction represents a computational method. You take a specific calculation and abstract away the actual values to get a general pattern: a procedure.
- Example: from "work out 3 × 3 × 3.14" and "work out 5 × 5 × 3.14" you abstract the method "r × r × 3.14", a procedure `circle_area(r)`.

## 4.4.1.6 Functional abstraction

*Refs: AQA 4.4.1.6.*

### What you need to know

- In functional abstraction, the particular computational method is also hidden. You only know what goes in and what comes out.
- The result of procedural abstraction is a procedure (a method you could look inside); a further abstraction that disregards the method gives a function: "give it r, get the area". Whether it uses r × r × π or a look-up table does not matter to the user.
- Example: you call `sorted(list)` without knowing which sorting algorithm Python uses.

## 4.4.1.7 Data abstraction

*Refs: AQA 4.4.1.7.*

### What you need to know

- Details of how data is actually represented are hidden, so new kinds of data object can be built from existing ones and used without knowing how they are built.
- This separates how a compound data object is used from how it is constructed. A stack can be used through push and pop whether it is implemented as an array with a top pointer or as a linked list. This is the idea behind abstract data types (file 04).

## 4.4.1.8 Problem abstraction/reduction

*Refs: AQA 4.4.1.8.*

### What you need to know

- Details are removed until the problem is represented in a form that can be solved, because it reduces to a problem that has already been solved.
- Example: scheduling exams so no student has two at once reduces to colouring a graph (exams are vertices, an edge joins two exams sharing a student, colours are time slots). Finding fastest delivery routes reduces to shortest paths.

## 4.4.1.9 Decomposition

*Refs: AQA 4.4.1.9 · OCR 2.1.3(a), 2.1.3(b), 2.1.3(d), 2.2.2(c) · Eduqas C1.5: Analysis.*

### What you need to know

- Procedural decomposition means breaking a problem into sub-problems, each of which does an identifiable task, which may be broken down further. Shown with a hierarchy chart (file 02).
- Benefits: each part is easier to understand, solve, code and test; parts can be shared among a team; parts can be reused.

## 4.4.1.10 Composition

*Refs: AQA 4.4.1.10.*

### What you need to know

- Procedural composition: combining procedures to form compound procedures, for example a `checkout` procedure built from `calculate_total`, `apply_discount` and `take_payment`.
- Data composition: combining data objects to form compound data. A tree is composed of nodes, each a record holding data and pointers; a record is composed of fields.
- Composition is the reverse of decomposition: once the parts are solved, they are put back together.

## 4.4.1.11 Automation

*Refs: AQA 4.4.1.11.*

### What you need to know

- Automation means putting models (abstractions of real-world objects or phenomena) into action to solve problems, by:
  - creating algorithms;
  - implementing the algorithms in program code;
  - implementing the models in data structures;
  - executing the code.
- Computer scientists choose what to include in a model and what to leave out, so the model has the minimum detail needed to solve the problem to the required accuracy.

## OCR thinking skills

*Refs: OCR 2.1.2(a) to 2.1.2(d), 2.1.3(a) to 2.1.3(d), 2.1.4(a) to 2.1.4(c), 2.1.5(a), 2.1.5(b).*

### Thinking ahead

- Identify the inputs and outputs of a solution before designing it.
- Determine preconditions: things that must be true before a subroutine or algorithm runs, for example "the list must be sorted" for binary search, or "n ≥ 0" for factorial. Stating preconditions means the subroutine need not check them itself (simpler code) and makes it clear how to reuse it safely.
- Caching: keeping a copy of recently or frequently used data or instructions somewhere faster to reach, anticipating that they will be needed again. Examples: CPU cache, web browser cache, DNS cache, memoisation (storing results of earlier function calls).
  - Benefits: faster access, less network traffic and less load on the original source.
  - Drawbacks: stale (out-of-date) data if the original changes; needs memory; complex to manage (deciding what to keep and when to remove it); a cache miss costs extra time.
- Reusable program components: subroutines, classes and libraries written once and used in many programs. Benefits: faster development, already tested so more reliable, consistent. Drawbacks: may need adapting; compatibility; may contain more than needed.

### Thinking procedurally

- Identify the components of the problem, the components of the solution, the order of the steps, and the sub-procedures needed. Some steps depend on others (you must read data before sorting it); others can be done in any order.

### Thinking logically

- Identify the points in a solution where a decision has to be taken, the logical conditions that decide the outcome, and how each decision affects the flow through the program (which branches and loops follow).

### Thinking concurrently

- Concurrent processing: more than one task is in progress at the same time. On one processor this is done by switching between tasks quickly; parallel processing is the special case where tasks run at the same instant on several processors or cores.
- Identify which parts of a problem can be tackled at the same time (they do not depend on each other's results).
- Benefits: faster overall completion; better use of resources (the processor works on something else while one task waits for input/output); more responsive programs.
- Trade-offs: not every problem can be split; tasks may need to wait for each other; shared data must be protected (two tasks updating the same value can corrupt it: a race condition); harder to design, program and debug; overhead of coordinating tasks.

```python
# memoisation: a simple cache for an expensive recursive function
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(80))   # instant, because each fib(k) is computed once and cached
```

## OCR computational methods

*Refs: OCR 2.2.2(a) to 2.2.2(f).*

### What you need to know

- Features that make a problem solvable by computational methods: it can be stated precisely, with clear inputs and outputs; it can be broken into steps (an algorithm exists); it can be solved in reasonable time and memory (it is tractable, file 14); the data needed is available.
- Problem recognition: identifying that a problem exists, what it is, and that it resembles one already solved.
- Problem decomposition: as above.
- Divide and conquer: split a problem into smaller instances of the same problem, solve them (often recursively) and combine the results. Binary search, merge sort and quick sort all do this. The problem shrinks quickly (halving gives log₂ n levels).
- Abstraction: as above.
- Backtracking: build a solution step by step; when a step leads to a dead end, go back to the last choice point and try another option. Used for mazes, Sudoku and the eight queens puzzle; DFS works this way.
- Data mining: searching large data sets to find patterns, trends and relationships that were not obvious, for example shopping habits that predict what a customer will buy. Uses: marketing, fraud detection, medical research. Concerns: privacy and needing a lot of processing power.
- Heuristics: rules of thumb that find a good enough solution quickly when an exact solution would take too long. Used for intractable problems such as the travelling salesman problem, and in A* (file 10), virus scanners and spam filters.
- Performance modelling: using mathematical models or simulations to predict how a system will behave under load, instead of testing the real system, which may be too costly or dangerous (how a website copes with a million users; how a bank's server handles peak times).
- Pipelining: splitting a task into stages so the output of one stage is the input of the next, and different items are at different stages at the same time. Used in processors (file 23) and in data processing chains.
- Visualisation: presenting data or a problem graphically (charts, graphs, diagrams, maps) so patterns and relationships are easier for humans to see.

### Worked example

Backtracking: find a path from S to E in a maze grid (0 = open, 1 = wall).

```python
maze = [[0, 1, 0, 0],
        [0, 0, 0, 1],
        [1, 0, 1, 0],
        [0, 0, 0, 0]]

def solve(r, c, path, seen):
    if not (0 <= r < 4 and 0 <= c < 4) or maze[r][c] == 1 or (r, c) in seen:
        return False                      # dead end: backtrack
    path.append((r, c)); seen.add((r, c))
    if (r, c) == (3, 3):
        return True                       # reached E
    for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
        if solve(r + dr, c + dc, path, seen):
            return True
    path.pop()                            # undo this step and try another
    return False

p = []
solve(0, 0, p, set())
print(p)   # [(0,0), (1,0), (1,1), (2,1), (3,1), (3,2), (3,3)]
```

From (1,1) the search tries (1,2) first, then (0,2), (0,3), and finds every route there blocked, so it backtracks to (1,1) and tries down instead.

## Common mistakes

- Defining abstraction only as "simplifying". Say what is removed (unnecessary detail) and why (to focus on what is needed to solve the problem).
- Confusing procedural and functional abstraction: procedural hides the values (gives a method); functional also hides the method.
- Saying concurrent always means parallel. Concurrent tasks may be interleaved on one core.
- Saying a heuristic always finds the best answer. It finds a good enough answer quickly.

## Check questions

1. Define the term algorithm. [2 marks]
2. Explain the difference between representational abstraction and abstraction by generalisation, with an example of each. [4 marks]
3. Explain the difference between procedural abstraction and functional abstraction. [2 marks]
4. Give an example of data abstraction. [2 marks]
5. Explain what is meant by problem reduction, with an example. [2 marks]
6. Trace the prime-factor algorithm in this file for n = 45. [3 marks]
7. (OCR) Explain one benefit and two drawbacks of caching. [3 marks]
8. (OCR) What is a precondition? Give an example. [2 marks]
9. (OCR) Describe two benefits and two trade-offs of concurrent processing. [4 marks]
10. (OCR) Explain how backtracking is used to solve a maze. [3 marks]
11. (OCR) Explain what is meant by a heuristic and why heuristics are used. [2 marks]
12. Four friends sit in seats 1 to 4 in a row. Fay is in seat 1. Dan is not at either end. Eve sits directly right of Dan. Gus does not sit next to Fay. Which seat is Gus in? Show your reasoning and check your answer. [3 marks]

## Mark scheme

1. A sequence of steps/instructions to complete a task (1) that always terminates (1).
2. Representational: removing unnecessary detail to give a simpler representation (1), e.g. a metro map (1). Generalisation: grouping by common characteristics into an "is a kind of" hierarchy (1), e.g. cars and lorries are kinds of vehicle (1).
3. Procedural abstraction abstracts away the actual values to give a general method/procedure (1); functional abstraction also hides the method, so only inputs and outputs are known (1).
4. A stack used through push/pop without knowing its implementation (1); e.g. array with top pointer or linked list (1).
5. Removing details until the problem can be represented as one that has already been solved (1); e.g. exam timetabling reduced to graph colouring, or route finding to shortest path (1).
6. n 45, d 2: no; d 3: yes, output 3, n 15 (1); d 3: yes, output 3, n 5 (1); d 4: no; d 5: yes, output 5, n 1; outputs 3, 3, 5 (1).
7. Benefit: faster access/less network traffic/less load on source (1). Drawbacks: stale data (1); memory needed/complex management/cache misses (1).
8. A condition that must be true before an algorithm/subroutine runs (1); e.g. list sorted before binary search (1).
9. Benefits: faster completion; better use of processor while waiting for I/O; responsive (2). Trade-offs: not all problems can be split; shared data/race conditions; harder to program/debug; overhead of coordination (2).
10. Move forward one step at a time choosing an available direction (1); on reaching a dead end, return to the last point where there was an untried choice (1); try another route from there, repeating until the exit is found or all routes tried (1).
11. A rule of thumb giving a good enough/approximate solution (1); used when finding an exact solution would take too long, e.g. intractable problems (1).
12. Dan is in seat 2 or 3 (1). If Dan is in 3, Eve is in 4 and Gus must be in 2, next to Fay, which breaks a rule; so Dan is in 2, Eve in 3 (1). Gus is in seat 4; check: Dan not at an end, Eve right of Dan, Gus not next to Fay (1).
