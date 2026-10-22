import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersEnumValue } from '../helpers/enum-value';

/**
 * The enum for values corresponding to a person's sex.
 */
export enum Sex {
  /**
   * Is used for values that are primarily attributable to only females.
   */
  Female = 'female',
  /**
   * Is used for values that cannot clearly be attributed to a specific sex or are used for both sexes.
   */
  Generic = 'generic',
  /**
   * Is used for values that are primarily attributable to only males.
   */
  Male = 'male',
}

/**
 * The parameter type for values corresponding to a person's sex.
 */
export type SexType = `${Sex}`;

/**
 * Returns a random sex type. The `SexType` is intended to be used in parameters and conditions.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object.
 * @param options.includeGeneric Whether `'generic'` should be included in the potential outputs.
 * If `false`, this method only returns `'female'` and `'male'`.
 * Default is `false`.
 *
 * @see fakePersonGender(fakerCore): For generating a gender related value in forms.
 * @see fakePersonSex(fakerCore): For generating a binary-gender value in forms.
 *
 * @example
 * fakePersonSexType(fakerCore) // Sex.Female
 * fakePersonSexType(fakerCore, { includeGeneric: true }) // Sex.Generic
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonSexType(
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
    return fakeHelpersEnumValue(fakerCore, Sex);
  }

  return fakeHelpersArrayElement(fakerCore, [Sex.Female, Sex.Male]);
}
