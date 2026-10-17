import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database column type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeDatabaseType(fakerCore) // 'timestamp'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDatabaseType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.database.type);
}
