import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a mime-type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * systemMimeType(fakerCore) // 'video/vnd.vivo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemMimeType(fakerCore: FakerCore): string {
  const mimeTypeKeys = Object.keys(fakerCore.locale.system.mime_type);

  return helpersArrayElement(fakerCore, mimeTypeKeys);
}
