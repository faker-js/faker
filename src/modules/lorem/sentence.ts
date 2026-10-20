import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeLoremWords } from './words';

/**
 * Generates a space separated list of words beginning with a capital letter and ending with a period.
 *
 * @param fakerCore The FakerCore to use.
 * @param wordCount The number of words, that should be in the sentence. Defaults to a random number between `3` and `10`.
 * @param wordCount.min The minimum number of words to generate. Defaults to `3`.
 * @param wordCount.max The maximum number of words to generate. Defaults to `10`.
 *
 * @example
 * fakeLoremSentence(fakerCore) // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
 * fakeLoremSentence(fakerCore, 5) // 'Laborum voluptatem officiis est et.'
 * fakeLoremSentence(fakerCore, { min: 3, max: 5 }) // 'Fugiat repellendus nisi.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLoremSentence(
  fakerCore: FakerCore,
  wordCount: NumberOrRange = { min: 3, max: 10 }
): string {
  const sentence = fakeLoremWords(fakerCore, wordCount);
  return `${sentence.charAt(0).toUpperCase() + sentence.substring(1)}.`;
}
