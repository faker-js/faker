import type { Faker } from '../..';

/**
 * Module to generate git related entries.
 */
export class GitModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(GitModule.prototype)) {
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
   *
   * @since 5.0.0
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
   * @param options.refDate The date to use as reference point for the commit. Defaults to now.
   *
   * @example
   * faker.git.commitEntry()
   * // commit fe8c38a965d13d9794eb36918cb24cebe49a45c2
   * // Author: Mable Harvey <Cynthia_Quigley@yahoo.com>
   * // Date: Sat Feb 05 2022 15:09:18 GMT+0100 (Mitteleuropäische Normalzeit)
   * //
   * //     copy primary system
   *
   * @since 5.0.0
   */
  commitEntry(
    options: {
      merge?: boolean;
      eol?: 'LF' | 'CRLF';
      refDate?: string | Date | number;
    } = {}
  ): string {
    const {
      merge = this.faker.datatype.boolean({ probability: 0.2 }),
      eol = 'CRLF',
      refDate,
    } = options;

    const lines = [`commit ${this.faker.git.commitSha()}`];

    if (merge) {
      lines.push(`Merge: ${this.shortSha()} ${this.shortSha()}`);
    }

    lines.push(
      `Author: ${this.faker.person.firstName()} ${this.faker.person.lastName()} <${this.faker.internet.email()}>`,
      `Date: ${this.faker.date.recent(1, refDate).toString()}`,
      '',
      `\xa0\xa0\xa0\xa0${this.commitMessage()}`,
      // to end with a eol char
      ''
    );

    const eolChar = eol === 'CRLF' ? '\r\n' : '\n';
    const entry = lines.join(eolChar);

    return entry;
  }

  /**
   * Generates a random commit message.
   *
   * @example
   * faker.git.commitMessage() // 'reboot cross-platform driver'
   *
   * @since 5.0.0
   */
  commitMessage(): string {
    return `${this.faker.hacker.verb()} ${this.faker.hacker.adjective()} ${this.faker.hacker.noun()}`;
  }

  /**
   * Generates a random commit sha (full).
   *
   * @example
   * faker.git.commitSha() // '2c6e3880fd94ddb7ef72d34e683cdc0c47bec6e6'
   *
   * @since 5.0.0
   */
  commitSha(): string {
    return this.faker.string.hexadecimal({
      length: 40,
      casing: 'lower',
      prefix: '',
    });
  }

  /**
   * Generates a random commit sha (short).
   *
   * @example
   * faker.git.shortSha() // '6155732'
   *
   * @since 5.0.0
   */
  shortSha(): string {
    return this.faker.string.hexadecimal({
      length: 7,
      casing: 'lower',
      prefix: '',
    });
  }
}
