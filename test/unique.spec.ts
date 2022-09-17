import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { FakerError } from '../src/errors/faker-error';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const MOCK_ARRAY = Array.from(
  { length: 500 },
  (_, index) => `Test-${index + 1}`
);

function customMethod(prefix: string = ''): string {
  const element = faker.helpers.arrayElement(MOCK_ARRAY);
  return `${prefix}${element}`;
}

describe('unique', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      it('unique(customMethod)', () => {
        faker.seed(seed);

        const actual = faker.unique(customMethod);

        expect(actual).toMatchSnapshot();
      });

      it('unique(customMethod, args)', () => {
        faker.seed(seed);

        const prefix = 'prefix-1-';

        const actual = faker.unique(customMethod, [prefix]);

        expect(actual).toMatchSnapshot();
      });

      it('unique(() => number)', () => {
        faker.seed(seed);

        const actual = faker.unique(faker.datatype.number);

        expect(actual).toMatchSnapshot();
      });

      it('unique(() => number), args)', () => {
        faker.seed(seed);

        const actual = faker.unique(faker.datatype.number, [50]);

        expect(actual).toMatchSnapshot();
      });
    });
  }

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('unique()', () => {
        it('should be possible to call a function with no arguments and return a result', () => {
          const result = faker.unique(faker.internet.email);
          expect(result).toBeTypeOf('string');
        });

        it('should be possible to call a function with arguments and return a result', () => {
          const result = faker.unique(faker.internet.email, [
            'fName',
            'lName',
            'domain',
          ]); // third argument is provider, or domain for email
          expect(result).toMatch(/\@domain/);
        });

        it('should be possible to limit unique call by maxTime in ms', () => {
          expect(() => {
            faker.unique(faker.internet.protocol, [], {
              maxTime: 1,
              maxRetries: 9999,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxTime: 1 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });

        it('should be possible to limit unique call by maxRetries', () => {
          expect(() => {
            faker.unique(faker.internet.protocol, [], {
              maxTime: 5000,
              maxRetries: 5,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxRetries: 5 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });

        it('should throw a FakerError instance on error', () => {
          expect(() => {
            faker.unique(faker.internet.protocol, [], {
              maxTime: 5000,
              maxRetries: 5,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxRetries: 5 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });
      });
    }
  });
});
