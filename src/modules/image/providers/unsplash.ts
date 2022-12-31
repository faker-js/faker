import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';

/**
 * Module to generate links to random images on `https://source.unsplash.com/`.
 *
 * @deprecated Use `faker.image` instead.
 */
export class Unsplash {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new unsplash image url for a random supported category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   *
   * @deprecated Use `faker.image` instead.
   */
  image(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.image',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.imageUrl(width, height, undefined, keyword);
  }

  /**
   * Generates a new unsplash image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image to generate.
   * @param keyword The image keywords to use.
   *
   * @deprecated Use `faker.image` instead.
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    keyword?: string
  ): string {
    deprecated({
      deprecated: 'faker.unsplash.imageUrl',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  food(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.food',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.image.unsplash.imageUrl(width, height, 'food', keyword);
  }

  /**
   * Generates a new unsplash image url using the "people" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   *
   * @deprecated Use `faker.image` instead.
   */
  people(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.people',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.image.unsplash.imageUrl(width, height, 'people', keyword);
  }

  /**
   * Generates a new unsplash image url using the "nature" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   *
   * @deprecated Use `faker.image` instead.
   */
  nature(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.nature',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.image.unsplash.imageUrl(width, height, 'nature', keyword);
  }

  /**
   * Generates a new unsplash image url using the "technology" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param keyword The image keywords to use.
   *
   * @deprecated Use `faker.image` instead.
   */
  technology(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.technology',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  objects(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.objects',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  buildings(width?: number, height?: number, keyword?: string): string {
    deprecated({
      deprecated: 'faker.unsplash.buildings',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      'buildings',
      keyword
    );
  }
}
