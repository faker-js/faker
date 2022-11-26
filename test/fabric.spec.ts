import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('fabric', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'fabric', (t) => {
    t.itEach(
      'fabricName',
      'fabricDescription',
      'fabricCategory',
      'fabricComposition',
      'fabricStyle',
      'fabricColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.fabric.fabricName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.fabric?.name).toContain(name);
        });
      });

      describe('description()', () => {
        it('should return a description', () => {
          const description = faker.fabric.fabricDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.fabric?.description).toContain(description);
        });
      });

      describe('category()', () => {
        it('returns a random category', () => {
          const category = faker.fabric.fabricCategory();

          expect(category).toBeTruthy();
          expect(category).toBeTypeOf('string');
          expect(faker.definitions.fabric?.category).toContain(category);
        });
      });

      describe('composition()', () => {
        it('returns a random composition', () => {
          const composition = faker.fabric.fabricComposition();

          expect(composition).toBeTruthy();
          expect(composition).toBeTypeOf('string');
          expect(faker.definitions.fabric?.composition).toContain(composition);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.fabric.fabricStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.fabric?.style).toContain(style);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.fabric.fabricColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
