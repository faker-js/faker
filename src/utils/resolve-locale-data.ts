import type { FakerCore } from '../core';
import type { DefinedLocaleDefinition } from '../definitions/definitions';
import { assertLocaleData } from '../internal/locale-proxy';

/**
 * Returns the locale data for the given category and entry.
 *
 * If the category or entry is missing or explicitly absent, an error is thrown.
 *
 * @param core The core to get the locale data from.
 * @param category  The category to get the locale data from.
 * @param entry The entry to get the locale data from.
 *
 * @example
 * resolveLocaleData(fakerCore, 'food', 'fruit'); // ['apple', 'apricot', ...]
 *
 * @since v10.0.0
 */
export function resolveLocaleData<
  const TCategory extends keyof DefinedLocaleDefinition,
  const TEntry extends keyof DefinedLocaleDefinition[TCategory],
>(
  core: FakerCore,
  category: TCategory,
  entry: TEntry
): DefinedLocaleDefinition[TCategory][TEntry];
/**
 * Returns the locale data for the given category and entry.
 *
 * If the category or entry is missing or explicitly absent, an error is thrown.
 *
 * @param core The core to get the locale data from.
 * @param category  The category to get the locale data from.
 * @param entry The entry to get the locale data from.
 *
 * @example
 * resolveLocaleData(fakerCore, 'food', 'fruit'); // ['apple', 'apricot', ...]
 *
 * @since v10.0.0
 */
export function resolveLocaleData(
  core: FakerCore,
  category: string,
  entry: string
): unknown;
/**
 * Returns the locale data for the given category and entry.
 *
 * If the category or entry is missing or explicitly absent, an error is thrown.
 *
 * @param core The core to get the locale data from.
 * @param category  The category to get the locale data from.
 * @param entry The entry to get the locale data from.
 *
 * @example
 * resolveLocaleData(fakerCore, 'food', 'fruit'); // ['apple', 'apricot', ...]
 *
 * @since v10.0.0
 */
export function resolveLocaleData(
  core: FakerCore,
  category: string,
  entry: string
): unknown {
  const value = core.locale[category]?.[entry];
  assertLocaleData(value, category, entry);
  return value;
}
