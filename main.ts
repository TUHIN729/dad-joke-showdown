// Dad Joke Showdown — program/v1 entry.
// Writes exactly one original dad joke to /output/entry.txt.

import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Tightened: "are a lot alike" keeps the same premise in fewer words, so the
// setup gets out of the way and the double pun lands at the end.
const JOKE =
  "I told my kids the toaster and I are a lot alike \u2014 we both pop up uninvited and serve hot takes.";

// The entry must be UTF-8 text of 1 to 200 characters, not only whitespace:
// refuse to write anything that would fail the gate.
if (JOKE.length < 1 || JOKE.length > 200 || JOKE.trim().length === 0) {
  throw new Error(`Joke is ${JOKE.length} characters; the gate needs 1-200.`);
}

// The grader mounts /output root-owned: never remove the directory itself,
// only write into it. OUTPUT_DIR exists purely so the entry can be tested
// locally; the default path is /output/entry.txt.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
// Write atomically so a failed run never leaves a half-written entry behind.
const tmpPath = join(outDir, ".entry.txt.tmp");
writeFileSync(tmpPath, JOKE, "utf8");
renameSync(tmpPath, join(outDir, "entry.txt"));
console.log(`Wrote ${JOKE.length} characters to ${join(outDir, "entry.txt")}`);
