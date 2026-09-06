import type { FakerCore } from '../../core';
import { toBase64 } from '../../internal/base64';
import { rgb } from '../color/rgb';
import { arrayElement } from '../helpers/array-element';
import { int } from '../number/int';

/**
 * Generates a random data uri containing an URL-encoded SVG image or a Base64-encoded SVG image.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for generating a data uri.
 * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
 * @param options.color The color of the image. Must be a color supported by svg. Defaults to a random color.
 * @param options.type The type of the image. Defaults to a random type.
 *
 * @example
 * dataUri(fakerCore) // 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http...'
 * dataUri(fakerCore, { type: 'svg-base64' }) // 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3...'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function dataUri(
  fakerCore: FakerCore,
  options: {
    /**
     * The width of the image.
     *
     * @default numberInt(fakerCore, { min: 1, max: 3999 })
     */
    width?: number;
    /**
     * The height of the image.
     *
     * @default numberInt(fakerCore, { min: 1, max: 3999 })
     */
    height?: number;
    /**
     * The color of the image. Must be a color supported by svg.
     *
     * @default colorRgb(fakerCore)
     */
    color?: string;
    /**
     * The type of the image to return. Consisting of
     * the file extension and the used encoding.
     *
     * @default helpersArrayElement(fakerCore, ['svg-uri', 'svg-base64'])
     */
    type?: 'svg-uri' | 'svg-base64';
  } = {}
): string {
  const {
    width = int(fakerCore, { min: 1, max: 3999 }),
    height = int(fakerCore, { min: 1, max: 3999 }),
    color = rgb(fakerCore),
    type = arrayElement(fakerCore, ['svg-uri', 'svg-base64']),
  } = options;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/><text x="${
    width / 2
  }" y="${
    height / 2
  }" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${width}x${height}</text></svg>`;

  return type === 'svg-uri'
    ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`
    : `data:image/svg+xml;base64,${toBase64(svgString)}`;
}
