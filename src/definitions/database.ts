import { allOf } from './utils';

/**
 * The possible definitions related to databases.
 */
export interface DatabaseDefinitions {
  /**
   * Database Engine
   */
  engine: string[];
  /**
   * Database Collation
   */
  collation: string[];
  /**
   * Column names
   */
  column: string[];
  /**
   * Column types
   */
  type: string[];
}

/**
 * Internal: A list of all keys for the DatabaseDefinitions.
 */
export const DATABASE = allOf<keyof DatabaseDefinitions>()(
  'collation',
  'column',
  'engine',
  'type'
);
