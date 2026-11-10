---
level: A-level
subject: Computer Science
topic: "Stack frames, recursion, programming paradigms and procedural programming"
as_content: "AQA: 4.1.2.2 (structured programming, hierarchy charts) is also AS (7516 3.1.2.1). Stack frames, recursion and the paradigms comparison (4.1.1.15, 4.1.1.16, 4.1.2.1) are A-level only. OCR: recursion and paradigms are A-level only; procedural techniques are also AS."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.1.1.15", "4.1.1.16", "4.1.2.1", "4.1.2.2"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.4(a)", "1.2.4(b)", "2.2.1(b)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Recursion", "C1.4: Programming paradigms", "C1.4: Types of computer language"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Stack frames, recursion and programming paradigms

This file covers how a call stack makes subroutine calls work, recursion (base case, general case, tracing, and comparing with iteration), what a programming paradigm is, and the structured (procedural) approach with hierarchy charts. Object-oriented programming has its own file, [03-object-oriented-programming.md](03-object-oriented-programming.md); functional programming is in [32-functional-programming.md](32-functional-programming.md).

Builds on [GCSE: Subprograms and structured programming](../../gcse/computer-science/05-subprograms-and-structured-programming.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Stack frames | Return address, parameters, local variables (4.1.1.15) | Implied by recursion (2.2.1(b)) | Implied by procedure calling and return (C1.3: Parameters) |
| Recursion | Base and general case, solve simple problems | Use recursion and compare with iteration | Use recursion; its "potential elegance" |
| Paradigms | Procedural and object-oriented | Need for and characteristics of a variety of paradigms; procedural | Procedural, event-driven, visual and mark-up; choose a type of language for a problem |
| Hierarchy charts | Named | Not named | Not named |

## 4.1.1.15 Role of stack frames in subroutine calls

*Refs: AQA 4.1.1.15 · OCR 2.2.1(b) · Eduqas C1.3: Parameters.*

### What you need to know

- When a subroutine is called, a stack frame (activation record) is pushed onto the call stack. It holds:
  - the return address: where to continue in the caller when the subroutine ends;
  - the parameters (the values or addresses passed in);
  - the local variables of the subroutine.
- When the subroutine ends, its frame is popped: the return address is used to jump back, and its locals and parameters disappear.
- Because a stack is last in, first out, the most recently called subroutine is always the one that finishes first. This is what allows nested calls and recursion.
- If calls nest too deeply (often from recursion with no reachable base case), the stack runs out of memory: a stack overflow.

### Explained

Picture the program:

```python
def square(n):
    result = n * n
    return result

def sum_squares(a, b):
    total = square(a) + square(b)
    return total

print(sum_squares(3, 4))
```

| Moment | Call stack (top at right) |
| --- | --- |
| main calls sum_squares(3, 4) | main · [sum_squares: return → print line; a=3, b=4; total] |
| sum_squares calls square(3) | main · [sum_squares …] · [square: return → middle of the total line; n=3; result] |
| square(3) returns 9 | main · [sum_squares …] |
| sum_squares calls square(4), gets 16 | push then pop again |
| sum_squares returns 25 | main |

### Common mistakes

- Listing "the code of the subroutine" as part of a stack frame. The code is stored once elsewhere; only the return address, parameters and locals go in the frame (plus, in real systems, saved registers).
- Saying the stack is first in, first out.

## 4.1.1.16 Recursive techniques

*Refs: AQA 4.1.1.16 · OCR 2.2.1(b) · Eduqas C1.3: Recursion.*

### What you need to know

- A recursive subroutine calls itself.
- It needs a base case (a stopping condition that returns without a recursive call) and a general case (which calls itself on a smaller version of the problem, moving towards the base case).
- Each call gets its own stack frame, so each call has its own copy of the parameters and locals.
- Without a reachable base case, calls never stop and the stack overflows.
- Recursion vs iteration:
  - Recursion: often shorter, closer to the mathematical definition, natural for trees, divide-and-conquer and backtracking ("elegant"). But each call uses stack memory and call overhead, so it is usually slower and can overflow; harder to trace.
  - Iteration: uses a fixed amount of memory and no call overhead, but some problems (tree traversal, Towers of Hanoi) are awkward to write without an explicit stack.
- Any recursive algorithm can be rewritten iteratively (sometimes with your own stack), and vice versa.

### Worked example

Factorial: n! = n × (n − 1)!, with 0! = 1.

```python
def fact(n):
    if n == 0:            # base case
        return 1
    return n * fact(n - 1)   # general case
```

Trace `fact(3)`:

| Call | n | Waits for | Returns |
| --- | --- | --- | --- |
| fact(3) | 3 | 3 × fact(2) | 3 × 2 = 6 |
| fact(2) | 2 | 2 × fact(1) | 2 × 1 = 2 |
| fact(1) | 1 | 1 × fact(0) | 1 × 1 = 1 |
| fact(0) | 0 | (base case) | 1 |

Calls go down (four frames on the stack at the deepest point), then results come back up in reverse order.

Trace this mystery function for `m(13)` and state its purpose.

```python
def m(n):
    if n < 2:
        return str(n)
    return m(n // 2) + str(n % 2)
```

m(13) = m(6) + "1"; m(6) = m(3) + "0"; m(3) = m(1) + "1"; m(1) = "1". Unwinding: "1" + "1" = "11", + "0" = "110", + "1" = "1101". It converts a non-negative integer to binary (13 = 1101).

Iterative version of factorial for comparison:

```python
def fact_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

### Common mistakes

- Writing the base case after the recursive call, so it is never reached.
- Forgetting to `return` the recursive call's value in a function, so `None` comes back.
- Saying recursion is "more efficient". It is usually less efficient in memory and time; its advantage is clarity for naturally recursive problems.

## 4.1.2.1 Programming paradigms

*Refs: AQA 4.1.2.1 · OCR 1.2.4(a) · Eduqas C1.4: Programming paradigms, Types of computer language.*

### What you need to know

- A programming paradigm is a style or approach to programming, with its own way of structuring code and thinking about a problem. Languages are designed around one or more paradigms.
- Imperative paradigms say how to solve the problem as a sequence of commands that change the program's state:
  - Procedural: the program is a sequence of instructions grouped into procedures and functions that act on data passed to them. Examples: C, Pascal, and Python used procedurally.
  - Object-oriented: the program is a set of objects, each combining data (attributes) and the code that works on it (methods), which interact by sending messages. Examples: Java, C#.
- Declarative paradigms say what the result should be, not how to get it:
  - Functional: programs are built from pure functions with no side effects and no changing state (Haskell). See file 32.
  - Logic: facts and rules are stated, and the system searches for answers to queries (Prolog).
  - Query languages such as SQL are declarative too.
- Eduqas names further types:
  - Event-driven: the flow of the program is decided by events (mouse clicks, key presses, sensor signals, messages). An event loop waits for events and calls the matching event handler. Used for GUIs and games.
  - Visual: programs are built by arranging graphical blocks or connecting icons (Scratch, block-based tools for robots). Good for beginners and for quick prototypes; limited for large systems.
  - Mark-up: not programming languages in the full sense. They describe the structure and presentation of a document using tags (HTML, XML). They have no general processing such as loops.
- Choosing a paradigm or language for a problem: think about the problem's nature (data-heavy, interactive, mathematical), speed and hardware access needed (low-level for drivers), the team's skills, available libraries, and the target platform.
- OCR also says why so many paradigms exist: different problems suit different ways of thinking, and some ideas are easier to express in one style.

### Explained

| Problem | A sensible choice | Why |
| --- | --- | --- |
| Device driver for a sensor | Low-level/procedural (assembly, C) | Direct hardware control, speed, small memory |
| Large business system with many similar entities | Object-oriented | Classes model entities; inheritance and encapsulation help teams and maintenance |
| GUI app or game | Event-driven (often OO too) | Responds to user actions in any order |
| Parallel data processing at scale | Functional | No side effects, so work can be split safely across processors |
| Expert system of rules | Logic (Prolog) | Facts and rules map directly to the language |
| Web page layout | Mark-up (HTML with CSS) | Describes structure, not processing |
| Querying a database | SQL (declarative) | Say what data you want; the DBMS works out how |

```python
# Event-driven sketch using Python's tkinter
import tkinter as tk

def on_click():                 # event handler
    label.config(text="Clicked!")

root = tk.Tk()
label = tk.Label(root, text="Waiting")
button = tk.Button(root, text="Press", command=on_click)  # bind event to handler
label.pack(); button.pack()
root.mainloop()                 # event loop: waits for events, dispatches them
```

### Common mistakes

- Calling HTML a programming language without qualification. It is a mark-up language.
- Thinking a language belongs to one paradigm only. Python supports procedural, object-oriented and functional styles.

## 4.1.2.2 Procedural-oriented programming

*Refs: AQA 4.1.2.2 · OCR 1.2.4(b).*

### What you need to know

- The structured approach designs a program top-down: break the problem into sub-problems, then break those down until each is small enough to code as one subroutine.
- It uses only the three control structures (sequence, selection, iteration), with no unstructured jumps (GOTO), and subroutines that each do one job, communicating through parameters and return values rather than globals.
- A hierarchy chart shows the program as a tree of modules: the whole program at the top, each box split into the subroutines it calls. It shows structure, not order or conditions.
- Advantages: each module is small, so easier to write, test and debug; modules can be developed by different people in parallel; modules can be reused; the program is easier to read and maintain; errors are confined to one module.
- OCR 1.2.4(b) lists procedural techniques: program flow, variables and constants, procedures and functions, arithmetic, Boolean and assignment operators, string handling and file handling (all in files 01 and 04).

### Worked example

A program marks a quiz: it loads questions from a file, asks each one, scores the answers and saves a report.

```
                    Quiz program
        ┌──────────────┼───────────────┬───────────────┐
  Load questions   Run quiz        Show results    Save report
        │          ┌───┴────┐          │
   Open file    Ask       Check     Calculate %
   Read lines   question  answer
```

Each box becomes a subroutine. "Run quiz" calls "Ask question" and "Check answer" for each question; the chart does not show the loop, only that Run quiz uses them.

### Common mistakes

- Drawing a hierarchy chart with decisions or loops. That is a flowchart.
- Calling "top-down design" a paradigm. It is a design method used within the procedural paradigm.

## Check questions

1. State three items stored in a stack frame and explain why each is needed. [3 marks]
2. Explain why a call stack must be last in, first out. [2 marks]
3. Write a recursive function `power(b, e)` that returns bᵉ for integer e ≥ 0. Identify the base case. [4 marks]
4. Trace `f(4)` and give the value returned. [3 marks]

```python
def f(n):
    if n <= 1:
        return 1
    return f(n - 1) + f(n - 2)
```

5. Give two disadvantages of recursion compared with iteration. [2 marks]
6. Explain what is meant by a stack overflow and how a recursive subroutine can cause one. [2 marks]
7. Describe two differences between the procedural and object-oriented paradigms. [4 marks]
8. (Eduqas) Describe the event-driven paradigm and give an example of where it would be used. [3 marks]
9. Draw a hierarchy chart for a program that reads exam results from a file, works out each student's grade, and prints a class summary with the average and highest mark. [4 marks]
10. Explain two advantages of the structured approach to program design. [2 marks]

## Mark scheme

1. Return address, so control goes back to the correct instruction in the caller (1); parameters, the values/addresses passed in, needed by the subroutine (1); local variables, storage for this call only (1).
2. The last subroutine called must finish first and return to the one that called it (1); so the most recent frame must be removed first (1).
3. Example:

```python
def power(b, e):
    if e == 0:
        return 1
    return b * power(b, e - 1)
```

Base case e == 0 returns 1 (1), identified (1); recursive call with e − 1 (1); multiplies by b and returns (1).
4. f(4) = f(3) + f(2); f(3) = f(2) + f(1); f(2) = f(1) + f(0) = 1 + 1 = 2 (1); f(3) = 2 + 1 = 3 (1); f(4) = 3 + 2 = 5 (1).
5. Any two: uses more memory as a frame is stored for each call (1); slower because of call overhead (1); risk of stack overflow for deep recursion (1); harder to trace/debug (1).
6. The call stack runs out of memory/space (1); each recursive call adds a frame and if the base case is never reached (or recursion is too deep) frames keep being added (1).
7. Any two pairs: procedural separates data and the procedures acting on it, OO combines them in objects (2); procedural program is a sequence of procedure calls, OO is objects interacting through methods (2); OO uses classes/inheritance/encapsulation, procedural does not (2).
8. Program flow is decided by events/user actions (1); an event loop listens for events and runs the matching event handler (1); example such as a GUI form, game or touchscreen kiosk (1).
9. Top box for the program (1); second level such as Load results, Calculate grades, Produce summary (1); third level under Produce summary such as Calculate average, Find highest, Print (1); correct tree form with no loops/decisions (1).
10. Any two: modules are smaller so easier to code/test/debug (1); modules can be shared among a team (1); modules can be reused (1); easier to maintain/understand (1).
