/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */
import type { DatabaseDefinitions } from '../../..';
import collation from './collation';
import engine from './engine';
import type_ from './type';

const database: DatabaseDefinitions = {
  collation,
  engine,
  type: type_,
};

export default database;
