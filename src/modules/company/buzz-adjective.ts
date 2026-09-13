import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz adjective that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * buzzAdjective(fakerCore) // 'one-to-one'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function buzzAdjective(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.company.buzz_adjective);
}
