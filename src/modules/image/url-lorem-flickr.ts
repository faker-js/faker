import type { FakerCore } from '../../core';
import { deprecated } from '../../internal/deprecated';
import { fakeNumberInt } from '../number/int';

/**
 * Generates a random image url provided via https://loremflickr.com.
 *
 * @remark This method generates a random string representing an URL from loremflickr. Faker is not responsible for the content of the image or the service providing it.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for generating a URL for an image.
 * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.category Category to use for the image.
 *
 * @example
 * fakeImageUrlLoremFlickr(fakerCore) // 'https://loremflickr.com/640/480?lock=1234'
 * fakeImageUrlLoremFlickr(fakerCore, { width: 128 }) // 'https://loremflickr.com/128/480?lock=1234'
 * fakeImageUrlLoremFlickr(fakerCore, { height: 128 }) // 'https://loremflickr.com/640/128?lock=1234'
 * fakeImageUrlLoremFlickr(fakerCore, { category: 'nature' }) // 'https://loremflickr.com/640/480/nature?lock=1234'
 *
 * @since 11.0.0
 *
 * @deprecated LoremFlickr is no longer available, and image links will be broken. Use `fakeImageUrl(fakerCore)` instead.
 *
 * @experimental
 */
export function fakeImageUrlLoremFlickr(
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
    /**
     * Category to use for the image.
     */
    category?: string;
  } = {}
): string {
  deprecated({
    deprecated: 'fakeImageUrlLoremFlickr(fakerCore)',
    proposed: 'fakeImageUrl(fakerCore)',
    since: '10.1.0',
    until: '11.0.0',
  });

  const {
    width = fakeNumberInt(fakerCore, { min: 1, max: 3999 }),
    height = fakeNumberInt(fakerCore, { min: 1, max: 3999 }),
    category,
  } = options;

  return `https://loremflickr.com/${width}/${height}${
    category == null ? '' : `/${category}`
  }?lock=${fakeNumberInt(fakerCore)}`;
}
