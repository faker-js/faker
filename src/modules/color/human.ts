import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random human-readable color name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeColorHuman(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeColorHuman(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.color.human);
}
