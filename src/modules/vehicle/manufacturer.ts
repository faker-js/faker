import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a manufacturer name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * manufacturer(fakerCore) // 'Ford'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function manufacturer(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.vehicle.manufacturer);
}
