import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a directory path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemDirectoryPath(fakerCore) // '/etc/mail'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemDirectoryPath(fakerCore: FakerCore): string {
  const paths = fakerCore.locale.system.directory_path;
  return fakeHelpersArrayElement(fakerCore, paths);
}
