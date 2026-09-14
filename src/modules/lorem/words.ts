import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { multiple } from '../helpers/multiple';
import { word } from './word';

/**
 * Generates a space separated list of words.
 *
 * @param fakerCore The FakerCore to use.
 * @param wordCount The number of words to generate. Defaults to `3`.
 * @param wordCount.min The minimum number of words to generate.
 * @param wordCount.max The maximum number of words to generate.
 *
 * @example
 * words(fakerCore) // 'qui praesentium pariatur'
 * words(fakerCore, 10) // 'debitis consectetur voluptatem non doloremque ipsum autem totam eum ratione'
 * words(fakerCore, { min: 1, max: 3 }) // 'tenetur error cum'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function words(
  fakerCore: FakerCore,
  wordCount: NumberOrRange = 3
): string {
  return multiple(fakerCore, () => word(fakerCore), { count: wordCount }).join(
    ' '
  );
}
