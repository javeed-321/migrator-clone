import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { convertReadmeMarkdown } from "../src/convert/run";
import { downloadImages, nameImages } from "../src/download/images";

let outDir = "";

beforeEach(() => {
  outDir = mkdtempSync(join(tmpdir(), "images-"));
});

afterEach(() => {
  rmSync(outDir, { recursive: true, force: true });
});

/** A stand-in for the network: every URL returns one byte, unless listed as gone. */
function stubFetch(gone: string[] = []) {
  const calls: string[] = [];
  const impl = (async (input: string | URL | Request) => {
    const url = String(input);
    calls.push(url);
    return gone.includes(url)
      ? { ok: false, status: 404, statusText: "Not Found" }
      : { ok: true, status: 200, statusText: "OK", arrayBuffer: async () => new Uint8Array([1]).buffer };
  }) as unknown as typeof fetch;

  return { impl, calls };
}

const PAGE = `<Image src="https://files.readme.io/f1f2d3a-password_validate.jpg" alt="Flow" />

![A chart](https://files.readme.io/abc-chart.png)

<img src="https://files.readme.io/logo.png" alt="Logo">

Not an image: [a link](https://example.test/page).`;

describe("naming the files", () => {
  it("keeps the readable name ReadMe already gave the file", async () => {
    const names = nameImages(["https://files.readme.io/f1f2d3a-password_validate.jpg"]);

    expect(Object.values(names)).toEqual(["f1f2d3a-password_validate.jpg"]);
  });

  it("drops the query string", async () => {
    expect(Object.values(nameImages(["https://x.test/a.png?w=100"]))).toEqual(["a.png"]);
  });

  it("keeps two different images with the same file name apart", async () => {
    const names = nameImages(["https://a.test/diagram.png", "https://b.test/diagram.png"]);
    const values = Object.values(names);

    expect(new Set(values).size).toBe(2);
    expect(values.every((name) => name.endsWith(".png"))).toBe(true);
  });

  it("is deterministic", async () => {
    const urls = ["https://a.test/diagram.png", "https://b.test/diagram.png"];

    expect(nameImages(urls)).toEqual(nameImages(urls));
  });
});

describe("downloading", () => {
  it("writes each image into the images folder", async () => {
    const { impl } = stubFetch();
    const report = await downloadImages([
      "https://files.readme.io/f1f2d3a-password_validate.jpg",
      "https://files.readme.io/abc-chart.png",
      "https://files.readme.io/logo.png",
    ], { outDir, fetchImpl: impl, delayMs: 0 });

    expect(report.downloaded).toBe(3);
    expect(existsSync(join(outDir, "images", "f1f2d3a-password_validate.jpg"))).toBe(true);
    expect(existsSync(join(outDir, "images", "logo.png"))).toBe(true);
    expect(readFileSync(join(outDir, "images", "logo.png")).length).toBe(1);
  });

  it("maps each url to the path a page should use", async () => {
    const { impl } = stubFetch();
    const { map } = await downloadImages(["https://files.readme.io/logo.png"], {
      outDir,
      fetchImpl: impl,
      delayMs: 0,
    });

    expect(map["https://files.readme.io/logo.png"]).toBe("/images/logo.png");
  });

  it("honours a different folder and public path", async () => {
    const { impl } = stubFetch();
    const { map } = await downloadImages(["https://x.test/a.png"], {
      outDir,
      dir: "assets/img",
      publicPath: "/assets/img",
      fetchImpl: impl,
      delayMs: 0,
    });

    expect(existsSync(join(outDir, "assets/img", "a.png"))).toBe(true);
    expect(map["https://x.test/a.png"]).toBe("/assets/img/a.png");
  });

  it("does not fetch an image it already has", async () => {
    const first = stubFetch();
    await downloadImages(["https://x.test/a.png"], { outDir, fetchImpl: first.impl, delayMs: 0 });

    const second = stubFetch();
    const report = await downloadImages(["https://x.test/a.png"], {
      outDir,
      fetchImpl: second.impl,
      delayMs: 0,
    });

    expect(second.calls).toHaveLength(0);
    expect(report.fromCache).toBe(1);
    expect(report.map["https://x.test/a.png"]).toBe("/images/a.png");
  });

  it("refetches when asked", async () => {
    const { impl } = stubFetch();
    await downloadImages(["https://x.test/a.png"], { outDir, fetchImpl: impl, delayMs: 0 });

    const again = stubFetch();
    await downloadImages(["https://x.test/a.png"], {
      outDir,
      fetchImpl: again.impl,
      refetch: true,
      delayMs: 0,
    });

    expect(again.calls).toHaveLength(1);
  });

  it("reports a failure and leaves it out of the map", async () => {
    const gone = "https://x.test/missing.png";
    const { impl } = stubFetch([gone]);
    const report = await downloadImages([gone, "https://x.test/a.png"], {
      outDir,
      fetchImpl: impl,
      delayMs: 0,
    });

    expect(report.downloaded).toBe(1);
    expect(report.failed).toHaveLength(1);
    expect(report.failed[0]?.message).toContain("404");
    expect(report.map[gone]).toBeUndefined();
  });
});

describe("the pipeline downloads as it converts", () => {
  it("fetches every image and points the page at the local copies, in one call", async () => {
    const { impl } = stubFetch();
    const result = await convertReadmeMarkdown(PAGE, {
      images: { outDir, fetchImpl: impl, delayMs: 0 },
    });

    expect(existsSync(join(outDir, "images", "logo.png"))).toBe(true);
    expect(result.mdx).toContain('src="/images/f1f2d3a-password_validate.jpg"');
    expect(result.mdx).toContain('src="/images/abc-chart.png"');
    expect(result.mdx).toContain('src="/images/logo.png"');
    expect(result.mdx).not.toContain("files.readme.io");
  });

  it("reports what the download did", async () => {
    const { impl } = stubFetch();
    const result = await convertReadmeMarkdown(PAGE, {
      images: { outDir, fetchImpl: impl, delayMs: 0 },
    });

    expect(result.images?.downloaded).toBe(3);
    expect(result.notes.some((note) => note.detail.includes("downloaded 3 images"))).toBe(true);
  });

  it("leaves a failed download pointing at the original host", async () => {
    const gone = "https://files.readme.io/logo.png";
    const { impl } = stubFetch([gone]);
    const result = await convertReadmeMarkdown(PAGE, {
      images: { outDir, fetchImpl: impl, delayMs: 0 },
    });

    expect(result.mdx).toContain(`src="${gone}"`);
    expect(result.mdx).toContain('src="/images/abc-chart.png"');
    expect(result.notes.some((note) => note.detail.includes("1 failed"))).toBe(true);
  });

  it("stops warning about external hosts once everything is local", async () => {
    const { impl } = stubFetch();
    const result = await convertReadmeMarkdown(PAGE, {
      images: { outDir, fetchImpl: impl, delayMs: 0 },
    });

    expect(result.notes.some((note) => note.detail.includes("Re-host"))).toBe(false);
  });

  it("touches nothing and writes nothing when no outDir is given", async () => {
    const result = await convertReadmeMarkdown(PAGE);

    expect(result.images).toBeUndefined();
    expect(result.mdx).toContain("files.readme.io");
    expect(result.notes.some((note) => note.detail.includes("Re-host"))).toBe(true);
  });

  it("does not fetch again on a second conversion of the same page", async () => {
    const first = stubFetch();
    await convertReadmeMarkdown(PAGE, { images: { outDir, fetchImpl: first.impl, delayMs: 0 } });

    const second = stubFetch();
    const result = await convertReadmeMarkdown(PAGE, {
      images: { outDir, fetchImpl: second.impl, delayMs: 0 },
    });

    expect(second.calls).toHaveLength(0);
    expect(result.images?.fromCache).toBe(3);
  });
});

describe("rewriting the page", () => {
  it("points every downloaded image at its local copy", async () => {
    const { impl } = stubFetch();
    const { map } = await downloadImages([
      "https://files.readme.io/f1f2d3a-password_validate.jpg",
      "https://files.readme.io/abc-chart.png",
      "https://files.readme.io/logo.png",
    ], { outDir, fetchImpl: impl, delayMs: 0 });

    const { mdx } = await convertReadmeMarkdown(PAGE, { imageSrc: (url) => map[url] });

    expect(mdx).toContain('src="/images/f1f2d3a-password_validate.jpg"');
    expect(mdx).toContain('src="/images/abc-chart.png"');
    expect(mdx).toContain('src="/images/logo.png"');
    expect(mdx).not.toContain("files.readme.io");
  });

  it("leaves a failed download pointing at the original host", async () => {
    const gone = "https://files.readme.io/logo.png";
    const { impl } = stubFetch([gone]);
    const { map } = await downloadImages([
      "https://files.readme.io/f1f2d3a-password_validate.jpg",
      "https://files.readme.io/abc-chart.png",
      "https://files.readme.io/logo.png",
    ], { outDir, fetchImpl: impl, delayMs: 0 });

    const { mdx } = await convertReadmeMarkdown(PAGE, { imageSrc: (url) => map[url] });

    expect(mdx).toContain(`src="${gone}"`);
    expect(mdx).toContain('src="/images/abc-chart.png"');
  });

  it("stops warning about external hosts once everything is local", async () => {
    const { impl } = stubFetch();
    const { map } = await downloadImages([
      "https://files.readme.io/f1f2d3a-password_validate.jpg",
      "https://files.readme.io/abc-chart.png",
      "https://files.readme.io/logo.png",
    ], { outDir, fetchImpl: impl, delayMs: 0 });

    const { notes } = await convertReadmeMarkdown(PAGE, { imageSrc: (url) => map[url] });

    expect(notes.some((note) => note.detail.includes("Re-host"))).toBe(false);
  });

  it("still warns when the images were not downloaded", async () => {
    const { notes } = await convertReadmeMarkdown(PAGE);

    expect(notes.some((note) => note.detail.includes("Re-host"))).toBe(true);
  });
});
