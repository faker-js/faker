import type { FakerCore } from '../../core';
import { fakeNumberFloat } from '../number/float';
import { fakeNumberInt } from '../number/int';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';

/**
 * Returns an HWB color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeColorHwb(fakerCore) // [201, 0.21, 0.31]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHwb(fakerCore: FakerCore): number[];
/**
 * Returns an HWB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * fakeColorHwb(fakerCore) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'css' }) // 'hwb(354 72% 41%)'
 * fakeColorHwb(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHwb(
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
 * Returns an HWB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * fakeColorHwb(fakerCore) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'decimal' }) // [201, 0.21, 0.31]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHwb(
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
 * Returns an HWB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * fakeColorHwb(fakerCore) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'decimal' }) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'css' }) // 'hwb(354 72% 41%)'
 * fakeColorHwb(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHwb(
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
/**
 * Returns an HWB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * fakeColorHwb(fakerCore) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'decimal' }) // [201, 0.21, 0.31]
 * fakeColorHwb(fakerCore, { format: 'css' }) // 'hwb(354 72% 41%)'
 * fakeColorHwb(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHwb(
  fakerCore: FakerCore,
  options: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const hsl: number[] = [fakeNumberInt(fakerCore, 360)];
  for (let i = 0; i < 2; i++) {
    hsl.push(fakeNumberFloat(fakerCore, { multipleOf: 0.01 }));
  }

  return toColorFormat(hsl, format, 'hwb');
}
