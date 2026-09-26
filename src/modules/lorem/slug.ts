import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersSlugify } from '../helpers/slugify';
import { loremWords as loremWords } from './words';

/**
 * Generates a slugified text consisting of the given number of hyphen separated words.
 *
 * @param fakerCore The FakerCore to use.
 * @param wordCount The number of words to generate. Defaults to `3`.
 * @param wordCount.min The minimum number of words to generate.
 * @param wordCount.max The maximum number of words to generate.
 *
 * @example
 * loremSlug(fakerCore) // 'dolores-illo-est'
 * loremSlug(fakerCore, 5) // 'delectus-totam-iusto-itaque-placeat'
 * loremSlug(fakerCore, { min: 1, max: 3 }) // 'illo-ratione'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function loremSlug(
  fakerCore: FakerCore,
  wordCount: NumberOrRange = 3
): string {
  const words = loremWords(fakerCore, wordCount);
  return helpersSlugify(fakerCore, words);
}
