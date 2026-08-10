/**
 * Stand-in for `exponentialBackoff` from @mintlify/common, which the real
 * scraper wraps around every network call.
 */
export async function exponentialBackoff<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; baseDelayMs?: number; maxDelayMs?: number } = {}
): Promise<T> {
  const retries = opts.retries ?? 4;
  const baseDelayMs = opts.baseDelayMs ?? 400;
  const maxDelayMs = opts.maxDelayMs ?? 8000;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      const delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
      // Jitter keeps a chunk of 16 parallel requests from retrying in lockstep.
      const jitter = delay * 0.25 * Math.random();
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    }
  }
  throw lastError;
}
