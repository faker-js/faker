import type { FakerCore } from '../../core';
import { numberFloat } from '../number/float';
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
 * colorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorCmyk(fakerCore: FakerCore): number[];
/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
 *
 * @example
 * colorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * colorCmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * colorCmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorCmyk(
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
 * colorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * colorCmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorCmyk(
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
 * colorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * colorCmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 * colorCmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * colorCmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorCmyk(
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

export function colorCmyk(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const color: string | number[] = Array.from({ length: 4 }, () =>
    numberFloat(fakerCore, { multipleOf: 0.01 })
  );
  return toColorFormat(color, format, 'cmyk');
}
