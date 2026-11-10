---
level: A-level
subject: Physics
topic: "Thermodynamics and engines: the first law, p–V diagrams, engine cycles, the second law, heat pumps and refrigerators"
as_content: "AQA option (A-level only). Eduqas C1.8 A-level only."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.11.2.1", "3.11.2.2", "3.11.2.3", "3.11.2.4", "3.11.2.5", "3.11.2.6"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C1.8(f)", "C1.8(g)", "C1.8(h)", "C1.8(i)", "C1.8(j)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Thermodynamics and engines: the first law, p–V diagrams, engine cycles, the second law, heat pumps and refrigerators

Engines turn heat into work, and refrigerators use work to move heat. This file covers the first law of thermodynamics, isothermal, adiabatic, constant-pressure and constant-volume changes, p–V diagrams and the work done in a cycle, petrol and diesel engine cycles and indicator diagrams, engine power and efficiencies, the second law and the maximum efficiency of a heat engine, and the coefficients of performance of heat pumps and refrigerators.

## Overview

AQA option 3.11.2 (A-level only). Eduqas C1.8(f) to (j) (first law, W = pΔV, area under a p–V graph) is core content for Eduqas. Internal energy, the ideal gas equation and kinetic theory are in file 13.

### Board differences

- AQA 3.11.2 · Eduqas C1.8(f) to (j).
- Sign convention: AQA writes Q = ΔU + W, where W is work done *by* the system. Eduqas writes ΔU = Q − W with the same meaning of W. Some textbooks use W for work done *on* the gas (ΔU = Q + W); always check which is meant.
- Eduqas C1.8(j): for a solid or liquid, W is usually negligible, so Q ≈ ΔU.
- Engine cycles, the second law and reversed heat engines: AQA only.

## 3.11.2.1 First law of thermodynamics

*Refs: AQA 3.11.2.1 · Eduqas C1.8(f), (i), (j). Level: A-level only.*

### What you need to know

- Q = ΔU + W, where Q is energy transferred to the system by heating, ΔU the increase in internal energy and W the work done by the system.
- Applications of the first law.

### Explained

The first law is conservation of energy for thermal systems. Energy supplied to a gas by heating (Q) either increases its internal energy (ΔU) or is used by the gas to do work on its surroundings (W), or both:

**Q = ΔU + W**

Signs (AQA convention):

| Quantity | Positive | Negative |
| --- | --- | --- |
| Q | Heat flows into the gas | Heat flows out |
| ΔU | Internal energy (temperature, for an ideal gas) rises | Falls |
| W | Gas expands, doing work on the surroundings | Gas is compressed; work is done on it |

For an ideal gas, U depends only on temperature (U = (3/2)nRT for a monatomic gas), so ΔU = 0 whenever the temperature returns to its starting value.

For a solid or liquid (Eduqas C1.8(j)), volume changes are tiny, so W ≈ 0 and Q ≈ ΔU = mcΔθ.

### Worked example

1. A gas absorbs 500 J of heat and does 200 J of work. Find ΔU.

   ΔU = Q − W = 300 J.

2. A gas is compressed: 150 J of work is done on it and it loses 60 J of heat. Find ΔU.

   Q = −60 J, W = −150 J. ΔU = −60 − (−150) = +90 J (it warms up).

### Common mistakes

- Getting the sign of W wrong when the gas is compressed.

## 3.11.2.2 Non-flow processes

*Refs: AQA 3.11.2.2 · Eduqas C1.8(g), (i). Level: A-level only.*

### What you need to know

- Isothermal, adiabatic, constant-pressure and constant-volume changes.
- pV = nRT; adiabatic: pV^γ = constant; isothermal: pV = constant; at constant pressure W = pΔV.
- Apply the first law to each.

### Explained

A non-flow process happens to a fixed mass of gas in a closed container (e.g. a cylinder with a piston).

| Process | Condition | First law | Notes |
| --- | --- | --- | --- |
| Isothermal | Constant T | ΔU = 0, so Q = W | pV = constant. Must happen slowly, with good thermal contact, so heat can flow in or out to keep T fixed |
| Adiabatic | No heat transfer, Q = 0 | ΔU = −W | pV^γ = constant. Happens quickly or with insulation. Compression: work done on gas raises U and T. Expansion: gas does work, so U and T fall |
| Constant pressure (isobaric) | Constant p | Q = ΔU + pΔV | W = pΔV. V/T = constant |
| Constant volume (isochoric) | Constant V | W = 0, so Q = ΔU | All heat goes into internal energy. p/T = constant |

**γ** (gamma) is the ratio of the molar heat capacities at constant pressure and constant volume, a constant for each gas (5/3 = 1.67 for a monatomic gas such as helium; 1.4 for air). Because γ > 1, an adiabatic curve on a p–V graph is steeper than an isothermal curve through the same point.

Combined with pV = nRT, an adiabatic change also obeys TV^(γ−1) = constant.

### Worked example

1. Air (γ = 1.4) at 1.0 × 10⁵ Pa and 300 K is compressed adiabatically from 500 cm³ to 50 cm³. Find the final pressure and temperature.

   p₂ = p₁(V₁/V₂)^γ = 1.0 × 10⁵ × 10^1.4 = 2.5 × 10⁶ Pa. T₂ = T₁ × (p₂V₂)/(p₁V₁) = 300 × 25.1 × 0.1 = 750 K. (This is why diesel engines need no spark: compression heats the air enough to ignite the fuel.)

2. A gas expands at constant pressure 2.0 × 10⁵ Pa from 1.0 × 10⁻³ m³ to 3.0 × 10⁻³ m³ and gains 1000 J of heat. Find ΔU.

   W = pΔV = 400 J. ΔU = 1000 − 400 = 600 J.

### Common mistakes

- Saying temperature is constant in an adiabatic change.
- Saying no heat flows in an isothermal change.

## 3.11.2.3 The p–V diagram

*Refs: AQA 3.11.2.3 · Eduqas C1.8(g), (h). Level: A-level only.*

### What you need to know

- Representing processes on a p–V diagram.
- Work done = area under the graph (estimated).
- Cyclic processes: work done per cycle = area of the loop.
- Expressions for work done are needed only for constant pressure: W = pΔV.

### Explained

On a graph of p (vertical) against V (horizontal):

- Constant pressure: horizontal line.
- Constant volume: vertical line.
- Isothermal: a curve, pV = constant (a hyperbola); isotherms at higher T are further from the origin.
- Adiabatic: a steeper curve crossing isotherms.

**Work done** by the gas = area under the curve between the two volumes (positive for expansion, negative for compression). For curved lines, count squares or split into strips.

**Cycles.** In a cycle the gas returns to its starting state, so ΔU = 0 over the whole cycle and net Q = net W. The net work done by the gas per cycle = area enclosed by the loop. If the loop is traversed clockwise, the gas does net work on its surroundings (a heat engine). Anticlockwise: net work is done on the gas (a refrigerator or heat pump).

### Worked example

1. A gas goes round a rectangular cycle on a p–V diagram between 1.0 × 10⁵ and 3.0 × 10⁵ Pa and between 2.0 × 10⁻³ and 5.0 × 10⁻³ m³, clockwise. Find the net work done per cycle.

   Area = 2.0 × 10⁵ × 3.0 × 10⁻³ = 600 J done by the gas.

### Common mistakes

- Using the area under only one side of a loop.

## 3.11.2.4 Engine cycles

*Refs: AQA 3.11.2.4. Level: A-level only.*

### What you need to know

- The four-stroke petrol engine cycle and the diesel engine cycle, and their indicator diagrams.
- Comparison of real indicator diagrams with theoretical cycles; using indicator diagrams to predict and measure power and efficiency.
- Input power = calorific value × fuel flow rate.
- Indicated power = area of p–V loop × number of cycles per second × number of cylinders.
- Output (brake) power P = Tω; friction power = indicated power − brake power.
- Overall efficiency = brake power ÷ input power; thermal efficiency = indicated power ÷ input power; mechanical efficiency = brake power ÷ indicated power.

### Explained

**Four-stroke petrol engine (Otto cycle).**

1. *Induction*: piston moves down, inlet valve open; a fuel–air mixture is drawn in at about atmospheric pressure.
2. *Compression*: both valves shut; piston moves up, compressing the mixture (approximately adiabatic); pressure and temperature rise. Just before the top, a spark ignites it.
3. *Power (expansion)*: combustion raises pressure sharply at almost constant volume; the hot gas pushes the piston down (approximately adiabatic expansion), doing work.
4. *Exhaust*: piston moves up, exhaust valve open; burnt gases pushed out.

Two revolutions of the crankshaft per cycle. Theoretical (ideal Otto) diagram: adiabatic compression, constant-volume heating, adiabatic expansion, constant-volume cooling, forming a closed loop with sharp corners.

**Diesel engine.** Only air is drawn in. It is compressed much more (compression ratio about 20:1 compared with about 9:1 for petrol), so it gets hot enough to ignite fuel injected at the top of the stroke, with no spark. In the theoretical diesel cycle, fuel burns as the piston starts to move down, so heat is added at roughly constant pressure (a horizontal line at the top of the loop) rather than constant volume.

**Real indicator diagrams.** A real engine's p–V loop (measured with a pressure sensor and a sensor for piston position) has rounded corners, because valves take time to open and close, combustion is not instantaneous, heat is lost through the cylinder walls (so changes are not truly adiabatic), and the working substance changes (fuel–air mixture becomes exhaust). There is a small negative "pumping loop" at the bottom from induction and exhaust (work done to move gas in and out). The real loop's area is smaller than the theoretical one.

**Powers and efficiencies.**

- Input power = calorific value (J kg⁻¹ or J m⁻³) × fuel flow rate (kg s⁻¹ or m³ s⁻¹).
- Indicated power = (area of loop, J) × cycles per second × number of cylinders. For a four-stroke engine, cycles per second = revolutions per second ÷ 2. This is the power the gas delivers to the pistons.
- Brake (output) power = Tω at the crankshaft.
- Friction power = indicated − brake (lost to friction in the engine).
- Thermal efficiency = indicated/input (how well heat becomes work in the gas).
- Mechanical efficiency = brake/indicated (how well the mechanism passes on that work).
- Overall efficiency = brake/input = thermal × mechanical.

### Worked example

1. A four-cylinder four-stroke engine runs at 3000 rpm. Each indicator loop has area 450 J. The output torque is 120 N m. Fuel (calorific value 45 MJ kg⁻¹) is used at 3.5 × 10⁻³ kg s⁻¹. Find the indicated power, brake power, and the three efficiencies.

   Cycles per second per cylinder = 50/2 = 25. Indicated power = 450 × 25 × 4 = 45 kW. Brake power = 120 × (2π × 50) = 37.7 kW. Input = 45 × 10⁶ × 3.5 × 10⁻³ = 158 kW. Thermal = 45/158 = 0.29; mechanical = 37.7/45 = 0.84; overall = 37.7/158 = 0.24. Friction power = 7.3 kW.

### Common mistakes

- Forgetting that a four-stroke engine completes one cycle every two revolutions.
- Mixing up indicated and brake power.

## 3.11.2.5 Second law and engines

*Refs: AQA 3.11.2.5. Level: A-level only.*

### What you need to know

- An engine cannot work by the first law alone.
- The second law: a heat engine must operate between a hot source and a cold sink.
- Efficiency = W/Q_H = (Q_H − Q_C)/Q_H; maximum theoretical efficiency = (T_H − T_C)/T_H.
- Why practical engines are less efficient.
- Making the most of W and Q_H, e.g. combined heat and power schemes.

### Explained

The first law allows any process that conserves energy, but in practice it is impossible to take heat from a single source and turn it completely into work. The **second law of thermodynamics** says a heat engine must take heat Q_H from a hot source, convert part of it to work W, and reject the rest Q_C to a cold sink:

Q_H = W + Q_C

Efficiency = W/Q_H = (Q_H − Q_C)/Q_H.

**Maximum (Carnot) efficiency.** Even an ideal engine (no friction, reversible processes) has efficiency limited by the temperatures (in kelvin) of the source and sink:

**efficiency_max = (T_H − T_C)/T_H = 1 − T_C/T_H**

To raise efficiency, make the source hotter or the sink colder. A power station with steam at 800 K and a sink at 300 K has a maximum efficiency of 62.5%.

**Why real engines are less efficient**: friction between moving parts; heat lost through cylinder walls; incomplete combustion; time needed for valves and heat transfer means processes are not reversible; energy needed to pump gases in and out; the working gas does not reach the full flame temperature.

**Using rejected heat.** Combined heat and power (CHP) schemes use the "waste" heat from a power station or engine to heat nearby buildings or for industrial processes, so the overall fraction of fuel energy used rises to 70 to 80%.

### Worked example

1. An engine takes in 1500 J of heat per cycle and rejects 1050 J. Find its efficiency and work per cycle.

   W = 450 J. Efficiency = 0.30.

2. Find the maximum efficiency of an engine running between 1800 K and 600 K.

   (1800 − 600)/1800 = 0.67.

### Common mistakes

- Using °C in the Carnot formula.
- Saying better engineering could reach 100% efficiency.

## 3.11.2.6 Reversed heat engines

*Refs: AQA 3.11.2.6. Level: A-level only.*

### What you need to know

- The basic principles and uses of heat pumps and refrigerators (not the details of real devices).
- Coefficients of performance: COP_ref = Q_C/W = Q_C/(Q_H − Q_C) = T_C/(T_H − T_C); COP_hp = Q_H/W = Q_H/(Q_H − Q_C) = T_H/(T_H − T_C).

### Explained

A reversed heat engine uses work W to transfer heat Q_C from a cold space to a hot space, delivering Q_H = Q_C + W there. Heat cannot flow from cold to hot on its own (another form of the second law).

- **Refrigerator**: the purpose is to remove heat from the cold inside. COP_ref = Q_C/W.
- **Heat pump**: the purpose is to deliver heat to a warm building (taking heat from the cold outside air, ground or water). COP_hp = Q_H/W.

COP_hp = COP_ref + 1, and both can be much greater than 1: a heat pump with COP 3 delivers 3 J of heat for every 1 J of electrical work, which is why heat pumps are an efficient way to heat homes. The maximum (ideal) COPs are given by the temperatures; the smaller the temperature difference, the larger the COP. Real COPs are lower.

### Worked example

1. A heat pump keeps a house at 293 K when the outside is 278 K. Find the maximum COP. If its real COP is a third of this and it delivers 9.0 kW, find the electrical power.

   COP_max = 293/15 = 19.5. Real COP = 6.5. W = 9.0/6.5 = 1.4 kW.

2. A freezer at 255 K is in a kitchen at 295 K. Find the maximum COP and the minimum work to remove 50 kJ.

   COP = 255/40 = 6.4. W = 50/6.4 = 7.8 kJ.

### Common mistakes

- Saying a COP above 1 breaks conservation of energy (energy is moved, not created).
- Swapping T_C and T_H in the two COP formulas.

## Check questions

1. State the first law of thermodynamics, defining each term with its sign convention. (3 marks)
2. Explain why the temperature of a gas rises when it is compressed adiabatically. (3 marks)
3. Sketch an isothermal and an adiabatic expansion from the same starting point on a p–V diagram. Explain which is steeper. (3 marks)
4. Describe the four strokes of a petrol engine and sketch the theoretical indicator diagram. (6 marks)
5. An engine has indicated power 60 kW and brake power 48 kW, using fuel with calorific value 44 MJ kg⁻¹ at 4.5 × 10⁻³ kg s⁻¹. Find the friction power, mechanical efficiency and overall efficiency. (4 marks)
6. Explain why no heat engine can be 100% efficient. (2 marks)
7. A power station's turbine takes steam at 840 K and its condenser is at 310 K. Find the maximum efficiency and suggest how waste heat could be used. (3 marks)
8. A refrigerator removes 300 J per second from food at 268 K with 80 W of input power. Calculate its COP and the heat delivered to the kitchen per second. (3 marks)

## Mark scheme

1. Q = ΔU + W (1); Q: energy transferred to the system by heating (positive in) (1); ΔU: increase in internal energy; W: work done by the system (positive on expansion) (1).
2. Q = 0, so ΔU = −W (1); compression means work done on gas, W negative (1); so ΔU positive; internal energy (mean KE) and temperature rise (1).
3. Two downward curves from same point (1); adiabatic steeper (1); in adiabatic expansion the gas cools as well as expanding, so pressure falls faster (pV^γ with γ > 1) (1).
4. Induction: piston down, fuel–air drawn in (1); compression: adiabatic compression, spark (1); power: combustion, pressure rises, gas expands pushing piston (1); exhaust: gases pushed out (1); diagram: two adiabatics joined by two constant-volume lines (1), clockwise loop (1).
5. Friction power = 12 kW (1); mechanical efficiency = 48/60 = 0.80 (1); input = 198 kW (1); overall = 48/198 = 0.24 (1).
6. Second law: engine must reject some heat to a cold sink (1); so W < Q_H; maximum efficiency (T_H − T_C)/T_H < 1 (1).
7. (840 − 310)/840 = 0.63 (2); combined heat and power, e.g. district heating (1).
8. COP = 300/80 = 3.75 (1)(1); Q_H = 380 W (1).
