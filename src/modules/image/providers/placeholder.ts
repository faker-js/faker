/* eslint-disable deprecation/deprecation */
import type { Faker } from '../../..';
import { deprecated } from '../../../internal/deprecated';

/**
 * Module to generate links to images on `https://via.placeholder.com/`.
 *
 * The images generated from this module are fetched from an external service outside the control of Faker and could occasionally contain URLs which point to unexpected, disturbing, or offensive images.
 *
 * @deprecated Use `faker.image.urlPlaceholder` instead.
 */
export class Placeholder {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      Placeholder.prototype
    ) as Array<keyof Placeholder | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a new placeholder image url.
   *
   * These images are fetched from an external service outside the control of Faker and could occasionally contain URLs which point to unexpected, disturbing, or offensive images.
   *
   * @param width The width of the image (in pixels). Defaults to `640`.
   * @param height The height of the image (in pixels). Defaults to `width`.
   * @param text The text of the image.
   * @param format The file format of the image. Supports `png`, `jpeg`, `png`, `gif`, `webp`.
   * @param backgroundColor The background color of the placeholder. Supports HEX CODE format.
   * @param textColor The text color of the placeholder. Requires `backgroundColor`. Supports HEX CODE format.
   *
   * @example
   * faker.image.placeholder.imageUrl() // https://via.placeholder.com/640x640
   * faker.image.placeholder.imageUrl(200) // https://via.placeholder.com/200x200
   * faker.image.placeholder.imageUrl(200, 100) // https://via.placeholder.com/200x100
   * faker.image.placeholder.imageUrl(200, 100, 'Fish') // https://via.placeholder.com/200x100?text=Fish
   * faker.image.placeholder.imageUrl(200, 100, 'Fish', 'webp') // https://via.placeholder.com/200x100.webp?text=Fish
   * faker.image.placeholder.imageUrl(200, 100, 'Fish', 'webp') // https://via.placeholder.com/200x100.webp?text=Fish
   * faker.image.placeholder.imageUrl(200, 100, 'Fish', 'webp', '000000', 'ffffff) // https://via.placeholder.com/200x100/000000/FFFFFF.webp?text=Fish
   *
   * @deprecated Use `faker.image.urlPlaceholder` instead.
   */
  imageUrl(
    width?: number,
    height?: number,
    text?: string,
    format?: 'png' | 'jpeg' | 'jpg' | 'gif' | 'webp',
    backgroundColor?: string,
    textColor?: string
  ): string {
    deprecated({
      deprecated: 'faker.placeholder.imageUrl',
      proposed: 'faker.image.urlPlaceholder',
      since: '8.0',
      until: '9.0',
    });
    width = width || 640;
    height = height || width;

    let url = 'https://via.placeholder.com';
    url += `/${width}x${height}`;

    if (backgroundColor != null) {
      url += `/${backgroundColor.replace('#', '').toUpperCase()}`;

      if (textColor != null) {
        url += `/${textColor.replace('#', '').toUpperCase()}`;
      }
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
   * These images are fetched from an external service outside the control of Faker and could occasionally contain URLs which point to unexpected, disturbing, or offensive images.
   *
   * @param width The width of the image (in pixels). Defaults to `640`.
   * @param height The height of the image (in pixels). Defaults to `width`.
   * @param format The file format of the image. Supports `png` `jpeg` `png` `gif` `webp`.
   *
   * @example
   * faker.image.placeholder.randomUrl() // https://via.placeholder.com/640x640/000000/ffffff?text=lorum
   * faker.image.placeholder.randomUrl(150) // https://via.placeholder.com/150x150/000000/ffffff?text=lorum
   * faker.image.placeholder.randomUrl(150, 200) // https://via.placeholder.com/150x200/000000/ffffff?text=lorum
   * faker.image.placeholder.randomUrl(150, 200, 'png') // https://via.placeholder.com/150x200/000000/ffffff.png?text=lorum
   *
   * @deprecated Use `faker.image.urlPlaceholder` instead.
   */
  randomUrl(
    width?: number,
    height?: number,
    format?: 'png' | 'jpeg' | 'jpg' | 'gif' | 'webp'
  ): string {
    deprecated({
      deprecated: 'faker.placeholder.randomUrl',
      proposed: 'faker.image.urlPlaceholder',
      since: '8.0',
      until: '9.0',
    });
    return this.imageUrl(
      width,
      height,
      this.faker.lorem.word(),
      format,
      this.faker.color.rgb({
        casing: 'upper',
        prefix: '',
      }),
      this.faker.color.rgb({ casing: 'upper', prefix: '' })
    );
  }
}
