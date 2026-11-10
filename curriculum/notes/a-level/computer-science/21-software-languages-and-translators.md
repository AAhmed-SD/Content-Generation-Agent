---
level: A-level
subject: Computer Science
topic: "Hardware and software, classification of software, levels of language, translators, compilation stages, linkers and loaders"
as_content: "AQA 4.6.1 to 4.6.3 are also AS (7516 3.6.1 to 3.6.3). OCR: applications, utilities, open and closed source and translators are also AS; stages of compilation and linkers, loaders and libraries (1.2.2(e), (f)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.6.1.1", "4.6.1.2", "4.6.1.3", "4.6.1.4", "4.6.2.1", "4.6.3.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.2(a)", "1.2.2(b)", "1.2.2(c)", "1.2.2(d)", "1.2.2(e)", "1.2.2(f)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.4: Levels of computer language", "C1.8: Compilers, interpreters and assemblers", "C2.6: Utility software", "C2.7: Types of software"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Software, languages and translators

This file covers hardware and software, system and application software, operating systems (in outline), utilities and libraries, open source and closed source, bespoke and off-the-shelf software, machine code, assembly and high-level languages, assemblers, compilers and interpreters, bytecode and intermediate code, source and object code, the stages of compilation, translation and execution errors, and linkers and loaders. Operating systems in detail (memory management, scheduling, interrupts) are in [34-operating-systems.md](34-operating-systems.md).

Builds on [GCSE: System software](../../gcse/computer-science/14-system-software.md) and [GCSE: Languages, translators and IDEs](../../gcse/computer-science/08-languages-translators-and-ides.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Software types | System vs application; OS, utilities, libraries, translators | Nature of applications; utilities; open vs closed source | Utilities (C2.6); open source, bespoke, off-the-shelf (C2.7) |
| Languages | Machine code, assembly, imperative high-level | (Paradigms in 1.2.4, file 02) | High-level vs low-level and when each is needed (C1.4) |
| Translators | Assembler, compiler, interpreter; bytecode; source vs object code | Interpreters, compilers, assemblers | Same, with examples |
| Compilation stages | Not required | Lexical analysis, syntax analysis, code generation, optimisation | Lexical analysis, symbol table, syntax analysis, semantic analysis, code generation, optimisation |
| Linkers and loaders | Not required | Linkers, loaders and libraries | Not named |
| Errors | Not named | Not named | Translation errors vs execution errors |

## 4.6.1.1 Relationship between hardware and software

*Refs: AQA 4.6.1.1.*

### What you need to know

- Hardware: the physical components of a computer system (processor, memory, storage, input and output devices, circuit boards).
- Software: the programs (sequences of instructions) and data that run on the hardware.
- They depend on each other: hardware does nothing useful without software to control it, and software needs hardware to run on. The operating system and drivers sit between applications and hardware.

## 4.6.1.2 Classification of software

*Refs: AQA 4.6.1.2 · OCR 1.2.2(a), 1.2.2(c) · Eduqas C2.7: Types of software.*

### What you need to know

- System software manages and controls the computer's hardware and provides a platform for other software: operating systems, utilities, libraries, translators.
- Application software lets users do useful tasks: word processors, spreadsheets, databases, web browsers, games, graphics editors, payroll and stock control systems.
- OCR: justify suitable applications for a purpose (for example a database rather than a spreadsheet for linked customer and order records that many staff update; presentation software for a talk).
- Open source software: the source code is published and users may study, change and share it (usually under a licence such as the GPL). Usually free; community support and many eyes finding bugs; can be customised. But support may be less formal, quality varies, and changes may have to be shared under the same licence.
- Closed source (proprietary) software: only the compiled program is supplied; the code is protected and you buy a licence to use it. Usually professional support, documentation and regular tested updates; but costs money, cannot be changed, and you depend on the vendor.
- Off-the-shelf (generic) software: ready-made for a wide market. Cheaper, available at once, well tested, with support and training material, but may include unneeded features or lack needed ones.
- Bespoke software: written specially for one organisation. Does exactly what is needed and can give a competitive edge, but is expensive, slow to develop, and may have more bugs at first; support depends on the developer.

## 4.6.1.3 System software

*Refs: AQA 4.6.1.3 · OCR 1.2.2(b) · Eduqas C2.6: Utility software.*

### What you need to know

- Operating system: manages the hardware and provides an interface and services for programs and users (next point and file 34).
- Utility programs: small programs that maintain and look after the computer, such as disk defragmenter (rearranges fragmented files into contiguous blocks so they load faster on a hard disk; not needed on SSDs), backup, compression, antivirus/anti-malware, disk cleanup, encryption, file managers, firewall, system monitors.
- Libraries: collections of pre-written, pre-compiled, tested subroutines (for example maths, graphics, file handling) that programs can call. They save development time, are reliable, and can be shared between programs (dynamic link libraries are loaded at run time).
- Translators: convert program source code into machine code (assembler, compiler, interpreter: below).

## 4.6.1.4 Role of an operating system

*Refs: AQA 4.6.1.4.*

### What you need to know

- The OS hides the complexities of the hardware from users and programs. A program asks the OS to "save this file" without knowing how the disk controller works; this is abstraction (a virtual machine view of the computer).
- The OS manages resources, allocating processors (processor scheduling), memory and input/output devices among competing processes, so several programs can run safely at once. Details are in [34-operating-systems.md](34-operating-systems.md).

## 4.6.2.1 Classification of programming languages

*Refs: AQA 4.6.2.1 · Eduqas C1.4: Levels of computer language.*

### What you need to know

- Languages developed from machine code (1940s), through assembly languages (1950s), to high-level languages (FORTRAN, COBOL and on to Python today).
- Low-level languages: machine code and assembly language. Each is specific to one processor family (its instruction set).
  - Machine code: instructions as binary (an opcode and operands) that the processor executes directly.
  - Assembly language: uses mnemonics (such as ADD, LDR, BNE) and labels in place of binary. Usually one assembly instruction translates to one machine code instruction. Translated by an assembler.
- High-level languages are closer to English and mathematical notation and independent of the processor. An imperative high-level language describes a sequence of commands that change the program's state (variables), using constructs like selection, iteration and subroutines; each high-level statement translates into several machine code instructions.

| | Low-level (machine code, assembly) | High-level |
| --- | --- | --- |
| Speed and size | Can be very fast and compact; programmer controls exactly what the hardware does | Usually slower/larger, though modern compilers optimise well |
| Hardware access | Direct access to registers and memory addresses | Usually indirect |
| Portability | Processor-specific | Runs on any machine with a translator |
| Ease | Hard to write, read, debug and maintain; many lines | Easier, fewer lines, built-in structures and libraries |
| Errors | Easy to make, hard to find | Fewer errors; translator checks syntax |

- When to use low-level (Eduqas): device drivers, embedded systems with tiny memory, real-time systems needing exact timing, parts of operating systems and games where speed is critical, and accessing hardware directly. High-level for almost everything else: faster development and easier maintenance.

## 4.6.3.1 Types of program translator

*Refs: AQA 4.6.3.1 · OCR 1.2.2(d) · Eduqas C1.8: Compilers, interpreters and assemblers.*

### What you need to know

- Source code: the program as written by the programmer (in a high-level or assembly language). Object code: the translated machine code (or intermediate code) output by a translator; an executable is object code ready to run.
- Assembler: translates assembly language into machine code, usually one-to-one.
- Compiler: translates the whole high-level program into object code before it runs, producing an executable file.
  - Advantages: the executable runs fast; the program can be distributed without the source (protecting it); no translator needed on the user's machine; the compiler can optimise the whole program.
  - Disadvantages: every change needs recompiling (slower development); errors are reported only after compiling the whole program; the executable only runs on one platform.
- Interpreter: translates and runs the program one statement at a time, every time it runs; no executable is produced.
  - Advantages: stops at the first error with its line, so easier debugging; quick to test small changes; source runs on any machine with the interpreter.
  - Disadvantages: slower to run (each statement is translated each time, including inside loops); the interpreter must be present; the source code must be given to users.
- Use a compiler for finished software for sale and for speed; use an interpreter during development, for scripts, and for teaching.
- Intermediate language (bytecode): some compilers (Java, C#, Python) translate to bytecode, a low-level code for a virtual machine rather than a real processor. The virtual machine (for example the Java Virtual Machine) then interprets or just-in-time compiles the bytecode on each platform. Why: portability ("write once, run anywhere": the same bytecode runs on any device with the VM); faster than interpreting source; the source code is not distributed; the VM can check the code for safety.

## Stages of compilation

*Refs: OCR 1.2.2(e) · Eduqas C1.8: Compilers, interpreters and assemblers.*

### What you need to know

1. Lexical analysis: remove white space and comments; split the source into tokens (keywords, identifiers, operators, literals, punctuation); build the symbol table (Eduqas names symbol table construction as a stage): a record of each identifier with its type, scope and later its memory address. Lexical errors, such as an illegal character or badly formed number, are reported.
2. Syntax analysis: check the tokens follow the grammar of the language (often defined in BNF, file 13), building a parse tree (abstract syntax tree). Syntax errors, such as a missing bracket, are reported.
3. Semantic analysis (Eduqas): check the meaning makes sense: variables declared before use, types compatible in expressions and assignments, correct numbers of parameters. Some treat this as part of syntax analysis (OCR).
4. Code generation: produce object code (machine code or intermediate code) from the syntax tree, allocating memory addresses for variables using the symbol table.
5. Optimisation: improve the code so it runs faster or uses less memory without changing what it does: remove code that can never run, remove repeated calculations, move unchanging calculations out of loops, replace slow instructions with faster ones. Optimisation can happen before and after code generation; it makes compiling slower.

### Worked example

Source line: `total = total + price * 2   # update`

- Lexical analysis drops the comment and spaces and produces tokens: `IDENT(total) ASSIGN IDENT(total) PLUS IDENT(price) TIMES INT(2)`; total and price go in the symbol table.
- Syntax analysis checks this matches `<assignment> ::= <ident> = <expression>` and builds the tree with × below + (precedence).
- Semantic analysis checks total and price are numeric and declared.
- Code generation produces, for example: `LDR R1, price` / `LSL R1, R1, #1` / `LDR R0, total` / `ADD R0, R0, R1` / `STR R0, total`. (Optimisation has already chosen a shift for × 2.)

## Translation and execution errors

*Refs: Eduqas C1.8: Compilers, interpreters and assemblers.*

### What you need to know

- Translation (compile-time) errors are found by the translator before the program runs: syntax errors (`pritn("hi")`, missing colon), and semantic errors such as using an undeclared variable or a type mismatch in a statically typed language.
- Execution (run-time) errors happen while the program runs: division by zero, an array index out of range, a file not found, overflow, running out of memory. Logic errors (wrong output with no crash) are found by testing (file 33).

## Linkers, loaders and libraries

*Refs: OCR 1.2.2(f).*

### What you need to know

- Linker: combines the object code of a program with the object code of the library routines (and other separately compiled modules) it uses into one executable, resolving references (filling in the addresses of external subroutines).
  - Static linking: library code is copied into the executable. The program is self-contained and always has the right version, but is larger and does not benefit from library updates.
  - Dynamic linking: the executable holds only references; libraries (DLLs, shared objects) are loaded at run time. Executables are smaller and libraries are shared in memory and updated in one place, but the program fails if the library is missing or the wrong version.
- Loader: part of the OS that copies an executable (and any dynamic libraries) from storage into main memory, sets up addresses (relocating them if the program is not loaded where it expected), and starts it.

## Common mistakes

- Saying an interpreter "produces machine code that is saved". It does not save a translated version.
- Saying compiled programs "run on any computer". They run only on the platform they were compiled for.
- Confusing a linker (combines object code files) with a loader (puts the executable into memory).
- Listing stages of compilation in the wrong order: lexical, syntax (and semantic), code generation, optimisation.

## Check questions

1. Define hardware and software and explain how they depend on each other. [3 marks]
2. Give two examples of utility programs and what each does. [2 marks]
3. Explain what is meant by "the operating system hides the complexities of the hardware". [2 marks]
4. Give two advantages and one disadvantage of writing in assembly language rather than a high-level language. [3 marks]
5. Describe two differences between compilation and interpretation. [4 marks]
6. Explain why some compilers produce bytecode, and how the bytecode is run. [3 marks]
7. (OCR, Eduqas) Describe what happens during lexical analysis and syntax analysis. [4 marks]
8. (OCR, Eduqas) Give two examples of code optimisation. [2 marks]
9. (OCR) Explain the role of a linker and compare static and dynamic linking. [4 marks]
10. (Eduqas) Explain the difference between a translation error and an execution error, with an example of each. [4 marks]
11. (OCR, Eduqas) A small charity needs a donor database. Discuss whether it should use open source or closed source software. [4 marks]
12. (Eduqas) Compare bespoke and off-the-shelf software for a large supermarket's stock control system. [4 marks]

## Mark scheme

1. Hardware: physical components (1); software: programs/instructions and data (1); hardware needs software to control it and software needs hardware to run on (1).
2. Any two, each with function: defragmenter (rearranges file blocks contiguously), backup, antivirus, compression, disk cleanup, encryption (2).
3. Programs/users can use hardware through simple OS services without knowing how the hardware works (1); e.g. saving a file without controlling the disk directly/the OS provides an abstraction or virtual machine (1).
4. Advantages: fast/efficient code; direct control of hardware/registers; small memory use (2). Disadvantage: hard to write/debug/maintain, or processor-specific so not portable (1).
5. Any two pairs: compiler translates the whole program before running, interpreter translates line by line as it runs (2); compiler produces an executable, interpreter does not (2); compiled code runs faster, interpreted code is translated every time (2); interpreter stops at the first error with its location, compiler reports errors after compiling (2).
6. For portability: bytecode can run on any platform with the virtual machine (1); the source code need not be distributed/faster than interpreting source (1); the VM interprets or just-in-time compiles the bytecode into the host's machine code (1).
7. Lexical: removes comments/white space (1); splits code into tokens and builds the symbol table (1). Syntax: checks tokens follow the language's grammar rules (1); builds a parse/abstract syntax tree and reports syntax errors (1).
8. Any two: removing unreachable/redundant code; moving loop-invariant calculations out of loops; replacing operations with faster ones (e.g. shift for × 2); avoiding repeated calculations (2).
9. Linker combines the program's object code with library/module object code into one executable, resolving addresses of external routines (2). Static: library code copied in, larger but self-contained (1). Dynamic: library loaded at run time, smaller and shared/updated centrally but may be missing/wrong version (1).
10. Translation error found by the translator before running (1), e.g. a syntax error such as a missing bracket (1). Execution error occurs while running (1), e.g. division by zero/index out of range (1).
11. Open source: no licence cost, which suits a charity's budget; can be adapted; community support (2). Closed source: professional support and updates, more polished/easier for non-specialist staff, but licence fees (1). Reasoned conclusion (1).
12. Bespoke: built exactly for the supermarket's processes and scale; can integrate with existing systems; competitive advantage; but costly and slow to develop (2). Off-the-shelf: cheaper, immediately available, tested, with support, but may not fit processes or scale (1). Justified recommendation (1).
