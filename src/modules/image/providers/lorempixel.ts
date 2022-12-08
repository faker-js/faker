import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';
import type { MethodsOf } from '../../../utils/types';

/**
 * Module to generate links to random images on `https://lorempixel.com/`.
 *
 * @deprecated Use `faker.image` instead.
 */
export class Lorempixel {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new lorempixel image url for a random supported category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   *
   * @deprecated Use `faker.image` instead.
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.image',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   * Generates a new lorempixel image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image to generate.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   *
   * @deprecated Use `faker.image` instead.
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    randomize?: boolean
  ): string {
    deprecated({
      deprecated: 'faker.lorempixel.imageUrl',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    width = width || 640;
    height = height || 480;

    let url = `https://lorempixel.com/${width}/${height}`;
    if (category != null) {
      url += `/${category}`;
    }

    if (randomize) {
      url += `?${this.faker.number.int()}`;
    }

    return url;
  }

  /**
   * Generates a new lorempixel image url using the "abstract" category.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to append a seed to the url. Defaults to `false`.
   *
   * @deprecated Use `faker.image` instead.
   */
  abstract(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.abstract',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  animals(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.animals',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  business(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.business',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  cats(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.cats',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  city(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.city',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  food(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.food',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  nightlife(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.nightlife',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  fashion(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.fashion',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  people(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.people',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  nature(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.nature',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  sports(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.sports',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  technics(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.technics',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
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
   *
   * @deprecated Use `faker.image` instead.
   */
  transport(width?: number, height?: number, randomize?: boolean): string {
    deprecated({
      deprecated: 'faker.lorempixel.transport',
      proposed: 'faker.image.url',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.image.lorempixel.imageUrl(
      width,
      height,
      'transport',
      randomize
    );
  }
}
