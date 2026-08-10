import { CHUNK_SIZE } from "../constants";

/** Splits a list into fixed-size batches — the fetch pool's concurrency window. */
export function* intoChunks<T>(values: T[], chunkSize = CHUNK_SIZE): Generator<T[]> {
  for (let i = 0; i < values.length; i += chunkSize) {
    yield values.slice(i, i + chunkSize);
  }
}
