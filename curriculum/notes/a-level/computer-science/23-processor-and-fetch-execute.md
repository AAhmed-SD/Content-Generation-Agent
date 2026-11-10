---
level: A-level
subject: Computer Science
topic: "Computer architecture: components and buses, stored program concept, processor and registers, fetch-execute cycle, interrupts, performance, pipelining, CISC and RISC, GPUs and parallel processing"
as_content: "AQA 4.7.1, 4.7.2, 4.7.3.1, 4.7.3.2 and 4.7.3.7 are also AS; interrupts (4.7.3.6) are A-level only. OCR: 1.1.1 (except pipelining), CISC and RISC, and multicore and parallel systems are also AS; pipelining (1.1.1(d)) and GPUs (1.1.2(b)) are A-level only; interrupts (1.2.1(c)) are also AS."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.7.1.1", "4.7.2.1", "4.7.3.1", "4.7.3.2", "4.7.3.6", "4.7.3.7"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.1.1(a)", "1.1.1(b)", "1.1.1(c)", "1.1.1(d)", "1.1.1(e)", "1.1.2(a)", "1.1.2(b)", "1.1.2(c)", "1.2.1(c)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.1: Hardware and communication", "C2.1: Architecture", "C2.1: Fetch-execute cycle"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# The processor and the fetch-execute cycle

This file covers the internal components of a computer and the address, data and control buses, von Neumann and Harvard architectures, the stored program concept, the parts of the processor and its registers, the fetch-execute cycle in register transfer detail, interrupts and interrupt service routines, factors affecting performance, pipelining, CISC and RISC, GPUs, and multicore and parallel systems including the limits of parallelisation. Instruction sets, addressing modes and assembly language are in [24-assembly-language-and-addressing-modes.md](24-assembly-language-and-addressing-modes.md).

Builds on [GCSE: CPU and embedded systems](../../gcse/computer-science/12-cpu-and-embedded-systems.md) (CPU components, fetch-execute in outline, clock speed, cores, cache) and [GCSE: Memory and storage](../../gcse/computer-science/13-memory-and-storage.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Registers | PC, CIR, MAR, MBR, status register, general-purpose | PC, ACC, MAR, MDR, CIR | Fetch-execute, reading from RAM into registers |
| Buses and I/O | Address, data, control buses; I/O controllers; addressable memory | Data, address and control buses | Components and how they connect |
| Architectures | Von Neumann and Harvard | Von Neumann, Harvard and contemporary | Von Neumann and contemporary |
| Interrupts | Role, ISRs, effect on fetch-execute, saving the volatile environment | Interrupts, ISRs, role in FDE cycle (1.2.1(c)) | Interrupts and priorities (C2.6, file 34) |
| Performance | Cores, cache, clock speed, word length, address and data bus width | Clock speed, cores, cache; pipelining | Types of memory and caching |
| Processor types | Not named | CISC and RISC; GPUs; multicore and parallel | Parallel processing, limits, and run-time calculations |

AQA calls it the memory buffer register (MBR); OCR calls it the memory data register (MDR). They are the same register.

## 4.7.1.1 Internal hardware components of a computer

*Refs: AQA 4.7.1.1 · OCR 1.1.1(a), 1.1.1(e) · Eduqas C2.1: Hardware and communication, Architecture.*

### What you need to know

- Processor: fetches, decodes and executes instructions and processes data.
- Main memory (RAM): holds the programs and data currently in use. It is addressable: memory is divided into locations, each with a unique address, and the processor reads or writes one location by giving its address.
- A bus is a set of parallel wires that carries signals between components.
  - Address bus: carries the address of the memory location (or I/O port) to be read or written. One-way: from processor to memory. Its width sets how many locations can be addressed: n lines give 2ⁿ addresses.
  - Data bus: carries data and instructions between the processor, memory and I/O controllers. Two-way. Its width sets how many bits move in one transfer.
  - Control bus: carries control and timing signals: memory read, memory write, clock, interrupt request, bus request, reset. Two-way (individual lines are one-way).
- I/O controllers: circuits that connect the processor and buses to a peripheral device (keyboard, disk, printer). They translate between the device's signals and the bus, and buffer data, so the processor need not know the details of each device.
- Von Neumann architecture: instructions and data share one memory and one set of buses. Simple and flexible (memory can be divided between program and data as needed), but instructions and data cannot be fetched at the same time: the von Neumann bottleneck. Used in general-purpose computers (PCs, laptops, servers).
- Harvard architecture: separate memories and buses for instructions and data. An instruction and data can be fetched at the same time, so it is faster; the two memories can have different sizes and word lengths (for example instructions in ROM). Used in embedded systems and digital signal processors (DSPs), microcontrollers.
- Contemporary (modified Harvard) architecture (OCR, Eduqas): most modern CPUs use a von Neumann main memory but separate instruction and data caches (Harvard at the cache level), getting the benefits of both.

## 4.7.2.1 The stored program concept

*Refs: AQA 4.7.2.1.*

### What you need to know

- The stored program concept: machine code instructions are stored in main memory, alongside data, and are fetched and executed one after another (serially) by a processor that performs arithmetic and logical operations.
- Because programs are just data in memory, a computer can run any program by loading it, rather than being rewired. (Compare the Universal Turing machine in file 15.)

## 4.7.3.1 The processor and its components

*Refs: AQA 4.7.3.1 · OCR 1.1.1(a).*

### What you need to know

- Arithmetic logic unit (ALU): performs arithmetic (add, subtract, compare, shifts) and logical operations (AND, OR, NOT, XOR).
- Control unit (CU): decodes instructions and sends control signals to coordinate the processor, memory and I/O, controlling the fetch-execute cycle and the movement of data.
- Clock: generates a regular pulse that synchronises all the processor's operations; each step happens on a clock tick.
- General-purpose registers: small, very fast stores inside the processor for data being worked on (R0, R1 …). OCR's model uses a single accumulator (ACC) to hold the results of ALU operations.
- Dedicated (special-purpose) registers:
  - Program counter (PC): the address of the next instruction to fetch.
  - Current instruction register (CIR): the instruction being decoded and executed, split into opcode and operand.
  - Memory address register (MAR): the address of the memory location to be read from or written to.
  - Memory buffer register (MBR) / memory data register (MDR): data or an instruction just read from memory, or waiting to be written to it.
  - Status register (SR): individual bits (flags) recording conditions from the last operation: carry, zero, negative, overflow, and whether interrupts are enabled. Conditional branches test these flags.

## 4.7.3.2 The fetch-execute cycle

*Refs: AQA 4.7.3.2 · OCR 1.1.1(b) · Eduqas C2.1: Fetch-execute cycle.*

### What you need to know

Register transfer notation: [X] means "contents of X"; ← means "is copied into".

Fetch:

1. MAR ← [PC]: the address of the next instruction is copied to the MAR and sent along the address bus. A memory read signal goes on the control bus.
2. PC ← [PC] + 1: the PC is incremented (by one instruction length) ready for the next fetch.
3. MBR ← [Memory]_addressed: the instruction at that address travels along the data bus into the MBR.
4. CIR ← [MBR]: the instruction is copied to the CIR.

Decode:

5. The control unit decodes the instruction in the CIR: it splits it into opcode and operand and works out what to do (and the addressing mode).

Execute:

6. The instruction is carried out. For example, a load from memory: MAR ← address operand; MBR ← [Memory]; register ← [MBR]. An ALU instruction uses the ALU and stores the result in a register; flags in the status register are updated. A branch loads a new address into the PC.

Then the processor checks for interrupts (below) and the cycle repeats.

### Worked example

Memory: address 20 holds `LDR R0, 50` (load R0 with the contents of address 50); address 50 holds 7. PC = 20.

| Step | PC | MAR | MBR | CIR | R0 |
| --- | --- | --- | --- | --- | --- |
| MAR ← [PC] | 20 | 20 | | | |
| PC ← [PC] + 1 | 21 | 20 | | | |
| MBR ← [Memory 20] | 21 | 20 | LDR R0, 50 | | |
| CIR ← [MBR] | 21 | 20 | LDR R0, 50 | LDR R0, 50 | |
| Decode: load, direct, address 50 | | | | | |
| MAR ← 50 | 21 | 50 | | | |
| MBR ← [Memory 50] | 21 | 50 | 7 | | |
| R0 ← [MBR] | 21 | 50 | 7 | LDR R0, 50 | 7 |

## 4.7.3.6 Interrupts

*Refs: AQA 4.7.3.6 · OCR 1.2.1(c).*

### What you need to know

- An interrupt is a signal to the processor (sent on the control bus) that a device or program needs attention: hardware (keyboard press, printer out of paper, disk transfer finished), timer (a time slice has ended), software (a program error such as divide by zero, or a request for an OS service), or power failure.
- Interrupts let the processor do useful work instead of repeatedly checking (polling) devices.
- At the end of each fetch-execute cycle, the processor checks for interrupts. If there is one with higher priority than the current task:
  1. The current instruction is finished.
  2. The volatile environment is saved: the contents of the PC, status register and other registers are pushed onto the system stack, so the interrupted program can resume exactly where it stopped.
  3. The PC is loaded with the start address of the matching interrupt service routine (ISR), found from the interrupt vector table.
  4. The ISR runs (fetch-execute continues, now on the ISR's code). Higher-priority interrupts can interrupt it; lower ones wait.
  5. When the ISR finishes, the saved values are popped back into the registers, and the original program carries on.
- Why save the volatile environment: the ISR uses the same registers; without saving them, the interrupted program's values would be overwritten and it would resume incorrectly.

## 4.7.3.7 Factors affecting processor performance

*Refs: AQA 4.7.3.7 · OCR 1.1.1(c) · Eduqas C2.1: Architecture.*

### What you need to know

- Clock speed: cycles per second (GHz). Higher clock speed means more fetch-execute cycles per second. Limited by heat; memory may not keep up.
- Multiple cores: each core is a separate processor that can run its own instructions, so several tasks (or parts of one task) run at the same time. The gain depends on whether software is written to use them; not all tasks can be split; cores share memory and buses.
- Cache memory: small, very fast memory on or near the processor that keeps copies of frequently or recently used instructions and data. Levels: L1 (smallest, fastest, per core), L2, L3 (largest, shared). More cache means more cache hits and fewer slow trips to RAM. Eduqas: types of memory form a hierarchy: registers, cache, RAM, then secondary storage, getting larger, cheaper per byte and slower.
- Word length: the number of bits the processor handles as a unit (in registers and the ALU). Longer words mean more bits processed per instruction and larger numbers handled in one step.
- Address bus width: more lines address more memory (32 lines: 2³² = 4 GiB of addresses; 64 lines: far more), so more programs and data can be in RAM rather than swapped to disk.
- Data bus width: more lines transfer more bits per memory access, so fewer accesses are needed for the same data.

### Worked example

A processor has a 24-bit address bus and a 16-bit data bus, with each address holding one byte. Maximum addressable memory: 2²⁴ = 16,777,216 bytes = 16 MiB. Reading a 64-bit value takes 64 ÷ 16 = 4 bus transfers; with a 64-bit data bus it would take 1.

## Pipelining

*Refs: OCR 1.1.1(d).*

### What you need to know

- Pipelining overlaps the stages of the fetch-execute cycle for different instructions: while one instruction is being executed, the next is decoded and the one after is fetched. Each stage works on a different instruction at the same time.
- Ideally, after the pipeline fills, one instruction finishes every clock cycle instead of one every three cycles.
- Problems (hazards): a branch means the instructions already fetched after it may be wrong, so the pipeline is flushed and refilled (processors use branch prediction to reduce this); one instruction may need the result of the previous one before it is ready (data dependency), causing a stall.

| Cycle | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| Fetch | I1 | I2 | I3 | I4 | I5 |
| Decode | | I1 | I2 | I3 | I4 |
| Execute | | | I1 | I2 | I3 |

Without pipelining, three instructions take 9 cycles; with it, 5.

## CISC and RISC

*Refs: OCR 1.1.2(a).*

| | CISC (complex instruction set computer) | RISC (reduced instruction set computer) |
| --- | --- | --- |
| Instructions | Many, complex, variable length; one instruction can do a lot (for example multiply two values from memory) | Few, simple, fixed length |
| Cycles per instruction | Often several | Usually one |
| Compiler | Simpler: short machine code programs | More work: more instructions per program |
| Hardware | More complex circuitry, more transistors | Simpler; more space for registers; easier to pipeline |
| Memory | Smaller programs, less RAM | Larger programs |
| Power | Higher | Lower: ideal for mobile and embedded devices |
| Examples | x86 (most PCs and laptops) | ARM (phones, tablets, many laptops), RISC-V |

## GPUs

*Refs: OCR 1.1.2(b).*

### What you need to know

- A graphics processing unit (GPU) has hundreds or thousands of simple cores designed to do the same operation on many items of data at once (SIMD: single instruction, multiple data).
- Uses: rendering graphics (each pixel or vertex processed in parallel), and other highly parallel work: machine learning, scientific modelling, video encoding, password cracking, cryptocurrency mining.
- A GPU is much faster than a CPU for these tasks, but poor at general, sequential, branching code; it works alongside the CPU.

## Multicore and parallel systems

*Refs: OCR 1.1.2(c) · Eduqas C2.1: Architecture.*

### What you need to know

- Parallel processing: more than one processor (or core) working on parts of a task at the same time.
- Types: SIMD (one instruction on many data items, as in GPUs and vector processors) and MIMD (different processors run different instructions on different data, as in multicore CPUs and clusters).
- Limiting factors to parallelisation:
  - some parts of a program are sequential and cannot be split (each step needs the previous result);
  - overhead of dividing the work, communicating and combining results;
  - processors may wait for each other (synchronisation) or for shared memory and buses;
  - software must be written for parallel execution, which is harder.
- Calculating run time (Eduqas): if a fraction p of a task can be shared equally among n processors and the rest must run on one, new time = T × ((1 − p) + p ÷ n). This is Amdahl's law: speed-up is limited by the sequential part.

### Worked example

A task takes 100 s on one core; 80% of it can be parallelised. On 4 cores: 100 × (0.2 + 0.8 ÷ 4) = 100 × (0.2 + 0.2) = 40 s, a speed-up of 2.5, not 4. On 100 cores: 100 × (0.2 + 0.008) = 20.8 s. However many cores are used, the time can never fall below 20 s.

## Common mistakes

- Saying the PC "holds the current instruction". It holds the address of the next instruction.
- Saying the address bus is two-way.
- Forgetting the PC is incremented during fetch, not after execute.
- Saying doubling the cores doubles speed. Sequential parts and overheads prevent this.
- Saying the ISR is chosen "by the CPU guessing". It is looked up from the interrupt vector table.

## Check questions

1. Describe the purpose of the address bus, data bus and control bus. [3 marks]
2. Explain the difference between von Neumann and Harvard architectures and where each is used. [4 marks]
3. Describe the stored program concept. [2 marks]
4. State the purpose of the MAR, MBR and status register. [3 marks]
5. Describe the fetch stage of the fetch-execute cycle, naming the registers used. [4 marks]
6. Describe what happens when an interrupt is received and explain why the volatile environment is saved. [5 marks]
7. A processor has a 32-bit address bus and each address stores one byte. Calculate the maximum memory it can address in GiB. [2 marks]
8. Explain how cache memory and word length each affect performance. [4 marks]
9. (OCR) Explain how pipelining improves performance and one reason it may not always do so. [3 marks]
10. (OCR) Compare CISC and RISC processors. [4 marks]
11. (OCR) Explain why a GPU is suited to machine learning. [2 marks]
12. (Eduqas) A program takes 60 s on one processor; 75% can run in parallel. Calculate its run time on 3 processors and on 6 processors, and comment. [4 marks]

## Mark scheme

1. Address bus carries the memory address/location being accessed, one-way from processor (1); data bus carries data/instructions between components, two-way (1); control bus carries control/timing signals such as read, write, clock, interrupt (1).
2. Von Neumann: shared memory and buses for instructions and data (1); Harvard: separate memories/buses for instructions and data, so both can be fetched at once (1). Von Neumann: general-purpose computers (1); Harvard: embedded systems/DSPs/microcontrollers (1).
3. Program instructions are stored in main memory with data (1); they are fetched and executed serially by the processor (1).
4. MAR: holds the address of the location to be read/written (1). MBR: holds data/instruction read from or to be written to memory (1). Status register: holds flags about the result of the last operation/interrupt status (1).
5. Address in PC copied to MAR (1); PC incremented (1); instruction at that address fetched along the data bus into MBR (memory read signal) (1); copied from MBR to CIR (1).
6. Processor checks for interrupts at the end of each cycle (1); if higher priority, current registers/PC/status are saved on the stack (1); PC loaded with the address of the ISR (from the vector table) and the ISR runs (1); afterwards the saved values are restored and the program resumes (1). Saved because the ISR uses the same registers and the interrupted program must continue exactly where it was (1).
7. 2³² bytes (1) = 4 GiB (1).
8. Cache: stores frequently used data/instructions close to the processor (1), fewer slower RAM accesses (1). Word length: more bits processed in one operation (1), so larger numbers/more data handled per instruction (1).
9. Fetch, decode and execute of different instructions overlap, so an instruction completes each cycle once the pipeline is full (2). Branches flush the pipeline/data dependencies cause stalls (1).
10. Any four: CISC many complex instructions vs RISC few simple ones (1); CISC variable length and multiple cycles vs RISC fixed length, one cycle (1); CISC shorter programs/less RAM vs RISC longer programs (1); RISC easier to pipeline/simpler hardware/lower power (1); examples x86 vs ARM (1).
11. Machine learning does the same calculations on large amounts of data (1); a GPU's many cores perform these in parallel (SIMD) (1).
12. 3: 60 × (0.25 + 0.75 ÷ 3) = 60 × 0.5 = 30 s (1). 6: 60 × (0.25 + 0.125) = 22.5 s (1). Doubling processors gives only a 25% further reduction (1); the sequential 15 s is a limit/overheads mean diminishing returns (1).
