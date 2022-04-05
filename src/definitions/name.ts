import { allOf } from './utils';

/**
 * The possible definitions related to people's names.
 */
export interface NameDefinitions {
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
}

/**
 * The possible definitions related to people's titles.
 */
export interface NameTitleDefinitions {
  descriptor?: string[];
  job: string[];
  level?: string[];
}

/**
 * Internal: A list of all keys for the NameDefinitions.
 */
export const NAME = allOf<keyof NameDefinitions>()(
  'gender',
  'binary_gender',

  'prefix',
  'female_prefix',
  'male_prefix',

  'first_name',
  'female_first_name',
  'male_first_name',

  'middle_name',
  'female_middle_name',
  'male_middle_name',

  'last_name',
  'female_last_name',
  'male_last_name',

  'suffix',

  'name',

  'title'
);
