import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleType(fakerCore) // 'Coupe'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.vehicle.type);
}
