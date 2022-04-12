import { beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../src';
import { times } from './support/times';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      arrayElement: {
        oneArg: ['hello'],
        multipleArgs: ['hello', 'to', 'you', 'my', 'friend'],
      },
      arrayElements: ['hello', 'to', 'you', 'my', 'friend'],
      objectElement: {
        hello: 'to',
        you: 'my',
        friend: '!',
      },
      words: {
        count: 3,
      },
      alpha: {
        count: 9,
        bannedWords: ['c', 'f'],
        bannedWordsDuplicate: ['c', 'f', 'c'],
        upcase: true,
        regex: /^[a-bd-eg-z]{9}$/,
      },
      alphaNumeric: {
        count: 3,
        bannedWords: ['c', 'f'],
        upcase: true,
        regex: /^[0-9a-bd-eg-z]{3}$/,
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      arrayElement: {
        oneArg: ['goodbye'],
        multipleArgs: ['goodbye', 'see', 'you', 'soon'],
      },
      arrayElements: ['goodbye', 'see', 'you', 'soon'],
      objectElement: {
        goodbye: 'see',
        you: 'soon',
      },
      words: {
        count: 5,
      },
      alpha: {
        count: 2,
        bannedWords: ['j', 'v'],
        bannedWordsDuplicate: ['v', 'j', 'j'],
        upcase: true,
        regex: /^[a-ik-ux-z]{2}$/,
      },
      alphaNumeric: {
        count: 11,
        bannedWords: ['j', 'v'],
        upcase: true,
        regex: /^[0-9a-ik-ux-z]{11}$/,
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      arrayElement: {
        oneArg: ['morning'],
        multipleArgs: ['good', 'morning', 'to', 'all'],
      },
      arrayElements: ['good', 'morning', 'to', 'all'],
      objectElement: {
        good: 'morning',
        to: 'all',
      },
      words: {
        count: 13,
      },
      alpha: {
        count: 7,
        bannedWords: ['g', 'i'],
        bannedWordsDuplicate: ['g', 'g', 'i'],
        upcase: true,
        regex: /^[a-fj-z]{7}$/,
      },
      alphaNumeric: {
        count: 23,
        bannedWords: ['g', 'i'],
        upcase: true,
        regex: /^[0-9a-fj-z]{23}$/,
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

describe('random', () => {
  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      describe('arrayElement', () => {
        it('should return a random element in the array', () => {
          faker.seed(seed);

          const testArray = expectations.arrayElement.multipleArgs;
          const actual = faker.random.arrayElement(testArray);
          expect(testArray).toContain(actual);
        });

        it('should return a random element in the array when there is only 1', () => {
          faker.seed(seed);

          const testArray = expectations.arrayElement.oneArg;
          const actual = faker.random.arrayElement([testArray]);
          expect(actual).toBe(testArray);
        });
      });

      describe('arrayElements', () => {
        it('should return a subset with random elements in the array', () => {
          faker.seed(seed);

          const testArray = expectations.arrayElements;
          const subset = faker.random.arrayElements(testArray);

          // Check length
          expect(subset.length).greaterThanOrEqual(1);
          expect(subset.length).lessThanOrEqual(testArray.length);

          // Check elements
          subset.forEach((element) => {
            expect(testArray).toContain(element);
          });

          // Check uniqueness
          expect(subset).toHaveLength(new Set(subset).size);
        });

        it('should return a subset of fixed length with random elements in the array', () => {
          faker.seed(seed);

          const testArray = expectations.arrayElements;
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
          faker.seed(seed);
          const testObject = expectations.objectElement;
          const actual = faker.random.objectElement(testObject);

          expect(Object.values(testObject)).toContain(actual);
        });

        it('should return a random key', () => {
          faker.seed(seed);
          const testObject = expectations.objectElement;
          const actual = faker.random.objectElement(testObject, 'key');

          expect(Object.keys(testObject)).toContain(actual);
        });
      });

      describe('words', () => {
        beforeEach(() => {
          faker.locale = 'en';
        });

        it('should return random words', () => {
          faker.seed(seed);
          const actual = faker.random.words(expectations.words.count);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const words = actual.split(' ');
          expect(words).toHaveLength(expectations.words.count);
        });
      });

      describe('alpha', () => {
        it('should generate many random letters', () => {
          faker.seed(seed);
          const actual = faker.random.alpha(expectations.alpha.count);

          expect(actual).toHaveLength(expectations.alpha.count);
        });

        it('should be able to ban some characters', () => {
          faker.seed(seed);
          const actual = faker.random.alpha({
            count: expectations.alpha.count,
            bannedChars: expectations.alpha.bannedWords,
          });

          expect(actual).toHaveLength(expectations.alpha.count);
          expect(actual).match(expectations.alpha.regex);
        });

        it('should be able handle mistake in banned characters array', () => {
          faker.seed(seed);
          const alphaText = faker.random.alpha({
            count: expectations.alpha.count,
            bannedChars: expectations.alpha.bannedWordsDuplicate,
          });

          expect(alphaText).toHaveLength(expectations.alpha.count);
          expect(alphaText).match(expectations.alpha.regex);
        });

        it('should not mutate the input object', () => {
          faker.seed(seed);
          const input: {
            count: number;
            upcase: boolean;
            bannedChars: string[];
          } = Object.freeze({
            count: expectations.alpha.count,
            upcase: expectations.alpha.upcase,
            bannedChars: expectations.alpha.bannedWords,
          });

          expect(() => faker.random.alpha(input)).not.toThrow();
          expect(input.bannedChars).toEqual(expectations.alpha.bannedWords);
        });
      });

      describe('alphaNumeric', () => {
        it('should generate many random characters', () => {
          faker.seed(seed);
          const actual = faker.random.alphaNumeric(
            expectations.alphaNumeric.count
          );

          expect(actual).toHaveLength(expectations.alphaNumeric.count);
        });

        it('should be able to handle mistake in banned characters array', () => {
          faker.seed(seed);
          const alphaText = faker.random.alphaNumeric(
            expectations.alphaNumeric.count,
            {
              bannedChars: expectations.alphaNumeric.bannedWords,
            }
          );

          expect(alphaText).toHaveLength(expectations.alphaNumeric.count);
          expect(alphaText).match(expectations.alphaNumeric.regex);
        });

        it('should not mutate the input object', () => {
          faker.seed(seed);
          const input: {
            bannedChars: string[];
          } = Object.freeze({
            bannedChars: expectations.alphaNumeric.bannedWords,
          });

          expect(() =>
            faker.random.alphaNumeric(expectations.alphaNumeric.count, input)
          ).not.toThrow();
          expect(input.bannedChars).toEqual(
            expectations.alphaNumeric.bannedWords
          );
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
      describe('arrayElement', () => {
        it('should return a random element in the array', () => {
          const testArray = faker.lorem.sentence(5).split(' ');
          const actual = faker.random.arrayElement(testArray);

          expect(testArray).toContain(actual);
        });

        it('should return a random element in the array when there is only 1', () => {
          const word = faker.lorem.word();
          const testArray = [word];
          const actual = faker.random.arrayElement(testArray);

          expect(actual).toBe(word);
        });
      });

      describe('arrayElements', () => {
        it('should return a subset with random elements in the array', () => {
          const testArray = [...new Set(faker.lorem.sentence(5).split(' '))];
          const subset = faker.random.arrayElements(testArray);

          // Check length
          expect(subset.length).greaterThanOrEqual(1);
          expect(subset.length).lessThanOrEqual(testArray.length);

          // Check elements
          subset.forEach((element) => {
            expect(testArray).toContain(element);
          });

          // Check uniqueness
          expect(subset).toHaveLength(new Set(subset).size);
        });

        it('should return a subset of fixed length with random elements in the array', () => {
          const testArray = [...new Set(faker.lorem.sentence(5).split(' '))];
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
          const sentence = faker.lorem.sentence(6).split(' ');
          const keys = sentence.slice(0, 3);
          const values = sentence.slice(3);
          const testObject = {};
          keys.forEach((key, index) => (testObject[key] = values[index]));

          const actual = faker.random.objectElement(testObject);

          expect(Object.values(testObject)).toContain(actual);
        });

        it('should return a random key', () => {
          const sentence = faker.lorem.sentence(6).split(' ');
          const keys = sentence.slice(0, 3);
          const values = sentence.slice(3);
          const testObject = {};
          keys.forEach((key, index) => (testObject[key] = values[index]));

          const actual = faker.random.objectElement(testObject, 'key');

          expect(Object.keys(testObject)).toContain(actual);
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
          expect(words.length).greaterThanOrEqual(1);
          expect(words.length).lessThanOrEqual(3);
        });

        it('should return random words', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const actual = faker.random.words(number);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const words = actual.split(' ');
          expect(words).toHaveLength(number);
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

          expect(actual).match(/^[a-z]$/);
        });

        it('should return uppercase when upcase option is true', () => {
          const actual = faker.random.alpha({ upcase: true });
          expect(actual).match(/^[A-Z]$/);
        });

        it('should generate many random letters', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const actual = faker.random.alpha(number);

          expect(actual).toHaveLength(number);
        });

        it('should be able to ban some characters', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const actual = faker.random.alpha({
            count: number,
            bannedChars: ['a', 'p'],
          });

          const regex = new RegExp(`^[b-oq-z]{${number}}$`);
          expect(actual).toHaveLength(number);
          expect(actual).match(regex);
        });

        it('should be able handle mistake in banned characters array', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const alphaText = faker.random.alpha({
            count: number,
            bannedChars: ['a', 'a', 'p'],
          });

          const regex = new RegExp(`^[b-oq-z]{${number}}$`);
          expect(alphaText).toHaveLength(number);
          expect(alphaText).match(regex);
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
          const number = faker.datatype.number({ min: 1, max: 10 });
          const actual = faker.random.alphaNumeric(number);

          expect(actual).toHaveLength(number);
        });

        it('should be able to ban all alphabetic characters', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
          const number = faker.datatype.number({ min: 1, max: 10 });
          const alphaText = faker.random.alphaNumeric(number, {
            bannedChars,
          });

          expect(alphaText).toHaveLength(number);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to ban all numeric characters', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const bannedChars = '0123456789'.split('');
          const alphaText = faker.random.alphaNumeric(number, {
            bannedChars,
          });

          expect(alphaText).toHaveLength(number);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to handle mistake in banned characters array', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const alphaText = faker.random.alphaNumeric(number, {
            bannedChars: ['a', 'p', 'a'],
          });

          const regex = new RegExp(`^[0-9b-oq-z]{${number}}$`);
          expect(alphaText).toHaveLength(number);
          expect(alphaText).match(regex);
        });

        it('should throw if all possible characters being banned', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
          expect(() =>
            faker.random.alphaNumeric(number, {
              bannedChars,
            })
          ).toThrowError();
        });

        it('should not mutate the input object', () => {
          const number = faker.datatype.number({ min: 1, max: 10 });
          const input: {
            bannedChars: string[];
          } = Object.freeze({
            bannedChars: ['a', '0', '%'],
          });

          expect(() => faker.random.alphaNumeric(number, input)).not.toThrow();
          expect(input.bannedChars).toEqual(['a', '0', '%']);
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
    }
  });
});
