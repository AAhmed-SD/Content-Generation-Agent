---
level: GCSE
subject: Mathematics
topic: "Statistics"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["S1", "S2", "S3", "S4", "S5", "S6"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["S1", "S2", "S3", "S4", "S5", "S6"]
  - board: OCR
    code: "J560"
    spec_refs: ["12.01a", "12.02a", "12.02b", "12.03a", "12.03b", "12.03c", "12.03d"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FS1", "FS2", "FS3", "FS4", "FS5", "FS6", "HS1", "HS2", "HS3", "HS4", "HS5", "HS6", "HS7"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Statistics

This file covers populations and samples, tables, charts and diagrams (including time series and misleading graphs), histograms and cumulative frequency, averages and spread including box plots, describing a population, and scatter graphs and correlation. It also covers Eduqas's extra statement on designing questionnaires.

## Overview

Sampling, charts, averages and range, comparing distributions and scatter graphs are on both tiers. Higher only: histograms (equal and unequal class widths), cumulative frequency graphs, quartiles, interquartile range and box plots.

### Board differences

- AQA and Edexcel: S1 to S6.
- OCR J560: 12.01a (populations and samples), 12.02a (categorical and numerical data), 12.02b (grouped data, Higher), 12.03a (summary statistics), 12.03b (misrepresenting data), 12.03c (bivariate data) and 12.03d (outliers).
- Eduqas C300QS: FS1 to FS6 on Foundation and HS1 to HS7 on Higher. Eduqas numbers differ from the DfE codes because of an extra statement, FS2 and HS2: designing and criticising questions for a questionnaire, including fairness. It has its own section at the end of this file.

## S1 Populations and samples

*Refs: AQA S1 · Edexcel S1 · OCR 12.01a · Eduqas FS1, HS1. Tier: F & H.*

### What you need to know

- Infer properties of a population from a sample, knowing the limitations of sampling.
- A population is the whole group being studied; a sample is part of it.
- A sample should be random and large enough to represent the population; a biased sample does not.

### Explained

Sampling saves time and money, and is the only option if testing destroys the item. But a sample can give a misleading picture if it is small or biased.

Sources of bias: asking only one type of person (only people at a gym about exercise), a sample that is too small, or people choosing whether to take part.

A random sample gives every member of the population an equal chance of being chosen, for example by numbering everyone and using a random number generator.

To estimate a population total from a sample, scale up by the same proportion.

Capture-recapture (an estimate of population size): catch and mark M animals, release them; later catch n animals, of which m are marked. Then

```latex
\text{population} \approx \frac{M \times n}{m}
```

### Worked example

A sample of 60 students from a school of 900 finds that 14 walk to school. Estimate the number in the whole school who walk.

1. 14/60 of 900 = 210.

40 fish in a pond are caught, tagged and released. Later 50 fish are caught, and 8 are tagged. Estimate the number of fish in the pond.

1. 40 × 50 ÷ 8 = 250.

### Common mistakes

- Saying a sample is "not big enough" without explaining why it might be biased or unreliable.
- In capture-recapture, dividing the wrong way.

## S2 Tables, charts and diagrams

*Refs: AQA S2 · Edexcel S2 · OCR 12.02a, 12.03b · Eduqas FS3, HS3. Tier: F & H.*

### What you need to know

- Interpret and construct frequency tables, bar charts (including composite and dual), pie charts and pictograms for categorical data.
- Vertical line charts for ungrouped discrete numerical data.
- Tables and line graphs for time series data.
- Know when each one is appropriate, and spot graphs that misrepresent the data.

### Explained

Pie charts: each category's angle = frequency ÷ total × 360°.

Time series: plot time along the bottom and join the points with straight lines. Look for the overall trend and any repeating (seasonal) pattern.

Misleading graphs: a vertical axis not starting at zero, uneven scales, 3D effects that distort size, missing labels or pictures scaled in two dimensions.

### Worked example

In a survey of 72 people, 30 chose walking, 24 cycling and 18 bus. Find the pie chart angles.

1. 360 ÷ 72 = 5° per person.
2. Walking 150°, cycling 120°, bus 90°.

A pie chart has a 60° sector for "car", which represents 45 people. How many people are there in total?

1. 45 people ↔ 60°, so 360° ↔ 45 × 6 = 270 people.

### Common mistakes

- Joining the points on a bar chart.
- Forgetting a key on a pictogram or composite bar chart.
- Angles that do not add up to 360°.

## S3 Histograms and cumulative frequency

*Refs: AQA S3 · Edexcel S3 · OCR 12.02b · Eduqas HS4. Tier: Higher only.*

### What you need to know

- (HT only) Construct and interpret histograms with equal and unequal class widths, for grouped continuous data.
- (HT only) In a histogram, the area of each bar represents the frequency:

```latex
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
```

- (HT only) Construct and interpret cumulative frequency graphs, and use them to estimate the median, quartiles and the number above or below a value.

### Explained

(HT only) Histograms have no gaps between the bars and the vertical axis is frequency density, not frequency. Unequal widths are fine because the area handles them.

(HT only) Cumulative frequency is a running total. Plot each running total at the upper class boundary, start at the lower boundary of the first class with 0, then join with a smooth curve (or straight lines). For n values:

- Median: read across at n/2.
- Lower quartile: n/4. Upper quartile: 3n/4.

### Worked example

(HT only) Times (t minutes) in a race:

| Time | Frequency |
| --- | --- |
| 20 < t ≤ 30 | 8 |
| 30 < t ≤ 35 | 15 |
| 35 < t ≤ 40 | 22 |
| 40 < t ≤ 60 | 25 |

Find the frequency densities.

1. 8 ÷ 10 = 0.8; 15 ÷ 5 = 3; 22 ÷ 5 = 4.4; 25 ÷ 20 = 1.25.

(HT only) A histogram bar for 10 < m ≤ 25 has frequency density 2.4. Find the frequency.

1. 2.4 × 15 = 36.

(HT only) Estimate how many runners took more than 50 minutes, using the table above.

1. The 40 to 60 class has 25 runners spread over 20 minutes.
2. 50 to 60 is half the class: about 12.5, so about 12 or 13 runners.

(HT only) A cumulative frequency graph for 80 students shows the curve reaching 20 at 34 marks, 40 at 45 marks and 60 at 53 marks. Find the median and interquartile range.

1. Median: 45 marks (at 40).
2. LQ 34 (at 20), UQ 53 (at 60). IQR = 53 − 34 = 19 marks.

### Common mistakes

- (HT only) Plotting frequency instead of frequency density.
- (HT only) Plotting cumulative frequency at the class midpoint instead of the upper boundary.

## S4 Averages, spread and comparing distributions

*Refs: AQA S4 · Edexcel S4 · OCR 12.02b, 12.03a, 12.03d · Eduqas FS4, HS5. Tier: F & H (part Higher only).*

### What you need to know

- Find and use the mean, median, mode and modal class, and the range.
- Find an estimate of the mean from a grouped frequency table, using midpoints.
- Consider outliers: values that are very different from the rest.
- (HT only) Quartiles, interquartile range (IQR) and box plots.
- Compare distributions using one average and one measure of spread, in context.

### Explained

| Measure | When it is useful |
| --- | --- |
| Mode | Categorical data; the most common value |
| Median | Not affected by outliers |
| Mean | Uses every value, but is pulled by outliers |
| Range | Quick spread, but affected by outliers |
| (HT) IQR | Spread of the middle half; not affected by outliers |

From a frequency table: mean = Σfx ÷ Σf. For grouped data, use the midpoint of each class for x; the answer is an estimate because the exact values are unknown.

The median is the ((n + 1)/2)th value when the data is in order.

(HT only) A box plot shows minimum, lower quartile, median, upper quartile and maximum on a scale.

To compare two distributions, write two sentences: one comparing an average (for example "the median of group A is higher, so on average group A scored higher") and one comparing spread ("the IQR of group B is smaller, so group B's scores were more consistent").

### Worked example

Find the mean of this data.

| Goals | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Matches | 4 | 7 | 6 | 3 |

1. Σf = 20. Σfx = 0 + 7 + 12 + 9 = 28.
2. Mean = 28 ÷ 20 = 1.4 goals.

Estimate the mean height from this table.

| Height h (cm) | Frequency |
| --- | --- |
| 150 < h ≤ 160 | 5 |
| 160 < h ≤ 170 | 12 |
| 170 < h ≤ 180 | 3 |

1. Midpoints 155, 165, 175.
2. Σfx = 775 + 1980 + 525 = 3280. Σf = 20.
3. Mean ≈ 164 cm.

(HT only) Find the median and IQR of: 3, 5, 6, 8, 9, 11, 12, 14, 15, 18, 20.

1. n = 11. Median: 6th value = 11.
2. LQ: 3rd value = 6. UQ: 9th value = 15.
3. IQR = 9.

### Common mistakes

- Dividing Σfx by the number of classes instead of Σf.
- Comparing without context ("A is bigger") or comparing two averages and no spread.
- Finding the median of unordered data.

## S5 Describing a population

*Refs: AQA S5 · Edexcel S5 · OCR none · Eduqas FS5, HS6. Tier: F & H.*

### What you need to know

- Apply statistics to describe a population: use averages, spread and charts from a sample to make statements about the whole population.

### Explained

Statements about a population from a sample are estimates. Say what the statistic suggests, and note how reliable it is (sample size, possible bias).

### Worked example

A random sample of 50 phone users has a mean screen time of 3.8 hours per day with a range of 6 hours. Describe what this suggests about all users.

1. On average, users spend about 3.8 hours a day on their phones.
2. Screen time varies a lot (range 6 hours).
3. The sample is random but fairly small, so the estimate may not be precise.

### Common mistakes

- Stating sample results as certain facts about the population.

## S6 Scatter graphs and correlation

*Refs: AQA S6 · Edexcel S6 · OCR 12.03c · Eduqas FS6, HS7. Tier: F & H.*

### What you need to know

- Use and interpret scatter graphs of bivariate data (two variables measured for each item).
- Recognise positive, negative and no correlation.
- Correlation does not show that one variable causes the other.
- Draw a line of best fit by eye and use it to estimate values.
- Interpolation (within the range of the data) is reasonably reliable; extrapolation (outside the range) is not.
- Identify outliers.

### Explained

Positive correlation: as one increases, the other tends to increase. Negative: as one increases, the other tends to decrease. Strong correlation means the points lie close to a straight line.

A line of best fit goes through the middle of the points, with about as many above as below. It does not have to pass through the origin.

Two variables can be correlated because a third variable affects both (ice cream sales and sunburn both rise in hot weather).

### Worked example

A scatter graph of hours revised against test score shows strong positive correlation. The line of best fit passes through (2, 40) and (10, 80). Estimate the score for 6 hours of revision.

1. The line goes up 40 marks over 8 hours: 5 marks per hour.
2. At 6 hours: 40 + 4 × 5 = 60 marks.

Explain why using the line to predict the score for 25 hours might be unreliable.

1. 25 hours is outside the range of the data (extrapolation), so the pattern may not continue.

### Common mistakes

- Saying correlation proves cause.
- Forcing the line of best fit through the origin or joining the points dot to dot.

## Eduqas FS2 and HS2: designing questionnaires

*Refs: Eduqas FS2, HS2 only (not in AQA, Edexcel or OCR). Tier: Foundation and Higher.*

### What you need to know

- Design and criticise questions for a questionnaire, including whether they are fair.

### Explained

A good question:

- is clear and about one thing only
- is not leading (does not push towards an answer)
- has response boxes that cover every possible answer, with no overlaps
- includes a time frame where needed ("per week")
- does not ask for unnecessary personal information.

A leading question: "Don't you agree that school lunches are too expensive?" A fair version: "How would you rate the price of school lunches? Too expensive / About right / Good value."

### Worked example

Criticise the question "How much TV do you watch? 0–1 hours, 1–2 hours, 3–4 hours" and write a better one.

1. No time frame (per day? per week?).
2. Gaps: 2 to 3 hours is missing; overlapping boundaries at 1 hour; nothing for more than 4 hours.
3. Better: "How many hours of TV do you watch on a typical day? 0 to less than 1 / 1 to less than 2 / 2 to less than 3 / 3 or more."

### Common mistakes

- Overlapping response boxes such as 1–2 and 2–3.
- Giving opinions in the question.

## Check questions

1. Give one advantage and one disadvantage of using a sample rather than the whole population. [2 marks]
2. 30 birds are ringed and released. Later 45 birds are caught, and 6 have rings. Estimate the population. [2 marks]
3. In a pie chart for 120 people, how many degrees represent 34 people? [2 marks]
4. Find the mean, median, mode and range of 4, 9, 2, 9, 6, 11, 8. [4 marks]
5. Estimate the mean from the table: 0 < x ≤ 10 (frequency 6), 10 < x ≤ 20 (frequency 9), 20 < x ≤ 40 (frequency 5). [3 marks]
6. Explain why your answer to question 5 is an estimate. [1 mark]
7. (HT only) A histogram class 20 < t ≤ 50 has frequency 42. Find its frequency density. [1 mark]
8. (HT only) For the data 12, 15, 17, 18, 21, 22, 25, 27, 30, 34, 40, find the median and IQR. [3 marks]
9. Class A has median 62 and range 40. Class B has median 55 and range 18. Compare the two classes. [2 marks]
10. Describe the correlation you would expect between the age of a car and its value, and explain whether it shows that age causes the value to fall. [2 marks]
11. A line of best fit passes through (0, 12) and (20, 52). Use it to estimate y when x = 7. [2 marks]
12. (Eduqas FS2/HS2) Write down two problems with the question "Do you agree that exercise is good for you? Yes / No" and suggest an improvement. [3 marks]

## Mark scheme

1. Advantage: quicker, cheaper or less work (1). Disadvantage: may be biased or not represent the whole population (1).
2. 30 × 45 ÷ 6 (1) = 225 (1).
3. 34/120 × 360 (1) = 102° (1).
4. Mean 49 ÷ 7 = 7 (1); median 8 (1); mode 9 (1); range 9 (1).
5. Midpoints 5, 15, 30 (1); Σfx = 30 + 135 + 150 = 315, Σf = 20 (1); mean ≈ 15.75 (1).
6. The actual values are not known; midpoints are used (1).
7. 42 ÷ 30 = 1.4 (1).
8. Median 22 (1); LQ 17, UQ 30 (1); IQR 13 (1).
9. Class A has a higher median, so did better on average (1); class B has a smaller range, so its results were more consistent (1).
10. Negative correlation (1); correlation alone does not prove cause, though here age is a plausible cause (1).
11. Gradient 2 (1); y = 12 + 14 = 26 (1).
12. Leading question (1); only two options or no "not sure" option / no range of opinions (1); improvement such as "How do you rate exercise for your health? Very good / Good / Neutral / Bad / Very bad" (1).
