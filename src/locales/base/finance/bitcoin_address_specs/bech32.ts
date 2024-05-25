import type { Casing } from '../../../../modules/string';

export default {
  prefix: { mainnet: 'bc1', testnet: 'tb1' },
  length: { min: 42, max: 42 },
  casing: 'lower' as Casing,
  exclude: '1bBiIoO',
};
