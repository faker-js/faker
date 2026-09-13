import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersMustache } from '../helpers/mustache';
import { helpersWeightedArrayElement } from '../helpers/weighted-array-element';
import { personFirstName as personFirstName } from './first-name';
import { personLastName as personLastName } from './last-name';
import { personMiddleName } from './middle-name';
import { personPrefix } from './prefix';
import type { SexType } from './sex-type';
import { personSex } from './sex-type';
import { personSuffix } from './suffix';

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
 * personFullName(fakerCore) // 'Allen Brown'
 * personFullName(fakerCore, { firstName: 'Joann' }) // 'Joann Osinski'
 * personFullName(fakerCore, { firstName: 'Marcella', sex: 'female' }) // 'Mrs. Marcella Huels'
 * personFullName(fakerCore, { lastName: 'Beer' }) // 'Mr. Alfonso Beer'
 * personFullName(fakerCore, { sex: 'male' }) // 'Fernando Schaefer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personFullName(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use. If not specified a random one will be chosen.
     *
     * @default personFirstName(fakerCore, sex)
     */
    firstName?: string;
    /**
     * The optional last name to use. If not specified a random one will be chosen.
     *
     * @default personLastName(fakerCore, sex)
     */
    lastName?: string;
    /**
     * The optional sex to use. Can be either `'female'` or `'male'`.
     *
     * @default helpersArrayElement(fakerCore, [Sex.Female, Sex.Male])
     */
    sex?: SexType;
  } = {}
): string {
  const {
    sex = helpersArrayElement(fakerCore, [Sex.Female, Sex.Male]),
    firstName = personFirstName(fakerCore, sex),
    lastName = personLastName(fakerCore, sex),
  } = options;

  const fullNamePattern: string = helpersWeightedArrayElement(
    fakerCore,
    fakerCore.locale.person.name
  );

  const fullName = helpersMustache(fakerCore, fullNamePattern, {
    'person.prefix': () => personPrefix(fakerCore, sex),
    'person.firstName': () => firstName,
    'person.middleName': () => personMiddleName(fakerCore, sex),
    'person.lastName': () => lastName,
    'person.suffix': () => personSuffix(fakerCore),
  });
  return fullName;
}
