import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database column name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * databaseColumn(fakerCore) // 'createdAt'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function databaseColumn(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.database.column);
}
