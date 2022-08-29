import { afterEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

function customUniqueMethod(prefix: string = ''): string {
  const element = faker.helpers.arrayElement(
    Array.from({ length: 500 }, (_, index) => `Test-${index + 1}`)
  );
  return `${prefix}${element}`;
}

describe('helpers', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'helpers', (t) => {
    t.describe('slugify', (t) => {
      t.it('noArgs').it('some string', 'hello world');
    });

    t.describe('replaceSymbolWithNumber', (t) => {
      t.it('noArgs')
        .it('only symbols', '!####')
        .it('some string', '^1234567890ß´°!"§$%&/()=?`+#*,..-;:_');
    });

    t.describe('replaceSymbols', (t) => {
      t.it('noArgs')
        .it('only symbols', '#?*#?*')
        .it('some string', '^1234567890ß´°!"§$%&/()=?`+#*,..-;:_');
    });

    t.describe('replaceCreditCardSymbols', (t) => {
      t.it('noArgs')
        .it('only symbols', '####-[4-9]-##!!-L')
        .it('some string', '^1234567890ß´°!"§$%&/()=?`+#*,..-;:_L');
    });

    t.describe('regexpStyleStringParse', (t) => {
      t.it('noArgs')
        .it('only symbols', '#{3}test[1-5]')
        .it('some string', 'Hello !#{3}test[1-5]');
    });

    t.describe('mustache', (t) => {
      t.it('template with string', 'Hello {{name}}!', { name: 'John' }).it(
        'template with method',
        'Hello {{name}}!',
        { name: () => 'John' }
      );
    });

    t.describe('repeatString', (t) => {
      t.it('noArgs')
        .it('with only text', 'Hello World!')
        .it('with text and repetitions', 'Hello World! ', 3);
    });

    t.describe('arrayElement', (t) => {
      t.it('noArgs').it('with array', 'Hello World!'.split(''));
    });

    t.describe('arrayElements', (t) => {
      t.it('noArgs')
        .it('with array', 'Hello World!'.split(''))
        .it('with array', 'Hello World!'.split(''), 3);
    });

    t.describe('shuffle', (t) => {
      t.it('noArgs').it('with array', 'Hello World!'.split(''));
    });

    t.describe('uniqueArray', (t) => {
      t.it('with array', 'Hello World!'.split(''), 3);
    });

    t.describe('maybe', (t) => {
      t.it('with only value', () => 'Hello World!').it(
        'with value and probability',
        () => 'Hello World!',
        { probability: 0.1 }
      );
    });

    t.describe('objectKey', (t) => {
      t.it('simple', { a: 1, b: 2, c: 3 });
    });

    t.describe('objectValue', (t) => {
      t.it('simple', { a: 1, b: 2, c: 3 });
    });

    t.describe('fake', (t) => {
      t.it('with plain string', 'my test string').it(
        'with args',
        'my string: {{datatype.string}}'
      );
    });

    t.describe('unique', (t) => {
      t.it('with customMethod', customUniqueMethod)
        .it('with customMethod and args', customUniqueMethod, ['prefix-1-'])
        .it('with () => number', faker.datatype.number)
        .it('with () => number and args', faker.datatype.number, [50]);
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('arrayElement', () => {
        it('should return a random element in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const actual = faker.helpers.arrayElement(testArray);

          expect(testArray).toContain(actual);
        });

        it('should return a random element in the array when there is only 1', () => {
          const testArray = ['hello'];
          const actual = faker.helpers.arrayElement(testArray);

          expect(actual).toBe('hello');
        });
      });

      describe('arrayElements', () => {
        it('should return a subset with random elements in the array', () => {
          const testArray = ['hello', 'to', 'you', 'my', 'friend'];
          const subset = faker.helpers.arrayElements(testArray);

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
          const subset = faker.helpers.arrayElements(testArray, 3);

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
          const result = faker.helpers.arrayElements([]);

          expect(result).toHaveLength(0);
        });

        it('should return an empty array when receiving an empty array and count > 0', () => {
          const result = faker.helpers.arrayElements([], 3);

          expect(result).toHaveLength(0);
        });
      });

      describe('slugify()', () => {
        it('removes unwanted characters from URI string', () => {
          expect(faker.helpers.slugify('Aiden.Harªann')).toBe('Aiden.Harann');
          expect(faker.helpers.slugify("d'angelo.net")).toBe('dangelo.net');
        });
      });

      describe('replaceSymbolWithNumber()', () => {
        describe('when no symbol passed in', () => {
          it("uses '#' by default", () => {
            const num = faker.helpers.replaceSymbolWithNumber('#AB');
            expect(num).toMatch(/\dAB/);
          });
        });

        describe('when symbol passed in', () => {
          it('replaces that symbol with integers', () => {
            const num = faker.helpers.replaceSymbolWithNumber('#AB', 'A');
            expect(num).toMatch(/#\dB/);
          });
        });
      });

      describe('replaceSymbols()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helpers.replaceSymbols()).toBe('');
        });

        describe("when '*' passed", () => {
          it('replaces it with alphanumeric', () => {
            const num = faker.helpers.replaceSymbols('*AB');
            expect(num).toMatch(/\wAB/);
          });
        });
      });

      describe('replaceCreditCardSymbols()', () => {
        it('returns a credit card number given a schema', () => {
          const number = faker.helpers.replaceCreditCardSymbols(
            '6453-####-####-####-###L'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(number).toSatisfy(luhnCheck);
        });

        it('supports different symbols', () => {
          const number = faker.helpers.replaceCreditCardSymbols(
            '6453-****-****-****-***L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(number).toSatisfy(luhnCheck);
        });

        it('handles regexp style input', () => {
          let number = faker.helpers.replaceCreditCardSymbols(
            '6453-*{4}-*{4}-*{4}-*{3}L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(number).toSatisfy(luhnCheck);
          number = faker.helpers.replaceCreditCardSymbols(
            '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L'
          );
          expect(number).toMatch(
            /^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/
          );
          expect(number).toSatisfy(luhnCheck);
        });
      });

      describe('repeatString()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helpers.repeatString()).toBe('');
        });
      });

      describe('regexpStyleStringParse()', () => {
        it('returns an empty string when called without param', () => {
          expect(faker.helpers.regexpStyleStringParse()).toBe('');
        });

        it('deals with range repeat', () => {
          const string = faker.helpers.regexpStyleStringParse('#{5,10}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('flips the range when min > max', () => {
          const string = faker.helpers.regexpStyleStringParse('#{10,5}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('repeats string {n} number of times', () => {
          expect(faker.helpers.regexpStyleStringParse('%{10}')).toBe(
            faker.helpers.repeatString('%', 10)
          );
          expect(faker.helpers.regexpStyleStringParse('%{30}')).toBe(
            faker.helpers.repeatString('%', 30)
          );
          expect(faker.helpers.regexpStyleStringParse('%{5}')).toBe(
            faker.helpers.repeatString('%', 5)
          );
        });

        it('creates a numerical range', () => {
          const string = faker.helpers.regexpStyleStringParse('Hello[0-9]');
          expect(string).toMatch(/^Hello[0-9]$/);
        });

        it('deals with multiple tokens in one string', () => {
          const string = faker.helpers.regexpStyleStringParse(
            'Test#{5}%{2,5}Testing**[1-5]**{10}END'
          );
          expect(string).toMatch(
            /^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/
          );
        });
      });

      describe('shuffle()', () => {
        it('the output is the same length as the input', () => {
          const shuffled = faker.helpers.shuffle(['a', 'b']);

          expect(shuffled).toHaveLength(2);
        });

        it('empty array returns empty array', () => {
          const shuffled = faker.helpers.shuffle([]);
          expect(shuffled).toHaveLength(0);
        });

        it('mutates the input array in place', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const shuffled = faker.helpers.shuffle(input);
          expect(shuffled).deep.eq(input);
        });

        it('all items shuffled as expected when seeded', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          faker.seed(100);
          const shuffled = faker.helpers.shuffle(input);
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
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('definition array returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(
            faker.definitions.hacker.noun,
            length
          );
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('function returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(faker.lorem.word, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('empty array returns empty array', () => {
          const input = [];
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('length longer than source returns max length', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const length = input.length + 1;
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('works as expected when seeded', () => {
          const input = ['a', 'a', 'a', 'a', 'a', 'f', 'g', 'h', 'i', 'j'];
          const length = 5;
          faker.seed(100);
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).deep.eq(['g', 'a', 'i', 'f', 'j']);
        });
      });

      describe('mustache()', () => {
        it('returns empty string with no template input', () => {
          expect(faker.helpers.mustache(undefined, {})).toBe('');
        });

        it('returns empty string with empty template input', () => {
          expect(faker.helpers.mustache('', {})).toBe('');
        });

        it('supports string replace values', () => {
          const actual = faker.helpers.mustache('1{{value}}3', { value: '2' });

          expect(actual).toBe('123');
        });

        it('supports function replace values faker values', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: faker.datatype.string(2),
          });

          expect(actual).toHaveLength(4);
        });

        it('supports function replace values faker function', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: () => faker.datatype.string(3),
          });

          expect(actual).toHaveLength(5);
        });

        it('supports function replace values no args', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: () => '7',
          });

          expect(actual).toBe('173');
        });

        it('supports function replace values with args', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: (key) => String(key.length),
          });

          expect(actual).toBe('193');
        });
      });

      describe('maybe', () => {
        it('should always return the callback result when probability is 1', () => {
          const actual = faker.helpers.maybe(() => 'foo', { probability: 1 });

          expect(actual).toBe('foo');
        });

        it('should never return the callback result when probability is 0', () => {
          const actual = faker.helpers.maybe(() => expect.fail(), {
            probability: 0,
          });

          expect(actual).toBeUndefined();
        });

        it('should not mutate the input object', () => {
          const input = Object.freeze({
            probability: 0.4,
          });

          expect(() => faker.helpers.maybe(() => 'foo', input)).not.toThrow();
        });
      });

      describe('objectKey', () => {
        it('should return a random key', () => {
          const testObject = {
            hello: 'to',
            you: 'my',
            friend: '!',
          };
          const actual = faker.helpers.objectKey(testObject);

          expect(Object.keys(testObject)).toContain(actual);
        });

        it('should return undefined if given object is empty', () => {
          const actual = faker.helpers.objectKey({});
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
          const actual = faker.helpers.objectValue(testObject);

          expect(Object.values(testObject)).toContain(actual);
        });

        it('should return undefined if given object is empty', () => {
          const actual = faker.helpers.objectValue({});
          expect(actual).toBeUndefined();
        });
      });

      describe('fake()', () => {
        it('replaces a token with a random value for a method with no parameters', () => {
          const name = faker.helpers.fake('{{phone.number}}');
          expect(name).toMatch(/\d/);
        });

        it('replaces multiple tokens with random values for methods with no parameters', () => {
          const name = faker.helpers.fake(
            '{{helpers.arrayElement}}{{helpers.arrayElement}}{{helpers.arrayElement}}'
          );
          expect(name).toMatch(/[abc]{3}/);
        });

        it('replaces a token with a random value for a methods with a simple parameter', () => {
          const random = faker.helpers.fake(
            '{{helpers.slugify("Will This Work")}}'
          );
          expect(random).toBe('Will-This-Work');
        });

        it('replaces a token with a random value for a method with an array parameter', () => {
          const arr = ['one', 'two', 'three'];
          const random = faker.helpers.fake(
            '{{helpers.arrayElement(["one", "two", "three"])}}'
          );
          expect(arr).toContain(random);
        });

        it('does not allow undefined parameters', () => {
          expect(() =>
            // @ts-expect-error: The parameter is required
            faker.helpers.fake()
          ).toThrowError(new FakerError('string parameter is required!'));
        });

        it('does not allow invalid module name', () => {
          expect(() => faker.helpers.fake('{{foo.bar}}')).toThrowError(
            new FakerError(`Invalid module method or definition: foo.bar
- faker.foo.bar is not a function
- faker.definitions.foo.bar is not an array`)
          );
        });

        it('does not allow missing method name', () => {
          expect(() => faker.helpers.fake('{{address}}')).toThrowError(
            new FakerError(`Invalid module method or definition: address
- faker.address is not a function
- faker.definitions.address is not an array`)
          );
        });

        it('does not allow invalid method name', () => {
          expect(() => faker.helpers.fake('{{address.foo}}')).toThrowError(
            new FakerError(`Invalid module method or definition: address.foo
- faker.address.foo is not a function
- faker.definitions.address.foo is not an array`)
          );
        });

        it('does not allow invalid definitions data', () => {
          expect(() =>
            faker.helpers.fake('{{finance.credit_card}}')
          ).toThrowError(
            new FakerError(`Invalid module method or definition: finance.credit_card
- faker.finance.credit_card is not a function
- faker.definitions.finance.credit_card is not an array`)
          );
        });

        it('should be able to return empty strings', () => {
          expect(faker.helpers.fake('{{helpers.repeatString}}')).toBe('');
        });

        it('should be able to return locale definition strings', () => {
          expect(faker.definitions.cell_phone.formats).toContain(
            faker.helpers.fake('{{cell_phone.formats}}')
          );
        });

        it('should be able to return locale definition strings that starts with the name of an existing module', () => {
          expect(faker.definitions.address.city_name).toContain(
            faker.helpers.fake('{{address.city_name}}')
          );
        });

        it('should be able to handle only {{ brackets', () => {
          expect(faker.helpers.fake('{{hello')).toBe('{{hello');
          expect(faker.helpers.fake('hello{{')).toBe('hello{{');
        });

        it('should be able to handle only }} brackets', () => {
          expect(faker.helpers.fake('hello}}')).toBe('hello}}');
          expect(faker.helpers.fake('}}hello')).toBe('}}hello');
        });

        it('should be able to handle inverted brackets', () => {
          expect(faker.helpers.fake('}}hello{{')).toBe('}}hello{{');
        });

        it('should be able to handle random }} brackets', () => {
          expect(faker.helpers.fake('}}hello{{random.alpha}}')).toMatch(
            /^}}hello[a-z]$/
          );
        });

        it('should be able to handle connected brackets', () => {
          expect(faker.helpers.fake('{{{random.alpha}}}')).toMatch(/^{[a-z]}$/);
        });

        it('should be able to handle empty brackets', () => {
          expect(faker.helpers.fake('{{}}')).toBe('{{}}');
        });

        it('should be able to handle special replacement patterns', () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (faker.random as any).special = () => '$&';

          expect(faker.helpers.fake('{{random.special}}')).toBe('$&');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (faker.random as any).special;
        });
      });

      describe('unique()', () => {
        it('should be possible to call a function with no arguments and return a result', () => {
          const result = faker.helpers.unique(faker.internet.email);
          expect(result).toBeTypeOf('string');
        });

        it('should be possible to call a function with arguments and return a result', () => {
          const result = faker.helpers.unique(faker.internet.email, [
            'fName',
            'lName',
            'domain',
          ]); // third argument is provider, or domain for email
          expect(result).toMatch(/\@domain/);
        });

        it('should be possible to limit unique call by maxTime in ms', () => {
          expect(() => {
            faker.helpers.unique(faker.internet.protocol, [], {
              maxTime: 1,
              maxRetries: 9999,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxTime: 1 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });

        it('should be possible to limit unique call by maxRetries', () => {
          expect(() => {
            faker.helpers.unique(faker.internet.protocol, [], {
              maxTime: 5000,
              maxRetries: 5,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxRetries: 5 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });

        it('should throw a FakerError instance on error', () => {
          expect(() => {
            faker.helpers.unique(faker.internet.protocol, [], {
              maxTime: 5000,
              maxRetries: 5,
              exclude: ['https', 'http'],
            });
          }).toThrowError(
            new FakerError(`Exceeded maxRetries: 5 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
          );
        });
      });
    }

    // This test can be only executed once, because the unique function has a global state.
    // See: https://github.com/faker-js/faker/issues/371
    describe('global unique()', () => {
      it('should be possible to exclude results as array', () => {
        const internetProtocol = () =>
          faker.helpers.arrayElement(['https', 'http']);
        const result = faker.helpers.unique(internetProtocol, [], {
          exclude: ['https'],
        });
        expect(result).toBe('http');
      });

      it('no conflict', () => {
        let i = 0;
        const method = () => `no conflict: ${i++}`;
        expect(faker.helpers.unique(method)).toBe('no conflict: 0');
        expect(faker.helpers.unique(method)).toBe('no conflict: 1');
      });

      it('with conflict', () => {
        const method = () => 'with conflict: 0';
        expect(faker.helpers.unique(method)).toBe('with conflict: 0');
        expect(() =>
          faker.helpers.unique(method, [], {
            maxRetries: 1,
          })
        ).toThrowError(
          new FakerError(`Exceeded maxRetries: 1 for uniqueness check.

May not be able to generate any more unique values with current settings.
Try adjusting maxTime or maxRetries parameters for faker.helpers.unique().`)
        );
      });

      it('should not mutate most of the input option properties', () => {
        const method = () => 'options-mutate-test';

        const startTime = new Date().getTime();
        const maxTime = 49;
        const maxRetries = 49;
        const currentIterations = 0;
        const exclude = [];
        const compare = (obj, key) => (obj[key] === undefined ? -1 : 0);

        const options = {
          startTime,
          maxTime,
          maxRetries,
          currentIterations,
          exclude,
          compare,
        };

        faker.helpers.unique(method, [], options);

        expect(options.startTime).toBe(startTime);
        expect(options.maxTime).toBe(maxTime);
        expect(options.maxRetries).toBe(maxRetries);
        // `options.currentIterations` is incremented in the `faker.helpers.unique` function.
        expect(options.exclude).toBe(exclude);
        expect(options.compare).toBe(compare);
      });

      it('should be possible to pass a user-specific store', () => {
        const store = {};

        const method = () => 'with conflict: 0';

        expect(faker.helpers.unique(method, [], { store })).toBe(
          'with conflict: 0'
        );
        expect(store).toEqual({ 'with conflict: 0': 'with conflict: 0' });

        expect(() => faker.helpers.unique(method, [], { store })).toThrow();

        delete store['with conflict: 0'];

        expect(faker.helpers.unique(method, [], { store })).toBe(
          'with conflict: 0'
        );
        expect(store).toEqual({ 'with conflict: 0': 'with conflict: 0' });
      });
    });
  });
});
