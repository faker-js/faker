import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { fileExt } from './file-ext';

const commonMimeTypes = [
  'application/pdf',
  'audio/mpeg',
  'audio/wav',
  'image/png',
  'image/jpeg',
  'image/gif',
  'video/mp4',
  'video/mpeg',
  'text/html',
];

/**
 * Returns a commonly used file extension.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commonFileExt(fakerCore) // 'gif'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commonFileExt(fakerCore: FakerCore): string {
  return fileExt(fakerCore, arrayElement(fakerCore, commonMimeTypes));
}
