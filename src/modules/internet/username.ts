import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';
import { fakePersonFirstName } from '../person/first-name';
import { fakePersonLastName } from '../person/last-name';
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
 * @see fakeInternetDisplayName(fakerCore): For generating an Unicode display name.
 *
 * @example
 * fakeInternetUsername(fakerCore) // 'Nettie_Zboncak40'
 * fakeInternetUsername(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne98'
 * fakeInternetUsername(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne.Smith98'
 * fakeInternetUsername(fakerCore, { firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne_Doe98'
 * fakeInternetUsername(fakerCore, { firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
 * fakeInternetUsername(fakerCore, { firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
 * fakeInternetUsername(fakerCore, { firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
 * fakeInternetUsername(fakerCore, { firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetUsername(
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
    lastName: hasLastName,
  } = options;

  const separator = fakeHelpersArrayElement(fakerCore, ['.', '_']);
  const disambiguator = fakeNumberInt(fakerCore, 99);
  const strategies: Array<() => string> = [
    () => `${firstName}${separator}${lastName}${disambiguator}`,
    () => `${firstName}${separator}${lastName}`,
  ];
  if (!hasLastName) {
    strategies.push(() => `${firstName}${disambiguator}`);
  }

  let result = fakeHelpersArrayElement(fakerCore, strategies)();

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
