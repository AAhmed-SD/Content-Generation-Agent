// Render posts and carousels.
//
//   node scripts/stills.mjs                  every post and every carousel
//   node scripts/stills.mjs <id> [<id> ...]  only the posts or carousels named
//
// A post is src/world/posters/posts/<id>.json: { "template": "Poster" | "PhotoPoster", "props": { ... } }
//   → out/posts/offload-<id>.png
// A carousel is src/world/posters/carousels/<id>.json: { "handle": "offload.clinical", "slides": [ ... ] }
//   → out/carousels/<id>/01.png, 02.png, ...
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const named = process.argv.slice(2);
const list = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).filter((id) => !named.length || named.includes(id)).sort() : []);
let failed = 0;

const still = (template, props, file, label) => {
  const tmp = path.join(path.dirname(file), `.${path.basename(file, ".png")}.props.json`);
  writeFileSync(tmp, JSON.stringify(props));
  const run = spawnSync("npx", ["remotion", "still", "src/world/index.ts", template, file, `--props=${tmp}`, "--log=error"], { cwd: root, encoding: "utf8" });
  if (run.status === 0) console.log(`ok ${label}`);
  else { failed++; console.log(`FAIL ${label}\n${run.stderr.slice(-600)}`); }
};

const posts = path.join(root, "src", "world", "posters", "posts");
mkdirSync(path.join(root, "out", "posts"), { recursive: true });
for (const id of list(posts)) {
  const post = JSON.parse(readFileSync(path.join(posts, `${id}.json`), "utf8"));
  still(post.template, post.props, path.join(root, "out", "posts", `offload-${id}.png`), id);
}

const carousels = path.join(root, "src", "world", "posters", "carousels");
for (const id of list(carousels)) {
  const c = JSON.parse(readFileSync(path.join(carousels, `${id}.json`), "utf8"));
  const dir = path.join(root, "out", "carousels", id);
  mkdirSync(dir, { recursive: true });
  c.slides.forEach((slide, i) => {
    still("Slide", { slide, page: i + 1, total: c.slides.length, handle: c.handle }, path.join(dir, `${String(i + 1).padStart(2, "0")}.png`), `${id} ${i + 1}/${c.slides.length}`);
  });
}
process.exit(failed ? 1 : 0);
