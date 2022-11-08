import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('watch', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'watch', (t) => {
    t.itEach(
      'watchBrand',
      'watchModel',
      'watchCaliber',
      'watchMovement',
      'watchBraceletType',
      'watchBezelMaterial',
      'watchBraceletMaterial',
      'watchCaseMaterial',
      'watchDiameter',
      'watchItemNumber',
      'watchColor',
      'watchYear',
      'watchGender'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('should return a brand', () => {
          const brand = faker.watch.watchBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.watch?.brand).toContain(brand);
        });
      });

      describe('model()', () => {
        it('returns a random model', () => {
          const model = faker.watch.watchModel();

          expect(model).toBeTruthy();
          expect(model).toBeTypeOf('string');
          expect(faker.definitions.watch?.model).toContain(model);
        });
      });

      describe('caliber()', () => {
        it('returns a random caliber', () => {
          const caliber = faker.watch.watchCaliber();

          expect(caliber).toBeTruthy();
          expect(caliber).toBeTypeOf('string');
          expect(faker.definitions.watch?.caliber).toContain(caliber);
        });
      });

      describe('movement()', () => {
        it('returns a random movement', () => {
          const movement = faker.watch.watchMovement();

          expect(movement).toBeTruthy();
          expect(movement).toBeTypeOf('string');
          expect(faker.definitions.watch?.movement).toContain(movement);
        });
      });

      describe('braceletType()', () => {
        it('returns a random style', () => {
          const braceletType = faker.watch.watchBraceletType();

          expect(braceletType).toBeTruthy();
          expect(braceletType).toBeTypeOf('string');
          expect(faker.definitions.watch?.braceletType).toContain(braceletType);
        });
      });

      describe('bezelMaterial()', () => {
        it('returns a random bezel material', () => {
          const bezelMaterial = faker.watch.watchBezelMaterial();

          expect(bezelMaterial).toBeTruthy();
          expect(bezelMaterial).toBeTypeOf('string');
          expect(faker.definitions.watch?.bezelMaterial).toContain(
            bezelMaterial
          );
        });
      });

      describe('braceletMaterial()', () => {
        it('returns a random bracelet material', () => {
          const braceletMaterial = faker.watch.watchBraceletMaterial();

          expect(braceletMaterial).toBeTruthy();
          expect(braceletMaterial).toBeTypeOf('string');
          expect(faker.definitions.watch?.bezelMaterial).toContain(
            braceletMaterial
          );
        });
      });

      describe('caseMaterial()', () => {
        it('returns a random material', () => {
          const bezelMaterial = faker.watch.watchCaseMaterial();

          expect(bezelMaterial).toBeTruthy();
          expect(bezelMaterial).toBeTypeOf('string');
          expect(faker.definitions.watch?.bezelMaterial).toContain(
            bezelMaterial
          );
        });
      });

      describe('diameter()', () => {
        it('returns a random diameter', () => {
          const diameter = faker.watch.watchDiameter();

          expect(diameter).toBeTruthy();
          expect(diameter).toBeTypeOf('string');
          expect(faker.definitions.watch?.diameter).toContain(diameter);
        });
      });

      describe('itemNumber()', () => {
        it('returns a random item number', () => {
          const itemNumber = faker.watch.watchItemNumber();

          expect(itemNumber).toBeTruthy();
          expect(itemNumber).toBeTypeOf('string');
          expect(faker.definitions.watch?.itemNumber).toContain(itemNumber);
        });
      });

      describe('color()', () => {
        it('returns a random color', () => {
          const color = faker.watch.watchColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });

      describe('year()', () => {
        it('returns a random year', () => {
          const year = faker.watch.watchYear();

          expect(year).toBeTruthy();
          expect(year).toBeTypeOf('number');
          expect(year).toBeGreaterThanOrEqual(1900);
          expect(year).toBeLessThanOrEqual(2022);
        });
      });

      describe('gender()', () => {
        it('returns a random gender', () => {
          const gender = faker.watch.watchGender();

          expect(gender).toBeTruthy();
          expect(gender).toBeTypeOf('string');
        });
      });
    }
  });
});
