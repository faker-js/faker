import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { FakerError } from '../src/errors/faker-error';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      withCustomMethod: 'Test-188',
      withNumberMethod: 37454,
      withNumberMethodAndArgs: 19,
    },
  },
  {
    seed: 1337,
    expectations: {
      withCustomMethod: 'Test-132',
      withNumberMethod: 26202,
      withNumberMethodAndArgs: 13,
    },
  },
  {
    seed: 1211,
    expectations: {
      withCustomMethod: 'Test-465',
      withNumberMethod: 92852,
      withNumberMethodAndArgs: 47,
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const MOCK_ARRAY = Array.from(
  { length: 500 },
  (_, index) => `Test-${index + 1}`
);

function customMethod(prefix: string = ''): string {
  const element = faker.random.arrayElement(MOCK_ARRAY);
  return `${prefix}${element}`;
}

describe('unique', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      it('unique(customMethod)', () => {
        faker.seed(seed);

        const actual = faker.unique(customMethod);
        expect(actual).toEqual(expectations.withCustomMethod);
      });

      it('unique(customMethod, args)', () => {
        faker.seed(seed);

        const prefix = 'prefix-1-';

        const actual = faker.unique(customMethod, [prefix]);
        expect(actual).toEqual(prefix + expectations.withCustomMethod);
      });

      it('unique(() => number)', () => {
        faker.seed(seed);

        const actual = faker.unique(faker.datatype.number);
        expect(actual).toEqual(expectations.withNumberMethod);
      });

      it('unique(() => number), args)', () => {
        faker.seed(seed);

        const actual = faker.unique(faker.datatype.number, [50]);
        expect(actual).toEqual(expectations.withNumberMethodAndArgs);
      });
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
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
    const internetProtocol = () => faker.random.arrayElement(['https', 'http']);
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
});
