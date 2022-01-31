import { allOf } from './utils';

/**
 * The possible definitions related to files and the system.
 */
export interface SystemDefinitions {
  /**
   * Returns some common file paths.
   */
  directoryPaths: string[];
  mimeTypes: SystemMimeTypeDefinitions;
}

/**
 * The mime type definitions with some additional information.
 */
export interface SystemMimeTypeDefinitions {
  [mimeType: string]: SystemMimeTypeEntryDefinitions;
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
