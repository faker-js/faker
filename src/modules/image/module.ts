import { ModuleBase } from '../../internal/module-base';
import type { SexType } from '../person';
import { avatar as imageAvatar } from './avatar';
import { avatarGitHub as imageAvatarGitHub } from './avatar-git-hub';
import { dataUri as imageDataUri } from './data-uri';
import { personPortrait as imagePersonPortrait } from './person-portrait';
import { url as imageUrl } from './url';
import { urlLoremFlickr as imageUrlLoremFlickr } from './url-lorem-flickr';
import { urlPicsumPhotos as imageUrlPicsumPhotos } from './url-picsum-photos';

/**
 * Module to generate images.
 *
 * ### Overview
 *
 * For a random image, use [`url()`](https://fakerjs.dev/api/image.html#url). This will not return the image directly but an URL pointing to an image from an image provider like "Picsum". Other providers may be added in future versions. You can request an image specifically from this provider, with additional options using [`urlPicsumPhotos()`](https://fakerjs.dev/api/image.html#urlpicsumphotos).
 *
 * For a random placeholder image containing only solid color and text, use [`dataUri()`](https://fakerjs.dev/api/image.html#datauri) (returns a SVG string).
 *
 * For a random user avatar image, use [`avatar()`](https://fakerjs.dev/api/image.html#avatar), or [`personPortrait()`](https://fakerjs.dev/api/image.html#personportrait) which has more control over the size and sex of the person.
 *
 * For full control over the returned image URL, use [`faker.helpers.arrayElement()`](https://fakerjs.dev/api/helpers.html#arrayelement) with your own array of image URLs.
 *
 * ::: info Hint
 * If you think an image method/category is missing, please [open an issue/vote for an existing one](https://github.com/faker-js/faker/issues/3810).
 */
export class ImageModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree image' to update the methods from their respective files.
   */

  /**
   * Generates a random avatar image url.
   *
   * @remark This method sometimes generates a random string representing an URL from GitHub by using a random user ID. Faker is not responsible for the content of the image or the service providing it.
   *
   * @example
   * faker.image.avatar()
   * // 'https://avatars.githubusercontent.com/u/97165289'
   *
   * @since 2.0.1
   */
  avatar(): string {
    return imageAvatar(this.faker.fakerCore);
  }

  /**
   * Generates a random avatar from GitHub.
   *
   * @remark This method generates a random string representing an URL from GitHub by using a random user ID. Faker is not responsible for the content of the image or the service providing it.
   *
   * @example
   * faker.image.avatarGitHub()
   * // 'https://avatars.githubusercontent.com/u/97165289'
   *
   * @since 8.0.0
   */
  avatarGitHub(): string {
    return imageAvatarGitHub(this.faker.fakerCore);
  }

  /**
   * Generates a random square portrait (avatar) of a person.
   * These are static images of fictional people created by an AI, Stable Diffusion 3.
   * The image URLs are served via the JSDelivr CDN and subject to their [terms of use](https://www.jsdelivr.com/terms).
   *
   * @param options Options for generating an AI avatar.
   * @param options.sex The sex of the person for the avatar. Can be `'female'` or `'male'`. If not provided or `'generic'`, defaults to a random selection.
   * @param options.size The size of the image. Can be `512`, `256`, `128`, `64` or `32`. If not provided, defaults to `512`.
   *
   * @example
   * faker.image.personPortrait() // 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/57.jpg'
   * faker.image.personPortrait({ sex: 'male', size: '128' }) // 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/128/27.jpg'
   *
   * @since 9.5.0
   */
  personPortrait(
    options: {
      /**
       * The sex of the person for the avatar.
       * Can be `'female'` or `'male'`. `'generic'` uses a random selection.
       *
       * @default faker.person.sexType()
       */
      sex?: SexType;
      /**
       * The size of the image.
       * Can be `512`, `256`, `128`, `64` or `32`.
       *
       * @default 512
       */
      size?: 512 | 256 | 128 | 64 | 32;
    } = {}
  ): string {
    return imagePersonPortrait(this.faker.fakerCore, options);
  }

  /**
   * Generates a random image url.
   *
   * @remark This method generates a random string representing an URL from an external provider. Faker is not responsible for the content of the image or the service providing it.
   *
   * @param options Options for generating a URL for an image.
   * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
   * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
   *
   * @example
   * faker.image.url() // 'https://picsum.photos/seed/NWbJM2B/640/480'
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
    return imageUrl(this.faker.fakerCore, options);
  }

  /**
   * Generates a random image url provided via https://loremflickr.com.
   *
   * @remark This method generates a random string representing an URL from loremflickr. Faker is not responsible for the content of the image or the service providing it.
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
   *
   * @deprecated LoremFlickr is no longer available, and image links will be broken. Use `faker.image.url()` instead.
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
    return imageUrlLoremFlickr(this.faker.fakerCore, options);
  }

  /**
   * Generates a random image url provided via https://picsum.photos.
   *
   * @remark This method generates a random string representing an URL from picsum.photos. Faker is not responsible for the content of the image or the service providing it.
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
    return imageUrlPicsumPhotos(this.faker.fakerCore, options);
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
       * @default faker.helpers.arrayElement(['svg-uri', 'svg-base64'])
       */
      type?: 'svg-uri' | 'svg-base64';
    } = {}
  ): string {
    return imageDataUri(this.faker.fakerCore, options);
  }
}
