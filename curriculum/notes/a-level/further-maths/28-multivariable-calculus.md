---
level: A-level
subject: Further Mathematics
topic: "Multivariable calculus"
as_content: "All of this file is A-level only option content: OCR Additional Pure (8.05) and MEI Extra Pure."
boards:
  - board: OCR
    code: "H245"
    spec_refs: ["8.05a", "8.05b", "8.05c", "8.05d", "8.05e", "8.05f", "8.05g"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Xc1", "Xc2", "Xc3", "Xc4", "Xc5", "Xc6", "Xc7"]
refs_checked: false
spec_urls:
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Multivariable calculus

This file covers functions of two variables as surfaces, sections and contours, first and second partial derivatives, the gradient vector, tangent planes and normals, and finding and classifying stationary points.

## Overview

Option content on OCR (Additional Pure) and MEI (Extra Pure). It uses vectors and planes ([10-vectors-lines-planes-and-scalar-product.md](10-vectors-lines-planes-and-scalar-product.md)) and the usual one-variable rules of differentiation.

### Board differences

- OCR 8.05a to 8.05g: surfaces z = f(x, y) and g(x, y, z) = c, sections and contours, partial derivatives, stationary points, tangent planes, and the nature of stationary points (using the Hessian determinant).
- MEI Xc1 to Xc7: surfaces, contours and sections, first and second partial derivatives, grad g and normals, tangent planes and stationary points.
- OCR 8.05b (Stage 2) extends to functions of more than two variables including exponentials, logs and trig.

## Surfaces, sections and contours

*Refs: OCR 8.05a, 8.05b, 8.05c · MEI Xc1, Xc2, Xc5. Level: A-level only.*

### What you need to know

- z = f(x, y) defines a surface in 3D. So does g(x, y, z) = c.
- A section is the curve where the surface meets a plane such as x = k or y = k. A contour is the curve f(x, y) = k (the section by the plane z = k, seen from above).

### Worked example

Describe the sections and contours of z = x² + 2y².

1. Section y = 0: z = x², a parabola. Section x = 0: z = 2y², a narrower parabola.
2. Contours z = k > 0: x² + 2y² = k, ellipses. The surface is a bowl (an elliptic paraboloid).

Describe the surface z = x² − y².

1. Sections y = 0: z = x² (up); x = 0: z = −y² (down). A saddle shape.
2. Contours x² − y² = k: hyperbolas, and the lines y = ±x for k = 0.

### Common mistakes

- Confusing sections (vertical slices) with contours (horizontal slices).

## Partial derivatives

*Refs: OCR 8.05d · MEI Xc3, Xc4. Level: A-level only.*

### What you need to know

- ∂f/∂x: differentiate with respect to x, treating y as constant. ∂f/∂y similarly.
- Second derivatives f_xx, f_yy, f_xy = f_yx (equal for the functions met here).
- ∂f/∂x at a point is the gradient of the section y = constant through that point.

### Worked example

f = xe^{xy}. Find f_x, f_y and f_xy.

1. f_x = e^{xy} + xye^{xy} (product rule).
2. f_y = x²e^{xy}.
3. f_xy = ∂/∂y(f_x) = xe^{xy} + xe^{xy} + x²ye^{xy} = x(2 + xy)e^{xy}. (f_yx = 2xe^{xy} + x²ye^{xy}, the same.)

### Common mistakes

- Treating y as a function of x.

## Tangent planes, normals and grad

*Refs: OCR 8.05f · MEI Xc5, Xc6, Xc7. Level: A-level only.*

### What you need to know

- Tangent plane to z = f(x, y) at (a, b, f(a, b)):

```latex
z - f(a,b) = f_x(a,b)(x-a) + f_y(a,b)(y-b)
```

- For a surface g(x, y, z) = c, grad g = (g_x, g_y, g_z) is normal to the surface. The tangent plane at P has normal (grad g)_P.
- The surface z = f(x, y) is g = f(x, y) − z = 0, with normal (f_x, f_y, −1).

### Worked example

Find the tangent plane to z = x² + 2y² at (1, 1, 3).

1. f_x = 2x = 2, f_y = 4y = 4.
2. z − 3 = 2(x − 1) + 4(y − 1), so z = 2x + 4y − 3.

Find the tangent plane and normal line to x² + y² + z² = 9 at (1, 2, 2).

1. grad g = (2x, 2y, 2z) = (2, 4, 4), or (1, 2, 2).
2. Plane: x + 2y + 2z = 1 + 4 + 4 = 9.
3. Normal line: r = (1, 2, 2) + t(1, 2, 2), through the centre, as expected for a sphere.

### Common mistakes

- Forgetting the −1 in the normal to z = f(x, y).

## Stationary points

*Refs: OCR 8.05e, 8.05g · MEI Xc7. Level: A-level only.*

### What you need to know

- Stationary points satisfy f_x = 0 and f_y = 0 (the tangent plane is horizontal).
- (OCR 8.05g) Classify with D = f_xx f_yy − (f_xy)²:
  - D > 0 and f_xx > 0: minimum; D > 0 and f_xx < 0: maximum;
  - D < 0: saddle point; D = 0: test fails, look at sections.
- (MEI) Classify by considering sections or contours near the point.

### Worked example

Find and classify the stationary points of f = x³ + y³ − 3xy.

1. f_x = 3x² − 3y = 0, f_y = 3y² − 3x = 0. So y = x², x = y², giving x⁴ = x: (0, 0) and (1, 1).
2. f_xx = 6x, f_yy = 6y, f_xy = −3.
3. (0, 0): D = 0 − 9 < 0, saddle. (1, 1): D = 36 − 9 > 0, f_xx > 0, minimum, f = −1.

Find the stationary points of f = x²y + y² − 4y.

1. f_x = 2xy = 0, f_y = x² + 2y − 4 = 0.
2. x = 0: y = 2. y = 0: x = ±2. Points (0, 2, −4), (2, 0, 0), (−2, 0, 0).
3. f_xx = 2y, f_yy = 2, f_xy = 2x. At (0, 2): D = 8 > 0, f_xx > 0, minimum. At (±2, 0): D = −16, saddles.

### Common mistakes

- Missing solutions by dividing by a variable that may be zero (factorise instead).

## Check questions

1. Describe the contours of z = 4 − x² − y² and sketch the surface. [3 marks]
2. f(x, y) = x² sin y + y³. Find f_x, f_y, f_xx, f_yy and f_xy. [5 marks]
3. Find the equation of the tangent plane to z = xy² at (2, 1, 2). [4 marks]
4. Find the equation of the tangent plane to x²/4 + y² + z²/9 = 3 at (2, 1, 3). [4 marks]
5. Find and classify the stationary points of f(x, y) = x² + xy + y² − 3x. [6 marks]
6. Find the stationary points of z = x³ − 12x + y² − 2y and classify them. [6 marks]

## Mark scheme

1. Circles x² + y² = 4 − z, centre the z-axis, shrinking to a point at z = 4 (2). Dome (paraboloid opening downwards) (1).
2. f_x = 2x sin y (1). f_y = x² cos y + 3y² (1). f_xx = 2 sin y (1). f_yy = −x² sin y + 6y (1). f_xy = 2x cos y (1).
3. f_x = y² = 1, f_y = 2xy = 4 (2). z − 2 = (x − 2) + 4(y − 1) (1). z = x + 4y − 4 (1).
4. grad = (x/2, 2y, 2z/9) = (1, 2, ⅔) (2). Normal (3, 6, 2) (1). 3x + 6y + 2z = 6 + 6 + 6 = 18 (1).
5. 2x + y − 3 = 0, x + 2y = 0 (2). x = 2, y = −1 (1). f_xx = 2, f_yy = 2, f_xy = 1, D = 3 > 0 (2). Minimum at (2, −1), f = −3 (1).
6. 3x² − 12 = 0, 2y − 2 = 0 (1). (2, 1) and (−2, 1) (1). f_xx = 6x, f_yy = 2, f_xy = 0 (1). (2, 1): D = 24 > 0, minimum, z = −17 (1). (−2, 1): D = −24, saddle, z = 15 (2).
