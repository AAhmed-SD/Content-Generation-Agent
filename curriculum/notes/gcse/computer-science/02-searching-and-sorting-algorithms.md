---
level: GCSE
subject: Computer Science
topic: "Searching and sorting algorithms"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.1.2", "3.1.3", "3.1.4"]
  - board: OCR
    code: "J277"
    spec_refs: ["2.1.3"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["1.2.6", "1.2.7", "6.1.6"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["8: Sorting", "8: Searching"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Searching and sorting algorithms

This file covers the standard searching algorithms (linear search and binary search) and the standard sorting algorithms (bubble sort, merge sort and, for OCR, insertion sort): how each works step by step, how to apply it to a data set, how to recognise it from code, and how they compare.

## Overview

You must be able to carry out each algorithm by hand on a small data set, showing the state of the data after each step. You do not need to memorise code, but you should recognise each algorithm from code or pseudocode and be able to complete missing lines.

### Board differences

- AQA 8525: linear and binary search (3.1.3); bubble and merge sort (3.1.4); compare them (3.1.2). Paper 1.
- OCR J277: linear and binary search; bubble, merge and insertion sort (2.1.3). OCR is the only board with insertion sort. OCR says you need not remember the code, but must identify an algorithm from code, pseudocode or ERL and know its pre-requisites. J277/02.
- Edexcel 1CP2: bubble sort, merge sort, linear search, binary search (1.2.6), and evaluating efficiency by number of compares, passes and memory (1.2.7, 6.1.6). You may be asked to code a search in Python in Paper 2.
- Eduqas C500QS: the characteristics of merge and bubble sort, and of linear and binary search (8: Sorting, 8: Searching). Component 1.

## Linear search

*Refs: AQA 3.1.3 · OCR 2.1.3 · Edexcel 1.2.6 · Eduqas 8: Searching.*

### What you need to know

- Look at each item in turn, from the first, until the target is found or the end of the list is reached.
- Works on unsorted or sorted data.
- Simple to code. Slow on large lists: in the worst case it checks every item.

### Explained

```python
def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i          # found: return its position
    return -1                 # not found
```

For a list of n items: best case 1 comparison (the target is first), worst case n comparisons (last or missing), average about n ÷ 2.

### Worked example

Search [14, 3, 27, 9, 31] for 9.

| Step | Index | Item | Equal to 9? |
| --- | --- | --- | --- |
| 1 | 0 | 14 | No |
| 2 | 1 | 3 | No |
| 3 | 2 | 27 | No |
| 4 | 3 | 9 | Yes: return 3 |

4 comparisons.

### Common mistakes

- Saying linear search needs sorted data. It does not.
- Returning "not found" inside the loop after the first mismatch, so only one item is checked.

## Binary search

*Refs: AQA 3.1.3 · OCR 2.1.3 · Edexcel 1.2.6 · Eduqas 8: Searching.*

### What you need to know

- Pre-requisite: the list must be sorted.
- Look at the middle item. If it is the target, stop. If the target is smaller, discard the middle item and everything above it; if larger, discard the middle and everything below. Repeat on the half that is left until found, or until nothing is left (not found).
- Each comparison halves the part still to search, so it is much faster than linear search on large lists: 1000 sorted items need at most 10 comparisons; 1 000 000 need at most 20.

### Explained

```python
def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

When there is an even number of items, there are two "middle" items. Integer division `(low + high) // 2` picks the lower one. Either choice is accepted in exams as long as you are consistent.

### Worked example

Search [3, 8, 11, 15, 21, 26, 30, 34, 42] for 30.

| low | high | mid | items[mid] | Action |
| --- | --- | --- | --- | --- |
| 0 | 8 | 4 | 21 | 21 < 30, so low = 5 |
| 5 | 8 | 6 | 30 | Found at index 6 |

Two comparisons. A linear search would need 7.

Search the same list for 9.

| low | high | mid | items[mid] | Action |
| --- | --- | --- | --- | --- |
| 0 | 8 | 4 | 21 | 21 > 9, so high = 3 |
| 0 | 3 | 1 | 8 | 8 < 9, so low = 2 |
| 2 | 3 | 2 | 11 | 11 > 9, so high = 1 |
| 2 | 1 | | | low > high: not found |

### Common mistakes

- Using binary search on unsorted data.
- Keeping the middle item in the next half (setting `low = mid` instead of `mid + 1`), which can loop forever.
- Describing it as "split the list in half" without saying which half is kept and why.

## Comparing linear and binary search

*Refs: AQA 3.1.2, 3.1.3 · OCR 2.1.3 · Edexcel 1.2.7 · Eduqas 8: Searching.*

| | Linear search | Binary search |
| --- | --- | --- |
| Data must be sorted? | No | Yes |
| Worst case for n items | n comparisons | About log₂ n comparisons |
| Code | Very simple | More complex |
| Best for | Small or unsorted lists; lists that change often | Large sorted lists searched often |

If a list is unsorted and only searched once, sorting it first and then binary searching costs more than one linear search.

## Bubble sort

*Refs: AQA 3.1.4 · OCR 2.1.3 · Edexcel 1.2.6 · Eduqas 8: Sorting.*

### What you need to know

- Compare the first two items; if they are in the wrong order, swap them. Move along one place and compare the next pair. Continue to the end: this is one pass.
- After each pass the largest unsorted item has "bubbled" to its final place at the end.
- Repeat passes until a whole pass makes no swaps (then the list is sorted), or until n − 1 passes have been done.
- Simple; sorts in place (uses little extra memory). Slow for large lists: up to n(n − 1) ÷ 2 comparisons.

### Explained

```python
def bubble_sort(items):
    n = len(items)
    swapped = True
    while swapped:
        swapped = False
        for i in range(n - 1):
            if items[i] > items[i + 1]:
                items[i], items[i + 1] = items[i + 1], items[i]
                swapped = True
        n = n - 1          # the last item is now in place
    return items
```

In languages without Python's tuple swap you need a temporary variable: `temp = a; a = b; b = temp`.

### Worked example

Sort [5, 1, 4, 2, 8] into ascending order.

Pass 1:

| Compare | Swap? | List after |
| --- | --- | --- |
| 5, 1 | Yes | 1, 5, 4, 2, 8 |
| 5, 4 | Yes | 1, 4, 5, 2, 8 |
| 5, 2 | Yes | 1, 4, 2, 5, 8 |
| 5, 8 | No | 1, 4, 2, 5, 8 |

Pass 2: 1, 4 no; 4, 2 swap → 1, 2, 4, 5, 8; 4, 5 no. (8 is already in place.)

Pass 3: no swaps, so the algorithm stops. Sorted: 1, 2, 4, 5, 8.

### Common mistakes

- Writing the list only at the end of each pass when the question asks for each swap, or the other way round. Read what the table wants.
- Stopping after one pass because the largest item is in place.
- Forgetting that a final pass with no swaps is needed to know the list is sorted.

## Merge sort

*Refs: AQA 3.1.4 · OCR 2.1.3 · Edexcel 1.2.6 · Eduqas 8: Sorting.*

### What you need to know

- Divide: split the list in half, again and again, until every sub-list has one item (a list of one item is sorted).
- Conquer (merge): merge pairs of sub-lists into sorted lists by repeatedly taking the smaller front item of the two. Repeat until one sorted list remains.
- Much faster than bubble sort on large lists. Uses more memory, because the merges build new lists. More complex to code (usually recursive).

### Explained

Merging two sorted lists [2, 6] and [4, 9]: compare fronts 2 and 4, take 2; compare 6 and 4, take 4; compare 6 and 9, take 6; only 9 left, take it. Result [2, 4, 6, 9].

```python
def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    merged = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i = i + 1
        else:
            merged.append(right[j])
            j = j + 1
    merged = merged + left[i:] + right[j:]
    return merged
```

Recursion (a subprogram calling itself) is not on the GCSE specs; you only need to recognise the split-and-merge pattern.

### Worked example

Sort [6, 2, 9, 4, 7, 1, 3, 8].

1. Split: [6, 2, 9, 4] [7, 1, 3, 8]
2. Split: [6, 2] [9, 4] [7, 1] [3, 8]
3. Split: [6] [2] [9] [4] [7] [1] [3] [8]
4. Merge pairs: [2, 6] [4, 9] [1, 7] [3, 8]
5. Merge pairs: [2, 4, 6, 9] [1, 3, 7, 8]
6. Merge: [1, 2, 3, 4, 6, 7, 8, 9]

If a list has an odd length, one half has one more item; for [5, 3, 8] split as [5] [3, 8] or [5, 3] [8]. Either is accepted.

### Common mistakes

- Merging by joining two lists and then "sorting" them. The merge itself compares front items.
- Skipping the split stages. Questions often give marks for showing the list split down to single items.

## Insertion sort (OCR)

*Refs: OCR 2.1.3.*

### What you need to know

- Treat the first item as a sorted list of one. Take the next item and insert it into the correct place in the sorted part, shifting larger items one place right. Repeat for every item.
- Simple; sorts in place; fast for small or nearly sorted lists; slow for large unsorted lists.

### Explained

```python
def insertion_sort(items):
    for i in range(1, len(items)):
        current = items[i]
        j = i - 1
        while j >= 0 and items[j] > current:
            items[j + 1] = items[j]   # shift right
            j = j - 1
        items[j + 1] = current
    return items
```

### Worked example

Sort [7, 3, 5, 1]. The sorted part is shown before the bar.

| Step | Insert | List |
| --- | --- | --- |
| Start | | 7 \| 3, 5, 1 |
| 1 | 3 | 3, 7 \| 5, 1 |
| 2 | 5 | 3, 5, 7 \| 1 |
| 3 | 1 | 1, 3, 5, 7 |

### Common mistakes

- Confusing insertion sort with bubble sort. Insertion sort grows a sorted section at the start; bubble sort fixes the largest item at the end each pass.

## Comparing sorting algorithms

*Refs: AQA 3.1.2, 3.1.4 · OCR 2.1.3 · Edexcel 1.2.7, 6.1.6 · Eduqas 8: Sorting.*

| | Bubble sort | Merge sort | Insertion sort (OCR) |
| --- | --- | --- | --- |
| Speed on large lists | Slow | Fast | Slow |
| Speed on nearly sorted lists | Fast (few passes) | Same as usual | Very fast |
| Memory | In place, very little extra | Needs extra memory for sub-lists | In place |
| Ease of coding | Easy | Harder | Easy |

### Worked example

Count comparisons for a bubble sort of 6 items with no early stop.

1. Pass 1: 5 comparisons; pass 2: 4; pass 3: 3; pass 4: 2; pass 5: 1.
2. Total 15 = 6 × 5 ÷ 2.

## Check questions

1. State one condition the data must meet before a binary search can be used. [1 mark]
2. Show the steps of a binary search for 52 in [4, 10, 19, 23, 37, 41, 52, 60, 77]. [3 marks]
3. Show the list after each pass of a bubble sort on [9, 4, 6, 2] (ascending). [3 marks]
4. Show how a merge sort would sort [38, 12, 45, 7, 21, 30]. [4 marks]
5. Give one advantage of bubble sort over merge sort, and one advantage of merge sort over bubble sort. [2 marks]
6. A list of 2000 product codes is unsorted and is searched once. Explain why a linear search is the better choice here. [2 marks]
7. (OCR) Show the stages of an insertion sort on [4, 2, 8, 1]. [3 marks]
8. Identify the algorithm in this code and state what it returns if `x` is not in `data`. [2 marks]

```python
def find(data, x):
    for k in range(len(data)):
        if data[k] == x:
            return k
    return -1
```

## Mark scheme

1. The data must be sorted (in order) (1).
2. mid index 4 = 37; 52 > 37 so search upper half (1). low 5, high 8, mid 6 = 52 (1); found at index 6 (1). Accept a choice of the upper middle if consistent.
3. After pass 1: 4, 6, 2, 9 (1). After pass 2: 4, 2, 6, 9 (1). After pass 3: 2, 4, 6, 9, and a further pass with no swaps (or n − 1 passes done) (1).
4. Split to [38, 12, 45] [7, 21, 30] (1); down to single items (1); merge to e.g. [12, 38] [45] → [12, 38, 45] and [7, 21, 30] (1); final merge [7, 12, 21, 30, 38, 45] (1).
5. Bubble: uses less memory / simpler to code / fast on nearly sorted data (1). Merge: faster (fewer comparisons) on large lists (1).
6. Binary search needs sorted data, so the list would have to be sorted first (1); sorting takes longer than one linear search, so for a single search linear is quicker overall (1).
7. [2, 4, 8, 1] (1); [2, 4, 8, 1] with 8 already in place (1); [1, 2, 4, 8] (1).
8. Linear search (1); −1 (1).
