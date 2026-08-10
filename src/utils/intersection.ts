export function intersection<T>(set1: Set<T> | T[], set2: Set<T> | T[]): Set<T> {
  const a = Array.isArray(set1) ? new Set(set1) : set1;
  const b = Array.isArray(set2) ? new Set(set2) : set2;

  const intersected = new Set<T>();
  for (const el of a) {
    if (b.has(el)) intersected.add(el);
  }
  return intersected;
}
