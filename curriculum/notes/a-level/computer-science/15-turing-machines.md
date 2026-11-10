---
level: A-level
subject: Computer Science
topic: "A model of computation: Turing machines and the Universal Turing machine"
as_content: "A-level only (AQA). Turing machines are an AQA topic only; OCR and Eduqas do not name them."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.4.5.1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Turing machines

This file covers the structure of a Turing machine, writing its rules as a transition function and as a state transition diagram, hand-tracing simple machines, and why Turing machines and the Universal Turing machine matter. It builds on finite state machines ([12](12-finite-state-machines-and-regular-languages.md)) and links to computability and the Halting problem ([14](14-big-o-and-limits-of-computation.md)).

### Board differences

Only AQA 7517 examines Turing machines. AQA exam questions only use machines with one tape that is infinite in one direction.

## 4.4.5.1 Turing machine

*Refs: AQA 4.4.5.1.*

### What you need to know

- A Turing machine (Alan Turing, 1936) is a theoretical model of a computer with a single fixed program. It has:
  - a finite set of states, shown in a state transition diagram, one of which is the start state; states with no outgoing transitions are halting states;
  - a finite alphabet of symbols that can appear on the tape, including a blank symbol (often □ or _);
  - an infinite tape divided into squares, each holding one symbol (AQA: infinite in one direction);
  - a read-write head that reads the symbol in the current square, can write a new symbol, and moves one square left or right at a time.
- At each step, given the current state and the symbol under the head, the machine writes a symbol, moves left (L) or right (R), and changes state. When it reaches a halting state it stops; the output is what is left on the tape.
- Transition function: δ(current state, symbol read) = (new state, symbol written, move). For example δ(S0, 1) = (S0, 1, R).
- The same rules can be drawn as a state transition diagram: each arrow from one state to another is labelled `read / write, move`, for example `1/0,R`. The transition function and the diagram are equivalent descriptions.
- Difference from an FSM: the tape gives the Turing machine unlimited memory that it can read and overwrite, and the head can move both ways. So it can solve problems (such as recognising {0ⁿ1ⁿ}) that no FSM can.
- Universal Turing machine (UTM): a Turing machine that can simulate any other Turing machine. Its tape holds a description of the other machine (its transition rules) and that machine's input; it reads the description and carries it out.
- Importance:
  - Turing machines give a general, formal model of computation and a definition of what is computable: if a Turing machine can solve a problem, it is computable; if no Turing machine can, it is not. (The Church–Turing thesis says any algorithm can be carried out by a Turing machine.)
  - They let us reason about the limits of computation, including proving the Halting problem cannot be solved.
  - The UTM is the idea behind the stored-program computer: one machine that can run any program held as data in its memory, alongside the data it works on (see [23-processor-and-fetch-execute.md](23-processor-and-fetch-execute.md)). It also shows that programs are data, which is how interpreters and compilers work.

### Worked example

A machine adds 1 to a binary number. The head starts on the leftmost digit in state S0; the tape is blank to the right of the number.

Transition function:

| Rule | State | Read | Write | Move | Next state |
| --- | --- | --- | --- | --- | --- |
| 1 | S0 | 0 | 0 | R | S0 |
| 2 | S0 | 1 | 1 | R | S0 |
| 3 | S0 | □ | □ | L | S1 |
| 4 | S1 | 1 | 0 | L | S1 |
| 5 | S1 | 0 | 1 | L | S2 |
| 6 | S1 | □ | 1 | L | S2 |

S2 has no outgoing transitions, so it is the halting state.

In δ notation: δ(S0, 0) = (S0, 0, R); δ(S0, 1) = (S0, 1, R); δ(S0, □) = (S1, □, L); δ(S1, 1) = (S1, 0, L); δ(S1, 0) = (S2, 1, L); δ(S1, □) = (S2, 1, L).

What it does: S0 runs right to the end of the number; S1 moves left, turning trailing 1s into 0s (the carry) until it meets a 0 (or the blank before the number), which it turns into 1, then halts.

Trace with tape `1011` (11 in denary). Head position shown by [ ].

| Step | State | Tape | Rule used |
| --- | --- | --- | --- |
| 0 | S0 | [1]011□ | 2 |
| 1 | S0 | 1[0]11□ | 1 |
| 2 | S0 | 10[1]1□ | 2 |
| 3 | S0 | 101[1]□ | 2 |
| 4 | S0 | 1011[□] | 3 |
| 5 | S1 | 101[1]□ | 4: write 0 |
| 6 | S1 | 10[1]0□ | 4: write 0 |
| 7 | S1 | 1[0]00□ | 5: write 1 |
| 8 | S2 | [1]100□ | halt |

Result `1100` = 12. Correct.

State transition diagram (arrows labelled read/write,move):

```
     0/0,R  1/1,R            1/0,L
       ┌─┐                   ┌─┐
       ▼ │       □/□,L       ▼ │      0/1,L or □/1,L
 ──► ( S0 ) ───────────────► ( S1 ) ─────────────────► (( S2 ))
```

(Rule 6 is needed when the number is all 1s, such as 111: the carry runs off the left end. Because AQA's tape is infinite in one direction only, questions using this case put a blank square at the left end of the number.)

```python
def run_tm(rules, tape, state, halting, pos=0, max_steps=1000):
    tape = list(tape)
    for _ in range(max_steps):
        if state in halting:
            break
        if pos == len(tape):
            tape.append("_")
        symbol = tape[pos]
        state, write, move = rules[(state, symbol)]
        tape[pos] = write
        pos += 1 if move == "R" else -1
    return "".join(tape).strip("_")

rules = {("S0", "0"): ("S0", "0", "R"), ("S0", "1"): ("S0", "1", "R"),
         ("S0", "_"): ("S1", "_", "L"), ("S1", "1"): ("S1", "0", "L"),
         ("S1", "0"): ("S2", "1", "L"), ("S1", "_"): ("S2", "1", "L")}
print(run_tm(rules, "_1011", "S0", {"S2"}, pos=1))   # 1100
```

### Common mistakes

- Forgetting to move the head after writing: every transition writes, moves and changes state (the state may stay the same).
- Reading the wrong square after a move during a trace. Keep a column for head position.
- Saying a Turing machine is a real, physical computer design. It is a mathematical model.
- Mixing up a Turing machine and the Universal Turing machine: a TM has one fixed program; a UTM reads another machine's program from its tape.

## Check questions

1. List the four main components of a Turing machine. [4 marks]
2. What is a halting state? [1 mark]
3. Explain what δ(S1, 0) = (S2, 1, L) means. [2 marks]
4. Using the binary-increment machine in this file, trace the input `□0111` with the head starting on the 0 in S0. State the final tape. [4 marks]
5. A machine has these rules. Starting in S0 on the leftmost symbol of `aab□`, trace it and describe what it does. [3 marks]

| State | Read | Write | Move | Next |
| --- | --- | --- | --- | --- |
| S0 | a | b | R | S0 |
| S0 | b | a | R | S0 |
| S0 | □ | □ | L | S1 (halt) |

6. Explain one way a Turing machine is more powerful than a finite state machine. [2 marks]
7. What is a Universal Turing machine? [2 marks]
8. Explain why Turing machines are important in computer science. [3 marks]
9. Draw the state transition diagram for the machine in Q5. [2 marks]

## Mark scheme

1. Finite set of states (with a start state and halting states) (1); finite alphabet of symbols (1); infinite tape divided into squares (1); read-write head moving one square at a time (1).
2. A state with no outgoing transitions: when reached, the machine stops (1).
3. In state S1 reading 0 (1): write 1, move the head left and go to state S2 (1).
4. S0 runs right over 0, 1, 1, 1 to the blank (1); S1 turns the three 1s to 0s moving left (1); reaches 0, writes 1, goes to S2 and halts (1); final tape □1000 (7 + 1 = 8) (1).
5. Trace: a→b, a→b, b→a, then blank: move left and halt (1); final tape bba□ (1); it swaps every a and b/inverts the string (1).
6. It has an unlimited tape it can read and write/move in both directions, so it has unbounded memory (1); so it can recognise languages an FSM cannot, e.g. {0ⁿ1ⁿ} (1).
7. A Turing machine that can simulate any other Turing machine (1); by reading that machine's description/rules and input from its tape (1).
8. Any three: formal/general model of computation (1); defines what is computable (1); used to prove limits such as the Halting problem (1); UTM is the basis of the stored-program concept/programs as data (1).
9. S0 with a loop labelled a/b,R and b/a,R (1); arrow □/□,L from S0 to halting state S1 (shown with double circle or noted as halting) (1).
