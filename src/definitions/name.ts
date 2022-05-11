import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to people's names.
 */
export type NameDefinitions = LocaleEntry<{
  gender: string[];
  binary_gender: string[];

  prefix?: string[];
  female_prefix?: string[];
  male_prefix?: string[];

  first_name?: string[];
  female_first_name?: string[];
  male_first_name?: string[];

  middle_name?: string[];
  female_middle_name?: string[];
  male_middle_name?: string[];

  last_name?: string[];
  female_last_name?: string[];
  male_last_name?: string[];

  suffix: string[];

  /**
   * A list of patterns used to generate names (Fake-Pattern[]).
   */
  name: string[];

  title: NameTitleDefinitions;
}>;

/**
 * The possible definitions related to people's titles.
 */
export interface NameTitleDefinitions {
  descriptor?: string[];
  job: string[];
  level?: string[];
}
