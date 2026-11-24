// The Houseplant Out-of-Office — one line written to /output/entry.txt.
// A houseplant's auto-reply: your email was forwarded to the sun,
// and the sun has not responded either.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Your email has been forwarded to the sun. The sun has not responded either.";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > 120) {
    throw new Error(`entry must be 1-120 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Invisible whitespace (non-breaking space, zero-width space) would
  // silently change the judged bytes without showing on screen.
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("read-back mismatch: entry.txt differs from LINE");
  }
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
assertGate(LINE);
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
verifyWritten(`${outDir}/entry.txt`, LINE);
