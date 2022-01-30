import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      withMethod: 'Test-19',
    },
  },
  {
    seed: 1337,
    expectations: {
      withMethod: 'Test-14',
    },
  },
  {
    seed: 1211,
    expectations: {
      withMethod: 'Test-47',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const MOCK_ARRAY = Array.from(
  { length: 50 },
  (_, index) => `Test-${index + 1}`
);

describe('unique', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      it(`unique(method)`, () => {
        faker.seed(seed);

        const method = () =>
          MOCK_ARRAY[
            faker.datatype.number({ min: 0, max: MOCK_ARRAY.length - 1 })
          ];

        const actual = faker.unique(method);
        expect(actual).toEqual(expectations.withMethod);
      });
    });
  }

  describe('unique()', () => {
    it('is able to call a function with no arguments and return a result', () => {
      const result =
        // @ts-expect-error
        faker.unique(faker.internet.email);
      expect(typeof result).toBe('string');
    });

    it('is able to call a function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });

    it('is able to call same function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });

    it('is able to exclude results as array', () => {
      const result = faker.unique(faker.internet.protocol, [], {
        exclude: ['https'],
      });
      expect(result).toBe('http');
    });

    it('is able to limit unique call by maxTime in ms', () => {
      let result;
      try {
        result = faker.unique(faker.internet.protocol, [], {
          maxTime: 1,
          maxRetries: 9999,
          exclude: ['https', 'http'],
        });
      } catch (err) {
        expect(err.message.substr(0, 16)).toBe('Exceeded maxTime');
      }
    });

    it('is able to limit unique call by maxRetries', () => {
      let result;
      try {
        result = faker.unique(faker.internet.protocol, [], {
          maxTime: 5000,
          maxRetries: 5,
          exclude: ['https', 'http'],
        });
      } catch (err) {
        expect(err.message.substr(0, 19)).toBe('Exceeded maxRetries');
      }
    });

    it('is able to call last function with arguments and return a result', () => {
      const result = faker.unique(faker.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      expect(result).toMatch(/\@c/);
    });
  });
});
