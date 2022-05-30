import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      element: 'black',
      unit: 'hsl',
    },
  },
  {
    seed: 1337,
    expectations: {
      element: 'black',
      unit: 'hsl',
    },
  },
  {
    seed: 1211,
    expectations: {
      element: 'black',
      unit: 'hsl',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['element', 'unit'];

describe('science', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.science[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe(`element()`, () => {
        it('should return an object', () => {
          const name = faker.science.element();

          expect(name).toBeTypeOf('object');
        });

        it('should return a valid element name when referenced into', () => {
          const name = faker.science.element().name;

          expect(name).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.chemicalElement.find(
              (element) => element.name === name
            );
          }).toBeTruthy();
        });

        it('should return a valid element symbol when referenced into', () => {
          const symbol = faker.science.element().symbol;

          expect(symbol).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.chemicalElement.find(
              (element) => element.symbol === symbol
            );
          }).toBeTruthy();
        });
      });

      describe(`unit()`, () => {
        it('should return an object', () => {
          const unit = faker.science.unit();

          expect(unit).toBeTypeOf('object');
        });

        it('should return a valid long unit when referenced into', () => {
          const long = faker.science.unit().long;

          expect(long).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.unit.find((unit) => unit.long === long);
          }).toBeTruthy();
        });

        it('should return a valid short/abbreviated unit when referenced into', () => {
          const short = faker.science.unit().short;

          expect(short).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.unit.find((unit) => unit.short === short);
          }).toBeTruthy();
        });
      });
    }
  });
});
