---
level: A-level
subject: Mathematics
topic: "Data presentation and interpretation, and the large data set"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["L1", "L2", "L3", "L4"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["S2.1", "S2.2", "S2.3", "S2.4"]
  - board: OCR
    code: "H240"
    spec_refs: ["2.02a", "2.02b", "2.02c", "2.02d", "2.02e", "2.02f", "2.02g", "2.02h", "2.02i", "2.02j"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["MD1", "MD2", "MD3", "MD4", "MD5", "MD6", "MD7", "MD8", "MD9", "MD10", "MD11", "MD12", "MD13", "MD14"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Data presentation and interpretation, and the large data set

This file covers diagrams for single-variable data (especially histograms), scatter diagrams, regression lines and correlation, measures of location and spread including standard deviation, outliers, choosing a presentation, cleaning data, and each board's large data set.

## Overview

All AS content. Calculator skills are expected throughout: you should be able to get the mean and standard deviation from raw data or a frequency table using the statistics mode. Correlation coefficients and hypothesis tests on them are in file 23 (A-level only).

### Board differences

- AQA L1 to L4; Edexcel Statistics 2.1 to 2.4; OCR H240 2.02a to 2.02j; OCR MEI H640 MD1 to MD14.
- **Standard deviation divisor.** OCR H240 uses divisor n. Edexcel expects divisor n but accepts n − 1. OCR MEI defines the sample variance s² and sample standard deviation s with divisor n − 1. AQA's subject content does not fix the divisor (check its formula booklet and mark schemes).
- **Outlier rules.** OCR and MEI expect you to know two rules: more than 1.5 × IQR beyond the nearer quartile, and more than 2 standard deviations from the mean. Edexcel says any rule needed will be given in the question.
- **Edexcel extras.** Coding; linear interpolation for medians and percentiles from grouped data; using logarithms to change variables so that y = axⁿ or y = kbˣ gives a straight line (as in file 11); the terms explanatory (independent) and response (dependent) variable.
- **MEI extras.** Types of data (categorical, discrete, continuous, ranked); cumulative frequency diagrams (MD3); describing distributions, including skew (MD4); and diagrams that mislead (MD5).

## L1 Diagrams for single-variable data

*Refs: AQA L1 · Edexcel Statistics 2.1 · OCR 2.02a, 2.02b · MEI MD1, MD2, MD3, MD4, MD5. Level: AS & A.*

### What you need to know

- Interpret histograms, box plots, cumulative frequency diagrams, frequency polygons, stem-and-leaf diagrams, bar charts and pie charts.
- In a histogram, the area of each bar represents frequency. The height is the frequency density.

```latex
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
```

- Describe the shape of a distribution: symmetrical, positively skewed (long tail to the right), negatively skewed (long tail to the left).
- Link histograms to probability distributions: the shape of a histogram of a large sample suggests a model, such as the Normal distribution (file 22).

### Explained

**Histograms.** Used for continuous grouped data with unequal class widths. Frequency = frequency density × class width. If the vertical axis is not labelled, find the scale from one bar whose frequency you know: area (in cm²) is proportional to frequency.

To estimate how many values lie in part of a class, assume the values are spread evenly across the class and take the fraction of the area.

**Box plots** show minimum, lower quartile, median, upper quartile and maximum, with outliers marked separately. They make it easy to compare two data sets.

**Data types.** Categorical (colours, makes of car), discrete numerical (number of goals), continuous (time, mass), ranked (positions in a race). Histograms are for continuous data; bar charts for categorical or discrete.

**Skew.** For positive skew, typically mean > median, and the upper whisker of a box plot is longer. For negative skew, the reverse.

### Worked example

A histogram has classes 0–10 (frequency 12), 10–15 (18) and 15–30 (24). Find the frequency densities and estimate the number of values between 12 and 20.

1. Frequency densities: 12/10 = 1.2, 18/5 = 3.6, 24/15 = 1.6.
2. From 12 to 15: 3 × 3.6 = 10.8. From 15 to 20: 5 × 1.6 = 8.
3. Estimate: 18.8, about 19.

On a histogram, a bar for the class 20–30 with frequency 15 is 3 cm tall. The bar for 30–40 is 5 cm tall. Find its frequency.

1. The widths are equal, so frequency is proportional to height.
2. 15 × 5/3 = 25.

### Common mistakes

- Reading the height of a histogram bar as the frequency.
- Drawing gaps between bars of a histogram for continuous data.

## L2 Scatter diagrams, regression lines and correlation

*Refs: AQA L2 · Edexcel Statistics 2.2 · OCR 2.02c, 2.02d, 2.02e · MEI MD6, MD7, MD8. Level: AS & A.*

### What you need to know

- Interpret scatter diagrams and regression lines for bivariate (two-variable) data. You do not calculate regression lines.
- Recognise when a scatter diagram contains distinct sections of the population.
- Describe correlation informally: positive or negative, strong or weak, or no correlation.
- Correlation does not imply causation.

### Explained

**Regression line y = a + bx.** b is the change in y for each increase of 1 in x. a is the value of y when x = 0, which may have no sensible meaning in context. Use the line to predict y from x within the range of the data (interpolation). Predictions outside the range (extrapolation) are unreliable because the relationship may change.

The explanatory (independent) variable goes on the x-axis; the response (dependent) variable on the y-axis.

**Distinct sections.** A scatter diagram may contain two groups that each show a pattern, such as heights and masses for adults and children. A single line through both groups can be misleading; analyse each group separately.

**Causation.** Two variables can be correlated because both depend on a third variable (ice cream sales and sunburn both rise in hot weather), or by coincidence.

### Worked example

For days at a UK weather station, daily mean temperature y (°C) and daily hours of sunshine x satisfy the regression line y = 11.2 + 0.6x, for data with 0 ≤ x ≤ 14. Interpret 0.6, estimate y when x = 8, and comment on using the line when x = 18.

1. Each extra hour of sunshine is linked to a mean temperature about 0.6 °C higher.
2. y = 11.2 + 4.8 = 16.0 °C. This is interpolation, so it is reasonably reliable.
3. x = 18 is outside the data (extrapolation), so the prediction is unreliable; days with that much sunshine may not exist at that station.

A scatter diagram of car engine size against fuel economy shows two clusters: one for petrol cars and one for diesel cars. Why might one line for all cars be misleading?

1. The two fuel types follow different relationships. A single line mixes them and could suggest a pattern that neither group follows. Separate lines for each group are better.

### Common mistakes

- Claiming one variable causes the other.
- Interpreting the intercept when x = 0 is far outside the data.

## L3 Measures of location and spread

*Refs: AQA L3 · Edexcel Statistics 2.3 · OCR 2.02f, 2.02g · MEI MD10, MD11, MD12. Level: AS & A.*

### What you need to know

- Measures of location: mean, median, mode. Measures of spread: range, interquartile range, interpercentile ranges, variance, standard deviation.
- Calculate the standard deviation from raw data, from a frequency table and from summary statistics.

```latex
\bar{x} = \frac{\sum x}{n} \qquad S_{xx} = \sum (x - \bar{x})^2 = \sum x^2 - \frac{\left(\sum x\right)^2}{n}
```

```latex
\sigma = \sqrt{\frac{S_{xx}}{n}} = \sqrt{\frac{\sum x^2}{n} - \bar{x}^2} \qquad s = \sqrt{\frac{S_{xx}}{n-1}}
```

For a frequency table, replace Σx by Σfx, Σx² by Σfx², and n by Σf. For grouped data, use class midpoints (the answers are estimates).

- (Edexcel) Coding: if y = (x − a)/b, then ȳ = (x̄ − a)/b and the standard deviation of y is (sd of x)/b.
- (Edexcel) Find the median and percentiles of grouped data by linear interpolation.

### Explained

Use the median and IQR when the data are skewed or have outliers, because they are not affected by extreme values. Use the mean and standard deviation for roughly symmetrical data; they use every value.

**Interpolation for the median.** Find the position n/2. Find the class containing it. Median = lower class boundary + [(n/2 − cumulative frequency before the class)/(class frequency)] × class width.

**Coding.** Adding or subtracting a constant shifts the mean but does not change the spread. Multiplying or dividing scales both.

### Worked example

n = 20, Σx = 340, Σx² = 6100. Find the mean and standard deviation.

1. x̄ = 340/20 = 17.
2. Variance (divisor n) = 6100/20 − 17² = 305 − 289 = 16, so σ = 4.
3. With divisor n − 1: Sₓₓ = 6100 − 340²/20 = 320, s² = 320/19 = 16.84, s = 4.10.

Grouped data: 0–10 (f = 12), 10–15 (f = 18), 15–30 (f = 24). Estimate the mean, the standard deviation (divisor n) and the median.

1. Midpoints 5, 12.5, 22.5. Σf = 54. Σfx = 60 + 225 + 540 = 825. x̄ = 15.28.
2. Σfx² = 300 + 2812.5 + 12 150 = 15 262.5. Variance = 15 262.5/54 − 15.278² = 49.23. SD = 7.02.
3. Median: position 27. Cumulative frequencies 12, 30, 54, so it is in 10–15. Median ≈ 10 + (27 − 12)/18 × 5 = 14.17.

(Edexcel) Data are coded with y = (x − 100)/5. The coded mean is 2.4 and the coded standard deviation is 1.2. Find the mean and standard deviation of x.

1. x = 5y + 100. Mean of x = 5(2.4) + 100 = 112.
2. SD of x = 5 × 1.2 = 6.

### Common mistakes

- Forgetting to subtract x̄² (writing Σx²/n as the variance).
- Applying the added constant to the standard deviation when decoding.

## L4 Outliers, choosing presentations and cleaning data

*Refs: AQA L4 · Edexcel Statistics 2.4 · OCR 2.02h, 2.02i, 2.02j · MEI MD9, MD13, MD14. Level: AS & A.*

### What you need to know

- Recognise and interpret possible outliers in data sets and diagrams.
- Select or criticise ways of presenting data for a given problem.
- Clean data: deal with missing data, errors and outliers.

### Explained

**Outlier rules.**

```latex
x < Q_1 - 1.5 \times \text{IQR} \quad \text{or} \quad x > Q_3 + 1.5 \times \text{IQR}
```

```latex
x < \bar{x} - 2\sigma \quad \text{or} \quad x > \bar{x} + 2\sigma
```

An outlier is not automatically wrong. Decide whether it is an error (remove or correct it) or a genuine extreme value (keep it, and perhaps comment on it). Removing outliers changes the mean and standard deviation more than the median and IQR.

**Cleaning data.** Check for missing values (blank, "n/a"), impossible values (a negative rainfall, a 300 kg car), inconsistent units, and codes such as "tr" for a trace amount. Decide how each will be treated and say so.

**Choosing a diagram.** Box plots compare distributions; histograms show the shape of continuous data; scatter diagrams show relationships; pie charts show proportions of a whole. A diagram can mislead through a truncated axis, unequal class widths drawn with heights as frequencies, or 3D effects.

### Worked example

For a data set, Q₁ = 20, Q₃ = 32. Is 55 an outlier using the 1.5 × IQR rule?

1. IQR = 12. Upper fence = 32 + 18 = 50.
2. 55 > 50, so 55 is an outlier.

The mean of a data set is 26 and the standard deviation is 6. Which values are outliers using the 2σ rule?

1. 26 ± 12: values below 14 or above 38.

A student cleaning weather data finds a daily rainfall of "tr", another of "n/a", and one of −2 mm. How should each be treated?

1. "tr" means a trace (less than the smallest measurable amount); it can be treated as 0 for calculations, and this should be stated.
2. "n/a" means no reading: leave that day out.
3. −2 mm is impossible, so it is an error: remove it (or correct it if the true value can be found).

### Common mistakes

- Removing an outlier without saying why it is an error.
- Using the 2σ rule when the question asks for the IQR rule, or the reverse.

## The large data set

*Refs: all boards' requirement to use a large data set (DfE "use of data in statistics"); AQA 3.21. Level: AS & A.*

### What you need to know

- Each board publishes a large data set (LDS) that you must explore before the exam, using a spreadsheet or statistical software.
- Questions may assume you know the context, the variables, their units and typical values, and the main features of the data, without explaining them.
- You may be asked to criticise a sample drawn from the LDS, clean part of it, or interpret summary statistics or diagrams based on it.

### Explained

The data set is different for each board:

| Board | Data set | What to know |
| --- | --- | --- |
| AQA 7357 | Published on the AQA website only. For exams from 2020 it is a set of car data: details of individual vehicles (make, propulsion type, engine size, mass, CO2 and other emissions, region, and registration year, with two years to compare). | What each variable means and its units; typical values; how the two years and the propulsion types differ; missing and impossible values |
| Edexcel 9MA0 | Weather data from Met Office stations in the UK and overseas, daily readings for May to October of 1987 and of 2015 (temperature, rainfall, sunshine, wind speed and direction, cloud cover, humidity, visibility, pressure). | Where each station is (coastal or inland, north or south); units (knots, oktas, mm); codes such as "tr" for trace and "n/a"; how 1987 compares with 2015 |
| OCR H240 | OCR's pre-released set, drawn from census data on local authorities (for example, age structure and method of travel to work). | What each column counts; working with proportions rather than raw counts; regional differences |
| OCR MEI H640 | MEI's data sets. Until 2026 the exam year rotated through several sets; from September 2026 all two-year students use a single set published by OCR/MEI. | Whichever set your exam year uses: its context, variables, units and main features |

The AQA, Edexcel and OCR descriptions in this table are not stated in the specification PDFs and should be checked against the board's current data set before teaching.

Good habits with the LDS:

1. Read the metadata: what each variable means, units, how it was measured.
2. Look at typical values and the spread of each variable. Know roughly what a normal value looks like, so you can spot errors.
3. Draw a few diagrams with software and note anything surprising.
4. Practise taking random, systematic and stratified samples from it.
5. Practise cleaning it: missing values, codes, outliers.

### Worked example

(Edexcel weather data) A student takes the first 10 days of daily mean wind speed at one station in 2015 to compare with 1987. Give two criticisms.

1. The first 10 days of May are not typical of the whole May to October period, so the sample is unlikely to be representative.
2. Ten days is a small sample, so the comparison may be dominated by chance; a random sample of, say, 30 days from each year would be better.

(AQA car data) A summary shows a car with a mass of 15 kg. What should be done?

1. 15 kg is impossible for a car, so it is an error, probably a data entry slip. Remove it from the analysis (or correct it if the true value is known), and say so.

### Common mistakes

- Answering an LDS question without using its context, for example not knowing what units a variable uses.

## Check questions

1. On a histogram, the class 20–30 has frequency 15 and its bar is 3 cm tall. The bar for 30–40 is 5 cm tall and the bar for 40–60 is 2 cm tall. Find the frequencies of these two classes. [3 marks]
2. n = 12, Σx = 96, Σx² = 840. Find the mean, and the standard deviation using divisor n. Then find s using divisor n − 1. [4 marks]
3. Times (minutes): 0–5 (8), 5–10 (14), 10–20 (18), 20–40 (10). (a) Estimate the mean. (b) Estimate the median using interpolation. (c) Comment on the skew. [6 marks]
4. (Edexcel) Data are coded with y = (x − 50)/2. For 12 values, Σy = 36 and Σy² = 300. Find the mean and standard deviation of x. [4 marks]
5. For a data set, Q₁ = 14 and Q₃ = 22. Show that 37 is an outlier. [2 marks]
6. A regression line for daily mean temperature y (°C) on hours of sunshine x is y = 11.2 + 0.6x, for 0 ≤ x ≤ 14. (a) Interpret 0.6. (b) Estimate y when x = 8. (c) Explain why it would be unwise to use the line when x = 18. [4 marks]
7. In a town, the number of cafés and the number of road accidents per year both increased from 2010 to 2020, with strong positive correlation. Explain why this does not show that cafés cause accidents. [2 marks]
8. In your large data set, give one example of a value you would remove when cleaning the data, and one example of a value you would keep even though it is extreme. [2 marks]

## Mark scheme

1. Equal widths, so frequency ∝ height for 30–40: 15 × 5/3 = 25 (1); frequency density for 20–30 is 1.5 per 3 cm, so 2 cm ↔ 1.0 (1); 40–60: 1.0 × 20 = 20 (1).
2. Mean 8 (1); variance 840/12 − 64 = 6 (1); σ = 2.45 (1); Sₓₓ = 72, s = √(72/11) = 2.56 (1).
3. (a) Midpoints 2.5, 7.5, 15, 30 (1); Σfx = 695, mean 13.9 (1). (b) 25th value in 10–20 (1); 10 + (25 − 22)/18 × 10 = 11.7 (1). (c) Mean > median (1); positive skew (1).
4. ȳ = 3 (1); variance of y = 300/12 − 9 = 16, sd 4 (1); x̄ = 2(3) + 50 = 56 (1); sd of x = 8 (1).
5. IQR = 8, upper fence 22 + 12 = 34 (1); 37 > 34 (1).
6. (a) Each extra hour of sunshine is linked to about 0.6 °C higher mean temperature (1). (b) 16.0 °C (1). (c) 18 is outside the range of the data (1); extrapolation, so the relationship may not hold (1).
7. Correlation does not imply causation (1); both may be linked to a third factor, such as population growth (1).
8. An impossible value, e.g. a negative measurement or an impossible mass (1); a genuine extreme value, e.g. a very wet day or a very heavy vehicle that is real (1).
