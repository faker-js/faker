import type { Casing } from '../string';

export enum BitcoinAddressType {
  Legacy,
  Segwit,
  Bech32,
  Taproot,
}

export enum BitcoinNetwork {
  Mainnet,
  Testnet,
}

type BitcoinAddressOptions = {
  prefix: Record<BitcoinNetwork, string>;
  length: { min: number; max: number };
  casing: Casing;
  exclude: string;
};

export const BitcoinAddressSpecs: Record<BitcoinAddressType, BitcoinAddressOptions> = {
  [BitcoinAddressType.Legacy]: {
    prefix: { [BitcoinNetwork.Mainnet]: '1', [BitcoinNetwork.Testnet]: 'm' },
    length: { min: 26, max: 34 },
    casing: 'mixed' as Casing,
    exclude: '0OIl',
  },
  [BitcoinAddressType.Segwit]: {
    prefix: { [BitcoinNetwork.Mainnet]: '3', [BitcoinNetwork.Testnet]: '2' },
    length: { min: 26, max: 34 },
    casing: 'mixed' as Casing,
    exclude: '0OIl',
  },
  [BitcoinAddressType.Bech32]: {
    prefix: {
      [BitcoinNetwork.Mainnet]: 'bc1',
      [BitcoinNetwork.Testnet]: 'tb1',
    },
    length: { min: 42, max: 42 },
    casing: 'lower' as Casing,
    exclude: '1bBiIoO',
  },
  [BitcoinAddressType.Taproot]: {
    prefix: {
      [BitcoinNetwork.Mainnet]: 'bc1p',
      [BitcoinNetwork.Testnet]: 'tb1p',
    },
    length: { min: 62, max: 62 },
    casing: 'lower' as Casing,
    exclude: '1bBiIoO',
  },
};
