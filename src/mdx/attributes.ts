import type { Element, Properties } from "hast";
import type { MdxJsxAttribute } from "mdast-util-mdx-jsx";
import { find, html } from "property-information";

/**
 * HTML attributes -> MDX JSX attributes.
 *
 * Markdown cannot carry a class or a style, but JSX can, and every node that
 * survives the bridge as a JSX element gets its properties printed back out as
 * attributes. The catch is that HAST properties are *not* already in JSX form,
 * and each mismatch fails in its own way:
 *
 *   - `className` is an **array**, because HTML `class` is a space-separated
 *     token list. `String(["a","b"])` is `"a,b"` — one class literally named
 *     `a,b`, matching neither. It is valid HTML, so nothing errors; the page
 *     simply renders unstyled. Twenty-four properties tokenise this way,
 *     including `rel` (where a comma join disables `noopener noreferrer`) and
 *     `sandbox`.
 *   - `style` is a **CSS string**, but JSX requires an object expression. A
 *     string here is an MDX compile error, not a cosmetic problem.
 *   - `aria-label` and `data-id` arrive camelCased as `ariaLabel` / `dataId`,
 *     which JSX does not accept; they go back to kebab-case.
 *   - Boolean attributes are `true`/`false`, but `hidden="false"` is *truthy*
 *     in JSX — the element would stay hidden. They must be bare or absent.
 *
 * This module is the single place those conversions happen, so no two callers
 * can drift apart.
 */

/** A JS identifier, i.e. an object key that needs no quoting. */
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * Splits a `style` string on top-level semicolons only.
 *
 * A naive `.split(";")` corrupts any declaration that legitimately contains a
 * semicolon inside brackets or quotes — `background: url(a;b.png)` and
 * `content: "a;b"` are both valid CSS and both survive here.
 */
function splitDeclarations(style: string): string[] {
  const declarations: string[] = [];
  let depth = 0;
  let quote: string | undefined = undefined;
  let start = 0;

  for (let index = 0; index < style.length; index++) {
    const character = style[index];

    if (quote) {
      if (character === quote && style[index - 1] !== "\\") quote = undefined;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "(") depth++;
    else if (character === ")") depth--;
    else if (character === ";" && depth === 0) {
      declarations.push(style.slice(start, index));
      start = index + 1;
    }
  }
  declarations.push(style.slice(start));

  return declarations.map((declaration) => declaration.trim()).filter(Boolean);
}

/**
 * `background-color` -> `backgroundColor`, `-webkit-transform` -> `WebkitTransform`.
 *
 * The leading-dash form is not a special case: the same replacement that
 * uppercases after an inner dash also uppercases the first letter of a vendor
 * prefix, which is exactly React's convention.
 *
 * Custom properties (`--brand`) are returned untouched — React reads those
 * verbatim — and the caller quotes them, since `--brand` is not an identifier.
 */
function cssPropertyToJs(name: string): string {
  if (name.startsWith("--")) return name;
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * `"padding: 16px 24px; border-radius: 8px"` -> `{ padding: "16px 24px", borderRadius: "8px" }`
 *
 * The result is the *inner* object source. `mdast-util-mdx-jsx` wraps an
 * attribute value expression in one more pair of braces when it serialises, so
 * this becomes `style={{ … }}` on the page — the form JSX requires.
 *
 * Returns `undefined` when nothing usable parses, so the caller can drop the
 * attribute rather than emit an empty `style={{}}`.
 *
 * Note: `!important` survives into the value string, but React's style object
 * has no way to apply it. A declaration that depends on it needs a real CSS
 * rule instead.
 */
export function styleToObjectSource(style: string): string | undefined {
  const entries: string[] = [];

  for (const declaration of splitDeclarations(style)) {
    const separator = declaration.indexOf(":");
    if (separator < 1) continue;

    const name = declaration.slice(0, separator).trim();
    const value = declaration.slice(separator + 1).trim();
    if (!name || !value) continue;

    const jsName = cssPropertyToJs(name);
    const key = IDENTIFIER.test(jsName) ? jsName : JSON.stringify(jsName);
    // JSON.stringify quotes and escapes values that contain quotes themselves,
    // e.g. `font-family: "Helvetica Neue", sans-serif`.
    entries.push(`${key}: ${JSON.stringify(value)}`);
  }

  return entries.length ? `{ ${entries.join(", ")} }` : undefined;
}

/**
 * The JSX spelling of a HAST property name.
 *
 * HAST already stores most properties under their React name (`className`,
 * `htmlFor`, `tabIndex`, `colSpan`), which is what JSX wants. The exceptions are
 * `data-*` and `aria-*`: HAST camelCases them, JSX does not accept that form, so
 * those revert to the HTML attribute spelling.
 */
function jsxAttributeName(property: string): string {
  const info = find(html, property);
  const attribute = info.attribute;
  if (attribute.startsWith("data-") || attribute.startsWith("aria-")) return attribute;
  return info.property || property;
}

/**
 * One HAST property -> zero or one JSX attribute.
 *
 * Returns `undefined` for anything with no JSX representation: an absent value,
 * an empty string, or a boolean that is `false`.
 */
function toJsxAttribute(property: string, value: Properties[string]): MdxJsxAttribute | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const name = jsxAttributeName(property);
  const info = find(html, property);

  if (typeof value === "boolean") {
    // A bare attribute: `<input disabled />`, never `disabled="true"`.
    return value ? { type: "mdxJsxAttribute", name, value: null } : undefined;
  }

  if (Array.isArray(value)) {
    // Only `accept`, `coords` and `exportParts` tokenise on commas; the other
    // two dozen — `className`, `rel`, `sandbox`, `headers`, … — use spaces.
    // property-information is the only thing that knows which is which.
    const joined = value.join(info.commaSeparated ? ", " : " ").trim();
    return joined ? { type: "mdxJsxAttribute", name, value: joined } : undefined;
  }

  if (name === "style") {
    const source = styleToObjectSource(String(value));
    if (!source) return undefined;
    return {
      type: "mdxJsxAttribute",
      name,
      value: { type: "mdxJsxAttributeValueExpression", value: source },
    };
  }

  // Numbers are emitted as strings. React coerces `colSpan="2"` correctly, and
  // a string keeps the output identical to how the source authored it.
  return { type: "mdxJsxAttribute", name, value: String(value) };
}

/**
 * Every property on an element, as JSX attributes.
 *
 * This replaces a `typeof value === "string" || "number"` filter, which quietly
 * dropped `className` (an array) and every boolean attribute.
 */
export function hastPropsToJsxAttributes(node: Element): MdxJsxAttribute[] {
  const attributes: MdxJsxAttribute[] = [];

  for (const [property, value] of Object.entries(node.properties ?? {})) {
    const attribute = toJsxAttribute(property, value);
    if (attribute) attributes.push(attribute);
  }

  return attributes;
}

/**
 * Whether an element carries presentation worth keeping it in the tree for.
 *
 * `id` counts only when ids are being kept — otherwise `cleanAttributes` has
 * already removed it, and an element with nothing else on it should still
 * dissolve into its children.
 */
export function hasPresentation(node: Element): boolean {
  const properties = node.properties ?? {};
  const className = properties.className;
  const hasClass = Array.isArray(className) ? className.length > 0 : Boolean(className);
  return hasClass || Boolean(properties.style) || Boolean(properties.id);
}

/**
 * Attributes a GFM table cannot express, regardless of styling.
 *
 * A pipe table has no way to merge cells, so `colspan`/`rowspan` are silently
 * lost — two cells become one, and every row after it is misaligned. Detecting
 * them is what lets a table opt into JSX output.
 */
export function hasSpanAttributes(node: Element): boolean {
  const properties = node.properties ?? {};
  return Boolean(properties.colSpan) || Boolean(properties.rowSpan);
}
