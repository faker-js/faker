import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersRangeToNumber } from '../helpers/range-to-number';
import { fakeHelpersWeightedArrayElement } from '../helpers/weighted-array-element';
import { fakeStringAlphanumeric } from './alphanumeric';

/**
 * Generates a [Nano ID](https://github.com/ai/nanoid).
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `21`.
 * @param length.min The minimum length of the Nano ID to generate.
 * @param length.max The maximum length of the Nano ID to generate.
 *
 * @example
 * fakeStringNanoid(fakerCore) // ptL0KpX_yRMI98JFr6B3n
 * fakeStringNanoid(fakerCore, 10) // VsvwSdm_Am
 * fakeStringNanoid(fakerCore, { min: 13, max: 37 }) // KIRsdEL9jxVgqhBDlm
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeStringNanoid(
  fakerCore: FakerCore,
  length: NumberOrRange = 21
): string {
  length = fakeHelpersRangeToNumber(fakerCore, length);
  if (length <= 0) {
    return '';
  }

  const generators = [
    {
      value: () => fakeStringAlphanumeric(fakerCore, 1),
      // a-z is 26 characters
      // this times 2 for upper & lower case is 52
      // add all numbers 0-9 (10 in total) you get 62
      weight: 62,
    },
    {
      value: () => fakeHelpersArrayElement(fakerCore, ['_', '-']),
      weight: 2,
    },
  ];
  let result = '';
  while (result.length < length) {
    const charGen = fakeHelpersWeightedArrayElement(fakerCore, generators);
    result += charGen();
  }

  return result;
}
