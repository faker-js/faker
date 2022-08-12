import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';
import type { MethodsOf } from '../../../utils/types';

/**
 * Module to generate links to random images on `https://lorempixel.com/`.
 */
export class Lorempixel {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new lorempixel image url for a random supported category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    const categories: MethodsOf<Lorempixel, Lorempixel['image']> = [
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
      deprecated: 'faker.image.lorempixel.avatar()',
      proposed: 'faker.internet.avatar()',
      since: '7.3',
      until: '8.0',
    });
    return this.faker.internet.avatar();
  }

  /**
   * Generates a new lorempixel image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image to generate.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    randomize?: boolean
  ): string {
    width = width || 640;
    height = height || 480;

    let url = `https://lorempixel.com/${width}/${height}`;
    if (category != null) {
      url += `/${category}`;
    }

    if (randomize) {
      url += `?${this.faker.datatype.number()}`;
    }

    return url;
  }

  /**
   * Generates a new lorempixel image url using the "abstract" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  abstract(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'abstract',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "animals" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  animals(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'animals',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "business" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  business(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'business',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "cats" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  cats(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'cats',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "city" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  city(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'city',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "food" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  food(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'food',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "nightlife" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  nightlife(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'nightlife',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "fashion" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  fashion(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'fashion',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "people" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  people(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'people',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "nature" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  nature(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'nature',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "sports" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  sports(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'sports',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "technics" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  technics(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'technics',
      randomize
    );
  }

  /**
   * Generates a new lorempixel image url using the "transport" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   */
  transport(width?: number, height?: number, randomize?: boolean): string {
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'transport',
      randomize
    );
  }
}
