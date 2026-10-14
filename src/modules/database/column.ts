import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database column name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeDatabaseColumn(fakerCore) // 'createdAt'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDatabaseColumn(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.database.column);
}
