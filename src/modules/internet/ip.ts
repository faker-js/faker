import type { FakerCore } from '../../core';
import { fakeDatatypeBoolean } from '../datatype/boolean';
import { fakeInternetIpv4 } from './ipv4';
import { fakeInternetIpv6 } from './ipv6';

/**
 * Generates a random IPv4 or IPv6 address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetIp(fakerCore) // '245.108.222.0'
 * fakeInternetIp(fakerCore) // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetIp(fakerCore: FakerCore): string {
  return fakeDatatypeBoolean(fakerCore)
    ? fakeInternetIpv4(fakerCore)
    : fakeInternetIpv6(fakerCore);
}
