import type { FakerCore } from '../../core';
import { fakeHackerAdjective } from '../hacker/adjective';
import { fakeHackerNoun } from '../hacker/noun';
import { fakeHackerVerb } from '../hacker/verb';

/**
 * Generates a random commit message.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeGitCommitMessage(fakerCore) // 'reboot cross-platform driver'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeGitCommitMessage(fakerCore: FakerCore): string {
  return `${fakeHackerVerb(fakerCore)} ${fakeHackerAdjective(fakerCore)} ${fakeHackerNoun(fakerCore)}`;
}
