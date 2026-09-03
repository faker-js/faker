import type { FakerCore } from '../../core';
import { human } from '../color/human';

/**
 * Returns a vehicle color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * color(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function color(fakerCore: FakerCore): string {
  return human(fakerCore);
}
