import type { LiteralUnion } from 'src/utils/types';
import type { Faker } from '../..';

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
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ImageModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
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
      provider?: LiteralUnion<'github' | 'cloudflare-ipfs'>;
    } = {}
  ): string {
    const { provider } = options;
    return this.faker.internet.avatar();
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
      provider?: 'loremflickr' | 'picsum';
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
}
