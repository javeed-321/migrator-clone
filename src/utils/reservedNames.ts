/**
 * The bare origin (`https://docs.example.com/`) has no pathname, so it cannot
 * become a filename. It takes the first of these not already claimed by a real
 * page.
 */
export const INDEX_NAMES = ["home", "introduction", "getting-started", "get-started", "welcome", "start"];

export function iterateThroughReservedNames(namesToUse: string[], namesInUse: string[]): string {
  for (const name of namesToUse) {
    if (namesInUse.includes(name)) continue;
    return name;
  }
  return "";
}
