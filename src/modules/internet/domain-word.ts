import type { FakerCore } from '../../core';
import { fakeHelpersSlugify } from '../helpers/slugify';
import { fakeLoremWord } from '../lorem/word';
import { fakeStringAlpha } from '../string/alpha';
import { fakeWordAdjective } from '../word/adjective';
import { fakeWordNoun } from '../word/noun';

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
  const slug1 = fakeHelpersSlugify(fakerCore, word);
  if (isValidDomainWordSlug(slug1)) {
    return slug1;
  }

  const slug2 = fakeHelpersSlugify(fakerCore, fakeLoremWord(fakerCore));
  if (isValidDomainWordSlug(slug2)) {
    return slug2;
  }

  return fakeStringAlpha(fakerCore, {
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
 * fakeInternetDomainWord(fakerCore) // 'close-reality'
 * fakeInternetDomainWord(fakerCore) // 'weird-cytoplasm'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetDomainWord(fakerCore: FakerCore): string {
  // Generate an ASCII "word" in the form `noun-adjective`
  // For locales with non-ASCII characters, we fall back to lorem words, or a random string

  const word1 = makeValidDomainWordSlug(fakerCore, fakeWordAdjective(fakerCore));
  const word2 = makeValidDomainWordSlug(fakerCore, fakeWordNoun(fakerCore));
  return `${word1}-${word2}`.toLowerCase();
}
