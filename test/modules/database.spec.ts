import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('database', () => {
  seededTests(faker, 'database', (t) => {
    t.itEach('column', 'type', 'collation', 'engine', 'mongodbObjectId');
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('column()', () => {
        it('should return a column name from array', () => {
          const column = faker.database.column();
          expect(column).toBeTruthy();
          expect(column).toBeTypeOf('string');
          expect(faker.definitions.database.column).toContain(column);
        });
      });

      describe('collation()', () => {
        it('should return a collation from array', () => {
          const collation = faker.database.collation();
          expect(collation).toBeTruthy();
          expect(collation).toBeTypeOf('string');
          expect(faker.definitions.database.collation).toContain(collation);
        });
      });

      describe('engine()', () => {
        it('should return an engine from array', () => {
          const engine = faker.database.engine();
          expect(engine).toBeTruthy();
          expect(engine).toBeTypeOf('string');
          expect(faker.definitions.database.engine).toContain(engine);
        });
      });

      describe('type()', () => {
        it('should return a column type from array', () => {
          const type = faker.database.type();
          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.database.type).toContain(type);
        });
      });

      describe('mongodbObjectId', () => {
        it('should generate a MongoDB ObjectId value', () => {
          const generateObjectId = faker.database.mongodbObjectId();
          expect(generateObjectId).toBeTypeOf('string');
        });
      });
    }
  );
});
