import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random horse breed.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * horse(fakerCore) // 'Swedish Warmblood'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function horse(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.animal.horse);
}
