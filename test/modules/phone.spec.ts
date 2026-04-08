import { describe, expect, it } from 'vitest';
import { faker, fakerEN_GB } from '../../src';
import { luhnCheck } from '../../src/modules/helpers/luhn-check';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 25;

describe('phone', () => {
  seededTests(faker, 'phone', (t) => {
    t.it('imei');

    t.describe('number', (t) => {
      t.it('noArgs')
        .it('with human style', { style: 'human' })
        .it('with national style', { style: 'national' })
        .it('with international style', { style: 'international' })
        .it('with mobile style', { style: 'mobile' });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('number()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.number();

          expect(phoneNumber).toMatch(/\d/);
        });

        it('should return a fixed length mobile format in en_GB locale', () => {
          const phoneNumber = fakerEN_GB.phone.number({ style: 'mobile' });

          expect(phoneNumber).toMatch(/0\d{10}/);
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
  );
});
