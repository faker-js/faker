import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random web protocol. Either `http` or `https`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetProtocol(fakerCore) // 'http'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetProtocol(fakerCore: FakerCore): 'http' | 'https' {
  const protocols: ['http', 'https'] = ['http', 'https'];
  return helpersArrayElement(fakerCore, protocols);
}
