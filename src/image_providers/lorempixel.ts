import type { Faker } from '..';

export class Lorempixel {
  constructor(private readonly faker: Faker) {}

  /**
   * image
   *
   * @param width
   * @param height
   * @param randomize
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    const categories = [
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
    return this[this.faker.random.arrayElement(categories)](
      width,
      height,
      randomize
    );
  }

  /**
   * avatar
   */
  avatar(): string {
    return this.faker.internet.avatar();
  }

  /**
   * imageUrl
   *
   * @param width
   * @param height
   * @param category
   * @param randomize
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
    if (typeof category !== 'undefined') {
      url += '/' + category;
    }

    if (randomize) {
      url += `?${this.faker.datatype.number()}`;
    }

    return url;
  }

  /**
   * abstract
   *
   * @param width
   * @param height
   * @param randomize
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
   * animals
   *
   * @param width
   * @param height
   * @param randomize
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
   * business
   *
   * @param width
   * @param height
   * @param randomize
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
   * cats
   *
   * @param width
   * @param height
   * @param randomize
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
   * city
   *
   * @param width
   * @param height
   * @param randomize
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
   * food
   *
   * @param width
   * @param height
   * @param randomize
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
   * nightlife
   *
   * @param width
   * @param height
   * @param randomize
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
   * fashion
   *
   * @param width
   * @param height
   * @param randomize
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
   * people
   *
   * @param width
   * @param height
   * @param randomize
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
   * nature
   *
   * @param width
   * @param height
   * @param randomize
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
   * sports
   *
   * @param width
   * @param height
   * @param randomize
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
   * technics
   *
   * @param width
   * @param height
   * @param randomize
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
   * transport
   *
   * @param width
   * @param height
   * @param randomize
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
