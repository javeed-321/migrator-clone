import { describe, expect, it } from "vitest";

import { formatPageWithFrontmatter } from "../src/utils/file";

/**
 * Frontmatter that will not parse is not a cosmetic defect: the site cannot
 * render the page at all and the dashboard's sync gate refuses it outright. So
 * every case below is checked by *parsing the block back*, not by matching the
 * string that was written — the only question that matters is whether a YAML
 * parser accepts it.
 */

/** The frontmatter block, as YAML, or a thrown error if it will not parse. */
function frontmatter(page: string): Record<string, string> {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(page);
  if (!match) throw new Error("no frontmatter block");
  return parseYaml(match[1] ?? "");
}

/**
 * Enough YAML to read a block of double-quoted scalars, and strict about the
 * things that break real pages.
 *
 * A dependency would be better, but there is no YAML parser in this project — and
 * a test that accepted whatever the writer produced would have passed on the bug
 * this file exists to prevent.
 */
function parseYaml(text: string): Record<string, string> {
  const out: Record<string, string> = {};

  for (const line of text.split("\n")) {
    if (!line.trim()) continue;

    const key = /^([A-Za-z0-9_-]+):[ \t]+/.exec(line);
    if (!key?.[1]) throw new Error(`not a mapping entry: ${line}`);

    const rest = line.slice(key[0].length);
    if (!rest.startsWith('"')) throw new Error(`unquoted value: ${line}`);

    // Walk the scalar, honouring escapes, and require it to close on this line.
    let value = "";
    let i = 1;
    for (; i < rest.length; i += 1) {
      const char = rest[i];
      if (char === "\\") {
        const next = rest[i + 1];
        if (next === "n") value += "\n";
        else if (next === "t") value += "\t";
        else if (next === "x") {
          value += String.fromCharCode(parseInt(rest.slice(i + 2, i + 4), 16));
          i += 2;
        } else value += next;
        i += 1;
        continue;
      }
      if (char === '"') break;
      value += char;
    }

    if (rest[i] !== '"') throw new Error(`scalar never closes: ${line}`);
    if (rest.slice(i + 1).trim()) throw new Error(`trailing content after scalar: ${line}`);

    out[key[1]] = value;
  }

  return out;
}

describe("the YAML block every page opens with", () => {
  it("round-trips an ordinary title and description", () => {
    const page = formatPageWithFrontmatter("Card enquiry", "Retrieve card details by PAN", "Body.");

    expect(frontmatter(page)).toEqual({
      title: "Card enquiry",
      description: "Retrieve card details by PAN",
    });
  });

  /**
   * The exact text from `reference/createoutboundcop`, which is what broke this.
   * Raw, the `("` closed the scalar and the `403: ` after it read as a second
   * mapping entry.
   */
  it("survives a description that quotes an API error", () => {
    const description =
      'Any request reusing a nonce returns `403: Forbidden ("Unique/allowed nonce header not found")`.';
    const page = formatPageWithFrontmatter("Create an account name check", description, "Body.");

    expect(frontmatter(page).description).toBe(description);
  });

  it("survives a bare double quote", () => {
    const page = formatPageWithFrontmatter('The "primary" account', 'Set `type` to "PRIMARY".', "Body.");

    expect(frontmatter(page)).toEqual({
      title: 'The "primary" account',
      description: 'Set `type` to "PRIMARY".',
    });
  });

  it("survives a backslash, without doubling it back", () => {
    const page = formatPageWithFrontmatter("Escapes", 'Use \\" to escape a quote', "Body.");

    expect(frontmatter(page).description).toBe('Use \\" to escape a quote');
  });

  it("keeps a multi-line description on one line, which is what YAML requires", () => {
    const page = formatPageWithFrontmatter("Title", "First line.\nSecond line.", "Body.");
    const block = /^---\n([\s\S]*?)\n---\n/.exec(page)?.[1] ?? "";

    expect(block.split("\n")).toHaveLength(2);
    expect(frontmatter(page).description).toBe("First line.\nSecond line.");
  });

  it("survives a colon followed by a space, which is what YAML reads as a key", () => {
    const page = formatPageWithFrontmatter("Errors: what they mean", "403: Forbidden", "Body.");

    expect(frontmatter(page)).toEqual({
      title: "Errors: what they mean",
      description: "403: Forbidden",
    });
  });

  it("escapes a stray control character rather than writing it raw", () => {
    const page = formatPageWithFrontmatter("Title", "before\u0007after", "Body.");

    expect(page).toContain("\\x07");
    expect(frontmatter(page).description).toBe("before\u0007after");
  });

  it("omits a key rather than writing an empty one", () => {
    const page = formatPageWithFrontmatter("Only a title", "", "Body.");

    expect(frontmatter(page)).toEqual({ title: "Only a title" });
  });

  it("leaves the body untouched below the block", () => {
    const body = '# Heading\n\nProse with a "quote" and a `403: Forbidden` in it.\n';
    const page = formatPageWithFrontmatter("Title", "Description", body);

    expect(page.endsWith(body)).toBe(true);
  });
});
