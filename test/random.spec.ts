import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';
import { Mersenne } from '../lib/cjs/mersenne';

const mersenne = new Mersenne();

describe('random.js', () => {
  describe('number', () => {
    it('random.number() uses datatype module and prints deprecation warning', () => {
      const spy_console_log = vi.spyOn(console, 'log');
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');
      faker.random.number();
      expect(spy_datatype_number).toHaveBeenCalled();
      expect(spy_console_log).toHaveBeenCalledWith(
        'Deprecation Warning: faker.random.number is now located in faker.datatype.number'
      );
      spy_datatype_number.mockRestore();
      spy_console_log.mockRestore();
    });

    it('should return deterministic results when seeded with integer', () => {
      faker.seed(100);
      const name = faker.name.findName();
      expect(name).toBe('Eva Jenkins');
    });

    it('should return deterministic results when seeded with 0', () => {
      faker.seed(0);
      const name = faker.name.findName();
      expect(name).toBe('Lola Sporer');
    });

    it('should return deterministic results when seeded with array - one element', () => {
      faker.seed([10]);
      const name = faker.name.findName();
      expect(name).toBe('Duane Kshlerin');
    });

    it('should return deterministic results when seeded with array - multiple elements', () => {
      faker.seed([10, 100, 1000]);
      const name = faker.name.findName();
      expect(name).toBe('Alma Shanahan');
    });
  });

  describe('float', () => {
    it('random.float() uses datatype module and prints deprecation warning', () => {
      const spy_console_log = vi.spyOn(console, 'log');
      const spy_datatype_float = vi.spyOn(faker.datatype, 'float');
      faker.random.float();
      expect(spy_datatype_float).toHaveBeenCalled();
      expect(spy_console_log).toHaveBeenCalledWith(
        'Deprecation Warning: faker.random.float is now located in faker.datatype.float'
      );
      spy_datatype_float.mockRestore();
      spy_console_log.mockRestore();
    });
  });

  describe('arrayElement', () => {
    it('returns a random element in the array', () => {
      const testArray = ['hello', 'to', 'you', 'my', 'friend'];
      expect(
        testArray.indexOf(faker.random.arrayElement(testArray))
      ).greaterThan(-1);
    });

    it('returns a random element in the array when there is only 1', () => {
      const testArray = ['hello'];
      expect(
        testArray.indexOf(faker.random.arrayElement(testArray))
      ).greaterThan(-1);
    });
  });

  describe('arrayElements', () => {
    it('returns a subset with random elements in the array', () => {
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
      subset.forEach((element) => {
        expect(!Object.hasOwnProperty(element)).toBe(true);
        subset[element] = true;
      }, {});
    });

    it('returns a subset of fixed length with random elements in the array', () => {
      const testArray = ['hello', 'to', 'you', 'my', 'friend'];
      const subset = faker.random.arrayElements(testArray, 3);

      // Check length
      expect(subset).toHaveLength(3);

      // Check elements
      subset.forEach((element) => {
        expect(testArray).toContain(element);
      });

      // Check uniqueness
      subset.forEach((element) => {
        expect(!Object.hasOwnProperty(element)).toBe(true);
        subset[element] = true;
      }, {});
    });
  });

  describe('UUID', () => {
    it('random.uuid() uses datatype module and prints deprecation warning', () => {
      const spy_console_log = vi.spyOn(console, 'log');
      const spy_datatype_uuid = vi.spyOn(faker.datatype, 'uuid');
      faker.random.uuid();
      expect(spy_datatype_uuid).toHaveBeenCalled();
      expect(spy_console_log).toHaveBeenCalledWith(
        'Deprecation Warning: faker.random.uuid is now located in faker.datatype.uuid'
      );
      spy_datatype_uuid.mockRestore();
      spy_console_log.mockRestore();
    });
  });

  describe('boolean', () => {
    it('random.boolean() uses datatype module and prints deprecation warning', () => {
      const spy_console_log = vi.spyOn(console, 'log');
      const spy_datatype_boolean = vi.spyOn(faker.datatype, 'boolean');
      faker.random.boolean();
      expect(spy_datatype_boolean).toHaveBeenCalled();
      expect(spy_console_log).toHaveBeenCalledWith(
        'Deprecation Warning: faker.random.boolean is now located in faker.datatype.boolean'
      );
      spy_datatype_boolean.mockRestore();
      spy_console_log.mockRestore();
    });
  });

  describe('semver', () => {
    const semver = faker.system.semver();

    it('should generate a string', () => {
      expect(typeof semver).toBe('string');
    });

    it('should generate a valid semver', () => {
      expect(semver).match(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('alpha', () => {
    const alpha = faker.random.alpha;

    it('should return single letter when no count provided', () => {
      expect(alpha()).toHaveLength(1);
    });

    it('should return lowercase letter when no upcase option provided', () => {
      expect(alpha()).match(/[a-z]/);
    });

    it('should return uppercase when upcase option is true', () => {
      expect(
        alpha(
          // @ts-expect-error
          { upcase: true }
        )
      ).match(/[A-Z]/);
    });

    it('should generate many random letters', () => {
      expect(alpha(5)).toHaveLength(5);
    });

    it('should be able to ban some characters', () => {
      const alphaText = alpha(
        5,
        // @ts-expect-error
        { bannedChars: ['a', 'p'] }
      );
      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });
    it('should be able handle mistake in banned characters array', () => {
      const alphaText = alpha(
        5,
        // @ts-expect-error
        { bannedChars: ['a', 'a', 'p'] }
      );
      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });
  });

  describe('alphaNumeric', () => {
    const alphaNumeric = faker.random.alphaNumeric;

    it('should generate single character when no additional argument was provided', () => {
      expect(alphaNumeric()).toHaveLength(1);
    });

    it('should generate many random characters', () => {
      expect(alphaNumeric(5)).toHaveLength(5);
    });

    it('should be able to ban some characters', () => {
      const alphaText = alphaNumeric(5, { bannedChars: ['a', 'p'] });
      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });
    it('should be able handle mistake in banned characters array', () => {
      const alphaText = alphaNumeric(5, { bannedChars: ['a', 'p', 'a'] });
      expect(alphaText).toHaveLength(5);
      expect(alphaText).match(/[b-oq-z]/);
    });
  });

  describe('hexaDecimal', () => {
    it('random.hexaDecimal() uses datatype module and prints deprecation warning', () => {
      const spy_console_log = vi.spyOn(console, 'log');
      const spy_datatype_hexaDecimal = vi.spyOn(faker.datatype, 'hexaDecimal');
      faker.random.hexaDecimal();
      expect(spy_datatype_hexaDecimal).toHaveBeenCalled();
      expect(spy_console_log).toHaveBeenCalledWith(
        'Deprecation Warning: faker.random.hexaDecimal is now located in faker.datatype.hexaDecimal'
      );
      spy_datatype_hexaDecimal.mockRestore();
      spy_console_log.mockRestore();
    });
  });

  describe('mersenne twister', () => {
    it('returns a random number without given min / max arguments', () => {
      const randomNumber = mersenne.rand();
      expect(typeof randomNumber).toBe('number');
    });

    it('throws an error when attempting to seed() a non-integer', () => {
      expect(() =>
        mersenne.seed(
          // @ts-expect-error
          'abc'
        )
      ).toThrowError(Error('seed(S) must take numeric argument; is string'));
    });

    it('throws an error when attempting to seed() a non-integer', () => {
      expect(() => mersenne.seed_array('abc')).toThrowError(
        Error('seed_array(A) must take array of numbers; is string')
      );
    });
  });
});
