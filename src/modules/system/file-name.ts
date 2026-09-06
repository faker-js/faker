import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { multiple } from '../helpers/multiple';
import { words } from '../word/words';
import { fileExt } from './file-ext';

/**
 * Returns a random file name with extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.extensionCount Define how many extensions the file name should have. Defaults to `1`.
 *
 * @example
 * fileName(fakerCore) // 'faithfully_calculating.u8mdn'
 * fileName(fakerCore, { extensionCount: 2 }) // 'times_after.swf.ntf'
 * fileName(fakerCore, { extensionCount: { min: 1, max: 2 } }) // 'jaywalk_like_ill.osfpvg'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fileName(
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

  const baseName = words(fakerCore).toLowerCase().replaceAll(/\W/g, '_');

  const extensionsSuffix = multiple(fakerCore, () => fileExt(fakerCore), {
    count: extensionCount,
  }).join('.');

  if (extensionsSuffix.length === 0) {
    return baseName;
  }

  return `${baseName}.${extensionsSuffix}`;
}
