---
level: GCSE
subject: Computer Science
topic: "Relational databases and SQL"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.7.1", "3.7.2"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.2.3"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Relational databases and SQL

This file covers databases and relational databases, tables, records, fields, data types, primary and foreign keys, why relational databases reduce redundancy and inconsistency, and SQL: SELECT ... FROM ... WHERE ... ORDER BY, queries across two tables, and INSERT, UPDATE and DELETE.

## Overview

A database is an organised, persistent store of data. SQL (Structured Query Language) is the language used to search and change data in a relational database.

### Board differences

- AQA 8525: 3.7.1 and 3.7.2 (Paper 2). The full topic: database concepts, keys, redundancy and inconsistency, and SQL to retrieve (SELECT, FROM, WHERE, ORDER BY ... ASC/DESC, with data from up to two tables), insert, update and delete. Entity, attribute and entity identifier are accepted as the abstract-model names for table, field and primary key.
- OCR J277: 2.2.3 (J277/02). Only "the use of SQL to search for data" with SELECT, FROM and WHERE, and using records and 2D arrays like database tables. Keys, multiple tables, ORDER BY, INSERT, UPDATE and DELETE are not in the OCR spec.
- Edexcel 1CP2 and Eduqas C500QS: no database or SQL content. Eduqas's SQL injection threat is in [17-cyber-security.md](17-cyber-security.md); Eduqas file and record design is in [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md).

## Relational databases

*Refs: AQA 3.7.1 · OCR 2.2.3.*

### What you need to know

- Database: a persistent, organised collection of structured data, stored so it can be searched and updated easily.
- Table: a set of data about one type of thing (an entity), for example Students.
- Record: one row of a table, all the data about one item (one student).
- Field: one column of a table, a single attribute (Surname). Each field has a data type (integer, real, text/string, Boolean, date/time).
- Primary key: a field whose value is unique for every record, used to identify each record (StudentID). Entity identifier is another name for it.
- Foreign key: a field in one table that is the primary key of another table, used to link (relate) the two tables.
- Relational database: data is split into several linked tables, each about one entity, linked by keys.
- Why relational databases: each fact is stored once, which reduces data redundancy (unnecessary repeated data) and so reduces inconsistency (different copies of the same fact that disagree). Updates only need making in one place, and less storage is used.

### Explained

A flat-file (single-table) loans list repeats each member's details on every loan:

| LoanID | Name | Phone | Book |
| --- | --- | --- | --- |
| 1 | R. Bhatt | 07700 900111 | Tides |
| 2 | R. Bhatt | 07700 900111 | Orbit |
| 3 | S. Lowe | 07700 900222 | Tides |

If R. Bhatt changes phone number and only one row is updated, the data becomes inconsistent. Splitting it into two related tables fixes this:

Members

| MemberID | Name | Phone |
| --- | --- | --- |
| M1 | R. Bhatt | 07700 900111 |
| M2 | S. Lowe | 07700 900222 |

Loans

| LoanID | MemberID | Book |
| --- | --- | --- |
| 1 | M1 | Tides |
| 2 | M1 | Orbit |
| 3 | M2 | Tides |

MemberID is the primary key of Members and a foreign key in Loans. The phone number is now stored once.

### Common mistakes

- Choosing a name as a primary key: two people can share a name.
- Defining a foreign key as "a second primary key". It is a primary key from another table.

## SQL: retrieving data

*Refs: AQA 3.7.2 · OCR 2.2.3.*

### What you need to know

- `SELECT` lists the fields to show (`*` means all fields).
- `FROM` names the table(s).
- `WHERE` gives conditions that records must meet. Conditions use `=`, `<>` or `!=`, `<`, `>`, `<=`, `>=` and can be combined with `AND`, `OR`, `NOT`. Text values go in quotation marks.
- `ORDER BY field ASC` sorts ascending (A to Z, smallest first; the default); `DESC` sorts descending (AQA).
- (AQA) Data from two tables: list both tables in `FROM` and link them in `WHERE` by matching the foreign key to the primary key. Use `Table.Field` when a field name appears in both tables.
- OCR also accepts the wildcard `LIKE` with `%` in some answers, but it is not in the spec list; stick to SELECT, FROM, WHERE.

### Worked example

Table Pupils:

| PupilID | Forename | Surname | Year | House |
| --- | --- | --- | --- | --- |
| 101 | Ada | Okoro | 10 | Kestrel |
| 102 | Ben | Farr | 11 | Heron |
| 103 | Cara | Iqbal | 10 | Heron |
| 104 | Dev | Moss | 9 | Kestrel |

1. Forenames of pupils in Year 10:

```sql
SELECT Forename
FROM Pupils
WHERE Year = 10;
```

Result: Ada, Cara.

2. Full records of Heron pupils in Year 10 or above, sorted by surname:

```sql
SELECT *
FROM Pupils
WHERE House = 'Heron' AND Year >= 10
ORDER BY Surname ASC;
```

Result: 102 Ben Farr, then 103 Cara Iqbal.

3. (AQA) A second table Clubs has fields ClubID, PupilID, ClubName. Show the surname of every pupil in the chess club:

```sql
SELECT Pupils.Surname
FROM Pupils, Clubs
WHERE Pupils.PupilID = Clubs.PupilID
AND Clubs.ClubName = 'Chess';
```

The line `Pupils.PupilID = Clubs.PupilID` links each club record to the right pupil.

## SQL: inserting, updating and deleting (AQA)

*Refs: AQA 3.7.2.*

### What you need to know

```sql
INSERT INTO table_name (field1, field2, ...)
VALUES (value1, value2, ...);

UPDATE table_name
SET field1 = value1, field2 = value2
WHERE condition;

DELETE FROM table_name
WHERE condition;
```

- Always include a `WHERE` in UPDATE and DELETE: without it, every record is changed or deleted.

### Worked example

1. Add Eli Shaw, ID 105, Year 9, house Heron:

```sql
INSERT INTO Pupils (PupilID, Forename, Surname, Year, House)
VALUES (105, 'Eli', 'Shaw', 9, 'Heron');
```

2. Ben Farr moves to Kestrel:

```sql
UPDATE Pupils
SET House = 'Kestrel'
WHERE PupilID = 102;
```

3. Remove pupil 104:

```sql
DELETE FROM Pupils
WHERE PupilID = 104;
```

Running SQL from Python (not required, but shows how programs use databases):

```python
import sqlite3
conn = sqlite3.connect("school.db")
cur = conn.cursor()
cur.execute("SELECT Forename FROM Pupils WHERE Year = ?", (10,))
for row in cur.fetchall():
    print(row[0])
conn.close()
```

### Common mistakes

- Using the primary key value of a different record in `WHERE`, updating the wrong person. Using the primary key is safest, because it is unique.
- Forgetting quotation marks around text, or putting them around numbers.
- Writing `DELETE * FROM`. The correct form is `DELETE FROM`.

## Check questions

1. Define the terms record and field. [2 marks]
2. Explain the purpose of a primary key. [2 marks]
3. Explain how a foreign key is used in a relational database. [2 marks]
4. Explain why storing data in related tables reduces inconsistency. [2 marks]
5. Using the Pupils table, write SQL to show the forename and surname of all Kestrel pupils. [3 marks]
6. Write SQL to show all fields for pupils not in Year 11, sorted by Year from highest to lowest. [3 marks]
7. (AQA) Write SQL to change Cara Iqbal's year to 11. [3 marks]
8. (AQA) Write SQL to add a new pupil: 106, Fay Lim, Year 10, Kestrel. [3 marks]
9. (AQA) A table Orders has fields OrderID, CustomerID, Total; Customers has CustomerID, Name, Town. Write SQL to list the names of customers from Leeds and the totals of their orders. [4 marks]

## Mark scheme

1. Record: all the data about one item / one row (1). Field: one attribute/item of data about each item / one column (1).
2. A field that holds a unique value for each record (1), used to identify the record (1).
3. A field in one table that is the primary key of another table (1); used to link/relate the two tables (1).
4. Each item of data is stored only once (1), so when it changes it is updated in one place and there are no conflicting copies (1).
5. `SELECT Forename, Surname` (1) `FROM Pupils` (1) `WHERE House = 'Kestrel'` (1).
6. `SELECT * FROM Pupils` (1) `WHERE Year <> 11` (or `!= 11`, or `NOT Year = 11`) (1) `ORDER BY Year DESC` (1).
7. `UPDATE Pupils` (1) `SET Year = 11` (1) `WHERE PupilID = 103` (accept a condition on name) (1).
8. `INSERT INTO Pupils (PupilID, Forename, Surname, Year, House)` (1) `VALUES (106, 'Fay', 'Lim', 10, 'Kestrel')` (1 for values in the right order, 1 for quotes on text only).
9. `SELECT Customers.Name, Orders.Total` (1) `FROM Customers, Orders` (1) `WHERE Customers.CustomerID = Orders.CustomerID` (1) `AND Customers.Town = 'Leeds'` (1).
