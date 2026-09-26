import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a fuel type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleFuel(fakerCore) // 'Electric'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleFuel(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.vehicle.fuel);
}
