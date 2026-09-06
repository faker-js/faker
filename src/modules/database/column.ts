import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random database column name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * column(fakerCore) // 'createdAt'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function column(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.database.column);
}
