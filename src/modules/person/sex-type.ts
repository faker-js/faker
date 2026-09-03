import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { enumValue } from '../helpers/enum-value';

/**
 * Returns a random sex type. The `SexType` is intended to be used in parameters and conditions.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.includeGeneric Whether `'generic'` should be included in the potential outputs.
 * If `false`, this method only returns `'female'` and `'male'`.
 * Default is `false`.
 *
 * @see gender(fakerCore): For generating a gender related value in forms.
 * @see sex(fakerCore): For generating a binary-gender value in forms.
 *
 * @example
 * sexType(fakerCore) // Sex.Female
 * sexType(fakerCore, { includeGeneric: true }) // Sex.Generic
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function sexType(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether `'generic'` should be included in the potential outputs.
     * If `false`, this method only returns `'female'` and `'male'`.
     *
     * @default false
     */
    includeGeneric?: boolean;
  } = {}
): SexType {
  const { includeGeneric = false } = options;

  if (includeGeneric) {
    return enumValue(fakerCore, Sex);
  }

  return arrayElement(fakerCore, [Sex.Female, Sex.Male]);
}
