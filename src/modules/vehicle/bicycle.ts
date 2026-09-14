import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a type of bicycle.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * bicycle(fakerCore) // 'Adventure Road Bicycle'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bicycle(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.vehicle.bicycle_type);
}
