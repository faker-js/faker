import type { FakerCore } from '../../core';
import { stringHexadecimal } from '../string/hexadecimal';

/**
 * Generates a random IPv6 address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetIpv6(fakerCore) // '269f:1230:73e3:318d:842b:daab:326d:897b'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetIpv6(fakerCore: FakerCore): string {
  return Array.from({ length: 8 }, () =>
    stringHexadecimal(fakerCore, {
      length: 4,
      casing: 'lower',
      prefix: '',
    })
  ).join(':');
}
