import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz noun that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * buzzNoun(fakerCore) // 'paradigms'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function buzzNoun(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.company.buzz_noun);
}
