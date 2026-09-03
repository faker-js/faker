import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { arrayElement } from '../helpers/array-element';
import { rangeToNumber } from '../helpers/range-to-number';
import { weightedArrayElement } from '../helpers/weighted-array-element';
import { alphanumeric } from './alphanumeric';

/**
 * Generates a [Nano ID](https://github.com/ai/nanoid).
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `21`.
 * @param length.min The minimum length of the Nano ID to generate.
 * @param length.max The maximum length of the Nano ID to generate.
 *
 * @example
 * nanoid(fakerCore) // ptL0KpX_yRMI98JFr6B3n
 * nanoid(fakerCore, 10) // VsvwSdm_Am
 * nanoid(fakerCore, { min: 13, max: 37 }) // KIRsdEL9jxVgqhBDlm
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function nanoid(
  fakerCore: FakerCore,
  length: NumberOrRange = 21
): string {
  length = rangeToNumber(fakerCore, length);
  if (length <= 0) {
    return '';
  }

  const generators = [
    {
      value: () => alphanumeric(fakerCore, 1),
      // a-z is 26 characters
      // this times 2 for upper & lower case is 52
      // add all numbers 0-9 (10 in total) you get 62
      weight: 62,
    },
    {
      value: () => arrayElement(fakerCore, ['_', '-']),
      weight: 2,
    },
  ];
  let result = '';
  while (result.length < length) {
    const charGen = weightedArrayElement(fakerCore, generators);
    result += charGen();
  }

  return result;
}
