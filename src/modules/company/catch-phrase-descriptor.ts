import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random catch phrase descriptor that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyCatchPhraseDescriptor(fakerCore) // 'composite'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyCatchPhraseDescriptor(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.company.descriptor
  );
}
