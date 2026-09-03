import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { selectDefinition } from './_select-definition';
import type { SexType } from './sex-type';

/**
 * Returns a random person prefix.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
 *
 * @example
 * prefix(fakerCore) // 'Miss'
 * prefix(fakerCore, 'female') // 'Ms.'
 * prefix(fakerCore, 'male') // 'Mr.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function prefix(fakerCore: FakerCore, sex?: SexType): string {
  return arrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.prefix)
  );
}
