import type { Faker } from '../..';
import type { MethodsOf } from '../../utils/types';
import { LoremPicsum } from './providers/lorempicsum';
import { Lorempixel } from './providers/lorempixel';
import { Placeholder } from './providers/placeholder';
import { Unsplash } from './providers/unsplash';

const avatars: Record<
  'github' | 'cloudflare-ipfs',
  (options: { seed: number }) => string
> = {
  github: ({ seed }) => `https://avatars.githubusercontent.com/u/${seed}`,
  'cloudflare-ipfs': ({ seed }) =>
    `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${
      seed % 1250
    }.jpg`,
};

const urls: Record<
  'loremflickr' | 'picsum',
  (options: {
    width: number;
    height: number;
    category?: string;
    seed: number;
  }) => string
> = {
  loremflickr: ({ width, height, category, seed }) =>
    `https://loremflickr.com/${width}/${height}${
      category != null ? `/${category}` : ''
    }?lock=${seed}`,
  picsum: ({ width, height, seed }) =>
    `https://picsum.photos/id/${seed}/${width}/${height}`,
};

/**
 * Module to generate images.
 */
export class ImageModule {
  readonly lorempixel: Lorempixel;
  readonly unsplash: Unsplash;
  readonly lorempicsum: LoremPicsum;
  readonly placeholder: Placeholder;

  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ImageModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    this.lorempixel = new Lorempixel(this.faker);
    this.unsplash = new Unsplash(this.faker);
    this.lorempicsum = new LoremPicsum(this.faker);
    this.placeholder = new Placeholder(this.faker);
  }

  /**
   * Generates a random avatar image url.
   *
   * @example
   * faker.image.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg'
   *
   * @since 2.0.1
   */
  avatar(
    options: {
      provider?: 'github' | 'cloudflare-ipfs';
    } = {}
  ): string {
    const { provider = 'cloudflare-ipfs' } = options;
    return avatars[provider]({ seed: this.faker.datatype.number() });
  }

  /**
   * Generates a random image url.
   *
   * @example
   * faker.image.url() // 'https://loremflickr.com/640/480'
   *
   * @since 8.0.0
   */
  url(
    options: {
      provider?: 'loremflickr' | 'picsum' | 'unsplash';
      width?: number;
      height?: number;
      category?: string;
    } = {}
  ): string {
    const {
      provider = 'loremflickr',
      width = 640,
      height = 480,
      category,
    } = options;

    return urls[provider]({
      width,
      height,
      category,
      seed: this.faker.datatype.number(),
    });
  }

  /**
   * Generates a random data uri containing an svg image.
   *
   * @example
   * faker.image.dataUri() // 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http...'
   *
   * @since 4.0.0
   */
  dataUri(
    options: {
      width?: number;
      height?: number;
      color?: string;
    } = {}
  ): string {
    const { width = 640, height = 480, color = 'grey' } = options;

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/><text x="${
      width / 2
    }" y="${
      height / 2
    }" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${width}x${height}</text></svg>`;

    const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    return rawPrefix + encodeURIComponent(svgString);
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
   * faker.image.image(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
   */
  image(width?: number, height?: number, randomize?: boolean): string {
    const categories: MethodsOf<ImageModule, ImageModule['image']> = [
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
   * faker.image.imageUrl(1234, 2345, 'cat', true) // 'https://loremflickr.com/1234/2345/cat?lock=6849'
   *
   * @since 2.0.1
   *
   * @deprecated
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
      url += `?lock=${this.faker.datatype.number()}`;
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
   * faker.image.abstract(1234, 2345, true) // 'https://loremflickr.com/1234/2345/abstract?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.animals(1234, 2345, true) // 'https://loremflickr.com/1234/2345/animals?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.business(1234, 2345, true) // 'https://loremflickr.com/1234/2345/business?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.cats(1234, 2345, true) // 'https://loremflickr.com/1234/2345/cats?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.city(1234, 2345, true) // 'https://loremflickr.com/1234/2345/city?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.food(1234, 2345, true) // 'https://loremflickr.com/1234/2345/food?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.nightlife(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nightlife?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.fashion(1234, 2345, true) // 'https://loremflickr.com/1234/2345/fashion?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.people(1234, 2345, true) // 'https://loremflickr.com/1234/2345/people?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.nature(1234, 2345, true) // 'https://loremflickr.com/1234/2345/nature?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.sports(1234, 2345, true) // 'https://loremflickr.com/1234/2345/sports?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.technics(1234, 2345, true) // 'https://loremflickr.com/1234/2345/technics?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
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
   * faker.image.transport(1234, 2345, true) // 'https://loremflickr.com/1234/2345/transport?lock=56789'
   *
   * @since 2.0.1
   *
   * @deprecated
   */
  transport(width?: number, height?: number, randomize?: boolean): string {
    return this.imageUrl(width, height, 'transport', randomize);
  }
}
