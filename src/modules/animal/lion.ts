import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random lion species.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalLion(fakerCore) // 'Northeast Congo Lion'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalLion(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.lion);
}
