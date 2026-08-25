#!/usr/bin/env node
/**
 * Checker 1 — will the SITE render this page?
 *
 * Mirrors what documentation-ai-app actually does to a file:
 *
 *   r2.ts            frontmatter off, then preprocessMdx over the body
 *   MDXRemoteServer  remark-gfm -> rehype-mdx-code-props -> rehype-mermaid
 *                    -> rehype-slug, blockJS: false, scope: { user }
 *   defaultComponents  the only component names that exist
 *
 * The important detail is the order. The preprocessor runs first, so this
 * checks the text the app compiles rather than the text on disk — otherwise it
 * reports `{productName}` as a crash when the preprocessor escapes it, and
 * stays quiet about the fence metadata the preprocessor deletes.
 *
 *   node checkers/app-checker.mjs output/projects/docs-x/pages/
 *   node checkers/app-checker.mjs page.mdx --json
 *
 * Exits 1 if anything is a blocker.
 */

import {
  ATTRS, CAMEL_PROPS, CONDITIONAL_COMPONENTS, FENCE_META_PROPS, HTML_ELEMENTS, ICON_ATTRS,
  JS_GLOBALS, LUCIDE_NAME, MDX_SCOPE, RENDER_COMPONENTS,
} from './contract.mjs';
import {
  attrsOf, describeParseError, isJsx, lineOf, makeReporter, parseMdx, runChecker, splitFrontmatter, walk,
} from './lib.mjs';
import { preprocess } from './preprocess.mjs';

function check(file, raw) {
  const { yaml, body, offset } = splitFrontmatter(raw);
  const report = makeReporter(file);

  if (!/^\s*title\s*:/m.test(yaml)) {
    report.flag('frontmatter', 1, 'no `title` in frontmatter — the page has no H1 and no sidebar label');
  }

  // What the app compiles is the preprocessed body, so that is what is parsed.
  const { text, shifted } = preprocess(body);
  for (const pass of shifted) {
    report.flag('line-shift', undefined, `the preprocessor ${pass}, so line numbers below are approximate`);
  }

  const { tree, error } = parseMdx(text);
  if (error) {
    const { message, line, column } = describeParseError(error, offset);
    report.blocker(
      'mdx-compile',
      line,
      `the page will not compile${column ? ` (column ${column})` : ''} — ${message}`
    );
    return report.findings; // Nothing below can be trusted without a tree.
  }

  checkRendered(tree, report, offset);
  checkAuthored(body, report, offset);
  return report.findings;
}

/* ------------------------------------------------------------------ *
 * Against the compiled tree
 * ------------------------------------------------------------------ */

function checkRendered(tree, report, offset) {
  walk(tree, (node) => {
    if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
      checkExpression(node.value ?? '', lineOf(node, offset), report, 'an expression on the page');
      return;
    }
    if (!isJsx(node) || node.name === null) return;

    const { name } = node;
    const line = lineOf(node, offset);

    // 1. Does the component exist at all?
    if (/^[A-Z]/.test(name)) {
      if (!RENDER_COMPONENTS.has(name)) {
        if (CONDITIONAL_COMPONENTS.has(name)) {
          report.flag('conditional-component', line, `<${name}> only exists on a page the API playground drives — it is undefined anywhere else`);
        } else {
          report.blocker('unknown-component', line, `<${name}> is not one of the ${RENDER_COMPONENTS.size} components the app defines — the whole page fails to render`);
        }
      }
    } else if (!HTML_ELEMENTS.has(name)) {
      report.flag('unknown-tag', line, `<${name}> is not an HTML element — React will render it as an unknown custom element`);
    }

    // 2. Attributes.
    const schema = ATTRS[name];
    const seen = new Set();
    for (const attribute of attrsOf(node)) {
      if (attribute.spread) {
        report.blocker('spread-attribute', line, `<${name}> uses a spread attribute — there is nothing in scope to spread`);
        continue;
      }
      seen.add(attribute.name);

      if (attribute.expression !== null) {
        checkExpression(attribute.expression, line, report, `<${name} ${attribute.name}={…}>`);
      }

      if (/[A-Z]/.test(attribute.name) && !CAMEL_PROPS.has(attribute.name)) {
        const kebab = attribute.name.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (schema?.known?.includes(kebab)) {
          report.flag('attribute-case', line, `<${name} ${attribute.name}=…> is read as \`${kebab}\` — the app destructures kebab-case only, so this value is dropped`);
        }
      }

      if (schema?.known && !schema.known.includes(attribute.name) && !CAMEL_PROPS.has(attribute.name)) {
        report.flag('unknown-attribute', line, `<${name}> has no \`${attribute.name}\` prop — it is passed through and ignored`);
      }

      const allowed = schema?.enums?.[attribute.name];
      if (allowed && attribute.value !== null && !allowed.includes(attribute.value)) {
        report.flag('enum', line, `<${name} ${attribute.name}="${attribute.value}"> is not one of ${allowed.join(', ')} — it silently falls back to the default`);
      }

      if (ICON_ATTRS.has(attribute.name) && attribute.value && !LUCIDE_NAME.test(attribute.value)) {
        report.flag('icon', line, `icon="${attribute.value}" is not a kebab-case Lucide name — the app PascalCases it and a miss renders nothing`);
      }
    }

    for (const required of schema?.required ?? []) {
      if (!seen.has(required)) {
        report.flag('missing-attribute', line, `<${name}> has no \`${required}\``);
      }
    }

    // 3. Images, which have their own two habits worth catching.
    if (name === 'Image') {
      const src = attrsOf(node).find((a) => a.name === 'src')?.value ?? '';
      const external = /^https?:\/\//.test(src);
      const sized = attrsOf(node).some((a) => a.name === 'width' || a.name === 'height');
      if (external && sized) {
        report.flag('image-dimensions', line, 'an external image should not carry width/height — the imgix loader passes the URL through untouched and the numbers are a guess');
      }
    }
  });
}

/**
 * Every free identifier in an expression, checked against the one binding there
 * is. `blockJS: false` means these compile — they throw at render instead, and
 * with no error boundary under src/app that is the whole page.
 */
function checkExpression(source, line, report, where) {
  const text = source
    .replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, '""')      // string literals
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1$3'); // object keys

  const free = new Set();
  for (const match of text.matchAll(/(^|[^.\w$])([A-Za-z_$][\w$]*)/g)) {
    const identifier = match[2];
    if (JS_GLOBALS.has(identifier) || MDX_SCOPE.has(identifier)) continue;
    free.add(identifier);
  }

  for (const identifier of free) {
    report.blocker(
      'undefined-identifier',
      line,
      `${where} reads \`${identifier}\`, which is not in scope — only \`user\` is bound, so this throws at render`
    );
  }
}

/* ------------------------------------------------------------------ *
 * Against the authored text, for things the preprocessor removes
 * ------------------------------------------------------------------ */

function checkAuthored(body, report, offset) {
  const { tree } = parseMdx(body);
  if (!tree) return; // The source alone failing to parse is the compile check's business.

  walk(tree, (node, parent) => {
    // Rather than re-derive pass 2's whitelist rules — which are fiddly, and
    // which put the *first* word forward as the title even when a later word
    // looks more like a filename — put the header back through the preprocessor
    // and read what comes out. The answer cannot drift from the port that way.
    if (node.type === 'code' && node.meta) {
      const before = node.meta.trim();
      const probe = `\`\`\`${node.lang ?? ''} ${before}\n\n\`\`\`\n`;
      const after = (/^```[\w-]*[ \t]?([^\n]*)/.exec(preprocess(probe).text)?.[1] ?? '').trim();
      if (after !== before) {
        report.flag(
          'fence-meta',
          lineOf(node, offset),
          `the fence header \`${before}\` reaches the parser as \`${after || '(nothing)'}\` — only a title and ${[...FENCE_META_PROPS].join('/')} survive`
        );
      }
    }

    if (isJsx(node) && node.name === 'br') {
      report.flag('br', lineOf(node, offset), '<br /> — blank lines are the paragraph break, and a stray <br /> shows up as extra space');
    }

    // A lone <a> between blocks. remark-wrap-flow-inline-jsx would give it a
    // paragraph, but the app registers that plugin only in the PDF route — on
    // the site consecutive ones collapse onto a single line.
    if (node.type === 'mdxJsxFlowElement' && node.name === 'a' && parent?.type !== 'paragraph') {
      report.flag('block-anchor', lineOf(node, offset), 'a block-level <a> gets no paragraph wrapper on the site — use a markdown link, or neighbouring links will run together');
    }
  });
}

runChecker({
  title: 'app-checker — will the site render this?',
  check,
  argv: process.argv.slice(2),
  usage: 'Usage: node checkers/app-checker.mjs <file-or-dir>... [--json] [--only blocker|degrade|flag]',
});
