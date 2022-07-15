import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import type { Zodiac } from '../src/modules/zodiac';
import type { MethodsOf } from '../src/utils/types';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      sign: 'Gemini',
    },
  },
  {
    seed: 1337,
    expectations: {
      sign: 'Taurus',
    },
  },
  {
    seed: 1211,
    expectations: {
      sign: 'Capricorn',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames: MethodsOf<Zodiac> = ['sign'];

const arrayOfSigns = Object.values(faker.definitions.zodiac.sign);

describe('zodiac', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.zodiac[functionName]();

          expect(actual).toBeTypeOf('string');
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('sign()', () => {
        it('returns a random zodiac sign', () => {
          const sign = faker.zodiac.sign();
          expect(arrayOfSigns).toContain(sign);
        });

        it('returns a random zodiac sign for a given birthday', () => {
          const year = 1997;
          // array of months
          const months = faker.datatype.number({ min: 1, max: 12 });
          // array of days
          const days = faker.datatype.number({ min: 1, max: 31 });

          const dateAsString = `${year}-${months}-${days}`;
          const dateAsDateObject = new Date(dateAsString);

          const signFromString = faker.zodiac.sign(dateAsString);
          expect(arrayOfSigns).toContain(signFromString);
          const signFromDateObject = faker.zodiac.sign(dateAsDateObject);
          expect(arrayOfSigns).toContain(signFromDateObject);
          expect(signFromString).toBe(signFromDateObject);
        });
      });
    }
  });

  describe('sign()', () => {
    it('returns a random zodiac sign', () => {
      const sign = faker.zodiac.sign();
      expect(arrayOfSigns).toContain(sign);
    });

    it('returns a the zodiac sign for a given birthday', () => {
      const sign = faker.zodiac.sign('1997-12-20');
      expect(sign).toBe('Sagittarius');
    });

    it('returns the zodiac sign for a given birthday', () => {
      const year = 1997;
      // array of months
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      // array of days
      const days = [11, 19, 25];
      // array of signs
      for (const month of months) {
        for (const day of days) {
          const dateAsString = `${year}-${month}-${day}`;
          const dateAsDateObject = new Date(dateAsString);
          const dateAsNumber = dateAsDateObject.getTime();

          const signFromString = faker.zodiac.sign(dateAsString);
          expect(arrayOfSigns).toContain(signFromString);

          const signFromDateObject = faker.zodiac.sign(dateAsDateObject);
          expect(arrayOfSigns).toContain(signFromDateObject);
          expect(signFromString).toBe(signFromDateObject);

          const signFromNumber = faker.zodiac.sign(dateAsNumber);
          expect(arrayOfSigns).toContain(signFromNumber);
          expect(signFromString).toBe(signFromNumber);
        }
      }
    });

    it.each(['', NaN, new Date(NaN)])(
      'throws an error for a bad birthdate: %s',
      (birthdate) => {
        expect(() => faker.zodiac.sign(birthdate)).toThrowError();
      }
    );
  });
});
