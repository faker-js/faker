import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

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
