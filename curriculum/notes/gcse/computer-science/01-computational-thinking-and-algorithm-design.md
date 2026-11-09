---
level: GCSE
subject: Computer Science
topic: "Computational thinking and designing algorithms"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.1.1", "3.1.2"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.1.1", "2.1.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.1.1", "1.2.1", "1.2.4", "1.2.7", "6.1.1", "6.1.3"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["8: Algorithms", "C2: Investigation", "C2: Design"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Computational thinking and designing algorithms

This file covers what an algorithm is, the three ideas of computational thinking (decomposition, abstraction, algorithmic thinking), how to set out an algorithm as pseudocode, a flowchart, a structure diagram or program code, how to find inputs, processes and outputs, how to trace an algorithm with a trace table, and how to compare algorithms for efficiency.

## Overview

Every board starts programming from the same place: break a problem down, keep only the detail that matters, then write precise steps. The exam skills are the same on every board: read an algorithm, say what it does, trace it, find and fix errors, finish an incomplete one, and write one from a description.

### Board differences

- AQA 8525: 3.1.1 and 3.1.2, examined on Paper 1. Algorithms in the paper are always in AQA pseudo-code. Where you may answer in pseudo-code, any clear style is accepted. AQA asks about time efficiency only, with no formal analysis.
- OCR J277: 2.1.1 and 2.1.2, examined on J277/02. Code in the paper uses the OCR Exam Reference Language (ERL). OCR is the only board that names structure diagrams.
- Edexcel 1CP2: 1.1.1, 1.2.1, 1.2.4 and 1.2.7 on Paper 1; 6.1.1 and 6.1.3 on the on-screen Paper 2 in Python 3. Edexcel uses "pseudocode" to mean any informal written description: there is no fixed syntax. Its flowchart symbols are in the spec appendix. Edexcel asks you to judge efficiency by number of compares, number of passes through a loop and use of memory.
- Eduqas C500QS: 8 Algorithms (Component 1), and the Investigation and Design stages of Component 2. Eduqas has its own pseudo-code conventions (for example `set counter = 0`, `if ... end if`, `for i ... next i`, `repeat ... until`, comments in `/** */`) and flowchart conventions, including a connector and a store/subroutine symbol. Eduqas also names counts and rogue values.

## Algorithms and programs

*Refs: AQA 3.1.1 · OCR 2.1.2 · Edexcel 1.2.1 · Eduqas 8: Algorithms.*

### What you need to know

- An algorithm is a sequence of steps that can be followed to complete a task.
- A program is an algorithm written in a programming language so a computer can run it. An algorithm is not the same as a program: one algorithm can be coded in many languages.
- Algorithms can be shown as pseudocode, flowcharts or program code.
- Every algorithm is built from three constructs: sequence (steps in order), selection (choosing a path with a condition) and iteration (repeating steps).

### Explained

Think of an algorithm as the plan and the program as the plan written in a language a machine can run. A recipe is an algorithm; a recipe printed in French or English is the same algorithm in different languages.

An algorithm must be precise. "Add some numbers" is not an algorithm. "Set total to 0, then for each number in the list add it to total" is.

### Common mistakes

- Calling an algorithm "a program". In a definition question you need "a sequence of steps to complete a task".
- Writing vague steps such as "sort the list" when the question asks for the steps of the sort.

## Computational thinking: decomposition, abstraction, algorithmic thinking

*Refs: AQA 3.1.1 · OCR 2.1.1 · Edexcel 1.1.1, 6.1.1 · Eduqas C2: Investigation.*

### What you need to know

- Decomposition: breaking a problem into smaller sub-problems, each of which can be solved (and tested) on its own.
- Abstraction: removing unnecessary detail so you can focus on what matters to the problem. It is used to model a real-world situation in an algorithm or program.
- Algorithmic thinking: working out the steps (and their order) needed to solve the problem, so the solution can be reused for similar problems.
- Benefits of decomposition: each part is simpler; parts can be shared between a team; parts can be tested separately; parts can be reused.
- Benefits of abstraction: the problem becomes simpler; programs are smaller; the model still behaves correctly for its purpose.

### Explained

Decomposition: "make a quiz app" becomes "load questions", "ask a question", "check the answer", "keep the score", "show the result". Each of these can become a subprogram.

Abstraction: a train map shows stations and the order of stops, not the true distances, bends or buildings. A program that models a dice only needs "a random whole number from 1 to 6": the colour, weight and material of a real dice are left out.

Eduqas also uses abstraction in two more ways: to structure a program into modules with clear, documented interfaces (the module's name, parameters and return value tell you how to use it without reading its code), and to model chosen parts of the outside world.

### Worked example

A school wants a program that books students onto clubs. Decompose it and give one abstraction.

1. Sub-problems: show the list of clubs; take the student's ID and choice; check the club is not full; save the booking; print a confirmation.
2. Abstraction: the student is stored only as an ID, name and year group. Their address, height and timetable are not needed, so they are left out.

### Common mistakes

- Defining abstraction as "hiding" data. Say "removing unnecessary detail to focus on what is important".
- Giving an example of decomposition that is just a list of features, with no sense of sub-problems that can be solved separately.

## Inputs, processes and outputs; analysing requirements

*Refs: AQA 3.1.1 · OCR 2.1.2 · Edexcel 1.2.1 · Eduqas C2: Investigation, C2: Design.*

### What you need to know

- Identify the inputs (data going in), processes (what is done to the data) and outputs (results produced) of a problem.
- (Eduqas) Analyse a set of requirements, design and document the inputs and outputs of the user interface and the data structures needed.

### Explained

An IPO table is a quick way to plan before writing any code.

| Input | Process | Output |
| --- | --- | --- |
| Length and width of a room in metres | area = length × width; tins = area ÷ 10, rounded up | Number of tins of paint |

### Common mistakes

- Listing a process ("calculate the area") as an output. The output is the value shown or stored.

## Representing algorithms: pseudocode, flowcharts and structure diagrams

*Refs: AQA 3.1.1 · OCR 2.1.2 · Edexcel 1.2.1, 6.1.3 · Eduqas 8: Algorithms, C2: Design.*

### What you need to know

- Pseudocode: structured, language-like steps that are not tied to one language. AQA and Eduqas print theirs in a set style; OCR uses its Exam Reference Language; Edexcel accepts any informal description.
- Flowchart symbols:
  - Terminal (rounded rectangle): start or stop.
  - Input/output (parallelogram).
  - Process (rectangle).
  - Decision (diamond), with two labelled exits (Yes/No or True/False).
  - Subprogram/subroutine call (rectangle with double side lines). Eduqas calls it "store / subroutine call".
  - Flow line with arrowheads.
  - (Eduqas) Connector (small circle) to join parts of a chart.
- Structure diagram (OCR): a top-down tree showing a problem decomposed into sub-sections and how they link.
- Convert an algorithm between forms, for example a flowchart into program code (Edexcel 6.1.3).

### Explained

The same algorithm in three forms. It asks for numbers until 0 (a rogue value) is entered, then outputs the total.

Pseudocode (informal, close to AQA/OCR style):

```
total ← 0
num ← USERINPUT
WHILE num ≠ 0
    total ← total + num
    num ← USERINPUT
ENDWHILE
OUTPUT total
```

Flowchart, written as a list of boxes:

1. Terminal: Start.
2. Process: total = 0.
3. Input: num.
4. Decision: num ≠ 0? No → go to 7. Yes → go to 5.
5. Process: total = total + num.
6. Input: num, then back to 4.
7. Output: total.
8. Terminal: Stop.

Python:

```python
total = 0
num = int(input("Number (0 to stop): "))
while num != 0:
    total = total + num
    num = int(input("Number (0 to stop): "))
print(total)
```

A rogue (sentinel) value is a special value, such as 0 or −1, that is not real data and tells a loop to stop. A count is a variable that goes up by 1 each time something happens, for example `count = count + 1` to count how many numbers were entered (Eduqas names both).

Structure diagram for a quiz program (each line is a box; indentation shows the level below):

```
Quiz
  Set up
    Load questions from file
    Reset score
  Play
    Ask question
    Check answer
    Update score
  Finish
    Show score
    Save high score
```

### Common mistakes

- Using a process box for an input. Inputs and outputs are parallelograms.
- Leaving a decision box with unlabelled exits, or with only one exit.
- Drawing a structure diagram as a flowchart. A structure diagram has no order of execution and no decisions; it shows only the breakdown.

## Trace tables and finding the purpose of an algorithm

*Refs: AQA 3.1.1 · OCR 2.1.2 · Edexcel 1.2.4 · Eduqas 8: Algorithms.*

### What you need to know

- A trace table records the value of each variable (and any output) as an algorithm runs, line by line or pass by pass.
- Use trace tables, or careful reading, to find the output for given data and to work out what an algorithm is for.
- Use them to find logic errors: compare what the table shows with what should happen.

### Explained

Make one column per variable, plus a column for any condition and for output. Write a new row each time a value changes. Only write the value that changes in a row if the question's table is set out that way; otherwise copy values down.

### Worked example

Trace this algorithm and state its purpose.

```python
n = 6
result = 1
i = 1
while i <= n:
    if n % i == 0:
        result = i
    i = i + 2
print(result)
```

| i | i ≤ n | n % i == 0 | result | output |
| --- | --- | --- | --- | --- |
| 1 | True | True | 1 | |
| 3 | True | True | 3 | |
| 5 | True | False | 3 | |
| 7 | False | | | 3 |

Output: 3. Purpose: it finds the largest odd factor of n (i only takes odd values, and result keeps the last one that divides n).

A second trace, with a list:

```python
scores = [12, 7, 19, 4]
best = scores[0]
for k in range(1, len(scores)):
    if scores[k] > best:
        best = scores[k]
print(best)
```

| k | scores[k] | best |
| --- | --- | --- |
| | | 12 |
| 1 | 7 | 12 |
| 2 | 19 | 19 |
| 3 | 4 | 19 |

Output 19. Purpose: finds the largest value in the list.

### Common mistakes

- Forgetting the last check of a loop condition, which is when the loop stops.
- Skipping the first value of a variable before the loop starts.
- Writing the output too early: the output happens only when the `print` line runs.

## Efficiency and fitness for purpose

*Refs: AQA 3.1.2 · Edexcel 1.2.7 · OCR 2.1.2 (refining) · Eduqas C2: Refinement.*

### What you need to know

- More than one algorithm can solve the same problem. Compare them by how well they do it.
- Time efficiency: how many steps (comparisons, passes through a loop) it needs. AQA asks only about time efficiency, with no formal notation.
- Edexcel also names memory use: an algorithm that makes a copy of a list uses more memory than one that works in place.
- Fitness for purpose: does it give the correct output for all valid inputs, including edge cases, and does it meet the requirements?
- Refine an algorithm: improve it to fix errors, handle more cases or do less work.

### Explained

Two ways to add the numbers 1 to n:

```python
# Method A: loop, n additions
total = 0
for k in range(1, n + 1):
    total = total + k

# Method B: formula, one calculation
total = n * (n + 1) // 2
```

Both give the same answer. For n = 1000, A does 1000 additions; B does one multiplication, one addition and one division, whatever n is. B is more time-efficient. Both use about the same memory.

Stopping early also saves time. A loop that checks whether a value is in a list can stop as soon as it finds it, instead of looking at every item.

### Worked example

This function should say whether a number is prime. Count the divisions it does for n = 97, and suggest a refinement.

```python
def is_prime(n):
    found = False
    for d in range(2, n):
        if n % d == 0:
            found = True
    return n > 1 and not found
```

1. It tries d = 2 to 96: 95 divisions, even though 97 has no factors.
2. Refinement 1: return False as soon as a factor is found (stops early for non-primes).
3. Refinement 2: only test d up to the square root of n, since a factor above the square root pairs with one below it. For 97 that is d = 2 to 9: 8 divisions.

### Common mistakes

- Saying one algorithm is "faster" without saying why (fewer comparisons, fewer passes, stops early).
- Treating a shorter program as automatically more efficient. Count the work done, not the lines.

## Check questions

1. Define the term algorithm. [1 mark]
2. A program will run a car park: it reads a number plate at the barrier, records entry and exit times and charges by the hour. Describe how decomposition could be used to plan this program. [3 marks]
3. A satnav shows roads as lines between junctions. Explain how this is an example of abstraction. [2 marks]
4. Name the flowchart symbol used for (a) a decision, (b) an input. [2 marks]
5. Trace this algorithm and give the output. [4 marks]

```python
x = 5
y = 0
while x > 1:
    if x % 2 == 0:
        x = x // 2
    else:
        x = 3 * x + 1
    y = y + 1
print(y)
```

6. Write an algorithm, in pseudocode or Python, that asks for exam marks until −1 is entered, then outputs how many marks were entered and their mean. Do not include −1 in the results. [5 marks]
7. Two algorithms find whether a name is in an unsorted list of 500 names. Algorithm P always checks all 500 names. Algorithm Q stops when it finds the name. Explain which is more time-efficient. [2 marks]
8. State what is meant by a rogue value. [1 mark]

## Mark scheme

1. A sequence of steps (instructions) that can be followed to complete a task (1).
2. Any three: break the problem into smaller sub-problems (1); for example reading the plate, recording times, calculating the charge, taking payment (1 for at least two sensible sub-problems); each part can be solved/written/tested separately (1); parts could be shared among programmers or reused (1).
3. Unnecessary detail (buildings, road surface, exact shape) is removed (1); only what matters for finding a route (connections, junctions, distances) is kept (1).
4. (a) Diamond (1). (b) Parallelogram (1).
5. Sequence of x: 5, 16, 8, 4, 2, 1 (1 for 16, 1 for the halving steps). y goes 1, 2, 3, 4, 5 (1). Output 5 (1).
6. Example:

```python
count = 0
total = 0
mark = int(input("Mark: "))
while mark != -1:
    total = total + mark
    count = count + 1
    mark = int(input("Mark: "))
if count > 0:
    print(count, total / count)
else:
    print("No marks entered")
```

Marks: initialise count and total (1); input before the loop and again inside it (1); loop condition stops on −1 (1); update total and count inside the loop (1); output count and total ÷ count, with −1 not included (1). Allow equivalent pseudocode.
7. Q is more efficient (1) because it can stop early, so on average it makes fewer comparisons (about half the list) and never more than P (1).
8. A value outside the normal range of data that signals the end of input (1).
