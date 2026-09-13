import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { helpersArrayElement } from '../helpers/array-element';
import { internetEmail as internetEmail } from '../internet/email';
import { internetUsername as internetUsername } from '../internet/username';
import { personFirstName as personFirstName } from '../person/first-name';
import { personFullName as personFullName } from '../person/full-name';
import { personLastName as personLastName } from '../person/last-name';
import { gitCommitDate } from './commit-date';
import { gitCommitMessage } from './commit-message';
import { gitCommitSha } from './commit-sha';

const nbsp = '\u00A0';

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
 * gitCommitEntry(fakerCore)
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
export function gitCommitEntry(
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
    merge = datatypeBoolean(fakerCore, { probability: 0.2 }),
    eol = 'CRLF',
    refDate,
  } = options;

  const lines = [`commit ${gitCommitSha(fakerCore)}`];

  if (merge) {
    lines.push(
      `Merge: ${gitCommitSha(fakerCore, { length: 7 })} ${gitCommitSha(fakerCore, {
        length: 7,
      })}`
    );
  }

  const firstName = personFirstName(fakerCore);
  const lastName = personLastName(fakerCore);
  const fullName = personFullName(fakerCore, { firstName, lastName });
  const username = internetUsername(fakerCore, { firstName, lastName });
  let user = helpersArrayElement(fakerCore, [fullName, username]);
  const email = internetEmail(fakerCore, { firstName, lastName });

  // Normalize user according to https://github.com/libgit2/libgit2/issues/5342
  user = user.replaceAll(/^[.,:;"\\']|[<>\n]|[.,:;"\\']$/g, '');

  lines.push(
    `Author: ${user} <${email}>`,
    `Date: ${gitCommitDate(fakerCore, { refDate })}`,
    '',
    `${nbsp.repeat(4)}${gitCommitMessage(fakerCore)}`,
    // to end with a eol char
    ''
  );

  const eolChar = eol === 'CRLF' ? '\r\n' : '\n';
  const entry = lines.join(eolChar);

  return entry;
}
