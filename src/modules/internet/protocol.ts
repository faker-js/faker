import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random web protocol. Either `http` or `https`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * protocol(fakerCore) // 'http'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function protocol(fakerCore: FakerCore): 'http' | 'https' {
  const protocols: ['http', 'https'] = ['http', 'https'];
  return arrayElement(fakerCore, protocols);
}
