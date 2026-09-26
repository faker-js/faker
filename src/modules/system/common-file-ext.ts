import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { systemFileExt } from './file-ext';

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
 * systemCommonFileExt(fakerCore) // 'gif'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemCommonFileExt(fakerCore: FakerCore): string {
  return systemFileExt(fakerCore, helpersArrayElement(fakerCore, commonMimeTypes));
}
