import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from './support/luhnCheck';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-3791-7755-1410-0481',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
    },
  },
  {
    seed: 1337,
    expectations: {
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-2512-2540-3255-2391',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
    },
  },
  {
    seed: 1211,
    expectations: {
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-9487-2190-6162-7436',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'slugify',
  'replaceSymbolWithNumber',
  'replaceSymbols',
  'replaceCreditCardSymbols',
  'repeatString',
  'regexpStyleStringParse',
  'shuffle',
  'uniqueArray',
  'mustache',
];

describe('helper', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.helper[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('arrayElement', () => {
        it('should return a random element in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const actual = faker.helper.arrayElement(testArray);

          expect(testArray).toContain(actual);
        });

        it('should return a random element in the array when there is only 1', () => {
          const testArray = ['hello'];
          const actual = faker.helper.arrayElement(testArray);

          expect(actual).toBe('hello');
        });
      });

      describe('arrayElements', () => {
        it('should return a subset with random elements in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const subset = faker.helper.arrayElements(testArray);

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
          const subset = faker.helper.arrayElements(testArray, 3);

          // Check length
          expect(subset).toHaveLength(3);

          // Check elements
          subset.forEach((element) => {
            expect(testArray).toContain(element);
          });

          // Check uniqueness
          expect(subset).toHaveLength(new Set(subset).size);
        });

        it('should return an empty array when receiving an empty array', () => {
          const result = faker.helper.arrayElements([]);

          expect(result).toHaveLength(0);
        });

        it('should return an empty array when receiving an empty array and count > 0', () => {
          const result = faker.helper.arrayElements([], 3);

          expect(result).toHaveLength(0);
        });
      });

      describe('slugify()', () => {
        it('removes unwanted characters from URI string', () => {
          expect(faker.helper.slugify('Aiden.Harªann')).toBe('Aiden.Harann');
          expect(faker.helper.slugify("d'angelo.net")).toBe('dangelo.net');
        });
      });

      describe('replaceSymbolWithNumber()', () => {
        describe('when no symbol passed in', () => {
          it("uses '#' by default", () => {
            const num = faker.helper.replaceSymbolWithNumber('#AB');
            expect(num).toMatch(/\dAB/);
          });
        });

        describe('when symbol passed in', () => {
          it('replaces that symbol with integers', () => {
            const num = faker.helper.replaceSymbolWithNumber('#AB', 'A');
            expect(num).toMatch(/#\dB/);
          });
        });
      });

      describe('replaceSymbols()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helper.replaceSymbols()).toBe('');
        });

        describe("when '*' passed", () => {
          it('replaces it with alphanumeric', () => {
            const num = faker.helper.replaceSymbols('*AB');
            expect(num).toMatch(/\wAB/);
          });
        });
      });

      describe('replaceCreditCardSymbols()', () => {
        it('returns a credit card number given a schema', () => {
          const number = faker.helper.replaceCreditCardSymbols(
            '6453-####-####-####-###L'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });

        it('supports different symbols', () => {
          const number = faker.helper.replaceCreditCardSymbols(
            '6453-****-****-****-***L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });

        it('handles regexp style input', () => {
          let number = faker.helper.replaceCreditCardSymbols(
            '6453-*{4}-*{4}-*{4}-*{3}L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
          number = faker.helper.replaceCreditCardSymbols(
            '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L'
          );
          expect(number).toMatch(
            /^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });
      });

      describe('repeatString()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helper.repeatString()).toBe('');
        });
      });

      describe('regexpStyleStringParse()', () => {
        it('returns an empty string when called without param', () => {
          expect(faker.helper.regexpStyleStringParse()).toBe('');
        });

        it('deals with range repeat', () => {
          const string = faker.helper.regexpStyleStringParse('#{5,10}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('flips the range when min > max', () => {
          const string = faker.helper.regexpStyleStringParse('#{10,5}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('repeats string {n} number of times', () => {
          expect(faker.helper.regexpStyleStringParse('%{10}')).toBe(
            faker.helper.repeatString('%', 10)
          );
          expect(faker.helper.regexpStyleStringParse('%{30}')).toBe(
            faker.helper.repeatString('%', 30)
          );
          expect(faker.helper.regexpStyleStringParse('%{5}')).toBe(
            faker.helper.repeatString('%', 5)
          );
        });

        it('creates a numerical range', () => {
          const string = faker.helper.regexpStyleStringParse('Hello[0-9]');
          expect(string).toMatch(/^Hello[0-9]$/);
        });

        it('deals with multiple tokens in one string', () => {
          const string = faker.helper.regexpStyleStringParse(
            'Test#{5}%{2,5}Testing**[1-5]**{10}END'
          );
          expect(string).toMatch(
            /^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/
          );
        });
      });

      describe('shuffle()', () => {
        it('the output is the same length as the input', () => {
          const shuffled = faker.helper.shuffle(['a', 'b']);

          expect(shuffled).toHaveLength(2);
        });

        it('empty array returns empty array', () => {
          const shuffled = faker.helper.shuffle([]);
          expect(shuffled).toHaveLength(0);
        });

        it('mutates the input array in place', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const shuffled = faker.helper.shuffle(input);
          expect(shuffled).deep.eq(input);
        });

        it('all items shuffled as expected when seeded', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          faker.seed(100);
          const shuffled = faker.helper.shuffle(input);
          expect(shuffled).deep.eq([
            'b',
            'e',
            'a',
            'd',
            'j',
            'i',
            'h',
            'c',
            'g',
            'f',
          ]);
        });
      });

      describe('uniqueArray()', () => {
        it('custom array returns unique array', () => {
          const input = ['a', 'a', 'a', 'a,', 'a', 'a', 'a', 'a', 'b'];
          const length = 2;
          const unique = faker.helper.uniqueArray(input, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('definition array returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helper.uniqueArray(
            faker.definitions.hacker.noun,
            length
          );
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('function returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helper.uniqueArray(faker.lorem.word, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('empty array returns empty array', () => {
          const input = [];
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helper.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('length longer than source returns max length', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const length = input.length + 1;
          const unique = faker.helper.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('works as expected when seeded', () => {
          const input = ['a', 'a', 'a', 'a', 'a', 'f', 'g', 'h', 'i', 'j'];
          const length = 5;
          faker.seed(100);
          const unique = faker.helper.uniqueArray(input, length);
          expect(unique).deep.eq(['g', 'a', 'i', 'f', 'j']);
        });
      });

      describe('mustache()', () => {
        it('returns empty string with no template input', () => {
          expect(faker.helper.mustache(undefined, {})).toBe('');
        });

        it('returns empty string with empty template input', () => {
          expect(faker.helper.mustache('', {})).toBe('');
        });

        it('supports string replace values', () => {
          const actual = faker.helper.mustache('1{{value}}3', { value: '2' });

          expect(actual).toBe('123');
        });

        it('supports function replace values faker values', () => {
          const actual = faker.helper.mustache('1{{value}}3', {
            value: faker.datatype.string(2),
          });

          expect(actual).toHaveLength(4);
        });

        it('supports function replace values faker function', () => {
          const actual = faker.helper.mustache('1{{value}}3', {
            value: () => faker.datatype.string(3),
          });

          expect(actual).toHaveLength(5);
        });

        it('supports function replace values no args', () => {
          const actual = faker.helper.mustache('1{{value}}3', {
            value: () => '7',
          });

          expect(actual).toBe('173');
        });

        it('supports function replace values with args', () => {
          const actual = faker.helper.mustache('1{{value}}3', {
            value: (key) => String(key.length),
          });

          expect(actual).toBe('193');
        });
      });

      describe('maybe', () => {
        it('should always return the callback result when probability is 1', () => {
          const actual = faker.helper.maybe(() => 'foo', { probability: 1 });

          expect(actual).toBe('foo');
        });

        it('should never return the callback result when probability is 0', () => {
          const actual = faker.helper.maybe(() => expect.fail(), {
            probability: 0,
          });

          expect(actual).toBeUndefined();
        });

        it('should not mutate the input object', () => {
          const input = Object.freeze({
            probability: 0.4,
          });

          expect(() => faker.helper.maybe(() => 'foo', input)).not.toThrow();
        });
      });

      describe('objectKey', () => {
        it('should return a random key', () => {
          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.helper.objectKey(testObject);

          expect(Object.keys(testObject)).toContain(actual);
        });

        it('should return undefined if given object is empty', () => {
          const actual = faker.helper.objectKey({});
          expect(actual).toBeUndefined();
        });
      });

      describe('objectValue', () => {
        it('should return a random value', () => {
          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.helper.objectValue(testObject);

          expect(Object.values(testObject)).toContain(actual);
        });

        it('should return undefined if given object is empty', () => {
          const actual = faker.helper.objectValue({});
          expect(actual).toBeUndefined();
        });
      });
    }
  });
});
