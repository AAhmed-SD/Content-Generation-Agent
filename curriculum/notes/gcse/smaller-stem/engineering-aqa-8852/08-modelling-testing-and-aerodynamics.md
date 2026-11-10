---
board: AQA
level: GCSE
subject: Engineering
code: "8852"
also_covers: []
topic: "3.4 Testing and investigation: modelling and calculating, testing, aerodynamics"
spec_refs: ["3.4.1", "3.4.2", "3.4.3"]
refs_checked: false
spec_url: https://www.aqa.org.uk/subjects/engineering/gcse/engineering-8852/specification/subject-content/testing-and-investigation
pmt_url: null
---

# 3.4 Testing and investigation

Before a product is made, engineers predict how it will behave using calculations and models; after it is made, they test it. This file covers the calculations the spec lists (area, volume, density, stress, strain, Young's modulus, factor of safety, stiffness, resistance, current and voltage, fluid forces), simulation and CAD modelling, testing materials and structures, destructive and non-destructive testing, testing control programs, quality control, and the forces of lift, drag and thrust.

## 3.4.1 Modelling and calculating

### What you need to know

- Predict the performance of a system using calculations, simulation or modelling, by hand or with CAD. Exam systems have no more than four major parts.
- Calculate area, volume, stiffness, density, Young's modulus, factor of safety, forces, stress and strain from load and extension, series and parallel resistance, current and voltage.
- Design and test electronic circuits; calculate forces in hydraulic and pneumatic systems.
- Use equations E1 to E15, with units and multipliers (p, n, µ, m, k, M, G, T) and unit conversions.

### Explained

Types of model:

- Iconic models look like the real thing: sketches, card mock-ups, 3D prints, CAD renders.
- Analogue models behave like the real thing in a different form: a circuit simulator, a flow chart of a control program, a scale wind tunnel model.
- Symbolic models use equations and numbers: a spreadsheet of stresses, a calculation of gear speeds.

CAD and simulation software let engineers test a design virtually: finite element analysis colours a 3D model to show where stress is highest; circuit simulators show voltages and currents; motion simulation checks linkages and gears. Benefits: fewer physical prototypes, cheaper and faster changes, testing of dangerous or expensive situations safely. Limits: a model is only as good as the data and assumptions in it, so final designs are still physically tested.

The equations:

| Ref | Equation | Units |
| --- | --- | --- |
| E1 | Area of rectangle = length × width | m², mm² |
| E2 | Volume of cuboid = length × width × height | m³, mm³ |
| E3 | Area of circle = π × r² | m², mm² |
| E4 | Volume of cylinder = area of end × length | m³ |
| E5 | Area of triangle = ½ × base × height | m² |
| E6 | Density = mass ÷ volume | kg/m³ or g/cm³ |
| E7 | Stress = force ÷ cross-sectional area | N/m² (Pa) or N/mm² (MPa) |
| E8 | Strain = change in length ÷ original length | no units |
| E9 | Young's modulus = stress ÷ strain | Pa (often GPa) |
| E10 | Pressure = force ÷ area | Pa or N/mm² |
| E11 | Factor of safety: material strength compared with the working stress | no units |
| E12 | Current = voltage ÷ resistance | A, V, Ω |
| E13 | Series resistance: R total = R1 + R2 | Ω |
| E14 | Gear ratio = driven teeth ÷ driver teeth | no units |
| E15 | Mechanical advantage = load ÷ effort | no units |

Stiffness of a part (spring or bar) is load ÷ extension (N/mm). Young's modulus is the stiffness of the material itself, independent of the part's size: a high Young's modulus means a stiff material (steel about 200 GPa, aluminium about 70 GPa, nylon about 2 to 4 GPa).

Parallel resistance is also listed: for two resistors in parallel, 1/R total = 1/R1 + 1/R2, or for two resistors R total = (R1 × R2) ÷ (R1 + R2). The total is always less than the smallest resistor.

Useful conversions: 1 m = 1000 mm; 1 m² = 1 000 000 mm²; 1 m³ = 10⁹ mm³ = 1000 litres; 1 litre = 1000 ml = 1000 cm³; 1 tonne = 1000 kg; weight (N) = mass (kg) × 9.81 N/kg; 1 N/mm² = 1 MPa.

### Worked example

1. Density. An aluminium block measures 50 mm × 40 mm × 20 mm and has a mass of 108 g. Volume (E2) = 5 × 4 × 2 = 40 cm³. Density (E6) = 108 ÷ 40 = 2.7 g/cm³ (2700 kg/m³).
2. Cylinder volume. A steel rod is 20 mm in diameter and 300 mm long. Area (E3) = π × 10² = 314 mm². Volume (E4) = 314 × 300 = 94 200 mm³ = 94.2 cm³.
3. Triangle. A gusset plate is a right-angled triangle with sides 120 mm and 80 mm. Area (E5) = ½ × 120 × 80 = 4800 mm².
4. Stress, strain and Young's modulus. A steel wire 2.0 m long with cross-sectional area 0.50 mm² stretches by 1.6 mm under a load of 80 N.
   - Stress (E7) = 80 ÷ 0.50 = 160 N/mm² = 160 MPa.
   - Strain (E8) = 1.6 ÷ 2000 = 0.0008 (convert 2.0 m to 2000 mm first).
   - Young's modulus (E9) = 160 ÷ 0.0008 = 200 000 N/mm² = 200 GPa.
   - Stiffness of this wire = 80 ÷ 1.6 = 50 N/mm.
5. Factor of safety. If the wire's material fails at 480 MPa, the factor of safety = 480 ÷ 160 = 3.
6. Parallel resistance. 6 Ω and 3 Ω in parallel: (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω. On 12 V: current = 12 ÷ 2 = 6 A.
7. Hydraulic force. A car lift's piston has area 0.02 m² and oil pressure 2.5 MPa. Force = 2.5 × 10⁶ × 0.02 = 50 000 N = 50 kN.

### Common mistakes

- Forgetting to convert units so they match (mm with m, g with kg).
- Giving strain units. It is a ratio of two lengths.
- Squaring the diameter instead of the radius.
- Adding resistances in parallel. The total must be less than either one.

## 3.4.2 Testing

### What you need to know

- Testing materials and structures under load, including tensile and compressive strength; plotting and interpreting load-extension and stress-strain graphs.
- Destructive and non-destructive testing (NDT): what each is, the differences, and their advantages.
- Testing and modifying control programs by modelling and enactment, for example changing motor speed or a sensor threshold in a microcontroller program.
- Quality control: tolerances and checks during production.

### Explained

Tensile test: a standard specimen is clamped in a tensile testing machine and pulled with a steadily increasing force while its extension is measured until it breaks. A load-extension graph (or stress-strain graph) shows:

- A straight section from the origin: elastic region, extension proportional to load; the gradient of the stress-strain line is Young's modulus. Removing the load returns the specimen to its original length.
- The limit of proportionality and elastic limit: beyond here the material deforms plastically (permanently).
- Yield point: a sudden increase in extension with little extra load in some metals such as low carbon steel.
- Maximum load (ultimate tensile strength), then necking and fracture.

A ductile material shows a long plastic region before breaking; a brittle material breaks soon after the elastic region with little plastic stretching.

Compressive tests squash a specimen (such as a concrete cube) until it fails. Other tests: hardness tests press an indenter into the surface and measure the dent (smaller dent = harder); impact tests swing a pendulum to break a notched specimen and measure the energy absorbed (toughness); bending tests load a beam and measure deflection.

Structures are tested by loading prototypes or scale models with weights or a test rig and measuring deflection until a target load or failure.

| | Destructive testing | Non-destructive testing (NDT) |
| --- | --- | --- |
| What happens | The sample is loaded until it breaks or is damaged | The part is examined without damaging it |
| Examples | Tensile, compression, impact, hardness (leaves a mark), crash tests | Visual inspection, dye penetrant, ultrasound, X-ray, magnetic particle testing |
| Advantages | Gives actual strengths and failure modes; reliable data for design | The tested part can still be used; every part (not just samples) can be checked; detects internal cracks |
| Disadvantages | Tested part is wasted; only samples can be tested, so results are assumed for the batch | Does not tell you the strength directly; equipment can be expensive and needs skilled operators |

NDT methods: dye penetrant (a coloured dye soaks into surface cracks, then a developer draws it out to show them); ultrasonic (sound pulses reflect from internal flaws); X-ray (internal voids show on the image, used on welds and castings); magnetic particle (iron powder gathers at cracks in a magnetised ferrous part).

Testing control programs: a microcontroller program is first tested by modelling (running it in a simulator, or tracing through the flow chart with sample input values) and by enactment (acting out the sequence step by step, or using switches and LEDs to stand in for real sensors and motors). Problems found are fixed by modifying the program, for example lowering the light threshold so a lamp comes on earlier, or changing the PWM (pulse-width) value to slow a motor.

Quality control (QC) is checking parts during and after production to make sure they meet the specification. Parts are measured against tolerances with Vernier calipers, micrometers, gauges (go/no-go gauges: the "go" end must fit, the "no-go" end must not) and coordinate measuring machines. Samples are tested at set intervals, results recorded, and means and ranges calculated to spot when a machine is drifting out of tolerance. Quality assurance is the wider system of procedures that makes sure QC happens.

### Worked example

Five shafts are measured from a batch specified at 15.00 ± 0.05 mm: 15.02, 14.98, 15.04, 15.06, 15.01 mm.

- Acceptable range: 14.95 to 15.05 mm. The 15.06 mm shaft is rejected.
- Mean of all five = 75.11 ÷ 5 = 15.022 mm. The mean is above nominal, so the machine may need adjusting.

### Common mistakes

- Calling an X-ray inspection a destructive test.
- Saying every part can be destructively tested. Only samples can.
- Reading the Young's modulus from the plastic region of a graph. Use the straight elastic part.

## 3.4.3 Aerodynamics

### What you need to know

- The forces of lift, drag and thrust.
- An example application, such as a compressed-gas powered dragster.

### Explained

- Thrust is the force that pushes a vehicle forwards: from a propeller, jet engine, or gas escaping backwards from a cylinder.
- Drag (air resistance) opposes motion through air. It increases with speed (roughly with the square of speed), frontal area and a less streamlined shape. Smooth, tapered, streamlined shapes reduce drag.
- Lift is a force at right angles to the airflow, produced when air flows faster over one surface of a wing or aerofoil than the other, giving lower pressure on that side. Aircraft need upward lift; racing cars use inverted wings to create downforce for grip.
- Weight acts downwards.

A vehicle speeds up while thrust is greater than drag (and friction), and reaches a top speed when they balance.

Example: a compressed-gas (CO₂ cartridge) dragster. When the cartridge is pierced, gas rushes out of the back, giving a short burst of thrust. To go fast, the design needs low mass (so the thrust gives more acceleration), a small frontal area and smooth, streamlined body (low drag), and no lift (lift reduces wheel contact and can make the car fly off the track). Wind tunnel or smoke tests, or CFD software, show the airflow.

### Common mistakes

- Saying drag stays the same at all speeds. It increases sharply with speed.
- Confusing lift with thrust. Lift acts at right angles to the motion.

## Check questions

1. A copper bar is 100 mm × 20 mm × 10 mm and has a mass of 178 g. Calculate its density in g/cm³. [3 marks]
2. Calculate the volume of a tube of outside diameter 40 mm, inside diameter 30 mm and length 200 mm. [3 marks]
3. A rod of cross-sectional area 50 mm² carries a tensile load of 6 kN. Calculate the stress in N/mm². [2 marks]
4. A 500 mm long specimen stretches by 0.25 mm. Calculate the strain. [1 mark]
5. Using your answers to 3 and 4, calculate Young's modulus in GPa. [2 marks]
6. A 10 Ω and a 15 Ω resistor are connected in parallel. Calculate the total resistance. [2 marks]
7. Give two differences between destructive and non-destructive testing. [2 marks]
8. Describe how dye penetrant testing finds a crack in a weld. [3 marks]
9. A light-activated lamp program switches on too late in the evening. Explain how it could be tested and modified. [3 marks]
10. Explain the purpose of a go/no-go gauge. [2 marks]
11. Explain two ways to improve the speed of a CO₂ dragster using aerodynamics. [4 marks]
12. Give one advantage of testing a design with CAD simulation before making a prototype. [1 mark]

## Mark scheme

1. Volume = 10 × 2 × 1 = 20 cm³ (1); density = 178 ÷ 20 (1) = 8.9 g/cm³ (1).
2. Annulus area = π(20² − 15²) = π × 175 = 550 mm² (1)(1); volume = 550 × 200 = 110 000 mm³ (1). Accept 1.1 × 10⁵ mm³.
3. 6000 ÷ 50 (1) = 120 N/mm² (1).
4. 0.25 ÷ 500 = 0.0005 (1).
5. 120 ÷ 0.0005 = 240 000 N/mm² (1) = 240 GPa (1).
6. (10 × 15) ÷ 25 (1) = 6 Ω (1).
7. Any two: destructive damages / breaks the sample, NDT does not (1); NDT part can be used afterwards (1); destructive only on samples, NDT on every part (1); destructive gives actual strength values (1).
8. Clean surface; apply coloured dye which soaks into cracks (1); wipe off excess dye (1); apply developer which draws the dye out, showing the crack as a line (1).
9. Test by simulation or by covering the sensor / enactment to see the reading at which it switches (1); compare with the reading at the desired light level (1); change the threshold value in the program so it switches at a higher light level (1).
10. Quickly checks that a part is within tolerance (1): the go end must fit and the no-go end must not (1).
11. Any two, each with explanation: streamlined / tapered body (1) reduces drag (1); small frontal area (1) reduces drag (1); low mass (1) so the same thrust gives bigger acceleration (1); avoid lift / smooth surface (1) keeps wheels on track / reduces drag (1).
12. Cheaper / faster to change / no material wasted / can test conditions that are dangerous (1).
