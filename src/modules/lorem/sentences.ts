import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersMultiple } from '../helpers/multiple';
import { loremSentence } from './sentence';

/**
 * Generates the given number of sentences.
 *
 * @param fakerCore The FakerCore to use.
 * @param sentenceCount The number of sentences to generate. Defaults to a random number between `2` and `6`.
 * @param sentenceCount.min The minimum number of sentences to generate. Defaults to `2`.
 * @param sentenceCount.max The maximum number of sentences to generate. Defaults to `6`.
 * @param separator The separator to add between sentences. Defaults to `' '`.
 *
 * @example
 * loremSentences(fakerCore) // 'Iste molestiae incidunt aliquam possimus reprehenderit eum corrupti. Deleniti modi voluptatem nostrum ut esse.'
 * loremSentences(fakerCore, 2) // 'Maxime vel numquam quibusdam. Dignissimos ex molestias quos aut molestiae quam nihil occaecati maiores.'
 * loremSentences(fakerCore, 2, '\n')
 * // 'Et rerum a unde tempora magnam sit nisi.
 * // Et perspiciatis ipsam omnis.'
 * loremSentences(fakerCore, { min: 1, max: 3 }) // 'Placeat ex natus tenetur repellendus repellendus iste. Optio nostrum veritatis.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function loremSentences(
  fakerCore: FakerCore,
  sentenceCount: NumberOrRange = { min: 2, max: 6 },
  separator: string = ' '
): string {
  return helpersMultiple(fakerCore, () => loremSentence(fakerCore), {
    count: sentenceCount,
  }).join(separator);
}
