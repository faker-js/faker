import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      elementName: 'black',
      elementSymbol: 'ProPhoto RGB science Space',
      elementUnit: 'hsl',
    },
  },
  {
    seed: 1337,
    expectations: {
      elementName: 'black',
      elementSymbol: 'ProPhoto RGB science Space',
      elementUnit: 'hsl',
    },
  },
  {
    seed: 1211,
    expectations: {
      elementName: 'black',
      elementSymbol: 'ProPhoto RGB science Space',
      elementUnit: 'hsl',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['elementName', 'elementSymbol', 'unit'];

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
      describe(`elementName()`, () => {
        it('should return a string', () => {
          const name = faker.science.elementName();

          expect(name).toBeTypeOf('string');
        });

        it('should return a valid element name', () => {
          const name = faker.science.elementName();

          expect(() => {
            faker.definitions.science.element.find(
              (element) => element.name === name
            );
          }).toBeTruthy();
        });
      });

      describe(`elementSymbol()`, () => {
        it('should return a string', () => {
          const symbol = faker.science.elementSymbol();

          expect(symbol).toBeTypeOf('string');
        });

        it('should return a valid element symbol', () => {
          const symbol = faker.science.elementSymbol();

          expect(() => {
            faker.definitions.science.element.find(
              (element) => element.symbol === symbol
            );
          }).toBeTruthy();
        });
      });

      describe(`unit()`, () => {
        it('should return a string', () => {
          const unit = faker.science.unit();

          expect(unit).toBeTypeOf('string');
        });

        it('should return a long unit when no argument is passed in', () => {
          const unit = faker.science.unit();

          expect(faker.definitions.science.longUnit).toContain(unit);
        });

        it('should return a short unit when the `long` argument is false', () => {
          const unit = faker.science.unit({ long: false });

          expect(faker.definitions.science.shortUnit).toContain(unit);
        });

        it('should return a long unit when the `long` argument is true', () => {
          const unit = faker.science.unit({ long: true });

          expect(faker.definitions.science.longUnit).toContain(unit);
        });
      });
    }
  });
});
