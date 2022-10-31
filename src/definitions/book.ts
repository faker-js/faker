import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to book's names.
 */
export type BookDefinitions = LocaleEntry<{
  title: string[];
  description: string[];
  author: string[];
  publisher: string[];
}>;
