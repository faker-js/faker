import type { Git } from '.';
import type { Helpers } from '../helpers';
import { HEX_CHARS } from './hexChars';

export function factory_shortSha(faker: {
  helpers: Pick<Helpers, 'arrayElement'>;
}): Git['shortSha'] {
  return () => {
    let shortSha = '';

    for (let i = 0; i < 7; i++) {
      shortSha += faker.helpers.arrayElement(HEX_CHARS);
    }

    return shortSha;
  };
}
