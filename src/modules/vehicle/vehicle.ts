import type { FakerCore } from '../../core';
import { fakeVehicleManufacturer } from './manufacturer';
import { fakeVehicleModel } from './model';

/**
 * Returns a random vehicle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeVehicleVehicle(fakerCore) // 'BMW Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeVehicleVehicle(fakerCore: FakerCore): string {
  return `${fakeVehicleManufacturer(fakerCore)} ${fakeVehicleModel(fakerCore)}`;
}
