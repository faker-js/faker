import type { LocaleEntry } from './definitions';

export type NameEntry<T extends string | { value: string; weight: number }> = {
  female?: T[];
  generic?: T[];
  male?: T[];
};

/**
 * The possible definitions related to people's names.
 */
export type PersonDefinition = LocaleEntry<{
  gender: string[];
  sex: string[];

  prefix: NameEntry<string>;
  first_name: NameEntry<string>;
  middle_name: NameEntry<string>;
  last_name: NameEntry<string>;

  suffix: string[];

  /**
   * A weighted list of patterns used to generate names.
   */
  name: Array<{ value: string; weight: number }>;

  /**
   * A weighted list of patterns used to generate last names.
   */
  last_name_pattern: NameEntry<{ value: string; weight: number }>;

  bio_pattern: string[];

  job_descriptor: string[];
  job_area: string[];
  job_type: string[];

  job_title_pattern: string[];

  western_zodiac_sign: string[];
}>;
