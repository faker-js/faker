import { deprecated } from '../internal/deprecated';
import { faker as ka_GE } from './ka_GE';

export const faker = (() => {
  deprecated({
    deprecated: "import { faker } from '@faker-js/faker/locale/ge'",
    proposed: "import { faker } from '@faker-js/faker/locale/ka_GE'",
    since: '8.0',
    until: '9.0',
  });
  return ka_GE;
})();
