import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to books.
 */
export type BookDefinition = LocaleEntry<{
  /**
   * The names of actual book authors.
   */
  author: string[];

  /**
   * The formats of a book.
   */
  format: string[];

  /**
   * The names of some book genres.
   */
  genre: string[];

  /**
   * The names of actual book series.
   */
  series: string[];

  /**
   * The names of actual book titles.
   */
  title: string[];

  /**
   * The names of actual book publishers.
   */
  publisher: string[];
}>;
