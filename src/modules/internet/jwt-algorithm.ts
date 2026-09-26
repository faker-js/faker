import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Generates a random JWT (JSON Web Token) Algorithm.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see jwt(fakerCore): For generating random JWT (JSON Web Token).
 *
 * @example
 * internetJwtAlgorithm(fakerCore) // 'HS256'
 * internetJwtAlgorithm(fakerCore) // 'RS512'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetJwtAlgorithm(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.internet.jwt_algorithm);
}
