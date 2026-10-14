import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database engine.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeDatabaseEngine(fakerCore) // 'ARCHIVE'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDatabaseEngine(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, fakerCore.locale.database.engine);
}
