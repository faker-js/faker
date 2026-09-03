import type { FakerCore } from '../../core';
import { float } from '../number/float';

/**
 * Returns an LCH color. Even though upper bound of
 * chroma in LCH color space is theoretically unbounded,
 * it is bounded to 230 as anything above will not
 * make a noticeable difference in the browser.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * lch(fakerCore) // [0.522345, 72.2, 56.2]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lch(fakerCore: FakerCore): number[];
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
 * lch(fakerCore) // [0.522345, 72.2, 56.2]
 * lch(fakerCore, { format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
 * lch(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lch(
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
 * lch(fakerCore) // [0.522345, 72.2, 56.2]
 * lch(fakerCore, { format: 'decimal' }) // [0.522345, 72.2, 56.2]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lch(
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
 * lch(fakerCore) // [0.522345, 72.2, 56.2]
 * lch(fakerCore, { format: 'decimal' }) // [0.522345, 72.2, 56.2]
 * lch(fakerCore, { format: 'css' }) // 'lch(52.2345% 72.2 56.2)'
 * lch(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lch(
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

export function lch(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const lch = [
    // Lightness is a fraction between 0 and 1.
    float(fakerCore, { multipleOf: 0.000001 }),
    // Chroma is theoretically unbounded, see the docs above for why 230.
    float(fakerCore, { max: 230, multipleOf: 0.1 }),
    // Hue is an angle in degrees.
    float(fakerCore, { max: 360, multipleOf: 0.1 }),
  ];

  return toColorFormat(lch, format, 'lch');
}
