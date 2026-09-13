import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { helpersMultiple } from '../helpers/multiple';
import { wordWords } from '../word/words';
import { systemFileExt } from './file-ext';

/**
 * Returns a random file name with extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.extensionCount Define how many extensions the file name should have. Defaults to `1`.
 *
 * @example
 * systemFileName(fakerCore) // 'faithfully_calculating.u8mdn'
 * systemFileName(fakerCore, { extensionCount: 2 }) // 'times_after.swf.ntf'
 * systemFileName(fakerCore, { extensionCount: { min: 1, max: 2 } }) // 'jaywalk_like_ill.osfpvg'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemFileName(
  fakerCore: FakerCore,
  options: {
    /**
     * Define how many extensions the file name should have.
     *
     * @default 1
     */
    extensionCount?: NumberOrRange;
  } = {}
): string {
  const { extensionCount = 1 } = options;

  const baseName = wordWords(fakerCore).toLowerCase().replaceAll(/\W/g, '_');

  const extensionsSuffix = helpersMultiple(fakerCore, () => systemFileExt(fakerCore), {
    count: extensionCount,
  }).join('.');

  if (extensionsSuffix.length === 0) {
    return baseName;
  }

  return `${baseName}.${extensionsSuffix}`;
}
