import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to files and the system.
 */
export type SystemDefinitions = LocaleEntry<{
  /**
   * Returns some common file paths.
   */
  directoryPaths: string[];
}>;
