import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

const commonFileTypes = ['video', 'audio', 'image', 'text', 'application'];

/**
 * Returns a commonly used file type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeSystemCommonFileType(fakerCore) // 'audio'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemCommonFileType(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(fakerCore, commonFileTypes);
}
