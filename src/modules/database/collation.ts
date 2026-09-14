import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random database collation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * collation(fakerCore) // 'utf8_unicode_ci'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function collation(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.database.collation);
}
