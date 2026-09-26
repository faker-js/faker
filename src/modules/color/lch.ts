import type { FakerCore } from '../../core';
import { numberFloat } from '../number/float';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';

/**
 * Returns an LCH color. Even though upper bound of
 * chroma in LCH color space is theoretically unbounded,
 * it is bounded to 230 as anything above will not
 * make a noticeable difference in the browser.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * colorLch(fakerCore) // [0.522345, 72.2, 56.2]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorLch(fakerCore: FakerCore): number[];
/**
 * Returns an LCH color. Even though upper bound of
 * chroma in LCH color space is theoretically unbounded,
 * it is bounded to 230 as anything above will not
 * make a noticeable difference in the browser.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * colorLch(fakerCore) // [0.522345, 72.2, 56.2]
 * colorLch(fakerCore, { format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
 * colorLch(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorLch(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }
): string;
/**
 * Returns an LCH color. Even though upper bound of
 * chroma in LCH color space is theoretically unbounded,
 * it is bounded to 230 as anything above will not
 * make a noticeable difference in the browser.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * colorLch(fakerCore) // [0.522345, 72.2, 56.2]
 * colorLch(fakerCore, { format: 'decimal' }) // [0.522345, 72.2, 56.2]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorLch(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }
): number[];
/**
 * Returns an LCH color. Even though upper bound of
 * chroma in LCH color space is theoretically unbounded,
 * it is bounded to 230 as anything above will not
 * make a noticeable difference in the browser.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * colorLch(fakerCore) // [0.522345, 72.2, 56.2]
 * colorLch(fakerCore, { format: 'decimal' }) // [0.522345, 72.2, 56.2]
 * colorLch(fakerCore, { format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
 * colorLch(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorLch(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }
): string | number[];

export function colorLch(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const lch = [
    // Lightness is a fraction between 0 and 1.
    numberFloat(fakerCore, { multipleOf: 0.000001 }),
    // Chroma is theoretically unbounded, see the docs above for why 230.
    numberFloat(fakerCore, { max: 230, multipleOf: 0.1 }),
    // Hue is an angle in degrees.
    numberFloat(fakerCore, { max: 360, multipleOf: 0.1 }),
  ];

  return toColorFormat(lch, format, 'lch');
}
