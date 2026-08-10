import { exponentialBackoff } from "./backoff";
import { getErrorMessage } from "./errors";

/**
 * Step 1 of the pipeline.
 *
 * ReadMe serves its sidebar in the initial HTML, so a plain `fetch` is enough —
 * no headless browser anywhere in this build. GitBook and Docusaurus are the
 * vendors that force Puppeteer, because their sidebars are client-rendered and
 * start collapsed.
 */
const headers = {
  "Accept-Language": "en-US,en;q=0.9",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
} as const;

async function fetchPageResponse(url: string | URL): Promise<string> {
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return await res.text();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(`Failed to fetch page from source${errorMessage}`);
  }
}

export async function fetchPageHtml(url: string | URL): Promise<string> {
  try {
    const res = await exponentialBackoff(() => fetchPageResponse(url));
    if (res) return res;
    throw new Error("An unknown error occurred.");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(`Error retrieving HTML for ${url.toString()}${errorMessage}`);
  }
}
