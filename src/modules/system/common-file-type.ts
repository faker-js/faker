import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

// Temp export
export const commonFileTypes = [
  'video',
  'audio',
  'image',
  'text',
  'application',
];

/**
 * Returns a commonly used file type.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * commonFileType(fakerCore) // 'audio'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commonFileType(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, commonFileTypes);
}
