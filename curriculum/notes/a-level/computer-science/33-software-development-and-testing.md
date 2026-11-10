---
level: A-level
subject: Computer Science
topic: "Systematic approach to problem solving: analysis, design, implementation, testing, evaluation; development methodologies; feasibility, investigation, DFDs; HCI; changeover; maintenance; documentation; software tools, IDEs and version control"
as_content: "AQA 4.13 is also AS (7516 3.3). OCR: development methodologies and writing and following algorithms are also AS (H046 2.2.2), as is using an IDE."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.13.1.1", "4.13.1.2", "4.13.1.3", "4.13.1.4", "4.13.1.5"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.3(a)", "1.2.3(b)", "1.2.3(c)", "2.2.1(e)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Testing", "C1.5: Approaches", "C1.5: Feasibility", "C1.5: Investigation", "C1.5: Analysis", "C1.5: Changeover", "C1.5: Program testing", "C1.5: Maintenance", "C1.5: Backup and recovery", "C1.5: Documentation", "C1.6: Human-computer interaction", "C1.6: Design validation", "C1.6: Design evaluation", "C1.7: Software tools"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Software development and testing

This file covers the stages of developing a system (analysis, design, implementation, testing, evaluation), development methodologies (waterfall, agile, extreme programming, spiral, rapid application development), feasibility studies and methods of investigation, data flow diagrams, human-computer interaction and natural language interfaces, design reviews and evaluation criteria, testing (test data, dry runs, black box and white box, alpha, beta and acceptance), changeover methods, maintenance, backup and recovery, documentation, and software tools including IDEs, CASE tools and version control. This is the theory examined on paper; the coursework project itself is not covered.

Builds on [GCSE: Robust programs and testing](../../gcse/computer-science/06-robust-programs-and-testing.md) and [GCSE: Languages, translators and IDEs](../../gcse/computer-science/08-languages-translators-and-ides.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Stages | Analysis, design, implementation, testing, evaluation, with prototyping and agile | Writing and following algorithms | Analysis and design approaches; feasibility; investigation; changeover; maintenance; documentation |
| Methodologies | Prototyping/agile named | Waterfall, agile, extreme programming, spiral, RAD; merits and when to use | Waterfall and agile |
| Testing | Normal, boundary, erroneous; acceptance testing | (Test strategies including black and white box, alpha and beta, are in OCR's AS content) | Test data; dry runs; alpha, beta and acceptance testing |
| Design | Data structures, algorithms, modular structure, user interface | Not named | HCI, natural language and spoken input; design review; evaluation criteria; DFDs |
| Tools | Not named | Use an IDE to develop and debug | Software tools (CASE), IDE tools, version management |

## 4.13.1.1 Analysis

*Refs: AQA 4.13.1.1 · Eduqas C1.5: Feasibility, Investigation, Analysis.*

### What you need to know

- Before a problem can be solved it must be defined: what the problem is, who the users are, and what the system must do.
- Requirements must be established by interacting with the intended users (the client and end users), and recorded in a requirements specification: functional requirements (what it must do) and non-functional requirements (how well: speed, security, usability, platform).
- A data model is created: an abstraction of the real-world data the system needs (entities, attributes, relationships: file 30).
- Clarifying requirements may involve prototyping or an agile approach: show users an early version and refine requirements from their feedback.
- Feasibility study (Eduqas): before committing, an analyst checks whether the project is worth doing and possible:
  - technical (can it be built with available hardware, software and skills?);
  - economic (do the benefits outweigh the costs? cost-benefit analysis);
  - legal (does it comply with data protection and other laws?);
  - operational (will it work in the organisation and will staff use it?);
  - schedule (can it be delivered in time?).
  Proposed solutions must be cost-effective, developed to an agreed time scale and within an agreed budget.
- Methods of investigation (Eduqas):
  - interviews: detailed, can follow up answers; time-consuming, few people;
  - questionnaires: reach many people quickly and anonymously, easy to analyse; low response, no follow-up, questions may be misunderstood;
  - observation: see what really happens; people may act differently when watched (time-consuming);
  - document analysis: examine existing forms, reports and records to see what data is used; may be out of date.
- Analysis techniques (Eduqas): use abstraction and decomposition (file 11) to break the problem down; represent the system with diagrams showing the flow of data and processing requirements, such as data flow diagrams; choose suitable hardware and software for the requirements.
- Data flow diagrams (DFDs) show how data moves through a system. Symbols: external entity (a source or destination outside the system, such as Customer: a rectangle), process (something that transforms data: a rounded rectangle or circle), data store (a file or table: an open-ended rectangle), and data flow (a labelled arrow). Every flow is labelled with the data it carries.

### Worked example

A DFD for an online order (described in words):

- Customer (external entity) → "order details" → Process 1 "Validate order" → "valid order" → Data store "Orders".
- Process 1 → "stock request" → Data store "Stock" → "stock level" → Process 1.
- Data store "Orders" → "order" → Process 2 "Dispatch order" → "dispatch note" → Warehouse (external entity).
- Process 2 → "confirmation email" → Customer.

## 4.13.1.2 Design

*Refs: AQA 4.13.1.2 · Eduqas C1.6: Human-computer interaction, Design validation, Design evaluation.*

### What you need to know

- Before building, the solution is designed and specified: data structures for the data model, algorithms (pseudo-code, flowcharts), a modular structure with clear documented interfaces between modules (hierarchy charts, file 02), and the human user interface.
- Design can be iterative, using prototyping or an agile approach.
- Human-computer interaction (HCI) (Eduqas): designing how people communicate with computers. Contemporary approaches: graphical user interfaces (windows, icons, menus, pointer), touch and gestures, voice assistants, menus and forms, command lines (for experts), and augmented and virtual reality. Design should suit the users' abilities and experience, follow consistent conventions, give feedback, prevent and help recover from errors, and be accessible (colour contrast, screen readers, keyboard use).
- Natural language interfaces let users communicate in ordinary language, typed or spoken. Potential: very easy for new users, hands-free, accessible. Problems with spoken input: ambiguity (homophones like "write/right", unclear word boundaries, words with several meanings, sentences with several possible structures), accents, background noise, and context; a system may misinterpret commands, so it often asks for confirmation.
- Design validation (design review, Eduqas): before coding, the design is checked to make sure it matches the specification (every requirement is met), the most appropriate techniques have been used (suitable data structures, algorithms, security), and the user interface is appropriate for the users.
- Design evaluation criteria (Eduqas, and AQA 4.13.1.5): does it meet the requirements; is it efficient (speed, memory); is it reliable and robust; is it usable (easy to learn and use); is it maintainable (well structured, documented); is it secure; is it cost-effective; is it compatible with existing systems.

## 4.13.1.3 Implementation

*Refs: AQA 4.13.1.3 · OCR 1.2.3(c), 2.2.1(e) · Eduqas C1.7: Software tools.*

### What you need to know

- The models and algorithms are implemented as data structures and code that a computer can run.
- The final solution may be reached iteratively, using prototyping or an agile approach, focusing on the critical path first (the parts the rest depends on, or that are most essential, are built and tested first).
- Programmers should be able to explain how their programs work and argue for their correctness and efficiency using logical reasoning, test data and user feedback.
- Integrated development environment (IDE) features for developing and debugging (OCR 2.2.1(e), Eduqas C1.7):
  - editor with syntax highlighting, auto-indentation, auto-completion and error underlining;
  - built-in translator (compile or run from the editor) and error messages that point to the line;
  - debugging tools: breakpoints (pause at a chosen line), stepping (run one line at a time), watch windows and variable inspection (see values change), call stack view;
  - other: code templates, refactoring, integration with version control, GUI designers.
- Software tools (CASE: computer-aided software engineering) support each stage: requirements and modelling tools (drawing DFDs, ER and UML diagrams), project management tools (Gantt charts, task tracking), code generators, automated testing tools (running test suites, unit tests), documentation generators, and bug trackers.
- Version management (version control, Eduqas): software such as Git records every change to the code with who made it and why. Benefits: roll back to an earlier working version; see what changed and when; several developers work on the same code at once using branches, which are later merged; a full backup history; supports releases (version numbers).

## 4.13.1.4 Testing

*Refs: AQA 4.13.1.4 · Eduqas C1.3: Testing, C1.5: Program testing.*

### What you need to know

- Testing finds errors (syntax, logic and run-time errors) and checks the system meets its specification.
- Test data:
  - normal (typical) data: valid data the program should accept and process correctly;
  - boundary data: valid and invalid values at the edges of allowed ranges (for 1 to 100: 0, 1, 100, 101);
  - erroneous data: invalid data the program should reject (wrong type, out of range, blank).
- A test plan lists each test: its purpose, the test data, the expected result, the actual result, and any action taken.
- Dry run (Eduqas): working through a program or algorithm on paper with test data, using a trace table, to find errors (especially logic errors) and to work out what an algorithm does.
- Black box testing: tests the inputs and outputs against the specification without looking at the code. White box testing: tests designed from the code's structure, so that every path, branch and loop is exercised.
- Unit testing (each module), integration testing (modules together), system testing (the whole system).
- Alpha testing: done in-house by the developers' own testers (or selected staff) during development, on an unfinished version.
- Beta testing: a nearly finished version is released to a limited group of real users outside the company, who use it in real conditions and report bugs; finds problems the developers did not think of.
- Acceptance testing: done with or by the client and intended users at the end, to check the system meets the agreed requirements before it is accepted (signed off and paid for).

### Worked example

A function accepts an exam mark from 0 to 100 as an integer.

| Test | Type | Data | Expected |
| --- | --- | --- | --- |
| 1 | Normal | 57 | Accepted |
| 2 | Boundary (lowest valid) | 0 | Accepted |
| 3 | Boundary (highest valid) | 100 | Accepted |
| 4 | Boundary (just invalid) | −1 | Rejected with message |
| 5 | Boundary (just invalid) | 101 | Rejected with message |
| 6 | Erroneous | "abc" | Rejected with message |
| 7 | Erroneous | 45.5 | Rejected (not an integer) |
| 8 | Erroneous | blank | Rejected |

Dry run to find a logic error:

```
total ← 0
FOR i ← 1 TO 4
    total ← total + i
ENDFOR
OUTPUT total / i
```

Intended: average of 1 to 4 = 2.5. Trace: total becomes 10; after the loop i is 4 (or 5 in some languages). Output 2.5 in one language and 2 in another: a logic error that depends on the loop variable after the loop. Fix: divide by 4 (or a count variable).

## 4.13.1.5 Evaluation

*Refs: AQA 4.13.1.5 · Eduqas C1.6: Design evaluation.*

### What you need to know

- Criteria for evaluating a computer system: does it meet all the requirements in the specification (functionality); correctness; reliability and robustness; efficiency (speed, memory, storage); usability (easy to learn and use, accessible); maintainability (readable, modular, documented code); security; compatibility; cost and time against budget; user feedback and satisfaction.
- Evaluation should judge the final system against the original requirements and identify improvements.

## Development methodologies

*Refs: OCR 1.2.3(a), 1.2.3(b) · Eduqas C1.5: Approaches.*

### What you need to know

Waterfall:

- Stages in strict order: requirements/analysis, design, implementation, testing, installation, maintenance. Each stage is finished and signed off before the next begins; you may go back to the previous stage if a problem is found.
- Merits: clear structure and milestones; easy to manage and document; suits projects with fixed, well-understood requirements (safety-critical systems, large government contracts). Drawbacks: users see a working system only at the end; changes in requirements are costly; errors in early stages are found late.

Agile methodologies:

- Develop in short iterations (sprints) of a few weeks, each producing a working increment of the software, with frequent feedback from the client. Requirements can change as the project goes on. Emphasis on individuals, working software and collaboration over heavy documentation.
- Merits: flexible to changing requirements; users see progress early; problems found quickly; high client satisfaction. Drawbacks: less documentation; hard to predict final cost and time; needs a committed client and experienced team; can drift without discipline.
- Suits projects where requirements are unclear or will change (web and mobile apps, start-ups).

Extreme programming (XP), an agile method:

- Very short iterations; the client (or a representative) is part of the team and writes user stories; pair programming (two programmers at one computer, one coding and one reviewing); test-driven development (write tests before the code); continuous integration; frequent small releases; collective code ownership; refactoring; sustainable pace (no excessive overtime).
- Merits: very high code quality; quick response to change. Drawbacks: costly (two programmers per task); needs the client constantly available; little design documentation. Suits small to medium teams with changing requirements.

Spiral model:

- Repeats four phases in loops (each loop a more complete version): determine objectives; identify and resolve risks (often by building prototypes); develop and test; plan the next iteration. Risk analysis is the focus.
- Merits: risks found and dealt with early; suits large, expensive, high-risk projects; can include prototypes. Drawbacks: expensive and complex to manage; needs risk-assessment expertise; not worth it for small, low-risk projects.

Rapid application development (RAD):

- Gather requirements quickly (focus groups and workshops), then build a series of prototypes that users evaluate; each prototype is refined until it becomes the final system. Often uses time-boxing and reusable components or tools.
- Merits: fast delivery; users heavily involved, so the system meets their needs; requirements can change. Drawbacks: code may be less efficient; harder to scale for large systems; needs users available; less focus on non-functional requirements such as performance.
- Suits small to medium projects with a strong user interface element.

### Worked example

Choose a methodology:

- Software for a hospital radiotherapy machine: requirements are fixed by regulators, safety is critical and full documentation is required: waterfall (or spiral for its risk analysis).
- A start-up's new social app: requirements will change with user feedback, speed to market matters: agile or XP.
- A booking system for a sports centre, needing staff to approve screens: RAD.
- A new air traffic control system with major technical risk and a huge budget: spiral.

## Changeover, maintenance, backup and documentation

*Refs: Eduqas C1.5: Changeover, Maintenance, Backup and recovery, Documentation.*

### Changeover methods

| Method | How | Advantages | Disadvantages | Suitable when |
| --- | --- | --- | --- | --- |
| Direct | Old system stops; new one starts at once | Fast, cheap, no duplication | High risk: if the new system fails there is no fallback | Small or non-critical systems; or when the old system cannot run on |
| Parallel | Old and new run side by side for a period; outputs compared | Low risk; old system is a fallback; results can be checked | Expensive and double the work for staff | Critical systems where failure is unacceptable (payroll, banking) |
| Pilot | New system is used in one branch or department first, then rolled out | Problems found on a small scale; staff there can train others | Slower full rollout; the pilot site carries the risk | Organisations with several similar branches |
| Phased | New system introduced one module or part at a time | Each part tested before the next; staff learn gradually | Takes longer; old and new parts must work together | Large modular systems |

### Maintenance

- Corrective: fixing bugs found after the system is in use.
- Adaptive: changing the system to cope with a changed environment (new laws such as tax rates, new operating systems or hardware, new business processes).
- Perfective: improving performance or adding features and usability improvements requested by users, even though the system works.

### Backup and recovery

- Backup procedures: full backups (everything), incremental (only what changed since the last backup of any kind: quick to make, slower to restore) and differential (everything changed since the last full backup). Store copies off-site or in the cloud; follow a schedule (for example the grandfather-father-son rotation); test that backups can be restored.
- Recovery: restore the latest full backup, then the incremental or differential backups, then re-apply transactions from the transaction log since the last backup. More on file security in [36-file-organisation-and-data-security.md](36-file-organisation-and-data-security.md).

### Documentation

- Produced at different stages: requirements specification (analysis), design specification (design), program listings and technical documentation (implementation), test plans and results (testing), user guide and training material (installation), evaluation report.
- User documentation: for people using the system: how to install, start and use each feature, with screenshots, tutorials, troubleshooting, FAQs, error messages and what to do, hardware and software requirements.
- Maintenance (technical) documentation: for programmers who will maintain the system: system overview and design, annotated program listings (commented code), variable lists (names, types, purposes, scope), algorithms (pseudo-code or flowcharts), data dictionaries (fields, types, validation), file and database structures, test plans and results, and known limitations.

## Common mistakes

- Saying beta testing is done by the programmers. Beta testers are real external users.
- Calling a value just outside the range "erroneous" in AQA questions. It is boundary (invalid) data; erroneous is data of the wrong kind.
- Choosing direct changeover for a critical system without considering the risk.
- Confusing adaptive maintenance (the environment changed) with perfective (making it better).
- Describing agile as "no planning". Agile plans in short cycles.

## Check questions

1. Explain why requirements must be established with the intended users. [2 marks]
2. (Eduqas) Describe what is investigated in a feasibility study. [4 marks]
3. (Eduqas) Compare interviews and questionnaires as methods of investigation. [4 marks]
4. (Eduqas) Draw a DFD for a library loan: a member gives a book and card to the system, which checks the Members and Books stores and records the loan. [4 marks]
5. Describe what should be designed before a solution is constructed. [4 marks]
6. (Eduqas) Explain the problems of ambiguity in spoken input. [3 marks]
7. Give test data (normal, boundary and erroneous) for a field that accepts ages 16 to 19. [3 marks]
8. Explain the difference between alpha, beta and acceptance testing. [3 marks]
9. (OCR) Compare the waterfall model with agile methodologies. [6 marks]
10. (OCR) Describe two features of extreme programming. [2 marks]
11. (OCR) Explain why the spiral model suits a high-risk project. [2 marks]
12. (OCR, Eduqas) Describe three features of an IDE that help a programmer debug a program. [3 marks]
13. (Eduqas) Explain how version management helps a team of developers. [3 marks]
14. (Eduqas) Recommend a changeover method for a bank's new account system, with reasons. [3 marks]
15. (Eduqas) Explain the three types of maintenance with an example of each. [6 marks]
16. (Eduqas) Describe the contents of maintenance documentation. [4 marks]
17. State four criteria for evaluating a computer system. [4 marks]

## Mark scheme

1. Users know what the system needs to do/the problem best (1); so the system meets their needs and avoids costly changes later (1).
2. Technical: can it be built with available technology/skills (1); economic: do benefits outweigh costs/within budget (1); legal: complies with laws such as data protection (1); operational/schedule: will it work in the organisation/be delivered on time (1).
3. Interviews: detailed answers, follow-up questions (1); but time-consuming/few people (1). Questionnaires: many people quickly, anonymous, easy to analyse (1); but low response/cannot follow up/misunderstood questions (1).
4. External entity Member (1); process "Issue loan" with labelled flows of card and book details (1); data stores Members and Books read for checking (1); data store Loans written (1).
5. Data structures for the data model (1); algorithms (1); modular structure with interfaces (1); user interface (1).
6. Words that sound the same but mean different things (homophones) (1); unclear word boundaries/sentences with several meanings (1); accents and background noise cause misinterpretation, so commands may be wrong (1).
7. Normal e.g. 17 (1); boundary 16 and 19 (and 15, 20 as just invalid) (1); erroneous e.g. "sixteen" or blank (1).
8. Alpha: in-house testing by the developer's testers during development (1). Beta: pre-release version tested by real external users in real conditions (1). Acceptance: client/users check the system meets agreed requirements before sign-off (1).
9. Level-based. Waterfall: sequential stages, each completed before the next; clear documentation and milestones; suits fixed requirements; changes costly; users see the product late. Agile: short iterations with working increments; frequent client feedback; adapts to change; less documentation; harder to predict cost/time. Top band: clear comparison with suitable uses.
10. Any two: pair programming (1); test-driven development (1); client as part of the team/user stories (1); short iterations/frequent releases (1); continuous integration/refactoring (1).
11. Each loop includes risk analysis (1); prototypes are built to resolve the biggest risks early before major investment (1).
12. Any three: breakpoints (1); stepping through code line by line (1); watch windows/variable inspection (1); error messages with line numbers (1); call stack view (1).
13. Records every change, who made it and why (1); allows rolling back to a previous version (1); branching and merging lets several developers work at once without overwriting each other's work (1).
14. Parallel (1); failure would be very costly, so the old system remains as a fallback (1); results can be compared to check the new system is correct (1). Accept pilot with good justification.
15. Corrective: fixing bugs found in use, e.g. a crash when a date is entered (2). Adaptive: changing for a new environment, e.g. new tax law/new OS (2). Perfective: improving or adding features, e.g. faster searching/new report (2).
16. Any four: system design/overview (1); annotated program listings (1); variable lists (1); algorithms (1); data dictionary (1); test plans and results (1).
17. Any four: meets requirements (1); efficient (1); reliable/robust (1); usable (1); maintainable (1); secure (1); within budget/time (1).
