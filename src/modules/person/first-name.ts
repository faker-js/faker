import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random first name.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The optional sex to use.
 * Can be either `'female'` or `'male'`.
 *
 * @example
 * firstName(fakerCore) // 'Antwan'
 * firstName(fakerCore, 'female') // 'Victoria'
 * firstName(fakerCore, 'male') // 'Tom'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function firstName(fakerCore: FakerCore, sex?: SexType): string {
  return arrayElement(
    fakerCore,
    selectDefinition(fakerCore, sex, fakerCore.locale.person.first_name)
  );
}
