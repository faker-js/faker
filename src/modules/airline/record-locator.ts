import type { FakerCore } from '../../core';
import { alphanumeric } from '../string/alphanumeric';

const numerics = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const visuallySimilarCharacters = ['0', 'O', '1', 'I', 'L'];

/**
 * Generates a random [record locator](https://en.wikipedia.org/wiki/Record_locator). Record locators
 * are used by airlines to identify reservations. They're also known as booking reference numbers,
 * locator codes, confirmation codes, or reservation codes.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.allowNumerics Whether to allow numeric characters. Defaults to `false`.
 * @param options.allowVisuallySimilarCharacters Whether to allow visually similar characters such as '1' and 'I'. Defaults to `false`.
 *
 * @example
 * recordLocator(fakerCore) // 'KIFRWE'
 * recordLocator(fakerCore, { allowNumerics: true }) // 'E5TYEM'
 * recordLocator(fakerCore, { allowVisuallySimilarCharacters: true }) // 'ANZNEI'
 * recordLocator(fakerCore, { allowNumerics: true, allowVisuallySimilarCharacters: true }) // '1Z2Z3E'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function recordLocator(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to allow numeric characters.
     *
     * @default false
     */
    allowNumerics?: boolean;
    /**
     * Whether to allow visually similar characters such as '1' and 'I'.
     *
     * @default false
     */
    allowVisuallySimilarCharacters?: boolean;
  } = {}
): string {
  const { allowNumerics = false, allowVisuallySimilarCharacters = false } =
    options;
  const excludedChars: string[] = [];
  if (!allowNumerics) {
    excludedChars.push(...numerics);
  }

  if (!allowVisuallySimilarCharacters) {
    excludedChars.push(...visuallySimilarCharacters);
  }

  return alphanumeric(fakerCore, {
    length: 6,
    casing: 'upper',
    exclude: excludedChars,
  });
}
