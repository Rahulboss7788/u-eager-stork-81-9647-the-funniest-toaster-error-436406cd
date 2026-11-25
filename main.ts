// The Funniest Toaster Error Message — make.fun entry
// Writes one line, the error message a kitchen toaster shows its owner,
// to /output/entry.txt. Gate: 1 to 120 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT = "ERR_BREAD_NOT_FOUND: I checked the crumb tray. I wish I hadn't.";

if (TEXT.length < 1 || TEXT.length > 120) {
  throw new Error(`entry is ${TEXT.length} characters, must be 1-120`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

// Read it back and verify: the file must hold exactly the entry text,
// inside the 1-120 character gate, and not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== TEXT) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the entry text exactly");
}
if (written.length < 1 || written.length > 120) {
  throw new Error(`read-back entry is ${written.length} characters, must be 1-120`);
}
if (written.trim().length === 0) {
  throw new Error("read-back entry must not be only whitespace");
}
console.log(`wrote ${TEXT.length} characters to /output/entry.txt`);
