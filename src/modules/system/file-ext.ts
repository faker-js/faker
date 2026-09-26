import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a file extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param mimeType Valid [mime-type](https://github.com/jshttp/mime-db/blob/master/db.json)
 *
 * @throws {FakerError} If the given mime type is not supported.
 *
 * @example
 * systemFileExt(fakerCore) // 'emf'
 * systemFileExt(fakerCore, 'application/json') // 'json'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemFileExt(fakerCore: FakerCore, mimeType?: string): string {
  const mimeTypes = fakerCore.locale.system.mime_type;

  if (typeof mimeType === 'string') {
    const entry = mimeTypes[mimeType];
    if (entry == null) {
      throw new FakerError(`MIME type ${mimeType} is not supported.`);
    }

    return helpersArrayElement(fakerCore, entry.extensions);
  }

  const extensionSet = new Set(
    Object.values(mimeTypes).flatMap(({ extensions }) => extensions)
  );
  return helpersArrayElement(fakerCore, [...extensionSet]);
}
