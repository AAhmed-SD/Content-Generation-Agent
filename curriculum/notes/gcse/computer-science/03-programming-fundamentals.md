---
level: GCSE
subject: Computer Science
topic: "Programming fundamentals: data types, variables, operators and constructs"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.2.1", "3.2.2", "3.2.3", "3.2.4", "3.2.5", "3.2.7"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.2.1", "2.2.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.2.1", "1.2.2", "1.2.3", "6.1.2", "6.2.1", "6.2.2", "6.3.1", "6.3.2", "6.4.1", "6.5.1", "6.5.2", "6.5.3"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["4: Data types", "8: Algorithms", "C2: Implementation"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Programming fundamentals: data types, variables, operators and constructs

This file covers data types and casting, variables, constants and assignment, input and output, the arithmetic, relational and Boolean operators, and the three programming constructs: sequence, selection and iteration (count-controlled, condition-controlled and iterating over a data structure), including nesting.

## Overview

These are the building blocks of every program. All examples are in Python 3, which every board accepts. The exam papers may print code in a board's own pseudocode, so the pseudocode keyword for each idea is given too.

### Board differences

- AQA 8525: 3.2.1 to 3.2.5 and 3.2.7, Paper 1. AQA requires you to understand condition-controlled loops with the test at the end (REPEAT ... UNTIL, DO ... WHILE) even though Python does not have one. AQA pseudo-code uses `←` for assignment, `DIV` and `MOD`, `USERINPUT` and `OUTPUT`. Answers may be in C#, Python or VB.NET.
- OCR J277: 2.2.1 and 2.2.2, J277/02. OCR names casting, the exponent operator `^`, `MOD` and `DIV`, `==` and `!=`. OCR's Exam Reference Language uses `=` for assignment, `const`, `input()` and `print()`, `for i = 0 to 9 ... next i`, `while ... endwhile`, `do ... until`, `switch/case`.
- Edexcel 1CP2: topic 1 (Paper 1, any informal pseudocode) and topic 6 (Paper 2, on-screen Python 3, using the Programming Language Subset, PLS). Edexcel lists "char" as a primitive type and names "single entry/exit points" for code blocks and subprograms, and iteration "over every item in a data structure".
- Eduqas C500QS: 4 Data types and 8 Algorithms (Component 1), and Implementation (Component 2, Python 3). Eduqas pseudo-code: `set x = 0`, `x is integer`, `if ... else ... end if`, `for i ... next i`, `repeat ... until`, `do ... loop`, `do ... while`, `while ... repeat`, `<>` for not equal, and `DIV` and `MOD`.

## Data types and casting

*Refs: AQA 3.2.1 · OCR 2.2.2 · Edexcel 6.3.1 · Eduqas 4: Data types, C2: Implementation.*

### What you need to know

- A data type says what kind of value a variable holds, what operations can be done on it, and how much memory it uses.
- Integer: a whole number, for example −3, 0, 250.
- Real (float in Python): a number with a fractional part, for example 3.75.
- Boolean: True or False only.
- Character (char): a single letter, digit or symbol, for example 'A', '7', '#'.
- String: a sequence of characters, for example "SW1A 1AA".
- Casting: converting a value from one type to another, for example `int("42")` gives 42, `str(7)` gives "7", `float("2.5")` gives 2.5.
- Choose a suitable type for each item of data in a scenario.

### Explained

A phone number such as "07700 900123" should be a string, not an integer: it starts with 0, has a space and you never do arithmetic on it. A price is real. A count of people is integer. "Has paid?" is Boolean.

Python has no separate char type: a character is a string of length 1. You should still use the word "character" in answers.

`input()` always returns a string, so you must cast it before doing arithmetic.

```python
age = input("Age: ")       # "15", a string
age = int(age)             # 15, an integer
print("Next year: " + str(age + 1))
```

### Common mistakes

- Choosing integer for phone numbers, postcodes or ID codes with leading zeros.
- Saying "float" when the question asks for the data type name the spec uses ("real"). Either is usually accepted; real is safest.
- Concatenating a string and a number without casting: `"Score: " + 5` causes a run-time error in Python.

## Variables, constants and assignment

*Refs: AQA 3.2.2 · OCR 2.2.1 · Edexcel 1.2.2, 6.2.1, 6.3.2 · Eduqas 8: Algorithms.*

### What you need to know

- A variable is a named memory location whose value can change while the program runs.
- A constant is a named value that does not change while the program runs.
- Declaration names a variable or constant (and in many languages its type). Assignment gives it a value. Initialisation is the first assignment.
- Why use constants: the value is changed in one place only; the name makes the code easier to read; it cannot be changed by mistake while running.
- Use meaningful identifiers (names) such as `total_cost`, not `x`, so code is easier to read and maintain.

### Explained

```python
VAT_RATE = 0.2               # constant: Python marks it by convention (capitals)
price = 40.0                 # variable, initialised
price = price * (1 + VAT_RATE)   # assignment uses the current value
print(price)                 # 48.0
```

Python does not enforce constants; other languages do (`const` in OCR ERL and C#). In an exam answer, say the value "cannot be changed while the program is running".

### Common mistakes

- Reading `=` in assignment as "equals" in the maths sense. `x = x + 1` means "work out x + 1, then store it in x".
- Defining a constant as "a variable that does not change". It is not a variable: it cannot be changed by the program.

## Input and output

*Refs: AQA 3.2.7 · OCR 2.2.1 · Edexcel 1.2.1, 6.4.1 · Eduqas 8: Algorithms.*

### What you need to know

- Take input from the keyboard and output to the screen.
- Respond appropriately to what the user enters (Edexcel 6.4.1).

### Explained

```python
name = input("Enter your name: ")
print("Hello", name)
print("Hello " + name + "!")
```

`print` with commas puts a space between items; with `+` you join strings yourself.

## Operators

*Refs: AQA 3.2.3, 3.2.4, 3.2.5 · OCR 2.2.1 · Edexcel 1.2.3, 6.5.1, 6.5.2, 6.5.3 · Eduqas 8: Algorithms.*

### What you need to know

Arithmetic operators:

| Operation | Python | Pseudocode | Example |
| --- | --- | --- | --- |
| Addition | `+` | + | 7 + 2 = 9 |
| Subtraction | `-` | − | 7 − 2 = 5 |
| Multiplication | `*` | * or × | 7 * 2 = 14 |
| Real division | `/` | / | 7 / 2 = 3.5 |
| Integer division (quotient) | `//` | DIV | 7 DIV 2 = 3 |
| Modulus (remainder) | `%` | MOD | 7 MOD 2 = 1 |
| Exponentiation (OCR, Edexcel) | `**` | ^ | 2 ^ 3 = 8 |

Relational (comparison) operators give True or False:

| Meaning | Python | Pseudocode |
| --- | --- | --- |
| Equal to | `==` | = or == |
| Not equal to | `!=` | ≠, != or <> |
| Less than | `<` | < |
| Greater than | `>` | > |
| Less than or equal to | `<=` | ≤ or <= |
| Greater than or equal to | `>=` | ≥ or >= |

Boolean (logical) operators: AND (true only if both sides are true), OR (true if at least one side is true), NOT (reverses true and false). Eduqas also uses XOR (true if exactly one side is true).

### Explained

MOD is used to test divisibility: `n % 2 == 0` is true when n is even. DIV and MOD together split a quantity: 135 minutes is `135 // 60` = 2 hours and `135 % 60` = 15 minutes.

Combine conditions with Boolean operators:

```python
if age >= 13 and age <= 19:
    print("Teenager")
if not (day == "Sat" or day == "Sun"):
    print("Weekday")
```

### Worked example

Evaluate each expression when a = 17 and b = 5.

1. `a // b` = 3.
2. `a % b` = 2.
3. `a / b` = 3.4.
4. `b ** 2` = 25.
5. `a > 10 and b > 10` = True and False = False.
6. `not (a == 17)` = not True = False.

### Common mistakes

- Using `=` instead of `==` in a condition.
- Writing `if age >= 13 and <= 19`: each side of AND must be a full condition.
- Mixing up DIV and MOD: DIV gives how many times it goes in; MOD gives what is left over.

## Sequence and selection

*Refs: AQA 3.2.2 · OCR 2.2.1 · Edexcel 1.2.1, 6.2.1, 6.2.2 · Eduqas 8: Algorithms.*

### What you need to know

- Sequence: statements run one after another in order.
- Selection: a condition decides which block of code runs (IF, ELSE IF, ELSE; some languages also have SWITCH/CASE, which OCR's ERL includes).
- Nested selection: an IF inside another IF.

### Explained

```python
mark = int(input("Mark: "))
if mark >= 70:
    grade = "A"
elif mark >= 50:
    grade = "B"
elif mark >= 30:
    grade = "C"
else:
    grade = "U"
print(grade)
```

The tests run in order and stop at the first true one, so the order of conditions matters: testing `mark >= 30` first would give "C" to a mark of 85.

Nested:

```python
if has_ticket:
    if age < 16:
        print("Child entry")
    else:
        print("Adult entry")
else:
    print("Buy a ticket first")
```

Python 3.10+ has `match ... case`, the equivalent of SWITCH/CASE. Exam answers can always use IF/ELIF instead.

### Common mistakes

- Putting conditions in the wrong order in an ELIF chain.
- Using separate IFs where only one branch should run, so two outputs appear.

## Iteration

*Refs: AQA 3.2.2 · OCR 2.2.1 · Edexcel 1.2.1, 6.2.2 · Eduqas 8: Algorithms, C2: Implementation.*

### What you need to know

- Iteration means repeating a block of code.
- Definite (count-controlled) iteration repeats a set number of times: FOR.
- Indefinite (condition-controlled) iteration repeats until or while a condition is met:
  - Condition at the start (WHILE): may run zero times.
  - Condition at the end (REPEAT ... UNTIL, DO ... WHILE): always runs at least once.
- Iterating over every item in a data structure (Edexcel names this separately from repetition): `for item in my_list`.
- Nested iteration: a loop inside a loop. The inner loop runs fully for each pass of the outer loop.
- (Edexcel) Single entry and exit points: a loop or subprogram should be entered at the top and left at one place, not jumped out of from many places, so it is easier to follow and test.

### Explained

Count-controlled:

```python
for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i * 3)
```

`range(a, b)` stops before b. `range(10, 0, -2)` counts 10, 8, 6, 4, 2.

Condition-controlled, test at the start:

```python
password = input("Password: ")
while password != "open sesame":
    password = input("Try again: ")
```

Condition-controlled, test at the end. AQA pseudo-code:

```
REPEAT
    guess ← USERINPUT
UNTIL guess = secret
```

Python has no REPEAT, so it is written as a WHILE that always runs the first time:

```python
while True:
    guess = int(input("Guess: "))
    if guess == secret:
        break
```

(Using `break` makes more than one exit point; Edexcel prefers a flag variable, below.)

```python
correct = False
while not correct:
    guess = int(input("Guess: "))
    correct = (guess == secret)
```

Iterating over a structure:

```python
for name in ["Ana", "Bo", "Cy"]:
    print(name.upper())
```

Nested loops, a times table grid:

```python
for row in range(1, 4):
    line = ""
    for col in range(1, 4):
        line = line + str(row * col) + " "
    print(line)
```

Output:

```
1 2 3
2 4 6
3 6 9
```

### Worked example

Choose the right loop for each task.

1. Print a receipt line for each of the 12 items in a basket: count-controlled (FOR), because the number of repeats is known.
2. Keep asking for a PIN until it is correct: condition-controlled, because the number of attempts is not known.
3. A menu that must be shown at least once and repeats until "Quit" is picked: condition-controlled with the test at the end (REPEAT ... UNTIL).

Trace this code.

```python
total = 0
for k in range(2, 11, 3):
    total = total + k
print(total)
```

| k | total |
| --- | --- |
| | 0 |
| 2 | 2 |
| 5 | 7 |
| 8 | 15 |

`range(2, 11, 3)` gives 2, 5, 8 (11 is excluded). Output 15.

### Common mistakes

- Forgetting to update the variable in a WHILE condition, giving an infinite loop.
- Off-by-one errors: `range(1, 10)` runs 9 times, not 10.
- Saying a WHILE loop "always runs at least once". That is true only of loops tested at the end.

## Reading, writing and refining programs

*Refs: Edexcel 6.1.2, 6.2.1 · Eduqas C2: Implementation · OCR 2.2.1.*

### What you need to know

- Identify the parts of a program: constants, variables, initialisation and assignment statements, command sequences, selection, repetition, iteration, data structures, subprograms, parameters, input and output (Edexcel 6.2.1).
- Read a program and say what it does; extend or refine it to meet new requirements.

### Worked example

Label the structural parts of this program.

```python
MAX_TRIES = 3                          # constant
tries = 0                              # variable, initialisation
ok = False
while tries < MAX_TRIES and not ok:    # repetition (condition-controlled)
    code = input("Code: ")             # input; assignment
    if code == "4719":                 # selection
        ok = True
    tries = tries + 1
print("Unlocked" if ok else "Locked")  # output
```

Refinement: to tell the user how many tries are left, add `print(MAX_TRIES - tries, "tries left")` inside the loop after `tries` is updated.

## Check questions

1. State the most suitable data type for: (a) the number of goals scored, (b) whether a light is on, (c) a car registration, (d) a temperature such as 21.5 °C. [4 marks]
2. Explain why a program might use a constant for the VAT rate rather than typing 0.2 throughout. [2 marks]
3. Give the result of: (a) 23 MOD 4, (b) 23 DIV 4, (c) 2 ^ 5. [3 marks]
4. Explain the difference between a WHILE loop and a REPEAT ... UNTIL loop. [2 marks]
5. Write a Python program that asks for a whole number n and prints the sum of the even numbers from 2 to n inclusive. [4 marks]
6. A ticket costs £8, or £5 for anyone under 12 or 65 and over. Write code that inputs an age and outputs the price. [3 marks]
7. Trace this code and give the output. [3 marks]

```python
x = 1
count = 0
while x < 50:
    x = x * 3
    count = count + 1
print(count, x)
```

8. Explain what is meant by casting and give an example of when it is needed. [2 marks]

## Mark scheme

1. (a) Integer (1). (b) Boolean (1). (c) String (1). (d) Real/float (1).
2. Value only needs changing in one place if the rate changes (1); the name makes the code easier to read / it cannot be changed accidentally while running (1).
3. (a) 3 (1). (b) 5 (1). (c) 32 (1).
4. WHILE checks the condition before each pass, so may run zero times (1); REPEAT ... UNTIL checks after each pass, so always runs at least once (1).
5. Example:

```python
n = int(input("n: "))
total = 0
for k in range(2, n + 1, 2):
    total = total + k
print(total)
```

Input cast to integer (1); total initialised to 0 (1); loop over the even numbers up to and including n (1); add and output total (1). Accept a loop over all numbers with `k % 2 == 0`.
6. Input cast to integer (1); condition `age < 12 or age >= 65` (1); correct output of 5 or 8 (1).
7. x: 3, 9, 27, 81 (1); count 4 (1); output `4 81` (1).
8. Changing a value from one data type to another (1); e.g. converting the string from `input()` to an integer before doing arithmetic (1).
