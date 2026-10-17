import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersWeightedArrayElement } from '../helpers/weighted-array-element';
import { selectDefinition } from './_select-definition';
import type { SexType } from './sex-type';

/**
 * Returns a random last name.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use.
 * Can be either `'female'` or `'male'`.
 *
 * @example
 * fakePersonLastName(fakerCore) // 'Hauck'
 * fakePersonLastName(fakerCore, 'female') // 'Grady'
 * fakePersonLastName(fakerCore, 'male') // 'Barton'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonLastName(
  fakerCore: FakerCore,
  sex?: SexType
): string {
  const patterns = fakerCore.locale.raw.person?.last_name_pattern;
  if (patterns != null) {
    const pattern = fakeHelpersWeightedArrayElement(
      fakerCore,
      selectDefinition(fakerCore, sex, patterns)
    );
    return new Faker(fakerCore).helpers.fake(pattern);
  }

  return fakeHelpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.last_name)
  );
}
