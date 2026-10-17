import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersMustache } from '../helpers/mustache';
import { fakeHelpersWeightedArrayElement } from '../helpers/weighted-array-element';
import { fakePersonFirstName } from './first-name';
import { fakePersonLastName } from './last-name';
import { fakePersonMiddleName } from './middle-name';
import { fakePersonPrefix } from './prefix';
import type { SexType } from './sex-type';
import { Sex } from './sex-type';
import { fakePersonSuffix } from './suffix';

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
 * fakePersonFullName(fakerCore) // 'Allen Brown'
 * fakePersonFullName(fakerCore, { firstName: 'Joann' }) // 'Joann Osinski'
 * fakePersonFullName(fakerCore, { firstName: 'Marcella', sex: 'female' }) // 'Mrs. Marcella Huels'
 * fakePersonFullName(fakerCore, { lastName: 'Beer' }) // 'Mr. Alfonso Beer'
 * fakePersonFullName(fakerCore, { sex: 'male' }) // 'Fernando Schaefer'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonFullName(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use. If not specified a random one will be chosen.
     *
     * @default fakePersonFirstName(fakerCore, sex)
     */
    firstName?: string;
    /**
     * The optional last name to use. If not specified a random one will be chosen.
     *
     * @default fakePersonLastName(fakerCore, sex)
     */
    lastName?: string;
    /**
     * The optional sex to use. Can be either `'female'` or `'male'`.
     *
     * @default fakeHelpersArrayElement(fakerCore, [Sex.Female, Sex.Male])
     */
    sex?: SexType;
  } = {}
): string {
  const {
    sex = fakeHelpersArrayElement(fakerCore, [Sex.Female, Sex.Male]),
    firstName = fakePersonFirstName(fakerCore, sex),
    lastName = fakePersonLastName(fakerCore, sex),
  } = options;

  const fullNamePattern: string = fakeHelpersWeightedArrayElement(
    fakerCore,
    fakerCore.locale.person.name
  );

  const fullName = fakeHelpersMustache(fakerCore, fullNamePattern, {
    'person.prefix': () => fakePersonPrefix(fakerCore, sex),
    'person.firstName': () => firstName,
    'person.middleName': () => fakePersonMiddleName(fakerCore, sex),
    'person.lastName': () => lastName,
    'person.suffix': () => fakePersonSuffix(fakerCore),
  });
  return fullName;
}
