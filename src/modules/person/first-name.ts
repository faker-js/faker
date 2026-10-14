import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
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
 * fakePersonFirstName(fakerCore) // 'Antwan'
 * fakePersonFirstName(fakerCore, 'female') // 'Victoria'
 * fakePersonFirstName(fakerCore, 'male') // 'Tom'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonFirstName(
  fakerCore: FakerCore,
  sex?: SexType
): string {
  return fakeHelpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.first_name)
  );
}
