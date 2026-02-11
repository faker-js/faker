/**
 * Generates the export name for a locale, e.g. `fakerEN` for `en`.
 *
 * @param locale The locale code, e.g. `en` or `en_US`.
 *
 * @returns The export name for the locale.
 */
export function toFakerExportName(locale: string): string {
  return `faker${locale.replace(/^([a-z]+)/, (part) => part.toUpperCase())}`;
}
