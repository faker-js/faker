import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random pet name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * petName(fakerCore) // 'Coco'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function petName(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.pet_name);
}
