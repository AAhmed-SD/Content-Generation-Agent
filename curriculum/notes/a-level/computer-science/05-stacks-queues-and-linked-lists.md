---
level: A-level
subject: Computer Science
topic: "Stacks, queues (linear, circular, priority) and linked lists"
as_content: "A-level only for AQA. OCR AS H046 includes the properties of stacks and queues and adding and removing data from them; linked lists are A-level only for OCR."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.2.2.1", "4.2.3.1"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.2(b)", "1.4.2(c)", "2.3.1(e)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.1: Data structures", "C1.3: Traversal of data structures"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Stacks, queues and linked lists

This file covers the stack and its operations, linear, circular and priority queues, and linked lists, each implemented with arrays and pointers, with traced examples. Stacks are used again for Reverse Polish ([08](08-graph-and-tree-traversal-and-reverse-polish.md)) and the call stack ([02](02-stack-frames-recursion-and-paradigms.md)).

New at A-level: there is no GCSE equivalent.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Stacks | Push, pop, peek/top, test empty, test full | Create, traverse, add, remove | Represent with pointers and arrays |
| Queues | Linear, circular and priority: add, remove, test empty, test full | Queues (type not specified) | Represent with pointers and arrays |
| Linked lists | Not named (but used to build dynamic structures) | Named: create, traverse, add, remove | Named: represent with pointers and arrays |

AQA does not name linked lists, but AQA questions on dynamic structures and priority queues often assume them; they are worth knowing.

## 4.2.3.1 Stacks

*Refs: AQA 4.2.3.1 · OCR 1.4.2(b), 1.4.2(c), 2.3.1(e) · Eduqas C1.1: Data structures.*

### What you need to know

- A stack is a last in, first out (LIFO) structure: items are added and removed at the same end, the top.
- Operations:
  - push(item): add to the top. If the stack is full: stack overflow.
  - pop(): remove and return the top item. If the stack is empty: stack underflow.
  - peek() or top(): return the top item without removing it.
  - isEmpty(), isFull().
- Array implementation: an array plus a top pointer holding the index of the top item (−1 when empty).
- Uses: the call stack for subroutines, undo in editors, the back button in browsers, evaluating Reverse Polish expressions, depth-first search, backtracking, checking matched brackets.

### Worked example

```python
class Stack:
    def __init__(self, size):
        self.items = [None] * size
        self.top = -1                  # empty
        self.size = size

    def is_empty(self):
        return self.top == -1

    def is_full(self):
        return self.top == self.size - 1

    def push(self, item):
        if self.is_full():
            raise OverflowError("stack full")
        self.top += 1
        self.items[self.top] = item

    def pop(self):
        if self.is_empty():
            raise IndexError("stack empty")
        item = self.items[self.top]
        self.top -= 1                  # item is not erased, just no longer in the stack
        return item

    def peek(self):
        if self.is_empty():
            raise IndexError("stack empty")
        return self.items[self.top]
```

Trace with size 3: push(4), push(9), pop(), push(2), push(7), push(1).

| Operation | items[0..2] | top | Returned / note |
| --- | --- | --- | --- |
| start | – – – | −1 | |
| push(4) | 4 – – | 0 | |
| push(9) | 4 9 – | 1 | |
| pop() | 4 9 – | 0 | 9 (still in memory, outside the stack) |
| push(2) | 4 2 – | 1 | overwrites 9 |
| push(7) | 4 2 7 | 2 | full |
| push(1) | 4 2 7 | 2 | overflow error |

Using a stack to check brackets match:

```python
def balanced(text):
    pairs = {")": "(", "]": "[", "}": "{"}
    s = []
    for ch in text:
        if ch in "([{":
            s.append(ch)                  # push
        elif ch in ")]}":
            if not s or s.pop() != pairs[ch]:
                return False
    return not s                          # empty at the end means balanced

print(balanced("(a[b]{c})"), balanced("(]"))   # True False
```

### Common mistakes

- Checking for full or empty after changing the pointer instead of before.
- Saying pop "deletes" the data from memory. It moves the pointer; the old value stays until overwritten.

## 4.2.2.1 Queues

*Refs: AQA 4.2.2.1 · OCR 1.4.2(b), 1.4.2(c), 2.3.1(e) · Eduqas C1.1: Data structures.*

### What you need to know

- A queue is a first in, first out (FIFO) structure: items join at the rear (tail) and leave from the front (head).
- Operations: enqueue (add an item at the rear), dequeue (remove the item at the front), isEmpty, isFull.
- Uses: print queues, keyboard buffers, processor scheduling, breadth-first search, simulations of real queues.

### Linear queue

- Array plus front and rear pointers. Enqueue: increase rear, store item. Dequeue: take item at front, increase front.
- Problem: as items leave, the front moves along and the spaces at the start cannot be reused. The queue can report full when most of the array is empty. Fix: shuffle all items forward after each dequeue (slow, O(n)), or use a circular queue.

### Circular queue

- The array is treated as a ring: when a pointer reaches the last index it wraps round to 0, using MOD.
- rear ← (rear + 1) MOD maxSize; front ← (front + 1) MOD maxSize.
- A size counter is the simplest way to test for full (size = maxSize) and empty (size = 0).
- Advantage: reuses freed spaces with no shuffling. Disadvantage: slightly more complex to code.

```python
class CircularQueue:
    def __init__(self, max_size):
        self.items = [None] * max_size
        self.max = max_size
        self.front = 0
        self.rear = -1
        self.size = 0

    def is_empty(self): return self.size == 0
    def is_full(self):  return self.size == self.max

    def enqueue(self, item):
        if self.is_full():
            raise OverflowError("queue full")
        self.rear = (self.rear + 1) % self.max
        self.items[self.rear] = item
        self.size += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("queue empty")
        item = self.items[self.front]
        self.front = (self.front + 1) % self.max
        self.size -= 1
        return item
```

### Worked example

A circular queue has 4 spaces. Trace: enqueue A, B, C; dequeue; dequeue; enqueue D, E, F.

| Operation | [0] [1] [2] [3] | front | rear | size |
| --- | --- | --- | --- | --- |
| start | – – – – | 0 | −1 | 0 |
| enqueue A, B, C | A B C – | 0 | 2 | 3 |
| dequeue → A | A B C – | 1 | 2 | 2 |
| dequeue → B | A B C – | 2 | 2 | 1 |
| enqueue D | A B C D | 2 | 3 | 2 |
| enqueue E | E B C D | 2 | 0 (wrapped) | 3 |
| enqueue F | F E C D → F in [1] | 2 | 1 | 4 (full) |

After the last step the array holds [E, F, C, D], front = 2, so the order of leaving is C, D, E, F. A linear queue of 4 would have reported full at the enqueue of E.

### Priority queue

- Each item has a priority. Items with higher priority leave first; items with equal priority leave in FIFO order.
- Implementation choices:
  - insert in order: on enqueue, search from the rear for the right place and shift items (or link in, for a linked list). Dequeue is then just removing the front. Enqueue O(n), dequeue O(1);
  - or add at the rear and search for the highest priority when dequeuing;
  - or a heap (not required), with O(log n) for both.
- Uses: processor scheduling with priorities, A&E triage, Dijkstra's algorithm (file 10).

```python
def pq_enqueue(queue, item, priority):
    # queue is a list of (priority, item), highest priority at index 0
    i = len(queue)
    while i > 0 and queue[i - 1][0] < priority:   # strictly less keeps FIFO for ties
        i -= 1
    queue.insert(i, (priority, item))

q = []
for item, p in [("print", 1), ("alarm", 5), ("email", 1), ("update", 3)]:
    pq_enqueue(q, item, p)
print([x for _, x in q])   # ['alarm', 'update', 'print', 'email']
```

### Common mistakes

- Forgetting MOD so the circular pointer runs off the end of the array.
- Testing a circular queue for empty with `front == rear`: with these pointer conventions that is true when exactly one item is present. Use a size count, or define the pointers carefully.
- In a priority queue, placing an equal-priority item ahead of earlier ones, which breaks FIFO for ties.

## Linked lists

*Refs: OCR 1.4.2(b), 1.4.2(c), 2.3.1(e) · Eduqas C1.1: Data structures, C1.3: Traversal of data structures.*

### What you need to know

- A linked list is a dynamic structure of nodes. Each node holds data and a pointer to the next node. A start (head) pointer holds the first node's address; the last node's pointer is null.
- Items are logically in order but can be anywhere in memory.
- With an array implementation, there are two lists sharing one array: the data list and a free-space list of unused nodes, each with its own start pointer.
- Operations:
  - traverse: start at the head and follow pointers until null;
  - add: get a free node, store the data, then change pointers to link it in at the right place (no items move);
  - remove: change the previous node's pointer to skip the removed node, and return that node to the free list.
- Advantages: insertion and deletion do not shift data; size can change. Disadvantages: no direct access by index (must traverse from the head, O(n)), and extra memory for the pointers.
- Variants: doubly linked (pointers forward and back), circular (last points to first).

### Worked example

Array-based linked list holding names in alphabetical order. `start = 2`, `free = 4`.

| Index | Data | Next |
| --- | --- | --- |
| 0 | Kim | 3 |
| 1 | Eve | 0 |
| 2 | Ben | 1 |
| 3 | Sam | −1 (null) |
| 4 | – | 5 |
| 5 | – | −1 |

Traversal from 2: Ben → 1 Eve → 0 Kim → 3 Sam → end.

Insert "Jo" in order:

1. Take the free node: new = 4; free ← next[4] = 5.
2. data[4] ← "Jo".
3. Traverse to find where it goes: after Eve (index 1) and before Kim (index 0).
4. next[4] ← next[1] = 0 (Jo points to Kim).
5. next[1] ← 4 (Eve points to Jo).

Order is now Ben → Eve → Jo → Kim → Sam, and no existing data moved.

Delete "Kim": find it (index 0) and its previous node (Jo, index 4). next[4] ← next[0] = 3 (Jo now points to Sam). Return node 0 to the free list: next[0] ← free (5); free ← 0.

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def traverse(self):
        cur = self.head
        while cur is not None:
            print(cur.data)
            cur = cur.next

    def insert_in_order(self, data):
        new = Node(data)
        if self.head is None or data < self.head.data:   # new first item
            new.next = self.head
            self.head = new
            return
        prev = self.head
        while prev.next is not None and prev.next.data < data:
            prev = prev.next
        new.next = prev.next
        prev.next = new

    def delete(self, data):
        if self.head is None:
            return False
        if self.head.data == data:
            self.head = self.head.next
            return True
        prev = self.head
        while prev.next is not None and prev.next.data != data:
            prev = prev.next
        if prev.next is None:
            return False                  # not found
        prev.next = prev.next.next        # skip the node
        return True
```

### Common mistakes

- Changing the previous node's pointer before saving where it used to point, which loses the rest of the list. Always set the new node's pointer first.
- Forgetting the special cases: empty list, inserting before the head, deleting the head, item not found.
- Saying a linked list allows binary search. Binary search needs direct access by index, which a linked list does not have.

## Stacks and queues built from linked lists

### What you need to know

- A stack can be a linked list where push and pop both work at the head: O(1), and no fixed size.
- A queue can be a linked list with front and rear pointers: enqueue links a new node after the rear; dequeue removes the head. No wrap-around needed.

## Check questions

1. State what is meant by LIFO and give two uses of a stack. [3 marks]
2. A stack of size 5 is empty. Show its contents and the top pointer after: push(3), push(8), push(1), pop(), peek(), push(6). State the values returned. [4 marks]
3. Write a `pop` function for an array-based stack, including a check for underflow. [3 marks]
4. Explain the problem with a linear queue implemented as an array, and how a circular queue solves it. [3 marks]
5. A circular queue has 5 spaces, front = 3, rear = 1 and size = 4. (a) Which index will the next item be stored in? (b) Which index is the next item removed from? (c) Is the queue full? [3 marks]
6. Describe how an item is added to a priority queue so that equal priorities are still served first come, first served. [3 marks]
7. Using the linked-list table in this file (before the insertion of Jo), describe the pointer changes to delete "Eve". [3 marks]
8. Give one advantage and one disadvantage of a linked list compared with an array. [2 marks]
9. Write an algorithm to count the nodes in a linked list. [3 marks]
10. Explain why a queue is suitable for a printer's jobs but a stack is suitable for an undo feature. [2 marks]

## Mark scheme

1. Last in, first out: the last item added is the first removed (1). Two uses from: call stack/subroutine return addresses, undo, browser back, RPN evaluation, depth-first search, backtracking (2).
2. After push 3, 8, 1: [3, 8, 1], top = 2 (1). pop returns 1, top = 1 (1). peek returns 8, top still 1 (1). push(6): [3, 8, 6], top = 2 (1).
3. Check top = −1 (or isEmpty) and report error (1); store items[top] in a variable (1); decrement top and return the item (1).
4. Front pointer moves along as items are removed so spaces at the start cannot be reused (1); queue may appear full when it is not (1); circular queue wraps pointers round to the start (using MOD) so freed spaces are reused (1).
5. (a) (1 + 1) MOD 5 = 2 (1). (b) 3 (1). (c) No: size 4 < 5 (1).
6. Start at the rear and move towards the front past items of lower priority (1); stop at the first item with equal or higher priority (1); insert the new item behind it/shift or relink items (1).
7. Eve is at index 1, previous node is Ben at index 2 (1); next[2] ← next[1] = 0 so Ben points to Kim (1); node 1 added to the free list: next[1] ← free (4), free ← 1 (1).
8. Advantage: items inserted/deleted without moving others, or size can change (1). Disadvantage: no direct access/must traverse, or extra memory for pointers (1).
9. count ← 0; cur ← start (1); while cur ≠ null: count ← count + 1; cur ← next[cur] (1); return/output count (1).
10. Print jobs should be done in the order sent, FIFO (1); undo must reverse the most recent action first, LIFO (1).
