import type { FakerCore } from '../../core';
import { float } from '../number/float';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';

/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * cmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cmyk(fakerCore: FakerCore): number[];
/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
 *
 * @example
 * cmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * cmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * cmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cmyk(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }
): string;
/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
 *
 * @example
 * cmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * cmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cmyk(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }
): number[];
/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
 *
 * @example
 * cmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * cmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 * cmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * cmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cmyk(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated CMYK color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }
): string | number[];

export function cmyk(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const color: string | number[] = Array.from({ length: 4 }, () =>
    float(fakerCore, { multipleOf: 0.01 })
  );
  return toColorFormat(color, format, 'cmyk');
}
