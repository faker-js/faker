import type { Faker } from '..';

export class Unsplash {
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
   * image
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.image
   * @description search image from unsplash
   */
  image(width?: number, height?: number, keyword?: string): string {
    return this.imageUrl(width, height, undefined, keyword);
  }

  /**
   * avatar
   *
   * @method faker.image.unsplash.avatar
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
   * @param keyword
   * @method faker.image.unsplash.imageUrl
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    keyword?: string
  ): string {
    width ||= 640;
    height ||= 480;

    let url = 'https://source.unsplash.com';

    if (typeof category !== 'undefined') {
      url += '/category/' + category;
    }

    url += `/${width}x${height}`;

    if (typeof keyword !== 'undefined') {
      const keywordFormat = new RegExp(
        '^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$'
      );
      if (keywordFormat.test(keyword)) {
        url += '?' + keyword;
      }
    }

    return url;
  }

  /**
   * food
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.food
   */
  food(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'food', keyword);
  }

  /**
   * people
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.people
   */
  people(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'people', keyword);
  }

  /**
   * nature
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.nature
   */
  nature(width?: number, height?: number, keyword?: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, 'nature', keyword);
  }

  /**
   * technology
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.technology
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
   * objects
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.objects
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
   * buildings
   *
   * @param width
   * @param height
   * @param keyword
   * @method faker.image.unsplash.buildings
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
