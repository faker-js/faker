import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('phone', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'phone', (t) => {
    t.itEach('phoneFormats', 'imei');

    t.describeEach(
      'phoneNumber',
      'number'
    )((t) => {
      t.it('noArgs').it('format', '###-###-####');
    });

    t.describe('phoneNumberFormat', (t) => {
      t.it('noArgs');
      for (const index of [0, 1, 2, 3, 4]) {
        t.it(`with index = ${index}`, index);
      }
    });
  });

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('phoneNumber()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.phoneNumber();

          expect(phoneNumber).toMatch(/\d/);
        });
      });

      describe('number()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.number();

          expect(phoneNumber).toMatch(/\d/);
        });
      });

      describe('phoneNumberFormat()', () => {
        it('should return phone number with proper US format (Array index)', () => {
          faker.locale = 'en';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).toMatch(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/);
        });

        it('should return phone number with proper CA format (Array index)', () => {
          faker.locale = 'en_CA';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).toMatch(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/);
        });

        it('should return phone number with proper PL format (Array index)', () => {
          faker.locale = 'pl';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).toMatch(/13-\d{3}-\d{2}-\d{2}/);
        });
      });

      describe('phoneFormats()', () => {
        it('should return random phone number format', () => {
          const phoneFormat = faker.phone.phoneFormats();
          expect(faker.definitions.phone_number.formats).contain(phoneFormat);
        });
      });

      describe('imei()', () => {
        it('should return a string', () => {
          const imei = faker.phone.imei();
          expect(imei).toBeTypeOf('string');
        });

        it('should have a length of 18', () => {
          const imei = faker.phone.imei();
          expect(imei).toHaveLength(18);
        });

        it('should be Luhn-valid', () => {
          const imei = faker.phone.imei();
          expect(imei).toSatisfy(luhnCheck);
        });
      });
    }
  });
});
