import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { selectDefinition } from './_select-definition';
import type { SexType } from './sex-type';

/**
 * Returns a random first name.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use.
 * Can be either `'female'` or `'male'`.
 *
 * @example
 * personFirstName(fakerCore) // 'Antwan'
 * personFirstName(fakerCore, 'female') // 'Victoria'
 * personFirstName(fakerCore, 'male') // 'Tom'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function personFirstName(fakerCore: FakerCore, sex?: SexType): string {
  return helpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.first_name)
  );
}
