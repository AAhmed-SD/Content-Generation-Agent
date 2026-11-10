---
level: GCSE
subject: Statistics
topic: "Graphs, histograms and cumulative frequency"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.3.3", "3.3.5"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2a.03", "2a.04", "2a.06"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Graphs, histograms and cumulative frequency

This file covers bar charts (dual, multiple, composite and percentage composite), line graphs, time series graphs, scatter diagrams, bar line (vertical line) charts, frequency polygons, cumulative frequency graphs (including step polygons), box plots and histograms with equal and (Higher) unequal class widths.

## Overview

All on both tiers except: (HT only) frequency density and histograms with unequal class widths, and the misuse of the frequency density formula. Time series analysis is in file 11, scatter diagrams and correlation in file 10, and quartiles and IQR in file 08.

### Board differences

- AQA 8382: everything is in 3.3.3 (C2), with the frequency density part of misrepresentation in 3.3.5 (C3b). AQA's foundation content includes cumulative frequency step polygons for discrete data.
- Edexcel 1ST0: 2a.03 (both tiers), 2a.04 (Higher only: frequency density and unequal widths), 2a.06 (misrepresentation). Edexcel allows the y-axis of an equal-width histogram to be labelled "frequency". Cumulative frequency polygons and curves are treated the same; frequency polygons may be open or closed.

## 3.3.3 / 2a.03 Bar charts, line graphs and bar line charts

*Refs: AQA 3.3.3 (C2) · Edexcel 2a.03. Tier: F & H.*

### What you need to know

- Bar charts for categorical or discrete data: bars of equal width with gaps.
- Dual (comparative) bar charts: bars for two or more groups side by side.
- Composite (stacked) bar charts: each bar split into parts. Percentage composite bar charts have every bar the same height (100%).
- Bar line (vertical line) charts for ungrouped discrete data.
- Line graphs and time series graphs: points joined with straight lines (see file 11).
- Scatter diagrams for bivariate data (see file 10).

### Explained

A percentage composite bar chart compares proportions, not totals: two schools of very different sizes can be compared fairly.

### Worked example

Two clubs report how members travel. Club X (200 members): car 90, bus 60, walk 50. Club Y (80 members): car 28, bus 20, walk 32. Work out the percentages for a percentage composite bar chart and compare.

1. Club X: car 45%, bus 30%, walk 25%.
2. Club Y: car 35%, bus 25%, walk 40%.
3. A larger proportion of Club Y's members walk (40% against 25%), even though Club X has more walkers in total (50 against 32).

### Common mistakes

- Comparing totals when the groups are different sizes; use percentages.
- Gaps between bars for continuous data (only histograms have no gaps).

## 3.3.3 / 2a.03 Frequency polygons

*Refs: AQA 3.3.3 (C2) · Edexcel 2a.03. Tier: F & H.*

### What you need to know

- Plot each frequency against the midpoint of its class, and join the points with straight lines.
- Can be left open or closed (joined down to the axis half a class beyond each end).
- Good for comparing two distributions on the same axes.

### Worked example

Plot points for: 0 ≤ t < 10 (4), 10 ≤ t < 20 (9), 20 ≤ t < 30 (12), 30 ≤ t < 40 (5).

1. Midpoints: 5, 15, 25, 35.
2. Points: (5, 4), (15, 9), (25, 12), (35, 5). Join with straight lines.

### Common mistakes

- Plotting at the class boundaries instead of midpoints.
- Joining the first and last points to each other.

## 3.3.3 / 2a.03 Cumulative frequency

*Refs: AQA 3.3.3 (C2) · Edexcel 2a.03. Tier: F & H.*

### What you need to know

- Cumulative frequency is the running total of frequencies.
- Grouped continuous data: plot each running total against the upper class boundary, starting at (lowest boundary, 0); join with a smooth curve or straight lines.
- Discrete data: a step polygon (cumulative frequency jumps at each value and stays flat in between).
- Use the graph to estimate the median, quartiles, percentiles, and how many are above or below a value.

### Explained

For n values on a cumulative frequency graph, read across at:

- median: n/2
- lower quartile: n/4
- upper quartile: 3n/4
- kth percentile: k% of n

For "how many more than x", read up from x and subtract from n.

### Worked example

The times taken by 80 people to finish a puzzle:

| Time t (min) | Frequency | Cumulative frequency |
| --- | --- | --- |
| 0 < t ≤ 5 | 6 | 6 |
| 5 < t ≤ 10 | 18 | 24 |
| 10 < t ≤ 15 | 30 | 54 |
| 15 < t ≤ 20 | 18 | 72 |
| 20 < t ≤ 25 | 8 | 80 |

1. Plot (0, 0), (5, 6), (10, 24), (15, 54), (20, 72), (25, 80).
2. Median: read across at 40. Between (10, 24) and (15, 54), 40 is 16/30 of the way up, so t ≈ 10 + 16/30 × 5 ≈ 12.7 min.
3. LQ at 20: between (5, 6) and (10, 24), 14/18 of the way: 5 + 14/18 × 5 ≈ 8.9 min. UQ at 60: between (15, 54) and (20, 72): 15 + 6/18 × 5 ≈ 16.7 min. IQR ≈ 7.8 min.
4. Number taking more than 18 min: CF at 18 ≈ 54 + 3/5 × 18 = 64.8, so about 80 − 65 = 15 people.

(These readings assume straight lines between points; a smooth curve gives values close to these.)

### Common mistakes

- Plotting at midpoints instead of upper class boundaries.
- Not starting at zero frequency at the bottom of the first class.
- Reading the median at the median of the x-values rather than at n/2 on the vertical axis.

## 3.3.3 / 2a.03 Box plots

*Refs: AQA 3.3.3 (C2) · Edexcel 2a.03. Tier: F & H.*

### What you need to know

- A box plot shows the minimum, lower quartile, median, upper quartile and maximum on a scale.
- Outliers may be shown as separate crosses, with whiskers going to the most extreme values that are not outliers (see file 08).
- Use box plots to compare distributions: medians for average, IQRs and ranges for spread, and the box shape for skewness.

### Worked example

Draw a box plot for: min 12, LQ 18, median 23, UQ 31, max 40.

1. Draw a scale from 10 to 40.
2. Draw a box from 18 to 31 with a line at 23.
3. Draw whiskers from 12 to 18 and from 31 to 40.
4. Comment: the median is nearer the lower quartile (23 − 18 = 5 < 31 − 23 = 8), so the data has positive skew.

### Common mistakes

- No scale, or the scale does not cover the whole data.
- Comparing box plots using only the maximum values.

## 3.3.3 / 2a.03, 2a.04 Histograms

*Refs: AQA 3.3.3 (C2) · Edexcel 2a.03 (equal width), 2a.04 (unequal width). Tier: F & H (part Higher only).*

### What you need to know

- Histograms show grouped continuous data: bars touch, and the horizontal axis is a continuous scale.
- Equal class widths: bar heights can show frequency (Edexcel allows the axis label "frequency" here).
- (HT only) Unequal class widths: the area of each bar represents frequency, so the height is frequency density:

```latex
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
```

- (HT only) Find frequencies from a histogram: frequency = frequency density × class width.
- (HT only) Label the axis "frequency density" (or use a key showing what an area means).

### Explained

(HT only) If a class is twice as wide, it would collect about twice as many values even if the data were spread evenly. Dividing by the width corrects for this, so the heights show how crowded each part of the scale is.

(HT only) To estimate how many lie in part of a class, take that fraction of the bar's area, assuming values are spread evenly across the class.

### Worked example

(HT only) Masses of 100 parcels:

| Mass m (kg) | Frequency | Class width | Frequency density |
| --- | --- | --- | --- |
| 0 < m ≤ 2 | 16 | 2 | 8 |
| 2 < m ≤ 3 | 22 | 1 | 22 |
| 3 < m ≤ 5 | 30 | 2 | 15 |
| 5 < m ≤ 10 | 25 | 5 | 5 |
| 10 < m ≤ 20 | 7 | 10 | 0.7 |

1. Each frequency density = frequency ÷ width (last column).
2. Draw bars from 0 to 2 at height 8, 2 to 3 at height 22, and so on, with no gaps.
3. Estimate the number of parcels between 4 kg and 7 kg:
   - 4 to 5: half of the 3–5 class: 15 × 1 = 15.
   - 5 to 7: 2 kg of the 5–10 class: 5 × 2 = 10.
   - Total about 25.

(HT only) Reading back: a bar from 20 to 35 has frequency density 1.6. Frequency = 1.6 × 15 = 24.

### Common mistakes

- (HT only) Plotting frequency instead of frequency density for unequal widths.
- (HT only) Using the wrong class width, especially when data was rounded (class 10–14 recorded to the nearest whole number has width 5).
- Leaving gaps between bars.

## 3.3.5 / 2a.06 Misuse of frequency density

*Refs: AQA 3.3.5 (C3b) · Edexcel 2a.06. Tier: Higher only (this part).*

### What you need to know

- (HT only) Spot histograms that are misleading because frequency was plotted instead of frequency density, or because the class widths or boundaries were wrong.

### Explained

(HT only) If a histogram with unequal widths uses frequency as the height, a wide class looks far bigger than it should, because its area is multiplied by its width.

### Worked example

(HT only) A histogram for classes 0–10 (frequency 20) and 10–40 (frequency 30) uses heights 20 and 30. Explain the problem.

1. The second bar is three times as wide, so its area is 30 × 30 = 900 against 20 × 10 = 200: it looks 4.5 times as big, though its frequency is only 1.5 times as big.
2. Correct heights: 20 ÷ 10 = 2 and 30 ÷ 30 = 1.

### Common mistakes

- (HT only) Spotting that it is wrong but not saying what it makes readers think.

## Check questions

1. Explain one advantage of a percentage composite bar chart over a composite bar chart. [1 mark]
2. Write down the coordinates you would plot for a frequency polygon for: 10 ≤ h < 20 (frequency 7), 20 ≤ h < 30 (frequency 13), 30 ≤ h < 40 (frequency 4). [2 marks]
3. Complete a cumulative frequency table for 60 test marks: 0–10 (3), 11–20 (9), 21–30 (21), 31–40 (19), 41–50 (8), and state the coordinates you would plot. [3 marks]
4. A cumulative frequency graph for 120 people has the value 30 at 14 minutes, 60 at 19 minutes and 90 at 26 minutes. Write down the median and IQR. [2 marks]
5. Draw a box plot for: smallest 3, LQ 7, median 9, UQ 15, largest 22. Describe the skewness. [3 marks]
6. (HT only) A class 15 < x ≤ 25 has frequency 34. Find its frequency density. [1 mark]
7. (HT only) In a histogram, the bar for 60 < t ≤ 90 has frequency density 2.4. Find the frequency. Estimate how many values lie between 60 and 70. [3 marks]
8. (HT only) Explain why using frequency as the height of bars in a histogram with unequal class widths is misleading. [1 mark]

## Mark scheme

1. Groups of different sizes can be compared by proportion (1).
2. (15, 7), (25, 13), (35, 4) (1 for midpoints, 1 for all correct).
3. CF 3, 12, 33, 52, 60 (1). Points at upper boundaries 10.5, 20.5, 30.5, 40.5, 50.5 (1): (10.5, 3), (20.5, 12), (30.5, 33), (40.5, 52), (50.5, 60), starting at (−0.5, 0) or (0, 0) (1). (Accept boundaries 10, 20, 30, 40, 50 if the marks are treated as whole numbers.)
4. Median 19 min (1); IQR 26 − 14 = 12 min (1).
5. Correct box from 7 to 15 with line at 9 (1); whiskers to 3 and 22 (1); median closer to LQ / UQ − median > median − LQ, so positive skew (1).
6. 34 ÷ 10 = 3.4 (1).
7. 2.4 × 30 = 72 (1). Between 60 and 70: 2.4 × 10 (1) = 24 (1).
8. Wider classes look bigger because the area (not the height) is what the eye compares, so their frequency is overstated (1).
