import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

export type HTTPStatusCodeType =
  | 'informational'
  | 'success'
  | 'clientError'
  | 'serverError'
  | 'redirection';

/**
 * Generates a random HTTP status code.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.types A list of the HTTP status code types that should be used.
 *
 * @example
 * fakeInternetHttpStatusCode(fakerCore) // 200
 * fakeInternetHttpStatusCode(fakerCore, { types: ['success', 'serverError'] }) // 500
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetHttpStatusCode(
  fakerCore: FakerCore,
  options: {
    /**
     * A list of the HTTP status code types that should be used.
     *
     * @default Object.keys(fakerCore.locale.internet.http_status_code)
     */
    types?: ReadonlyArray<HTTPStatusCodeType>;
  } = {}
): number {
  const {
    types = Object.keys(
      fakerCore.locale.internet.http_status_code
    ) as HTTPStatusCodeType[],
  } = options;
  const httpStatusCodeType = fakeHelpersArrayElement(fakerCore, types);
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.internet.http_status_code[httpStatusCodeType]
  );
}
