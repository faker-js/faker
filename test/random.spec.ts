import { beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../src';
import { times } from './support/times';

describe('random', () => {
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
      const testObject = {
        hello: 'to',
        you: 'my',
        friend: '!',
      };
      const actual = faker.random.objectElement(testObject);

      expect(Object.values(testObject)).toContain(actual);
    });

    it('should return a random key', () => {
      const testObject = {
        hello: 'to',
        you: 'my',
        friend: '!',
      };
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
