import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('hat', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'hat', (t) => {
    t.itEach(
      'hatBrand',
      'hatDescription',
      'hatMaterial',
      'hatStyle',
      'hatSize',
      'hatColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.hat.hatBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.hat?.brand).toContain(brand);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.hat.hatDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.hat?.description).toContain(description);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.hat.hatMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.hat?.material).toContain(material);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.hat.hatStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.hat?.style).toContain(style);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.hat.hatSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.hat?.size).toContain(size);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.hat.hatColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
