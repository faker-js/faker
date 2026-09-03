import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random JWT (JSON Web Token) Algorithm.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see jwt(fakerCore): For generating random JWT (JSON Web Token).
 *
 * @example
 * jwtAlgorithm(fakerCore) // 'HS256'
 * jwtAlgorithm(fakerCore) // 'RS512'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function jwtAlgorithm(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.internet.jwt_algorithm);
}
