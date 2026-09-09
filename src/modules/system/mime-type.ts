import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a mime-type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * mimeType(fakerCore) // 'video/vnd.vivo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function mimeType(fakerCore: FakerCore): string {
  const mimeTypeKeys = Object.keys(fakerCore.locale.system.mime_type);

  return arrayElement(fakerCore, mimeTypeKeys);
}
