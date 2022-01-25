import { afterEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      color: 'grey',
      department: 'Tools',
      productName: 'Fantastic Soft Sausages',
      price: '375.00',
      productAdjective: 'Fantastic',
      productMaterial: 'Cotton',
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
      productName: 'Gorgeous Rubber Keyboard',
      price: '263.00',
      productAdjective: 'Gorgeous',
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
      productName: 'Unbranded Granite Salad',
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

  for (let { seed, expectations } of seededRuns) {
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

  describe('non seed-based tests', () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`color()`, () => {
        it('should return random value from color array', () => {
          const actual = faker.commerce.color();
          expect(faker.definitions.commerce.color).toContain(actual);
        });
      });

      describe(`department()`, () => {
        it('', () => {
          const department = faker.commerce.department();
          expect(department.split(' ')).toHaveLength(1);
        });
      });

      describe(`productName()`, () => {
        it('', () => {
          const name = faker.commerce.productName();
          expect(name.split(' ').length).greaterThanOrEqual(3);
        });
      });

      describe(`price()`, () => {
        it('should use the default amounts when not passing arguments', () => {
          const price = faker.commerce.price();

          expect(price).toBeTruthy();
          // TODO @Shinigami92 2022-01-20: I converted the price string to number to satisfy TS
          expect(+price > 0, 'the amount should be greater than 0').toBe(true);
          expect(+price < 1001, 'the amount should be less than 1000').toBe(
            true
          );
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
          expect(price, 'the price should be equal 100.0').toStrictEqual(
            '100.0'
          );
        });

        it('it should handle argument dec = 0', () => {
          const price = faker.commerce.price(100, 100, 0);

          expect(price).toBeTruthy();
          expect(price, 'the price should be equal 100').toStrictEqual('100');
        });
      });

      describe(`productAdjective()`, () => {
        it('', () => {});
      });

      describe(`productMaterial()`, () => {
        it('', () => {});
      });

      describe(`product()`, () => {
        it('', () => {});
      });

      describe(`productDescription()`, () => {
        it('should return a random product description', () => {
          const description = faker.commerce.productDescription();
          expect(typeof description).toBe('string');
        });
      });
    }
  });
});
