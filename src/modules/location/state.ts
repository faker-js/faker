import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
 * Generally, these are the ISO 3166-2 subdivisions for a country.
 * If a locale doesn't correspond to one specific country, the method may return ISO 3166-2 subdivisions from one or more countries that uses that language. For example, the `ar` locale includes subdivisions from Arabic-speaking countries, such as Tunisia, Algeria, Syria, Lebanon, etc.
 * For historical compatibility reasons, the default `en` locale only includes states in the United States (identical to `en_US`). However, you can use other English locales, such as `en_IN`, `en_GB`, and `en_AU`, if needed.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.abbreviated If true this will return abbreviated first-level administrative entity names.
 * Otherwise this will return the long name. Defaults to `false`.
 *
 * @example
 * state(fakerCore) // 'Mississippi'
 * fakerEN_CA.location.state() // 'Saskatchewan'
 * fakerDE.location.state() // 'Nordrhein-Westfalen'
 * state(fakerCore, { abbreviated: true }) // 'LA'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function state(
  fakerCore: FakerCore,
  options: {
    /**
     * If true this will return abbreviated first-level administrative entity names.
     * Otherwise this will return the long name.
     *
     * @default false
     */
    abbreviated?: boolean;
  } = {}
): string {
  const { abbreviated = false } = options;
  const data = abbreviated
    ? fakerCore.locale.location.state_abbr
    : fakerCore.locale.location.state;

  return arrayElement(fakerCore, data);
}
