---
level: A-level
subject: Computer Science
topic: "Operating systems: functions, memory management (partitioning, paging, segmentation, virtual memory), interrupts and priorities, scheduling, process states, buffering, types and modes of operation, BIOS, device drivers and virtual machines"
as_content: "OCR 1.2.1 is also AS (H046 1.2.1). For AQA, the role of the OS (4.6.1.4) is in file 21; this file is mainly OCR and Eduqas content."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.6.1.4"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.1(a)", "1.2.1(b)", "1.2.1(c)", "1.2.1(d)", "1.2.1(e)", "1.2.1(f)", "1.2.1(g)", "1.2.1(h)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.6: Managing resources", "C2.6: Providing an interface", "C2.6: Managing backing store", "C2.6: Modes of operation", "C2.6: Types of operating system", "C2.6: Consideration of human-computer interaction", "C2.6: Interrupts", "C2.6: Memory management and buffering", "C2.6: Scheduling"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-ocr/
---

# Operating systems

This file covers what an operating system does and the kernel, the user interface, managing backing store (directories and file attributes), memory management (partitioning, paging, segmentation and virtual memory), interrupts and their priorities, buffering and double buffering, scheduling (process states, round robin, first come first served, multi-level feedback queues, shortest job first, shortest remaining time, time slicing, polling, threading), types of operating system and modes of operation, BIOS, device drivers and virtual machines.

AQA's outline of the OS's role is in [21-software-languages-and-translators.md](21-software-languages-and-translators.md); interrupts within the fetch-execute cycle are in [23-processor-and-fetch-execute.md](23-processor-and-fetch-execute.md). Builds on [GCSE: System software](../../gcse/computer-science/14-system-software.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Purpose | Hides hardware complexity; resource management (4.6.1.4) | Need for, function and purpose | Kernel manages peripherals, processes, memory protection and backing store; provides an interface |
| Memory | Not named | Paging, segmentation, virtual memory | Partitioning of main memory; buffering and double buffering |
| Interrupts | File 23 | Interrupts and ISRs | Conditions that cause interrupts; handling and priorities |
| Scheduling | Not named | Round robin, FCFS, multi-level feedback queues, SJF, SRT | High-level scheduling; process states; time slicing, polling, threading |
| Types | Not named | Distributed, embedded, multi-tasking, multi-user, real time | Batch, single-user, multi-user, multi-tasking, multi-programming; modes: batch, real-time control, real-time transaction |
| Other | Not named | BIOS, device drivers, virtual machines | Directories and file attributes; HCI for different users |

## Purpose and functions of an operating system

*Refs: OCR 1.2.1(a) · Eduqas C2.6: Managing resources, Providing an interface · AQA 4.6.1.4.*

### What you need to know

- An operating system (OS) is system software that manages the computer's hardware and resources and provides a platform for applications and an interface for users. Without it, every program would have to control the hardware itself.
- The kernel is the core of the OS that stays in memory and manages resources:
  - processes: creating, scheduling and ending them; sharing the processor;
  - memory: allocating and freeing memory, and memory protection (stopping one process reading or overwriting another's memory or the OS's);
  - peripherals: controlling input/output devices through device drivers; handling interrupts;
  - backing store: managing files and storage space.
- Other functions: providing a user interface; security (user accounts, passwords, access rights, file permissions); system utilities; error handling; logging.
- Providing an interface: the OS sits between the user and the hardware. Types: graphical user interface (GUI), command-line interface (CLI: powerful and precise for experts, low resource use, scriptable, but must remember commands), menu-driven, natural language and voice, and touch. For programs, the OS provides an application programming interface (system calls) so they can use hardware through simple requests.
- Consideration of human-computer interaction (Eduqas): systems must suit a wide variety of users at all levels (beginners to experts, children, people with disabilities) and environments (noisy factories, cars, outdoors, small screens). Examples: accessibility settings (screen readers, magnification, high contrast, voice control), shortcuts for experts, simple menus for beginners, large touch targets in vehicles.

## Managing backing store

*Refs: Eduqas C2.6: Managing backing store.*

### What you need to know

- The file manager organises files in a hierarchical (tree) directory structure: a root directory containing files and sub-directories (folders), each of which can contain more. A file is located by its path, such as /home/sana/coursework/report.docx.
- Benefits: files grouped logically; the same file name can be used in different folders; permissions can be set per folder.
- File attributes (metadata held by the file system): name and extension, type, size, location on disk, dates created, modified and accessed, owner, permissions (read, write, execute), and flags such as hidden, read-only, system and archive (needs backing up).
- The OS tracks which blocks on the disk belong to each file and which are free (for example a file allocation table).

## Memory management

*Refs: OCR 1.2.1(b) · Eduqas C2.6: Memory management and buffering.*

### What you need to know

- The OS must share main memory between the OS and several processes, keep them apart (protection), and let programs run that are larger than the free memory.
- Partitioning (Eduqas): dividing main memory into sections, each holding one process.
  - Fixed partitions: set sizes. Simple, but a small process in a big partition wastes space (internal fragmentation), and a big process may not fit anywhere.
  - Variable (dynamic) partitions: each process gets exactly what it needs. Less waste at first, but as processes end, free memory is broken into scattered small gaps (external fragmentation), which may need compaction (moving processes together).
  - Reasons: run several programs at once; protect processes from each other. Consequences: fragmentation, limits on how many or how large processes can be, overhead of managing partitions.
- Paging: memory is split into equal-sized blocks called pages (in virtual memory) and page frames (in physical memory). A process's pages can be placed in any free frames, not necessarily next to each other; a page table maps each page to its frame. Pages are a physical division, not related to the program's structure. No external fragmentation; small waste in the last page.
- Segmentation: memory is split into variable-sized segments that match logical parts of a program (a function, a module, the stack, an array). A segment table records each segment's start address and length. Segments can be shared and protected individually, but cause external fragmentation.
- Virtual memory: uses part of secondary storage as if it were extra main memory. Pages not currently needed are moved out of RAM to disk (paged out or swapped) and brought back (paged in) when needed.
  - Benefit: programs larger than physical RAM can run; more programs can be open at once.
  - Drawback: disk is much slower than RAM. If too many pages are swapped back and forth, the computer spends more time moving pages than doing work: disk thrashing.
- Buffering: a buffer is an area of memory that holds data temporarily while it is moved between devices or processes that work at different speeds (processor and printer; network and video player). The faster device fills or empties the buffer and can do other work meanwhile; an interrupt signals when the buffer needs attention.
- Double buffering: two buffers are used; while one is being filled, the other is being emptied (processed or displayed); then they swap. Data flows continuously with no waiting. Used for video and audio streaming and in graphics (draw the next frame in a hidden buffer, then swap, so the screen never shows a half-drawn image, avoiding flicker).

### Worked example

Paging: pages are 4 KiB. A 14 KiB program needs 4 pages (the last only half used). Its page table:

| Page | Frame |
| --- | --- |
| 0 | 7 |
| 1 | 2 |
| 2 | (on disk) |
| 3 | 11 |

When the program accesses page 2, a page fault occurs; the OS loads page 2 from disk into a free frame (swapping another page out if memory is full) and updates the table.

## Interrupts and priorities

*Refs: OCR 1.2.1(c) · Eduqas C2.6: Interrupts.*

### What you need to know

- Events that generate interrupts:
  - hardware: a key pressed, mouse moved, printer out of paper, disk transfer complete, data arrived on the network;
  - timer: the end of a time slice (used for scheduling);
  - software or program errors: division by zero, invalid memory access, an attempt to run an illegal instruction, a program requesting an OS service;
  - hardware failure: power failure, memory parity error.
- Handling: at the end of each fetch-execute cycle the processor checks for interrupts; the current state is saved on the stack; the matching interrupt service routine runs; the state is restored (full detail in file 23).
- Priorities: each interrupt type has a priority. A higher-priority interrupt can interrupt a lower-priority ISR; lower-priority interrupts wait (are queued or masked) until higher ones finish.
- Factors in allocating priorities: how urgent it is and how serious it would be to delay it (power failure and hardware faults highest, as data could be lost); how quickly the device's data would be lost or overwritten if not handled (fast devices whose buffers fill quickly come above slow ones like printers); safety in real-time systems; user responsiveness (a keyboard above a background disk task).

## Scheduling

*Refs: OCR 1.2.1(d) · Eduqas C2.6: Scheduling.*

### What you need to know

- In a multi-tasking system many processes compete for the processor. The scheduler decides which process runs and for how long, aiming to: keep the processor busy, give each process a fair share, respond quickly to users, maximise throughput (jobs completed), and meet deadlines.
- High-level scheduling (Eduqas) decides which jobs are admitted into memory to be run, allocates devices, and takes job priorities into account. Low-level scheduling picks which ready process gets the processor next.
- Process states:
  - running: currently using the processor;
  - ready: in memory, waiting only for the processor;
  - blocked (waiting): cannot continue until an event happens, such as input/output completing.
  Transitions: ready → running (dispatched by the scheduler); running → ready (time slice ends or a higher-priority process arrives); running → blocked (requests I/O); blocked → ready (I/O completes, signalled by an interrupt).
- Time slicing: each process gets a short fixed period of processor time (a quantum) before the timer interrupts and the next process runs. Gives the impression that all processes run at once.
- Polling: the processor repeatedly checks each device in turn to see if it needs attention. Simple, but wastes processor time compared with interrupts.
- Threading: a thread is a single sequence of instructions within a process; a process can have several threads that share its memory and run concurrently (for example one thread for the user interface and another downloading a file), so the program stays responsive and can use several cores.

Scheduling algorithms (OCR):

| Algorithm | How it works | Pros | Cons |
| --- | --- | --- | --- |
| First come, first served (FCFS) | Run jobs in order of arrival, each to completion | Simple; fair in order | Short jobs wait behind long ones; not pre-emptive, so poor response |
| Round robin | Each job in the ready queue gets a fixed time slice in turn; unfinished jobs go to the back of the queue | Fair; good response for interactive users | Ignores priority and job length; many context switches; long jobs take a long time |
| Shortest job first (SJF) | Run the waiting job with the shortest estimated total time next, to completion | Maximises throughput; short average waiting time | Needs time estimates; long jobs may starve |
| Shortest remaining time (SRT) | Pre-emptive SJF: run the job with the least time left; a newly arrived shorter job interrupts the current one | Very short average waiting time | Needs estimates; long jobs may starve; more switching |
| Multi-level feedback queues (MLFQ) | Several queues of different priority; new jobs start in the top queue; a job that uses its whole time slice moves down; jobs waiting a long time can move up | Favours short and interactive (I/O-bound) jobs while preventing starvation; adapts to behaviour | Complex to set up and tune |

### Worked example

Jobs arrive at time 0 in the order A (6 ms), B (2 ms), C (4 ms).

- FCFS: A 0–6, B 6–8, C 8–12. Waiting times: A 0, B 6, C 8. Average 14 ÷ 3 ≈ 4.7 ms.
- SJF: B 0–2, C 2–6, A 6–12. Waiting: B 0, C 2, A 6. Average 8 ÷ 3 ≈ 2.7 ms.
- Round robin, quantum 2 ms: A 0–2, B 2–4 (done), C 4–6, A 6–8, C 8–10 (done), A 10–12 (done). Completion: B 4, C 10, A 12.

SRT example: A (6 ms) arrives at 0; B (2 ms) arrives at 1. At time 1, A has 5 ms left and B needs 2, so B pre-empts A: A 0–1, B 1–3, A 3–8.

## Types of operating system and modes of operation

*Refs: OCR 1.2.1(e) · Eduqas C2.6: Types of operating system, Modes of operation.*

### What you need to know

- Single-user (standalone): one user at a time (a personal laptop). Can still be multi-tasking.
- Multi-user (multi-access): several users share one computer's resources at the same time, usually through terminals (a mainframe or server). The OS must schedule fairly and keep users' data separate and secure.
- Multi-tasking: one user (or the system) runs several programs apparently at once, by rapidly switching between them (time slicing) or using several cores.
- Multi-programming (Eduqas): several programs are held in memory at once; when one waits for I/O, the processor switches to another, so it is never idle. The basis of multi-tasking.
- Batch (Eduqas): jobs (programs and data) are collected and processed in a group, without user interaction, often at a scheduled time. Suits large, repetitive work where an immediate result is not needed: payroll, utility bills, bank statements, exam marking.
- Real time: the system must respond to input within a guaranteed, very short time, because delays could be dangerous or costly. Must be highly reliable, often with redundant hardware.
  - Real-time control (Eduqas): controlling physical processes using sensors and actuators in a feedback loop: aircraft autopilots, car anti-lock brakes, pacemakers, chemical plants, traffic lights.
  - Real-time transaction processing (Eduqas): each transaction is processed immediately as it happens, so data is always up to date and, for example, the same seat cannot be sold twice: booking systems, cash machines, online shopping stock levels.
- Distributed (OCR): one OS runs across several networked computers, making them appear as a single system and sharing out tasks and resources (used in clusters and some cloud systems).
- Embedded (OCR): a small, efficient OS built into a device with a dedicated function (washing machine, router, smart TV, car engine management). Limited resources, often real time, usually no general user interface; highly reliable.

## BIOS

*Refs: OCR 1.2.1(f).*

### What you need to know

- The Basic Input/Output System (BIOS; on modern PCs, UEFI) is firmware stored in ROM (flash) on the motherboard. It runs first when the computer is switched on.
- It performs the power-on self-test (POST: checks the processor, memory and essential hardware), initialises hardware, then finds a bootable device and runs the bootstrap loader, which loads the operating system into RAM. It also holds settings such as boot order and clock.

## Device drivers

*Refs: OCR 1.2.1(g).*

### What you need to know

- A device driver is software that lets the OS communicate with a particular hardware device. It translates the OS's general instructions ("print this page") into the specific commands that device understands, and handles its interrupts.
- Drivers are specific to the device and to the OS. New hardware needs a driver installed (often automatically); updated drivers fix bugs and improve performance. They let the OS work with thousands of devices without knowing each one's details.

## Virtual machines

*Refs: OCR 1.2.1(h).*

### What you need to know

- A virtual machine is any instance where software takes on the function of a machine.
- System virtual machines: software (a hypervisor) lets one physical computer run several operating systems at once, each in its own isolated virtual machine with virtual hardware. Uses: running several servers on one physical machine (saving cost and energy), testing software on different OSs, running old software, safely testing malware in isolation, cloud computing.
- Process virtual machines and intermediate code: a program is compiled to intermediate code (bytecode) that is run by a virtual machine (the Java Virtual Machine, Python's VM) rather than directly by the processor (file 21). Benefit: portability; drawback: slower than native code.
- Drawbacks of virtual machines generally: slower than running directly on hardware; one physical failure affects all VMs on it.

## Common mistakes

- Saying virtual memory makes the computer faster. It allows more to run, but swapping to disk is slow and can cause thrashing.
- Mixing up pages (fixed size, physical) and segments (variable size, logical).
- Describing round robin as "shortest job first". Round robin gives equal time slices in turn.
- Saying a blocked process goes straight back to running when its I/O completes. It moves to the ready state.
- Saying the BIOS is the operating system. It loads the OS.

## Check questions

1. State four functions of an operating system's kernel. [4 marks]
2. (Eduqas) Explain the purpose of a hierarchical directory structure and list four file attributes. [4 marks]
3. (OCR) Compare paging and segmentation. [4 marks]
4. (OCR) Explain how virtual memory works and what is meant by disk thrashing. [4 marks]
5. (Eduqas) Explain why main memory is partitioned and one consequence of using variable partitions. [3 marks]
6. (Eduqas) Explain double buffering and give a use. [3 marks]
7. (Eduqas) Explain why a power failure interrupt has a higher priority than a printer interrupt. [2 marks]
8. Draw or describe the three process states and the transitions between them. [4 marks]
9. (OCR) Four jobs arrive at time 0: P (5 ms), Q (3 ms), R (1 ms), S (4 ms), in that order. Give the order and average waiting time for FCFS and SJF. [4 marks]
10. (OCR) Explain how a multi-level feedback queue avoids starvation. [2 marks]
11. (OCR) Explain why a car's braking system uses a real-time embedded operating system. [3 marks]
12. (Eduqas) Explain the difference between batch processing and real-time transaction processing, with an example of each. [4 marks]
13. (OCR) Describe the role of the BIOS when a computer is switched on. [3 marks]
14. (OCR) Explain what a device driver is and why it is needed. [2 marks]
15. (OCR) Give two uses of virtual machines. [2 marks]

## Mark scheme

1. Any four: process management/scheduling (1); memory management and protection (1); managing peripherals/device drivers/interrupts (1); file/backing store management (1); security/user accounts (1).
2. Organises files in folders so they are easy to find/group; same name allowed in different folders; permissions per folder (2). Any four attributes: name, size, type, dates, owner, permissions, read-only/hidden/archive flags (2 for four, 1 for two).
3. Paging: fixed-size pages (1), physical division unrelated to program structure (1). Segmentation: variable-size segments (1) matching logical parts of the program; can cause external fragmentation (1).
4. Part of secondary storage used as an extension of RAM (1); pages not in use are moved to disk and brought back when needed (1); allows more/larger programs to run (1). Thrashing: so much swapping between RAM and disk that little useful work is done/performance falls sharply (1).
5. To hold several processes at once/protect them from each other (1). Consequence: external fragmentation, scattered small free gaps (1), needing compaction (1).
6. Two buffers: one is filled while the other is processed/output (1); then they swap (1); use: video streaming/graphics frames/audio, giving smooth output without waiting (1).
7. Power failure means data loss is imminent, so it must be handled at once (1); a printer can wait without data loss (1).
8. Running, ready, blocked (1). Ready → running when scheduled (1); running → ready when time slice ends/pre-empted (1); running → blocked waiting for I/O, blocked → ready when I/O completes (1).
9. FCFS: P, Q, R, S; waits 0, 5, 8, 9; average 22 ÷ 4 = 5.5 ms (2). SJF: R, Q, S, P; waits 0, 1, 4, 8; average 13 ÷ 4 = 3.25 ms (2).
10. Jobs that have waited a long time in lower queues are moved up to higher-priority queues (1); so long jobs eventually get processor time (1).
11. Must respond within a guaranteed very short time (1); delay could be dangerous (1); embedded: dedicated function, limited resources, highly reliable (1).
12. Batch: jobs collected and processed together without user interaction (1), e.g. payroll/bills (1). Real-time transaction: each transaction processed immediately so data is always current (1), e.g. seat booking/cash machine (1).
13. Stored in ROM/flash and runs first (1); performs POST to check hardware (1); finds the boot device and loads the bootstrap loader/OS into RAM (1).
14. Software that translates the OS's general instructions into device-specific commands (1); so the OS can use many different devices without knowing their details (1).
15. Any two: running several servers/OSs on one machine (1); testing software on other OSs (1); running old software (1); sandboxing malware (1); running intermediate code/bytecode (1).
