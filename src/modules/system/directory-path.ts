import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a directory path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * directoryPath(fakerCore) // '/etc/mail'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function directoryPath(fakerCore: FakerCore): string {
  const paths = fakerCore.locale.system.directory_path;
  return arrayElement(fakerCore, paths);
}
