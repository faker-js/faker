import type { FakerCore } from '../../core';
import { adjective } from '../hacker/adjective';
import { noun } from '../hacker/noun';
import { verb } from '../hacker/verb';

/**
 * Generates a random commit message.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commitMessage(fakerCore) // 'reboot cross-platform driver'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commitMessage(fakerCore: FakerCore): string {
  return `${verb(fakerCore)} ${adjective(fakerCore)} ${noun(fakerCore)}`;
}
