---
level: A-level
subject: Computer Science
topic: "Finite state machines, sets, regular expressions and regular languages"
as_content: "AQA: FSMs without output are also AS (7516 3.4.2.1). FSMs with output (Mealy machines), sets, regular expressions and regular languages are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.4.2.1", "4.4.2.2", "4.4.2.3", "4.4.2.4"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Finite state machines and regular languages

This file covers finite state machines with and without output (state transition diagrams and tables, Mealy machines), the maths of sets used for regular expressions, writing and reading regular expressions, the link between regular expressions and FSMs, and what a regular language is. Context-free languages and BNF are in [13-bnf-and-syntax-diagrams.md](13-bnf-and-syntax-diagrams.md); Turing machines in [15-turing-machines.md](15-turing-machines.md).

### Board differences

Only AQA 7517 examines this content. OCR H446 and Eduqas A500QS do not include FSMs, set notation or regular expressions.

## 4.4.2.1 Finite state machines with and without output

*Refs: AQA 4.4.2.1.*

### What you need to know

- A finite state machine (FSM) is a model of computation with a finite number of states. It reads input symbols one at a time and moves between states according to transition rules. It has no memory apart from its current state.
- Parts:
  - a finite set of states, one of which is the start state (shown by an arrow coming from nowhere);
  - an input alphabet (the symbols it can read);
  - a transition for each state and input (an arrow labelled with the input).
- FSM without output (a finite state automaton, or acceptor): some states are accepting (goal) states, drawn with a double circle. If the machine is in an accepting state after reading the whole input, the input is accepted; otherwise it is rejected.
- FSM with output: AQA uses Mealy machines only. Each transition is labelled input/output, for example `1/0`: on reading 1, output 0 and move. The output depends on the current state and the input. Mealy machines usually have no accepting states; they translate an input string into an output string.
- A state transition table lists the same information: current state, input, next state (and output for a Mealy machine).
- Uses: recognising valid input (passwords, identifiers), lexical analysis in compilers, traffic lights, vending machines, lifts, game characters' behaviour, network protocols, spell checkers.

### Worked example: acceptor

Design an FSM over {0, 1} that accepts strings with an even number of 1s (including none).

States: S0 (even so far, start and accepting) and S1 (odd so far).

```
          0                 0
        ┌───┐             ┌───┐
        ▼   │      1      ▼   │
  ──► ((S0))────────────► (S1)
          ◄────────────────
                  1
```

| Current state | Input 0 | Input 1 |
| --- | --- | --- |
| S0 (start, accepting) | S0 | S1 |
| S1 | S1 | S0 |

Trace 10110: S0 →1→ S1 →0→ S1 →1→ S0 →1→ S1 →0→ S1. Ends in S1: rejected (three 1s). Trace 1001: S0 → S1 → S1 → S1 → S0: accepted.

### Worked example: Mealy machine

A Mealy machine reads a binary string and outputs 1 whenever the current bit differs from the previous one (and 0 otherwise). It outputs 0 for the first bit.

States: A (start, nothing read yet), P0 (last bit 0), P1 (last bit 1).

| Current | Input | Next | Output |
| --- | --- | --- | --- |
| A | 0 | P0 | 0 |
| A | 1 | P1 | 0 |
| P0 | 0 | P0 | 0 |
| P0 | 1 | P1 | 1 |
| P1 | 0 | P0 | 1 |
| P1 | 1 | P1 | 0 |

Input 0 0 1 1 0 → outputs 0, 0, 1, 0, 1. Output string 00101.

```python
# table-driven FSM simulation (Mealy)
table = {("A", "0"): ("P0", "0"), ("A", "1"): ("P1", "0"),
         ("P0", "0"): ("P0", "0"), ("P0", "1"): ("P1", "1"),
         ("P1", "0"): ("P0", "1"), ("P1", "1"): ("P1", "0")}

def run(s):
    state, out = "A", ""
    for ch in s:
        state, o = table[(state, ch)]
        out += o
    return out

print(run("00110"))   # 00101
```

### Common mistakes

- Leaving out a transition: every state needs an arrow for every input symbol (or the question must say missing ones go to a rejecting "trap" state).
- Forgetting to mark the start state or the accepting states.
- Giving a Mealy machine accepting states and ignoring the outputs: for Mealy machines the answer is the output string.

## 4.4.2.2 Maths for regular expressions

*Refs: AQA 4.4.2.2.*

### What you need to know

- A set is an unordered collection of values in which each value occurs at most once. A = {1, 2, 3, 4, 5}.
- Set comprehension: A = {x | x ∈ ℕ ∧ x ≥ 1} reads "the set of all x such that x is a natural number and x is at least 1". | means "such that", ∈ means "is a member of", ∧ means AND. In Python, `{2 * x for x in {1, 2, 3}}` gives {2, 4, 6}.
- ℕ is the natural numbers {0, 1, 2, 3, …} (AQA includes 0). ℤ integers, ℚ rationals, ℝ reals.
- The empty set {} or Ø has no elements.
- Compact representation: {0ⁿ1ⁿ | n ≥ 1} = {01, 0011, 000111, …}: strings of n 0s followed by the same number of 1s.
- Finite set: its elements can be counted off up to some last element. Infinite set: not finite (ℕ, ℝ).
- Countably infinite: infinite but can be counted off by the natural numbers (put in a one-to-one match with ℕ), such as ℕ itself, ℤ, or all strings over {a, b}. ℝ is not countable.
- Countable set: has the same cardinality as some subset of ℕ (so finite sets and countably infinite sets are countable).
- Cardinality of a finite set: the number of elements. |{a, b, c}| = 3.
- Cartesian product X × Y ("X cross Y"): the set of all ordered pairs (x, y) with x ∈ X and y ∈ Y. If |X| = m and |Y| = n, then |X × Y| = mn.
- Subset A ⊆ B: every element of A is in B (A may equal B). Proper subset A ⊂ B: A ⊆ B and B has at least one element not in A.
- Operations:
  - membership: x ∈ A, x ∉ A;
  - union A ∪ B: elements in A or B or both;
  - intersection A ∩ B: elements in both;
  - difference A \ B (or A − B): elements in A but not in B.

### Worked example

A = {1, 2, 3, 4}, B = {3, 4, 5}, C = {x | x ∈ ℕ ∧ x < 3} = {0, 1, 2}.

- A ∪ B = {1, 2, 3, 4, 5}; A ∩ B = {3, 4}; A \ B = {1, 2}; B \ A = {5}.
- |A × B| = 4 × 3 = 12. {a, b} × {0, 1} = {(a, 0), (a, 1), (b, 0), (b, 1)}.
- {3, 4} ⊂ A is true; A ⊂ A is false but A ⊆ A is true.
- C ⊆ ℕ and C ⊂ ℕ.

```python
A, B = {1, 2, 3, 4}, {3, 4, 5}
print(A | B, A & B, A - B, 3 in A, {3, 4} < A, A <= A)
# {1, 2, 3, 4, 5} {3, 4} {1, 2} True True True
from itertools import product
print(set(product({"a", "b"}, {0, 1})))
```

### Common mistakes

- Listing a set with repeats or treating order as meaningful: {1, 2} = {2, 1}.
- Confusing ⊂ (proper) with ⊆.
- Saying the Cartesian product has m + n elements. It has m × n.

## 4.4.2.3 Regular expressions

*Refs: AQA 4.4.2.3.*

### What you need to know

- A regular expression (regex) is a way of describing a set of strings (a language) in a compact notation.
- Metacharacters you must know:
  - `*` zero or more repetitions of the preceding item;
  - `+` one or more repetitions;
  - `?` zero or one (optional);
  - `|` alternation (or);
  - `( )` grouping.
- Any other metacharacters in an exam question (such as `[0-9]` or `.`) will be explained in the question.
- Concatenation (writing items side by side) means "followed by".
- Uses: validating input (postcodes, emails), search and replace in editors, extracting data from text, lexical analysis in compilers.
- Regular expressions and FSMs are equivalent ways of defining a regular language: for every regex there is an FSM accepting exactly that language, and for every FSM there is a regex.

### Worked example

What does each describe? (Alphabet {a, b} or {0, 1}.)

| Regex | Set of strings | Examples |
| --- | --- | --- |
| a(a\|b)* | a followed by any string of a and b | a, aa, ab, aba, abbb |
| ab*a | a, any number of b, then a | aa, aba, abba |
| ab+a | at least one b between the a's | aba, abba (not aa) |
| colou?r | the u is optional | color, colour |
| (01)+ | one or more copies of 01 | 01, 0101 |
| 1(0\|1)*0 | binary strings starting with 1 and ending with 0 (even numbers > 0 in binary, no leading zeros) | 10, 110, 1000 |

Write a regex for strings over {0, 1} that contain exactly two 1s: `0*10*10*`.

Convert this FSM to a regex. Start S1; S1 on a → S2; S2 on b → S2; S2 on c → S3 (accepting). Any string: a, then any number of b, then c. Regex: `ab*c`.

Convert regex `(a|b)c+` to an FSM:

| State | a | b | c |
| --- | --- | --- | --- |
| S0 (start) | S1 | S1 | trap |
| S1 | trap | trap | S2 |
| S2 (accepting) | trap | trap | S2 |
| trap | trap | trap | trap |

```python
import re
print(bool(re.fullmatch(r"a(a|b)*", "abba")))   # True
print(bool(re.fullmatch(r"0*10*10*", "01001")))   # True
print(bool(re.fullmatch(r"0*10*10*", "0111")))    # False
```

### Common mistakes

- Applying `*` to the whole expression instead of the single item before it: in `ab*`, only b repeats; for repeated ab write `(ab)*`.
- Confusing `+` (at least one) with `*` (possibly none).
- Forgetting that `*` allows the empty string.

## 4.4.2.4 Regular language

*Refs: AQA 4.4.2.4.*

### What you need to know

- A language (a set of strings over an alphabet) is regular if it can be represented by a regular expression. Equivalently, a regular language is any language that some FSM accepts.
- Some languages are not regular. {0ⁿ1ⁿ | n ≥ 1} is not regular: to check that the numbers of 0s and 1s match, a machine must count without limit, but an FSM has only a finite number of states, so it cannot remember an unbounded count. Balanced brackets are another non-regular language. These need a context-free grammar (file 13).

## Check questions

1. Draw a state transition table for an FSM over {a, b} that accepts strings ending in b. [3 marks]
2. For the "even number of 1s" FSM in this file, state whether 110110 is accepted and show the trace. [2 marks]
3. Explain the difference between an FSM with output (Mealy machine) and one without output. [2 marks]
4. A vending machine accepts 10p and 20p coins and releases a drink at 30p (no change given; extra money is kept). Draw a Mealy machine state transition table with output D (drink) or N (nothing). [4 marks]
5. A = {2, 4, 6, 8}, B = {x | x ∈ ℕ ∧ x < 5}. List B, then find A ∪ B, A ∩ B and B \ A. [4 marks]
6. How many elements are in {0, 1} × {a, b, c}? List them. [2 marks]
7. Explain the difference between a countably infinite set and a set that is not countable, with an example of each. [2 marks]
8. Write a regular expression for: (a) strings over {a, b} that start and end with a (length at least 2); (b) binary strings with at least one 1. [2 marks]
9. List all strings of length 3 or less in the language of `b(ab)*a?`. [3 marks]
10. Explain why the language {0ⁿ1ⁿ | n ≥ 1} cannot be recognised by an FSM. [2 marks]

## Mark scheme

1. States S0 (start, not accepting) and S1 (accepting) (1). S0: a → S0, b → S1 (1). S1: a → S0, b → S1 (1).
2. S0 →1→ S1 →1→ S0 →0→ S0 →1→ S1 →1→ S0 →0→ S0 (1); ends in accepting S0, so accepted (four 1s) (1).
3. Mealy machine produces an output on each transition, depending on state and input (1); FSM without output just accepts or rejects the input by finishing in an accepting state or not (1).
4. States 0p (start), 10p, 20p (1). 0p: 10/N → 10p, 20/N → 20p (1). 10p: 10/N → 20p, 20/D → 0p (1). 20p: 10/D → 0p, 20/D → 0p (1).
5. B = {0, 1, 2, 3, 4} (1). A ∪ B = {0, 1, 2, 3, 4, 6, 8} (1). A ∩ B = {2, 4} (1). B \ A = {0, 1, 3} (1).
6. 6 elements (1): (0,a), (0,b), (0,c), (1,a), (1,b), (1,c) (1).
7. Countably infinite: infinite but can be matched one-to-one with the natural numbers, e.g. ℕ or ℤ (1). Not countable: cannot be counted off this way, e.g. ℝ (1).
8. (a) a(a|b)*a (1). (b) (0|1)*1(0|1)* (accept 0*1(0|1)*) (1).
9. b, ba, bab (1 each for up to three correct with no incorrect strings; −1 for each wrong string). (bab + nothing; baba is length 4.)
10. Recognising it requires counting/remembering an unlimited number of 0s (1); an FSM has a finite number of states/no other memory, so it cannot (1).
