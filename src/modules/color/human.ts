import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random human-readable color name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * colorHuman(fakerCore) // 'red'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorHuman(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.color.human);
}
