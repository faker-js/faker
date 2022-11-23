import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { seededTests } from './support/seededRuns';

describe('number', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'number', (t) => {
    t.describeEach(
      'int',
      'hex'
    )((t) => {
      t.it('noArgs')
        .it('with value', 1)
        .it('with options', { min: 0, max: 10 });
    });

    t.describe('float', (t) => {
      t.it('with plain number', 6)
        .it('with min', { min: -42 })
        .it('with max', { max: 69 })
        .it('with min and max', { min: -42, max: 69 })
        .it('with min, max and precision', { min: -42, max: 69, precision: 4 });
    });

    t.describe('bigInt', (t) => {
      t.it('noArgs')
        .it('with number value', 42)
        .it('with string value', '69')
        .it('with boolean value', true)
        .it('with bigint value', 123n)
        .it('with options', { min: -42, max: 69 })
        .it('with big options', {
          min: 6135715171537515454317351n,
          max: 32465761264574654845432354n,
        });
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    describe('int', () => {
      it('should return a random number given a maximum value as Number', () => {
        const actual = faker.number.int(10);

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThanOrEqual(10);
      });

      it('should return a random number given a maximum value as Object', () => {
        const actual = faker.number.int({ max: 10 });

        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThanOrEqual(10);
      });

      it('should return a random number given a maximum value of 0', () => {
        const actual = faker.number.int({ max: 0 });

        expect(actual).toBe(0);
      });

      it('should return a random number given a negative number minimum and maximum value of 0', () => {
        const actual = faker.number.int({ min: -100, max: 0 });

        expect(actual).toBeGreaterThanOrEqual(-100);
        expect(actual).toBeLessThanOrEqual(0);
      });

      it('should return a random number between a range', () => {
        for (let i = 0; i < 100; i++) {
          const actual = faker.number.int({ min: 22, max: 33 });
          expect(actual).toBeGreaterThanOrEqual(22);
          expect(actual).toBeLessThanOrEqual(33);
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
        const input: {
          min?: number;
          max?: number;
          precision?: number;
          otherProperty: string;
        } = Object.freeze({
          min: 1,
          precision: 1,
          otherProperty: 'hello darkness my old friend',
        });

        expect(() => faker.number.int(input)).not.toThrow();
      });

      it('should throw when min > max', () => {
        const min = 10;
        const max = 9;

        expect(() => {
          faker.number.int({ min, max });
        }).toThrowError(`Max ${max} should be greater than min ${min}.`);
      });
    });

    describe('float', () => {
      it('should return a random float with a default precision of 2 digits after floating point', () => {
        const number = faker.number.float();
        expect(number).toBe(Number(number.toFixed(2)));
      });

      it('should return a random float given a precision value', () => {
        const number = faker.number.float(3);
        expect(number).toBe(Number(number.toFixed(3)));
      });

      it('should return a random number given a max value of 10', () => {
        const float = faker.number.float({ max: 10 });
        expect(float).toBeGreaterThanOrEqual(0);
        expect(float).toBeLessThanOrEqual(10);
      });

      it('should return 0 given a max value of 0', () => {
        expect(faker.number.float({ max: 0 })).toBe(0);
      });

      it('should return a random number given a negative number min and max value of 0', () => {
        const float = faker.number.float({ min: -100, max: 0 });
        expect(float).toBeGreaterThanOrEqual(-100);
        expect(float).toBeLessThanOrEqual(0);
      });

      it('should return a random number between a range', () => {
        for (let i = 0; i < 5; i++) {
          const randomNumber = faker.number.float({ min: 22, max: 33 });
          expect(randomNumber).toBeGreaterThanOrEqual(22);
          expect(randomNumber).toBeLessThanOrEqual(33);
        }
      });

      it('provides numbers with a given precision', () => {
        const results = Array.from(
          new Set(
            Array.from({ length: 50 }, () =>
              faker.number.float({
                min: 0,
                max: 1.5,
                // TODO @Shinigami92 2022-11-23: Which precision should be used to get only values with 0.0, 0.5, 1.0 and 1.5?
                precision: 0.5,
              })
            )
          )
        ).sort();

        expect(results).toEqual([0, 0.5, 1, 1.5]);
      });

      it('provides numbers with an exact precision', () => {
        for (let i = 0; i < 100; i++) {
          const number = faker.number.float({
            min: 0.5,
            max: 0.99,
            precision: 2,
          });
          expect(number).toBe(Number(number.toFixed(2)));
        }
      });

      it('should not modify the input object', () => {
        expect(() =>
          faker.number.float(Object.freeze({ min: 1, max: 2 }))
        ).not.toThrow();
      });

      it('should throw when min > max', () => {
        const min = 10;
        const max = 9;

        expect(() => {
          faker.number.float({ min, max });
        }).toThrowError(`Max ${max} should be greater than min ${min}.`);
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
        const hex = faker.number.hex({ min: 15, max: 255 });

        const hexNum = parseInt(hex, 16);
        expect(hexNum).toBeLessThanOrEqual(255);
        expect(hexNum).greaterThanOrEqual(15);
      });

      it('should throw when min > max', () => {
        const min = 10;
        const max = 9;

        expect(() => {
          faker.number.hex({ min, max });
        }).toThrowError(`Max ${max} should be greater than min ${min}.`);
      });
    });

    describe('bigInt', () => {
      it('should generate a bigInt value', () => {
        const generateBigInt = faker.number.bigInt();
        expect(generateBigInt).toBeTypeOf('bigint');
      });

      it('should generate a big bigInt value with low delta', () => {
        const generateBigInt = faker.number.bigInt({
          min: 999999999n,
          max: 1000000000n,
        });
        expect(generateBigInt).toBeTypeOf('bigint');
        expect(generateBigInt).toBeGreaterThanOrEqual(999999999n);
        expect(generateBigInt).toBeLessThanOrEqual(1000000000n);
      });

      it('should return a random bigint given a maximum value as BigInt', () => {
        expect(faker.number.bigInt(10n)).toBeGreaterThanOrEqual(0n);
        expect(faker.number.bigInt(10n)).toBeLessThanOrEqual(10n);
      });

      it('should return a random bigint given a maximum value as Object', () => {
        expect(faker.number.bigInt({ max: 10n })).toBeGreaterThanOrEqual(0n);
        expect(faker.number.bigInt({ max: 10n })).toBeLessThanOrEqual(10n);
      });

      it('should return a random bigint given a maximum value of 0', () => {
        expect(faker.number.bigInt({ max: 0n })).toBe(0n);
      });

      it('should return a random bigint given a negative bigint minimum and maximum value of 0', () => {
        expect(
          faker.number.bigInt({ min: -100n, max: 0n })
        ).toBeGreaterThanOrEqual(-100n);
        expect(
          faker.number.bigInt({ min: -100n, max: 0n })
        ).toBeLessThanOrEqual(0n);
      });

      it('should return a random bigint between a range', () => {
        const randomBigInt = faker.number.bigInt({ min: 22, max: 33 });
        expect(randomBigInt).toBeGreaterThanOrEqual(22);
        expect(randomBigInt).toBeLessThanOrEqual(33);
      });

      it('should succeed with success-rate', () => {
        const randomBigInt = faker.number.bigInt({
          min: 0n,
          max: 1000000000000n,
        });
        expect(randomBigInt).toBeGreaterThanOrEqual(0n);
        expect(randomBigInt).toBeLessThanOrEqual(1000000000000n);
      });

      it('should not mutate the input object', () => {
        const input: {
          min?: bigint;
          max?: bigint;
          otherProperty: string;
        } = Object.freeze({
          min: 1n,
          otherProperty: 'hello darkness my old friend',
        });

        expect(() => faker.number.bigInt(input)).not.toThrow();
      });

      it('should throw when min > max', () => {
        const min = 10000n;
        const max = 999n;

        expect(() => {
          faker.number.bigInt({ min, max });
        }).toThrowError(
          new FakerError(`Max ${max} should be larger then min ${min}.`)
        );
      });
    });
  });
});
