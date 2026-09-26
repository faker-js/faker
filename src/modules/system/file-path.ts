import type { FakerCore } from '../../core';
import { systemDirectoryPath } from './directory-path';
import { systemFileName } from './file-name';

/**
 * Returns a file path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * systemFilePath(fakerCore) // '/usr/local/src/money.dotx'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemFilePath(fakerCore: FakerCore): string {
  return `${systemDirectoryPath(fakerCore)}/${systemFileName(fakerCore)}`;
}
