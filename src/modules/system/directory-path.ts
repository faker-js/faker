import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a directory path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * systemDirectoryPath(fakerCore) // '/etc/mail'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemDirectoryPath(fakerCore: FakerCore): string {
  const paths = fakerCore.locale.system.directory_path;
  return helpersArrayElement(fakerCore, paths);
}
