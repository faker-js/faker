import { describe, expect, it } from 'vitest';
import { FakerError, faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('string', () => {
  seededTests(faker, 'string', (t) => {
    t.describe('fromCharacters', (t) => {
      t.it('with string characters', 'foobar')
        .it('with string[] characters', [...'foobar'])
        .it('with string characters and length', 'foobar', 5)
        .it('with string[] characters and length', [...'foobar'], 5)
        .it('with string characters and length range', 'foobar', {
          min: 10,
          max: 20,
        })
        .it('with string[] characters and length range', [...'foobar'], {
          min: 10,
          max: 20,
        });
    });

    t.describe('alpha', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length', { length: 6 })
        .it('with length range', { length: { min: 10, max: 20 } })
        .it('with casing = lower', { casing: 'lower' })
        .it('with casing = upper', { casing: 'upper' })
        .it('with casing = mixed', { casing: 'mixed' })
        .it('with exclude', { exclude: 'abcdefghijk' })
        .it('with length, casing and exclude', {
          length: 7,
          casing: 'lower',
          exclude: 'lmnopqrstu',
        });
    });

    t.describe('alphanumeric', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length', { length: 6 })
        .it('with length range', { length: { min: 10, max: 20 } })
        .it('with casing = lower', { casing: 'lower' })
        .it('with casing = upper', { casing: 'upper' })
        .it('with casing = mixed', { casing: 'mixed' })
        .it('with exclude', { exclude: 'abcdefghijk12345' })
        .it('with length, casing and exclude', {
          length: 7,
          casing: 'lower',
          exclude: 'lmnopqrstu67890',
        });
    });

    t.describe('binary', (t) => {
      t.it('noArgs')
        .it('with length', { length: 6 })
        .it('with length range', { length: { min: 10, max: 20 } })
        .it('with custom prefix', { prefix: 'bin_' })
        .it('with length and empty prefix', {
          length: 7,
          prefix: '',
        });
    });

    t.describe('octal', (t) => {
      t.it('noArgs')
        .it('with length', { length: 6 })
        .it('with length range', { length: { min: 10, max: 20 } })
        .it('with custom prefix', { prefix: 'oct_' })
        .it('with length and empty prefix', {
          length: 7,
          prefix: '',
        });
    });

    t.describe('hexadecimal', (t) => {
      t.it('noArgs')
        .it('with length', { length: 6 })
        .it('with length range', { length: { min: 10, max: 20 } })
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
        .it('with length range', { length: { min: 10, max: 20 } })
        .it('with allowLeadingZeros', { allowLeadingZeros: false })
        .it('with exclude', { exclude: '12345' })
        .it('with length, allowLeadingZeros and exclude', {
          length: 7,
          allowLeadingZeros: true,
          exclude: '12345',
        });
    });

    t.describe('sample', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length range', { min: 10, max: 20 });
    });

    t.itRepeated('uuid', 5);

    t.describe('ulid', (t) => {
      const ulidRefDate = '2021-02-21T17:09:15.711Z';

      t.it('with string refDate', { refDate: ulidRefDate })
        .it('with Date refDate', { refDate: new Date(ulidRefDate) })
        .it('with number refDate', {
          refDate: new Date(ulidRefDate).getTime(),
        });
    });

    t.describe('nanoid', (t) => {
      t.itRepeated('noArgs', 5)
        .it('with length parameter', 30)
        .it('with length range', { min: 13, max: 37 });
    });

    t.describe('symbol', (t) => {
      t.it('noArgs')
        .itRepeated('with length parameter', 5, 5)
        .it('with length range', { min: 10, max: 20 });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('fromCharacters', () => {
        it('should return single character when no length provided', () => {
          const actual = faker.string.fromCharacters('foobar');

          expect(actual).toHaveLength(1);
        });

        it('should only contain characters from provided string', () => {
          const actual = faker.string.fromCharacters('foobar');

          expect(actual).toMatch(/^[foobar]$/);
        });

        it('should generate 5 random letters', () => {
          const actual = faker.string.fromCharacters('foobar', 5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.string.fromCharacters('foobar', length);

            expect(actual).toBe('');
          }
        );

        it('should return a random amount of characters', () => {
          const actual = faker.string.fromCharacters('foobar', {
            min: 10,
            max: 20,
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

        it('should throw if no characters are passed (string)', () => {
          expect(() => faker.string.fromCharacters('')).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should throw if no characters are passed (string[])', () => {
          expect(() => faker.string.fromCharacters([])).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });
      });

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

        it('should generate 5 random letters', () => {
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

        it('should return a random amount of characters', () => {
          const actual = faker.string.alpha({ length: { min: 10, max: 20 } });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

        it('should be able to ban some characters', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'p'],
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able to ban some characters via string', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: 'ap',
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able handle mistake in excluded characters array', () => {
          const alphaText = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'a', 'p'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being excluded (string)', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz';
          expect(() =>
            faker.string.alpha({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should throw if all possible characters being excluded (string[])', () => {
          const exclude = [...'abcdefghijklmnopqrstuvwxyz'];
          expect(() =>
            faker.string.alpha({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should not mutate the input object', () => {
          const input: {
            length: number;
            casing: 'mixed';
            exclude: string[];
          } = Object.freeze({
            length: 5,
            casing: 'mixed',
            exclude: ['a', '%'],
          });

          expect(() => faker.string.alpha(input)).not.toThrow();
          expect(input.exclude).toEqual(['a', '%']);
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

        it('should generate 5 random characters', () => {
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

        it('should return a random amount of characters', () => {
          const actual = faker.string.alphanumeric({
            length: { min: 10, max: 20 },
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

        it('should be able to ban all alphabetic characters', () => {
          const exclude = [...'abcdefghijklmnopqrstuvwxyz'];
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all alphabetic characters via string', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all numeric characters', () => {
          const exclude = [...'0123456789'];
          const alphaText = faker.string.alphanumeric({
            length: 5,
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all numeric characters via string', () => {
          const exclude = '0123456789';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to handle mistake in excluded characters array', () => {
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'p', 'a'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[0-9b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being excluded (string)', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz0123456789';
          expect(() =>
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should throw if all possible characters being excluded (string[])', () => {
          const exclude = [...'abcdefghijklmnopqrstuvwxyz0123456789'];
          expect(() =>
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should not mutate the input object', () => {
          const input: {
            length: number;
            exclude: string[];
          } = Object.freeze({
            length: 5,
            exclude: ['a', '0', '%'],
          });

          expect(() => faker.string.alphanumeric(input)).not.toThrow();
          expect(input.exclude).toEqual(['a', '0', '%']);
        });
      });

      describe(`binary`, () => {
        it('generates a single binary character when no additional argument was provided', () => {
          const binary = faker.string.binary();
          expect(binary).toMatch(/^0b[01]$/i);
          expect(binary).toHaveLength(3);
        });

        it('generates a random binary string with fixed length and no prefix', () => {
          const binary = faker.string.binary({
            length: 5,
            prefix: '',
          });
          expect(binary).toMatch(/^[01]*$/i);
          expect(binary).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return the prefix when length is <= 0',
          (length) => {
            const binary = faker.string.binary({ length });

            expect(binary).toBe('0b');
          }
        );

        it('should return a binary string with a random amount of characters and no prefix', () => {
          const binary = faker.string.binary({
            length: { min: 10, max: 20 },
            prefix: '',
          });

          expect(binary).toBeDefined();
          expect(binary).toBeTypeOf('string');

          expect(binary.length).toBeGreaterThanOrEqual(10);
          expect(binary.length).toBeLessThanOrEqual(20);
        });
      });

      describe(`octal`, () => {
        it('generates single octal character when no additional argument was provided', () => {
          const octal = faker.string.octal();
          expect(octal).toMatch(/^0o[0-7]$/i);
          expect(octal).toHaveLength(3);
        });

        it('generates a random octal string with fixed length and no prefix', () => {
          const octal = faker.string.octal({
            length: 5,
            prefix: '',
          });
          expect(octal).toMatch(/^[0-7]*$/i);
          expect(octal).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return the prefix when length is <= 0',
          (length) => {
            const octal = faker.string.octal({ length });

            expect(octal).toBe('0o');
          }
        );

        it('should return an octal string with a random amount of characters and no prefix', () => {
          const octal = faker.string.octal({
            length: { min: 10, max: 20 },
            prefix: '',
          });

          expect(octal).toBeDefined();
          expect(octal).toBeTypeOf('string');

          expect(octal.length).toBeGreaterThanOrEqual(10);
          expect(octal.length).toBeLessThanOrEqual(20);
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

        it.each([0, -1, -100])(
          'should return the prefix when length is <= 0',
          (length) => {
            const actual = faker.string.hexadecimal({ length });

            expect(actual).toBe('0x');
          }
        );

        it('should return a random amount of characters', () => {
          const actual = faker.string.hexadecimal({
            length: { min: 10, max: 20 },
            prefix: '',
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });
      });

      describe('numeric', () => {
        it('should return single digit when no length provided', () => {
          const actual = faker.string.numeric();

          expect(actual).toHaveLength(1);
          expect(actual).toMatch(/^[0-9]$/);
        });

        it.each(times(100))(
          'should generate random value with a length of %s',
          (length) => {
            const actual = faker.string.numeric(length);

            expect(actual).toHaveLength(length);
            expect(actual).toMatch(/^[0-9]*$/);
          }
        );

        it('should return a random amount of characters', () => {
          const actual = faker.string.numeric({
            length: { min: 10, max: 20 },
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

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
          expect(actual).toMatch(/^[0-9]+$/);
        });

        it('should allow leading zeros via option', () => {
          const actual = faker.string.numeric({
            length: 15,
            allowLeadingZeros: true,
          });

          expect(actual).toMatch(/^[0-9]+$/);
        });

        it('should allow leading zeros via option and all other digits excluded', () => {
          const actual = faker.string.numeric({
            length: 4,
            allowLeadingZeros: true,
            exclude: [...'123456789'],
          });

          expect(actual).toBe('0000');
        });

        it('should allow leading zeros via option and all other digits excluded via string', () => {
          const actual = faker.string.numeric({
            length: 4,
            allowLeadingZeros: true,
            exclude: '123456789',
          });

          expect(actual).toBe('0000');
        });

        it('should fail on leading zeros via option and all other digits excluded', () => {
          expect(() =>
            faker.string.numeric({
              length: 4,
              allowLeadingZeros: false,
              exclude: [...'123456789'],
            })
          ).toThrow(
            new FakerError(
              'Unable to generate numeric string, because all possible digits are excluded.'
            )
          );
        });

        it('should fail on leading zeros via option and all other digits excluded via string', () => {
          expect(() =>
            faker.string.numeric({
              length: 4,
              allowLeadingZeros: false,
              exclude: '123456789',
            })
          ).toThrow(
            new FakerError(
              'Unable to generate numeric string, because all possible digits are excluded.'
            )
          );
        });

        it('should ban all digits passed via exclude', () => {
          const actual = faker.string.numeric({
            length: 1000,
            exclude: [...'c84U1'],
          });

          expect(actual).toHaveLength(1000);
          expect(actual).toMatch(/^[0235679]{1000}$/);
        });

        it('should ban all digits passed via exclude via string', () => {
          const actual = faker.string.numeric({
            length: 1000,
            exclude: 'c84U1',
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
          const negativeValue = faker.number.int({ min: -1000, max: -1 });
          const generatedString = faker.string.sample(negativeValue);
          expect(generatedString).toBe('');
          expect(generatedString).toHaveLength(0);
        });

        it('should return string with a specific length', () => {
          const length = 1337;
          const generatedString = faker.string.sample(length);
          expect(generatedString).toHaveLength(length);
        });

        it('should return a random amount of characters', () => {
          const actual = faker.string.sample({ min: 10, max: 20 });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
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

      describe(`ulid`, () => {
        it.each(['invalid', Number.NaN, new Date(Number.NaN)] as const)(
          'should reject invalid refDates %s',
          (refDate) => {
            expect(() => faker.string.ulid({ refDate })).toThrow(
              new FakerError(`Invalid refDate date: ${refDate.toString()}`)
            );
          }
        );

        it('generates a valid ULID', () => {
          const ulid = faker.string.ulid();
          const regex = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/;
          expect(ulid).toMatch(regex);
        });
      });

      describe(`nanoid`, () => {
        it('generates a valid Nano ID', () => {
          const id = faker.string.nanoid();
          const regex = /^[0-9a-zA-Z_-]+$/;
          expect(id).toMatch(regex);
        });

        it('should have a default length of 21', () => {
          const id = faker.string.nanoid();
          expect(id).toHaveLength(21);
        });

        it('should return an empty string when length is negative', () => {
          const id = faker.string.nanoid(-1);
          expect(id).toBe('');
        });

        it('should return string with a length within a given range', () => {
          const actual = faker.string.nanoid({ min: 13, max: 37 });

          expect(actual.length).toBeGreaterThanOrEqual(13);
          expect(actual.length).toBeLessThanOrEqual(37);
        });
      });

      describe('special', () => {
        it('should return a value of type string with default length of 1', () => {
          const actual = faker.string.symbol();

          expect(actual).toBeTypeOf('string');
          expect(actual).toHaveLength(1);
        });

        it('should return an empty string when length is negative', () => {
          const actual = faker.string.symbol(
            faker.number.int({ min: -1000, max: -1 })
          );

          expect(actual).toBe('');
          expect(actual).toHaveLength(0);
        });

        it('should return string of designated length', () => {
          const length = 87;
          const actual = faker.string.symbol(length);

          expect(actual).toHaveLength(length);
        });

        it('should return string with a length within a given range', () => {
          const actual = faker.string.symbol({ min: 10, max: 20 });

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });
      });
    }
  );
});
