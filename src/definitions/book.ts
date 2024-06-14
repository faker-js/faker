import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to books.
 */
export type BookDefinition = LocaleEntry<{
  author: string[];
  format: string[];
  genre: string[];
  series: string[];
  title: string[];
  publisher: string[];
}>;
