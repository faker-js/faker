import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

/**
 * Functions supported by CSS to produce color.
 */
export enum CssFunction {
  RGB = 'rgb',
  RGBA = 'rgba',
  HSL = 'hsl',
  HSLA = 'hsla',
  HWB = 'hwb',
  CMYK = 'cmyk',
  LAB = 'lab',
  LCH = 'lch',
  COLOR = 'color',
}

/**
 * Functions supported by CSS to produce color.
 */
export type CssFunctionType = `${CssFunction}`;

/**
 * Returns a random CSS-supported color function name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * cssSupportedFunction(fakerCore) // 'rgb'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cssSupportedFunction(fakerCore: FakerCore): CssFunctionType {
  return enumValue(fakerCore, CssFunction);
}
