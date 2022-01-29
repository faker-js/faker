import { describe, expect, it, vi } from 'vitest';
import { faker } from '../dist/cjs';

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
      },
      datetime: {
        // TODO @Shinigami92 2022-01-29: We will fix the deterministic in #343
        noArgs: new Date('2092-03-22T16:55:38.644Z'),
      },
      string: {
        noArgs: 'Cky2eiXX/J',
      },
      uuid: {
        noArgs: '5cf2bc99-2721-407d-992b-a00fbdf302f2',
      },
      boolean: {
        noArgs: false,
      },
      hexaDecimal: {
        noArgs: '0x8',
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
      },
      bigInt: {
        noArgs: 3745409999962546n,
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
      },
      datetime: {
        // TODO @Shinigami92 2022-01-29: We will fix the deterministic in #343
        noArgs: new Date('2092-03-22T16:55:38.644Z'),
      },
      string: {
        noArgs: '9U/4:SK$>6',
      },
      uuid: {
        noArgs: '48234870-5389-445f-8b41-c61a52bf27dc',
      },
      boolean: {
        noArgs: false,
      },
      hexaDecimal: {
        noArgs: '0x5',
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
      },
      bigInt: {
        noArgs: 2620209999973798n,
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
      },
      datetime: {
        // TODO @Shinigami92 2022-01-29: We will fix the deterministic in #343
        noArgs: new Date('2092-03-22T16:55:38.644Z'),
      },
      string: {
        noArgs: 'wKti5-}$_/',
      },
      uuid: {
        noArgs: 'e7ec32f0-a2a3-4c65-abbd-0caabde64dfd',
      },
      boolean: {
        noArgs: true,
      },
      hexaDecimal: {
        noArgs: '0xE',
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
      },
      bigInt: {
        noArgs: 9285209999907148n,
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

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
        if (functionName === 'datetime') {
          // TODO @Shinigami92 2022-01-29: We will fix the deterministic in #343
          it(`${functionName}()`, () => {
            faker.seed(seed);

            const actual = faker.datatype.datetime();
            expect(typeof actual).toBe('object');
          });
          continue;
        }

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
        it('should ... ', () => {});
      });

      describe('datetime', () => {
        it('should ... ', () => {});
      });

      describe('string', () => {
        it('should ... ', () => {});
      });

      describe('uuid', () => {
        it('should ... ', () => {});
      });

      describe('boolean', () => {
        it('should ... ', () => {});
      });

      describe('hexaDecimal', () => {
        it('should ... ', () => {});
      });

      describe('json', () => {
        it('should ... ', () => {});
      });

      describe('array', () => {
        it('should ... ', () => {});
      });

      describe('bigInt', () => {
        it('should ... ', () => {});
      });
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('number', () => {
        it('should return a random number given a maximum value as Number', () => {
          const max = 10;
          expect(faker.datatype.number(max)).lessThanOrEqual(max);
        });

        it('should return a random number given a maximum value as Object', () => {
          const options = { max: 10 };
          expect(faker.datatype.number(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };
          expect(faker.datatype.number(options)).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };
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

        it('should not modify the input object', () => {
          const min = 1;
          const max = 2;
          const opts = {
            min: min,
            max: max,
          };

          faker.datatype.number(opts);

          expect(opts.min).toBe(min);
          expect(opts.max).toBe(max);
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
          expect(faker.datatype.float(options)).lessThanOrEqual(options.max);
        });

        it('should return a random number given a maximum value of 0', () => {
          const options = { max: 0 };
          expect(faker.datatype.float(options)).toBe(0);
        });

        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const options = { min: -100, max: 0 };
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
          const opts = {
            min: min,
            max: max,
          };

          faker.datatype.float(opts);

          expect(opts.min).toBe(min);
          expect(opts.max).toBe(max);
        });
      });

      describe('datetime', () => {
        it('check validity of date and if returned value is created by Date()', () => {
          const date = faker.datatype.datetime();
          expect(typeof date).toBe('object');
          expect(date.getTime()).not.toBeNaN();
          expect(Object.prototype.toString.call(date)).toBe('[object Date]');
        });

        it('basic test with stubbed value', () => {
          const today = new Date();
          const spy_datatype_number = vi
            .spyOn(faker.datatype, 'number')
            .mockReturnValue(today.getTime());

          const date = faker.datatype.datetime();
          expect(today.valueOf()).toBe(date.valueOf());

          spy_datatype_number.mockRestore();
        });

        //generating a datetime with seeding is currently not working
      });

      describe('string', () => {
        it('should generate a string value', () => {
          const generatedString = faker.datatype.string();
          expect(typeof generatedString).toBe('string');
          expect(generatedString).toHaveLength(10);
        });

        it('should generate a string value, checks seeding', () => {
          faker.seed(100);
          const generatedString = faker.datatype.string();
          expect(generatedString).toBe('S_:GHQo.!/');
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
          expect(typeof bool).toBe('boolean');
        });
        it('generates a boolean value, checks seeding', () => {
          faker.seed(1);
          const bool = faker.datatype.boolean();
          expect(bool).toBe(false);
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
        const hexaDecimal = faker.datatype.hexaDecimal;

        it('generates single hex character when no additional argument was provided', () => {
          const hex = hexaDecimal();
          expect(hex).match(/^(0x)[0-9a-f]{1}$/i);
        });

        it('generates a random hex string', () => {
          const hex = hexaDecimal(5);
          expect(hex).match(/^(0x)[0-9a-f]+$/i);
        });
      });

      describe('json', () => {
        it('generates a valid json object', () => {
          const jsonObject = faker.datatype.json();
          expect(typeof jsonObject).toBe('string');
          expect(JSON.parse(jsonObject)).toBeTruthy();
        });

        it('generates a valid json object, with seeding', () => {
          faker.seed(10);
          const jsonObject = faker.datatype.json();
          const parsedObject = JSON.parse(jsonObject);
          expect(typeof jsonObject).toBe('string');
          expect(parsedObject.foo).toBe('<"N[JfnOW5');
          expect(parsedObject.bar).toStrictEqual(19806);
          expect(parsedObject.bike).toBe('g909).``yl');
          expect(parsedObject.a).toStrictEqual(33607);
          expect(parsedObject.b).toBe('sl3Y#dr<dv');
          expect(parsedObject.name).toBe('c-SG.iCW_1');
          expect(parsedObject.prop).toStrictEqual(82608);
        });
      });

      describe('array', () => {
        it('generates an array', () => {
          // TODO @Shinigami92 2022-01-20: Currently this test seems to just do:
          //      => expect(typeof faker.datatype.array).toBe('function')

          const stubArray = [0, 1, 3, 4, 5, 6, 1, 'a', 'b', 'c'];
          const spy_datatype_array = vi
            .spyOn(faker.datatype, 'array')
            .mockReturnValue(stubArray);

          const generatedArray = faker.datatype.array();

          expect(generatedArray).toHaveLength(stubArray.length);
          expect(stubArray).toStrictEqual(generatedArray);

          spy_datatype_array.mockRestore();
        });

        it('generates an array with passed size', () => {
          const randomSize = faker.datatype.number();
          const generatedArray = faker.datatype.array(randomSize);
          expect(generatedArray).toHaveLength(randomSize);
        });

        it('generates an array with 1 element, with seeding', () => {
          faker.seed(10);
          const generatedArray = faker.datatype.array(1);
          expect(generatedArray[0]).toBe('<"N[JfnOW5');
        });
      });

      describe('bigInt', () => {
        it('should generate a bigInt value', () => {
          const generateBigInt = faker.datatype.bigInt();
          expect(typeof generateBigInt).toBe('bigint');
        });

        it('Generate and compare two numbers of data type BigInt, with seeding', () => {
          faker.seed(123);
          const generateBigInt1 = faker.datatype.bigInt();
          faker.seed(123);
          const generateBigInt2 = faker.datatype.bigInt();
          expect(generateBigInt1).toBe(generateBigInt2);
        });

        it('summing with the Number datatype should be an error', (done) => {
          // TODO @Shinigami92 2022-01-20: Maybe we can remove this test, we should not test JS itself
          try {
            // @ts-expect-error
            faker.datatype.bigInt() + 10;
          } catch (error) {
            done();
          }
        });
      });
    }
  });
});
