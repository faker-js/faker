import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a manufacturer name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleManufacturer(fakerCore) // 'Ford'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleManufacturer(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.vehicle.manufacturer);
}
