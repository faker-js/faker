import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
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
 * personMiddleName(fakerCore) // 'James'
 * personMiddleName(fakerCore, 'female') // 'Eloise'
 * personMiddleName(fakerCore, 'male') // 'Asher'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personMiddleName(fakerCore: FakerCore, sex?: SexType): string {
  return helpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.middle_name)
  );
}
