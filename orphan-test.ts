import { migrateSite } from "./src/migrate/run";
import { DiskSink } from "./src/migrate/sink";
import { setLogsEnabled } from "./src/utils/log";

const ROOT = "/tmp/claude-1000/-home-javeed-Documents-CAPILLARY-mintlify-clone/c99d86e3-0e12-4c2b-b347-2f123b856f1f/scratchpad/orphan-run";

async function main() {
  setLogsEnabled(false);
  const report = await migrateSite("https://modulr.readme.io/docs", {
    sink: new DiskSink(`${ROOT}/modulr-readme-io`),
    limit: 140,
    brand: false,
    images: false,
  });
  console.log("notInNavigation:", report.notInNavigation.length);
  console.log("navPlacements  :", JSON.stringify(report.navPlacements));
}
void main();
