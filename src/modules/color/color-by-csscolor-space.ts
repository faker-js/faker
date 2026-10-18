import type { FakerCore } from '../../core';
import { fakeNumberFloat } from '../number/float';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';
import type { CssSpaceType } from './css-supported-space';

/**
 * Returns a random color based on CSS color space specified.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeColorColorByCSSColorSpace(fakerCore) // [0.93, 1, 0.82]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorColorByCSSColorSpace(fakerCore: FakerCore): number[];
/**
 * Returns a random color based on CSS color space specified.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
 *
 * @example
 * fakeColorColorByCSSColorSpace(fakerCore) // [0.93, 1, 0.82]
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorColorByCSSColorSpace(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
  }
): string;
/**
 * Returns a random color based on CSS color space specified.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
 *
 * @example
 * fakeColorColorByCSSColorSpace(fakerCore) // [0.93, 1, 0.82]
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'decimal' }) // [0.12, 0.21, 0.31]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorColorByCSSColorSpace(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
  }
): number[];
/**
 * Returns a random color based on CSS color space specified.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
 *
 * @example
 * fakeColorColorByCSSColorSpace(fakerCore) // [0.93, 1, 0.82]
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'decimal' }) // [0.12, 0.21, 0.31]
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
 * fakeColorColorByCSSColorSpace(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorColorByCSSColorSpace(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
    /**
     * Color space to generate the color for.
     *
     * @default 'sRGB'
     */
    space?: CssSpaceType;
  }
): string | number[];

export function fakeColorColorByCSSColorSpace(
  fakerCore: FakerCore,
  options: {
    format?: ColorFormat;
    space?: CssSpaceType;
  } = {}
): string | number[] {
  const { format = 'decimal', space = 'sRGB' } = options;

  const color = Array.from({ length: 3 }, () =>
    fakeNumberFloat(fakerCore, { multipleOf: 0.0001 })
  );
  return toColorFormat(color, format, 'color', space);
}
