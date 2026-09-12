import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';
import { firstName as personFirstName } from '../person/first-name';
import { lastName as personLastName } from '../person/last-name';

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
 * @see username(fakerCore): For generating a plain ASCII username.
 *
 * @example
 * displayName(fakerCore) // 'Nettie_Zboncak40'
 * displayName(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
 * displayName(fakerCore, { firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
 * displayName(fakerCore, { firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
 * displayName(fakerCore, { firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
 * displayName(fakerCore, { firstName: '大羽', lastName: '陳' }) // '大羽.陳'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function displayName(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use.
     *
     * @default personFirstName(fakerCore)
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default personLastName(fakerCore)
     */
    lastName?: string;
  } = {}
): string {
  const {
    firstName = personFirstName(fakerCore),
    lastName = personLastName(fakerCore),
  } = options;

  const separator = arrayElement(fakerCore, ['.', '_']);
  const disambiguator = int(fakerCore, 99);
  const strategies: Array<() => string> = [
    () => `${firstName}${disambiguator}`,
    () => `${firstName}${separator}${lastName}`,
    () => `${firstName}${separator}${lastName}${disambiguator}`,
  ];

  let result = arrayElement(fakerCore, strategies)();
  result = result.replaceAll("'", '');
  result = result.replaceAll(' ', '');
  return result;
}
