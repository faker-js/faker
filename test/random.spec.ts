import { describe, expect, it, vi } from 'vitest';
import { faker } from '../src';

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
    it('should return a random word', () => {
      const actual = faker.random.word();

      expect(actual).toBeTruthy();
      expect(typeof actual).toBe('string');
    });
  });

  describe('words', () => {
    it('should return random words', () => {
      const actual = faker.random.words();

      expect(actual).toBeTruthy();
      expect(typeof actual).toBe('string');

      const words = actual.split(' ');
      expect(words.length).greaterThanOrEqual(1);
      expect(words.length).lessThanOrEqual(3);
    });

    it('should return random words', () => {
      const actual = faker.random.words(5);

      expect(actual).toBeTruthy();
      expect(typeof actual).toBe('string');

      const words = actual.split(' ');
      expect(words).toHaveLength(5);
    });
  });

  describe('locale', () => {
    it('should return a random locale', () => {
      const actual = faker.random.locale();

      expect(actual).toBeTruthy();
      expect(typeof actual).toBe('string');
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

      expect(actual).match(/[a-z]/);
    });

    it('should return uppercase when upcase option is true', () => {
      const actual = faker.random.alpha({ upcase: true });
      expect(actual).match(/[A-Z]/);
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
      expect(actual).match(/[b-oq-z]/);
    });

    it('should be able handle mistake in banned characters array', () => {
      const alphaText = faker.random.alpha({
        count: 5,
        bannedChars: ['a', 'a', 'p'],
      });

      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
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

    it('should be able to ban some characters', () => {
      const alphaText = faker.random.alphaNumeric(5, {
        bannedChars: ['a', 'p'],
      });

      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });

    it('should be able handle mistake in banned characters array', () => {
      const alphaText = faker.random.alphaNumeric(5, {
        bannedChars: ['a', 'p', 'a'],
      });

      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });
  });

  describe('deprecation warnings', () => {
    it.each([
      ['number', 'datatype.number'],
      ['float', 'datatype.float'],
      ['uuid', 'datatype.uuid'],
      ['boolean', 'datatype.boolean'],
      ['image', 'image.image'],
      ['hexaDecimal', 'datatype.hexaDecimal'],
    ])(
      'should warn user that function random.%s is deprecated',
      (functionName, newLocation) => {
        const spy = vi.spyOn(console, 'warn');

        faker.random[functionName]();

        expect(spy).toHaveBeenCalledWith(
          `Deprecation Warning: faker.random.${functionName} is now located in faker.${newLocation}`
        );
        spy.mockRestore();
      }
    );
  });
});
