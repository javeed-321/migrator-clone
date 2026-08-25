import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { describe, expect, it } from "vitest";

import { DiskSink, MemorySink } from "../src/migrate/sink";
import { buildZip, zipFilename } from "../src/migrate/zip";
import { imagesOptions, outputRoot, projectDir } from "../src/paths";

const tmp = () => mkdtempSync(join(tmpdir(), "sink-"));

describe("where files go", () => {
  it("writes a real folder, nested paths and all", () => {
    const root = tmp();
    const sink = new DiskSink(root);
    sink.write({ path: "docs/guides/intro.mdx", body: "# Intro\n" });

    expect(readFileSync(join(root, "docs", "guides", "intro.mdx"), "utf8")).toBe("# Intro\n");
  });

  it("answers `has` from the disk, which is what makes the cache work", () => {
    const root = tmp();
    const sink = new DiskSink(root);

    expect(sink.has("report.md")).toBe(false);
    sink.write({ path: "report.md", body: "x" });
    expect(sink.has("report.md")).toBe(true);
  });

  it("says nothing is cached when there is nowhere to cache it", () => {
    // Not a limitation — a sink with no persistence has no stale entries either,
    // so `false` is the honest answer rather than a missing feature.
    const sink = new MemorySink();
    sink.write({ path: "report.md", body: "x" });
    expect(sink.has()).toBe(false);
  });

  it("overwrites rather than appending a second entry for one path", () => {
    const sink = new MemorySink();
    sink.write({ path: "report.md", body: "first" });
    sink.write({ path: "report.md", body: "second" });

    expect(sink.files).toHaveLength(1);
    expect(sink.files[0]?.body).toBe("second");
  });

  it("takes bytes as well as text, since images and fonts are files too", () => {
    const root = tmp();
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
    new DiskSink(root).write({ path: "logo.png", body: bytes });

    expect(new Uint8Array(readFileSync(join(root, "logo.png")))).toEqual(bytes);
  });
});

describe("the zip", () => {
  const files = [
    { path: "documentation.json", body: '{"name":"Docs"}' },
    { path: "docs/intro.mdx", body: "# Intro\n" },
  ];

  it("puts everything under one folder named for the project", async () => {
    // Otherwise unzipping empties two hundred loose files into Downloads.
    const entries = unzipSync(await buildZip("docs-example-com", files));

    expect(Object.keys(entries).sort()).toEqual([
      "docs-example-com/docs/intro.mdx",
      "docs-example-com/documentation.json",
    ]);
  });

  it("round-trips the content unchanged", async () => {
    const entries = unzipSync(await buildZip("p", files));
    expect(new TextDecoder().decode(entries["p/docs/intro.mdx"])).toBe("# Intro\n");
  });

  it("normalises backslashes, which are separators inside a zip", async () => {
    // `node:path` on Windows produces them, and left alone they make phantom
    // folders rather than nested ones.
    const entries = unzipSync(await buildZip("p", [{ path: "docs\\guides\\a.mdx", body: "x" }]));
    expect(Object.keys(entries)).toEqual(["p/docs/guides/a.mdx"]);
  });

  it("names the download after the project", () => {
    expect(zipFilename("docs-capillarytech-com")).toBe("docs-capillarytech-com.zip");
  });
});

describe("where things live on disk", () => {
  it("keeps images outside every project, so they are shared not copied", () => {
    // Images are named by a hash of their own bytes, so a logo used by three
    // sites is one file — but only if the folder is not inside a project.
    const root = outputRoot("/repo");
    const images = imagesOptions(root);

    expect(join(images.outDir, images.dir)).toBe(join("/repo", "output", "images"));
    expect(projectDir("docs-example-com", root)).toBe(
      join("/repo", "output", "projects", "docs-example-com"),
    );
    expect(projectDir("docs-example-com", root).startsWith(join(images.outDir, images.dir))).toBe(
      false,
    );
  });
});
