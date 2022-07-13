import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import type { StringModule } from '../src/modules/string';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const functionNames: (keyof StringModule)[] = ['uuid', 'hexadecimal', 'random'];

describe('string', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.string[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }

      describe('hexadecimal()', () => {
        it('should return a deterministic hex of given length', () => {
          faker.seed(seed);

          const actual = faker.string.hexadecimal(42);
          expect(actual).toMatchSnapshot();
        });
      });
    });

    describe('random()', () => {
      it('should return a deterministic string of given length', () => {
        faker.seed(seed);

        const actual = faker.string.random(42);
        expect(actual).toMatchSnapshot();
      });
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('random()', () => {
        it('should generate a string value', () => {
          const generatedString = faker.string.random();
          expect(generatedString).toBeTypeOf('string');
          expect(generatedString).toHaveLength(10);
        });

        it('should return empty string if negative length is passed', () => {
          const negativeValue = faker.datatype.number({ min: -1000, max: -1 });
          const generatedString = faker.string.random(negativeValue);
          expect(generatedString).toBe('');
          expect(generatedString).toHaveLength(0);
        });

        it('should return string with length of 2^20 if bigger length value is passed', () => {
          const overMaxValue = Math.pow(2, 28);
          const generatedString = faker.string.random(overMaxValue);
          expect(generatedString).toHaveLength(Math.pow(2, 20));
        });

        it('should return string with a specific length', () => {
          const length = 1337;
          const generatedString = faker.string.random(length);
          expect(generatedString).toHaveLength(length);
        });
      });

      describe(`uuid()`, () => {
        it('generates a valid UUID', () => {
          const UUID = faker.string.uuid();
          const RFC4122 =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
          expect(UUID).toMatch(RFC4122);
        });
      });

      describe(`hexadecimal()`, () => {
        it('generates single hex character when no additional argument was provided', () => {
          const hex = faker.string.hexadecimal();
          expect(hex).toMatch(/^[0-9a-f]*$/i);
          expect(hex).toHaveLength(1);
        });

        it('generates a random hex string', () => {
          const hex = faker.string.hexadecimal(5);
          expect(hex).toMatch(/^[0-9a-f]*$/i);
          expect(hex).toHaveLength(5);
        });
      });
    }
  });
});
