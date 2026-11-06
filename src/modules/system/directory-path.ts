import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a directory path.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.depth The depth of the directory path, i.e. the number of path segments. For example, a depth of `1` returns a path with a single segment such as `'/etc'`, a depth of `2` returns a path such as `'/etc/mail'`, and a depth of `0` returns the root path `'/'`. If not set, a directory path of any depth is returned.
 *
 * @throws {FakerError} If `depth` is not a safe integer.
 * @throws {FakerError} If `depth` is less than `0`.
 * @throws {FakerError} If no directory path with the requested `depth` exists in the locale data.
 *
 * @example
 * fakeSystemDirectoryPath(fakerCore) // '/etc/mail'
 * fakeSystemDirectoryPath(fakerCore, { depth: 1 }) // '/etc'
 * fakeSystemDirectoryPath(fakerCore, { depth: 0 }) // '/'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemDirectoryPath(
  fakerCore: FakerCore,
  options: {
    /**
     * The depth of the directory path, i.e. the number of path segments.
     *
     * @default undefined
     */
    depth?: number;
  } = {}
): string {
  const paths = fakerCore.locale.system.directory_path;

  const { depth } = options;

  if (depth == null) {
    return fakeHelpersArrayElement(fakerCore, paths);
  }

  if (!Number.isSafeInteger(depth)) {
    throw new FakerError('Depth must be a safe integer.');
  }

  if (depth < 0) {
    throw new FakerError('Depth must be greater than or equal to 0.');
  }

  if (depth === 0) {
    return '/';
  }

  const pathsWithDepth = paths.filter(
    (path) => path.split('/').length - 1 === depth
  );

  if (pathsWithDepth.length === 0) {
    throw new FakerError(
      `No directory path with a depth of ${depth} exists in the locale data.`
    );
  }

  return fakeHelpersArrayElement(fakerCore, pathsWithDepth);
}
