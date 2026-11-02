import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [id, propsPath, outputPath, deskPath, logPath] = process.argv.slice(2);

function update(status, error) {
  const pieces = JSON.parse(readFileSync(deskPath, "utf8"));
  const piece = pieces.find((item) => item.id === id);
  if (!piece) return;
  piece.render = {
    status,
    file: status === "ready" ? outputPath : piece.render?.file ?? "",
    error: error ?? "",
    at: new Date().toISOString(),
  };
  writeFileSync(deskPath, JSON.stringify(pieces, null, 2));
}

const props = JSON.parse(readFileSync(propsPath, "utf8"));
const still = props.format === "still";
const args = still
  ? ["remotion", "still", "src/index.ts", "OffloadCard", outputPath, "--frame=0", `--props=${propsPath}`]
  : ["remotion", "render", "src/index.ts", "OffloadCard", outputPath, `--props=${propsPath}`];

const result = spawnSync("npx", args, {
  cwd: path.dirname(fileURLToPath(import.meta.url)),
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});

const log = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.slice(-4000);
writeFileSync(logPath, log);
if (result.status === 0) update("ready", "");
else update("failed", (result.stderr || result.stdout || "Remotion failed").slice(-500));
