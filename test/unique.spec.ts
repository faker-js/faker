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

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
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
Try adjusting maxTime or maxRetries parameters for faker.unique().`)
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
Try adjusting maxTime or maxRetries parameters for faker.unique().`)
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
Try adjusting maxTime or maxRetries parameters for faker.unique().`)
          );
        });
      });
    }
  });

  // This test can be only executed once, because the unique function has a global state.
  // See: https://github.com/faker-js/faker/issues/371
  it('should be possible to exclude results as array', () => {
    const internetProtocol = () =>
      faker.helpers.arrayElement(['https', 'http']);
    const result = faker.unique(internetProtocol, [], {
      exclude: ['https'],
    });
    expect(result).toBe('http');
  });

  it('no conflict', () => {
    let i = 0;
    const method = () => `no conflict: ${i++}`;
    expect(faker.unique(method)).toBe('no conflict: 0');
    expect(faker.unique(method)).toBe('no conflict: 1');
  });

  it('with conflict', () => {
    const method = () => 'with conflict: 0';
    expect(faker.unique(method)).toBe('with conflict: 0');
    expect(() =>
      faker.unique(method, [], {
        maxRetries: 1,
      })
    ).toThrowError(
      new FakerError(`Exceeded maxRetries: 1 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.unique().`)
    );
  });

  it('should not mutate most of the input option properties', () => {
    const method = () => 'options-mutate-test';

    const startTime = new Date().getTime();
    const maxTime = 49;
    const maxRetries = 49;
    const currentIterations = 0;
    const exclude = [];
    const compare = (obj, key) => (obj[key] === undefined ? -1 : 0);

    const options = {
      startTime,
      maxTime,
      maxRetries,
      currentIterations,
      exclude,
      compare,
    };

    faker.unique(method, [], options);

    expect(options.startTime).toBe(startTime);
    expect(options.maxTime).toBe(maxTime);
    expect(options.maxRetries).toBe(maxRetries);
    // `options.currentIterations` is incremented in the `faker.unique` function.
    expect(options.exclude).toBe(exclude);
    expect(options.compare).toBe(compare);
  });

  it('should be possible to pass a user-specific store', () => {
    const store = {};

    const method = () => 'with conflict: 0';

    expect(faker.unique(method, [], { store })).toBe('with conflict: 0');
    expect(store).toEqual({ 'with conflict: 0': 'with conflict: 0' });

    expect(() => faker.unique(method, [], { store })).toThrow();

    delete store['with conflict: 0'];

    expect(faker.unique(method, [], { store })).toBe('with conflict: 0');
    expect(store).toEqual({ 'with conflict: 0': 'with conflict: 0' });
  });
});
