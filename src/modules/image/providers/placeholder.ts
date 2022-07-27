import type { Faker } from '../../..';

/**
 * Module to generate links to images on `https://via.placeholder.com/`.
 */
export class Placeholder {
  constructor(private readonly faker: Faker) {}

  /**
   * Generates a new placeholder image url.
   *
   * @param width The width of the image (in pixels). Defaults to `640`.
   * @param height The height of the image (in pixels). Defaults to `width`.
   * @param text The text of the image.
   * @param format The file format of the image. Supports `png` `jpeg` `png` `gif` `webp`.
   * @param backgroundColor The background color of the placeholder. Supports HEX CODE format.
   * @param textColor The text color of the placeholder. Requires `backgroundColor` Supports HEX CODE format.
   */
  imageUrl(
    width?: number,
    height?: number,
    text?: string,
    format?: 'png' | 'jpeg' | 'jpg' | 'gif' | 'webp',
    backgroundColor?: string,
    textColor?: string
  ): string {
    width = width || 640;
    height = height || width;

    let url = 'https://via.placeholder.com';
    url += `/${width}x${height}`;

    if (backgroundColor != null) {
      url += `/${backgroundColor.replace('#', '').toUpperCase()}`;
    }

    if (textColor != null && backgroundColor !== null) {
      url += `/${textColor.replace('#', '').toUpperCase()}`;
    }

    if (format != null) {
      url += `.${format}`;
    }

    if (text != null) {
      const urlParam = new URLSearchParams({ text });
      url += `?${urlParam.toString()}`;
    }

    return url;
  }

  /**
   * Generate a new placeholder image with random colors and text.
   *
   * @param width The width of the image (in pixels). Defaults to `640`.
   * @param height The height of the image (in pixels). Defaults to `width`
   * @param format The file format of the image. Supports `png` `jpeg` `png` `gif` `webp`.
   */
  randomUrl(
    width?: number,
    height?: number,
    format?: 'png' | 'jpeg' | 'jpg' | 'gif' | 'webp'
  ): string {
    return this.imageUrl(
      width,
      height,
      this.faker.lorem.text(),
      format,
      this.faker.color.rgb({
        casing: 'upper',
        prefix: '',
      }),
      this.faker.color.rgb({ casing: 'upper', prefix: '' })
    );
  }
}
