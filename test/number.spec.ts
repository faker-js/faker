import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { seededTests } from './support/seededRuns';

describe('number', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'number', (t) => {
    t.describeEach('int', 'hex')((t) => t.it('noArgs'));

    t.describe('bigInt', (t) => {
      t.it('noArgs').it('with value', 42);
    });

    t.describe('float', (t) => {
      t.it('with plain number', 6)
        .it('with min', { min: -42 })
        .it('with max', { max: 69 })
        .it('with min and max', { min: -42, max: 69 })
        .it('with min, max and precision', { min: -42, max: 69, precision: 4 });
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
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

    describe('hex', () => {
      it('generates single hex character when no additional argument was provided', () => {
        const hex = faker.number.hex();
        expect(hex).toBeTypeOf('string');
        expect(hex).toHaveLength(1);
        expect(hex).toSatisfy(validator.isHexadecimal);
      });

      it('generates a random hex string', () => {
        const hex = faker.number.hex(5);
        expect(hex).toSatisfy(validator.isHexadecimal);
      });

      it('generates a random hex in a specific range', () => {
        const min = 15;
        const max = 255;
        const hex = faker.number.hex({ min, max });

        const hexNum = parseInt(hex, 16);
        expect(hexNum).toBeLessThanOrEqual(max);
        expect(hexNum).greaterThanOrEqual(min);
      });
    });

    describe('bigInt', () => {
      it('should generate a bigInt value', () => {
        const generateBigInt = faker.number.bigInt();
        expect(generateBigInt).toBeTypeOf('bigint');
      });

      it('should generate a big bigInt value with low delta', () => {
        const min = 999999999n;
        const max = 1000000000n;
        const generateBigInt = faker.number.bigInt({ min, max });
        expect(generateBigInt).toBeTypeOf('bigint');
        expect(generateBigInt).toBeGreaterThanOrEqual(min);
        expect(generateBigInt).toBeLessThanOrEqual(max);
      });

      it('should return a random bigint given a maximum value as BigInt', () => {
        const max = 10n;
        expect(faker.number.bigInt(max)).toBeGreaterThanOrEqual(0n);
        expect(faker.number.bigInt(max)).toBeLessThanOrEqual(max);
      });

      it('should return a random bigint given a maximum value as Object', () => {
        const options = { max: 10n };
        expect(faker.number.bigInt(options)).toBeGreaterThanOrEqual(0n);
        expect(faker.number.bigInt(options)).toBeLessThanOrEqual(options.max);
      });

      it('should return a random bigint given a maximum value of 0', () => {
        const options = { max: 0n };
        expect(faker.number.bigInt(options)).toBe(0n);
      });

      it('should return a random bigint given a negative bigint minimum and maximum value of 0', () => {
        const options = { min: -100n, max: 0n };
        expect(faker.number.bigInt(options)).toBeGreaterThanOrEqual(
          options.min
        );
        expect(faker.number.bigInt(options)).toBeLessThanOrEqual(options.max);
      });

      it('should return a random bigint between a range', () => {
        const options = { min: 22, max: 33 };
        const randomBigInt = faker.number.bigInt(options);
        expect(randomBigInt).toBeGreaterThanOrEqual(options.min);
        expect(randomBigInt).toBeLessThanOrEqual(options.max);
      });

      it('should succeed with success-rate', () => {
        const min = 0n;
        const max = 1000000000000n;
        const randomBigInt = faker.number.bigInt({ min, max });
        expect(randomBigInt).toBeGreaterThanOrEqual(min);
        expect(randomBigInt).toBeLessThanOrEqual(max);
      });

      it('should not mutate the input object', () => {
        const initialMin = 1n;
        const initialOtherProperty = 'hello darkness my old friend';
        const input: {
          min?: bigint;
          max?: bigint;
          otherProperty: string;
        } = Object.freeze({
          min: initialMin,
          otherProperty: initialOtherProperty,
        });

        expect(() => faker.number.bigInt(input)).not.toThrow();
      });

      it('should throw when min bigger max', () => {
        const min = 10000n;
        const max = 999n;

        expect(() => {
          faker.number.bigInt({ min, max });
        }).toThrowError(
          new FakerError(`Max ${max} should be larger then min ${min}.`)
        );
      });
    });

    describe('float', () => {
      it('should return a random float with a default precision value (0.01)', () => {
        const number = faker.number.float();
        expect(number).toBe(Number(number.toFixed(2)));
      });

      it('should return a random float given a precision value', () => {
        const number = faker.number.float(3);
        expect(number).toBe(Number(number.toFixed(3)));
      });

      it('should return a random number given a maximum value as Object', () => {
        const options = { max: 10 };
        const float = faker.number.float(options);
        expect(float).toBeGreaterThanOrEqual(0);
        expect(float).toBeLessThanOrEqual(options.max);
      });

      it('should return 0 given a maximum value of 0', () => {
        const options = { max: 0 };
        expect(faker.number.float(options)).toBe(0);
      });

      it('should return a random number given a negative number minimum and maximum value of 0', () => {
        const options = { min: -100, max: 0 };
        const float = faker.number.float(options);
        expect(float).toBeGreaterThanOrEqual(options.min);
        expect(float).toBeLessThanOrEqual(options.max);
      });

      it('should return a random number between a range', () => {
        const options = { min: 22, max: 33 };
        for (let i = 0; i < 5; i++) {
          const randomNumber = faker.number.float(options);
          expect(randomNumber).toBeGreaterThanOrEqual(options.min);
          expect(randomNumber).toBeLessThanOrEqual(options.max);
        }
      });

      it('provides numbers with a with exact precision', () => {
        const options = { min: 0.5, max: 0.99, precision: 2 };
        for (let i = 0; i < 100; i++) {
          const number = faker.number.float(options);
          expect(number).toBe(Number(number.toFixed(2)));
        }
      });

      it('should not modify the input object', () => {
        const min = 1;
        const max = 2;
        const opts = { min, max };

        faker.number.float(opts);

        expect(opts.min).toBe(min);
        expect(opts.max).toBe(max);
      });
    });
  });
});
