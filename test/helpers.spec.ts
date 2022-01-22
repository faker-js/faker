import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';
import { luhnCheck } from './support/luhnCheck';

describe('helpers.js', () => {
  describe('replaceSymbolWithNumber()', () => {
    describe('when no symbol passed in', () => {
      it("uses '#' by default", () => {
        const num = faker.helpers.replaceSymbolWithNumber('#AB');
        expect(num).match(/\dAB/);
      });
    });

    describe('when symbol passed in', () => {
      it('replaces that symbol with integers', () => {
        const num = faker.helpers.replaceSymbolWithNumber('#AB', 'A');
        expect(num).match(/#\dB/);
      });
    });
  });

  describe('replaceSymbols()', () => {
    describe("when '*' passed", () => {
      it('replaces it with alphanumeric', () => {
        const num = faker.helpers.replaceSymbols('*AB');
        expect(num).match(/\wAB/);
      });
    });
  });

  describe('shuffle()', () => {
    it('the output is the same length as the input', () => {
      const spy_datatype_number = vi.spyOn(faker.datatype, 'number');

      const shuffled = faker.helpers.shuffle(['a', 'b']);

      expect(shuffled).toHaveLength(2);
      expect(spy_datatype_number).toHaveBeenCalledWith(1);

      spy_datatype_number.mockRestore();
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

  describe('slugify()', () => {
    it('removes unwanted characters from URI string', () => {
      expect(faker.helpers.slugify('Aiden.Harªann')).toBe('Aiden.Harann');
      expect(faker.helpers.slugify("d'angelo.net")).toBe('dangelo.net');
    });
  });

  describe('mustache()', () => {
    it('returns empty string with no arguments', () => {
      expect(
        // @ts-expect-error
        faker.helpers.mustache()
      ).toBe('');
    });
  });

  describe('repeatString()', () => {
    it('returns empty string with no arguments', () => {
      expect(
        // @ts-expect-error
        faker.helpers.repeatString()
      ).toBe('');
    });
  });

  describe('replaceSymbols()', () => {
    it('returns empty string with no arguments', () => {
      expect(faker.helpers.replaceSymbols()).toBe('');
    });
  });

  /*
    describe("replaceCreditCardSymbols()",  () =>{
        it("returns empty string with no arguments",  () =>{
            assert.equal(faker.helpers.replaceCreditCardSymbols(), "");
        });
    });
    */

  describe('createCard()', () => {
    it('returns an object', () => {
      const card = faker.helpers.createCard();
      expect(typeof card).toBe('object');
    });
  });

  describe('contextualCard()', () => {
    it('returns an object', () => {
      const card = faker.helpers.contextualCard();
      expect(typeof card).toBe('object');
    });
  });

  describe('userCard()', () => {
    it('returns an object', () => {
      const card = faker.helpers.userCard();
      expect(typeof card).toBe('object');
    });
  });

  // Make sure we keep this function for backward-compatibility.
  describe('randomize()', () => {
    it('returns a random element from an array', () => {
      const arr = ['a', 'b', 'c'];
      const elem = faker.helpers.randomize(arr);
      expect(elem).toBeTruthy();
      expect(arr).toContain(elem);
    });
  });

  describe('replaceCreditCardSymbols()', () => {
    it('returns a credit card number given a schema', () => {
      const number = faker.helpers.replaceCreditCardSymbols(
        '6453-####-####-####-###L'
      );
      expect(number).match(
        /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
      );
      expect(luhnCheck(number)).toBeTruthy();
    });
    it('supports different symbols', () => {
      const number = faker.helpers.replaceCreditCardSymbols(
        '6453-****-****-****-***L',
        '*'
      );
      expect(number).match(
        /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
      );
      expect(luhnCheck(number)).toBeTruthy();
    });
    it('handles regexp style input', () => {
      let number = faker.helpers.replaceCreditCardSymbols(
        '6453-*{4}-*{4}-*{4}-*{3}L',
        '*'
      );
      expect(number).match(
        /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
      );
      expect(luhnCheck(number)).toBeTruthy();
      number = faker.helpers.replaceCreditCardSymbols(
        '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L'
      );
      expect(number).match(
        /^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/
      );
      expect(luhnCheck(number)).toBeTruthy();
    });
  });

  describe('regexpStyleStringParse()', () => {
    it('returns an empty string when called without param', () => {
      expect(faker.helpers.regexpStyleStringParse()).toBe('');
    });

    it('deals with range repeat', () => {
      const string = faker.helpers.regexpStyleStringParse('#{5,10}');
      expect(string.length).lessThanOrEqual(10);
      expect(string.length).greaterThanOrEqual(5);
      expect(string).match(/^\#{5,10}$/);
    });

    it('flips the range when min > max', () => {
      const string = faker.helpers.regexpStyleStringParse('#{10,5}');
      expect(string.length).lessThanOrEqual(10);
      expect(string.length).greaterThanOrEqual(5);
      expect(string).match(/^\#{5,10}$/);
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
      expect(string).match(/^Hello[0-9]$/);
    });

    it('deals with multiple tokens in one string', () => {
      const string = faker.helpers.regexpStyleStringParse(
        'Test#{5}%{2,5}Testing**[1-5]**{10}END'
      );
      expect(string).match(/^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/);
    });
  });

  describe('createTransaction()', () => {
    it('should create a random transaction', () => {
      const transaction = faker.helpers.createTransaction();
      expect(transaction).toBeTruthy();
      expect(transaction.amount).toBeTruthy();
      expect(transaction.date).toBeTruthy();
      expect(transaction.business).toBeTruthy();
      expect(transaction.name).toBeTruthy();
      expect(transaction.type).toBeTruthy();
      expect(transaction.account).toBeTruthy();
    });
  });
});
