import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';

/**
 * Module to generate links to random images on `https://picsum.photos/`.
 */
// TODO ST-DDT 2022-03-11: Rename to picsum?
export class LoremPicsum {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   */
  image(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    return this.imageUrl(width, height, grayscale, blur);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   */
  imageGrayscale(width?: number, height?: number, grayscale?: boolean): string {
    return this.imageUrl(width, height, grayscale);
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   */
  imageBlurred(
    width?: number,
    height?: number,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
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
   */
  imageRandomSeeded(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    // TODO ST-DDT 2022-03-11: This method does the same as image url, maybe generate a seed, if it is missig?
    return this.imageUrl(width, height, grayscale, blur, seed);
  }

  /**
   * Returns a random avatar url.
   *
   * @see faker.internet.avatar()
   *
   * @example
   * faker.internet.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg'
   *
   * @deprecated
   */
  avatar(): string {
    deprecated({
      deprecated: 'faker.image.lorempicsum.avatar()',
      proposed: 'faker.internet.avatar()',
      since: '7.3',
      until: '8.0',
    });
    return this.faker.internet.avatar();
  }

  /**
   * Generates a new picsum image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param grayscale Whether to return a grayscale image. Default to `false`.
   * @param blur The optional level of blur to apply. Supports `1` - `10`.
   * @param seed The optional seed to use.
   */
  imageUrl(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
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
