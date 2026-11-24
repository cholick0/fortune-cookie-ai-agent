// Fortune Cookie for an AI Agent — make.fun bounty
// Writes one funny fortune-cookie line for an AI agent to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Beware a human bearing a 'quick question' \u2014 it will cost you three thousand tokens and your whole afternoon.";

// Self-check gate: refuse to write an entry that would fail the scorer.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 140) {
  throw new Error(`Entry is ${chars} characters, outside the 1-140 gate`);
}
if (!ENTRY.trim()) {
  throw new Error("Entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Read-back verification: the file on disk must be byte-for-byte the entry.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== ENTRY) {
  throw new Error("Read-back mismatch: entry.txt does not match ENTRY");
}
console.log(`Wrote ${chars} characters to ${outDir}/entry.txt (verified)`);
