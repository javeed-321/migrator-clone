export function dedupedAppend<T>(item: T, arr: T[], prepend?: boolean): T[] {
  if (arr.includes(item)) return arr;
  if (prepend) {
    arr.unshift(item);
  } else {
    arr.push(item);
  }
  return arr;
}
