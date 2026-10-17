import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a mime-type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemMimeType(fakerCore) // 'video/vnd.vivo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemMimeType(fakerCore: FakerCore): string {
  const mimeTypeKeys = Object.keys(fakerCore.locale.system.mime_type);

  return fakeHelpersArrayElement(fakerCore, mimeTypeKeys);
}
