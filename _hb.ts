import { readFileSync } from "node:fs";
import { convertReadmeMarkdown } from "./src/convert/run";
convertReadmeMarkdown(readFileSync("/tmp/hb/page.md", "utf8"), { title: "2023 Product Vision" }).then(r => {
  console.log("=== compiles:", r.outputCompiles, "| parseMode:", r.parseMode);
  for (const n of r.notes.filter(n => n.level === "blocker")) console.log("BLOCKER:", n.detail.slice(0, 220));
  console.log("\n=== first 30 lines of output ===");
  console.log(r.mdx.split("\n").slice(0, 30).join("\n"));
  console.log("\n=== last 10 lines ===");
  console.log(r.mdx.trim().split("\n").slice(-10).join("\n"));
});
