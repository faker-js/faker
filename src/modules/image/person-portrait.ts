import type { FakerCore } from '../../core';
import { numberInt } from '../number/int';
import type { SexType } from '../person';
import { personSexType } from '../person/sex-type';

/**
 * Generates a random square portrait (avatar) of a person.
 * These are static images of fictional people created by an AI, Stable Diffusion 3.
 * The image URLs are served via the JSDelivr CDN and subject to their [terms of use](https://www.jsdelivr.com/terms).
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for generating an AI avatar.
 * @param options.sex The sex of the person for the avatar. Can be `'female'` or `'male'`. If not provided or `'generic'`, defaults to a random selection.
 * @param options.size The size of the image. Can be `512`, `256`, `128`, `64` or `32`. If not provided, defaults to `512`.
 *
 * @example
 * imagePersonPortrait(fakerCore) // 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/57.jpg'
 * imagePersonPortrait(fakerCore, { sex: 'male', size: '128' }) // 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/128/27.jpg'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function imagePersonPortrait(
  fakerCore: FakerCore,
  options: {
    /**
     * The sex of the person for the avatar.
     * Can be `'female'` or `'male'`. `'generic'` uses a random selection.
     *
     * @default personSexType(fakerCore)
     */
    sex?: SexType;
    /**
     * The size of the image.
     * Can be `512`, `256`, `128`, `64` or `32`.
     *
     * @default 512
     */
    size?: 512 | 256 | 128 | 64 | 32;
  } = {}
): string {
  const { size = 512 } = options;
  let { sex = personSexType(fakerCore) } = options;

  if (sex === 'generic') {
    sex = personSexType(fakerCore);
  }

  const baseURL = 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait';
  return `${baseURL}/${sex}/${size}/${numberInt(fakerCore, { min: 0, max: 99 })}.jpg`;
}
