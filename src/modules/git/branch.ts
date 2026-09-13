import type { FakerCore } from '../../core';
import { hackerNoun } from '../hacker/noun';
import { hackerVerb } from '../hacker/verb';

/**
 * Generates a random branch name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * gitBranch(fakerCore) // 'feed-parse'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function gitBranch(fakerCore: FakerCore): string {
  const noun = hackerNoun(fakerCore).replace(' ', '-');
  const verb = hackerVerb(fakerCore).replace(' ', '-');
  return `${noun}-${verb}`;
}
