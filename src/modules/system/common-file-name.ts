import type { FakerCore } from '../../core';
import { fakeSystemCommonFileExt } from './common-file-ext';
import { fakeSystemFileName } from './file-name';

/**
 * Returns a random file name with a given extension or a commonly used extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param extension The file extension to use. Empty string is considered to be not set.
 *
 * @example
 * fakeSystemCommonFileName(fakerCore) // 'dollar.jpg'
 * fakeSystemCommonFileName(fakerCore, 'txt') // 'global_borders_wyoming.txt'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemCommonFileName(
  fakerCore: FakerCore,
  extension?: string
): string {
  const fileName = fakeSystemFileName(fakerCore, { extensionCount: 0 });

  return `${fileName}.${extension || fakeSystemCommonFileExt(fakerCore)}`;
}
