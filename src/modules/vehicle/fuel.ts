import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a fuel type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleFuel(fakerCore) // 'Electric'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleFuel(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.vehicle.fuel);
}
