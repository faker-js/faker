import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['chemicalElement', 'unit'];

describe('science', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.science[functionName]();

          expect(actual).toMatchSnapshot();
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
      describe(`chemicalElement()`, () => {
        it('should return an object', () => {
          const name = faker.science.chemicalElement();

          expect(name).toBeTypeOf('object');
        });

        it('should return a valid element name when referenced into', () => {
          const name = faker.science.chemicalElement().name;

          expect(name).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.chemicalElement.find(
              (element) => element.name === name
            );
          }).toBeTruthy();
        });

        it('should return a valid element symbol when referenced into', () => {
          const symbol = faker.science.chemicalElement().symbol;

          expect(symbol).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.chemicalElement.find(
              (element) => element.symbol === symbol
            );
          }).toBeTruthy();
        });

        it('should return a valid element atomic number when referenced into', () => {
          const atomicNumber = faker.science.chemicalElement().atomicNumber;

          expect(atomicNumber).toBeTypeOf('number');
          expect(() => {
            faker.definitions.science.chemicalElement.find(
              (element) => element.atomicNumber === atomicNumber
            );
          }).toBeTruthy();
        });
      });

      describe(`unit()`, () => {
        it('should return an object', () => {
          const unit = faker.science.unit();

          expect(unit).toBeTypeOf('object');
        });

        it('should return a valid unit name when referenced into', () => {
          const name = faker.science.unit().name;

          expect(name).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.unit.find((unit) => unit.name === name);
          }).toBeTruthy();
        });

        it('should return a valid unit symbol when referenced into', () => {
          const symbol = faker.science.unit().symbol;

          expect(symbol).toBeTypeOf('string');
          expect(() => {
            faker.definitions.science.unit.find(
              (unit) => unit.symbol === symbol
            );
          }).toBeTruthy();
        });
      });
    }
  });
});
