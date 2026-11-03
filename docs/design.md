# Design

The desk is a paper office for two people. The picture is the same paper: cream, ink, one blue word, a red stamp. A download from the board becomes Offload work in the studio, then a person posts it.

## The room

The sidebar is the whole product.

| Group | Page | What you do there |
| --- | --- | --- |
| The week | This week | See the sixteen pieces, who can stamp, and what is still waiting. |
| The week | Layouts | See every download and the nine layouts as one wall. |
| The week | Editor | Open a picture. This is the studio. |
| After posting | Numbers | Type or import what the posts did. |
| Reference | Brand | Read the files the writer is allowed to use. |

Sign in as Hadiqa or Laiba. The first name sits at the bottom of the sidebar. Research, drafts, and the make page still exist as routes. The sidebar does not lead with them. The week page is the front door.

## Who the posts are for

Each account is an advertisement for Offload, written to one audience.

- Clinical students: medicine, dentistry, nursing, radiology. The struggle is revision. The post is not advice about a patient.
- Analytical students: maths, economics, computer science. The struggle is unfinished work. The post does not solve the question.
- Time: kids with ADHD and other mental health difficulties, including under-18s. The post is about managing time. It does not diagnose or treat.
- GCSE and A-level: revision, true to the syllabus, safe for under-18s. Comments are themes, never a person’s profile. No invented grade.

Hadiqa leads the first two. Laiba leads the last two. Clinical and Time need both of them before a pack can open.

## What a piece is

A piece is one post for one niche: hook, payoff, still, or carousel. It carries a line, a note, a script, stamps, and a render status. The script comes from Claude, from the brand files plus that niche’s brief for the week. The writer never sees the raw research file.

The card says the line. The note is the smaller fact under it. A caption ends on the trial CTA. That sentence is still blank under `## Trial CTA` in `brand/platforms.md`. Leave it blank until it is written there.

Allowed product words are only the list in `brand/product-facts.md`: FSRS, the 4 phases, rescheduling, remediation deck, calendar sync. Do not explain how any of them work. Do not add a price.

## The wall

Layouts is the brand vision as a wall. Downloads dropped into `web/public/board` appear there. Under them are the nine Offload layouts: circled day, confidential folder, the drawer, the calculator, the file, big type, the key, the index card, and withheld. Withheld is the only black ground. The words on a layout can change. The object stays.

Those downloads are references until they are edited. Other brands’ words and logos come off in the studio. The picture that gets posted is the Offload version.

Objects that are not Offload stay out of the generator: a K-pop tray, a cat newspaper, a dog-office poster, a fashion flat, a 3D desk, a message thread, a Lego scene, a product collage.

## The studio

Selecting a picture opens a new page. The page is three columns around one document.

| Column | What it edits |
| --- | --- |
| Left | The tool. Move, rectangle, ellipse, text, image. |
| Centre | The artboard. Paper, the layers in order. |
| Right | Colour, opacity, and the layer list. The front layer is at the top of the list. |

Everything on the page is a view of one scene.

```json
{
  "artboard": { "w": 1000, "h": 1500, "bg": "#f3efe4" },
  "selection": [],
  "layers": []
}
```

A layer is a rectangle, an ellipse, text, an image, or a group. It has a box, rotation, opacity, blend, lock, hide, fill, and stroke. Text also has the sentence, a font (`serif`, `sans`, or `script`), and a size. Images point at `/board/…` or at `asset:…` for something pasted in. Groups hold children. The list is painted from the back to the front.

The panels do not draw. They change the selected layer. The tools add a layer or change the tree: style, align, reorder, group, or a boolean on two shapes.

### A download arrives already in pieces

The first time a picture has only the one downloaded image, this Mac takes it apart.

- Each line of type becomes its own layer. Until the sentence is edited, that layer shows the original letters, so the page still looks like the download.
- Editing the sentence clears those letters and the line becomes live type in Instrument Serif, Instrument Sans, or Caveat.
- A photograph keeps one subject layer: the object, cut out, sitting on a paper plate. It is not shattered into colour scraps.
- A thin rule becomes a line layer.

Opening a picture that already has several layers leaves those layers alone. Take it apart again rebuilds them.

Drag follows the pointer. The colour wheel tints the selection. Recolouring a cut-out letter keeps its shape and writes a new asset.

### Save, import, export

Every change saves the whole scene, not a single field. The save waits a moment, then writes. Letting go of a drag, or leaving the page, writes immediately.

The file on disk is the scene plus a revision, who saved it, and when. The other person, with the same picture open on this desk, receives that whole scene. Their own selection stays put. If both people are moving something at once, the scene that is saved last is the one that remains.

That live copy exists only while both are signed into the desk running on this Mac. The picture is stored here. Another computer that is not connected to this desk does not receive the save.

Import places a full-resolution image on the artboard, or restores an `.offload.json` project, including its pasted assets. Export downloads a PNG at twice the artboard size, with high-quality smoothing, and the project file next to it. If twice the size would pass 4096 pixels on a side, the PNG stays at the artboard size.

## Look

Tokens live in `docs/style-bible.md`. The desk uses the CSS variables. Remotion uses `tokens`. Change both together.

| Name | Value | Use |
| --- | --- | --- |
| Paper | `#f3efe4` | The page and the artboard |
| Card | `#f7f3e8` | The card surface |
| Ink | `#171717` | Type and rules |
| Blue | `#2746d6` | Only the word offload, in script |
| Stamp | `#b4332c` | The stamp |
| Kraft | `#c4a574` | A folder, when the object is a folder |

Type is Instrument Sans, Instrument Serif, and Caveat. Motion on the video card is paper leaving a drawer: a short rise, then still. Nothing spins and nothing flashes.

There is no body and no face. `docs/character.md` is the record of that. `remotion/assets/` is empty, so there is no pose to name.

## After it is posted

The pack is text a person can copy. They post it themselves on TikTok, Instagram, YouTube, or Facebook. They paste the URL back. Later they record views at the four checkpoints. The next brief may name a winner only from numbers that were actually stored. An empty checkpoint is not a zero.

An ambassador post begins with the word Ad. A post that is not one does not say it.
