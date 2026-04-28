import { deprecated } from '../internal/deprecated';
import { faker as en_NP } from './en_NP';

/**
 * The faker instance for the `en_NP` locale.
 *
 * - Language: English (Nepal)
 * - Endonym: English (Nepal)
 *
 * This instance uses the following locales internally (in descending precedence):
 *
 * - `en_NP`
 * - `en`
 * - `base`
 *
 * @deprecated Use `fakerEN_NP` instead. This export will be removed in version 11.0.
 */
export const faker = (() => {
  deprecated({
    deprecated: "import { faker } from '@faker-js/faker/locale/ne'",
    proposed: "import { faker } from '@faker-js/faker/locale/en_NP'",
    since: '10.5',
    until: '11.0',
  });
  return en_NP;
})();
