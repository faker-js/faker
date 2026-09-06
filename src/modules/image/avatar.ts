import type { FakerCore } from '../../core';
import { Faker } from '../../faker';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random avatar image url.
 *
 * @param fakerCore The FakerCore to use.
 * @remark This method sometimes generates a random string representing an URL from GitHub by using a random user ID. Faker is not responsible for the content of the image or the service providing it.
 *
 * @example
 * avatar(fakerCore)
 * // 'https://avatars.githubusercontent.com/u/97165289'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function avatar(fakerCore: FakerCore): string {
  // Add new avatar providers here, when adding a new one.
  const avatarMethod = arrayElement(fakerCore, [
    this.personPortrait,
    this.avatarGitHub,
  ]);
  return avatarMethod();
}
