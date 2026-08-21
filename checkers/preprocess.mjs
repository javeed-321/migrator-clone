/**
 * A port of app/src/lib/mdx-preprocessor.ts.
 *
 * ## Why this exists at all
 *
 * The app never compiles the bytes on disk. `r2.ts` runs `preprocessMdx` over
 * every page — and over `description` — before the parser sees a character. So
 * checking the file is checking something that never runs: the preprocessor
 * escapes `{productName}` for you, rewrites `icon={arrow}`, deletes most of a
 * fence's meta string and injects `priority` into the first two images. A check
 * that skips it reports problems the app fixes and misses the ones it creates.
 *
 * ## Two deliberate differences from the original
 *
 * **Pass 12 is skipped.** Collapsing runs of blank lines cannot change any
 * verdict, and it shifts every line number after it — which would make the
 * report point at the wrong line of the file you are about to open.
 *
 * **Passes 7 and 8 are skipped.** Both only fire on content that contains no
 * triple-backtick fence anywhere, repairing hand-typed ``double`` fences. The
 * migrator emits real fences, so they are dead code here.
 *
 * Passes 1 and 9 *can* still move lines. They are rare, so rather than give up
 * accurate line numbers for every page, `preprocess` reports when it hit one and
 * the checker says so once, at the top of that file's findings.
 */

const KNOWN_FENCE_PROPS = ['highlight', 'focus', 'show-lines', 'wrap'];

/**
 * @param {string} content
 * @returns {{ text: string, shifted: string[] }} `shifted` names the passes that
 *   changed the line count, so a caller can stop trusting its own line numbers.
 */
export function preprocess(content) {
  let processed = content;
  const shifted = [];

  // 1. Literal \n becomes a real newline.
  const beforeEscapes = processed;
  processed = processed.replace(/\\n/g, '\n');
  if (processed !== beforeEscapes) shifted.push('literal \\n expanded to newlines');

  // 2. Rebuild every fence's meta string from the whitelist.
  processed = processed.replace(
    /(^|\n)([ \t]*)(```+)([\w-]+)?([ \t][^\n]*)?(\n)/gm,
    (match, lineStart, indent, backticks, language, metadata, newline) => {
      if (!metadata || !metadata.trim()) return match;

      const kept = [];
      const highlight = metadata.match(/highlight=["']([^"']+)["']/);
      if (highlight) kept.push(`highlight="${highlight[1]}"`);
      const focus = metadata.match(/focus=["']([^"']+)["']/);
      if (focus) kept.push(`focus="${focus[1]}"`);
      const showLines = metadata.match(/show-lines(?:=\{?["']?(true|false)["']?\}?)?(?=\s|$)/);
      if (showLines) kept.push(showLines[1] ? `show-lines="${showLines[1]}"` : 'show-lines');
      const wrap = metadata.match(/wrap(?:=\{?["']?(true|false)["']?\}?)?(?=\s|$)/);
      if (wrap) kept.push(wrap[1] ? `wrap="${wrap[1]}"` : 'wrap');

      const identifierMatch = metadata.match(/^[ \t]+([\w./-]+)(?:\s|$)/);
      let identifier = '';
      if (
        identifierMatch &&
        !identifierMatch[1].includes('=') &&
        !KNOWN_FENCE_PROPS.includes(identifierMatch[1])
      ) {
        // A dot or a slash is not legal in a JSX attribute name, so the app
        // turns the bare word into `title="…"` rather than emit invalid JSX.
        if (/[./]/.test(identifierMatch[1])) kept.unshift(`title="${identifierMatch[1]}"`);
        else identifier = identifierMatch[1];
      }

      const meta = [identifier, ...kept].filter(Boolean).join(' ');
      return `${lineStart}${indent}${backticks}${language || ''}${meta ? ' ' + meta : ''}${newline}`;
    }
  );

  // 3. Escape the curly braces that would evaluate as JavaScript.
  processed = fixProblematicCurlyBraces(processed);

  // 4. style="a: b" -> style={{ a: "b" }}
  processed = withProtectedCode(processed, (text) =>
    text.replace(
      /<(\w+)([^>]*?)style="([^"]*?)"([^>]*?)(\/?>)/g,
      (_m, tag, before, value, after, close) =>
        `<${tag}${before}style={${styleObject(value)}}${after}${close}`
    )
  );

  // 5. Unescape \" inside attributes.
  processed = processed.replace(/<(\w+)([^>]*?)\/>/g, (_m, tag, attrs) => `<${tag}${attrs.replace(/\\"/g, '"')}/>`);
  processed = processed.replace(/<(\w+)([^>]*?)>/g, (match, tag, attrs) =>
    tag.startsWith('/') ? match : `<${tag}${attrs.replace(/\\"/g, '"')}>`
  );

  // 6. Blank out a CodeGroup `tabs={[…]}` whose strings contain raw quotes.
  processed = processed.replace(
    /<CodeGroup([^>]*?)tabs=\{\[([^\]]*)\]\}([^>]*?)>/g,
    (match, before, tabs, after) =>
      /="[^"]*"/.test(tabs) ? `<CodeGroup${before}tabs={[]}${after}>` : match
  );

  // 9. Drop incomplete slash commands on their own line.
  const beforeSlash = processed;
  processed = processed.replace(/\n\/[a-z]{1,3}\n/g, '\n');
  if (processed !== beforeSlash) shifted.push('an incomplete /slash line was removed');

  // 10. *emphasis* on a line that also holds a JSX <a> becomes <em>.
  processed = fixEmphasisInJsxAnchors(processed);

  // 11. HTML entities.
  processed = processed.replace(/(&#x20;|&#x22;|&#x27;|&#x5C;)(\*+|_+)(?!\w)/g, '$2');
  processed = processed
    .replace(/&#x20;/g, ' ')
    .replace(/&#x2F;/g, '/')
    .replace(/&#x5C;/g, '\\')
    .replace(/&#x27;/g, "'")
    .replace(/&#x22;/g, '"')
    .replace(/&#x3C;/g, '<')
    .replace(/&#x3E;/g, '>')
    .replace(/&#x26;/g, '&');

  // 14. Unescape \" inside fences.
  processed = processed.replace(/(```+)[^\n]*\n[\s\S]*?\n?\1/g, (fence) => fence.replace(/\\"/g, '"'));

  // 15. priority + fetchPriority onto the first two images.
  processed = addImagePriority(processed);

  return { text: processed, shifted };
}

/* ------------------------------------------------------------------ */

/** Run `fn` over the text with fences and inline code held out of reach. */
function withProtectedCode(content, fn) {
  const regions = [];
  let index = 0;
  let text = content;

  text = text.replace(/(```+)[^\n]*\n[\s\S]*?\n?\1/g, (match) => {
    const key = `__CODEBLOCK_${index++}__`;
    regions.push({ key, match });
    return key;
  });
  text = text.replace(/`[^`\n]*`/g, (match) => {
    const key = `__INLINE_${index++}__`;
    regions.push({ key, match });
    return key;
  });

  text = fn(text);

  for (let i = regions.length - 1; i >= 0; i -= 1) {
    text = text.replace(new RegExp(regions[i].key, 'g'), () => regions[i].match);
  }
  return text;
}

function styleObject(value) {
  if (!value.trim()) return '{}';
  const entries = value
    .split(';')
    .filter((rule) => rule.trim())
    .map((rule) => rule.split(':').map((part) => part.trim()))
    .filter(([property, v]) => property && v)
    .map(([property, v]) => {
      const key = property.replace(/-([a-z])/g, (_m, letter) => letter.toUpperCase());
      return `${key}: ${isNaN(Number(v)) ? `"${v}"` : v}`;
    })
    .join(', ');
  return `{ ${entries} }`;
}

/**
 * The app's pass 3, which is the one that decides whether `{something}` on your
 * page is prose or a crash. Frontmatter, fences, inline code, JSX tags and
 * `${ENV}` are protected; dotted/operator-bearing expressions are protected as
 * genuine JSX; everything else that looks like an identifier or an object is
 * rewritten to `&#123;`, which renders as a literal brace.
 */
function fixProblematicCurlyBraces(content) {
  const regions = [];
  let index = 0;
  let text = content;
  const protect = (prefix) => (match) => {
    const key = `__${prefix}_${index++}__`;
    regions.push({ key, match });
    return key;
  };

  text = text.replace(/^---\n[\s\S]*?\n---/, protect('FRONTMATTER'));
  text = text.replace(/(```+)[^\n]*\n[\s\S]*?\n?\1/g, protect('CODEBLOCK'));
  text = text.replace(/\\+`\{([^}]*)\}\\*`/g, '&#123;$1}');
  text = text.replace(/\\(\{)([a-zA-Z_$][a-zA-Z0-9_$]*)\\?\}/g, '&#123;$2}');
  text = text.replace(/`[^`\n]*`/g, protect('INLINE'));

  const reserved = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);
  text = text.replace(/<[A-Za-z][^>]*>/g, (match) => {
    const fixed = match.replace(/(\s[a-zA-Z_$][\w-]*)=\{([a-zA-Z_$]\w*)\}/g, (attr, name, value) =>
      reserved.has(value) ? attr : `${name}="${value}"`
    );
    const key = `__JSX_TAG_${index++}__`;
    regions.push({ key, match: fixed });
    return key;
  });

  text = text.replace(/\$\{[A-Z][A-Z0-9_]*\}/g, protect('ENV_VAR'));
  text = text.replace(/\{\s*([a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z][a-zA-Z0-9]*)+)\s*\}/g, '&#123;$1}');
  text = text.replace(/\{[^{}]*[.()[\]=>?+\-*/|&!%<>][^{}]*\}/g, protect('JSX_EXPR'));

  text = text.replace(/\{\s*\}/g, '&#123;}');
  text = text.replace(
    /\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*(?:\s*,\s*[a-zA-Z_$][a-zA-Z0-9_$]*)+)\s*\}/g,
    '&#123;$1}'
  );
  text = text.replace(/\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}/g, '&#123;$1}');
  text = text.replace(
    /\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*\s*:\s*[a-zA-Z_$0-9][a-zA-Z0-9_$[\]|]*(?:\s*[,;]\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:\s*[a-zA-Z_$0-9][a-zA-Z0-9_$[\]|]*)*)\s*\}/g,
    '&#123;$1}'
  );
  text = text.replace(/(\/[a-zA-Z0-9_-]+\/?)(\{)([a-zA-Z_$][a-zA-Z0-9_$]*\})/g, '$1&#123;$3');
  text = text.replace(/\{"[^"]+"\s*:\s*[^}]+\}/g, (match) => match.replace('{', '&#123;'));

  for (let i = regions.length - 1; i >= 0; i -= 1) {
    const { key, match } = regions[i];
    const value = key.includes('__ENV_VAR_') ? `\`${match}\`` : match;
    text = text.replace(new RegExp(key, 'g'), () => value);
  }
  return text;
}

function fixEmphasisInJsxAnchors(content) {
  return withProtectedCode(content, (text) =>
    text
      .split('\n')
      .map((line) =>
        /<a\s/.test(line) && /(?<!\*)\*(?!\*)/.test(line)
          ? line.replace(/(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, '<em>$1</em>')
          : line
      )
      .join('\n')
  );
}

function addImagePriority(content) {
  let count = 0;
  return withProtectedCode(content, (text) =>
    text.replace(/<Image([^>]*?)\s*(\/?)>/g, (match, attrs, selfClosing) => {
      count += 1;
      if (count > 2) return match;
      const hasPriority = attrs.includes('priority');
      const hasFetch = attrs.includes('fetchPriority');
      if (hasPriority && hasFetch) return match;
      const added = `${hasPriority ? '' : ' priority={true}'}${hasFetch ? '' : ' fetchPriority="high"'}`;
      return selfClosing === '/' ? `<Image${attrs}${added} />` : `<Image${attrs}${added}>`;
    })
  );
}
