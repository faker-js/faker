import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('commerce', () => {
  describe('color()', () => {
    it('returns random value from commerce.color array', () => {
      const color = faker.commerce.color();
      expect(faker.definitions.commerce.color).toContain(color);
    });
  });

  describe('department(max, fixedValue)', () => {
    it('should use the default amounts when not passing arguments', () => {
      const department = faker.commerce.department();
      expect(department.split(' ')).toHaveLength(1);
    });

    /*

    it("should return only one value if we specify a maximum of one", function() {
        sinon.spy(faker.random, 'arrayElement');

        const department = faker.commerce.department(1);

        assert.strictEqual(department.split(" ").length, 1);
        assert.ok(faker.random.arrayElement.calledOnce);

        faker.random.arrayElement.restore();
    });

    it("should return the maximum value if we specify the fixed value", function() {
        sinon.spy(faker.random, 'arrayElement');

        const department = faker.commerce.department(5, true);

        console.log(department);

        // account for the separator
        assert.strictEqual(department.split(" ").length, 6);
        // Sometimes it will generate duplicates that aren't used in the final string,
        // so we check if arrayElement has been called exactly or more than 5 times
        assert.ok(faker.random.arrayElement.callCount >= 5);

        faker.random.arrayElement.restore();
    });
    */
  });

  describe('productName()', () => {
    it('returns name comprising of an adjective, material and product', () => {
      const spy_random_arrayElement = vi.spyOn(faker.random, 'arrayElement');
      const spy_commerce_productAdjective = vi.spyOn(
        faker.commerce,
        'productAdjective'
      );
      const spy_commerce_productMaterial = vi.spyOn(
        faker.commerce,
        'productMaterial'
      );
      const spy_commerce_product = vi.spyOn(faker.commerce, 'product');

      const name = faker.commerce.productName();

      expect(name.split(' ').length).greaterThanOrEqual(3);

      expect(spy_random_arrayElement).toHaveBeenCalledTimes(3);
      expect(spy_commerce_productAdjective).toHaveBeenCalledOnce();
      expect(spy_commerce_productMaterial).toHaveBeenCalledOnce();
      expect(spy_commerce_product).toHaveBeenCalledOnce();

      spy_random_arrayElement.mockRestore();
      spy_commerce_productAdjective.mockRestore();
      spy_commerce_productMaterial.mockRestore();
      spy_commerce_product.mockRestore();
    });
  });

  describe('price(min, max, dec, symbol)', () => {
    it('should use the default amounts when not passing arguments', () => {
      const price = faker.commerce.price();

      expect(price).toBeTruthy();
      // TODO @Shinigami92 2022-01-20: I converted the price string to number to satisfy TS
      expect(+price > 0, 'the amount should be greater than 0').toBe(true);
      expect(+price < 1001, 'the amount should be less than 1000').toBe(true);
    });

    it('should use the default decimal location when not passing arguments', () => {
      const price = faker.commerce.price();

      const decimal = '.';
      const expected = price.length - 3;
      const actual = price.indexOf(decimal);

      expect(
        actual,
        'The expected location of the decimal is ' +
          expected +
          ' but it was ' +
          actual +
          ' amount ' +
          price
      ).toBe(expected);
    });

    it('should not include a currency symbol by default', () => {
      const amount = faker.commerce.price();

      const regexp = new RegExp(/[0-9.]/);

      const expected = true;
      const actual = regexp.test(amount);

      expect(
        actual,
        'The expected match should not include a currency symbol'
      ).toBe(expected);
    });

    it('it should handle negative amounts, but return 0', () => {
      const amount = faker.commerce.price(-200, -1);

      expect(amount).toBeTruthy();
      // TODO @Shinigami92 2022-01-20: I converted the price string to number to satisfy TS
      expect(+amount === 0.0, 'the amount should equal 0').toBe(true);
    });

    it('it should handle argument dec', () => {
      const price = faker.commerce.price(100, 100, 1);

      expect(price).toBeTruthy();
      expect(price, 'the price should be equal 100.0').toStrictEqual('100.0');
    });

    it('it should handle argument dec = 0', () => {
      const price = faker.commerce.price(100, 100, 0);

      expect(price).toBeTruthy();
      expect(price, 'the price should be equal 100').toStrictEqual('100');
    });
  });

  describe('productDescription()', () => {
    it('returns a random product description', () => {
      const spy_commerce_productDescription = vi.spyOn(
        faker.commerce,
        'productDescription'
      );

      const description = faker.commerce.productDescription();

      expect(typeof description).toBe('string');
      expect(spy_commerce_productDescription).toHaveBeenCalledOnce();

      spy_commerce_productDescription.mockRestore();
    });
  });
});
