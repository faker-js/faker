import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a type of bicycle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleBicycle(fakerCore) // 'Adventure Road Bicycle'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleBicycle(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.vehicle.bicycle_type);
}
