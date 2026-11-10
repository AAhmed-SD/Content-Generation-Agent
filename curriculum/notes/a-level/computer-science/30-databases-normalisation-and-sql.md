---
level: A-level
subject: Computer Science
topic: "Databases: entity relationship modelling, relational databases, keys, normalisation to 3NF, SQL, referential integrity, DBMS, validation, capturing and exchanging data, transactions, ACID and concurrent access"
as_content: "A-level only for AQA (4.10). OCR: relational and flat file databases, keys, entity relationship modelling, and capturing, selecting, managing and exchanging data are also AS; normalisation, SQL, referential integrity and transaction processing (1.3.2(c) to (f)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.10.1", "4.10.2", "4.10.3", "4.10.4", "4.10.5"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.2(a)", "1.3.2(b)", "1.3.2(c)", "1.3.2(d)", "1.3.2(e)", "1.3.2(f)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.5: Databases", "C2.5: Data validation and verification", "C2.5: Searching data", "C2.5: Database management systems", "C1.3: Validation and verification"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Databases, normalisation and SQL

This file covers flat file and relational databases, entities, attributes and relationships, entity relationship diagrams, primary, composite, foreign and secondary keys and indexes, consistency, redundancy and independence, normalisation to third normal form, SQL to define tables and to select, insert, update and delete across several tables, referential integrity, the DBMS and data dictionary, user views, validation and verification, capturing and exchanging data, client-server databases, concurrent access, record locking, serialisation, timestamp and commitment ordering, transactions and ACID.

Builds on [GCSE: Databases and SQL](../../gcse/computer-science/18-databases-and-sql.md) (tables, records, fields, primary and foreign keys, simple SELECT). New here: ER modelling, normalisation, joins and subqueries, DDL, and concurrency.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Modelling | ER diagrams; Entity(Attribute1, …) notation | ER modelling | ER modelling; relationship symbols |
| Keys | Attribute, primary, composite primary, foreign | Primary, foreign, secondary; indexing | Primary, foreign; indexes |
| Normalisation | To 3NF; why | To 3NF | 1NF, 2NF, 3NF; restructure to 3NF |
| SQL | Retrieve, update, insert, delete across tables; CREATE TABLE | Interpret and modify SQL | CREATE TABLE, PRIMARY KEY, NOT NULL, Int, Char(n), Numeric(m,n), DateTime, INSERT, SELECT (with WHERE, IN, AND, OR, ORDER BY, GROUP BY), UPDATE, comparison operators, subqueries |
| Integrity | Concurrent access: record locks, serialisation, timestamp and commitment ordering | Referential integrity; transaction processing, ACID, record locking, redundancy | Consistency, redundancy, independence; validation and verification |
| Other | Client-server databases | Capturing, selecting, managing and exchanging data | DBMS and data dictionaries; user views; other contemporary database systems |

## Relational databases and keys

*Refs: AQA 4.10.2 · OCR 1.3.2(a) · Eduqas C2.5: Databases.*

### What you need to know

- A flat file database stores all data in one table. Simple, but data is repeated (redundancy), which wastes space and causes inconsistency when one copy is updated but not others.
- A relational database stores data in several linked tables (relations), each about one entity, linked by keys. Each row is a record (tuple) and each column an attribute (field).
- Entity: a thing about which data is stored (Student, Course). Attribute: a property of an entity (Surname).
- Primary key: an attribute that uniquely identifies each record in a table.
- Composite primary key: a primary key made of two or more attributes together, used when no single attribute is unique (for example StudentID + CourseID in an Enrolment table).
- Foreign key: an attribute in one table that is the primary key of another table, creating a link (relationship) between them.
- Secondary key (OCR): an attribute other than the primary key that is indexed so records can be searched or sorted quickly by it (for example Surname).
- Index: a separate structure (often a B-tree or hash) of key values and record locations, so the DBMS can find records without scanning the whole table. Speeds up searching but uses space and slows inserts and updates.
- Eduqas:
  - data consistency: every copy of a data item has the same value;
  - data redundancy: unnecessary repetition of data;
  - data independence: the way data is stored can be changed without changing the programs that use it (the DBMS separates the logical view from the physical storage).
- Relational databases: flexible queries, little redundancy, strong integrity rules, mature and widely used; but they need a fixed schema and do not scale easily across many servers or handle unstructured data well. Other contemporary systems (Eduqas): NoSQL databases (document stores, key-value stores, graph databases) handle huge, unstructured or rapidly changing data and scale across many machines, with less strict consistency (see file 31).

## 4.10.1 Conceptual data models and entity relationship modelling

*Refs: AQA 4.10.1 · OCR 1.3.2(a) · Eduqas C2.5: Databases.*

### What you need to know

- A data model describes the entities, their attributes and the relationships between them.
- Entity description notation (AQA): Entity(Attribute1, Attribute2, …), with the primary key underlined (in plain text, often marked another way, such as an asterisk or bold).
- Relationship degrees: one-to-one, one-to-many, many-to-many. On an ER diagram, entities are rectangles and relationships are lines; the "many" end is shown with a crow's foot.
- A many-to-many relationship cannot be implemented directly in a relational database: it is resolved with a link (junction) entity holding the foreign keys of both, giving two one-to-many relationships.

### Worked example

A college: each student can enrol on many courses; each course has many students; each course is taught by one tutor; a tutor teaches many courses.

```
Tutor ──────< Course >────── Student          (Course–Student is many-to-many)

resolved:

Tutor ──────< Course ──────< Enrolment >────── Student
```

Entity descriptions:

- Tutor(<u>TutorID</u>, TutorName, Email)
- Course(<u>CourseID</u>, Title, TutorID)
- Student(<u>StudentID</u>, Forename, Surname, DateOfBirth)
- Enrolment(<u>StudentID, CourseID</u>, EnrolDate, Grade)

TutorID in Course is a foreign key; Enrolment has a composite primary key made of two foreign keys.

## 4.10.3 Database design and normalisation

*Refs: AQA 4.10.3 · OCR 1.3.2(c) · Eduqas C2.5: Databases.*

### What you need to know

- Normalisation is the process of organising data into tables to remove redundancy and the problems it causes (update, insertion and deletion anomalies).
- First normal form (1NF): every attribute holds a single (atomic) value; there are no repeating groups of attributes; every record is unique (has a primary key).
- Second normal form (2NF): in 1NF, and there are no partial dependencies: every non-key attribute depends on the whole primary key, not just part of it. (Only possible to break when the key is composite.)
- Third normal form (3NF): in 2NF, and there are no non-key dependencies (transitive dependencies): every non-key attribute depends on the key and on nothing but the key. Summary: "the key, the whole key and nothing but the key".
- Why normalise:
  - less redundancy, so less storage and no inconsistent copies;
  - no update anomalies (change a value once, not in many rows);
  - no insertion anomalies (you can add a tutor before they have a course);
  - no deletion anomalies (deleting a course does not lose the only record of a tutor);
  - easier to maintain; data integrity is enforced.
- Drawback: more tables means queries need joins, which can be slower; very busy reporting systems sometimes denormalise for speed.

### Worked example

Unnormalised data (one row per order, with repeating products):

| OrderID | OrderDate | CustID | CustName | CustTown | Products (ProductID, Desc, Price, Qty) |
| --- | --- | --- | --- | --- | --- |
| 501 | 03/02 | C7 | Patel | Leeds | P1 Pen 0.50 ×10; P4 Pad 2.00 ×2 |
| 502 | 04/02 | C9 | Ng | York | P1 Pen 0.50 ×5 |

1NF: remove the repeating group so each row holds one product. Primary key becomes (OrderID, ProductID).

OrderLine1NF(<u>OrderID, ProductID</u>, OrderDate, CustID, CustName, CustTown, Desc, Price, Qty)

2NF: remove partial dependencies on part of the composite key.

- OrderDate, CustID, CustName, CustTown depend only on OrderID.
- Desc and Price depend only on ProductID.
- Qty depends on both.

Order(<u>OrderID</u>, OrderDate, CustID, CustName, CustTown)
Product(<u>ProductID</u>, Desc, Price)
OrderLine(<u>OrderID, ProductID</u>, Qty)

3NF: remove non-key dependencies. In Order, CustName and CustTown depend on CustID, which is not the key.

Customer(<u>CustID</u>, CustName, CustTown)
Order(<u>OrderID</u>, OrderDate, CustID)
Product(<u>ProductID</u>, Desc, Price)
OrderLine(<u>OrderID, ProductID</u>, Qty)

Now a customer's town is stored once; a product's price changes in one place.

## 4.10.4 Structured Query Language (SQL)

*Refs: AQA 4.10.4 · OCR 1.3.2(d) · Eduqas C2.5: Searching data.*

### What you need to know

- SQL is a declarative query language: you say what data you want, and the DBMS works out how to get it. Query languages let users and programs retrieve and change data without knowing how it is stored.
- Data definition (DDL): CREATE TABLE, with data types and constraints (PRIMARY KEY, NOT NULL, FOREIGN KEY … REFERENCES).
- Data manipulation (DML): SELECT, INSERT INTO … VALUES, UPDATE … SET, DELETE FROM.
- SELECT clauses: WHERE (conditions with =, <>, <, >, <=, >=, AND, OR, NOT, IN, BETWEEN, LIKE with wildcards), ORDER BY (ASC/DESC), GROUP BY with aggregate functions (COUNT, SUM, AVG, MIN, MAX) and HAVING to filter groups, JOIN (or listing tables in FROM with a WHERE condition linking keys), and subqueries (a SELECT inside another, in brackets).
- Eduqas data types: Int, Char(n) (fixed-length text of n characters), Numeric(m,n) (m digits, n after the decimal point), DateTime. Other systems use VARCHAR(n), INTEGER, REAL, DATE, BOOLEAN.

### Worked example

Using the 3NF tables above:

```sql
CREATE TABLE Customer (
    CustID    CHAR(4)      NOT NULL PRIMARY KEY,
    CustName  VARCHAR(30)  NOT NULL,
    CustTown  VARCHAR(30)
);

CREATE TABLE Orders (
    OrderID   INT          NOT NULL PRIMARY KEY,
    OrderDate DATETIME     NOT NULL,
    CustID    CHAR(4)      NOT NULL,
    FOREIGN KEY (CustID) REFERENCES Customer(CustID)
);

CREATE TABLE Product (
    ProductID CHAR(4)      NOT NULL PRIMARY KEY,
    Descr     VARCHAR(40),
    Price     NUMERIC(6,2)
);

CREATE TABLE OrderLine (
    OrderID   INT     NOT NULL,
    ProductID CHAR(4) NOT NULL,
    Qty       INT     NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
```

(`Orders` is used because ORDER is a reserved word in SQL.)

Insert, update and delete:

```sql
INSERT INTO Customer (CustID, CustName, CustTown) VALUES ('C12', 'Ahmed', 'Hull');

UPDATE Product SET Price = 0.55 WHERE ProductID = 'P1';

DELETE FROM OrderLine WHERE OrderID = 502 AND ProductID = 'P1';
```

Retrieve from several tables: names of customers who ordered pens, alphabetically.

```sql
SELECT DISTINCT Customer.CustName
FROM Customer
JOIN Orders    ON Customer.CustID = Orders.CustID
JOIN OrderLine ON Orders.OrderID = OrderLine.OrderID
JOIN Product   ON OrderLine.ProductID = Product.ProductID
WHERE Product.Descr = 'Pen'
ORDER BY Customer.CustName ASC;
```

The same join in the older style:

```sql
SELECT Customer.CustName
FROM Customer, Orders
WHERE Customer.CustID = Orders.CustID AND Orders.OrderDate >= '2025-02-01';
```

Total value of each order, highest first:

```sql
SELECT OrderLine.OrderID, SUM(OrderLine.Qty * Product.Price) AS Total
FROM OrderLine JOIN Product ON OrderLine.ProductID = Product.ProductID
GROUP BY OrderLine.OrderID
ORDER BY Total DESC;
```

Subquery and IN: products never ordered.

```sql
SELECT Descr FROM Product
WHERE ProductID NOT IN (SELECT ProductID FROM OrderLine);
```

Customers from Leeds or York: `SELECT * FROM Customer WHERE CustTown IN ('Leeds', 'York');`

## Referential integrity

*Refs: OCR 1.3.2(e).*

### What you need to know

- Referential integrity means every foreign key value must match an existing primary key value in the linked table (or be null if allowed), so there are no "orphan" records.
- The DBMS enforces it by refusing to: add an Orders record with a CustID that is not in Customer; delete a Customer who still has orders (or by cascading the delete, removing their orders too, or setting the foreign keys to null, if the designer chooses).

## DBMS, data dictionary and user views

*Refs: Eduqas C2.5: Database management systems, Databases.*

### What you need to know

- A database management system (DBMS) is software that creates, maintains and controls access to a database. It provides: data definition and querying (SQL); data independence (programs do not need to know storage details); integrity (enforcing keys, data types, validation and referential integrity); security (user accounts, permissions); concurrency control; backup and recovery; and the data dictionary.
- A data dictionary (catalogue, metadata) describes the database: table names, field names, data types, sizes, validation rules, keys, relationships, indexes and access rights.
- Views: different users see different views of the same data (a virtual table defined by a query). A receptionist sees patients' names and appointments but not medical notes; a doctor sees more. Advantages: security and privacy (users only see what they need), simplicity (users see a tailored, uncluttered view), and the underlying structure can change without changing users' views.
- Turning data into useful information: queries, sorting, filtering, grouping, calculations and reports.

## Validation and verification

*Refs: Eduqas C2.5: Data validation and verification, C1.3: Validation and verification.*

### What you need to know

- Validation: automatic checks that data is sensible and follows rules before it is accepted. It cannot check it is correct. Types:
  - presence check (not left blank);
  - type check (a number where a number is needed);
  - range check (mark between 0 and 100);
  - length check (password at least 8 characters);
  - format (picture) check (postcode pattern, date dd/mm/yyyy);
  - lookup (list) check (value is one of an allowed set);
  - check digit (file 18);
  - in databases also: uniqueness (primary key), referential integrity, and cross-field checks (end date after start date).
- Verification: checking that data has been entered or copied accurately, matching the original:
  - double entry (type twice and compare, as with passwords);
  - visual check / proofreading against the source document;
  - in transmission: parity and checksums.

```python
import re
def valid_mark(text):
    if text.strip() == "":                 # presence
        return False
    if not text.isdigit():                 # type
        return False
    return 0 <= int(text) <= 100           # range

def valid_postcode(text):                  # format check (simplified UK pattern)
    return re.fullmatch(r"[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}", text) is not None
```

## Capturing, selecting, managing and exchanging data

*Refs: OCR 1.3.2(b).*

### What you need to know

- Capturing: getting data into the system: forms (paper or online), OCR (optical character recognition) and OMR (optical mark recognition, for multiple-choice answer sheets), barcode and RFID scanners, sensors, and importing from other systems. Validation at entry keeps data clean.
- Selecting: choosing only the relevant data, for example with SQL queries and filters.
- Managing: using a DBMS to update, sort, back up, secure and keep data accurate; SQL for manipulation.
- Exchanging: moving data between systems: EDI (electronic data interchange, standard formats for business documents such as orders and invoices between companies), CSV files, JSON or XML through APIs (file 29). Using a standard format both systems understand is essential.

## 4.10.5 Client server databases, concurrency and transactions

*Refs: AQA 4.10.5 · OCR 1.3.2(f).*

### What you need to know

- A client-server database: the database and DBMS run on a server; many clients send requests (queries) to it at the same time. The server processes them and returns results. Benefits: one consistent, central copy; central security and backup; clients need little processing.
- Concurrent access problem: the lost update. Two clients read the same record, both change it, and both write back; the first update is overwritten and lost. Example: stock is 10; A reads 10 and sells 3; B reads 10 and sells 2; A writes 7; B writes 8. Correct stock is 5.
- Ways to control concurrent access:
  - Record locking: when a client accesses a record to update it, the record is locked; other clients cannot change it (or sometimes read it) until the lock is released. Risk: deadlock, where two clients each wait for a record the other has locked; the DBMS must detect this and abort one.
  - Serialisation: transactions are scheduled so the result is the same as if they had run one after another, never interleaved in a way that interferes.
  - Timestamp ordering: each transaction gets a timestamp when it starts; each record stores the timestamps of the last read and write. If a transaction tries to change a record that a later transaction has already read or written, it is rejected and restarted, so conflicting operations happen in timestamp order.
  - Commitment ordering: transactions are committed in an order that respects their conflicts (dependencies), so the overall effect is serialisable; a transaction that would break the order is aborted.
- A transaction is a single logical unit of work made of one or more operations (for example a bank transfer: debit one account and credit another). It must be done completely or not at all.
- ACID (OCR):
  - Atomicity: a transaction is all or nothing; if any part fails, the whole thing is rolled back.
  - Consistency: a transaction takes the database from one valid state to another, keeping all rules (such as referential integrity and "total money unchanged by a transfer").
  - Isolation: concurrent transactions do not interfere; the result is as if they ran one at a time.
  - Durability: once committed, changes are permanent, surviving power cuts and crashes (written to non-volatile storage, with logs).
- Redundancy (OCR, in the sense of resilience): keeping duplicate copies of data or hardware (mirrored disks, backup servers in other locations) so the system keeps working and no data is lost if one part fails. (Contrast with data redundancy in normalisation, which is unwanted duplication.)

## Common mistakes

- Saying a foreign key must be unique. It usually is not: many orders share one CustID.
- Normalising to 3NF but leaving a many-to-many relationship unresolved.
- Writing SQL joins without the linking condition, which gives every combination of rows (a Cartesian product).
- Forgetting WHERE in UPDATE or DELETE, which changes or deletes every row.
- Using HAVING without GROUP BY, or WHERE to filter aggregate results.
- Confusing validation (is it sensible?) with verification (is it what was intended?).

## Check questions

1. Define the terms primary key, composite primary key and foreign key. [3 marks]
2. Give two problems with a flat file database that a relational database solves. [2 marks]
3. A hospital: each ward has many patients; each patient is on one ward; each patient can be seen by many doctors and each doctor sees many patients. Draw an ER diagram and write entity descriptions for a 3NF design. [6 marks]
4. State the conditions for a relation to be in third normal form. [3 marks]
5. Normalise to 3NF: Loan(BookID, Title, AuthorName, AuthorNationality, MemberID, MemberName, LoanDate), where each member can borrow many books and the key is (BookID, MemberID, LoanDate). [6 marks]
6. Write SQL to create a table Member with MemberID (primary key, 5 characters), Name (up to 40 characters, required) and JoinDate. [3 marks]
7. Using your tables from Q5, write SQL to list the titles of books borrowed by the member named 'Ruth Okafor', in date order. [4 marks]
8. Write SQL to increase the price of every product costing under £1 by 10%. [2 marks]
9. Write SQL to show how many orders each customer has made, only for customers with more than 3 orders. [3 marks]
10. (OCR) Explain referential integrity and how a DBMS enforces it. [3 marks]
11. Explain the lost update problem and how record locking prevents it. [4 marks]
12. Describe timestamp ordering. [2 marks]
13. (OCR) Explain the four ACID properties using a bank transfer as an example. [4 marks]
14. (Eduqas) Explain the advantages of giving different users different views of a database. [2 marks]
15. (Eduqas) Explain the difference between validation and verification, giving two examples of each. [4 marks]

## Mark scheme

1. Primary key: attribute that uniquely identifies each record (1). Composite: a primary key made of two or more attributes (1). Foreign key: attribute in one table that is the primary key in another, linking them (1).
2. Any two: removes redundant/repeated data (1); avoids inconsistency/update anomalies (1); saves storage (1); more flexible queries (1).
3. Diagram: Ward one-to-many Patient (1); Patient many-to-many Doctor resolved with a link entity, e.g. Consultation/Treatment (1). Descriptions: Ward(<u>WardID</u>, WardName, …) (1); Patient(<u>PatientID</u>, Name, …, WardID) (1); Doctor(<u>DoctorID</u>, Name, …) (1); Treatment(<u>PatientID, DoctorID</u>, …) with a date if needed in the key (1).
4. In 2NF (which needs 1NF: atomic values, no repeating groups) (1); every non-key attribute depends on the whole key (no partial dependencies) (1); no non-key attribute depends on another non-key attribute (no transitive dependencies) (1).
5. Identify partial dependencies: Title, AuthorName, AuthorNationality depend on BookID; MemberName on MemberID (2). Transitive: AuthorNationality depends on AuthorName (1). 3NF: Author(<u>AuthorID</u>, AuthorName, AuthorNationality) (1); Book(<u>BookID</u>, Title, AuthorID) (1); Member(<u>MemberID</u>, MemberName) and Loan(<u>BookID, MemberID, LoanDate</u>) (1).
6. `CREATE TABLE Member (MemberID CHAR(5) NOT NULL PRIMARY KEY, Name VARCHAR(40) NOT NULL, JoinDate DATE);` (1 for CREATE TABLE and fields, 1 for primary key, 1 for NOT NULL and types).
7. Example:

```sql
SELECT Book.Title
FROM Book JOIN Loan ON Book.BookID = Loan.BookID
          JOIN Member ON Loan.MemberID = Member.MemberID
WHERE Member.MemberName = 'Ruth Okafor'
ORDER BY Loan.LoanDate;
```

SELECT Title (1); correct joins (1); WHERE on name (1); ORDER BY LoanDate (1).
8. `UPDATE Product SET Price = Price * 1.1 WHERE Price < 1;` (1 for UPDATE … SET calculation, 1 for WHERE).
9. `SELECT CustID, COUNT(*) FROM Orders GROUP BY CustID HAVING COUNT(*) > 3;` (1 COUNT, 1 GROUP BY, 1 HAVING).
10. Every foreign key value must match an existing primary key in the linked table (1); DBMS refuses inserts with non-matching foreign keys (1); refuses or cascades deletes of records that are referenced (1).
11. Two users read the same record and both update it; the second write overwrites the first, so an update is lost (2). Record locking: the first user locks the record (1); the second cannot update until the lock is released and must reread the new value (1).
12. Each transaction is given a timestamp (1); a transaction is rejected/restarted if it tries to access a record already written/read by a later transaction, so operations happen in timestamp order (1).
13. Atomicity: debit and credit both happen or neither (1). Consistency: total money is the same before and after; rules kept (1). Isolation: another transaction cannot see the halfway state/two transfers do not interfere (1). Durability: once committed, the transfer survives a crash (1).
14. Security/privacy: users only see the data they need (1); simplicity: tailored view, easier to use; structure can change without affecting views (1).
15. Validation: automatic checks that data is reasonable/obeys rules (1), e.g. range check, presence check (1). Verification: checks that data matches the original/was entered accurately (1), e.g. double entry, visual check (1).
