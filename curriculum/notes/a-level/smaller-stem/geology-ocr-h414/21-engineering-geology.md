---
level: A-level
subject: Geology
topic: "Rock strength, site investigation, tunnels, dams, waste disposal, radon and contaminated land"
as_content: "A level only for both boards (OCR Module 6; Eduqas T1.3)."
boards:
  - board: OCR
    code: "H414"
    spec_refs: ["6.2.1(a)", "6.2.1(b)", "6.2.1(c)", "6.2.1(d)", "6.2.2(a)", "6.2.2(b)", "6.2.2(c)"]
  - board: Eduqas
    code: "A480QS"
    spec_refs: ["T1.3a", "T1.3b", "T1.3c"]
refs_checked: false
spec_url: https://www.ocr.org.uk/qualifications/as-and-a-level/geology-h014-h414-from-2017/
spec_url_eduqas: https://www.eduqas.co.uk/qualifications/geology-asa-level/
pmt_url: null
---

# Engineering geology

Every large structure depends on the ground beneath it. Engineering geology assesses rock and soil strength, groundwater and structures before and during construction, so projects are safe and economical. Quarrying and mine-related problems are in [18](18-mining-geology.md); slopes in [20](20-geohazards-in-the-british-isles.md); using maps for site assessment in [Eduqas 02](../geology-eduqas-a480qs/02-geological-maps.md).

## Rock strength (OCR 6.2.1(a))

### What you need to know

- Interlocking and cementation of minerals control strength; typical strengths of igneous, metamorphic and sedimentary rocks.
- Measuring strength under compression and shear; qualitative peak and residual strength (Young modulus not required).
- Rock density; lithostatic pressure p = ρgh; density of water.

### Explained

- Igneous and many metamorphic rocks have **interlocking crystals**, so they are strong (granite, basalt, quartzite: very high compressive strength).
- Sedimentary rocks are grains held by **cement**; strength depends on cement type and amount: silica-cemented sandstones are strong, poorly cemented ones and mudstones are weak. Porous rocks are weaker.
- **Uniaxial compressive strength**: a rock core is squeezed until it breaks. Shear strength: a sample is pushed along a plane under a normal load.
- **Peak strength**: the maximum stress before failure. **Residual strength**: the lower strength after failure, once the surface has slipped (important for old landslides, which move more easily).
- Simple field tests: point load test on cores; Schmidt hammer rebound.

**Lithostatic pressure** = ρgh, the weight of overlying rock per unit area. This matters for tunnels and deep mines.

### Worked example

Rock with density 2600 kg m⁻³ at 400 m depth: p = 2600 × 9.81 × 400 = 1.02 × 10⁷ Pa = 10.2 MPa. Water pressure at the same depth (if connected to the surface) = 1000 × 9.81 × 400 = 3.9 MPa.

### Practical

**OCR PAG9**: measure rock strength with a point load tester or by loading model samples (for example plaster blocks with different "cement" content); measure densities.

## Weakening by weathering, fractures and pore water (OCR 6.2.1(b), (c); Eduqas T1.3b)

### What you need to know

- Strength is reduced by weathering, fracture density and structures: bedding, joint sets, foliation, faults.
- Hydrostatic (pore-water) pressure reduces strength; resolve forces.
- Eduqas: ground instability from weathering, dip of strata, folding, faulting, cleavage, joint patterns and fracture density; interference with the hydrological system: pore pressure, drainage, porosity, permeability, water table, aquifers; simple rock slope stability with friction angle and orientation of discontinuities.

### Explained

The strength of a rock mass is much lower than that of an intact sample, because it fails along **discontinuities**: bedding planes, joints, foliation, cleavage and faults. More fractures (high fracture density) means weaker rock and more water flow. Orientation matters: discontinuities dipping out of a cutting face (towards the excavation) at an angle steeper than their friction angle can slide; those dipping into the face are stable. Weathering opens joints, turns feldspar to clay and reduces strength near the surface.

**Pore-water pressure** acts outwards on grain contacts, pushing them apart. Effective normal stress = total normal stress − pore pressure. Friction resistance depends on effective stress, so raising pore pressure (heavy rain, a reservoir filling, blocked drains) reduces resistance and can trigger failure.

**Resolving forces on a block on an inclined plane** (dip θ, weight W): component down the slope = W sin θ; component normal to the plane = W cos θ. Friction resistance = (W cos θ − U) tan φ, where U is the water uplift force and φ the friction angle. Factor of safety = (W cos θ − U) tan φ ÷ W sin θ.

### Worked example

A 500 kN block rests on a joint dipping 30° with friction angle 35°. Dry: FS = (500 cos 30 × tan 35) ÷ (500 sin 30) = (433 × 0.700) ÷ 250 = 303 ÷ 250 = 1.21 (stable). With a water uplift of 120 kN: FS = ((433 − 120) × 0.700) ÷ 250 = 219 ÷ 250 = 0.88 (fails).

## Site investigation (OCR 6.2.1(d); Eduqas T1.3b)

### What you need to know

Integrating existing data and ground investigations: existing BGS maps and records; geological site mapping; drilling for cores; laboratory testing; slope mapping for slope stability risk analysis. Eduqas: analysing the suitability of sites using geological and geotechnical data.

### Explained

1. **Desk study**: British Geological Survey maps and memoirs, borehole records, old mine plans, aerial photographs and satellite images, historical maps (for old quarries, landfill, industrial use).
2. **Walkover and geological mapping**: rock types, structures, springs, signs of instability.
3. **Ground investigation**: boreholes and trial pits; cores logged for rock type, weathering and discontinuities; groundwater levels in piezometers; geophysics to fill gaps (resistivity for cavities, seismic for depth to bedrock).
4. **Laboratory tests**: strength, density, clay swell potential, chemistry (sulfate, contamination).
5. **Interpretation**: a ground model with cross-sections, hazards and design parameters; slope stability analysis from mapped discontinuities.

### Practical

**OCR PAG12**: use secondary data (maps, borehole logs) to produce a site assessment report.

## Tunnelling (OCR 6.2.2(a); Eduqas T1.3c)

### What you need to know

- Engineering geology applied to tunnels through hard rock and unconsolidated material.
- Monitoring and mitigating the impacts of tunnelling, including management and use of spoil.

### Explained

- **Hard rock**: drill and blast, or tunnel boring machines (TBMs). Stability depends on discontinuities: blocks can fall from the roof. Support with rock bolts, mesh and sprayed concrete (shotcrete), steel arches. Faults and crushed zones are weak and often carry water. Deep tunnels face high lithostatic stress (rock bursts in strong rock, squeezing in weak rock) and high temperatures.
- **Unconsolidated material** (clay, sand, gravel): soft ground needs immediate lining (segmental concrete rings) and pressurised-face TBMs to stop collapse and water entry. London Clay is ideal: soft enough to dig, strong enough to stand briefly, nearly impermeable.
- **Water inflow**: from aquifers and fault zones; managed by grouting, freezing the ground, dewatering, or pressurised machines.
- **Surface impacts**: ground settlement above tunnels can damage buildings: monitored with surveying and controlled by compensation grouting. Dewatering can lower water tables and affect wells and wetlands. Vibration and noise.
- **Spoil**: large volumes of excavated material; reused for embankments, land raising and habitat creation (for example new wetlands and coastal nature reserves built from tunnel spoil) where it is not contaminated.

## Dams and reservoirs (OCR 6.2.2(b); Eduqas T1.3c)

### What you need to know

- Dam types: earth (embankment), gravity, arch; grouting; clay or geomembrane lining; cut-off curtain.
- Hydrogeological impacts: hydrostatic uplift, erosion of earth dams.
- Slope stability around reservoirs.
- Reservoir-induced seismicity.
- Impacts of historical and new dams.

### Explained

| Type | Description | Geological needs |
| --- | --- | --- |
| Earth (embankment) dam | Built of compacted soil and rock fill with an impermeable clay core | Can be built on weaker foundations; materials available locally |
| Gravity dam | Massive concrete; its weight resists the water | Strong, unfractured bedrock foundation |
| Arch dam | Thin curved concrete wall transferring water pressure into the valley sides | Narrow valley with very strong, stable rock abutments |

**Leakage**: permeable rocks, joints, faults, solution cavities (limestone) or old mines under or around the reservoir can let water escape. Solutions: **grout curtain** (cement or chemical grout injected into boreholes to seal fractures); **cut-off trench** of clay or concrete under an earth dam down to impermeable rock; lining the reservoir with clay or a geomembrane.

**Hydrostatic uplift**: water seeping under a dam pushes up on its base, reducing its effective weight; drainage galleries and grout curtains reduce it. **Piping**: water flowing through an earth dam can wash out fine particles, forming channels that grow until the dam fails; prevented with filters and drains.

**Slopes**: filling a reservoir saturates valley sides and raises pore pressure; drawdown can leave slopes saturated without support. The 1963 Vajont disaster in Italy: a huge landslide on a slope with clay layers dipping into the reservoir fell into it, sending a wave over the dam that killed about 2000 people. Slopes must be mapped and monitored.

**Reservoir-induced seismicity**: the weight of water and increased pore pressure along existing faults can trigger earthquakes, especially in the first years of filling and in deep reservoirs on stressed faults. Evidence: increases in earthquakes linked in time and location to filling and water-level changes.

Other impacts: sediment trapped in reservoirs (reduced supply downstream, coastal erosion), loss of land and habitat.

## Waste disposal and radon (Eduqas T1.3a, T1.3b)

### Explained

**Landfill**: needs low-permeability ground (clay) or engineered liners (compacted clay and plastic geomembrane), a leachate collection system, gas (methane) extraction, capping and monitoring wells around the site. Poorly sited landfill on permeable or fractured rock above an aquifer can pollute groundwater; methane can migrate through permeable strata into buildings. Former quarries in impermeable clay are better sites than those in limestone or sandstone.

**Toxic and radioactive waste**: needs multiple barriers (waste form, container, engineered backfill, host rock) and a geological setting with very slow groundwater movement ([18](18-mining-geology.md)).

**Radon**: a radioactive gas from the decay of uranium in rocks such as granite, some shales and limestones. It moves through fractures and permeable soils into buildings and accumulates in poorly ventilated rooms; long exposure raises lung cancer risk. High-risk areas in Britain include Cornwall and Devon (granites) and parts of Northamptonshire (ironstones). Protection: radon-proof membranes and sumps under floors, ventilation; maps of risk based on geology.

## Contaminated land (OCR 6.2.2(c); Eduqas T1.3a)

### What you need to know

- Managing and remediating contaminated land and groundwater (brownfield sites).
- Heavy metal contamination: adsorption on clay minerals, solubility, bioavailability, pH. Organic contamination: hydrocarbons and solvents in soils and groundwater.
- Remediation: phytoremediation; stabilisation and solidification.
- Eduqas: issues at one industrial brownfield site: toxic chemicals, ground instability, subsidence, groundwater pollution.

### Explained

Brownfield land (old gasworks, factories, mines) may contain metals, hydrocarbons, solvents, asbestos, unstable fill and old foundations.

- **Heavy metals** (lead, cadmium, zinc, arsenic): many adsorb onto clay minerals and organic matter, which limits movement. Their solubility increases at low pH, so acidic conditions mobilise them, making them more bioavailable (able to be taken up by organisms). Liming raises pH and immobilises them.
- **Organic contaminants**: light oils (LNAPLs) float on the water table; dense solvents (DNAPLs, chlorinated solvents) sink through aquifers and are very hard to remove.

**Remediation**:

- Excavate and remove to licensed landfill ("dig and dump"): quick but moves the problem.
- **Stabilisation/solidification (S/S)**: mixing cement, lime or other binders into soil to lock contaminants in place and reduce leaching.
- **Phytoremediation**: plants take up metals or help microbes break down organics; slow, cheap, only shallow.
- Bioremediation of hydrocarbons; capping with clean soil; pump-and-treat for groundwater; permeable reactive barriers.

### Common mistakes

- Judging a rock mass by the strength of an intact sample.
- Saying grout curtains strengthen dams. They reduce seepage and uplift.

## Check questions

1. Explain why granite is generally stronger than sandstone. (2)
2. Calculate the lithostatic pressure at 800 m depth in rock of density 2500 kg m⁻³. (2)
3. Explain why raising pore-water pressure can cause a rock slope to fail. (3)
4. A 300 kN block lies on a joint dipping 28° with friction angle 32°. Calculate the factor of safety when dry. (3)
5. Describe the stages of a site investigation for a new road cutting. (5)
6. Compare the geological requirements for a gravity dam and an arch dam. (3)
7. Explain how a grout curtain reduces problems at a dam. (3)
8. Explain how reservoir filling can trigger earthquakes. (3)
9. Explain why heavy metals in brownfield soils are more hazardous if the soil becomes acidic. (3)

## Mark scheme

1. Granite has interlocking crystals (1); sandstone grains held by cement, may be porous / weakly cemented (1).
2. 2500 × 9.81 × 800 (1) = 1.96 × 10⁷ Pa ≈ 19.6 MPa (1).
3. Pore pressure pushes grains / blocks apart (1); reduces effective normal stress (1); reduces friction resistance below the driving force (1).
4. Driving = 300 sin 28 = 140.8 kN (1); resisting = 300 cos 28 × tan 32 = 264.9 × 0.625 = 165.5 kN (1); FS = 1.18 (1).
5. Desk study of BGS maps, records, mine plans (1); geological mapping / walkover (1); boreholes, trial pits, cores (1); lab testing of strength / chemistry (1); analysis of discontinuities and stability / ground model (1).
6. Gravity: strong unfractured foundation to bear heavy weight (1); arch: narrow valley (1) with very strong abutments in valley sides (1).
7. Grout injected into fractures beneath dam (1); seals pathways for seepage / leakage (1); reduces uplift pressure under the dam / piping (1).
8. Weight of water increases stress on faults (1); water penetrates fractures raising pore pressure (1); reduces friction on already-stressed faults so they slip (1).
9. Metals more soluble at low pH (1); released from clay / organic adsorption sites (1); more mobile in groundwater and bioavailable to plants and animals (1).
