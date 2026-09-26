import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a type of bicycle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * vehicleBicycle(fakerCore) // 'Adventure Road Bicycle'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function vehicleBicycle(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.vehicle.bicycle_type);
}
