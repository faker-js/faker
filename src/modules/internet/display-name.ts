import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { numberInt } from '../number/int';
import { personFirstName } from '../person/first-name';
import { personLastName } from '../person/last-name';

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
 * internetDisplayName(fakerCore) // 'Nettie_Zboncak40'
 * internetDisplayName(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
 * internetDisplayName(fakerCore, { firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
 * internetDisplayName(fakerCore, { firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
 * internetDisplayName(fakerCore, { firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
 * internetDisplayName(fakerCore, { firstName: '大羽', lastName: '陳' }) // '大羽.陳'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetDisplayName(
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

  const separator = helpersArrayElement(fakerCore, ['.', '_']);
  const disambiguator = numberInt(fakerCore, 99);
  const strategies: Array<() => string> = [
    () => `${firstName}${disambiguator}`,
    () => `${firstName}${separator}${lastName}`,
    () => `${firstName}${separator}${lastName}${disambiguator}`,
  ];

  let result = helpersArrayElement(fakerCore, strategies)();
  result = result.replaceAll("'", '');
  result = result.replaceAll(' ', '');
  return result;
}
