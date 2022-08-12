import type { Git } from '.';
import type { Datatype } from '../datatype';
import type { _Date } from '../date';
import type { Internet } from '../internet';
import type { Name } from '../name';

export function factory_commitEntry(faker: {
  datatype: Pick<Datatype, 'number'>;
  date: Pick<_Date, 'recent'>;
  git: Pick<Git, 'commitMessage' | 'commitSha' | 'shortSha'>;
  internet: Pick<Internet, 'email'>;
  name: Pick<Name, 'firstName' | 'lastName'>;
}): Git['commitEntry'] {
  return (options = {}) => {
    const lines = [`commit ${faker.git.commitSha()}`];

    if (options.merge || faker.datatype.number({ min: 0, max: 4 }) === 0) {
      lines.push(`Merge: ${faker.git.shortSha()} ${faker.git.shortSha()}`);
    }

    lines.push(
      `Author: ${faker.name.firstName()} ${faker.name.lastName()} <${faker.internet.email()}>`,
      `Date: ${faker.date.recent().toString()}`,
      '',
      `\xa0\xa0\xa0\xa0${faker.git.commitMessage()}`,
      // to end with a eol char
      ''
    );

    const eolOption = options.eol ?? 'CRLF';
    const eolChar = eolOption === 'CRLF' ? '\r\n' : '\n';
    const entry = lines.join(eolChar);

    return entry;
  };
}
