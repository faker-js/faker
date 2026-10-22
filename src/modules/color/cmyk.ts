import type { FakerCore } from '../../core';
import { fakeNumberFloat } from '../number/float';
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
 * fakeColorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorCmyk(fakerCore: FakerCore): number[];
/**
 * Returns a CMYK color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
 *
 * @example
 * fakeColorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * fakeColorCmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * fakeColorCmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorCmyk(
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
 * fakeColorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * fakeColorCmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorCmyk(
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
 * fakeColorCmyk(fakerCore) // [0.31, 0.52, 0.32, 0.43]
 * fakeColorCmyk(fakerCore, { format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
 * fakeColorCmyk(fakerCore, { format: 'css' }) // 'cmyk(35%, 39%, 68%, 60%)'
 * fakeColorCmyk(fakerCore, { format: 'binary' }) // (8-32 bits) x 4
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorCmyk(
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

export function fakeColorCmyk(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const color: string | number[] = Array.from({ length: 4 }, () =>
    fakeNumberFloat(fakerCore, { multipleOf: 0.01 })
  );
  return toColorFormat(color, format, 'cmyk');
}
