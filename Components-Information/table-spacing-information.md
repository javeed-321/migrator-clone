# Table spacing & indentation — Documentation.AI migrator reference

How whitespace and indentation behave in Documentation.AI tables (a hosted GFM renderer),
and how to migrate nested-parameter tables without losing the hierarchy. Written for anyone
building a docs → Documentation.AI migrator.

---

## The core confusion: two different "spacings"

They both look like spaces but behave oppositely. Separate them first.

| | What it is | Renders? |
|---|---|---|
| **Column padding** | Spaces in the raw `.md` to line columns up in your editor: `\| foo    \| bar \|` | **No** — purely cosmetic, the parser trims it |
| **Semantic indentation** | Indenting a nested parameter in the first column so hierarchy is visible: `    ◦ childField` | **Only if you use the right characters** |

Most migrator bugs come from trying to build the second with the technique the parser discards.

## The one rule that governs everything

> **GFM (GitHub-Flavored Markdown) strips all leading and trailing ASCII whitespace from
> every table cell before rendering.**

Consequences:

- Column-padding spaces → trimmed → irrelevant. Keep them for readability or don't; output is identical.
- **Match cells by CONTENT, never by column position** — padding differs and is meaningless.
- Plain ASCII spaces used to indent a nested param → **also trimmed → indentation vanishes.** This is the #1 bug.

## What survives (and renders as indent)

Characters the parser treats as content, not whitespace:

| Char | Code point | Notes |
|---|---|---|
| Em space | **U+2003** | ✅ **Recommended.** Widest, robust; survives the parser AND the hosted visual editor |
| No-break space | U+00A0 | Survives, but the visual editor often collapses or disallows it |
| `&nbsp;` entity | — | Works, same editor-collapse risk as U+00A0 |
| Bullet glyphs `•` `◦` `▪` | U+2022 / U+25E6 / U+25AA | Visible depth markers — pair with em-spaces |

**Use literal em-space (U+2003), not `&nbsp;`.** It is the one that survives both the parser
and the hosted editor.

## Recommended encoding scheme

Encode depth as *glyph + N em-spaces* in the first cell (`⎵` = U+2003 em-space, shown as a
symbol so the count is visible):

```
Depth 0 (top-level param):  `fieldName`
Depth 1:  ⎵⎵• `childField`            (2 em-spaces + • )
Depth 2:  ⎵⎵⎵⎵◦ `grandChild`          (4 em-spaces + ◦ )
Depth 3:  ⎵⎵⎵⎵⎵⎵▪ `greatGrandChild`   (6 em-spaces + ▪ )
```

## Mapping source depth → your scheme

ReadMe / Document360 sources encode depth several ways. Normalize all to a level number, then
emit the scheme above.

| Source marker | Depth |
|---|---|
| `fieldName` (plain) | 0 |
| `* fieldName` or `- fieldName` (leading bullet in cell) | 1 |
| `-- fieldName` / `\-- fieldName` | 2 |
| `... fieldName` / `.fieldName` / `..fieldName` (stair-step dots) | by dot count |
| already-indented `<td>` with leading `&nbsp;` / spaces | count them |

## Traps that bite the migrator code

1. **`str.strip()` deletes U+00A0 and other Unicode spaces.** A bare `.strip()` makes an indented
   cell look identical to a flush one — you mis-render AND mis-audit. Use `.strip(' \t\r\n')`.
2. **`grep -P '\xc2\xa0'` returns 0 even when NBSP is present.** Do all Unicode counting in Python,
   never grep.
3. **Idempotency:** when re-editing a file you already indented, strip only ASCII (`.strip(' \t')`)
   so you don't remove the em-spaces added on a previous run.
4. **Never put a literal newline in a pipe-table cell** — it breaks the row. For an in-cell line
   break use `<br>` or the `&#xA;` / `&#10;` entity. (This is the other half of the "spacing"
   confusion.)
5. **`\*` stays literal** — keep the backslash; stripping it turns a mandatory-marker asterisk into
   stray italics.
6. **The first column is the only legitimate place for indentation.** Indent chars in any other
   column are content corruption.

## Reference snippet

```python
EM = " "                       # U+2003 EM SPACE — the survivor
GLYPH = {1: "•", 2: "◦", 3: "▪"}   # • ◦ ▪

def indent_first_cell(name: str, depth: int) -> str:
    """depth 0 = top-level; 1..3 = nested."""
    if depth <= 0:
        return name
    return f"{EM * (2 * depth)}{GLYPH.get(depth, '▪')} {name}"

def clean_cell(cell: str) -> str:
    """Strip ONLY ascii so you never eat the em-spaces you added."""
    return cell.strip(" \t\r\n")

def looks_ascii_indented(first_cell: str) -> bool:
    """Flag a cell that (wrongly) uses plain leading spaces for indent."""
    return first_cell[:1] == " " and not first_cell.lstrip(" ").startswith((EM,))
```

## Always verify on the live preview

The final render is the **platform's** renderer, not your local markdown compiler. ASCII-space
indentation can look fine in a local GFM preview and still collapse on Documentation.AI (and
`&nbsp;` can behave differently too). Confirm one nested table on the live preview before trusting
the scheme across the whole corpus.

## One-line summary

Column padding is cosmetic and trimmed; to show real indentation put an **em-space (U+2003) +
glyph** in the **first cell only**, never plain ASCII spaces — and strip cells with an explicit
`' \t\r\n'` charset so you never destroy or miscount it.
