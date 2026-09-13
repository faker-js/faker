import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { loremLines } from './lines';
import { loremParagraph } from './paragraph';
import { loremParagraphs } from './paragraphs';
import { loremSentence } from './sentence';
import { loremSentences } from './sentences';

/**
 * Generates a random text based on a random lorem method.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * loremText(fakerCore) // 'Doloribus autem non quis vero quia.'
 * loremText(fakerCore)
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
export function loremText(fakerCore: FakerCore): string {
  const method = helpersArrayElement(fakerCore, [
    loremSentence,
    loremSentences,
    loremParagraph,
    loremParagraphs,
    loremLines,
  ]);

  return method(fakerCore);
}
