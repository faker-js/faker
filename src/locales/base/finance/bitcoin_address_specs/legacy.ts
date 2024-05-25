import type { Casing } from '../../../../modules/string';

export default {
  prefix: { mainnet: '1', testnet: 'm' },
  length: { min: 26, max: 34 },
  casing: 'mixed' as Casing,
  exclude: '0OIl',
};
