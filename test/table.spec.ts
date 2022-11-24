import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('table', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'table', (t) => {
    t.itEach(
      'tableBrand',
      'tableName',
      'tableRoom',
      'tableShape',
      'tableStyle',
      'tableMaterial',
      'tableColor'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('brand()', () => {
        it('returns a random brand', () => {
          const brand = faker.table.tableBrand();

          expect(brand).toBeTruthy();
          expect(brand).toBeTypeOf('string');
          expect(faker.definitions.table?.brand).toContain(brand);
        });
      });

      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.table.tableName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.table?.name).toContain(name);
        });
      });

      describe('room()', () => {
        it('should return a room', () => {
          const room = faker.table.tableRoom();

          expect(room).toBeTruthy();
          expect(room).toBeTypeOf('string');
          expect(faker.definitions.table?.room).toContain(room);
        });
      });

      describe('shape()', () => {
        it('should return a shape', () => {
          const shape = faker.table.tableShape();

          expect(shape).toBeTruthy();
          expect(shape).toBeTypeOf('string');
          expect(faker.definitions.table?.shape).toContain(shape);
        });
      });

      describe('style()', () => {
        it('returns a random style', () => {
          const style = faker.table.tableStyle();

          expect(style).toBeTruthy();
          expect(style).toBeTypeOf('string');
          expect(faker.definitions.table?.style).toContain(style);
        });
      });

      describe('material()', () => {
        it('returns a random material', () => {
          const material = faker.table.tableMaterial();

          expect(material).toBeTruthy();
          expect(material).toBeTypeOf('string');
          expect(faker.definitions.table?.material).toContain(material);
        });
      });

      describe('color()', () => {
        it('returns a random sitting', () => {
          const color = faker.table.tableColor();

          expect(color).toBeTruthy();
          expect(color).toBeTypeOf('string');
        });
      });
    }
  });
});
