---
board: AQA
level: GCSE
subject: Engineering
code: "8852"
also_covers: []
topic: "3.2.1 to 3.2.2 Additive manufacturing and material removal"
spec_refs: ["3.2.1", "3.2.2"]
refs_checked: false
spec_url: https://www.aqa.org.uk/subjects/engineering/gcse/engineering-8852/specification/subject-content/engineering-manufacturing-processes
pmt_url: null
---

# 3.2.1 to 3.2.2 Additive manufacturing and material removal

For each process you need to know which materials it suits and how it is carried out. This file covers the two opposite approaches: building a part up layer by layer (additive) and cutting material away from a larger piece (subtractive, or material removal). It includes cutting speed and spindle speed calculations and the angles used when turning a taper.

## 3.2.1 Additive manufacturing

### What you need to know

- Fused deposition modelling (FDM): building polymer parts by extruding melted filament layer by layer.
- Sintering: fusing powdered material (including metals) with a laser.
- Rapid prototyping with polymers: making quick physical models to test a design.

### Explained

All additive processes start from a 3D CAD model. Software slices the model into thin horizontal layers and sends instructions for each layer to the machine. The part is built one layer on top of the last.

Fused deposition modelling (FDM):

1. A spool of thermoplastic filament (commonly PLA or ABS) is fed into a heated nozzle.
2. The nozzle melts the filament and moves in X and Y, laying a thin bead of molten plastic in the shape of the layer.
3. The plastic cools and solidifies; the build platform drops (or the nozzle rises) by one layer height, typically 0.1 to 0.3 mm.
4. Overhangs need support structures, printed in the same or a dissolvable material and removed afterwards.

Sintering (selective laser sintering, and direct metal laser sintering for metals):

1. A thin layer of powder (nylon, or a metal such as titanium, stainless steel or aluminium alloy) is spread across the build bed.
2. A laser scans the shape of the layer, heating the powder so that the particles fuse together without fully melting into a pool.
3. The bed lowers, a new layer of powder is spread and the process repeats.
4. Loose powder supports the part as it builds, so complex shapes need few supports. The unused powder is recovered and reused.

Rapid prototyping: making a physical model quickly and cheaply, usually by FDM, so a design can be checked for size, fit, ergonomics and appearance before expensive tooling is made. Problems are found early, when they are cheap to fix.

Advantages of additive manufacturing: very little waste; complex internal shapes (lattices, channels) that cannot be machined or moulded; no tooling, so one-off and custom parts are economical; designs can be changed instantly. Disadvantages: slow for large numbers; parts can be weaker between layers; surface finish shows layer lines; metal machines are very expensive.

### Common mistakes

- Saying a 3D printer "carves" the shape. Additive means adding material, layer by layer.
- Saying sintering melts the powder into liquid. The particles fuse at their surfaces.
- Forgetting that FDM parts are weakest between layers, which matters if the part is loaded.

## 3.2.2 Material removal

### What you need to know

- Cutting: sawing, shearing, laser cutting. Calculate cutting speeds.
- Turning on a centre lathe: parallel (cylindrical) turning, taper turning, boring. Calculate angles using trigonometry and Pythagoras.
- Milling: face milling and slot milling.
- Drilling: on a pillar drill, and centre drilling on a lathe. Calculate spindle speeds and use order-of-magnitude estimates.
- Chemical etching, including making printed circuit boards (PCBs).

### Explained

Cutting:

- Sawing: a blade with teeth removes a narrow strip of material (the kerf). Hand saws (hacksaw for metal, tenon saw for wood), band saws and power hacksaws are used. It suits bar, tube and sheet in metals, polymers and wood.
- Shearing: two hardened blades pass each other closely, like scissors, and fracture the material along a line with no kerf and no swarf. Tin snips, bench shears and guillotines shear thin sheet metal. It is fast but can distort the edge and only suits thin sheet.
- Laser cutting: a focused high-power laser beam melts, burns or vaporises material along a path controlled by CNC. It gives a very narrow kerf, accurate, smooth edges and complex shapes. It suits acrylic, wood, card, fabric and (with powerful lasers) sheet metal. PVC must never be laser cut because it releases toxic chlorine-containing fumes.

Turning on a centre lathe. The work is held in a chuck and rotates; a single-point cutting tool on the saddle and cross-slide moves along or across it.

- Parallel turning (cylindrical turning): the tool moves along the axis of the work, parallel to it, to reduce the diameter evenly.
- Facing: the tool moves across the end to make it flat and square.
- Taper turning: the compound slide is set at an angle so the tool moves at an angle to the axis, making a cone. The angle is found with trigonometry.
- Boring: a boring bar enlarges an existing hole to an accurate size and good finish.
- Centre drilling: a short, stiff centre drill in the tailstock chuck makes an accurate starting point so a twist drill does not wander.

Milling. A rotating multi-toothed cutter removes material from work clamped to a moving table.

- Face milling: a wide cutter machines a large flat surface.
- Slot milling: a slot drill or end mill cuts a groove or keyway; a slot drill can plunge straight down into the work.

CNC milling machines and routers follow coordinates from CAD/CAM software, so complex shapes are repeatable.

Drilling. A pillar drill rotates a twist drill held in a chuck; the work is clamped in a machine vice or to the table (never held by hand). The correct spindle speed depends on drill diameter and material: large drills and hard materials need lower speeds.

Chemical etching. A chemical (etchant) dissolves unprotected metal. To make a PCB:

1. A copper-clad board is coated with a light-sensitive resist.
2. It is exposed to UV light through a mask of the track layout; the developer removes the resist that was exposed (for positive resist), leaving resist only on the tracks.
3. The board is placed in etchant (such as ferric chloride), which dissolves the unprotected copper.
4. The remaining resist is removed, leaving copper tracks; holes are drilled for components.

Etching gives very fine detail with no mechanical force. Etchant is corrosive, so gloves and eye protection are needed and waste must be disposed of safely. PCBs can also be made by CNC routing (isolation milling) the copper.

Cutting speed and spindle speed. The cutting speed is the speed at which the surface of the work (lathe) or the cutting edge (drill, mill) moves past the material, in metres per minute. Each material has a recommended cutting speed: roughly 20 to 30 m/min for low carbon steel with high-speed steel tools, and much higher (over 100 m/min) for aluminium. The relationship is:

spindle speed (rev/min) = (cutting speed in m/min × 1000) ÷ (π × diameter in mm)

The × 1000 converts metres to millimetres. (This relationship is not one of the numbered equations; it is an application of circumference = π × diameter.)

### Worked example

1. Spindle speed. A 10 mm drill is used on low carbon steel with a recommended cutting speed of 25 m/min.
   - Circumference = π × 10 = 31.4 mm per revolution.
   - Cutting speed in mm/min = 25 × 1000 = 25 000 mm/min.
   - Spindle speed = 25 000 ÷ 31.4 ≈ 796 rev/min. Choose the nearest lower available speed, for example 750 rev/min.
   - Order-of-magnitude check: hundreds of rev/min, which is sensible for a 10 mm drill in steel; a 3 mm drill would need a few thousand.

2. Cutting speed. Aluminium bar 40 mm in diameter turns at 900 rev/min. Cutting speed = π × 40 × 900 ÷ 1000 = 113 m/min.

3. Taper angle. A taper reduces a bar from 30 mm diameter to 20 mm diameter over a length of 50 mm.
   - The radius changes by (30 − 20) ÷ 2 = 5 mm.
   - tan θ = opposite ÷ adjacent = 5 ÷ 50 = 0.1, so θ = tan⁻¹(0.1) ≈ 5.7°. The compound slide is set to 5.7° from the axis.
   - Length of the sloping surface (Pythagoras) = √(50² + 5²) = √2525 ≈ 50.2 mm.

### Common mistakes

- Using the diameter difference instead of half of it in taper calculations. The tool moves by the change in radius.
- Forgetting the × 1000 when converting between m/min and mm.
- Running large drills too fast. Speed must fall as diameter rises.
- Saying shearing produces swarf. It does not; sawing and machining do.

## Check questions

1. Describe how a part is made by fused deposition modelling. [4 marks]
2. Give two advantages of sintering over machining for a titanium aircraft bracket with internal channels. [2 marks]
3. Explain why a product designer would make a rapid prototype before ordering an injection mould. [2 marks]
4. Explain why shearing is suitable for cutting 1 mm aluminium sheet but not 20 mm steel bar. [2 marks]
5. Name the lathe operation used to (a) make a flat end on a bar, (b) enlarge a hole accurately. [2 marks]
6. Explain why a centre drill is used before drilling a hole on a lathe. [2 marks]
7. Calculate the spindle speed for a 6 mm drill in aluminium with a cutting speed of 90 m/min. Give your answer to 2 significant figures. [3 marks]
8. A taper is turned on a bar from 24 mm to 16 mm diameter over 40 mm length. Calculate the angle the compound slide must be set to. [3 marks]
9. Describe how chemical etching is used to make a PCB. [4 marks]
10. State one safety precaution when using a pillar drill and one when etching. [2 marks]

## Mark scheme

1. Thermoplastic filament fed into a heated nozzle where it melts (1); nozzle moves to deposit a thin layer in the shape of a slice of the CAD model (1); layer cools and hardens (1); platform lowers and the next layer is added on top until complete (1).
2. Any two: complex internal shapes can be made that cannot be machined (1); much less waste of expensive material (1); no tooling needed for small numbers (1); lighter part designs possible (1).
3. To check size / fit / appearance / function (1) before the expensive mould is made, so mistakes are cheap to fix (1).
4. Thin sheet can be cut by the force of two blades / no kerf or swarf, quick (1); thick bar needs too much force and would distort, so it must be sawn (1).
5. (a) Facing (1). (b) Boring (1).
6. Gives an accurate starting point / stops the twist drill wandering (1) because the centre drill is short and stiff (1).
7. Circumference = π × 6 = 18.85 mm (1); 90 000 ÷ 18.85 = 4775 (1); 4800 rev/min (1).
8. Change in radius = (24 − 16) ÷ 2 = 4 mm (1); tan θ = 4 ÷ 40 = 0.1 (1); θ = 5.7° (1).
9. Copper-clad board coated in resist (1); exposed to UV through a mask of the tracks and developed so resist remains only on the tracks (1); placed in etchant which dissolves unprotected copper (1); resist removed to leave copper tracks, then drilled (1).
10. Drill: clamp work in a vice / wear goggles / guard down / tie back hair (1). Etching: gloves / goggles / safe disposal of etchant / ventilation (1).
