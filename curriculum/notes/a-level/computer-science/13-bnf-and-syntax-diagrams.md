---
level: A-level
subject: Computer Science
topic: "Context-free languages: Backus-Naur form, syntax diagrams and language standards"
as_content: "A-level only for AQA."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.4.3.1"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.4: Programming paradigms"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# BNF and syntax diagrams

This file covers why programming languages need an unambiguous syntax, the need for language standards, Backus-Naur form (BNF) production rules, syntax diagrams, checking whether a string fits a grammar, and why BNF can describe languages that regular expressions cannot. Regular languages are in [12-finite-state-machines-and-regular-languages.md](12-finite-state-machines-and-regular-languages.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| BNF and syntax diagrams | Check syntax; write simple production rules; why BNF goes beyond regular expressions | Not required | Interpret and use syntax diagrams and BNF; extended BNF is not used |
| Ambiguity and standards | Not named | Not required | Ambiguity in natural language; need for standardised languages (C1.4) |

## Language standards and ambiguity

*Refs: Eduqas C1.4: Programming paradigms.*

### What you need to know

- Natural languages (English) are ambiguous: one sentence can have several meanings. "I saw the student with the telescope" (who has the telescope?). "Time flies like an arrow" can be parsed several ways. Spoken input adds more ambiguity (homophones such as "there/their", unclear word boundaries).
- A computer needs every statement to have exactly one meaning, so programming languages have a formally defined, unambiguous syntax (the rules for what is a valid program), which can be written in BNF or as syntax diagrams.
- Standardisation: an agreed, published definition of a language (by bodies such as ISO, ANSI or ECMA).
  - Benefits: programs are portable between compilers and computers; programmers' skills transfer; compiler writers know exactly what to implement; code is easier to maintain.
  - Difficulties: agreement between companies with commercial interests is slow; standards lag behind new features; vendors add their own extensions, so code using them is no longer portable; old code must keep working, which limits change.

## 4.4.3.1 Backus-Naur form and syntax diagrams

*Refs: AQA 4.4.3.1 · Eduqas C1.4: Programming paradigms.*

### What you need to know

- A grammar is a set of production rules that defines which strings belong to a language.
- BNF notation:
  - `::=` means "is defined as";
  - `|` means "or" (alternatives);
  - `<name>` in angle brackets is a non-terminal: something defined by another rule;
  - anything else (digits, letters, keywords, symbols) is a terminal: it appears in the final string as written.
- Rules can be recursive (a non-terminal used in its own definition). This is how BNF expresses repetition, since basic BNF has no `*` or `+`.
- Syntax diagrams show the same rules graphically: follow the arrows from left to right; rectangles are non-terminals (defined elsewhere), rounded boxes or circles are terminals; a loop back is repetition; a branch is a choice.
- To check a string, try to derive it from the start symbol by applying rules, or build a parse tree. If no derivation is possible, the string is not valid.
- Why BNF can represent languages that regular expressions cannot: BNF allows recursion with something on both sides (for example `<S> ::= 0<S>1 | 01`), which keeps two parts matched to any depth, such as balanced brackets or {0ⁿ1ⁿ}. A regular expression (or FSM) has no memory to count without limit. Languages defined by BNF are context-free languages; every regular language is context-free, but not the other way round.

### Worked example

Grammar for an identifier: a letter followed by any number of letters or digits.

```
<identifier> ::= <letter> | <identifier><letter> | <identifier><digit>
<letter>     ::= a | b | c | ... | z
<digit>      ::= 0 | 1 | 2 | ... | 9
```

Is `x2y` valid? Derive: `<identifier>` → `<identifier><letter>` → `<identifier><digit><letter>` → `<letter><digit><letter>` → x 2 y. Valid. `2xy` is not valid: every derivation of `<identifier>` starts with a `<letter>`.

Syntax diagram for the same rule:

```
identifier:

──► [letter] ──●──────────────────────► end
               │        ▲
               ▼        │
           ┌─[letter]─┐ │
           │          ├─┘     the loop below the line can be taken
           └─[digit]──┘       any number of times (including none)
```

Grammar for signed integers:

```
<integer>       ::= <unsigned> | <sign><unsigned>
<sign>          ::= + | -
<unsigned>      ::= <digit> | <digit><unsigned>
<digit>         ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

`-305` is valid: `<sign><unsigned>` → `-` `<digit><unsigned>` → `-3<digit><unsigned>` → `-30<digit>` → `-305`. `+-5` is not valid: only one sign is allowed.

A grammar no regular expression can match: balanced brackets.

```
<balanced> ::= () | (<balanced>) | <balanced><balanced>
```

`(()())`: `(<balanced>)` with inner `<balanced><balanced>` → `()` `()`. Valid. `(()` cannot be derived: invalid.

Writing production rules: define a UK-style car registration of the form two letters, two digits, a space, then three letters (for example AB12 CDE).

```
<reg>    ::= <letter><letter><digit><digit><space><letter><letter><letter>
<space>  ::= " "
```

(with `<letter>` and `<digit>` as before, using capitals).

```python
# A recursive-descent checker for <unsigned> ::= <digit> | <digit><unsigned>
def is_unsigned(s):
    if len(s) == 0:
        return False
    if len(s) == 1:
        return s in "0123456789"
    return s[0] in "0123456789" and is_unsigned(s[1:])
```

### Common mistakes

- Writing `<digit>*` in BNF. Repetition must be written with recursion in basic BNF (Eduqas: extended BNF is not used).
- Forgetting the non-recursive alternative, so the definition never ends (`<n> ::= <digit><n>` alone generates nothing finite).
- Treating `<letter>` as the letters l, e, t… It is a single non-terminal.
- Following a syntax diagram backwards against the arrows.

## Check questions

1. Explain why programming languages must have an unambiguous syntax. [2 marks]
2. (Eduqas) Give two benefits and one difficulty of standardising a programming language. [3 marks]
3. In BNF, explain the meaning of `::=`, `|` and `< >`. [3 marks]
4. Using the `<integer>` grammar in this file, state whether each is valid: (a) 007, (b) −, (c) +42, (d) 4−2. [4 marks]
5. Write BNF for a binary number made of one or more 0s and 1s. [2 marks]
6. Write BNF for a simple assignment of the form identifier = integer; using the identifier and integer rules above, for example `x1 = -40;`. [2 marks]
7. Give a derivation showing that `(())` is a valid `<balanced>` string. [2 marks]
8. Explain why BNF can describe the language of balanced brackets but a regular expression cannot. [2 marks]
9. A grammar has `<code> ::= <L><D> | <L><code><D>`, `<L> ::= A | B`, `<D> ::= 1 | 2`. Which of these are valid: AB21, A1B2, AAB112? Explain. [3 marks]
10. Draw a syntax diagram for `<unsigned>`. [2 marks]

## Mark scheme

1. Each statement must have exactly one meaning so the computer/translator can execute it predictably (1); natural language is ambiguous and could be interpreted in more than one way (1).
2. Benefits, any two: portability between compilers/machines; skills transfer between programmers; compiler writers know exactly what to implement (2). Difficulty: slow to agree/commercial interests/vendor extensions/standards lag behind (1).
3. `::=` is defined as (1); `|` or/alternative (1); `< >` encloses a non-terminal defined by another rule (1).
4. (a) valid (1); (b) invalid: a sign must be followed by a digit (1); (c) valid (1); (d) invalid: − may only appear at the start (1).
5. `<binary> ::= <bit> | <bit><binary>` (1); `<bit> ::= 0 | 1` (1).
6. `<assignment> ::= <identifier><space>=<space><integer>;` with `<space>` defined, or without spaces if stated (1 for structure, 1 for terminals = and ; in the right places).
7. `<balanced>` → `(<balanced>)` (1) → `(())` using `<balanced> ::= ()` (1).
8. BNF allows recursion that adds an opening and closing bracket together, so they stay matched to any depth (1); a regular expression/FSM has a finite number of states/no memory so cannot count unlimited nesting (1).
9. AB21 valid: A <code> 1 with <code> = B2 (1). A1B2 invalid: all letters must come before digits in a nested pattern (1). AAB112 valid: A (A (B1) 1) 2 — letters then digits with equal counts (1).
10. Arrow into a `digit` box, with a loop back from after `digit` to before it, and an exit arrow (1 for the box, 1 for the correct loop allowing one or more).
