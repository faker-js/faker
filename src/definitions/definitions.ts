import type { AirlineDefinitions } from './airline';
import type { AnimalDefinitions } from './animal';
import type { ColorDefinitions } from './color';
import type { CommerceDefinitions } from './commerce';
import type { CompanyDefinitions } from './company';
import type { DatabaseDefinitions } from './database';
import type { DateDefinitions } from './date';
import type { FinanceDefinitions } from './finance';
import type { HackerDefinitions } from './hacker';
import type { InternetDefinitions } from './internet';
import type { LocationDefinitions } from './location';
import type { LoremDefinitions } from './lorem';
import type { MetadataDefinitions } from './metadata';
import type { MusicDefinitions } from './music';
import type { PersonDefinitions } from './person';
import type { PhoneNumberDefinitions } from './phone_number';
import type { ScienceDefinitions } from './science';
import type { SystemDefinitions } from './system';
import type { VehicleDefinitions } from './vehicle';
import type { WordDefinitions } from './word';

/**
 * Wrapper type for all definition categories that will make all properties optional and allow extra properties.
 */
export type LocaleEntry<T extends Record<string, unknown>> = {
  [P in keyof T]?: T[P] | null;
} & Record<string, unknown>; // Unsupported & custom entries

/**
 * The definitions as used by the translations/locales.
 * This is basically the same as Definitions with the exception,
 * that most properties are optional and extra properties are allowed.
 */
export type LocaleDefinition = {
  metadata?: MetadataDefinitions;
  airline?: AirlineDefinitions;
  animal?: AnimalDefinitions;
  color?: ColorDefinitions;
  commerce?: CommerceDefinitions;
  company?: CompanyDefinitions;
  database?: DatabaseDefinitions;
  date?: DateDefinitions;
  finance?: FinanceDefinitions;
  hacker?: HackerDefinitions;
  internet?: InternetDefinitions;
  location?: LocationDefinitions;
  lorem?: LoremDefinitions;
  music?: MusicDefinitions;
  person?: PersonDefinitions;
  phone_number?: PhoneNumberDefinitions;
  science?: ScienceDefinitions;
  system?: SystemDefinitions;
  vehicle?: VehicleDefinitions;
  word?: WordDefinitions;
} & Record<string, Record<string, unknown>>;
