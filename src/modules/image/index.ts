import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';
import { ModuleBase } from '../../internal/module-base';
import type { MethodsOf } from '../../utils/types';
import { LoremPicsum } from './providers/lorempicsum';
import { Placeholder } from './providers/placeholder';
import { Unsplash } from './providers/unsplash';

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
   * @deprecated Use `faker.image` instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly unsplash: Unsplash;

  /**
   * @deprecated Use `faker.image` instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly lorempicsum: LoremPicsum;

  /**
   * @deprecated Use `faker.image.urlPlaceholder` instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly placeholder: Placeholder;

  constructor(faker: Faker) {
    super(faker);

    // eslint-disable-next-line deprecation/deprecation
    this.unsplash = new Unsplash(this.faker);
    // eslint-disable-next-line deprecation/deprecation
    this.lorempicsum = new LoremPicsum(this.faker);
    // eslint-disable-next-line deprecation/deprecation
    this.placeholder = new Placeholder(this.faker);
  }

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
    const avatarMethod = this.faker.helpers.arrayElement([
      this.avatarLegacy,
      this.avatarGitHub,
    ]);

    return avatarMethod();
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
   */
  // This implementation will change in the future when we tackle https://github.com/faker-js/faker/issues/465.
  avatarLegacy(): string {
    return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.number.int(
      1249
    )}.jpg`;
  }

  /**
   * Generates a random image url.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to `640`.
   * @param options.height The height of the image. Defaults to `480`.
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
       * @default 640
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default 480
       */
      height?: number;
    } = {}
  ): string {
    const { width = 640, height = 480 } = options;

    const urlMethod = this.faker.helpers.arrayElement([
      this.urlLoremFlickr,
      this.urlPicsumPhotos,
    ]);

    return urlMethod({ width, height });
  }

  /**
   * Generates a random image url provided via https://loremflickr.com.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to `640`.
   * @param options.height The height of the image. Defaults to `480`.
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
       * @default 640
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default 480
       */
      height?: number;
      /**
       * Category to use for the image.
       */
      category?: string;
    } = {}
  ): string {
    const { width = 640, height = 480, category } = options;

    return `https://loremflickr.com/${width}/${height}${
      category == null ? '' : `/${category}`
    }?lock=${this.faker.number.int()}`;
  }

  /**
   * Generates a random image url provided via https://picsum.photos.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to `640`.
   * @param options.height The height of the image. Defaults to `480`.
   * @param options.grayscale Whether the image should be grayscale. Defaults to `false`.
   * @param options.blur Whether the image should be blurred. Defaults to `false`.
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
       * @default 640
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default 480
       */
      height?: number;
      /**
       * Whether the image should be grayscale.
       *
       * @default false
       */
      grayscale?: boolean;
      /**
       * Whether the image should be blurred.
       *
       * @default false
       */
      blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    } = {}
  ): string {
    const { width = 640, height = 480, grayscale = false, blur } = options;

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
   * @param options.width The width of the image. Defaults to random number between 1 and 3999.
   * @param options.height The height of the image. Defaults to random number between 1 and 3999.
   * @param options.backgroundColor The background color of the image. Defaults to random hex color.
   * @param options.textColor The text color of the image. Defaults to random hex color.
   * @param options.format The format of the image. Defaults to random format.
   * @param options.text The text to display on the image. Defaults to string.
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
   * @param options.width The width of the image. Defaults to `640`.
   * @param options.height The height of the image. Defaults to `480`.
   * @param options.color The color of the image. Must be a color supported by svg. Defaults to a random color.
   * @param options.type The type of the image. Defaults to `'svg-uri'`.
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
       * @default 640
       */
      width?: number;
      /**
       * The height of the image.
       *
       * @default 480
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
       * @default 'svg-uri'
       */
      type?: 'svg-uri' | 'svg-base64';
    } = {}
  ): string {
    const {
      width = 640,
      height = 480,
      color = this.faker.color.rgb(),
      type = 'svg-uri',
    } = options;

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/><text x="${
      width / 2
    }" y="${
      height / 2
    }" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${width}x${height}</text></svg>`;

    return type === 'svg-uri'
      ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`
      : `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
          'base64'
        )}`;
  }

  /**
   * Generates a random image url from one of the supported categories.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.image() // 'https://loremflickr.com/640/480/city'
   * faker.image.image(1234, 2345) // 'https://loremflickr.com/1234/2345/sports'
   * faker.image.image(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.url` instead.
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.image',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    const categories: MethodsOf<ImageModule, ImageModule['image']> = [
      'abstract',
      'animals',
      'business',
      'cats',
      'city',
      'food',
      'nightlife',
      'fashion',
      'people',
      'nature',
      'sports',
      'technics',
      'transport',
    ];
    return this[this.faker.helpers.arrayElement(categories)](
      width,
      height,
      randomize
    );
  }

  /**
   * Generates a random image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image. By default, a random one will be selected.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.imageUrl() // 'https://loremflickr.com/640/480'
   * faker.image.imageUrl(1234, 2345) // 'https://loremflickr.com/1234/2345'
   * faker.image.imageUrl(1234, 2345, 'cat') // 'https://loremflickr.com/1234/2345/cat'
   * faker.image.imageUrl(1234, 2345, 'cat', true) // 'https://loremflickr.com/1234/2345/cat?lock=6849'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.url` instead.
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    randomize?: boolean
  ): string {
    deprecated({
      deprecated: 'faker.image.imageUrl',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });

    width = width || 640;
    height = height || 480;
    let url = `https://loremflickr.com/${width}/${height}`;
    if (category != null) {
      url += `/${category}`;
    }

    if (randomize) {
      url += `?lock=${this.faker.number.int()}`;
    }

    return url;
  }

  /**
   * Generates a random abstract image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.abstract() // 'https://loremflickr.com/640/480/abstract'
   * faker.image.abstract(1234, 2345) // 'https://loremflickr.com/1234/2345/abstract'
   * faker.image.abstract(1234, 2345, true) // 'https://loremflickr.com/1234/2345/abstract?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'abstract' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   *
   */
  abstract(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.abstract',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'abstract' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'abstract', randomize);
  }

  /**
   * Generates a random animal image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.animals() // 'https://loremflickr.com/640/480/animals'
   * faker.image.animals(1234, 2345) // 'https://loremflickr.com/1234/2345/animals'
   * faker.image.animals(1234, 2345, true) // 'https://loremflickr.com/1234/2345/animals?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'animals' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   *
   */
  animals(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.animals',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'animals' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'animals', randomize);
  }

  /**
   * Generates a random business image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.business() // 'https://loremflickr.com/640/480/business'
   * faker.image.business(1234, 2345) // 'https://loremflickr.com/1234/2345/business'
   * faker.image.business(1234, 2345, true) // 'https://loremflickr.com/1234/2345/business?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'business' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   *
   *
   */
  business(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.business',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'business' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'business', randomize);
  }

  /**
   * Generates a random cat image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.cats() // 'https://loremflickr.com/640/480/cats'
   * faker.image.cats(1234, 2345) // 'https://loremflickr.com/1234/2345/cats'
   * faker.image.cats(1234, 2345, true) // 'https://loremflickr.com/1234/2345/cats?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'cats' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  cats(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.cats',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'cats' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'cats', randomize);
  }

  /**
   * Generates a random city image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.city() // 'https://loremflickr.com/640/480/city'
   * faker.image.city(1234, 2345) // 'https://loremflickr.com/1234/2345/city'
   * faker.image.city(1234, 2345, true) // 'https://loremflickr.com/1234/2345/city?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'city' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  city(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.city',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'city' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'city', randomize);
  }

  /**
   * Generates a random food image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.food() // 'https://loremflickr.com/640/480/food'
   * faker.image.food(1234, 2345) // 'https://loremflickr.com/1234/2345/food'
   * faker.image.food(1234, 2345, true) // 'https://loremflickr.com/1234/2345/food?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'food' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  food(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.food',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'food' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'food', randomize);
  }

  /**
   * Generates a random nightlife image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.nightlife() // 'https://loremflickr.com/640/480/nightlife'
   * faker.image.nightlife(1234, 2345) // 'https://loremflickr.com/1234/2345/nightlife'
   * faker.image.nightlife(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nightlife?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'nightlife' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  nightlife(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.nightlife',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'nightlife' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'nightlife', randomize);
  }

  /**
   * Generates a random fashion image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.fashion() // 'https://loremflickr.com/640/480/fashion'
   * faker.image.fashion(1234, 2345) // 'https://loremflickr.com/1234/2345/fashion'
   * faker.image.fashion(1234, 2345, true) // 'https://loremflickr.com/1234/2345/fashion?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'fashion' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  fashion(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.fashion',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'fashion' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'fashion', randomize);
  }

  /**
   * Generates a random people image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.people() // 'https://loremflickr.com/640/480/people'
   * faker.image.people(1234, 2345) // 'https://loremflickr.com/1234/2345/people'
   * faker.image.people(1234, 2345, true) // 'https://loremflickr.com/1234/2345/people?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'people' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  people(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.people',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'people' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'people', randomize);
  }

  /**
   * Generates a random nature image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.nature() // 'https://loremflickr.com/640/480/nature'
   * faker.image.nature(1234, 2345) // 'https://loremflickr.com/1234/2345/nature'
   * faker.image.nature(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'nature' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  nature(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.nature',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'nature' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'nature', randomize);
  }

  /**
   * Generates a random sports image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.sports() // 'https://loremflickr.com/640/480/sports'
   * faker.image.sports(1234, 2345) // 'https://loremflickr.com/1234/2345/sports'
   * faker.image.sports(1234, 2345, true) // 'https://loremflickr.com/1234/2345/sports?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'sports' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  sports(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.sports',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'sports' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'sports', randomize);
  }

  /**
   * Generates a random technics image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.technics() // 'https://loremflickr.com/640/480/technics'
   * faker.image.technics(1234, 2345) // 'https://loremflickr.com/1234/2345/technics'
   * faker.image.technics(1234, 2345, true) // 'https://loremflickr.com/1234/2345/technics?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'technics' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   */
  technics(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.technics',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'technics' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'technics', randomize);
  }

  /**
   * Generates a random transport image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @see faker.image.url()
   * @see faker.image.urlLoremFlickr()
   *
   * @example
   * faker.image.transport() // 'https://loremflickr.com/640/480/transport'
   * faker.image.transport(1234, 2345) // 'https://loremflickr.com/1234/2345/transport'
   * faker.image.transport(1234, 2345, true) // 'https://loremflickr.com/1234/2345/transport?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.image.urlLoremFlickr({ category: 'transport' })` if you want an image from LoremFlickr in the correct category, or `faker.image.url()` if you just want any image.
   *
   *
   */
  transport(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.image.transport',
      proposed:
        "faker.image.urlLoremFlickr({ category: 'transport' }) or faker.image.url",
      since: '8.0',
      until: '9.0',
    });
    // eslint-disable-next-line deprecation/deprecation
    return this.imageUrl(width, height, 'transport', randomize);
  }
}
