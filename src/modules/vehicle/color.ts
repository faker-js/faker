import type { FakerCore } from '../../core';
import { colorHuman } from '../color/human';

/**
 * Returns a vehicle color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleColor(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleColor(fakerCore: FakerCore): string {
  return colorHuman(fakerCore);
}
