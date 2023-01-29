import type { Faker } from '../..';

const GIT_DATE_FORMAT_BASE = new Intl.DateTimeFormat('en', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  hourCycle: 'h24',
  minute: '2-digit',
  second: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});
const GIT_TIMEZONE_FORMAT = new Intl.NumberFormat('en', {
  minimumIntegerDigits: 4,
  maximumFractionDigits: 0,
  useGrouping: false,
  signDisplay: 'always',
});

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
   * Generates a random commit entry as printed by `git log`.
   *
   * @param options Options for the commit entry.
   * @param options.merge Set to `true` to generate a merge message line.
   * @param options.eol Choose the end of line character to use. Defaults to 'CRLF'.
   * 'LF' = '\n',
   * 'CRLF' = '\r\n'
   *
   * @param options.refDate The date to use as reference point for the commit. Defaults to `new Date()`.
   *
   * @example
   * faker.git.commitEntry()
   * // commit fe8c38a965d13d9794eb36918cb24cebe49a45c2
   * // Author: Marion Becker <Marion_Becker49@gmail.com>
   * // Date: Mon Nov 7 05:38:37 2022 -0600
   * //
   * //     generate open-source system
   *
   * @since 5.0.0
   */
  commitEntry(
    options: {
      /**
       * Set to `true` to generate a merge message line.
       *
       * @default faker.datatype.boolean({ probability: 0.2 })
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
      merge = this.faker.datatype.boolean({ probability: 0.2 }),
      eol = 'CRLF',
      refDate,
    } = options;

    const lines = [`commit ${this.faker.git.commitSha()}`];

    if (merge) {
      lines.push(`Merge: ${this.shortSha()} ${this.shortSha()}`);
    }

    const firstName = this.faker.person.firstName();
    const lastName = this.faker.person.lastName();
    const fullName = this.faker.person.fullName({ firstName, lastName });
    const username = this.faker.internet.userName(firstName, lastName);
    const user = this.faker.helpers.arrayElement([fullName, username]);
    const email = this.faker.internet.email(firstName, lastName);

    lines.push(
      `Author: ${user} <${email}>`,
      `Date: ${this.commitDate({ refDate })}`,
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
   * Generates a date string for a git commit using the same format as `git log`.
   *
   * @param options The optional options object.
   * @param options.refDate The date to use as reference point for the commit. Defaults to `faker.defaultRefDate()`.
   *
   * @example
   * faker.git.commitDate() // 'Mon Nov 7 14:40:58 2022 +0600'
   * faker.git.commitDate({ refDate: '2020-01-01' }) // 'Tue Dec 31 05:40:59 2019 -0400'
   *
   * @since 8.0.0
   */
  commitDate(
    options: {
      /**
       * The date to use as reference point for the commit.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): string {
    const { refDate = this.faker.defaultRefDate() } = options;

    const dateParts = GIT_DATE_FORMAT_BASE.format(
      this.faker.date.recent({ days: 1, refDate })
    )
      .replace(/,/g, '')
      .split(' ');
    [dateParts[3], dateParts[4]] = [dateParts[4], dateParts[3]];

    // Timezone offset
    dateParts.push(
      GIT_TIMEZONE_FORMAT.format(
        this.faker.number.int({ min: -11, max: 12 }) * 100
      )
    );

    return dateParts.join(' ');
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
