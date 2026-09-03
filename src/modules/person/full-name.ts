import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { mustache } from '../helpers/mustache';
import { weightedArrayElement } from '../helpers/weighted-array-element';
import { firstName as personFirstName } from './first-name';
import { lastName as personLastName } from './last-name';
import { middleName } from './middle-name';
import { prefix } from './prefix';
import { suffix } from './suffix';

/**
 * Generates a random full name.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.firstName The optional first name to use. If not specified a random one will be chosen.
 * @param options.lastName The optional last name to use. If not specified a random one will be chosen.
 * @param options.sex The optional sex to use. Can be either `'female'` or `'male'`.
 *
 * @example
 * fullName(fakerCore) // 'Allen Brown'
 * fullName(fakerCore, { firstName: 'Joann' }) // 'Joann Osinski'
 * fullName(fakerCore, { firstName: 'Marcella', sex: 'female' }) // 'Mrs. Marcella Huels'
 * fullName(fakerCore, { lastName: 'Beer' }) // 'Mr. Alfonso Beer'
 * fullName(fakerCore, { sex: 'male' }) // 'Fernando Schaefer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fullName(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use. If not specified a random one will be chosen.
     *
     * @default firstName(fakerCore, sex)
     */
    firstName?: string;
    /**
     * The optional last name to use. If not specified a random one will be chosen.
     *
     * @default lastName(fakerCore, sex)
     */
    lastName?: string;
    /**
     * The optional sex to use. Can be either `'female'` or `'male'`.
     *
     * @default helpersArrayElement(fakerCore, ['female', 'male'])
     */
    sex?: SexType;
  } = {}
): string {
  const {
    sex = arrayElement(fakerCore, [Sex.Female, Sex.Male]),
    firstName = personFirstName(fakerCore, sex),
    lastName = personLastName(fakerCore, sex),
  } = options;

  const fullNamePattern: string = weightedArrayElement(
    fakerCore,
    fakerCore.locale.person.name
  );

  const fullName = mustache(fakerCore, fullNamePattern, {
    'person.prefix': () => prefix(fakerCore, sex),
    'person.firstName': () => firstName,
    'person.middleName': () => middleName(fakerCore, sex),
    'person.lastName': () => lastName,
    'person.suffix': () => suffix(fakerCore),
  });
  return fullName;
}
