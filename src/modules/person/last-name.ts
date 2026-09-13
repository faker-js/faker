import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { arrayElement } from '../helpers/array-element';
import { weightedArrayElement } from '../helpers/weighted-array-element';
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
 * lastName(fakerCore) // 'Hauck'
 * lastName(fakerCore, 'female') // 'Grady'
 * lastName(fakerCore, 'male') // 'Barton'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lastName(fakerCore: FakerCore, sex?: SexType): string {
  const patterns = fakerCore.locale.raw.person?.last_name_pattern;
  if (patterns != null) {
    const pattern = weightedArrayElement(
      fakerCore,
      selectDefinition(fakerCore, sex, patterns)
    );
    return new Faker(fakerCore).helpers.fake(pattern);
  }

  return arrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.last_name)
  );
}
