import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to files and operating systems.
 */
export type SystemDefinition = LocaleEntry<{
  /**
   * Returns some common file paths.
   */
  directory_paths: string[];

  /**
   * The mime type definitions with some additional information.
   */
  mime_types: { [mimeType: string]: SystemMimeTypeEntryDefinition };
}>;

/**
 * The mime-type entry details.
 */
export interface SystemMimeTypeEntryDefinition {
  extensions: string[];
}
