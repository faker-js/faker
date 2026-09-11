import type { FakerCore } from '../../core';
import { int } from '../number/int';

/**
 * Generates a random avatar from GitHub.
 *
 * @remark This method generates a random string representing an URL from GitHub by using a random user ID. Faker is not responsible for the content of the image or the service providing it.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * avatarGitHub(fakerCore)
 * // 'https://avatars.githubusercontent.com/u/97165289'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function avatarGitHub(fakerCore: FakerCore): string {
  return `https://avatars.githubusercontent.com/u/${int(fakerCore, 100000000)}`;
}
