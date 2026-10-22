import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeSystemFileExt } from './file-ext';

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
 * fakeSystemCommonFileExt(fakerCore) // 'gif'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemCommonFileExt(fakerCore: FakerCore): string {
  return fakeSystemFileExt(
    fakerCore,
    fakeHelpersArrayElement(fakerCore, commonMimeTypes)
  );
}
