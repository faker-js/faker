import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to people's names.
 */
export type PersonDefinitions = LocaleEntry<{
  gender: string[];
  sex: string[];

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
   * A weighted list of patterns used to generate names.
   */
  name: Array<{ value: string; weight: number }>;

  bio_patterns?: string[];

  title: PersonTitleDefinitions;

  western_zodiac_sign: string[];
}>;

/**
 * The possible definitions related to people's titles.
 */
export interface PersonTitleDefinitions {
  descriptor?: string[];
  job: string[];
  level?: string[];
}
