import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random color space name from the worldwide accepted color spaces.
 * Source: https://en.wikipedia.org/wiki/List_of_color_spaces_and_their_uses
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * colorSpace(fakerCore) // 'sRGB'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function colorSpace(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.color.space);
}
