import type { Faker } from '..';

export class LoremPicsum {
  constructor(private readonly faker: Faker) {}

  /**
   * Search image from unsplash
   *
   * @param width
   * @param height
   * @param grayscale
   * @param blur 1-10
   */
  image(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    return this.imageUrl(width, height, grayscale, blur);
  }

  /**
   * Search grayscale image from unsplash
   *
   * @param width
   * @param height
   * @param grayscale
   */
  imageGrayscale(width?: number, height?: number, grayscale?: boolean): string {
    return this.imageUrl(width, height, grayscale);
  }

  /**
   * Search blurred image from unsplash
   *
   * @param width
   * @param height
   * @param blur 1-10
   */
  imageBlurred(
    width?: number,
    height?: number,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    return this.imageUrl(width, height, undefined, blur);
  }

  /**
   * Search same random image from unsplash, based on a seed
   *
   * @param width
   * @param height
   * @param grayscale
   * @param blur 1-10
   * @param seed
   */
  imageRandomSeeded(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    return this.imageUrl(width, height, grayscale, blur, seed);
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
   * @param grayscale
   * @param blur 1-10
   * @param seed
   */
  imageUrl(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    width = width || 640;
    height = height || 480;

    let url = 'https://picsum.photos';

    if (seed) {
      url += '/seed/' + seed;
    }

    url += `/${width}/${height}`;

    if (grayscale && blur) {
      return `${url}?grayscale&blur=${blur}`;
    }

    if (grayscale) {
      return url + '?grayscale';
    }

    if (blur) {
      return `${url}?blur=${blur}`;
    }

    return url;
  }
}
