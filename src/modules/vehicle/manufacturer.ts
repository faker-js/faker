import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a manufacturer name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleManufacturer(fakerCore) // 'Ford'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleManufacturer(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.vehicle.manufacturer);
}
