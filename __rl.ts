import { fetchPageHtml } from "./src/utils/network";
import { setLogsEnabled } from "./src/utils/log";

async function probe(label: string, urls: string[], parallel: boolean) {
  const t0 = Date.now();
  const run = async (u: string) => {
    try { const h = await fetchPageHtml(u); return `${u.split(".com")[1]} ok ${h.length}B`; }
    catch (e) { return `${u.split(".com")[1]} FAIL ${(e as Error).message.slice(-40)}`; }
  };
  const out = parallel ? await Promise.all(urls.map(run)) : await urls.reduce(
    async (acc, u) => [...(await acc), await run(u)], Promise.resolve([] as string[]));
  console.log(`\n${label} (${Date.now()-t0}ms)`);
  out.forEach((o) => console.log("   ", o));
}

async function main() {
  setLogsEnabled(false);
  const base = "https://developer.flutterwave.com";
  const tabs = [`${base}/docs`, `${base}/reference`, `${base}/`, `${base}/recipes`];
  await probe("PARALLEL (what route.ts does)", tabs, true);
  await new Promise((r) => setTimeout(r, 8000));
  await probe("SEQUENTIAL", tabs, false);
}
main();
