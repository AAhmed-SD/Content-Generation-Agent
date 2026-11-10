---
level: A-level
subject: Computer Science
topic: "Programming fundamentals: data types, operations, strings, exceptions and subroutines"
as_content: "All of this file is AS content for AQA (7516 sections 3.1.1.1 to 3.1.1.14). OCR AS H046 covers the same ideas in its 1.2.3 and 2.2.1."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.1.1.1", "4.1.1.2", "4.1.1.3", "4.1.1.4", "4.1.1.5", "4.1.1.6", "4.1.1.7", "4.1.1.8", "4.1.1.9", "4.1.1.10", "4.1.1.11", "4.1.1.12", "4.1.1.13", "4.1.1.14"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.1(a)", "2.2.1(a)", "2.2.1(c)", "2.2.1(d)", "2.2.1(e)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Variables and constants", "C1.3: Identifiers", "C1.3: Scope of variables", "C1.3: Parameters", "C1.3: Mathematical operations", "C1.3: Programming constructs", "C1.3: Modular programming", "C1.3: Logical operations in algorithms and programs", "C2.3: Data types"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Programming fundamentals

This file covers data types, the statement types every imperative program is built from, arithmetic, relational and Boolean operators, constants, string handling, random numbers, exception handling, and subroutines with parameters, return values, and local and global variables.

GCSE covered most of the basics. Revise these first if they feel shaky:

- [GCSE: Programming fundamentals](../../gcse/computer-science/03-programming-fundamentals.md) (data types, variables, selection, iteration, operators)
- [GCSE: Data structures, strings and files](../../gcse/computer-science/04-data-structures-strings-and-files.md)
- [GCSE: Subprograms and structured programming](../../gcse/computer-science/05-subprograms-and-structured-programming.md)
- [GCSE: Robust programs and testing](../../gcse/computer-science/06-robust-programs-and-testing.md)

This file goes further: pointer and user-defined types, condition-at-end loops, truncation versus rounding, XOR, exception handling, interfaces, parameter passing by value and by reference, and scope and lifetime.

Code is in Python 3. AQA's Paper 1 is on screen in the language your school chose (C#, Java, Python or VB.NET); OCR and Eduqas papers are written, and accept any sensible pseudo-code or high-level language unless a question says otherwise.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Data types | Integer, real, Boolean, char, string, date/time, pointer, records, arrays, user-defined | Primitive types: integer, real, character, string, Boolean (1.4.1(a)) | Boolean, character, string, integer, real, and their storage needs (C2.3) |
| Parameters | Use parameters and interfaces | By value and by reference (2.2.1(c)) | Call by value and call by reference (C1.3) |
| Exceptions | Named (4.1.1.9) | Not named | Not named (validation is in C1.3) |
| IDE | Not named here | Use an IDE to develop and debug (2.2.1(e)) | IDE tools (C1.7, see file 33) |
| Counts and rogue values | Not named | Not named | Named (C1.3 Programming constructs) |
| Paper | Paper 1 (on screen, with skeleton program) | Paper 02 (written) | Component 1 (written) |

## 4.1.1.1 Data types

*Refs: AQA 4.1.1.1 · OCR 1.4.1(a) · Eduqas C2.3: Data types.*

### What you need to know

- A data type says what values a piece of data can take and what operations make sense on it. It also fixes how much memory it uses and how its bits are read.
- Built-in types you must know: integer, real/float, Boolean, character, string, date/time, pointer/reference, records (or equivalent) and arrays (or equivalent).
- A pointer (reference) type holds a memory address, usually of an object created while the program runs (dynamically). Python hides pointers, but every Python variable is in fact a reference to an object.
- A user-defined type is built from built-in types, for example a record type `Student` with a string name and an integer mark, or an enumerated type `Suit`.
- Eduqas: know typical storage sizes. A Boolean needs 1 bit in theory (often 1 byte in practice); a character 1 byte (ASCII) or 1 to 4 bytes (UTF-8 Unicode); an integer often 2, 4 or 8 bytes; a real often 4 bytes (single) or 8 bytes (double); a string one character's size per character plus a length or terminator.

### Explained

Choosing the right type matters for three reasons. It stops nonsense operations (you cannot multiply a name). It controls memory: storing a yes/no answer as a Boolean is far cheaper than as a string. It controls accuracy: money stored as a float can pick up tiny rounding errors, so many systems store pence as an integer instead.

A date/time type stores a moment so that you can compare dates and do arithmetic on them (days between two dates) without parsing text every time.

A user-defined type lets the code speak the language of the problem. Compare `marks[3][1]` with `students[3].mark`: the second says what it means.

```python
from dataclasses import dataclass
from datetime import date
from enum import Enum

class Suit(Enum):            # user-defined enumerated type
    HEARTS = 1
    SPADES = 2

@dataclass
class Student:               # user-defined record type
    name: str                # built-in string
    mark: int                # built-in integer
    joined: date             # built-in date/time

s = Student("Ali", 72, date(2025, 9, 4))
t = s                        # t is a second reference to the SAME object
t.mark = 80
print(s.mark)                # 80, because s and t point to one object
```

### Common mistakes

- Saying a pointer "stores the data". It stores the address where the data is.
- Storing phone numbers as integers. They are identifiers, not quantities: a leading zero is lost and arithmetic on them is meaningless. Use a string.
- Forgetting that a Boolean only needs one bit when asked for minimum storage.

## 4.1.1.2 Programming concepts

*Refs: AQA 4.1.1.2 · OCR 2.2.1(a) · Eduqas C1.3: Programming constructs, Identifiers.*

### What you need to know

- Statement types: variable declaration, constant declaration, assignment, iteration, selection, and subroutine (procedure or function) calls.
- The three combining principles of every imperative language: sequence, selection (choice, branching) and iteration (repetition).
- Definite iteration: the number of repetitions is known when the loop starts (a `for` loop over a range).
- Indefinite iteration: the loop repeats until a condition changes. The condition can be tested at the start (a `while` loop, which may run zero times) or at the end (`repeat ... until` or `do ... while`, which always runs at least once). You need to understand both, even if your language only has one.
- Nesting: a selection or iteration inside another one.
- Meaningful identifier names make code self-documenting: easier to read, debug and maintain, especially by someone else.
- Eduqas: a count (counter) is a variable increased by 1 each time something happens; a rogue value (sentinel) is a special input such as −1 that is not real data and signals the end of input. Self-documenting identifiers, annotation (comments) and layout (indentation, white space) all help.

### Explained

Python has no condition-at-end loop, so you build one with `while True` and a `break` at the bottom. The loop body always runs once before the test.

```python
# Condition at the start: may run zero times
total = 0
n = int(input("Number (-1 to stop): "))
while n != -1:              # -1 is a rogue value
    total += n
    n = int(input("Number (-1 to stop): "))

# Condition at the end: always runs at least once (repeat ... until valid)
while True:
    choice = input("Menu choice 1-3: ")
    if choice in ("1", "2", "3"):
        break

# Definite iteration, nested
for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end=" ")
    print()
```

### Worked example

Trace this pseudo-code with input 3, 8, 0. State the output.

```
count ← 0
total ← 0
REPEAT
    x ← USERINPUT
    IF x > 0 THEN
        count ← count + 1
        total ← total + x
    ENDIF
UNTIL x = 0
OUTPUT total / count
```

| x | x > 0? | count | total | x = 0? |
| --- | --- | --- | --- | --- |
| 3 | True | 1 | 3 | False |
| 8 | True | 2 | 11 | False |
| 0 | False | 2 | 11 | True |

Output: 11 / 2 = 5.5. If the first input were 0, count would stay 0 and the program would crash dividing by zero. A good answer spots that.

### Common mistakes

- Saying a `while` loop always runs at least once. Only a condition-at-end loop does.
- Using a `for` loop when the number of repeats is not known in advance (for example reading input until a rogue value).
- Calling single letters like `x` meaningful. Loop counters `i` and `j` are accepted by convention; anything else should say what it holds.

## 4.1.1.3 Arithmetic operations

*Refs: AQA 4.1.1.3 · OCR 2.2.1(a) · Eduqas C1.3: Mathematical operations.*

### What you need to know

- Addition, subtraction, multiplication, real (float) division, integer division with remainder (DIV and MOD), exponentiation, rounding and truncation.
- Truncation removes the fractional part (toward zero): 7.9 → 7, −7.9 → −7.
- Rounding goes to the nearest value: 7.5 → 8 normally. Be aware that Python's `round` uses banker's rounding (to the nearest even number on an exact half): `round(2.5)` is 2.

| Operation | Pseudo-code | Python | 17 and 5 |
| --- | --- | --- | --- |
| Real division | / | / | 3.4 |
| Integer division | DIV | // | 3 |
| Remainder | MOD | % | 2 |
| Exponent | ^ | ** | 1419857 |
| Truncate | | int(x), math.trunc(x) | int(3.4) = 3 |

### Worked example

Convert 200 seconds to minutes and seconds: 200 DIV 60 = 3; 200 MOD 60 = 20. Answer 3 min 20 s.

Is year 2024 a leap year? `year MOD 4 = 0 AND (year MOD 100 ≠ 0 OR year MOD 400 = 0)`: 2024 MOD 4 = 0, 2024 MOD 100 = 24 ≠ 0, so True. 1900: MOD 4 = 0 but MOD 100 = 0 and MOD 400 = 300, so False.

Extract digits of 4729: units = 4729 MOD 10 = 9; then 4729 DIV 10 = 472; repeat.

### Common mistakes

- Python's `//` and `%` round toward minus infinity for negatives: `-7 // 2` is −4, not −3, and `-7 % 2` is 1. Many other languages truncate toward zero. Say which language you mean.
- Confusing truncation with rounding: truncating 2.99 gives 2.

## 4.1.1.4 Relational operations

*Refs: AQA 4.1.1.4 · OCR 2.2.1(a).*

### What you need to know

- Equal to (= in pseudo-code, == in Python), not equal to (≠ or <>, != in Python), less than, greater than, less than or equal to, greater than or equal to.
- A relational operation always gives a Boolean.
- Strings compare character by character by character code, so "Zebra" < "apple" is True in ASCII because 'Z' (90) < 'a' (97).

### Common mistakes

- Using = (assignment in Python) for comparison.
- Off-by-one errors from < instead of <= in loop conditions. Trace the boundary value.
- Comparing floats for exact equality: `0.1 + 0.2 == 0.3` is False in Python. Compare with a small tolerance instead.

## 4.1.1.5 Boolean operations

*Refs: AQA 4.1.1.5 · OCR 2.2.1(a) · Eduqas C1.3: Logical operations in algorithms and programs.*

### What you need to know

- NOT, AND, OR and XOR (exclusive or: true when exactly one input is true). Eduqas also names NAND (NOT AND) and NOR (NOT OR) in programs.
- Precedence in most languages: NOT first, then AND, then OR. Use brackets to make meaning clear.
- Many languages short-circuit: in `A AND B`, B is not evaluated if A is false; in `A OR B`, B is not evaluated if A is true.

### Explained

Python has no logical XOR keyword, but for Booleans `a != b` is XOR, and `^` is bitwise XOR on integers.

```python
def valid_login(user_ok, pass_ok, locked):
    return user_ok and pass_ok and not locked

i = 10
data = [1, 2, 3]
if i < len(data) and data[i] > 0:   # short-circuit stops the index error
    print("positive")

a, b = True, False
print(a != b)          # XOR → True
print(not (a and b))   # NAND → True
print(not (a or b))    # NOR → False
```

Truth tables for gates are in [22-logic-gates-and-boolean-algebra.md](22-logic-gates-and-boolean-algebra.md).

### Common mistakes

- Writing `if x == 1 or 2:`. This is always true because `2` alone is truthy. Write `x == 1 or x == 2`.
- Swapping the order of a short-circuit test (`data[i] > 0 and i < len(data)`) so the unsafe check runs first.

## 4.1.1.6 Constants and variables

*Refs: AQA 4.1.1.6 · Eduqas C1.3: Variables and constants.*

### What you need to know

- A variable is a named store whose value can change while the program runs. A constant is a named value that cannot change while the program runs.
- Advantages of named constants: one change in one place updates every use; the name explains the value (`VAT_RATE` not `0.2`); the compiler or interpreter can stop accidental changes; some compilers can substitute the value and save memory.

### Explained

Python has no true constants. The convention is capital letters, and tools (and readers) treat them as fixed. In C# you would write `const double VatRate = 0.2;` and changing it is a compile-time error.

### Common mistakes

- Saying a constant "can never be changed". The programmer can edit its value in the source code; it is the running program that cannot change it.

## 4.1.1.7 String-handling operations

*Refs: AQA 4.1.1.7 · OCR 2.2.1(a).*

### What you need to know

- Length, position (index of a character or substring), substring, concatenation, character to character code, character code to character.
- Conversions: string ↔ integer, string ↔ float, and date/time ↔ string.
- Strings are usually indexed from 0. Python strings are immutable: you build a new string rather than change one in place.

| Operation | Python | Result for s = "Computer" |
| --- | --- | --- |
| Length | len(s) | 8 |
| Position | s.index("p") | 3 |
| Substring | s[3:6] | "put" (index 3 up to but not including 6) |
| Concatenation | s + "s" | "Computers" |
| Char → code | ord("C") | 67 |
| Code → char | chr(67) | "C" |
| String → int / float | int("42"), float("4.5") | 42, 4.5 |
| Int / float → string | str(42) | "42" |
| String ↔ date | datetime.strptime("04/09/2025", "%d/%m/%Y"), d.strftime("%d/%m/%Y") | date object, "04/09/2025" |

### Worked example

Write a function that applies a shift of 3 to capital letters (a Caesar shift), using character codes.

```python
def shift(text, k):
    out = ""
    for ch in text:
        if "A" <= ch <= "Z":
            code = (ord(ch) - 65 + k) % 26 + 65   # 65 is the code for "A"
            out += chr(code)
        else:
            out += ch
    return out

print(shift("XYZ", 3))   # ABC: X is 88 → (23+3) mod 26 = 0 → 65 "A"
```

### Common mistakes

- Mixing up AQA pseudo-code `SUBSTRING(start, end, s)`, which includes the end index, with Python slicing, which excludes it. Read the question's definition.
- Concatenating a number and a string without converting: `"Score: " + 5` is an error in Python.

## 4.1.1.8 Random number generation

*Refs: AQA 4.1.1.8.*

### What you need to know

- Languages provide pseudo-random number generators (PRNGs). They produce a sequence that looks random from a starting seed; the same seed gives the same sequence.
- Typical uses: games, simulations, sampling, generating test data, shuffling.

```python
import random
random.seed(1)                 # repeatable, useful for testing
die = random.randint(1, 6)     # integer from 1 to 6 inclusive
p = random.random()            # float with 0 <= p < 1
card = random.choice(["H", "D", "C", "S"])
```

### Common mistakes

- Python's `randint(1, 6)` includes 6, but `randrange(1, 6)` does not. Check the bounds of the function you use.
- Calling PRNG output truly random. It is deterministic; for security (keys, tokens) use a cryptographically secure generator (Python's `secrets` module).

## 4.1.1.9 Exception handling

*Refs: AQA 4.1.1.9.*

### What you need to know

- An exception is an error or unexpected event that happens while a program is running (a run-time error), such as dividing by zero, a missing file or input of the wrong type.
- Exception handling means catching the exception and running code that deals with it, instead of letting the program crash.
- Structure: try (the code that might fail), catch/except (what to do for each type of error), and optionally finally (code that always runs, such as closing a file).
- When an exception is raised, normal execution stops, the current state is saved, and control jumps to the handler. If the subroutine has no handler, the exception passes back up to the caller, and so on up the call stack.

```python
def read_mark():
    while True:
        try:
            mark = int(input("Mark 0-100: "))
            if not 0 <= mark <= 100:
                raise ValueError("out of range")
            return mark
        except ValueError:
            print("Enter a whole number from 0 to 100.")

try:
    f = open("marks.txt")
    data = f.read()
except FileNotFoundError:
    data = ""
finally:
    print("Done trying to read")
```

### Common mistakes

- Catching every exception with a bare `except:` and doing nothing. The error is hidden, which makes bugs harder to find.
- Confusing exception handling with validation. Validation checks data before use; exception handling deals with failures when they happen. Robust programs use both.

## 4.1.1.10 Subroutines

*Refs: AQA 4.1.1.10 · OCR 2.2.1(d) · Eduqas C1.3: Modular programming.*

### What you need to know

- A subroutine is a named "out of line" block of code that runs (is called) when its name is written in a statement. Control passes to it and returns to the statement after the call.
- A function returns a value; a procedure does not (though AQA treats both as subroutines).
- Advantages: code is written once and reused; programs are split into small parts that are easier to write, test, debug and read; different programmers can write different subroutines; changes are made in one place; subroutines can go into a library for other programs.
- Eduqas: standard (built-in) functions such as `len` and `abs`, standard modules (libraries such as `math`), and user-defined subprograms. Library code is already tested and saves time, but you may not know exactly how it works, and it may be larger than you need.

### Common mistakes

- Answering "makes the program shorter" alone. Examiners want the reason: no repeated code, so changes and testing happen once.

## 4.1.1.11 Parameters of subroutines

*Refs: AQA 4.1.1.11 · OCR 2.2.1(d) · Eduqas C1.3: Parameters.*

### What you need to know

- A parameter is a variable named in the subroutine definition that receives a value when it is called. The value passed in the call is the argument.
- A subroutine's interface is its name, its parameters (number, order and types) and its return type. Callers only need the interface, not the code inside.
- By value: a copy of the argument is passed. Changes inside the subroutine do not affect the caller's variable. Safer; uses extra memory for large data.
- By reference: the address of the argument is passed. Changes inside the subroutine change the caller's variable. Saves memory and time for large structures, and lets a subroutine send back more than one result, but causes side effects that are hard to trace.

### Explained

Python passes object references by value ("pass by object reference"). If the subroutine reassigns the parameter, the caller is not affected (like by value). If it changes a mutable object such as a list in place, the caller sees the change (like by reference).

```python
def add_one(n):          # behaves like by value
    n = n + 1
    return n

def add_item(items):     # behaves like by reference for a mutable list
    items.append(99)

x = 5
add_one(x)
print(x)                 # 5

lst = [1, 2]
add_item(lst)
print(lst)               # [1, 2, 99]
```

### Worked example

Pseudo-code with explicit passing (OCR style):

```
procedure swap(byRef a, byRef b)
    temp = a
    a = b
    b = temp
endprocedure

x = 3
y = 7
swap(x, y)
print(x, y)
```

Output: 7 3. If both parameters were `byVal`, the swap would happen only to the copies and the output would be 3 7.

### Common mistakes

- Using "parameter" and "argument" as if they were the same in a definition question. The parameter is in the definition; the argument is the value in the call.
- Saying by reference "copies the variable". It passes its address.

## 4.1.1.12 Returning values from a subroutine

*Refs: AQA 4.1.1.12 · OCR 2.2.1(d).*

### What you need to know

- A function sends a value back to the caller with `return`; the call then stands for that value in an expression.
- Many languages return one value; to return several, return a record, array or tuple, or use by-reference parameters.

```python
def min_max(values):
    lo = hi = values[0]
    for v in values[1:]:
        lo = min(lo, v)
        hi = max(hi, v)
    return lo, hi          # a tuple holding two values

smallest, largest = min_max([4, 9, 1, 7])
```

### Common mistakes

- Printing inside a function instead of returning the value, so the caller cannot use it.

## 4.1.1.13 Local variables in subroutines

*Refs: AQA 4.1.1.13 · OCR 2.2.1(c) · Eduqas C1.3: Scope of variables.*

### What you need to know

- A local variable is declared inside a subroutine. It exists only while the subroutine runs (its lifetime) and can be used only inside it (its scope).
- Good practice because: subroutines are self-contained and reusable; the same name can be used in different subroutines without clashes; memory is freed when the subroutine ends; there are no hidden side effects on the rest of the program; subroutines can be tested on their own.

## 4.1.1.14 Global variables

*Refs: AQA 4.1.1.14 · OCR 2.2.1(c) · Eduqas C1.3: Scope of variables.*

### What you need to know

- A global variable is declared in the main program, outside any subroutine. Its scope is the whole program and its lifetime is the whole run.
- Contrast: globals are easy to share but any part of the program can change them, so errors are hard to trace; they use memory for the whole run; they make subroutines depend on the rest of the program. If a local and a global share a name, the local hides (shadows) the global inside that subroutine.
- Sensible uses: values that genuinely belong to the whole program and rarely change, such as settings (often better as constants).

```python
count = 0                  # global

def bump():
    global count           # Python needs this to assign to the global
    count += 1

def shadow():
    count = 100            # a new local, hides the global
    return count

bump()
print(shadow(), count)     # 100 1
```

### Worked example

State the output and the scope of each `n`.

```python
n = 5
def f(n):
    n = n * 2
    return n
print(f(n) + n)
```

Inside `f`, `n` is a parameter, so it is local to `f`. `f(5)` returns 10; the global `n` is still 5. Output: 15.

### Common mistakes

- Saying a local variable "keeps its value between calls". It is created afresh on each call (unless declared static, which is a separate idea).

## Check questions

1. State the difference between definite and indefinite iteration, and explain when a condition-at-end loop must be used. [3 marks]
2. Evaluate: (a) 29 DIV 4, (b) 29 MOD 4, (c) truncate(−3.7), (d) 2 ^ 10. [4 marks]
3. Explain two advantages of using a named constant for a tax rate. [2 marks]
4. A program reads integers until the user types −1, then outputs how many numbers were greater than 50. Write it in Python or pseudo-code. Use a rogue value. [5 marks]
5. Using character codes, write a function `upper_first(word)` that returns the word with its first letter capitalised if it is a lower-case letter a–z. Do not use built-in case conversion. [4 marks]
6. Explain the difference between passing a parameter by value and by reference, giving one advantage of each. [4 marks]
7. Explain why a programmer should use local rather than global variables. [3 marks]
8. A user types "twelve" when a program expects an integer. Describe how exception handling could stop the program crashing. [3 marks]
9. State the output of this code and explain it. [3 marks]

```python
total = 1
def g(total):
    total = total + 10
    return total * 2
x = g(total)
print(x, total)
```

10. Give the minimum storage in bits for: a Boolean; an ASCII character; a string of 12 ASCII characters (ignore any length field). [3 marks]

## Mark scheme

1. Definite: number of repeats known before the loop starts (1). Indefinite: repeats until a condition is met (1). Condition-at-end loop when the body must run at least once, e.g. asking for input before it can be validated (1).
2. (a) 7 (1); (b) 1 (1); (c) −3 (1); (d) 1024 (1).
3. Any two: change the value in one place only (1); the name makes the code easier to read/understand (1); the value cannot be changed accidentally while the program runs (1).
4. Example:

```python
count = 0
n = int(input())
while n != -1:
    if n > 50:
        count = count + 1
    n = int(input())
print(count)
```

Counter initialised to 0 (1); first input before the loop (1); loop ends on −1 and −1 is not counted (1); correct condition and increment (1); output after the loop (1). Accept a condition-at-end loop that skips counting −1.

5. Example:

```python
def upper_first(word):
    if word == "":
        return word
    c = word[0]
    if "a" <= c <= "z":
        c = chr(ord(c) - 32)
    return c + word[1:]
```

Takes first character (1); tests it is in a–z (1); uses ord/chr with offset 32 (1); joins the rest of the word and returns (1).
6. By value: a copy of the value is passed so changes inside do not affect the original (1); advantage: no side effects/original data protected (1). By reference: the address/location is passed so changes affect the original (1); advantage: no copy needed so saves memory/time for large structures, or allows more than one result back (1).
7. Any three: local variables exist only while the subroutine runs so free memory (1); cannot be changed accidentally by other parts of the program (1); same identifier can be reused in different subroutines (1); subroutine is self-contained so easier to test/reuse (1).
8. Put the conversion inside a try block (1); a ValueError/exception is raised when the conversion fails and control passes to the except/catch block (1); handler shows a message and asks again/sets a default, so the program continues (1).
9. Output: 22 1 (1). The parameter `total` is local to `g`; g returns (1 + 10) × 2 = 22 (1); the global `total` is unchanged, still 1 (1).
10. Boolean 1 bit (1); ASCII character 7 bits (accept 8 bits/1 byte if extended ASCII stated) (1); 12 characters: 84 bits (accept 96 bits/12 bytes for 8-bit) (1).
