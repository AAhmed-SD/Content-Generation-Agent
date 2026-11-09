---
level: GCSE
subject: Computer Science
topic: "Data structures, strings, files and random numbers"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.2.6", "3.2.8", "3.2.9"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.2.3"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.2.2", "6.3.1", "6.3.3", "6.4.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["5: Data structures", "5: File design", "8: Algorithms", "C2: Implementation"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Data structures, strings, files and random numbers

This file covers one- and two-dimensional arrays, records, Python lists, tuples and dictionaries, choosing and designing data structures and files, string handling (length, position, substring, slicing, concatenation, case, character codes, conversion), reading and writing text and CSV files, and generating random numbers.

## Overview

A data structure groups many values under one name so a program can store and process them together. Strings are a structure of characters. Files keep data after the program ends. Random numbers let programs simulate chance.

### Board differences

- AQA 8525: arrays (1D and 2D only) and records (3.2.6); string handling including character codes and conversions (3.2.8); random numbers (3.2.9). AQA does not include file handling. Paper 1.
- OCR J277: string manipulation (concatenation, slicing), file handling (open, read, write, close), records, 1D and 2D arrays (arrays are fixed length/static; 2D arrays can emulate a database table), random numbers (2.2.3). SQL from the same point is in [18-databases-and-sql.md](18-databases-and-sql.md); sub programs in [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md).
- Edexcel 1CP2: 1D and 2D structured types (string, array, record) (1.2.2, 6.3.1); strings: length, position, substrings, case conversion (6.3.3); read from and write to comma separated value (CSV) text files (6.4.2). Paper 2 is in Python using the PLS, so lists stand in for arrays.
- Eduqas C500QS: design, interpret and manipulate records, 1D and 2D arrays, and justify a choice of structure (5: Data structures); design files and records for an application (5: File design); string handling with functions `mid`, `left`, `right`, `instring`, `len`, `val`, `int`, `trim`, `char` in its pseudo-code. Component 2 adds Python file handling (open, read into a variable or array, write, write from an array, close), fixed length records, lists, tuples, dictionaries and slicing.

## One-dimensional arrays

*Refs: AQA 3.2.6 · OCR 2.2.3 · Edexcel 1.2.2, 6.3.1 · Eduqas 5: Data structures.*

### What you need to know

- An array is a data structure holding a fixed number of items of the same data type under one identifier. Each item is reached by its index.
- Indexes usually start at 0 (AQA, OCR and Python). Some pseudo-code examples start at 1; read the question.
- Arrays are static: their size is set when they are declared. Python lists are dynamic (they can grow), but are used as arrays at GCSE.
- Why use arrays: one name instead of many variables; can be processed with a loop.

### Explained

```python
temps = [12, 15, 9, 18, 14]     # 5 items, indexes 0 to 4
print(temps[0])                 # 12
temps[2] = 10                   # change the third item
print(len(temps))               # 5

total = 0
for t in temps:
    total = total + t
print(total / len(temps))       # mean: 13.8
```

OCR ERL declares an array with `array scores[5]`. AQA pseudo-code writes `scores ← [12, 15, 9, 18, 14]`. Eduqas writes `myarray[99]`.

### Common mistakes

- Using index 5 for the fifth item of a zero-indexed array: it is index 4, and index 5 is out of range.
- Saying an array can hold mixed data types. At GCSE an array holds one type.

## Two-dimensional arrays

*Refs: AQA 3.2.6 · OCR 2.2.3 · Edexcel 1.2.2, 6.3.1 · Eduqas 5: Data structures.*

### What you need to know

- A 2D array is an array of arrays: a table with rows and columns. An item is reached with two indexes.
- OCR: a 2D array can act like a database table, each row a record and each column a field.
- Process a 2D array with nested loops.

### Explained

```python
# rows = students, columns = test 1, test 2, test 3
marks = [[56, 61, 70],
         [44, 39, 52],
         [80, 77, 91]]
print(marks[1][2])        # row 1, column 2: 52

for row in range(len(marks)):
    total = 0
    for col in range(len(marks[row])):
        total = total + marks[row][col]
    print("Student", row, "total", total)
```

Whether the first index is the row or the column is a convention. In exams the question tells you which; Python code with a list of lists uses `[row][column]`.

### Worked example

Using `marks` above, write code to find the highest mark in test 3 (column 2).

```python
best = marks[0][2]
for row in range(1, len(marks)):
    if marks[row][2] > best:
        best = marks[row][2]
print(best)       # 91
```

### Common mistakes

- Swapping the indexes, giving the wrong item or an out-of-range error.
- Resetting a running total outside the outer loop when you want one total per row.

## Records, and lists, tuples and dictionaries

*Refs: AQA 3.2.6 · OCR 2.2.3 · Edexcel 1.2.2, 6.3.1 · Eduqas 5: Data structures, C2: Implementation.*

### What you need to know

- A record groups related fields that can have different data types, for example a student record with name (string), year (integer) and paid (Boolean).
- An array (or list) of records stores many records with the same fields, like rows of a table.
- Python has no record type in the core syntax. Common ways to model one: a dictionary, a list, or a class.
- Python structures (Eduqas Component 2):
  - List: ordered, changeable (mutable), written with `[ ]`.
  - Tuple: ordered, cannot be changed (immutable), written with `( )`. Good for fixed data such as a coordinate.
  - Dictionary: key-value pairs, written with `{ }`. Look up a value by its key.
- Choose and justify a structure for a situation (Eduqas).

### Explained

AQA pseudo-code record:

```
RECORD Book
    title : String
    pages : Integer
    on_loan : Boolean
ENDRECORD
```

The same idea in Python:

```python
book = {"title": "Tides", "pages": 312, "on_loan": False}
print(book["title"])
book["on_loan"] = True

library = [
    {"title": "Tides", "pages": 312, "on_loan": True},
    {"title": "Orbit", "pages": 198, "on_loan": False},
]
for b in library:
    if not b["on_loan"]:
        print(b["title"])
```

A tuple for something that should not change:

```python
START = (0, 0)      # x, y
# START[0] = 5 would cause an error: tuples are immutable
```

Choosing a structure:

| Data | Good choice | Why |
| --- | --- | --- |
| 30 test scores | 1D array of integers | Same type, fixed number, processed in a loop |
| A cinema seating plan | 2D array of Booleans | Rows and columns |
| One customer's details | Record | Fields of different types |
| All customers | Array of records | Many records with the same fields |
| Country → capital | Dictionary | Look up by key |

### Common mistakes

- Using parallel arrays (one for names, one for ages) and then sorting only one of them, which breaks the link. A list of records avoids this.
- Saying a tuple can be edited.

## File design (Eduqas)

*Refs: Eduqas 5: File design · Edexcel 6.4.2 · OCR 2.2.3.*

### What you need to know

- Design the records of a file for an application: the fields, their data types, their lengths (for fixed length records), and a key field that identifies each record.
- Fixed length records give every field a set number of characters, so the position of any record in the file can be calculated. Variable length records save space but must be read in order.

### Worked example

Design a record for a sports club membership file.

| Field | Data type | Length | Example |
| --- | --- | --- | --- |
| MemberID (key) | String | 6 | M00412 |
| Surname | String | 20 | Okafor |
| DateJoined | String (date) | 10 | 2026-09-01 |
| Junior | Boolean | 1 | True |
| FeesDue | Real | 6 | 25.00 |

Record length = 6 + 20 + 10 + 1 + 6 = 43 characters. Record 100 starts at character 99 × 43 = 4257 (counting from 0).

## String handling

*Refs: AQA 3.2.8 · OCR 2.2.3 · Edexcel 6.3.3 · Eduqas 8: Algorithms, C2: Implementation.*

### What you need to know

- Length: number of characters.
- Position (index) of a character or substring.
- Substring/slicing: part of a string.
- Concatenation: joining strings with `+`.
- Case conversion: upper and lower case (Edexcel).
- Character to code and code to character (AQA): `ord('A')` is 65, `chr(66)` is 'B'.
- Conversion: string to integer, string to real, integer to string, real to string (AQA).
- (Eduqas pseudo-code) `left`, `right`, `mid`, `instring`, `trim`, `val`.

### Explained

```python
s = "Computer"
len(s)          # 8
s[0]            # 'C'
s[-1]           # 'r' (last character)
s[0:3]          # 'Com'  (from index 0 up to but not including 3)
s[3:]           # 'puter'
s.find("put")   # 3  (-1 if not found)
s.upper()       # 'COMPUTER'
s.lower()       # 'computer'
s + "s"         # 'Computers'
"  hi ".strip() # 'hi' (trim)
ord("a")        # 97
chr(97 + 1)     # 'b'
int("12") + 1   # 13
float("2.5")    # 2.5
str(3.0)        # '3.0'
```

Equivalents in Eduqas pseudo-code: `left("Computer", 3)` = "Com"; `right("Computer", 2)` = "er"; `mid("Computer", x, y)` takes y characters from position x (check whether the question counts from 0 or 1).

AQA pseudo-code uses `LEN`, `POSITION`, `SUBSTRING(start, end, s)` (inclusive of both ends), `CHAR_TO_CODE`, `CODE_TO_CHAR`, `STRING_TO_INT` and so on. Read the question for whether the end index is included.

### Worked example

Make a username from the first 3 letters of the surname, the first letter of the first name, and the year of entry, all in lower case.

```python
first = "Priya"
surname = "Shah"
year = 2026
username = (surname[0:3] + first[0]).lower() + str(year)
print(username)     # shapp2026
```

Count the vowels in a word.

```python
word = input("Word: ").lower()
vowels = 0
for ch in word:
    if ch in "aeiou":
        vowels = vowels + 1
print(vowels)
```

Shift each letter by 1 using character codes (A→B, Z→A).

```python
def shift(letter):
    code = ord(letter) - ord("A")
    code = (code + 1) % 26
    return chr(code + ord("A"))

print(shift("Z"))     # A
```

### Common mistakes

- Forgetting that Python slices exclude the end index.
- Forgetting to cast a number to a string before concatenating.
- Comparing strings without matching case: "Yes" == "yes" is False.

## File handling

*Refs: OCR 2.2.3 · Edexcel 6.4.2 · Eduqas C2: Implementation.*

### What you need to know

- Why: data in variables is lost when the program ends; files store it permanently on secondary storage.
- Steps: open the file (in read, write or append mode), read or write, close it.
- Write mode `"w"` creates the file or overwrites it. Append mode `"a"` adds to the end. Read mode `"r"` reads.
- Closing the file saves the data and frees it for other programs. `with open(...)` closes the file automatically.
- CSV (comma separated values) text files store one record per line with fields separated by commas (Edexcel).
- Read a file into a variable or into an array; write an array to a file (Eduqas).

### Explained

Write and then read a list:

```python
names = ["Ana", "Bo", "Cy"]

f = open("names.txt", "w")
for n in names:
    f.write(n + "\n")       # "\n" ends the line
f.close()

f = open("names.txt", "r")
loaded = []
for line in f:
    loaded.append(line.strip())   # strip removes the newline
f.close()
print(loaded)
```

CSV records:

```python
# scores.csv contains lines such as:  Ana,72
results = []
with open("scores.csv", "r") as f:
    for line in f:
        fields = line.strip().split(",")
        name = fields[0]
        score = int(fields[1])
        results.append([name, score])

with open("passed.csv", "w") as f:
    for r in results:
        if r[1] >= 50:
            f.write(r[0] + "," + str(r[1]) + "\n")
```

OCR ERL: `myFile = open("sample.txt")`, `myFile.readLine()`, `myFile.writeLine("text")`, `myFile.endOfFile()`, `myFile.close()`, and `newFile("name.txt")` to create a file.

### Common mistakes

- Opening a file in `"w"` mode when you meant to add to it, wiping its contents.
- Forgetting that every value read from a text file is a string.
- Forgetting the newline when writing, so all values end up on one line.

## Random number generation

*Refs: AQA 3.2.9 · OCR 2.2.3.*

### What you need to know

- Use random numbers in a program, for example for games, simulations or picking a random item.
- AQA: how the numbers are made (pseudo-random generation) is not needed.

### Explained

```python
import random
dice = random.randint(1, 6)        # 1 to 6 inclusive
x = random.random()                # real number from 0 up to (not including) 1
colour = random.choice(["red", "blue", "green"])
```

AQA pseudo-code: `RANDOM_INT(1, 6)`. OCR ERL: `random(1, 6)`.

### Worked example

Simulate 1000 rolls of a dice and count the sixes.

```python
import random
sixes = 0
for k in range(1000):
    if random.randint(1, 6) == 6:
        sixes = sixes + 1
print(sixes)       # about 167
```

## Check questions

1. Explain one reason for using an array instead of separate variables to store 30 test scores. [2 marks]
2. An array `rain` holds [4, 0, 12, 7, 3]. State the value of `rain[2]` and of `len(rain)`. [2 marks]
3. Describe the difference between an array and a record. [2 marks]
4. A 2D array `seats` has 10 rows and 20 columns; True means booked. Write code to count how many seats are booked. [4 marks]
5. `code = "AB12-XY"`. Give the result of (a) `code[0:4]`, (b) `len(code)`, (c) `code.find("-")`, (d) `code.lower()`. [4 marks]
6. Write a function that takes a string and returns it reversed. [3 marks]
7. A file `stock.csv` has lines in the form `item,quantity`. Write code that reads the file and prints the names of items with a quantity below 5. [5 marks]
8. State one advantage of using a tuple rather than a list for a fixed set of values. [1 mark]
9. Write one line of Python that outputs a random whole number from 10 to 20 inclusive (assume `random` is imported). [1 mark]

## Mark scheme

1. One name for all values (fewer variables) (1); values can be processed with a loop / easy to scale to more values (1).
2. 12 (1); 5 (1).
3. An array holds items of the same data type (1); a record holds related fields that can be of different data types (1).
4. Counter set to 0 (1); outer loop over 10 rows (1); inner loop over 20 columns (1); add 1 when `seats[r][c]` is True and output the count (1).
5. (a) "AB12" (1). (b) 7 (1). (c) 4 (1). (d) "ab12-xy" (1).
6. Example:

```python
def reverse(s):
    result = ""
    for ch in s:
        result = ch + result
    return result
```

Initialise an empty string (1); loop over each character (1); build in reverse order and return (1). Accept `return s[::-1]`.
7. Open the file for reading (1); loop through each line (1); split each line at the comma (1); cast quantity to integer and compare with 5 (1); print the item name and close the file (or use `with`) (1).
8. It cannot be changed by mistake / it is immutable (1).
9. `print(random.randint(10, 20))` (1).
