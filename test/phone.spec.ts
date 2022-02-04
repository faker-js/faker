import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      phoneNumber: {
        noArgs: '891.775.5141',
      },
      phoneNumberFormat: {
        noArgs: '479-377-5514',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(479) 377-5514' },
      },
      phoneFormats: {
        noArgs: '!##.!##.####',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      phoneNumber: {
        noArgs: '(612) 454-0325',
      },
      phoneNumberFormat: {
        noArgs: '451-325-4032',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(451) 325-4032' },
      },
      phoneFormats: {
        noArgs: '(!##) !##-####',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      phoneNumber: {
        noArgs: '1-587-319-0616 x27431',
      },
      phoneNumberFormat: {
        noArgs: '948-821-9061',
        phoneFormatsArrayIndex: { arrayIndex: 1, expected: '(948) 821-9061' },
      },
      phoneFormats: {
        noArgs: '1-!##-!##-#### x#####',
      },
    },
  },
];

const functionNames = ['phoneNumber', 'phoneNumberFormat', 'phoneFormats'];

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

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('phoneNumber()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.phoneNumber();

          expect(phoneNumber).match(/\d/);
        });
      });

      describe('phoneNumberFormat()', () => {
        it('should return phone number with proper US format (Array index)', () => {
          faker.locale = 'en';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/);
        });

        it('should return phone number with proper CA format (Array index)', () => {
          faker.locale = 'en_CA';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/);
        });

        it('should return phone number with proper PL format (Array index)', () => {
          faker.locale = 'pl';
          const phoneNumber = faker.phone.phoneNumberFormat(1);
          expect(phoneNumber).match(/13-\d{3}-\d{2}-\d{2}/);
        });
      });

      describe('phoneFormats()', () => {
        it('should return random phone number format', () => {
          const phoneFormat = faker.phone.phoneFormats();
          expect(faker.definitions.phone_number.formats).contain(phoneFormat);
        });
      });
    }
  });
});
