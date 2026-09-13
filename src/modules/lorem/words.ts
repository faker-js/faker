import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersMultiple } from '../helpers/multiple';
import { loremWord } from './word';

/**
 * Generates a space separated list of words.
 *
 * @param fakerCore The FakerCore to use.
 * @param wordCount The number of words to generate. Defaults to `3`.
 * @param wordCount.min The minimum number of words to generate.
 * @param wordCount.max The maximum number of words to generate.
 *
 * @example
 * loremWords(fakerCore) // 'qui praesentium pariatur'
 * loremWords(fakerCore, 10) // 'debitis consectetur voluptatem non doloremque ipsum autem totam eum ratione'
 * loremWords(fakerCore, { min: 1, max: 3 }) // 'tenetur error cum'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function loremWords(
  fakerCore: FakerCore,
  wordCount: NumberOrRange = 3
): string {
  return helpersMultiple(fakerCore, () => loremWord(fakerCore), {
    count: wordCount,
  }).join(' ');
}
