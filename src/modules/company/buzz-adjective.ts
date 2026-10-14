import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random buzz adjective that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyBuzzAdjective(fakerCore) // 'one-to-one'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyBuzzAdjective(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.company.buzz_adjective
  );
}
