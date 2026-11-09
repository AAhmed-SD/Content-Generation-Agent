---
level: GCSE
subject: Mathematics
topic: "Geometry: perimeter, area, volume and scale drawing"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["G15", "G16", "G17", "G18"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["G15", "G16", "G17", "G18"]
  - board: OCR
    code: "J560"
    spec_refs: ["10.01c", "10.02a", "10.02b", "10.02c", "10.03a", "10.03b", "10.03c", "10.03d", "10.03e", "10.04a", "10.04b", "10.04c"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FG13", "FG14", "FG15", "FG16", "HG15", "HG16", "HG17", "HG18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Geometry: perimeter, area, volume and scale drawing

This file covers measuring lines and angles, bearings and scale drawings, perimeter and area of 2D shapes, circles, arcs and sectors, and the volume and surface area of prisms, cylinders, pyramids, cones, spheres and composite solids.

## Overview

All of this is on both tiers. Foundation questions tend to use simpler shapes and give more steps; Higher questions combine shapes, work backwards from an area or volume, or give answers in terms of π.

### Board differences

- AQA and Edexcel: G15 to G18.
- OCR J560: 10.01c (maps and scale drawings), 10.02 (perimeter), 10.03 (area) and 10.04 (volume and surface area). OCR's 10.03a includes the area of a triangle using ½ab sin C on Higher; that is taught in [14-geometry-pythagoras-and-trigonometry.md](14-geometry-pythagoras-and-trigonometry.md).
- Eduqas C300QS: FG13 to FG16 on Foundation and HG15 to HG18 on Higher.
- Formulae: you must know the formulae for the area of a triangle, parallelogram and trapezium, the volume of a prism, and the circumference and area of a circle. The formulae for the volume and surface area of spheres and cones, and the volume of a pyramid, are given in the question (Eduqas prints them on the paper itself from summer 2026).

## G15 Measuring, bearings and scale drawings

*Refs: AQA G15 · Edexcel G15 · OCR 10.01c · Eduqas FG13, HG15. Tier: F & H.*

### What you need to know

- Measure line segments and angles accurately with a ruler and protractor.
- Interpret and draw maps and scale drawings.
- Use bearings: measured clockwise from north, written with three figures (for example 045°, 270°).

### Explained

A bearing tells you a direction from one point to another. "The bearing of B from A" means stand at A, face north, then turn clockwise until you face B.

Back bearings: if the bearing of B from A is θ, the bearing of A from B is θ + 180° (or θ − 180° if θ is more than 180°). This works because the two north lines are parallel, so co-interior angles add up to 180°.

On a scale drawing, convert real lengths to drawing lengths using the scale, and draw angles exactly.

### Worked example

The bearing of a lighthouse L from a boat B is 062°. Find the bearing of B from L.

1. 062 + 180 = 242°.

A ship sails 8 km on a bearing of 120°. Using a scale of 1 cm to 2 km, how long is the line on the drawing?

1. 8 ÷ 2 = 4 cm, drawn at 120° clockwise from north.

### Common mistakes

- Measuring anticlockwise, or from east.
- Writing 45° instead of 045°.
- Measuring from the wrong point: "from A" means the protractor goes at A.

## G16 Area of 2D shapes and volume of prisms

*Refs: AQA G16 · Edexcel G16 · OCR 10.03a, 10.03b, 10.03c, 10.04a · Eduqas FG14, HG16. Tier: F & H.*

### What you need to know

- Know and use formulae for the areas of rectangles, triangles, parallelograms and trapezia:

```latex
A_{\text{rectangle}} = lw \qquad A_{\text{triangle}} = \tfrac{1}{2}bh \qquad A_{\text{parallelogram}} = bh \qquad A_{\text{trapezium}} = \tfrac{1}{2}(a + b)h
```

- Know and use the volume of a cuboid and of any prism:

```latex
V_{\text{cuboid}} = lwh \qquad V_{\text{prism}} = \text{area of cross-section} \times \text{length}
```

- Find surface areas by adding the areas of all faces (using a net helps).

### Explained

The height in each area formula is the perpendicular height, at right angles to the base, not the slanted side.

Compound shapes: split into rectangles, triangles and so on, then add; or find a large shape and subtract the missing piece.

A prism is any solid with a constant cross-section: cuboids, triangular prisms and cylinders are all prisms.

### Worked example

A trapezium has parallel sides 7 cm and 13 cm, and height 6 cm. Find its area.

1. ½(7 + 13) × 6 = 60 cm².

A triangular prism is 15 cm long. Its cross-section is a right-angled triangle with sides 6 cm, 8 cm and 10 cm. Find its volume and total surface area.

1. Cross-section area: ½ × 6 × 8 = 24 cm².
2. Volume: 24 × 15 = 360 cm³.
3. Surface area: two triangles 48 cm², plus rectangles 6 × 15 + 8 × 15 + 10 × 15 = 360 cm². Total 408 cm².

A cuboid has volume 240 cm³, length 10 cm and width 6 cm. Find its height.

1. 240 ÷ (10 × 6) = 4 cm.

### Common mistakes

- Using the slant side as the height.
- Forgetting to halve for a triangle.
- Missing faces of a prism when finding surface area.

## G17 Circles, cylinders, cones, pyramids, spheres and composite solids

*Refs: AQA G17 · Edexcel G17 · OCR 10.02a, 10.02b, 10.02c, 10.03d, 10.03e, 10.04b, 10.04c · Eduqas FG15, HG17. Tier: F & H.*

### What you need to know

- Know the formulae for the circumference and area of a circle:

```latex
C = 2\pi r = \pi d \qquad A = \pi r^2
```

- Calculate perimeters of 2D shapes, including circles and composite shapes.
- Calculate areas of circles and composite shapes.
- Calculate surface areas and volumes of cylinders, spheres, pyramids, cones and composite solids, using the formulae given:

```latex
V_{\text{cylinder}} = \pi r^2 h \qquad \text{curved surface of cylinder} = 2\pi r h
```

```latex
V_{\text{pyramid}} = \tfrac{1}{3} \times \text{base area} \times h \qquad V_{\text{cone}} = \tfrac{1}{3}\pi r^2 h \qquad \text{curved surface of cone} = \pi r l
```

```latex
V_{\text{sphere}} = \tfrac{4}{3}\pi r^3 \qquad \text{surface area of sphere} = 4\pi r^2
```

- In the cone formula, l is the slant height; use Pythagoras to find it from r and h if needed: l² = r² + h².

### Explained

Read whether you are given the radius or the diameter.

The total surface area of a cylinder is the curved surface plus the two circular ends: 2πrh + 2πr². Of a solid cone: πrl + πr². Of a hemisphere: half of 4πr² plus the flat circle πr², so 3πr².

For composite solids (for example a cone on top of a cylinder), find each part separately and add. For surface areas, leave out faces that are joined together and hidden.

Exact answers are left in terms of π.

### Worked example

A circular table has diameter 1.4 m. Find its circumference and area to 3 significant figures.

1. C = π × 1.4 = 4.40 m.
2. r = 0.7; A = π × 0.7² = 1.54 m².

A shape is a 10 cm by 6 cm rectangle with a semicircle on one 6 cm side. Find its perimeter.

1. Semicircle arc: ½ × π × 6 = 9.42 cm.
2. Straight edges: 10 + 6 + 10 = 26 cm.
3. Perimeter: 35.4 cm (3 s.f.).

A cone has radius 5 cm and height 12 cm. Find its volume and total surface area in terms of π.

1. V = ⅓ × π × 25 × 12 = 100π cm³.
2. Slant height l = √(25 + 144) = 13 cm.
3. Total surface area = π × 5 × 13 + π × 25 = 90π cm².

A solid metal sphere of radius 6 cm is melted and recast into a cylinder of radius 4 cm. Find the height of the cylinder.

1. Sphere volume: 4/3 × π × 216 = 288π cm³.
2. Cylinder: π × 16 × h = 288π, so h = 18 cm.

### Common mistakes

- Using the diameter in πr².
- Using the vertical height instead of the slant height in πrl.
- Forgetting the ⅓ in pyramid and cone volumes.
- Including the hidden join when finding the surface area of a composite solid.

## G18 Arcs and sectors

*Refs: AQA G18 · Edexcel G18 · OCR 10.02b, 10.02c, 10.03d, 10.03e · Eduqas FG16, HG18. Tier: F & H.*

### What you need to know

- Calculate arc lengths, angles and areas of sectors of circles:

```latex
\text{arc length} = \frac{\theta}{360} \times 2\pi r \qquad \text{sector area} = \frac{\theta}{360} \times \pi r^2
```

### Explained

A sector with angle θ is the fraction θ/360 of the whole circle, so both its arc and its area are that fraction of the circle's circumference and area.

The perimeter of a sector is the arc length plus two radii.

To find the angle from an arc length or area, rearrange: θ = (arc ÷ 2πr) × 360.

### Worked example

A sector has radius 9 cm and angle 80°. Find its arc length, perimeter and area.

1. Arc: 80/360 × 2π × 9 = 12.57 cm.
2. Perimeter: 12.57 + 18 = 30.6 cm (3 s.f.).
3. Area: 80/360 × π × 81 = 56.5 cm² (3 s.f.).

A sector of radius 6 cm has area 15π cm². Find its angle.

1. θ/360 × 36π = 15π.
2. θ/360 = 15/36, so θ = 150°.

### Common mistakes

- Forgetting to add the two radii for a sector's perimeter.
- Using diameter instead of radius in the formulae.

## Check questions

1. The bearing of Q from P is 310°. Find the bearing of P from Q. [1 mark]
2. A parallelogram has base 12 cm and perpendicular height 7.5 cm. Find its area. [1 mark]
3. A trapezium has area 54 cm², height 6 cm and one parallel side 7 cm. Find the other parallel side. [3 marks]
4. A cylinder has radius 3 cm and height 10 cm. Find its volume and total surface area, giving your answers in terms of π. [4 marks]
5. A square-based pyramid has base 8 cm by 8 cm and height 9 cm. Find its volume. [2 marks]
6. A hemisphere has radius 4 cm. Find its volume to 3 significant figures. [2 marks]
7. A cone has radius 6 cm and slant height 10 cm. Find its vertical height and its volume in terms of π. [4 marks]
8. A sector has radius 12 cm and angle 135°. Find its area in terms of π and its perimeter to 1 decimal place. [4 marks]
9. A circle has circumference 31.4 cm. Find its area to the nearest cm². [3 marks]
10. A water tank is a cuboid 1.2 m by 0.8 m by 0.5 m. How many litres does it hold when full? [2 marks]
11. A toy is a cone of radius 3 cm and height 4 cm on top of a hemisphere of radius 3 cm. Find its total volume in terms of π. [3 marks]

## Mark scheme

1. 130° (1).
2. 90 cm² (1).
3. ½(7 + b) × 6 = 54 (1); 7 + b = 18 (1); b = 11 cm (1).
4. V = π × 9 × 10 = 90π cm³ (2); SA = 2π × 3 × 10 + 2π × 9 (1) = 78π cm² (1).
5. ⅓ × 64 × 9 (1) = 192 cm³ (1).
6. ½ × 4/3 × π × 64 (1) = 134 cm³ (1).
7. h = √(100 − 36) = 8 cm (2); V = ⅓ × π × 36 × 8 (1) = 96π cm³ (1).
8. Area = 135/360 × 144π = 54π cm² (2); arc = 135/360 × 24π = 9π = 28.27… cm (1); perimeter = 28.27 + 24 = 52.3 cm (1).
9. r = 31.4 ÷ (2π) = 4.997… cm (1); area = π × 4.997…² (1) = 78 cm² (1).
10. Volume 0.48 m³ (1); 0.48 × 1000 = 480 litres (1).
11. Cone: ⅓ × π × 9 × 4 = 12π (1); hemisphere: ½ × 4/3 × π × 27 = 18π (1); total 30π cm³ (1).
