import { describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { seededTests } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('string', () => {
  seededTests(faker, 'string', (t) => {
    t.describe('alpha', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length', { length: 6 })
        .it('with casing = lower', { casing: 'lower' })
        .it('with casing = upper', { casing: 'upper' })
        .it('with casing = mixed', { casing: 'mixed' })
        .it('with bannedChars', { bannedChars: 'abcdefghijk' })
        .it('with length, casing and bannedChars', {
          length: 7,
          casing: 'lower',
          bannedChars: 'lmnopqrstu',
        });
    });

    t.describe('alphanumeric', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length', { length: 6 })
        .it('with casing = lower', { casing: 'lower' })
        .it('with casing = upper', { casing: 'upper' })
        .it('with casing = mixed', { casing: 'mixed' })
        .it('with bannedChars', { bannedChars: 'abcdefghijk12345' })
        .it('with length, casing and bannedChars', {
          length: 7,
          casing: 'lower',
          bannedChars: 'lmnopqrstu67890',
        });
    });

    t.describe('hexadecimal', (t) => {
      t.it('noArgs')
        .it('with length', { length: 6 })
        .it('with casing = lower', { casing: 'lower' })
        .it('with casing = upper', { casing: 'upper' })
        .it('with casing = mixed', { casing: 'mixed' })
        .it('with custom prefix', { prefix: 'hex_' })
        .it('with length, casing and empty prefix', {
          length: 7,
          casing: 'lower',
          prefix: '',
        });
    });

    t.describe('numeric', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length', { length: 6 })
        .it('with allowLeadingZeros', { allowLeadingZeros: true })
        .it('with bannedDigits', { bannedDigits: '12345' })
        .it('with length, allowLeadingZeros and bannedDigits', {
          length: 7,
          allowLeadingZeros: true,
          bannedDigits: '12345',
        });
    });

    t.describe('sample', (t) => {
      t.it('noArgs').itRepeated('with length parameter', 5, 5);
    });

    t.itRepeated('uuid', 5);
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('alpha', () => {
        it('should return single letter when no length provided', () => {
          const actual = faker.string.alpha();

          expect(actual).toHaveLength(1);
        });

        it('should return any letters when no option is provided', () => {
          const actual = faker.string.alpha();

          expect(actual).toMatch(/^[a-zA-Z]$/);
        });

        it.each([
          ['upper', /^[A-Z]{250}$/],
          ['lower', /^[a-z]{250}$/],
          ['mixed', /^[a-zA-Z]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.string.alpha({ length: 250, casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate many random letters', () => {
          const actual = faker.string.alpha(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.string.alpha(length);

            expect(actual).toBe('');
          }
        );

        it('should be able to ban some characters', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            bannedChars: ['a', 'p'],
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able to ban some characters via string', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            bannedChars: 'ap',
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able handle mistake in banned characters array', () => {
          const alphaText = faker.string.alpha({
            length: 5,
            casing: 'lower',
            bannedChars: ['a', 'a', 'p'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being banned', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
          expect(() =>
            faker.string.alpha({
              length: 5,
              casing: 'lower',
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
            length: number;
            casing: 'mixed';
            bannedChars: string[];
          } = Object.freeze({
            length: 5,
            casing: 'mixed',
            bannedChars: ['a', '%'],
          });

          expect(() => faker.string.alpha(input)).not.toThrow();
          expect(input.bannedChars).toEqual(['a', '%']);
        });
      });

      describe('alphaNumeric', () => {
        it('should generate single character when no additional argument was provided', () => {
          const actual = faker.string.alphanumeric();

          expect(actual).toHaveLength(1);
        });

        it.each([
          ['upper', /^[A-Z0-9]{250}$/],
          ['lower', /^[a-z0-9]{250}$/],
          ['mixed', /^[a-zA-Z0-9]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.string.alphanumeric({ length: 250, casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate many random characters', () => {
          const actual = faker.string.alphanumeric(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.string.alphanumeric(length);

            expect(actual).toBe('');
          }
        );

        it('should be able to ban all alphabetic characters', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to ban all alphabetic characters via string', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to ban all numeric characters', () => {
          const bannedChars = '0123456789'.split('');
          const alphaText = faker.string.alphanumeric({
            length: 5,
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to ban all numeric characters via string', () => {
          const bannedChars = '0123456789';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            bannedChars,
          });

          expect(alphaText).toHaveLength(5);
          for (const bannedChar of bannedChars) {
            expect(alphaText).not.includes(bannedChar);
          }
        });

        it('should be able to handle mistake in banned characters array', () => {
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            bannedChars: ['a', 'p', 'a'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[0-9b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being banned', () => {
          const bannedChars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
          expect(() =>
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
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
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
              bannedChars,
            })
          ).toThrowError();
        });

        it('should not mutate the input object', () => {
          const input: {
            length: number;
            bannedChars: string[];
          } = Object.freeze({
            length: 5,
            bannedChars: ['a', '0', '%'],
          });

          expect(() => faker.string.alphanumeric(input)).not.toThrow();
          expect(input.bannedChars).toEqual(['a', '0', '%']);
        });
      });

      describe(`hexadecimal`, () => {
        it('generates single hex character when no additional argument was provided', () => {
          const hex = faker.string.hexadecimal();
          expect(hex).toMatch(/^0x[0-9a-f]*$/i);
          expect(hex).toHaveLength(3);
        });

        it('generates a random hex string', () => {
          const hex = faker.string.hexadecimal({
            length: 5,
            prefix: '',
          });
          expect(hex).toMatch(/^[0-9a-f]*$/i);
          expect(hex).toHaveLength(5);
        });
      });

      describe('numeric', () => {
        it('should return single digit when no length provided', () => {
          const actual = faker.string.numeric();

          expect(actual).toHaveLength(1);
          expect(actual).toMatch(/^[1-9]$/);
        });

        it.each(times(100))(
          'should generate random value with a length of %s',
          (length) => {
            const actual = faker.string.numeric(length);

            expect(actual).toHaveLength(length);
            expect(actual).toMatch(/^[1-9][0-9]*$/);
          }
        );

        it('should return empty string with a length of 0', () => {
          const actual = faker.string.numeric(0);

          expect(actual).toHaveLength(0);
        });

        it('should return empty string with a negative length', () => {
          const actual = faker.string.numeric(-10);

          expect(actual).toHaveLength(0);
        });

        it('should return a valid numeric string with provided length', () => {
          const actual = faker.string.numeric(1000);

          expect(actual).toBeTypeOf('string');
          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[1-9][0-9]+$/);
        });

        it('should allow leading zeros via option', () => {
          const actual = faker.string.numeric({
            length: 15,
            allowLeadingZeros: true,
          });

          expect(actual).toMatch(/^[0-9]+$/);
        });

        it('should allow leading zeros via option and all other digits banned', () => {
          const actual = faker.string.numeric({
            length: 4,
            allowLeadingZeros: true,
            bannedDigits: '123456789'.split(''),
          });

          expect(actual).toBe('0000');
        });

        it('should allow leading zeros via option and all other digits banned via string', () => {
          const actual = faker.string.numeric({
            length: 4,
            allowLeadingZeros: true,
            bannedDigits: '123456789',
          });

          expect(actual).toBe('0000');
        });

        it('should fail on leading zeros via option and all other digits banned', () => {
          expect(() =>
            faker.string.numeric({
              length: 4,
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
            faker.string.numeric({
              length: 4,
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
          const actual = faker.string.numeric({
            length: 1000,
            bannedDigits: 'c84U1'.split(''),
          });

          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[0235679]{1000}$/);
        });

        it('should ban all digits passed via bannedDigits via string', () => {
          const actual = faker.string.numeric({
            length: 1000,
            bannedDigits: 'c84U1',
          });

          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[0235679]{1000}$/);
        });
      });

      describe('sample', () => {
        it('should generate a string value', () => {
          const generatedString = faker.string.sample();
          expect(generatedString).toBeTypeOf('string');
          expect(generatedString).toHaveLength(10);
        });

        it('should return empty string if negative length is passed', () => {
          const negativeValue = faker.datatype.number({ min: -1000, max: -1 });
          const generatedString = faker.string.sample(negativeValue);
          expect(generatedString).toBe('');
          expect(generatedString).toHaveLength(0);
        });

        it('should return string with length of 2^20 if bigger length value is passed', () => {
          const overMaxValue = Math.pow(2, 28);
          const generatedString = faker.string.sample(overMaxValue);
          expect(generatedString).toHaveLength(Math.pow(2, 20));
        });

        it('should return string with a specific length', () => {
          const length = 1337;
          const generatedString = faker.string.sample(length);
          expect(generatedString).toHaveLength(length);
        });
      });

      describe(`uuid`, () => {
        it('generates a valid UUID', () => {
          const UUID = faker.string.uuid();
          const RFC4122 =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
          expect(UUID).toMatch(RFC4122);
        });
      });
    }
  });
});
