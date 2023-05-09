import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('phone', () => {
  seededTests(faker, 'phone', (t) => {
    t.it('imei');

    t.describe('number', (t) => {
      t.it('noArgs').it('format', '###-###-####');
    });
  });

  describe(
    `random seeded tests for seed ${faker.seed()}`,
    () => {
      describe('number()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.number();

          expect(phoneNumber).toMatch(/\d/);
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
    },
    {
      repeats: NON_SEEDED_BASED_RUN,
    }
  );
});
