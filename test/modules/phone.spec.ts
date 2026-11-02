import { describe, expect, it } from 'vitest';
import { faker, fakerEN_GB, fakerPT_BR, fakerZH_CN } from '../../src';
import { luhnCheck } from '../../src/modules/helpers/_luhn-check';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

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

        it('should return a valid area code and prefix in pt_BR locale', () => {
          const areaCode =
            '(1[1-9]|2[12478]|3[1-578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])';

          expect(fakerPT_BR.phone.number({ style: 'national' })).toMatch(
            new RegExp(`^\\(${areaCode}\\) (9\\d{4}|[2-5]\\d{3})-\\d{4}$`)
          );
          expect(fakerPT_BR.phone.number({ style: 'mobile' })).toMatch(
            new RegExp(`^${areaCode}9\\d{8}$`)
          );
        });

        it('should return a valid area code or mobile prefix in zh_CN locale', () => {
          const areaCode =
            '(10|2[0-57-9]|311|371|4[135]1|5(12|3[12]|51|7[14]|91)|7(31|5[57]|69|91)|871|898)';
          const mobilePrefix =
            '1(3\\d|4[57]|5[0-35-9]|6[2567]|7[0-35-8]|8\\d|9[0-35-9])';

          expect(fakerZH_CN.phone.number({ style: 'national' })).toMatch(
            new RegExp(
              `^(0${areaCode} [2-9]{2}\\d{2}|${mobilePrefix} \\d{4}) \\d{4}$`
            )
          );
          expect(fakerZH_CN.phone.number({ style: 'international' })).toMatch(
            new RegExp(
              `^\\+86(${areaCode}[2-9]{2}\\d{6}|${mobilePrefix}\\d{8})$`
            )
          );
          expect(fakerZH_CN.phone.number({ style: 'mobile' })).toMatch(
            new RegExp(`^${mobilePrefix}\\d{8}$`)
          );
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
