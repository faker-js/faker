import { resolve } from 'node:path';
import type { MetadataDefinition } from '../../src';
import { FILE_PATH_SRC_LOCALES } from '../shared/paths';

/**
 * Loads the metadata for the given locale.
 *
 * @param locale The locale to load metadata for.
 *
 * @returns The metadata definition for the locale.
 */
export async function loadMetadata(
  locale: string
): Promise<MetadataDefinition> {
  const imported = await import(
    `file:${resolve(FILE_PATH_SRC_LOCALES, locale, 'metadata.ts')}`
  );
  return imported.default as MetadataDefinition;
}

/**
 * Tries to load the metadata for the given locale.
 *
 * @param locale The locale to load metadata for.
 *
 * @returns The metadata definition for the locale, or an empty object if loading fails.
 */
export async function tryLoadMetadata(
  locale: string
): Promise<MetadataDefinition> {
  try {
    return await loadMetadata(locale);
  } catch {
    return {};
  }
}
