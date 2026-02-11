import { resolve } from 'node:path';
import type { MetadataDefinition } from '../../src/definitions';

/**
 * Path to the docs locales directory.
 */
export const pathDocsLocales = resolve(
  import.meta.dirname,
  '../..',
  'docs',
  'locales'
);

/**
 * Converts a locale name to a Faker export name.
 *
 * @param locale The locale name (e.g., 'en', 'en_US').
 * @returns The Faker export name (e.g., 'fakerEN', 'fakerEN_US').
 */
export function toFakerExportName(locale: string): string {
  return `faker${locale.replace(/^([a-z]+)/, (part) => part.toUpperCase())}`;
}

/**
 * Attempts to load the metadata for a locale.
 *
 * @param locale The locale to load metadata for.
 * @returns The metadata definition, or an empty object if it fails to load.
 */
export async function tryLoadMetadata(
  locale: string
): Promise<MetadataDefinition> {
  const pathLocales = resolve(import.meta.dirname, '../../src/locales');
  try {
    const imported = await import(
      `file:${resolve(pathLocales, locale, 'metadata.ts')}`
    );
    return imported.default as MetadataDefinition;
  } catch {
    return {};
  }
}
