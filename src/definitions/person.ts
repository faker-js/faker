import type { LocaleEntry } from './definitions';

export type PersonEntryDefinition<T> =
  | {
      generic?: T[];
      male: T[];
      female: T[];
    }
  | {
      generic: T[];
      male?: never;
      female?: never;
    };

type SimplePersonEntryDefinition = PersonEntryDefinition<string>;
type WeightedPersonEntryDefinition = PersonEntryDefinition<{
  value: string;
  weight: number;
}>;

/**
 * The possible definitions related to people's names.
 */
export type PersonDefinition = LocaleEntry<{
  gender: string[];
  sex: string[];

  prefix: SimplePersonEntryDefinition;
  first_name: SimplePersonEntryDefinition;
  middle_name: SimplePersonEntryDefinition;
  last_name: SimplePersonEntryDefinition;

  suffix: string[];

  /**
   * A weighted list of patterns used to generate names.
   */
  name: Array<{ value: string; weight: number }>;

  /**
   * A weighted list of patterns used to generate last names.
   */
  last_name_pattern: WeightedPersonEntryDefinition;

  bio_pattern: string[];

  job_descriptor: string[];
  job_area: string[];
  job_type: string[];

  job_title_pattern: string[];

  western_zodiac_sign: string[];
}>;
