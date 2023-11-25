import { deprecated } from '../internal/deprecated';
import { faker as en_IN } from './en_IN';

export const faker = (() => {
  deprecated({
    deprecated: "import { faker } from '@faker-js/faker/locale/en_IND'",
    proposed: "import { faker } from '@faker-js/faker/locale/en_IN'",
    since: '8.0',
    until: '9.0',
  });
  return en_IN;
})();
