---
level: A-level
subject: Further Mathematics
topic: "Algorithms: sorting, packing and complexity"
as_content: "Option content. OCR 7.03 Stage 1 parts and MEI Modelling with Algorithms (also AS paper Y413) are AS; Edexcel D1 is also available at AS. Quick sort and run-time as a function of size are Stage 2 on OCR."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["D1 1.1", "D1 1.2", "D1 1.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["7.03a", "7.03b", "7.03c", "7.03d", "7.03e", "7.03f", "7.03g", "7.03h", "7.03i", "7.03j", "7.03k", "7.03l", "7.03m"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["AA1", "AA2", "AA3", "AA4", "AA5", "AA6", "AA7", "AA8", "AA9", "AA10", "AA11"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Algorithms: sorting, packing and complexity

This file covers what an algorithm is, tracing algorithms given as flowcharts, pseudocode or words, bubble sort, shuttle sort and quick sort, binary search, bin packing (next fit, first fit, first fit decreasing, full bins), heuristics, and the order (complexity) of an algorithm.

## Overview

Option content for Edexcel D1, OCR Discrete and MEI Modelling with Algorithms. Graph and network algorithms are in [51-graph-theory.md](51-graph-theory.md) and [52-network-algorithms.md](52-network-algorithms.md). AQA's Discrete option does not include sorting or packing.

### Board differences

- Edexcel D1 1.1 to 1.3: algorithms, bubble sort, quick sort (pivot = the middle item, or the one to the right of the middle for an even list), binary search, first fit, first fit decreasing, full bin packing, and orders of algorithms.
- OCR 7.03a to 7.03m: algorithms, efficiency and big-O, bubble and shuttle sorts (Stage 1), quick sort (Stage 2), next fit, first fit, first fit decreasing and further packing.
- MEI AA1 to AA11: algorithms (including proving correctness and heuristics), quick sort, counting comparisons and swaps, first fit and first fit decreasing.

## Algorithms and heuristics

*Refs: Edexcel D1 1.1 · OCR 7.03a, 7.03b, 7.03c · MEI AA1, AA2, AA3, AA4, AA5, AA6. Level: AS & A (OCR, MEI).*

### What you need to know

- An algorithm is a finite sequence of precise instructions that solves a problem; it has an input, an output and must stop.
- Trace an algorithm with a table of variable values, step by step.
- A heuristic algorithm gives a good solution quickly but not necessarily the optimal one (for example first fit, nearest neighbour).
- (MEI) Repair or adapt an algorithm; argue that an algorithm is correct.

### Worked example

Trace: "Let A = 48, B = 18. While B ≠ 0: let R = remainder of A ÷ B, A = B, B = R. Output A."

| A | B | R |
| --- | --- | --- |
| 48 | 18 | 12 |
| 18 | 12 | 6 |
| 12 | 6 | 0 |
| 6 | 0 | |

Output 6: the algorithm finds the highest common factor (Euclid's algorithm).

### Common mistakes

- Updating variables in the wrong order when tracing.

## Sorting and searching

*Refs: Edexcel D1 1.2 · OCR 7.03j, 7.03k · MEI AA7, AA8, AA9. Level: AS & A (quick sort A-level only on OCR).*

### What you need to know

- **Bubble sort**: compare adjacent pairs from the start, swapping if out of order; each pass puts the next largest at the end. Stop after a pass with no swaps. At most n − 1 passes and n(n − 1)/2 comparisons.
- **Shuttle sort** (OCR): on pass k, take the (k + 1)th item and move it left past larger items.
- **Quick sort**: choose a pivot, split the list into items less than the pivot (kept in order) and items greater, then repeat on each sublist until every item has been a pivot.
- **Binary search** (Edexcel) on an ordered list: compare with the middle item (pivot ⌈(first + last)/2⌉), discard the half that cannot contain the target, repeat.

### Worked example

Bubble sort 23, 8, 15, 42, 4, 16, 31 into ascending order.

1. Pass 1: 8, 15, 23, 4, 16, 31, 42.
2. Pass 2: 8, 15, 4, 16, 23, 31, 42.
3. Pass 3: 8, 4, 15, 16, 23, 31, 42.
4. Pass 4: 4, 8, 15, 16, 23, 31, 42.
5. Pass 5: no swaps, stop. Comparisons: 6 + 5 + 4 + 3 + 2 = 20.

Quick sort the same list (middle pivot).

1. Pivot 42: 23, 8, 15, 4, 16, 31 | 42.
2. Pivot 4: 4 | 23, 8, 15, 16, 31 | 42.
3. Pivot 15: 4 | 8 | 15 | 23, 16, 31 | 42.
4. Pivot 16: ... | 16 | 23, 31 | 42. Pivot 31: 23 | 31.
5. Sorted: 4, 8, 15, 16, 23, 31, 42.

Use binary search to find 35 in 3, 7, 12, 18, 21, 26, 30, 35, 41, 47, 52.

1. First 1, last 11: pivot 6th item 26 < 35, so first = 7.
2. Pivot ⌈(7 + 11)/2⌉ = 9th item 41 > 35, so last = 8.
3. Pivot ⌈7.5⌉ = 8th item 35: found in 3 comparisons.

### Common mistakes

- Stopping bubble sort before a pass with no swaps.
- Reordering the items in a quick sort sublist.

## Bin packing

*Refs: Edexcel D1 1.2 · OCR 7.03l, 7.03m · MEI AA10, AA11. Level: AS & A.*

### What you need to know

- Lower bound for the number of bins = ⌈total size ÷ bin capacity⌉.
- Next fit: put each item in the current bin if it fits, otherwise start a new bin (never go back).
- First fit: put each item in the first bin with room.
- First fit decreasing: sort into decreasing order first, then first fit.
- Full bin packing: look for combinations that fill bins exactly, then first fit the rest.
- These are heuristics: they may not give the optimal packing.

### Worked example

Pack items 8, 7, 14, 9, 6, 9, 5, 15, 6, 7 into bins of capacity 20.

1. Total 86, lower bound ⌈4.3⌉ = 5.
2. Next fit: [8, 7], [14], [9, 6], [9, 5], [15], [6, 7]: 6 bins.
3. First fit: [8, 7, 5], [14, 6], [9, 9], [15], [6, 7]: 5 bins.
4. First fit decreasing (15, 14, 9, 9, 8, 7, 7, 6, 6, 5): [15, 5], [14, 6], [9, 9], [8, 7], [7, 6]: 5 bins, optimal since it meets the lower bound.

### Common mistakes

- Forgetting to round the lower bound up.

## Order of an algorithm

*Refs: Edexcel D1 1.3 · OCR 7.03d, 7.03e, 7.03f, 7.03g, 7.03h, 7.03i · MEI AA8. Level: AS & A (OCR 7.03h, 7.03i A-level only).*

### What you need to know

- The order describes how the run time grows with the size n of the problem. Bubble sort is quadratic O(n²) in the worst case; first fit decreasing is O(n²); checking every pair of n items is O(n²); a triple loop is O(n³).
- Hierarchy (OCR): O(log n), O(n), O(n log n), O(n²), O(n³), O(aⁿ), from fastest to slowest growing.
- If an O(n²) algorithm takes t for size n, it takes about t(m/n)² for size m.

### Worked example

A bubble sort of 100 items takes 0.2 s. Estimate the time for 500 items.

1. Quadratic: 0.2 × (500/100)² = 5 s.

An O(n³) algorithm takes 4 s for n = 30. How long for n = 90?

1. 4 × 3³ = 108 s.

### Common mistakes

- Scaling linearly for a quadratic algorithm.

## Check questions

1. Use a bubble sort to put 12, 5, 9, 3, 15, 7 into descending order, showing each pass and the number of comparisons and swaps. [5 marks]
2. Use quick sort (middle pivot) to put 47, 12, 33, 8, 25, 61, 19, 40 into ascending order. [4 marks]
3. Items of size 4, 9, 3, 7, 5, 8, 6, 2, 9, 3 are packed into bins of capacity 15. (a) Find a lower bound. (b) Use first fit decreasing. (c) Is your packing optimal? [6 marks]
4. A first fit decreasing algorithm takes 0.6 s for 200 items. Estimate the time for 800 items, stating an assumption. [2 marks]
5. Use binary search to look for 20 in 2, 5, 9, 14, 17, 23, 28, 31. [3 marks]

## Mark scheme

1. Pass 1: 12, 9, 5, 15, 7, 3; pass 2: 12, 9, 15, 7, 5, 3; pass 3: 12, 15, 9, 7, 5, 3; pass 4: 15, 12, 9, 7, 5, 3; pass 5: no swaps (3). Comparisons 5 + 4 + 3 + 2 + 1 = 15 (1); swaps 3 + 2 + 1 + 1 = 7 (1).
2. Pivot 25 (5th of 8): 12, 8, 19 | 25 | 47, 33, 61, 40 (1). Sublists sorted with further pivots (2). 8, 12, 19, 25, 33, 40, 47, 61 (1).
3. (a) Total 56, ⌈56/15⌉ = 4 (2). (b) 9, 9, 8, 7, 6, 5, 4, 3, 3, 2: [9, 6], [9, 5], [8, 7], [4, 3, 3, 2] (3). (c) 4 bins = lower bound, so optimal (1).
4. Quadratic: 0.6 × 4² = 9.6 s, assuming time is proportional to n² (2).
5. Pivot ⌈(1 + 8)/2⌉ = 5th, 17 < 20: first = 6 (1). Pivot 7th, 28 > 20: last = 6 (1). Pivot 6th, 23 ≠ 20; list exhausted, 20 not in the list (1).
