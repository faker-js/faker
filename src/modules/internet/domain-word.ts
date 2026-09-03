import type { FakerCore } from '../../core';
import { adjective } from '../word/adjective';
import { noun } from '../word/noun';

/**
 * Generates a random domain word.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * domainWord(fakerCore) // 'close-reality'
 * domainWord(fakerCore) // 'weird-cytoplasm'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function domainWord(fakerCore: FakerCore): string {
  // Generate an ASCII "word" in the form `noun-adjective`
  // For locales with non-ASCII characters, we fall back to lorem words, or a random string

  const word1 = makeValidDomainWordSlug(fakerCore, adjective(fakerCore));
  const word2 = makeValidDomainWordSlug(fakerCore, noun(fakerCore));
  return `${word1}-${word2}`.toLowerCase();
}
