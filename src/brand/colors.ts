/**
 * Colour arithmetic for the brand stage.
 *
 * Only one question here needs any judgement, and it is the one the source site
 * usually cannot answer: **what is the brand colour in dark mode?**
 *
 * ReadMe stores `primary_color_dark` but leaves it null on most projects, because
 * ReadMe's own theme lightens the primary colour itself at render time. Copying
 * the light-mode value straight across therefore reproduces what the *config*
 * said and not what the *site looked like* — and a mid-dark brand like `#1341A9`
 * on a dark page is a link nobody can read. Documentation.AI's own defaults show
 * the intended relationship: `#3143e3` light, `#85a1ff` dark — the same hue,
 * lightened until it reads.
 *
 * So a missing dark brand is derived that way, and marked `derived` so the report
 * never presents it as something the site said.
 */

/** The surfaces the brand colour has to be readable on, per theme. */
export const DARK_SURFACE = "#111827";
export const LIGHT_SURFACE = "#ffffff";

/** WCAG AA for normal text. The brand colour is used on links, so this is the bar. */
const MIN_CONTRAST = 4.5;

export type Rgb = { r: number; g: number; b: number };
export type Hsl = { h: number; s: number; l: number };

/**
 * `#ABC`, `ABC`, `#aabbcc` and `rgb(1, 2, 3)` -> `#aabbcc`. Anything else ->
 * `undefined`, which is the only honest answer for a value that is not a colour:
 * writing an unparseable string into `documentation.json` produces a site whose
 * theme silently falls back, with nothing saying why.
 */
export function normaliseHex(raw: string | null | undefined): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim().toLowerCase();
  if (value === "") return undefined;

  const rgb = /^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/.exec(value);
  if (rgb) {
    const [r, g, b] = [rgb[1], rgb[2], rgb[3]].map((part) => Number(part));
    if ([r, g, b].some((part) => part === undefined || part > 255)) return undefined;
    return rgbToHex({ r: r as number, g: g as number, b: b as number });
  }

  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(value);
  if (!hex) return undefined;

  const digits = hex[1] as string;
  // The alpha pair is dropped rather than blended: `documentation.json` takes an
  // opaque colour, and blending would need to know what it sits on.
  if (digits.length === 8) return `#${digits.slice(0, 6)}`;
  if (digits.length === 3) return `#${[...digits].map((digit) => digit + digit).join("")}`;
  return `#${digits}`;
}

export function hexToRgb(hex: string): Rgb {
  const value = (normaliseHex(hex) ?? "#000000").slice(1);
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const part = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const [red, green, blue] = [r / 255, g / 255, b / 255] as [number, number, number];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const delta = max - min;
  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const h =
    max === red
      ? ((green - blue) / delta + (green < blue ? 6 : 0)) / 6
      : max === green
        ? ((blue - red) / delta + 2) / 6
        : ((red - green) / delta + 4) / 6;

  return { h, s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  if (s === 0) return { r: l * 255, g: l * 255, b: l * 255 };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number): number => {
    const shifted = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
    if (shifted < 1 / 6) return p + (q - p) * 6 * shifted;
    if (shifted < 1 / 2) return q;
    if (shifted < 2 / 3) return p + (q - p) * (2 / 3 - shifted) * 6;
    return p;
  };

  return { r: channel(h + 1 / 3) * 255, g: channel(h) * 255, b: channel(h - 1 / 3) * 255 };
}

/** WCAG relative luminance. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio, 1–21. */
export function contrast(a: string, b: string): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (high + 0.05) / (low + 0.05);
}

/** Whether a colour clears WCAG AA against a background. */
export function isReadableOn(colour: string, background: string): boolean {
  return contrast(colour, background) >= MIN_CONTRAST;
}

/**
 * The same colour, moved until it reads against `surface`.
 *
 * Hue and saturation are kept exactly — the point is to stay recognisably the
 * same brand — and only lightness moves, one percent at a time, stopping the
 * moment the contrast bar is cleared rather than jumping to a fixed value. The
 * direction comes from the surface: lighter on a dark page, darker on a light
 * one. A colour that already reads is returned untouched, so a brand authored
 * pale is not "corrected" into something else.
 */
export function deriveReadable(colour: string, surface: string): string {
  const hex = normaliseHex(colour);
  if (hex === undefined) return colour;
  if (isReadableOn(hex, surface)) return hex;

  const { h, s, l: start } = rgbToHsl(hexToRgb(hex));
  const lighten = luminance(surface) < 0.5;

  for (let step = 0.01; step <= 1; step += 0.01) {
    const l = lighten ? start + step : start - step;
    if (l < 0 || l > 1) break;

    const candidate = rgbToHex(hslToRgb({ h, s, l }));
    if (isReadableOn(candidate, surface)) return candidate;
  }

  // Unreachable for any colour with saturation, and `isColourful` is what keeps
  // the greys from ever arriving here. The bound is still returned rather than
  // looping forever.
  return rgbToHex(hslToRgb({ h, s, l: lighten ? 0.95 : 0.05 }));
}

/** The light-mode brand, lightened until it reads on a dark page. */
export function deriveDarkBrand(lightBrand: string, surface: string = DARK_SURFACE): string {
  return deriveReadable(lightBrand, surface);
}

/**
 * Whether a colour carries enough hue to still mean something after being moved.
 *
 * This is the test that separates "adjust it" from "refuse it". A brand of
 * `#1341a9` darkened or lightened is still visibly that navy. A brand of
 * `#ffffff` — which is what `developers.miro.com` has in its ReadMe project
 * config, because the setting is really its header background — has no hue to
 * preserve: darkening it produces a grey that is nobody's brand colour. That case
 * has no honest automatic answer, so the value is dropped and reported instead.
 */
export function isColourful(colour: string): boolean {
  const hex = normaliseHex(colour);
  if (hex === undefined) return false;
  return rgbToHsl(hexToRgb(hex)).s >= 0.15;
}
