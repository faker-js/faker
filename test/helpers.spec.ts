import { afterEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededTests } from './support/seededRuns';
import './vitest-extensions';

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

    t.describe('arrayElement', (t) => {
      t.it('noArgs').it('with array', 'Hello World!'.split(''));
    });

    t.describe('weightedArrayElement', (t) => {
      t.it('with array', [
        ['sunny', 5],
        ['rainy', 4],
        ['snowy', 1],
      ]);
    });

    t.describe('arrayElements', (t) => {
      t.it('noArgs')
        .it('with array', 'Hello World!'.split(''))
        .it('with array', 'Hello World!'.split(''), 3);
    });

    t.describe('shuffle', (t) => {
      t.it('with array', 'Hello World!'.split(''))
        .it('with array and inplace true', 'Hello World!'.split(''), {
          inplace: true,
        })
        .it('with array and inplace false', 'Hello World!'.split(''), {
          inplace: false,
        });
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

    t.describe('rangeToNumber', (t) => {
      t.it('with number', 5).it('with range', { min: 1, max: 10 });
    });

    t.describe('unique', (t) => {
      t.it('with customMethod', customUniqueMethod)
        .it('with customMethod and args', customUniqueMethod, ['prefix-1-'])
        .it('with () => number', faker.number.int)
        .it('with () => number and args', faker.number.int, [50]);
    });

    t.describe('multiple', (t) => {
      t.it('with only method', faker.datatype.number)
        .it('with method and count', faker.datatype.number, { count: 5 })
        .it('with method and count range', faker.datatype.number, {
          count: { min: 1, max: 10 },
        });
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

      describe('weightedArrayElement', () => {
        it('should return a weighted random element in the array', () => {
          const testArray: [string, number][] = [
            ['hello', 10],
            ['to', 5],
            ['you', 3],
            ['my', 2],
            ['friend', 1],
          ];
          const actual = faker.helpers.weightedArrayElement(testArray);

          expect(testArray.map((a) => a[0])).toContain(actual);
        });

        it('should return the only element in the array when there is only 1', () => {
          const testArray: [string, number][] = [['hello', 10]];
          const actual = faker.helpers.weightedArrayElement(testArray);

          expect(actual).toBe('hello');
        });
        it('should throw if the array is empty', () => {
          expect(() => faker.helpers.weightedArrayElement([])).to.throw();
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
          expect(subset).not.toContainDuplicates();
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
        it('removes non-word characters from strings except . and -', () => {
          expect(faker.helpers.slugify('foo bar')).toBe('foo-bar');
          expect(faker.helpers.slugify('Faker is cool')).toBe('Faker-is-cool');
          expect(faker.helpers.slugify('super*star')).toBe('superstar');
          expect(faker.helpers.slugify("d'angelo.net")).toBe('dangelo.net');
          expect(faker.helpers.slugify('hello你好')).toBe('hello');
        });

        it('strips simple diacritics from strings', () => {
          expect(faker.helpers.slugify('Aiden.Harªann')).toBe('Aiden.Haraann');
          expect(faker.helpers.slugify('Adèle.Argüello')).toBe(
            'Adele.Arguello'
          );
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
            '%'.repeat(10)
          );
          expect(faker.helpers.regexpStyleStringParse('%{30}')).toBe(
            '%'.repeat(30)
          );
          expect(faker.helpers.regexpStyleStringParse('%{5}')).toBe(
            '%'.repeat(5)
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
          const shuffled = faker.helpers.shuffle(input, { inplace: true });
          expect(shuffled).deep.eq(input);
        });

        it('does not mutate the input array by default', () => {
          const input = Object.freeze([
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
          ]);
          expect(() => faker.helpers.shuffle(input)).not.to.throw();
        });

        it('does not mutate the input array when inplace is false', () => {
          const input = Object.freeze([
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
          ]);
          expect(() =>
            faker.helpers.shuffle(input, { inplace: false })
          ).not.to.throw();
        });

        it('throws an error when the input array is readonly and inplace is true', () => {
          const input = Object.freeze([
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
          ]);
          expect(() =>
            // @ts-expect-error: we want to test that it throws
            faker.helpers.shuffle(input, { inplace: true })
          ).to.throw();
        });
      });

      describe('uniqueArray()', () => {
        it('custom array returns unique array', () => {
          const input = ['a', 'a', 'a', 'a,', 'a', 'a', 'a', 'a', 'b'];
          const length = 2;
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).not.toContainDuplicates();
          expect(unique).toHaveLength(length);
        });

        it('definition array returns unique array', () => {
          const length = faker.number.int({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(
            faker.definitions.hacker.noun,
            length
          );
          expect(unique).not.toContainDuplicates();
          expect(unique).toHaveLength(length);
        });

        it('function returns unique array', () => {
          const length = faker.number.int({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(faker.lorem.word, length);
          expect(unique).not.toContainDuplicates();
          expect(unique).toHaveLength(length);
        });

        it('empty array returns empty array', () => {
          const input = [];
          const length = faker.number.int({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(0);
        });

        it('length longer than source returns max length', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const length = input.length + 1;
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).not.toContainDuplicates();
          expect(unique).toHaveLength(input.length);
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
            value: faker.string.sample(2),
          });

          expect(actual).toHaveLength(4);
        });

        it('supports function replace values faker function', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: () => faker.string.sample(3),
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
        it('replaces a token with a random value for a method without parentheses', () => {
          const actual = faker.helpers.fake('{{string.numeric}}');
          expect(actual).toMatch(/^\d$/);
        });

        it('replaces multiple tokens with random values for methods without parentheses', () => {
          const actual = faker.helpers.fake(
            '{{string.numeric}}{{string.numeric}}{{string.numeric}}'
          );
          expect(actual).toMatch(/^\d{3}$/);
        });

        it('replaces a token with a random value for a method with empty parentheses', () => {
          const actual = faker.helpers.fake('{{string.numeric()}}');
          expect(actual).toMatch(/^\d$/);
        });

        it('replaces a token with a random value for a method with an unquoted parameter', () => {
          const random = faker.helpers.fake('{{helpers.slugify(This Works)}}');
          expect(random).toBe('This-Works');
        });

        it('replaces a token with a random value for a method with a simple parameter', () => {
          const actual = faker.helpers.fake('{{string.numeric(3)}}');
          expect(actual).toMatch(/^\d{3}$/);
        });

        it('replaces a token with a random value for a method with an array parameter', () => {
          const arr = ['one', 'two', 'three'];
          const actual = faker.helpers.fake(
            '{{helpers.arrayElement(["one", "two", "three"])}}'
          );
          expect(arr).toContain(actual);
        });

        it('replaces a token with a random value for a method with an object parameter', () => {
          const actual = faker.helpers.fake('{{random.alpha({"count": 3})}}');
          expect(actual).toMatch(/^[a-z]{3}$/i);
        });

        it('replaces a token with a random value for a method with multiple parameters', () => {
          const actual = faker.helpers.fake(
            '{{string.numeric(5, {"allowLeadingZeros": true})}}'
          );
          expect(actual).toMatch(/^\d{5}$/);
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
          expect(() => faker.helpers.fake('{{location}}')).toThrowError(
            new FakerError(`Invalid module method or definition: location
- faker.location is not a function
- faker.definitions.location is not an array`)
          );
        });

        it('does not allow invalid method name', () => {
          expect(() => faker.helpers.fake('{{location.foo}}')).toThrowError(
            new FakerError(`Invalid module method or definition: location.foo
- faker.location.foo is not a function
- faker.definitions.location.foo is not an array`)
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
          expect(faker.helpers.fake('{{string.alphanumeric(0)}}')).toBe('');
        });

        it('should be able to return locale definition strings', () => {
          expect(faker.definitions.cell_phone.formats).toContain(
            faker.helpers.fake('{{cell_phone.formats}}')
          );
        });

        it('should be able to return locale definition strings that starts with the name of an existing module', () => {
          expect(faker.definitions.location.city_name).toContain(
            faker.helpers.fake('{{location.city_name}}')
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
          expect(faker.helpers.fake('}}hello{{string.alpha}}')).toMatch(
            /^}}hello[a-zA-Z]$/
          );
        });

        it('should be able to handle connected brackets', () => {
          expect(faker.helpers.fake('{{{string.alpha}}}')).toMatch(
            /^{[a-zA-Z]}$/
          );
        });

        it('should be able to handle empty brackets', () => {
          expect(faker.helpers.fake('{{}}')).toBe('{{}}');
        });

        it('should be able to handle special replacement patterns', () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (faker.string as any).special = () => '$&';

          expect(faker.helpers.fake('{{string.special}}')).toBe('$&');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (faker.string as any).special;
        });

        it('should support deprecated aliases', () => {
          expect(faker.definitions.person.first_name).toContain(
            faker.helpers.fake('{{name.first_name}}')
          );
          expect(faker.definitions.person.first_name).toContain(
            faker.helpers.fake('{{name.firstName}}')
          );
        });
      });

      describe('rangeToNumber()', () => {
        it('should return a number', () => {
          expect(faker.helpers.rangeToNumber(1)).toBe(1);
        });

        it('should return a number in a range', () => {
          const actual = faker.helpers.rangeToNumber({ min: 1, max: 10 });
          expect(actual).toBeGreaterThanOrEqual(1);
          expect(actual).toBeLessThanOrEqual(10);
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

    describe('multiple()', () => {
      it('should generate values from the function with a default length of 3', () => {
        const result = faker.helpers.multiple(faker.person.firstName);
        expect(result).toBeTypeOf('object');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(3);
      });

      it('should generate the given amount of values from the function', () => {
        const result = faker.helpers.multiple(faker.person.firstName, {
          count: 5,
        });
        expect(result).toBeTypeOf('object');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(5);
      });

      it('should generate a ranged number of values from the function', () => {
        const result = faker.helpers.multiple(faker.person.firstName, {
          count: { min: 1, max: 10 },
        });
        expect(result).toBeTypeOf('object');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(10);
      });
    });
  });
});
