/**
 * Enough of a CSS engine to move a stylesheet onto the elements it styles.
 *
 * ## Why this is not a CSS parser
 *
 * It reads only what has an **inline equivalent**, and says so out loud about
 * everything else. That asymmetry is the whole design. A stylesheet expresses
 * things a `style` attribute cannot express at all — a media query, a `:hover`,
 * a state selector — and the one unacceptable outcome is inlining the parts that
 * fit and leaving the reader to discover the rest is gone.
 *
 * So every selector this cannot serve is returned in `dropped`, with the reason,
 * and the caller reports it. `[PIT Phase 2]`: content loss is invisible to a
 * compile, and so is behaviour loss.
 */

export type Declaration = { property: string; value: string; important: boolean };

/** One simple selector in a descendant chain: `.tile`, `a`, `div[data-x="1"]`. */
type Simple = {
  tag?: string;
  id?: string;
  classes: string[];
  attrs: { name: string; value?: string }[];
};

export type Rule = {
  selector: string;
  /** Left to right. `.tile a` is `[.tile, a]`. */
  parts: Simple[];
  declarations: Declaration[];
  /** Packed (ids, classes+attrs, tags) — bigger wins. */
  specificity: number;
  /** Source order, which breaks specificity ties the way a browser does. */
  order: number;
};

export type Stylesheet = {
  rules: Rule[];
  /** Custom properties from `:root`, for resolving `var(--x)`. */
  variables: Map<string, string>;
  /** What has no inline form, and why — the caller turns these into notes. */
  dropped: { selector: string; why: string }[];
};

/** An element as this engine needs to see it. Keeps the module free of hast. */
export type Target = { tag: string; id?: string; classes: string[]; attrs: Map<string, string> };

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function parseDeclarations(body: string): Declaration[] {
  const declarations: Declaration[] = [];

  for (const chunk of body.split(";")) {
    const colon = chunk.indexOf(":");
    if (colon === -1) continue;

    const property = chunk.slice(0, colon).trim();
    let value = chunk.slice(colon + 1).trim();
    if (!property || !value) continue;

    const important = /!\s*important$/i.test(value);
    if (important) value = value.replace(/!\s*important$/i, "").trim();

    declarations.push({ property, value, important });
  }

  return declarations;
}

/**
 * One simple selector, or `null` when it uses something inline cannot express.
 *
 * A pseudo-class is the common case and the important one: `.tile:hover` is not
 * a style, it is a *behaviour*, and there is no attribute that carries it.
 */
function parseSimple(text: string): Simple | null {
  if (text.includes(":") || text.includes("*")) return null;

  const simple: Simple = { classes: [], attrs: [] };
  // Consume `tag`, then any run of `#id`, `.class` and `[attr]` in any order.
  const pattern = /^([a-zA-Z][a-zA-Z0-9-]*)|#([\w-]+)|\.([\w-]+)|\[([\w-]+)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\]]*))?\]/;

  let rest = text.trim();
  let matched = false;

  while (rest.length > 0) {
    const match = pattern.exec(rest);
    if (!match || match.index !== 0) return null;

    if (match[1]) simple.tag = match[1].toLowerCase();
    else if (match[2]) simple.id = match[2];
    else if (match[3]) simple.classes.push(match[3]);
    else if (match[4]) {
      const value = match[5] ?? match[6] ?? match[7];
      simple.attrs.push({ name: match[4].toLowerCase(), ...(value === undefined ? {} : { value: value.trim() }) });
    }

    matched = true;
    rest = rest.slice(match[0].length);
  }

  return matched ? simple : null;
}

function specificityOf(parts: Simple[]): number {
  let ids = 0;
  let classes = 0;
  let tags = 0;

  for (const part of parts) {
    if (part.id) ids += 1;
    classes += part.classes.length + part.attrs.length;
    if (part.tag) tags += 1;
  }

  return ids * 10_000 + classes * 100 + tags;
}

/**
 * Reads a stylesheet.
 *
 * At-rules are skipped whole and reported. `@media` is the one that matters:
 * `prefers-color-scheme` is how the block does dark mode, and inlining cannot
 * carry it — which makes it the single most important thing in `dropped`.
 */
export function parseCss(css: string): Stylesheet {
  const source = stripComments(css);
  const rules: Rule[] = [];
  const variables = new Map<string, string>();
  const dropped: { selector: string; why: string }[] = [];

  let index = 0;
  let order = 0;

  const readBlock = (from: number): { body: string; end: number } => {
    let depth = 0;
    for (let i = from; i < source.length; i += 1) {
      if (source[i] === "{") depth += 1;
      else if (source[i] === "}") {
        depth -= 1;
        if (depth === 0) return { body: source.slice(from + 1, i), end: i + 1 };
      }
    }
    return { body: source.slice(from + 1), end: source.length };
  };

  while (index < source.length) {
    const brace = source.indexOf("{", index);
    if (brace === -1) break;

    const prelude = source.slice(index, brace).trim();
    const { body, end } = readBlock(brace);
    index = end;
    if (!prelude) continue;

    if (prelude.startsWith("@")) {
      dropped.push({
        selector: prelude,
        why: prelude.startsWith("@media")
          ? "a media query has no inline form — every rule inside it is lost, so the block renders only its default state"
          : "an at-rule has no inline form",
      });
      continue;
    }

    for (const selector of prelude.split(",")) {
      const trimmed = selector.trim();
      if (!trimmed) continue;

      // `:root` is where the custom properties live. It selects the document
      // element, which is not inside the block, so it is read for its variables
      // and never matched against anything.
      if (trimmed === ":root" || trimmed === "html") {
        for (const declaration of parseDeclarations(body)) {
          if (declaration.property.startsWith("--")) variables.set(declaration.property, declaration.value);
        }
        continue;
      }

      const parts: Simple[] = [];
      let usable = true;
      for (const chunk of trimmed.split(/\s+/)) {
        const simple = parseSimple(chunk);
        if (simple === null) {
          usable = false;
          break;
        }
        parts.push(simple);
      }

      if (!usable || parts.length === 0) {
        dropped.push({
          selector: trimmed,
          why: trimmed.includes(":")
            ? "a pseudo-class is a behaviour, not a style — there is no attribute that carries it"
            : "this selector has no inline form",
        });
        continue;
      }

      const declarations = parseDeclarations(body);
      if (declarations.length === 0) continue;

      order += 1;
      rules.push({ selector: trimmed, parts, declarations, specificity: specificityOf(parts), order });
    }
  }

  return { rules, variables, dropped };
}

function matchesSimple(simple: Simple, target: Target): boolean {
  if (simple.tag && simple.tag !== target.tag) return false;
  if (simple.id && simple.id !== target.id) return false;
  if (simple.classes.some((name) => !target.classes.includes(name))) return false;

  return simple.attrs.every((attr) => {
    const value = target.attrs.get(attr.name);
    if (value === undefined) return false;
    return attr.value === undefined || value === attr.value;
  });
}

/**
 * Does this rule select this element?
 *
 * Matched right to left, the way a browser does it: the rightmost simple
 * selector must match the element itself, and each one to its left must match
 * *some* ancestor, in order. That is what makes `.tile a` mean "an `a` inside a
 * `.tile`" rather than "an `a` whose parent is `.tile`".
 */
function matches(rule: Rule, target: Target, ancestors: Target[]): boolean {
  const last = rule.parts[rule.parts.length - 1];
  if (!last || !matchesSimple(last, target)) return false;

  let cursor = ancestors.length - 1;
  for (let i = rule.parts.length - 2; i >= 0; i -= 1) {
    const part = rule.parts[i];
    if (!part) return false;

    while (cursor >= 0 && !matchesSimple(part, ancestors[cursor] as Target)) cursor -= 1;
    if (cursor < 0) return false;
    cursor -= 1;
  }

  return true;
}

/**
 * `var(--tile-bg)` -> the value `:root` gave it.
 *
 * Inline styles can hold a `var()` — but the `:root` that defined it is in the
 * `<style>` block being deleted, so an unresolved one would resolve to nothing
 * and the element would render unstyled. Resolved twice over, because a variable
 * is routinely defined in terms of another.
 */
export function resolveVars(value: string, variables: Map<string, string>): string {
  let resolved = value;

  for (let pass = 0; pass < 3 && resolved.includes("var("); pass += 1) {
    resolved = resolved.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, (whole, name: string, fallback?: string) => {
      const found = variables.get(name);
      if (found !== undefined) return found;
      return fallback !== undefined ? fallback.trim() : whole;
    });
  }

  return resolved;
}

/**
 * The `style` attribute for one element, or `undefined` when nothing applies.
 *
 * Rules are applied weakest first so the strongest lands last, and `!important`
 * is kept rather than stripped: the author wrote it to beat the host page's
 * stylesheet, and the migrated page is inside a host stylesheet too.
 */
export function inlineStyle(
  target: Target,
  ancestors: Target[],
  sheet: Stylesheet,
  existing?: string,
): string | undefined {
  const applicable = sheet.rules
    .filter((rule) => matches(rule, target, ancestors))
    .sort((a, b) => a.specificity - b.specificity || a.order - b.order);

  const declared = new Map<string, Declaration>();

  for (const rule of applicable) {
    for (const declaration of rule.declarations) {
      // A custom property on a normal element is only ever read by a `var()`
      // that this pass has already resolved, so writing it out would be noise.
      if (declaration.property.startsWith("--")) continue;
      const current = declared.get(declaration.property);
      if (current?.important && !declaration.important) continue;
      declared.set(declaration.property, declaration);
    }
  }

  // The element's own `style=""` was written closest to it and wins outright.
  for (const declaration of parseDeclarations(existing ?? "")) {
    declared.set(declaration.property, declaration);
  }

  if (declared.size === 0) return undefined;

  return [...declared.values()]
    .map((declaration) => {
      const value = resolveVars(declaration.value, sheet.variables);
      return `${declaration.property}: ${value}${declaration.important ? " !important" : ""}`;
    })
    .join("; ");
}


