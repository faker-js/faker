import type { Casing } from '../../../../modules/string';

export default {
  prefix: { mainnet: 'bc1p', testnet: 'tb1p' },
  length: { min: 62, max: 62 },
  casing: 'lower' as Casing,
  exclude: '1bBiIoO',
};
