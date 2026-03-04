import type { FakerCore } from '../../core';
import { float } from '../number/float';
import { int } from '../number/int';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';

/**
 * Returns an HSL color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hsl(fakerCore) // [201, 0.23, 0.32]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hsl(fakerCore: FakerCore): number[];
/**
 * Returns an HSL color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * hsl(fakerCore) // [201, 0.23, 0.32]
 * hsl(fakerCore, { format: 'css' }) // hsl(0deg, 100%, 80%)
 * hsl(fakerCore, { format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
 * hsl(fakerCore, { format: 'binary' }) // (8-32 bits) x 3
 * hsl(fakerCore, { format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hsl(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }
): string;
/**
 * Returns an HSL color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * hsl(fakerCore) // [201, 0.23, 0.32]
 * hsl(fakerCore, { format: 'decimal' }) // [300, 0.21, 0.52]
 * hsl(fakerCore, { format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hsl(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }
): number[];
/**
 * Returns an HSL color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * hsl(fakerCore) // [201, 0.23, 0.32]
 * hsl(fakerCore, { format: 'decimal' }) // [300, 0.21, 0.52]
 * hsl(fakerCore, { format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
 * hsl(fakerCore, { format: 'css' }) // hsl(0deg, 100%, 80%)
 * hsl(fakerCore, { format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
 * hsl(fakerCore, { format: 'binary' }) // (8-32 bits) x 3
 * hsl(fakerCore, { format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hsl(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated HSL color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }
): string | number[];

export function hsl(
  fakerCore: FakerCore,
  options: {
    format?: ColorFormat;
    includeAlpha?: boolean;
  } = {}
): string | number[] {
  const { format = 'decimal', includeAlpha = false } = options;
  const hsl: number[] = [int(fakerCore, 360)];
  for (let i = 0; i < (options?.includeAlpha ? 3 : 2); i++) {
    hsl.push(float(fakerCore, { multipleOf: 0.01 }));
  }

  return toColorFormat(hsl, format, includeAlpha ? 'hsla' : 'hsl');
}
