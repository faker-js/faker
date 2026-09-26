import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

const commonFileTypes = ['video', 'audio', 'image', 'text', 'application'];

/**
 * Returns a commonly used file type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * systemCommonFileType(fakerCore) // 'audio'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemCommonFileType(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, commonFileTypes);
}
