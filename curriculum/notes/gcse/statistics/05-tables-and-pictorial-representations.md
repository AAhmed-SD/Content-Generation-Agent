---
level: GCSE
subject: Statistics
topic: "Tables and pictorial representations"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.3.1", "3.3.2", "3.3.4", "3.3.5", "3.3.6", "3.3.7", "3.5.10"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2a.01", "2a.02", "2a.05", "2a.06", "2a.07", "2a.08"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Tables and pictorial representations

This file covers tables (including two-way tables), tally charts, pictograms, pie charts, stem and leaf diagrams, Venn diagrams, population pyramids, choropleth maps, comparative pie charts and other comparative 2D and 3D pictures, plus choosing, justifying and criticising representations and reading data in different formats. Graphs (bar charts, histograms, cumulative frequency, box plots) are in file 06.

## Overview

All on both tiers except: (HT only) comparative pie charts and comparative 2D and 3D representations.

### Board differences

- AQA 8382: 3.3.1 (C1a), 3.3.2 (C1b), 3.3.4 (C3a), 3.3.5 (C3b), 3.3.6 (C4a), 3.3.7 (C4b), and 3.5.10 (E3d) on interpreting tables including published secondary data. AQA says you will not be asked to draw 3D representations.
- Edexcel 1ST0: 2a.01, 2a.02, 2a.05 to 2a.08. Edexcel's Higher guidance expects you to calculate radii for comparative pie charts. Edexcel stresses using spreadsheets and statistical software, and choosing a visualisation to suit the audience.
- The frequency density part of misrepresentation (AQA 3.3.5, Edexcel 2a.06) is in file 06.

## 3.3.1 / 2a.01 Tables, pictograms, pie charts, stem and leaf, Venn diagrams

*Refs: AQA 3.3.1 (C1a) · Edexcel 2a.01. Tier: F & H.*

### What you need to know

- Draw and interpret: tables (frequency tables, two-way tables), tally charts, pictograms, pie charts, stem and leaf diagrams (including back-to-back), Venn diagrams.
- Calculate the key values needed (angles, frequencies).
- Diagrams need a key where appropriate.
- Stem and leaf diagrams must be ordered so you can read off the median and quartiles.

### Explained

Two-way tables show two categorical variables at once. Rows and columns both have totals, and the grand total appears in the corner.

Pictograms use a symbol for a fixed number of items, shown in the key. Part symbols show fractions of that number.

Pie charts show proportions of a whole:

```latex
\text{angle} = \frac{\text{frequency}}{\text{total}} \times 360^\circ
```

Stem and leaf diagrams keep the raw data while showing the shape. The stem is the leading digit(s); each leaf is one digit. A key such as "3 | 7 means 37" is essential. A back-to-back diagram compares two sets: leaves for one set go to the left, read from the stem outwards.

Venn diagrams show which items belong to which groups; overlaps show items in more than one group; anything outside the circles is in none. A frequency Venn diagram has numbers in each region.

### Worked example

Pie chart: 120 students chose their favourite subject: Maths 34, English 26, Science 40, Other 20. Find the angles.

1. 360 ÷ 120 = 3° per student.
2. Maths 102°, English 78°, Science 120°, Other 60°. Check: total 360°.

Stem and leaf: draw a stem and leaf diagram for 41, 36, 52, 47, 38, 44, 59, 36, 50, 43, 48, and find the median.

```
3 | 6 6 8
4 | 1 3 4 7 8
5 | 0 2 9
Key: 3 | 6 means 36
```

1. n = 11, so the median is the 6th value: 36, 36, 38, 41, 43, **44**. Median = 44.

Venn diagram: of 50 people, 28 own a dog, 19 own a cat and 9 own both. How many own neither?

1. Dog only: 28 − 9 = 19. Cat only: 19 − 9 = 10. Both: 9.
2. Neither: 50 − (19 + 10 + 9) = 12.

### Common mistakes

- Unordered leaves, or no key.
- In a Venn diagram, putting 28 in the "dog only" region when 28 is the total for the whole dog circle.
- Rounding pie chart angles so they no longer total 360°.

## 3.3.2 / 2a.02 Population pyramids, choropleth maps and comparative diagrams

*Refs: AQA 3.3.2 (C1b) · Edexcel 2a.02. Tier: F & H (part Higher only).*

### What you need to know

- Interpret and compare population pyramids and choropleth maps.
- (HT only) Comparative pie charts: the areas are in proportion to the totals, so the radii are in proportion to the square roots of the totals.
- (HT only) Interpret comparative 2D and 3D representations (you will not draw 3D ones).

### Explained

A population pyramid is two horizontal bar charts back to back: males on one side, females on the other, age groups going up. A wide base means many young people (high birth rate); a wide top means many older people.

A choropleth map shades areas by the value of a variable, darker for higher values, with a key. It shows geographical patterns but hides variation inside each area.

(HT only) Comparative pie charts. If pie A represents 400 people and pie B represents 900, B's area should be 900/400 = 2.25 times A's. Since area = πr², the ratio of radii is the square root:

```latex
\frac{r_B}{r_A} = \sqrt{\frac{n_B}{n_A}}
```

(HT only) Comparative 2D and 3D pictures: if a picture is doubled in height and width, its area is four times as big, so it looks four times bigger. A 3D picture doubled in every direction looks eight times bigger. Judge by the scale, not by eye.

### Worked example

(HT only) Pie chart A shows the spending of a family with total spending £2500, drawn with radius 4 cm. Pie chart B shows a family with total spending £3600. Find the radius of B.

1. Ratio of areas: 3600 ÷ 2500 = 1.44.
2. Ratio of radii: √1.44 = 1.2.
3. Radius of B: 4 × 1.2 = 4.8 cm.

### Common mistakes

- (HT only) Making the radius proportional to the total instead of its square root.
- Reading a choropleth map as if the whole area has the same value everywhere.

## 3.3.4 / 2a.05 Choosing a format and accurate visualisation

*Refs: AQA 3.3.4 (C3a) · Edexcel 2a.05. Tier: F & H.*

### What you need to know

- Justify why a format is suitable, and draw it accurately (labelled axes, title, key, sensible scales).
- Know what spreadsheets and statistical software can do, and avoid using them inappropriately (for example, a 3D chart because it looks good).
- Match the visualisation to the audience: simple for the public, more technical for specialists.

### Explained

A good diagram is honest and clear. Technology makes drawing easy but also makes misleading choices easy: default 3D effects, odd colours, automatic axes that do not start at zero.

### Worked example

A charity wants to show the public how each £100 donated is spent. Suggest and justify a diagram.

1. A pie chart, because it shows how a whole (£100) is split into parts, and is easy for the public to understand.

### Common mistakes

- Justifying a choice with "it is clear" without linking it to the data or audience.

## 3.3.5 / 2a.06 Misleading diagrams

*Refs: AQA 3.3.5 (C3b) · Edexcel 2a.06. Tier: F & H (part Higher only).*

### What you need to know

- Spot construction errors that mislead: incorrect or uneven scales, truncated axes (not starting at 0), distorted sizing (pictures scaled in 2D or 3D), 3D effects, missing labels.
- Use class boundaries correctly.
- Criticise diagrams from secondary sources (newspapers, adverts).
- (HT only) Misusing the frequency density formula in histograms: see file 06.

### Explained

| Fault | Effect |
| --- | --- |
| Vertical axis starts at 80 instead of 0 | Small differences look huge |
| Uneven scale (0, 10, 50, 100 equally spaced) | Changes look different sizes from what they are |
| Picture doubled in height and width | Looks 4 times bigger instead of twice |
| 3D pie chart | Front slices look bigger than back slices |
| No labels or units | Cannot tell what is shown |
| Unequal class widths drawn as if equal | Wide classes look more important |

### Worked example

A bar chart shows sales of 92 and 98 thousand, with the vertical axis from 90 to 100. Explain why it is misleading.

1. The axis does not start at 0. The second bar looks four times as tall (8 against 2 units above 90), but sales only rose by about 6.5%.

### Common mistakes

- Saying "the graph is wrong" without explaining the effect on what readers believe.

## 3.3.6 / 2a.07 Comparing data shown in different formats

*Refs: AQA 3.3.6 (C4a) · Edexcel 2a.07. Tier: F & H.*

### What you need to know

- Extract or calculate matching values (medians, IQRs, means, standard deviations) from data given in different forms, such as a list for one set and a box plot or a software printout for the other.
- Present the same information in more than one format.

### Worked example

Group A's reaction times are shown on a box plot: median 0.32 s, IQR 0.10 s. Group B's are listed: 0.25, 0.27, 0.28, 0.30, 0.31, 0.33, 0.36. Compare.

1. Group B: n = 7, median = 4th value = 0.30 s. LQ = 2nd value = 0.27, UQ = 6th value = 0.33, IQR = 0.06 s.
2. Group B has a lower median, so typically quicker reactions, and a smaller IQR, so more consistent times.

### Common mistakes

- Comparing a median from one set with a mean from the other.

## 3.3.7 / 2a.08 Selecting a representation

*Refs: AQA 3.3.7 (C4b) · Edexcel 2a.08. Tier: F & H.*

### What you need to know

- Choose and justify a representation that suits the type of data.

### Explained

| Data | Suitable diagrams |
| --- | --- |
| Categorical | Bar chart, pie chart, pictogram |
| Discrete ungrouped | Vertical line (bar line) chart |
| Continuous grouped | Histogram, frequency polygon, cumulative frequency |
| Comparing distributions | Back-to-back stem and leaf, box plots, frequency polygons |
| Bivariate | Scatter diagram |
| Data over time | Time series line graph |
| Geographical | Choropleth map |
| Age structure | Population pyramid |

### Worked example

Which diagram would you use to show whether taller students have longer stride lengths? Why?

1. A scatter diagram, because the data is bivariate (two measurements per student) and it shows whether there is correlation.

### Common mistakes

- Choosing a pie chart for data that is not parts of a whole.

## 3.5.10 Interpreting tables

*Refs: AQA 3.5.10 (E3d) (also used throughout Edexcel 2a.01, 2a.07). Tier: F & H.*

### What you need to know

- Read and interpret data in many kinds of tables, including published secondary data with several rows, columns and footnotes.

### Explained

Read the title, headings, units ("thousands", "%") and footnotes first. Check whether figures are counts or percentages, and whether rows or columns add to 100%.

### Worked example

A published table shows, in thousands, adults by type of travel to work: Car 1840, Bus 410, Train 290, Walk/cycle 360, Total 2900. What percentage travel by public transport?

1. Public transport = bus + train = 410 + 290 = 700 thousand.
2. 700 ÷ 2900 × 100 = 24.1%.

### Common mistakes

- Ignoring "in thousands" and giving the answer as 700 people.

## Check questions

1. A pie chart shows how 90 people travel to work. The sector for "bus" has an angle of 56°. How many people travel by bus? [2 marks]
2. Draw an ordered stem and leaf diagram for: 23, 35, 18, 29, 31, 24, 17, 38, 26, 22. Give a key. [3 marks]
3. Using your diagram, find the median and the range. [2 marks]
4. In a group of 40 students, 22 study French, 15 study Spanish and 6 study both. Draw a Venn diagram and find how many study neither. [3 marks]
5. Describe what a population pyramid with a narrow base and a wide top tells you about a country. [2 marks]
6. (HT only) A comparative pie chart for a town of 16 000 people has radius 5 cm. Find the radius for a town of 25 000 people. [3 marks]
7. A newspaper shows a picture of a coin twice as tall and twice as wide as another to show that savings have doubled. Explain why this is misleading. [2 marks]
8. State a suitable diagram to compare the masses of apples from two orchards, and give a reason. [2 marks]

## Mark scheme

1. 56/360 × 90 (1) = 14 (1).
2. Stems 1, 2, 3 (1); leaves 1 | 7 8; 2 | 2 3 4 6 9; 3 | 1 5 8 ordered (1); key e.g. 1 | 7 means 17 (1).
3. Median: n = 10, mean of 5th and 6th values (24 and 26) = 25 (1). Range 38 − 17 = 21 (1).
4. French only 16, Spanish only 9, both 6 (1 for correct diagram, 1 for two correct regions); neither 40 − 31 = 9 (1).
5. Few young people / low birth rate (1); many older people / long life expectancy (1).
6. 25 000 ÷ 16 000 = 1.5625 (1); √1.5625 = 1.25 (1); 5 × 1.25 = 6.25 cm (1).
7. The area is four times as large (1), so it looks as if savings have quadrupled rather than doubled (1).
8. Back-to-back stem and leaf / two box plots / two frequency polygons on the same axes (1); allows the averages and spreads to be compared directly (1).
