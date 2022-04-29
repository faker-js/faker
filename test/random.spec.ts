import { beforeEach, describe, expect, it, vi } from 'vitest';
import { faker, FakerError } from '../src';
import { times } from './support/times';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      alpha: 'j',
      alphaNumeric: 'd',
      arrayElement: 'b',
      arrayElements: ['b', 'c'],
      boolean: false,
      float: 37453.64,
      hexaDecimal: '0x8',
      image: 'http://loremflickr.com/640/480/city',
      locale: 'es_MX',
      number: 37454,
      numeric: '4',
      objectElement: 'bar',
      uuid: '5cf2bc99-2721-407d-992b-a00fbdf302f2',
      word: 'extend',
      words: 'mobile Fish',
    },
  },
  {
    seed: 1337,
    expectations: {
      alpha: 'g',
      alphaNumeric: '9',
      arrayElement: 'a',
      arrayElements: ['b'],
      boolean: false,
      float: 26202.2,
      hexaDecimal: '0x5',
      image: 'http://loremflickr.com/640/480/cats',
      locale: 'en_GH',
      number: 26202,
      numeric: '3',
      objectElement: 'bar',
      uuid: '48234870-5389-445f-8b41-c61a52bf27dc',
      word: 'leading',
      words: 'Delaware',
    },
  },
  {
    seed: 1211,
    expectations: {
      alpha: 'y',
      alphaNumeric: 'x',
      arrayElement: 'c',
      arrayElements: ['a', 'c', 'b'],
      boolean: true,
      float: 92851.09,
      hexaDecimal: '0xE',
      image: 'http://loremflickr.com/640/480/transport',
      locale: 'ur',
      number: 92852,
      numeric: '9',
      objectElement: 'car',
      uuid: 'e7ec32f0-a2a3-4c65-abbd-0caabde64dfd',
      word: 'Division',
      words: 'Turnpike Frozen Handcrafted',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'alpha',
  'alphaNumeric',
  'arrayElement',
  'arrayElements',
  'boolean',
  'float',
  'hexaDecimal',
  'image',
  'locale',
  'number',
  'numeric',
  'objectElement',
  'uuid',
  'word',
  'words',
];

describe('random', () => {
  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.random[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    describe.each(times(NON_SEEDED_BASED_RUN))('%s', () => {
      describe('arrayElement', () => {
        it('should return a random element in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const actual = faker.random.arrayElement(testArray);

          expect(testArray).toContain(actual);
        });

        it('should return a random element in the array when there is only 1', () => {
          const testArray = ['hello'];
          const actual = faker.random.arrayElement(testArray);

          expect(actual).toBe('hello');
        });
      });

      describe('arrayElements', () => {
        it('should return a subset with random elements in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const subset = faker.random.arrayElements(testArray);

          // Check length
          expect(subset.length).toBeGreaterThanOrEqual(1);
          expect(subset.length).toBeLessThanOrEqual(testArray.length);

          // Check elements
          subset.forEach((element) => {
            expect(testArray).toContain(element);
          });

          // Check uniqueness
          expect(subset).toHaveLength(new Set(subset).size);
        });

        it('should return a subset of fixed length with random elements in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const subset = faker.random.arrayElements(testArray, 3);

          // Check length
          expect(subset).toHaveLength(3);

          // Check elements
          subset.forEach((element) => {
            expect(testArray).toContain(element);
          });

          // Check uniqueness
          expect(subset).toHaveLength(new Set(subset).size);
        });
      });

      describe('objectElement', () => {
        it('should return a random value', () => {
          const spy = vi.spyOn(console, 'warn');

          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.random.objectElement(testObject);

          expect(Object.values(testObject)).toContain(actual);
          expect(spy).toHaveBeenCalledWith(
            `[@faker-js/faker]: faker.random.objectElement() is deprecated since v6.3.0 and will be removed in v7.0.0. Please use faker.random.objectValue() instead.`
          );

          spy.mockRestore();
        });

        it('should return a random key', () => {
          const spy = vi.spyOn(console, 'warn');

          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.random.objectElement(testObject, 'key');

          expect(Object.keys(testObject)).toContain(actual);
          expect(spy).toHaveBeenCalledWith(
            `[@faker-js/faker]: faker.random.objectElement(obj, 'key') is deprecated since v6.3.0 and will be removed in v7.0.0. Please use faker.random.objectKey() instead.`
          );

          spy.mockRestore();
        });
      });

      describe('objectKey', () => {
        it('should return a random key', () => {
          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.random.objectKey(testObject);

          expect(Object.keys(testObject)).toContain(actual);
        });
      });

      describe('objectValue', () => {
        it('should return a random value', () => {
          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.random.objectValue(testObject);

          expect(Object.values(testObject)).toContain(actual);
        });
      });

      describe('word', () => {
        const bannedChars = [
          '!',
          '#',
          '%',
          '&',
          '*',
          ')',
          '(',
          '+',
          '=',
          '.',
          '<',
          '>',
          '{',
          '}',
          '[',
          ']',
          ':',
          ';',
          "'",
          '"',
          '_',
          '-',
        ];

        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return a random word', () => {
          const actual = faker.random.word();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
        });

        it.each(times(50))(
          'should only contain a word without undesirable non-alpha characters (run %i)',
          () => {
            const actual = faker.random.word();

            expect(actual).not.satisfy((word: string) =>
              bannedChars.some((char) => word.includes(char))
            );
          }
        );

        it.each(times(50))(
          'should only contain a word without undesirable non-alpha characters, locale=zh_CN (run %i)',
          () => {
            faker.locale = 'zh_CN';

            const actual = faker.random.word();

            expect(actual).not.satisfy((word: string) =>
              bannedChars.some((char) => word.includes(char))
            );
          }
        );
      });

      describe('words', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return random words', () => {
          const actual = faker.random.words();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const words = actual.split(' ');
          expect(words.length).toBeGreaterThanOrEqual(1);
          expect(words.length).toBeLessThanOrEqual(3);
        });

        it('should return random words', () => {
          const actual = faker.random.words(5);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const words = actual.split(' ');
          expect(words).toHaveLength(5);
        });
      });

      describe('locale', () => {
        it('should return a random locale', () => {
          const actual = faker.random.locale();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(Object.keys(faker.locales)).toContain(actual);
        });
      });

      describe('alpha', () => {
        it('should return single letter when no count provided', () => {
          const actual = faker.random.alpha();

          expect(actual).toHaveLength(1);
        });

        it('should return lowercase letter when no upcase option provided', () => {
          const actual = faker.random.alpha();

          expect(actual).toMatch(/^[a-z]$/);
        });

        it('should return uppercase when upcase option is true', () => {
          const actual = faker.random.alpha({ upcase: true });
          expect(actual).toMatch(/^[A-Z]$/);
        });

        it('should generate many random letters', () => {
          const actual = faker.random.alpha(5);

          expect(actual).toHaveLength(5);
        });

        it('should be able to ban some characters', () => {
          const actual = faker.random.alpha({
            count: 5,
            bannedChars: ['a', 'p'],
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able handle mistake in banned characters array', () => {
          const alphaText = faker.random.alpha({
            count: 5,
            bannedChars: ['a', 'a', 'p'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should not mutate the input object', () => {
          const input: {
            count: number;
            upcase: boolean;
            bannedChars: string[];
          } = Object.freeze({
            count: 5,
            upcase: true,
            bannedChars: ['a', '%'],
          });

          expect(() => faker.random.alpha(input)).not.toThrow();
          expect(input.bannedChars).toEqual(['a', '%']);
        });
      });

      describe('alphaNumeric', () => {
        it('should generate single character when no additional argument was provided', () => {
          const actual = faker.random.alphaNumeric();

          expect(actual).toHaveLength(1);
        });

        it('should generate many random characters', () => {
          const actual = faker.random.alphaNumeric(5);

          expect(actual).toHaveLength(5);
        });

        it('should be able to ban all alphabetic characters', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
          const alphaText = faker.random.alphaNumeric(5, {
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to ban all numeric characters', () => {
          const bannedChars = '0123456789'.split('');
          const alphaText = faker.random.alphaNumeric(5, {
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to handle mistake in banned characters array', () => {
          const alphaText = faker.random.alphaNumeric(5, {
            bannedChars: ['a', 'p', 'a'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[0-9b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being banned', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
          expect(() =>
            faker.random.alphaNumeric(5, {
              bannedChars,
            })
          ).toThrowError();
        });

        it('should not mutate the input object', () => {
          const input: {
            bannedChars: string[];
          } = Object.freeze({
            bannedChars: ['a', '0', '%'],
          });

          expect(() => faker.random.alphaNumeric(5, input)).not.toThrow();
          expect(input.bannedChars).toEqual(['a', '0', '%']);
        });
      });

      describe('numeric', () => {
        it('should return single digit when no length provided', () => {
          const actual = faker.random.numeric();

          expect(actual).toHaveLength(1);
          expect(actual).toMatch(/^[1-9]$/);
        });

        it.each(times(100))(
          'should generate random value with a length of %s',
          (length) => {
            const actual = faker.random.numeric(length);

            expect(actual).toHaveLength(length);
            expect(actual).toMatch(/^[1-9][0-9]*$/);
          }
        );

        it('should return empty string with a length of 0', () => {
          const actual = faker.random.numeric(0);

          expect(actual).toHaveLength(0);
        });

        it('should return empty string with a negative length', () => {
          const actual = faker.random.numeric(-10);

          expect(actual).toHaveLength(0);
        });

        it('should return a valid numeric string with provided length', () => {
          const actual = faker.random.numeric(1000);

          expect(actual).toBeTypeOf('string');
          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[1-9][0-9]+$/);
        });

        it('should allow leading zeros via option', () => {
          const actual = faker.random.numeric(15, { allowLeadingZeros: true });

          expect(actual).toMatch(/^[0-9]+$/);
        });

        it('should allow leading zeros via option and all other digits banned', () => {
          const actual = faker.random.numeric(4, {
            allowLeadingZeros: true,
            bannedDigits: '123456789'.split(''),
          });

          expect(actual).toBe('0000');
        });

        it('should fail on leading zeros via option and all other digits banned', () => {
          expect(() =>
            faker.random.numeric(4, {
              allowLeadingZeros: false,
              bannedDigits: '123456789'.split(''),
            })
          ).toThrowError(
            new FakerError(
              'Unable to generate numeric string, because all possible digits are banned.'
            )
          );
        });

        it('should ban all digits passed via bannedDigits', () => {
          const actual = faker.random.numeric(1000, {
            bannedDigits: 'c84U1'.split(''),
          });

          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[0235679]{1000}$/);
        });
      });

      describe('deprecation warnings', () => {
        it.each([
          ['number', 'datatype.number'],
          ['float', 'datatype.float'],
          ['uuid', 'datatype.uuid'],
          ['boolean', 'datatype.boolean'],
          ['image', 'image.image'],
          ['hexaDecimal', 'datatype.hexadecimal'],
        ])(
          'should warn user that function random.%s is deprecated',
          (functionName, newLocation) => {
            const spy = vi.spyOn(console, 'warn');

            faker.random[functionName]();

            expect(spy).toHaveBeenCalledWith(
              `[@faker-js/faker]: faker.random.${functionName}() is deprecated and will be removed in v7.0.0. Please use faker.${newLocation}() instead.`
            );
            spy.mockRestore();
          }
        );
      });
    });
  });
});
