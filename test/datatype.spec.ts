import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('datatype', () => {
  seededTests(faker, 'datatype', (t) => {
    t.describe('number', (t) => {
      t.it('noArgs')
        .itRepeated('repeated', 5, 6)
        .it('with min', { min: -42 })
        .it('with max', { max: 69 })
        .it('with min and max', {
          min: -42,
          max: 69,
        })
        .it('with min, max and precision', {
          min: -42,
          max: 69,
          precision: 0.01,
        });
    });

    t.describe('float', (t) => {
      t.it('noArgs')
        .itRepeated('repeated', 6)
        .it('with min', { min: -42 })
        .it('with max', { max: 69 })
        .it('with min and max', { min: -42, max: 69 })
        .it('with min, max and precision', {
          min: -42,
          max: 69,
          precision: 0.0001,
        });
    });

    t.describe('datetime', (t) => {
      t.it('noArgs')
        .it('with given number', Date.parse('2001-04-03T23:21:10.773Z'))
        .it('with min', {
          min: Date.parse('1622-05-23T13:45:08.843Z'),
        })
        .it('with max', {
          max: Date.parse('2002-01-29T19:47:52.605Z'),
        })
        .it('with min and max', {
          min: Date.parse('1622-05-23T13:45:08.843Z'),
          max: Date.parse('1802-01-29T19:47:52.605Z'),
        });
    });

    t.describe('string', (t) => {
      t.it('noArgs').it('with length', 42);
    });

    t.itRepeated('uuid', 5);

    t.describe('boolean', (t) => {
      t.itRepeated('noArgs', 5)
        .it('with probability', 0.42)
        .it('with probability option', { probability: 0.13 });
    });

    t.describe('hexadecimal', (t) => {
      t.it('noArgs')
        .it('with length', { length: 42 })
        .it('with prefix', { prefix: '0x' })
        .it('with casing', { case: 'lower' })
        .it('with length, prefix, and casing', {
          length: 20,
          prefix: '0x',
          case: 'lower',
        });
    });

    t.it('json');

    t.describe('array', (t) => {
      t.it('noArgs')
        .it('with length', 4)
        .it('with length range', { min: 3, max: 5 });
    });

    t.describe('bigInt', (t) => {
      t.it('noArgs').it('with value', 42);
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
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

        it('provides numbers with a given precision of 0.5 steps', () => {
          const results = Array.from(
            new Set(
              Array.from({ length: 50 }, () =>
                faker.datatype.float({
                  min: 0,
                  max: 1.5,
                  precision: 0.5,
                })
              )
            )
          ).sort();

          expect(results).toEqual([0, 0.5, 1, 1.5]);
        });

        // TODO @Shinigami92 2022-11-24: https://github.com/faker-js/faker/issues/1595
        it.todo('provides numbers with a given precision of 0.4 steps', () => {
          const results = Array.from(
            new Set(
              Array.from({ length: 50 }, () =>
                faker.datatype.float({
                  min: 0,
                  max: 1.9,
                  precision: 0.4,
                })
              )
            )
          ).sort();

          expect(results).toEqual([0, 0.4, 0.8, 1.2, 1.6]);
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

        it('should throw when min > max', () => {
          const min = 10;
          const max = 9;

          expect(() => {
            faker.datatype.number({ min, max });
          }).toThrowError(`Max ${max} should be greater than min ${min}.`);
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

          expect(results).toEqual([0, 0.5, 1, 1.5]);
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

        it('generates false for probability = 0', () => {
          const bool = faker.datatype.boolean(0);
          expect(bool).toBe(false);
        });

        it('generates true for probability = 1', () => {
          const bool = faker.datatype.boolean(1);
          expect(bool).toBe(true);
        });

        it.each([-5, 0.42, 5])(
          'generates a boolean value with given probability',
          (probability) => {
            const bool = faker.datatype.boolean(probability);
            expect(bool).toBeTypeOf('boolean');
          }
        );

        it('generates a boolean value for empty options', () => {
          const bool = faker.datatype.boolean({});
          expect(bool).toBeTypeOf('boolean');
        });

        it('generates false for { probability: 0 }', () => {
          const bool = faker.datatype.boolean({ probability: 0 });
          expect(bool).toBe(false);
        });

        it('generates true for { probability: 1 }', () => {
          const bool = faker.datatype.boolean({ probability: 1 });
          expect(bool).toBe(true);
        });

        it.each([-5, 0.42, 5])(
          'generates a boolean value with given probability option',
          (probability) => {
            const bool = faker.datatype.boolean({ probability });
            expect(bool).toBeTypeOf('boolean');
          }
        );

        it('should not mutate the input object', () => {
          const filledOptions: { probability?: number } = Object.freeze({
            probability: 1,
          });
          expect(() => faker.datatype.boolean(filledOptions)).not.toThrow();

          const emptyOptions: { probability?: number } = Object.freeze({});
          expect(() => faker.datatype.boolean(emptyOptions)).not.toThrow();
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

      describe('hexadecimal', () => {
        it('generates single hex character when no additional argument was provided', () => {
          const hex = faker.datatype.hexadecimal();
          expect(hex).toMatch(/^(0x)[0-9a-f]{1}$/i);
          expect(hex.substring(2)).toHaveLength(1);
        });

        it('generates a hex string with a provided prefix', () => {
          const hex = faker.datatype.hexadecimal({ prefix: '0x' });
          expect(hex).toMatch(/^(0x)[0-9A-F]+$/i);
          expect(hex).toHaveLength(3);
        });

        it('generates a random hex string with a provided length', () => {
          const hex = faker.datatype.hexadecimal({ length: 5 });
          expect(hex).toMatch(/^(0x)[0-9a-f]+$/i);
          expect(hex.substring(2)).toHaveLength(5);
        });

        it('generates a hex string with a provided casing', () => {
          const hex = faker.datatype.hexadecimal({ case: 'lower' });
          expect(hex).toMatch(/^(0x)[0-9a-f]+$/i);
          expect(hex.substring(2)).toHaveLength(1);
        });

        it('generates a hex string with a provided prefix, length, and casing', () => {
          const hex = faker.datatype.hexadecimal({
            prefix: '0x',
            length: 7,
            case: 'upper',
          });
          expect(hex).toMatch(/^(0x)[0-9A-F]+$/i);
          expect(hex.substring(2)).toHaveLength(7);
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

        it('generates an array with 0 element', () => {
          const generatedArray = faker.datatype.array(0);
          expect(generatedArray).toHaveLength(0);
        });

        it('generates an array with 1 element', () => {
          const generatedArray = faker.datatype.array(1);
          expect(generatedArray).toHaveLength(1);
        });

        it('generates an array with length range', () => {
          const generatedArray = faker.datatype.array({ min: 1, max: 5 });
          expect(generatedArray.length).toBeGreaterThanOrEqual(1);
          expect(generatedArray.length).toBeLessThanOrEqual(5);
        });
      });

      describe('bigInt', () => {
        it('should generate a bigInt value', () => {
          const generateBigInt = faker.datatype.bigInt();
          expect(generateBigInt).toBeTypeOf('bigint');
        });

        it('should generate a big bigInt value with low delta', () => {
          const min = 999999999n;
          const max = 1000000000n;
          const generateBigInt = faker.datatype.bigInt({ min, max });
          expect(generateBigInt).toBeTypeOf('bigint');
          expect(generateBigInt).toBeGreaterThanOrEqual(min);
          expect(generateBigInt).toBeLessThanOrEqual(max);
        });

        it('should return a random bigint given a maximum value as BigInt', () => {
          const max = 10n;
          expect(faker.datatype.bigInt(max)).toBeGreaterThanOrEqual(0n);
          expect(faker.datatype.bigInt(max)).toBeLessThanOrEqual(max);
        });

        it('should return a random bigint given a maximum value as Object', () => {
          const options = { max: 10n };
          expect(faker.datatype.bigInt(options)).toBeGreaterThanOrEqual(0n);
          expect(faker.datatype.bigInt(options)).toBeLessThanOrEqual(
            options.max
          );
        });

        it('should return a random bigint given a maximum value of 0', () => {
          const options = { max: 0n };
          expect(faker.datatype.bigInt(options)).toBe(0n);
        });

        it('should return a random bigint given a negative bigint minimum and maximum value of 0', () => {
          const options = { min: -100n, max: 0n };
          expect(faker.datatype.bigInt(options)).toBeGreaterThanOrEqual(
            options.min
          );
          expect(faker.datatype.bigInt(options)).toBeLessThanOrEqual(
            options.max
          );
        });

        it('should return a random bigint between a range', () => {
          const options = { min: 22, max: 33 };

          for (let i = 0; i < 100; i++) {
            const randomBigInt = faker.datatype.bigInt(options);
            expect(randomBigInt).toBeGreaterThanOrEqual(options.min);
            expect(randomBigInt).toBeLessThanOrEqual(options.max);
          }
        });

        it('should succeed with success-rate', () => {
          const min = 0n;
          const max = 1000000000000n;
          const randomBigInt = faker.datatype.bigInt({ min, max });
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

          expect(() => faker.datatype.bigInt(input)).not.toThrow();
        });
      });
    }
  });
});
