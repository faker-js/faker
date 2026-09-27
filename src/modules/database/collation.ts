import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database collation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * databaseCollation(fakerCore) // 'utf8_unicode_ci'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function databaseCollation(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.database.collation);
}
