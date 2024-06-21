import type { Casing } from '../string';

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
  length: { min: number; max: number };
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
