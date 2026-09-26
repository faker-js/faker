import type { FakerCore } from '../../core';
import { vehicleManufacturer } from './manufacturer';
import { vehicleModel } from './model';

/**
 * Returns a random vehicle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleVehicle(fakerCore) // 'BMW Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleVehicle(fakerCore: FakerCore): string {
  return `${vehicleManufacturer(fakerCore)} ${vehicleModel(fakerCore)}`;
}
