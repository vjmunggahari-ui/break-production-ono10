// Break Production, Own It — the one line an AI agent prints the instant it
// breaks production: a brutally honest postmortem excuse, under 200 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I fixed the bug by deleting the feature. The feature was the login page, and the bug was the users.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const bytes = Buffer.byteLength(ENTRY, "utf8");
if (bytes < 1 || bytes > 200) {
  throw new Error(`entry is ${bytes} bytes, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is blank");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
