import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('commerce', () => {
  seededTests(faker, 'commerce', (t) => {
    t.itEach(
      'department',
      'productName',
      'productAdjective',
      'productMaterial',
      'product',
      'productDescription'
    );

    t.describe('price', (t) => {
      t.it('noArgs')
        .it('with min', 50)
        .it('with max', undefined, 100)
        .it('with min and max', 50, 100)
        .it('with min and max and decimals', 50, 100, 4)
        .it('with min and max and decimals and symbol', 50, 100, 4, '$')
        .it('with min option', { min: 42 })
        .it('with max option', { max: 1337 })
        .it('with min and max option', { min: 50, max: 100 })
        .it('with min and max and decimals option', {
          min: 50,
          max: 100,
          dec: 4,
        })
        .it('with min and max and decimals and symbol option', {
          min: 50,
          max: 100,
          dec: 4,
          symbol: '$',
        });
    });
  });

  describe(
    `random seeded tests for seed ${faker.seed()}`,
    () => {
      describe(`department()`, () => {
        it('should return random value from department array', () => {
          const department = faker.commerce.department();
          expect(faker.definitions.commerce.department).toContain(department);
        });
      });

      describe(`productName()`, () => {
        it('should return random values from product arrays', () => {
          const name = faker.commerce.productName();
          expect(name.split(' ').length).toBeGreaterThanOrEqual(3);

          const parts = name.split(' ');
          expect(faker.definitions.commerce.product_name.adjective).toContain(
            parts[0]
          );
          expect(faker.definitions.commerce.product_name.material).toContain(
            parts[1]
          );
          expect(faker.definitions.commerce.product_name.product).toContain(
            parts[2]
          );
        });
      });

      describe(`price()`, () => {
        it('should use the default amounts when not passing arguments', () => {
          const price = faker.commerce.price();

          expect(price).toBeTruthy();
          expect(price).toBeTypeOf('string');
          expect(+price).toBeGreaterThan(0);
          expect(+price).toBeLessThanOrEqual(1000);
        });

        it('should use the default decimal location when not passing arguments', () => {
          const price = faker.commerce.price();

          const decimal = '.';
          const expected = price.length - 3;

          const actual = price.indexOf(decimal);

          expect(
            actual,
            `The expected location of the decimal is ${expected} but it was ${actual} amount ${price}`
          ).toBe(expected);
        });

        it('should not include a currency symbol by default', () => {
          const amount = faker.commerce.price();

          expect(
            amount,
            'The expected match should not include a currency symbol'
          ).toMatch(/^[0-9\.]+$/);
        });

        it('should handle negative amounts, but return 0', () => {
          const amount = faker.commerce.price(-200, -1);

          expect(amount).toBeTruthy();
          expect(amount, 'the amount should equal 0').toBe('0');
        });

        it('should handle argument dec', () => {
          const price = faker.commerce.price(100, 100, 1);

          expect(price).toBeTruthy();
          expect(price, 'the price should be equal 100.0').toBe('100.0');
        });

        it('should handle argument dec = 0', () => {
          const price = faker.commerce.price(100, 100, 0);

          expect(price).toBeTruthy();
          expect(price, 'the price should be equal 100').toBe('100');
        });
      });

      describe(`productAdjective()`, () => {
        it('should return random value from product adjective array', () => {
          const actual = faker.commerce.productAdjective();
          expect(faker.definitions.commerce.product_name.adjective).toContain(
            actual
          );
        });
      });

      describe(`productMaterial()`, () => {
        it('should return random value from product material array', () => {
          const actual = faker.commerce.productMaterial();
          expect(faker.definitions.commerce.product_name.material).toContain(
            actual
          );
        });
      });

      describe(`product()`, () => {
        it('should return random value from product array', () => {
          const actual = faker.commerce.product();
          expect(faker.definitions.commerce.product_name.product).toContain(
            actual
          );
        });
      });

      describe(`productDescription()`, () => {
        it('should return random value from product description array', () => {
          const actual = faker.commerce.productDescription();
          expect(faker.definitions.commerce.product_description).toContain(
            actual
          );
        });
      });
    },
    {
      repeats: NON_SEEDED_BASED_RUN,
    }
  );
});
