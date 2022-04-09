import { allOf } from './utils';

export type EmojiGroups =
  | 'smileys'
  | 'body'
  | 'person'
  | 'nature'
  | 'food'
  | 'travel'
  | 'activities'
  | 'objects'
  | 'symbols'
  | 'flags';

/**
 * The possible definitions related to internet stuff.
 */
export interface InternetDefinitions {
  /**
   * Common top level and similar domains (e.g `de`, `co.uk`).
   */
  domain_suffix: string[];
  /**
   * Some email domains containing `example` (e.g. `example.com`).
   */
  example_email: string[];
  /**
   * Some free-mail domains used in that country (e.g. `gmail.de`).
   */
  free_email: string[];
  /**
   * List of all fully-qualified emoji ordered by groups.
   */
  emoji: Record<EmojiGroups, string[]>;
}

/**
 * Internal: A list of all keys for the InternetDefinitions.
 */
export const INTERNET = allOf<keyof InternetDefinitions>()(
  'domain_suffix',
  'example_email',
  'free_email',
  'emoji'
);
