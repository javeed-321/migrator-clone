---
title: "Step 7 — Flatten and partition"
description: "Turning the nav tree into a flat URL list, then splitting it into internal, external and root links."
---

## What this step does

Two things:

- **7a** — flatten the nav tree into a flat list of absolute `URL` objects.
- **7b** — split that list three ways, and apply the path filter.

## Files

| File | Role |
|------|------|
| [`src/nav/iterate.ts`](../src/nav/iterate.ts) | 7a — the flatten |
| [`src/pipeline/site.ts`](../src/pipeline/site.ts) | 7b — the partition, filter and root-name assignment |

## 7a — Flatten

The whole file is 20 lines:

```ts
export function iterateOverNavItems(navItems: NavigationEntry[], origin: string): URL[] {
  return navItems.flatMap((navItem) => recurseOverGroup(navItem, origin));
}

function recurseOverGroup(group: NavigationEntry, origin: string): URL[] {
  if (typeof group === "string") return [new URL(group, origin)];

  return group.pages.flatMap((pageOrGroup) => {
    if (typeof pageOrGroup === "string") return [new URL(pageOrGroup, origin)];
    return recurseOverGroup(pageOrGroup, origin);
  });
}
```

`new URL(slug, origin)` does the real work. It resolves the relative slug from
[step 6](06-walk-sidebar.md) against the site origin, and — critically — it also normalises an
absolute href. If a sidebar link points at `https://status.example.com/x`, the second argument is
ignored and you get that absolute URL back. That is what makes the origin comparison in 7b possible.

Group names are not visited, only pages. The tree structure is discarded here; it survives separately
in `navItems`, which step 9 repairs.

## 7b — Partition

```ts
const externalLinks = listOfLinks.filter((link) => link.origin !== origin);

const internalLinks = listOfLinks.filter((link) => {
  if (link.origin !== origin || removeTrailingSlash(link.toString()) === origin) return false;
  if (opts.filter && !matchesFilter(link.pathname, opts.filter)) return false;
  return true;
});

const rootLinks = listOfLinks.filter((link) => {
  if (link.origin !== origin || removeTrailingSlash(link.toString()) !== origin) return false;
  if (opts.filter && !matchesFilter("/", opts.filter)) return false;
  return true;
});
```

| Bucket | Definition | What happens to it |
|--------|-----------|--------------------|
| `external` | Different origin | Never fetched. Gets a slug so the nav can point somewhere local. |
| `internal` | Same origin, has a pathname | Fetched in [step 8](08-fetch-pool.md) |
| `root` | Same origin, pathname is bare `/` | Fetched, but needs a filename first |

The three buckets are disjoint and cover the whole list.

## The root-name problem

A link to `https://docs.example.com/` has no pathname, so there is no slug to use as a filename.
`removeTrailingSlash(link.toString()) === origin` is the test for it.

The fix borrows the first unclaimed name from a reserved list:

```ts
const rootPaths = rootLinks.map(() => {
  const name = iterateThroughReservedNames(INDEX_NAMES, allPathnames);
  allPathnames.push(name);
  return name;
});
```

`INDEX_NAMES` is `home`, `introduction`, `getting-started`, `get-started`, `welcome`, `start`. If the
site already has a real page called `home`, the root link takes `introduction` instead. Each
assignment is pushed back into `allPathnames` so two root links cannot claim the same name.

`rootPaths` is index-aligned with `rootLinks`, which is why [step 8](08-fetch-pool.md) has to track a
global offset across chunks.

If every reserved name is taken, `iterateThroughReservedNames` returns `""` — the root link ends up
without a slug and gets pruned in step 9. An acceptable edge case, and the same as upstream.

## The filter

```ts
function matchesFilter(pathname: string, filter: string): boolean {
  const normalizedPathname = removeTrailingSlash(pathname);
  const normalizedFilter = removeTrailingSlash(optionallyAddLeadingSlash(filter));
  return (
    normalizedPathname === normalizedFilter ||
    normalizedPathname.startsWith(normalizedFilter + "/")
  );
}
```

`--filter /docs` matches `/docs` and `/docs/anything`, but **not** `/docs-old`. The `+ "/"` is what
makes it path-segment aware — unlike the overview marker in step 6, which is a plain `startsWith`.

The filter is applied **twice**, deliberately:

1. Here, so filtered-out pages are never fetched.
2. Again in [step 9d](09-repair-navigation.md), so they are also removed from the nav tree.

Filtering only here would leave the nav tree pointing at pages that were never fetched.

## What the report records

All three buckets, plus the unpartitioned `discovered` list, end up in the `DiscoveryReport`. That is
the audit trail: `discovered` is what the sidebar claimed exists, and the buckets show what happened
to each one.

On a filtered Capillary run: `discovered: 1022`, `internal: 1`. The gap is the filter, not a failure.

## Gotchas

- **`new URL()` throws on a malformed slug.** A sidebar `href` of `javascript:void(0)` would throw
  here rather than being skipped. Not seen in practice — step 6 already drops `#` and empty hrefs.
- **Duplicates are preserved.** A page cross-listed in two categories is fetched twice. Deduplicating
  would be easy but would desynchronise `rootPaths` alignment and hide genuine sidebar duplication.
- **`external` links are never fetched**, so an external link's "failure" is impossible — it always
  succeeds with a generated slug.

## Related

- [Step 6 — Walk the sidebar](06-walk-sidebar.md) — produces the tree flattened here
- [Step 8 — Fetch the pages](08-fetch-pool.md) — consumes all three buckets
- [Step 9 — Repair the navigation](09-repair-navigation.md) — where the filter is applied again
