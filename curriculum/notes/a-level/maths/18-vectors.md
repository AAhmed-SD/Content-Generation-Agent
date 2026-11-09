---
level: A-level
subject: Mathematics
topic: "Vectors"
as_content: "Vectors in two dimensions (magnitude, direction, addition, scalar multiples, position vectors, distances and problems) are AS. Vectors in three dimensions, and vectors applied to forces and kinematics, are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["J1", "J2", "J3", "J4", "J5"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P10.1", "P10.2", "P10.3", "P10.4", "P10.5"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.10a", "1.10b", "1.10c", "1.10d", "1.10e", "1.10f", "1.10g", "1.10h"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mv1", "Mv2", "Mv3", "Mv4", "Mv5", "Mv6", "Mv7"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Vectors

This file covers vector notation in two and three dimensions, magnitude and direction, adding vectors and multiplying by scalars, position vectors and distances, and using vectors to solve geometric and mechanics problems.

## Overview

AS: everything in two dimensions. A-level only: three dimensions, and applying vectors to forces and kinematics (which links to files 25 to 27). The scalar (dot) product and vector equations of lines are not in A-level Mathematics; they are in Further Mathematics.

### Board differences

- AQA J1 to J5; Edexcel 10.1 to 10.5.
- OCR H240: 1.10a and 1.10c to 1.10g (AS); 1.10b and 1.10h (A-level only).
- OCR MEI H640: Mv1 to Mv6 (AS) and Mv7 (three dimensions, A-level only).

## J1 Vectors in two and three dimensions

*Refs: AQA J1 · Edexcel 10.1 · OCR 1.10a, 1.10b · MEI Mv1, Mv7. Level: AS & A (part A-level only).*

### What you need to know

- A vector has size (magnitude) and direction. A scalar has size only.
- Notation: a (bold) or a with a line under it; AB with an arrow for the vector from A to B; column vectors; i, j unit vectors in the x and y directions.
- (A-level only) In three dimensions, k is the unit vector in the z direction, and column vectors have three components.

```latex
\mathbf{a} = 3\mathbf{i} - 2\mathbf{j} + 5\mathbf{k} = \begin{pmatrix} 3 \\ -2 \\ 5 \end{pmatrix}
```

### Explained

Two vectors are equal if they have the same magnitude and direction, wherever they are drawn. A vector −a has the same magnitude as a and the opposite direction. The zero vector has magnitude 0.

(A-level only) In 3D, use right-handed axes: x and y as usual on the floor, z upwards. A point (x, y, z) has position vector xi + yj + zk.

### Worked example

Write the vector from A(1, 4) to B(6, −2) in i, j form and as a column vector.

1. AB = (6 − 1)i + (−2 − 4)j = 5i − 6j, or the column vector (5, −6).

(A-level only) Write the position vector of the point (2, −1, 4) in i, j, k form.

1. 2i − j + 4k.

### Common mistakes

- Writing coordinates instead of a vector, or the vector from B to A instead of A to B.

## J2 Magnitude and direction

*Refs: AQA J2 · Edexcel 10.2 · OCR 1.10c · MEI Mv3. Level: AS & A.*

### What you need to know

- The magnitude of a vector is its length:

```latex
|x\mathbf{i} + y\mathbf{j}| = \sqrt{x^2 + y^2} \qquad |x\mathbf{i} + y\mathbf{j} + z\mathbf{k}| = \sqrt{x^2 + y^2 + z^2}
```

- The direction in 2D is usually given as an angle with i (or a bearing).
- Convert between component form and magnitude-direction form.
- A unit vector has magnitude 1. The unit vector in the direction of a is a/|a|.

### Explained

For a vector of magnitude r at angle θ to i (anticlockwise), the components are r cos θ and r sin θ. Going the other way, r = √(x² + y²) and tan θ = y/x; draw a sketch to put the angle in the right quadrant.

### Worked example

Find the magnitude and direction of a = 3i − 4j, and the unit vector in its direction.

1. |a| = √(9 + 16) = 5.
2. The angle with i is tan⁻¹(−4/3) = −53.1°, that is 53.1° below i.
3. Unit vector: (3i − 4j)/5 = 0.6i − 0.8j.

A force of 10 N acts at 30° above the positive x-direction. Write it in component form.

1. 10 cos 30° i + 10 sin 30° j = 8.66i + 5j N.

A velocity of 20 m s⁻¹ is on a bearing of 060°. Write it in terms of i (east) and j (north).

1. East: 20 sin 60° = 17.3. North: 20 cos 60° = 10.
2. v = 17.3i + 10j m s⁻¹.

(A-level only) Find |2i − j + 2k|.

1. √(4 + 1 + 4) = 3.

### Common mistakes

- Using the wrong trig function for bearings: bearings are measured from north, so the east component uses sin.
- Giving the angle without saying what it is measured from.

## J3 Adding vectors and scalar multiples

*Refs: AQA J3 · Edexcel 10.3 · OCR 1.10d · MEI Mv2. Level: AS & A.*

### What you need to know

- Add vectors with the triangle (nose to tail) or parallelogram law; add their components.
- Multiply a vector by a scalar: ka has magnitude |k||a| and the same direction as a if k > 0 (opposite if k < 0).
- Two vectors are parallel if one is a scalar multiple of the other.

### Explained

AB + BC = AC: follow one route from A to C. Subtracting: a − b = a + (−b). In components, add or subtract each component separately.

If λa + μb = c, where a and b are not parallel, compare components to get simultaneous equations in λ and μ.

### Worked example

Show that 2i − 3j and −6i + 9j are parallel.

1. −6i + 9j = −3(2i − 3j). A scalar multiple, so parallel (opposite directions).

Find λ and μ such that λ(2i + j) + μ(i − 3j) = 7i − 7j.

1. i: 2λ + μ = 7. j: λ − 3μ = −7.
2. From the first, μ = 7 − 2λ. Then λ − 21 + 6λ = −7, so λ = 2, μ = 3.

### Common mistakes

- Adding magnitudes instead of vectors: |a + b| is not usually |a| + |b|.

## J4 Position vectors and distance

*Refs: AQA J4 · Edexcel 10.4 · OCR 1.10e, 1.10f · MEI Mv4, Mv5. Level: AS & A.*

### What you need to know

- The position vector of A is OA = a, from the origin.
- AB = b − a.
- The distance between A and B is |b − a|.
- The midpoint of AB has position vector ½(a + b).

### Explained

To find the point dividing AB in the ratio m : n, go from A a fraction m/(m + n) of the way along AB: a + [m/(m + n)](b − a).

Three points A, B, C are collinear if AB is a multiple of BC (they are parallel and share the point B).

### Worked example

A is (1, 2) and B is (7, −6). Find AB, the distance AB, and the position vector of the point P that divides AB in the ratio 1 : 3.

1. AB = (7 − 1)i + (−6 − 2)j = 6i − 8j.
2. |AB| = √(36 + 64) = 10.
3. OP = a + (1/4)(6i − 8j) = (1 + 1.5)i + (2 − 2)j = 2.5i.

In triangle OAB, OA = a and OB = b. M is the midpoint of AB. Express OM in terms of a and b.

1. AB = b − a, so AM = ½(b − a).
2. OM = a + ½(b − a) = ½(a + b).

(A-level only) A(1, 2, −1) and B(4, −2, 11). Find the distance AB.

1. AB = 3i − 4j + 12k.
2. |AB| = √(9 + 16 + 144) = 13.

### Common mistakes

- Writing AB as a − b.

## J5 Using vectors in problems

*Refs: AQA J5 · Edexcel 10.5 · OCR 1.10g, 1.10h · MEI Mv6. Level: AS & A (part A-level only).*

### What you need to know

- Use vectors to solve geometric problems (parallel lines, midpoints, ratios, collinear points, shapes).
- (A-level only) Use vectors in mechanics: resultant forces, velocities and positions changing with time.

### Explained

In geometry, write each vector in terms of a small set of basic vectors (such as a and b), then compare. If xa + yb = pa + qb and a, b are not parallel, then x = p and y = q.

(A-level only) In mechanics: a resultant force is the vector sum of the forces. A particle moving with constant velocity v from position r₀ has position r = r₀ + vt after time t.

### Worked example

OABC is a parallelogram with OA = a and OC = c. Show that its diagonals bisect each other.

1. OB = a + c. The midpoint of OB has position vector ½(a + c).
2. AC = c − a. The midpoint of AC has position vector a + ½(c − a) = ½(a + c).
3. Same point, so the diagonals bisect each other.

(A-level only) Forces F₁ = (3i + 2j) N and F₂ = (−5i + 4j) N act on a particle. Find the magnitude and direction of the resultant.

1. R = −2i + 6j.
2. |R| = √40 = 6.32 N.
3. Direction: it points up and to the left, at 180° − tan⁻¹(3) = 108.4° to i.

(A-level only) A ship starts at (−6i + 2j) km and moves with velocity (4i + 3j) km h⁻¹. Find its position after t hours and when it is due north of the origin.

1. r = (−6 + 4t)i + (2 + 3t)j.
2. Due north of the origin when the i component is 0: t = 1.5 h.
3. Position then: 6.5j km.

(A-level only) A(1, 0, 2), B(3, 4, −2) and C(4, 6, −4). Show that A, B and C are collinear.

1. AB = 2i + 4j − 4k. BC = i + 2j − 2k.
2. AB = 2BC, so they are parallel, and they share point B. So A, B, C are collinear.

### Common mistakes

- Concluding "collinear" from parallel vectors without a shared point.
- (A-level only) Giving the magnitude of a resultant but not its direction when both are asked for.

## Check questions

1. p = 5i − 12j. Find |p|, the unit vector in the direction of p, and the angle p makes with i. [4 marks]
2. A velocity of 20 m s⁻¹ is on a bearing of 060°. Write it in the form ai + bj, with i east and j north. [2 marks]
3. a = ki + (k + 1)j and |a| = 5. Find the possible values of k. [3 marks]
4. Find λ and μ such that λ(3i + j) + μ(i − 2j) = 5i + 4j. [3 marks]
5. In triangle OAB, OA = a and OB = b. P lies on AB with AP : PB = 2 : 1. Show that OP = (a + 2b)/3. [3 marks]
6. (A-level only) A is (2, −1, 3) and B is (5, 3, 3). Find the distance AB and the coordinates of its midpoint. [3 marks]
7. (A-level only) Show that A(1, 0, 2), B(3, 4, −2) and C(4, 6, −4) are collinear. [3 marks]
8. (A-level only) Forces (2i + 5j) N and (pi + qj) N have resultant (6i + 2j) N. Find p and q, and the magnitude of the resultant. [3 marks]

## Mark scheme

1. |p| = 13 (1); (5i − 12j)/13 (1); tan⁻¹(−12/5) (1); 67.4° below i (1).
2. 20 sin 60° = 17.3 (east), 20 cos 60° = 10 (north) (1); 17.3i + 10j (1).
3. k² + (k + 1)² = 25 (1); k² + k − 12 = 0 (1); k = 3 or −4 (1).
4. 3λ + μ = 5 and λ − 2μ = 4 (1); λ = 2 (1); μ = −1 (1).
5. AB = b − a (1); OP = a + (2/3)(b − a) (1); = (1/3)a + (2/3)b (1).
6. AB = 3i + 4j + 0k (1); distance 5 (1); midpoint (3.5, 1, 3) (1).
7. AB = 2i + 4j − 4k and BC = i + 2j − 2k (1); AB = 2BC, so parallel (1); common point B, so collinear (1).
8. p = 4 (1); q = −3 (1); √40 = 6.32 N (1).
