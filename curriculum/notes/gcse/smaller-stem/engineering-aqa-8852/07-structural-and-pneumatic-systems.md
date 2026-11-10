---
board: AQA
level: GCSE
subject: Engineering
code: "8852"
also_covers: []
topic: "3.3.4 to 3.3.5 Structural, pneumatic and hydraulic systems"
spec_refs: ["3.3.4", "3.3.5"]
refs_checked: false
spec_url: https://www.aqa.org.uk/subjects/engineering/gcse/engineering-8852/specification/subject-content/systems
pmt_url: null
---

# 3.3.4 to 3.3.5 Structural, pneumatic and hydraulic systems

Structures carry loads safely to the ground; fluid power systems use air or oil under pressure to produce force and motion. This file covers types of load, frame and monocoque structures, bending, torsion and buckling, and pneumatic and hydraulic circuits, with the pressure equation (E10).

## 3.3.4 Structural systems

### What you need to know

- Simple loads: imposed loads; dynamic (live) loads; static (dead) loads. How loads are applied to and transmitted through a structure.
- Structure types: space frames and monocoques.
- Bending, torsion and buckling.
- Factor of safety (E11) applied to structures.

### Explained

Types of load:

- Static (dead) load: a load that does not change, mainly the weight of the structure itself and anything permanently fixed to it, such as a bridge deck's own weight.
- Dynamic (live) load: a load that changes or moves, such as traffic crossing a bridge, people walking, wind gusts, vibration from machines. Sudden or repeated loads have a bigger effect than the same weight applied gently.
- Imposed load: the load put on a structure by its use, beyond its own weight: people, furniture, vehicles, snow on a roof. Designers use set values (for example a floor rated for so many kN per square metre).

How loads are transmitted: each member passes the force it receives to the members and joints it is connected to, and finally to the foundations and ground. A member being pulled is in tension (a tie); a member being squashed is in compression (a strut). Triangulation (using triangles) makes frames rigid because a triangle cannot change shape without one side changing length.

Space frames and monocoques:

- Space frame: a three-dimensional framework of slim struts and ties joined at nodes, arranged in triangles, carrying loads through the members. Strong and light, uses little material, and covers large spans. Examples: exhibition hall roofs, racing car chassis made of welded tubes, electricity pylons (a form of frame).
- Monocoque: the outer skin itself carries the loads, like an egg shell, with no separate internal frame. Most cars use a monocoque body shell of pressed steel panels; aircraft fuselages and racing car tubs (in carbon fibre) are also monocoques. They make efficient use of material and leave the inside space free, but are damaged if the skin is punctured or dented, and are hard to repair.

Ways a structure can fail or deform:

- Bending: a load across a beam makes it bend; the top surface is compressed and the bottom stretched (for a beam supported at both ends and loaded from above). Deep sections such as I-beams resist bending well because most material is far from the centre.
- Torsion: twisting caused by a turning force about the long axis, for example a drive shaft or a car body when one wheel goes over a bump. Closed tube sections resist torsion well; open sections (channel, angle) twist easily.
- Buckling: a long, slender strut in compression bows sideways and collapses suddenly at a load much lower than the material's compressive strength. Shorter, thicker or braced struts, and tube sections, resist buckling.

Factor of safety: structures are designed to carry much more than the load expected in use so that unexpected loads, material defects and wear do not cause failure. The factor of safety compares the material's strength (or failure load) with the stress (or load) it actually carries in use; a factor of 3 means the part could take three times its working load. Higher factors are used where failure would endanger life (lifts, bridges); aircraft use lower factors because extra weight is costly, with careful testing instead.

### Worked example

A steel tie has a breaking stress of 400 MPa. In use it carries 100 MPa. Factor of safety = 400 ÷ 100 = 4.

A lifting hook must have a factor of safety of 5 and will carry 2 kN. It must be designed not to fail below 5 × 2 = 10 kN.

### Common mistakes

- Mixing up dead load (permanent, own weight) and live load (changing).
- Saying buckling is the same as crushing. A buckling strut bends sideways long before the material crushes.
- Describing a monocoque as having a frame. The skin is the structure.

## 3.3.5 Pneumatic systems

### What you need to know

- The uses of, and differences between, pneumatic and hydraulic circuits.
- Example applications: robotics, factory automation, machinery.
- Pressure = force ÷ area (E10), used to calculate the force from a cylinder.

### Explained

Pneumatics uses compressed air; hydraulics uses a liquid (oil). Both use pressure acting on a piston in a cylinder to produce a linear force.

Components of a pneumatic circuit:

- Compressor and receiver (storage tank): supply air at a set pressure, often around 6 bar (600 kPa) in industry.
- Valves: direct the air. A 3/2 valve (three ports, two positions) can control a single-acting cylinder; a 5/2 valve controls a double-acting cylinder. Valves may be operated by push button, lever, roller trip, solenoid (electrical signal) or air pilot signal.
- Cylinders (actuators): single-acting cylinders are pushed out by air and return by spring; double-acting cylinders are pushed both out and back by air.
- Flow control (restrictor) valves slow the piston by restricting airflow; a shuttle valve gives OR control (either of two buttons); two valves in series give AND control (both buttons pressed, a common safety arrangement to keep both hands clear).

Hydraulic circuits use a pump, oil reservoir, valves and cylinders in the same way. Because oil is (almost) incompressible and runs at much higher pressures (often 100 to 300 bar), hydraulics produces very large forces.

| | Pneumatic | Hydraulic |
| --- | --- | --- |
| Fluid | Air (compressible) | Oil (incompressible) |
| Typical pressure | Low (about 6 to 10 bar) | High (100 bar and above) |
| Force | Small to medium | Very large |
| Speed | Fast | Slower |
| Positioning | Springy, less precise mid-stroke | Precise, firm, holds position under load |
| Leaks | Air escapes harmlessly; clean | Oil leaks are messy, slippery and can be a fire hazard |
| Cost and noise | Cheaper; exhaust is noisy | More expensive components |
| Examples | Factory pick-and-place, robot grippers, bus doors, packaging machines, air tools | Excavators, car brakes, presses, aircraft landing gear, car lifts |

Both are safe in explosive or wet environments where electric motors could spark.

### Worked example

A pneumatic cylinder has a piston diameter of 40 mm and air pressure of 0.6 N/mm² (600 kPa).

1. Piston area (E3) = π × r² = π × 20² = 1257 mm².
2. Force (E10 rearranged) = pressure × area = 0.6 × 1257 = 754 N.

A hydraulic press needs a force of 50 kN with oil at 10 N/mm². Area needed = force ÷ pressure = 50 000 ÷ 10 = 5000 mm². Radius = √(5000 ÷ π) = √1592 ≈ 39.9 mm, so a piston of about 80 mm diameter.

### Common mistakes

- Using the diameter instead of the radius in πr².
- Mixing units: N/mm² × mm² gives N; Pa (N/m²) needs area in m².
- Saying pneumatic systems are better for heavy lifting. Hydraulics give much larger forces.

## Check questions

1. Explain the difference between a static load and a dynamic load, with an example of each for a footbridge. [4 marks]
2. Explain why triangulation makes a frame rigid. [2 marks]
3. Give one advantage and one disadvantage of a monocoque car body. [2 marks]
4. A tall thin column in a building collapses sideways under a compressive load. Name this type of failure and give one way to prevent it. [2 marks]
5. Explain why a car drive shaft is made from tube rather than solid bar or channel section. [2 marks]
6. A cable has a breaking load of 24 kN and carries 6 kN in use. Calculate the factor of safety. [2 marks]
7. Give two differences between pneumatic and hydraulic systems. [2 marks]
8. Explain why hydraulics rather than pneumatics are used in an excavator arm. [2 marks]
9. A cylinder has a bore of 50 mm diameter and is supplied with air at 0.5 N/mm². Calculate the outward force. [3 marks]
10. Describe how a press could be made safe by using two push-button valves. [2 marks]

## Mark scheme

1. Static: does not change, e.g. the bridge's own weight (1)(1). Dynamic: changes or moves, e.g. people walking across / wind (1)(1).
2. A triangle cannot change shape unless one of its sides changes length (1), so loads are carried as tension / compression in the members (1).
3. Advantage: light / efficient use of material / more internal space (1). Disadvantage: hard to repair / weakened if dented or holed (1).
4. Buckling (1). Make it shorter / thicker / tube section / add bracing (1).
5. A drive shaft is under torsion (1); closed tube sections resist twisting well and are lighter than solid bar (1).
6. 24 ÷ 6 (1) = 4 (1).
7. Any two: air vs oil (1); air compressible vs oil incompressible (1); lower vs higher pressure / force (1); faster vs slower (1); clean vs messy leaks (1).
8. Very large forces needed (1); oil is incompressible so the arm holds its position firmly under load / precise control (1).
9. Area = π × 25² = 1963 mm² (1); force = 0.5 × 1963 (1) = 982 N (1).
10. Two valves in series so both must be pressed (AND) (1), keeping both hands away from the press (1).
