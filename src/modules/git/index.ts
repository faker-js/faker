import type { Faker } from '../..';
import { factory_branch } from './branch';
import { factory_commitEntry } from './commitEntry';
import { factory_commitMessage } from './commitMessage';
import { factory_commitSha } from './commitSha';
import { factory_shortSha } from './shortSha';

/**
 * Module to generate git related entries.
 */
export interface Git {
  /**
   * Generates a random branch name.
   *
   * @example
   * faker.git.branch() // 'feed-parse'
   */
  branch(): string;

  /**
   * Generates a random commit entry.
   *
   * @param options Options for the commit entry.
   * @param options.merge Set to `true` to generate a merge message line.
   * @param options.eol Choose the end of line character to use. Defaults to 'CRLF'.
   * 'LF' = '\n',
   * 'CRLF' = '\r\n'
   *
   * @example
   * faker.git.commitEntry()
   * // commit fe8c38a965d13d9794eb36918cb24cebe49a45c2
   * // Author: Mable Harvey <Cynthia_Quigley@yahoo.com>
   * // Date: Sat Feb 05 2022 15:09:18 GMT+0100 (Mitteleuropäische Normalzeit)
   * //
   * //     copy primary system
   */
  commitEntry(options?: { merge?: boolean; eol?: 'LF' | 'CRLF' }): string;

  /**
   * Generates a random commit message.
   *
   * @example
   * faker.git.commitMessage() // 'reboot cross-platform driver'
   */
  commitMessage(): string;

  /**
   * Generates a random commit sha (full).
   *
   * @example
   * faker.git.commitSha() // '2c6e3880fd94ddb7ef72d34e683cdc0c47bec6e6'
   */
  commitSha(): string;

  /**
   * Generates a random commit sha (short).
   *
   * @example
   * faker.git.shortSha() // '6155732'
   */
  shortSha(): string;
}

export const git = (faker: Faker): Git => ({
  branch: factory_branch(faker),
  commitEntry: factory_commitEntry(faker),
  commitMessage: factory_commitMessage(faker),
  commitSha: factory_commitSha(faker),
  shortSha: factory_shortSha(faker),
});
