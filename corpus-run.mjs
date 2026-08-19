import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const APP = "/home/javeed/Documents/DocumentationAI/documentation-ai-app/node_modules";
const { compile } = await import(`${APP}/@mdx-js/mdx/index.js`);
const remarkGfm = (await import(`${APP}/remark-gfm/index.js`)).default;

const { convertReadmeMarkdown } = await import("./src/convert/run.ts");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else if (entry.endsWith(".md")) out.push(path);
  }
  return out;
}

const pages = walk("output/capillary/raw");
const stats = {
  pages: pages.length,
  converted: 0,
  threw: [],
  inputCompiles: 0,
  outputCompiles: 0,
  outputFails: [],
  fellBack: 0,
  blockers: new Map(),
};

// Which Section 3 constructs the corpus actually contains.
const CONSTRUCTS = {
  "<details>": /<details\b/i,
  "<br>": /<br\s*\/?>/i,
  "raw <table>": /<table\b/i,
  "<Image>": /<Image\b/,
  "markdown image": /!\[[^\]]*\]\(/,
  "<img>": /<img\b/i,
  "<iframe>": /<iframe\b/i,
  "<span>": /<span\b/i,
  "<div>": /<div\b/i,
  "&nbsp;": / /,
  "<p>": /<p>|<p\s/i,
  "<HTMLBlock>": /<HTMLBlock\b/,
};
const seen = Object.fromEntries(Object.keys(CONSTRUCTS).map((k) => [k, 0]));

const canCompile = async (text) => {
  try { await compile(text, { remarkPlugins: [remarkGfm] }); return true; } catch { return false; }
};

for (const path of pages) {
  const src = readFileSync(path, "utf8");
  for (const [name, re] of Object.entries(CONSTRUCTS)) if (re.test(src)) seen[name] += 1;

  if (await canCompile(src)) stats.inputCompiles += 1;

  let result;
  try {
    result = await convertReadmeMarkdown(src, { site: "https://docs.capillarytech.com" });
    stats.converted += 1;
  } catch (error) {
    stats.threw.push({ path, message: String(error).split("\n")[0].slice(0, 120) });
    continue;
  }

  if (result.parseMode === "markdown") stats.fellBack += 1;
  for (const note of result.notes.filter((n) => n.level === "blocker")) {
    const key = note.detail.slice(0, 60);
    stats.blockers.set(key, (stats.blockers.get(key) ?? 0) + 1);
  }

  if (await canCompile(result.mdx)) stats.outputCompiles += 1;
  else stats.outputFails.push({ path, error: result.notes.find((n) => n.rule === "mdx")?.detail ?? "(no note)" });
}

console.log(`pages                 ${stats.pages}`);
console.log(`converted without throwing ${stats.converted}`);
console.log(`input compiles as MDX      ${stats.inputCompiles}  (${Math.round((stats.inputCompiles / stats.pages) * 100)}%)`);
console.log(`OUTPUT compiles as MDX     ${stats.outputCompiles}  (${Math.round((stats.outputCompiles / stats.pages) * 100)}%)`);
console.log(`fell back to plain parse   ${stats.fellBack}`);

console.log("\nconstructs present in the source:");
for (const [name, count] of Object.entries(seen).sort((a, b) => b[1] - a[1])) {
  if (count) console.log(`  ${String(count).padStart(4)}  ${name}`);
}

if (stats.threw.length) {
  console.log(`\nTHREW (${stats.threw.length}):`);
  for (const t of stats.threw.slice(0, 10)) console.log(`  ${t.path}\n     ${t.message}`);
}

console.log(`\nOUTPUT FAILED TO COMPILE (${stats.outputFails.length}):`);
for (const f of stats.outputFails.slice(0, 15)) console.log(`  ${f.path}\n     ${f.error.slice(0, 150)}`);

console.log("\ntop blockers:");
for (const [key, n] of [...stats.blockers].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
  console.log(`  ${String(n).padStart(4)}  ${key}`);
}
