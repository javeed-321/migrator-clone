export const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  grey: "\x1b[90m",
  default: "\x1b[0m",
} as const;

const noColors = {
  red: "",
  green: "",
  yellow: "",
  blue: "",
  grey: "",
  default: "",
} as const;

export type Status = "success" | "failure" | "error" | "warn" | "warning" | "info";

const hasColors =
  typeof process !== "undefined" &&
  !!process.stdout &&
  typeof process.stdout.hasColors === "function" &&
  process.stdout.hasColors();

export const activeColors = hasColors ? colors : noColors;

/** Set to false by the API route so a web request does not spam the server log. */
export let logsEnabled = true;

export function setLogsEnabled(enabled: boolean): void {
  logsEnabled = enabled;
}

/** One cell. Objects are inlined rather than pretty-printed — a row is one line. */
function toCell(value: unknown, max: number): string {
  const text =
    value === null || value === undefined
      ? ""
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/**
 * A padded table for an array of flat objects — the shape `retrieveTabLinks`
 * and the nav walk both produce.
 *
 * `console.table` would also work, but it boxes every cell in heavy borders and
 * prints an index column nobody reads. This keeps the indent the rest of the log
 * output uses, so the table reads as part of the line above it rather than as a
 * separate artefact dropped into the stream.
 *
 * Columns are inferred from the keys present across all rows, so a row missing a
 * key still lines up instead of shifting the ones after it.
 */
export function logTable(
  label: string,
  rows: Record<string, unknown>[],
  opts: { columns?: string[]; maxWidth?: number } = {}
): void {
  if (!logsEnabled) return;

  const maxWidth = opts.maxWidth ?? 60;
  const keys = opts.columns ?? [...new Set(rows.flatMap((row) => Object.keys(row)))];

  log(`${label} (${rows.length})`, rows.length ? "info" : "warn");
  if (!rows.length || !keys.length) {
    console.log(`${activeColors.grey}     (none)${activeColors.default}`);
    return;
  }

  const cells = rows.map((row) => keys.map((key) => toCell(row[key], maxWidth)));
  const widths = keys.map((key, column) =>
    Math.max(key.length, ...cells.map((row) => row[column]?.length ?? 0))
  );

  const line = (values: string[]) =>
    `     ${values.map((value, column) => value.padEnd(widths[column] ?? 0)).join("  ")}`.trimEnd();

  console.log(`${activeColors.grey}${line(keys)}${activeColors.default}`);
  console.log(
    `${activeColors.grey}${line(widths.map((width) => "─".repeat(width)))}${activeColors.default}`
  );
  for (const row of cells) console.log(line(row));
}

export function log(message: unknown, status: Status | undefined = undefined): void {
  if (!logsEnabled) return;

  const msg = typeof message === "string" ? message.toLowerCase() : "";
  if (!status) {
    if (
      msg.includes("fail") ||
      msg.includes("error") ||
      msg.includes("could not") ||
      msg.includes("invalid")
    ) {
      status = "error";
    } else if (msg.includes("success") || msg.includes("written") || msg.includes("complete")) {
      status = "success";
    } else if (msg.includes("warn")) {
      status = "warn";
    }
  }

  let color: string = activeColors.blue;
  let label = "INFO";
  let icon = "ⓘ";

  switch (status) {
    case "success":
      color = activeColors.green;
      label = "SUCCESS";
      icon = "✔";
      break;
    case "warn":
    case "warning":
      color = activeColors.yellow;
      label = "WARNING";
      icon = "⚠";
      break;
    case "failure":
    case "error":
      color = activeColors.red;
      label = "ERROR";
      icon = "✘";
      break;
  }

  const text =
    typeof message === "string" || typeof message === "number" || typeof message === "boolean"
      ? message
      : JSON.stringify(message, undefined, 2);

  const stream = status === "error" || status === "failure" ? console.error : console.log;
  stream(`${color}${icon}  ${label}${activeColors.default} - ${text}`);
}
