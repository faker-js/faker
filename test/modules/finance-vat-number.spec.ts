import type { VATCountryCode } from 'validator';
import { isVAT } from 'validator';
import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { FakerError } from '../../src/errors/faker-error';
import vatNumberFormats from '../../src/modules/finance/vat-number';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 25;

describe('finance_vatNumber', () => {
  describe('generic VAT country checks', () => {
    it.each(vatNumberFormats.map((entry) => entry.country as VATCountryCode))(
      '%s',
      (country) => {
        expect(country).toMatch(/^[A-Z]{2}$/);
        const actual = faker.finance.vatNumber({ countryCode: country });

        expect(actual).toStartWith(country);
        expect(actual).toSatisfy((value: string) => isVAT(value, country));
      }
    );
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('vatNumber()', () => {
        it('should return a VAT number of a supported country', () => {
          const actual = faker.finance.vatNumber();

          const country = actual.slice(0, 2) as VATCountryCode;
          expect(vatNumberFormats.map((entry) => entry.country)).toContain(
            country
          );
          expect(actual).toSatisfy((value: string) => isVAT(value, country));
        });

        it('should throw for an unsupported country code', () => {
          expect(() => faker.finance.vatNumber({ countryCode: 'XX' })).toThrow(
            new FakerError('Country code XX not supported.')
          );
        });

        it('should not use the GR ISO code for Greece', () => {
          expect(vatNumberFormats.map((entry) => entry.country)).not.toContain(
            'GR'
          );
          expect(faker.finance.vatNumber({ countryCode: 'EL' })).toStartWith(
            'EL'
          );
        });
      });
    }
  );
});
