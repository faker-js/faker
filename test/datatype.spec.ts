import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import type { Datatype } from '../src/modules/datatype';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

const functionNames: (keyof Datatype)[] = [
  'number',
  'float',
  'datetime',
  'string',
  'uuid',
  'boolean',
  'json',
  'array',
];

describe('datatype', () => {
  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.datatype[functionName]();
          expect(actual).toMatchSnapshot();
        });
      }

      describe('number', () => {
        it('should return a deterministic value for given number', () => {
          faker.seed(seed);

          for (let i = 0; i < 5; i++) {
            const actual = faker.datatype.number(6);
            expect(actual).toMatchSnapshot();
          }
        });

        it('should return a deterministic value for given min', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ min: -42 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given min and max', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ min: -42, max: 69 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given max', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ max: 69 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given min, max and precision', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({
            min: -42,
            max: 69,
            precision: 0.01,
          });
          expect(actual).toMatchSnapshot();
        });

        it('should throw when min > max', () => {
          const min = 10;
          const max = 9;

          faker.seed(seed);

          expect(() => {
            faker.datatype.number({ min, max });
          }).toThrowError(`Max ${max} should be greater than min ${min}.`);
        });
      });

      describe('float', () => {
        it('should return a deterministic value for given number', () => {
          faker.seed(seed);

          for (let i = 0; i < 5; i++) {
            const actual = faker.datatype.float(6);
            expect(actual).toMatchSnapshot();
          }
        });

        it('should return a deterministic value for given min', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ min: -42 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given min and max', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ min: -42, max: 69 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given max', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ max: 69 });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic value for given min, max and precision', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({
            min: -42,
            max: 69,
            precision: 0.0001,
          });
          expect(actual).toMatchSnapshot();
        });
      });

      describe('datetime', () => {
        it('should return a deterministic date when given a number', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime(
            Date.parse('2001-04-03T23:21:10.773Z')
          );
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic date when given a min date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            min: Date.parse('1622-05-23T13:45:08.843Z'),
          });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic date when given a max date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            max: Date.parse('2002-01-29T19:47:52.605Z'),
          });
          expect(actual).toMatchSnapshot();
        });

        it('should return a deterministic date when given a min and max date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            min: Date.parse('1622-05-23T13:45:08.843Z'),
            max: Date.parse('1802-01-29T19:47:52.605Z'),
          });
          expect(actual).toMatchSnapshot();
        });
      });

      describe('string', () => {
        it('should return a deterministic string of given length', () => {
          faker.seed(seed);

          const actual = faker.datatype.string(42);
          expect(actual).toMatchSnapshot();
        });
      });

      describe('array', () => {
        it('should return a deterministic array of given length', () => {
          faker.seed(seed);

          const actual = faker.datatype.array(4);
          expect(actual).toMatchSnapshot();
        });
      });
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('number', () => {
        it('should return a random number given a maximum value as Number', () => {
          const max = 10;

          const actual = faker.datatype.number(max);

          expect(actual).toBeGreaterThanOrEqual(0);
          expect(actual).toBeLessThanOrEqual(max);
        });

        it('should return a random number given a maximum value as Object', () => {
          const options = { max: 10 };

          const actual = faker.datatype.number(options);

          expect(actual).toBeGreaterThanOrEqual(0);
          expect(actual).toBeLessThanOrEqual(options.max);
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };

          const actual = faker.datatype.number(options);

          expect(actual).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };

          const actual = faker.datatype.number(options);

          expect(actual).toBeGreaterThanOrEqual(options.min);
          expect(actual).toBeLessThanOrEqual(options.max);
        });

        it('should return a random number between a range', () => {
          const options = { min: 22, max: 33 };
          for (let i = 0; i < 100; i++) {
            const actual = faker.datatype.number(options);
            expect(actual).toBeGreaterThanOrEqual(options.min);
            expect(actual).toBeLessThanOrEqual(options.max);
          }
        });

        it('should return inclusive negative max value', () => {
          let foundNegative4 = false;
          let foundNegative5 = false;

          for (let iter = 0; iter < 1000; iter++) {
            const actual = faker.datatype.number({ min: -5, max: -4 });

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

        it('provides numbers with a given precision', () => {
          const options = { min: 0, max: 1.5, precision: 0.5 };
          const results = Array.from(
            new Set(
              Array.from({ length: 50 }, () => faker.datatype.number(options))
            )
          ).sort();

          expect(results).toContain(0.5);
          expect(results).toContain(1.0);

          expect(results[0]).toBe(0);
          expect(results[results.length - 1]).toBe(1.5);
        });

        it('provides numbers with a with exact precision', () => {
          const options = { min: 0.5, max: 0.99, precision: 0.01 };
          for (let i = 0; i < 100; i++) {
            const actual = faker.datatype.number(options);
            expect(actual).toBe(Number(actual.toFixed(2)));
          }
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

          expect(() => faker.datatype.number(input)).not.toThrow();
        });
      });

      describe('float', () => {
        it('should return a random float with a default precision value (0.01)', () => {
          const number = faker.datatype.float();
          expect(number).toBe(Number(number.toFixed(2)));
        });

        it('should return a random float given a precision value', () => {
          const number = faker.datatype.float(0.001);
          expect(number).toBe(Number(number.toFixed(3)));
        });

        it('should return a random number given a maximum value as Object', () => {
          const options = { max: 10 };
          expect(faker.datatype.float(options)).toBeGreaterThanOrEqual(0);
          expect(faker.datatype.float(options)).toBeLessThanOrEqual(
            options.max
          );
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };
          expect(faker.datatype.float(options)).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };
          expect(faker.datatype.float(options)).toBeGreaterThanOrEqual(
            options.min
          );
          expect(faker.datatype.float(options)).toBeLessThanOrEqual(
            options.max
          );
        });

        it('should return a random number between a range', () => {
          const options = { min: 22, max: 33 };
          for (let i = 0; i < 5; i++) {
            const randomNumber = faker.datatype.float(options);
            expect(randomNumber).toBeGreaterThanOrEqual(options.min);
            expect(randomNumber).toBeLessThanOrEqual(options.max);
          }
        });

        it('provides numbers with a given precision', () => {
          const options = { min: 0, max: 1.5, precision: 0.5 };
          const results = Array.from(
            new Set(
              Array.from({ length: 50 }, () => faker.datatype.float(options))
            )
          ).sort();

          expect(results).toContain(0.5);
          expect(results).toContain(1.0);

          expect(results[0]).toBe(0);
          expect(results[results.length - 1]).toBe(1.5);
        });

        it('provides numbers with a with exact precision', () => {
          const options = { min: 0.5, max: 0.99, precision: 0.01 };
          for (let i = 0; i < 100; i++) {
            const number = faker.datatype.float(options);
            expect(number).toBe(Number(number.toFixed(2)));
          }
        });

        it('should not modify the input object', () => {
          const min = 1;
          const max = 2;
          const opts = { min, max };

          faker.datatype.float(opts);

          expect(opts.min).toBe(min);
          expect(opts.max).toBe(max);
        });
      });

      describe('datetime', () => {
        it('check validity of date and if returned value is created by Date()', () => {
          const date = faker.datatype.datetime();
          expect(date).toBeTypeOf('object');
          expect(date.getTime()).not.toBeNaN();
          expect(Object.prototype.toString.call(date)).toBe('[object Date]');
        });
      });

      describe('string', () => {
        it('should generate a string value', () => {
          const generatedString = faker.datatype.string();
          expect(generatedString).toBeTypeOf('string');
          expect(generatedString).toHaveLength(10);
        });

        it('should return empty string if negative length is passed', () => {
          const negativeValue = faker.datatype.number({ min: -1000, max: -1 });
          const generatedString = faker.datatype.string(negativeValue);
          expect(generatedString).toBe('');
          expect(generatedString).toHaveLength(0);
        });

        it('should return string with length of 2^20 if bigger length value is passed', () => {
          const overMaxValue = Math.pow(2, 28);
          const generatedString = faker.datatype.string(overMaxValue);
          expect(generatedString).toHaveLength(Math.pow(2, 20));
        });
      });

      describe('boolean', () => {
        it('generates a boolean value', () => {
          const bool = faker.datatype.boolean();
          expect(bool).toBeTypeOf('boolean');
        });
      });

      describe('UUID', () => {
        it('generates a valid UUID', () => {
          const UUID = faker.datatype.uuid();
          const RFC4122 =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
          expect(UUID).toMatch(RFC4122);
        });
      });

      describe('json', () => {
        it('generates a valid json object', () => {
          const jsonObject = faker.datatype.json();
          expect(jsonObject).toBeTypeOf('string');
          expect(JSON.parse(jsonObject)).toBeTruthy();
        });
      });

      describe('array', () => {
        it('generates an array with passed size', () => {
          const randomSize = faker.datatype.number();
          const generatedArray = faker.datatype.array(randomSize);
          expect(generatedArray).toHaveLength(randomSize);
        });

        it('generates an array with 1 element', () => {
          const generatedArray = faker.datatype.array(1);
          expect(generatedArray).toHaveLength(1);
        });
      });
    }
  });
});
