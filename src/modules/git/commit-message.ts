import type { FakerCore } from '../../core';
import { hackerAdjective } from '../hacker/adjective';
import { hackerNoun } from '../hacker/noun';
import { hackerVerb } from '../hacker/verb';

/**
 * Generates a random commit message.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * gitCommitMessage(fakerCore) // 'reboot cross-platform driver'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function gitCommitMessage(fakerCore: FakerCore): string {
  return `${hackerVerb(fakerCore)} ${hackerAdjective(fakerCore)} ${hackerNoun(fakerCore)}`;
}
