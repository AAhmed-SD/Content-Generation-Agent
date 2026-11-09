---
level: GCSE
subject: Computer Science
topic: "Programming languages, translators and IDEs"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.4.4"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.5.1", "2.5.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["3.3.1", "3.3.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["7: Levels of computer language", "9: Software tools", "10: Translators"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Programming languages, translators and IDEs

This file covers high-level and low-level languages (machine code and assembly language), why translators are needed, compilers, interpreters and assemblers, the stages of compilation (Eduqas), and the tools in an Integrated Development Environment.

## Overview

A processor can only run machine code: binary instructions for its own instruction set. Programs written in anything else must be translated first.

### Board differences

- AQA 8525: 3.4.4 (Paper 2). Machine code and assembly as low-level; assembly has a 1:1 correspondence with machine code and is used for embedded systems and hardware control. All three translators. AQA's detail: compilers and assemblers produce machine code directly; an interpreter does not produce machine code, it calls its own machine-code subroutines to carry out each instruction. No IDE content.
- OCR J277: 2.5.1 and 2.5.2 (J277/02). High- and low-level languages, compilers and interpreters. Assemblers are not required. IDE tools: editors, error diagnostics, run-time environment, translators.
- Edexcel 1CP2: 3.3.1 and 3.3.2 (Paper 1). Characteristics and purposes of low- and high-level languages; how an interpreter differs from a compiler.
- Eduqas C500QS: 7 Levels of language, 9 Software tools and 10 Translators. Eduqas has the longest IDE list (editor, automatic formatting, line numbering and colour coding, linker, libraries, routines, standard functions, loader, debugger, syntax error detection, error diagnostics, trace, break point, variable watch, memory inspector, statement completion, code optimisation, compilation and interpretation) and the stages of compilation (lexical, syntax and semantic analysis, code generation, code optimisation). Error types from section 10 are in [06-robust-programs-and-testing.md](06-robust-programs-and-testing.md).

## High-level and low-level languages

*Refs: AQA 3.4.4 · OCR 2.5.1 · Edexcel 3.3.1 · Eduqas 7: Levels of computer language.*

### What you need to know

- Low-level languages are close to the hardware:
  - Machine code: binary instructions run directly by the processor. Specific to one processor or family (its instruction set).
  - Assembly language: short mnemonics such as `LDA`, `ADD`, `STA` standing for machine code instructions. Each assembly instruction matches one machine code instruction (1:1).
- High-level languages (Python, C#, Java, VB.NET) use English-like keywords and maths notation. One statement may become many machine code instructions. They are portable: the same code can be translated for different processors.
- Why most programs are written in high-level languages: easier and quicker to write, read and debug; portable; built-in structures and libraries.
- When low-level languages are used: when code must be very fast or very small, must control hardware directly (device drivers, embedded systems with little memory), or must use specific processor features.

### Explained

The same task in three forms:

```python
total = total + 5          # high-level: one line
```

```
LDA total      ; load total into the accumulator
ADD #5         ; add 5
STA total      ; store the result back in total
```

The assembly is three instructions. The machine code is the same three instructions as binary patterns (opcode and operand), for example `0001 1010 ...`. The exact codes depend on the processor.

| | High-level | Low-level |
| --- | --- | --- |
| Ease of writing and reading | Easy | Hard |
| Portability | Portable across processors | Tied to one processor family |
| Control of hardware and memory | Limited | Direct |
| Speed and size of the final program | Usually larger and a little slower | Can be made very fast and small |
| Translation | Compiler or interpreter | Assembler (assembly); none (machine code) |

### Common mistakes

- Saying low-level languages are "easier for the computer to understand". The computer only runs machine code; assembly still needs translating.
- Saying high-level code runs faster. Well-written low-level code is usually faster.

## Translators: compilers, interpreters and assemblers

*Refs: AQA 3.4.4 · OCR 2.5.1 · Edexcel 3.3.2 · Eduqas 10: Translators.*

### What you need to know

- A translator converts source code into a form the processor can run.
- Compiler: translates the whole high-level program into machine code (an executable file) in one go, before it runs.
  - The executable runs fast and can be shared without the source code (protecting it), and without the compiler.
  - Errors are reported together at the end of compilation; the program cannot run until all syntax errors are fixed.
  - Compiling takes time after every change. The executable only runs on the type of processor/platform it was compiled for.
- Interpreter: translates and runs the program one statement at a time.
  - Stops at the first error and shows where it is, so it is good for testing and debugging during development.
  - Runs more slowly, because each line is translated every time it runs. The user needs the interpreter, and the source code must be shared.
- Assembler: translates assembly language into machine code (AQA, Eduqas; not OCR).

### Explained

A compiler is like translating a whole book before publishing it: slow to prepare, but readers get a finished book. An interpreter is like a live interpreter at a meeting: you can stop at any sentence, but the translation happens again every time.

When to use each:

| Situation | Translator |
| --- | --- |
| Writing and debugging a new program | Interpreter |
| Selling a finished game that must run fast and keep the code secret | Compiler |
| Writing a device driver in assembly | Assembler |

Python is usually interpreted (strictly, it is compiled to bytecode which is then interpreted). You do not need this detail.

### Common mistakes

- Saying an interpreter "produces machine code". It does not produce an executable file.
- Saying a compiler "translates line by line".

## Stages of compilation (Eduqas)

*Refs: Eduqas 10: Translators.*

### What you need to know

1. Lexical analysis: removes white space and comments, and breaks the source into tokens (keywords, identifiers, operators, values). Identifiers are added to a symbol table.
2. Syntax analysis: checks the tokens follow the grammar rules of the language (for example, brackets match). Syntax errors are reported here.
3. Semantic analysis: checks the code makes sense, for example variables are declared before use and types are compatible (adding a string to an integer).
4. Code generation: produces machine code (object code) for the program.
5. Code optimisation: improves the code so it runs faster or uses less memory, for example removing instructions that are never reached.

### Explained

For `total = total + 5 # add bonus`:

1. Lexical: the comment is removed; tokens are `total`, `=`, `total`, `+`, `5`.
2. Syntax: identifier, assignment, expression: valid.
3. Semantic: `total` exists and is a number, so `+ 5` is allowed.
4. Code generation: load, add, store instructions.
5. Optimisation: if the same value was loaded just before, the extra load can be removed.

## Integrated Development Environments (IDEs)

*Refs: OCR 2.5.2 · Eduqas 9: Software tools.*

### What you need to know

An IDE is a single program with the tools needed to write, run, test and debug code.

- Editor: where code is typed, with:
  - Automatic formatting and indentation.
  - Automatic line numbering: makes errors easy to find from messages.
  - Colour coding (syntax highlighting): keywords, strings and comments in different colours, making typos stand out.
  - Statement (auto) completion: suggests and finishes keywords and identifiers.
- Error diagnostics and syntax error detection: highlight errors and explain them, often before the code is run.
- Run-time environment: runs the program inside the IDE and shows output and run-time errors.
- Translator: a built-in compiler and/or interpreter.
- Debugger, with:
  - Break points: pause the program at a chosen line.
  - Stepping/trace: run one line at a time and see the path taken.
  - Variable watch: show the values of chosen variables as the program runs.
  - Memory inspector: show the contents of memory locations.
- (Eduqas) Linker: joins the compiled code with library code and other modules into one executable. Loader: copies the executable into main memory so it can run. Libraries, routines and standard functions: ready-made, tested code that can be called. Code optimisation: improves the efficiency of the translated code.

### Worked example

A program gives the wrong total but no error message. Explain how IDE tools help.

1. It is a logic error, so error diagnostics will not find it.
2. Set a break point at the start of the loop that builds the total.
3. Step through the loop line by line with a variable watch on `total` and the loop counter.
4. Compare the watched values with a trace table done by hand; the first difference shows the faulty line.

### Common mistakes

- Saying the debugger "fixes errors". It helps you find them.
- Naming tools without saying how they help the programmer. Marks usually need the use as well as the name.

## Check questions

1. Give two characteristics of a low-level language. [2 marks]
2. Explain why most programs are written in high-level languages. [2 marks]
3. Give one situation where assembly language would be chosen over a high-level language, and explain why. [2 marks]
4. Compare a compiler and an interpreter. [4 marks]
5. A company sells a photo editor. Explain why it would distribute a compiled version. [2 marks]
6. Describe how two features of an IDE help a programmer find a logic error. [4 marks]
7. (Eduqas) State the stage of compilation at which comments are removed, and the stage at which a missing bracket is detected. [2 marks]
8. (AQA) Explain why an assembler is needed. [2 marks]

## Mark scheme

1. Any two: machine code is binary / assembly uses mnemonics (1); specific to one processor (family) (1); one assembly instruction translates to one machine code instruction (1); gives direct control of hardware/memory (1).
2. Easier/quicker to write, read and debug (English-like) (1); portable between processors / has built-in functions and structures (1).
3. E.g. a device driver or an embedded system with very little memory (1); low-level code can be smaller/faster and controls hardware directly (1).
4. Compiler translates the whole program at once; interpreter translates and runs one line at a time (1). Compiler produces an executable file; interpreter does not (1). Compiled code runs faster; interpreted code is translated every run (1). Compiler lists errors at the end; interpreter stops at the first error, which helps debugging (1).
5. The executable runs without the user needing a translator / runs faster (1); the source code is not shared, so it cannot easily be copied or changed (1).
6. Two of: break point pauses the program at a chosen line so the state can be inspected (2); stepping runs one line at a time to see the path taken (2); variable watch shows how values change to find where they go wrong (2).
7. Lexical analysis (1); syntax analysis (1).
8. The processor can only run machine code (1); the assembler converts assembly mnemonics into the matching machine code instructions (1).
