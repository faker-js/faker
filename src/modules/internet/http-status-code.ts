import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random HTTP status code.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.types A list of the HTTP status code types that should be used.
 *
 * @example
 * httpStatusCode(fakerCore) // 200
 * httpStatusCode(fakerCore, { types: ['success', 'serverError'] }) // 500
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function httpStatusCode(
  fakerCore: FakerCore,
  options: {
    /**
     * A list of the HTTP status code types that should be used.
     *
     * @default Object.keys(faker.definitions.internet.http_status_code)
     */
    types?: ReadonlyArray<HTTPStatusCodeType>;
  } = {}
): number {
  const {
    types = Object.keys(
      fakerCore.locale.internet.http_status_code
    ) as HTTPStatusCodeType[],
  } = options;
  const httpStatusCodeType = arrayElement(fakerCore, types);
  return arrayElement(
    fakerCore,
    fakerCore.locale.internet.http_status_code[httpStatusCodeType]
  );
}
