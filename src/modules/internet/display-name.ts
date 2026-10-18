import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';
import { fakePersonFirstName } from '../person/first-name';
import { fakePersonLastName } from '../person/last-name';

/**
 * Generates a display name using the given person's name as base.
 * The resulting display name may use one or both of the provided names.
 * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
 * It will not contain spaces.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
 * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
 *
 * @see fakeInternetUsername(fakerCore): For generating a plain ASCII username.
 *
 * @example
 * fakeInternetDisplayName(fakerCore) // 'Nettie_Zboncak40'
 * fakeInternetDisplayName(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
 * fakeInternetDisplayName(fakerCore, { firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
 * fakeInternetDisplayName(fakerCore, { firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
 * fakeInternetDisplayName(fakerCore, { firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
 * fakeInternetDisplayName(fakerCore, { firstName: '大羽', lastName: '陳' }) // '大羽.陳'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetDisplayName(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use.
     *
     * @default fakePersonFirstName(fakerCore)
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default fakePersonLastName(fakerCore)
     */
    lastName?: string;
  } = {}
): string {
  const {
    firstName = fakePersonFirstName(fakerCore),
    lastName = fakePersonLastName(fakerCore),
  } = options;

  const separator = fakeHelpersArrayElement(fakerCore, ['.', '_']);
  const disambiguator = fakeNumberInt(fakerCore, 99);
  const strategies: Array<() => string> = [
    () => `${firstName}${disambiguator}`,
    () => `${firstName}${separator}${lastName}`,
    () => `${firstName}${separator}${lastName}${disambiguator}`,
  ];

  let result = fakeHelpersArrayElement(fakerCore, strategies)();
  result = result.replaceAll("'", '');
  result = result.replaceAll(' ', '');
  return result;
}
