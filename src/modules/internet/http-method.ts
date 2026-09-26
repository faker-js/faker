import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random http method.
 *
 * Can be either of the following:
 *
 * - `GET`
 * - `POST`
 * - `PUT`
 * - `DELETE`
 * - `PATCH`
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetHttpMethod(fakerCore) // 'PATCH'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetHttpMethod(
  fakerCore: FakerCore
): 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' {
  const httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];
  return helpersArrayElement(fakerCore, httpMethods);
}
