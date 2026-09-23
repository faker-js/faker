import type { VATCountryCode } from 'validator';
import { describe, expectTypeOf, it } from 'vitest';
import type { VatNumberCountryCode } from '../../src/modules/finance/_vat-number';

describe('finance', () => {
  describe('vatNumber', () => {
    it('VatNumberCountryCode', () => {
      expectTypeOf<VatNumberCountryCode>().toExtend<VATCountryCode | 'GR'>();
      // Currently the reverse is not true
    });
  });
});
