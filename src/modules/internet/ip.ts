import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { ipv4 } from './ipv4';
import { ipv6 } from './ipv6';

/**
 * Generates a random IPv4 or IPv6 address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * ip(fakerCore) // '245.108.222.0'
 * ip(fakerCore) // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function ip(fakerCore: FakerCore): string {
  return boolean(fakerCore) ? ipv4(fakerCore) : ipv6(fakerCore);
}
