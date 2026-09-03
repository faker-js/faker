import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase adjective that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * catchPhraseAdjective(fakerCore) // 'Multi-tiered'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function catchPhraseAdjective(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.company.adjective);
}
