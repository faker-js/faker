import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      withMethod: 'Test-188',
    },
  },
  {
    seed: 1337,
    expectations: {
      withMethod: 'Test-132',
    },
  },
  {
    seed: 1211,
    expectations: {
      withMethod: 'Test-465',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const MOCK_ARRAY = Array.from(
  { length: 500 },
  (_, index) => `Test-${index + 1}`
);

function method(prefix: string = ''): string {
  const element = faker.random.arrayElement(MOCK_ARRAY);
  return `${prefix}${element}`;
}

describe('unique', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      it(`unique(method)`, () => {
        faker.seed(seed);

        const actual = faker.unique(method);
        expect(actual).toEqual(expectations.withMethod);
      });

      it(`unique(method, args)`, () => {
        faker.seed(seed);

        const prefix = 'prefix-1-';

        const actual = faker.unique(method, [prefix]);
        expect(actual).toEqual(prefix + expectations.withMethod);
      });
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('unique()', () => {
        it('should be possible to call a function with no arguments and return a result', () => {
          const result = faker.unique(faker.internet.email);
          expect(typeof result).toBe('string');
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
          }).toThrowError(/^Exceeded maxTime:/);
        });

        it('should be possible to limit unique call by maxRetries', () => {
          expect(() => {
            faker.unique(faker.internet.protocol, [], {
              maxTime: 5000,
              maxRetries: 5,
              exclude: ['https', 'http'],
            });
          }).toThrowError(/^Exceeded maxRetries:/);
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
});
