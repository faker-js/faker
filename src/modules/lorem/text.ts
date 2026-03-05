import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { lines } from './lines';
import { paragraph } from './paragraph';
import { paragraphs } from './paragraphs';
import { sentence } from './sentence';
import { sentences } from './sentences';

/**
 * Generates a random text based on a random lorem method.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * text(fakerCore) // 'Doloribus autem non quis vero quia.'
 * text(fakerCore)
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
export function text(fakerCore: FakerCore): string {
  const method = arrayElement(fakerCore, [
    sentence,
    sentences,
    paragraph,
    paragraphs,
    lines,
  ]);

  return method(fakerCore);
}
