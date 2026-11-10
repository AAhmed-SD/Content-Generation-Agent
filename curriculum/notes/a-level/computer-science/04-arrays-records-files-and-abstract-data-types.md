---
level: A-level
subject: Computer Science
topic: "Data structures: arrays, records, lists, tuples, files, abstract data types, static and dynamic structures"
as_content: "AQA 4.2.1.1 to 4.2.1.3 are also AS (7516 3.2.1.1 to 3.2.1.3). AQA 4.2.1.4 (abstract data types, static and dynamic) is A-level only. OCR 1.4.2(a) is also AS."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.2.1.1", "4.2.1.2", "4.2.1.3", "4.2.1.4"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.2(a)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.1: Data structures"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Arrays, records, files and abstract data types

This file covers what a data structure is, one- and multi-dimensional arrays (up to three dimensions), records, lists and tuples, reading and writing text and binary files, abstract data types, and static versus dynamic structures. Stacks, queues and linked lists are in [05-stacks-queues-and-linked-lists.md](05-stacks-queues-and-linked-lists.md); graphs, trees, hash tables and dictionaries in [06-graphs-trees-hash-tables-and-dictionaries.md](06-graphs-trees-hash-tables-and-dictionaries.md); vectors in [07-vectors.md](07-vectors.md). File organisation (serial, sequential, indexed and direct access) for Eduqas is in [36-file-organisation-and-data-security.md](36-file-organisation-and-data-security.md).

Builds on [GCSE: Data structures, strings and files](../../gcse/computer-science/04-data-structures-strings-and-files.md), which covers 1D and 2D arrays, records and simple text files.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Arrays | 1D and n-dimensional; 1D as a vector, 2D as a matrix | Up to 3 dimensions | Up to 3 dimensions; manipulate records and arrays |
| Lists and tuples | Not named | Named (1.4.2(a)) | Not named |
| Files | Text and binary files | File handling (1.2.4(b) in procedural techniques) | Files in Component 2 section 4 (file 36) |
| ADTs | Named list; static vs dynamic | Not named as a term | Choose and justify a structure for a situation |

## 4.2.1.1 Data structures

*Refs: AQA 4.2.1.1 · Eduqas C1.1: Data structures.*

### What you need to know

- A data structure is a way of organising and storing related data in a computer so that it can be used efficiently: a collection of data items together with the relationships between them and the operations that can be done on them.
- Choosing the right structure matters: it decides how quickly you can find, add and remove items, and how much memory you use.
- Eduqas: select, identify and justify a data structure for a situation.

### Explained

| Situation | Good structure | Why |
| --- | --- | --- |
| Marks for 30 students in 6 tests | 2D array | Fixed size, same type, indexed by student and test |
| Undo history in an editor | Stack | Last change undone first |
| Print jobs waiting | Queue | First come, first served |
| A road network | Graph | Places connected by roads with distances |
| Look up a product by barcode | Hash table / dictionary | Near-constant time search by key |
| Sorted list that changes a lot | Linked list or binary search tree | Insert without shifting items |
| One customer's details | Record | Fields of different types together |

## 4.2.1.2 Single- and multi-dimensional arrays

*Refs: AQA 4.2.1.2 · OCR 1.4.2(a) · Eduqas C1.1: Data structures.*

### What you need to know

- An array is a finite, ordered set of elements of the same data type, stored in contiguous (next-to-each-other) memory and accessed by index. Arrays are usually indexed from 0 (OCR and AQA pseudo-code: from 0 unless stated).
- A 1D array is indexed by one integer: a list of values, or a vector. A 2D array is indexed by two integers (row, column): a table or matrix. An n-dimensional array is indexed by a tuple of n integers. OCR and Eduqas use up to three dimensions.
- Because elements are the same size and contiguous, the address of any element can be calculated directly, so access by index takes constant time.
- A list (OCR) is an ordered collection that can grow and shrink and (in Python) hold mixed types; it is dynamic. A tuple is an ordered, immutable collection: once created, items cannot be changed, added or removed.

### Explained

Address calculation for a 2D array stored row by row (row-major), with base address B, each element s bytes, and C columns: address of `[r][c]` = B + (r × C + c) × s. Example: B = 1000, s = 4, C = 5, element [2][3] → 1000 + (2 × 5 + 3) × 4 = 1052.

```python
# 2D: 3 students × 4 tests
marks = [[56, 71, 64, 80],
         [45, 52, 61, 49],
         [90, 88, 95, 91]]
print(marks[1][2])         # 61: student 1, test 2

# total for each student
for row in marks:
    print(sum(row))

# average of test 0 across students
print(sum(marks[s][0] for s in range(3)) / 3)

# 3D: 2 classes × 3 students × 4 tests
grid = [[[0] * 4 for _ in range(3)] for _ in range(2)]
grid[1][2][3] = 77         # class 1, student 2, test 3

point = (3, 4)             # tuple: immutable
# point[0] = 5 would raise TypeError
```

### Worked example

A 3 × 3 noughts-and-crosses board is stored as `board[row][col]`. Write a function that returns True if a player has filled any row.

```python
def row_win(board, p):
    for r in range(3):
        if board[r][0] == board[r][1] == board[r][2] == p:
            return True
    return False
```

### Common mistakes

- Swapping row and column order in a 2D index. State which index is which.
- Writing `[[0] * 4] * 3` in Python: this makes three references to the same row, so changing one row changes all three. Use a comprehension.
- Calling a Python list an array without comment. A Python list is dynamic and can mix types; a true array is fixed-size and single-type.

## 4.2.1.3 Fields, records and files

*Refs: AQA 4.2.1.3 · OCR 1.4.2(a) · Eduqas C1.1: Data structures.*

### What you need to know

- A record is a collection of related fields, possibly of different types, treated as one unit (one row about one entity). A field is one item of data in a record. A file is a collection of records stored on secondary storage.
- Text files store data as characters (human-readable, often one record per line, fields separated by a delimiter such as a comma). Binary files store data as raw bytes in the same form used in memory (not human-readable, but compact, fast, and able to store numbers and images exactly).
- File operations: open (for read, write or append), read a line/record, write, close; test for end of file.

### Worked example

Write student records to a CSV text file, read them back, and write and read a binary file of integers.

```python
# write a text file (overwrites)
students = [("Ali", 72), ("Beth", 65)]
with open("students.txt", "w") as f:
    for name, mark in students:
        f.write(f"{name},{mark}\n")

# read it back, line by line until end of file
records = []
with open("students.txt", "r") as f:
    for line in f:
        name, mark = line.strip().split(",")
        records.append({"name": name, "mark": int(mark)})

# append a record
with open("students.txt", "a") as f:
    f.write("Cara,80\n")

# binary file: store integers as 4-byte values
import struct
with open("scores.bin", "wb") as f:
    for n in [10, 300, 70000]:
        f.write(struct.pack("<i", n))      # 4 bytes, little-endian integer
with open("scores.bin", "rb") as f:
    data = f.read()
nums = [struct.unpack("<i", data[i:i+4])[0] for i in range(0, len(data), 4)]
print(nums)   # [10, 300, 70000]
```

In a text file, 70000 takes 5 bytes plus a separator; in the binary file it takes exactly 4, and every value is the same length, which makes it possible to jump straight to the nth record.

OCR pseudo-code for file handling:

```
myFile = openRead("students.txt")
while NOT myFile.endOfFile()
    line = myFile.readLine()
    print(line)
endwhile
myFile.close()
```

### Common mistakes

- Opening a file in write mode when you meant append, which wipes the file.
- Forgetting to convert text read from a file to a number before calculations.
- Forgetting to close a file (or to use `with`), so data may not be saved.

## 4.2.1.4 Abstract data types and static and dynamic structures

*Refs: AQA 4.2.1.4 · Eduqas C1.1: Data structures.*

### What you need to know

- An abstract data type (ADT) is defined by its values and the operations allowed on it, not by how it is stored. A stack, for example, is anything that supports push, pop, peek, is-empty and is-full with last-in-first-out behaviour.
- The data structure is the concrete way an ADT is implemented, for example a stack built from an array and a top pointer, or from a linked list. This separation is data abstraction (see [11-abstraction-and-computational-thinking.md](11-abstraction-and-computational-thinking.md)).
- ADTs you must know: queue, stack, graph, tree, hash table, dictionary, vector. If a language does not provide them, you must be able to build them from arrays, records and pointers.
- Static data structure: size is fixed when it is created (usually at compile time), for example a fixed-length array.
- Dynamic data structure: size can change while the program runs, using memory allocated from the heap (a pool of free memory) as needed, for example a linked list or a Python list.

| | Static | Dynamic |
| --- | --- | --- |
| Size | Fixed in advance | Grows and shrinks at run time |
| Memory | May waste space if not full; can run out if too small | Uses only what is needed, plus pointer overhead per item |
| Access | Direct by index, fast (address calculated) | Often must follow pointers from the start (slower) |
| Implementation | Simpler | More complex; needs memory management |
| Risk | Overflow when full | Heap can run out; memory fragmentation |
| Good for | Known, fixed amount of data (days of the week, a game board) | Unknown or changing amount of data |

### Common mistakes

- Saying a dynamic structure "has no maximum size". It is limited by available memory.
- Defining an ADT by its implementation ("a stack is an array with a pointer"). An ADT is defined by its behaviour; the array is one possible implementation.

## Check questions

1. Define the term data structure. [1 mark]
2. Explain why accessing element `a[i]` of an array takes the same time whatever the value of `i`. [2 marks]
3. A 2D array `seats` stores 20 rows of 30 seats. Each element is 1 byte; row-major order; base address 4000. Calculate the address of `seats[7][12]`. [2 marks]
4. State one difference between a list and a tuple in Python. [1 mark]
5. Explain two differences between a text file and a binary file. [4 marks]
6. Write code that reads a text file `temps.txt` (one temperature per line) and outputs the highest value. [4 marks]
7. Explain what is meant by an abstract data type, using a queue as an example. [2 marks]
8. Compare static and dynamic data structures, giving two advantages of each. [4 marks]
9. A 3D array `sales[shop][month][product]` holds sales for 4 shops, 12 months and 50 products. Write code to total all sales for shop 2. [3 marks]
10. Suggest and justify a data structure to hold, for one exam board, every student's surname, candidate number and whether they have special arrangements. [3 marks]

## Mark scheme

1. A way of organising/storing related data so it can be accessed and used efficiently (1).
2. Elements are the same size and stored contiguously (1); so the address is calculated directly from the base address and index rather than searched for (1).
3. 4000 + (7 × 30 + 12) × 1 (1) = 4222 (1).
4. A tuple is immutable/cannot be changed after creation; a list can be changed (1).
5. Any two pairs: text stores data as characters, binary as raw bytes/machine representation (2); text is human-readable, binary is not (2); binary is usually more compact/fixed-size records allow direct access (2); text needs conversion of numbers when read, binary does not (2).
6. Example:

```python
highest = None
with open("temps.txt") as f:
    for line in f:
        t = float(line)
        if highest is None or t > highest:
            highest = t
print(highest)
```

Opens file for reading (1); loops through lines/until end of file (1); converts to number and compares with a running maximum (1); outputs after the loop (1).
7. Defined by its values and operations/behaviour, independent of implementation (1); e.g. a queue is defined by enqueue, dequeue, is-empty, is-full with FIFO behaviour, whether built from an array or a linked list (1).
8. Static: memory size known/fixed so no overflow of heap, simple; direct indexed access is fast (2). Dynamic: uses only the memory needed; can grow while running so no fixed limit other than memory (2). Accept relevant disadvantages contrasted.
9. Example:

```python
total = 0
for m in range(12):
    for p in range(50):
        total += sales[2][m][p]
```

Fixes shop index 2 (1); nested loops over months and products (1); accumulates total (1).
10. Array of records (1); each record holds fields of different types: surname string, candidate number (string or integer), special arrangements Boolean (1); array/list lets every student be processed in a loop/indexed (1). Accept a list of records or a table/dictionary keyed by candidate number with justification.
