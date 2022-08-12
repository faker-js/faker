import type { Faker } from '../..';

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

/**
 * Module to generate git related entries.
 *
 * @param faker - Faker instance.
 */
export function git(faker: Faker): Git {
  const hexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  const branch: Git['branch'] = () => {
    const noun = faker.hacker.noun().replace(' ', '-');
    const verb = faker.hacker.verb().replace(' ', '-');
    return `${noun}-${verb}`;
  };

  const commitEntry: Git['commitEntry'] = (options = {}) => {
    const lines = [`commit ${commitSha()}`];

    if (options.merge || faker.datatype.number({ min: 0, max: 4 }) === 0) {
      lines.push(`Merge: ${shortSha()} ${shortSha()}`);
    }

    lines.push(
      `Author: ${faker.name.firstName()} ${faker.name.lastName()} <${faker.internet.email()}>`,
      `Date: ${faker.date.recent().toString()}`,
      '',
      `\xa0\xa0\xa0\xa0${commitMessage()}`,
      // to end with a eol char
      ''
    );

    const eolOption = options.eol ?? 'CRLF';
    const eolChar = eolOption === 'CRLF' ? '\r\n' : '\n';
    const entry = lines.join(eolChar);

    return entry;
  };

  const commitMessage: Git['commitMessage'] = () =>
    `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;

  const commitSha: Git['commitSha'] = () => {
    let commit = '';

    for (let i = 0; i < 40; i++) {
      commit += faker.helpers.arrayElement(hexChars);
    }

    return commit;
  };

  const shortSha: Git['shortSha'] = () => {
    let shortSha = '';

    for (let i = 0; i < 7; i++) {
      shortSha += faker.helpers.arrayElement(hexChars);
    }

    return shortSha;
  };

  return {
    branch,
    commitEntry,
    commitMessage,
    commitSha,
    shortSha,
  };
}
