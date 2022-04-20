import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      column: 'token',
      type: 'smallint',
      collation: 'utf8_bin',
      engine: 'MEMORY',
      mongodbObjectId: '8be4abdd39321ad7d3fe01ff',
    },
  },
  {
    seed: 1337,
    expectations: {
      column: 'email',
      type: 'time',
      collation: 'utf8_general_ci',
      engine: 'MyISAM',
      mongodbObjectId: '5c346ba075bd57f5a62b82d7',
    },
  },
  {
    seed: 1211,
    expectations: {
      column: 'createdAt',
      type: 'geometry',
      collation: 'cp1250_general_ci',
      engine: 'ARCHIVE',
      mongodbObjectId: 'eadb42f0e3f4a973fab0aeef',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'column',
  'type',
  'collation',
  'engine',
  'mongodbObjectId',
];

describe('database', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.database[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
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
  });
});
