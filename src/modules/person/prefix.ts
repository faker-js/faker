import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { selectDefinition } from './_select-definition';
import type { SexType } from './sex-type';

/**
 * Returns a random person prefix.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
 *
 * @example
 * fakePersonPrefix(fakerCore) // 'Miss'
 * fakePersonPrefix(fakerCore, 'female') // 'Ms.'
 * fakePersonPrefix(fakerCore, 'male') // 'Mr.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakePersonPrefix(fakerCore: FakerCore, sex?: SexType): string {
  return fakeHelpersArrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.prefix)
  );
}
