import type { FakerCore } from '../../core';
import type { Casing } from '../../utils/types';
import { float } from '../number/float';
import { int } from '../number/int';
import { hexadecimal } from '../string/hexadecimal';
import { formatHexColor } from './_format-hex-color';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';
import type { CssFunctionType } from './css-supported-function';

/**
 * Returns an RGB color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * rgb(fakerCore) // '#8be4ab'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rgb(fakerCore: FakerCore): string;
/**
 * Returns an RGB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.prefix Prefix of the generated hex color. Only applied when 'hex' format is used. Defaults to `'#'`.
 * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
 * @param options.format Format of generated RGB color. Defaults to `hex`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * rgb(fakerCore) // '#0d7f26'
 * rgb(fakerCore, { prefix: '0x' }) // '0x9ddc8b'
 * rgb(fakerCore, { casing: 'upper' }) // '#B8A51E'
 * rgb(fakerCore, { casing: 'lower' }) // '#b12f8b'
 * rgb(fakerCore, { prefix: '#', casing: 'lower' }) // '#eb0c16'
 * rgb(fakerCore, { format: 'hex', casing: 'lower' }) // '#bb9d17'
 * rgb(fakerCore, { format: 'css' }) // 'rgb(216, 17, 192)'
 * rgb(fakerCore, { format: 'binary' }) // '00110010 00001000 01110110'
 * rgb(fakerCore, { includeAlpha: true }) // '#f96efb5e'
 * rgb(fakerCore, { format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rgb(
  fakerCore: FakerCore,
  options?: {
    /**
     * Prefix of the generated hex color. Only applied when 'hex' format is used.
     *
     * @default '#'
     */
    prefix?: string;
    /**
     * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default 'lower'
     */
    casing?: Casing;
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
     */
    format?: 'hex' | StringColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }
): string;
/**
 * Returns an RGB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'hex'`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * rgb(fakerCore) // '0x8be4ab'
 * rgb(fakerCore, { format: 'decimal' }) // [64, 192,174]
 * rgb(fakerCore, { format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rgb(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
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
 * Returns an RGB color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'#'`.
 * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
 * @param options.format Format of generated RGB color. Defaults to `'hex'`.
 * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
 *
 * @example
 * rgb(fakerCore) // '#0d7f26'
 * rgb(fakerCore, { prefix: '0x' }) // '0x9ddc8b'
 * rgb(fakerCore, { casing: 'upper' }) // '#B8A51E'
 * rgb(fakerCore, { casing: 'lower' }) // '#b12f8b'
 * rgb(fakerCore, { prefix: '#', casing: 'lower' }) // '#eb0c16'
 * rgb(fakerCore, { format: 'hex', casing: 'lower' }) // '#bb9d17'
 * rgb(fakerCore, { format: 'decimal' }) // [64, 192,174]
 * rgb(fakerCore, { format: 'css' }) // 'rgb(216, 17, 192)'
 * rgb(fakerCore, { format: 'binary' }) // '00110010 00001000 01110110'
 * rgb(fakerCore, { includeAlpha: true }) // '#f96efb5e'
 * rgb(fakerCore, { format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
 * rgb(fakerCore, { format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function rgb(
  fakerCore: FakerCore,
  options?: {
    /**
     * Prefix of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default '#'
     */
    prefix?: string;
    /**
     * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
     *
     * @default 'lower'
     */
    casing?: Casing;
    /**
     * Format of generated RGB color.
     *
     * @default 'hex'
     */
    format?: 'hex' | ColorFormat;
    /**
     * Adds an alpha value to the color (RGBA).
     *
     * @default false
     */
    includeAlpha?: boolean;
  }
): string | number[];

export function rgb(
  fakerCore: FakerCore,
  options: {
    prefix?: string;
    casing?: Casing;
    format?: 'hex' | ColorFormat;
    includeAlpha?: boolean;
  } = {}
): string | number[] {
  const {
    format = 'hex',
    includeAlpha = false,
    prefix = '#',
    casing = 'lower',
  } = options;
  let color: string | number[];
  if (format === 'hex') {
    color = hexadecimal(fakerCore, {
      length: includeAlpha ? 8 : 6,
      prefix: '',
    });
    color = formatHexColor(color, { prefix, casing });
    return color;
  }

  let cssFunction: CssFunctionType = 'rgb';
  color = Array.from({ length: 3 }, () => int(fakerCore, 255));
  if (includeAlpha) {
    color.push(float(fakerCore, { multipleOf: 0.01 }));
    cssFunction = 'rgba';
  }

  return toColorFormat(color, format, cssFunction);
}
