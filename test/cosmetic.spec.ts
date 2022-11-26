import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('cosmetic', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'cosmetic', (t) => {
    t.itEach(
      'cosmeticName',
      'cosmeticBrand',
      'cosmeticCategory',
      'cosmeticDescription',
      'cosmeticHowToUse'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.cosmetic.cosmeticName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.cosmetic?.name).toContain(name);
        });
      });

      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.cosmetic.cosmeticBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.cosmetic?.brand).toContain(brand);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.cosmetic.cosmeticCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.cosmetic?.category).toContain(category);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.cosmetic.cosmeticDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.cosmetic?.description).toContain(
            description
          );
        });
      });

      describe('howToUse()', () => {
        it('returns a random how to use', () => {
          const howToUse = faker.cosmetic.cosmeticHowToUse();

          expect(howToUse).toBeTruthy();
          expect(howToUse).toBeTypeOf('string');
          expect(faker.definitions.cosmetic?.howToUse).toContain(howToUse);
        });
      });
    }
  });
});
