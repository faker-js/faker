import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a file type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemFileType(fakerCore) // 'message'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemFileType(fakerCore: FakerCore): string {
  const mimeTypes = fakerCore.locale.system.mime_type;

  const typeSet = new Set(
    Object.keys(mimeTypes).map((key) => key.split('/', 1)[0])
  );
  return fakeHelpersArrayElement(fakerCore, [...typeSet]);
}
