/*
 * Renders LaTeX on the published site — marketplace-conversion.md §5.4.
 *
 * Register in documentation.json alongside KaTeX's stylesheet:
 *
 *   { "css":     [{ "src": "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" }],
 *     "scripts": [{ "src": "scripts/katex-render.js" }] }
 *
 * `<Latex>` converts to `<div className="math">` and leaves the formula as text,
 * so this is what actually draws it.
 *
 * Two decisions worth knowing:
 *
 * 1. **Only `.math` is rendered, never the whole page.** Auto-rendering the body
 *    would turn any ordinary "$5 and $10" in prose into a mangled equation. The
 *    conversion marks exactly where maths is; this respects that boundary.
 *
 * 2. **It re-runs on navigation.** A docs site is a single-page app, so a page
 *    opened by clicking a sidebar link never fires another load event. A
 *    MutationObserver catches those, and rendered nodes are marked so a second
 *    pass cannot double-render them.
 */
(function () {
  var VERSION = '0.16.22';
  var BASE = 'https://cdn.jsdelivr.net/npm/katex@' + VERSION + '/dist/';
  var DONE = 'data-katex-done';

  function load(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.loaded === 'true') return resolve();
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', reject);
        return;
      }

      var script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.addEventListener('load', function () {
        script.dataset.loaded = 'true';
        resolve();
      });
      script.addEventListener('error', reject);
      document.head.appendChild(script);
    });
  }

  /*
   * Turns `&#123;` back into `{` before KaTeX sees it.
   *
   * A brace is the one character MDX cannot leave alone — `{x}` is an expression —
   * so a docs platform will often HTML-encode it on the way to the page. That is
   * correct for prose and fatal for maths: KaTeX receives the literal seven
   * characters `&#123;` where `\frac{a}{b}` needs a brace, fails to parse, and
   * (with throwOnError off) prints the raw TeX in red.
   *
   * Decoding numeric entities is enough. If the source were double-encoded
   * (`&amp;#123;`), the DOM has already resolved `&amp;` to `&` by the time this
   * runs, leaving exactly the `&#123;` this handles.
   *
   * Scoped to `.math`, like everything else here: rewriting entities across the
   * page would corrupt any prose that means to show an entity literally.
   */
  function decodeEntities(block) {
    var walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null, false);
    var node;

    while ((node = walker.nextNode())) {
      var decoded = node.nodeValue
        .replace(/&#(\d+);/g, function (_, dec) { return String.fromCharCode(Number(dec)); })
        .replace(/&#x([0-9a-fA-F]+);/g, function (_, hex) { return String.fromCharCode(parseInt(hex, 16)); });

      if (decoded !== node.nodeValue) node.nodeValue = decoded;
    }
  }

  function renderAll() {
    if (!window.renderMathInElement) return;

    var blocks = document.querySelectorAll('.math:not([' + DONE + '])');

    for (var i = 0; i < blocks.length; i += 1) {
      var block = blocks[i];
      decodeEntities(block);
      try {
        window.renderMathInElement(block, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
          ],
          // Leave the source visible rather than blanking the formula: a reader
          // seeing raw TeX can still read it, and the console names the problem.
          throwOnError: false,
        });
      } catch (error) {
        if (window.console) window.console.warn('katex-render: could not render a .math block', error);
      }
      block.setAttribute(DONE, 'true');
    }
  }

  function start() {
    renderAll();

    var observer = new MutationObserver(function () {
      // Cheap guard: only re-scan when an unrendered block actually appears.
      if (document.querySelector('.math:not([' + DONE + '])')) renderAll();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  load(BASE + 'katex.min.js')
    .then(function () { return load(BASE + 'contrib/auto-render.min.js'); })
    .then(function () {
      if (document.body) start();
      else document.addEventListener('DOMContentLoaded', start);
    })
    .catch(function (error) {
      if (window.console) window.console.error('katex-render: KaTeX failed to load', error);
    });
})();
