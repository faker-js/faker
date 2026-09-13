import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random horse breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * animalHorse(fakerCore) // 'Swedish Warmblood'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function animalHorse(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.animal.horse);
}
