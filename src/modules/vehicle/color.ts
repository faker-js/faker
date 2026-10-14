import type { FakerCore } from '../../core';
import { fakeColorHuman } from '../color/human';

/**
 * Returns a vehicle color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleColor(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleColor(fakerCore: FakerCore): string {
  return fakeColorHuman(fakerCore);
}
