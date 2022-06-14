import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';

/**
 * Module to generate links to random images on `https://source.unsplash.com/`.
 */
export class Unsplash {
  // TODO ST-DDT 2022-03-11: Remove unused(?) constant
  categories = [
    'food',
    'nature',
    'people',
    'technology',
    'objects',
    'buildings',
  ];

  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new unsplash image url for a random supported category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  image(width?: number, height?: number, keyword?: string): string {
    return this.imageUrl(width, height, undefined, keyword);
  }

  /**
   * Returns a random avatar url.
   *
   * @see faker.internet.avatar
   *
   * @example
   * faker.internet.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg'
   *
   * @deprecated
   */
  avatar(): string {
    deprecated({
      deprecated: 'faker.image.unsplash.avatar()',
      proposed: 'faker.internet.avatar()',
      since: '7.3',
      until: '8.0',
    });
    return this.faker.internet.avatar();
  }

  /**
   * Generates a new unsplash image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image to generate.
   * @param keyword The image keywords to use.
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    keyword?: string
  ): string {
    width = width || 640;
    height = height || 480;

    let url = 'https://source.unsplash.com';

    if (category != null) {
      url += `/category/${category}`;
    }

    url += `/${width}x${height}`;

    if (keyword != null) {
      const keywordFormat = /^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$/;
      if (keywordFormat.test(keyword)) {
        url += `?${keyword}`;
      }
    }

    return url;
  }

  /**
   * Generates a new unsplash image url using the "food" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  food(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'food', keyword);
  }

  /**
   * Generates a new unsplash image url using the "people" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  people(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'people', keyword);
  }

  /**
   * Generates a new unsplash image url using the "nature" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  nature(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'nature', keyword);
  }

  /**
   * Generates a new unsplash image url using the "technology" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  technology(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      'technology',
      keyword
    );
  }

  /**
   * Generates a new unsplash image url using the "objects" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  objects(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      'objects',
      keyword
    );
  }

  /**
   * Generates a new unsplash image url using the "buildings" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   */
  buildings(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      'buildings',
      keyword
    );
  }
}
