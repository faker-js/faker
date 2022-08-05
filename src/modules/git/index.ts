import type { Faker } from '../..';

/**
 * Module to generate git related entries.
 */
export class Git {
  private hexChars = [
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

  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Git.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random branch name.
   *
   * @example
   * faker.git.branch() // 'feed-parse'
   */
  branch(): string {
    const noun = this.faker.hacker.noun().replace(' ', '-');
    const verb = this.faker.hacker.verb().replace(' ', '-');
    return `${noun}-${verb}`;
  }

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
  commitEntry(
    options: {
      merge?: boolean;
      eol?: 'LF' | 'CRLF';
    } = {}
  ): string {
    const lines = [`commit ${this.faker.git.commitSha()}`];

    if (options.merge || this.faker.datatype.number({ min: 0, max: 4 }) === 0) {
      lines.push(`Merge: ${this.shortSha()} ${this.shortSha()}`);
    }

    lines.push(
      `Author: ${this.faker.name.firstName()} ${this.faker.name.lastName()} <${this.faker.internet.email()}>`,
      `Date: ${this.faker.date.recent().toString()}`,
      '',
      `\xa0\xa0\xa0\xa0${this.commitMessage()}`,
      // to end with a eol char
      ''
    );

    const eolOption = options.eol ?? 'CRLF';
    const eolChar = eolOption === 'CRLF' ? '\r\n' : '\n';
    const entry = lines.join(eolChar);

    return entry;
  }

  /**
   * Generates a random commit message.
   *
   * @example
   * faker.git.commitMessage() // 'reboot cross-platform driver'
   */
  commitMessage(): string {
    return `${this.faker.hacker.verb()} ${this.faker.hacker.adjective()} ${this.faker.hacker.noun()}`;
  }

  /**
   * Generates a random commit sha (full).
   *
   * @example
   * faker.git.commitSha() // '2c6e3880fd94ddb7ef72d34e683cdc0c47bec6e6'
   */
  commitSha(): string {
    let commit = '';

    for (let i = 0; i < 40; i++) {
      commit += this.faker.helpers.arrayElement(this.hexChars);
    }

    return commit;
  }

  /**
   * Generates a random commit sha (short).
   *
   * @example
   * faker.git.shortSha() // '6155732'
   */
  shortSha(): string {
    let shortSha = '';

    for (let i = 0; i < 7; i++) {
      shortSha += this.faker.helpers.arrayElement(this.hexChars);
    }

    return shortSha;
  }
}
