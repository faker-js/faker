import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a vehicle model.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * model(fakerCore) // 'Explorer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function model(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.vehicle.model);
}
