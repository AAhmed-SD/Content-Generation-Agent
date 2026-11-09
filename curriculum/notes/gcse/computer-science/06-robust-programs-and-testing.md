---
level: GCSE
subject: Computer Science
topic: "Robust programs, validation, authentication, errors and testing"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.2.11"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.3.1", "2.3.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.2.5", "6.1.4", "6.1.5", "6.1.6", "6.4.3", "6.4.4"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["8: Validation and verification", "10: Translators", "C2: Design", "C2: Implementation", "C2: Testing", "C2: Refinement"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Robust programs, validation, authentication, errors and testing

This file covers defensive design (anticipating misuse), input validation and verification, simple authentication, maintainable code (naming, indentation, comments, white space, subprograms), types of program error, test data and test plans, iterative and final testing, and refining a program against its requirements.

## Overview

A robust program keeps working correctly whatever the user types, and is easy for another programmer to understand and change. You make it robust by checking inputs, writing clear code and testing it with carefully chosen data.

### Board differences

- AQA 8525: 3.2.11. Validation is limited to minimum length, empty string and range checks. Authentication is a username and password check in plain text (no encryption). Test data is normal, boundary and erroneous; AQA's boundary data includes the values just either side of the limits (for 1 to 10: 0, 1, 10, 11). Errors: syntax and logic only.
- OCR J277: 2.3.1 and 2.3.2. Defensive design (anticipating misuse, authentication, input validation, maintainability: sub programs, naming conventions, indentation, commenting). Testing: iterative and final/terminal. Test data: normal, boundary, invalid (right type, should be rejected) and erroneous (wrong type, should be rejected). OCR boundary data is "on the very edge of being valid". Errors: syntax and logic.
- Edexcel 1CP2: errors syntax, logic and run-time (1.2.5, 6.1.5); readability techniques (6.1.4); validation length, presence, range and pattern checks (6.4.3); authentication by ID and password and lookup (6.4.4); evaluating fitness for purpose and efficiency with test data (6.1.6).
- Eduqas C500QS: validation and verification (8). Errors: logical, syntactical, run-time/execution, linking, rounding and truncation (10). Component 2: designing validation, verification and authentication routines in pseudo-code; test data named typical, extreme and erroneous; test strategy and plans; refinement and evaluation.

## Defensive design and anticipating misuse

*Refs: OCR 2.3.1 · AQA 3.2.11 · Eduqas C2: Design.*

### What you need to know

- Defensive design means planning for things going wrong: users entering unexpected data (by mistake or on purpose), files missing, divisions by zero.
- Anticipate misuse: think of every likely input, including blank, too long, wrong type and out-of-range, and decide how the program handles each.
- Methods: input validation, authentication, limiting access, and writing maintainable code.

### Explained

```python
while True:
    text = input("How many tickets (1-6)? ")
    if text.isdigit() and 1 <= int(text) <= 6:
        tickets = int(text)
        break
    print("Please enter a whole number from 1 to 6.")
```

The program refuses to move on until the input is valid, and tells the user what is wrong. `isdigit()` stops a crash when letters are typed.

## Validation and verification

*Refs: AQA 3.2.11 · OCR 2.3.1 · Edexcel 6.4.3 · Eduqas 8: Validation and verification.*

### What you need to know

- Validation: an automatic check by the program that input is sensible and follows rules. It cannot check the data is correct, only that it is reasonable.
- Validation checks:
  - Presence check: something has been entered (not an empty string).
  - Length check: the number of characters is within limits (for example, a password at least 8 characters).
  - Range check: a value is between a lower and an upper limit.
  - Type check: the data is the right type (for example, digits only).
  - Format/pattern check: the data matches a pattern (for example, two letters then six digits).
  - Lookup check: the value is in a list of allowed values.
- Verification: checking that data has been entered or copied accurately. Methods: double entry (type it twice and compare, as with a new password) and visual check (the user reads it back on screen).

### Explained

```python
def valid_username(name):
    if name == "":                       # presence
        return False
    if len(name) < 3 or len(name) > 12:  # length
        return False
    return name.isalnum()                # pattern: letters and digits only

def valid_postcode_start(code):
    # pattern: two letters followed by one digit, e.g. "SW1"
    return len(code) == 3 and code[0:2].isalpha() and code[2].isdigit()

email1 = input("Email: ")
email2 = input("Confirm email: ")
if email1 != email2:                     # verification by double entry
    print("The emails do not match.")
```

A date of birth of 03/04/2011 entered instead of 04/03/2011 passes validation but is wrong. Only verification (or the user) can catch it.

### Common mistakes

- Saying validation makes sure data is correct. It only checks that it is reasonable.
- Confusing a length check (number of characters) with a range check (size of a value).

## Authentication

*Refs: AQA 3.2.11 · OCR 2.3.1 · Edexcel 6.4.4 · Eduqas C2: Design, C2: Implementation.*

### What you need to know

- Authentication confirms the identity of a user, usually by a username (ID) and password.
- A lookup checks the entered ID and password against stored records.
- Good routines limit the number of attempts and do not reveal which part was wrong.
- AQA routines use plain-text passwords. Real systems store hashed passwords; this is not required at GCSE.

### Worked example

```python
users = {"jsmith": "Larch!77", "akhan": "river42Q"}

attempts = 0
logged_in = False
while attempts < 3 and not logged_in:
    uid = input("User ID: ")
    pwd = input("Password: ")
    if uid in users and users[uid] == pwd:
        logged_in = True
    else:
        attempts = attempts + 1
        print("Incorrect ID or password.")

if logged_in:
    print("Welcome", uid)
else:
    print("Account locked.")
```

The same lookup with two parallel arrays, as AQA or Eduqas pseudo-code might set it out:

```python
ids = ["jsmith", "akhan"]
pwds = ["Larch!77", "river42Q"]

def check(uid, pwd):
    for k in range(len(ids)):
        if ids[k] == uid and pwds[k] == pwd:
            return True
    return False
```

### Common mistakes

- Checking that the ID exists and that the password exists anywhere in the list, rather than that they match each other.
- Giving unlimited attempts, which allows brute-force guessing.

## Maintainability and readability

*Refs: OCR 2.3.1 · Edexcel 6.1.4 · AQA 3.2.2 · Eduqas C2: Implementation.*

### What you need to know

- Maintainable code is easy for another programmer to understand, fix and extend.
- Techniques: meaningful identifiers (self-documenting names); comments explaining purpose; indentation showing the structure of loops and selections; white space and consistent layout; subprograms; constants for fixed values.
- Eduqas: annotate code so a competent third party can follow it; use a consistent style.

### Explained

Hard to maintain:

```python
def f(a):
    b=0
    for c in a:b=b+c
    return b/len(a)
```

Easier to maintain:

```python
def mean_score(scores):
    """Return the mean of a non-empty list of scores."""
    total = 0
    for score in scores:
        total = total + score
    return total / len(scores)
```

## Types of error

*Refs: AQA 3.2.11 · OCR 2.3.2 · Edexcel 1.2.5, 6.1.5 · Eduqas 10: Translators.*

### What you need to know

- Syntax error: the code breaks the grammar rules of the language, so it cannot be translated or run. Example: a missing colon or bracket, or a misspelt keyword.
- Logic error: the program runs but gives the wrong result. Example: using `<` instead of `<=`.
- Run-time (execution) error: the program crashes while running. Examples: dividing by zero, an index out of range, converting "abc" to an integer.
- (Eduqas) Linking error: the linker cannot find a library or subprogram that the code calls.
- (Eduqas) Rounding error: a value is rounded so it loses accuracy, for example storing 2.675 to two places as 2.68 then using it in further sums.
- (Eduqas) Truncation error: digits are cut off rather than rounded, for example 7.9 stored as the integer 7.

### Worked example

Find and classify the errors. The function should return the mean of a list.

```python
def average(nums)
    total = 0
    for n in nums:
        total = total + n
    return total / len(nums) - 1
```

1. Line 1: missing colon after `average(nums)`: syntax error. Fix: `def average(nums):`.
2. Line 5: subtracts 1 from the mean: logic error. Fix: `return total / len(nums)`.
3. If `nums` is empty, `len(nums)` is 0: run-time error (division by zero). Fix: check `if len(nums) == 0:` first.

### Common mistakes

- Calling a crash a logic error. If it stops the program running, it is a run-time error.
- Saying a logic error "stops the program". It does not; the output is just wrong.

## Testing and test data

*Refs: AQA 3.2.11 · OCR 2.3.2 · Edexcel 6.1.6 · Eduqas C2: Testing.*

### What you need to know

- Purpose of testing: to find errors, and to check the program meets its requirements and handles every kind of input.
- Iterative testing: testing each module during development, fixing and retesting.
- Final (terminal) testing: testing the whole program at the end against the requirements.
- Test data:
  - Normal (Eduqas: typical): valid data that should be accepted.
  - Boundary (Eduqas: extreme): data at the edges of the valid range. AQA also includes values just outside the edge.
  - Invalid (OCR): the correct data type but outside the rules; should be rejected.
  - Erroneous: the wrong data type or nonsense; should be rejected.
- A test plan lists each test: what is tested, the test data, the type of data, the expected result, the actual result, and any action taken.

### Worked example

A program accepts a percentage as a whole number from 0 to 100. Write a test plan.

| Test | Data | Type | Expected | Actual |
| --- | --- | --- | --- | --- |
| 1 | 57 | Normal | Accepted | Accepted |
| 2 | 0 | Boundary | Accepted | Accepted |
| 3 | 100 | Boundary | Accepted | Accepted |
| 4 | −1 | Boundary (just outside) / invalid | Rejected | Rejected |
| 5 | 101 | Boundary (just outside) / invalid | Rejected | Accepted: fix condition |
| 6 | "ten" | Erroneous | Rejected with message | Program crashed: add type check |

Tests 5 and 6 show actions needed. After fixing, the tests are run again (iterative testing).

### Common mistakes

- Using only normal data.
- Giving 99 as boundary data for 0 to 100. The boundaries are 0 and 100 (and, for AQA, −1 and 101).
- Confusing invalid with erroneous on OCR: invalid is the right type but out of range; erroneous is the wrong type.

## Refining and evaluating a program

*Refs: OCR 2.3.2 · Edexcel 6.1.6 · Eduqas C2: Testing, C2: Refinement.*

### What you need to know

- Use test results to decide what to fix next and to show the program meets the requirements.
- Refine code to fix errors, meet new or changed requirements, or improve efficiency (fewer comparisons or passes, less memory).
- Evaluate: compare the outcome with each requirement, and discuss the strengths and weaknesses of different approaches.

### Worked example

A requirement changes: usernames must now be 5 to 15 characters, not 3 to 12. Refine `valid_username` from above and say how you would test the change.

1. Change the length check to `if len(name) < 5 or len(name) > 15:`. Better: use constants `MIN_LEN = 5` and `MAX_LEN = 15`, so future changes are made in one place.
2. Retest with boundary data: 4, 5, 15 and 16 characters; normal data of 8 characters; and an empty string.

## Check questions

1. Describe the difference between validation and verification. [2 marks]
2. A form asks for an age between 11 and 18. Name a suitable validation check and give one item each of normal, boundary and erroneous test data. [4 marks]
3. State what type of error each is: (a) `prnt("Hi")`, (b) a loop that should run 10 times runs 9 times, (c) a program crashes reading item 10 of a 10-item list. [3 marks]
4. Write a Python routine that keeps asking for a password until it is at least 8 characters long and is not blank. [3 marks]
5. Give three ways a programmer can make code easier to maintain. [3 marks]
6. Explain the difference between iterative testing and final testing. [2 marks]
7. (Eduqas) A program stores 9.99 as the integer 9. Name this type of error. [1 mark]
8. Write a test plan with four tests for a function that accepts a quantity from 1 to 50. [4 marks]

## Mark scheme

1. Validation is an automatic check that data is reasonable/follows rules (1); verification checks data has been entered/copied accurately, e.g. by double entry (1).
2. Range check (1). Normal e.g. 14 (1); boundary 11 or 18 (or 10 or 19 for AQA) (1); erroneous e.g. "fifteen" (1).
3. (a) Syntax (1). (b) Logic (1). (c) Run-time (1).
4. Example:

```python
pwd = input("Password: ")
while pwd == "" or len(pwd) < 8:
    pwd = input("At least 8 characters: ")
```

Input (1); loop with presence and length condition (1); re-input inside the loop (1).
5. Any three: meaningful identifiers (1); comments (1); indentation (1); white space/consistent layout (1); subprograms (1); constants (1).
6. Iterative testing is done on parts/modules during development, with fixes and retests (1); final testing tests the whole program at the end against the requirements (1).
7. Truncation error (1).
8. One mark each for four tests with expected results, covering: normal e.g. 25 accepted; boundaries 1 and 50 accepted; out of range 0 or 51 rejected; erroneous e.g. "abc" rejected.
