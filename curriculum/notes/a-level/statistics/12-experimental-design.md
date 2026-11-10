---
level: A-level
subject: Statistics
topic: "Experimental design"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["13.1", "13.2", "13.3"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Experimental design

This file covers experimental error, randomisation, replication, control and experimental groups, blind and double blind trials, the use of paired comparisons and blocking to reduce experimental error, and completely randomised and randomised block designs.

## Overview

GCSE Statistics introduces extraneous variables and control groups ([GCSE Statistics 04](../../gcse/statistics/04-collecting-and-cleaning-data.md)); nothing in A-level Mathematics or Further Mathematics covers design, so this file is new. Questions ask you to explain and discuss these ideas in a given context, often a medical trial, a crop experiment or a test of a product. The designs here feed straight into the analysis: a completely randomised design is analysed by a two-sample test or one-way ANOVA, a paired design by a paired test, and a randomised block design by two-way ANOVA (see [16-analysis-of-variance.md](16-analysis-of-variance.md)).

### Board differences

- Edexcel 9ST0 topic 13 is on both Paper 1 and Paper 2. Latin squares are not required.

## 13.1 Issues in experimental design

*Refs: Edexcel 13.1. Papers 1 and 2.*

### What you need to know

- **Experimental units:** the things treatments are applied to (patients, plots of land, machines).
- **Experimental error:** the natural variation in the response between units given the same treatment, from differences between units and from measurement. It is not a mistake; it is the noise against which treatment effects are judged.
- **Randomisation:** allocate treatments to units at random, so that unknown or uncontrolled factors are spread evenly between groups and cannot bias the comparison.
- **Replication:** apply each treatment to several units, so experimental error can be estimated and averages are more precise. Repeating the whole experiment also checks the result holds.
- **Control group:** units given no treatment, a placebo, or the standard treatment, to compare with the **experimental (treatment) group**. Without a control you cannot tell whether a change is caused by the treatment or would have happened anyway.
- **Blind trial:** the subjects do not know which treatment they receive. **Double blind trial:** neither the subjects nor the people giving the treatment or measuring the response know.

### Explained

**Why randomise?** If a doctor chooses which patients get a new drug, they may (even unconsciously) pick healthier patients, so the drug looks better than it is. Random allocation removes this selection bias and makes the groups alike on average in every respect, measured or not.

**Why replicate?** One plot with fertiliser A and one with B cannot separate the fertiliser effect from the difference between the two plots. With 6 plots of each, the variation within each group shows how big a difference chance alone produces.

**Placebo effect.** People given any treatment often feel better because they expect to. A placebo (a dummy treatment that looks the same) lets the control group share that expectation, so the comparison isolates the real effect.

**Why double blind?** If the person measuring knows who got the drug, their measurements or encouragement may shift. Double blinding removes both patient and researcher expectation.

Blinding is not always possible: a trial of surgery against physiotherapy cannot hide which one the patient received, though the person assessing the outcome can still be kept blind.

### Worked example

A company wants to test whether a new energy drink improves 400 m running times. Twenty club runners volunteer. Design the experiment.

1. Measure each runner's 400 m time in a standard warm-up first (a baseline).
2. Randomly allocate 10 runners to the drink and 10 to a placebo drink of the same colour and taste: number the runners 1 to 20 and use random numbers to pick 10.
3. Double blind: runners do not know which drink they have, and the timekeeper does not know either; a third person prepares the drinks with coded labels.
4. Control conditions: same track, same time of day, same warm-up.
5. Replication: 10 runners per group lets experimental error be estimated; the analysis could compare mean improvement in each group with a two-sample t-test.
6. Limitation: 20 volunteers from one club may not represent all runners.

### Common mistakes

- Saying randomisation "makes the sample representative": it makes the groups comparable.
- Confusing replication (several units per treatment) with repeating the measurement on one unit.
- Describing a blind trial as one where the researcher does not know.

## 13.2 Paired comparisons and blocking

*Refs: Edexcel 13.2. Papers 1 and 2.*

### What you need to know

- Experimental error is large when units differ a lot. Grouping similar units reduces it.
- **Paired comparison:** each unit (or each pair of closely matched units) receives both treatments, and the analysis uses the differences. Examples: before-and-after measurements, the left and right hands, twins, two halves of the same leaf.
- **Blocking:** group units into blocks of similar units (a field split into strips with similar soil, patients grouped by age band); each treatment appears in each block, so differences between blocks can be separated out.
- Pairing is blocking with blocks of size 2.

### Explained

Variation between units is often much larger than the treatment effect. If reaction times range from 250 to 350 ms between people, a 10 ms effect is lost in a comparison of two separate groups. Measuring each person with and without caffeine removes the between-person variation, because each person is compared with themselves.

In a paired design, the order of treatments should be randomised (half do A first, half do B first) so that learning or fatigue does not bias the result.

### Worked example

A tyre company tests two rubber compounds, A and B, for wear. Explain why fitting A to one car's front left wheel and B to its front right wheel (randomly chosen side), on each of 12 cars, is better than fitting A to 12 cars and B to 12 other cars.

1. Wear depends heavily on the car and the driver (distance, speed, roads), which is a large source of experimental error.
2. With both compounds on the same car, each car is a pair: car and driver effects cancel in the difference A − B.
3. The remaining variation (between the two sides of the same car) is much smaller, so a real difference between compounds is easier to detect with a paired t-test or Wilcoxon signed-rank test.
4. Randomising which side gets A guards against a systematic difference between left and right wheels (for example road camber).

### Common mistakes

- Pairing without randomising the order or side.
- Analysing paired data as two independent samples, which throws away the benefit.

## 13.3 Completely randomised and randomised block designs

*Refs: Edexcel 13.3. Papers 1 and 2.*

### What you need to know

- **Completely randomised design:** all units are allocated to the treatments entirely at random (usually with equal numbers per treatment). Best when units are similar. Analysed by one-way ANOVA (or a two-sample test for two treatments).
- **Randomised block design:** units are first grouped into blocks of similar units; within each block, every treatment is applied once, allocated at random. Analysed by two-way ANOVA without replication (treatments and blocks).

### Explained

A completely randomised design is simple and makes efficient use of units when they are alike. If units differ in a known way (soil fertility along a slope, age of patients, day of the week), a block design takes that variation out of the error, making treatment comparisons more precise. The cost is that each block must be large enough for every treatment.

### Worked example

Four fertilisers (A, B, C, D) are to be tested on 16 plots in a field that slopes, with soil getting wetter downhill. Describe (a) a completely randomised design, (b) a randomised block design, and say which is better.

1. (a) Number the plots 1 to 16. Use random numbers to choose 4 plots for A, then 4 of the rest for B, then 4 for C; the last 4 get D.
2. (b) Divide the field into 4 horizontal strips (blocks) across the slope, each with 4 plots of similar wetness. In each strip, randomly allocate A, B, C and D to the 4 plots, one each.
3. The block design is better: under (a), by chance A might land mostly on wet plots, mixing the fertiliser effect with wetness. Under (b), every fertiliser meets every wetness level, and the variation between strips can be removed in a two-way ANOVA.

### Common mistakes

- Making blocks run down the slope, so each block contains the full range of wetness.
- Allocating treatments within blocks in the same order every time instead of at random.

## Check questions

1. Explain what is meant by experimental error. [1 mark]
2. A school tests a new reading scheme. Teachers choose which classes use it. Explain why this could bias the results and how to avoid it. [3 marks]
3. Explain why a trial of a new painkiller should be double blind and use a placebo. [3 marks]
4. Explain the purpose of replication in an experiment. [2 marks]
5. A researcher compares two diets using 20 pairs of identical twins, one twin on each diet. Explain the advantage of this design and how the diets should be allocated. [3 marks]
6. Three teaching methods are to be compared using 18 students of very different ability. Describe a randomised block design and give one advantage over a completely randomised design. [4 marks]
7. Give one situation where a blind trial is not possible. [1 mark]

## Mark scheme

1. Natural variation in the response between units given the same treatment (due to differences between units and measurement) (1).
2. Teachers may choose keen or able classes, so improvement may be due to class ability, not the scheme (1); allocate classes at random (1); with a control group using the existing scheme (1).
3. Placebo: patients may feel less pain because they expect to, so the control must receive a dummy pill (1); blind: patients' knowledge could change how they report pain (1); double blind: staff assessing pain could be influenced (1).
4. To estimate experimental error (1) and to make treatment means more precise / results more reliable (1).
5. Twins are closely matched (genes, upbringing), so differences between people are largely removed and the comparison is more precise (1, 1); allocate which twin gets each diet at random (1).
6. Group students into 6 blocks of 3 of similar ability (1); within each block, allocate the 3 methods at random, one per student (1); analyse with two-way ANOVA (1); advantage: variation due to ability is removed from the error, so method differences are easier to detect (1).
7. e.g. comparing surgery with exercise therapy; comparing walking with cycling to work (1).
