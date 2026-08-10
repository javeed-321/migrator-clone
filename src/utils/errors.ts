import type { PageResultData, Result } from "../types/result";
import { log } from "./log";

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? `: ${error.message}` : "";
}

export function logErrorResults(actionThatFailed: string, results: Result<PageResultData>[]): void {
  const errors = results.filter((result) => !result.success);
  if (errors.length === 0) return;

  log(`We encountered ${errors.length} errors when ${actionThatFailed}`, "warn");
  errors.forEach((result) => {
    if (result.success) return;
    log(result.message, "failure");
  });
}
