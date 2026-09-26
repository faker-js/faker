import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { numberInt } from '../number/int';
import { stringAlphanumeric } from '../string/alphanumeric';

/**
 * Generates a random image url provided via https://picsum.photos.
 *
 * @remark This method generates a random string representing an URL from picsum.photos. Faker is not responsible for the content of the image or the service providing it.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for generating a URL for an image.
 * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.grayscale Whether the image should be grayscale. Defaults to a random boolean value.
 * @param options.blur Whether the image should be blurred. `0` disables the blur. Defaults to a random integer between `0` and `10`.
 *
 * @example
 * imageUrlPicsumPhotos(fakerCore) // 'https://picsum.photos/seed/NWbJM2B/640/480'
 * imageUrlPicsumPhotos(fakerCore, { width: 128 }) // 'https://picsum.photos/seed/NWbJM2B/128/480'
 * imageUrlPicsumPhotos(fakerCore, { height: 128 }) // 'https://picsum.photos/seed/NWbJM2B/640/128'
 * imageUrlPicsumPhotos(fakerCore, { grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale'
 * imageUrlPicsumPhotos(fakerCore, { blur: 4 }) // 'https://picsum.photos/seed/NWbJM2B/640/480?blur=4'
 * imageUrlPicsumPhotos(fakerCore, { blur: 4, grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale&blur=4'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function imageUrlPicsumPhotos(
  fakerCore: FakerCore,
  options: {
    /**
     * The width of the image.
     *
     * @default numberInt(fakerCore, { min: 1, max: 3999 })
     */
    width?: number;
    /**
     * The height of the image.
     *
     * @default numberInt(fakerCore, { min: 1, max: 3999 })
     */
    height?: number;
    /**
     * Whether the image should be grayscale.
     *
     * @default datatypeBoolean(fakerCore)
     */
    grayscale?: boolean;
    /**
     * Whether the image should be blurred. `0` disables the blur.
     *
     * @default numberInt(fakerCore, { max: 10 })
     */
    blur?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  } = {}
): string {
  const {
    width = numberInt(fakerCore, { min: 1, max: 3999 }),
    height = numberInt(fakerCore, { min: 1, max: 3999 }),
    grayscale = datatypeBoolean(fakerCore),
    blur = numberInt(fakerCore, { max: 10 }),
  } = options;

  let url = `https://picsum.photos/seed/${stringAlphanumeric(fakerCore, {
    length: { min: 5, max: 10 },
  })}/${width}/${height}`;

  const hasValidBlur = typeof blur === 'number' && blur >= 1 && blur <= 10;

  if (grayscale || hasValidBlur) {
    url += '?';

    if (grayscale) {
      url += `grayscale`;
    }

    if (grayscale && hasValidBlur) {
      url += '&';
    }

    if (hasValidBlur) {
      url += `blur=${blur}`;
    }
  }

  return url;
}
