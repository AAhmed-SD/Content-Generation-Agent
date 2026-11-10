---
level: A-level
subject: Computer Science
topic: "Functional programming: function types, first-class functions, application, partial application, composition, higher-order functions (map, filter, fold) and list processing"
as_content: "A-level only (AQA 4.12). Functional programming is an AQA topic; OCR and Eduqas mention declarative and functional paradigms only in outline (file 02)."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.12.1.1", "4.12.1.2", "4.12.1.3", "4.12.1.4", "4.12.1.5", "4.12.2.1", "4.12.3.1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Functional programming

This file covers function types, domains and co-domains, functions as first-class objects, function application, partial application, composition, writing functional programs with higher-order functions (map, filter, reduce/fold), and list processing with head and tail. Examples are given in Haskell (a pure functional language AQA suggests) and in Python. Why functional programming suits Big Data is in [31](31-big-data-and-distributed-systems.md).

New at A-level.

### Board differences

Only AQA 7517 examines this content in detail. OCR H446 and Eduqas A500QS name declarative or functional paradigms only as types of language ([02](02-stack-frames-recursion-and-paradigms.md)).

## Key ideas of the paradigm

- A functional program is built from functions that take inputs and return outputs, like mathematical functions.
- Pure functions have no side effects: they do not change global variables, input or output, or their arguments, and they always give the same result for the same inputs (referential transparency).
- Data is immutable: values are not changed after they are created; instead, new values are made.
- There are no loops with changing counters; repetition is done by recursion and higher-order functions.
- Benefits: easier to reason about and test (a function can be checked on its own), fewer bugs from shared state, and safe to run in parallel.

## 4.12.1.1 Function type

*Refs: AQA 4.12.1.1.*

### What you need to know

- A function f has a function type f: A → B, where A is the argument type and B is the result type.
- A is the domain (the set the inputs are chosen from); B is the co-domain (the set the outputs are chosen from). Not every member of the co-domain has to be an output.
- The domain and co-domain are always subsets of objects of some data type.

### Worked example

f: {a, b, c, …, z} → {0, 1, 2, …, 25}, mapping a ↦ 0, b ↦ 1 and so on. Domain: lower-case letters; co-domain: integers 0 to 25.

`isEven: integer → Boolean`. The co-domain is {True, False}.

In Haskell, types are written with `::`:

```haskell
letterPos :: Char -> Int
letterPos c = fromEnum c - fromEnum 'a'

isEven :: Int -> Bool
isEven n = n `mod` 2 == 0
```

## 4.12.1.2 First-class object

*Refs: AQA 4.12.1.2.*

### What you need to know

- A first-class object (value) can: appear in expressions, be assigned to a variable, be passed as an argument, and be returned from a function call. Integers, floats, characters and strings are first-class in most languages.
- In functional languages (and imperative languages that support it, such as Python, C#, Java 8+), functions are first-class objects: a function can be passed to another function, returned as a result, and stored in a variable or data structure.

```python
def square(x): return x * x
f = square                      # assigned to a variable
print(f(5))                     # 25
def apply_twice(g, x):          # function as an argument
    return g(g(x))
print(apply_twice(square, 3))   # 81
def make_adder(n):              # function as a result
    return lambda x: x + n
add10 = make_adder(10)
print(add10(5))                 # 15
```

## 4.12.1.3 Function application

*Refs: AQA 4.12.1.3.*

### What you need to know

- Function application means giving a function its arguments to get a result: `add(3, 4)` applies `add` to 3 and 4.
- The type of `add` can be written `add: integer × integer → integer`, where integer × integer is the Cartesian product of the integers with themselves (file 12). So although we say `add` takes two arguments, strictly it takes one argument: a pair, such as (3, 4).
- In Haskell, application is written by putting arguments after the function name with spaces: `add 3 4`.

## 4.12.1.4 Partial function application

*Refs: AQA 4.12.1.4.*

### What you need to know

- In the partial application scheme, a function of several arguments is viewed as taking its arguments one at a time. Each time it is given one argument, it returns a new function that waits for the rest.
- `add: integer → (integer → integer)`. Applying `add 4` gives a function of type integer → integer that adds 4 to its argument. Brackets can be dropped (→ groups to the right): `add: integer → integer → integer`.
- Three arguments: `f: A → B → C → D`. `f a` has type B → C → D; `f a b` has type C → D; `f a b c` has type D.
- Uses: making specialised functions from general ones without writing new code (`add 1` is an increment function; `multiply 2` is a doubling function), and passing them to higher-order functions.

### Worked example

```haskell
add :: Int -> Int -> Int
add x y = x + y

addFour :: Int -> Int
addFour = add 4          -- partial application

volume :: Int -> Int -> Int -> Int
volume l w h = l * w * h

base10 = volume 2 5      -- type Int -> Int: needs only the height
-- addFour 7 = 11 ; base10 3 = 30
-- map (add 1) [1, 2, 3] = [2, 3, 4]
```

Python equivalent:

```python
from functools import partial
def add(x, y): return x + y
add_four = partial(add, 4)
print(add_four(7))            # 11
```

## 4.12.1.5 Composition of functions

*Refs: AQA 4.12.1.5.*

### What you need to know

- Composition combines two functions into a new function. Given f: A → B and g: B → C, the composition g ∘ f ("g after f") is a function A → C: apply f first, then apply g to f's result. (g ∘ f)(x) = g(f(x)).
- The co-domain of f must match (be a subset of) the domain of g.
- In Haskell, composition is the `.` operator: `(g . f) x = g (f x)`.

### Worked example

f(x) = x + 2, g(y) = y³, both ℝ → ℝ. g ∘ f = (x + 2)³. (g ∘ f)(1) = 27. Note f ∘ g = x³ + 2, which is different: (f ∘ g)(1) = 3. Order matters.

```haskell
f x = x + 2
g y = y ^ 3
h = g . f        -- h 1 == 27
k = f . g        -- k 1 == 3
```

## 4.12.2.1 Writing functional programs

*Refs: AQA 4.12.2.1.*

### What you need to know

- Functional languages: Haskell, Standard ML, Scheme, Lisp. Languages that also support the functional style: Python, F#, C#, Scala, Java 8+, VB.NET (2008+), Delphi XE+.
- A higher-order function takes a function as an argument, returns a function as its result, or both.
- map: applies a given function to each element of a list, returning a list of the results.
- filter: goes through a list (or other structure) and returns a new list containing exactly those elements that satisfy a given condition (a predicate: a function returning a Boolean).
- reduce or fold: reduces a list to a single value by repeatedly applying a combining function to the list values, starting from an initial value. `foldl` combines from the left; `foldr` from the right. The results differ for operations that are not associative (such as subtraction).

### Worked example

```haskell
map (*2) [1, 2, 3, 4]                -- [2, 4, 6, 8]
filter even [1, 2, 3, 4, 5, 6]       -- [2, 4, 6]
foldl (+) 0 [1, 2, 3, 4]             -- 10: ((((0+1)+2)+3)+4)
foldr (+) 0 [1, 2, 3, 4]             -- 10: (1+(2+(3+(4+0))))
foldl (-) 0 [1, 2, 3]                -- -6: ((0-1)-2)-3
foldr (-) 0 [1, 2, 3]                -- 2:  1-(2-(3-0))

-- sum of the squares of the odd numbers in a list
sumOddSquares :: [Int] -> Int
sumOddSquares xs = foldl (+) 0 (map (^2) (filter odd xs))
-- sumOddSquares [1,2,3,4,5] = 1 + 9 + 25 = 35
```

Trace `foldl (-) 10 [2, 3]`: start 10; 10 − 2 = 8; 8 − 3 = 5. Result 5.

Python:

```python
from functools import reduce
nums = [1, 2, 3, 4, 5]
print(list(map(lambda x: x * 2, nums)))          # [2, 4, 6, 8, 10]
print(list(filter(lambda x: x % 2 == 1, nums)))  # [1, 3, 5]
print(reduce(lambda a, b: a + b, nums, 0))       # 15
```

## 4.12.3.1 List processing

*Refs: AQA 4.12.3.1.*

### What you need to know

- In functional languages a list is either empty `[]`, or a head joined to a tail: `head:tail`. The head is an element (the first item); the tail is a list (everything else, possibly empty). [4, 3, 5] = 4:[3, 5] = 4:3:5:[].
- Operations you must be able to describe and use:

| Operation | Haskell | Result for xs = [4, 3, 5] |
| --- | --- | --- |
| Return head | head xs | 4 |
| Return tail | tail xs | [3, 5] |
| Test for empty | null xs | False |
| Return length | length xs | 3 |
| Construct an empty list | [] | [] |
| Prepend an item | 7 : xs | [7, 4, 3, 5] |
| Append an item | xs ++ [7] | [4, 3, 5, 7] |

- Prepending with `:` is fast (it makes a new head pointing to the existing list); appending with `++` has to copy the whole first list.
- Recursive list functions follow the pattern: a base case for `[]`, and a general case for `(x:xs)` that does something with the head x and recurses on the tail xs.

### Worked example

```haskell
myLength :: [a] -> Int
myLength []     = 0
myLength (_:xs) = 1 + myLength xs

mySum :: [Int] -> Int
mySum []     = 0
mySum (x:xs) = x + mySum xs

myMap :: (a -> b) -> [a] -> [b]
myMap _ []     = []
myMap f (x:xs) = f x : myMap f xs
```

Trace `mySum [4, 3, 5]`: 4 + mySum [3, 5] = 4 + (3 + mySum [5]) = 4 + (3 + (5 + mySum [])) = 4 + (3 + (5 + 0)) = 12.

Python equivalents (without changing the original list):

```python
def head(xs): return xs[0]
def tail(xs): return xs[1:]
def is_empty(xs): return xs == []
def prepend(x, xs): return [x] + xs
def append(xs, x): return xs + [x]

def length(xs):
    return 0 if is_empty(xs) else 1 + length(tail(xs))
```

## Common mistakes

- Reading g ∘ f as "g first". f is applied first.
- Saying the tail is the last element. The tail is a list of everything after the head.
- Calling `head []`: there is no head of an empty list (an error in Haskell). Test for empty first.
- Saying map changes the original list. It returns a new list.
- Mixing up filter (keeps items meeting a condition) and map (transforms every item).

## Check questions

1. A function `charCode` maps each upper-case letter to its ASCII code. Write its function type and name the domain and co-domain. [3 marks]
2. State what is meant by a first-class object and give two examples of what can be done with a function that is first-class. [3 marks]
3. Explain why `add: integer × integer → integer` can be said to take one argument. [2 marks]
4. `multiply: integer → integer → integer`. State the type of `multiply 3` and the result of `(multiply 3) 7`. [2 marks]
5. f(x) = 3x and g(x) = x − 1. Calculate (g ∘ f)(4) and (f ∘ g)(4). [2 marks]
6. Explain what a higher-order function is and name three. [4 marks]
7. Evaluate: (a) `map (+3) [1, 5, 9]`; (b) `filter (>4) [3, 8, 1, 6]`; (c) `foldl (*) 1 [2, 3, 4]`; (d) `foldr (-) 0 [5, 3]`. [4 marks]
8. For the list [8, 1, 6], give its head, its tail, its length and the result of prepending 2. [4 marks]
9. Write a recursive Haskell (or Python) function `countEven` that returns how many even numbers are in a list, using head and tail. [4 marks]
10. Write a single expression using map, filter and fold to find the total length of all words longer than 3 characters in a list of strings. [3 marks]

## Mark scheme

1. `charCode: {A, …, Z} → integer` (accept Char → Int) (1); domain: upper-case letters (1); co-domain: integers (only 65 to 90 are used) (1).
2. A value that can be assigned to a variable, passed as an argument, returned from a function and used in expressions (1); any two for functions, e.g. passed as an argument to another function, returned as a result, stored in a variable (2).
3. The input is a single pair (from the Cartesian product integer × integer) (1), e.g. (3, 4) (1).
4. integer → integer (1); 21 (1).
5. g(f(4)) = g(12) = 11 (1); f(g(4)) = f(3) = 9 (1).
6. A function that takes a function as an argument and/or returns a function (2); map, filter, reduce/fold (2 for three, 1 for two).
7. (a) [4, 8, 12] (1); (b) [8, 6] (1); (c) 24 (1); (d) 5 − (3 − 0) = 2 (1).
8. Head 8 (1); tail [1, 6] (1); length 3 (1); [2, 8, 1, 6] (1).
9. Example:

```haskell
countEven :: [Int] -> Int
countEven [] = 0
countEven (x:xs)
  | even x    = 1 + countEven xs
  | otherwise = countEven xs
```

Base case empty list returns 0 (1); splits into head and tail (1); adds 1 when head is even (1); recursive call on tail in both cases (1).
10. `foldl (+) 0 (map length (filter (\w -> length w > 3) ws))` or Python `reduce(lambda a, b: a + b, map(len, filter(lambda w: len(w) > 3, ws)), 0)` (1 each for correct filter, map and fold).
