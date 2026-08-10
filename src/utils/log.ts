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
