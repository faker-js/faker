import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeLoremLines } from './lines';
import { fakeLoremParagraph } from './paragraph';
import { fakeLoremParagraphs } from './paragraphs';
import { fakeLoremSentence } from './sentence';
import { fakeLoremSentences } from './sentences';

/**
 * Generates a random text based on a random lorem method.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLoremText(fakerCore) // 'Doloribus autem non quis vero quia.'
 * fakeLoremText(fakerCore)
 * // 'Rerum eum reiciendis id ipsa hic dolore aut laborum provident.
 * // Quis beatae quis corporis veritatis corrupti ratione delectus sapiente ut.
 * // Quis ut dolor dolores facilis possimus tempore voluptates.
 * // Iure nam officia optio cumque.
 * // Dolor tempora iusto.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLoremText(fakerCore: FakerCore): string {
  const method = fakeHelpersArrayElement(fakerCore, [
    fakeLoremSentence,
    fakeLoremSentences,
    fakeLoremParagraph,
    fakeLoremParagraphs,
    fakeLoremLines,
  ]);

  return method(fakerCore);
}
