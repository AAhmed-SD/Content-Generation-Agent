---
board: AQA
level: GCSE
subject: Engineering
code: "8852"
also_covers: []
topic: "3.6 Practical engineering skills"
spec_refs: ["3.6"]
refs_checked: false
spec_url: https://www.aqa.org.uk/subjects/engineering/gcse/engineering-8852/specification/subject-content/practical-engineering-skills
pmt_url: null
---

# 3.6 Practical engineering skills

These skills are developed through practical work and the NEA, but the written paper can ask about any of them: reading and drawing to conventions, planning production, choosing tools and processes, measuring, and testing. This file covers the knowledge behind the skills, not the NEA project itself.

## 3.6 Problem solving and analysing existing solutions

### What you need to know

- Use logical, systematic approaches to solve engineering problems.
- Analyse and evaluate existing engineered products.
- Use block diagrams and flow charts to represent systems and processes.

### Explained

A systematic approach: understand the problem and who it is for; write a specification (measurable requirements such as maximum mass, load to carry, cost limit, size limits, safety standards); research existing solutions; generate and compare ideas against the specification; model and test; refine; make; test and evaluate against the specification.

Analysing an existing product (product analysis): identify its function, materials and why they were chosen, how it was made and assembled, how it meets user needs, its cost, safety features, maintenance, and environmental impact. Disassembling a product shows how parts are joined and which sub-systems it contains. Use this to find strengths to keep and weaknesses to improve.

### Common mistakes

- Writing specification points that cannot be tested, such as "it must look nice". Make each one measurable, such as "mass under 500 g".

## 3.6 Engineering drawings and CAD

### What you need to know

- Produce and read mechanical and electrical or electronic drawings to current conventions: orthographic projection (third angle), isometric, assembly drawings, section views and schematic diagrams.
- Use 2D CAD (circuit diagrams, PCB layouts, orthographic drawings) and 3D CAD (solid modelling, isometric views).

### Explained

Third angle orthographic projection shows an object as separate flat views: the plan (top view) is drawn above the front elevation; the end (side) elevation viewed from the right is drawn to the right of the front elevation. The third angle symbol (a truncated cone drawn in two views) appears in the title block. Conventions:

- Line types: thick continuous for visible outlines; thin dashed for hidden detail; thin chain (long dash, short dash) for centre lines; thin continuous for dimension and projection lines.
- Dimensions in millimetres, with arrowheads touching the projection lines, numbers placed above the dimension line and readable from the bottom or right; each size given once.
- Title block: title, scale (for example 1:2 means drawing half the real size), units, projection symbol, name, date, drawing number.
- Diameters marked with ⌀ and radii with R.

Isometric drawing shows a 3D view with vertical lines vertical and horizontal edges drawn at 30° to the horizontal. All three faces are shown at true length along the axes.

Assembly drawings show how parts fit together, often exploded (parts drawn spread out along their assembly lines) with a parts list numbering each component and giving its material and quantity.

Section views show the inside of an object as if cut along a cutting plane (marked A–A on another view with arrows). The cut surfaces are hatched with thin lines at 45°; different parts are hatched in different directions or spacings.

Schematic diagrams show electrical, electronic or pneumatic circuits using standard symbols (BS and ISO) connected by straight lines, not showing physical layout.

CAD benefits: accurate, easy to edit and copy, files shared and sent straight to CNC machines (CAD/CAM), 3D models can be rendered and tested by simulation, standard parts come from libraries. Drawbacks: software and training cost, files can be lost or corrupted, sketching is still faster for first ideas. PCB design software converts a circuit diagram into a track layout that can be milled or etched.

### Common mistakes

- Drawing the plan below the front view; that is first angle projection.
- Using solid lines for hidden detail.
- Hatching the whole drawing in a section view; only cut surfaces are hatched.

## 3.6 CNC and CAM

### What you need to know

- Use CNC and CAM in 2D or 3D: laser cutting, vinyl cutting, PCB routing or drilling, turning, rapid prototyping, milling and routing.

### Explained

CAM (computer-aided manufacture) software takes a CAD design and works out tool paths: the route the tool or laser will follow, the depth of each cut, speeds and feeds. It outputs a program (often G-code) that a CNC (computer numerical control) machine follows.

| Machine | Typical use |
| --- | --- |
| Laser cutter | Cutting and engraving acrylic, plywood, MDF, card |
| Vinyl cutter | Cutting self-adhesive vinyl for graphics, labels and masks |
| CNC router or mill | Machining pockets, profiles and 3D surfaces in wood, plastics and metals; PCB isolation routing and drilling |
| CNC lathe | Turning cylindrical parts to accurate diameters |
| 3D printer | Rapid prototypes and complex small parts |

Advantages: high accuracy and repeatability; complex shapes; identical batches; less operator skill needed during cutting; safer (enclosed machines). Disadvantages: high cost of machines; programming time; set-up time makes it slow for a single simple part; maintenance and breakdowns stop production.

### Common mistakes

- Saying CNC machines need no checking. Set-up, workholding and first-part inspection still matter.

## 3.6 Planning, making and quality

### What you need to know

- Test materials under load to choose a material for a component.
- Produce a production plan covering materials, processes, time and safety.
- Predict performance using calculations and modelling (iconic, analogue and symbolic).
- Select and safely use materials, parts, components, tools and equipment.
- Processes: measuring, marking out, turning, milling, drilling, forming, bending, casting, joining, fastening, folding, shaping and finishing.
- Quality control: work to tolerances; check with Vernier calipers, micrometers and depth gauges; use CNC and CAM to make sure parts fit.
- Design tests to check fitness for purpose and performance, and identify improvements.

### Explained

Production plan: a sequence of numbered stages, each with the process, tools and equipment, materials, time allowed, safety precautions (risk assessment and PPE), and quality control checks at key points. A Gantt chart can show stages against time, including those that can run in parallel.

Marking out metal: coat the surface with marking blue; use a scriber, engineer's square, steel rule, odd-leg calipers (lines parallel to an edge), dividers (circles and arcs) and centre punch (to mark hole centres so the drill does not wander). Use a surface plate and height gauge for accurate lines. Wood is marked with a pencil, try square and marking gauge.

Measuring instruments:

- Steel rule: to about 0.5 mm.
- Vernier calipers: outside, inside and depth measurements to 0.02 mm (digital versions read directly).
- Micrometer: outside diameters to 0.01 mm; read the main sleeve scale (whole and half millimetres) and add the thimble reading (hundredths).
- Depth gauge: depth of holes, slots and steps.

Safety: wear goggles and appropriate PPE; tie back hair and loose clothing; use machine guards; clamp work; know emergency stops; use fume extraction for soldering, laser cutting and composites; handle hot metal with tongs; follow risk assessments (identify the hazard, assess the risk, put control measures in place).

Testing a prototype: decide what to measure from the specification (for example: carries 50 N without deflecting more than 2 mm; runs for 2 hours on one battery charge), carry out fair, repeatable tests, record results, compare with targets and suggest specific modifications.

### Worked example

Reading a micrometer: the sleeve shows 12 mm and one half-millimetre line visible after it (12.5 mm), and the thimble line at 23. Reading = 12.5 + 0.23 = 12.73 mm.

### Common mistakes

- A production plan without quality checks or timings.
- Forgetting to centre punch before drilling.
- Reading a micrometer and missing the half-millimetre line.

## Check questions

1. In third angle projection, where is the plan view drawn relative to the front elevation? [1 mark]
2. State the line type used for (a) hidden detail, (b) centre lines. [2 marks]
3. Explain why section views are used on engineering drawings. [2 marks]
4. Give two advantages of using CAD to produce a PCB layout. [2 marks]
5. Describe how CAM is used to produce a part on a CNC router. [3 marks]
6. Name the marking-out tool used to (a) draw a line parallel to the edge of a metal plate, (b) mark the centre of a hole to be drilled. [2 marks]
7. A micrometer reading has 8.5 mm on the sleeve and 37 on the thimble. Give the reading. [1 mark]
8. List four things that should be included in each stage of a production plan. [4 marks]
9. Write two measurable specification points for a handheld torch. [2 marks]
10. Explain why a product analysis of an existing product is useful when designing a new one. [2 marks]

## Mark scheme

1. Above the front elevation (1).
2. (a) Thin dashed line (1). (b) Thin chain line / long dash short dash (1).
3. To show internal details / hidden features clearly (1) without confusing hidden lines (1).
4. Any two: accurate / easy to edit / can be simulated / tracks routed automatically / output directly to CNC or etching mask (1 each).
5. CAD model imported into CAM software (1); tool paths, cut depths, speeds and tool selected (1); program (G-code) sent to the router, which follows it to cut the part (1).
6. (a) Odd-leg calipers (1). (b) Centre punch (1).
7. 8.87 mm (1).
8. Any four: order of stages / process; tools and equipment; materials; time; safety / PPE / risk; quality control checks (1 each).
9. Any two measurable points, e.g. mass under 200 g; runs 3 hours on one set of batteries; survives a 1 m drop; fits a hand 50 mm in diameter (1 each).
10. Shows how existing products meet needs / materials and manufacturing used (1), so strengths can be kept and weaknesses improved in the new design (1).
