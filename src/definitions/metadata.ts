export type MetadataDefinitions = {
  /**
   * The English name of the language (and the specific country, if defined).
   */
  title: string;
  /**
   * The full code of the locale, including the country code if applicable.
   */
  code?: string;
  /**
   * The endonym (native name) of the language (and the specific country, if defined).
   *
   * @see https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_and_their_capitals_in_native_languages
   */
  endonym?: string;
  /**
   * The ISO 639-1 code of the language.
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   */
  language?: string;
  /**
   * The ISO 3166-1 alpha-2 code of the country.
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country?: string;
  /**
   * Whether the language is written right-to-left.
   */
  rtl?: boolean;
  /**
   * The ISO 15924 code of the script.
   *
   * @see https://en.wikipedia.org/wiki/ISO_15924
   */
  script?: string;
} & Record<string, unknown>;
