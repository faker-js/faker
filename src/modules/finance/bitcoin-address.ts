import type { FakerCore } from '../../core';
import type { Casing, NumberRange } from '../../utils/types';
import { helpersEnumValue } from '../helpers/enum-value';
import { numberInt } from '../number/int';
import { stringAlphanumeric } from '../string/alphanumeric';

/**
 * The bitcoin address families.
 */
export enum BitcoinAddressFamily {
  Legacy = 'legacy',
  Segwit = 'segwit',
  Bech32 = 'bech32',
  Taproot = 'taproot',
}

/**
 * The bitcoin address families.
 */
export type BitcoinAddressFamilyType = `${BitcoinAddressFamily}`;

/**
 * The different bitcoin networks.
 */
export enum BitcoinNetwork {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

/**
 * The different bitcoin networks.
 */
export type BitcoinNetworkType = `${BitcoinNetwork}`;

type BitcoinAddressOptions = {
  prefix: Record<BitcoinNetworkType, string>;
  length: NumberRange;
  casing: Casing;
  exclude: string;
};

export const BitcoinAddressSpecs: Record<
  BitcoinAddressFamilyType,
  BitcoinAddressOptions
> = {
  [BitcoinAddressFamily.Legacy]: {
    prefix: { [BitcoinNetwork.Mainnet]: '1', [BitcoinNetwork.Testnet]: 'm' },
    length: { min: 26, max: 34 },
    casing: 'mixed',
    exclude: '0OIl',
  },
  [BitcoinAddressFamily.Segwit]: {
    prefix: { [BitcoinNetwork.Mainnet]: '3', [BitcoinNetwork.Testnet]: '2' },
    length: { min: 26, max: 34 },
    casing: 'mixed',
    exclude: '0OIl',
  },
  [BitcoinAddressFamily.Bech32]: {
    prefix: {
      [BitcoinNetwork.Mainnet]: 'bc1',
      [BitcoinNetwork.Testnet]: 'tb1',
    },
    length: { min: 42, max: 42 },
    casing: 'lower',
    exclude: '1bBiIoO',
  },
  [BitcoinAddressFamily.Taproot]: {
    prefix: {
      [BitcoinNetwork.Mainnet]: 'bc1p',
      [BitcoinNetwork.Testnet]: 'tb1p',
    },
    length: { min: 62, max: 62 },
    casing: 'lower',
    exclude: '1bBiIoO',
  },
};

/**
 * Generates a random Bitcoin address.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An optional options object.
 * @param options.type The bitcoin address type (`'legacy'`, `'segwit'`, `'bech32'` or `'taproot'`). Defaults to a random address type.
 * @param options.network The bitcoin network (`'mainnet'` or `'testnet'`). Defaults to `'mainnet'`.
 *
 * @example
 * financeBitcoinAddress(fakerCore) // '1TeZEFLmGPLEQrSRdAcnZLoWwYeiHwmRog'
 * financeBitcoinAddress(fakerCore, { type: 'bech32' }) // 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
 * financeBitcoinAddress(fakerCore, { type: 'bech32', network: 'testnet' }) // 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeBitcoinAddress(
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
    type = helpersEnumValue(fakerCore, BitcoinAddressFamily),
    network = BitcoinNetwork.Mainnet,
  } = options;
  const addressSpec = BitcoinAddressSpecs[type];
  const addressPrefix = addressSpec.prefix[network];
  const addressLength = numberInt(fakerCore, addressSpec.length);

  const address = stringAlphanumeric(fakerCore, {
    length: addressLength - addressPrefix.length,
    casing: addressSpec.casing,
    exclude: addressSpec.exclude,
  });

  return addressPrefix + address;
}
