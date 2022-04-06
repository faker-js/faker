import { allOf } from './utils';

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
}

/**
 * Configuration for generating emails
 */
export interface EmailConfig {
  /**
   * Enables random special characters to be present in generated email
   * Source: https://en.wikipedia.org/wiki/Email_address#Local-part
   */
  allowSpecialCharacters: boolean;
}

/**
 * Internal: A list of all keys for the InternetDefinitions.
 */
export const INTERNET = allOf<keyof InternetDefinitions>()(
  'domain_suffix',
  'example_email',
  'free_email'
);
