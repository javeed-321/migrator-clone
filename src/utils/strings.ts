export function removeTrailingSlash(str: string): string {
  return str.endsWith("/") ? str.substring(0, str.length - 1) : str;
}

export function removeLeadingSlash(str: string): string {
  return str.startsWith("/") ? str.substring(1) : str;
}

export function optionallyAddLeadingSlash(str: string): string {
  return str.startsWith("/") ? str : "/" + str;
}

/** `get-started` / `get_started` -> `Get Started`. */
export function convertStrToTitle(str: string): string {
  return str
    .split(/[-_]/)
    .map((part) => (part[0] ? `${part[0].toUpperCase()}${part.substring(1)}` : part))
    .join(" ");
}
