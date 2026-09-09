import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { words } from './words';

/**
 * Generates a space separated list of words beginning with a capital letter and ending with a period.
 *
 * @param fakerCore The FakerCore to use.
 * @param wordCount The number of words, that should be in the sentence. Defaults to a random number between `3` and `10`.
 * @param wordCount.min The minimum number of words to generate. Defaults to `3`.
 * @param wordCount.max The maximum number of words to generate. Defaults to `10`.
 *
 * @example
 * sentence(fakerCore) // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
 * sentence(fakerCore, 5) // 'Laborum voluptatem officiis est et.'
 * sentence(fakerCore, { min: 3, max: 5 }) // 'Fugiat repellendus nisi.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function sentence(
  fakerCore: FakerCore,
  wordCount: NumberOrRange = { min: 3, max: 10 }
): string {
  const sentence = words(fakerCore, wordCount);
  return `${sentence.charAt(0).toUpperCase() + sentence.substring(1)}.`;
}
