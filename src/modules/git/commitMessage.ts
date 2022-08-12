import type { Git } from '.';
import type { Hacker } from '../hacker';

export function factory_commitMessage(faker: {
  hacker: Pick<Hacker, 'adjective' | 'noun' | 'verb'>;
}): Git['commitMessage'] {
  return () =>
    `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
}
