import { toBase64 } from '../../internal/base64';
import { deprecated } from '../../internal/deprecated';
import { ModuleBase } from '../../internal/module-base';

/**
 * Module to generate images.
 *
 * ### Overview
 *
 * For a random image, use [`url()`](https://fakerjs.dev/api/image.html#url). This will not return the image directly but a URL pointing to an image from one of two demo image providers "Picsum" and "LoremFlickr". You can request an image specifically from one of two providers using [`urlLoremFlickr()`](https://fakerjs.dev/api/image.html#urlloremflickr) or [`urlPicsumPhotos()`](https://fakerjs.dev/api/image.html#urlpicsumphotos).
 *
 * For a random placeholder image containing only solid color and text, use [`urlPlaceholder()`](https://fakerjs.dev/api/image.html#urlplaceholder) (uses a third-party service) or [`dataUri()`](https://fakerjs.dev/api/image.html#datauri) (returns a SVG string).
 *
 * For a random user avatar image, use [`avatar()`](https://fakerjs.dev/api/image.html#avatar).
 *
 * This module previously also contained methods for specifically themed images like "fashion" or "food", but these are now deprecated. If you need more control over image type, you can request categorized images using [`urlLoremFlickr()`](https://fakerjs.dev/api/image.html#urlloremflickr), use an image provider directly or provide your own set of placeholder images.
 */
export class ImageModule extends ModuleBase {
  /**
   * Generates a random avatar image url.
   *
   * @example
   * faker.image.avatar()
   * // 'https://avatars.githubusercontent.com/u/97165289'
   *
   * @since 2.0.1
   */
  avatar(): string {
    // Add new avatar providers here, when adding a new one.
    return this.avatarGitHub();
  }

  /**
   * Generates a random avatar from GitHub.
   *
   * @example
   * faker.image.avatarGitHub()
   * // 'https://avatars.githubusercontent.com/u/97165289'
   *
   * @since 8.0.0
   */
  avatarGitHub(): string {
    return `https://avatars.githubusercontent.com/u/${this.faker.number.int(
      100000000
    )}`;
  }

  /**
   * Generates a random avatar from `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar`.
   *
   * @example
   * faker.image.avatarLegacy()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg'
   *
   * @since 8.0.0
   *
   * @deprecated The links are no longer working. Use `avatar()` instead.
   */
  avatarLegacy(): string {
    deprecated({
      deprecated: 'faker.image.avatarLegacy()',
      proposed: 'faker.image.avatar()',
      since: '9.0.2',
      until: '10.0.0',
    });

    return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.number.int(
      1249
    )}.jpg`;
  }

  /**
   * Generates a random image url.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
   *
   * @example
   * faker.image.url() // 'https://loremflickr.com/640/480?lock=1234'
   *
   * @since 8.0.0
   */
  url(
    options: {
      /**
       * The width of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      height?: number;
    } = {}
  ): string {
    const {
      width = this.faker.number.int({ min: 1, max: 3999 }),
      height = this.faker.number.int({ min: 1, max: 3999 }),
    } = options;

    const urlMethod = this.faker.helpers.arrayElement([
      this.urlLoremFlickr,
      ({ width, height }: { width?: number; height?: number }) =>
        this.urlPicsumPhotos({ width, height, grayscale: false, blur: 0 }),
    ]);

    return urlMethod({ width, height });
  }

  /**
   * Generates a random image url provided via https://loremflickr.com.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.category Category to use for the image.
   *
   * @example
   * faker.image.urlLoremFlickr() // 'https://loremflickr.com/640/480?lock=1234'
   * faker.image.urlLoremFlickr({ width: 128 }) // 'https://loremflickr.com/128/480?lock=1234'
   * faker.image.urlLoremFlickr({ height: 128 }) // 'https://loremflickr.com/640/128?lock=1234'
   * faker.image.urlLoremFlickr({ category: 'nature' }) // 'https://loremflickr.com/640/480/nature?lock=1234'
   *
   * @since 8.0.0
   */
  urlLoremFlickr(
    options: {
      /**
       * The width of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      height?: number;
      /**
       * Category to use for the image.
       */
      category?: string;
    } = {}
  ): string {
    const {
      width = this.faker.number.int({ min: 1, max: 3999 }),
      height = this.faker.number.int({ min: 1, max: 3999 }),
      category,
    } = options;

    return `https://loremflickr.com/${width}/${height}${
      category == null ? '' : `/${category}`
    }?lock=${this.faker.number.int()}`;
  }

  /**
   * Generates a random image url provided via https://picsum.photos.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.grayscale Whether the image should be grayscale. Defaults to a random boolean value.
   * @param options.blur Whether the image should be blurred. `0` disables the blur. Defaults to a random integer between `0` and `10`.
   *
   * @example
   * faker.image.urlPicsumPhotos() // 'https://picsum.photos/seed/NWbJM2B/640/480'
   * faker.image.urlPicsumPhotos({ width: 128 }) // 'https://picsum.photos/seed/NWbJM2B/128/480'
   * faker.image.urlPicsumPhotos({ height: 128 }) // 'https://picsum.photos/seed/NWbJM2B/640/128'
   * faker.image.urlPicsumPhotos({ grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale'
   * faker.image.urlPicsumPhotos({ blur: 4 }) // 'https://picsum.photos/seed/NWbJM2B/640/480?blur=4'
   * faker.image.urlPicsumPhotos({ blur: 4, grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale&blur=4'
   *
   * @since 8.0.0
   */
  urlPicsumPhotos(
    options: {
      /**
       * The width of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      height?: number;
      /**
       * Whether the image should be grayscale.
       *
       * @default faker.datatype.boolean()
       */
      grayscale?: boolean;
      /**
       * Whether the image should be blurred. `0` disables the blur.
       *
       * @default faker.number.int({ max: 10 })
       */
      blur?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    } = {}
  ): string {
    const {
      width = this.faker.number.int({ min: 1, max: 3999 }),
      height = this.faker.number.int({ min: 1, max: 3999 }),
      grayscale = this.faker.datatype.boolean(),
      blur = this.faker.number.int({ max: 10 }),
    } = options;

    let url = `https://picsum.photos/seed/${this.faker.string.alphanumeric({
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

  /**
   * Generates a random image url provided via https://via.placeholder.com/.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to a random number between 1 and 3999.
   * @param options.height The height of the image. Defaults to a random number between 1 and 3999.
   * @param options.backgroundColor The background color of the image. Defaults to a random hex color.
   * @param options.textColor The text color of the image. Defaults to a random hex color.
   * @param options.format The format of the image. Defaults to a random format.
   * @param options.text The text to display on the image. Defaults to a random string.
   *
   * @example
   * faker.image.urlPlaceholder() // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.webp?text=lorem'
   * faker.image.urlPlaceholder({ width: 128 }) // 'https://via.placeholder.com/128x180/FF0000/FFFFFF.webp?text=lorem'
   * faker.image.urlPlaceholder({ height: 128 }) // 'https://via.placeholder.com/150x128/FF0000/FFFFFF.webp?text=lorem'
   * faker.image.urlPlaceholder({ backgroundColor: '000000' }) // 'https://via.placeholder.com/150x180/000000/FFFFFF.webp?text=lorem'
   * faker.image.urlPlaceholder({ textColor: '000000' }) // 'https://via.placeholder.com/150x180/FF0000/000000.webp?text=lorem'
   * faker.image.urlPlaceholder({ format: 'png' }) // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.png?text=lorem'
   * faker.image.urlPlaceholder({ text: 'lorem ipsum' }) // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.webp?text=lorem+ipsum'
   * faker.image.urlPlaceholder({ width: 128, height: 128, backgroundColor: '000000', textColor: 'FF0000', format: 'png', text: 'lorem ipsum' }) // 'https://via.placeholder.com/128x128/000000/FF0000.png?text=lorem+ipsum'
   *
   * @since 8.0.0
   */
  urlPlaceholder(
    options: {
      /**
       * The width of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      height?: number;
      /**
       * The background color of the image.
       *
       * @default faker.color.rgb({ format: 'hex', prefix: '' })
       */
      backgroundColor?: string;
      /**
       * The text color of the image.
       *
       * @default faker.color.rgb({ format: 'hex', prefix: '' })
       */
      textColor?: string;
      /**
       * The format of the image.
       *
       * @default faker.helpers.arrayElement(['gif', 'jpeg', 'jpg', 'png', 'webp'])
       */
      format?: 'gif' | 'jpeg' | 'jpg' | 'png' | 'webp';
      /**
       * The text to display on the image.
       *
       * @default faker.lorem.words()
       */
      text?: string;
    } = {}
  ): string {
    const {
      width = this.faker.number.int({ min: 1, max: 3999 }),
      height = this.faker.number.int({ min: 1, max: 3999 }),
      backgroundColor = this.faker.color.rgb({ format: 'hex', prefix: '' }),
      textColor = this.faker.color.rgb({ format: 'hex', prefix: '' }),
      format = this.faker.helpers.arrayElement([
        'gif',
        'jpeg',
        'jpg',
        'png',
        'webp',
      ]),
      text = this.faker.lorem.words(),
    } = options;

    let url = `https://via.placeholder.com`;

    url += `/${width}`;
    url += `x${height}`;

    url += `/${backgroundColor}`;
    url += `/${textColor}`;

    url += `.${format}`;

    url += `?text=${encodeURIComponent(text)}`;

    return url;
  }

  /**
   * Generates a random data uri containing an URL-encoded SVG image or a Base64-encoded SVG image.
   *
   * @param options Options for generating a data uri.
   * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.color The color of the image. Must be a color supported by svg. Defaults to a random color.
   * @param options.type The type of the image. Defaults to a random type.
   *
   * @example
   * faker.image.dataUri() // 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http...'
   * faker.image.dataUri({ type: 'svg-base64' }) // 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3...'
   *
   * @since 4.0.0
   */
  dataUri(
    options: {
      /**
       * The width of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default faker.number.int({ min: 1, max: 3999 })
       */
      height?: number;
      /**
       * The color of the image. Must be a color supported by svg.
       *
       * @default faker.color.rgb()
       */
      color?: string;
      /**
       * The type of the image to return. Consisting of
       * the file extension and the used encoding.
       *
       * @default faker.helpers.arrayElements(['svg-uri', 'svg-base64'])
       */
      type?: 'svg-uri' | 'svg-base64';
    } = {}
  ): string {
    const {
      width = this.faker.number.int({ min: 1, max: 3999 }),
      height = this.faker.number.int({ min: 1, max: 3999 }),
      color = this.faker.color.rgb(),
      type = this.faker.helpers.arrayElements(['svg-uri', 'svg-base64']),
    } = options;

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/><text x="${
      width / 2
    }" y="${
      height / 2
    }" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${width}x${height}</text></svg>`;

    return type === 'svg-uri'
      ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`
      : `data:image/svg+xml;base64,${toBase64(svgString)}`;
  }
}
