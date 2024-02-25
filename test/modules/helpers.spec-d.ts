import { describe, expectTypeOf, it } from 'vitest';
import { faker } from '../../src';

describe('helpers', () => {
  describe('shuffle', () => {
    describe('inplace: true', () => {
      it('const generic single element', () => {
        const actual = faker.helpers.shuffle([1], { inplace: true });
        expectTypeOf(actual).toEqualTypeOf<Array<1>>();
      });

      it('const generic multiple elements', () => {
        const actual = faker.helpers.shuffle([1, 'a', false], {
          inplace: true,
        });
        expectTypeOf(actual).toEqualTypeOf<Array<1 | 'a' | false>>();
      });
    });

    describe('inplace: false', () => {
      it('const generic single element', () => {
        const actual = faker.helpers.shuffle([1], { inplace: false });
        expectTypeOf(actual).toEqualTypeOf<Array<1>>();
      });

      it('const generic multiple elements', () => {
        const actual = faker.helpers.shuffle([1, 'a', false], {
          inplace: false,
        });
        expectTypeOf(actual).toEqualTypeOf<Array<1 | 'a' | false>>();
      });
    });
  });

  describe('uniqueArray', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.uniqueArray([1], 1);
      expectTypeOf(actual).toEqualTypeOf<Array<1>>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.uniqueArray([1, 'a', false], 3);
      expectTypeOf(actual).toEqualTypeOf<Array<1 | 'a' | false>>();
    });
  });

  describe('maybe', () => {
    it('const generic single element', () => {
      // TODO @ST-DDT 2024-02-25: Check why this is detected as `number` instead of `1`
      const actual = faker.helpers.maybe(() => 1);
      expectTypeOf(actual).toEqualTypeOf<number | undefined>();
    });
  });

  describe('objectKey', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.objectKey({ a: 1 });
      expectTypeOf(actual).toEqualTypeOf<'a'>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.objectKey({ a: 1, b: 'a', c: false });
      expectTypeOf(actual).toEqualTypeOf<'a' | 'b' | 'c'>();
    });
  });

  describe('objectValue', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.objectValue({ a: 1 });
      expectTypeOf(actual).toEqualTypeOf<1>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.objectValue({ a: 1, b: 'a', c: false });
      expectTypeOf(actual).toEqualTypeOf<1 | 'a' | false>();
    });
  });

  describe('objectEntry', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.objectEntry({ a: 1 });
      expectTypeOf(actual).toEqualTypeOf<['a', 1]>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.objectEntry({ a: 1, b: 'a', c: false });
      // TODO @ST-DDT 2024-02-25: Check whether we can infer the return type any better
      expectTypeOf(actual).toEqualTypeOf<['a' | 'b' | 'c', false | 1 | 'a']>();
    });
  });

  describe('arrayElement', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.arrayElement([1]);
      expectTypeOf(actual).toEqualTypeOf<1>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.arrayElement([1, 'a', false]);
      expectTypeOf(actual).toEqualTypeOf<1 | 'a' | false>();
    });
  });

  describe('arrayElements', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.arrayElements([1], 1);
      expectTypeOf(actual).toEqualTypeOf<Array<1>>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.arrayElements([1, 'a', false], 3);
      expectTypeOf(actual).toEqualTypeOf<Array<1 | 'a' | false>>();
    });
  });

  describe('multiple', () => {
    it('const generic single element', () => {
      const actual = faker.helpers.multiple(() => 1);
      expectTypeOf(actual).toEqualTypeOf<number[]>();
    });

    it('const generic multiple elements', () => {
      const actual = faker.helpers.multiple(() => 1, { count: 3 });
      expectTypeOf(actual).toEqualTypeOf<number[]>();
    });
  });
});
