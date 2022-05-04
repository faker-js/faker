import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to databases.
 */
export type DatabaseDefinitions = LocaleEntry<{
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
}>;
