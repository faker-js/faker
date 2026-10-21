import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeNumberInt } from '../number/int';
import { fakeImageUrlPicsumPhotos } from './url-picsum-photos';

/**
 * Generates a random image url.
 *
 * @remark This method generates a random string representing an URL from an external provider. Faker is not responsible for the content of the image or the service providing it.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for generating a URL for an image.
 * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
 *
 * @example
 * fakeImageUrl(fakerCore) // 'https://picsum.photos/seed/NWbJM2B/640/480'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeImageUrl(
  fakerCore: FakerCore,
  options: {
    /**
     * The width of the image.
     *
     * @default fakeNumberInt(fakerCore, { min: 1, max: 3999 })
     */
    width?: number;
    /**
     * The height of the image.
     *
     * @default fakeNumberInt(fakerCore, { min: 1, max: 3999 })
     */
    height?: number;
  } = {}
): string {
  const {
    width = fakeNumberInt(fakerCore, { min: 1, max: 3999 }),
    height = fakeNumberInt(fakerCore, { min: 1, max: 3999 }),
  } = options;

  const urlMethod = fakeHelpersArrayElement(fakerCore, [
    ({ width, height }: { width?: number; height?: number }) =>
      fakeImageUrlPicsumPhotos(fakerCore, {
        width,
        height,
        grayscale: false,
        blur: 0,
      }),
    // Other providers may be added back here in future versions.
  ]);

  return urlMethod({ width, height });
}
