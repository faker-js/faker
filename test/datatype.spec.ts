import { describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      number: {
        noArgs: 37454,
        numbers: [2, 5, 6, 1, 5],
        withMin: 37427,
        withMinAndMax: -1,
        withMax: 26,
        withMinAndMaxAndPrecision: -0.43,
      },
      float: {
        noArgs: 37453.64,
        numbers: [37452, 79656, 95076, 18342, 73200],
        withMin: 37427.37,
        withMinAndMax: -0.43,
        withMax: 25.84,
        withMinAndMaxAndPrecision: -0.4261,
      },
      datetime: {
        noArgs: new Date('2031-03-14T21:33:22.114Z'),
        number: new Date('1994-03-20T17:23:00.629Z'),
        withMin: new Date('1801-04-11T15:13:06.330Z'),
        withMax: new Date('1994-07-11T09:43:47.230Z'),
        withMinMax: new Date('1689-09-09T08:39:09.444Z'),
      },
      string: {
        noArgs: 'Cky2eiXX/J',
        length: 'Cky2eiXX/J/*&Kq@X.b]"&{dnx4!1}2Z=YQ!I#<QYF',
      },
      uuid: {
        noArgs: '5cf2bc99-2721-407d-992b-a00fbdf302f2',
      },
      boolean: {
        noArgs: false,
      },
      hexaDecimal: {
        noArgs: '0x8',
        length: '0x8BE4ABdd39321aD7d3fe01FfCE404F4d6db0906bd8',
      },
      json: {
        noArgs: JSON.stringify({
          foo: 79654,
          bar: '2eiXX/J/*&',
          bike: 86617,
          a: 60111,
          b: 70807,
          name: '"&{dnx4!1}',
          prop: 61748,
        }),
      },
      array: {
        noArgs: [
          79654,
          '2eiXX/J/*&',
          86617,
          60111,
          70807,
          '"&{dnx4!1}',
          61748,
          61165,
          '!I#<QYF-%<',
          'C6K)jZ3DP|',
        ],
        length: [79654, '2eiXX/J/*&', 86617, 60111],
      },
      bigInt: {
        noArgs: 3745409999962546n,
        value: 42n,
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      number: {
        noArgs: 26202,
        numbers: [1, 3, 1, 1, 1],
        withMin: 26171,
        withMinAndMax: -13,
        withMax: 18,
        withMinAndMaxAndPrecision: -12.92,
      },
      float: {
        noArgs: 26202.2,
        numbers: [26202, 56052, 15864, 21258, 27810],
        withMin: 26171.21,
        withMinAndMax: -12.92,
        withMax: 18.08,
        withMinAndMaxAndPrecision: -12.9153,
      },
      datetime: {
        noArgs: new Date('2018-10-28T08:46:11.896Z'),
        number: new Date('1992-12-13T04:13:59.232Z'),
        withMin: new Date('1747-07-16T01:19:54.159Z'),
        withMax: new Date('1993-03-02T00:10:04.335Z'),
        withMinMax: new Date('1669-06-22T01:21:21.236Z'),
      },
      string: {
        noArgs: '9U/4:SK$>6',
        length: '9U/4:SK$>6QX9@{:e=+kD)[B,e|/Jqjjj!BLGDWQgC',
      },
      uuid: {
        noArgs: '48234870-5389-445f-8b41-c61a52bf27dc',
      },
      boolean: {
        noArgs: false,
      },
      hexaDecimal: {
        noArgs: '0x5',
        length: '0x5c346ba075bd57F5A62B82d72AF39CBBB07a98cbA8',
      },
      json: {
        noArgs: JSON.stringify({
          foo: 56052,
          bar: 21258,
          bike: 54308,
          a: 3397,
          b: 23538,
          name: 'X9@{:e=+kD',
          prop: 62850,
        }),
      },
      array: {
        noArgs: [
          56052,
          21258,
          54308,
          3397,
          23538,
          'X9@{:e=+kD',
          62850,
          12505,
          '|/Jqjjj!BL',
          38106,
        ],
        length: [56052, 21258, 54308, 3397],
      },
      bigInt: {
        noArgs: 2620209999973798n,
        value: 42n,
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      number: {
        noArgs: 92852,
        numbers: [6, 3, 6, 5, 1],
        withMin: 92849,
        withMinAndMax: 61,
        withMax: 64,
        withMinAndMaxAndPrecision: 61.07,
      },
      float: {
        noArgs: 92851.09,
        numbers: [92856, 45900, 89346, 77826, 22554],
        withMin: 92848.09,
        withMinAndMax: 61.07,
        withMax: 64.07,
        withMinAndMaxAndPrecision: 61.0658,
      },
      datetime: {
        noArgs: new Date('2092-02-20T03:42:04.341Z'),
        number: new Date('2000-06-14T02:54:42.082Z'),
        withMin: new Date('2065-11-10T19:27:20.915Z'),
        withMax: new Date('2001-03-20T11:14:25.251Z'),
        withMinMax: new Date('1789-03-26T15:44:45.218Z'),
      },
      string: {
        noArgs: 'wKti5-}$_/',
        length: 'wKti5-}$_/`4hHA0afl"h^]dnwI<q|p|5KWu3/CZ|J',
      },
      uuid: {
        noArgs: 'e7ec32f0-a2a3-4c65-abbd-0caabde64dfd',
      },
      boolean: {
        noArgs: true,
      },
      hexaDecimal: {
        noArgs: '0xE',
        length: '0xEaDB42F0e3f4A973fAB0AeefCE96DFCF49cD438dF9',
      },
      json: {
        noArgs: JSON.stringify({
          foo: 'Kti5-}$_/`',
          bar: 76408,
          bike: 35403,
          a: 69406,
          b: 'l"h^]dnwI<',
          name: '|p|5KWu3/C',
          prop: '|Jh!E=x"RH',
        }),
      },
      array: {
        noArgs: [
          'Kti5-}$_/`',
          76408,
          35403,
          69406,
          'l"h^]dnwI<',
          '|p|5KWu3/C',
          '|Jh!E=x"RH',
          '/5V<1bEQuA',
          'p=DW9F=V1(',
          '7a6.$boN\\7',
        ],
        length: ['Kti5-}$_/`', 76408, 35403, 69406],
      },
      bigInt: {
        noArgs: 9285209999907148n,
        value: 42n,
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 25;

const functionNames = [
  'number',
  'float',
  'datetime',
  'string',
  'uuid',
  'boolean',
  'hexaDecimal',
  'json',
  'array',
  'bigInt',
];

describe('datatype', () => {
  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.datatype[functionName]();
          expect(actual).toEqual(expectations[functionName].noArgs);
        });
      }

      describe('number', () => {
        it('should return a deterministic value for given number', () => {
          faker.seed(seed);

          for (const num of expectations.number.numbers) {
            const actual = faker.datatype.number(6);
            expect(actual).toEqual(num);
          }
        });

        it('should return a deterministic value for given min', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ min: -42 });
          expect(actual).toEqual(expectations.number.withMin);
        });

        it('should return a deterministic value for given min and max', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ min: -42, max: 69 });
          expect(actual).toEqual(expectations.number.withMinAndMax);
        });

        it('should return a deterministic value for given max', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({ max: 69 });
          expect(actual).toEqual(expectations.number.withMax);
        });

        it('should return a deterministic value for given min, max and precision', () => {
          faker.seed(seed);

          const actual = faker.datatype.number({
            min: -42,
            max: 69,
            precision: 0.01,
          });
          expect(actual).toEqual(expectations.number.withMinAndMaxAndPrecision);
        });
      });

      describe('float', () => {
        it('should return a deterministic value for given number', () => {
          faker.seed(seed);

          for (const num of expectations.float.numbers) {
            const actual = faker.datatype.float(6);
            expect(actual).toEqual(num);
          }
        });

        it('should return a deterministic value for given min', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ min: -42 });
          expect(actual).toEqual(expectations.float.withMin);
        });

        it('should return a deterministic value for given min and max', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ min: -42, max: 69 });
          expect(actual).toEqual(expectations.float.withMinAndMax);
        });

        it('should return a deterministic value for given max', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({ max: 69 });
          expect(actual).toEqual(expectations.float.withMax);
        });

        it('should return a deterministic value for given min, max and precision', () => {
          faker.seed(seed);

          const actual = faker.datatype.float({
            min: -42,
            max: 69,
            precision: 0.0001,
          });
          expect(actual).toEqual(expectations.float.withMinAndMaxAndPrecision);
        });
      });

      describe('datetime', () => {
        it('should return a deterministic date when given a number', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime(
            Date.parse('2001-04-03T23:21:10.773Z')
          );
          expect(actual).toEqual(expectations.datetime.number);
        });

        it('should return a deterministic date when given a min date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            min: Date.parse('1622-05-23T13:45:08.843Z'),
          });
          expect(actual).toEqual(expectations.datetime.withMin);
        });

        it('should return a deterministic date when given a max date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            max: Date.parse('2002-01-29T19:47:52.605Z'),
          });
          expect(actual).toEqual(expectations.datetime.withMax);
        });

        it('should return a deterministic date when given a min and max date', () => {
          faker.seed(seed);

          const actual = faker.datatype.datetime({
            min: Date.parse('1622-05-23T13:45:08.843Z'),
            max: Date.parse('1802-01-29T19:47:52.605Z'),
          });
          expect(actual).toEqual(expectations.datetime.withMinMax);
        });
      });

      describe('string', () => {
        it('should return a deterministic string of given length', () => {
          faker.seed(seed);

          const actual = faker.datatype.string(42);
          expect(actual).toEqual(expectations.string.length);
        });
      });

      describe('hexaDecimal', () => {
        it('should return a deterministic hex of given length', () => {
          faker.seed(seed);

          const actual = faker.datatype.hexaDecimal(42);
          expect(actual).toEqual(expectations.hexaDecimal.length);
        });
      });

      describe('array', () => {
        it('should return a deterministic array of given length', () => {
          faker.seed(seed);

          const actual = faker.datatype.array(4);
          expect(actual).toEqual(expectations.array.length);
        });
      });

      describe('bigInt', () => {
        it('should return a deterministic bigInt of given value', () => {
          faker.seed(seed);

          const actual = faker.datatype.bigInt(42);
          expect(actual).toEqual(expectations.bigInt.value);
        });
      });
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('number', () => {
        it('should return a random number given a maximum value as Number', () => {
          const max = 10;
          expect(faker.datatype.number(max)).greaterThanOrEqual(0);
          expect(faker.datatype.number(max)).lessThanOrEqual(max);
        });

        it('should return a random number given a maximum value as Object', () => {
          const options = { max: 10 };
          expect(faker.datatype.number(options)).greaterThanOrEqual(0);
          expect(faker.datatype.number(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };
          expect(faker.datatype.number(options)).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };
          expect(faker.datatype.number(options)).greaterThanOrEqual(
            options.min
          );
          expect(faker.datatype.number(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number between a range', () => {
          const options = { min: 22, max: 33 };
          for (let i = 0; i < 100; i++) {
            const randomNumber = faker.datatype.number(options);
            expect(randomNumber).greaterThanOrEqual(options.min);
            expect(randomNumber).lessThanOrEqual(options.max);
          }
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
            const number = faker.datatype.number(options);
            expect(number).toBe(Number(number.toFixed(2)));
          }
        });

        it('should not mutate the input object', () => {
          const initalMin = 1;
          const initalPrecision = 1;
          const initalOtherProperty = 'hello darkness my old friend';
          const input: {
            min?: number;
            max?: number;
            precision?: number;
            otherProperty: string;
          } = {
            min: initalMin,
            precision: initalPrecision,
            otherProperty: initalOtherProperty,
          };

          faker.datatype.number(input);

          expect(input.min).toBe(initalMin);
          expect(input.precision).toBe(initalPrecision);
          expect(input.max).toBe(undefined);
          expect(input.otherProperty).toBe(initalOtherProperty);
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
          expect(faker.datatype.float(options)).greaterThanOrEqual(0);
          expect(faker.datatype.float(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };
          expect(faker.datatype.float(options)).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };
          expect(faker.datatype.float(options)).greaterThanOrEqual(options.min);
          expect(faker.datatype.float(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number between a range', () => {
          const options = { min: 22, max: 33 };
          for (let i = 0; i < 5; i++) {
            const randomNumber = faker.datatype.float(options);
            expect(randomNumber).greaterThanOrEqual(options.min);
            expect(randomNumber).lessThanOrEqual(options.max);
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
          expect(UUID).match(RFC4122);
        });
      });

      describe('hexaDecimal', () => {
        it('generates single hex character when no additional argument was provided', () => {
          const hex = faker.datatype.hexaDecimal();
          expect(hex).match(/^(0x)[0-9a-f]{1}$/i);
          expect(hex.substring(2)).toHaveLength(1);
        });

        it('generates a random hex string', () => {
          const hex = faker.datatype.hexaDecimal(5);
          expect(hex).match(/^(0x)[0-9a-f]+$/i);
          expect(hex.substring(2)).toHaveLength(5);
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

      describe('bigInt', () => {
        it('should generate a bigInt value', () => {
          const generateBigInt = faker.datatype.bigInt();
          expect(generateBigInt).toBeTypeOf('bigint');
        });
      });
    }
  });
});
