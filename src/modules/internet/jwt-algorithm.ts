import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random JWT (JSON Web Token) Algorithm.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see fakeInternetJwt(fakerCore): For generating random JWT (JSON Web Token).
 *
 * @example
 * fakeInternetJwtAlgorithm(fakerCore) // 'HS256'
 * fakeInternetJwtAlgorithm(fakerCore) // 'RS512'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetJwtAlgorithm(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.internet.jwt_algorithm
  );
}
