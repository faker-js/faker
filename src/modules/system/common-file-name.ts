import type { FakerCore } from '../../core';
import { commonFileExt } from './common-file-ext';
import { fileName as systemFileName } from './file-name';

/**
 * Returns a random file name with a given extension or a commonly used extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param extension The file extension to use. Empty string is considered to be not set.
 *
 * @example
 * commonFileName(fakerCore) // 'dollar.jpg'
 * commonFileName(fakerCore, 'txt') // 'global_borders_wyoming.txt'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commonFileName(
  fakerCore: FakerCore,
  extension?: string
): string {
  const fileName = systemFileName(fakerCore, { extensionCount: 0 });

  return `${fileName}.${extension || commonFileExt(fakerCore)}`;
}
