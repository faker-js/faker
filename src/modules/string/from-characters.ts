import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import type { NumberOrRange } from '../../utils/types';
import { arrayElement } from '../helpers/array-element';
import { multiple } from '../helpers/multiple';
import { rangeToNumber } from '../helpers/range-to-number';

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
 * @example
 * fromCharacters(fakerCore, 'abc') // 'c'
 * fromCharacters(fakerCore, ['a', 'b', 'c']) // 'a'
 * fromCharacters(fakerCore, 'abc', 10) // 'cbbbacbacb'
 * fromCharacters(fakerCore, 'abc', { min: 5, max: 10 }) // 'abcaaaba'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fromCharacters(
  fakerCore: FakerCore,
  characters: string | ReadonlyArray<string>,
  length: NumberOrRange = 1
): string {
  length = rangeToNumber(fakerCore, length);
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

  return multiple(
    fakerCore,
    () => arrayElement(fakerCore, characters as string[]),
    {
      count: length,
    }
  ).join('');
}
