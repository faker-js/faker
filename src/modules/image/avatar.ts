import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { imageAvatarGitHub } from './avatar-git-hub';
import { imagePersonPortrait } from './person-portrait';

/**
 * Generates a random avatar image url.
 *
 * @remark This method sometimes generates a random string representing an URL from GitHub by using a random user ID. Faker is not responsible for the content of the image or the service providing it.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * imageAvatar(fakerCore)
 * // 'https://avatars.githubusercontent.com/u/97165289'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function imageAvatar(fakerCore: FakerCore): string {
  // Add new avatar providers here, when adding a new one.
  const avatarMethod = helpersArrayElement(fakerCore, [
    personPortrait,
    avatarGitHub,
  ]);
  return avatarMethod(fakerCore);
}
