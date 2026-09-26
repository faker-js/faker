import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { loremSentences } from './sentences';

/**
 * Generates a paragraph with the given number of sentences.
 *
 * @param fakerCore The FakerCore to use.
 * @param sentenceCount The number of sentences to generate. Defaults to `3`.
 * @param sentenceCount.min The minimum number of sentences to generate.
 * @param sentenceCount.max The maximum number of sentences to generate.
 *
 * @example
 * loremParagraph(fakerCore) // 'Non architecto nam unde sint. Ex tenetur dolor facere optio aut consequatur. Ea laudantium reiciendis repellendus.'
 * loremParagraph(fakerCore, 2) // 'Animi possimus nemo consequuntur ut ea et tempore unde qui. Quis corporis esse occaecati.'
 * loremParagraph(fakerCore, { min: 1, max: 3 }) // 'Quis doloribus necessitatibus sint. Rerum accusamus impedit corporis porro.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function loremParagraph(
  fakerCore: FakerCore,
  sentenceCount: NumberOrRange = 3
): string {
  return loremSentences(fakerCore, sentenceCount);
}
