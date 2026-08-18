/**
 * ReadMe icons -> Documentation.AI icons.
 *
 * The two platforms do not share an icon vocabulary. ReadMe accepts emoji or a
 * Font Awesome class string (`icon="fa-info-circle"`, and Font Awesome 7's
 * Regular and Duotone families are both loaded); Documentation.AI takes **Lucide**
 * names (`icon="rocket"`).
 *
 * No mechanical mapping exists between the two sets, so this is a **curated
 * allow-list, not a transform**: a name in the table converts, a name that is not
 * is dropped and reported. `icon` is optional on every Documentation.AI component
 * that accepts one, so dropping loses decoration; guessing puts a wrong picture
 * next to real content. Extend the table as a migration meets new icons.
 */
export const FA_TO_LUCIDE: Record<string, string> = {
  apple: "apple",
  bell: "bell",
  book: "book-open",
  "book-open": "book-open",
  bug: "bug",
  calendar: "calendar",
  check: "check",
  "check-circle": "circle-check",
  code: "code",
  cog: "settings",
  comments: "message-circle",
  database: "database",
  download: "download",
  envelope: "mail",
  eye: "eye",
  file: "file-text",
  gear: "settings",
  globe: "globe",
  home: "house",
  "info-circle": "info",
  key: "key",
  link: "link",
  lock: "lock",
  monitor: "monitor",
  play: "play",
  question: "circle-question",
  rocket: "rocket",
  search: "search",
  star: "star",
  terminal: "terminal",
  trash: "trash-2",
  user: "user",
  users: "users",
  wrench: "wrench",
  zap: "zap",
};

/** Emoji, and anything else pictographic. Not an icon *name* on either platform. */
const PICTOGRAPHIC = /\p{Extended_Pictographic}/u;

/** Does this look like a Font Awesome class string rather than a bare name? */
function isFontAwesome(icon: string): boolean {
  return /(^|\s)fa[a-z]*-/.test(icon) || /(^|\s)fa[a-z]*(\s|$)/.test(icon);
}

/**
 * Maps a ReadMe icon to a Lucide name, or `null` when the icon should be dropped.
 *
 * A ReadMe icon is one of exactly two things: an emoji, or a Font Awesome class
 * string `[RM §4.18]`. So:
 *
 * | Input | Result |
 * |---|---|
 * | Emoji (`📘`) | `null` — not a name; a `Callout` draws its own from `kind` |
 * | Font Awesome in the table (`fa-duotone fa-solid fa-rocket`) | the Lucide name (`rocket`) |
 * | Font Awesome not in the table | `null` — dropped, and the caller reports it |
 * | Anything else (`house`, `webhook`) | **passed through unchanged** |
 *
 * That last row is what makes the converters safe to re-run. `fa-home` maps to
 * `house`, and `house` is a Lucide *value*, not a Font Awesome key — so a second
 * pass that tried to map it again would find nothing and drop a correct icon.
 * Since a bare, non-emoji name is not a ReadMe idiom in the first place, it can
 * only be already-converted output or hand-authored Lucide, and the right move for
 * both is to leave it alone.
 */
export function lucideIcon(icon: string | undefined): string | null {
  if (!icon) return null;

  const trimmed = icon.trim();
  if (trimmed.length === 0 || PICTOGRAPHIC.test(trimmed)) return null;

  const bare = trimmed
    .split(/\s+/)
    .map((part) => part.replace(/^fa[a-z]*-/, ""))
    .filter((part) => part.length > 0 && !/^fa[a-z]*$/.test(part))
    .pop();

  if (!bare) return null;

  const name = bare.toLowerCase();
  const mapped = FA_TO_LUCIDE[name];
  if (mapped) return mapped;

  return isFontAwesome(trimmed) ? null : name;
}
