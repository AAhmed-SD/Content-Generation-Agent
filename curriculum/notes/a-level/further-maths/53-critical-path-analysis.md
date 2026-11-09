---
level: A-level
subject: Further Mathematics
topic: "Critical path analysis"
as_content: "Option content. OCR 7.05a to 7.05c are Stage 1 (AS); 7.05d, 7.05e Stage 2. MEI AN8, AN9 are also in AS paper Y413. Edexcel D1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DE1", "DE2", "DE3", "DE4", "DE5", "DE6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D1 4.1", "D1 4.2", "D1 4.3", "D1 4.4", "D1 4.5", "D1 4.6"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.05a", "7.05b", "7.05c", "7.05d", "7.05e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AN8", "AN9"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Critical path analysis

This file covers precedence tables and activity networks (on node and on arc, with dummies), forward and backward passes, earliest and latest times, critical activities and paths, float, Gantt (cascade) charts, resource histograms, resource levelling and scheduling with limited workers.

## Overview

Option content. Graph language is in [51-graph-theory.md](51-graph-theory.md).

### Board differences

- AQA DE1 to DE6 uses activity-on-node networks, and includes refining models, Gantt charts, resource histograms and resource levelling.
- Edexcel D1 4.1 to 4.6 uses activity-on-arc networks with dummies, total float, a lower bound for the number of workers, resource histograms, and scheduling.
- OCR 7.05a to 7.05e: activity networks, forward and backward passes, float, cascade charts and resources.
- MEI AN8, AN9 uses activity-on-arc.

## DE1 Activity networks

*Refs: AQA DE1 · Edexcel D1 4.1, 4.2 · OCR 7.05a · MEI AN8. Level: AS & A.*

### What you need to know

- A precedence table lists each activity, its duration and its immediate predecessors.
- Activity on node: each activity is a node; arrows show precedence; add start and end nodes.
- Activity on arc: each activity is an arc between event nodes. Dummies (dashed, zero duration) show dependencies that cannot otherwise be drawn, and make sure each activity is uniquely defined by its start and end events.

### Worked example

| Activity | Duration | Preceded by |
| --- | --- | --- |
| A | 3 | – |
| B | 5 | – |
| C | 4 | A |
| D | 6 | A |
| E | 2 | B, C |
| F | 5 | D, E |
| G | 4 | E |

In activity on arc: number the events 0 to 5.

1. A goes 0 → 1 and B goes 0 → 2. C goes 1 → 2, so B and C both end at event 2, which starts E.
2. D goes 1 → 4. E goes 2 → 3, and G leaves event 3 (G depends on E only).
3. F needs both D and E, so draw a dummy from event 3 to event 4; F goes 4 → 5, and G ends at 5.

### Common mistakes

- Two activities with the same start and end events (use a dummy).

## DE2 Earliest and latest times, critical path and float

*Refs: AQA DE2, DE3, DE4 · Edexcel D1 4.3 · OCR 7.05b, 7.05c, 7.05d · MEI AN9. Level: AS & A (OCR 7.05d A-level only).*

### What you need to know

- Forward pass: earliest start = the largest earliest finish of the predecessors.
- Backward pass: latest finish = the smallest latest start of the successors; the project's latest finish = the minimum completion time.
- Critical activity: earliest start = latest start (zero float). A critical path is a path of critical activities from start to end.
- Total float = latest finish − duration − earliest start.

### Worked example

For the table above, find the earliest and latest times, the critical activities and the floats.

| Activity | ES | EF | LS | LF | Float |
| --- | --- | --- | --- | --- | --- |
| A | 0 | 3 | 0 | 3 | 0 |
| B | 0 | 5 | 2 | 7 | 2 |
| C | 3 | 7 | 3 | 7 | 0 |
| D | 3 | 9 | 3 | 9 | 0 |
| E | 7 | 9 | 7 | 9 | 0 |
| F | 9 | 14 | 9 | 14 | 0 |
| G | 9 | 13 | 10 | 14 | 1 |

1. Minimum completion time 14.
2. Critical activities A, C, D, E, F; critical paths A–C–E–F and A–D–F.
3. (AQA DE4) If D takes 7 instead of 6, the project takes 15; if B takes 6, nothing changes because B has 2 float.

### Common mistakes

- Using the smallest earliest finish in the forward pass.

## DE5 Gantt charts, resources and scheduling

*Refs: AQA DE5, DE6 · Edexcel D1 4.4, 4.5, 4.6 · OCR 7.05e. Level: A-level only (OCR); option (AQA, Edexcel).*

### What you need to know

- Gantt (cascade) chart: each activity as a bar from its earliest start, with its float shown; critical activities on one line.
- Resource histogram: number of workers needed at each time.
- Lower bound for workers (Edexcel) = ⌈sum of all durations ÷ critical path length⌉.
- Resource levelling: use float to move non-critical activities to smooth the histogram or keep within a worker limit, possibly extending the project.
- Scheduling: at each time, give an available worker the activity with the least latest finish (or least float) that can start.

### Worked example

Assuming each activity needs one worker, find a lower bound for the number of workers to finish in 14 days.

1. Sum of durations 29. ⌈29/14⌉ = 3.

With one worker per activity, how many workers are needed at time 3.5 if everything starts as early as possible?

1. Running at 3.5: B (0 to 5), C (3 to 7), D (3 to 9). Three workers.

### Common mistakes

- Rounding the worker lower bound down.

## Check questions

1. Draw an activity-on-node network for: P (2, –), Q (4, –), R (3, P), S (5, P, Q), T (2, R, S). Find the minimum completion time and the critical path. [5 marks]
2. For question 1, find the float of each activity. [3 marks]
3. A project has total activity time 47 and critical path length 15. Find a lower bound for the number of workers. [2 marks]
4. Explain why a dummy might be needed in an activity-on-arc network. [2 marks]

## Mark scheme

1. Network drawn correctly (2). ES: P 0, Q 0, R 2, S 4, T 9; completion 11 (2). Critical path Q–S–T (1).
2. LF: T 11, S 9, R 9, P 4, Q 4. Floats: P 2, Q 0, R 4, S 0, T 0 (3).
3. ⌈47/15⌉ = ⌈3.13⌉ = 4 (2).
4. To show a dependency that a single arc cannot (when activities share some but not all predecessors) (1), or to keep each activity uniquely identified by its events (1).
