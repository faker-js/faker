import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle model.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleModel(fakerCore) // 'Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleModel(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.vehicle.model);
}
