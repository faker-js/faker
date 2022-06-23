import { beforeEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'alpha',
  'alphaNumeric',
  'locale',
  'numeric',
  'word',
  'words',
];

describe('random', () => {
  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.random[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    describe.each(times(NON_SEEDED_BASED_RUN))('%s', () => {
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

        it.each([
          ['upper', /^[A-Z]{250}$/],
          ['lower', /^[a-z]{250}$/],
          ['mixed', /^[a-zA-Z]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.random.alpha({ count: 250, casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate many random letters', () => {
          const actual = faker.random.alpha(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.random.alpha(length);

            expect(actual).toBe('');
          }
        );

        it('should be able to ban some characters', () => {
          const actual = faker.random.alpha({
            count: 5,
            bannedChars: ['a', 'p'],
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able to ban some characters via string', () => {
          const actual = faker.random.alpha({
            count: 5,
            bannedChars: 'ap',
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

        it('should throw if all possible characters being banned', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
          expect(() =>
            faker.random.alpha({
              count: 5,
              bannedChars,
            })
          ).toThrowError(
            new FakerError(
              'Unable to generate string, because all possible characters are banned.'
            )
          );
        });

        it('should not mutate the input object', () => {
          const input: {
            count: number;
            casing: 'mixed';
            bannedChars: string[];
          } = Object.freeze({
            count: 5,
            casing: 'mixed',
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

        it.each([
          ['upper', /^[A-Z0-9]{250}$/],
          ['lower', /^[a-z0-9]{250}$/],
          ['mixed', /^[a-zA-Z0-9]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.random.alphaNumeric(250, { casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate many random characters', () => {
          const actual = faker.random.alphaNumeric(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.random.alphaNumeric(length);

            expect(actual).toBe('');
          }
        );

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

        it('should be able to ban all alphabetic characters via string', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz';
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

        it('should be able to ban all numeric characters via string', () => {
          const bannedChars = '0123456789';
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
          ).toThrowError(
            new FakerError(
              'Unable to generate string, because all possible characters are banned.'
            )
          );
        });

        it('should throw if all possible characters being banned via string', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
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

        it('should allow leading zeros via option and all other digits banned via string', () => {
          const actual = faker.random.numeric(4, {
            allowLeadingZeros: true,
            bannedDigits: '123456789',
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

        it('should fail on leading zeros via option and all other digits banned via string', () => {
          expect(() =>
            faker.random.numeric(4, {
              allowLeadingZeros: false,
              bannedDigits: '123456789',
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

        it('should ban all digits passed via bannedDigits via string', () => {
          const actual = faker.random.numeric(1000, {
            bannedDigits: 'c84U1',
          });

          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[0235679]{1000}$/);
        });
      });
    });
  });
});
