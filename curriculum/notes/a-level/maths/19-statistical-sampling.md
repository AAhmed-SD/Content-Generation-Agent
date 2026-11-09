---
level: A-level
subject: Mathematics
topic: "Statistical sampling"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["K1"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["S1.1"]
  - board: OCR
    code: "H240"
    spec_refs: ["2.01a", "2.01b", "2.01c", "2.01d"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mp21", "Mp22", "Mp23", "Mp24", "Mp25"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Statistical sampling

This file covers populations and samples, censuses, sampling frames, the main sampling techniques, how to choose between them, and why different samples can give different conclusions.

## Overview

All AS content. Sampling ideas come back in hypothesis testing (file 23), where a sample is used to make an inference about a population. Large data set questions often ask you to criticise a sample drawn from the data set (file 20).

### Board differences

The four boards name different lists of techniques:

| Board | Techniques named |
| --- | --- |
| AQA 7357 (K1) | simple random sampling and opportunity sampling are named; others may be asked about in context |
| Edexcel 9MA0 (Statistics 1.1) | simple random, stratified, systematic, quota and opportunity (convenience) sampling |
| OCR H240 (2.01a to 2.01d) | carry out simple random and opportunity sampling; know and critique, but not carry out, systematic, stratified, cluster and quota sampling. Random samples may be assumed to be taken without replacement from a large population unless stated. |
| OCR MEI H640 (Mp21 to Mp25) | simple random, opportunity, systematic, stratified, quota, cluster and self-selected samples; any other method will be explained in the question |

## K1 Populations, samples and sampling techniques

*Refs: AQA K1 · Edexcel Statistics 1.1 · OCR 2.01a, 2.01b, 2.01c, 2.01d · MEI Mp21, Mp22, Mp23, Mp24, Mp25. Level: AS & A.*

### What you need to know

- A population is the whole group you want to know about. A sample is part of it.
- A census collects data from every member of the population.
- A sampling frame is a list of the members of the population that the sample is chosen from. A sampling unit is one member that can be sampled.
- Use a sample to make informal inferences about the population (for example, using a sample mean to estimate the population mean).
- Different samples can lead to different conclusions; larger samples tend to vary less.
- Use, select and criticise sampling techniques in context, including recognising possible bias.

### Explained

**Census or sample?**

| | Census | Sample |
| --- | --- | --- |
| Advantages | complete and accurate picture | cheaper, quicker, less data to process; the only option if testing destroys the item |
| Disadvantages | expensive and slow; hard to reach everyone | may not represent the population; results vary between samples |

**Random methods** (need a sampling frame):

- **Simple random sampling.** Every sample of the required size is equally likely. Number the population 1 to N, then use a random number generator to pick n different numbers. Free from selection bias, but needs a full list and may, by chance, under-represent a group.
- **Systematic sampling.** Choose every kth member, where k = N/n, starting from a random member among the first k. Simple to do, but can be biased if the list has a repeating pattern.
- **Stratified sampling.** Split the population into groups (strata), such as year groups, and take a simple random sample from each, in proportion to its size. Represents each group fairly, but needs to know the size of each stratum and the strata must not overlap.
- **Cluster sampling** (MEI, OCR). Split the population into clusters (such as schools or streets), randomly choose some clusters, then sample within them. Cheaper when the population is spread out, but clusters may not be typical.

**Non-random methods** (no sampling frame needed):

- **Quota sampling.** An interviewer fills set numbers (quotas) of people from each group, choosing who to ask. Quick and needs no list, but the interviewer's choices can introduce bias.
- **Opportunity (convenience) sampling.** Use whoever is available at the time, such as the first 30 people leaving a shop. Easy and cheap, but unlikely to be representative.
- **Self-selected samples** (MEI). People volunteer, such as by replying to an online poll. Those with strong opinions are more likely to respond.

**Bias.** A sample is biased if the method makes some members more likely to be chosen in a way that affects the result. Examples: surveying a train station at 8 a.m. about commuting habits, or asking only one class about school dinners.

**Informal inference.** A sample statistic (mean, proportion) estimates the population value. It will not be exact, and another sample would give a different estimate. Bigger random samples give more reliable estimates.

### Worked example

A sixth form has 500 students in Year 12 and 700 in Year 13. A stratified sample of 60 is wanted. How many from each year?

1. Total 1200. Year 12: 60 × 500/1200 = 25. Year 13: 60 × 700/1200 = 35.
2. Then take a simple random sample of 25 from the Year 12 list and 35 from the Year 13 list.

Describe how to take a systematic sample of 30 from a numbered list of 600 customers.

1. k = 600/30 = 20.
2. Choose a random start between 1 and 20, say 7, using a random number generator.
3. Take customers 7, 27, 47, ..., 587.

Describe how to take a simple random sample of 10 days from the 184 days in a data set.

1. Number the days 1 to 184.
2. Use a calculator's random integer function to generate numbers from 1 to 184.
3. Ignore repeats until there are 10 different numbers; select those days.

A researcher wants to estimate the mean time teenagers in a town spend on homework. She asks the first 40 students who leave the library on a Saturday. Name the method and give two criticisms.

1. Opportunity sampling.
2. Students at the library on a Saturday are likely to study more than average, so the estimate is likely to be too high.
3. Only one place and time is used, so students with jobs or other weekend commitments are missed. A random sample from a list of all teenagers in the town would be better.

Two students each take a random sample of 20 days from a data set and work out the mean daily rainfall. They get 1.8 mm and 2.6 mm. Explain why, and say how to get a more reliable estimate.

1. Random samples vary: each contains different days, so the sample means differ.
2. A larger sample (or combining the two samples into one of 40) gives a more reliable estimate of the population mean.

### Common mistakes

- Calling any sample "random" just because it was not planned. Random sampling needs a list and a random process.
- Forgetting to say how a random number generator is used and what happens to repeats.
- In stratified sampling, taking equal numbers from each stratum instead of proportional numbers.
- Criticising a method without linking the criticism to the context.

## Check questions

1. Explain the difference between a population and a sample, and give one reason for using a sample rather than a census. [2 marks]
2. Define a sampling frame and give an example of one for a survey of members of a gym. [2 marks]
3. A company has 240 office staff, 360 factory staff and 120 drivers. A stratified sample of 60 is required. How many from each group? [3 marks]
4. Describe how to select a systematic sample of 25 from a list of 500 names. [3 marks]
5. Give one advantage and one disadvantage of quota sampling compared with stratified sampling. [2 marks]
6. A council wants to know residents' views on a new bus route. It posts a survey on its website and analyses all replies. (a) Name this type of sample. (b) Explain why the results might be biased. [3 marks]
7. Explain why two random samples from the same population may lead to different conclusions, and how this effect can be reduced. [2 marks]
8. A student wants to estimate the mean daily maximum temperature at one weather station using 15 days from a data set of 184 days. She uses the first 15 days. Criticise this method and suggest a better one. [3 marks]

## Mark scheme

1. The population is the whole group of interest; a sample is a subset of it (1); one reason, e.g. cheaper, quicker, or testing would destroy every item (1).
2. A list of all members of the population from which the sample is drawn (1); e.g. the gym's membership list (1).
3. Total 720 (1); office 20, factory 30 (1); drivers 10 (1).
4. k = 500/25 = 20 (1); random start between 1 and 20 using random numbers (1); then every 20th name after it (1).
5. Advantage: no sampling frame needed / quick / cheap (1). Disadvantage: not random, so interviewer bias is possible (1).
6. (a) Self-selected (volunteer) sample (1). (b) Only people who visit the website and choose to reply are included (1); people with strong views, or regular bus users, are more likely to respond, so the sample may not represent all residents (1).
7. Each sample contains different members, so sample statistics vary (1); use larger samples (1).
8. The first 15 days all come from the start of the period, so they may be warmer or cooler than the rest (1); a simple random sample of 15 days, numbering days 1 to 184 and using random numbers (1); or a systematic sample with a random start (1).
