import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase adjective that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyCatchPhraseAdjective(fakerCore) // 'Multi-tiered'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyCatchPhraseAdjective(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.company.adjective);
}
