import type { Git } from '.';
import type { Hacker } from '../hacker';

export function factory_branch(faker: {
  hacker: Pick<Hacker, 'noun' | 'verb'>;
}): Git['branch'] {
  return () => {
    const noun = faker.hacker.noun().replace(' ', '-');
    const verb = faker.hacker.verb().replace(' ', '-');
    return `${noun}-${verb}`;
  };
}
