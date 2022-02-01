import { allOf } from './utils';

/**
 * The possible definitions related to files and the system.
 */
export interface SystemDefinitions {
  /**
   * Returns some common file paths.
   */
  directoryPaths: string[];
  /**
   * The mime type definitions with some additional information.
   */
  mimeTypes: { [mimeType: string]: SystemMimeTypeEntryDefinitions };
}

/**
 * The mime type entry details.
 */
export interface SystemMimeTypeEntryDefinitions {
  source?: string;
  extensions?: string[];
  compressible?: boolean;
  charset?: string;
}

/**
 * Internal: A list of all keys for the SystemDefinitions.
 */
export const SYSTEM = allOf<keyof SystemDefinitions>()(
  'directoryPaths',
  'mimeTypes'
);
