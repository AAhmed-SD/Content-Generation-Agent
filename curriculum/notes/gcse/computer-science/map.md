# GCSE Computer Science: spec map

Every spec point of the four boards, in each board's own order, with the notes file that covers it.

- AQA 8525 numbers its content 3.1.1 to 3.7.2. Section 3.5 (networks) and 3.8 (impacts) have no numbered sub-points, so this map splits 3.5 by its own sub-headings. The map follows the 2025 specification (first teaching September 2025, first exams 2027). The 2020 specification (exams 2022 to 2026) has the same numbering; the few points only in the 2020 version are listed at the end of the AQA table and are covered too.
- OCR J277 numbers its content 1.1.1 to 2.5.2.
- Pearson Edexcel 1CP2 numbers its content 1.1.1 to 6.6.3.
- Eduqas C500QS has numbered sections (1 Hardware to 11 Impacts in Component 1) with unnumbered content headings inside them. This map uses "section number: content heading" as the reference, for example "1: Central processing unit". Component 2 is referenced by its stage heading, for example "C2: Implementation".

GCSE Computer Science is not tiered, so there is no tier column.

`refs_checked: false`: references were taken from the boards' specifications (AQA website subject content and the 2020 spec PDF v1.2; OCR spec PDF v3.1; Edexcel spec PDF Issue 1; Eduqas spec PDF 2020) and still need a person to check them.

## Papers

| Board | Paper | What it examines |
| --- | --- | --- |
| AQA 8525 | Paper 1: Computational thinking and programming skills (written, 2 h, 90 marks) | 3.1 and 3.2. Algorithms are shown in AQA pseudo-code; answers in code use C#, Python 3 or VB.NET (the school's chosen option) |
| AQA 8525 | Paper 2: Computing concepts (written, 1 h 45 min, 90 marks) | 3.3 to 3.8, including writing SQL |
| OCR J277 | J277/01 Computer systems (written, 1 h 30 min, 80 marks) | 1.1 to 1.6 |
| OCR J277 | J277/02 Computational thinking, algorithms and programming (written, 1 h 30 min, 80 marks) | 2.1 to 2.5. Code in the paper uses the OCR Exam Reference Language; Section B answers may use the Reference Language or a high-level language |
| Edexcel 1CP2 | Paper 1 1CP2/01: Principles of Computer Science (written, 1 h 30 min, 75 marks, no calculator) | Topics 1 to 5 |
| Edexcel 1CP2 | Paper 2 1CP2/02: Application of Computational Thinking (on-screen, 2 h, 75 marks) | Topic 6, in Python 3, with the Programming Language Subset (PLS) supplied |
| Eduqas C500QS | Component 1: Understanding Computer Science (written, 1 h 45 min, 100 marks) | Sections 1 to 11 |
| Eduqas C500QS | Component 2: Computer Programming (on-screen, 2 h, 80 marks) | Investigation, design, implementation, testing and refinement in Python 3, on a scenario released the September before |

## Files

- [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md): Computational thinking and designing algorithms
- [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md): Searching and sorting algorithms
- [03-programming-fundamentals.md](03-programming-fundamentals.md): Programming fundamentals: data types, variables, operators and constructs
- [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md): Data structures, strings, files and random numbers
- [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md): Subprograms, structured programming, libraries and interfaces
- [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md): Robust programs, validation, authentication, errors and testing
- [07-boolean-logic.md](07-boolean-logic.md): Boolean logic
- [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md): Programming languages, translators and IDEs
- [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md): Number systems and binary arithmetic
- [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md): Representing text, images and sound
- [11-units-and-compression.md](11-units-and-compression.md): Units of data and compression
- [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md): The CPU, systems architecture and embedded systems
- [13-memory-and-storage.md](13-memory-and-storage.md): Memory and storage
- [14-system-software.md](14-system-software.md): Hardware, software, operating systems and utilities
- [15-networks.md](15-networks.md): Networks, the internet and topologies
- [16-protocols-and-layers.md](16-protocols-and-layers.md): Protocols, standards and layers
- [17-cyber-security.md](17-cyber-security.md): Cyber security and network security
- [18-databases-and-sql.md](18-databases-and-sql.md): Relational databases and SQL
- [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md): Ethical, legal, cultural and environmental impacts

## AQA 8525

| Ref | Content | File |
| --- | --- | --- |
| 3.1.1 | Representing algorithms: decomposition, abstraction, pseudo-code, flowcharts, trace tables | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 3.1.2 | Efficiency of algorithms (time) | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 3.1.3 | Searching: linear and binary search | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 3.1.4 | Sorting: merge sort and bubble sort | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 3.2.1 | Data types | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.2 | Programming concepts: variables, constants, assignment, selection, iteration, nesting, identifiers | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.3 | Arithmetic operations, including DIV and MOD | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.4 | Relational operations | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.5 | Boolean operations (NOT, AND, OR) | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.6 | Data structures: 1D and 2D arrays, records | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 3.2.7 | Input and output | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 3.2.8 | String handling and type conversion | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 3.2.9 | Random number generation | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 3.2.10 | Structured programming and subroutines | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 3.2.11 | Robust and secure programming: validation, authentication, testing, errors | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 3.3.1 | Number bases | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 3.3.2 | Converting between number bases | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 3.3.3 | Units of information | [11-units-and-compression.md](11-units-and-compression.md) |
| 3.3.4 | Binary arithmetic: addition and logical shifts | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 3.3.5 | Character encoding: ASCII and Unicode | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 3.3.6 | Representing images | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 3.3.7 | Representing sound | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 3.3.8 | Data compression: Huffman coding and RLE | [11-units-and-compression.md](11-units-and-compression.md) |
| 3.4.1 | Hardware and software | [14-system-software.md](14-system-software.md) |
| 3.4.2 | Boolean logic: gates, truth tables, circuits, expressions | [07-boolean-logic.md](07-boolean-logic.md) |
| 3.4.3 | Software classification: system and application software, OS, utilities | [14-system-software.md](14-system-software.md) |
| 3.4.4 | Classification of programming languages and translators | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 3.4.5 | Systems architecture: CPU, fetch-execute, performance, embedded systems | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 3.4.5 | Systems architecture: memory, secondary storage, cloud storage | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 3.5 | Networks: definition, PAN, LAN, WAN, wired and wireless | [15-networks.md](15-networks.md) |
| 3.5 | Protocols: TCP, IP, HTTP, HTTPS, SMTP, IMAP | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 3.5 | Network security: authentication, encryption, firewall, MAC address filtering | [17-cyber-security.md](17-cyber-security.md) |
| 3.5 | The 4-layer TCP/IP model | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 3.6.1 | Fundamentals of cyber security | [17-cyber-security.md](17-cyber-security.md) |
| 3.6.2 | Cyber security threats; penetration testing | [17-cyber-security.md](17-cyber-security.md) |
| 3.6.2.1 | Social engineering | [17-cyber-security.md](17-cyber-security.md) |
| 3.6.2.2 | Malicious code (malware) | [17-cyber-security.md](17-cyber-security.md) |
| 3.6.3 | Methods to detect and prevent threats | [17-cyber-security.md](17-cyber-security.md) |
| 3.7.1 | Relational databases | [18-databases-and-sql.md](18-databases-and-sql.md) |
| 3.7.2 | SQL | [18-databases-and-sql.md](18-databases-and-sql.md) |
| 3.8 | Ethical, legal and environmental impacts, including privacy | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 3.5 (2020 spec only) | Star and bus topologies | [15-networks.md](15-networks.md) |
| 3.5 (2020 spec only) | Ethernet, Wi-Fi, UDP and FTP protocols and their layers | [16-protocols-and-layers.md](16-protocols-and-layers.md) |

## OCR J277

| Ref | Content | File |
| --- | --- | --- |
| 1.1.1 | Architecture of the CPU | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 1.1.2 | CPU performance | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 1.1.3 | Embedded systems | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 1.2.1 | Primary storage (memory) | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 1.2.2 | Secondary storage | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 1.2.3 | Units | [11-units-and-compression.md](11-units-and-compression.md) |
| 1.2.4 | Data storage: numbers | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 1.2.4 | Data storage: characters, images, sound | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 1.2.5 | Compression | [11-units-and-compression.md](11-units-and-compression.md) |
| 1.3.1 | Networks and topologies | [15-networks.md](15-networks.md) |
| 1.3.2 | Wired and wireless networks, IP and MAC addressing | [15-networks.md](15-networks.md) |
| 1.3.2 | Standards, protocols and layers | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 1.3.2 | Encryption | [17-cyber-security.md](17-cyber-security.md) |
| 1.4.1 | Threats to computer systems and networks | [17-cyber-security.md](17-cyber-security.md) |
| 1.4.2 | Identifying and preventing vulnerabilities | [17-cyber-security.md](17-cyber-security.md) |
| 1.5.1 | Operating systems | [14-system-software.md](14-system-software.md) |
| 1.5.2 | Utility software | [14-system-software.md](14-system-software.md) |
| 1.6.1 | Ethical, legal, cultural and environmental impact | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 2.1.1 | Computational thinking | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 2.1.2 | Designing, creating and refining algorithms | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 2.1.3 | Searching and sorting algorithms | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 2.2.1 | Programming fundamentals | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 2.2.2 | Data types and casting | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 2.2.3 | Additional techniques: strings, files, records, arrays, random numbers | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 2.2.3 | Additional techniques: sub programs | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 2.2.3 | Additional techniques: SQL to search for data | [18-databases-and-sql.md](18-databases-and-sql.md) |
| 2.3.1 | Defensive design | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 2.3.2 | Testing | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 2.4.1 | Boolean logic | [07-boolean-logic.md](07-boolean-logic.md) |
| 2.5.1 | Languages and translators | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 2.5.2 | The Integrated Development Environment (IDE) | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |

## Pearson Edexcel 1CP2

| Ref | Content | File |
| --- | --- | --- |
| 1.1.1 | Decomposition and abstraction | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 1.1.2 | Benefits of subprograms | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 1.2.1 | Follow and write algorithms: sequence, selection, repetition, iteration, input, processing, output | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 1.2.2 | Variables, constants, 1D and 2D data structures in algorithms | [03-programming-fundamentals.md](03-programming-fundamentals.md), [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 1.2.3 | Arithmetic, relational and logical operators in algorithms | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 1.2.4 | Determine output; trace tables | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 1.2.5 | Error types; correcting logic errors | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 1.2.6 | Standard algorithms: bubble sort, merge sort, linear search, binary search | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 1.2.7 | Evaluating fitness for purpose and efficiency | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 1.3.1 | Truth tables with up to three inputs | [07-boolean-logic.md](07-boolean-logic.md) |
| 2.1.1 | Binary represents data and instructions; number of states | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.1.2 | Unsigned and two's complement integers | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.1.3 | Converting denary and 8-bit binary | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.1.4 | Binary addition; logical and arithmetic shifts | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.1.5 | Overflow | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.1.6 | Hexadecimal | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 2.2.1 | 7-bit ASCII | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 2.2.2 | Bitmap images | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 2.2.3 | Sound | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 2.2.4 | Limits of binary representation | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 2.3.1 | Binary multiples (kibibyte to tebibyte); file sizes | [11-units-and-compression.md](11-units-and-compression.md) |
| 2.3.2 | Compression: lossless and lossy | [11-units-and-compression.md](11-units-and-compression.md) |
| 3.1.1 | Stored program concept; CPU, buses and the fetch-decode-execute cycle | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 3.1.2 | Secondary storage: magnetic, optical, solid state | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 3.1.3 | Embedded systems | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 3.2.1 | Operating systems | [14-system-software.md](14-system-software.md) |
| 3.2.2 | Utility software | [14-system-software.md](14-system-software.md) |
| 3.2.3 | Robust software: audit trails, code reviews | [17-cyber-security.md](17-cyber-security.md) |
| 3.3.1 | Low-level and high-level languages | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 3.3.2 | Interpreters and compilers | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 4.1.1 | Why computers are networked | [15-networks.md](15-networks.md) |
| 4.1.2 | LAN and WAN | [15-networks.md](15-networks.md) |
| 4.1.3 | Structure of the internet: IP addressing, routers | [15-networks.md](15-networks.md) |
| 4.1.4 | Wired and wireless performance | [15-networks.md](15-networks.md) |
| 4.1.5 | Network speeds; transmission time | [15-networks.md](15-networks.md) |
| 4.1.6 | Network and email protocols | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 4.1.7 | The 4-layer TCP/IP model | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 4.1.8 | Topologies: bus, star, mesh | [15-networks.md](15-networks.md) |
| 4.2.1 | Network security: identifying vulnerabilities and protecting networks | [17-cyber-security.md](17-cyber-security.md) |
| 5.1.1 | Environmental issues | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 5.2.1 | Personal data: ethical and legal issues | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 5.2.2 | AI, machine learning and robotics | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 5.2.3 | Intellectual property protection | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 5.3.1 | Malware, technical vulnerabilities and social engineering | [17-cyber-security.md](17-cyber-security.md) |
| 5.3.2 | Protecting digital systems and data | [17-cyber-security.md](17-cyber-security.md) |
| 6.1.1 | Decomposition and abstraction in programs | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 6.1.2 | Read, write, analyse and refine programs | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.1.3 | Convert algorithms into programs | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md) |
| 6.1.4 | Readability: layout, indentation, comments, identifiers, white space | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 6.1.5 | Identify, locate and correct errors | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 6.1.6 | Evaluate fitness for purpose and efficiency | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md), [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 6.2.1 | Structural components of programs | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.2.2 | Sequence, selection, repetition, iteration; single entry and exit | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.3.1 | Primitive and structured data types | [03-programming-fundamentals.md](03-programming-fundamentals.md), [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 6.3.2 | Variables and constants | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.3.3 | String manipulation | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 6.4.1 | User input | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.4.2 | Reading and writing CSV text files | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 6.4.3 | Validation: length, presence, range, pattern | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 6.4.4 | Authentication: ID and password, lookup | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 6.5.1 | Arithmetic operators | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.5.2 | Relational operators | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.5.3 | Logical operators | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 6.6.1 | Built-in, library and user-devised subprograms | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 6.6.2 | Functions and procedures; parameters and return values | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 6.6.3 | Global and local variables | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |

## Eduqas C500QS

| Ref | Content | File |
| --- | --- | --- |
| 1: Central processing unit | CPU, Von Neumann components and registers, fetch-decode-execute, performance | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 1: Primary storage | RAM, ROM, flash, cache, virtual memory | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 1: Additional hardware components | GPUs, sound cards, motherboards | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 1: Secondary storage | Optical, magnetic, solid state, cloud; capacity, durability, portability, speed, cost | [13-memory-and-storage.md](13-memory-and-storage.md) |
| 1: Embedded systems | Characteristics, purpose and examples | [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) |
| 2: Logical operators | AND, OR, NOT, XOR in truth tables and problems | [07-boolean-logic.md](07-boolean-logic.md) |
| 2: Boolean logic | Simplifying Boolean expressions with identities | [07-boolean-logic.md](07-boolean-logic.md) |
| 3: Networks | Characteristics, topologies, hardware, standards | [15-networks.md](15-networks.md) |
| 3: Networks | OSI model, protocols, TCP/IP packets, packet switching | [16-protocols-and-layers.md](16-protocols-and-layers.md) |
| 3: Networks | Routing traffic and routing costs | [15-networks.md](15-networks.md) |
| 3: Internet | DNS, URLs, web browsers | [15-networks.md](15-networks.md) |
| 3: Cybersecurity | Threats and protection | [17-cyber-security.md](17-cyber-security.md) |
| 4: Data types | Integer, real, character, string, Boolean | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 4: Representation of numbers | Bases, two's complement, sign and magnitude, addition, subtraction, overflow, underflow, arithmetic shifts | [09-number-systems-and-binary-arithmetic.md](09-number-systems-and-binary-arithmetic.md) |
| 4: Representation of characters | ASCII and Unicode | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 4: Representation of graphics | Resolution, colour depth, storage | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 4: Representation of sound | Sampling rate, storage | [10-representing-text-images-and-sound.md](10-representing-text-images-and-sound.md) |
| 4: Storage requirements | Bit to petabyte (base 2); capacity calculations | [11-units-and-compression.md](11-units-and-compression.md) |
| 4: Compression | Lossy, lossless, compression ratios | [11-units-and-compression.md](11-units-and-compression.md) |
| 5: Data structures | Records, 1D and 2D arrays; choosing a structure | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 5: File design | Designing files and records | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| 6: Operating systems | Purpose; managing CPU, multitasking, interrupts, memory, backing store, peripherals, interface, security | [14-system-software.md](14-system-software.md) |
| 6: Utility software | The listed utilities | [14-system-software.md](14-system-software.md) |
| 7: Levels of computer language | High-level and low-level languages | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 8: Algorithms | Pseudo-code and flowcharts; constructs, counts and rogue values, string handling, operators | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| 8: Algorithms | Subroutines; local and global variables | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| 8: Sorting | Merge sort and bubble sort | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 8: Searching | Linear search and binary search | [02-searching-and-sorting-algorithms.md](02-searching-and-sorting-algorithms.md) |
| 8: Validation and verification | Techniques and algorithms | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 9: Software tools | IDE tools, linker, loader, libraries, debugger | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 10: Translators | Compilers, interpreters, assemblers; stages of compilation | [08-languages-translators-and-ides.md](08-languages-translators-and-ides.md) |
| 10: Translators | Types of programming error | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| 11: Impacts | Ethical, legal, cultural, environmental and privacy issues | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 11: Legislation | GDPR and DPA 2018, CMA 1990, CDPA 1988, Creative Commons, RIPA 2000, Telecommunications Regulations 2000, FOI 2000 | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| 11: Professional standards | Codes of ethics and conduct | [19-impacts-ethics-and-law.md](19-impacts-ethics-and-law.md) |
| C2: Investigation | Decomposition, abstraction, analysing requirements | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| C2: Design | Interface, data structures, pseudo-code for validation, data handling and authentication | [01-computational-thinking-and-algorithm-design.md](01-computational-thinking-and-algorithm-design.md), [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| C2: Implementation | Variables, data types, constructs | [03-programming-fundamentals.md](03-programming-fundamentals.md) |
| C2: Implementation | Files, records, lists, tuples, dictionaries, slicing, strings | [04-data-structures-strings-and-files.md](04-data-structures-strings-and-files.md) |
| C2: Implementation | Functions, objects, libraries, GUIs, subroutines | [05-subprograms-and-structured-programming.md](05-subprograms-and-structured-programming.md) |
| C2: Implementation | Validation, authentication, style and annotation | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| C2: Testing | Test strategy, typical, extreme and erroneous data | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
| C2: Refinement | Changing to new requirements; efficiency; evaluation | [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md) |
