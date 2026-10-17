import type { FakerCore } from '../../core';
import { fakeStringHexadecimal } from '../string/hexadecimal';

/**
 * Creates a random, non-checksum Ethereum address.
 *
 * To generate a checksummed Ethereum address (with specific per character casing), wrap this method in a custom method and use third-party libraries to transform the result.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceEthereumAddress(fakerCore) // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceEthereumAddress(fakerCore: FakerCore): string {
  return fakeStringHexadecimal(fakerCore, {
    length: 40,
    casing: 'lower',
  });
}
