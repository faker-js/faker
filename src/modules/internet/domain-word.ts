import type { FakerCore } from '../../core';
import { helpersSlugify } from '../helpers/slugify';
import { loremWord as loremWord } from '../lorem/word';
import { stringAlpha } from '../string/alpha';
import { wordAdjective } from '../word/adjective';
import { wordNoun } from '../word/noun';

/**
 * Checks whether the given string is a valid slug for `domainWord`s.
 *
 * @param slug The slug to check.
 */
function isValidDomainWordSlug(slug: string): boolean {
  return /^[a-z][a-z-]*[a-z]$/i.exec(slug) !== null;
}

/**
 * Tries various ways to produce a valid domain word slug, falling back to a random string if needed.
 *
 * @param fakerCore The FakerCore to use.
 * @param word The initial word to slugify.
 */
function makeValidDomainWordSlug(fakerCore: FakerCore, word: string): string {
  const slug1 = helpersSlugify(fakerCore, word);
  if (isValidDomainWordSlug(slug1)) {
    return slug1;
  }

  const slug2 = helpersSlugify(fakerCore, loremWord(fakerCore));
  if (isValidDomainWordSlug(slug2)) {
    return slug2;
  }

  return stringAlpha(fakerCore, {
    casing: 'lower',
    length: { min: 4, max: 8 },
  });
}

/**
 * Generates a random domain word.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetDomainWord(fakerCore) // 'close-reality'
 * internetDomainWord(fakerCore) // 'weird-cytoplasm'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetDomainWord(fakerCore: FakerCore): string {
  // Generate an ASCII "word" in the form `noun-adjective`
  // For locales with non-ASCII characters, we fall back to lorem words, or a random string

  const word1 = makeValidDomainWordSlug(fakerCore, wordAdjective(fakerCore));
  const word2 = makeValidDomainWordSlug(fakerCore, wordNoun(fakerCore));
  return `${word1}-${word2}`.toLowerCase();
}
