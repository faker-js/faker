import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random insect species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalInsect(fakerCore) // 'Pyramid ant'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalInsect(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.insect);
}
