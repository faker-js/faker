import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * type(fakerCore) // 'Coupe'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function type(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.vehicle.type);
}
