import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleType(fakerCore) // 'Coupe'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleType(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.vehicle.type);
}
