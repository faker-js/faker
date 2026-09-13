import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';
import { firstName as personFirstName } from '../person/first-name';
import { lastName as personLastName } from '../person/last-name';
import { charMapping } from './_char-mappings';

/**
 * Generates a username using the given person's name as base.
 * The resulting username may use neither, one or both of the names provided.
 * This will always return a plain ASCII string.
 * Some basic stripping of accents and transliteration of characters will be done.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
 * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
 *
 * @see displayName(fakerCore): For generating an Unicode display name.
 *
 * @example
 * username(fakerCore) // 'Nettie_Zboncak40'
 * username(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne98'
 * username(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne.Smith98'
 * username(fakerCore, { firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne_Doe98'
 * username(fakerCore, { firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
 * username(fakerCore, { firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
 * username(fakerCore, { firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
 * username(fakerCore, { firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function username(
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
    lastName: hasLastName,
  } = options;

  const separator = arrayElement(fakerCore, ['.', '_']);
  const disambiguator = int(fakerCore, 99);
  const strategies: Array<() => string> = [
    () => `${firstName}${separator}${lastName}${disambiguator}`,
    () => `${firstName}${separator}${lastName}`,
  ];
  if (!hasLastName) {
    strategies.push(() => `${firstName}${disambiguator}`);
  }

  let result = arrayElement(fakerCore, strategies)();

  // There may still be non-ascii characters in the result.
  // First remove simple accents etc
  result = result
    .normalize('NFKD') //for example è decomposes to as e +  ̀
    .replaceAll(/[\u0300-\u036F]/g, ''); // removes combining marks

  result = [...result]
    .map((char) => {
      // If we have a mapping for this character, (for Cyrillic, Greek etc) use it
      if (charMapping[char]) {
        return charMapping[char];
      }

      const charCode = char.codePointAt(0) ?? Number.NaN;

      if (charCode < 0x80) {
        // Keep ASCII characters
        return char;
      }

      // Final fallback return the Unicode char code value for Chinese, Japanese, Korean etc, base-36 encoded
      return charCode.toString(36);
    })
    .join('');
  result = result.replaceAll("'", '');
  result = result.replaceAll(' ', '');

  return result;
}
