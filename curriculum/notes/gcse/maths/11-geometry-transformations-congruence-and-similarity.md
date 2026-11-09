---
level: GCSE
subject: Mathematics
topic: "Geometry: transformations, congruence and similarity"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["R12", "G5", "G7", "G8", "G11", "G19"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["R12", "G5", "G7", "G8", "G11", "G19"]
  - board: OCR
    code: "J560"
    spec_refs: ["9.01a", "9.01b", "9.01c", "9.01d", "9.02a", "9.02b", "9.04a", "9.04b", "9.04c"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FR13", "FG5", "FG7", "FG9", "FG17", "HR13", "HG5", "HG7", "HG8", "HG11", "HG19"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Geometry: transformations, congruence and similarity

This file covers congruent triangles, the four transformations (reflection, rotation, translation and enlargement), combined transformations, geometry problems on coordinate axes, and similar shapes, including how areas and volumes scale.

## Overview

Congruence, the four transformations, enlargement with fractional scale factors and lengths in similar shapes are on both tiers. Higher only: enlargement with negative scale factors, combined transformations and invariance, and areas and volumes of similar shapes.

### Board differences

- AQA and Edexcel: G5, G7, G8, G11, G19 and R12.
- OCR J560: 9.01 (reflection, rotation, translation, combined transformations), 9.02 (congruent triangles) and 9.04 (similar triangles, enlargement, similar shapes). OCR 9.03 (vectors) is in [15-geometry-vectors.md](15-geometry-vectors.md). OCR puts comparing lengths, areas and volumes of similar shapes in 9.04c, with the area and volume part Higher only.
- Eduqas C300QS: FG5, FG7, FG9, FG17 and FR13 on Foundation; HG5, HG7, HG8, HG11, HG19 and HR13 on Higher. Eduqas FG17 (like the DfE Foundation wording) covers lengths in similar figures only.
- Describing a translation by a column vector is G24, in [15-geometry-vectors.md](15-geometry-vectors.md).

## G5 Congruent triangles

*Refs: AQA G5 · Edexcel G5 · OCR 9.02a · Eduqas FG5, HG5. Tier: F & H.*

### What you need to know

- Congruent shapes are identical in shape and size (one may be a reflection of the other).
- Two triangles are congruent if they satisfy one of these conditions:
  - SSS: three pairs of sides equal.
  - SAS: two sides and the angle between them equal.
  - ASA (or AAS): two angles and a corresponding side equal.
  - RHS: right angle, hypotenuse and one other side equal.

### Explained

AAA is not a condition for congruence: triangles with the same angles can be different sizes (they are similar). SSA (two sides and an angle that is not between them) is not enough either, except in the right-angled case, RHS.

In ASA the side must be in the same position relative to the angles in both triangles.

### Worked example

Triangle 1 has sides 5 cm and 8 cm with an included angle of 40°. Triangle 2 has sides 8 cm and 5 cm with an included angle of 40°. Are they congruent?

1. Two sides and the included angle match. Congruent by SAS.

Triangle 3 has angles 50° and 60° and a side of 7 cm between them. Triangle 4 has angles 50° and 70° and a side of 7 cm between the 50° and 70° angles. Are they congruent?

1. Triangle 3's third angle is 70°, so its angles are 50°, 60°, 70°, with the 7 cm side between the 50° and 60°.
2. In triangle 4 the 7 cm side is between the 50° and 70°. The side is in a different position, so they are not necessarily congruent.

### Common mistakes

- Using AAA as a reason for congruence.
- Not checking that the equal side is in the matching position.

## G7 Transformations, congruent and similar shapes

*Refs: AQA G7 · Edexcel G7 · OCR 9.01a, 9.01b, 9.01c, 9.02a, 9.04a, 9.04b · Eduqas FG7, HG7. Tier: F & H (part Higher only).*

### What you need to know

- Identify, describe and carry out reflections, rotations, translations and enlargements, including on coordinate axes.
- Reflections, rotations and translations give congruent images; enlargements give similar images.
- Enlargement with positive whole-number and fractional scale factors.
- (HT only) Enlargement with negative scale factors.
- Identify similar shapes: corresponding angles are equal and corresponding sides are in the same ratio.

### Explained

To describe a transformation fully you must give:

| Transformation | Details needed |
| --- | --- |
| Reflection | The mirror line (for example y = x, x = −1) |
| Rotation | Centre, angle and direction (clockwise or anticlockwise) |
| Translation | The column vector |
| Enlargement | Centre and scale factor |

Use one transformation only unless the question asks for more.

Enlargement from a centre: the distance from the centre to each image point is the scale factor times the distance to the object point.

- Scale factor greater than 1: bigger image.
- Scale factor between 0 and 1 (a fraction): smaller image, closer to the centre.
- (HT only) Negative scale factor: the image is on the opposite side of the centre and is upside down (rotated 180°).

To find the centre of enlargement, draw lines through matching points on the object and image; they meet at the centre.

Useful reflections: in the x-axis, (x, y) → (x, −y); in the y-axis, (x, y) → (−x, y); in y = x, (x, y) → (y, x).

### Worked example

Triangle A has vertices (1, 1), (3, 1) and (1, 2). Enlarge it by scale factor 2, centre (0, 0).

1. Multiply each coordinate by 2: (2, 2), (6, 2), (2, 4).

Shape P has a vertex at (4, 6). It is enlarged by scale factor ½ with centre (2, 2). Find the image of that vertex.

1. From the centre to (4, 6): across 2, up 4.
2. Half of that: across 1, up 2.
3. Image: (3, 4).

(HT only) Enlarge the point (5, 3) by scale factor −2, centre (1, 1).

1. From the centre: across 4, up 2.
2. Multiply by −2: across −8, up −4.
3. Image: (1 − 8, 1 − 4) = (−7, −3).

Describe fully the single transformation that maps (2, 1), (4, 1), (4, 2) to (−1, 2), (−1, 4), (−2, 4).

1. Each (x, y) has gone to (−y, x). That is a rotation of 90° anticlockwise about (0, 0).

### Common mistakes

- Describing a transformation with missing details, such as a rotation with no centre.
- Giving two transformations when one is asked for.
- Measuring an enlargement from the origin when the centre is elsewhere.
- Thinking a fractional scale factor is not an enlargement. It is still called an enlargement.

## G8 Combined transformations and invariance

*Refs: AQA G8 · Edexcel G8 · OCR 9.01d · Eduqas HG8. Tier: Higher only.*

### What you need to know

- (HT only) Describe the changes and invariance achieved by combinations of rotations, reflections and translations.
- (HT only) An invariant point is one that does not move under a transformation.

### Explained

(HT only) Carry out the first transformation, then apply the second to the image. Then look for one single transformation that would do the same job.

(HT only) Useful facts:

- Two reflections in parallel lines make a translation.
- Two reflections in intersecting lines make a rotation about the point where they cross.
- Points on a mirror line are invariant under the reflection. The centre of a rotation is invariant.
- A translation (other than by the zero vector) has no invariant points.

### Worked example

(HT only) Triangle T is reflected in the y-axis, then the image is reflected in the x-axis. Describe the single transformation that maps T to the final image.

1. (x, y) → (−x, y) → (−x, −y).
2. This is a rotation of 180° about (0, 0).

(HT only) A shape is reflected in the line y = x. Which points stay fixed?

1. Every point on the line y = x is invariant.

### Common mistakes

- (HT only) Applying the second transformation to the original shape instead of the image.
- (HT only) Forgetting to describe the single transformation fully.

## G11 Geometry on coordinate axes

*Refs: AQA G11 · Edexcel G11 · OCR none · Eduqas FG9, HG11. Tier: F & H.*

### What you need to know

- Solve geometry problems on coordinate axes, for example finding a missing vertex of a shape, the midpoint of a side, or the length of a line.

### Explained

Use properties of the shape: in a parallelogram, the step from A to B is the same as the step from D to C. Lengths come from Pythagoras: the distance between (x₁, y₁) and (x₂, y₂) is

```latex
\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
```

### Worked example

ABCD is a parallelogram with A(1, 2), B(6, 3) and C(8, 7). Find D.

1. A to B: across 5, up 1.
2. D to C must be the same, so D = (8 − 5, 7 − 1) = (3, 6).

Find the length of the line from (−2, 1) to (4, 9).

1. Across 6, up 8.
2. √(36 + 64) = √100 = 10 units.

### Common mistakes

- Taking the vertices in the wrong order, giving a different shape.

## G19 Similar figures: lengths, areas and volumes

*Refs: AQA G19 · Edexcel G19 · OCR 9.02b, 9.04c · Eduqas FG17, HG19. Tier: F & H (part Higher only).*

### What you need to know

- Apply congruence and similarity, including the relationship between lengths in similar figures.
- (HT only) If lengths are multiplied by k, areas are multiplied by k² and volumes by k³.

```latex
\text{length scale factor} = k \qquad \text{area scale factor} = k^2 \qquad \text{volume scale factor} = k^3
```

### Explained

In similar shapes, find the length scale factor from a pair of matching sides: k = new length ÷ old length. Multiply other lengths by k. Angles do not change.

Similar triangles often appear one inside the other (for example a smaller triangle cut off by a line parallel to a side). Redraw them separately so the matching sides are clear.

(HT only) To go from area or volume back to length, take the square root or cube root. If two similar solids have volumes 27 cm³ and 125 cm³, the volume scale factor is 125/27, so the length scale factor is ∛(125/27) = 5/3, and the area scale factor is (5/3)² = 25/9.

### Worked example

Triangles ABC and ADE are similar, with DE parallel to BC. AB = 6 cm, AD = 9 cm and BC = 4 cm. Find DE.

1. Scale factor from ABC to ADE: 9 ÷ 6 = 1.5.
2. DE = 4 × 1.5 = 6 cm.

(HT only) Two similar bottles have heights 12 cm and 18 cm. The smaller holds 400 ml. How much does the larger hold?

1. k = 18/12 = 1.5.
2. Volume scale factor 1.5³ = 3.375.
3. 400 × 3.375 = 1350 ml.

(HT only) Two similar cones have surface areas 36 cm² and 81 cm². The smaller has volume 48 cm³. Find the volume of the larger.

1. Area scale factor 81/36 = 9/4, so k = 3/2.
2. Volume scale factor (3/2)³ = 27/8.
3. 48 × 27/8 = 162 cm³.

### Common mistakes

- Using AB and DB instead of AB and AD (the whole side, not a piece of it).
- (HT only) Using the length scale factor for areas or volumes.

## R12 Ratio and similarity

*Refs: AQA R12 · Edexcel R12 · OCR 9.04b, 9.04c · Eduqas FR13, HR13. Tier: F & H.*

### What you need to know

- Compare lengths, areas and volumes using ratio notation.
- Link ratio to similarity, scale factors and the trigonometric ratios.

### Explained

If two similar shapes have lengths in the ratio a : b, then (Higher) their areas are in the ratio a² : b² and their volumes a³ : b³. On Foundation, the length ratio a : b is used to find missing sides.

The trigonometric ratios (sine, cosine, tangent) work because all right-angled triangles with the same angle are similar, so the ratio of their sides is fixed. See [14-geometry-pythagoras-and-trigonometry.md](14-geometry-pythagoras-and-trigonometry.md).

### Worked example

Two similar rectangles have widths 4 cm and 10 cm. Write the ratio of their lengths in its simplest form.

1. 4 : 10 = 2 : 5.

(HT only) Write the ratio of their areas.

1. 2² : 5² = 4 : 25.

### Common mistakes

- Using the length ratio for areas.

## Check questions

1. State which condition shows that two triangles with sides 5, 7, 9 cm and 9, 5, 7 cm are congruent. [1 mark]
2. Reflect the point (3, −2) in the line y = x. [1 mark]
3. Describe fully the single transformation that maps (1, 2), (3, 2), (3, 5) to (1, −2), (3, −2), (3, −5). [2 marks]
4. A triangle with vertices (2, 2), (4, 2), (2, 6) is enlarged by scale factor ½ with centre (0, 0). Write down the new vertices. [2 marks]
5. Describe fully the transformation that maps the point (2, 3) to (6, 9) and (1, 1) to (3, 3). [2 marks]
6. (HT only) Enlarge the point (4, 4) by scale factor −1, centre (2, 1). [2 marks]
7. (HT only) A shape is rotated 90° clockwise about (0, 0) and then reflected in the x-axis. Describe the single transformation that has the same effect. [3 marks]
8. ABCD is a rectangle. A is (−1, 1), B is (5, 1) and C is (5, 4). Find D and the length of the diagonal AC. [3 marks]
9. In triangle PQR, ST is parallel to QR with S on PQ and T on PR. PS = 4 cm, SQ = 6 cm and ST = 3 cm. Find QR. [3 marks]
10. (HT only) Two similar boxes have volumes 64 cm³ and 343 cm³. The smaller has surface area 96 cm². Find the surface area of the larger. [3 marks]
11. (HT only) A model car is made to a scale of 1 : 20. The real car's windscreen has area 1.2 m². Find the area of the model's windscreen in cm². [3 marks]

## Mark scheme

1. SSS (1).
2. (−2, 3) (1).
3. Reflection (1) in the x-axis (y = 0) (1).
4. (1, 1), (2, 1), (1, 3) (2). One mark for two correct.
5. Enlargement (1), scale factor 3, centre (0, 0) (1).
6. From the centre: across 2, up 3 (1); image (2 − 2, 1 − 3) = (0, −2) (1).
7. (x, y) → (y, −x) → (y, x) (1); reflection (1) in the line y = x (1).
8. D = (−1, 4) (1); AC: across 6, up 3, √(36 + 9) (1) = √45 = 6.71 units (1).
9. PQ = 10 cm (1); scale factor 10/4 = 2.5 (1); QR = 7.5 cm (1).
10. Length scale factor ∛(343/64) = 7/4 (1); area scale factor 49/16 (1); 96 × 49/16 = 294 cm² (1).
11. Area scale factor 1/400 (1); 1.2 m² = 12 000 cm² (1); 12 000 ÷ 400 = 30 cm² (1).
