import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to internet stuff.
 */
export interface InternetDefinitions {
  /**
   * Common top level and similar domains (e.g `de`, `co.uk`).
   */
  domain_suffix: Texts;
  /**
   * Some email domains containing `example` (e.g. `example.com`).
   */
  example_email: Texts;
  /**
   * Some free-mail domains used in that country (e.g. `gmail.de`).
   */
  free_email: Texts;
}

/**
 * Internal: A list of all keys for the InternetDefinitions.
 */
export const INTERNET = allOf<keyof InternetDefinitions>()(
  'domain_suffix',
  'example_email',
  'free_email'
);
