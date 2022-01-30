import type { Faker } from '..';

export class Lorempixel {
  constructor(private readonly faker: Faker) {}

  /**
   * image
   *
   * @param width
   * @param height
   * @param randomize
   * @method faker.image.lorempixel.image
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
   *
   * @method faker.image.lorempixel.avatar
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
   * @method faker.image.lorempixel.imageUrl
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    randomize?: boolean
  ): string {
    width ||= 640;
    height ||= 480;

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
   * @method faker.image.lorempixel.abstract
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
   * @method faker.image.lorempixel.animals
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
   * @method faker.image.lorempixel.business
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
   * @method faker.image.lorempixel.cats
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
   * @method faker.image.lorempixel.city
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
   * @method faker.image.lorempixel.food
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
   * @method faker.image.lorempixel.nightlife
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
   * @method faker.image.lorempixel.fashion
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
   * @method faker.image.lorempixel.people
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
   * @method faker.image.lorempixel.nature
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
   * @method faker.image.lorempixel.sports
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
   * @method faker.image.lorempixel.technics
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
   * @method faker.image.lorempixel.transport
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
