import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('condom', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'condom', (t) => {
    t.itEach(
      'condomBrand',
      'condomName',
      'condomType',
      'condomDescription',
      'condomMaterial',
      'condomFlavour',
      'condomLubricant',
      'condomSize',
      'condomColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.condom.condomBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.condom?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('returns a random name', () => {
          const name = faker.condom.condomName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.condom?.name).toContain(name);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.condom.condomType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.condom?.type).toContain(type);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.condom.condomDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.condom?.description).toContain(description);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.condom.condomMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.condom?.material).toContain(material);
        });
      });

      describe('flavour()', () => {
        it('returns a random flavour', () => {
          const flavour = faker.condom.condomFlavour();

          expect(flavour).toBeTruthy();
          expect(flavour).toBeTypeOf('string');
          expect(faker.definitions.condom?.flavour).toContain(flavour);
        });
      });

      describe('lubricant()', () => {
        it('returns a random lubricant', () => {
          const lubricant = faker.condom.condomLubricant();

          expect(lubricant).toBeTruthy();
          expect(lubricant).toBeTypeOf('string');
          expect(faker.definitions.condom?.lubricant).toContain(lubricant);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.condom.condomSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.condom?.size).toContain(size);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.condom.condomColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
