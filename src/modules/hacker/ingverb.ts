import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT verb for continuous actions (en: ing suffix; e.g. hacking).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerIngverb(fakerCore) // 'navigating'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerIngverb(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.hacker.ingverb);
}
