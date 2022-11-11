import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';

/**
 * Module to generate links to random images on `https://picsum.photos/`.
 *
 * @deprecated Use `faker.image.urlPicsum` instead.
 */
export class LoremPicsum {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   *
   * @deprecated Use `faker.image.urlPicsum` instead.
   */
  image(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    deprecated({
      deprecated: 'faker.lorempicsum.image',
      proposed: 'faker.image.urlPicsum',
      since: '8.0',
      until: '9.0',
    });
    return this.imageUrl(width, height, grayscale, blur);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   *
   * @deprecated Use `faker.image.urlPicsum` instead.
   */
  imageGrayscale(width?: number, height?: number, grayscale?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempicsum.imageGrayscale',
      proposed: 'faker.image.urlPicsum',
      since: '8.0',
      until: '9.0',
    });
    return this.imageUrl(width, height, grayscale);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   *
   * @deprecated Use `faker.image.urlPicsum` instead.
   */
  imageBlurred(
    width?: number,
    height?: number,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    deprecated({
      deprecated: 'faker.lorempicsum.imageBlurred',
      proposed: 'faker.image.urlPicsum',
      since: '8.0',
      until: '9.0',
    });
    return this.imageUrl(width, height, undefined, blur);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   * @param seed The optional seed to use.
   *
   * @deprecated Use `faker.image.urlPicsum` instead.
   */
  imageRandomSeeded(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    deprecated({
      deprecated: 'faker.lorempicsum.imageRandomSeeded',
      proposed: 'faker.image.urlPicsum',
      since: '8.0',
      until: '9.0',
    });
    // TODO ST-DDT 2022-03-11: This method does the same as image url, maybe generate a seed, if it is missig?
    return this.imageUrl(width, height, grayscale, blur, seed);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   * @param seed The optional seed to use.
   *
   * @deprecated Use `faker.image.urlPicsum` instead.
   */
  imageUrl(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    deprecated({
      deprecated: 'faker.lorempicsum.imageUrl',
      proposed: 'faker.image.urlPicsum',
      since: '8.0',
      until: '9.0',
    });
    width = width || 640;
    height = height || 480;

    let url = 'https://picsum.photos';

    if (seed) {
      url += `/seed/${seed}`;
    }

    url += `/${width}/${height}`;

    if (grayscale && blur) {
      return `${url}?grayscale&blur=${blur}`;
    }

    if (grayscale) {
      return `${url}?grayscale`;
    }

    if (blur) {
      return `${url}?blur=${blur}`;
    }

    return url;
  }
}
