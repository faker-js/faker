import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import type { NumberModule } from '../src/modules/number';
import { seededRuns } from './support/seededRuns';

const functionNames: (keyof NumberModule)[] = ['hexadecimal', 'int'];

describe('number', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.number[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    describe('int', () => {
      it('should return a random number given a maximum value as Number', () => {
        const max = 10;

        const actual = faker.number.int(max);

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThanOrEqual(max);
      });

      it('should return a random number given a maximum value as Object', () => {
        const options = { max: 10 };

        const actual = faker.number.int(options);

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThanOrEqual(options.max);
      });

      it('should return a random number given a maximum value of 0', () => {
        const options = { max: 0 };

        const actual = faker.number.int(options);

        expect(actual).toBe(0);
      });

      it('should return a random number given a negative number minimum and maximum value of 0', () => {
        const options = { min: -100, max: 0 };

        const actual = faker.number.int(options);

        expect(actual).toBeGreaterThanOrEqual(options.min);
        expect(actual).toBeLessThanOrEqual(options.max);
      });

      it('should return a random number between a range', () => {
        const options = { min: 22, max: 33 };
        for (let i = 0; i < 100; i++) {
          const actual = faker.number.int(options);
          expect(actual).toBeGreaterThanOrEqual(options.min);
          expect(actual).toBeLessThanOrEqual(options.max);
        }
      });

      it('should return inclusive negative max value', () => {
        let foundNegative4 = false;
        let foundNegative5 = false;

        for (let iter = 0; iter < 1000; iter++) {
          const actual = faker.number.int({ min: -5, max: -4 });

          if (actual === -4) {
            foundNegative4 = true;
          } else if (actual === -5) {
            foundNegative5 = true;
          }

          expect(actual).toBeGreaterThanOrEqual(-5);
          expect(actual).toBeLessThanOrEqual(-4);

          if (foundNegative4 && foundNegative5) {
            break;
          }
        }

        expect(foundNegative4).toBeTruthy();
        expect(foundNegative5).toBeTruthy();
      });

      it('should not mutate the input object', () => {
        const initialMin = 1;
        const initialPrecision = 1;
        const initialOtherProperty = 'hello darkness my old friend';
        const input: {
          min?: number;
          max?: number;
          precision?: number;
          otherProperty: string;
        } = Object.freeze({
          min: initialMin,
          precision: initialPrecision,
          otherProperty: initialOtherProperty,
        });

        expect(() => faker.number.int(input)).not.toThrow();
      });
    });

    describe('hexadecimal', () => {
      it('generates single hex character when no additional argument was provided', () => {
        const hex = faker.number.hexadecimal();
        expect(hex).toHaveLength(1);
        expect(hex).toSatisfy(validator.isHexadecimal);
      });

      it('generates a random hex string', () => {
        const hex = faker.number.hexadecimal(5);
        expect(hex).toHaveLength(5);
        expect(hex).toSatisfy(validator.isHexadecimal);
      });
    });
  });
});
