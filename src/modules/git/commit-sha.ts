import type { FakerCore } from '../../core';
import { hexadecimal } from '../string/hexadecimal';

/**
 * Generates a random commit sha.
 *
 * By default, the length of the commit sha is 40 characters.
 *
 * For a shorter commit sha, use the `length` option.
 *
 * Usual short commit sha length is:
 * - 7 for GitHub
 * - 8 for GitLab
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options for the commit sha.
 * @param options.length The length of the commit sha. Defaults to `40`.
 *
 * @example
 * commitSha(fakerCore) // '2c6e3880fd94ddb7ef72d34e683cdc0c47bec6e6'
 * commitSha(fakerCore, { length: 7 }) // 'dbee57b'
 * commitSha(fakerCore, { length: 8 }) // '0e52376a'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function commitSha(
  fakerCore: FakerCore,
  options: {
    /**
     * The length of the commit sha.
     *
     * @default 40
     */
    length?: number;
  } = {}
): string {
  const { length = 40 } = options;
  return hexadecimal(fakerCore, {
    length,
    casing: 'lower',
    prefix: '',
  });
}
