import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

/**
 * Color space names supported by CSS.
 */
export enum CssSpace {
  SRGB = 'sRGB',
  DisplayP3 = 'display-p3',
  REC2020 = 'rec2020',
  A98RGB = 'a98-rgb',
  ProphotoRGB = 'prophoto-rgb',
}

/**
 * Color space names supported by CSS.
 */
export type CssSpaceType = `${CssSpace}`;

/**
 * Returns a random CSS-supported color space name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * cssSupportedSpace(fakerCore) // 'display-p3'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cssSupportedSpace(fakerCore: FakerCore): CssSpaceType {
  return enumValue(fakerCore, CssSpace);
}
