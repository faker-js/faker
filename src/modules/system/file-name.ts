import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeHelpersMultiple } from '../helpers/multiple';
import { fakeWordWords } from '../word/words';
import { fakeSystemFileExt } from './file-ext';

/**
 * Returns a random file name with extension.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.extensionCount Define how many extensions the file name should have. Defaults to `1`.
 *
 * @example
 * fakeSystemFileName(fakerCore) // 'faithfully_calculating.u8mdn'
 * fakeSystemFileName(fakerCore, { extensionCount: 2 }) // 'times_after.swf.ntf'
 * fakeSystemFileName(fakerCore, { extensionCount: { min: 1, max: 2 } }) // 'jaywalk_like_ill.osfpvg'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemFileName(
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

  const baseName = fakeWordWords(fakerCore).toLowerCase().replaceAll(/\W/g, '_');

  const extensionsSuffix = fakeHelpersMultiple(
    fakerCore,
    () => fakeSystemFileExt(fakerCore),
    {
      count: extensionCount,
    }
  ).join('.');

  if (extensionsSuffix.length === 0) {
    return baseName;
  }

  return `${baseName}.${extensionsSuffix}`;
}
