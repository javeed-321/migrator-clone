import { describe, expect, it } from "vitest";

import { convertReadmeMarkdown } from "../src/convert/run";
import { hasEmbeddedSpec, stripApiArtefacts } from "../src/convert/api-reference";
import { parseMarkdown } from "../src/download/parse";
import { specMode, specPath } from "../src/migrate/run";
import { buildDocumentationJson } from "../src/output/documentationJson";
import type { ConversionNote } from "../src/convert/mdast";
import type { DocGroup, DocPage, DocTab } from "../src/output/documentationJson";

/**
 * The spec ReadMe dumps into an endpoint page: one path, one method, its own
 * components. Small, but the same shape as every one of the 212 in the corpus.
 */
const SPEC = {
  openapi: "3.1.0",
  info: { title: "Modulr API", version: "1.0" },
  servers: [{ url: "https://api.example.com" }],
  paths: {
    "/cards/{cardId}/block": {
      post: {
        summary: "Block card",
        responses: { "200": { description: "ok" } },
      },
    },
  },
  components: { schemas: {} },
};

function page(spec: unknown = SPEC, body = "Blocks a card so it cannot be used."): string {
  return [
    "Fetch the complete documentation index at: https://modulr.readme.io/llms.txt",
    "",
    "# Block card",
    "",
    body,
    "",
    "# OpenAPI definition",
    "",
    "```json",
    typeof spec === "string" ? spec : JSON.stringify(spec, undefined, 2),
    "```",
    "",
  ].join("\n");
}

function strip(source: string) {
  const notes: ConversionNote[] = [];
  const { tree } = parseMarkdown(source);
  const spec = stripApiArtefacts(tree, notes);
  return { spec, notes, tree };
}

describe("lifting the spec out of the page body", () => {
  it("returns the operation, with the method uppercased", () => {
    const { spec } = strip(page());

    expect(spec?.operations).toEqual([
      { method: "POST", route: "/cards/{cardId}/block", summary: "Block card" },
    ]);
  });

  it("carries the endpoint's own summary, so the mode decision needs no llms.txt", () => {
    const { spec } = strip(page());

    expect(spec?.operations[0]?.summary).toBe("Block card");
  });

  it("returns the dump byte for byte, so the contract is moved and not re-authored", () => {
    const { spec } = strip(page());

    expect(spec?.json).toBe(JSON.stringify(SPEC, undefined, 2));
    expect(JSON.parse(spec?.json ?? "{}")).toEqual(SPEC);
  });

  it("still removes the section from the body", () => {
    const { tree } = strip(page());
    const text = JSON.stringify(tree);

    expect(text).not.toContain("OpenAPI definition");
    expect(text).not.toContain("3.1.0");
  });

  it("returns nothing for a page that has no dump", () => {
    const { spec, notes } = strip("# A guide\n\nSome prose.\n");

    expect(spec).toBeUndefined();
    expect(notes.filter((note) => note.level === "blocker")).toEqual([]);
  });

  it("keeps an unreadable dump on the page and raises a blocker", () => {
    const { spec, tree, notes } = strip(page("{ not json"));

    expect(spec).toBeUndefined();
    // The only copy of the contract is still there — deleting it to tidy the page
    // is the trade the whole report exists to refuse.
    expect(JSON.stringify(tree)).toContain("not json");
    expect(notes.find((note) => note.rule === "openapi")?.level).toBe("blocker");
  });

  it("flags a dump with no operations rather than binding to nothing", () => {
    const { spec, notes } = strip(page({ openapi: "3.1.0", paths: {} }));

    expect(spec).toBeUndefined();
    expect(notes.find((note) => note.rule === "openapi")?.detail).toContain("no operations");
  });

  it("binds the first of several operations, and says so", () => {
    const many = {
      paths: {
        "/a": { get: {}, delete: {} },
        "/b": { post: {} },
      },
    };
    const { spec, notes } = strip(page(many));

    expect(spec?.operations).toHaveLength(3);
    expect(spec?.operations[0]).toMatchObject({ method: "GET", route: "/a" });
    expect(notes.find((note) => note.rule === "openapi")?.detail).toContain("3 operations");
  });
});

describe("hasEmbeddedSpec — asked of the source, before anything parses", () => {
  it("sees the dump", () => {
    expect(hasEmbeddedSpec(page())).toBe(true);
  });

  it("does not see one on a guide", () => {
    expect(hasEmbeddedSpec("# Guide\n\nProse about the OpenAPI definition we publish.\n")).toBe(false);
  });

  it("is false for the converted output, which is why the caller asks the source", async () => {
    const source = page();
    const { mdx } = await convertReadmeMarkdown(source);

    expect(hasEmbeddedSpec(source)).toBe(true);
    expect(hasEmbeddedSpec(mdx)).toBe(false);
  });
});

describe("where the spec file goes", () => {
  it("is named after the page, in api-reference/", () => {
    expect(specPath("reference/cardenquiry")).toBe("api-reference/cardenquiry.json");
  });

  it("keeps the .json ReadMe dumped, since the importer accepts it", () => {
    expect(specPath("reference/x")).toMatch(/\.json$/);
  });

  it("falls back to the full slug when two pages share a final segment", () => {
    const taken = new Set(["api-reference/create.json"]);

    expect(specPath("reference/cards/create", taken)).toBe("api-reference/reference-cards-create.json");
  });
});

describe("how much of the page the spec is allowed to write", () => {
  it("generates the whole page when the body is empty", () => {
    expect(specMode("", ["Blocks a card."])).toBe("auto");
    expect(specMode("   \n\n ", [undefined])).toBe("auto");
  });

  it("generates the whole page when the body only repeats the description", () => {
    expect(specMode("Blocks a card so it cannot be used.", ["Blocks a card so it cannot be used."])).toBe("auto");
  });

  it("ignores reflowed whitespace when making that comparison", () => {
    expect(specMode("Blocks a card\nso it cannot   be used.", ["Blocks a card so it cannot be used."])).toBe("auto");
  });

  it("keeps a body that carries real prose", () => {
    const body = "Blocks a card.\n\n# Prerequisites\n\nYou need the `cards:write` scope.\n";

    expect(specMode(body, ["Blocks a card."])).toBe("custom");
  });

  it("matches against the spec's own summary, for a site with no llms.txt description", () => {
    // The page description is missing — the only thing left to compare against is
    // what the spec says, and the answer must not change because of that.
    expect(specMode("Block card", [undefined, undefined, "Block card"])).toBe("auto");
  });

  it("keeps the body when it says more than the spec does", () => {
    expect(specMode("Block card. Requires the `cards:write` scope.", [undefined, "Block card"])).toBe(
      "custom",
    );
  });
});

describe("the binding in documentation.json", () => {
  const build = (openapi: NonNullable<Parameters<typeof buildDocumentationJson>[1]>["openapi"]) =>
    buildDocumentationJson([{ name: "API", url: "/reference", navigation: [{ group: "Cards", pages: ["reference/blockcard", "reference/guide"] }] }], {
      name: "Modulr",
      openapi,
    });

  const pagesOf = (tab: DocTab): DocPage[] =>
    ("groups" in tab ? tab.groups : []).flatMap((group: DocGroup) => group.pages as DocPage[]);

  it("writes method, openapi and openapi-mode on a bound page", () => {
    const config = build({
      "reference/blockcard": {
        spec: "api-reference/blockcard.json",
        method: "POST",
        route: "/cards/{cardId}/block",
        mode: "custom",
      },
    });
    const [bound] = pagesOf(config.navigation.tabs[0] as DocTab);

    expect(bound?.method).toBe("POST");
    expect(bound?.openapi).toBe("api-reference/blockcard.json POST /cards/{cardId}/block");
    expect(bound?.["openapi-mode"]).toBe("custom");
  });

  it("leaves an unbound page alone, so a guide under /reference/ stays a guide", () => {
    const config = build({
      "reference/blockcard": {
        spec: "api-reference/blockcard.json",
        method: "POST",
        route: "/cards/{cardId}/block",
        mode: "auto",
      },
    });
    const guide = pagesOf(config.navigation.tabs[0] as DocTab)[1];

    expect(guide?.path).toBe("reference/guide");
    expect(guide?.openapi).toBeUndefined();
    expect(guide?.method).toBeUndefined();
    expect(guide?.["openapi-mode"]).toBeUndefined();
  });

  it("uppercases the method, because a lowercase one matches nothing and reports nothing", () => {
    const config = build({
      "reference/blockcard": {
        spec: "api-reference/blockcard.json",
        // Deliberately wrong, to prove the builder is the last line of defence.
        method: "post" as "POST",
        route: "/cards/{cardId}/block",
        mode: "auto",
      },
    });
    const [bound] = pagesOf(config.navigation.tabs[0] as DocTab);

    expect(bound?.method).toBe("POST");
    expect(bound?.openapi).toBe("api-reference/blockcard.json POST /cards/{cardId}/block");
  });

  it("writes nothing when no page was bound", () => {
    const config = build(undefined);

    expect(JSON.stringify(config)).not.toContain("openapi");
  });
});

describe("the page the reader is left with", () => {
  it("carries the prose and not the spec", async () => {
    const result = await convertReadmeMarkdown(page());

    expect(result.mdx).toContain("Blocks a card so it cannot be used.");
    expect(result.mdx).not.toContain("OpenAPI definition");
    expect(result.mdx).not.toContain("llms.txt");
    expect(result.outputCompiles).toBe(true);
  });

  it("hands the spec back on the result", async () => {
    const result = await convertReadmeMarkdown(page());

    expect(result.openapi?.operations[0]).toMatchObject({ method: "POST", route: "/cards/{cardId}/block" });
  });

  it("hands back nothing for a page that never had one", async () => {
    const result = await convertReadmeMarkdown("# Guide\n\nProse.\n");

    expect(result.openapi).toBeUndefined();
  });
});
