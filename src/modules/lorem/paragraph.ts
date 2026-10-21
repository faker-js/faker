import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeLoremSentences } from './sentences';

/**
 * Generates a paragraph with the given number of sentences.
 *
 * @param fakerCore The FakerCore to use.
 * @param sentenceCount The number of sentences to generate. Defaults to `3`.
 * @param sentenceCount.min The minimum number of sentences to generate.
 * @param sentenceCount.max The maximum number of sentences to generate.
 *
 * @example
 * fakeLoremParagraph(fakerCore) // 'Non architecto nam unde sint. Ex tenetur dolor facere optio aut consequatur. Ea laudantium reiciendis repellendus.'
 * fakeLoremParagraph(fakerCore, 2) // 'Animi possimus nemo consequuntur ut ea et tempore unde qui. Quis corporis esse occaecati.'
 * fakeLoremParagraph(fakerCore, { min: 1, max: 3 }) // 'Quis doloribus necessitatibus sint. Rerum accusamus impedit corporis porro.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLoremParagraph(
  fakerCore: FakerCore,
  sentenceCount: NumberOrRange = 3
): string {
  return fakeLoremSentences(fakerCore, sentenceCount);
}
