import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz adjective that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyBuzzAdjective(fakerCore) // 'one-to-one'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyBuzzAdjective(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.company.buzz_adjective);
}
