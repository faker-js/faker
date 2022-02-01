import type { DatabaseDefinitions } from '../../../definitions';
import collation from './collation';
import column from './column';
import engine from './engine';
import type from './type';

const database: DatabaseDefinitions = {
  collation,
  column,
  engine,
  type,
};

export default database;
