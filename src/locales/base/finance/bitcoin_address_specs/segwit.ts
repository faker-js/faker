import type { Casing } from '../../../../modules/color';

export default {
  prefix: { mainnet: '3', testnet: '2' },
  length: { min: 26, max: 34 },
  casing: 'mixed' as Casing,
  exclude: '0OIl',
};
