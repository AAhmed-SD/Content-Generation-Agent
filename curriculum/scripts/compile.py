"""Build one complete Markdown file per qualification from curriculum/notes.

Each qualification's notes are spread over shared files and pointed to by a map.
This script follows the map in that board's own order and writes every notes file
it points to, in full, into curriculum/compiled/<level>/<board>-<code>-<subject>.md.

Run from the repo root:  python3 -I curriculum/scripts/compile.py
The compiled files are generated. Edit the notes, never the compiled copies.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTES = ROOT / "notes"
OUT = ROOT / "compiled"

# level, board, code, subject, source: ("map", map path, code to find in ## headings or None for whole file)
#                                      or ("folders", [folder, ...]) for single-board folders in spec order
Q = [
    # GCSE, AQA
    ("gcse", "AQA", "8461", "Biology", ("folders", ["aqa/gcse/biology-8461"])),
    ("gcse", "AQA", "8462", "Chemistry", ("folders", ["aqa/gcse/chemistry-8462"])),
    ("gcse", "AQA", "8463", "Physics", ("folders", ["aqa/gcse/physics-8463"])),
    ("gcse", "AQA", "8464", "Combined Science Trilogy", ("folders", ["aqa/gcse/biology-8461", "aqa/gcse/chemistry-8462", "aqa/gcse/physics-8463"])),
    ("gcse", "AQA", "8465", "Combined Science Synergy", ("map", "gcse/aqa-synergy/map-8465.md", None)),
    ("gcse", "AQA", "8300", "Mathematics", ("map", "gcse/maths/map.md", "8300")),
    ("gcse", "AQA", "8382", "Statistics", ("map", "gcse/statistics/map.md", "8382")),
    ("gcse", "AQA", "8525", "Computer Science", ("map", "gcse/computer-science/map.md", "8525")),
    ("gcse", "AQA", "8852", "Engineering", ("map", "gcse/smaller-stem/engineering-aqa-8852/map.md", None)),
    # GCSE, Edexcel
    ("gcse", "Edexcel", "1BI0", "Biology", ("map", "gcse/edexcel-sciences/map-1BI0.md", None)),
    ("gcse", "Edexcel", "1CH0", "Chemistry", ("map", "gcse/edexcel-sciences/map-1CH0.md", None)),
    ("gcse", "Edexcel", "1PH0", "Physics", ("map", "gcse/edexcel-sciences/map-1PH0.md", None)),
    ("gcse", "Edexcel", "1SC0", "Combined Science", ("map", "gcse/edexcel-sciences/map-1SC0.md", None)),
    ("gcse", "Edexcel", "1MA1", "Mathematics", ("map", "gcse/maths/map.md", "1MA1")),
    ("gcse", "Edexcel", "1ST0", "Statistics", ("map", "gcse/statistics/map.md", "1ST0")),
    ("gcse", "Edexcel", "1CP2", "Computer Science", ("map", "gcse/computer-science/map.md", "1CP2")),
    ("gcse", "Edexcel", "1AS0", "Astronomy", ("map", "gcse/smaller-stem/astronomy-edexcel/map.md", None)),
    # GCSE, OCR
    ("gcse", "OCR", "J247", "Biology A Gateway", ("map", "gcse/ocr-a-sciences/map-j247.md", None)),
    ("gcse", "OCR", "J248", "Chemistry A Gateway", ("map", "gcse/ocr-a-sciences/map-j248.md", None)),
    ("gcse", "OCR", "J249", "Physics A Gateway", ("map", "gcse/ocr-a-sciences/map-j249.md", None)),
    ("gcse", "OCR", "J250", "Combined Science A Gateway", ("map", "gcse/ocr-a-sciences/map-j250.md", None)),
    ("gcse", "OCR", "J257", "Biology B Twenty First Century", ("map", "gcse/ocr-b-sciences/map-j257.md", None)),
    ("gcse", "OCR", "J258", "Chemistry B Twenty First Century", ("map", "gcse/ocr-b-sciences/map-j258.md", None)),
    ("gcse", "OCR", "J259", "Physics B Twenty First Century", ("map", "gcse/ocr-b-sciences/map-j259.md", None)),
    ("gcse", "OCR", "J260", "Combined Science B Twenty First Century", ("map", "gcse/ocr-b-sciences/map-j260.md", None)),
    ("gcse", "OCR", "J560", "Mathematics", ("map", "gcse/maths/map.md", "J560")),
    ("gcse", "OCR", "J277", "Computer Science", ("map", "gcse/computer-science/map.md", "J277")),
    # GCSE, Eduqas
    ("gcse", "Eduqas", "C300QS", "Mathematics", ("map", "gcse/maths/map.md", "C300QS")),
    ("gcse", "Eduqas", "C500QS", "Computer Science", ("map", "gcse/computer-science/map.md", "C500QS")),
    ("gcse", "Eduqas", "C490QS", "Electronics", ("map", "gcse/smaller-stem/electronics-eduqas/map.md", None)),
    ("gcse", "Eduqas", "C480QS", "Geology", ("map", "gcse/smaller-stem/geology-eduqas/map.md", None)),
    # A-level
    ("a-level", "AQA", "7402", "Biology", ("map", "a-level/biology/map.md", "7402")),
    ("a-level", "Edexcel", "9BN0", "Biology A Salters-Nuffield", ("map", "a-level/biology/map.md", "9BN0")),
    ("a-level", "Edexcel", "9BI0", "Biology B", ("map", "a-level/biology/map.md", "9BI0")),
    ("a-level", "OCR", "H420", "Biology A", ("map", "a-level/biology/map.md", "H420")),
    ("a-level", "OCR", "H422", "Biology B Advancing Biology", ("map", "a-level/biology/map.md", "H422")),
    ("a-level", "Eduqas", "A400QS", "Biology", ("map", "a-level/biology/map.md", "A400QS")),
    ("a-level", "AQA", "7405", "Chemistry", ("map", "a-level/chemistry/map.md", "7405")),
    ("a-level", "Edexcel", "9CH0", "Chemistry", ("map", "a-level/chemistry/map.md", "9CH0")),
    ("a-level", "OCR", "H432", "Chemistry A", ("map", "a-level/chemistry/map.md", "H432")),
    ("a-level", "OCR", "H433", "Chemistry B Salters", ("map", "a-level/chemistry/map.md", "H433")),
    ("a-level", "Eduqas", "A410QS", "Chemistry", ("map", "a-level/chemistry/map.md", "A410QS")),
    ("a-level", "AQA", "7408", "Physics", ("map", "a-level/physics/map.md", "7408")),
    ("a-level", "Edexcel", "9PH0", "Physics", ("map", "a-level/physics/map.md", "9PH0")),
    ("a-level", "OCR", "H556", "Physics A", ("map", "a-level/physics/map.md", "H556")),
    ("a-level", "OCR", "H557", "Physics B Advancing Physics", ("map", "a-level/physics/map.md", "H557")),
    ("a-level", "Eduqas", "A420QS", "Physics", ("map", "a-level/physics/map.md", "A420QS")),
    ("a-level", "AQA", "7357", "Mathematics", ("map", "a-level/maths/map.md", "7357")),
    ("a-level", "Edexcel", "9MA0", "Mathematics", ("map", "a-level/maths/map.md", "9MA0")),
    ("a-level", "OCR", "H240", "Mathematics A", ("map", "a-level/maths/map.md", "H240")),
    ("a-level", "OCR", "H640", "Mathematics B MEI", ("map", "a-level/maths/map.md", "H640")),
    ("a-level", "AQA", "7367", "Further Mathematics", ("map", "a-level/further-maths/map.md", "7367")),
    ("a-level", "Edexcel", "9FM0", "Further Mathematics", ("map", "a-level/further-maths/map.md", "9FM0")),
    ("a-level", "OCR", "H245", "Further Mathematics A", ("map", "a-level/further-maths/map.md", "H245")),
    ("a-level", "OCR", "H645", "Further Mathematics B MEI", ("map", "a-level/further-maths/map.md", "H645")),
    ("a-level", "Edexcel", "9ST0", "Statistics", ("map", "a-level/statistics/map.md", None)),
    ("a-level", "AQA", "7517", "Computer Science", ("map", "a-level/computer-science/map.md", "7517")),
    ("a-level", "OCR", "H446", "Computer Science", ("map", "a-level/computer-science/map.md", "H446")),
    ("a-level", "Eduqas", "A500QS", "Computer Science", ("map", "a-level/computer-science/map.md", "A500QS")),
    ("a-level", "AQA", "7447", "Environmental Science", ("map", "a-level/smaller-stem/environmental-science-aqa-7447/map.md", None)),
    ("a-level", "OCR", "H414", "Geology", ("map", "a-level/smaller-stem/geology-ocr-h414/map.md", None)),
    ("a-level", "Eduqas", "A490QS", "Electronics", ("map", "a-level/smaller-stem/electronics-eduqas-a490qs/map.md", None)),
    ("a-level", "Eduqas", "A480QS", "Geology", ("map", "a-level/smaller-stem/geology-eduqas-a480qs/map.md", None)),
]

LINK = re.compile(r"\]\(([^)\s#]+\.md)(?:#[^)]*)?\)")
FRONT = re.compile(r"\A---\n.*?\n---\n", re.S)


def topic_key(p: Path):
    nums = re.match(r"^(\d+)(?:\.(\d+))?", p.name)
    return (int(nums.group(1)), int(nums.group(2) or 0)) if nums else (999, 0)


def section_text(map_path: Path, code):
    text = map_path.read_text(encoding="utf-8")
    if code is None:
        return text
    out, keep = [], False
    for line in text.splitlines():
        if line.startswith("## "):
            keep = code.lower() in line.lower()
        if keep:
            out.append(line)
    return "\n".join(out)


def files_from_map(map_rel, code):
    map_path = NOTES / map_rel
    seen, files = set(), []
    for href in LINK.findall(section_text(map_path, code)):
        target = (map_path.parent / href).resolve()
        if target.name.startswith("map") or target.name == "README.md":
            continue
        if not target.exists():
            print(f"  missing link in {map_rel}: {href}", file=sys.stderr)
            continue
        if target not in seen:
            seen.add(target)
            files.append(target)
    return files


def main():
    OUT.mkdir(exist_ok=True)
    index = []
    for level, board, code, subject, src in Q:
        if src[0] == "folders":
            files = [p for folder in src[1] for p in sorted((NOTES / folder).glob("*.md"), key=topic_key)]
            map_note = "Files in spec order from " + ", ".join(f"`notes/{f}/`" for f in src[1])
        else:
            files = files_from_map(src[1], src[2])
            map_note = f"Order and contents follow `notes/{src[1]}`" + (f", section for {code}" if src[2] else "")
        slug = re.sub(r"[^a-z0-9]+", "-", f"{board}-{code}-{subject}".lower()).strip("-")
        out_path = OUT / level / f"{slug}.md"
        out_path.parent.mkdir(parents=True, exist_ok=True)
        level_name = "GCSE" if level == "gcse" else "A-level"
        parts = [
            f"# {board} {level_name} {subject} ({code})\n",
            "Complete notes for this qualification, generated from `curriculum/notes` by `curriculum/scripts/compile.py`. "
            "Do not edit this file; edit the notes and run the script again. Spec references are not yet checked by a person (`refs_checked: false`).\n",
            f"{map_note}. {len(files)} notes files.\n",
        ]
        if src[0] == "map":
            parts.append("## Spec map\n\n" + section_text(NOTES / src[1], src[2]).strip() + "\n")
        for f in files:
            body = FRONT.sub("", f.read_text(encoding="utf-8")).strip()
            body = re.sub(r"^(#+) ", lambda m: "#" + m.group(1) + " ", body, flags=re.M)  # push headings down one level
            parts.append(f"<!-- source: notes/{f.relative_to(NOTES)} -->\n\n{body}\n")
        out_path.write_text("\n".join(parts), encoding="utf-8")
        words = len(out_path.read_text(encoding="utf-8").split())
        index.append((level_name, board, subject, code, out_path.relative_to(ROOT), len(files), words))
        print(f"{level_name:7} {board:8} {code:7} {len(files):3} files {words:7} words  {out_path.relative_to(ROOT)}")

    lines = [
        "# Compiled qualifications\n",
        "One complete file per qualification, generated by `curriculum/scripts/compile.py` from the notes and maps in `curriculum/notes`. "
        "Each file holds that board's spec map, then every notes file that covers it, in the board's order. Do not edit these files.\n",
        "| Level | Board | Subject | Code | File | Notes files | Words |",
        "| --- | --- | --- | --- | --- | --- | --- |",
    ]
    for level_name, board, subject, code, rel, n, w in index:
        lines.append(f"| {level_name} | {board} | {subject} | {code} | [{rel.name}]({rel.relative_to('compiled').as_posix()}) | {n} | {w:,} |")
    (OUT / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{len(index)} qualifications compiled")


if __name__ == "__main__":
    main()
