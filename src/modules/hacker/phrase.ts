import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random hacker/IT phrase.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeHackerPhrase(fakerCore)
 * // 'If we override the card, we can get to the HDD feed through the back-end HDD sensor!'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHackerPhrase(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.hacker.phrase
  );
}
