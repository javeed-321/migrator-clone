import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

const walk = (dir) => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
});
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

const samples = new Map();
for (const path of walk("output/capillary/raw")) {
  const src = readFileSync(path, "utf8");
  try { processor.parse(src); continue; } catch (error) {
    const key = String(error.reason ?? error.message).replace(/`[^`]*`/g, "`…`").slice(0, 44).trim();
    const line = error.line ?? error.place?.start?.line;
    const col = error.column ?? error.place?.start?.column;
    if (!line) continue;
    const text = (src.split("\n")[line - 1] ?? "").slice(Math.max(0, col - 35), col + 35).trim();
    if (!samples.has(key)) samples.set(key, new Set());
    if (samples.get(key).size < 3) samples.get(key).add(text);
  }
}
for (const [key, lines] of [...samples].sort((a, b) => b[1].size - a[1].size)) {
  console.log(`--- ${key}`);
  for (const l of lines) console.log(`      …${l}…`);
}
