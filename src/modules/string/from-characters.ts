import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersMultiple } from '../helpers/multiple';
import { helpersRangeToNumber } from '../helpers/range-to-number';

/**
 * Generates a string from the given characters.
 *
 * @param fakerCore The FakerCore to use.
 * @param characters The characters to use for the string. Can be a string or an array of characters.
 * If it is an array, then each element is treated as a single character even if it is a string with multiple characters.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param length.min The minimum length of the string to generate.
 * @param length.max The maximum length of the string to generate.
 *
 * @throws {FakerError} If there are no characters to select from.
 *
 * @example
 * stringFromCharacters(fakerCore, 'abc') // 'c'
 * stringFromCharacters(fakerCore, ['a', 'b', 'c']) // 'a'
 * stringFromCharacters(fakerCore, 'abc', 10) // 'cbbbacbacb'
 * stringFromCharacters(fakerCore, 'abc', { min: 5, max: 10 }) // 'abcaaaba'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function stringFromCharacters(
  fakerCore: FakerCore,
  characters: string | ReadonlyArray<string>,
  length: NumberOrRange = 1
): string {
  length = helpersRangeToNumber(fakerCore, length);
  if (length <= 0) {
    return '';
  }

  if (typeof characters === 'string') {
    characters = [...characters];
  }

  if (characters.length === 0) {
    throw new FakerError(
      'Unable to generate string: No characters to select from.'
    );
  }

  return helpersMultiple(
    fakerCore,
    () => helpersArrayElement(fakerCore, characters as string[]),
    {
      count: length,
    }
  ).join('');
}
