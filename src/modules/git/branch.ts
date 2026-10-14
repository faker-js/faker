import type { FakerCore } from '../../core';
import { fakeHackerNoun } from '../hacker/noun';
import { fakeHackerVerb } from '../hacker/verb';

/**
 * Generates a random branch name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeGitBranch(fakerCore) // 'feed-parse'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeGitBranch(fakerCore: FakerCore): string {
  const noun = fakeHackerNoun(fakerCore).replaceAll(' ', '-');
  const verb = fakeHackerVerb(fakerCore).replaceAll(' ', '-');
  return `${noun}-${verb}`;
}
