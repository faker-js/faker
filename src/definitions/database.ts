import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to databases.
 */
export interface DatabaseDefinition {
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
 * Internal: A list of all keys for the DatabaseDefinition.
 */
export const database = allOf<keyof DatabaseDefinition>()(
  'collation',
  'column',
  'engine',
  'type'
);
