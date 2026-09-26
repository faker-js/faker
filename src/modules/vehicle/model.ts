import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle model.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleModel(fakerCore) // 'Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleModel(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.vehicle.model);
}
