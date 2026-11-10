---
level: A-level
subject: Computer Science
topic: "Web technologies: HTML, CSS and JavaScript, search engine indexing, the PageRank algorithm, and server-side and client-side processing"
as_content: "OCR: HTML, CSS and JavaScript are also AS; search engine indexing, PageRank and server/client-side processing (1.3.4(b) to (d)) are A-level only."
boards:
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.4(a)", "1.3.4(b)", "1.3.4(c)", "1.3.4(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.7: Internet and Intranet"]
refs_checked: false
spec_urls:
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-ocr/
---

# Web technologies

This file covers writing and reading HTML, CSS and JavaScript at the level OCR examines, how search engines index the web, the PageRank algorithm with a worked calculation, and server-side versus client-side processing. AQA covers web servers, browsers, REST and JSON in [29-tcp-ip-addressing-and-client-server.md](29-tcp-ip-addressing-and-client-server.md); Eduqas's use of search engines and internet applications is here and in [37-software-systems-and-applications.md](37-software-systems-and-applications.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| HTML, CSS, JavaScript | JavaScript and HTML named in the REST context only | Write and interpret HTML, CSS and JavaScript (the spec appendix lists the tags and features) | Mark-up languages as a paradigm (file 02) |
| Search engines | Not named | Indexing; PageRank | Use of search engines on the internet |
| Processing | Thin vs thick clients | Server-side and client-side processing | Not named |

## HTML, CSS and JavaScript

*Refs: OCR 1.3.4(a).*

### What you need to know

HTML (HyperText Markup Language) describes the structure and content of a web page using tags. Tags OCR expects you to know:

| Tag | Meaning |
| --- | --- |
| `<html>`, `<head>`, `<body>` | Whole document; metadata section; visible content |
| `<title>` | Page title shown in the browser tab |
| `<link>` | Links an external resource, usually a CSS file: `<link href="style.css" rel="stylesheet">` |
| `<h1>` to `<h6>` | Headings |
| `<p>` | Paragraph |
| `<img src="..." alt="..." height="..." width="...">` | Image |
| `<a href="...">` | Hyperlink |
| `<div>` | A block-level container for grouping and styling |
| `<ol>`, `<ul>`, `<li>` | Ordered list, unordered list, list item |
| `<form>`, `<input type="text">`, `<input type="submit">` | Form, text box, submit button |
| `<script>` | JavaScript code, inline or `src="file.js"` |

Attributes: `id` (unique name for one element) and `class` (a name shared by a group of elements) are used to target elements from CSS and JavaScript.

CSS (Cascading Style Sheets) describes how elements look: colour, fonts, size, borders, layout. Styles can be inline (`style=` attribute), internal (`<style>` in the head) or external (a separate .css file, linked): external sheets let one file style every page, so a site looks consistent and is changed in one place.

- Selectors: element (`h1 { }`), class (`.warning { }`), id (`#menu { }`).
- Properties to know: `background-color`, `border-color`, `border-style`, `border-width`, `color`, `font-family`, `font-size`, `height`, `width`. Colours as names or hex (`#FF8800`).
- "Cascading": when several rules apply, the more specific one (id beats class beats element) or later one wins.

JavaScript is a programming language run by the browser to make pages interactive: responding to events (clicks, typing), validating forms before they are sent, changing the page content and styles, and fetching data. OCR expects: variables, selection and loops, and changing an element's content with `document.getElementById("x").innerHTML = ...`, writing to the page, and `alert()` boxes.

### Worked example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Revision quiz</title>
  <link href="style.css" rel="stylesheet">
</head>
<body>
  <h1 id="top">Quick quiz</h1>
  <p class="note">Enter a mark from 0 to 100.</p>
  <form>
    <input type="text" id="mark">
    <input type="submit" value="Check" onclick="checkMark(); return false;">
  </form>
  <p id="result"></p>
  <ul>
    <li><a href="topics.html">Topics</a></li>
    <li><a href="https://example.org">Help</a></li>
  </ul>
  <script>
    function checkMark() {
      var m = parseInt(document.getElementById("mark").value);
      var msg;
      if (isNaN(m) || m < 0 || m > 100) {
        msg = "Please enter a whole number from 0 to 100";
      } else if (m >= 70) {
        msg = "Grade A";
      } else {
        msg = "Keep going";
      }
      document.getElementById("result").innerHTML = msg;
    }
  </script>
</body>
</html>
```

style.css:

```css
h1      { color: #1A3C6E; font-family: Arial, sans-serif; font-size: 32px; }
.note   { color: grey; }
#result { border-style: solid; border-width: 2px; border-color: green; width: 300px; }
```

## Search engine indexing

*Refs: OCR 1.3.4(b) · Eduqas C2.7: Internet and Intranet.*

### What you need to know

- A search engine cannot search the whole web live for every query, so it builds an index in advance.
- Crawling: programs called crawlers (spiders, bots) visit web pages, read their content, follow every link to find new pages, and revisit pages to spot changes. Site owners can ask crawlers to skip pages with a robots.txt file.
- Indexing: the content of each page is processed (words, their positions, headings, titles, metadata, links, images' alt text) and stored in an inverted index: for each word, a list of the pages (and positions) where it appears. Like the index at the back of a book.
- Searching: when a user enters a query, the engine looks up the query words in the index to find matching pages quickly, then ranks them by relevance and importance (PageRank and many other signals: how often and where the words appear, freshness, location, the user's language) and shows the best first.
- Eduqas: using search engines effectively: choose specific keywords, use quotation marks for exact phrases, exclude words, filter by date or site, and judge reliability of results.

### Worked example

Pages: P1 "cats and dogs", P2 "dogs bark", P3 "cats sleep". Inverted index: cats → P1, P3; dogs → P1, P2; bark → P2; sleep → P3; and → P1. A search for "cats dogs" intersects the lists: P1.

```python
pages = {"P1": "cats and dogs", "P2": "dogs bark", "P3": "cats sleep"}
index = {}
for page, text in pages.items():
    for word in text.split():
        index.setdefault(word, set()).add(page)
print(index["cats"] & index["dogs"])    # {'P1'}
```

## The PageRank algorithm

*Refs: OCR 1.3.4(c).*

### What you need to know

- PageRank, devised for Google, measures how important a page is from the links pointing to it. Each link is like a vote; a vote from an important page counts more; a page's vote is split equally among all the pages it links to.
- Formula: PR(A) = (1 − d) + d × (PR(T₁)/C(T₁) + … + PR(Tₙ)/C(Tₙ)), where T₁ … Tₙ are the pages that link to A, C(T) is the number of outbound links on page T, and d is the damping factor, usually 0.85 (the probability that a random surfer keeps clicking links rather than jumping to a random page).
- The values are calculated iteratively: start every page with the same value (for example 1), apply the formula repeatedly using the latest values, and stop when the values stop changing much (they converge).
- PageRank is only one of many factors in modern ranking; it can be manipulated by link farms, which search engines try to detect.

### Worked example

Three pages: A links to B and C; B links to C; C links to A. d = 0.85. Start: PR(A) = PR(B) = PR(C) = 1. Update in the order A, B, C using the latest values.

Iteration 1:

- PR(A) = 0.15 + 0.85 × (PR(C)/1) = 0.15 + 0.85 × 1 = 1.
- PR(B) = 0.15 + 0.85 × (PR(A)/2) = 0.15 + 0.85 × 0.5 = 0.575.
- PR(C) = 0.15 + 0.85 × (PR(A)/2 + PR(B)/1) = 0.15 + 0.85 × (0.5 + 0.575) = 0.15 + 0.91375 = 1.06375.

Iteration 2:

- PR(A) = 0.15 + 0.85 × 1.06375 ≈ 1.054.
- PR(B) = 0.15 + 0.85 × (1.054 ÷ 2) ≈ 0.598.
- PR(C) = 0.15 + 0.85 × (0.527 + 0.598) ≈ 1.106.

After more iterations the values settle (around A 1.16, B 0.64, C 1.19). C ranks highest: it is linked from both other pages.

```python
links = {"A": ["B", "C"], "B": ["C"], "C": ["A"]}
pr = {p: 1.0 for p in links}
d = 0.85
for _ in range(50):
    for p in links:
        incoming = [q for q in links if p in links[q]]
        pr[p] = (1 - d) + d * sum(pr[q] / len(links[q]) for q in incoming)
print({p: round(v, 2) for p, v in pr.items()})
```

## Server-side and client-side processing

*Refs: OCR 1.3.4(d).*

### What you need to know

- Client-side processing: code (usually JavaScript) is sent to and run by the user's browser.
  - Uses: checking form input before it is sent (validation for convenience), interactive effects, animations, updating parts of the page without reloading.
  - Advantages: immediate response with no round trip to the server; reduces server load and network traffic; works for simple tasks offline.
  - Disadvantages: the code is visible to the user and can be changed or disabled, so it cannot be trusted for security; depends on the browser and device's power and compatibility.
- Server-side processing: code (in languages such as PHP, Python, Node.js, Java) runs on the web server; the result, usually an HTML page or JSON, is sent to the browser.
  - Uses: accessing databases (logins, searching products, storing orders), processing payments, generating personalised pages, secure validation.
  - Advantages: code and data are hidden from users, so more secure; does not depend on the client's browser or power; central data is consistent.
  - Disadvantages: every action needs a request to the server (slower response); heavy load on the server with many users.
- Good practice: validate on the client for a quick response and again on the server for security, because client-side checks can be bypassed (and malicious input could lead to SQL injection).

## Common mistakes

- Confusing `id` (unique, `#`) with `class` (shared, `.`).
- Saying CSS adds interactivity. CSS controls appearance; JavaScript adds behaviour.
- Saying PageRank counts the number of links. It weights each link by the linking page's own rank, divided by its number of outgoing links.
- Relying on client-side validation alone for security.

## Check questions

1. Write HTML for a page with the title "Club", a heading "Welcome", a paragraph with class "intro", an image cat.jpg 200 pixels wide, and a link to join.html. [5 marks]
2. Write CSS to make all paragraphs with class "intro" blue, in 14px Verdana, and give the element with id "box" a 3px dashed red border. [3 marks]
3. Write JavaScript that, when a button calls `double()`, reads a number from the input with id "n" and shows twice its value in the element with id "out". [3 marks]
4. Explain the benefit of using an external style sheet. [2 marks]
5. Describe how a search engine builds and uses an index. [4 marks]
6. Explain the purpose of the damping factor in PageRank. [2 marks]
7. Pages X and Y link to each other only. Z links to X only. Starting from PR = 1 for all and d = 0.85, calculate one iteration in the order X, Y, Z. [4 marks]
8. Explain why a page with few incoming links can still have a high PageRank. [2 marks]
9. Compare client-side and server-side processing for an online shop's checkout. [4 marks]
10. Explain why form data should be validated on the server even if it has been validated in the browser. [2 marks]

## Mark scheme

1. html/head/title (1); h1 Welcome (1); `<p class="intro">` (1); `<img src="cat.jpg" width="200">` (1); `<a href="join.html">…</a>` (1).
2. `.intro { color: blue; font-size: 14px; font-family: Verdana; }` (2: selector and properties); `#box { border-style: dashed; border-width: 3px; border-color: red; }` (1).
3. Function reads `document.getElementById("n").value` and converts it to a number (1); doubles it (1); sets `document.getElementById("out").innerHTML` (1).
4. One file styles every page, so consistent appearance (1); changes made once in one place/less repeated code/smaller pages (1).
5. Crawlers visit pages and follow links to find new ones (1); page content (words, positions, metadata) is recorded (1); in an inverted index mapping words to the pages that contain them (1); queries look up the index and the results are ranked (e.g. by PageRank) (1).
6. Models the probability that a user keeps following links rather than jumping to a random page (1); stops pages accumulating unlimited rank and helps the values converge (1).
7. PR(X) = 0.15 + 0.85 × (PR(Y)/1 + PR(Z)/1) = 0.15 + 0.85 × 2 = 1.85 (1 working, 1 answer). PR(Y) = 0.15 + 0.85 × (1.85/1) = 1.7225 (1). PR(Z) = 0.15 (no incoming links) (1).
8. Its incoming links come from pages with high PageRank (1); and those pages have few outgoing links, so each passes on a large share (1).
9. Client-side: quick checks of form entries without waiting, less server load, but can be bypassed/visible code (2). Server-side: secure processing of payments and stock/database access, code hidden, but slower and higher server load (2).
10. Client-side code can be disabled or altered/requests can be sent directly to the server (1); so malicious or invalid data (e.g. SQL injection) could reach the database (1).
