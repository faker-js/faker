import type { FakerCore } from '../../core';
import { slugify } from '../helpers/slugify';
import { word as loremWord } from '../lorem/word';
import { alpha } from '../string/alpha';
import { adjective } from '../word/adjective';
import { noun } from '../word/noun';

/**
 * Checks whether the given string is a valid slug for `domainWord`s.
 *
 * @param slug The slug to check.
 */
function isValidDomainWordSlug(slug: string): boolean {
  return /^[a-z][a-z-]*[a-z]$/i.exec(slug) !== null;
}

// Temp export
/**
 * Tries various ways to produce a valid domain word slug, falling back to a random string if needed.
 *
 * @param fakerCore The FakerCore to use.
 * @param word The initial word to slugify.
 */
export function makeValidDomainWordSlug(
  fakerCore: FakerCore,
  word: string
): string {
  const slug1 = slugify(fakerCore, word);
  if (isValidDomainWordSlug(slug1)) {
    return slug1;
  }

  const slug2 = slugify(fakerCore, loremWord(fakerCore));
  if (isValidDomainWordSlug(slug2)) {
    return slug2;
  }

  return alpha(fakerCore, {
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
