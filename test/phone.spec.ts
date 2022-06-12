import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      phoneNumber: {
        noArgs: '891.775.5141',
      },
      number: {
        noArgs: '891.775.5141',
      },
      phoneNumberFormat: {
        noArgs: '479-377-5514',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(479) 377-5514' },
      },
      phoneFormats: {
        noArgs: '!##.!##.####',
      },
      imei: {
        noArgs: '37-917755-141004-5',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      phoneNumber: {
        noArgs: '(612) 454-0325',
      },
      number: {
        noArgs: '(612) 454-0325',
      },
      phoneNumberFormat: {
        noArgs: '451-325-4032',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(451) 325-4032' },
      },
      phoneFormats: {
        noArgs: '(!##) !##-####',
      },
      imei: {
        noArgs: '25-122540-325523-4',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      phoneNumber: {
        noArgs: '1-587-319-0616 x27431',
      },
      number: {
        noArgs: '1-587-319-0616 x27431',
      },
      phoneNumberFormat: {
        noArgs: '948-821-9061',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(948) 821-9061' },
      },
      phoneFormats: {
        noArgs: '1-!##-!##-#### x#####',
      },
      imei: {
        noArgs: '94-872190-616274-4',
      },
    },
  },
];

const functionNames = [
  'phoneNumber',
  'number',
  'phoneNumberFormat',
  'phoneFormats',
  'imei',
];

const NON_SEEDED_BASED_RUN = 25;

describe('phone', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.phone[functionName]();

          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }

      describe('phoneNumberFormat', () => {
        const { arrayIndex, expected } =
          expectations.phoneNumberFormat.phoneFormatsArrayIndex;
        it(`should return ${expected} for ${arrayIndex}`, () => {
          faker.seed(seed);

          const actual = faker.phone.phoneNumberFormat(arrayIndex);

          expect(actual).toEqual(expected);
        });
      });
    });
  }

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
