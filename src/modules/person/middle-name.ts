import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { selectDefinition } from './_select-definition';
import type { SexType } from './sex-type';

/**
 * Returns a random middle name.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use.
 * Can be either `'female'` or `'male'`.
 *
 * @example
 * middleName(fakerCore) // 'James'
 * middleName(fakerCore, 'female') // 'Eloise'
 * middleName(fakerCore, 'male') // 'Asher'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function middleName(fakerCore: FakerCore, sex?: SexType): string {
  return arrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.middle_name)
  );
}
