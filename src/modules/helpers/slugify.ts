import type { FakerCore } from '../../core';

/**
 * Slugifies the given string.
 * For that all spaces (` `) are replaced by hyphens (`-`)
 * and most non word characters except for dots and hyphens will be removed.
 *
 * @param fakerCore The FakerCore to use.
 * @param string The input to slugify. Defaults to `''`.
 *
 * @example
 * slugify(fakerCore) // ''
 * slugify(fakerCore, "Hello world!") // 'Hello-world'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function slugify(fakerCore: FakerCore, string: string = ''): string {
  return string
    .normalize('NFKD') //for example è decomposes to as e +  ̀
    .replaceAll(/[\u0300-\u036F]/g, '') // removes combining marks
    .replaceAll(' ', '-') // replaces spaces with hyphens
    .replaceAll(/[^\w.-]+/g, ''); // removes all non-word characters except for dots and hyphens
}
