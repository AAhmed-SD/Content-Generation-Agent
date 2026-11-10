---
level: A-level
subject: Computer Science
topic: "Vectors: representations, addition, scaling, convex combinations and the dot product"
as_content: "A-level only (AQA). Vectors are an AQA topic only; OCR and Eduqas do not name it."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.2.8.1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Vectors

This file covers what a vector is, its notations (list, function, dictionary, 1D array, arrow), vector addition and scalar multiplication, convex combinations, the dot product and using it to find the angle between two vectors. Only AQA examines this.

### Board differences

Only AQA 7517 has this content. OCR H446 and Eduqas A500QS do not examine vectors.

## 4.2.8.1 Vectors

*Refs: AQA 4.2.8.1.*

### What you need to know

- A vector is an ordered list of numbers, all taken from the same field (set of numbers), usually the real numbers ℝ. A vector with n entries over ℝ is an n-vector, and the set of all of them is written ℝⁿ. Example: [2.0, 3.14159, −1.0, 2.718281828] is a 4-vector over ℝ, a member of ℝ⁴.
- Representations:
  - list: `[2.0, 3.0]`;
  - function: a vector maps each index to a value, f : S → ℝ where S = {0, 1, 2, 3}. Written 0 ↦ 2.0, 1 ↦ 3.14159 and so on (↦ means "maps to");
  - dictionary: the function view stored directly, `{0: 2.0, 1: 3.14159, 2: -1.0, 3: 2.718281828}`; handy for sparse vectors where most entries are 0;
  - 1D array: a fixed-length array of one numeric type, for example `Dim example(3) As Single` in VB.NET;
  - arrow: a 2-vector [2.0, 3.0] can be drawn as an arrow from the origin to the point (2.0, 3.0). The arrow has a length (magnitude) and a direction.
- Vector addition adds matching entries: [a₁, a₂] + [b₁, b₂] = [a₁ + b₁, a₂ + b₂]. Geometrically, it translates (moves) a point.
- Scalar–vector multiplication multiplies every entry by a number: k[a₁, a₂] = [ka₁, ka₂]. Geometrically, it scales the arrow (k > 1 longer, 0 < k < 1 shorter, negative k reverses).
- Convex combination of u and v: αu + βv with α, β ≥ 0 and α + β = 1. Every convex combination lies on the straight line segment between the tips of u and v. With α = β = 0.5 you get the midpoint.
- Dot (scalar) product: u · v = u₁v₁ + u₂v₂ + … + uₙvₙ. The result is a single number, not a vector.
- Angle between two vectors: u · v = |u| |v| cos θ, so cos θ = (u · v) ÷ (|u| |v|), where |u| = √(u₁² + … + uₙ²). If u · v = 0, the vectors are at right angles (perpendicular).

### Explained

Vectors appear across computing:

- Graphics: positions, movements and scaling of objects in 2D and 3D (vector graphics in file 19).
- Games: a character's velocity is a vector; add it to the position vector each frame to move.
- Machine learning and information retrieval: a document becomes a vector of word counts (one entry per word in the vocabulary). Two documents point in similar directions if they use similar words; the cosine of the angle between them (cosine similarity) measures how alike they are.
- Parity: AQA also links the dot product over the field {0, 1} with arithmetic mod 2 to parity checking: the dot product of a bit pattern with [1, 1, …, 1] mod 2 is the parity bit for even parity.

### Worked example

u = [3, 4], v = [1, −2].

1. u + v = [3 + 1, 4 + (−2)] = [4, 2].
2. 2u = [6, 8].
3. Convex combination 0.25u + 0.75v = [0.75 + 0.75, 1 + (−1.5)] = [1.5, −0.5]. Check: 0.25 + 0.75 = 1 and both ≥ 0, so this point lies on the segment between (3, 4) and (1, −2), three-quarters of the way towards v.
4. u · v = 3 × 1 + 4 × (−2) = 3 − 8 = −5.
5. |u| = √(9 + 16) = 5; |v| = √(1 + 4) = √5 ≈ 2.236.
6. cos θ = −5 ÷ (5 × 2.236) = −0.4472, so θ ≈ 116.6°.

Document similarity. Vocabulary [cat, dog, fish]. Document A = "cat cat dog" → [2, 1, 0]. Document B = "cat dog dog" → [1, 2, 0]. Document C = "fish" → [0, 0, 1].

- A · B = 2 + 2 + 0 = 4; |A| = |B| = √5; cos θ = 4 ÷ 5 = 0.8 (similar).
- A · C = 0, so cos θ = 0: no words in common (perpendicular).

```python
import math

def add(u, v):      return [a + b for a, b in zip(u, v)]
def scale(k, u):    return [k * a for a in u]
def dot(u, v):      return sum(a * b for a, b in zip(u, v))
def length(u):      return math.sqrt(dot(u, u))

def angle_deg(u, v):
    return math.degrees(math.acos(dot(u, v) / (length(u) * length(v))))

def convex(alpha, u, v):
    assert 0 <= alpha <= 1
    return add(scale(alpha, u), scale(1 - alpha, v))

u, v = [3, 4], [1, -2]
print(add(u, v), scale(2, u), dot(u, v), round(angle_deg(u, v), 1))
# [4, 2] [6, 8] -5 116.6

sparse = {0: 2.0, 3: 2.718281828}     # dictionary form: missing indices are 0
```

### Common mistakes

- Giving the dot product as a vector. It is a single number (a scalar).
- Forgetting the conditions on a convex combination: both coefficients must be non-negative and must add to 1.
- Adding vectors of different lengths. Both must have the same number of entries (be in the same ℝⁿ).
- Mixing degrees and radians when using inverse cosine in code.

## Check questions

1. Write the 3-vector [5.0, −1.5, 0.0] over ℝ in function (↦) notation and as a Python dictionary. [2 marks]
2. State what is meant by "a 4-vector over ℝ". [1 mark]
3. Given a = [2, −1, 3] and b = [0, 4, 1], calculate a + b and 3a. [2 marks]
4. Calculate a · b for the vectors in Q3. [1 mark]
5. Find the angle between p = [1, 0] and q = [1, 1]. [3 marks]
6. Show that [6, 3] is not a convex combination of [2, 1] and [4, 2]. [2 marks]
7. Calculate the convex combination 0.5u + 0.5v where u = [−2, 8] and v = [6, 0], and describe what it represents geometrically. [2 marks]
8. Explain what vector addition and scalar–vector multiplication do geometrically. [2 marks]
9. Write a function `dot(u, v)` that returns the dot product of two lists of equal length. [3 marks]
10. Two documents have word-count vectors [1, 0, 2] and [2, 1, 0]. Use the dot product to calculate the cosine of the angle between them and comment on their similarity. [3 marks]

## Mark scheme

1. 0 ↦ 5.0, 1 ↦ −1.5, 2 ↦ 0.0 (1); {0: 5.0, 1: -1.5, 2: 0.0} (1).
2. An ordered list of four values, each a real number (a member of ℝ⁴) (1).
3. a + b = [2, 3, 4] (1); 3a = [6, −3, 9] (1).
4. 0 − 4 + 3 = −1 (1).
5. p · q = 1 (1); |p| = 1, |q| = √2 so cos θ = 1/√2 (1); θ = 45° (1).
6. Convex combinations lie on the segment between (2, 1) and (4, 2) / need α + β = 1 with α, β ≥ 0 (1); [6, 3] would need e.g. α = 0, β = 1.5 or α = 3, β = 0, so α + β ≠ 1 / the point lies beyond (4, 2) (1).
7. [2, 4] (1); the midpoint of the line between the two points/tips (1).
8. Addition translates/moves a point or arrow by the second vector (1); scalar multiplication scales/changes the length of the arrow (reversing it if negative) (1).
9. Example: `def dot(u, v):` total ← 0 (1); loop over indices adding u[i] × v[i] (1); return total (1).
10. Dot product = 2 + 0 + 0 = 2 (1); lengths √5 and √5 so cos θ = 2/5 = 0.4 (1); some similarity but not very similar (θ ≈ 66°) (1).
