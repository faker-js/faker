import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random hacker/IT verb for continuous actions (en: ing suffix; e.g. hacking).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * hackerIngverb(fakerCore) // 'navigating'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function hackerIngverb(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.hacker.ingverb);
}
