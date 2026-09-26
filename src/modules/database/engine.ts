import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database engine.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * databaseEngine(fakerCore) // 'ARCHIVE'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function databaseEngine(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.database.engine);
}
