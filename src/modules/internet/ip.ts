import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { internetIpv4 } from './ipv4';
import { internetIpv6 } from './ipv6';

/**
 * Generates a random IPv4 or IPv6 address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetIp(fakerCore) // '245.108.222.0'
 * internetIp(fakerCore) // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetIp(fakerCore: FakerCore): string {
  return datatypeBoolean(fakerCore)
    ? internetIpv4(fakerCore)
    : internetIpv6(fakerCore);
}
