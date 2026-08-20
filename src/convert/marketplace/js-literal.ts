/**
 * Reads the JavaScript object and array literals that Marketplace components
 * carry in their props.
 *
 * `<Compatibility plans={{ Free: false, Business: true }} />` and
 * `<AdvancedTable data={[{ code: 'X' }]} />` hold their entire content inside an
 * expression attribute, which MDX hands over as **raw source text**. To rebuild
 * that content as a table it has to be read.
 *
 * ## Why not `JSON.parse`, and why not `eval`
 *
 * `JSON.parse` rejects all of it: the keys are unquoted, the strings are
 * single-quoted, and trailing commas are normal. `eval` / `new Function` would
 * read it, and would also run whatever else the attribute contained — a
 * conversion tool that executes source it is converting is a tool that can be
 * made to do anything by a malicious page.
 *
 * So this is a small recursive-descent reader for the literal subset only:
 * objects, arrays, strings, numbers, booleans and null. It has no identifiers,
 * no operators and no function calls, and **anything outside that subset returns
 * `null` rather than a guess** — which the caller turns into a blocker.
 */

export type JsValue = string | number | boolean | null | JsValue[] | { [key: string]: JsValue };

class Reader {
  private index = 0;

  constructor(private readonly source: string) {}

  parse(): JsValue | null {
    try {
      const value = this.value();
      this.skip();
      return this.index === this.source.length ? value : null;
    } catch {
      return null;
    }
  }

  private fail(): never {
    throw new Error("not a literal");
  }

  private skip(): void {
    while (this.index < this.source.length) {
      const char = this.source[this.index]!;
      if (char === " " || char === "\t" || char === "\n" || char === "\r") {
        this.index += 1;
        continue;
      }
      // Comments are legal in the source and appear in real components.
      if (char === "/" && this.source[this.index + 1] === "/") {
        while (this.index < this.source.length && this.source[this.index] !== "\n") this.index += 1;
        continue;
      }
      if (char === "/" && this.source[this.index + 1] === "*") {
        const end = this.source.indexOf("*/", this.index + 2);
        if (end === -1) this.fail();
        this.index = end + 2;
        continue;
      }
      return;
    }
  }

  private eat(char: string): void {
    this.skip();
    if (this.source[this.index] !== char) this.fail();
    this.index += 1;
  }

  private value(): JsValue {
    this.skip();
    const char = this.source[this.index];
    if (char === undefined) this.fail();
    if (char === "{") return this.object();
    if (char === "[") return this.array();
    if (char === '"' || char === "'" || char === "`") return this.string(char);
    return this.literal();
  }

  private object(): { [key: string]: JsValue } {
    this.eat("{");
    const out: { [key: string]: JsValue } = {};

    for (;;) {
      this.skip();
      if (this.source[this.index] === "}") {
        this.index += 1;
        return out;
      }

      const char = this.source[this.index];
      if (char === undefined) this.fail();
      // Both `{ 'code': 1 }` and `{ code: 1 }` occur in the corpus of components.
      const key = char === '"' || char === "'" ? this.string(char) : this.identifier();
      this.eat(":");
      out[key] = this.value();

      this.skip();
      if (this.source[this.index] === ",") this.index += 1;
      else if (this.source[this.index] !== "}") this.fail();
    }
  }

  private array(): JsValue[] {
    this.eat("[");
    const out: JsValue[] = [];

    for (;;) {
      this.skip();
      if (this.source[this.index] === "]") {
        this.index += 1;
        return out;
      }

      out.push(this.value());

      this.skip();
      if (this.source[this.index] === ",") this.index += 1;
      else if (this.source[this.index] !== "]") this.fail();
    }
  }

  private identifier(): string {
    const match = /^[A-Za-z_$][A-Za-z0-9_$]*/.exec(this.source.slice(this.index));
    if (!match) this.fail();
    this.index += match[0].length;
    return match[0];
  }

  private string(quote: string): string {
    this.index += 1;
    let out = "";

    while (this.index < this.source.length) {
      const char = this.source[this.index]!;

      if (char === "\\") {
        const next = this.source[this.index + 1];
        if (next === undefined) this.fail();
        const escapes: Record<string, string> = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f" };
        out += escapes[next] ?? next;
        this.index += 2;
        continue;
      }

      if (char === quote) {
        this.index += 1;
        return out;
      }

      // A template literal with `${…}` in it is not a constant, so it is not a
      // literal this reader can honestly resolve.
      if (quote === "`" && char === "$" && this.source[this.index + 1] === "{") this.fail();

      out += char;
      this.index += 1;
    }

    this.fail();
  }

  private literal(): JsValue {
    const rest = this.source.slice(this.index);
    for (const [text, value] of [["true", true], ["false", false], ["null", null]] as const) {
      if (rest.startsWith(text) && !/^[A-Za-z0-9_$]/.test(rest.slice(text.length))) {
        this.index += text.length;
        return value;
      }
    }

    const number = /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(rest);
    if (number) {
      this.index += number[0].length;
      return Number(number[0]);
    }

    this.fail();
  }
}

/** Reads a JS object/array literal, or `null` when it is not one this reader can resolve. */
export function parseJsLiteral(source: string): JsValue | null {
  return new Reader(source.trim()).parse();
}

/** Reads a literal expected to be an array of flat objects, e.g. `AdvancedTable`'s `data`. */
export function parseRecordArray(source: string): Record<string, JsValue>[] | null {
  const value = parseJsLiteral(source);
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) return null;
  return value as Record<string, JsValue>[];
}

/** Reads a literal expected to be a flat object, e.g. `Compatibility`'s `plans`. */
export function parseRecord(source: string): Record<string, JsValue> | null {
  const value = parseJsLiteral(source);
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, JsValue>;
}
