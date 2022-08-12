import type { Git } from '.';
import type { Helpers } from '../helpers';
import { HEX_CHARS } from './hexChars';

export function factory_commitSha(faker: {
  helpers: Pick<Helpers, 'arrayElement'>;
}): Git['commitSha'] {
  return () => {
    let commit = '';

    for (let i = 0; i < 40; i++) {
      commit += faker.helpers.arrayElement(HEX_CHARS);
    }

    return commit;
  };
}
