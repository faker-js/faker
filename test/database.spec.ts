import { describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('database', () => {
  describe('column()', () => {
    it('returns a column name', () => {
      const spy_database_column = vi
        .spyOn(faker.database, 'column')
        .mockReturnValue('title');

      const column = faker.database.column();
      const expected = 'title';

      expect(
        column,
        'The column name should be equals ' +
          expected +
          '. Current is ' +
          column
      ).toBe(expected);

      spy_database_column.mockRestore();
    });
  });

  describe('collation()', () => {
    it('returns a collation', () => {
      const spy_database_collation = vi
        .spyOn(faker.database, 'collation')
        .mockReturnValue('utf8_bin');

      const collation = faker.database.collation();
      const expected = 'utf8_bin';

      expect(
        collation,
        'The collation should be equals ' +
          expected +
          '. Current is ' +
          collation
      ).toBe(expected);

      spy_database_collation.mockRestore();
    });
  });

  describe('engine()', () => {
    it('returns an engine', () => {
      const spy_database_engine = vi
        .spyOn(faker.database, 'engine')
        .mockReturnValue('InnoDB');

      const engine = faker.database.engine();
      const expected = 'InnoDB';

      expect(
        engine,
        'The db engine should be equals ' + expected + '. Current is ' + engine
      ).toBe(expected);

      spy_database_engine.mockRestore();
    });
  });

  describe('type()', () => {
    it('returns a column type', () => {
      const spy_database_type = vi
        .spyOn(faker.database, 'type')
        .mockReturnValue('int');

      const type = faker.database.type();
      const expected = 'int';

      expect(
        type,
        'The column type should be equals ' + expected + '. Current is ' + type
      ).toBe(expected);

      spy_database_type.mockRestore();
    });
  });
});
