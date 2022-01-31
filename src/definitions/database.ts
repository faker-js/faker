import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to databases.
 */
export interface DatabaseDefinitions {
  /**
   * Database Engine
   */
  engine: Texts;
  /**
   * Database Collation
   */
  collation: Texts;
  /**
   * Column names
   */
  column: Texts;
  /**
   * Column types
   */
  type: Texts;
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
