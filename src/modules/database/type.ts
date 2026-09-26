import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database column type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * databaseType(fakerCore) // 'timestamp'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function databaseType(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.database.type);
}
