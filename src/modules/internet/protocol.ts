import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random web protocol. Either `http` or `https`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetProtocol(fakerCore) // 'http'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetProtocol(fakerCore: FakerCore): 'http' | 'https' {
  const protocols: ['http', 'https'] = ['http', 'https'];
  return fakeHelpersArrayElement(fakerCore, protocols);
}
