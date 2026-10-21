import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random database collation.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeDatabaseCollation(fakerCore) // 'utf8_unicode_ci'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDatabaseCollation(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.database.collation
  );
}
