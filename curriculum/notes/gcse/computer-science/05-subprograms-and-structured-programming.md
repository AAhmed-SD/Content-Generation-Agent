---
level: GCSE
subject: Computer Science
topic: "Subprograms, structured programming, libraries and interfaces"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.2.2", "3.2.10"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.2.3"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.1.2", "6.6.1", "6.6.2", "6.6.3"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["8: Algorithms", "C2: Investigation", "C2: Implementation"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Subprograms, structured programming, libraries and interfaces

This file covers subprograms (subroutines): procedures and functions, parameters and return values, local and global variables and scope, the structured (modular) approach, built-in and library subprograms, and, for Eduqas Component 2, extending objects and libraries and building simple graphical user interfaces in Python.

## Overview

A subprogram is a named block of code that does one job and is run by calling its name. Breaking a program into subprograms is decomposition put into code.

### Board differences

- AQA 8525: 3.2.10, Paper 1. AQA uses the word "subroutine" and "parameter" for both the values passed in and the variables that receive them. AQA pseudo-code: `SUBROUTINE name(params) ... ENDSUBROUTINE`, `RETURN`.
- OCR J277: sub programs within 2.2.3: functions and procedures, local and global variables and constants, passing and returning arrays. OCR ERL: `procedure name(params) ... endprocedure`, `function name(params) ... return x ... endfunction`, `global` for a global variable.
- Edexcel 1CP2: benefits of subprograms (1.1.2, Paper 1); writing them in Python (6.6.1 to 6.6.3, Paper 2), including built-in and library subprograms from the PLS. Edexcel defines a function as returning a value and a procedure as not returning one.
- Eduqas C500QS: subroutines and local and global variables (8: Algorithms); in Component 2, create and extend functions or methods, create and edit objects, extend Python libraries, structure programs into modules with clear interfaces, and build GUIs with Python's built-in library (text boxes, buttons, forms). Eduqas pseudo-code: `Declare SubName ... End Subroutine`, `call SubName`.

## Procedures and functions

*Refs: AQA 3.2.10 · OCR 2.2.3 · Edexcel 6.6.1, 6.6.2 · Eduqas 8: Algorithms.*

### What you need to know

- A subprogram (subroutine) is a named, out-of-line block of code that performs a specific task and can be called from elsewhere in the program.
- A function returns a value to the code that called it.
- A procedure carries out a task but does not return a value.
- Parameters are the variables listed in the subprogram's definition; arguments are the values passed in when it is called. A subprogram may have no parameters or several.
- Built-in subprograms come with the language (`len`, `print`, `int`); library subprograms are imported (`random.randint`, `math.sqrt`); user-devised ones are written by the programmer.

### Explained

```python
def show_banner(title):              # procedure: no return value
    print("=" * len(title))
    print(title)
    print("=" * len(title))

def area_of_circle(r):               # function: returns a value
    return 3.14159 * r * r

show_banner("Results")
a = area_of_circle(2)                # the returned value is stored
print(round(a, 1))                   # 12.6
```

A function call can be used inside an expression, because it stands for a value: `total = area_of_circle(2) + area_of_circle(3)`. A procedure call is a statement on its own.

In Python every subprogram is written with `def`. A "procedure" in Python is just a function with no `return` (it returns `None`).

### Worked example

Write a function `max_of_three(a, b, c)` that returns the largest of three numbers, then call it.

```python
def max_of_three(a, b, c):
    biggest = a
    if b > biggest:
        biggest = b
    if c > biggest:
        biggest = c
    return biggest

print(max_of_three(4, 11, 7))     # 11
```

Passing and returning an array (OCR):

```python
def doubled(values):
    result = []
    for v in values:
        result.append(v * 2)
    return result

print(doubled([1, 5, 9]))         # [2, 10, 18]
```

### Common mistakes

- Printing inside a function instead of returning, when the question asks for a returned value.
- Calling a function and ignoring the result: `area_of_circle(2)` on its own line does nothing useful.
- Mismatching the number or order of arguments and parameters.

## Local and global variables; scope

*Refs: AQA 3.2.10 · OCR 2.2.3 · Edexcel 6.6.3 · Eduqas 8: Algorithms.*

### What you need to know

- Scope is the part of a program where a variable can be used.
- A local variable is declared inside a subprogram and exists only while that subprogram runs. It can only be used inside it.
- A global variable is declared in the main program and can be used anywhere, including inside subprograms.
- Why local variables are good practice: a subprogram cannot accidentally change data elsewhere; the same name can be reused in different subprograms; memory is freed when the subprogram ends; subprograms are self-contained, so they are easier to test and reuse.
- Global variables are sometimes useful for values the whole program needs (often better as global constants), but make programs harder to debug.

### Explained

```python
count = 0                       # global

def add_one():
    global count                # needed in Python to change a global
    count = count + 1

def square(n):
    result = n * n              # local: only exists inside square
    return result

add_one()
print(count)                    # 1
print(square(4))                # 16
# print(result) here would cause an error: result is not defined outside square
```

### Common mistakes

- Defining local as "a variable used in a loop". It is about subprograms.
- Saying global variables are always bad. The mark is for explaining the risk: any part of the program can change them.

## Structured programming and the benefits of subprograms

*Refs: AQA 3.2.10 · OCR 2.2.3 · Edexcel 1.1.2 · Eduqas C2: Investigation, C2: Implementation.*

### What you need to know

- The structured approach: design a program as modules (subprograms), each with a clear, documented interface (name, parameters, return value) and using local variables.
- Benefits of subprograms:
  - Code is written once and called many times, so programs are shorter.
  - Each subprogram can be tested on its own.
  - Easier to read and maintain; a fix in one place fixes every call.
  - Work can be split across a team.
  - Subprograms can be reused in other programs (libraries).
- Edexcel and AQA: single entry and exit, and clear interfaces, so a module can be used without reading its code.

### Explained

An interface is like a socket: you only need to know what to plug in and what comes out. The comment (docstring) below documents the interface:

```python
def vat_inclusive(price, rate):
    """Return price with VAT added. price and rate are reals; rate 0.2 means 20%."""
    return price * (1 + rate)
```

### Common mistakes

- Listing "it is faster" as a benefit. Subprograms make programs easier to write, test and maintain, not faster to run.

## Objects, libraries and graphical interfaces (Eduqas Component 2)

*Refs: Eduqas C2: Implementation.*

### What you need to know

- Create and extend functions or methods; create and edit objects; create and extend Python libraries (your own modules).
- Create and modify a simple GUI using Python's built-in library (tkinter): text boxes, buttons and forms.

### Explained

A class defines a type of object with attributes (data) and methods (subprograms that belong to it).

```python
class Member:
    def __init__(self, name, fees_due):
        self.name = name
        self.fees_due = fees_due

    def pay(self, amount):
        self.fees_due = self.fees_due - amount

m = Member("Leo", 30.0)
m.pay(10.0)
print(m.name, m.fees_due)     # Leo 20.0
```

Your own library is a `.py` file of subprograms. If `tools.py` contains `def vat_inclusive(...)`, another file can use `import tools` then `tools.vat_inclusive(10, 0.2)`.

A tkinter form with a text box and a button:

```python
import tkinter as tk

def greet():
    name = entry.get()
    label.config(text="Hello " + name)

window = tk.Tk()
window.title("Greeter")
entry = tk.Entry(window)          # text box
entry.pack()
button = tk.Button(window, text="Greet", command=greet)
button.pack()
label = tk.Label(window, text="")
label.pack()
window.mainloop()
```

`command=greet` passes the function itself (no brackets), so it runs when the button is clicked.

### Common mistakes

- Writing `command=greet()`, which runs the function once at start-up instead of on each click.
- Forgetting `mainloop()`, so the window closes straight away.

## Check questions

1. Explain the difference between a function and a procedure. [2 marks]
2. Give three benefits of using subprograms. [3 marks]
3. Explain what is meant by a local variable and why using local variables is good practice. [3 marks]
4. Write a Python function `is_even(n)` that returns True if n is even and False otherwise. [2 marks]
5. Write a function `count_above(values, limit)` that returns how many items in the list `values` are greater than `limit`. [4 marks]
6. Identify the parameters, the local variables and the return value in this code. [3 marks]

```python
def mean(a, b):
    s = a + b
    m = s / 2
    return m
```

7. Explain why the output of this code is 5 and not 6. [2 marks]

```python
x = 5
def change():
    x = 6
change()
print(x)
```

## Mark scheme

1. A function returns a value to the calling code (1); a procedure performs a task but does not return a value (1).
2. Any three: avoids repeating code / shorter programs (1); each part can be tested separately (1); easier to read and maintain (1); can be shared across a team (1); can be reused in other programs (1); changes made in one place (1).
3. A variable declared inside a subprogram that can only be used (has scope) within it (1). Any two: cannot be changed by other parts of the program accidentally (1); same name can be reused elsewhere (1); memory is freed when the subprogram ends (1); makes the subprogram self-contained/easier to test and reuse (1).
4. `def is_even(n): return n % 2 == 0` — MOD 2 test (1); returns a Boolean (1).
5. Example:

```python
def count_above(values, limit):
    count = 0
    for v in values:
        if v > limit:
            count = count + 1
    return count
```

Counter initialised (1); loop over the list (1); correct comparison and increment (1); return count (1).
6. Parameters a and b (1); local variables s and m (1); returns m, the mean (1).
7. Inside `change`, `x = 6` creates a new local variable x (1); the global x is not changed, so 5 is printed (1).
