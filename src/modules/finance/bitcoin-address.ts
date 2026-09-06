import type { FakerCore } from '../../core';
import { enumValue } from '../helpers/enum-value';
import { int } from '../number/int';
import { alphanumeric } from '../string/alphanumeric';
import type { BitcoinAddressFamilyType, BitcoinNetworkType } from './_bitcoin';
import {
  BitcoinAddressFamily,
  BitcoinAddressSpecs,
  BitcoinNetwork,
} from './_bitcoin';

/**
 * Generates a random Bitcoin address.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An optional options object.
 * @param options.type The bitcoin address type (`'legacy'`, `'segwit'`, `'bech32'` or `'taproot'`). Defaults to a random address type.
 * @param options.network The bitcoin network (`'mainnet'` or `'testnet'`). Defaults to `'mainnet'`.
 *
 * @example
 * bitcoinAddress(fakerCore) // '1TeZEFLmGPLEQrSRdAcnZLoWwYeiHwmRog'
 * bitcoinAddress(fakerCore, { type: 'bech32' }) // 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
 * bitcoinAddress(fakerCore, { type: 'bech32', network: 'testnet' }) // 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bitcoinAddress(
  fakerCore: FakerCore,
  options: {
    /**
     * The bitcoin address type (`'legacy'`, `'segwit'`, `'bech32'` or `'taproot'`).
     *
     * @default helpersEnumValue(fakerCore, BitcoinAddressFamily)
     */
    type?: BitcoinAddressFamilyType;
    /**
     * The bitcoin network (`'mainnet'` or `'testnet'`).
     *
     * @default 'mainnet'
     */
    network?: BitcoinNetworkType;
  } = {}
): string {
  const {
    type = enumValue(fakerCore, BitcoinAddressFamily),
    network = BitcoinNetwork.Mainnet,
  } = options;
  const addressSpec = BitcoinAddressSpecs[type];
  const addressPrefix = addressSpec.prefix[network];
  const addressLength = int(fakerCore, addressSpec.length);

  const address = alphanumeric(fakerCore, {
    length: addressLength - addressPrefix.length,
    casing: addressSpec.casing,
    exclude: addressSpec.exclude,
  });

  return addressPrefix + address;
}
