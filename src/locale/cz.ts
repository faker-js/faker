import { deprecated } from '../internal/deprecated';
import { faker as cs_CZ } from './cs_CZ';

export const faker = (() => {
  deprecated({
    deprecated: "import { faker } from '@faker-js/faker/locale/cz'",
    proposed: "import { faker } from '@faker-js/faker/locale/cs_CZ'",
    since: '8.0',
    until: '9.0',
  });
  return cs_CZ;
})();
