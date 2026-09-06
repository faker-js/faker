import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { arrayElement } from '../helpers/array-element';
import { email as internetEmail } from '../internet/email';
import { username as internetUsername } from '../internet/username';
import { firstName as personFirstName } from '../person/first-name';
import { fullName as personFullName } from '../person/full-name';
import { lastName as personLastName } from '../person/last-name';
import { commitDate } from './commit-date';
import { commitMessage } from './commit-message';
import { commitSha } from './commit-sha';

/**
 * Generates a random commit entry as printed by `git log`.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for the commit entry.
 * @param options.merge Whether to generate a merge message line. Defaults to 20% `true` and 80% `false`.
 * @param options.eol Choose the end of line character to use. Defaults to `'CRLF'`.
 * 'LF' = '\n',
 * 'CRLF' = '\r\n'
 * @param options.refDate The date to use as reference point for the commit. Defaults to `new Date()`.
 *
 * @example
 * commitEntry(fakerCore)
 * // commit fe8c38a965d13d9794eb36918cb24cebe49a45c2
 * // Author: Marion Becker <Marion_Becker49@gmail.com>
 * // Date: Mon Nov 7 05:38:37 2022 -0600
 * //
 * //     generate open-source system
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commitEntry(
  fakerCore: FakerCore,
  options: {
    /**
     * Set to `true` to generate a merge message line.
     *
     * @default datatypeBoolean(fakerCore, { probability: 0.2 })
     */
    merge?: boolean;
    /**
     * Choose the end of line character to use.
     *
     * - 'LF' = '\n',
     * - 'CRLF' = '\r\n'
     *
     * @default 'CRLF'
     */
    eol?: 'LF' | 'CRLF';
    /**
     * The date to use as reference point for the commit.
     *
     * @default new Date()
     */
    refDate?: string | Date | number;
  } = {}
): string {
  const {
    merge = boolean(fakerCore, { probability: 0.2 }),
    eol = 'CRLF',
    refDate,
  } = options;

  const lines = [`commit ${commitSha(fakerCore)}`];

  if (merge) {
    lines.push(
      `Merge: ${commitSha(fakerCore, { length: 7 })} ${commitSha(fakerCore, {
        length: 7,
      })}`
    );
  }

  const firstName = personFirstName(fakerCore);
  const lastName = personLastName(fakerCore);
  const fullName = personFullName(fakerCore, { firstName, lastName });
  const username = internetUsername(fakerCore, { firstName, lastName });
  let user = arrayElement(fakerCore, [fullName, username]);
  const email = internetEmail(fakerCore, { firstName, lastName });

  // Normalize user according to https://github.com/libgit2/libgit2/issues/5342
  user = user.replaceAll(/^[.,:;"\\']|[<>\n]|[.,:;"\\']$/g, '');

  lines.push(
    `Author: ${user} <${email}>`,
    `Date: ${commitDate(fakerCore, { refDate })}`,
    '',
    `${nbsp.repeat(4)}${commitMessage(fakerCore)}`,
    // to end with a eol char
    ''
  );

  const eolChar = eol === 'CRLF' ? '\r\n' : '\n';
  const entry = lines.join(eolChar);

  return entry;
}
