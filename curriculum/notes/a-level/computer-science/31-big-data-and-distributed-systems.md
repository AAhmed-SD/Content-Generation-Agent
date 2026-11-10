---
level: A-level
subject: Computer Science
topic: "Big Data: volume, velocity, variety; distributed processing and functional programming; fact-based models and graph schemas; predictive analytics, data warehousing and data mining; distributed databases"
as_content: "A-level only for AQA (4.11)."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.11.1"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.5: Big Data", "C2.5: Distributed systems"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Big Data and distributed systems

This file covers what Big Data is (volume, velocity, variety), why its lack of structure is the hardest part, why its processing must be distributed and why functional programming helps, the fact-based model and graph schemas, and (for Eduqas) predictive analytics, data warehousing, data mining, and distributed data and processing. Functional programming itself is in [32-functional-programming.md](32-functional-programming.md); relational databases in [30](30-databases-normalisation-and-sql.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Big Data | Volume, velocity, variety; unstructured data; machine learning; distributed processing and functional programming; fact-based model; graph schema | Data mining is a computational method (2.2.2, file 11) | Big Data, predictive analytics, data warehousing, data mining |
| Distribution | Processing across more than one machine | Not named | Distribution of data and processing; distributed databases and their advantages |

## 4.11.1 Big Data

*Refs: AQA 4.11.1 · Eduqas C2.5: Big Data.*

### What you need to know

- "Big Data" is a catch-all term for data that will not fit the usual containers: it is too large, too fast or too varied to store and analyse with ordinary tools (a single server and a relational database). It is described by three Vs:
  - Volume: too big to fit on a single server (terabytes to petabytes and more).
  - Velocity: data arrives continuously as a stream and must be processed quickly, with responses needed within milliseconds to seconds (sensor networks, smartphones, video surveillance, mouse clicks, financial trades, social media).
  - Variety: data comes in many forms: structured (tables), semi-structured (JSON, logs), and unstructured (text, images, video, audio).
- The hardest part is often the lack of structure, not the size:
  - analysis is much more difficult;
  - relational databases are not appropriate, because they need data to fit rows and columns with a fixed schema;
  - machine learning techniques are needed to find patterns and extract useful information.
- Size matters when data does not fit on one server, because relational databases do not scale well across multiple machines (joins and transactions across servers are slow and complex).
- So the processing must be distributed across many machines (a cluster), each working on part of the data in parallel, with the results combined (for example the MapReduce approach: map a function over each machine's share of the data, then reduce the partial results into one answer).
- Functional programming is a solution because it makes it easier to write correct and efficient distributed code:
  - immutable data structures: data is never changed in place, so several machines can work on the same data without one corrupting another's copy, and there is no need for locks;
  - statelessness: functions have no side effects and their result depends only on their inputs, so any machine can run any piece of work in any order, and a failed piece can simply be re-run elsewhere, giving the same answer;
  - higher-order functions such as map, filter and reduce (fold) express "do this to every item" and "combine the results", which split naturally across machines.
  These features make code easier to reason about and test (correct), and safe to split up (distributable).

### Fact-based model and graph schema

- In a fact-based model, each fact captures a single piece of information, for example "user 17 lives in Leeds (recorded 2025-03-01)". Facts are never updated or deleted; new facts are added, each with a timestamp, so the full history is kept and data is immutable. Benefits: errors can be corrected by adding new facts and nothing is ever lost; queries can find the state at any time; it fits distributed, append-only storage.
- A graph schema captures the structure of the dataset as a graph:
  - nodes represent entities (a person, a page, a product);
  - edges represent relationships between entities (follows, likes, bought);
  - properties hold information about nodes (and sometimes edges), for example a person's name or age.
- Graph schemas are diagrams with nodes as ovals or circles, edges as labelled lines, and properties as rectangles attached to their node. They are flexible (new kinds of node or edge are easy to add) and suit highly connected data such as social networks.

### Worked example

A video platform records billions of view events a day from phones, TVs and browsers (velocity), with comments, thumbnails and video files (variety), totalling petabytes (volume). A relational database on one server could not store or query it fast enough.

Fact-based records:

```
(user: 17, watched: video 902, at: 2025-11-04T19:02:11)
(user: 17, liked: video 902, at: 2025-11-04T19:10:40)
(user: 17, unliked: video 902, at: 2025-11-05T08:00:03)
```

The unlike does not delete the like; it is a new fact. The current state is worked out from all the facts.

Graph schema (in words): node User (properties name, joined); node Video (properties title, length); edges User –watched→ Video, User –liked→ Video, User –follows→ User.

Distributed count of views per video using map and reduce:

```python
from functools import reduce
from collections import Counter

# each machine has its own chunk of the log
chunks = [["v1", "v2", "v1"], ["v2", "v2"], ["v1", "v3"]]

# map step (runs on each machine independently, no shared state)
partials = list(map(Counter, chunks))

# reduce step (combine partial counts)
total = reduce(lambda a, b: a + b, partials)
print(total)   # Counter({'v2': 3, 'v1': 3, 'v3': 1})
```

## Predictive analytics, data warehousing and data mining

*Refs: Eduqas C2.5: Big Data.*

### What you need to know

- Data warehousing: copying data from many separate operational systems (sales, stock, website, customer service) into one large central store, cleaned and organised for analysis rather than for day-to-day transactions. Data is usually historical, read-only and summarised by subject and time. Supports reports and decision making.
- Data mining: searching large data sets to find hidden patterns, relationships and trends, using statistics and machine learning: for example customers who buy nappies often also buy certain snacks; unusual card transactions that suggest fraud.
- Predictive analytics: using historical data, statistics and machine learning models to predict future events or behaviour: likely sales next month, which customers may leave, a patient's risk of illness, when a machine part will fail.
- Benefits: better decisions, targeted marketing, fraud detection, efficiency. Concerns: privacy and consent, bias in data and models, security of huge data stores, and the cost of storage and processing (see file 26).

## Distributed systems

*Refs: Eduqas C2.5: Distributed systems.*

### What you need to know

- Distribution can apply to both data and processing:
  - distributed processing: a task is split across several computers that work in parallel and communicate over a network (clusters, grid computing, cloud services);
  - distributed data: data is stored across several sites or servers rather than one.
- A distributed database stores parts or copies of the database at several sites connected by a network, but appears to users as a single database. Data may be partitioned (each site holds part, often the part it uses most) or replicated (copies at several sites).
- Advantages: data is near the users who need it, so faster local access and less network traffic; more reliable (if one site fails, others carry on; replicas act as backups); scalable (add more servers); can reflect the structure of an organisation with branches.
- Disadvantages: more complex to design and manage; keeping replicas consistent is hard (updates must reach every copy); security must be enforced at every site; network failures can make some data unavailable.

## Common mistakes

- Defining Big Data only as "a lot of data". Velocity and variety, and the lack of structure, matter too.
- Saying functional programming is used "because it is faster". It is used because immutability and statelessness make distributed code easier to write correctly.
- Saying facts in a fact-based model are updated. They are immutable; new facts are added.

## Check questions

1. Describe the three Vs of Big Data, with an example of each. [6 marks]
2. Explain why relational databases are often unsuitable for Big Data. [3 marks]
3. Explain why machine learning is needed to analyse Big Data. [2 marks]
4. Explain three features of functional programming that make it suitable for processing Big Data across many servers. [6 marks]
5. Describe the fact-based model for representing data and one advantage of it. [3 marks]
6. Draw a graph schema for a music streaming service with users, songs and artists, showing nodes, edges and properties. [4 marks]
7. (Eduqas) Explain the difference between data warehousing and data mining. [2 marks]
8. (Eduqas) Give an example of predictive analytics and one concern about its use. [2 marks]
9. (Eduqas) Describe what a distributed database is and give two advantages and one disadvantage. [4 marks]

## Mark scheme

1. Volume: data too large for one server (1), e.g. years of video uploads (1). Velocity: data arriving as a fast stream needing quick response (1), e.g. sensor or click data (1). Variety: many forms, structured and unstructured (1), e.g. text, images and video together (1).
2. Need data to fit a fixed row-and-column schema, but Big Data is unstructured/varied (1); do not scale well across multiple machines (1); joins/transactions across servers are slow (1).
3. The data is too large and unstructured for people or simple queries to find patterns (1); machine learning can detect patterns and extract useful information automatically (1).
4. Immutable data: cannot be changed, so machines cannot corrupt each other's data/no locking needed (2). Stateless/no side effects: result depends only on inputs, so tasks can run anywhere, in any order, and be re-run if a machine fails (2). Higher-order functions: map/filter/reduce split work across machines and combine results (2).
5. Each fact records a single piece of information, usually with a timestamp (1); facts are immutable: never changed or deleted, only added (1); advantage: full history kept/errors corrected without data loss/suits distributed storage (1).
6. Nodes User, Song, Artist (1); edges such as User–listened to→Song, User–follows→Artist, Artist–performed→Song (1); properties on nodes such as name, title, duration (1); clear labelled diagram (1).
7. Data warehousing collects and stores data from many systems in one central store for analysis (1); data mining searches large data sets to find hidden patterns/relationships (1).
8. Example: predicting which customers will cancel/sales forecasts/patient risk (1); concern: privacy/bias/accuracy/consent (1).
9. Database stored across several sites/servers but appearing as one database (1). Advantages: faster local access; reliability if one site fails; scalability (2). Disadvantage: complexity/keeping copies consistent/security at many sites (1).
