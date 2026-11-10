---
level: A-level
subject: Computer Science
topic: "Searching (linear, binary, binary tree) and sorting (bubble, insertion, merge, quick) with complexity"
as_content: "A-level only for AQA. OCR AS H046 includes bubble sort, insertion sort, binary search and linear search; merge sort, quick sort and Big-O analysis are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.3.4.1", "4.3.4.2", "4.3.4.3", "4.3.5.1", "4.3.5.2"]
  - board: OCR
    code: "H446"
    spec_refs: ["2.3.1(a)", "2.3.1(f)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Sorting", "C1.3: Searching"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Searching and sorting algorithms

This file covers linear search, binary search and binary tree search, and bubble sort, insertion sort, merge sort and quick sort: how each works, traces, code, time and space complexity, and when to use each. Big-O itself is explained in [14-big-o-and-limits-of-computation.md](14-big-o-and-limits-of-computation.md).

Builds on [GCSE: Searching and sorting algorithms](../../gcse/computer-science/02-searching-and-sorting-algorithms.md), which covers linear and binary search, bubble, merge and insertion sort without complexity analysis. Here you also analyse them, write them, and learn quick sort.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Searches | Linear O(n), binary O(log n), binary tree search O(log n) | Linear and binary search | Linear and binary search; when to use each; Big-O for time and space |
| Sorts | Bubble O(n²), merge O(n log n) | Bubble, insertion, merge, quick | Bubble, insertion, quicksort; need for recursive and non-recursive sorts |
| Extra | Merge sort as divide and conquer | Compare suitability for a task and data set | Effect of storage space, comparisons, exchanges and passes on efficiency |

AQA does not require insertion or quick sort, but they make good comparison material.

## 4.3.4.1 Linear search

*Refs: AQA 4.3.4.1 · OCR 2.3.1(f) · Eduqas C1.3: Searching.*

### What you need to know

- Check each item in turn from the start until the target is found or the list ends.
- Works on unsorted data and on structures without direct access (linked lists).
- Time: best case O(1) (first item); worst and average O(n). Space: O(1) extra.

```python
def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1
```

## 4.3.4.2 Binary search

*Refs: AQA 4.3.4.2 · OCR 2.3.1(f) · Eduqas C1.3: Searching.*

### What you need to know

- The data must be sorted and allow direct access by index (an array).
- Compare the target with the middle item. If equal, done. If the target is smaller, search the left half; if larger, the right half. Repeat until found or the search range is empty.
- Each comparison halves the range, so at most about log₂ n + 1 comparisons: O(log n). A million items need at most 20 comparisons.
- Iterative space O(1); recursive space O(log n) for the call stack.

### Worked example

Find 47 in [3, 9, 14, 21, 30, 38, 47, 52, 66, 71] (indices 0 to 9), with mid = (low + high) DIV 2.

| low | high | mid | items[mid] | Action |
| --- | --- | --- | --- | --- |
| 0 | 9 | 4 | 30 | 47 > 30 → low = 5 |
| 5 | 9 | 7 | 52 | 47 < 52 → high = 6 |
| 5 | 6 | 5 | 38 | 47 > 38 → low = 6 |
| 6 | 6 | 6 | 47 | found at index 6 |

Searching for 40 would continue to low = 6, high = 5: low > high, so not found.

```python
def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif target < items[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return -1

def binary_search_rec(items, target, low, high):
    if low > high:
        return -1                     # base case: not found
    mid = (low + high) // 2
    if items[mid] == target:
        return mid
    if target < items[mid]:
        return binary_search_rec(items, target, low, mid - 1)
    return binary_search_rec(items, target, mid + 1, high)
```

### Common mistakes

- Using binary search on unsorted data.
- Setting `high = mid` rather than `mid − 1`, which can loop forever.
- Forgetting the cost of sorting first: for a single search of unsorted data, linear search is quicker overall.

## 4.3.4.3 Binary tree search

*Refs: AQA 4.3.4.3 · OCR 2.3.1(e).*

### What you need to know

- Search a binary search tree: start at the root; if the target equals the node, found; if smaller, go to the left child; if larger, go right; if you reach a null pointer, it is not there.
- Balanced tree: O(log n), because each step drops one level and the height is about log₂ n. Unbalanced (degenerate) tree, such as one built from sorted data: O(n).
- Advantage over binary search on an array: insertions and deletions do not shift items.

```python
def tree_search(node, target):
    while node is not None:
        if target == node.data:
            return True
        node = node.left if target < node.data else node.right
    return False
```

Using the tree in file 06 (50, 30, 70, 20, 40, 60, 80, 35), finding 35 visits 50 → 30 → 40 → 35: four comparisons.

## 4.3.5.1 Bubble sort

*Refs: AQA 4.3.5.1 · OCR 2.3.1(f) · Eduqas C1.3: Sorting.*

### What you need to know

- Compare each pair of adjacent items and swap them if they are in the wrong order. One pass moves the largest unsorted item to its final place at the end. Repeat passes until a pass makes no swaps.
- Improvements: each pass can stop one item earlier; stop as soon as a pass makes no swaps.
- Time: worst and average O(n²) (about n²/2 comparisons); best O(n) on already-sorted data with the no-swap flag. Space O(1): it sorts in place.
- AQA uses it as the example of a time-inefficient sort. Its advantages are simplicity and low memory.

### Worked example

Sort [5, 1, 4, 2, 8].

| Pass | Comparisons and swaps | Result |
| --- | --- | --- |
| 1 | 5>1 swap; 5>4 swap; 5>2 swap; 5<8 no | [1, 4, 2, 5, 8] |
| 2 | 1<4; 4>2 swap; 4<5 | [1, 2, 4, 5, 8] |
| 3 | 1<2; 2<4; no swaps | stop: sorted |

```python
def bubble_sort(a):
    n = len(a)
    swapped = True
    while swapped:
        swapped = False
        for i in range(n - 1):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        n -= 1                      # last item now in place
    return a
```

## Insertion sort

*Refs: OCR 2.3.1(f) · Eduqas C1.3: Sorting.*

### What you need to know

- Build a sorted part at the start of the list. Take the next unsorted item and move it left past every larger item in the sorted part, then insert it.
- Time: worst and average O(n²); best O(n) for nearly sorted data, where it is very fast. Space O(1), in place. Stable (equal items keep their order).
- Good for small or nearly sorted lists and for data arriving one item at a time.

### Worked example

Sort [6, 3, 8, 1].

| Step | Item | Sorted part after insertion |
| --- | --- | --- |
| start | | [6] |
| 1 | 3 | 3 < 6, shift 6 right: [3, 6] |
| 2 | 8 | 8 > 6, stays: [3, 6, 8] |
| 3 | 1 | shift 8, 6, 3 right: [1, 3, 6, 8] |

```python
def insertion_sort(a):
    for i in range(1, len(a)):
        current = a[i]
        j = i - 1
        while j >= 0 and a[j] > current:
            a[j + 1] = a[j]           # shift larger item right
            j -= 1
        a[j + 1] = current
    return a
```

## 4.3.5.2 Merge sort

*Refs: AQA 4.3.5.2 · OCR 2.3.1(f).*

### What you need to know

- A divide and conquer algorithm: split the list in half repeatedly until each sub-list has one item (a one-item list is sorted), then merge pairs of sorted sub-lists into larger sorted lists until one list remains.
- Merging two sorted lists: compare the front items, move the smaller to the output, repeat; then copy what remains.
- Time: O(n log n) in every case. There are about log₂ n levels of splitting, and each level does O(n) work merging.
- Space: O(n) extra for the merged lists (not in place). Stable.
- Faster than bubble or insertion sort for large lists; slower setup and more memory, so not ideal for tiny lists.

### Worked example

Sort [38, 27, 43, 3, 9, 82, 10, 5].

```
Split:  [38 27 43 3] [9 82 10 5]
        [38 27] [43 3] [9 82] [10 5]
        [38] [27] [43] [3] [9] [82] [10] [5]
Merge:  [27 38] [3 43] [9 82] [5 10]
        [3 27 38 43]   [5 9 10 82]
        [3 5 9 10 27 38 43 82]
```

Final merge in detail: compare 3 and 5 → 3; 27 and 5 → 5; 27 and 9 → 9; 27 and 10 → 10; right list empty after 82 is compared... continuing: 27 vs 82 → 27; 38 vs 82 → 38; 43 vs 82 → 43; copy 82.

```python
def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)

def merge(left, right):
    out = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:       # <= keeps it stable
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out
```

## Quick sort

*Refs: OCR 2.3.1(f) · Eduqas C1.3: Sorting.*

### What you need to know

- Divide and conquer. Choose a pivot (often the first or middle item). Partition: rearrange so items smaller than the pivot are on its left and larger on its right; the pivot is now in its final place. Recursively quick sort the left and right parts.
- Time: average O(n log n); worst O(n²) when the pivot is always the smallest or largest item (for example first-item pivot on already sorted data). Good pivot choices (middle, median of three, random) make the worst case rare.
- Space: in place apart from the recursion stack, O(log n) on average. Not stable. Usually the fastest general-purpose sort in practice.

### Worked example

Sort [7, 2, 9, 4, 1, 8] with the first item as pivot (simple list-partition version).

1. Pivot 7: smaller [2, 4, 1], larger [9, 8] → [2, 4, 1] + [7] + [9, 8].
2. [2, 4, 1], pivot 2: smaller [1], larger [4] → [1, 2, 4].
3. [9, 8], pivot 9: smaller [8] → [8, 9].
4. Result [1, 2, 4, 7, 8, 9].

```python
def quick_sort(a):
    if len(a) <= 1:
        return a
    pivot = a[0]
    smaller = [x for x in a[1:] if x < pivot]
    larger = [x for x in a[1:] if x >= pivot]
    return quick_sort(smaller) + [pivot] + quick_sort(larger)

# in-place version with two pointers (Hoare-style), as often shown in exams
def quick_sort_inplace(a, low=0, high=None):
    if high is None:
        high = len(a) - 1
    if low >= high:
        return
    pivot = a[(low + high) // 2]
    i, j = low, high
    while i <= j:
        while a[i] < pivot: i += 1
        while a[j] > pivot: j -= 1
        if i <= j:
            a[i], a[j] = a[j], a[i]
            i += 1; j -= 1
    quick_sort_inplace(a, low, j)
    quick_sort_inplace(a, i, high)
```

## Comparing algorithms

*Refs: OCR 2.3.1(a), 2.3.1(f) · Eduqas C1.3: Sorting, Searching.*

| Algorithm | Best | Average | Worst | Extra space | Notes |
| --- | --- | --- | --- | --- | --- |
| Linear search | O(1) | O(n) | O(n) | O(1) | Any data |
| Binary search | O(1) | O(log n) | O(log n) | O(1) iterative | Sorted, indexed data |
| Binary tree search | O(1) | O(log n) | O(n) | O(1) | Degenerate tree is the worst |
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) | Simple; many swaps |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) | Fast for nearly sorted data |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Predictable; stable; good for huge data and linked lists |
| Quick sort | O(n log n) | O(n log n) | O(n²) | O(log n) stack | Usually fastest in practice |

Eduqas asks you to explain efficiency in terms of:

- storage space (in-place sorts need almost none; merge sort needs a second copy);
- number of comparisons (dominant cost for most sorts);
- number of exchanges (swaps): bubble sort may swap many times per pass; insertion sort shifts instead; selection-style sorts swap once per pass;
- number of passes through the data (bubble sort may need n − 1; the early-exit flag can cut this to 1 for sorted data).

Why have several sorts (Eduqas)? No sort is best for every case: data size, how sorted the data already is, memory available, whether stability matters, and whether recursion is acceptable (recursive sorts use stack space and can overflow on huge inputs) all change the best choice.

### Common mistakes

- Saying merge sort is O(n²) in the worst case. It is always O(n log n); it is quick sort that degrades.
- Saying quick sort needs no memory at all. Recursion uses stack space.
- Forgetting that binary search needs sorted data.

## Check questions

1. State two conditions needed for binary search to be used. [2 marks]
2. Trace a binary search for 15 in [2, 5, 8, 12, 15, 19, 23, 31, 40], showing low, high and mid each time. [4 marks]
3. Explain why binary search is O(log n). [2 marks]
4. Show the list after each pass of bubble sort on [9, 4, 7, 1, 3]. [3 marks]
5. Explain why bubble sort is O(n²) in the worst case, and when its best case is O(n). [3 marks]
6. Show each step of insertion sort on [5, 2, 9, 1, 6]. [3 marks]
7. Show how merge sort splits and merges [8, 3, 5, 1, 7, 2]. [4 marks]
8. Quick sort [6, 3, 9, 1, 7, 2, 8] using the first item as the pivot each time, showing each partition. [3 marks]
9. Explain why quick sort is O(n²) on already sorted data when the first item is the pivot. [2 marks]
10. A school sorts 2 million exam scripts by candidate number each year, and the data arrives in random order. Recommend a sort and justify your choice. [3 marks]
11. Write a recursive binary search in Python. [4 marks]

## Mark scheme

1. Data must be sorted (1); must allow direct/indexed access (e.g. an array) (1).
2. low 0, high 8, mid 4: 15 found (accept). If mid uses a different rounding, e.g. mid = 4 → items[4] = 15, found at index 4 (2 marks for correct values, 1 for the comparison, 1 for found at 4). Award full marks for any consistent method showing low/high/mid and the result.
3. Each comparison halves the remaining items (1); so at most about log₂ n comparisons are needed (1).
4. Pass 1: [4, 7, 1, 3, 9] (1). Pass 2: [4, 1, 3, 7, 9] (1). Pass 3: [1, 3, 4, 7, 9]; pass 4 makes no swaps (1).
5. Up to n − 1 passes (1) each with up to n − 1 comparisons, about n² comparisons in total (1). Best case: data already sorted and the algorithm stops after a pass with no swaps, so one pass of n − 1 comparisons (1).
6. [2, 5, 9, 1, 6] (1); [2, 5, 9, 1, 6] then [1, 2, 5, 9, 6] (1); [1, 2, 5, 6, 9] (1).
7. Split into [8, 3, 5] [1, 7, 2], then [8] [3, 5] [1] [7, 2], then single items (2). Merge: [3, 5], [2, 7]; [3, 5, 8], [1, 2, 7]; [1, 2, 3, 5, 7, 8] (2).
8. Pivot 6: [3, 1, 2] 6 [9, 7, 8] (1). [3, 1, 2] pivot 3: [1, 2] 3; [9, 7, 8] pivot 9: [7, 8] 9 (1). Remaining partitions give [1, 2, 3, 6, 7, 8, 9] (1).
9. Each pivot is the smallest item so one partition is empty and the other has n − 1 items (1); n levels of recursion, each with O(n) comparisons, so O(n²) (1).
10. Merge sort or quick sort (1); O(n log n) is much faster than O(n²) for 2 million items (1); merge sort is guaranteed O(n log n)/stable; quick sort is fast on average with random data and uses little extra memory (1).
11. Base case low > high returns not found (1); mid calculated (1); found test returns mid (1); recursive calls on correct halves with mid ± 1, returning the result (1).
