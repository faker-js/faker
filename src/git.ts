import type { Faker } from '.';

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

  constructor(private readonly faker: Faker) {}

  /**
   * branch
   *
   * @method faker.git.branch
   */
  branch() {
    const noun = this.faker.hacker.noun().replace(' ', '-');
    const verb = this.faker.hacker.verb().replace(' ', '-');
    return noun + '-' + verb;
  }

  /**
   * commitEntry
   *
   * @method faker.git.commitEntry
   * @param options
   */
  commitEntry(options: { merge?: boolean } = {}) {
    // TODO @Shinigami92 2022-01-11: We may want to make it configurable to use just `\n` instead of `\r\n`
    let entry = 'commit {{git.commitSha}}\r\n';

    if (options.merge || this.faker.datatype.number({ min: 0, max: 4 }) === 0) {
      entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
    }

    entry +=
      'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
    entry += 'Date: ' + this.faker.date.recent().toString() + '\r\n';
    entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

    return this.faker.fake(entry);
  }

  /**
   * commitMessage
   *
   * @method faker.git.commitMessage
   */
  commitMessage() {
    const format = '{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}';
    return this.faker.fake(format);
  }

  /**
   * commitSha
   *
   * @method faker.git.commitSha
   */
  commitSha() {
    let commit = '';

    for (let i = 0; i < 40; i++) {
      commit += this.faker.random.arrayElement(this.hexChars);
    }

    return commit;
  }

  /**
   * shortSha
   *
   * @method faker.git.shortSha
   */
  shortSha() {
    let shortSha = '';

    for (let i = 0; i < 7; i++) {
      shortSha += this.faker.random.arrayElement(this.hexChars);
    }

    return shortSha;
  }
}
