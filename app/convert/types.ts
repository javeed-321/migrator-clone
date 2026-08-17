export type ConvertResponse =
  | { ms: number; mdx: string; ok: true }
  | { message: string; ok: false };

/** The four `cleanAttributes` flags, as the UI holds them. */
export interface ConvertOptions {
  dropHashedClassNames: boolean;
  keepClassNames: boolean;
  keepIds: boolean;
  keepStyles: boolean;
}

export const DEFAULT_OPTIONS: ConvertOptions = {
  keepClassNames: true,
  keepStyles: true,
  keepIds: false,
  dropHashedClassNames: true,
};
