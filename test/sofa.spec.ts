import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('sofa', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'sofa', (t) => {
    t.itEach(
      'sofaName',
      'sofaCategory',
      'sofaStyle',
      'sofaMaterial',
      'sofaSitting',
      'sofaColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.sofa.sofaName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.sofa?.name).toContain(name);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.sofa.sofaCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.sofa?.category).toContain(category);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.sofa.sofaStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.sofa?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.sofa.sofaMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.sofa?.material).toContain(material);
        });
      });

      describe('sitting()', () => {
        it('returns a random sitting', () => {
          const sitting = faker.sofa.sofaSitting();

          expect(sitting).toBeTruthy();
          expect(sitting).toBeTypeOf('string');
          expect(faker.definitions.sofa?.sitting).toContain(sitting);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.sofa.sofaColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
