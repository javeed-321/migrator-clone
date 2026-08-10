import type { NavigationEntry } from "../types/nav";

/**
 * Step 7: flatten the nav tree into the flat URL list the fetch pool consumes.
 *
 * `new URL(slug, origin)` is what turns a relative sidebar href into an
 * absolute URL, and it is also what makes the origin comparison in step 7b
 * (internal vs external) possible.
 */
export function iterateOverNavItems(navItems: NavigationEntry[], origin: string): URL[] {
  return navItems.flatMap((navItem) => recurseOverGroup(navItem, origin));
}

function recurseOverGroup(group: NavigationEntry, origin: string): URL[] {
  if (typeof group === "string") {
    return [new URL(group, origin)];
  }

  return group.pages.flatMap((pageOrGroup) => {
    if (typeof pageOrGroup === "string") {
      return [new URL(pageOrGroup, origin)];
    }
    return recurseOverGroup(pageOrGroup, origin);
  });
}
