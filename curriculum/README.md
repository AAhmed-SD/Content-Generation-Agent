# Offload curriculum notes

Original revision notes for every GCSE and A-level topic Offload supports, one file per topic, ready for Cursor to load into the database.

The catalogue of qualifications, the database shape and the build rules are in the doc "Offload GCSE and A-level content build" (https://claude.ai/artifact/M7J1XBB6tSKdEvEyGpvTYL).

## Folder layout

```
curriculum/
  README.md            this file
  progress.md          which qualifications and topics are written
  notes/<board>/<level>/<subject>-<code>/<topic-number>-<topic-slug>.md
```

Example: `notes/aqa/gcse/biology-8461/4.1-cell-biology.md`.

Subjects whose content is the same across boards (maths, further maths, statistics, computer science, and the A-level sciences, which share government subject content) are written once as concept files under `notes/<level>/<subject>/`, for example `notes/gcse/maths/`. Each such file lists every board's spec references it covers in its front matter (`boards:` below), and notes board differences in a `### Board differences` part. Each subject folder also has a `map.md` that lists, for every board and spec point in order, the file that covers it, so Cursor can load a student's exact spec.

```yaml
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["N1", "N2"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["N1", "N2"]
```

## File format

Each topic file starts with YAML front matter, then the notes.

```yaml
---
board: AQA
level: GCSE
subject: Biology
code: "8461"
also_covers:          # other qualifications whose spec points map to this same file
  - "AQA 8464 Combined Science: Trilogy (not the Biology only parts)"
topic: "4.1 Cell biology"
spec_refs: ["4.1.1.1", "4.1.1.2"]   # numbers from the board spec
refs_checked: false   # true once a person has matched every ref to the spec PDF
spec_url: https://...
pmt_url: https://...  # link out only; nothing from PMT is copied
---
```

The body is split by spec point (`## 4.1.1.1 Heading`). Each spec point has the same parts, as level-3 headings:

1. `### What you need to know`: the facts the spec examines, as bullets.
2. `### Explained`: the ideas in plain words.
3. `### Worked example`: only where there is a calculation or a method.
4. `### Common mistakes`
5. `### Practical`: only where the spec names a required practical.

Each topic file ends with `## Check questions`, original exam-style questions with marks, and `## Mark scheme`.

Tags inside the text:

- `(Biology only)`: not in Combined Science.
- `(HT only)`: higher tier only.

## Rules

- Every word is original. Nothing is copied from PMT, Save My Exams, textbooks, past papers or mark schemes.
- Questions are written from scratch in exam style, never adapted from a board's paper.
- Notes cover the spec point, no more and no less. Anything beyond the spec is left out.
- Spec numbers are from the board spec. Set `refs_checked: true` only after a person checks them against the spec PDF.
