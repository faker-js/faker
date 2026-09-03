import type { FakerCore } from '../../core';
import { directoryPath } from './directory-path';
import { fileName } from './file-name';

/**
 * Returns a file path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * filePath(fakerCore) // '/usr/local/src/money.dotx'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function filePath(fakerCore: FakerCore): string {
  return `${directoryPath(fakerCore)}/${fileName(fakerCore)}`;
}
