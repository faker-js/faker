import type { FakerCore } from '../../core';
import { fakeSystemDirectoryPath } from './directory-path';
import { fakeSystemFileName } from './file-name';

/**
 * Returns a file path.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemFilePath(fakerCore) // '/usr/local/src/money.dotx'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemFilePath(fakerCore: FakerCore): string {
  return `${fakeSystemDirectoryPath(fakerCore)}/${fakeSystemFileName(fakerCore)}`;
}
