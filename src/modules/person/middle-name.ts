import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
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
 * fakePersonMiddleName(fakerCore) // 'James'
 * fakePersonMiddleName(fakerCore, 'female') // 'Eloise'
 * fakePersonMiddleName(fakerCore, 'male') // 'Asher'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonMiddleName(fakerCore: FakerCore, sex?: SexType): string {
  return fakeHelpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.middle_name)
  );
}
