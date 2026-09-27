import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase adjective that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyCatchPhraseAdjective(fakerCore) // 'Multi-tiered'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyCatchPhraseAdjective(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.company.adjective);
}
