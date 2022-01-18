import type { Faker } from '..';

export class LoremPicsum {
  constructor(private readonly faker: Faker) {}

  /**
   * image
   *
   * @param width
   * @param height
   * @param grayscale
   * @param blur 1-10
   * @method faker.image.lorempicsum.image
   * @description search image from unsplash
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
   * imageGrayscaled
   *
   * @param width
   * @param height
   * @param grayscale
   * @method faker.image.lorempicsum.imageGrayscaled
   * @description search grayscale image from unsplash
   */
  imageGrayscale(width?: number, height?: number, grayscale?: boolean): string {
    return this.imageUrl(width, height, grayscale);
  }

  /**
   * imageBlurred
   *
   * @param width
   * @param height
   * @param blur 1-10
   * @method faker.image.lorempicsum.imageBlurred
   * @description search blurred image from unsplash
   */
  imageBlurred(
    width?: number,
    height?: number,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ): string {
    return this.imageUrl(width, height, undefined, blur);
  }

  /**
   * imageRandomSeeded
   *
   * @param width
   * @param height
   * @param grayscale
   * @param blur 1-10
   * @param seed
   * @method faker.image.lorempicsum.imageRandomSeeded
   * @description search same random image from unsplash, based on a seed
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
   *
   * @method faker.image.lorempicsum.avatar
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
   * @method faker.image.lorempicsum.imageUrl
   */
  imageUrl(
    width?: number,
    height?: number,
    grayscale?: boolean,
    blur?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    seed?: string
  ): string {
    width ||= 640;
    height ||= 480;

    let url = 'https://picsum.photos';

    if (seed) {
      url += '/seed/' + seed;
    }

    url += '/' + width + '/' + height;

    if (grayscale && blur) {
      return url + '?grayscale' + '&blur=' + blur;
    }

    if (grayscale) {
      return url + '?grayscale';
    }

    if (blur) {
      return url + '?blur=' + blur;
    }

    return url;
  }
}
