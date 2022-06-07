import type { Faker } from '../..';
import type { MethodsOf } from '../../utils/types';
import { LoremPicsum } from './providers/lorempicsum';
import { Lorempixel } from './providers/lorempixel';
import { Unsplash } from './providers/unsplash';

/**
 * Module to generate placeholder images.
 *
 * Default provider is unsplash image provider.
 */
export class Image {
  readonly lorempixel: Lorempixel;
  readonly unsplash: Unsplash;
  readonly lorempicsum: LoremPicsum;

  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Image.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    this.lorempixel = new Lorempixel(this.faker);
    this.unsplash = new Unsplash(this.faker);
    this.lorempicsum = new LoremPicsum(this.faker);
  }

  /**
   * Generates a random image url from one of the supported categories.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.image() // 'https://loremflickr.com/640/480/city'
   * faker.image.image(1234, 2345) // 'https://loremflickr.com/1234/2345/sports'
   * faker.image.image(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?56789'
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    const categories: MethodsOf<Image, Image['image']> = [
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
   * Generates a random avatar image url.
   *
   * @example
   * faker.image.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg'
   */
  avatar(): string {
    return this.faker.internet.avatar();
  }

  /**
   * Generates a random image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param category The category of the image. By default, a random one will be selected.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.imageUrl() // 'https://loremflickr.com/640/480'
   * faker.image.imageUrl(1234, 2345) // 'https://loremflickr.com/1234/2345'
   * faker.image.imageUrl(1234, 2345, 'cat') // 'https://loremflickr.com/1234/2345/cat'
   * faker.image.imageUrl(1234, 2345, 'cat', true) // 'https://loremflickr.com/1234/2345/cat?6849'
   */
  imageUrl(
    width?: number,
    height?: number,
    category?: string,
    randomize?: boolean
  ): string {
    width = width || 640;
    height = height || 480;
    let url = `https://loremflickr.com/${width}/${height}`;
    if (category != null) {
      url += `/${category}`;
    }

    if (randomize) {
      url += `?${this.faker.datatype.number()}`;
    }

    return url;
  }

  /**
   * Generates a random abstract image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.abstract() // 'https://loremflickr.com/640/480/abstract'
   * faker.image.abstract(1234, 2345) // 'https://loremflickr.com/1234/2345/abstract'
   * faker.image.abstract(1234, 2345, true) // 'https://loremflickr.com/1234/2345/abstract?56789'
   */
  abstract(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'abstract', randomize);
  }

  /**
   * Generates a random animal image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.animals() // 'https://loremflickr.com/640/480/animals'
   * faker.image.animals(1234, 2345) // 'https://loremflickr.com/1234/2345/animals'
   * faker.image.animals(1234, 2345, true) // 'https://loremflickr.com/1234/2345/animals?56789'
   */
  animals(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'animals', randomize);
  }

  /**
   * Generates a random business image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.business() // 'https://loremflickr.com/640/480/business'
   * faker.image.business(1234, 2345) // 'https://loremflickr.com/1234/2345/business'
   * faker.image.business(1234, 2345, true) // 'https://loremflickr.com/1234/2345/business?56789'
   */
  business(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'business', randomize);
  }

  /**
   * Generates a random cat image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.cats() // 'https://loremflickr.com/640/480/cats'
   * faker.image.cats(1234, 2345) // 'https://loremflickr.com/1234/2345/cats'
   * faker.image.cats(1234, 2345, true) // 'https://loremflickr.com/1234/2345/cats?56789'
   */
  cats(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'cats', randomize);
  }

  /**
   * Generates a random city image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.city() // 'https://loremflickr.com/640/480/city'
   * faker.image.city(1234, 2345) // 'https://loremflickr.com/1234/2345/city'
   * faker.image.city(1234, 2345, true) // 'https://loremflickr.com/1234/2345/city?56789'
   */
  city(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'city', randomize);
  }

  /**
   * Generates a random food image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.food() // 'https://loremflickr.com/640/480/food'
   * faker.image.food(1234, 2345) // 'https://loremflickr.com/1234/2345/food'
   * faker.image.food(1234, 2345, true) // 'https://loremflickr.com/1234/2345/food?56789'
   */
  food(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'food', randomize);
  }

  /**
   * Generates a random nightlife image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.nightlife() // 'https://loremflickr.com/640/480/nightlife'
   * faker.image.nightlife(1234, 2345) // 'https://loremflickr.com/1234/2345/nightlife'
   * faker.image.nightlife(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nightlife?56789'
   */
  nightlife(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'nightlife', randomize);
  }

  /**
   * Generates a random fashion image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.fashion() // 'https://loremflickr.com/640/480/fashion'
   * faker.image.fashion(1234, 2345) // 'https://loremflickr.com/1234/2345/fashion'
   * faker.image.fashion(1234, 2345, true) // 'https://loremflickr.com/1234/2345/fashion?56789'
   */
  fashion(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'fashion', randomize);
  }

  /**
   * Generates a random people image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.people() // 'https://loremflickr.com/640/480/people'
   * faker.image.people(1234, 2345) // 'https://loremflickr.com/1234/2345/people'
   * faker.image.people(1234, 2345, true) // 'https://loremflickr.com/1234/2345/people?56789'
   */
  people(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'people', randomize);
  }

  /**
   * Generates a random nature image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.nature() // 'https://loremflickr.com/640/480/nature'
   * faker.image.nature(1234, 2345) // 'https://loremflickr.com/1234/2345/nature'
   * faker.image.nature(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?56789'
   */
  nature(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'nature', randomize);
  }

  /**
   * Generates a random sports image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.sports() // 'https://loremflickr.com/640/480/sports'
   * faker.image.sports(1234, 2345) // 'https://loremflickr.com/1234/2345/sports'
   * faker.image.sports(1234, 2345, true) // 'https://loremflickr.com/1234/2345/sports?56789'
   */
  sports(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'sports', randomize);
  }

  /**
   * Generates a random technics image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.technics() // 'https://loremflickr.com/640/480/technics'
   * faker.image.technics(1234, 2345) // 'https://loremflickr.com/1234/2345/technics'
   * faker.image.technics(1234, 2345, true) // 'https://loremflickr.com/1234/2345/technics?56789'
   */
  technics(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'technics', randomize);
  }

  /**
   * Generates a random transport image url.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param randomize Whether to randomize the image or not. Defaults to `false`.
   *
   * @example
   * faker.image.transport() // 'https://loremflickr.com/640/480/transport'
   * faker.image.transport(1234, 2345) // 'https://loremflickr.com/1234/2345/transport'
   * faker.image.transport(1234, 2345, true) // 'https://loremflickr.com/1234/2345/transport?56789'
   */
  transport(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'transport', randomize);
  }

  /**
   * Generates a random data uri containing an svg image.
   *
   * @param width The width of the image. Defaults to `640`.
   * @param height The height of the image. Defaults to `480`.
   * @param color The color to use. Defaults to `grey`.
   *
   * @example
   * faker.image.dataUri() // 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http...'
   */
  dataUri(width?: number, height?: number, color: string = 'grey'): string {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/><text x="${
      width / 2
    }" y="${
      height / 2
    }" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${width}x${height}</text></svg>`;
    const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    return rawPrefix + encodeURIComponent(svgString);
  }
}
