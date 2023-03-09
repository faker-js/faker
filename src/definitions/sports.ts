import type { LocaleEntry } from './definitions';

export type SportsDefinitions = LocaleEntry<{
  team_patterns?: string[];

  team_prefix?: string[];

  team_suffix?: string[];
}>;
