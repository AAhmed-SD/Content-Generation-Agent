---
level: GCSE
subject: Computer Science
topic: "Hardware, software, operating systems and utilities"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.4.1", "3.4.3"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.5.1", "1.5.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["3.2.1", "3.2.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["6: Operating systems", "6: Utility software"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Hardware, software, operating systems and utilities

This file covers what hardware and software are, system software and application software, the purpose and functions of an operating system (user interface, processor and process management, multitasking, interrupts, memory, files and backing store, peripherals and drivers, users and security), and utility software.

## Overview

Software is split into application software (which does the user's tasks) and system software (which runs the computer). The operating system is the most important system software; utilities are smaller programs that maintain and protect the system.

### Board differences

- AQA 8525: 3.4.1 and 3.4.3 (Paper 2). Hardware and software definitions; system vs application software with examples; the OS manages processor(s), memory, I/O devices, applications and security; the need for utility programs (no fixed list).
- OCR J277: 1.5.1 and 1.5.2 (J277/01). OS functions: user interface, memory management and multitasking, peripheral management and drivers, user management, file management. Utilities: encryption software, defragmentation, data compression. Paging and segmentation are not required.
- Edexcel 1CP2: 3.2.1 and 3.2.2 (Paper 1). OS: file management, process management, peripheral management, user management. Utilities: file repair, backup, data compression, disk defragmentation, anti-malware.
- Eduqas C500QS: section 6 (Component 1). OS managing CPU, multi-tasking, interrupts, memory, backing store, peripherals, interface and security. The longest utility list: anti-virus, clipboard manager, system profilers, backup, disk checkers, disk compression, disk defragmenters, disk formatters, disk partition editors, archivers, cryptographic utilities, data recovery, revision control and file managers.

## Hardware and software

*Refs: AQA 3.4.1, 3.4.3.*

### What you need to know

- Hardware: the physical components of a computer system (CPU, memory, storage, input and output devices, cables).
- Software: the programs (instructions) that run on the hardware. Software cannot do anything without hardware, and hardware needs software to tell it what to do.
- System software manages the computer's resources and provides a platform for application software. Examples: operating systems, utility programs, device drivers, translators.
- Application software performs tasks for the end user. Examples: word processors, web browsers, games, spreadsheets, photo editors.

### Common mistakes

- Calling a web browser system software. It does a user task, so it is an application.

## The operating system

*Refs: AQA 3.4.3 · OCR 1.5.1 · Edexcel 3.2.1 · Eduqas 6: Operating systems.*

### What you need to know

The OS is system software that manages the hardware and software resources of the computer and provides a platform for applications and an interface for the user. Its functions:

- User interface: lets the user interact with the computer. Types include graphical user interfaces (windows, icons, menus, pointer), command-line interfaces (typed commands), and touch or voice interfaces. A GUI is easy to learn; a command line is faster for experts and uses fewer resources.
- Processor (CPU) and process management, and multitasking: decides which program (process) uses the CPU and when. Multitasking gives each process short time slices in turn, so many programs appear to run at once. On multi-core CPUs it assigns processes to cores.
- Interrupts (Eduqas): an interrupt is a signal to the CPU that something needs attention (a key pressed, a printer out of paper, a timer). The OS checks for interrupts, pauses the current task (saving its state), runs the code that handles the interrupt, then resumes the task. Interrupts have priorities.
- Memory management: allocates RAM to each program as it opens and frees it when it closes; keeps programs from using each other's memory; moves data between RAM and virtual memory when RAM is full.
- File management and backing store: organises files on secondary storage into folders (directories); naming, saving, opening, moving, copying, deleting, renaming files; keeps track of where each file is stored on the disk and of free space; controls file permissions.
- Peripheral management and drivers: manages input and output devices. A device driver is software that translates the OS's general instructions into the specific commands one device understands, so the OS does not need to know every device's details. It also handles buffering (temporary storage of data waiting for a slow device, such as a print queue).
- User management and security: user accounts with usernames and passwords; access rights (which files and programs each user can use); logging activity; installing security updates; firewall settings.

### Worked example

A student has a music player, a browser and a word processor open while printing an essay. Describe how the OS manages this.

1. Multitasking: each program gets time slices of the CPU in turn so they all appear to run at once.
2. Memory: each program is given its own area of RAM; if RAM fills, unused data moves to virtual memory.
3. Peripherals: the printer driver converts the essay into printer commands; the document waits in a print queue (buffer).
4. Interrupts: when the printer needs more paper, it sends an interrupt and the OS shows an alert without stopping the music.

### Common mistakes

- Answering "the OS runs the computer". Name specific functions and describe what each does.
- Confusing file management with memory management: files are on storage; memory is RAM.

## Utility software

*Refs: AQA 3.4.3 · OCR 1.5.2 · Edexcel 3.2.2 · Eduqas 6: Utility software.*

### What you need to know

Utility software performs housekeeping tasks that help maintain, optimise and protect the computer, often tasks the OS does not do itself. Many come with the OS.

- Defragmentation: on a magnetic hard disk, files get split into fragments scattered across the disk as files are saved and deleted. A defragmenter moves the fragments of each file together, and gathers free space together, so files are read with less head movement and load faster. Not needed for SSDs (no moving parts; it would also wear the cells).
- Data compression software: reduces file size to save storage space and speed up transfer. Archivers (Eduqas) bundle many files into one compressed file, such as a ZIP.
- Encryption software / cryptographic utilities: scrambles data with a key so it cannot be understood without the key, protecting files if a device is lost or stolen.
- Backup software: copies files to another location, on a schedule. Full backup copies everything; incremental backup copies only what changed since the last backup (faster, less space).
- Anti-malware / anti-virus: scans files and memory, comparing them with a database of known malware signatures and looking for suspicious behaviour; quarantines or deletes threats. Needs regular updates.
- File repair (Edexcel) and data recovery (Eduqas): attempt to fix corrupted files or recover deleted or damaged data.
- Disk checkers (Eduqas): scan a disk for errors and bad sectors and mark them so they are not used.
- Disk formatters (Eduqas): prepare a disk for use by setting up its file system, erasing what was there.
- Disk partition editors (Eduqas): divide a drive into separate sections (partitions) that act as separate drives.
- Disk compression (Eduqas): compresses the contents of a whole drive so it holds more.
- Clipboard manager (Eduqas): keeps a history of copied items so earlier ones can be pasted.
- System profilers (Eduqas): report detailed information about the hardware and software installed.
- Revision control (Eduqas): keeps a history of versions of files (for example program code), so changes can be tracked and earlier versions restored.
- File managers (Eduqas): let the user browse, organise, copy, move and delete files and folders.

### Worked example

Explain why defragmenting an HDD improves performance.

1. Over time, files are split into pieces stored in different places on the disk.
2. To read a fragmented file, the read/write head has to move to many places, which takes time.
3. Defragmenting puts each file's pieces next to each other, so the head moves less and the file loads faster.

### Common mistakes

- Recommending defragmentation for an SSD.
- Saying backup software "protects against viruses". It lets you restore data after loss; anti-malware protects against viruses.

## Check questions

1. Explain the difference between system software and application software, with an example of each. [4 marks]
2. Describe two functions of an operating system's memory management. [2 marks]
3. Explain what a device driver is and why it is needed. [2 marks]
4. Describe how an operating system allows multitasking. [2 marks]
5. (Eduqas) Explain what happens when an interrupt occurs. [3 marks]
6. Describe two features of user management. [2 marks]
7. Explain why an organisation would use incremental rather than full backups each night. [2 marks]
8. Explain how encryption software protects data on a laptop. [2 marks]
9. Compare a GUI and a command-line interface. [2 marks]

## Mark scheme

1. System software manages the computer's resources / provides a platform for applications (1), e.g. operating system or utility (1). Application software performs tasks for the user (1), e.g. word processor or browser (1).
2. Any two: allocates RAM to programs (1); frees memory when programs close (1); prevents programs accessing each other's memory (1); manages virtual memory/moves data between RAM and storage (1).
3. Software that translates OS instructions into commands for a specific device (1); so the OS can work with many devices without knowing their details / devices from different makers (1).
4. The OS gives each process a short time slice of the CPU in turn (1), switching quickly so they all appear to run at the same time (1).
5. A signal is sent to the CPU to request attention (1); the current task is paused and its state saved (1); the interrupt is handled, then the original task resumes (1).
6. Any two: user accounts with usernames and passwords (1); access rights/permissions to files and programs (1); monitoring/logging user activity (1).
7. Only files that changed since the last backup are copied (1), so it is faster and uses less storage (1).
8. Data is scrambled using a key/algorithm (1); if the laptop is stolen the data cannot be understood without the key (1).
9. GUI is easier to learn/use with icons and menus (1); command line is quicker for experienced users / uses fewer system resources (1).
