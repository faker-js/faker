import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      color: 'grey',
      department: 'Tools',
      productName: 'Fantastic Soft Sausages',
      price: '375.00',
      productAdjective: 'Fantastic',
      productMaterial: 'Plastic',
      product: 'Pants',
      productDescription:
        'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    },
  },
  {
    seed: 1337,
    expectations: {
      color: 'black',
      department: 'Computers',
      productName: 'Incredible Granite Keyboard',
      price: '263.00',
      productAdjective: 'Incredible',
      productMaterial: 'Concrete',
      product: 'Ball',
      productDescription:
        'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    },
  },
  {
    seed: 1211,
    expectations: {
      color: 'azure',
      department: 'Automotive',
      productName: 'Unbranded Cotton Salad',
      price: '929.00',
      productAdjective: 'Unbranded',
      productMaterial: 'Frozen',
      product: 'Sausages',
      productDescription:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'color',
  'department',
  'productName',
  'price',
  'productAdjective',
  'productMaterial',
  'product',
  'productDescription',
];

describe('commerce', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.commerce[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`color()`, () => {
        it('should return random value from color array', () => {
          const actual = faker.commerce.color();
          expect(faker.definitions.commerce.color).toContain(actual);
        });
      });

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
          expect(price, 'the price should be equal 100.0').toStrictEqual(
            '100.0'
          );
        });

        it('should handle argument dec = 0', () => {
          const price = faker.commerce.price(100, 100, 0);

          expect(price).toBeTruthy();
          expect(price, 'the price should be equal 100').toStrictEqual('100');
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
    }
  });
});
