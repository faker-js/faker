import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase descriptor that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyCatchPhraseDescriptor(fakerCore) // 'composite'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyCatchPhraseDescriptor(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.company.descriptor);
}
