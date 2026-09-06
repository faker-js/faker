import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';

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
