import { fetchBrand } from "./src/brand";

const sites = process.argv.slice(2);

async function main() {
for (const site of sites) {
  const url = new URL(site);
  try {
    const { report, config } = await fetchBrand(url);
    console.log("\n" + "=".repeat(72));
    console.log(url.host);
    console.log("=".repeat(72));
    console.log("FOUND:");
    for (const row of report.found) {
      console.log(`  ${row.field.padEnd(11)} ${String(row.value).padEnd(52)} <- ${row.from}`);
    }
    if (report.missing.length) console.log("MISSING: " + report.missing.join(", "));
    for (const a of report.adjusted) console.log(`ADJUSTED: ${a.field} ${a.was} -> ${a.now}\n          ${a.reason}`);
    for (const r of report.rejected) console.log(`REJECTED: ${r.field} ${r.value}\n          ${r.reason}`);
    console.log("-> documentation.json keys:");
    console.log(JSON.stringify(config, null, 2).split("\n").map((l) => "   " + l).join("\n"));
  } catch (e) {
    console.log(`\n${url.host}: ${(e as Error).message}`);
  }
}
}
void main();
