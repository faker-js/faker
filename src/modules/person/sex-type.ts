import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersEnumValue } from '../helpers/enum-value';

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
 * @see gender(fakerCore): For generating a gender related value in forms.
 * @see sex(fakerCore): For generating a binary-gender value in forms.
 *
 * @example
 * personSexType(fakerCore) // Sex.Female
 * personSexType(fakerCore, { includeGeneric: true }) // Sex.Generic
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personSexType(
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
    return helpersEnumValue(fakerCore, Sex);
  }

  return helpersArrayElement(fakerCore, [Sex.Female, Sex.Male]);
}
